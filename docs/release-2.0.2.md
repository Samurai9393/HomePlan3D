## HomePlan 3D 2.0.2 – Live Presence on Android, and "Where is …?" flies there

### Live Presence on Android

- **Android phones are found by themselves.** Switch on the BLE Transmitter in the Home Assistant app (Settings → Companion app → Manage sensors → BLE Transmitter). The locating assistant then lists the phone with its name and person. You don't have to hold it next to a receiver.
- **Hints for weak settings.** Out of the box the app sends at its lowest power and in power-saving mode, so the receivers barely hear it. The assistant now tells you when to set the transmit power to **High**, the advertise mode to **Low latency**, or to switch the transmitter on.
- **"⚠ not heard"** now shows next to every device that no receiver hears, in the device list and while learning. Pairing Android phones or tablets through the key helper does not work, because Android does not send that key in the background. The key helper button now says "For an iPhone", and Android uses the app's transmitter instead.
- Thanks to @frops83 and @rolandarends for testing and reporting (#726, #727)!

### Watch and phone together

- **The surer device wins.** When the watch and the phone are heard at the same time in different rooms, the phone now wins when it is clearly surer. A shared wall can fool the watch. No extra phone symbol appears next to the person any more.
- **A watch you took off is noticed.** When the watch lies in one room for ten minutes while the phone moves on, the phone tells where you are. The watch then shows as a small symbol where it lies.
- A phone left lying while you walk on with the watch still shows where it lies.

### "Where is …?" flies there

- **"Where is Anna?"** flies the open NeonPlan views into her room. **"Who is home?"** tours every room with someone in it, one after another, and a tap stops it. It is on by default and can be switched off in the locating assistant under **Live**. While people are shown to admins only, only admins' views fly to them.
- **It also works with an AI agent such as Gemini.** The Assist sentences now carry the names locating knows, so these questions are answered locally. Before, the agent only said "Anna is at home".
- **The microphone in the NeonPlan panel** now asks locating first.
- **To ask through Assist** (the Home Assistant app, a voice speaker): switch on NeonPlan's sentences under **⚙ Settings → Voice control → Sentences for Assist**. They are off by default. The microphone in the NeonPlan panel works without them.
- **Older Assist sentence files are updated again.** A file an older NeonPlan had written was taken for your own, so newer questions like "Who is home?" never arrived.

### Fixed

- **The 3D view no longer jumps after a freeze.** A turn or zoom made while the view was still busy just after opening was replayed seconds later, and the view landed somewhere else in the house. Thanks to @frops83 (#712)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
## HomePlan 3D 2.0.2 – Live Presence on Android, and "Where is …?" flies there

### Live Presence on Android

- **Android phones are found by themselves.** Switch on the BLE Transmitter in the Home Assistant app (Settings → Companion app → Manage sensors → BLE Transmitter). The locating assistant then lists the phone with its name and person. You don't have to hold it next to a receiver.
- **Hints for weak settings.** Out of the box the app sends at its lowest power and in power-saving mode, so the receivers barely hear it. The assistant now tells you when to set the transmit power to **High**, the advertise mode to **Low latency**, or to switch the transmitter on.
- **"⚠ not heard"** now shows next to every device that no receiver hears, in the device list and while learning. Pairing Android phones or tablets through the key helper does not work, because Android does not send that key in the background. The key helper button now says "For an iPhone", and Android uses the app's transmitter instead.
- Thanks to @frops83 and @rolandarends for testing and reporting (#726, #727)!

### Watch and phone together

- **The surer device wins.** When the watch and the phone are heard at the same time in different rooms, the phone now wins when it is clearly surer. A shared wall can fool the watch. No extra phone symbol appears next to the person any more.
- **A watch you took off is noticed.** When the watch lies in one room for ten minutes while the phone moves on, the phone tells where you are. The watch then shows as a small symbol where it lies.
- A phone left lying while you walk on with the watch still shows where it lies.

### "Where is …?" flies there

- **"Where is Anna?"** flies the open NeonPlan views into her room. **"Who is home?"** tours every room with someone in it, one after another, and a tap stops it. It is on by default and can be switched off in the locating assistant under **Live**. While people are shown to admins only, only admins' views fly to them.
- **It also works with an AI agent such as Gemini.** The Assist sentences now carry the names locating knows, so these questions are answered locally. Before, the agent only said "Anna is at home".
- **The microphone in the NeonPlan panel** now asks locating first.
- **To ask through Assist** (the Home Assistant app, a voice speaker): switch on NeonPlan's sentences under **⚙ Settings → Voice control → Sentences for Assist**. They are off by default. The microphone in the NeonPlan panel works without them.
- **Older Assist sentence files are updated again.** A file an older NeonPlan had written was taken for your own, so newer questions like "Who is home?" never arrived.

### Fixed

- **The 3D view no longer jumps after a freeze.** A turn or zoom made while the view was still busy just after opening was replayed seconds later, and the view landed somewhere else in the house. Thanks to @frops83 (#712)!

Found a problem? Please open an [issue on GitHub](https://github.com/Mastershort/neonplan3d/issues).

### How to update

Settings → System → Updates. HACS only checks for new versions every few hours, so a fresh update is sometimes missing there. If it is: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
