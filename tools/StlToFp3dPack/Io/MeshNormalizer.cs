using StlToFp3dPack.Models;

namespace StlToFp3dPack.Io;

/// <summary>Applies the chosen up-axis and the user's target size to an STL mesh.</summary>
public static class MeshNormalizer
{
    public const double MinDimension = 0.01;
    public const double MaxDimension = 10;

    public static NormalizedMesh Normalize(IReadOnlyList<Triangle> triangles, UpAxis upAxis, double targetLongestMetres)
    {
        if (triangles is null || triangles.Count == 0)
            throw new ArgumentException("The STL has no triangles.", nameof(triangles));
        if (!double.IsFinite(targetLongestMetres) || targetLongestMetres < MinDimension || targetLongestMetres > MaxDimension)
            throw new ArgumentOutOfRangeException(
                nameof(targetLongestMetres),
                targetLongestMetres,
                $"The target longest extent must be between {MinDimension} and {MaxDimension} metres.");

        var raw = new List<Triangle>(triangles.Count);
        foreach (var triangle in triangles)
        {
            var a = Orient(triangle.A, upAxis);
            var b = Orient(triangle.B, upAxis);
            var c = Orient(triangle.C, upAxis);
            raw.Add(new Triangle(a, b, c));
        }

        var min = new double[3] { double.PositiveInfinity, double.PositiveInfinity, double.PositiveInfinity };
        var max = new double[3] { double.NegativeInfinity, double.NegativeInfinity, double.NegativeInfinity };
        foreach (var triangle in raw)
        {
            Accumulate(triangle.A, min, max);
            Accumulate(triangle.B, min, max);
            Accumulate(triangle.C, min, max);
        }

        var rawExtents = new double[3] { max[0] - min[0], max[1] - min[1], max[2] - min[2] };
        foreach (double extent in rawExtents)
        {
            if (!double.IsFinite(extent) || extent <= 0)
                throw new InvalidDataException("The STL has a zero or invalid bounding-box extent.");
        }

        double longest = rawExtents.Max();
        double scale = targetLongestMetres / longest;
        var size = new double[3] { rawExtents[0] * scale, rawExtents[1] * scale, rawExtents[2] * scale };
        ValidateSize(size);

        var scaled = new List<Triangle>(raw.Count);
        foreach (var triangle in raw)
        {
            var a = ScalePoint(triangle.A, min, scale);
            var b = ScalePoint(triangle.B, min, scale);
            var c = ScalePoint(triangle.C, min, scale);
            scaled.Add(new Triangle(a, b, c));
        }

        return new NormalizedMesh(scaled, size, scale, rawExtents);
    }

    /// <summary>Size of a bounding box part that wraps the whole item, in item fractions.</summary>
    public static PackPart CreateBoundingBoxPart() => new()
    {
        Shape = "box",
        X = 0,
        Z = 0,
        W = 1,
        D = 1,
        Y = 0,
        H = 1,
        Color = "body",
    };

    public static void ValidateSize(IReadOnlyList<double> size)
    {
        if (size is null || size.Count != 3)
            throw new ArgumentException("An item size needs exactly three metre values.", nameof(size));
        for (int i = 0; i < 3; i++)
        {
            if (!double.IsFinite(size[i]) || size[i] < MinDimension || size[i] > MaxDimension)
                throw new ArgumentOutOfRangeException(
                    nameof(size),
                    size[i],
                    $"Derived dimension {i} is {size[i]:0.###} m; each dimension must be between {MinDimension} and {MaxDimension} m. Choose a different target longest extent.");
        }
    }

    private static Point3 Orient(Point3 point, UpAxis upAxis) =>
        upAxis == UpAxis.Z ? new Point3(point.X, point.Z, point.Y) : point;

    private static void Accumulate(Point3 point, double[] min, double[] max)
    {
        min[0] = Math.Min(min[0], point.X);
        min[1] = Math.Min(min[1], point.Y);
        min[2] = Math.Min(min[2], point.Z);
        max[0] = Math.Max(max[0], point.X);
        max[1] = Math.Max(max[1], point.Y);
        max[2] = Math.Max(max[2], point.Z);
    }

    private static Point3 ScalePoint(Point3 point, double[] min, double scale) =>
        new((point.X - min[0]) * scale, (point.Y - min[1]) * scale, (point.Z - min[2]) * scale);
}
