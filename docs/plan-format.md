# HomePlan 3D import format

*Second version below.*

The editor's import turns plans from other programs into a HomePlan 3D plan. It reads Sweet Home 3D (`.sh3d`), iPhone/iPad LiDAR scans (RoomPlan JSON), CAD drawings (`.dxf`), 3D models (`.glb`, `.gltf`, `.obj`, `.stl`), Floorplanner exports, Valetudo robot vacuum maps – and the simple format described here. Everything stays in your browser; the file is uploaded nowhere. Load the result in the editor under **Backup → Import …**.

The simple format is meant for anyone who writes a plan by hand, with a script or with an AI (see [ai-import.md](ai-import.md)): you describe rooms, doors and windows by plain coordinates, and the editor maps them into the plan.

## The file

```json
{
  "format": "neonplan-import",
  "units": "m",
  "rooms_at": "centre",
  "floors": [
    {
      "name": "Ground floor",
      "elevation": 0,
      "height": 2.5,
      "rooms": [
        { "name": "Living room", "points": [[0, 0], [6, 0], [6, 4.5], [0, 4.5]] },
        { "name": "Kitchen", "points": [[6, 0], [10, 0], [10, 4.5], [6, 4.5]] }
      ],
      "walls": [{ "from": [3, 4.5], "to": [3, 2.5], "thickness": 0.1 }],
      "doors": [{ "at": [6, 2.25], "width": 0.9, "height": 2.01 }],
      "windows": [{ "at": [3, 0], "width": 1.5, "height": 1.3, "sill": 0.9 }],
      "furniture": [
        { "type": "sofa", "at": [3, 3.6], "rotation": 180 },
        { "name": "Dining table", "at": [8, 2], "width": 1.6, "depth": 0.9, "height": 0.75 }
      ]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `format` | always `"neonplan-import"` |
| `units` | `"m"` (default), `"cm"` or `"mm"` – for every length in the file |
| `rooms_at` | `"centre"` (default): room outlines run along the **middle of the walls**, so neighbouring rooms share their edge. `"inner"`: outlines along the **inner faces** (measured inside dimensions) – rooms a wall apart are joined. |
| `floors[]` | lowest first. `elevation` = height of the floor above the ground floor (the ground floor is 0, a cellar is negative), `height` = storey height (default 2.5 m) |
| `rooms[]` | `name` and `points` – the outline as `[x, z]` corners in order (at least 3). **x** runs to the right, **z** down the plan (from the top of the drawing to the bottom). Do not repeat the first corner at the end. |
| `walls[]` | optional, only walls that are **no room edge**: a partition through half a room, a half-height wall. `from`/`to`, `thickness`, `height` (optional) |
| `doors[]` | `at` = the **middle** of the door on its wall (a point on a room edge), `width`, `height` (optional) |
| `windows[]` | `at`, `width`, `height`, `sill` (bottom edge above the floor), optional `sill_board`: `"auto"` (default: board inside and sill outside from 0.3 m sill height, none for a window directly above another opening), `"none"`, `"inside"` or `"outside"`. Two windows above each other (a transom light) are listed as two windows with the same `at`. |
| `furniture[]` | `at` = the middle, `type` (a built-in kind, see below) or `name` (recognised by English names: "Sofa", "Fridge" …), `width` (along its front), `depth`, `height` (optional: the kind's usual size), `rotation` in degrees clockwise (0 = its front faces down the plan, 180 = up), `elevation` (bottom above the floor, e.g. a wall cabinet) |

Built-in furniture kinds: `sofa`, `sofa_l`, `sofa_u`, `armchair`, `stool`, `coffee_table`, `tv_board`, `tv_wall`, `sideboard`, `shelf`, `plant`, `rug`, `table`, `table_round`, `chair`, `bench`, `corner_bench`, `bar_stool`, `kitchen` (base cabinet), `kitchen_wall`, `kitchen_tall`, `island`, `worktop`, `sink`, `stove`, `dishwasher`, `fridge`, `bed`, `bunk_bed`, `nightstand`, `wardrobe`, `dresser`, `bathtub`, `shower`, `wc`, `washbasin`, `washer`, `dryer`, `desk`, `office_chair`, `tall_cabinet`, `coat_rack`, `stairs`, `stairs_u`, `radiator`, `ac_unit`, `robot_vacuum`, lamps `lamp_ceiling`, `lamp_downlight`, `lamp_spot`, `lamp_panel`, `lamp_pendant`, `lamp_floor`, `lamp_table`, `lamp_wall`, `led_strip`.

## Tips

- Keep the corners exact: rooms that share a wall should share the same coordinates (with `rooms_at: "centre"`).
- A door between two rooms is listed once.
- The editor's import shows a preview and tells you what it had to leave out (a door that lies on no room edge, a room with too few corners).
- A complete NeonPlan plan (an export from the editor, or one an AI wrote in that format) can be checked in the editor before you import it.

---

# NeonPlan 3D import format

The editor's import turns plans from other programs into a NeonPlan 3D plan: Sweet Home 3D (`.sh3d`), iPhone/iPad LiDAR scans (RoomPlan JSON), CAD drawings (`.dxf`), 3D models (`.glb`, `.gltf`, `.obj`, `.stl`), Floorplanner exports, Valetudo robot vacuum maps – and the simple format described here. Everything runs in the browser; the file is uploaded nowhere. Load the result in the editor under **Backup → Import …**.

The simple format is for anyone who writes a plan by hand, with a script or with an AI (see [ai-import.md](ai-import.md)). The editor takes the file directly. Structure as above:

- `units`: `"m"` (default), `"cm"` or `"mm"`.
- `rooms_at`: `"centre"` (default) = room outlines along the **middle of the walls**, neighbouring rooms share the edge; `"inner"` = measured along the **inner faces**, rooms a wall apart are joined.
- `floors[]`: lowest first; `elevation` = height above the ground floor (cellar negative), `height` = storey height.
- `rooms[]`: `name` and `points` as `[x, z]` corners in order; **x** to the right, **z** down the plan.
- `walls[]`: only walls that are **no** room edge (a half partition).
- `doors[]` / `windows[]`: `at` = the **middle** of the door or window on the wall, `width`, `height`, for windows `sill` (bottom edge) and optional `sill_board`: `"auto"` (default: board inside and sill outside from 0.3 m sill height, none for a window directly above another opening), `"none"`, `"inside"` or `"outside"`. Two windows above each other (a transom light) are two windows with the same `at`.
- `furniture[]`: `at` = the middle, `type` (see the list above) or `name` (recognised in many languages), `width`, `depth`, `height`, `rotation` clockwise (0 = the front faces down the plan), `elevation` (e.g. a wall cabinet).
