using System.Text.Json;
using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class PackDocumentIoTests
{
    [Fact]
    public void Read_LoadsValidExistingPack()
    {
        using var temp = new TempDirectory();
        string path = temp.File("pack.json");
        File.WriteAllText(path, PackDocumentIo.Serialize(TestData.ValidPack()));

        PackDocument pack = PackDocumentIo.Read(path);

        Assert.Equal("test_pack", pack.Id);
        Assert.Equal("Test pack", pack.Name);
        Assert.Single(pack.Items);
        Assert.Equal("chair", pack.Items[0].Id);
    }

    [Fact]
    public void Read_LoadsEnvelopePayloadAndStripsLegacyFields()
    {
        using var temp = new TempDirectory();
        string path = temp.File("envelope.json");
        string payload = PackDocumentIo.Serialize(TestData.ValidPack());
        using (JsonDocument parsed = JsonDocument.Parse(payload))
        {
            string envelope =
                "{\"payload\":" + parsed.RootElement.GetRawText() +
                ",\"licensee\":\"local\",\"instance\":\"test\",\"signature\":\"none\"}";
            File.WriteAllText(path, envelope);
        }

        PackDocument pack = PackDocumentIo.Read(path);

        Assert.Equal("fp3dpack", pack.Format);
        Assert.Equal(1, pack.Version);
        Assert.Equal("chair", Assert.Single(pack.Items).Id);
    }

    [Fact]
    public void Read_RejectsPackOverCharacterLimit()
    {
        using var temp = new TempDirectory();
        string path = temp.File("too-large.json");
        string padded = PackDocumentIo.Serialize(TestData.ValidPack()) + new string(' ', PackValidator.MaxPackChars);
        File.WriteAllText(path, padded);

        InvalidDataException error = Assert.Throws<InvalidDataException>(() => PackDocumentIo.Read(path));

        Assert.Contains("characters", error.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Serialize_WritesRequiredJsonFields()
    {
        string json = PackDocumentIo.Serialize(TestData.ValidPack());

        using JsonDocument document = JsonDocument.Parse(json);
        JsonElement root = document.RootElement;

        Assert.Equal("fp3dpack", root.GetProperty("format").GetString());
        Assert.Equal(1, root.GetProperty("version").GetInt32());
        Assert.Equal("test_pack", root.GetProperty("id").GetString());
        Assert.True(root.TryGetProperty("name", out _));
        Assert.True(root.TryGetProperty("publisher", out _));

        JsonElement item = root.GetProperty("items")[0];
        Assert.Equal("chair", item.GetProperty("id").GetString());
        Assert.True(item.TryGetProperty("name", out _));
        Assert.Equal(3, item.GetProperty("size").GetArrayLength());

        JsonElement part = item.GetProperty("parts")[0];
        foreach (string field in new[] { "shape", "x", "z", "w", "d", "y", "h", "color" })
            Assert.True(part.TryGetProperty(field, out _), $"Missing part field: {field}");

        Assert.False(root.TryGetProperty("licensee", out _));
        Assert.False(root.TryGetProperty("instance", out _));
        Assert.False(root.TryGetProperty("signature", out _));
    }
}
