using OpenTK.Mathematics;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Rendering;

public enum PreviewCylinderAxis
{
    Y,
    X,
    Z,
}

/// <summary>One primitive part as the preview draws it, in metres after item-size scaling.</summary>
public sealed record PreviewPart(
    string Shape,
    Vector3 Center,
    Vector3 HalfExtents,
    PreviewCylinderAxis Axis,
    float YawDegrees,
    PreviewColor Color,
    bool Glass);

/// <summary>OpenGL-independent description of what the viewport should draw.</summary>
public sealed class PreviewScene
{
    public static readonly PreviewScene Empty = new();

    public IReadOnlyList<Triangle> StlTriangles { get; init; } = Array.Empty<Triangle>();

    public IReadOnlyList<PreviewPart> Parts { get; init; } = Array.Empty<PreviewPart>();

    public Vector3 BoundsMin { get; init; } = new(-0.5f, 0f, -0.5f);

    public Vector3 BoundsMax { get; init; } = new(0.5f, 1f, 0.5f);

    public bool HasGeometry => StlTriangles.Count > 0 || Parts.Count > 0;

    public static PreviewScene Create(
        NormalizedMesh? mesh,
        IEnumerable<PackPart>? parts,
        double[]? sizeMetres = null)
    {
        var triangles = mesh?.Triangles ?? Array.Empty<Triangle>();
        double[] size = sizeMetres ?? mesh?.SizeMetres ?? new double[3] { 1, 1, 1 };
        var previewParts = new List<PreviewPart>();
        if (parts is not null)
        {
            foreach (PackPart part in parts)
                previewParts.Add(FromPackPart(part, size));
        }

        float minX = float.PositiveInfinity, minY = float.PositiveInfinity, minZ = float.PositiveInfinity;
        float maxX = float.NegativeInfinity, maxY = float.NegativeInfinity, maxZ = float.NegativeInfinity;
        foreach (Triangle triangle in triangles)
        {
            Include(triangle.A, ref minX, ref minY, ref minZ, ref maxX, ref maxY, ref maxZ);
            Include(triangle.B, ref minX, ref minY, ref minZ, ref maxX, ref maxY, ref maxZ);
            Include(triangle.C, ref minX, ref minY, ref minZ, ref maxX, ref maxY, ref maxZ);
        }
        foreach (PreviewPart part in previewParts)
        {
            float radius = part.HalfExtents.Length;
            Include(part.Center, radius, ref minX, ref minY, ref minZ, ref maxX, ref maxY, ref maxZ);
        }

        if (float.IsPositiveInfinity(minX))
            return Empty;

        return new PreviewScene
        {
            StlTriangles = triangles,
            Parts = previewParts,
            BoundsMin = new Vector3(minX, minY, minZ),
            BoundsMax = new Vector3(maxX, maxY, maxZ),
        };
    }

    private static PreviewPart FromPackPart(PackPart part, double[] size)
    {
        float sx = (float)size[0];
        float sy = (float)size[1];
        float sz = (float)size[2];
        var center = new Vector3(
            (float)(part.X * sx),
            (float)((part.Y + part.H / 2) * sy),
            (float)(part.Z * sz));

        Vector3 half;
        PreviewCylinderAxis axis = PreviewCylinderAxis.Y;
        if (string.Equals(part.Shape, "cyl", StringComparison.Ordinal))
        {
            float diameter = (float)Math.Min(part.W * sx, part.D * sz);
            float radius = Math.Max(0.0005f, diameter / 2);
            float height = Math.Max(0.0005f, (float)(part.H * sy / 2));
            axis = part.Axis switch
            {
                "x" => PreviewCylinderAxis.X,
                "z" => PreviewCylinderAxis.Z,
                _ => PreviewCylinderAxis.Y,
            };
            half = axis switch
            {
                PreviewCylinderAxis.X => new Vector3(height, radius, radius),
                PreviewCylinderAxis.Z => new Vector3(radius, radius, height),
                _ => new Vector3(radius, height, radius),
            };
        }
        else
        {
            half = new Vector3(
                Math.Max(0.0005f, (float)(part.W * sx / 2)),
                Math.Max(0.0005f, (float)(part.H * sy / 2)),
                Math.Max(0.0005f, (float)(part.D * sz / 2)));
        }

        string color = part.Color ?? "body";
        return new PreviewPart(
            part.Shape,
            center,
            half,
            axis,
            (float)(part.Rot ?? 0),
            PreviewPalette.Resolve(color),
            PreviewPalette.IsGlass(color));
    }

    private static void Include(Point3 point, ref float minX, ref float minY, ref float minZ, ref float maxX, ref float maxY, ref float maxZ)
    {
        minX = Math.Min(minX, (float)point.X);
        minY = Math.Min(minY, (float)point.Y);
        minZ = Math.Min(minZ, (float)point.Z);
        maxX = Math.Max(maxX, (float)point.X);
        maxY = Math.Max(maxY, (float)point.Y);
        maxZ = Math.Max(maxZ, (float)point.Z);
    }

    private static void Include(Vector3 center, float radius, ref float minX, ref float minY, ref float minZ, ref float maxX, ref float maxY, ref float maxZ)
    {
        minX = Math.Min(minX, center.X - radius);
        minY = Math.Min(minY, center.Y - radius);
        minZ = Math.Min(minZ, center.Z - radius);
        maxX = Math.Max(maxX, center.X + radius);
        maxY = Math.Max(maxY, center.Y + radius);
        maxZ = Math.Max(maxZ, center.Z + radius);
    }
}
