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
