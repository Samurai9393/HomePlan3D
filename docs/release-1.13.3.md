
A small update with two fixes.

### Fixed

- **Saving a start view after several turns:** after turning the camera round several times and setting a start view for rooms, saving failed with "… theta". The angle now counts once round; changes still waiting in the browser can be saved again (#416 by rolandarends).
- **Glowing edges at wall corners:** the edges on the wall tops flickered at corners and joints depending on the view, shortened or stuck out. The walls now sit a hair behind their edges, the lines stay calm and continuous (#417 by rolandarends).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
---

A small update with two fixes.

### Fixed

- **Saving a start view after several turns:** after turning the camera round several times and setting a start view for rooms, saving failed with "… theta". The angle now counts once round; changes still waiting in the browser can be saved again (#416 by rolandarends).
- **Glowing edges at wall corners:** the edges on the wall tops flickered at corners and joints depending on the view, shortened or stuck out. The walls now sit a hair behind their edges, the lines stay calm and continuous (#417 by rolandarends).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).