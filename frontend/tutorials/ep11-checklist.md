# Episode 11 – Dashboard card and wall tablet: coverage checklist

Sources: `docs/anleitung.md` chapter 8 (dashboard card, YAML block) and 9 (wall tablet), the card in `frontend/src/card.ts`, its visual editor `frontend/src/card-editor.ts`, the options in `frontend/src/card-config.ts`, night dimming `frontend/src/kiosk.ts`, quality level / pixel ratio / `isLowEnd` in `frontend/src/viewer/viewer3d.ts`, performance display in `frontend/src/components/view3d.ts`, labels from `frontend/src/i18n.ts`. The preview `preview/index.html?card` shows the card editor on the left and the card on the right (like Home Assistant's card dialog). Creating it in Home Assistant itself is only said.
Too much for 8 minutes in one piece → two parts: **a** = part 1 "Create and configure the card", **b** = part 2 "YAML, kiosk and old wall tablets". Time = position in the finished video (line start, real voice).
`controls_side` and `keep_view` arrive with 1.12.7 → version line 1.12.7.

## Creating the card (chapter 8, only said)
- [x] a 0:12 · Edit the dashboard, "Add card", search for "NeonPlan" (said over the card editor)
- [x] a 0:19 · The card is loaded automatically with the integration, no resource needed
- [x] a 0:24 · Visual editor: options on the left, live preview on the right; no YAML needed
- [x] a 0:32 · Options at their defaults are missing from the YAML

## View
- [x] a 0:38 · "Floor": "Whole house (tap a floor to open it)" / every floor (list shown)
- [x] a 0:45 · Start floor "Ground floor"
- [x] a 0:49 · "Size": "Fixed height" / "Fill the screen" + panel view hint (fill)
- [x] a 0:59 · "Height (pixels)" 420 → 760 (height)
- [x] a 1:05 · "Look": Neon / Blueprint / Day (theme)
- [x] a 1:10 · "Accent colour" (orange) and "Back to cyan" (accent)
- [x] a 1:17 · "Walls": "Tall walls" / "Cut" (walls)
- [x] a 1:23 · "Quality": Auto / Tablet / High + hint "“Tablet” is the lightest setting" (quality)
- [x] a 1:32 · High: light cones under spots
- [x] a 1:38 · "Floors below": Dimmed / Stacked / Hidden shown on the upper floor (floor_stack)

## Display
- [x] a 1:52 · "Markers": None / Important / All (markers)
- [x] a 1:59 · "Heatmap": Temperature, values at the room name, Normal (humidity/CO₂ mentioned) (heatmap)
- [x] a 2:07 · "Power flow" / "Holograms": switches in the card / Always on / Always off (flows, holograms); Energy Pro named
- [x] a 2:16 · "Switches in the card" + selection of walls, floors, temperature, humidity, CO₂ (controls)
- [x] a 2:26 · Bar in the card operated (Temp. / Normal)
- [x] a 2:31 · "Star with the central menu", menu open (central)
- [x] a 2:37 · "Own names at the markers" (marker_names)
- [x] a 2:42 · "Start with the controls hidden" + the eye brings everything back (controls_hidden)
- [x] a 2:48 · "Hide the controls after" 10 s, a real 10 seconds waited, touch shows everything (controls_hide_after)
- [x] a 2:59 · "Floors as miniatures" with the start floor switched on (floor_thumbs)
- [x] a 3:08 · "Show room names" (room_names), "Show energy values at the top (Energy Pro)" (energy)
- [x] a 3:15 · "Room details on tap": room panel; without the checkbox the room is only selected + "Back" (room_panel)
- [x] a 3:29 · "Full screen button" ⛶ at the top right (fullscreen_button)
- [x] a 3:37 · "Pull floors apart in the house view" (explode), "Fade the roof out while zooming in" (roof_fade)
- [x] a 3:37 / b 2:12 · "Performance display (frames per second)" (stats)

## Functions
- [x] a 3:46 · "Show warnings" (alerts)
- [x] a 3:56 · "Jump to the room of a new warning": smoke detector in the kitchen, the card jumps (alert_jump)
- [x] a 4:03 · "Scene buttons in the room" (shown at a 3:22: Movie, Cinema, Reading, All off) (scenes)
- [x] a 4:11 · "Motion trail" with times (motion_trail)
- [x] a 4:16 · Button "Cameras" → camera wall (camera_wall)
- [x] a 4:23 · "Weather outside" + "Weather entity", rain shown (weather, weather_entity)
- [x] a 4:30 · Hint about Pro extensions

## Wall tablet (kiosk)
- [x] b 0:13 · "Back to the start view after": Never / 1 / 2 / 5 / 10 min (idle_return)
- [x] b 0:24 · Hint: the card closes the room and shows the start view
- [x] b 0:31 · "Camera turn as screensaver" (idle_orbit)
- [x] b 0:37 · Bathroom opened, a real minute waited, return + camera turn, a tap ends it
- [x] b 0:48 · "Night dimming": Off / By sun position (sun below the horizon → dimmed) / Time range (night)
- [x] b 0:55 · "Time range (e.g. 22:00-06:00)" entered
- [x] b 1:01 · "Button to a dashboard (path)" /lovelace/home, ⌂ in the card (dashboard)
- [x] b 1:08 · "Label of the button" "Start" (dashboard_label)

## YAML (code editor, shown as a code card)
- [x] b 1:13 · Switch to the code editor in Home Assistant (said)
- [x] b 1:19 · Every editor option has its line (floor, height, idle_return, idle_orbit, dashboard marked)
- [x] b 1:23 · `floor: og` + `room: kind` → the card starts in the kids' room (room, floor)
- [x] b 1:30 · `start_view: { theta, phi, radius }` – line from the editor → Settings → Start view
- [x] b 1:39 · `controls_side: right` (1.12.7)
- [x] b 1:47 · `keep_view: true`, floor change via miniature view (1.12.7)
- [x] b 1:52 · `buttons`: label / icon / action / target, button "Garden" in the star; actions named
- [x] b 1:59 · `idle_return` / `controls_hide_after` with free seconds
- [ ] Not shown individually (but in the manual): `explode` / `roof_fade` / `fill` etc. as YAML lines – they are in the editor and produce the same lines

## Old and weak wall tablets (chapter 9)
- [x] b 2:06 · "runs on old, weak wall tablets"; "no work while idle"
- [x] b 2:12 · Performance display "At rest (0 fps)" (shown large)
- [x] b 2:22 · Reason for every frame (colour effect of a lamp)
- [x] b 2:29 · Tablet level: no patterns, shadows, halos or particles; animations at half rate
- [x] b 2:36 · Pixel ratio 1 instead of up to 2 (render scaling) – display "tablet level, pixel ratio 1"
- [x] b 2:43 · Auto picks Tablet on Fire tablets / little memory / ≤ 4 cores
- [x] b 2:50 · Tip: Fully Kiosk Browser with hardware acceleration, panel view + "Fill the screen", quality Auto
- [x] b 3:00 · Recommendation page (link in the description)
- [x] b 3:05 · Card on the wall tablet: full screen, controls hidden, Tablet level
- [x] b 3:12 · Portrait: room panel at the bottom
