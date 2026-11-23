A small round of fixes, mostly around roofs and attics.

### Fixed

- **Roofs cut the walls also with low eaves:** a roof section whose eaves lie below a floor's ceiling now cuts that floor's walls, even when its top of walls is set to the ceiling height (discussion #147 by twynne and wouter-b).
- **Single-storey houses show their roof:** with only one floor the 3D view now shows the roof; an extra attic floor is no longer needed (discussion #208 by Kohhal).
- **Pulled apart, the roof stays on top:** the roof rides with the highest floor beneath it, so a loft under the same slopes stays under the roof, and dormers go along with their roof (#202 by Kuddelsoft, discussion #207 by 1970lexi).
- **Light under roof slopes:** the light on the walls ends where the wall does, instead of shining through the roof (#201 by Twilight-Networks).
- **No more stripes on walls under a roof** (discussion #180 by RobertSorgenfrei).
- **Camera Cockpit:** the camera wall fits any number of cameras – largest possible tiles, nothing overlaps, and with very many cameras the wall scrolls (#217 by denisb88).
- **Solar fields:** the inverter choice shows each inverter's own name, and an inverter shows which strings feed it (#213 by rolandarends).
- **Garden solar fields** stand on the ground floor, no longer on a cellar below it (#192 by denisb88).
- **Pack names in English:** outside German, the extensions page and the furniture library show our packs and Pro add-ons with English names (#224 by twynne).
- Furniture with only a small status light (3D printers, wallbox, speakers) links as a device, no longer as a "TV / media player".
- Energy Pro: tapping the grid pin at the street opens the grid sensor instead of an empty "grid" dialog (#223 by denisb88).
- Entity choices say how many more entries there are ("… +23 · type to search"); for a parking spot's presence, GPS trackers (the car's own integration, a phone) come before a router's many network trackers (#227 by twynne).
- The star menu closes when you tap into the 3D view, on a room or switch floors; while the search is open the eye button steps aside (#220 by daene85).
- **Heatmap:** with the temperature, humidity or CO₂ view on, garden lamps keep their light and room lamps a soft glow (discussion #205 by 1970lexi).
- **Clear message for add-ons that need a newer version:** installing a Pro add-on on an older HomePlan 3D now says "please update HomePlan 3D first" instead of a cryptic error (#218 by twynne).

### How to update

Settings → System → Updates. If HomePlan 3D is missing there: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Then restart Home Assistant and reload the page (Ctrl+F5).

---
A small round of fixes, mostly around roofs and attics.

### Fixed

- **Roofs cut the walls also with low eaves:** a roof section whose eaves lie below a floor's ceiling now cuts that floor's walls, even when its top of walls is set to the ceiling height (discussion #147 by twynne and wouter-b).
- **Single-storey houses show their roof:** with only one floor the 3D view now shows the roof; an extra attic floor is no longer needed (discussion #208 by Kohhal).
- **Pulled apart, the roof stays on top:** the roof rides with the highest floor beneath it, so a loft under the same slopes stays under the roof, and dormers go along with their roof (#202 by Kuddelsoft, discussion #207 by 1970lexi).
- **Light under roof slopes:** the light on the walls ends where the wall does, instead of shining through the roof (#201 by Twilight-Networks).
- **No more stripes on walls under a roof** (discussion #180 by RobertSorgenfrei).
- **Camera Cockpit:** the camera wall fits any number of cameras – largest possible tiles, nothing overlaps, and with very many cameras the wall scrolls (#217 by denisb88).
- **Solar fields:** the inverter choice shows each inverter's own name, and an inverter shows which strings feed it (#213 by rolandarends).
- **Garden solar fields** stand on the ground floor, no longer on a cellar below it (#192 by denisb88).
- **Pack names in English:** outside German, the extensions page and the furniture library show our packs and Pro add-ons with English names (#224 by twynne).
- Furniture with only a small status light (3D printers, wallbox, speakers) links as a device, no longer as a "TV / media player".
- Energy Pro: tapping the grid pin at the street opens the grid sensor instead of an empty "grid" dialog (#223 by denisb88).
- Entity choices say how many more entries there are ("… +23 · type to search"); for a parking spot's presence, GPS trackers (the car's own integration, a phone) come before a router's many network trackers (#227 by twynne).
- The star menu closes when you tap into the 3D view, on a room or switch floors; while the search is open the eye button steps aside (#220 by daene85).
- **Heatmap:** with the temperature, humidity or CO₂ view on, garden lamps keep their light and room lamps a soft glow (discussion #205 by 1970lexi).
- **Clear message for add-ons that need a newer version:** installing a Pro add-on on an older HomePlan 3D now says "please update HomePlan 3D first" instead of a cryptic error (#218 by twynne).

### How to update

Settings → System → Updates. If HomePlan 3D is missing there: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Then restart Home Assistant and reload the page (Ctrl+F5).
