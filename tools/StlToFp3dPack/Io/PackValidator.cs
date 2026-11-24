using System.Text.RegularExpressions;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Io;

/// <summary>Checks a <see cref="PackDocument"/> against the fp3dpack v1 rules in packs.py.</summary>
public static class PackValidator
{
    public const int MaxPackChars = 1_000_000;
    public const int MaxItems = 200;
    public const int MaxParts = 60;

    private static readonly HashSet<string> KnownFeatures = new(StringComparer.Ordinal)
    {
        "camera_cockpit", "weather", "screens", "energy_pro", "sound", "auto_pro", "time_travel",
        "pool", "household", "frames", "fridge_smart", "fun_pets", "fun_halloween", "fun_winter",
        "room_bar", "diagnostics", "locate",
    };

    private static readonly HashSet<string> AllowedRoles = new(StringComparer.Ordinal)
    {
        "body", "fabric", "cushion", "wood", "white", "front", "metal", "dark", "glass", "plant", "pot", "accent",
    };

    private static readonly Regex IdPattern = new("^[a-z0-9][a-z0-9_.-]{0,39}$", RegexOptions.CultureInvariant);
    private static readonly Regex SlotIdPattern = new("^[a-z0-9_]{1,24}$", RegexOptions.CultureInvariant);
    private static readonly Regex DomainPattern = new("^[a-z_]{2,30}$", RegexOptions.CultureInvariant);
    private static readonly Regex HexColorPattern = new("^#[0-9a-fA-F]{6}$", RegexOptions.CultureInvariant);
    private static readonly Regex FixPattern = new("^[wdh]{1,3}$", RegexOptions.CultureInvariant);

    public static ValidationResult Validate(PackDocument pack, string? serializedJson = null)
    {
        var errors = new List<string>();
        if (pack is null)
            return ValidationResult.Fail("The pack is missing.");

        if (!string.Equals(pack.Format, "fp3dpack", StringComparison.Ordinal))
            errors.Add("format must be 'fp3dpack'.");
        if (pack.Version != 1)
            errors.Add("version must be 1.");
        CheckId(pack.Id, "pack id", errors);
        CheckText(pack.Name, "pack name", errors);
        CheckText(pack.Publisher, "publisher", errors);
        if (pack.Release < 1 || pack.Release > 100000)
            errors.Add("release must be between 1 and 100000.");
        if (pack.Description is null || pack.Description.Length > 400)
            errors.Add("description must be at most 400 characters.");

        CheckFeatures(pack.Features, errors);
        CheckModule(pack.Module, errors);

        if (pack.Items is null)
            errors.Add("items must be a list.");
        else
        {
            if (pack.Items.Count > MaxItems)
                errors.Add($"items has {pack.Items.Count} entries; the maximum is {MaxItems}.");
            var ids = new HashSet<string>(StringComparer.Ordinal);
            for (int i = 0; i < pack.Items.Count; i++)
                ValidateItem(pack.Items[i], i, ids, errors);
        }

        bool hasContent = (pack.Items?.Count ?? 0) > 0 || (pack.Features?.Count ?? 0) > 0 || pack.Module is not null;
        if (!hasContent)
            errors.Add("A pack needs at least one item, one feature or a module.");

        if (serializedJson is not null && serializedJson.Length > MaxPackChars)
            errors.Add($"The pack JSON has {serializedJson.Length:N0} characters; the maximum is {MaxPackChars:N0}.");

        return ValidationResult.Fail(errors);
    }

    public static bool IsValidColor(string? color) =>
        color is not null && (HexColorPattern.IsMatch(color) || AllowedRoles.Contains(color));

    public static bool IsValidId(string? id) => id is not null && IdPattern.IsMatch(id);

