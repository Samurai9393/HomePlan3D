using System.Text.Json;
using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using StlToFp3dPack.Services;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class StlImportSessionTests
{
    [Fact]
    public void ApplySize_SeedsOneBoundingBoxPart()
    {
        using var temp = new TempDirectory();
        string path = temp.File("object.stl");
        File.WriteAllBytes(path, TestData.AsciiStl());
        var session = new StlImportSession();

        session.LoadStl(path, UpAxis.Y);
        session.ApplySize(2);

        PackPart part = Assert.Single(session.Parts);
        Assert.Equal("box", part.Shape);
        Assert.Equal(0, part.X);
        Assert.Equal(0, part.Z);
        Assert.Equal(1, part.W);
        Assert.Equal(1, part.D);
        Assert.Equal(0, part.Y);
        Assert.Equal(1, part.H);
        Assert.Equal("body", part.Color);
    }

    [Fact]
    public void GlassLikeLook_ExportsGlassRoleWithoutOpacityFields()
    {
        StlImportSession session = TestData.SessionWithStl();
        session.Parts[0].Color = "glass";

        PackItem item = session.CreateItem();
        Assert.Equal("glass", item.Parts[0].Color);

        PackDocument pack = TestData.ValidPack();
        pack.Items.Clear();
        pack.Items.Add(item);
        string json = PackDocumentIo.Serialize(pack);

        using JsonDocument document = JsonDocument.Parse(json);
        JsonElement part = document.RootElement.GetProperty("items")[0].GetProperty("parts")[0];
        Assert.Equal("glass", part.GetProperty("color").GetString());

        foreach (JsonProperty property in part.EnumerateObject())
        {
            string name = property.Name.ToLowerInvariant();
            Assert.DoesNotContain("opacity", name);
            Assert.DoesNotContain("alpha", name);
            Assert.DoesNotContain("transparen", name);
        }
    }

    [Fact]
    public void MovePart_ReordersPartsAndCapRejectsExtraParts()
    {
        StlImportSession session = TestData.SessionWithStl();
        PackPart extra = session.AddPart("cyl");
        extra.Color = "glass";

        Assert.True(session.MovePart(extra, -1));
        Assert.Same(extra, session.Parts[0]);

        while (session.Parts.Count < PackValidator.MaxParts)
            session.AddPart("box");

        Assert.Throws<InvalidOperationException>(() => session.AddPart("box"));
        Assert.Equal(PackValidator.MaxParts, session.Parts.Count);
    }
}
