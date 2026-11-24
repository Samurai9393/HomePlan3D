# Plan: Guided STL to `fp3dpack` converter and pack editor

Status: written for later review and execution. Do not execute yet.

## Goal

Create a C# Windows application that can convert one STL file into a valid unsigned `fp3dpack` v1 furniture item and add that item to a new or existing pack. The app also lets the user edit top-level pack metadata, remove items from an existing pack, and save the result with Save As or explicit overwrite.

## Confirmed decisions

- Use a standalone C# Windows app; do not change the HomePlan 3D runtime format.
- Support both creating a new pack and opening an existing `fp3dpack` file.
- Append each converted STL as a new furniture item to the pack's `items` array.
- Let the user remove a selected whole item from `items`, with confirmation.
- Keep the existing primitive-part editor for the item currently being built from STL.
- One STL file becomes one pack item; all primitive parts stay together when placed in HomePlan.
- Use guided manual fitting rather than silent automatic approximation.
- Use Windows Forms with OpenTK/SharpGL for the 3D viewport, via NuGet.
- Seed the primitive-part list with one bounding box on STL load; the user adds, edits, duplicates and deletes parts.
- Ask the user for one real-world measurement: the target longest extent in metres.
- Scale the whole STL uniformly from that measurement; preserve its proportions.
- Keep an explicit Y-up/Z-up selector for orientation; remove unit guessing from the workflow.
- Let the user select a color for each primitive part and a glass-like look as the transparency approximation.
- Do not add an opacity/alpha field; the exported pack must remain valid `fp3dpack` v1.
- Show top-level pack metadata fields for editing when an existing pack is loaded.
- Default to Save As; allow explicit overwrite of the source file after confirmation.
- Keep the export strictly within the current `fp3dpack` v1 schema.

## Verified context

- `fp3dpack` is unsigned local JSON, format `fp3dpack`, version `1`.
- Authoritative schema: `custom_components/homeplan3d/packs.py:48-232`.
- TypeScript mirror: `frontend/src/packs.ts:20-155`.
- Spec: `docs/packs.md`.
- Top level requires `format`, `version`, `id`, `name`, `publisher` and `items`; optional fields include `release`, `description`, `features` and `module`.
- `items` may contain 0 to 200 items, but a pack must still have at least one item, feature or module; removing the last item is rejected unless the pack has a feature or module.
- Pack item ids must be unique in practice: `setPacks()` keys items by `pack:<pack id>:<item id>` (`frontend/src/packs.ts:161-163`), so duplicate ids collide.
- Supported primitive shapes are `box`, `cyl` and `loft`; this tool will emit `box` and `cyl`.
- Limits: 60 primitive parts per item, 200 items per pack, 1,000,000 characters per pack file.
- Item size is exactly three metre values, each in `0.01..10`; item name must be a language map such as `{"en": "..."}`.
- Primitive-part coordinates are fractions of item size: `x`/`z` in `-0.5..0.5`, `w`/`d` in `0.001..1`, `y` in `0..1`, `h` in `0.001..1`.
- Primitive-part color accepts `#rrggbb` or one of: `body`, `fabric`, `cushion`, `wood`, `white`, `front`, `metal`, `dark`, `glass`, `plant`, `pot`, `accent`.
- No opacity, alpha or transparency field exists in `custom_components/homeplan3d/packs.py`, `frontend/src/packs.ts`, or `frontend/src/viewer/furniture.ts`; the `glass` palette role is the only valid transparency-like export value.
- `.NET SDK 10.0.401` is installed locally, with .NET 8 and .NET 10 Windows Desktop runtimes available.
- There is no existing C# project in the repository.
- The working tree contains unrelated uncommitted changes; do not touch them.

## Implementation steps

Status markers: `[x]` completed, `[ ]` not completed. Steps 1–7 were completed on 2026-11-24.

1. [x] Create branch `tool/stl-to-fp3dpack-guided` from `main`; do not merge it.
2. [x] Add `tools/StlToFp3dPack/`:
   - `StlToFp3dPack.csproj`: Windows Forms, target `net8.0-windows`, OpenTK/GLControl via NuGet.
   - Main form:
     - New pack and Open existing pack actions.
     - Top-level metadata editor: `id`, `name`, `publisher`, `description`, `release`, `features` and `module`.
     - Pack item list with id, name, size, primitive-part count and a Remove item button.
     - Current STL item editor with size prompt, up-axis control, primitive-part list, part editor, preview host, Add item to pack button and validation output.
     - Save As and explicit overwrite actions.
   - Pack reader: load an existing `fp3dpack` JSON file, validate it before editing, and keep readable top-level fields in the metadata editor.
   - STL reader: parse ASCII and binary STL into triangles; reject empty, malformed or non-finite data with clear messages.
   - Size prompt workflow: after opening an STL, require the user to enter the target longest extent in metres before enabling primitive-part editing or adding the item to the pack. Show the raw bounding-box extents as context only; never treat them as metres.
   - Normalizer: apply the confirmed up-axis, find the raw longest extent, compute `scale = targetLongestMetres / rawLongestExtent`, scale every axis uniformly, place the model base at `y = 0`, and derive the three item dimensions in metres.
   - Size validation: require target longest extent in `0.01..10`; after scaling, reject adding the item if any derived width, depth or height is outside `0.01..10`. Show the offending dimension and ask for a different target size rather than silently clamping.
   - Model classes: triangles, primitive-part definitions, pack item definitions, pack metadata, validation result.
   - Pack item operations:
     - Append the current STL item to the loaded pack's `items` array after validation.
     - Reject duplicate item ids and require the user to choose another id.
     - Remove the selected item after confirmation; allow removal down to `items: []` only when the pack has at least one feature or module.
     - Recompute validation after every add/remove.
   - Pack writer: serialize valid `fp3dpack` v1 JSON with all editable top-level fields and the current `items` array. Preserve `format: "fp3dpack"` and `version: 1` as fixed values.
   - Validation: check all emitted top-level fields, item fields, primitive-part fields, allowed colors, duplicate item ids, the 60-part limit, the 200-item limit and the 1,000,000-character pack limit before save; show actionable errors and never write an invalid file.
   - Save behavior: default Save As suggests a new filename derived from the source pack; overwrite the loaded file only after an explicit confirmation.
