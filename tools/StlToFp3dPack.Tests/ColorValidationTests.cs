using StlToFp3dPack.Io;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class ColorValidationTests
{
    public static IEnumerable<object[]> ValidColors
    {
        get
        {
            foreach (string role in new[]
            {
                "body", "fabric", "cushion", "wood", "white", "front",
                "metal", "dark", "glass", "plant", "pot", "accent",
            })
            {
                yield return new object[] { role };
            }

            yield return new object[] { "#000000" };
            yield return new object[] { "#aBcDeF" };
        }
    }

    [Theory]
    [MemberData(nameof(ValidColors))]
    public void IsValidColor_AcceptsHexAndEveryPaletteRole(string color)
    {
        Assert.True(PackValidator.IsValidColor(color));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("#fff")]
    [InlineData("#GGHHII")]
    [InlineData("glass ")]
    [InlineData("transparent")]
    public void IsValidColor_RejectsInvalidValues(string? color)
    {
        Assert.False(PackValidator.IsValidColor(color));
    }
}
