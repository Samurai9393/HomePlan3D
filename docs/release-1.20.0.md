**HomePlan 3D 1.20.0: talk to your house.** A microphone button in the 3D view: say "Show the living room" and NeonPlan goes there. A wall tablet that flies to the front door by itself when the doorbell rings. Gardens and terraces that open like rooms, and light that falls down the stairwell.

### New

- **🎙️ Voice control – new, free for everyone:** a microphone button at the bottom left of the 3D view. Tap it and speak:
  - "Show the living room", "upper floor", "the whole house" or just "kitchen" opens the place.
  - "Show the washing machine" or "Where is the floor lamp?" flies to the device and makes it flash.
  - "Show the front door camera" looks through the camera, and "Show the cameras" opens the camera wall (with the Camera Cockpit).
  - Anything else ("turn on the hall light", "how warm is it outside?") goes to Home Assistant's **Assist**, and its answer shows as a speech bubble.

  NeonPlan knows the names of your rooms, floors and devices by itself, so nothing has to be taught. Speech to text is done by your own Assist pipeline (Home Assistant Cloud, Whisper or Speech-to-Phrase). The microphone is only open while you speak, which spares old tablets. It is off by default; switch it on per device (editor → **🎙️ Voice control**) or in the dashboard card (`voice: true`). It needs https and the microphone allowed (Fully Kiosk: Web Content Settings → microphone access). **Test the microphone** checks a device step by step. *Voice control is new and still in development – it is released for everyone and already works well, and it will keep growing. If a sentence is not understood the way you mean it, tell us the sentence on Discord or in an issue.* Manual: section 5.10.
- **🎬 Live director (Camera Cockpit):** your wall tablet shows by itself what happens in the house. When the doorbell rings, the view flies to the front door and looks through the camera there. It also flies to where a camera sees someone, to a washer that has finished, or to a new warning, and goes back afterwards. Every event is its own switch and all are off until you switch them on (editor → **🎬 Live director**). You also choose the screen: this device, or the card option `director: true`. Someone using the tablet is only interrupted by the doorbell and by warnings. Free for everyone who has the Camera Cockpit.
- **Outdoor areas like rooms (#100, #59):** give a lawn, terrace, balcony or pool a name and a Home Assistant area. It then appears in the room bar, opens on a tap in 3D with its area's lights, sockets and sensors, and shows its outdoor temperature under "Values". In the editor its devices are listed to place on the area. Thanks @rolandarends and @denisb88!
- **Light between floors (#570):** a lamp over a stairwell or floor opening, or close to it, also lights the floor below through the opening, in its colour and a little weaker. Thanks @PetrMa!
- **Pets walk around furniture:** the cats and dogs of the fun pack find their way round sofas, tables and cupboards instead of walking through them, and hop onto their place on the sofa or bed. Idea from Thundras' fork.

### Fixed

- **Furniture library:** with the 3D view beside the plan, an item's preview picture showed beside or below the library instead of next to the item.
- **Manual (FAQ):** NeonPlan closing on a two-finger move on iPhone or iPad is the Home Assistant app's own gesture. Set it to "None" in the app's settings (#571).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.20.0: talk to your house.** A microphone button in the 3D view: say "Show the living room" and NeonPlan goes there. A wall tablet that flies to the front door by itself when the doorbell rings. Gardens and terraces that open like rooms, and light that falls down the stairwell.

### New

- **🎙️ Voice control – new, free for everyone:** a microphone button at the bottom left of the 3D view. Tap it and speak:
  - "Show the living room", "upper floor", "the whole house" or just "kitchen" opens the place.
  - "Show the washing machine" or "Where is the floor lamp?" flies to the device and makes it flash.
  - "Show the front door camera" looks through the camera, and "Show the cameras" opens the camera wall (with the Camera Cockpit).
  - Anything else ("turn on the hall light", "how warm is it outside?") goes to Home Assistant's **Assist**, and its answer shows as a speech bubble.

  NeonPlan knows the names of your rooms, floors and devices by itself, so nothing has to be taught. Speech to text is done by your own Assist pipeline (Home Assistant Cloud, Whisper or Speech-to-Phrase). The microphone is only open while you speak, which spares old tablets. It is off by default; switch it on per device (editor → **🎙️ Voice control**) or in the dashboard card (`voice: true`). It needs https and the microphone allowed (Fully Kiosk: Web Content Settings → microphone access). **Test the microphone** checks a device step by step. *Voice control is new and still in development – it is released for everyone and already works well, and it will keep growing. If a sentence is not understood the way you mean it, tell us the sentence on Discord or in an issue.* Manual: section 5.10.
- **🎬 Live director (Camera Cockpit):** your wall tablet shows by itself what happens in the house. When the doorbell rings, the view flies to the front door and looks through the camera there. It also flies to where a camera sees someone, to a washer that has finished, or to a new warning, and goes back afterwards. Every event is its own switch and all are off until you switch them on (editor → **🎬 Live director**). You also choose the screen: this device, or the card option `director: true`. Someone using the tablet is only interrupted by the doorbell and by warnings. Free for everyone who has the Camera Cockpit.
- **Outdoor areas like rooms (#100, #59):** give a lawn, terrace, balcony or pool a name and a Home Assistant area. It then appears in the room bar, opens on a tap in 3D with its area's lights, sockets and sensors, and shows its outdoor temperature under "Values". In the editor its devices are listed to place on the area. Thanks @rolandarends and @denisb88!
- **Light between floors (#570):** a lamp over a stairwell or floor opening, or close to it, also lights the floor below through the opening, in its colour and a little weaker. Thanks @PetrMa!
- **Pets walk around furniture:** the cats and dogs of the fun pack find their way round sofas, tables and cupboards instead of walking through them, and hop onto their place on the sofa or bed. Idea from Thundras' fork.

### Fixed

- **Furniture library:** with the 3D view beside the plan, an item's preview picture showed beside or below the library instead of next to the item.
- **Manual (FAQ):** NeonPlan closing on a two-finger move on iPhone or iPad is the Home Assistant app's own gesture. Set it to "None" in the app's settings (#571).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
