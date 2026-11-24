# Furniture packs

## 2026-11-24 — Plants pack added
- What: Created `furniture-packs/Plants.fp3dpack` as an unsigned `fp3dpack` v1 pack: id `plants`, name `Plants`, publisher `local`, one `potted_plant` item with 9 primitive parts and a 5-symbol 2D representation. It was based on the earlier `Plans/fp3dpack-v1-plant-example.json` content with top-level metadata changed for the Plants category.
- What: Validated with `custom_components.homeplan3d.packs.read_pack()`; it accepted the file and reported 1 item with id `potted_plant`.
- Why: User requested a Plants-category pack file; records the location and validation baseline without changing HomePlan runtime files.

## 2026-11-24 — Lights pack added
- What: Created `furniture-packs/Lights.fp3dpack` as an unsigned `fp3dpack` v1 pack: id `lights`, name `Lights`, publisher `local`, three items (`table_lamp`, `floor_lamp`, `ceiling_light`) with `electric: true`, valid `light` kinds (`table`, `floor`, `ceiling`), `mount` values (`surface`, `floor`, `ceiling`), glowing shade/diffuser parts and 2D symbols.
- What: Validated with `custom_components.homeplan3d.packs.read_pack()`; it accepted 3 items and reported the expected light kinds.
- Why: User requested a Lights-category pack with a few representative light items; records the location and validation baseline.

## 2026-11-24 — Garden & Outdoors pack added
- What: Created `furniture-packs/GardenOutdoors.fp3dpack` as an unsigned `fp3dpack` v1 pack: id `garden_outdoors`, name `Garden & Outdoors`, publisher `local`, four items (`garden_chair`, `patio_table`, `planter_box`, `garden_bollard`) with outdoor rooms/tags, glowing bollard light and 2D symbols.
- What: Validated with `custom_components.homeplan3d.packs.read_pack()`; it accepted 4 items with the expected ids and name.
- Why: User requested a "garden & Outdoors" category pack with a few outdoor items; records the location and validation baseline.
