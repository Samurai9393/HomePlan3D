# Episode 7 – Roofs part 1: gable, hip and friends: coverage checklist

Sources: `docs/anleitung.md` 4.19 (first half: simple roof, roof sections, shapes), forms in `frontend/src/components/editor.ts` (`renderSettings` → roof, `renderRoofPanel`, `renderRoofSectionForm`, `renderRoofFloors`, `useRoofSections`, `addRoofSection`, `roofFixed`, key L in `onKey`), labels from `frontend/src/i18n.ts`.
Too much for 8 minutes in one piece → two parts: **a** = part 1 "Roof sections and all roof shapes" (4:50), **b** = part 2 "Eave, pitch, pent roof and garage" (4:52). Time = position in the finished video (line start, real voice).
The house is invented for this episode: two floors in an L shape, a utility lean-to in the inner corner, and a garage.

Only mentioned on purpose (episode 8): "+ dormer above/below", cross gables, knee walls / sloping ceilings (hint text under the top of walls), "Canopy" (patio roof, carport), "Take the floor's outline" / "Back to the rectangle", "+ roof window", "Roof stays" in 3D.

## Simple roof (settings)
- [x] a 0:23 · "Settings" at the bottom of the sidebar (floor), expand
- [x] a 0:30 · "Roof": "No roof", "Flat roof", "Gable roof", "Roof sections (custom)" (list shown, "Gable roof" chosen)
- [x] a 0:39 · "Ridge": "Along the long side" / "Along the short side (e.g. terraced house)"
- [x] a 0:39 · "Roof pitch (°)"
- [x] a 0:39 · "Roof overhang (m)"
- [x] a 0:48 · The simple roof lies over the whole top floor (shown in 3D)
- [x] a 0:54 · With the L-shaped house it covers the whole rectangle; lean-to and garage get none → roof sections
- [x] a 1:03 · Enough for a simple rectangular house

## Creating roof sections
- [x] a 1:09 · Tool "Roof" at the top of the toolbar
- [x] a 1:09 · "Create roof sections from the rooms" (button in the tool, while no section-based roof is active)
- [x] a 1:43 · Same via Settings → "Roof" → "Roof sections (custom)" (said, option visible at 0:30)
- [x] a 1:19 · Proposal from the rooms: per floor the parts without a higher floor above, all with gable roofs
- [x] a 1:29 · Result here: main house + side wing (upper floor), garage + lean-to (ground floor)
- [x] a 1:36 · The tool opens "3D beside" with the whole house, changes visible at once
- [x] a 1:50 · Hint "🏠 Roof: only roof sections and roof windows can be moved here; rooms and furniture are locked."

## Selecting, floor, drawing, moving, resizing
- [x] a 1:56 · List: number · shape · size · ridge height; plan label at the ridge (number · shape · ridge height)
- [x] a 2:04 · Tap (list or plan) selects, form on the right, corners in the plan
- [x] a 2:12 · "‹ Roof sections" back to the list
- [x] a 2:15 · Floor buttons at the top (upper floor / ground floor): which rooms the plan shows, for drawing along the walls
- [x] a 2:25 · Hint line at the bottom: "Drag to draw a roof section · tap selects · drag moves · corners resize"
- [x] a 2:30 · "Delete" (the garage proposal)
- [x] a 2:36 · Draw a new roof section in the plan
- [x] a 2:41 · New section: gable roof, height from the walls below, no matter which floor the plan shows
- [x] a 2:51 · Dragging moves the section
- [x] a 2:55 · Corners resize it; section up to the outer face of the walls, overhang is added automatically
- [x] a 3:03 · "Duplicate" (double garage), "Undo"