    private static void CheckFeatures(List<string>? features, List<string> errors)
    {
        if (features is null)
        {
            errors.Add("features must be a list.");
            return;
        }
        if (features.Count > 10)
            errors.Add("features has more than 10 entries.");
        for (int i = 0; i < features.Count; i++)
        {
            if (features[i] is null || !KnownFeatures.Contains(features[i]))
                errors.Add($"features[{i}] ('{features[i]}') is not known by this HomePlan 3D version.");
        }
        if (features.Count != features.Distinct(StringComparer.Ordinal).Count())
            errors.Add("features contains duplicate entries.");
    }

    private static void CheckModule(ModuleDefinition? module, List<string> errors)
    {
        if (module is null)
            return;
        if (module.Api != 1)
            errors.Add("module.api must be 1.");
        if (module.Kind != "voice" && module.Kind != "stage")
            errors.Add("module.kind must be 'voice' or 'stage'.");
        if (module.Code is null || module.Code.Length is < 1 or > 400_000)
            errors.Add("module.code must be between 1 and 400000 characters.");
    }

    private static void ValidateItem(PackItem? item, int index, HashSet<string> ids, List<string> errors)
    {
        string where = $"items[{index}]";
        if (item is null)
        {
            errors.Add($"{where} is missing.");
            return;
        }

        CheckId(item.Id, $"{where}.id", errors);
        if (!string.IsNullOrEmpty(item.Id) && !ids.Add(item.Id))
            errors.Add($"Duplicate item id '{item.Id}'.");
        CheckLanguageMap(item.Name, $"{where}.name", errors, 1, 10);
        CheckSize(item.Size, $"{where}.size", errors);

        if (item.Mount is not null && item.Mount is not ("floor" or "surface" or "wall" or "ceiling"))
            errors.Add($"{where}.mount must be floor, surface, wall or ceiling.");
        if (item.WallY is double wallY && (wallY < 0 || wallY > 3))
            errors.Add($"{where}.wall_y must be between 0 and 3.");
        if (item.Light is not null && !IsLight(item.Light))
            errors.Add($"{where}.light is not a known light kind.");

        if (item.Parts is null)
            errors.Add($"{where}.parts must be a list.");
        else
        {
            if (item.Parts.Count is < 1 or > MaxParts)
                errors.Add($"{where}.parts has {item.Parts.Count} entries; the allowed range is 1..{MaxParts}.");
            for (int p = 0; p < item.Parts.Count; p++)
                ValidatePart(item.Parts[p], $"{where}.parts[{p}]", errors);
        }

        if (item.Symbol is not null)
        {
            if (item.Symbol.Count > 40)
                errors.Add($"{where}.symbol has more than 40 entries.");
            for (int s = 0; s < item.Symbol.Count; s++)
                ValidateSymbol(item.Symbol[s], $"{where}.symbol[{s}]", errors);
        }

        if (item.Group is not null && !IsValidId(item.Group))
            errors.Add($"{where}.group is not a valid id.");
        if (item.Family is not null && !IsValidId(item.Family))
            errors.Add($"{where}.family is not a valid id.");
        CheckIdList(item.Room, $"{where}.room", errors, 12);
        CheckTagList(item.Tags, $"{where}.tags", errors, 12);
        if (item.Variant is not null)
            CheckLanguageMap(item.Variant, $"{where}.variant", errors, 1, 10);
        CheckSlots(item.Slots, $"{where}.slots", errors);
    }

