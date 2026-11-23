A small update with fixes and a wish from the issues of the last hours.

### New

- **Shorter warnings:** Editor → Settings → **Show device names in warnings**. Switched off, the banner reads "Guest WC · Window open in the rain" instead of "Guest WC · Window open in the rain: Guest bathroom window" – shorter on a wall tablet. A warning without a room keeps the device name. On by default (#374 by sjess).

### Fixed

- **Ceiling height per room:** the glow points of ceiling, panel and pendant lamps sat at the floor height, so in a low room beside a taller one they floated above the lamp (#372 by wiesi12).
- **Colour effects of lights that report no colour** (e.g. Nanoleaf during an effect) now run through real colours instead of staying white (#373 by sjess).
- **Ceiling height per room above the floor height:** a vaulted room open to the roof (e.g. 4.5 m in an attic of 2.35 m) – its pendant and ceiling lamps now hang from that ceiling or from the roof underside above them instead of stopping at the floor height (#379 by Twilight-Networks).
- **Room buttons without a name:** a room whose name is empty no longer leaves an empty button in the room bar (#370 by pepeelpl).
- **Car Pro – lock:** the lock role also takes a text sensor like BMW's door lock state (`LOCKED`, `SECURED`, `UNLOCKED`); a binary sensor of class lock now counts "on" as unlocked, as in Home Assistant (#369 by ElVincenco).
- **Doors and windows in free walls outside the rooms** (outer walls drawn with the wall tool, rooms without walls of their own) now open and close with the contact chosen for them (#367 by ge8020).
- **Outdoor light:** neighbouring outdoor areas no longer get brighter seams under a garden light, and a lowered or sloped bed is lit along its own surface instead of showing as a bright patch (#341 by 1970lexi).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
A small update with fixes and a wish from the issues of the last hours.

### New

- **Shorter warnings:** Editor → Settings → **Show device names in warnings**. Switched off, the banner reads "Guest WC · Window open in the rain" instead of "Guest WC · Window open in the rain: Guest bathroom window" – shorter on a wall tablet. A warning without a room keeps the device name. On by default (#374 by sjess).

### Fixed

- **Ceiling height per room:** the glow points of ceiling, panel and pendant lamps sat at the floor height, so in a low room beside a taller one they floated above the lamp (#372 by wiesi12).
- **Colour effects of lights that report no colour** (e.g. Nanoleaf during an effect) now run through real colours instead of staying white (#373 by sjess).
- **Ceiling height per room above the floor height:** a vaulted room open to the roof (e.g. 4.5 m in an attic of 2.35 m) – its pendant and ceiling lamps now hang from that ceiling or from the roof underside above them instead of stopping at the floor height (#379 by Twilight-Networks).
- **Room buttons without a name:** a room whose name is empty no longer leaves an empty button in the room bar (#370 by pepeelpl).
- **Car Pro – lock:** the lock role also takes a text sensor like BMW's door lock state (`LOCKED`, `SECURED`, `UNLOCKED`); a binary sensor of class lock now counts "on" as unlocked, as in Home Assistant (#369 by ElVincenco).
- **Doors and windows in free walls outside the rooms** (outer walls drawn with the wall tool, rooms without walls of their own) now open and close with the contact chosen for them (#367 by ge8020).
- **Outdoor light:** neighbouring outdoor areas no longer get brighter seams under a garden light, and a lowered or sloped bed is lit along its own surface instead of showing as a bright patch (#341 by 1970lexi).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
