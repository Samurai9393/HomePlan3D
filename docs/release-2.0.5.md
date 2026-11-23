## HomePlan 3D 2.0.5 – Roofs at an angle

### New: turn a roof part

Not every house is built at right angles. A wing or an extension that stands at an angle to the house can now get its own roof at that angle.

- In the editor, choose the **Roof** tool and tap a roof part. Under the ridge direction there is a new **Turn** field with the buttons **↺ 15°** and **↻ 15°**.
- The part turns clockwise in the plan. Dormers and cross gables on it turn along, roof windows and solar fields stay on it.
- Where a turned wing runs into another roof, that roof's slopes cut it off.
- A turned part is moved by dragging. To change its size, turn it back to 0°, drag the corners, and turn it again.
- **Every roof drawn so far stays at 0° and looks exactly as before.** Nothing changes unless you turn a part.

Thanks to @s0undmaker and @goldrapper19872504 for the wish (discussions #634, #724)!

### Fixed

- **Cameras shown as furniture keep their camera pin.** The camera keeps its pin with all its settings (field of view, view wedge, Camera Cockpit); the furniture model only joins it instead of taking the camera over. Thanks to @EduK85 (#779)!
- **Roof windows find their floor and room.** For the window watch and the spoken answers a roof window now counts in the room of its sensor's area, or in the room beneath it, instead of always on the top floor without a room. Thanks to @sjess and @frops83 (#783, #712)!
- **Jumping to a warning on slow tablets.** The room of the warning now opens even when the floor takes a moment to draw. Thanks to @sjess (#784)!
- **"Mark as put out" on bins.** The button in a bin's bubble takes the tap again. Thanks to @246tbwpjzk-cell (#793)!
- **Floor order.** The floor's up/down buttons in the editor now say that they only change the order in the list. Where a floor sits in 3D comes from its height above the ground. Thanks to @liltoddy (#777)!
- **The point the view turns about.** The editor's 3D pane shows a small cross where the view turns about, and pointing at 📌 in the 3D view shows it too, so you can frame the house before saving a start view. Thanks to @PetrMa (#733)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
## HomePlan 3D 2.0.5 – Roofs at an angle

### New: turn a roof part

Not every house is built at right angles. A wing or an extension that stands at an angle to the house can now get its own roof at that angle.

- In the editor, choose the **Roof** tool and tap a roof part. Under the ridge direction there is a new **Turn** field with the buttons **↺ 15°** and **↻ 15°**.
- The part turns clockwise in the plan. Dormers and cross gables on it turn along, roof windows and solar fields stay on it.
- Where a turned wing runs into another roof, that roof's slopes cut it off.
- A turned part is moved by dragging. To change its size, turn it back to 0°, drag the corners, and turn it again.
- **Every roof drawn so far stays at 0° and looks exactly as before.** Nothing changes unless you turn a part.

Thanks to @s0undmaker and @goldrapper19872504 for the wish (discussions #634, #724)!

### Fixed

- **Cameras shown as furniture keep their camera pin.** The camera keeps its pin with all its settings (field of view, view wedge, Camera Cockpit); the furniture model only joins it instead of taking the camera over. Thanks to @EduK85 (#779)!
- **Roof windows find their floor and room.** For the window watch and the spoken answers a roof window now counts in the room of its sensor's area, or in the room beneath it, instead of always on the top floor without a room. Thanks to @sjess and @frops83 (#783, #712)!
- **Jumping to a warning on slow tablets.** The room of the warning now opens even when the floor takes a moment to draw. Thanks to @sjess (#784)!
- **"Mark as put out" on bins.** The button in a bin's bubble takes the tap again. Thanks to @246tbwpjzk-cell (#793)!
- **Floor order.** The floor's up/down buttons in the editor now say that they only change the order in the list. Where a floor sits in 3D comes from its height above the ground. Thanks to @liltoddy (#777)!
- **The point the view turns about.** The editor's 3D pane shows a small cross where the view turns about, and pointing at 📌 in the 3D view shows it too, so you can frame the house before saving a start view. Thanks to @PetrMa (#733)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
