**HomePlan 3D 1.17.2** brings roof windows into the room card, four wishes from a customer's e-mail – an air conditioner, cooktops that glow while they cook, lamps that only show one colour and a watt threshold for appliances behind smart plugs – and a fix for the play button on Echo speakers.

### New

- **Air conditioner (wall):** a new item under *Work & other*. It hangs high on the wall, takes a climate entity and glows at its air outlet in the colour of its mode – red heating, blue cooling, green automatic, yellow drying, white fan only; bright while it works, dimmed on standby.
- **Cooktops glow:** a stove glows on its cooking zones while it cooks – the built-in stove and the hobs and cookers of the Kitchen pack (by their power sensor, their state or an operating-state sensor such as Home Connect's `run` / `ready` / `inactive`: faint at *ready*, dark at *inactive*). With the Kitchen pack's update (release 4), no zone is painted red for ever any more.
- **Lamps in one colour only:** *Glow in one colour only* in a lamp's form – the lamp only glows while the light shows about that colour. A colour light used as a signal (yellow for "water" at the washbasin) no longer shows its other colours there.
- **Running from (watts):** appliances with a power sensor get their own threshold (empty: 10 W) – for old appliances behind a smart plug that draw a few watts on standby, e.g. 100 W.
- **Roof windows in the room card:** every roof window belongs to the room below it – its blind, contact and window motor are in the room card, and the sun falls through it onto the room's floor (#482).

### Changed

- **Roof windows when the roof fades out:** they fade out with the roof again, as before 1.17.1. Who wants a window to stay over the room ticks **Show over the room without the roof** in its form (#482). Windows in a slope that reaches down over a lower floor stay in the roof, so they no longer hang in the air below the floor shown.

### Fixed

- **Weather outside switched off** stayed on after a reload until switched on and off again – in the panel and in the dashboard card (card option *Weather*) (#509).
- **Echo speakers (Sound & Cinema):** ▶ after ⏸ sends play even while the Echo still reports "playing" – it answers late; the button shows what was pressed until the speaker catches up (#400).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.17.2** brings roof windows into the room card, four wishes from a customer's e-mail – an air conditioner, cooktops that glow while they cook, lamps that only show one colour and a watt threshold for appliances behind smart plugs – and a fix for the play button on Echo speakers.

### New

- **Air conditioner (wall):** a new item under *Work & other*. It hangs high on the wall, takes a climate entity and glows at its air outlet in the colour of its mode – red heating, blue cooling, green automatic, yellow drying, white fan only; bright while it works, dimmed on standby.
- **Cooktops glow:** a stove glows on its cooking zones while it cooks – the built-in stove and the hobs and cookers of the Kitchen pack (by their power sensor, their state or an operating-state sensor such as Home Connect's `run` / `ready` / `inactive`: faint at *ready*, dark at *inactive*). With the Kitchen pack's update (release 4), no zone is painted red for ever any more.
- **Lamps in one colour only:** *Glow in one colour only* in a lamp's form – the lamp only glows while the light shows about that colour. A colour light used as a signal (yellow for "water" at the washbasin) no longer shows its other colours there.
- **Running from (watts):** appliances with a power sensor get their own threshold (empty: 10 W) – for old appliances behind a smart plug that draw a few watts on standby, e.g. 100 W.
- **Roof windows in the room card:** every roof window belongs to the room below it – its blind, contact and window motor are in the room card, and the sun falls through it onto the room's floor (#482).

### Changed

- **Roof windows when the roof fades out:** they fade out with the roof again, as before 1.17.1. Who wants a window to stay over the room ticks **Show over the room without the roof** in its form (#482). Windows in a slope that reaches down over a lower floor stay in the roof, so they no longer hang in the air below the floor shown.

### Fixed

- **Weather outside switched off** stayed on after a reload until switched on and off again – in the panel and in the dashboard card (card option *Weather*) (#509).
- **Echo speakers (Sound & Cinema):** ▶ after ⏸ sends play even while the Echo still reports "playing" – it answers late; the button shows what was pressed until the speaker catches up (#400).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
