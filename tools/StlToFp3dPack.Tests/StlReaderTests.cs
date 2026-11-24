using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class StlReaderTests
{
    [Fact]
    public void Read_AsciiStlFromPath_ParsesTriangles()
    {
        using var temp = new TempDirectory();
        string path = temp.File("ascii.stl");
        File.WriteAllBytes(path, TestData.AsciiStl());

        var triangles = StlReader.Read(path);

        Assert.Equal(2, triangles.Count);
        Assert.Equal(4d, triangles[0].B.X);
        Assert.Equal(2d, triangles[0].C.Y);
        Assert.Equal(1d, triangles[1].A.X);
    }

    [Fact]
    public void Read_BinaryStl_ParsesTriangles()
    {
        byte[] bytes = TestData.BinaryStl(declaredCount: 1, actualTriangles: 1);

        var triangles = StlReader.Read(bytes);

        Triangle triangle = Assert.Single(triangles);
        Assert.Equal(0d, triangle.A.X);
        Assert.Equal(4d, triangle.B.X);
        Assert.Equal(2d, triangle.C.Y);
        Assert.Equal(3d, triangle.C.Z);
    }

    [Fact]
    public void Read_BinaryStlWithMismatchedCount_IsRejected()
    {
        byte[] bytes = TestData.BinaryStl(declaredCount: 2, actualTriangles: 1);

        Assert.Throws<InvalidDataException>(() => StlReader.Read(bytes));
    }

    [Fact]
    public void Read_BinaryStlWithZeroTriangles_IsRejected()
    {
        byte[] bytes = TestData.BinaryStl(declaredCount: 0, actualTriangles: 0);

        InvalidDataException error = Assert.Throws<InvalidDataException>(() => StlReader.Read(bytes));

        Assert.Contains("no triangles", error.Message, StringComparison.OrdinalIgnoreCase);
    }
}
