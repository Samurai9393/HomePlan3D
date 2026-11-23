# Episode 3 – Floors, stairs and cellars: coverage checklist

Sources: `docs/anleitung.md` 4.2, 4.16, 4.18 (plus 5.1/5.2 for the floors in 3D), forms in
`frontend/src/components/editor.ts` (floor form, furniture form, floor-opening tool, 3D beside),
`frontend/src/viewer/build.ts` (`stairHoles`), labels from `frontend/src/i18n.ts`.
Too long for 8 minutes → two parts: **a** = part 1 "Floors and cellars" (5:15), **b** = part 2 "Stairs and
floor openings" (4:34). Time = position in the respective draft (estimated timing, no voice).

## Floors (4.2)
- [x] a 0:24 Floor list at the top of the sidebar ("Floors"): tapping a floor switches the floor in the plan
- [x] a 0:34 Floor form appears only with nothing selected ("Back to the floor")
- [x] a 0:52 "+ Add floor" opens the menu "Floors from Home Assistant:" with "· Level n"
- [x] a 0:52 Only HA floors that are still missing appear in the menu
- [x] a 0:52 / 3:20 "Empty floor" (shown in the menu; when all HA floors are assigned, the button creates an empty floor directly)
- [x] a 0:59 New floor from HA: its height comes from the level, cellar level −1 → −2.75
- [x] a 1:03 Floors are sorted from bottom to top (the cellar ends up at the bottom)
- [x] a 0:41 "Name"
- [x] a 0:41 / 1:03 "Height above the floor (m)"; negative = cellar below ground
- [x] a 0:46 / 1:12 / 3:03 "Ceiling height (m)" (cellar and attic 2.20)
- [x] a 1:16–1:23 Rule of thumb: height above the floor + ceiling height + slab (0.25 m) = next floor (cellar −2.45)
- [x] a 0:46 / 3:27 "Floor in Home Assistant" (dropdown, "– none –"; already linked HA floors are missing)
- [x] a 1:30 "Add rooms from HA areas (4)": one 4 × 3 m tile per area, already linked
- [x] a 1:45 Drag a room: corners snap to other rooms
- [x] a 1:50 Place a room precisely with "X (m)" / "Y (m)"
- [x] a 2:02 "Close gaps": up to 60 cm, the gap becomes the interior wall thickness (message "2 spots closed, interior wall now 0.12 m")
- [x] a 2:02 When it helps: measured inside dimensions
- [x] a 2:15–2:31 "Shift the floor (m)": X and Y fields + "Shift" (what moves with it, what stays)
- [x] a 2:38 "Turn 90°" (clockwise about the centre of the rooms)
- [x] a 2:45 Ctrl+Z / "Undo"
- [x] a 2:49 "Take every floor along (whole house)"
- [x] a 3:58–4:10 "View as this floor's start" (turn the 3D pane, then click)
- [x] a 4:17 ↺ next to the start view removes it
- [x] a 3:49 Message without "3D beside"
- [x] a 3:34 "Move up" / "Move down" (only the order of the list; position is set by height above the floor)
- [x] a 3:42 "Delete floor" (confirmation, including its rooms, Ctrl+Z)
- [x] a 0:30 / 3:08 Lower floor dashed beneath the plan
- [x] a 3:16 Saved automatically

## Stairs (4.16)
- [x] b 0:33 "Furniture" tool → library, search field "Search furniture …"
- [x] b 0:25 Tap a room first: new furniture lands in its centre
- [x] b 0:39 "Stairs" (in "Work & other", free)
- [x] b 0:45 Height automatically up to the floor above ("Height (m)" 2.75)
- [x] b 0:51 Direction: rises from the marked front edge towards the back (arrow in the plan)
- [x] b 0:57 Turning: "↻ 90°" and "Rotation (°)" ("↺ 90°" is beside it)
- [x] b 1:03–1:09 Moving (drag), "X (m)" / "Y (m)", "Width (m)" / "Depth (m)"
- [x] b 0:25 The stairs belong to the lower floor
- [x] b 1:15–1:31 If they reach the floor above, they cut the opening themselves (shown in 3D)
- [x] b 1:36 The opening must lie entirely inside a room above
- [x] b 1:09 Hint text in the form ("The stair rises towards the back …")
- [x] b 3:09 "Furniture item" dropdown: swap the type without placing it again (L → U)
- [x] b 2:53 Pack "Stairs & railings": straight, floating, L, U, spiral, space-saver, outdoor stairs, landing, railings (mentioned once as an extension)
- [x] b 3:00 L-stairs: direction with "Rotation", other side with "Mirror"
- [x] b 3:27 Pack stairs have a fixed height (3.80): set "Height (m)" to the floor spacing (common mistake)
- [x] b 3:15–3:35 Spiral stairs cellar → ground floor (opening in the hallway, shown in 3D)
- [x] b 3:41–3:51 Space-saver stairs upper floor → attic (opening in the attic, shown in 3D)

## Floor openings (4.16)
- [x] b 1:43 "Floor opening" tool, b 1:49 hint at the bottom of the plan
- [x] b 1:49 The opening belongs to the floor whose floor it opens
- [x] b 1:43 What it is for: gallery, open space, wider stairwell
- [x] b 2:04 It crosses a room boundary → message "This opening crosses a room boundary …", then corrected
- [x] b 2:15 Several openings may overlap (L shape)
- [x] b 4:07 Seen through from above (3D, upper floor stacked)
- [x] b 2:09 / 2:22 Size and position in the form or at the corners; "Delete"

## 3D beside (4.18)
- [x] a 3:55 "3D beside" switches on the 3D half
- [x] a 3:55 Changes appear in 3D after a moment
- [x] a 4:02 Drag the bar between plan and 3D
- [x] b 2:27 "Tall walls" / "Cut"
- [x] b 2:31 Tap furniture in 3D (dragging is mentioned); bar with W, D, H, "↺ 45°" / "↻ 45°", "Fix", "Delete"
- [x] b 2:39–2:46 Sidebar collapses; buttons at the right edge (☰, ⚙, 🛋, 🚪)
- [x] b 2:46 "📌 Pin" / "Pinned"
- [x] b 1:23 The 3D half shows the selected floor

## Checking in 3D (5.1/5.2)
- [x] a 4:21 / b 3:56 Top "3D", "All floors"
- [x] a 4:26 "Apart" / a 4:33 "Stacked"
- [x] a 4:42 Floor buttons at the top / floor pictures on the left
- [x] a 4:33 Cellar lies under the ground floor, below ground
- [x] a 4:51 "Dimmed" / "Stacked" / "Alone"
- [x] a 4:42 Start view takes effect on opening (upper floor from the back)
- [x] b 4:07 Stair opening visible from above
