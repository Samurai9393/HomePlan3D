# Episode 4 – Furniture: placing, rotating, resizing: coverage checklist

Sources: `docs/anleitung.md` 4.8, 4.9, 4.12, 4.14, 4.15 (plus keys, fixing and the right-click menu from 4.1, and the furniture bar in "3D beside" from 4.18), forms in `frontend/src/components/editor.ts` (`renderFurnitureLibrary`, `renderFurnitureForm`, `renderStateLinks`, `renderFurnitureLinks`, `renderParkingForm`, `renderContext`, `render3dBar`, `onKey`, pack list at the room), labels from `frontend/src/i18n.ts`.
Only built-in, free furniture. Too long for 8 minutes → two parts: **a** = part 1 "Place, rotate and resize furniture" (7:23), **b** = part 2 "Electrical furniture, parking spot and robot vacuum" (4:20). Time = position in the finished video (line start, real voice).

Without a vehicle pack the car itself and the warning "higher than the room" cannot be shown (only said). Not shown: the "Nothing found …" hint for an empty search, a tip in 3D that switches the TV (episode 10).

## Library (4.8)
- [x] a 0:22 · Tool "Furniture" at the top opens "Add furniture" on the right
- [x] a 0:22 / 0:29 · Tap a room first: "New furniture lands in the centre of "…"" (without a room: hint "Tap a room first")
- [x] a 0:35 / 0:42 · Sections Lights, Living, Dining, Kitchen, Bedroom, Bath & household, Work & other, Parking; expand and collapse
- [x] a 0:19 / 1:23 (pack area: hint "Open extensions", episode 5) · Everything here is built in and free; installed furniture packs are listed below
- [x] a 1:01 · Search field "Search furniture …": filters all sections, stays visible while scrolling
- [x] a 1:01 / 1:07 ("bench", "round table") · Search finds names, several words in any order
- [x] a 1:07 (Escape; "Nothing found" hint not shown, only the empty state) · Escape clears the search field; "Nothing found …" hint
- [x] a 0:46 · Hover over an item: small 3D preview
- [x] a 0:51 · Light bulb icon = light (can be linked to a light, switchable in 3D)
- [x] a 0:51 / b 0:21 · Lightning icon = electrical furniture (entity and power sensor)
- [x] a 1:12 · "Worktop": free-standing board, height = top edge (91 cm)
- [x] a 1:23 · Box "More furniture and Pro features" / "Open extensions" at the bottom (hint at extensions, episode 5)

## Placing and moving
- [x] a 1:33 · Click an item: furniture appears in the middle of the room, selected
- [x] a 1:44 · Dragging moves it; at a wall it turns its back to the wall and snaps flush
- [x] a 1:53 · "Alt" while dragging: free movement without snapping (fine grid 1 cm)
- [x] a 1:56 · Arrow keys: one grid step (5 cm), "Shift" 10 cm, "Alt" 1 cm
- [x] a 2:03 / 3:55 · "X (m)" / "Y (m)" for the exact position
- [x] a 1:33 · Dimension "W × D m" shown in the plan next to the selected furniture
- [x] a 1:40 · Marked front edge (line at the front)

## Rotating (in detail)
- [x] a 2:13 · Rotation handle in front of the furniture: dragging rotates in 15° steps, the front points towards the cursor
- [x] a 2:20 · Rotation handle with "Alt": 1° steps
- [x] a 2:24 · "↺ 90°" / "↻ 90°" at the bottom of the form
- [x] a 2:35 / 2:42 · Field "Rotation (°)": any number, e.g. 45; 0 = front points down in the plan
- [x] a 2:30 · Key "R" rotates 90° clockwise, "Shift+R" counter-clockwise
- [x] a 5:47 · Right-click menu "↻ Rotate 90°"
- [x] a 3:14 / 3:18 · "3D beside": tap furniture in 3D, bar at the bottom with "↺ 45°" / "↻ 45°"
- [x] a 2:46–3:03 · "Mirror": swap left and right (corner sofa the other way, cabinet with the door on the other side)
- [x] a 5:50 · "Mirror" in the right-click menu as well
- [x] a 3:03 · Rotating vs. mirroring: rotating turns the front, mirroring only swaps the sides

## Size and height
- [x] a 3:34 (Alt fine: key overview at 5:57) · Drag the corners of selected furniture to resize it (grid; Alt for fine steps)
- [x] a 3:39 · "Width (m)", "Depth (m)", "Height (m)"
- [x] a 3:21 · Size in the 3D bar: W, D, H
- [x] a 3:47–4:04 / 4:19 · "Height above the floor (m)": hang a shelf / network cabinet on the wall, put a tumble dryer on the washing machine
- [x] a 4:11 · Wall cabinet starts at 1.45 m by itself, wall TV centred at 1.3 m
- [x] a 4:19 · Height above the floor is always measured from the floor
- [x] a 4:19 · "Automatic height" resets it
- [x] a 3:21 · Height above the floor in the 3D bar (↕)
- [x] a 4:36 / 4:42 · Stacking: a table lamp places itself on the furniture below (table, nightstand, sideboard …)
- [x] a 4:29 · Ceiling lights, stairs and parking spots have no height above the floor (said; parking form b 2:18 without the field)

## Other form fields
- [x] a 4:51 · "Name (optional)" and "Show the name under the marker in 3D"
- [x] a 4:59 · "Item": swap the type without placing it again

