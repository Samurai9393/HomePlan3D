# Episode 2 – Floor plan as a template: floor plan, doors and windows – coverage

Sources: `docs/anleitung.md` 4.1 (operation), 4.2 (background image), 4.3, 4.4, 4.6, 4.7; forms in
`editor.ts` (`renderBackgroundForm`, `renderRoomForm`, `renderEdgeHeights`, `renderFreeWallForm`,
`renderOpeningForm`, `renderStyleSelect`, `renderSidelightFields`), labels from `i18n.ts`.
Three parts: **A** = part 1 (image, rooms, walls, `ep02a`), **B** = part 2 (doors, garage door, `ep02b`), **C** = part 3
(windows, sensors, blinds, `ep02c`). Times from the finished recordings (voice DE/EN): `[x] A 1:23` = part 1 at 1:23.

## Part 1 – template (floor plan image)

- [x] A 0:34 Starting point: "Add floor" → "Ground floor"
- [x] A 0:41 Expand the "Template (floor plan image)" section at the bottom of the sidebar
- [x] A 0:48 "Choose image …" – photo or scan, PNG, JPG or WebP
- [x] A 0:54 The image lies under the grid (one square = 1 m), at first 12 m wide, or over the existing rooms
- [x] A 1:02 The template exists only in the editor, not in 3D; every floor has its own
- [x] A 1:02 "Opacity" – make the image stronger or fainter
- [x] A 2:09 Zoom with the mouse wheel, drag the view on an empty spot (tablet: two fingers)
- [x] A 1:12 "Move, scale and turn" – the image gets handles like a piece of furniture
- [x] A 1:18 Drag the image = move it
- [x] A 1:19 Handle at the bottom right = make it larger / smaller
- [x] A 1:23 Round handle at the top = turn it, with Shift in 15° steps
- [x] A 1:42 Hint text in the form (handles / "The picture stays put …")
- [x] A 1:35 "Done" fixes the image, then you can draw over it undisturbed
- [x] A 1:28 Fields "X (m)" and "Y (m)"
- [x] A 1:28 "Width in plan (m)"
- [x] A 1:28 "Rotation (°)" down to a tenth of a degree
- [x] A 1:55 "Straighten": two points on a wall that should be horizontal or vertical – the image turns to match
- [x] A 1:47 "Cancel straightening"
- [x] A 2:19 "Scale with a ruler": start and end of a distance whose length you know (dimensioned wall, dimension chain)
- [x] A 2:33 Note "Measured in plan: … m"
- [x] A 2:33, A 2:42 Type "Real length (m)", "Apply the scale" – the first point stays where it is
- [x] A 2:19 "Cancel ruler"
- [x] A 2:57 Order: straighten first, then scale, then draw
- [x] A 2:49 Tip: move a house corner onto a grid point – corners then snap neatly onto the walls
- [x] A 2:57 "Remove template"

## Part 1 – tracing the rooms

- [x] A 3:07 "Rectangle" for rectangular rooms (from episode 1)
- [x] A 3:13 "Free shape": point by point, e.g. an L-shaped room
- [x] A 3:20 Hint at the bottom of the plan about the active tool
- [x] A 3:28 Close a free shape: tap the first point or press Enter; Esc cancels
- [x] A 3:20, A 3:28 Snapping: grid, corners and edges of other rooms, guide lines; Alt = without snapping
- [x] A 3:52 Drag corners with "Select"
- [x] A 3:59 "+" on an edge inserts a point (bay window)
- [x] A 4:07 "Corners" list with X / Y for each point
- [x] A 4:07 "Delete corner" (×)
- [x] A 4:16 Arrow keys move the selection (grid step, Shift 10 cm, Alt 1 cm)
- [x] A 4:23 "Undo" / Ctrl+Z, "Redo" / Ctrl+Y
- [x] A 4:23 "Whole plan"
- [x] A 3:47 Link rooms to areas (from episode 1, only mentioned here)

## Part 1 – walls

- [x] A 4:32 Walls are created automatically: shared edge = interior wall, outer edge = exterior wall, corners and T-joints are mitred
- [x] A 4:43 Wall thicknesses under "Settings": "Exterior wall (m)", "Interior wall (m)"
- [x] A 4:53 "Wall heights" box: each wall by its corners ("Wall 2–3", numbers in the plan) with its length
- [x] A 5:00 Hover over a row / tap into the field – the wall lights up in the plan
- [x] A 5:00 Shared walls: neighbouring rooms automatically split a wall into "Part 1", "Part 2", each piece with its own height
- [x] A 5:24 "Height (m)" per wall – parapet or countertop; low walls are lighter in the plan
- [x] A 5:24 Windows and doors in a low wall end at the wall height
- [x] A 5:34 If two rooms share a wall, the lower height applies
- [x] A 5:34 ↥ resets to the full room height
- [x] A 5:11 ✂ splits a wall (two heights in one run)
- [x] A 5:17 "Split point from corner (m)", marked as a tick in the plan
- [x] A 5:17 ⨉ joins the parts again
- [x] A 5:50 "Thickness (m)" per wall (e.g. 0.365 / 0.115)
- [x] A 5:50, A 5:58 ↺ resets the thickness to the house value; for a split wall the thicker value applies and the wall stays centred
- [x] A 5:40 "No wall" – open floor plan, separate areas in Home Assistant, light falls through; ↥ brings it back
- [x] A 6:04 "Wall" tool: draw a single, free-standing wall (room divider, half wall)
- [x] A 6:04, A 6:13 Shift keeps it straight, Alt draws without snapping; if it meets a room wall, the corner is mitred
- [x] A 6:27 Selected: drag the ends by their handles, move the whole wall by its line
- [x] A 6:13, A 6:20 "Length (m)", "Wall thickness (m)", "Height (m)" (half-height wall)
- [x] A 6:27 Doors and windows work in single walls too; "Delete" removes them with it
- [x] A 6:36, A 6:41 "3D beside" for checking, at the top "Tall walls" / "Cut"

