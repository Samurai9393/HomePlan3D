A quick fix release – most important: saving works again after resetting an outdoor area.

### Fixed

- **Saving failed** after setting an outdoor area's height or slope back to 0 (*"expected float at …outdoor[…].offset"*). It saves again; changes that were kept in the browser are offered to be taken over (#242 by rolandarends).
- **Pergolas with a slope:** beams and rafters follow the slope instead of lying level (#242).
- **One hub device for the whole house** (e.g. a single MQTT or KNX device whose entities lie in several areas): its room thermometers count for the room climate again, a power sensor only goes to an entity in its own area, and a binary sensor without a class shows up when you gave it an area by hand (#243 by bert-MI4U).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
A quick fix release – most important: saving works again after resetting an outdoor area.

### Fixed

- **Saving failed** after setting an outdoor area's height or slope back to 0 (*"expected float at …outdoor[…].offset"*). It saves again; changes that were kept in the browser are offered to be taken over (#242 by rolandarends).
- **Pergolas with a slope:** beams and rafters follow the slope instead of lying level (#242).
- **One hub device for the whole house** (e.g. a single MQTT or KNX device whose entities lie in several areas): its room thermometers count for the room climate again, a power sensor only goes to an entity in its own area, and a binary sensor without a class shows up when you gave it an area by hand (#243 by bert-MI4U).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
