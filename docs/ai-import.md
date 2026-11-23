# Let an AI write your plan

*Second version below.*

Many people already ask ChatGPT, Claude or Gemini to turn their floor plan into HomePlan 3D. This works best with the template below: the AI writes the simple [import format](plan-format.md). Save the result as a JSON file and load it under **Editor → Backup → Import …**.

Tip: for a Sweet Home 3D file, a CAD drawing, an iPhone scan or a 3D model you do not need an AI – use the editor's own import options directly.

## Template (copy it into the chat, then attach your plan)

```text
You convert floor plans into the "neonplan-import" JSON format of HomePlan 3D.

Output ONLY one JSON object, no explanation, in this structure:
{
  "format": "neonplan-import",
  "units": "m",
  "rooms_at": "centre",
  "floors": [
    {
      "name": "<floor name>",
      "elevation": <metres above the ground floor, ground floor 0>,
      "height": <storey height in metres, usually 2.5>,
      "rooms": [ { "name": "<room>", "points": [[x, z], ...] } ],
      "doors": [ { "at": [x, z], "width": 0.9 } ],
      "windows": [ { "at": [x, z], "width": 1.2, "height": 1.3, "sill": 0.9 } ],
      "furniture": [ { "type": "<kind>", "at": [x, z], "width": w, "depth": d, "rotation": 0 } ]
    }
  ]
}

Rules:
- Metres. x runs to the right, z runs DOWN the plan (top of the drawing = small z). Put the top-left corner of the house at [0, 0].
- Room outlines follow the MIDDLE of the walls; neighbouring rooms use exactly the same corner coordinates where they meet. List the corners in order around the room, do not repeat the first one.
- Use the measurements written in the plan. If only inside dimensions are given, add half the wall thickness (inner walls 0.12 m, outer walls 0.3 m unless stated).
- Doors and windows: "at" is the middle of the opening ON the wall line (a point on a room edge). A door between two rooms is listed once.
- Furniture "type" is one of: sofa, sofa_l, armchair, coffee_table, tv_board, sideboard, shelf, plant, rug, table, table_round, chair, bench, kitchen, kitchen_wall, kitchen_tall, island, sink, stove, dishwasher, fridge, bed, bunk_bed, nightstand, wardrobe, dresser, bathtub, shower, wc, washbasin, washer, dryer, desk, office_chair, tall_cabinet, stairs, radiator. "rotation" in degrees clockwise; 0 = the front faces down the plan, 180 = up.
- One entry in "floors" per storey, lowest first (a cellar has a negative elevation).
- If something is unreadable, leave it out rather than guessing wildly.

Here is my floor plan:
```

Then save the AI's answer as a `.json` file and load it under **Editor → Backup → Import …**. Check the plan: rooms, doors and windows should sit where they are in your floor plan. If something is off, tell the AI what to change ("the kitchen is 4.2 m wide, not 3.8") and try again.

---

# Let an AI write your plan

Many people already ask ChatGPT, Claude or Gemini to turn their floor plan into HomePlan 3D. This works best with the template below: the AI writes the simple [import format](plan-format.md). Save the result as a JSON file and load it under **Editor → Backup → Import …**.

Tip: for a Sweet Home 3D file, a CAD drawing, an iPhone scan or a 3D model you do not need an AI – use the editor's own import options directly.

## Template (copy it into the chat, then attach your plan)

```text
You convert floor plans into the "neonplan-import" JSON format of HomePlan 3D.

Output ONLY one JSON object, no explanation, in this structure:
{
  "format": "neonplan-import",
  "units": "m",
  "rooms_at": "centre",
  "floors": [
    {
      "name": "<floor name>",
      "elevation": <metres above the ground floor, ground floor 0>,
      "height": <storey height in metres, usually 2.5>,
      "rooms": [ { "name": "<room>", "points": [[x, z], ...] } ],
      "doors": [ { "at": [x, z], "width": 0.9 } ],
      "windows": [ { "at": [x, z], "width": 1.2, "height": 1.3, "sill": 0.9 } ],
      "furniture": [ { "type": "<kind>", "at": [x, z], "width": w, "depth": d, "rotation": 0 } ]
    }
  ]
}

Rules:
- Metres. x runs to the right, z runs DOWN the plan (top of the drawing = small z). Put the top-left corner of the house at [0, 0].
- Room outlines follow the MIDDLE of the walls; neighbouring rooms use exactly the same corner coordinates where they meet. List the corners in order around the room, do not repeat the first one.
- Use the measurements written in the plan. If only inside dimensions are given, add half the wall thickness (inner walls 0.12 m, outer walls 0.3 m unless stated).
- Doors and windows: "at" is the middle of the opening ON the wall line (a point on a room edge). A door between two rooms is listed once.
- Furniture "type" is one of: sofa, sofa_l, armchair, coffee_table, tv_board, sideboard, shelf, plant, rug, table, table_round, chair, bench, kitchen, kitchen_wall, kitchen_tall, island, sink, stove, dishwasher, fridge, bed, bunk_bed, nightstand, wardrobe, dresser, bathtub, shower, wc, washbasin, washer, dryer, desk, office_chair, tall_cabinet, stairs, radiator. "rotation" in degrees clockwise; 0 = the front faces down the plan, 180 = up.
- One entry in "floors" per storey, lowest first (a cellar has a negative elevation).
- If something is unreadable, leave it out rather than guessing wildly.

Here is my floor plan:
```

Then save the AI's answer as a `.json` file and load it under **Editor → Backup → Import …**. Check the plan: rooms, doors and windows should sit where they are in your floor plan. If something is off, tell the AI what to change ("the kitchen is 4.2 m wide, not 3.8") and try again.