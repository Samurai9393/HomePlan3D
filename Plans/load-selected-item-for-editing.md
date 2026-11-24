# Plan: Load a selected pack item for editing

## Goal

When an item is selected in **Pack items**, load that item's data into the editor and write edits back to that same item in the open pack.

- Selecting a pack item loads id, name, size, group, room, tags, flags, primitive parts and preview.
- Changing those fields and clicking **Apply to item** updates the selected pack item in place.
- Part edits continue to use **Apply to part** and apply to the selected pack item.
- Adding a new item from an STL still appends a new item; it does not overwrite the selected item.

## Current behavior

- `RefreshItems()` fills the **Pack items** list but has no `SelectedIndexChanged` handler.
- The parts editor and preview always read `StlImportSession`, so loaded pack items cannot be edited.
- The only item fields shown are `Item id / name` in the **STL import** group.

## Implementation

1. Add selected-item editing state to `UI/MainForm.cs`.
   - Track the selected `PackItem` in an `_editingItem` field and guard list refreshes with `_loadingItems`.
   - Add an `_items.SelectedIndexChanged` handler that calls `LoadSelectedItem()`.
   - Introduce current-source helpers for parts and item size:
     - Parts come from `_editingItem.Parts` in item-edit mode, otherwise `_session.Parts`.
     - Size comes from `_editingItem.Size` in item-edit mode, otherwise `_session.Normalized?.SizeMetres`.
   - Refactor `SelectedPart()`, `RefreshParts()`, `UpdateViewport()`, `AddPart()`, `DuplicatePart()`, `DeletePart()`, `MovePart()` and `ApplyPart()` to use the current source instead of always using `_session`.
   - In item-edit mode, build the preview from the item's parts and size with no STL wireframe.

2. Add a compact **Selected item** editor panel.
   - Fields: `Id`, `Name (en)`, `Size w/d/h`, `Group`, `Room` (comma-separated), `Tags` (comma-separated), `Mount`, `Light`, `Wall y`, and checkboxes for `Electric`, `Surface`, `Vehicle`, `Hole`.
   - Add **Apply to item**, which captures the fields into a `PackItemEdit` and calls the new `PackEditor.UpdateItem`.
   - Disable the panel when no pack item is selected.
   - Preserve fields that are not exposed: `family`, `variant`, `slots`, `symbol` and all unexposed part fields such as `top`, `finish`, `edges`, `glow`, `screen`, `tx/tz/tw/td`, `fix`, `advent`, `spin` and `bind`.

3. Add `PackItemEdit` and `PackEditor.UpdateItem(string itemId, PackItemEdit edit)`.
   - Replace only the exposed fields; keep unexposed item and part data intact.
   - Reject an id that duplicates another item in the pack.
   - Validate the whole pack after applying the edit and roll back on failure.
   - Refresh the item list label in place without losing the current selection.

4. Wire the selection lifecycle.
   - `OpenPack` / `NewPack`: `RefreshAll()` loads the first item when one exists.
   - `OpenStl` / `ApplySize` / `AddItemToPack`: switch back to import mode by clearing `_editingItem`, so STL work cannot overwrite a selected pack item.
   - `AddItemToPack`: append the new item from the session, then select it and switch to item-edit mode.
   - `RemoveItem`: remove the item, then select the adjacent item or clear the editor if none remain.
   - Keep validation status in sync after every item or part change.

5. Handle existing part shapes correctly.
   - Add `loft` to the part shape dropdown so loaded loft parts can be selected and displayed.
   - Do not overwrite unexposed loft fields when applying edits; mutate the existing `PackPart` object.

6. Update rendering.
   - Extend `PreviewScene.Create` with an optional explicit `sizeMetres` argument and call it with `_editingItem.Size` when no STL mesh is active.
   - Keep the existing signature and behavior for STL import so current tests remain valid.

## Tests

- Add xUnit tests for `PackEditor.UpdateItem`:
  - valid field update,
  - duplicate id rejection with no mutation,
  - missing item id failure.
- Add a test for `PreviewScene.Create` with explicit item size and no STL triangles.
- Re-run the existing 55 tests; they must stay green.

## Verification

- Build: `dotnet build tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release`.
- Test: `dotnet test tools/StlToFp3dPack.Tests/StlToFp3dPack.Tests.csproj -c Release`.
- Manual smoke test with a temporary copy of a pack:
  - open `furniture-packs/Lights.fp3dpack`,
  - select `floor_lamp`,
  - confirm fields, parts and preview load,
  - change name and size, apply, save, reopen and confirm the change,
  - confirm an STL import still creates a new item.
- Check `git status` to confirm no build artifacts or sample files are added.

## Constraints

- Continue on the existing unmerged branch `tool/stl-to-fp3dpack-guided`; it was already created from `main` and contains the tool code. Do not create a second branch from `main` that would omit this work.
- No `fp3dpack` schema change, no opacity/alpha/texture fields, no sample STL or generated pack files.
- Do not merge, commit, push or change remotes without explicit instruction.

## Review

Do not change code until the user reviews and confirms this plan.
