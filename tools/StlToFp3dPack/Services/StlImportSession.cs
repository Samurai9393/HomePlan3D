using System.Text.RegularExpressions;
using StlToFp3dPack.Io;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Services;

/// <summary>Holds one STL conversion in progress, from raw mesh to one pack item.</summary>
public sealed class StlImportSession
{
    private static readonly Regex InvalidIdChars = new("[^a-z0-9_.-]+", RegexOptions.CultureInvariant);

    public IReadOnlyList<Triangle> Triangles { get; private set; } = Array.Empty<Triangle>();

    public NormalizedMesh? Normalized { get; private set; }

    public UpAxis UpAxis { get; private set; } = UpAxis.Z;

    public double TargetLongestMetres { get; private set; }

    public string StlPath { get; private set; } = "";

    public string ItemId { get; set; } = "";

    public string ItemName { get; set; } = "";

    public List<PackPart> Parts { get; } = new();

    public bool HasMesh => Triangles.Count > 0;

    public bool HasSize => Normalized is not null;

    /// <summary>Raw axis extents in STL units, before orientation or scaling.</summary>
    public double[] RawExtents()
    {
        var min = new double[3] { double.PositiveInfinity, double.PositiveInfinity, double.PositiveInfinity };
        var max = new double[3] { double.NegativeInfinity, double.NegativeInfinity, double.NegativeInfinity };
        foreach (Triangle triangle in Triangles)
        {
            foreach (Point3 point in new[] { triangle.A, triangle.B, triangle.C })
            {
                min[0] = Math.Min(min[0], point.X);
                min[1] = Math.Min(min[1], point.Y);
                min[2] = Math.Min(min[2], point.Z);
                max[0] = Math.Max(max[0], point.X);
                max[1] = Math.Max(max[1], point.Y);
                max[2] = Math.Max(max[2], point.Z);
            }
        }
        return new double[3] { max[0] - min[0], max[1] - min[1], max[2] - min[2] };
    }

    public void LoadStl(string path, UpAxis upAxis)
    {
        Triangles = StlReader.Read(path);
        UpAxis = upAxis;
        StlPath = path;
        Normalized = null;
        TargetLongestMetres = 0;
        Parts.Clear();

        string baseName = Path.GetFileNameWithoutExtension(path);
        ItemId = SanitizeId(baseName);
        ItemName = string.IsNullOrWhiteSpace(baseName) ? "Imported object" : baseName;
    }

    public void ApplySize(double targetLongestMetres)
    {
        if (!HasMesh)
            throw new InvalidOperationException("Open an STL file first.");
        Normalized = MeshNormalizer.Normalize(Triangles, UpAxis, targetLongestMetres);
        TargetLongestMetres = targetLongestMetres;
        Parts.Clear();
        Parts.Add(MeshNormalizer.CreateBoundingBoxPart());
    }

    public PackPart AddPart(string shape)
    {
        if (!HasSize)
            throw new InvalidOperationException("Enter the target longest extent first.");
        if (Parts.Count >= PackValidator.MaxParts)
            throw new InvalidOperationException($"An item can have at most {PackValidator.MaxParts} parts.");
        if (shape is not ("box" or "cyl"))
            throw new ArgumentException("This tool creates box or cylinder parts only.", nameof(shape));

        var part = new PackPart { Shape = shape };
        Parts.Add(part);
        return part;
    }

    public void RemovePart(PackPart part)
    {
        if (!Parts.Remove(part))
            throw new InvalidOperationException("The part is not in this item.");
    }

    /// <summary>Moves a part one position toward the start (-1) or end (+1) of the parts list.</summary>
    public bool MovePart(PackPart part, int delta)
    {
        int index = Parts.IndexOf(part);
        if (index < 0)
            throw new InvalidOperationException("The part is not in this item.");
        int target = index + Math.Sign(delta);
        if (target < 0 || target >= Parts.Count)
            return false;
        Parts.RemoveAt(index);
        Parts.Insert(target, part);
        return true;
    }

    public PackPart DuplicatePart(PackPart source)
    {
        int index = Parts.IndexOf(source);
        if (index < 0)
            throw new InvalidOperationException("The part is not in this item.");
        if (Parts.Count >= PackValidator.MaxParts)
            throw new InvalidOperationException($"An item can have at most {PackValidator.MaxParts} parts.");

        var copy = new PackPart
        {
            Shape = source.Shape,
            X = source.X,
            Z = source.Z,
            W = source.W,
            D = source.D,
            Y = source.Y,
            H = source.H,
            Color = source.Color,
            Top = source.Top,
            Finish = source.Finish,
            Edges = source.Edges,
            Glow = source.Glow,
            Screen = source.Screen,
            Tx = source.Tx,
            Tz = source.Tz,
            Tw = source.Tw,
            Td = source.Td,
            Axis = source.Axis,
            Rot = source.Rot,
            Fix = source.Fix,
            Advent = source.Advent,
            Spin = source.Spin,
            Bind = source.Bind,
        };
        Parts.Insert(index + 1, copy);
        return copy;
    }

    public PackItem CreateItem()
    {
        if (!HasSize)
            throw new InvalidOperationException("Enter the target longest extent first.");
        if (Parts.Count == 0)
            throw new InvalidOperationException("The item needs at least one primitive part.");

        return new PackItem
        {
            Id = ItemId,
            Name = new Dictionary<string, string> { ["en"] = ItemName },
            Size = (double[])Normalized!.SizeMetres.Clone(),
            Parts = Parts.Select(ClonePart).ToList(),
            Symbol = new List<PackSymbol>
            {
                new() { Shape = "rect", X = 0, Z = 0, W = 1, D = 1 },
            },
        };
    }

    public ValidationResult ValidateCurrent()
    {
        if (!HasMesh)
            return ValidationResult.Fail("Open an STL file first.");
        if (!HasSize)
            return ValidationResult.Fail("Enter the target longest extent first.");
        if (Parts.Count == 0)
            return ValidationResult.Fail("The item needs at least one primitive part.");

        try
        {
            PackItem item = CreateItem();
            var pack = new PackDocument { Items = new List<PackItem> { item } };
            return PackValidator.Validate(pack);
        }
        catch (Exception ex) when (ex is InvalidOperationException or ArgumentException)
        {
            return ValidationResult.Fail(ex.Message);
        }
    }

    public static string SanitizeId(string value)
    {
        string lower = (value ?? "").ToLowerInvariant();
        string cleaned = InvalidIdChars.Replace(lower, "_").Trim('_');
        if (cleaned.Length == 0)
            cleaned = "imported";
        if (!char.IsAsciiLetterLower(cleaned[0]) && !char.IsDigit(cleaned[0]))
            cleaned = "x" + cleaned;
        return cleaned.Length <= 40 ? cleaned : cleaned.Substring(0, 40).TrimEnd('_');
    }

    private static PackPart ClonePart(PackPart source) => source.Clone();
}
