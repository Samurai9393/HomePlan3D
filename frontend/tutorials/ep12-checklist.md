# Episode 12 – Settings, backup and migration: coverage checklist

Sources: `docs/anleitung.md` 4.5 (settings), 4.1 (🔒 floor plan, Undo/Redo, keys), 5.7/5.8 (sunlight, rain warning), 6.2 (weather effects), 10 (backup and migration), 11 (data and privacy), 12 (help and feedback); the sidebar in `frontend/src/components/editor.ts` (`renderSide` → `renderStartView`, `renderFavorites` with `renderOwnButtons` and `renderMediaPresets`, `renderHelpLinks`, `renderBackgroundForm`, `renderSettings`, `renderBackup`), `transfer.ts` (export, template without areas/devices/pictures), labels from `frontend/src/i18n.ts`.
Too much for 8 minutes → two parts: **a** = part 1 "All settings", **b** = part 2 "Backup, migration and privacy" (with the end of the series).
Time = position in the finished video (line start, real voice). Demo house from the online demo with invented data. Version line 1.12.7.

Finished videos: **part 1** (`ep12a`, 6:49), **part 2** (`ep12b`, 5:27). Time before the dot = position in the respective part (a = part 1, b = part 2).

## Where everything lives
- [x] 0:27 a · Tab "Editor", sidebar on the right: sections to expand at the very bottom
- [x] 0:36 a · Order: "Start view", "Favourites", ("Help and feedback"), "Template (floor plan image)", "Settings", "Backup"
- [x] 0:27 a · "3D beside" shows every change in 3D at once
- [x] 0:46 a · Everything applies to the whole plan (all devices, card and kiosk), not just this device

## Walls and grid (4.5, 4.4)
- [x] 0:52 a · "Exterior wall (m)": thickness of all exterior walls (demo 0.24 → 0.36 and back, visible in 3D)
- [x] 1:01 a · "Interior wall (m)": thickness of all interior walls
- [x] 1:09 a · Tip: make one wall thicker in the room form "Wall heights" → "Thickness (m)" (episode 2)
- [x] 1:18 a · "Grid (m)": step while drawing (demo 5 cm), corner snapping
- [x] 1:25 a · Arrow keys move by one grid step, Shift 10 cm, Alt 1 cm
- [x] 1:32 a · Mistake: a coarse grid → rooms do not fit the dimensions; keep it fine when tracing

## North direction and sunlight (4.5, 5.7)
- [x] 1:39 a · "North (° clockwise from up)": degrees clockwise from up in the plan
- [x] 1:46 a · What it is for: sun position from sun.sun, light through the windows facing the sun
- [x] 1:59 a · Typical mistake: sun falls through the wrong windows → check the north direction
- [x] 2:05 a · "Sunlight through the windows": uncheck = no sun patches on the floor
- [x] 2:14 a · Lowered blinds shrink the patches

## Roof – basics (4.5, reference to episodes 7/8)
- [x] 2:19 a · "Roof": "No roof", "Flat roof", "Gable roof", "Roof sections (custom)"
- [x] 2:28 a · "Ridge": "Along the long side" / "Along the short side (e.g. terraced house)"
- [x] 2:38 a · "Roof pitch (°)" (visible in 3D)
- [x] 2:46 a · "Roof overhang (m)"
- [x] 2:52 a · "Roof sections (custom)" proposes sections from the rooms and opens the Roof tool → episodes 7 and 8

## Weather (4.5, 6.2, 5.8)
- [x] 2:59 a · "Weather entity": searchable selection, "Automatic (…)" takes the first
- [x] 3:08 a · What for: rain, snow, fog, clouds in 3D and the rain warning
- [x] 3:08 a · "Weather effects in 3D": "Rain", "Snow", "Fog (greys the scene)", "Clouds dim the sky and the sun", "Lightning in storms", "Sun and moon in the sky"
- [x] 3:17 a · Fog is off at first; on the Tablet quality level only cloud dimming remains
- [x] 3:25 a · Weather around the house is the Pro extension "Weather outside" (one sentence)
- [x] 3:31 a · "Warning: window open while it rains": free, uses the same weather entity, can be switched off here individually

## Start view (4.5, episode 10)
- [x] 3:42 a · Expand "Start view", turn the 3D pane on the right, "Remember the current 3D view as the start"
- [x] 3:51 a · Applies to the 3D view, card and kiosk; YAML line for a card with its own view – *the YAML line is not said; the YAML option `start_view` is shown in episode 11 (part 2, "YAML: options only in code")*
- [x] 3:51 a · "Default" resets it; floors and rooms have their own start views (episode 10)