## Parts 2 and 3 – inserting doors and windows

- [x] B 0:19 Rooms are linked to their areas (episode 1) – contacts and blinds come from there
- [x] B 0:35 "Doors & windows" tool, then tap a wall (room wall or single wall); hint at the bottom
- [x] B 2:13 After that the tool jumps back to "Select" – choose it again before every opening
- [x] B 0:55, C 0:25, C 1:37 Type buttons: "Door", "Front door", "Double door", "Window", "Double window", "Terrace door", "French doors", "Garage door", "Glass wall"
- [x] B 3:31, C 2:04 The last chosen type applies to the next opening
- [x] B 0:48 In an exterior wall a door automatically becomes a front door ("Automatic (front door)")
- [x] B 1:04 "Width (m)"
- [x] B 1:04 "Centre from corner (m)"
- [x] B 1:04 "Height (m)"
- [x] C 0:34, C 1:37 "Sill height (m)" (window); sill height 0 = terrace door
- [x] B 1:15 Drag along the wall with "Select"; arrow keys nudge along the wall
- [x] B 1:22, B 3:14 "Swap hinge side" (with two leaves "Swap main leaf")
- [x] B 1:22 "Reverse opening direction" (doors)
- [x] B 1:31, B 3:14 "Hinge (seen from the room)" Left / Right; "Main leaf (seen from the room)"
- [x] B 2:58, B 1:53 "Style" doors: "Automatic (…)", "Room door", "Front door", "Front door with glass", "Front door with sidelight", "Front door with two sidelights", "Glass door", "Sliding door", "Opening (no door)"
- [x] B 1:59 Sidelight: "Sidelight width (m)" (empty = automatic), "Sidelight on the hinge side"
- [x] B 2:06 Two sidelights: "Left sidelight (m)" / "Right sidelight (m)"
- [x] B 3:38 Opening: just an opening without frame and door leaf, light falls through
- [x] C 0:43, C 1:08 "Style" windows: "Default", "With glazing bars", "Glass wall (fixed)"
- [x] C 1:55 Glass wall: fixed, floor-to-ceiling glazing, free width and height
- [x] B 4:19, B 4:26 "Highlight in 3D": "When open" / "When closed (e.g. WC)" – needs a contact
- [x] B 3:22 "Show closed without a sensor" (otherwise a door without a contact stands half open)
- [x] B 3:22 Hint text at the bottom of the form
- [x] B 4:46, B 4:46 Lock at the top of the form; "Delete" / Delete key
- [x] B 1:31 "Back to …"

## Parts 2 and 3 – sensors, blinds, garage door, live in 3D

- [x] B 1:40, B 2:32 Automatic: contacts and blinds from the room's area – "Automatic (Name)" / "Automatic (none found)"
- [x] B 2:32, B 2:52 One after another: with several doors in one room, check the assignment and choose by hand
- [x] B 2:42 Dropdown with search, "None"
- [x] C 0:48, C 2:58 "Blind" (window) – moves in 3D with the position of the cover entity
- [x] B 3:52, C 3:21 "Drive (motorised door or gate)" for doors and gates; blinds also in front of front doors / terrace doors / sliding doors
- [x] B 4:08, C 3:04 "Position sensor (live)" (e.g. Homematic "Level")
- [x] C 3:13 "Sensor counts the other way round"
- [x] B 4:08 "Ask before switching"
- [x] B 1:47, C 1:18 "Contact" – the door swings open, the window opens
- [x] C 2:12 "Sensor type": "Window contact (open/closed)", "Handle sensor (open/tilted/closed)", "Contact + tilt sensor"
- [x] C 2:19 "Handle sensor"
- [x] C 2:31 "Tilt sensor"
- [x] C 2:39 "Tilt angle sensor (°, optional)", "Angle that counts as fully tilted (°)", "Offset: angle reported while closed (°)", "The angle counts the other way round"
- [x] C 2:49 Tilted also counts for the warning "Window open in the rain"
- [x] C 0:48, C 1:43, B 3:14 Two leaves: "Main leaf" / "Second leaf" with their own sensors (doors: "Contact main leaf" / "Contact second leaf")
- [x] B 3:45, B 3:52, B 4:01 Garage door: cover or garage-door contact from the area, the open part lies under the ceiling, no style
- [x] C 3:32 Live in 3D: door swings, window open / tilted, blind moves, garage door moves, warm glow
- [x] C 2:49 Extension (one sentence): "Weather outside" shows the rain on the house
- [x] B 4:37 Tip: "🔒 Floor plan" locks rooms, walls, doors and windows once everything fits
