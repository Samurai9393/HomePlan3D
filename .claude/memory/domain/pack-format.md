# Pack format

## 2026-11-23 — Furniture packs are local unsigned JSON
- What: The format is `fp3dpack`, version 1, imported as plain local JSON without signature or server. Authoritative schema: `custom_components/homeplan3d/packs.py`; human-readable spec: `docs/packs.md`. Top level: `format`, `version`, `id`, `name`, `publisher`, optional `description`, `features`, `module`, `items`. `items[].size` is `[width, depth, height]` in metres; `parts` are `box`, `cyl` or `loft` with `x`/`z`/`w`/`d`/`y`/`h` as fractions of the item size.
- Why: User asked directly; records the canonical source locations and core shape without re-reading code.
