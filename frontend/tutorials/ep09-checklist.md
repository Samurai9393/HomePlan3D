# Episode 9 – Outdoor area and garden: coverage checklist

Sources: `docs/anleitung.md` 4.17 (all of it), plus the garden parts of 4.8/4.11 (outdoor lights, plant, height above the floor, rotation, duplicating) and 4.14 (parking spot); form `renderOutdoorForm`, `renderOutdoorHandles`, `addOutdoor`, `duplicateOutdoor`, `deleteOutdoor`, arrow keys, rectangle corners (`outvertex`) in `frontend/src/components/editor.ts`, `OUTDOOR_TYPES`/`OUTDOOR_TOP`/`outdoorDrop` in `frontend/src/model.ts`, `viewer/outdoor.ts` (rendering, holes, open edge), labels from `frontend/src/i18n.ts`.
Too much for 8 minutes in one piece → two parts: **a** = part 1 "Garden, terrace and sloping driveway" (4:28), **b** = part 2 "Hedges, fence, pergola and garden lights" (4:41). Time = position in the finished video (line start, real voice). House and garden are invented (one ground floor with a garage and gable roof); only built-in furniture appears on screen.

## Tool "Outdoor"
- [x] a 0:26 · Tool "Outdoor" at the top of the toolbar
- [x] a 0:26 · Hint at the bottom of the plan "Drag to draw an outdoor area (lawn, terrace, pool …)"
- [x] a 0:36 · Draw a rectangle (garden behind the house)
- [x] a 0:40 · New area is "Lawn" at first
- [x] a 0:40 · Form "Outdoor area": "Type", position/size, "Height offset", "Slope", checkboxes
- [x] a 0:51 · Tool jumps back to "Select", "Outdoor" has to be clicked again for each area

## Moving and resizing
- [x] a 0:58 · Drag an area = move it
- [x] a 1:01 · Drag corners = resize; a rectangle stays a rectangle (neighbouring corners follow)
- [x] a 1:07 · "X (m)" / "Y (m)" = top-left corner; "Width (m)" / "Depth (m)" as numbers (depth 8 m)
- [x] a 1:16 · Arrow keys move in small steps (keycaps → / ←)
- [x] a 1:16 · "Duplicate" (copy next to it)
- [x] a 1:16 · "Delete" / Delete key

## Free outlines: property from several areas
- [x] a 1:25 · Outdoor areas are rectangles – the property around the house is made of several lawn areas (left, front, right)
- [x] a 1:34 · In 3D a glowing line at every seam
- [x] a 1:38 · "Show the outline" unchecked: no glowing line at the edge (on all four lawn areas)
- [x] a 1:49 · Result: lawn as if from one piece (3D)

## Every type (OUTDOOR_TYPES)
- [x] a 0:40 · "Lawn" (default)
- [x] a 1:52 · "Terrace" (a little higher than lawn, its own surface, 3D)
- [x] a 2:03 · "Path" (to the front door)
- [x] a 2:07 · "Driveway" (in front of the garage)
- [x] a 2:12 · "Pool" (water below ground)
- [x] a 2:16 · "Flower bed" (a little higher than lawn)
- [x] a 2:42 · "Wild patch" (unmown corner)
- [x] b 0:21 · "Hedge"
- [x] b 0:48 · "Fence"
- [x] b 1:17 · "Pergola / frame"

## Holes
- [x] a 2:21 · Pool in lawn: lawn lies over it, water missing (3D)
- [x] a 2:29 · "Cut out of the areas beneath": a hole in every area drawn earlier that it lies entirely inside
- [x] a 2:38 · Result in 3D: water visible
- [x] a 2:42 · Wild patch in the middle of the lawn with the checkbox
- [x] a 2:52 · Order: only areas drawn earlier count

