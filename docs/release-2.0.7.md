## HomePlan 3D 2.0.7 – 📢 Your house speaks: Announcements

### 📢 New: Announcements (beta)

**"Dinner is ready!" – and exactly the room that should hear it, hears it.**

Every room with a speaker gets a 📢 button right above the speaker in the 3D view. Tap it, tap a sentence – and the Echo, the Voice PE or the Sonos in that room says it. No app, no routine, no shouting up the stairs.

![📢 buttons over the speakers](https://github.com/Mastershort/neonplan3d/releases/download/v2.0.7/announcements-buttons.png)

- **One tap per room:** the 📢 over the speaker, or **📢 Announcement** in the room's panel.
- **Your own sentences:** "Dinner is ready!", "Time for bed!", "The dog needs to go out!" – add your own, remove the ones you don't need (no kids doing homework any more? Out it goes).
- **Type it or say it:** your own words, or speak into the 🎙 microphone.
- **Whole house or only where someone is:** from the ⭐ menu to every room, or only to the rooms someone is in right now (presence, motion, locating).
- **Echos** make a real announcement with their chime, **voice satellites like the Home Assistant Voice PE** announce too, every other speaker talks through Home Assistant's text-to-speech.
- **The right speaker on its own:** the one placed in the room; TVs and switched-off devices are never chosen by themselves. Pick a different one per room whenever you like.

![An announcement for the kitchen](https://github.com/Mastershort/neonplan3d/releases/download/v2.0.7/announcements-sheet.png)

**Beta – Supporter Pass holders get it first.** Install it under **Extensions**, then switch on "📢 right in the room" in ⚙ Settings. Everyone else gets it in the shop once the beta is done. Tell us how it works on [GitHub](https://github.com/Mastershort/neonplan3d/issues)!

### Also new

- **Sun path and house shadow.** A glowing arc around the house shows the sun's way today – red at the horizon, warm white high up – with sunrise and sunset at its ends and the sun as a glowing orb with rays. On the ground lies the house's shadow and wanders with the sun, so you see when the terrace gets sun. A compass ring with N, E, S, W lies on the ground. Needs the north direction and your home's location in Home Assistant.
- **Windows glow outside at night.** When it is dark, the light of lit rooms falls out of the ground floor's windows as a warm glow onto the lawn and terrace – in the room's light colour, softer behind lowered blinds.
- **⚙ Settings right in the 3D view.** The ⭐ central menu now has **⚙ Settings**: sun & night, window light, sunlight through the windows and the warnings – without opening the editor. Every module with settings gets its own section there. Only administrators can change them.
- **Heat Pro leaves the beta.** The heat pump as a system in 3D – heat pump, flow and return pipes, glowing radiators and underfloor zones, ground collector, one card with COP and costs, demo mode – is now in the shop for 7.90 € (included in the Supporter Pass). Thanks to everyone who tested it!
- **Choose a camera's detection sensors.** In a camera's form you can now pick exactly which sensors count for its detection pins, the motion trail and the live director – also sensors of another device, e.g. Frigate's person sensor for a Reolink camera. Thanks to @frops83 (#815)!

### Fixed

- **A camera shown as furniture.** The model you choose is now the camera's look: choosing again replaces it instead of adding another item, it moves and turns with the camera, and the built-in camera model hides. **Built-in camera model** in the same list brings it back. Thanks to @EduK85 (#779)!
- **Editor error "Cannot convert undefined or null to object".** It came when the selected room, door or piece of furniture was not on the floor shown (after switching floors, undo or deleting). The usage reports showed it on about 20 installations – thanks to everyone who switched them on!
- **Room panel with a removed device.** An entity placed in the plan but since removed from Home Assistant no longer breaks the room's panel.
- **Heat Pro's lists on the PC.** The selection lists of the heat pump's form closed at once and the CPU load went up: a module's form was made anew on every state change. It is now made only when the plan or the devices change. Thanks to @frops83 (#815)!
- **Echo cards that stayed for hours.** A paused player's card now goes after ten minutes – Echos stay "paused" for hours after the music was stopped. Thanks to @frops83 (#815)!
- **Motion sensors of the Smart Home pack.** The pack's sensor models (motion, presence, contact, leak …) can now be linked to any sensor, also one without a class, such as Local Tuya's. Thanks to @vinimeca (#810)!
- **Redox at the pool.** A redox probe that reports a voltage in mV now shows at the pool like pH and temperature. Thanks to @Deninho91 (#814)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
## HomePlan 3D 2.0.7 – 📢 Your house speaks: Announcements

### 📢 New: Announcements (beta)

**"Dinner is ready!" – and exactly the room that should hear it, hears it.**

Every room with a speaker gets a 📢 button right above the speaker in the 3D view. Tap it, tap a sentence – and the Echo, the Voice PE or the Sonos in that room says it. No app, no routine, no shouting up the stairs.

![📢 buttons over the speakers](https://github.com/Mastershort/neonplan3d/releases/download/v2.0.7/announcements-buttons.png)

- **One tap per room:** the 📢 over the speaker, or **📢 Announcement** in the room's panel.
- **Your own sentences:** "Dinner is ready!", "Time for bed!", "The dog needs to go out!" – add your own, remove the ones you don't need (no kids doing homework any more? Out it goes).
- **Type it or say it:** your own words, or speak into the 🎙 microphone.
- **Whole house or only where someone is:** from the ⭐ menu to every room, or only to the rooms someone is in right now (presence, motion, locating).
- **Echos** make a real announcement with their chime, **voice satellites like the Home Assistant Voice PE** announce too, every other speaker talks through Home Assistant's text-to-speech.
- **The right speaker on its own:** the one placed in the room; TVs and switched-off devices are never chosen by themselves. Pick a different one per room whenever you like.

![An announcement for the kitchen](https://github.com/Mastershort/neonplan3d/releases/download/v2.0.7/announcements-sheet.png)

**Beta – Supporter Pass holders get it first.** Install it under **Extensions**, then switch on "📢 right in the room" in ⚙ Settings. Everyone else gets it in the shop once the beta is done. Tell us how it works on [GitHub](https://github.com/Mastershort/neonplan3d/issues)!

### Also new

- **Sun path and house shadow.** A glowing arc around the house shows the sun's way today – red at the horizon, warm white high up – with sunrise and sunset at its ends and the sun as a glowing orb with rays. On the ground lies the house's shadow and wanders with the sun, so you see when the terrace gets sun. A compass ring with N, E, S, W lies on the ground. Needs the north direction and your home's location in Home Assistant.
- **Windows glow outside at night.** When it is dark, the light of lit rooms falls out of the ground floor's windows as a warm glow onto the lawn and terrace – in the room's light colour, softer behind lowered blinds.
- **⚙ Settings right in the 3D view.** The ⭐ central menu now has **⚙ Settings**: sun & night, window light, sunlight through the windows and the warnings – without opening the editor. Every module with settings gets its own section there. Only administrators can change them.
- **Heat Pro leaves the beta.** The heat pump as a system in 3D – heat pump, flow and return pipes, glowing radiators and underfloor zones, ground collector, one card with COP and costs, demo mode – is now in the shop for 7.90 € (included in the Supporter Pass). Thanks to everyone who tested it!
- **Choose a camera's detection sensors.** In a camera's form you can now pick exactly which sensors count for its detection pins, the motion trail and the live director – also sensors of another device, e.g. Frigate's person sensor for a Reolink camera. Thanks to @frops83 (#815)!

### Fixed

- **A camera shown as furniture.** The model you choose is now the camera's look: choosing again replaces it instead of adding another item, it moves and turns with the camera, and the built-in camera model hides. **Built-in camera model** in the same list brings it back. Thanks to @EduK85 (#779)!
- **Editor error "Cannot convert undefined or null to object".** It came when the selected room, door or piece of furniture was not on the floor shown (after switching floors, undo or deleting). The usage reports showed it on about 20 installations – thanks to everyone who switched them on!
- **Room panel with a removed device.** An entity placed in the plan but since removed from Home Assistant no longer breaks the room's panel.
- **Heat Pro's lists on the PC.** The selection lists of the heat pump's form closed at once and the CPU load went up: a module's form was made anew on every state change. It is now made only when the plan or the devices change. Thanks to @frops83 (#815)!
- **Echo cards that stayed for hours.** A paused player's card now goes after ten minutes – Echos stay "paused" for hours after the music was stopped. Thanks to @frops83 (#815)!
- **Motion sensors of the Smart Home pack.** The pack's sensor models (motion, presence, contact, leak …) can now be linked to any sensor, also one without a class, such as Local Tuya's. Thanks to @vinimeca (#810)!
- **Redox at the pool.** A redox probe that reports a voltage in mV now shows at the pool like pH and temperature. Thanks to @Deninho91 (#814)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
