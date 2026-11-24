using System.Text.Json.Serialization;

namespace StlToFp3dPack.Models;

public enum UpAxis
{
    Y,
    Z,
}

public readonly record struct Point3(double X, double Y, double Z);

public readonly record struct Triangle(Point3 A, Point3 B, Point3 C);

public sealed record NormalizedMesh(
    IReadOnlyList<Triangle> Triangles,
    double[] SizeMetres,
    double Scale,
    double[] RawExtents)
{
    public double LongestExtentMetres => SizeMetres.Max();
}

public sealed record ValidationResult(IReadOnlyList<string> Errors)
{
    public bool IsValid => Errors.Count == 0;

    public static ValidationResult Ok() => new(Array.Empty<string>());

    public static ValidationResult Fail(IEnumerable<string> errors) => new(errors.ToArray());

    public static ValidationResult Fail(string error) => new(new[] { error });
}

public sealed class PackDocument
{
    [JsonPropertyName("format")]
    public string Format { get; set; } = "fp3dpack";

    [JsonPropertyName("version")]
    public int Version { get; set; } = 1;

    [JsonPropertyName("id")]
    public string Id { get; set; } = "stl_import_pack";

    [JsonPropertyName("name")]
    public string Name { get; set; } = "STL import pack";

    [JsonPropertyName("publisher")]
    public string Publisher { get; set; } = "local";

    [JsonPropertyName("release")]
    public int Release { get; set; } = 1;

    [JsonPropertyName("description")]
    public string Description { get; set; } = "";

    [JsonPropertyName("features")]
    public List<string> Features { get; set; } = new();

    [JsonPropertyName("module")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ModuleDefinition? Module { get; set; }

    [JsonPropertyName("items")]
    public List<PackItem> Items { get; set; } = new();
}

public sealed class ModuleDefinition
{
    [JsonPropertyName("api")]
    public int Api { get; set; } = 1;

    [JsonPropertyName("kind")]
    public string Kind { get; set; } = "voice";

    [JsonPropertyName("code")]
    public string Code { get; set; } = "";
}

public sealed class PackItem
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = "";

    [JsonPropertyName("name")]
    public Dictionary<string, string> Name { get; set; } = new() { ["en"] = "" };

    [JsonPropertyName("size")]
    public double[] Size { get; set; } = new double[3];