3. [x] Implement the OpenTK viewport:
   - Draw the STL as a wireframe after scaling to the user's target size.
   - Draw box and cylinder parts as shaded, selectable primitives using each part's chosen color.
   - Draw parts assigned the `glass` role with a glass-like preview shade; make clear in the UI that this is a color-role approximation, not real transparency.
   - Support orbit, zoom, reset view and a fit-to-model action.
   - Keep rendering code independent of export logic so tests can run without OpenGL.
4. [x] Implement the primitive-part editor:
   - Seed one bounding-box part on STL load after the target size is confirmed; its fractions are `x = 0`, `z = 0`, `w = 1`, `d = 1`, `y = 0`, `h = 1`.
   - Add box/cylinder, delete, duplicate and reorder parts.
   - Edit `shape`, `x`, `z`, `w`, `d`, `y`, `h`, `axis`, `rot` and `color`.
   - Provide a color picker for `#rrggbb`, a dropdown of allowed palette roles, and a glass-like look toggle that sets the exported color to `glass`.
   - Show a warning next to the glass-like toggle explaining that current `fp3dpack` files cannot store real transparency.
   - Default color is the palette role `body`; allow `#rrggbb` values as well.
   - Enforce the 60-part cap with a visible count.
5. [x] Add C# tests in `tools/StlToFp3dPack.Tests/`:
   - ASCII STL parsing.
   - Binary STL parsing, including header/count validation.
   - Up-axis normalization.
   - Uniform scaling from a target longest extent in metres.
   - Rejection of target sizes outside `0.01..10`.
   - Rejection when a derived width, depth or height falls outside `0.01..10`.
   - Bounding-box seed part calculation.
   - Color validation for hex values and every allowed palette role.
   - Glass-like look mapping to exported `"color": "glass"` with no opacity/alpha field.
   - Loading a valid existing pack.
   - Appending a converted item to an existing pack's `items` array.
   - Rejecting duplicate item ids.
   - Removing a selected item and allowing an empty `items` array.
   - Editing top-level metadata while preserving `format` and `version`.
   - Rejection of packs over 200 items or over the 1,000,000-character limit.
   - JSON serialization shape and required fields.
   - Validation failures for out-of-range coordinates, invalid colors, empty primitive parts, oversized primitive-part list and invalid metadata ids.
6. [x] Add a short `tools/StlToFp3dPack/README.md` describing how to build, run, create or open a pack, enter the target size, choose part colors and glass-like looks, add or remove items, and save or overwrite the pack.
7. [x] Do not add sample STL files, real furniture data or generated pack files to the repository.

## Verification

- `dotnet build tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release`
- `dotnet test tools/StlToFp3dPack.Tests/StlToFp3dPack.Tests.csproj -c Release`
- Manually open a small test STL, enter a known target longest extent, confirm the new item's `size` has that value as its largest component, set different colors and glass-like looks on parts, add the item to an existing test pack, remove another item, edit top-level metadata, save to a new path, and validate the JSON against `custom_components/homeplan3d/packs.py` expectations.
- Confirm no exported primitive part contains an opacity, alpha or transparency field.
- Confirm overwritten and Save As outputs both validate after add/remove operations.
- No HomePlan 3D frontend build or Python test run is required unless runtime files are changed; this plan changes none.

## Definition of done

- The app builds and its tests pass.
- It reads ASCII and binary STL files and requires a target longest extent in metres before editing or adding the item.
- The target longest extent scales the STL uniformly, preserving proportions.
- Up-axis choice is explicit and controls HomePlan orientation.
- The app rejects target sizes and derived dimensions that cannot be represented by `fp3dpack` v1.
- The user can add, edit, duplicate and delete box/cylinder parts in a 3D preview.
- The user can select a valid color and a glass-like look for each primitive part.
- The app can create a new pack or open an existing `fp3dpack`.
- The app can append a converted STL item to an existing pack's `items` array and remove selected items.
- Top-level metadata fields are editable; `format` and `version` remain fixed at `fp3dpack` and `1`.
- Save As works by default and overwrite works only after explicit confirmation.
- Export produces a valid unsigned `fp3dpack` v1 JSON file whose longest exported item size equals the user-entered value.
- Transparency is represented only by the `glass` color role; no invalid opacity/alpha field is emitted.
- Invalid settings are reported before save and no invalid file is written.
- No HomePlan 3D runtime files, docs, generated bundles or unrelated working-tree changes are modified.
- The branch is left unmerged for the user to review.
