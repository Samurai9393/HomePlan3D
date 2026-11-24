using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using StlToFp3dPack.Models;

namespace StlToFp3dPack.Io;

public static partial class StlReader
{
    private const int BinaryHeaderSize = 84;
    private const int BinaryTriangleSize = 50;

    public static IReadOnlyList<Triangle> Read(string path)
    {
        byte[] bytes;
        try
        {
            bytes = File.ReadAllBytes(path);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            throw new InvalidDataException($"Could not read STL file: {ex.Message}", ex);
        }

        return Read(bytes);
    }

    public static IReadOnlyList<Triangle> Read(byte[] bytes)
    {
        if (bytes.Length < BinaryHeaderSize)
            throw new InvalidDataException("The file is too small to be a binary STL and has no ASCII vertices.");

        uint binaryCount = ReadUInt32LittleEndian(bytes, 80);
        long expectedBinaryLength = BinaryHeaderSize + (long)binaryCount * BinaryTriangleSize;
        if (bytes.Length == expectedBinaryLength)
            return ReadBinary(bytes, binaryCount);

        return ReadAscii(bytes);
    }

    private static IReadOnlyList<Triangle> ReadBinary(byte[] bytes, uint count)
    {
        var result = new List<Triangle>(checked((int)count));
        for (uint i = 0; i < count; i++)
        {
            int offset = BinaryHeaderSize + (int)i * BinaryTriangleSize + 12;
            var a = ReadPoint(bytes, offset);
            var b = ReadPoint(bytes, offset + 12);
            var c = ReadPoint(bytes, offset + 24);
            result.Add(new Triangle(a, b, c));
        }

        if (result.Count == 0)
            throw new InvalidDataException("The binary STL contains no triangles.");
        return result;
    }

    private static IReadOnlyList<Triangle> ReadAscii(byte[] bytes)
    {
        string text = Encoding.UTF8.GetString(bytes);
        if (!text.TrimStart().StartsWith("solid", StringComparison.OrdinalIgnoreCase))
            throw new InvalidDataException("The file is neither a matching binary STL nor an ASCII STL starting with 'solid'.");

        var values = new List<double>();
        foreach (Match match in VertexRegex().Matches(text))
        {
            double x = ParseDouble(match.Groups[1].Value);
            double y = ParseDouble(match.Groups[2].Value);
            double z = ParseDouble(match.Groups[3].Value);
            values.Add(x);
            values.Add(y);
            values.Add(z);
        }

        if (values.Count == 0)
            throw new InvalidDataException("The ASCII STL contains no vertex lines.");
        if (values.Count % 9 != 0)
            throw new InvalidDataException($"The ASCII STL has {values.Count / 3} vertices, which is not a whole number of triangles.");

        var result = new List<Triangle>(values.Count / 9);
        for (int i = 0; i < values.Count; i += 9)
        {
            var a = new Point3(values[i], values[i + 1], values[i + 2]);
            var b = new Point3(values[i + 3], values[i + 4], values[i + 5]);
            var c = new Point3(values[i + 6], values[i + 7], values[i + 8]);
            EnsureFinite(a, b, c);
            result.Add(new Triangle(a, b, c));
        }

        return result;
    }

    private static Point3 ReadPoint(byte[] bytes, int offset)
    {
        var point = new Point3(
            BitConverter.ToSingle(bytes, offset),
            BitConverter.ToSingle(bytes, offset + 4),
            BitConverter.ToSingle(bytes, offset + 8));
        EnsureFinite(point);
        return point;
    }

    private static void EnsureFinite(params Point3[] points)
    {
        foreach (var point in points)
        {
            if (!double.IsFinite(point.X) || !double.IsFinite(point.Y) || !double.IsFinite(point.Z))
                throw new InvalidDataException("The STL contains a non-finite vertex coordinate.");
        }
    }

    private static double ParseDouble(string value)
    {
        if (!double.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out double parsed))
            throw new InvalidDataException($"The STL contains an invalid vertex coordinate: '{value}'.");
        return parsed;
    }

    private static uint ReadUInt32LittleEndian(byte[] bytes, int offset) =>
        (uint)(bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24));

    [GeneratedRegex(@"vertex\s+(\S+)\s+(\S+)\s+(\S+)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex VertexRegex();
}
