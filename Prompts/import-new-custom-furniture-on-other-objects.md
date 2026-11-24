# Prompt: Import new custom furniture on other objects

## Goal

Update the project so new custom furniture can be imported and placed on other objects.

## Important: gather the requirements first

Ask **one clarifying question at a time** and wait for the answer before changing code.

1. The phrase "on other objects" is ambiguous in this repository and there is no persisted parent/child attachment model today. Ask which meaning applies:

   - Furniture placed on top of other furniture surfaces (`mount: "surface"` / `surface: true`, geometric `surfaceHeight()` lookup)
   - Furniture mounted on walls (`mount: "wall"`, wall item logic)
   - Furniture inside blocks/groups (`group`)
   - Furniture attached to rooms, openings, outdoor objects, or another `Floor` object
   - A new explicit object-attachment model stored with each furniture item

   If the user picks a new attachment model, call out that this is a data-model change requiring frontend + backend schema + persistence updates.

2. Ask which **category** the new furniture piece belongs to in the add-furniture library. Use the existing `KINDS` values as the choices, for example `sofa`, `seating`, `table`, `storage`, `stairs`, `vehicle`, `outdoor`, `architecture`. Point to the current items as examples: `sofa` is a `sofa`, `chair` is `seating`, `stairs` is `stairs`, and `parking` is `vehicle` (`frontend/src/library-index.ts:100-166`). The category controls where the piece appears in the editor's Add furniture library.

3. Ask for the exact **name** to show for the item in the library. Do not invent or translate it; use the name the user supplies.

4. Ask for a **file containing the data that draws the item**. Require an `fp3dpack` v1 JSON file rather than a description: `parts`, `symbol`, `size` and optional flags such as `mount`, `hole`, `light` or `group`. Tell the user to copy a current item as the template: the `retro_fridge` example in `docs/packs.md:20-38`, the built-in `sofa`, `chair`, `stairs` and `parking` definitions, or an installed pack item. Do not guess geometry, dimensions, colours or symbols from the item's name; wait for the file.

Do not proceed to implementation until the attachment meaning, category, name and drawing-data file have all been supplied.

## Verified context (working tree, 2026-11-23)

- Packs are local, unsigned `fp3dpack` v1 JSON files. Authoritative schema: `custom_components/homeplan3d/packs.py:48-232`; TypeScript mirror: `frontend/src/packs.ts:20-155`; spec: `docs/packs.md`. There is no signature, publisher key, `verify_pack()` or signing tool.
- Custom furniture = a pack item type `pack:<pack id>:<item id>` (`frontend/src/packs.ts:157-182`); there is no `customFurniture` type/field.
- Add-furniture path: library card click (`frontend/src/components/library.ts:216-221`) → `addFurniture()` (`frontend/src/components/editor.ts:5226-5249`), which computes type-specific defaults (stairs use floor-to-floor height, parking uses garage/room axis), pushes one flat `Furniture` into `floor.furniture`, selects it. Library search/filter UI: `frontend/src/components/library.ts:247-354`.
- Library categories are `KINDS` (`frontend/src/library-index.ts:12-38`); rooms are `ROOMS` (`:41-42`). Built-ins are classified in `BASIC` at `:84-166`: `sofa`/`sofa_l`/`sofa_u` are `sofa`, `chair`/`armchair` are `seating`, `stairs`/`stairs_u`/`stairwell` are `stairs`, `parking` is `vehicle`. Pack metadata (`group`, `room`, `family`, `variant`) is in `frontend/src/packs.ts:124-130`; fallback classification rules are at `frontend/src/library-index.ts:200-256`; index/card creation at `:370-433`.
- Rendering: 2D symbol dispatch (`frontend/src/components/editor.ts:10614`, implementations in `frontend/src/components/furniture2d.ts:69-270`); 3D built-in switch and pack fallback (`frontend/src/viewer/furniture.ts:1622-1949`), pack geometry from `:1971+`.
- Existing pack import path works: Extensions UI (`frontend/src/components/extensions.ts:187-221`) → `importPack()` (`frontend/src/api.ts:306-309`) → websocket `homeplan3d/packs/import` (`custom_components/homeplan3d/websocket.py:465-492`) → pack storage (`custom_components/homeplan3d/storage.py:385-398`) → `setPacks()` (`frontend/src/building-controller.ts:318-337`).
- Complete NeonPlan plan import preserves `pack:` furniture types (`frontend/src/import/simple.ts:140-149`). The generic importer drops them because `RawFurniture.type` is built-in only (`frontend/src/import/builder.ts:36-49`, `:125`, `:354-395`; name mapping in `frontend/src/import/furniture-map.ts:6-77`).
- "On surfaces" today is geometric: x/z overlap plus `surfaceHeight()` (`frontend/src/model.ts:1758-1771`), pack `mountBase()` (`frontend/src/packs.ts:350-380`) and explicit `mount_y`. Wall mounting is geometric too; block/group is a flat membership field (`frontend/src/model.ts:198-199`, `custom_components/homeplan3d/schema.py:411-412`). No object id is stored.
- There is no generic `objects` array in `Building` or `Floor` (`frontend/src/model.ts:438-456`, `:1359-1367`) and no persisted parent/child attachment model. `Furniture` is a flat record (`frontend/src/model.ts:193-372`).
- Backend accepts arbitrary furniture type strings up to 96 chars (`custom_components/homeplan3d/schema.py:256-258`), `mount_y` in `-5..10` (`:308-310`), and extra fields (`extra=vol.ALLOW_EXTRA`, `:428`), but defines no attachment schema.
- Tests to extend: `frontend/src/library-index.test.ts:9-137`, `frontend/src/packs.test.ts:14+`, `frontend/src/pack-scale.test.ts:8-75`, `frontend/src/viewer/furniture.test.ts:113-157`, `tests/test_packs.py:127-160`, `tests/test_schema.py:106-110`, `tests/test_backup.py:47-96`.
- Build outputs under `custom_components/homeplan3d/frontend/` and `site/import/` are generated by `frontend/build.mjs`; never hand-edit them.

## Constraints

- Follow `AGENTS.md`: present a plan for review before starting work, give direct feedback, use bullet points, no emojis, ask clarifying questions one at a time.
- Do not fetch, pull, push, or open PRs upstream. Do not change remotes.
- Treat generated bundles as build output; edit TypeScript sources and rebuild.
- Keep changes minimal and scoped to the clarified meaning.

## Definition of done

- The chosen attachment meaning, library category, item name and drawing-data file are confirmed by the user before implementation.
- The item appears in the add-furniture library under the requested category with the requested name, using the drawing data from the supplied file.
- New custom furniture imports with its pack type intact and appears correctly on the intended target object.
- Round-trip through save/export/import and backup preserves the placement.
- Existing packs and built-in furniture behavior are unchanged.
- Tests added/updated for the changed import and placement logic.
- Verification run from `frontend/`: `npm test`, `npm run typecheck`, `npm run build`; from repo root: `pytest`.
