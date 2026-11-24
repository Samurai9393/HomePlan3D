using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using StlToFp3dPack.Services;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class PackEditorUpdateTests
{
    [Fact]
    public void UpdateItem_AppliesExposedFieldsAndPreservesUnexposedData()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Items[0].Variant = new Dictionary<string, string> { ["en"] = "small" };
        pack.Items[0].Parts[0].Glow = true;
        pack.Items[0].Parts[0].Tx = 0.1;
        PackEditor editor = Open(pack);

        PackItemEdit edit = TestData.EditFor(pack.Items[0], "armchair") with
        {
            Name = "Armchair",
            Size = new[] { 0.6, 0.7, 0.9 },
            Group = "seating",
            Room = new List<string> { "living" },
            Tags = new List<string> { "chair" },
            Electric = true,
            Mount = "surface",
            WallY = 1.5,
            Surface = true,
            Vehicle = true,
            Hole = true,
            Light = "table",
        };

        ValidationResult result = editor.UpdateItem("chair", edit);

        Assert.True(result.IsValid, string.Join(" ", result.Errors));
        PackItem updated = editor.Document.Items[0];
        Assert.Equal("armchair", updated.Id);
        Assert.Equal("Armchair", updated.Name["en"]);
        Assert.Equal(new[] { 0.6, 0.7, 0.9 }, updated.Size);
        Assert.Equal("seating", updated.Group);
        Assert.Equal(new[] { "living" }, updated.Room);
        Assert.Equal(new[] { "chair" }, updated.Tags);
        Assert.True(updated.Electric);
        Assert.Equal("surface", updated.Mount);
        Assert.Equal(1.5, updated.WallY);
        Assert.True(updated.Surface);
        Assert.True(updated.Vehicle);
        Assert.True(updated.Hole);
        Assert.Equal("table", updated.Light);
        Assert.Equal("small", updated.Variant?["en"]);
        Assert.True(updated.Parts[0].Glow);
        Assert.Equal(0.1, updated.Parts[0].Tx);
    }

    [Fact]
    public void UpdateItem_RejectsDuplicateIdWithoutMutatingPack()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Items.Add(TestData.ValidItem("table"));
        PackEditor editor = Open(pack);

        ValidationResult result = editor.UpdateItem("chair", TestData.EditFor(pack.Items[0], "table"));

        Assert.False(result.IsValid);
        Assert.Contains("already exists", string.Join(" ", result.Errors), StringComparison.Ordinal);
        Assert.Equal("chair", editor.Document.Items[0].Id);
        Assert.Equal("table", editor.Document.Items[1].Id);
    }

    [Fact]
    public void UpdateItem_FailsForMissingItemId()
    {
        PackEditor editor = Open(TestData.ValidPack());

        ValidationResult result = editor.UpdateItem("missing", TestData.EditFor(editor.Document.Items[0]));

        Assert.False(result.IsValid);
        Assert.Contains("No item with id 'missing'", string.Join(" ", result.Errors), StringComparison.Ordinal);
        Assert.Single(editor.Document.Items);
    }

    [Fact]
    public void UpdateItem_RollsBackInvalidSize()
    {
        PackEditor editor = Open(TestData.ValidPack());
        PackItemEdit edit = TestData.EditFor(editor.Document.Items[0]) with { Size = new[] { 0, 0.8, 0.5 } };

        ValidationResult result = editor.UpdateItem("chair", edit);

        Assert.False(result.IsValid);
        Assert.Contains("size[0]", string.Join(" ", result.Errors), StringComparison.Ordinal);
        Assert.Equal(0.5, editor.Document.Items[0].Size[0]);
    }

    [Fact]
    public void UpdateItem_SurvivesSaveAndReopen()
    {
        using var temp = new TempDirectory();
        string path = temp.File("pack.json");
        File.WriteAllText(path, PackDocumentIo.Serialize(TestData.ValidPack()));
        var editor = new PackEditor();
        editor.OpenPack(path);

        PackItemEdit edit = TestData.EditFor(editor.Document.Items[0]) with { Name = "Renamed chair" };
        Assert.True(editor.UpdateItem("chair", edit).IsValid);
        editor.Overwrite();

        var reopened = new PackEditor();
        reopened.OpenPack(path);
        Assert.Equal("Renamed chair", reopened.Document.Items[0].Name["en"]);
    }

    private static PackEditor Open(PackDocument pack)
    {
        using var temp = new TempDirectory();
        string path = temp.File("pack.json");
        File.WriteAllText(path, PackDocumentIo.Serialize(pack));
        var editor = new PackEditor();
        editor.OpenPack(path);
        return editor;
    }
}
