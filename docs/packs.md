# Furniture and module packs

Packs bring additional furniture or code into HomePlan 3D. They are imported locally as a JSON
file. A signature, a publisher key or a server
is not needed: every feature is MIT open source and enabled by default.

## Import

1. Write the pack source as JSON (format below).
2. Import it in Home Assistant: Editor → **Furniture** → **Import furniture packs …**.
   For modules: **⚙ Settings → 🧩 Modules → Import a module …** or
   **Extensions → Modules → Import a module …**.
3. For modules, view and approve the code as an administrator. Only then does it run.

Several files can be selected at once. Removed packs stay as simple
boxes in the plan and reappear with all their links after importing them again.

## Format

```json
{
  "format": "fp3dpack",
  "version": 1,
  "id": "example.kitchen",
  "name": "Kitchen pack",
  "publisher": "local",
  "description": "optional",
  "items": [
    {
      "id": "retro_fridge",
      "name": "Retro fridge",
      "size": [0.6, 0.65, 1.5],
      "electric": true,
      "parts": [{ "shape": "box", "x": 0, "z": 0, "w": 1, "d": 1, "y": 0, "h": 1, "color": "white", "edges": true }],
      "symbol": [{ "shape": "rect", "x": 0, "z": 0, "w": 1, "d": 1 }]
    }
  ]
}
```

- `size`: default size in metres (width, depth, height). In the plan every item can then be scaled
  freely; all parts grow with it – except those with `fix`.
- `fix` on a part: which dimensions the part **keeps** when scaling – `"w"`, `"d"`, `"h"`
  or several (`"wdh"`). Legs, armrests, tops and handles thus keep their size, the parts
  between them stretch.
- `parts` (max. 60): `box`, `cyl` or `loft`. All dimensions are **fractions of the item size**: `x`/`z`
  centre (−0.5 … 0.5, front is +z), `w`/`d` width/depth (0 … 1), `y` bottom edge and `h` height (0 … 1
  of the height). A cylinder takes the smaller of `w` and `d` as its diameter; with `axis: "x"`
  or `"z"` it lies along that axis. A `loft` is a box with a different top face
  (`tx`/`tz` centre, `tw`/`td` size) – for sloping surfaces.
- `rot` (degrees) turns a part about its own centre, e.g. for spiral staircases or diagonal struts.
- `color`: `#rrggbb` or a role of the built-in palette (`body`, `fabric`, `cushion`, `wood`,
  `white`, `metal`, `dark`, `glass`, `plant`, `pot`, `accent`). `top` sets a colour of its own for the
  top face, `edges` draws glowing edges (`true`, `"glow"`, `"faint"`).
- `symbol` (optional, max. 40): top view made of `rect` (`fill` for filled), `circle` (`r` as a fraction
  of the smaller side) and `line` (`x1`, `z1`, `x2`, `z2`). Without a symbol the plan draws the parts
  from above.
- `electric`: the item can be linked to a switch and a power sensor.
- `mount`: `floor` (default), `surface` (on the item below), `wall` (bottom edge at
  `wall_y` metres) or `ceiling` (hangs from the ceiling).
- `surface`: the top face carries other furniture (table, kitchen island, workbench).
- `hole`: a staircase that cuts the stair opening into the floor above.
- `light`: the item is a lamp; the value describes how it lights (`ceiling`, `pendant`,
  `floor`, `table`, `wall`, `spot`, `garden` …). Parts with `"glow": true` light in the colour and
  brightness of the light.
- `screen`: a part with `"screen": true` is a screen that can be linked to a media player.
- **Library** (optional): `group` describes the kind (`sofa`, `seating`, `table`, `storage`,
  `bed`, `kitchen`, `appliance`, `bath`, `lamp`, `media`, `office`, `tech`, `heating`, `energy`,
  `household`, `deco`, `plant`, `outdoor`, `kids`, `sport`, `pets`, `vehicle`, `stairs`,
  `architecture`), `room` the fitting rooms (`living`, `dining`, `kitchen`, `bedroom`, `kids`,
  `bath`, `office`, `hall`, `utility`, `garage`, `garden`, `hobby`; empty = everywhere), `tags`
  further search words. `family` and `variant` group size variants into one card.
  Without these fields NeonPlan sorts the item by its words and the pack.

## Feature and module packs

A pack can carry `features` instead of furniture (or in addition), for example
`"features": ["weather"]` with `"items": []`. The Pro features are already enabled through
`custom_components/homeplan3d/open-source-config.json`; such packs only add
furniture or scenes, they unlock nothing.

A module pack brings code. It is imported locally just like a furniture pack. The code
is not run until an administrator has reviewed and approved it under **Extensions → Modules → View code
& approve**. A new version waits for approval too.
The file stays readable; the project is fully under the MIT licence.

## Pack images

`cd frontend && node pack-images.mjs <pack.json>... --out <folder>` renders with the real
3D graphics (run `npm run build` first) an overview image per pack (`overview.png`, 3200 × 2400)
and a cut-out PNG per item (`items/<id>.png`).

## Updates

A newer version of the same pack ID replaces the installed version without losing anything in the
plan. In short: local JSON files, no signature, no server – and for
modules always human approval before running.