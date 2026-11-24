using System.Drawing;
using System.Windows.Forms;
using OpenTK.GLControl;
using OpenTK.Graphics.OpenGL;
using OpenTK.Mathematics;
using OpenTK.Windowing.Common;
using StlToFp3dPack.Rendering;
using Triangle = StlToFp3dPack.Models.Triangle;

namespace StlToFp3dPack.UI;

/// <summary>OpenTK viewport for the scaled STL wireframe and selectable primitive parts.</summary>
public sealed class ModelViewport : UserControl
{
    private const float FovDegrees = 45f;

    private readonly GLControl _gl;
    private PreviewScene _scene = PreviewScene.Empty;

    private float _yaw = MathHelper.DegreesToRadians(35f);
    private float _pitch = MathHelper.DegreesToRadians(25f);
    private float _distance = 4f;
    private Vector3 _target = Vector3.Zero;

    private int _selectedPart = -1;
    private bool _dragging;
    private Point _dragStart;
    private Point _lastMouse;
    private bool _initialized;
    private bool _autoFitted;

    public ModelViewport()
    {
        _gl = new GLControl(new GLControlSettings
        {
            APIVersion = new Version(3, 3, 0, 0),
            Profile = ContextProfile.Compatability,
            API = ContextAPI.OpenGL,
            NumberOfSamples = 0,
        })
        {
            Dock = DockStyle.Fill,
        };
        Controls.Add(_gl);

        _gl.Paint += OnGlPaint;
        _gl.Resize += OnGlResize;
        _gl.MouseDown += OnMouseDown;
        _gl.MouseMove += OnMouseMove;
        _gl.MouseUp += OnMouseUp;
        _gl.MouseWheel += OnMouseWheel;
    }

    /// <summary>Raised with the clicked part index, or -1 when the click missed every part.</summary>
    public event Action<int>? PartSelected;

    public void SetScene(PreviewScene scene)
    {
        _scene = scene ?? PreviewScene.Empty;
        if (!_autoFitted && _scene.HasGeometry)
        {
            FitView();
            _autoFitted = true;
        }
        Invalidate();
    }

    public void SetSelectedPart(int index)
    {
        _selectedPart = index;
        Invalidate();
    }

    public void ResetView()
    {
        _yaw = MathHelper.DegreesToRadians(35f);
        _pitch = MathHelper.DegreesToRadians(25f);
        _distance = 4f;
        Invalidate();
    }

    public void FitView()
    {
        if (!_scene.HasGeometry)
            return;
        Vector3 center = (_scene.BoundsMin + _scene.BoundsMax) * 0.5f;
        float radius = Math.Max(0.1f, (_scene.BoundsMax - _scene.BoundsMin).Length * 0.5f);
        float tan = MathF.Tan(MathHelper.DegreesToRadians(FovDegrees) * 0.5f);
        _target = center;
        _distance = MathHelper.Clamp(radius / Math.Max(0.05f, tan) * 1.15f, 0.3f, 60f);
        Invalidate();
    }

    private void InitializeGl()
    {
        if (_initialized)
            return;
        _initialized = true;
        GL.Enable(EnableCap.DepthTest);
        GL.Enable(EnableCap.Lighting);
        GL.Enable(EnableCap.Light0);
        GL.ShadeModel(ShadingModel.Smooth);
        GL.Light(LightName.Light0, LightParameter.Position, new float[] { 3f, 5f, 4f, 0f });
        GL.Light(LightName.Light0, LightParameter.Diffuse, new float[] { 1f, 1f, 1f, 1f });
        GL.LightModel(LightModelParameter.LightModelAmbient, new float[] { 0.42f, 0.44f, 0.5f, 1f });
    }

    private void OnGlResize(object? sender, EventArgs e)
    {
        if (!_gl.HasValidContext)
            return;
        _gl.MakeCurrent();
        GL.Viewport(0, 0, Math.Max(1, _gl.Width), Math.Max(1, _gl.Height));
        Invalidate();
    }