## Fixing, duplicating, deleting
- [x] a 5:07 · "🔓 Fix" at the top of the form → "🔒 Release"
- [x] a 5:07 / 5:25 · Key "L" fixes / releases
- [x] a 5:12 · Fixed: cannot be dragged, no arrow keys, dragging moves the view; still editable in the form
- [x] a 5:19 · Deleting fixed furniture only after confirmation
- [x] a 5:19 · Fixed furniture stays in the 3D half as well (said)
- [x] a 5:28 · "Duplicate" (copy offset by 30 cm, selected)
- [x] a 5:34 · "Delete" in the form, "Delete" key
- [x] a 4:59 / 5:34 / 6:37 / 5:57 · "Ctrl+Z" / "Undo", "Ctrl+Y" / "Redo"
- [x] a 5:50 · "Esc" clears the selection / cancels

## Right-click menu (tablet: long press)
- [x] a 5:39 / 5:47 · "🔒 Fix", "⧉ Duplicate", "↻ Rotate 90°", "⇋ Mirror", "✕ Delete"

## Furnishing rooms (4.9)
- [x] a 6:09 · Tap a room → "Furnish …"
- [x] a 6:17 / 6:22 · Packs: kitchen run, L-shaped kitchen, bathroom, bedroom, living room, dining room, office, kids' room, hallway (with contents)
- [x] a 6:29 / 6:37 · Furniture goes to the walls; lights link to the lights of the area
- [x] a 6:37 · Message "n furniture items placed – Ctrl+Z takes them all back"; Ctrl+Z undoes the whole pack
- [x] a 6:45 · Adjust individual pieces afterwards

## Electrical furniture (4.12)
- [x] b 0:21 · Which: TV, media wall / living wall with TV, desk with monitor, washing machine, tumble dryer, dishwasher, radiator, robot vacuum (lightning icon)
- [x] b 0:33 / 0:42 · TV: "TV (media player or smart plug)"; an older TV on a smart plug uses that plug's switch
- [x] b 0:33 · "automatic": NeonPlan finds the matching entity in the area itself
- [x] b 0:47 / 1:13 · "Power sensor (W)": furniture shows its watts
- [x] b 0:33 (TV), 1:13 (washing machine), 1:36 (radiator), 3:47 · Lights (glow): TV glows while running; washing machine / tumble dryer / dishwasher while working; radiator glows while heating
- [x] b 1:22 · "Device (switch, plug …)" – also a status sensor (3D printer: running/printing)
- [x] b 1:29 / 1:36 · Radiator: "Heating (thermostat)"
- [x] b 0:55 · "Ask before switching"
- [x] b 0:55 (reference to episode 6) · "Marker in 3D" and own marker (details in episode 6)
- [x] b 0:55 (said, not shown) · Tapping in 3D switches it (TV)
- [x] b 1:05 · "Back to a device pin" (furniture back to a simple pin)

## State from (4.8)
- [x] b 1:43 · "State from (optional)": every furniture item glows at the top while the entity reports on / occupied / at home (bed with occupancy mat, armchair, sauna)
- [x] b 1:50 · "Second state (the other half)": two entities, two halves
- [x] b 1:56 / 2:01 · "Halves": "Left / right" or "Bottom / top (bunk bed)"

## Parking spots and vehicles (4.14)
- [x] b 2:05 / 2:12 · "Parking spot" in the "Parking" group: garage, driveway, property
- [x] b 2:18 · "Sensor "car present"": binary sensor, device tracker …; while it reports a car, the vehicle is there; without a sensor it is always there
- [x] b 2:28 · "Vehicle": model from the "Vehicles" pack (free: parking spot; hint "No vehicle pack imported …")
- [x] b 2:34 · "Size (%)" fits the model to the spot
- [x] b 2:40 · "Vehicle type sensor (optional)" + "State → vehicle" / "+ Mapping" (AI camera analysis)
- [x] b 2:34 (said; cannot be shown without a vehicle pack) · Warning when the vehicle is higher than the room
- [x] b 2:18 (visible in the form) · Parking spot has no height above the floor

## Robot vacuum (4.15)
- [x] b 2:51 / 2:58 · Furniture "Robot vacuum", field "Robot vacuum" (vacuum entity)
- [x] b 2:58 / 3:07 · While it vacuums, it drives paths in 3D through the room of its station and returns; the path is simulated
- [x] b 3:16 · "Current room (sensor)": found automatically on the robot's device (Roborock, Dreame); another one can be selected
- [x] b 3:26 · Room name / area is compared, ignoring case and accents (e.g. "kitchen" and "Kitchen")
- [x] b 3:26–3:41 · When the robot changes room, it drives there in 3D; if no room matches, it stays in the station's room
- [x] b 3:33 · Paths arc around cabinets, sofas, beds and kitchen runs; under tables, chairs and benches, over rugs and under wall cabinets it drives straight through

## Framing
- [x] a 0:00–0:13, 7:04 / b 0:00–0:11, 3:56 · Teaser, "In this video …", outro with recap, next episode, links, old wall tablets
- [x] a 1:23 / b 4:04 · At the start and the end: there are extensions with more furniture, episode 5 shows them
- [x] a 0:00 / 7:04, b 0:00 / 3:56 · Version line "recorded with HomePlan 3D 1.12.6"
