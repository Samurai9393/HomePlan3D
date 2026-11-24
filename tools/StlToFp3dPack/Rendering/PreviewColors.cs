using System.Globalization;

namespace StlToFp3dPack.Rendering;

/// <summary>Lightweight RGBA value used by the preview; no OpenGL types or context required.</summary>
public readonly record struct PreviewColor(float R, float G, float B, float A)
{
    public static PreviewColor FromHex(string value)
    {
        string hex = value.Trim().TrimStart('#');
        if (hex.Length != 6)
            throw new FormatException($"Color '{value}' is not a six-digit hex color.");
        int packed = int.Parse(hex, NumberStyles.HexNumber, CultureInfo.InvariantCulture);
        return new PreviewColor(
            ((packed >> 16) & 0xff) / 255f,
            ((packed >> 8) & 0xff) / 255f,
            (packed & 0xff) / 255f,
            1f);
    }
}

/// <summary>Preview shades for palette roles. These are viewer hints, not exported values.</summary>
public static class PreviewPalette
{
    private static readonly Dictionary<string, PreviewColor> Roles = new(StringComparer.Ordinal)
    {
        ["body"] = new PreviewColor(0.72f, 0.76f, 0.82f, 1f),
        ["fabric"] = new PreviewColor(0.42f, 0.66f, 0.74f, 1f),
        ["cushion"] = new PreviewColor(0.55f, 0.72f, 0.80f, 1f),
        ["wood"] = new PreviewColor(0.62f, 0.43f, 0.27f, 1f),
        ["white"] = new PreviewColor(0.92f, 0.93f, 0.94f, 1f),
        ["front"] = new PreviewColor(0.84f, 0.86f, 0.88f, 1f),
        ["metal"] = new PreviewColor(0.55f, 0.58f, 0.63f, 1f),
        ["dark"] = new PreviewColor(0.18f, 0.21f, 0.27f, 1f),
        ["glass"] = new PreviewColor(0.62f, 0.88f, 1.00f, 0.72f),
        ["plant"] = new PreviewColor(0.33f, 0.63f, 0.35f, 1f),
        ["pot"] = new PreviewColor(0.70f, 0.47f, 0.36f, 1f),
        ["accent"] = new PreviewColor(0.95f, 0.66f, 0.25f, 1f),
    };

    public static PreviewColor Resolve(string color)
    {
        if (string.IsNullOrWhiteSpace(color))
            return Roles["body"];
        return Roles.TryGetValue(color.Trim(), out PreviewColor found) ? found : PreviewColor.FromHex(color);
    }

    public static bool IsGlass(string color) => string.Equals(color?.Trim(), "glass", StringComparison.Ordinal);
}