## Shapes and ridge direction
- [x] a 3:12 · "Shape" selection (eight shapes, list shown)
- [x] a 3:19 · "Gable" in 3D
- [x] a 3:25 · "Hip" in 3D
- [x] a 3:30 · "Half-hip" in 3D
- [x] a 3:36 · "Pyramid" in 3D
- [x] a 3:43 · "Mansard" in 3D
- [x] a 3:48 · "Pent" in 3D
- [x] a 3:54 · "Flat" in 3D
- [x] a 3:57 · "Parapet" in 3D
- [x] a 4:04 · "Ridge ↔" / "Ridge ↕" (ridge direction), effect on the height in 3D
- [x] a 4:10 · "Ridge height" at the bottom of the form and in the plan

## Eave, pitch, sides
- [x] b 0:18 · Two sides per section, "Eave (m)" and "Pitch (°)" per side
- [x] b 0:25 · Eave = height of the lower roof edge; sides are called left/right (Ridge ↕) or top/bottom (Ridge ↔)
- [x] b 0:34 · All heights are measured from the floor (5.25 m = walls of the upper floor)
- [x] b 0:40 · Lower eave on one side → catslide roof (in 3D)
- [x] b 0:49 · "Undo"; "Pitch" on the right 50° (in 3D)
- [x] b 0:56 · "Ridge height" changes with eave and pitch: form, list, plan

## Lean-to with a pent roof
- [x] b 1:03 · Shape "Pent" for the lean-to against the house wall
- [x] b 1:10 · Pent roof rises from the first side (here the wrong way round, in 3D)
- [x] b 1:17 · "⇅ Swap sides" (high side against the house wall)
- [x] b 1:22 · Pent: only one eave and one pitch; set to 15°
- [x] b 1:28 · Where a section meets a taller part of the house, the overhang is dropped there

## Top of walls, sits on floor
- [x] b 1:33 · "Top of walls (m)": where the walls under the roof end (lean-to 2.5 m)
- [x] b 1:42 · Gables / knee walls raised up to the roof, room under the pent roof closed (in 3D)
- [x] b 1:48 · A new section takes the top of walls from the rooms below; lower than the ceiling → sloping ceilings (episode 8)
- [x] b 1:58 · "Sits on floor" shows the floor of the section
- [x] b 2:05 · Choose another floor: the section jumps to its walls, top of walls and eave move with it (in 3D)
- [x] b 2:12 · Typical case: section on the wrong floor (upper floor with a stair opening); back to "Ground floor"

## Overlaps
- [x] b 2:23 · Side wing and lean-to reach into the main house (shown in the plan), on purpose
- [x] b 2:29 · The lower roof runs under the higher one, the ridge disappears into the roof section (in 3D)
- [x] b 2:38 · Pulling the section further in changes nothing in 3D; sections do not have to meet exactly

## Garage with a flat roof
- [x] b 2:46 · Shape "Flat"
- [x] b 2:49 · With Flat / Parapet only "Height (m)" instead of eave and pitch
- [x] b 2:55 · "Parapet" (upstand)
- [x] b 3:01 · "Roof overhang (m)" per roof section (garage: 0)
- [x] b 3:08 · Solar panels with the "Energy" tool, also on the flat roof; Energy Pro (one sentence)
- [x] b 3:17 · "Canopy", dormer buttons, "Take the floor's outline" → next episode (shown in the picture)

## Fixing, creating again, back to one roof
- [x] b 3:24 · "🔓 Fix" in the form, key L
- [x] b 3:29 · Fixed: dragging only moves the view, hint "🔒 Fixed – release it first to move it (lock in the form, right-click or key L)" at the bottom
- [x] b 3:35 · "🔒 Release" / key L
- [x] b 3:39 · "🔒 Floor plan" in the toolbar locks all roof sections ("Floor plan locked" in the form), a second click unlocks
- [x] b 3:48 · "Create again from the rooms" with confirmation ("Replace all roof sections with a new proposal …?")
- [x] b 3:58 · "Undo" brings back your own sections
- [x] b 4:02 · "Back to one roof" → simple gable roof
- [x] b 4:08 · Roof sections stay saved, "Create roof sections from the rooms" brings them back
- [x] b 4:16 · Result in the 3D view
