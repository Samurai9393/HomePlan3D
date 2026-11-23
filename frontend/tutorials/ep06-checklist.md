# Episode 6 – Devices, lights and cameras: coverage checklist

Sources: `docs/anleitung.md` 4.10, 4.11, 4.13 (plus operation from 5.3, room panel from 5.4 and cameras in 3D from 5.9, which help when operating live in 3D; 4.12 only "Power sensor" and "Back to a device pin"), forms in `frontend/src/components/editor.ts` (`renderDeviceList`, `renderDeviceExtras`, `renderDeviceForm`, `renderRoomClimate`, `renderCameraWedge`, `renderFurnitureForm`/`renderFurnitureLinks` for lights, `renderSpotForm`, `markerSelect`, `iconInput`, `glowScaleField`, `renderAsFurniture`), "Markers" switch in `panel.ts`, labels from `frontend/src/i18n.ts`. Full demo house. Too much for 8 minutes → two parts: **a** = part 1 "Place devices, markers and names", **b** = part 2 "Lights and cameras".
Time = position in the finished video (a = ep06a.mp4, 7:11; b = ep06b.mp4, 5:18).

## Part 1 – a room's device list (4.10)
- [x] a 0:28 – Tap a room → "Devices" on the right: all devices of the linked area, grouped by device
- [x] a 0:18 (said) – Without an area: hint "Link the room to an area and its devices appear here." (said; area = episode 1)
- [x] a 0:38 / 0:43 – Main entity first, more (LED displays, effects) behind "+n more" / "less" (pixel clock)
- [x] a 0:53 / 1:04 – Which sensors appear: temperature, humidity, CO₂/air quality, power/energy, gas/water, brightness, air pressure; battery/signal not
- [ ] Meters without a device class count via the unit (m³, l, kWh, lx); decimal places as in HA (said)
- [x] a 1:04 – Missing a device: check the area in HA
- [x] a 1:11 – Search field "Search devices …" (for large areas)
- [x] a 1:13–1:37 – Source "This area" (with count), "Other areas" (grouped by area, "in <room>" when already placed, "Place" brings it here), "No area" (template lights, groups, helpers); the HA area does not change
- [x] a 1:47 (said) – "n more – narrow the search" for long lists (said)
- [x] a 1:57 – "Place" puts a device into the room (freely distributed in the room)
- [x] a 2:14 – Lights are placed as a lamp from the library (ceiling light), so they glow in 3D
- [x] a 2:07 / 2:22 – "Place all 5 …" with confirmation; "Undo" / Ctrl+Z takes all of them back in one step
- [x] a 1:52 / 2:28 – Placed entries are bright in the list (tap the name to select the device), "Remove" in the row
- [x] a 2:39 – ☆ / ★ "Show in the room panel": into the room panel without placing it
- [x] a 2:45 – 👁 / 🙈 "Hide from the room panel" (struck through)
- [x] a 2:52 – Aa / ∅ hide the state in the room panel (blind without feedback); "unknown" is left out anyway
- [x] a 2:58 / 3:04 – Room panel in 3D: shows placed + ☆ devices; "More devices of the area"
- [x] a 3:12 / 3:23 – Room climate: temperature, humidity, CO₂ – "Automatic" (without device temperatures such as a 3D printer or hot-water loop) or choose a sensor or "None"; applies to the heatmap and the room panel

## Part 1 – a device in the plan (4.10)
- [x] a 2:03 – Drag a placed device in the plan
- [x] a 3:34 – Form "Device": marker and name at the top, "🔓 Fix"
- [x] a 3:43 – "X (m)" / "Y (m)"
- [x] a 3:43 – "Marker height (m)" and "Automatic height"
- [x] a 3:55 – "Rotation (°)"
- [x] a 4:07–4:25 – "Ask before switching": confirmation on tap in 3D, in the quick menu and in the room panel; double-tapping the room skips it; swiping does not move it (server switch, coffee machine)
- [x] a 6:04 – In 3D: confirmation "… really switch?" shown live
- [x] a 4:40 / 4:50 – "Marker in 3D": Automatic / Always show / Without watts / Hide
- [x] a 5:46 / 5:53 – "Markers" switch in the 3D view (⚙): None / Important / All; "Important" leaves out lamps and furniture devices, sensors/watts stay; "None" hides everything
- [x] a 4:32 / 4:50 – Power sensor on the device: the pin shows watts (coffee machine), "Without watts" leaves them out; electrical furniture has "Power sensor (W)" (episode 4)
- [x] a 4:58 – Energy Pro: "Hologram over the device" (one sentence)
- [x] a 5:05 / 5:14 – "Own symbol (Material Design icon)": name as in HA (mdi:thermometer), preview beside it, empty = default; also applies to electrical furniture
- [x] a 5:19–5:35 – "Own name (optional)" + "Show the name under the marker in 3D" (three thermometers in the garden); the checkbox only appears once there is a name; card option `marker_names: true` (said)
- [x] a 6:21 / 6:32 – "Show as furniture": pin → matching furniture (speaker, lamp, radiator, robot vacuum), already linked; the list only shows what fits
- [x] a 6:41 – "Back to a device pin" in the furniture form; Ctrl+Z undoes both
- [x] a 4:02 – "To room centre" and "Remove"
- [x] a 6:09 (quick menu), details b 3:28 – Operating in 3D: tapping switches (lamp flashes), long press = quick menu, tapping the pin

