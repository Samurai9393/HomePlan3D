## HomePlan 3D 2.0.1 – HACS works again, help make NeonPlan better

### HACS can install and update NeonPlan again

Since the evening of 23 October, HACS fails on **every** download of a release zip, for all integrations, not only NeonPlan: GitHub's downloads now carry a header that is too large for HACS (hacs/integration#5643). NeonPlan now lets HACS fetch its files one by one, and that way still works. It was tested with Home Assistant 2026.10 and HACS 2.0.5, both as a new install and as an update.

- The Home Assistant log may show **one "Failed to download zipball" error** during the update. That is HACS' first try; the update still completes. You can ignore it.
- Still on 1.x and the update to 2.0.0 failed? Simply update to 2.0.1, it contains everything from 2.0.0 (Live Presence).
- From now on, we check every few hours whether a HACS download of NeonPlan still works, so a change like this on GitHub's side is noticed within hours.

### New: help make NeonPlan better (voluntary, off by default)

Under **⚙ Settings → 🛟 Help improve** you can switch on anonymous usage and error reports. They show which devices, versions and views NeonPlan runs on, and they report NeonPlan's own errors, so bugs can be found and fixed before anyone has to write an issue.

- At most one report a day. **Never** sent: names, entities, areas, the shape of your floor plan, IP addresses, your licence key – and nothing from locating.
- **"View report"** shows the exact next report before it is sent. **"Delete data"** removes everything already sent. Switching it off forgets the random id.

### Live Presence

- **Spoken names are matched tolerantly:** "Where is Thorsten's Apple Watch?" finds "Torsten Apple Watch". "My iPhone" means the iPhone of the person who asks, and a first name alone means the person.
- The manual link in the locating assistant opens the locating chapter directly.

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
## HomePlan 3D 2.0.1 – HACS works again, help make NeonPlan better

### HACS can install and update NeonPlan again

Since the evening of 23 October, HACS fails on **every** download of a release zip, for all integrations, not only NeonPlan: GitHub's downloads now carry a header that is too large for HACS (hacs/integration#5643). NeonPlan now lets HACS fetch its files one by one, and that way still works. It was tested with Home Assistant 2026.10 and HACS 2.0.5, both as a new install and as an update.

- The Home Assistant log may show **one "Failed to download zipball" error** during the update. That is HACS' first try; the update still completes. You can ignore it.
- Still on 1.x and the update to 2.0.0 failed? Simply update to 2.0.1, it contains everything from 2.0.0 (Live Presence).
- From now on, we check every few hours whether a HACS download of NeonPlan still works, so a change like this on GitHub's side is noticed within hours.

### New: help make NeonPlan better (voluntary, off by default)

Under **⚙ Settings → 🛟 Help improve** you can switch on anonymous usage and error reports. They show which devices, versions and views NeonPlan runs on, and they report NeonPlan's own errors, so bugs can be found and fixed before anyone has to write an issue.

- At most one report a day. **Never** sent: names, entities, areas, the shape of your floor plan, IP addresses, your licence key – and nothing from locating.
- **"View report"** shows the exact next report before it is sent. **"Delete data"** removes everything already sent. Switching it off forgets the random id.

### Live Presence

- **Spoken names are matched tolerantly:** "Where is Thorsten's Apple Watch?" finds "Torsten Apple Watch". "My iPhone" means the iPhone of the person who asks, and a first name alone means the person.
- The manual link in the locating assistant opens the locating chapter directly.

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