    private static void ValidatePart(PackPart? part, string where, List<string> errors)
    {
        if (part is null)
        {
            errors.Add($"{where} is missing.");
            return;
        }
        if (part.Shape is not ("box" or "cyl" or "loft"))
            errors.Add($"{where}.shape must be box, cyl or loft.");
        CheckFraction(part.X, $"{where}.x", errors);
        CheckFraction(part.Z, $"{where}.z", errors);
        CheckSpan(part.W, $"{where}.w", errors);
        CheckSpan(part.D, $"{where}.d", errors);
        CheckLevel(part.Y, $"{where}.y", errors);
        CheckSpan(part.H, $"{where}.h", errors);
        if (!IsValidColor(part.Color))
            errors.Add($"{where}.color must be #rrggbb or a known palette role.");
        if (part.Top is not null && !IsValidColor(part.Top))
            errors.Add($"{where}.top must be #rrggbb or a known palette role.");
        if (part.Finish is not null && part.Finish is not ("wood" or "fabric" or "front" or "body"))
            errors.Add($"{where}.finish must be wood, fabric, front or body.");
        if (part.Tx is not null)
            CheckFraction(part.Tx.Value, $"{where}.tx", errors);
        if (part.Tz is not null)
            CheckFraction(part.Tz.Value, $"{where}.tz", errors);
        if (part.Tw is not null)
            CheckSpan(part.Tw.Value, $"{where}.tw", errors);
        if (part.Td is not null)
            CheckSpan(part.Td.Value, $"{where}.td", errors);
        if (part.Axis is not null && part.Axis is not ("x" or "y" or "z"))
            errors.Add($"{where}.axis must be x, y or z.");
        if (part.Rot is double rot && (rot < -360 || rot > 360))
            errors.Add($"{where}.rot must be between -360 and 360.");
        if (part.Fix is not null && !FixPattern.IsMatch(part.Fix))
            errors.Add($"{where}.fix must contain only w, d and h.");
        if (part.Advent is int advent && (advent < 1 || advent > 4))
            errors.Add($"{where}.advent must be between 1 and 4.");
        if (part.Spin is not null && part.Spin is not ("y" or "z"))
            errors.Add($"{where}.spin must be y or z.");
        if (part.Bind is not null)
            ValidateBind(part.Bind, $"{where}.bind", errors);
    }

    private static void ValidateBind(PartBind bind, string where, List<string> errors)
    {
        if (!SlotIdPattern.IsMatch(bind.Slot))
            errors.Add($"{where}.slot is not a valid slot id.");
        if (bind.Kind is not ("open" or "slide" or "spin" or "level" or "blink" or "glow"))
            errors.Add($"{where}.kind is not a known bind kind.");
        if (bind.Hinge is not null && bind.Hinge is not ("left" or "right" or "top" or "bottom"))
            errors.Add($"{where}.hinge is not valid.");
        if (bind.Axis is not null && bind.Axis is not ("x" or "y" or "z"))
            errors.Add($"{where}.axis must be x, y or z.");
        if (bind.Amount is double amount && (amount < 0 || amount > 180))
            errors.Add($"{where}.amount must be between 0 and 180.");
    }

    private static void ValidateSymbol(PackSymbol? symbol, string where, List<string> errors)
    {
        if (symbol is null)
        {
            errors.Add($"{where} is missing.");
            return;
        }
        switch (symbol.Shape)
        {
            case "rect":
                CheckFraction(symbol.X, $"{where}.x", errors);
                CheckFraction(symbol.Z, $"{where}.z", errors);
                CheckSpan(symbol.W, $"{where}.w", errors);
                CheckSpan(symbol.D, $"{where}.d", errors);
                break;
            case "circle":
                CheckFraction(symbol.X, $"{where}.x", errors);
                CheckFraction(symbol.Z, $"{where}.z", errors);
                CheckSpan(symbol.R, $"{where}.r", errors);
                break;
            case "line":
                CheckFraction(symbol.X1, $"{where}.x1", errors);
                CheckFraction(symbol.Z1, $"{where}.z1", errors);
                CheckFraction(symbol.X2, $"{where}.x2", errors);
                CheckFraction(symbol.Z2, $"{where}.z2", errors);
                break;
            default:
                errors.Add($"{where}.shape must be rect, circle or line.");
                break;
        }
    }

