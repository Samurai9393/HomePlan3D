using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Io;

public static class PackDocumentIo
{
    private static readonly JsonSerializerOptions ReadOptions = new()
    {
        PropertyNameCaseInsensitive = false,
    };

    private static readonly JsonSerializerOptions WriteOptions = new()
    {
        WriteIndented = true,
        DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
    };

    public static PackDocument Read(string path)
    {
        string text;
        try
        {
            text = File.ReadAllText(path, Encoding.UTF8);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            throw new InvalidDataException($"Could not read pack file: {ex.Message}", ex);
        }

        if (text.Length > PackValidator.MaxPackChars)
            throw new InvalidDataException($"The pack file has {text.Length:N0} characters; the maximum is {PackValidator.MaxPackChars:N0}.");

        JsonDocument root;
        try
        {
            root = JsonDocument.Parse(text);
        }
        catch (JsonException ex)
        {
            throw new InvalidDataException("The file is not JSON.", ex);
        }

        using (root)
        {
            JsonElement payload = root.RootElement;
            if (payload.ValueKind != JsonValueKind.Object)
                throw new InvalidDataException("The JSON root must be an object.");
            if (payload.TryGetProperty("payload", out JsonElement inner) && inner.ValueKind == JsonValueKind.Object)
                payload = inner;
            if (!payload.TryGetProperty("format", out JsonElement format) || format.ValueKind != JsonValueKind.String || format.GetString() != "fp3dpack")
                throw new InvalidDataException("The file is not an fp3dpack payload.");

            JsonNode? node = JsonNode.Parse(payload.GetRawText());
            if (node is JsonObject obj)
            {
                obj.Remove("licensee");
                obj.Remove("instance");
                obj.Remove("payload");
                obj.Remove("signature");
            }

            PackDocument? pack;
            try
            {
                pack = node?.Deserialize<PackDocument>(ReadOptions);
            }
            catch (JsonException ex)
            {
                throw new InvalidDataException($"The pack has invalid fields: {ex.Message}", ex);
            }

            if (pack is null)
                throw new InvalidDataException("The pack payload could not be read.");
            var validation = PackValidator.Validate(pack, text);
            if (!validation.IsValid)
                throw new InvalidDataException("The pack is not valid: " + string.Join(" ", validation.Errors));
            return pack;
        }
    }

    public static string Serialize(PackDocument pack)
    {
        var validation = PackValidator.Validate(pack);
        if (!validation.IsValid)
            throw new InvalidDataException("The pack is not valid: " + string.Join(" ", validation.Errors));
        return SerializeWithoutValidation(pack);
    }

    /// <summary>Serializes for size checks and diagnostics without running schema validation first.</summary>
    public static string SerializeWithoutValidation(PackDocument pack) => JsonSerializer.Serialize(pack, WriteOptions);

    public static void Write(string path, PackDocument pack, bool overwrite)
    {
        string json = Serialize(pack);
        var validation = PackValidator.Validate(pack, json);
        if (!validation.IsValid)
            throw new InvalidDataException("The pack is not valid: " + string.Join(" ", validation.Errors));

        if (!overwrite && File.Exists(path))
            throw new IOException($"The file already exists: {path}. Choose a different name or confirm overwrite.");

        try
        {
            File.WriteAllText(path, json, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            throw new IOException($"Could not write pack file: {ex.Message}", ex);
        }
    }
}
