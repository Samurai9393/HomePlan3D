# Episode 10 – Operating the 3D view: coverage checklist

Sources: `docs/anleitung.md` chapter 5 (5.1–5.9) and 3 (tabs), the view in `frontend/src/panel.ts` (header with view options, floor/room bar, switches at the bottom), `frontend/src/components/view3d.ts` (`renderThumbs`, `renderFind`, `renderCentral`, `renderEye`, `renderAlerts`, `renderScenes`, `renderLegend`), `room-panel.ts`, `quick-menu.ts`, the start views in `editor.ts` (`renderStartView`, `rememberFloorView`, `rememberRoomView`), labels from `frontend/src/i18n.ts`.
Too much for 8 minutes in one piece → two parts: **a** = part 1 "Navigate and every switch", **b** = part 2 "Operate the house". Time = position in the finished video (line start, real voice).
The demo house is the one from the online demo (invented data). ◧ / ◨ and ⌖ arrive with 1.12.7 → version line 1.12.7.

## 3D view: house, floor, room (5.1, chapter 3)
- [x] a 0:27 · Tab "3D" at the top (view and operate the house)
- [x] a 0:27 · House view with a label per floor (rooms, lights on, open windows)
- [x] a 0:36 · Dragging rotates the view
- [x] a 0:36 · Mouse wheel / two fingers zoom
- [x] a 0:40 · Tap a floor label to open that floor, floors above fly away
- [x] a 0:44 · Tap a room: camera flies in, room panel opens
- [x] a 0:50 · Esc goes up one level
- [x] a 0:50 · "Back" at the bottom goes up one level
- [x] a 0:54 · Double-tap an empty spot goes up one level
- [x] a 0:59 · Floor thumbnails on the left switch directly to a floor, house button "All floors"
- [x] a 1:05 · Arrow ◂ / ▸ collapses the floor pictures into buttons (the device remembers it)
- [x] a 1:12 · Bar at the top: all floors and rooms; in house view with floor names before the rooms
- [x] a 1:19 · Bar scrolls sideways (with the mouse wheel on a PC); ≡ / ↔ wrap it and back
- [x] b 1:26 · Floor → room: camera flies in (level 3)

## Switches at the bottom (5.2)
- [x] a 1:30 · "Tall walls": full height, front walls as tinted glass
- [x] a 1:40 · "Cut": walls at hip height, tall furniture cut as well
- [x] a 1:49 · Each device remembers the choice
- [x] a 1:55 · "Apart" / "Stacked" (house view)
- [x] a 2:05 · Roof lifts while zooming in and fades out
- [x] a 2:10 · "Roof stays" (house view)
- [x] a 2:19 · "Dimmed" (open floor)
- [x] a 2:24 · "Stacked" (whole house up to here) / "Alone"
- [x] a 2:29 · Heatmap "Temp." with colour scale at the edge
- [x] a 2:37 · Sensors of the area; °C / °F from Home Assistant, converted correctly
- [x] a 2:45 · "Humidity", "CO₂" (hint "No matching sensors …" in the scale)
- [x] a 2:51 · "Values": numbers under the room names
- [x] a 2:59 · "Normal" switches the heatmap off
- [x] a 3:01 · "Room names" on / off
- [x] a 3:07 · "Trail", "Cameras" (Camera Cockpit) and "Weather" (Weather outside) as Pro, lock without the extension – one sentence each
- [x] a 4:54 · Eye: hides the header, bars, floor pictures and switches
- [x] a 5:04 · Energy values disappear with it (Energy Pro, one sentence)
- [x] a 5:09 · Room stays tappable, the eye brings everything back, the device remembers the choice
- [x] a 4:47 · ⚙ on a phone opens and closes the view options (said)

## Header at the top right (5.2)
- [x] a 3:17 · Quality "Auto"
- [x] a 3:23 · "Tablet": without patterns, shadows and halos; automatic on Fire tablets
- [x] a 3:30 · "High": light cones under spots
- [x] a 3:35 · Look "Neon" / "Blueprint" / "Day"
- [x] a 3:45 · Colour field: own accent colour (lines in the Neon look, buttons and pins in every look)
- [x] a 3:54 · ↺ back to cyan
- [x] a 3:56 · Markers "All"
- [x] a 4:02 · "Important" (without a 3D model, values such as watts and a running app) / "None"
- [x] a 4:13 · ◧ / ◨: floor pictures, star, search and eye on the left or right (1.12.7)
- [x] a 4:24 · ⌖ "Keep view": camera stays when the floor changes (1.12.7)
- [x] a 4:32 · "FPS": frame rate, slowest frame, reason per frame
- [x] a 4:39 · 0 fps while idle
- [x] a 4:47 · Version at the far right of the header
- [x] a 5:09 · Each device remembers all switches

