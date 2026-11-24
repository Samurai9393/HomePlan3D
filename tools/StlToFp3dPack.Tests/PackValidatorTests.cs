using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using Xunit;

namespace StlToFp3dPack.Tests;

public sealed class PackValidatorTests
{
    [Fact]
    public void Validate_AcceptsMinimalValidPack()
    {
        ValidationResult result = PackValidator.Validate(TestData.ValidPack());

        Assert.True(result.IsValid, string.Join(" ", result.Errors));
    }

    [Fact]
    public void Validate_RejectsOutOfRangePartCoordinates()
    {
        PackDocument pack = TestData.ValidPack();
        PackPart part = pack.Items[0].Parts[0];
        part.X = 0.6;
        part.W = 0.0005;
        part.Y = 1.2;

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains(".x must be between", errors, StringComparison.Ordinal);
        Assert.Contains(".w must be between", errors, StringComparison.Ordinal);
        Assert.Contains(".y must be between", errors, StringComparison.Ordinal);
    }

    [Theory]
    [InlineData("transparent")]
    [InlineData("#fff")]
    [InlineData("glass ")]
    public void Validate_RejectsInvalidPartColors(string color)
    {
        PackDocument pack = TestData.ValidPack();
        pack.Items[0].Parts[0].Color = color;

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains(".color must be", errors, StringComparison.Ordinal);
    }

    [Fact]
    public void Validate_RejectsEmptyPrimitiveParts()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Items[0].Parts.Clear();

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains("parts has 0 entries", errors, StringComparison.Ordinal);
    }

    [Fact]
    public void Validate_RejectsMoreThanSixtyParts()
    {
        PackDocument pack = TestData.ValidPack();
        for (int i = 0; i < PackValidator.MaxParts; i++)
            pack.Items[0].Parts.Add(new PackPart());

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains("the allowed range is 1..60", errors, StringComparison.Ordinal);
    }

    [Fact]
    public void Validate_RejectsInvalidMetadataIds()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Id = "Bad Pack Id";
        pack.Items[0].Id = "Bad Item";

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains("pack id must match", errors, StringComparison.Ordinal);
        Assert.Contains("items[0].id must match", errors, StringComparison.Ordinal);
    }

    [Fact]
    public void Validate_RejectsMoreThanTwoHundredItems()
    {
        PackDocument pack = TestData.ValidPack();
        pack.Items.Clear();
        for (int i = 0; i <= PackValidator.MaxItems; i++)
            pack.Items.Add(TestData.ValidItem($"item{i}"));

        string errors = string.Join(" ", PackValidator.Validate(pack).Errors);

        Assert.Contains("the maximum is 200", errors, StringComparison.Ordinal);
    }

    [Fact]
    public void Validate_RejectsSerializedPackOverCharacterLimit()
    {
        string hugeJson = new string(' ', PackValidator.MaxPackChars + 1);

        string errors = string.Join(" ", PackValidator.Validate(TestData.ValidPack(), hugeJson).Errors);

        Assert.Contains("the maximum is 1,000,000", errors, StringComparison.Ordinal);
    }
}