## Part 2 – lights (4.11)
- [x] b 0:23 / 0:32 – Lights = furniture with a linked light; types: ceiling light, recessed spotlight, surface spotlight, LED panel, pendant light, floor lamp, uplighter, table lamp, wall light, LED strip, path light, garden spot ("Lights" section of the library)
- [x] b 2:02 (said, see note) – Light as a device pin: "Lamp" = mount ceiling light / floor lamp / table lamp / wall light
- [x] b 0:53–1:06 – "Light or switch": a switch/relay also works; several lights may follow the same light
- [x] b 3:14 / 3:24 – 3D glows in the colour and brightness from HA; floor and walls are lit too; two coloured ceiling lights mix; light only falls through doors into the neighbouring room
- [x] b 2:41 – Colour effects (colour changes) are animated (LED strip)
- [x] b 1:13 – "Colour and brightness from (optional)": a relay switches, the lamp knows the colour → on/off from the switch, colour from the second entity
- [x] b 1:25 – "Glow in 3D (%)": below 100 % dims LED strips, above 100 % boosts weak lamps; switches nothing in HA; also applies to light pins
- [x] b 1:57 – Table lamp stands on the furniture below it
- [x] b 1:42 / 1:50 – Pendant light: "Shape" shade / sphere / cone / drum; height = suspension below the ceiling
- [x] b 0:45 / 1:36 / 2:12 – Wall light (1.75 m) and LED strip (under the ceiling) snap to the wall; "Height above the floor (m)", "Automatic height"
- [x] b 2:18–2:30 – LED strip: under 1 m it shines upwards, above that downwards; always visible below the cut height; "Tilt about its length (°)"; "Upright"
- [x] b 2:46–2:58 – "Place spots" at the room: "Lamp" (recessed spot, surface spot, LED panel, ceiling light), "Columns", "Rows", light → "n lights placed"; all follow one light
- [x] b 3:04 (said over the device list) – "Spread ceiling lights evenly" (from two ceiling pins in a room) (said)
- [x] b 1:25 (visible in the form), explanation a – Ask before switching, marker in 3D and own symbol also for lights (with light)
- [x] b 3:28–3:39 – Operating in 3D: tapping switches, the lamp flashes; swiping vertically dims; long press = quick menu with brightness, colour temperature and colours; double-tap on the room = all lights

## Part 2 – cameras (4.13, 5.9)
- [x] b 3:44 – Place a camera like any other device
- [x] b 3:49 – "Mounting": "Wall (looks along its rotation)" / "Ceiling (dome, all round)"
- [x] b 3:58 – Cone in the plan; the handle at the tip rotates it and sets the reach
- [x] b 4:03 – "Field of view (°)", "Reach (m)", "Tilt down (°)"
- [x] b 4:10 – "Show the field of view in 3D" per camera
- [x] b 4:17 – In 3D the cone ends at the first wall
- [x] b 4:23 – 3D: camera model on the wall/ceiling, cone on the floor
- [x] b 4:29 (hardly visible in the demo, see note) – The camera's motion/presence sensor reports → cone turns red
- [x] b 4:34 / 4:43 – Tap the camera or cone: still image, refreshed; tap the image: live view from HA; the cone is a large tap area
- [x] b 4:46 – Camera Cockpit (Pro): detection hint in the form, look through the camera, camera wall – one sentence

## Framing
- [x] a 0:00 / 6:50, b 0:00 / 4:56 – Teaser, "In this video …", outro with recap, next episode, links, old wall tablets
- [x] Title cards a+b – version line "recorded with HomePlan 3D 1.12.6"
- [x] a 4:58, b 4:46 – Extensions mentioned at most once or twice: Energy Pro (power), Camera Cockpit (cameras)

## Open / notes
- [ ] "Meters without a device class count via the unit; decimal places as in HA" is not said (detail, fits episode 10).
- "Lamp" (mounting a light pin) and "Spread ceiling lights evenly" are only mentioned: a light as a device pin can no longer be created in 1.12.6 – "Back to a device pin" on a lamp immediately turns it back into a lamp (`normalizeBuilding` converts every `light.*` pin into a lamp), so both controls are practically unreachable.
- Red camera cone: the demo living room has a pink rug under the cone; the colour change is hardly visible on screen.
