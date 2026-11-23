A small round of fixes – mostly for Energy Pro and the dashboard card.

### Fixed

- **Dashboard card after an app start:** the card could show *"Custom element doesn't exist: homeplan3d-card"* until the NeonPlan page was opened. The card's script is now also kept in the dashboard resources, so dashboards wait for it; an older copy of the script there is pointed to the current one (#252 by TheRev-ha and RobertSorgenfrei).
- **Energy Pro with a single floor:** the plant cards (solar, balance) show in the 3D view and the card, not only in the editor (#255 by Kohhal).
- **Energy Pro:** a grid connection mounted on a wall – the grid cable starts at its height instead of on the ground, and its pin sits there too (#256 by Kohhal).
- **Solar fields** moved to another roof face (e.g. after replacing a flat roof) keep their modules – rows, columns, format and tilt (#258 by rolandarends).
- **"State from"** (occupancy mats, a lit top while something is on) is offered for every piece of furniture again, also a plain bed or armchair (#116 by hahne-t).
- **Pro add-ons on an older HomePlan 3D:** the shop now answers with a readable "please update HomePlan 3D first" message instead of a cryptic error; HomePlan 3D now also sends its version along.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
A small round of fixes – mostly for Energy Pro and the dashboard card.

### Fixed

- **Dashboard card after an app start:** the card could show *"Custom element doesn't exist: homeplan3d-card"* until the NeonPlan page was opened. The card's script is now also kept in the dashboard resources, so dashboards wait for it; an older copy of the script there is pointed to the current one (#252 by TheRev-ha and RobertSorgenfrei).
- **Energy Pro with a single floor:** the plant cards (solar, balance) show in the 3D view and the card, not only in the editor (#255 by Kohhal).
- **Energy Pro:** a grid connection mounted on a wall – the grid cable starts at its height instead of on the ground, and its pin sits there too (#256 by Kohhal).
- **Solar fields** moved to another roof face (e.g. after replacing a flat roof) keep their modules – rows, columns, format and tilt (#258 by rolandarends).
- **"State from"** (occupancy mats, a lit top while something is on) is offered for every piece of furniture again, also a plain bed or armchair (#116 by hahne-t).
- **Pro add-ons on an older HomePlan 3D:** the shop now answers with a readable "please update HomePlan 3D first" message instead of a cryptic error; HomePlan 3D now also sends its version along.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
