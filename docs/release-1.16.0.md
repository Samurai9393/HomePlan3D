![HomePlan 3D 1.16.0: walk through the house – the living room and the kitchen at eye height](https://raw.githubusercontent.com/Mastershort/neonplan3d/main/docs/images/walk.jpg)

**New: walk through your house.** One tap on **🚶 Walk** and you stand at eye height in your home – look around, tap the floor to walk there, through the doors into the next room. The lights, TVs, sunlight and glass cards live on around you. Plus a round of fixes from your reports.

### New

- **Walk through the house:** the **🚶 Walk** button (top right) puts you at eye height into the chosen room (else the biggest of the floor shown). Drag to look around, tap the floor to walk there – through doors into other rooms too –, W A S D / arrow keys, or the stick on a tablet. Walls stop you, doors let you through; the room you are in shows at the top, ✕ End or Esc takes you back. Runs on old wall tablets too. In the card, `walk: false` hides the button.

- **Thermostats count as room temperature:** a room without its own temperature or humidity sensor now takes the `current_temperature` / `current_humidity` of its thermostat (climate entity) – in the room cards, the heatmap and the room panel. A thermostat can also be chosen by hand as the room's sensor (#478 by gypais).
- **Energy Pro – devices straight onto the wall:** in the wall view, a side bar puts the meter, inverter, home battery and wallbox directly onto the wall you are looking at.

### Fixed

- **Dashboard card after a restart:** a dashboard opened while Home Assistant was still starting could stay on "Configuration error" until it was reloaded – mostly on wall tablets. The card is now loaded by a small loader that Home Assistant serves from the start and that tries again while Home Assistant is still starting (#461 by Sanke1).
- **Sonos group / stereo pair:** several speakers linked to the same player all show that they play – rings at each, a line between them (#475 by hahne-t).
- **Robot vacuum in its current room:** cleaning states some integrations report (`room_cleaning`, `segment_cleaning`, sweeping, mopping) count as cleaning, and when the room sensor names no room of the plan, the vacuum's own room attribute is tried (#470 by MKRAFT3D).
- **Echo on the glass card:** ▶ and ⏸ now send `media_play` / `media_pause` (some players ignore play/pause toggling), and the buttons act once on the lifted finger or the click, whichever arrives (#400 by domodial).
- **Light through doors:** when the walls of several rooms lie on one straight line, a door was sometimes matched to the wrong one, and the light went into the wrong room (#444 by Thundras).
- **Sun patches** run on into rooms joined without a wall, like the lamps' light (#455 by Thundras).
- **Camera wedge:** a wall right next to the camera (a garden wall at the house corner) now stops its field of view on the floor (#438 by rolandarends).
- **Drop-down lists** keep the dark look when opened (no light text on a white list).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
![HomePlan 3D 1.16.0: walk through the house – the living room and the kitchen at eye height](https://raw.githubusercontent.com/Mastershort/neonplan3d/main/docs/images/walk.jpg)

**New: walk through your house.** One tap on **🚶 Walk** and you stand at eye height in your home – look around, tap the floor to walk there, through the doors into the next room. The lights, TVs, sunlight and glass cards live on around you. Plus a round of fixes from your reports.

### New

- **Walk through the house:** the **🚶 Walk** button (top right) puts you at eye height into the chosen room (else the biggest of the floor shown). Drag to look around, tap the floor to walk there – through doors into other rooms too –, W A S D / arrow keys, or the stick on a tablet. Walls stop you, doors let you through; the room you are in shows at the top, ✕ End or Esc takes you back. Runs on old wall tablets too. In the card, `walk: false` hides the button.

- **Thermostats count as room temperature:** a room without its own temperature or humidity sensor now takes the `current_temperature` / `current_humidity` of its thermostat (climate entity) – in the room cards, the heatmap and the room panel. A thermostat can also be chosen by hand as the room's sensor (#478 by gypais).
- **Energy Pro – devices straight onto the wall:** in the wall view, a side bar puts the meter, inverter, home battery and wallbox directly onto the wall you are looking at.

### Fixed

- **Dashboard card after a restart:** a dashboard opened while Home Assistant was still starting could stay on "Configuration error" until it was reloaded – mostly on wall tablets. The card is now loaded by a small loader that Home Assistant serves from the start and that tries again while Home Assistant is still starting (#461 by Sanke1).
- **Sonos group / stereo pair:** several speakers linked to the same player all show that they play – rings at each, a line between them (#475 by hahne-t).
- **Robot vacuum in its current room:** cleaning states some integrations report (`room_cleaning`, `segment_cleaning`, sweeping, mopping) count as cleaning, and when the room sensor names no room of the plan, the vacuum's own room attribute is tried (#470 by MKRAFT3D).
- **Echo on the glass card:** ▶ and ⏸ now send `media_play` / `media_pause` (some players ignore play/pause toggling), and the buttons act once on the lifted finger or the click, whichever arrives (#400 by domodial).
- **Light through doors:** when the walls of several rooms lie on one straight line, a door was sometimes matched to the wrong one, and the light went into the wrong room (#444 by Thundras).
- **Sun patches** run on into rooms joined without a wall, like the lamps' light (#455 by Thundras).
- **Camera wedge:** a wall right next to the camera (a garden wall at the house corner) now stops its field of view on the floor (#438 by rolandarends).
- **Drop-down lists** keep the dark look when opened (no light text on a white list).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