## Favourites and own buttons (4.5)
- [x] 4:00 a · "Favourites": scenes, scripts, automations, buttons and switches for the star of the 3D view
- [x] 4:09 a · Examples: party, presence simulation, shading, watering
- [x] 4:15 a · "Add a favourite": searchable selection (type to search)
- [x] 4:22 a · ↑ ↓ order, ✕ removes
- [x] 4:26 a · "Own buttons": "+ Own button"
- [x] 4:35 a · "Label"
- [x] 4:35 a · "Action": "Open a path" (path such as /lovelace/blinds)
- [x] 4:42 a · "Entity details" (entity)
- [x] 4:49 a · "Call a service" ("Service (domain.service)" + "Data (JSON)")
- [x] 4:57 a · "fire-dom-event (browser_mod)": popup with your own card
- [x] 5:06 a · "Own symbol (Material Design icon)" (mdi:…)
- [x] 5:13 a · ↑ moves a button, "Delete" removes it
- [x] 5:17 a · Result in the star of the 3D view
- [x] 5:24 a · "Stations and playlists (Sound & Cinema)": for the Pro extension Sound & Cinema (one sentence)

## Lock the floor plan (4.1)
- [x] 5:31 a · "🔒 Floor plan" at the top of the toolbar
- [x] 5:37 a · Locks rooms, walls, doors, windows and outdoor areas (also newly drawn ones); furniture and devices stay free
- [x] 5:46 a · Locked: selecting and editing in the form works, dragging does not – dragging moves the view
- [x] 5:52 a · Room shows "🔒 Floor plan locked", one click on it unlocks
- [x] 5:52 a · Right-click on a room: "🔒 Lock floor plan" / "🔓 Unlock floor plan"
- [x] 5:59 a · Fix individual furniture / devices with "🔓 Fix" / key L (reference to episode 4)

## Other sections (references)
- [x] 6:06 a · "Template (floor plan image)": floor-plan picture as a template → episode 2
- [x] 6:11 a · Energy sensors (grid, solar, battery) are in the "Energy" tool → episode about Energy Pro
- [x] 6:19 a · Language follows the Home Assistant profile
- [x] 4:43 b · "Help and feedback": "Report a problem", "Propose an idea"

## Undo (4.1)
- [x] 0:26 b · "Undo" / "Redo" at the top of the toolbar
- [x] 0:32 b · Ctrl+Z, Ctrl+Y or Ctrl+Shift+Z – *said: Ctrl+Z and Ctrl+Shift+Z*
- [x] 0:38 b · Applies to changes of this session; older states are available via restore points

## Restore points (10)
- [x] 0:44 b · "Backup" section at the bottom of the sidebar, "Restore points"
- [x] 0:49 b · Created while editing at most every 10 minutes, the last 20 are kept
- [x] 0:49 b · Each row: time, rooms, furniture
- [x] 0:59 b · "Restore" with confirmation; the current state is kept as a point as well
- [x] 1:41 b · An import also creates a point beforehand

## Files: export and import (10)
- [x] 1:07 b · "Export": the plan with all links as a file (without pictures: "Background images are not part of the file.")
- [x] 1:21 b · "Share as template": without areas, devices, sensors and pictures – for sharing
- [x] 1:36 b · "Import …": replaces the whole floor plan after confirmation, current state stays as a point
- [x] 1:48 b · After importing a template: rooms without an area, no devices → choose an "Area", the devices are back
- [x] 1:56 b · On another Home Assistant: links run via area and entity IDs; same names → everything connects, otherwise choose the area again per room
- [x] 2:12 b · Back to the old state via the restore point

## Full backup (10)
- [x] 2:22 b · "Full backup": "Back up everything (plan, pictures, packs)"
- [x] 2:22 b · Contains the plan, all background and screen pictures, and the installed packs
- [x] 2:36 b · The file stays local and contains only the plan, pictures and installed packs
- [x] 2:39 b · "Restore a full backup …" with confirmation; same or another installation
- [x] 2:48 b · Packs are local JSON files: unsigned, not tied to a device
- [x] 2:56 b · The Home Assistant backup also backs up HomePlan 3D completely

## Migration to a new Home Assistant (10)
- [x] 3:03 b · Way 1: restore the Home Assistant backup on the new hardware → everything is there
- [x] 3:13 b · Way 2, step 1: old system "Back up everything"
- [x] 3:18 b · Step 2: install HomePlan 3D on the new system via HACS, add the integration, create areas
- [x] 3:27 b · Step 3: Editor → "Backup" → "Restore a full backup …"
- [x] 3:38 b · Message at the top: plan, pictures and all local packs are back
- [x] 3:53 b · Own modules are local files; an admin approves their code under "Extensions" before it runs

## Data and privacy (11)
- [x] 4:19 b · Plan, pictures and packs live under .storage in Home Assistant, nothing leaves the installation
- [x] 4:28 b · Diagnostics stay local and can be deleted in the editor; no message to an external service
- [x] 4:37 b · Camera images, history and states stay in Home Assistant, only shown in the browser

## End of the series
- [x] 5:07 b · Thanks to the viewers, playlist "HomePlan 3D – Tutorials"
- [x] 5:13 b · Online demo, manual, GitHub for bugs
- [x] 5:21 b · Runs on old wall tablets too
