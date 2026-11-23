**HomePlan 3D 1.17.1** comes with a present: **pets** 🐱🐶🐰 – a thank-you for your great support. Many of you report bugs, test, send ideas and buy packs, and that is what keeps HomePlan 3D going. So here is something just for fun.

Besides that, 1.17.1 fixes what you reported after 1.17.0: terrace doors that open outwards, the robot vacuum with dock from the Smart Home pack, smoke detectors with binary sensors and roof windows in the room view. The wall view can zoom now, and pools get a real depth.

![HomePlan 3D 1.17.1: pets – a cat on the sofa, a labrador and a cat taking the stairs, fish in the aquarium](https://raw.githubusercontent.com/Mastershort/neonplan3d/main/docs/images/pets.jpg)

### 🎁 A present: pets (fun pack)

- **A cat, a rabbit or a dog** – dachshund, pug, terrier, labrador or shepherd – live in your 3D house. They walk through the doors from room to room and **up and down the stairs**, a cat jumps onto the **sofa or bed** from the front, a dog lies down in front of it, and at night they sleep curled up.
- A door whose contact reports it shut stops them. In the **aquariums** of the Pets pack, colourful **fish** swim.
- They are only drawn while one moves – resting, they cost nothing, even on old wall tablets.
- **How to get it:** the fun pack *Pets* is **free in the shop (0 €)** for everyone who already supports HomePlan 3D with a pack – no invoice; give something if you like, but you don't have to. Then **Extensions → 🎈 Fun packs → + Add a pet**. In the dashboard card, **Show the pets** (`pets: false`) leaves them out, e.g. on the wall tablet. Admins get a short note in the editor once.
- More fun packs will follow now and then, e.g. for Halloween or Christmas.

### New

- **Wall view – zoom:** in *Wall from the front* the mouse wheel zooms towards the pointer, two fingers on a tablet; **＋ / − / ⤢** at the bottom right, arrows move the view while zoomed. Small parts such as connections are easy to hit now.
- **Pools with depth:** a pool has a **basin depth** (1.50 m unless set) and a **rim above the lawn** – a 1.50 m pool that stands 20 cm out of the lawn: depth 1.50, rim 0.20. In 3D you look through the water onto the basin's walls and floor. The depth shows when the pool lies in a lawn, terrace or other area; without ground around it, it stays flat as before.
- **Terrace doors open outwards:** **⇅ Reverse opening direction** now works for terrace doors too; in 3D the sashes swing outside (#492).
- **Extensions page tidier:** the shop's packs and your installed packs fold into one bar each – installed, updates, not installed yet – with the list on a tap and **Install/update all**.

### Fixed

- **Robot vacuum with dock (Smart Home pack):** it gets the **Current room (sensor)** field, links to the vacuum in its room by itself and drives its lanes through the reported room in 3D like the built-in robot (#470, thanks MKRAFT3D and frops83).
- **Smoke detectors** take binary sensors (`binary_sensor.…_smoke`); other items offer binary sensors of alarm classes (smoke, gas, CO, water, heat) (#490, thanks frops83).
- **Roof windows** stay in the slope when the roof fades out over a floor or a room – open, tilted, blind down; a closed rim between roof and frame, so a low view no longer looks through into the room below (#482 thanks RkcCorian, #490).
- **Wall view:** the Del key there no longer reaches what is chosen in the plan behind it.
- **Pool warnings** (frost, pH, chlorine) no longer make every room of the house pulse – they show at the top only.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.17.1** comes with a present: **pets** 🐱🐶🐰 – a thank-you for your great support. Many of you report bugs, test, send ideas and buy packs, and that is what keeps HomePlan 3D going. So here is something just for fun.

Besides that, 1.17.1 fixes what you reported after 1.17.0: terrace doors that open outwards, the robot vacuum with dock from the Smart Home pack, smoke detectors with binary sensors and roof windows in the room view. The wall view can zoom now, and pools get a real depth.

![HomePlan 3D 1.17.1: pets – a cat on the sofa, a labrador and a cat taking the stairs, fish in the aquarium](https://raw.githubusercontent.com/Mastershort/neonplan3d/main/docs/images/pets.jpg)

### 🎁 A present: pets (fun pack)

- **A cat, a rabbit or a dog** – dachshund, pug, terrier, labrador or shepherd – live in your 3D house. They walk through the doors from room to room and **up and down the stairs**, a cat jumps onto the **sofa or bed** from the front, a dog lies down in front of it, and at night they sleep curled up.
- A door whose contact reports it shut stops them. In the **aquariums** of the Pets pack, colourful **fish** swim.
- They are only drawn while one moves – resting, they cost nothing, even on old wall tablets.
- **How to get it:** the fun pack *Pets* is **free in the shop (0 €)** for everyone who already supports HomePlan 3D with a pack – no invoice; give something if you like, but you don't have to. Then **Extensions → 🎈 Fun packs → + Add a pet**. In the dashboard card, **Show the pets** (`pets: false`) leaves them out, e.g. on the wall tablet. Admins get a short note in the editor once.
- More fun packs will follow now and then, e.g. for Halloween or Christmas.

### New

- **Wall view – zoom:** in *Wall from the front* the mouse wheel zooms towards the pointer, two fingers on a tablet; **＋ / − / ⤢** at the bottom right, arrows move the view while zoomed. Small parts such as connections are easy to hit now.
- **Pools with depth:** a pool has a **basin depth** (1.50 m unless set) and a **rim above the lawn** – a 1.50 m pool that stands 20 cm out of the lawn: depth 1.50, rim 0.20. In 3D you look through the water onto the basin's walls and floor. The depth shows when the pool lies in a lawn, terrace or other area; without ground around it, it stays flat as before.
- **Terrace doors open outwards:** **⇅ Reverse opening direction** now works for terrace doors too; in 3D the sashes swing outside (#492).
- **Extensions page tidier:** the shop's packs and your installed packs fold into one bar each – installed, updates, not installed yet – with the list on a tap and **Install/update all**.

### Fixed

- **Robot vacuum with dock (Smart Home pack):** it gets the **Current room (sensor)** field, links to the vacuum in its room by itself and drives its lanes through the reported room in 3D like the built-in robot (#470, thanks MKRAFT3D and frops83).
- **Smoke detectors** take binary sensors (`binary_sensor.…_smoke`); other items offer binary sensors of alarm classes (smoke, gas, CO, water, heat) (#490, thanks frops83).
- **Roof windows** stay in the slope when the roof fades out over a floor or a room – open, tilted, blind down; a closed rim between roof and frame, so a low view no longer looks through into the room below (#482 thanks RkcCorian, #490).
- **Wall view:** the Del key there no longer reaches what is chosen in the plan behind it.
- **Pool warnings** (frost, pH, chlorine) no longer make every room of the house pulse – they show at the top only.

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
