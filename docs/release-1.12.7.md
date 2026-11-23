Many small wishes from the issues, two fixes for the 3D view – and everything new is a setting you switch on, so nothing changes unless you want it to.

### New

- **The wall view is remembered:** "Tall walls" or "Cut" stays as you left it after a reload – in the 3D view, in the editor's 3D pane and on the dashboard card, per device (#309 by rolandarends).
- **Controls on the right:** the floor pictures, star, search and eye can sit on the right instead of the left – header ◧ / ◨, on the card `controls_side: right` (#285 by fammastrodaiuto).
- **Keep the view on floor switches:** header ⌖ – switching floors keeps the camera where it is, only its height follows; on the card `keep_view: true` (#191 by denisb88).
- **Device holograms** (Energy Pro), all in Editor → Energy → Hologram:
  - **Hide device cards below (W)** – e.g. 1 W, so a card disappears while its device is off (#244 by denisb88).
  - **Device cards in the house view too** – switch them off for the house view, they stay on their floor (#226 by denisb88).
  - **Device cards in an opened room** – shows the cards of a room's devices when you open it (#235 by denisb88).
- **Own buttons light up** in the star menu while the entity they work on is on (#188 by RobertSorgenfrei).
- **Downstand beams and ceiling beams** (Architecture pack) have a height above the floor now, e.g. to lower them under a sloped ceiling (#287 by RufusRed80).
- The mouse wheel over a hologram card zooms like anywhere else in the view (#239 by denisb88).

### Fixed

- **Flickering green strips in passages** ("opening without a door"): gone (#290 by itsKXCode).
- **Lamp light shining through a wall** inside a room (a drywall partition, the inner corner of an L-shaped room) – the light now stops at walls and still passes through doors and openings (#300 by idaho).
- **Solar modules on short walls:** walls from 0.5 m are offered, e.g. a 0.92 m garden wall (#295 by rolandarends).
- **"Back to a device pin"** on a lamp turned it into a lamp again on the next load.
- Pro add-ons without furniture no longer show as empty sections in the furniture library and the furniture type list.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
Many small wishes from the issues, two fixes for the 3D view – and everything new is a setting you switch on, so nothing changes unless you want it to.

### New

- **The wall view is remembered:** "Tall walls" or "Cut" stays as you left it after a reload – in the 3D view, in the editor's 3D pane and on the dashboard card, per device (#309 by rolandarends).
- **Controls on the right:** the floor pictures, star, search and eye can sit on the right instead of the left – header ◧ / ◨, on the card `controls_side: right` (#285 by fammastrodaiuto).
- **Keep the view on floor switches:** header ⌖ – switching floors keeps the camera where it is, only its height follows; on the card `keep_view: true` (#191 by denisb88).
- **Device holograms** (Energy Pro), all in Editor → Energy → Hologram:
  - **Hide device cards below (W)** – e.g. 1 W, so a card disappears while its device is off (#244 by denisb88).
  - **Device cards in the house view too** – switch them off for the house view, they stay on their floor (#226 by denisb88).
  - **Device cards in an opened room** – shows the cards of a room's devices when you open it (#235 by denisb88).
- **Own buttons light up** in the star menu while the entity they work on is on (#188 by RobertSorgenfrei).
- **Downstand beams and ceiling beams** (Architecture pack) have a height above the floor now, e.g. to lower them under a sloped ceiling (#287 by RufusRed80).
- The mouse wheel over a hologram card zooms like anywhere else in the view (#239 by denisb88).

### Fixed

- **Flickering green strips in passages** ("opening without a door"): gone (#290 by itsKXCode).
- **Lamp light shining through a wall** inside a room (a drywall partition, the inner corner of an L-shaped room) – the light now stops at walls and still passes through doors and openings (#300 by idaho).
- **Solar modules on short walls:** walls from 0.5 m are offered, e.g. a 0.92 m garden wall (#295 by rolandarends).
- **"Back to a device pin"** on a lamp turned it into a lamp again on the next load.
- Pro add-ons without furniture no longer show as empty sections in the furniture library and the furniture type list.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
