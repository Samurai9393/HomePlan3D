The wishes from the issues that were promised for "the next update", and feet and inches for US users – here they are. As always, anything that changes the look is a setting you switch on.

### New

- **Feet and inches:** Editor → Settings → **Lengths**: Automatic (follows Home Assistant's unit system), Metres or Feet and inches. Every length field, dimension and area (ft²) in the editor follows, and you can type `8' 2"`, `98in`, `8.2ft` or `2.5m`. The plan still stores metres (discussion #117 by Valkster70).
- **Outdoor areas as a free form:** in the Outdoor tool, choose **▭ Rectangle** or **✎ Free form** beside "Undo" and place the corners one by one – curved beds, slanted plot borders, an L-shaped path (#97 by rolandarends).
- **Ceiling height per room:** a field in the room form; the room's walls end there (unless a neighbouring room is taller) and its ceiling lamps hang from it – a 2.5 m living room beside a 5 m garage on the same floor (#30 by wiesi12).
- **Ceiling lamps under a sloped roof** hang from the roof's underside instead of floating above it (#168 by denisb88).
- **Net area:** the room form shows the drawn area and the net area – without the half of each shared wall in the room, free walls, and the gap behind a wall built in front of another (#216 by idaho).
- **Power outage warning:** Settings → **Report a power outage with** – a grid sensor, a UPS on battery, a mains voltage or a helper of your own. The warning shows in the alert bar, and the grid connection of Energy Pro is crossed out (#214 by Mavyre).
- **Energy Pro: house balance and plant cards in floor views too** – a switch in Editor → Energy → Hologram, off by default (#193 by denisb88).
- **Cameras: detection symbols can be switched off** – then only the field of view turns red on a detection (#267 by RobertSorgenfrei).
- **Straighten slanted edges:** a button in the floor form beside "Close gaps" finds room edges that are only a few centimetres off straight (a corner 1 cm out makes slanted walls in 3D) and straightens them in every room that shares the corner. Walls drawn slanted on purpose stay (#333 by ciechompl).

### Fixed

- **Floor openings across a room line** are cut in every room they cover; before, an opening reaching into a second room was not cut at all (#353 by tomfischer98).
- **Hip and pyramid ends** say "Hip" in the solar field's face list, so they are easy to find (#302 by cereal2nd).
- **Fill the screen / full screen on tablets:** the card measures the visible screen height and where it starts, so no black bar is left at the bottom – e.g. in the Home Assistant app on Android tablets in landscape or with a hidden header (#344 by djbassmind-sketch).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
The wishes from the issues that were promised for "the next update", and feet and inches for US users – here they are. As always, anything that changes the look is a setting you switch on.

### New

- **Feet and inches:** Editor → Settings → **Lengths**: Automatic (follows Home Assistant's unit system), Metres or Feet and inches. Every length field, dimension and area (ft²) in the editor follows, and you can type `8' 2"`, `98in`, `8.2ft` or `2.5m`. The plan still stores metres (discussion #117 by Valkster70).
- **Outdoor areas as a free form:** in the Outdoor tool, choose **▭ Rectangle** or **✎ Free form** beside "Undo" and place the corners one by one – curved beds, slanted plot borders, an L-shaped path (#97 by rolandarends).
- **Ceiling height per room:** a field in the room form; the room's walls end there (unless a neighbouring room is taller) and its ceiling lamps hang from it – a 2.5 m living room beside a 5 m garage on the same floor (#30 by wiesi12).
- **Ceiling lamps under a sloped roof** hang from the roof's underside instead of floating above it (#168 by denisb88).
- **Net area:** the room form shows the drawn area and the net area – without the half of each shared wall in the room, free walls, and the gap behind a wall built in front of another (#216 by idaho).
- **Power outage warning:** Settings → **Report a power outage with** – a grid sensor, a UPS on battery, a mains voltage or a helper of your own. The warning shows in the alert bar, and the grid connection of Energy Pro is crossed out (#214 by Mavyre).
- **Energy Pro: house balance and plant cards in floor views too** – a switch in Editor → Energy → Hologram, off by default (#193 by denisb88).
- **Cameras: detection symbols can be switched off** – then only the field of view turns red on a detection (#267 by RobertSorgenfrei).
- **Straighten slanted edges:** a button in the floor form beside "Close gaps" finds room edges that are only a few centimetres off straight (a corner 1 cm out makes slanted walls in 3D) and straightens them in every room that shares the corner. Walls drawn slanted on purpose stay (#333 by ciechompl).

### Fixed

- **Floor openings across a room line** are cut in every room they cover; before, an opening reaching into a second room was not cut at all (#353 by tomfischer98).
- **Hip and pyramid ends** say "Hip" in the solar field's face list, so they are easy to find (#302 by cereal2nd).
- **Fill the screen / full screen on tablets:** the card measures the visible screen height and where it starts, so no black bar is left at the bottom – e.g. in the Home Assistant app on Android tablets in landscape or with a hidden header (#344 by djbassmind-sketch).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
