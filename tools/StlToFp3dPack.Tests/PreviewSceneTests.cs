using StlToFp3dPack.Models;
using StlToFp3dPack.Rendering;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class PreviewSceneTests
{
    [Fact]
    public void Create_UsesExplicitItemSizeWithoutStlMesh()
    {
        var part = new PackPart
        {
            Shape = "box",
            X = 0.25,
            Z = 0.25,
            W = 0.5,
            D = 0.5,
            Y = 0,
            H = 0.5,
        };

        PreviewScene scene = PreviewScene.Create(null, new[] { part }, new[] { 2.0, 2.0, 2.0 });

        Assert.Empty(scene.StlTriangles);
        Assert.Single(scene.Parts);
        Assert.InRange(scene.BoundsMax.X, 1.3f, 1.4f);
        Assert.InRange(scene.BoundsMax.Y, 1.3f, 1.4f);
        Assert.InRange(scene.BoundsMax.Z, 1.3f, 1.4f);
    }
}
