# STL to `fp3dpack` guided converter

A Windows Forms tool that turns one STL file into one valid unsigned `fp3dpack` v1 furniture item and appends it to a new or existing pack. It does not change the HomePlan 3D runtime format.

## Build and run

From the repository root (Windows, .NET 8 SDK with Windows Desktop support):

```powershell
dotnet build tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release
dotnet run --project tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release
```

Run the tests with:

```powershell
dotnet test tools/StlToFp3dPack.Tests/StlToFp3dPack.Tests.csproj -c Release
```

## Create or open a pack

- `File > New pack` starts a new pack with default metadata.
- `File > Open pack…` loads an existing `.fp3dpack` or `.json` file. Envelope-style files with a `payload` object are accepted.
- Edit `Id`, `Name`, `Publisher`, `Release`, `Description`, comma-separated `Features`, and optional `Module` in **Pack metadata**. `format` and `version` stay fixed at `fp3dpack` and `1`.
- The **Validation** panel shows pack and current-item errors before saving.

## Convert one STL into one item

1. In **STL import**, choose `Open STL…`.
2. Select the explicit `Up axis`: `Z up` or `Y up`. This controls HomePlan orientation; the tool does not guess units.
3. Enter the real-world `Longest extent (m)` in the `0.01..10` range and click `Apply size`. The whole mesh is scaled uniformly, so the largest exported item dimension equals this value. If another derived dimension falls outside `0.01..10`, choose a different target size.
4. `Raw extents` is context only and is never treated as metres.
5. A single bounding-box part is seeded automatically. Add, edit, duplicate, delete, and reorder parts to fit the shape, using the blue STL wireframe in the preview as a guide. The preview supports drag to orbit, wheel to zoom, `Reset view`, and `Fit model`.
6. Set `Item id / name`, then click `Add item to pack`. Duplicate item ids are rejected.

## Part colors and glass-like looks

- Select a part in **Primitive parts** or click it in the shaded preview.
- Edit `shape`, `x`, `z`, `w`, `d`, `y`, `h`, `axis`, `rot`, and `color`, then click `Apply to part`.
- Choose a palette role from the color dropdown, enter a `#rrggbb` value, or use `Pick…` for the Windows color picker.
- `Glass-like look` sets the exported color role to `glass`. `fp3dpack` v1 cannot store real transparency, opacity, alpha, textures, or UVs; the preview uses a pale cyan shade only as a visual hint.

## Add, remove, and save items

- Use `Add item to pack` after each STL conversion. Each STL becomes one item; existing items remain untouched.
- Select an item under **Pack items** and click `Remove selected item`, then confirm. Removing the last item is rejected unless the pack has at least one feature or a module.
- `File > Save As…` is the default save action and suggests a filename based on the open pack or pack id.
- `File > Overwrite open pack` writes back to the opened file only after an explicit confirmation.
- Invalid packs are never written; fix everything reported in **Validation** first.
