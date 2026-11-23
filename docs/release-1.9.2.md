
### Fixed

- **Pack furniture with light:** mirror with light, bedside lamp, aquarium, fire bowl, star ceiling, LED niche, light cove, workshop light and night light had no light field in the editor, and a tap in 3D sent an invalid entity id to Home Assistant (#46 by StevenKRT and N4IR0, #88 by wh1tetiger).
- **Lit face at windows:** with the light on, a misaligned dark rectangle lay over windows on low floors. The light cells now end at the sill, top and sides of every opening (#87 by newbeehome).
- **Editor in other languages:** with French, Spanish, Dutch, Italian (and Hungarian) the plan editor stayed English – its bundle never fetched the language file (#96 by denisb88).
- **TVs that only report "on"** (Samsung, LG) glow now; before, only "playing" lit the screen (#98 by newbeehome).
- **Dimmed lights** looked switched off: the glow follows a perceptual curve now, a lamp at 10 % clearly reads as on (#103 by newbeehome).
- **Free-standing walls** (a garden wall) take wall-mounted solar fields, on both sides (#105 by rolandarends).
- **LED strips outside** sit on the ground again (lawn, terrace) instead of a slab's thickness above it (#70 by domodial).

### New

- **Doors without a sensor** can be drawn closed ("Show closed without a sensor" in the door form) instead of half open (discussion #86 by robertkrizovnik).
- **Card:** `start_view` gives a card a start view of its own, e.g. for a small overview on another dashboard; the editor's start view section shows the line to copy (discussion #89 by karli4711).
- French, Spanish, Dutch and Italian: the 43 texts added since 1.9.0 are translated now; they showed in English.
- **Hungarian** as the fifth extra language (proofread by kopaszsop, #51).
- **Module power (Wp)** per solar field instead of the fixed 400 W – for the kWp of fields and strings and the living modules (#99 by denisb88).
- **Floors apart** lifts the roof off the top floor as well (#101 by rolandarends).
- **Energy Pro – device holograms:** every device with a power sensor (TV, washing machine, heat pump …) can carry a small glass card – power now, today's kWh, day curve – in the house view and on its floor. Tick "Hologram over the device" in the furniture form; a **Holograms** button in the energy bar hides all cards (card option `holograms`). The first free update of the pack, useful without a solar system too.
---

### Fixed

- **Pack furniture with light:** mirror with light, bedside lamp, aquarium, fire bowl, star ceiling, LED niche, light cove, workshop light and night light had no light field in the editor, and a tap in 3D sent an invalid entity id to Home Assistant (#46 by StevenKRT and N4IR0, #88 by wh1tetiger).
- **Lit face at windows:** with the light on, a misaligned dark rectangle lay over windows on low floors. The light cells now end at the sill, top and sides of every opening (#87 by newbeehome).
- **Editor in other languages:** with French, Spanish, Dutch, Italian (and Hungarian) the plan editor stayed English – its bundle never fetched the language file (#96 by denisb88).
- **TVs that only report "on"** (Samsung, LG) glow now; before, only "playing" lit the screen (#98 by newbeehome).
- **Dimmed lights** looked switched off: the glow follows a perceptual curve now, a lamp at 10 % clearly reads as on (#103 by newbeehome).
- **Free-standing walls** (a garden wall) take wall-mounted solar fields, on both sides (#105 by rolandarends).
- **LED strips outside** sit on the ground again (lawn, terrace) instead of a slab's thickness above it (#70 by domodial).

### New

- **Doors without a sensor** can be drawn closed ("Show closed without a sensor" in the door form) instead of half open (discussion #86 by robertkrizovnik).
- **Card:** `start_view` gives a card a start view of its own, e.g. for a small overview on another dashboard; the editor's start view section shows the line to copy (discussion #89 by karli4711).
- French, Spanish, Dutch and Italian: the 43 texts added since 1.9.0 are translated now; they showed in English.
- **Hungarian** as the fifth extra language (proofread by kopaszsop, #51).
- **Module power (Wp)** per solar field instead of the fixed 400 W – for the kWp of fields and strings and the living modules (#99 by denisb88).
- **Floors apart** lifts the roof off the top floor as well (#101 by rolandarends).
- **Energy Pro – device holograms:** every device with a power sensor (TV, washing machine, heat pump …) can carry a small glass card – power now, today's kWh, day curve – in the house view and on its floor. Tick "Hologram over the device" in the furniture form; a **Holograms** button in the energy bar hides all cards (card option `holograms`). The first free update of the pack, useful without a solar system too.