    private void OnGlPaint(object? sender, PaintEventArgs e)
    {
        if (!_gl.HasValidContext)
            return;
        _gl.MakeCurrent();
        InitializeGl();
        GL.ClearColor(0.06f, 0.07f, 0.10f, 1f);
        GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);
        SetupMatrices();
        DrawGroundGrid();
        DrawStlWireframe();
        DrawParts();
        _gl.SwapBuffers();
    }

    private void SetupMatrices()
    {
        float aspect = (float)Math.Max(1, _gl.Width) / Math.Max(1, _gl.Height);
        Matrix4 projection = Matrix4.CreatePerspectiveFieldOfView(
            MathHelper.DegreesToRadians(FovDegrees), aspect, 0.01f, 200f);
        (Vector3 eye, _, _, _) = CameraBasis();
        Matrix4 view = Matrix4.LookAt(eye, _target, Vector3.UnitY);
        GL.MatrixMode(MatrixMode.Projection);
        GL.LoadMatrix(ref projection);
        GL.MatrixMode(MatrixMode.Modelview);
        GL.LoadMatrix(ref view);
    }

    private (Vector3 Eye, Vector3 Forward, Vector3 Right, Vector3 Up) CameraBasis()
    {
        float cosPitch = MathF.Cos(_pitch);
        var offset = new Vector3(
            _distance * cosPitch * MathF.Sin(_yaw),
            _distance * MathF.Sin(_pitch),
            _distance * cosPitch * MathF.Cos(_yaw));
        Vector3 eye = _target + offset;
        Vector3 forward = (_target - eye).Normalized();
        Vector3 right = Vector3.Cross(forward, Vector3.UnitY).Normalized();
        Vector3 up = Vector3.Cross(right, forward).Normalized();
        return (eye, forward, right, up);
    }

    private void DrawGroundGrid()
    {
        float pad = 0.4f;
        float x0 = Math.Min(_scene.BoundsMin.X, -0.5f) - pad;
        float x1 = Math.Max(_scene.BoundsMax.X, 0.5f) + pad;
        float z0 = Math.Min(_scene.BoundsMin.Z, -0.5f) - pad;
        float z1 = Math.Max(_scene.BoundsMax.Z, 0.5f) + pad;
        const int steps = 10;

        GL.Disable(EnableCap.Lighting);
        GL.Color3(0.16f, 0.19f, 0.26f);
        GL.Begin(PrimitiveType.Lines);
        for (int i = 0; i <= steps; i++)
        {
            float x = x0 + (x1 - x0) * i / steps;
            float z = z0 + (z1 - z0) * i / steps;
            GL.Vertex3(x, 0f, z0);
            GL.Vertex3(x, 0f, z1);
            GL.Vertex3(x0, 0f, z);
            GL.Vertex3(x1, 0f, z);
        }
        GL.End();
        GL.Enable(EnableCap.Lighting);
    }

    private void DrawStlWireframe()
    {
        if (_scene.StlTriangles.Count == 0)
            return;
        GL.Disable(EnableCap.Lighting);
        GL.Color3(0.38f, 0.72f, 1f);
        GL.Begin(PrimitiveType.Lines);
        foreach (Triangle triangle in _scene.StlTriangles)
        {
            GL.Vertex3(triangle.A.X, triangle.A.Y, triangle.A.Z);
            GL.Vertex3(triangle.B.X, triangle.B.Y, triangle.B.Z);
            GL.Vertex3(triangle.B.X, triangle.B.Y, triangle.B.Z);
            GL.Vertex3(triangle.C.X, triangle.C.Y, triangle.C.Z);
            GL.Vertex3(triangle.C.X, triangle.C.Y, triangle.C.Z);
            GL.Vertex3(triangle.A.X, triangle.A.Y, triangle.A.Z);
        }
        GL.End();
        GL.Enable(EnableCap.Lighting);
    }

    private void DrawParts()
    {
        for (int i = 0; i < _scene.Parts.Count; i++)
        {
            PreviewPart part = _scene.Parts[i];
            GL.Color4(part.Color.R, part.Color.G, part.Color.B, part.Color.A);
            DrawPrimitive(part);
            if (i == _selectedPart)
                DrawSelection(part);
        }
    }

    private static void DrawPrimitive(PreviewPart part)
    {
        GL.PushMatrix();
        GL.Translate(part.Center.X, part.Center.Y, part.Center.Z);
        GL.Rotate(part.YawDegrees, 0f, 1f, 0f);
        if (string.Equals(part.Shape, "cyl", StringComparison.Ordinal))
        {
            ApplyAxisRotation(part.Axis);
            (float radius, float height) = CylinderDimensions(part);
            DrawCylinder(radius, height);
        }
        else
        {
            DrawBox(part.HalfExtents);
        }
        GL.PopMatrix();
    }

    private static void ApplyAxisRotation(PreviewCylinderAxis axis)
    {
        switch (axis)
        {
            case PreviewCylinderAxis.X:
                GL.Rotate(90f, 0f, 0f, 1f);
                break;
            case PreviewCylinderAxis.Z:
                GL.Rotate(90f, 1f, 0f, 0f);
                break;
        }
    }

    private static (float Radius, float Height) CylinderDimensions(PreviewPart part) => part.Axis switch
    {
        PreviewCylinderAxis.X => (
            Math.Min(part.HalfExtents.Y, part.HalfExtents.Z),
            part.HalfExtents.X * 2f),
        PreviewCylinderAxis.Z => (
            Math.Min(part.HalfExtents.X, part.HalfExtents.Y),
            part.HalfExtents.Z * 2f),
        _ => (
            Math.Min(part.HalfExtents.X, part.HalfExtents.Z),
            part.HalfExtents.Y * 2f),
    };

    private static void DrawBox(Vector3 half)
    {
        float x = half.X, y = half.Y, z = half.Z;
        GL.Begin(PrimitiveType.Quads);
        Face(1f, 0f, 0f, (x, -y, -z), (x, -y, z), (x, y, z), (x, y, -z));
        Face(-1f, 0f, 0f, (-x, -y, z), (-x, -y, -z), (-x, y, -z), (-x, y, z));
        Face(0f, 1f, 0f, (-x, y, -z), (x, y, -z), (x, y, z), (-x, y, z));
        Face(0f, -1f, 0f, (-x, -y, z), (x, -y, z), (x, -y, -z), (-x, -y, -z));
        Face(0f, 0f, 1f, (-x, -y, z), (-x, y, z), (x, y, z), (x, -y, z));
        Face(0f, 0f, -1f, (x, -y, -z), (x, y, -z), (-x, y, -z), (-x, -y, -z));
        GL.End();
    }

    private static void Face(float nx, float ny, float nz, params (float X, float Y, float Z)[] corners)
    {
        GL.Normal3(nx, ny, nz);
        foreach ((float px, float py, float pz) in corners)
            GL.Vertex3(px, py, pz);
    }

    private static void DrawCylinder(float radius, float height)
    {
        const int segments = 24;
        float halfHeight = Math.Max(0.0005f, height * 0.5f);
        float r = Math.Max(0.0005f, radius);

        GL.Begin(PrimitiveType.QuadStrip);
        for (int i = 0; i <= segments; i++)
        {
            float angle = 2f * MathF.PI * i / segments;
            float c = MathF.Cos(angle);
            float s = MathF.Sin(angle);
            GL.Normal3(c, 0f, s);
            GL.Vertex3(c * r, -halfHeight, s * r);
            GL.Vertex3(c * r, halfHeight, s * r);
        }
        GL.End();

        GL.Begin(PrimitiveType.TriangleFan);
        GL.Normal3(0f, -1f, 0f);
        GL.Vertex3(0f, -halfHeight, 0f);
        for (int i = segments; i >= 0; i--)
        {
            float angle = 2f * MathF.PI * i / segments;
            GL.Vertex3(MathF.Cos(angle) * r, -halfHeight, MathF.Sin(angle) * r);
        }
        GL.End();

        GL.Begin(PrimitiveType.TriangleFan);
        GL.Normal3(0f, 1f, 0f);
        GL.Vertex3(0f, halfHeight, 0f);
        for (int i = 0; i <= segments; i++)
        {
            float angle = 2f * MathF.PI * i / segments;
            GL.Vertex3(MathF.Cos(angle) * r, halfHeight, MathF.Sin(angle) * r);
        }
        GL.End();
    }

    private static void DrawSelection(PreviewPart part)
    {
        GL.Disable(EnableCap.DepthTest);
        GL.Disable(EnableCap.Lighting);
        GL.Color3(1f, 0.86f, 0.18f);
        Vector3 h = part.HalfExtents;
        GL.PushMatrix();
        GL.Translate(part.Center.X, part.Center.Y, part.Center.Z);
        GL.Rotate(part.YawDegrees, 0f, 1f, 0f);
        GL.Begin(PrimitiveType.Lines);
        CornerLines(h);
        GL.End();
        GL.PopMatrix();
        GL.Enable(EnableCap.DepthTest);
        GL.Enable(EnableCap.Lighting);
    }

    private static void CornerLines(Vector3 h)
    {
        GL.Vertex3(-h.X, -h.Y, -h.Z); GL.Vertex3(h.X, -h.Y, -h.Z);
        GL.Vertex3(h.X, -h.Y, -h.Z); GL.Vertex3(h.X, -h.Y, h.Z);
        GL.Vertex3(h.X, -h.Y, h.Z); GL.Vertex3(-h.X, -h.Y, h.Z);
        GL.Vertex3(-h.X, -h.Y, h.Z); GL.Vertex3(-h.X, -h.Y, -h.Z);
        GL.Vertex3(-h.X, h.Y, -h.Z); GL.Vertex3(h.X, h.Y, -h.Z);
        GL.Vertex3(h.X, h.Y, -h.Z); GL.Vertex3(h.X, h.Y, h.Z);
        GL.Vertex3(h.X, h.Y, h.Z); GL.Vertex3(-h.X, h.Y, h.Z);
        GL.Vertex3(-h.X, h.Y, h.Z); GL.Vertex3(-h.X, h.Y, -h.Z);
        GL.Vertex3(-h.X, -h.Y, -h.Z); GL.Vertex3(-h.X, h.Y, -h.Z);
        GL.Vertex3(h.X, -h.Y, -h.Z); GL.Vertex3(h.X, h.Y, -h.Z);
        GL.Vertex3(h.X, -h.Y, h.Z); GL.Vertex3(h.X, h.Y, h.Z);
        GL.Vertex3(-h.X, -h.Y, h.Z); GL.Vertex3(-h.X, h.Y, h.Z);
    }

    private void OnMouseDown(object? sender, MouseEventArgs e)
    {
        if (e.Button != MouseButtons.Left)
            return;
        _dragging = true;
        _dragStart = e.Location;
        _lastMouse = e.Location;
        _gl.Capture = true;
    }

    private void OnMouseMove(object? sender, MouseEventArgs e)
    {
        if (!_dragging)
            return;
        float dx = e.X - _lastMouse.X;
        float dy = e.Y - _lastMouse.Y;
        _yaw -= dx * 0.01f;
        _pitch = MathHelper.Clamp(_pitch + dy * 0.01f, -1.45f, 1.45f);
        _lastMouse = e.Location;
        Invalidate();
    }

    private void OnMouseUp(object? sender, MouseEventArgs e)
    {
        if (!_dragging)
            return;
        _dragging = false;
        _gl.Capture = false;
        if (Math.Abs(e.X - _dragStart.X) + Math.Abs(e.Y - _dragStart.Y) < 5)
            PickAt(e.X, e.Y);
    }

    private void OnMouseWheel(object? sender, MouseEventArgs e)
    {
        _distance = MathHelper.Clamp(_distance * MathF.Exp(-e.Delta * 0.001f), 0.3f, 60f);
        Invalidate();
    }

    private void PickAt(int x, int y)
    {
        int width = Math.Max(1, _gl.Width);
        int height = Math.Max(1, _gl.Height);
        float aspect = (float)width / height;
        float tan = MathF.Tan(MathHelper.DegreesToRadians(FovDegrees) * 0.5f);
        float ndcX = ((2f * x / width) - 1f) * aspect * tan;
        float ndcY = (1f - (2f * y / height)) * tan;
        (Vector3 eye, Vector3 forward, Vector3 right, Vector3 up) = CameraBasis();
        int index = Picking.Pick(_scene, eye, forward, right, up, ndcX, ndcY);
        PartSelected?.Invoke(index);
    }
}