    [JsonPropertyName("electric")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Electric { get; set; }

    [JsonPropertyName("mount")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Mount { get; set; }

    [JsonPropertyName("wall_y")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? WallY { get; set; }

    [JsonPropertyName("surface")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Surface { get; set; }

    [JsonPropertyName("vehicle")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Vehicle { get; set; }

    [JsonPropertyName("hole")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Hole { get; set; }

    [JsonPropertyName("light")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Light { get; set; }

    [JsonPropertyName("parts")]
    public List<PackPart> Parts { get; set; } = new();

    [JsonPropertyName("symbol")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<PackSymbol>? Symbol { get; set; }

    [JsonPropertyName("group")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Group { get; set; }

    [JsonPropertyName("room")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? Room { get; set; }

    [JsonPropertyName("tags")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? Tags { get; set; }

    [JsonPropertyName("family")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Family { get; set; }

    [JsonPropertyName("variant")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, string>? Variant { get; set; }

    [JsonPropertyName("slots")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<PackSlot>? Slots { get; set; }

    public PackItem Clone() => new()
    {
        Id = Id,
        Name = Name is null ? new Dictionary<string, string>() : new Dictionary<string, string>(Name),
        Size = Size is null ? Array.Empty<double>() : (double[])Size.Clone(),
        Electric = Electric,
        Mount = Mount,
        WallY = WallY,
        Surface = Surface,
        Vehicle = Vehicle,
        Hole = Hole,
        Light = Light,
        Parts = Parts?.Select(part => part.Clone()).ToList() ?? new List<PackPart>(),
        Symbol = Symbol?.Select(symbol => symbol.Clone()).ToList(),
        Group = Group,
        Room = Room is null ? null : new List<string>(Room),
        Tags = Tags is null ? null : new List<string>(Tags),
        Family = Family,
        Variant = Variant is null ? null : new Dictionary<string, string>(Variant),
        Slots = Slots?.Select(slot => slot.Clone()).ToList(),
    };
}

public sealed class PackPart
{
    [JsonPropertyName("shape")]
    public string Shape { get; set; } = "box";

    [JsonPropertyName("x")]
    public double X { get; set; }

    [JsonPropertyName("z")]
    public double Z { get; set; }

    [JsonPropertyName("w")]
    public double W { get; set; } = 1;

    [JsonPropertyName("d")]
    public double D { get; set; } = 1;

    [JsonPropertyName("y")]
    public double Y { get; set; }

    [JsonPropertyName("h")]
    public double H { get; set; } = 1;

    [JsonPropertyName("color")]
    public string Color { get; set; } = "body";

    [JsonPropertyName("top")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Top { get; set; }

    [JsonPropertyName("finish")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Finish { get; set; }

    [JsonPropertyName("edges")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Edges { get; set; }

    [JsonPropertyName("glow")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Glow { get; set; }

    [JsonPropertyName("screen")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Screen { get; set; }

    [JsonPropertyName("tx")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Tx { get; set; }

    [JsonPropertyName("tz")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Tz { get; set; }

    [JsonPropertyName("tw")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Tw { get; set; }

    [JsonPropertyName("td")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Td { get; set; }

    [JsonPropertyName("axis")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Axis { get; set; }

    [JsonPropertyName("rot")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Rot { get; set; }

    [JsonPropertyName("fix")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Fix { get; set; }

    [JsonPropertyName("advent")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Advent { get; set; }

    [JsonPropertyName("spin")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Spin { get; set; }

    [JsonPropertyName("bind")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public PartBind? Bind { get; set; }

    public PackPart Clone() => new()
    {
        Shape = Shape,
        X = X,
        Z = Z,
        W = W,
        D = D,
        Y = Y,
        H = H,
        Color = Color,
        Top = Top,
        Finish = Finish,
        Edges = Edges,
        Glow = Glow,
        Screen = Screen,
        Tx = Tx,
        Tz = Tz,
        Tw = Tw,
        Td = Td,
        Axis = Axis,
        Rot = Rot,
        Fix = Fix,
        Advent = Advent,
        Spin = Spin,
        Bind = Bind?.Clone(),
    };
}

public sealed class PartBind
{
    [JsonPropertyName("slot")]
    public string Slot { get; set; } = "";

    [JsonPropertyName("kind")]
    public string Kind { get; set; } = "";

    [JsonPropertyName("hinge")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Hinge { get; set; }

    [JsonPropertyName("axis")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Axis { get; set; }

    [JsonPropertyName("amount")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Amount { get; set; }

    public PartBind Clone() => new()
    {
        Slot = Slot,
        Kind = Kind,
        Hinge = Hinge,
        Axis = Axis,
        Amount = Amount,
    };
}

public sealed class PackSymbol
{
    [JsonPropertyName("shape")]
    public string Shape { get; set; } = "rect";

    [JsonPropertyName("x")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? X { get; set; }

    [JsonPropertyName("z")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Z { get; set; }

    [JsonPropertyName("w")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? W { get; set; }

    [JsonPropertyName("d")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? D { get; set; }

    [JsonPropertyName("fill")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Fill { get; set; }

    [JsonPropertyName("r")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? R { get; set; }

    [JsonPropertyName("x1")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? X1 { get; set; }

    [JsonPropertyName("z1")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Z1 { get; set; }

    [JsonPropertyName("x2")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? X2 { get; set; }

    [JsonPropertyName("z2")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Z2 { get; set; }

    public PackSymbol Clone() => new()
    {
        Shape = Shape,
        X = X,
        Z = Z,
        W = W,
        D = D,
        Fill = Fill,
        R = R,
        X1 = X1,
        Z1 = Z1,
        X2 = X2,
        Z2 = Z2,
    };
}

public sealed class PackSlot
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = "";

    [JsonPropertyName("name")]
    public Dictionary<string, string> Name { get; set; } = new();

    [JsonPropertyName("domains")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? Domains { get; set; }

    public PackSlot Clone() => new()
    {
        Id = Id,
        Name = Name is null ? new Dictionary<string, string>() : new Dictionary<string, string>(Name),
        Domains = Domains is null ? null : new List<string>(Domains),
    };
}
