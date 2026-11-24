using StlToFp3dPack.Io;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Services;

public sealed record PackMetadataEdit(
    string Id,
    string Name,
    string Publisher,
    int Release,
    string Description,
    List<string> Features,
    ModuleDefinition? Module);

/// <summary>Item fields exposed by the editor; unexposed item and part fields are preserved.</summary>
public sealed record PackItemEdit(
    string Id,
    string Name,
    double[] Size,
    string? Group,
    List<string>? Room,
    List<string>? Tags,
    bool Electric,
    string Mount,
    double WallY,
    bool Surface,
    bool Vehicle,
    bool Hole,
    string? Light);

/// <summary>Owns the pack being edited and all item-level changes.</summary>
public sealed class PackEditor
{
    public PackDocument Document { get; private set; } = NewDocument();

    public string? SourcePath { get; private set; }

    public void NewPack()
    {
        Document = NewDocument();
        SourcePath = null;
    }

    public void OpenPack(string path)
    {
        Document = PackDocumentIo.Read(path);
        SourcePath = path;
    }

    public ValidationResult Validate()
    {
        string json = PackDocumentIo.SerializeWithoutValidation(Document);
        return PackValidator.Validate(Document, json);
    }

    public void UpdateMetadata(PackMetadataEdit edit)
    {
        Document.Id = edit.Id;
        Document.Name = edit.Name;
        Document.Publisher = edit.Publisher;
        Document.Release = edit.Release;
        Document.Description = edit.Description;
        Document.Features = edit.Features;
        Document.Module = edit.Module;
    }

    public ValidationResult AddItem(PackItem item)
    {
        var errors = new List<string>();
        if (Document.Items.Any(existing => string.Equals(existing.Id, item.Id, StringComparison.Ordinal)))
            errors.Add($"An item with id '{item.Id}' already exists in this pack.");
        if (Document.Items.Count >= PackValidator.MaxItems)
            errors.Add($"The pack already has {PackValidator.MaxItems} items.");
        if (errors.Count > 0)
            return ValidationResult.Fail(errors);

        Document.Items.Add(item);
        var result = Validate();
        if (!result.IsValid)
            Document.Items.RemoveAt(Document.Items.Count - 1);
        return result;
    }

    public ValidationResult RemoveItem(string itemId)
    {
        int index = Document.Items.FindIndex(item => string.Equals(item.Id, itemId, StringComparison.Ordinal));
        if (index < 0)
            return ValidationResult.Fail($"No item with id '{itemId}' is in the pack.");
        PackItem removed = Document.Items[index];
        Document.Items.RemoveAt(index);
        var result = Validate();
        if (!result.IsValid)
            Document.Items.Insert(index, removed);
        return result;
    }

    public ValidationResult UpdateItem(string itemId, PackItemEdit edit)
    {
        int index = Document.Items.FindIndex(item => string.Equals(item.Id, itemId, StringComparison.Ordinal));
        if (index < 0)
            return ValidationResult.Fail($"No item with id '{itemId}' is in the pack.");
        for (int i = 0; i < Document.Items.Count; i++)
        {
            if (i != index && string.Equals(Document.Items[i].Id, edit.Id, StringComparison.Ordinal))
                return ValidationResult.Fail($"An item with id '{edit.Id}' already exists in this pack.");
        }

        PackItem original = Document.Items[index];
        PackItem updated = original.Clone();
        ApplyItemEdit(updated, edit);
        Document.Items[index] = updated;
        ValidationResult result = Validate();
        if (!result.IsValid)
            Document.Items[index] = original;
        return result;
    }

    private static void ApplyItemEdit(PackItem item, PackItemEdit edit)
    {
        item.Id = edit.Id;
        item.Name ??= new Dictionary<string, string>();
        item.Name["en"] = edit.Name;
        item.Size = (double[])edit.Size.Clone();
        item.Group = string.IsNullOrWhiteSpace(edit.Group) ? null : edit.Group.Trim();
        item.Room = edit.Room is null || edit.Room.Count == 0 ? null : new List<string>(edit.Room);
        item.Tags = edit.Tags is null || edit.Tags.Count == 0 ? null : new List<string>(edit.Tags);
        item.Electric = edit.Electric;
        item.Mount = string.IsNullOrWhiteSpace(edit.Mount) ? "floor" : edit.Mount.Trim();
        item.WallY = edit.WallY;
        item.Surface = edit.Surface;
        item.Vehicle = edit.Vehicle;
        item.Hole = edit.Hole;
        item.Light = string.IsNullOrWhiteSpace(edit.Light) ? null : edit.Light.Trim();
    }

    public void SaveAs(string path) => Save(path, overwrite: false);

    public void Overwrite() => Save(SourcePath ?? throw new InvalidOperationException("No pack file is open."), overwrite: true);

    private void Save(string path, bool overwrite)
    {
        PackDocumentIo.Write(path, Document, overwrite);
        SourcePath = path;
    }

    private static PackDocument NewDocument() => new()
    {
        Format = "fp3dpack",
        Version = 1,
        Id = "stl_import_pack",
        Name = "STL import pack",
        Publisher = "local",
        Release = 1,
        Description = "",
        Features = new List<string>(),
        Items = new List<PackItem>(),
    };
}
