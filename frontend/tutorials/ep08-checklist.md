# Episode 8 – Roofs part 2: dormers, roof windows, sloping ceilings, carport: coverage checklist

Sources: `docs/anleitung.md` 4.19 (second half: flat roof as a free shape, dormers, cross gables, sloping ceilings, canopy) and "Roof windows", forms in `frontend/src/components/editor.ts` (`renderRoofSectionForm`, `addDormer`, `takeRoofOutline`, `addRoofSection` → canopy, `renderRoofWindowList`, `renderRoofWindowForm`, `renderHeadroom`), `panel.ts` ("Roof stays"), `viewer/viewer3d.ts` (`placeRoof`), labels from `frontend/src/i18n.ts`.
Too much for 8 minutes in one piece → two parts: **a** = part 1 "Sloping ceilings, dormers and cross gables" (4:53), **b** = part 2 "Roof windows, flat roof, terrace roof and carport" (4:25). Time = position in the finished video (line start, real voice).
The house is the invented L-shaped house from episode 7 (ground floor, lean-to with a pent roof, garage with a parapet); the upper floor here is a converted attic. Energy Pro is not mentioned (no solar panels appear).

## Sloping ceilings (knee wall)
- [x] a 0:24 · "Top of walls (m)": where the walls under the roof end
- [x] a 0:31 · Top of walls below the ceiling height of the floor underneath: knee wall 0.9 m above the attic floor (2.75 → 3.65)
- [x] a 0:42 · "Eave (m) top" / "Eave (m) bottom" at the same height
- [x] a 0:46 · Steeper roof for headroom: "Pitch (°)" top/bottom 45°
- [x] a 0:52 · In 3D (3D beside): knee wall at the eave, gable walls up to the ridge
- [x] a 0:59 · Hint under the field: "Below the ceiling height of the floor underneath, that floor's walls end under the roof: knee walls at the eaves, gables up to the ridge, inner walls cut by the slope."
- [x] a 1:08 · Same for the side wing (top of walls, eaves left/right, pitch left/right)
- [x] a 1:18 · Attic plan: dashed lines at 1.5 m and 2 m headroom
- [x] a 1:25 · Tip for furnishing under the slope
- [x] a 1:35 · 3D view: zooming in lifts the roof and fades it out, view into the attic
- [x] a 1:42 · In 3D in the attic: knee wall at the eave, gables up to the ridge, inner walls cut by the slope
- [x] a 1:49 · Windows only where the wall is high enough (gable, shown); on the eave side a dormer or roof window

## Dormers
- [x] a 1:57 · "+ Dormer top" / "+ Dormer bottom" in a roof section's form (one per roof side)
- [x] a 2:14 · "+ Dormer top" clicked
- [x] a 2:18 · Proposal: 2 m wide, front on the outer wall, gable roof, eave 1.4 m above the roof's eave (5.05 m, field shown)
- [x] a 2:29 · Deep enough for its ridge to meet the slope; the main roof opens underneath, the cheeks close the sides (in 3D)
- [x] a 2:37 · Small roof section of its own: "Dormer 5" in the form, "Dormer" in the list and plan
- [x] a 2:44 · Moving (drag in the plan)
- [x] a 2:48 · Width (drag a corner, 2.5 m)
- [x] a 2:53 · "Shape": "Gable" or "Pent"; pent with the ridge running across = shed dormer (in 3D)
- [x] a 3:04 · Dormer heights/pitch: "Pitch (°)" 15° for the shed dormer
- [x] a 3:11 · "Undo" (three times) back to the gable dormer
- [x] a 3:15 · Attic wall rises to the dormer's eave; "Doors & windows", tap the wall
- [x] a 3:24 · Choose type "Window" – dormer window in 3D

## Cross gables
- [x] a 3:29 · Cross gable = a projecting gable (three-gable house) = a wide dormer with its eaves on the top of walls
- [x] a 3:39 · Tap the main house, "+ Dormer top", drag it over the study
- [x] a 3:45 · Width at the corner set to 3.4 m
- [x] a 3:49 · Both eaves on the top of walls (3.65 m), pitch 45°
- [x] a 3:56 · Depth adjusts itself (ridge meets the slope), the main roof only opens under the gable roof (valleys), in 3D
- [x] a 4:07 · Wall underneath rises into the gable, window with "Doors & windows"
- [x] a 4:14 · Result in the 3D view, from outside and inside (dormer and cross gable with windows)

## Roof windows
- [x] b 0:22 · "🪟 Roof windows" section below the roof sections (hint text shown)
- [x] b 0:22 · "+ Roof window"
- [x] b 0:31 · Lands on the south side of the main roof, 78 × 118 cm; rectangle in the plan
- [x] b 0:39 · Move it in the plan
- [x] b 0:44 · Drag it onto another roof section (side wing, "Section 2 · East")
- [x] b 0:50 · "Roof face" in the form (shown and selectable, back to "Section 1 · South · 45°")
- [x] b 0:58 · "Width" and "Height (m)" (94 × 140 cm)
- [x] b 1:05 · "Distance from the edge (m)", "Distance from the eave (m)"
- [x] b 1:13 · "Blind", "Contact", "Tilt contact" (entities selected)
- [x] b 1:22 · Live in 3D: open – sash top-hung outwards, frame glows warm
- [x] b 1:29 · Tilted: opens a little
- [x] b 1:31 · Blind travels down over the pane
- [x] b 1:36 · "Window motor (cover, optional)": position as a cover, sash opens that far (50 % shown)
- [x] b 1:45 · Contact / tilt contact work without a motor too (hint text); "Name (optional)" filled in
- [x] b 1:52 · Hole in the slope: you can look out of the attic (said over the close-up)
- [x] b 1:58 · "🔓 Fix", "Delete", "‹ Roof sections" back to the list

## Flat roof as a free shape
- [x] b 2:06 · Bungalow example (the ground floor alone) with a flat roof section as a rectangle
- [x] b 2:13 · Rectangle also covers corners where there is no house (plan and 3D)
- [x] b 2:20 · With "Flat" / "Parapet": "Take the floor's outline"
- [x] b 2:27 · Outline of all rooms of the shown floor, including L / Z shapes, one section without edges (in 3D)
- [x] b 2:34 · Drag corners in the plan (hint "Free shape: drag the corners in the plan. Back to the rectangle drops the shape." shown)
- [x] b 2:41 · "Back to the rectangle"
- [x] b 2:45 · Several floors: the floor buttons at the top determine the floor (said; the bungalow has only one)

## Canopy
- [x] b 2:51 · Patio roof: draw a roof section over an area without a room
- [x] b 2:58 · Automatically becomes a canopy: flat pent roof at 2.4 m, posts and beams, see-through (in 3D)
- [x] b 3:07 · Rests on the house wall; checkbox "Canopy (posts instead of walls, see-through)" in the form; "Canopy" in the list and plan
- [x] b 3:17 · Carport next to the garage (draw it, in 3D)
- [x] b 3:22 · "Canopy" switch on every roof section: off = normal roof without posts, on = carport (in 3D)

## Roof stays (3D view)
- [x] b 3:30 · Zooming in lifts the roof and fades it out
- [x] b 3:37 · Switch on "Roof stays" at the bottom of the 3D view: the roof stays even up close
- [x] b 3:45 · The switch is available in the house view as soon as the house has a roof
- [x] b 3:52 · Second click switches it off
- [x] b 3:54 · Result in 3D (dormer, cross gable, roof window open, patio roof, carport)
