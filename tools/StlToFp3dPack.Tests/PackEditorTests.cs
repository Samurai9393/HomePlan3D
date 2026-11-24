using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using StlToFp3dPack.Services;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class PackEditorTests
{
    [Fact]
    public void AddItem_AppendsConvertedItemToExistingPack()
    {
        (PackEditor editor, StlImportSession session) = OpenPackWithSession(TestData.ValidPack());
        session.ItemId = "table";

        ValidationResult result = editor.AddItem(session.CreateItem());

        Assert.True(result.IsValid, string.Join(" ", result.Errors));
        Assert.Equal(2, editor.Document.Items.Count);
        Assert.Equal("chair", editor.Document.Items[0].Id);
        Assert.Equal("table", editor.Document.Items[1].Id);
    }

    [Fact]
    public void AddItem_RejectsDuplicateItemId()
    {
        (PackEditor editor, StlImportSession session) = OpenPackWithSession(TestData.ValidPack());
        session.ItemId = "chair";

        ValidationResult result = editor.AddItem(session.CreateItem());

        Assert.False(result.IsValid);
        Assert.Contains("already exists", string.Join(" ", result.Errors), StringComparison.Ordinal);
        Assert.Single(editor.Document.Items);
    }

    [Fact]
    public void RemoveItem_AllowsEmptyItemsWhenPackHasFeature()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Features.Add("weather");
        (PackEditor editor, _) = OpenPackWithSession(pack);

        ValidationResult result = editor.RemoveItem("chair");

        Assert.True(result.IsValid, string.Join(" ", result.Errors));
        Assert.Empty(editor.Document.Items);
    }

    [Fact]
    public void RemoveItem_RollsBackWhenItWouldLeaveEmptyPackWithoutContent()
    {
        (PackEditor editor, _) = OpenPackWithSession(TestData.ValidPack());

        ValidationResult result = editor.RemoveItem("chair");

        Assert.False(result.IsValid);
        Assert.Single(editor.Document.Items);
    }

    [Fact]
    public void UpdateMetadata_KeepsFormatAndVersionFixed()
    {
        (PackEditor editor, _) = OpenPackWithSession(TestData.ValidPack());

        editor.UpdateMetadata(new PackMetadataEdit(
            "edited_pack",
            "Edited pack",
            "publisher",
            2,
            "description",
            new List<string> { "weather" },
            new ModuleDefinition { Api = 1, Kind = "voice", Code = "hello" }));

        Assert.Equal("fp3dpack", editor.Document.Format);
        Assert.Equal(1, editor.Document.Version);
        Assert.Equal("edited_pack", editor.Document.Id);
        Assert.Equal("Edited pack", editor.Document.Name);
        Assert.Equal("publisher", editor.Document.Publisher);
        Assert.Equal("voice", editor.Document.Module?.Kind);
        Assert.True(editor.Validate().IsValid, string.Join(" ", editor.Validate().Errors));
    }

    private static (PackEditor Editor, StlImportSession Session) OpenPackWithSession(PackDocument pack)
    {
        using var temp = new TempDirectory();
        string path = temp.File("pack.json");
        File.WriteAllText(path, PackDocumentIo.Serialize(pack));
        var editor = new PackEditor();
        editor.OpenPack(path);
        return (editor, TestData.SessionWithStl());
    }
}