    private static void CheckSlots(List<PackSlot>? slots, string where, List<string> errors)
    {
        if (slots is null)
            return;
        if (slots.Count > 8)
            errors.Add($"{where} has more than 8 entries.");
        for (int i = 0; i < slots.Count; i++)
        {
            var slot = slots[i];
            string at = $"{where}[{i}]";
            if (slot is null)
            {
                errors.Add($"{at} is missing.");
                continue;
            }
            if (!SlotIdPattern.IsMatch(slot.Id))
                errors.Add($"{at}.id is not a valid slot id.");
            CheckLanguageMap(slot.Name, $"{at}.name", errors, 1, 24);
            if (slot.Domains is not null)
            {
                if (slot.Domains.Count > 8)
                    errors.Add($"{at}.domains has more than 8 entries.");
                foreach (string domain in slot.Domains)
                {
                    if (!DomainPattern.IsMatch(domain))
                        errors.Add($"{at}.domains contains an invalid domain: '{domain}'.");
                }
            }
        }
    }

    private static void CheckSize(double[]? size, string where, List<string> errors)
    {
        if (size is null || size.Length != 3)
        {
            errors.Add($"{where} must have exactly three metre values.");
            return;
        }
        for (int i = 0; i < 3; i++)
        {
            if (!double.IsFinite(size[i]) || size[i] < MeshNormalizer.MinDimension || size[i] > MeshNormalizer.MaxDimension)
                errors.Add($"{where}[{i}] must be between {MeshNormalizer.MinDimension} and {MeshNormalizer.MaxDimension} metres.");
        }
    }

    private static void CheckLanguageMap(Dictionary<string, string>? map, string where, List<string> errors, int min, int max)
    {
        if (map is null)
        {
            errors.Add($"{where} must be a language map.");
            return;
        }
        if (map.Count < min || map.Count > max)
            errors.Add($"{where} must have between {min} and {max} languages.");
        foreach (var pair in map)
        {
            if (pair.Key.Length is < 2 or > 5)
                errors.Add($"{where} has an invalid language key '{pair.Key}'.");
            CheckText(pair.Value, $"{where}['{pair.Key}']", errors);
        }
    }

    private static void CheckText(string? value, string where, List<string> errors)
    {
        if (value is null || value.Length is < 1 or > 80)
            errors.Add($"{where} must be between 1 and 80 characters.");
    }

    private static void CheckId(string? value, string where, List<string> errors)
    {
        if (!IsValidId(value))
            errors.Add($"{where} must match ^[a-z0-9][a-z0-9_.-]{{0,39}}$.");
    }

    private static void CheckIdList(List<string>? values, string where, List<string> errors, int max)
    {
        if (values is null)
            return;
        if (values.Count > max)
            errors.Add($"{where} has more than {max} entries.");
        foreach (string value in values)
        {
            if (!IsValidId(value))
                errors.Add($"{where} contains an invalid id: '{value}'.");
        }
    }

    private static void CheckTagList(List<string>? values, string where, List<string> errors, int max)
    {
        if (values is null)
            return;
        if (values.Count > max)
            errors.Add($"{where} has more than {max} entries.");
        foreach (string value in values)
        {
            if (value is null || value.Length is < 1 or > 30)
                errors.Add($"{where} contains a tag outside 1..30 characters.");
        }
    }

    private static void CheckFraction(double? value, string where, List<string> errors)
    {
        if (value is null || !double.IsFinite(value.Value) || value.Value < -0.5 || value.Value > 0.5)
            errors.Add($"{where} must be between -0.5 and 0.5.");
    }

    private static void CheckSpan(double? value, string where, List<string> errors)
    {
        if (value is null || !double.IsFinite(value.Value) || value.Value < 0.001 || value.Value > 1)
            errors.Add($"{where} must be between 0.001 and 1.");
    }

    private static void CheckLevel(double? value, string where, List<string> errors)
    {
        if (value is null || !double.IsFinite(value.Value) || value.Value < 0 || value.Value > 1)
            errors.Add($"{where} must be between 0 and 1.");
    }

    private static bool IsLight(string value) => value is
        "ceiling" or "downlight" or "spot" or "panel" or "pendant" or "floor" or "uplight" or
        "table" or "wall" or "strip" or "bollard" or "garden";
}
