**HomePlan 3D 1.19.0** brings awnings that run out with their cover, waste bins and mailboxes for everyone, **Household Pro** as a beta, and a new **import page** (beta) that turns plans from other programs into a NeonPlan plan.

### New

- **Awnings (D170, D274, D502):** under *Furniture → Terrace & balcony*. The kinds are **folding-arm** over a terrace, **drop-arm** for a balcony or window, **vertical / ZIP** in side rails, **pergola / conservatory** with a frame and posts, and a **side awning** pulled out from a post.
  - The awning runs out and in with its cover in Home Assistant, like a blind. With a position it moves slowly along; with only "opening/closing" it takes its run time.
  - Settings: pitch of the fabric, valance, a position sensor of its own, and a switch for covers that count the other way round.
- **Waste bins and mailboxes – for everyone:** under *Furniture → Household*.
  - **Bins:** wheelie bins 120 l and 240 l, a 1100 l container, a multi-compartment bin, a bag, a caddy and an underground container.
  - **Colours:** each kind of waste starts in the colours usual in your country (from Home Assistant's country setting), and body and lid can be changed freely.
  - **Mailboxes:** a wall mailbox, a mailbox on a post with a flag, a post box with a newspaper holder, a parcel box and a mailbox bank.
- **Household Pro – beta, first for supporters:** the household shows what is due, right where it happens. Feedback is welcome on Discord (#beta-feedback) or on GitHub.
  - **Bins** read your waste calendar (e.g. Waste Collection Schedule) or a sensor. A small tag on the lid says "Today", "Tomorrow" or "in 3 days", and a tap shows the next pickups.
  - **The mailbox** glows while post is in it, until it is emptied.
  - **Plants** show when they are thirsty.
  - **Washer, dryer and dishwasher** show their time left and then "Done!" until the door opens.
  - **Filters and consumables** that are due glow yellow.
  - **Fridge:** an open fridge door warns after two minutes, and the smart side-by-side fridge comes with Household Pro.
  - **A glass card "Today in the household"** lists it all.
- **Import page – beta:** [neonplan3d.mastershort.de/import](https://neonplan3d.mastershort.de/import/) turns a plan from another program into a NeonPlan file, right in the browser (the file stays on your computer). Afterwards you load the file under *Backup*.
  - **Formats:** Sweet Home 3D, iPhone/iPad scans (RoomPlan), CAD (DXF), 3D models from Blender or SketchUp (glTF/GLB, OBJ, STL), Floorplanner, Valetudo robot vacuum maps, and a simple format that an AI can write.
  - The link is under *Backup* in the editor.
  - If a file does not work, please send it with a short note on GitHub or Discord.

### Improved

- **Colour pickers** in the editor show their colour as a full swatch, e.g. "only this colour" of a lamp.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet; then use HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.19.0** brings awnings that run out with their cover, waste bins and mailboxes for everyone, **Household Pro** as a beta, and a new **import page** (beta) that turns plans from other programs into a NeonPlan plan.

### New

- **Awnings (D170, D274, D502):** under *Furniture → Terrace & balcony*. The kinds are **folding-arm** over a terrace, **drop-arm** for a balcony or window, **vertical / ZIP** in side rails, **pergola / conservatory** with a frame and posts, and a **side awning** pulled out from a post.
  - The awning runs out and in with its cover in Home Assistant, like a blind. With a position it moves slowly along; with only "opening/closing" it takes its run time.
  - Settings: pitch of the fabric, valance, a position sensor of its own, and a switch for covers that count the other way round.
- **Waste bins and mailboxes – for everyone:** under *Furniture → Household*.
  - **Bins:** wheelie bins 120 l and 240 l, a 1100 l container, a multi-compartment bin, a bag, a caddy and an underground container.
  - **Colours:** each kind of waste starts in the colours usual in your country (from Home Assistant's country setting), and body and lid can be changed freely.
  - **Mailboxes:** a wall mailbox, a mailbox on a post with a flag, a post box with a newspaper holder, a parcel box and a mailbox bank.
- **Household Pro – beta, first for supporters:** the household shows what is due, right where it happens. Feedback is welcome on Discord (#beta-feedback) or on GitHub.
  - **Bins** read your waste calendar (e.g. Waste Collection Schedule) or a sensor. A small tag on the lid says "Today", "Tomorrow" or "in 3 days", and a tap shows the next pickups.
  - **The mailbox** glows while post is in it, until it is emptied.
  - **Plants** show when they are thirsty.
  - **Washer, dryer and dishwasher** show their time left and then "Done!" until the door opens.
  - **Filters and consumables** that are due glow yellow.
  - **Fridge:** an open fridge door warns after two minutes, and the smart side-by-side fridge comes with Household Pro.
  - **A glass card "Today in the household"** lists it all.
- **Import page – beta:** [neonplan3d.mastershort.de/import](https://neonplan3d.mastershort.de/import/) turns a plan from another program into a NeonPlan file, right in the browser (the file stays on your computer). Afterwards you load the file under *Backup*.
  - **Formats:** Sweet Home 3D, iPhone/iPad scans (RoomPlan), CAD (DXF), 3D models from Blender or SketchUp (glTF/GLB, OBJ, STL), Floorplanner, Valetudo robot vacuum maps, and a simple format that an AI can write.
  - The link is under *Backup* in the editor.
  - If a file does not work, please send it with a short note on GitHub or Discord.

### Improved

- **Colour pickers** in the editor show their colour as a full swatch, e.g. "only this colour" of a lamp.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet; then use HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