## Height offset and slope
- [x] a 2:56 · "Height offset (m, − = lower)": plus raises, minus lowers
- [x] a 3:02 · Raised terrace 0.3 m (3D)
- [x] a 3:08 · Minus value: area lower (garage in the basement); lights move with it
- [x] a 3:17 · Sloping driveway down to the garage
- [x] a 3:23 · "Height offset" 0.6 (high edge at the street)
- [x] a 3:28 · "Slope (m)" 0.6 and "Falls towards" "down (+Z)" (options list right/left/down/up shown)
- [x] a 3:38 · Hint "Height difference from the high to the low edge …"
- [x] a 3:46 · 3D: driveway falls towards the garage
- [x] a 3:51 · Front garden and path the same way (whole front garden on a slope)
- [x] a 3:56 · Slope in the garden / ramp; fence posts and lights stand on the sloping surface (lights shown in b 3:06)

## Hedges
- [x] b 0:21 · Hedge = outdoor area, narrow strip, type "Hedge"
- [x] b 0:28 · "Height (m)" only for hedge, fence and pergola: thuja privacy screen 2.5 m
- [x] b 0:35 · Low hedge as an edging 0.5 m
- [x] b 0:42 · 3D: green blocks, tall at the side, low at the back

## Fence
- [x] b 0:48 · Draw a fence (yard next to the garage), type "Fence"
- [x] b 0:54 · Runs all the way round at first, "Height (m)" 1.2
- [x] b 1:01 · "Open (leave out the last edge)": on the drawn rectangle the left edge – the fence leans on the house
- [x] b 1:11 · 3D: posts about every 2 m, two rails, open towards the house wall

## Pergola / frame
- [x] b 1:17 · Type "Pergola / frame" on the terrace
- [x] b 1:22 · Corner posts, beams and rafters at the "Height" (2.4 m); height offset like the raised terrace (0.3)
- [x] b 1:33 · "X-bracing"
- [x] b 1:37 · Slope 0.3, "Falls towards" down (away from the house)
- [x] b 1:43 · "Open" for the pergola as well; frame for a carport structure / base of a roller roof

## Outdoor lights
- [x] b 1:52 · Outdoor lights are furniture: tool "Furniture", section "Lights", "Path light", "Garden spot"
- [x] b 2:04 · Without a selected room the furniture lands in the middle of the plan; with "X (m)" / "Y (m)" at the path
- [x] b 2:13 · "Light or switch": light from Home Assistant
- [x] b 2:19 · "Duplicate": several lights follow the same light
- [x] b 2:29 · "Wall light" outside: does not snap outside, set in front of the wall with X/Y
- [x] b 2:37 · "Rotation (°)" 180 (facing outwards), "Height above the floor (m)" 2 ("Automatic height" appears)
- [x] b 2:45 · Light "Front door outdoor light"
- [x] b 2:49 · "Garden spot" at the pool, "Glow in 3D (%)" 150
- [x] b 2:58 · Outdoor lights light all outdoor areas and the facade; in the evening in 3D
- [x] b 3:06 · Path lights stand on the sloping front garden, light on the path and facade

## Plants
- [x] b 3:13 · Built-in "Plant" ("Living") on the terrace, "Height" 1.5
- [x] b 3:22 · One sentence: trees, shrubs and brush come with the "Garden & Terrace" pack; width / height set the crown and growth

## Parking spot (4.14, garden part)
- [x] b 3:30 · Expand "Parking" section, "Parking spot", into the driveway (X/Y, rotation)
- [x] b 3:37 · Select "Sensor "car present""
- [x] b 3:44 · "Vehicle": model from the "Vehicles" pack (hint in the form), reference to episode 4

## Locking and result
- [x] b 3:50 · "🔒 Floor plan" locks rooms, walls, doors and outdoor areas (area cannot be dragged, hint "Fixed …")
- [x] b 4:01 · Furniture and lights stay free; second click unlocks (shown)
- [x] b 4:06 · The whole garden in the 3D view in the evening

## Not shown (with reason)
- Free (non-rectangular) outlines of an outdoor area: the editor cannot create them – drawn areas are rectangles and dragging a corner keeps the rectangle. Instead the video shows assembling several rectangles with "Show the outline" off; the manual describes it the same way.
- Outdoor areas have no own "Fix": they only follow the floor-plan lock (shown).
- Small lights are placed via X/Y instead of dragging: at 0.16 m, dragging at this plan zoom hits the corner handle (resize) instead of the furniture.
