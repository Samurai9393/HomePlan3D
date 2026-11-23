## HomePlan 3D 2.0.3 – People at the sofa, meter readings, and a round of fixes

### Live Presence

- **People stand where a presence zone says.** When a presence sensor of the room (such as an Aqara FP2 with zones) reports its "Sofa" or "Armchair" zone as occupied, the person's figure stands at that sofa or armchair instead of in the middle of the room. Zones are matched to the room's furniture by name: built-in furniture, pack furniture, or a name you gave the furniture yourself.
- **Door zones work too.** A zone like "Entrance hall" or "Terrace door" places the figure just inside the room, in front of the door to that room or to the outside. "Rest of the room" keeps the middle.
- **Located people show without a tracker of their own.** A Home Assistant person without a tracker (state "unknown") counted as away, so the figure stayed hidden although the person was located at home. Thanks to @marcus2k9 (#744)!

### Fixed

- **Blinds are outside again on walls drawn on their own.** A single wall drawn as an outer wall (rooms on one side only) took its inside from the direction it was drawn in. Its blinds and sills could end up in the room, and it never turned to glass like the other outer walls. It now finds its outside by the rooms. Thanks to @Kodak1976 and @Deninho91 (#542)!
- **Pets walk smoothly again on phones and tablets.** On the tablet level they moved at 5 frames a second and stood still after half a minute. Now they run at about 15 and keep walking while the view rests. Thanks to @Deninho91 (#752)!
- **A light's power is its own.** Where one device carries several lights (an actuator, PowerCalc), every light got the device's first power sensor, so a bathroom light's power showed in the office. Now PowerCalc's sensor named after the light comes first, otherwise one in the light's room. Thanks to @daene85 (#743)!
- **Gas and water meters from the Utilities pack take their reading.** They asked for a power sensor in W. Now they offer a meter reading in m³ or litres, shown at the symbol. Thanks to @PetrMa (#730)!
- **Energy Pro: cables are back when rooms are drawn a little apart.** Rooms with a small gap between them (a stairwell, a hallway) cut the cable's way. Gaps up to about a metre are now bridged. Thanks to @netrunnercs (#731)!
- **Roof windows with a window motor count as open** for the window watch and the spoken answers, as the 3D view shows them. Thanks to @frops83 (#712)!
- **Front doors with glass show the pane from both sides.** From outside, the solid leaf hid it (#712).
- **The Deco pack's plants take a plant sensor.** Monstera, fiddle-leaf fig, palms, bonsai and the other new plants were not recognised as plants. Plants are now also known by their name (#712).

### Heat Pro (release 5)

- **"Heating since" tells the real time.** A card opened while the heat pump was already heating said "since 0 min". A target of 0 °C (none reported) is no longer shown. Thanks to @tomv79 (#735)!
- **Towel radiators** from the bath pack now get their heating pipes like other radiators. The electric one stays without pipes. Thanks to @holle021272 (#751)!
- The update comes through the shop: on the **✦ Extensions** tab, as soon as it is offered there.

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
## HomePlan 3D 2.0.3 – People at the sofa, meter readings, and a round of fixes

### Live Presence

- **People stand where a presence zone says.** When a presence sensor of the room (such as an Aqara FP2 with zones) reports its "Sofa" or "Armchair" zone as occupied, the person's figure stands at that sofa or armchair instead of in the middle of the room. Zones are matched to the room's furniture by name: built-in furniture, pack furniture, or a name you gave the furniture yourself.
- **Door zones work too.** A zone like "Entrance hall" or "Terrace door" places the figure just inside the room, in front of the door to that room or to the outside. "Rest of the room" keeps the middle.
- **Located people show without a tracker of their own.** A Home Assistant person without a tracker (state "unknown") counted as away, so the figure stayed hidden although the person was located at home. Thanks to @marcus2k9 (#744)!

### Fixed

- **Blinds are outside again on walls drawn on their own.** A single wall drawn as an outer wall (rooms on one side only) took its inside from the direction it was drawn in. Its blinds and sills could end up in the room, and it never turned to glass like the other outer walls. It now finds its outside by the rooms. Thanks to @Kodak1976 and @Deninho91 (#542)!
- **Pets walk smoothly again on phones and tablets.** On the tablet level they moved at 5 frames a second and stood still after half a minute. Now they run at about 15 and keep walking while the view rests. Thanks to @Deninho91 (#752)!
- **A light's power is its own.** Where one device carries several lights (an actuator, PowerCalc), every light got the device's first power sensor, so a bathroom light's power showed in the office. Now PowerCalc's sensor named after the light comes first, otherwise one in the light's room. Thanks to @daene85 (#743)!
- **Gas and water meters from the Utilities pack take their reading.** They asked for a power sensor in W. Now they offer a meter reading in m³ or litres, shown at the symbol. Thanks to @PetrMa (#730)!
- **Energy Pro: cables are back when rooms are drawn a little apart.** Rooms with a small gap between them (a stairwell, a hallway) cut the cable's way. Gaps up to about a metre are now bridged. Thanks to @netrunnercs (#731)!
- **Roof windows with a window motor count as open** for the window watch and the spoken answers, as the 3D view shows them. Thanks to @frops83 (#712)!
- **Front doors with glass show the pane from both sides.** From outside, the solid leaf hid it (#712).
- **The Deco pack's plants take a plant sensor.** Monstera, fiddle-leaf fig, palms, bonsai and the other new plants were not recognised as plants. Plants are now also known by their name (#712).

### Heat Pro (release 5)

- **"Heating since" tells the real time.** A card opened while the heat pump was already heating said "since 0 min". A target of 0 °C (none reported) is no longer shown. Thanks to @tomv79 (#735)!
- **Towel radiators** from the bath pack now get their heating pipes like other radiators. The electric one stays without pipes. Thanks to @holle021272 (#751)!
- The update comes through the shop: on the **✦ Extensions** tab, as soon as it is offered there.

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