## Operating (5.3)
- [x] b 0:24 · Tapping switches, lamp flashes to confirm
- [x] b 0:29 · Swiping vertically dims, value shown at the finger
- [x] b 0:36 · Long press: light quick menu (brightness, colour temperature, colours)
- [x] b 0:41 · Double-tap a room: all lights off / on
- [x] b 0:46 · "Ask before switching": no swiping, excluded from double-tap (said)
- [x] b 0:54 · Swiping a blind / window moves the blind
- [x] b 0:59 · Blind quick menu: Up, Stop, Down, fixed positions
- [x] b 1:04 · Slat control (roller blind with slats / venetian blind) – said, the demo has no slats
- [x] b 1:12 · Tap a window (frame, glass, blind): blind menu or contact
- [x] b 1:21 · Tap TVs, doors and garage doors directly

## Room panel (5.4)
- [x] b 1:26 · Room panel on the right, on a phone / in portrait at the bottom (said)
- [x] b 1:34 · Header with room values; light with brightness, colour temperature and colours
- [x] b 1:45 · "All off" / "All on"
- [x] b 1:51 · Blinds: Up, Stop, Down, position, "All up" / "All down"
- [x] b 1:58 · Heating, media, switches, cameras with still image, sensors, scenes & scripts
- [x] b 2:08 · Shows placed devices and ☆ from the editor; "More devices of the area"
- [x] b 2:20 · Tap the name to open details; ✕ closes
- [x] b 2:27 · Without a room panel: scenes and scripts as buttons at the bottom (card, episode 11)

## Star and search (5.5)
- [x] b 2:36 · Star: central menu lights on/off, blinds up/down for the floor
- [x] b 2:44 · House view: whole house with "Sure?", second tap performs it; garage doors do not count
- [x] b 2:54 · Favourites (scenes, scripts, automations, buttons, switches)
- [x] b 3:04 · Own buttons; they glow while their entity is on
- [x] b 5:26 · Favourites and own buttons in the editor under "Favourites"
- [x] b 3:17 · Magnifier "Where is …?": type a device name or room
- [x] b 3:24 · Hit: camera flies there, device flashes
- [x] b 3:29 · A room as a hit opens the room

## Heatmap (5.6)
- [x] a 2:29 · Temp. / humidity / CO₂ colour the floors, colour scale at the edge (see above)

## Sun and daylight (5.7)
- [x] b 4:03 · With a north direction, sunlight from sun.sun falls as patches through the windows
- [x] b 4:13 · Blinds shrink the patches (said); sky brighter by day
- [x] b 4:20 · "Sunlight through the windows" in Settings

## Warnings (5.8)
- [x] b 3:33 · Free, no setup; room pulses red, banner at the top (smoke in the kitchen)
- [x] b 3:42 · Tap the warning to jump to the room
- [x] b 3:45 · Smoke, gas, CO, water, alarm triggered, window open while it rains
- [x] b 3:54 · Rain warning: weather entity, "Warning: window open while it rains" can be switched off

## Cameras in 3D (5.9)
- [x] b 4:26 · Tap a camera or the field of view: still image, refreshed; the cone is a larger tap area
- [x] b 4:35 · Tap the image: live view

## Start view of the house, a floor and a room
- [x] b 4:38 · In the editor with "3D beside"
- [x] b 4:44 · Turn the house to the right in the 3D view
- [x] b 4:51 · "Start view" → "Remember the current 3D view as the start" (3D view, card, kiosk)
- [x] b 5:02 · `start_view` YAML line for a card; "Default" resets it
- [x] b 5:11 · "View as this floor's start"
- [x] b 5:16 · Choose a room, turn "3D beside" to the room and zoom
- [x] b 5:21 · "View as this room's start", ↺ removes it
- [x] b 5:31 · Tapping a room in 3D flies to its start view
