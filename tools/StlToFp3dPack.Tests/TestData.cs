using System.Text;
using StlToFp3dPack.Models;
using StlToFp3dPack.Services;

namespace StlToFp3dPack.Tests;

internal static class TestData
{
    public static IReadOnlyList<Triangle> Triangle => new[]
    {
        new Triangle(new Point3(0, 0, 0), new Point3(4, 0, 0), new Point3(0, 2, 3)),
    };

    public static PackDocument ValidPack()
    {
        var pack = new PackDocument
        {
            Id = "test_pack",
            Name = "Test pack",
            Publisher = "local",
            Release = 1,
            Description = "",
            Features = new List<string>(),
            Items = new List<PackItem>(),
        };
        pack.Items.Add(ValidItem("chair"));
        return pack;
    }

    public static PackItem ValidItem(string id) => new()
    {
        Id = id,
        Name = new Dictionary<string, string> { ["en"] = "Chair" },
        Size = new double[] { 0.5, 0.8, 0.5 },
        Parts = new List<PackPart> { new() },
        Symbol = new List<PackSymbol>
        {
            new() { Shape = "rect", X = 0, Z = 0, W = 1, D = 1 },
        },
    };

    public static PackItemEdit EditFor(PackItem item, string? id = null) => new(
        id ?? item.Id,
        item.Name.GetValueOrDefault("en", ""),
        (double[])item.Size.Clone(),
        item.Group,
        item.Room is null ? null : new List<string>(item.Room),
        item.Tags is null ? null : new List<string>(item.Tags),
        item.Electric ?? false,
        item.Mount ?? "floor",
        item.WallY ?? 1,
        item.Surface ?? false,
        item.Vehicle ?? false,
        item.Hole ?? false,
        item.Light);

    public static byte[] AsciiStl() => Encoding.UTF8.GetBytes(
        "solid test\n" +
        "facet normal 0 0 0\n" +
        "outer loop\n" +
        "vertex 0 0 0\n" +
        "vertex 4 0 0\n" +
        "vertex 0 2 3\n" +
        "endloop\n" +
        "endfacet\n" +
        "facet normal 0 0 0\n" +
        "outer loop\n" +
        "vertex 1 1 1\n" +
        "vertex 2 1 1\n" +
        "vertex 1 3 1\n" +
        "endloop\n" +
        "endfacet\n" +
        "endsolid test\n");

    public static byte[] BinaryStl(uint declaredCount, int actualTriangles)
    {
        using var stream = new MemoryStream();
        stream.Write(new byte[80]);
        stream.Write(BitConverter.GetBytes(declaredCount));

        for (int i = 0; i < actualTriangles; i++)
        {
            stream.Write(new byte[12]); // normal
            WriteFloat(stream, 0f);
            WriteFloat(stream, 0f);
            WriteFloat(stream, 0f);
            WriteFloat(stream, 4f);
            WriteFloat(stream, 0f);
            WriteFloat(stream, 0f);
            WriteFloat(stream, 0f);
            WriteFloat(stream, 2f);
            WriteFloat(stream, 3f);
            stream.Write(BitConverter.GetBytes((ushort)0)); // attribute byte count
        }

        return stream.ToArray();
    }

    public static StlImportSession SessionWithStl()
    {
        using var temp = new TempDirectory();
        string path = temp.File("object.stl");
        File.WriteAllBytes(path, AsciiStl());
        var session = new StlImportSession();
        session.LoadStl(path, UpAxis.Y);
        session.ApplySize(2);
        return session;
    }

    private static void WriteFloat(Stream stream, float value) => stream.Write(BitConverter.GetBytes(value));
}

internal sealed class TempDirectory : IDisposable
{
    public string Root { get; } = Path.Combine(
        Path.GetTempPath(),
        "stlpack-tests-" + Guid.NewGuid().ToString("N"));

    public TempDirectory() => Directory.CreateDirectory(Root);

    public string File(string name) => Path.Combine(Root, name);

    public void Dispose()
    {
        try
        {
            Directory.Delete(Root, recursive: true);
        }
        catch (IOException)
        {
            // best-effort cleanup
        }
        catch (UnauthorizedAccessException)
        {
            // best-effort cleanup
        }
    }
}
