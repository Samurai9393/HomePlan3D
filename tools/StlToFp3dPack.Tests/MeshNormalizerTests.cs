using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class MeshNormalizerTests
{
    [Fact]
    public void Normalize_UsesExplicitUpAxis()
    {
        var raw = new[]
        {
            new Triangle(new Point3(0, 0, 0), new Point3(2, 0, 0), new Point3(0, 4, 5)),
        };

        NormalizedMesh yUp = MeshNormalizer.Normalize(raw, UpAxis.Y, 2);
        NormalizedMesh zUp = MeshNormalizer.Normalize(raw, UpAxis.Z, 2);

        AssertSize(yUp, 0.8, 1.6, 2);
        AssertSize(zUp, 0.8, 2, 1.6);
    }

    [Fact]
    public void Normalize_ScalesUniformlyToTargetLongestExtent()
    {
        NormalizedMesh mesh = MeshNormalizer.Normalize(TestData.Triangle, UpAxis.Y, 2);

        Assert.Equal(0.5, mesh.Scale, 6);
        AssertSize(mesh, 2, 1, 1.5);
        Assert.Equal(2, mesh.LongestExtentMetres, 6);

        foreach (Triangle triangle in mesh.Triangles)
        {
            foreach (Point3 point in new[] { triangle.A, triangle.B, triangle.C })
            {
                Assert.InRange(point.X, 0, 2);
                Assert.InRange(point.Y, 0, 1.5);
                Assert.InRange(point.Z, 0, 1.5);
            }
        }
    }

    [Theory]
    [InlineData(0)]
    [InlineData(0.009)]
    [InlineData(10.001)]
    [InlineData(double.NaN)]
    [InlineData(double.PositiveInfinity)]
    public void Normalize_RejectsTargetOutsideRange(double target)
    {
        Assert.Throws<ArgumentOutOfRangeException>(
            () => MeshNormalizer.Normalize(TestData.Triangle, UpAxis.Y, target));
    }

    [Fact]
    public void Normalize_RejectsDerivedDimensionOutsideRange()
    {
        var thin = new[]
        {
            new Triangle(new Point3(0, 0, 0), new Point3(10, 0, 0), new Point3(0, 0.01, 0.02)),
        };

        ArgumentOutOfRangeException error = Assert.Throws<ArgumentOutOfRangeException>(
            () => MeshNormalizer.Normalize(thin, UpAxis.Y, 0.01));

        Assert.Contains("Derived dimension", error.Message, StringComparison.Ordinal);
    }

    [Fact]
    public void CreateBoundingBoxPart_ReturnsWholeItemSeed()
    {
        PackPart part = MeshNormalizer.CreateBoundingBoxPart();

        Assert.Equal("box", part.Shape);
        Assert.Equal(0, part.X);
        Assert.Equal(0, part.Z);
        Assert.Equal(1, part.W);
        Assert.Equal(1, part.D);
        Assert.Equal(0, part.Y);
        Assert.Equal(1, part.H);
        Assert.Equal("body", part.Color);
    }

    private static void AssertSize(NormalizedMesh mesh, double x, double y, double z)
    {
        Assert.Equal(x, mesh.SizeMetres[0], 6);
        Assert.Equal(y, mesh.SizeMetres[1], 6);
        Assert.Equal(z, mesh.SizeMetres[2], 6);
    }
}
