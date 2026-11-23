**HomePlan 3D 1.20.2** brings fixes for light wells, stairwells, the media card and voice control on Android tablets, and more control over the devices of outdoor areas.

### Fixed

- **Pool values (discussion #600):** pH, redox/ORP (mV), salt (mg/L, ppm) and conductivity sensors were left out of a room's or area's devices – only the water temperature showed. They count now. Thanks @Deninho91, and @Anrolosia for finding the cause!
- **Waste bin colours in Blueprint and Day (#609):** the bins lost their colours in the light looks (only the yellow lid stayed). They now keep their full colour in every look. Thanks @TheBhim!
- **Waste bins showed "in 2026 days" (Household Pro):** a sensor that shows a date, like Waste Collection Schedule's "on Mon, 26.10.2026", was read as a number – since 1.20.1 the year, before that the day of the month. A date in the text is now read as a date (also "28.10.", "29/10/2026", "2026-10-29"). Thanks km65 and the Discord beta testers!
- **Light well switch missing (discussion #575):** the **Light well** tick in a cellar window's form did not show unless the plan had its own ground height, so light wells could not be switched off. It shows now for every window below the ground. Thanks @LortusX and @1970lexi!
- **Light well lifted by a balcony (#602):** a balcony on the floor above raised the cellar window's light well up to itself. Only areas on the ground count now. Thanks @d14tk for the precise analysis!
- **Floor opening over tall stairs (#375):** an opening above stairs that reach higher than the floor was not cut at all when the opening and the stairs' own hole together reached past the room. Each opening is now cut room by room. Thanks @wouter-b for narrowing it down and the plan, and @LarsTh86!
- **▶ after ⏸ on the media card (#400):** on players that can pause but do not report "play" (an Echo through Alexa Media Player) the ▶ button was greyed out and sent nothing. It now resumes playback. Thanks @domodial!
- **Voice control on Android tablets (#579):** some WebViews (e.g. Fully Kiosk on a Huawei tablet) recorded only silence, because the audio was started too late after the tap. It now starts on the tap itself. If only silence still comes in, NeonPlan says why: usually another app holds the microphone, for example Fully Kiosk's acoustic motion detection. Thanks @PetrMa!

### Improved

- **Order of the room bar (discussion #599):** in the editor's room list (nothing selected), **↑** and **↓** move a room – the room bar of the 3D view follows. Thanks @groby66!
- **House without roof in the card (discussion #601):** the card option **Show the roof** (`roof: false`) leaves the roof out altogether, for those who drew it only for the solar fields. Thanks @Kanecaine!
- **Devices of outdoor areas (#597):** an outdoor area acting as a room lists its area's devices in the editor with the same buttons as a room. **☆** shows a device in the room panel without placing it, **👁** hides it there, and **Aa** leaves out its state text. Thanks @RkcCorian!

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.20.2** brings fixes for light wells, stairwells, the media card and voice control on Android tablets, and more control over the devices of outdoor areas.

### Fixed

- **Pool values (discussion #600):** pH, redox/ORP (mV), salt (mg/L, ppm) and conductivity sensors were left out of a room's or area's devices – only the water temperature showed. They count now. Thanks @Deninho91, and @Anrolosia for finding the cause!
- **Waste bin colours in Blueprint and Day (#609):** the bins lost their colours in the light looks (only the yellow lid stayed). They now keep their full colour in every look. Thanks @TheBhim!
- **Waste bins showed "in 2026 days" (Household Pro):** a sensor that shows a date, like Waste Collection Schedule's "on Mon, 26.10.2026", was read as a number – since 1.20.1 the year, before that the day of the month. A date in the text is now read as a date (also "28.10.", "29/10/2026", "2026-10-29"). Thanks km65 and the Discord beta testers!
- **Light well switch missing (discussion #575):** the **Light well** tick in a cellar window's form did not show unless the plan had its own ground height, so light wells could not be switched off. It shows now for every window below the ground. Thanks @LortusX and @1970lexi!
- **Light well lifted by a balcony (#602):** a balcony on the floor above raised the cellar window's light well up to itself. Only areas on the ground count now. Thanks @d14tk for the precise analysis!
- **Floor opening over tall stairs (#375):** an opening above stairs that reach higher than the floor was not cut at all when the opening and the stairs' own hole together reached past the room. Each opening is now cut room by room. Thanks @wouter-b for narrowing it down and the plan, and @LarsTh86!
- **▶ after ⏸ on the media card (#400):** on players that can pause but do not report "play" (an Echo through Alexa Media Player) the ▶ button was greyed out and sent nothing. It now resumes playback. Thanks @domodial!
- **Voice control on Android tablets (#579):** some WebViews (e.g. Fully Kiosk on a Huawei tablet) recorded only silence, because the audio was started too late after the tap. It now starts on the tap itself. If only silence still comes in, NeonPlan says why: usually another app holds the microphone, for example Fully Kiosk's acoustic motion detection. Thanks @PetrMa!

### Improved

- **Order of the room bar (discussion #599):** in the editor's room list (nothing selected), **↑** and **↓** move a room – the room bar of the 3D view follows. Thanks @groby66!
- **House without roof in the card (discussion #601):** the card option **Show the roof** (`roof: false`) leaves the roof out altogether, for those who drew it only for the solar fields. Thanks @Kanecaine!
- **Devices of outdoor areas (#597):** an outdoor area acting as a room lists its area's devices in the editor with the same buttons as a room. **☆** shows a device in the room panel without placing it, **👁** hides it there, and **Aa** leaves out its state text. Thanks @RkcCorian!

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
