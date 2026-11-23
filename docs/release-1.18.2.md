**HomePlan 3D 1.18.2** is a round of fixes from your reports: light wells you can leave out, sound rings back on their speakers, live energy curves, roof windows over lower floors, round mirrors you can see, daylight under roof windows, calmer pets – and the right mouse button pans the plan.

### New

- **Light wells your way (#524):** a window below the ground can do without its light well (the tick **Light well** in the window form – e.g. where a path runs past), and **Rim above the ground** raises the well's rim and grate above gravel or a path laid around the house.
- **A solar string can end at a battery (D410):** under *Connected to* a string can now also choose a battery with a solar input of its own (a power station such as EcoFlow) – its cable then runs there instead of to the nearest inverter.
- **Pan with the right mouse button (D518):** drag the plan with the right (or middle) mouse button; a right click without dragging still opens the menu.
- **Furniture down to 1 cm (D520):** width and depth can be typed down to 1 cm, e.g. for a narrow worktop strip.

### Fixed

- **Sound rings (Sound & Cinema) on upper floors** floated far above the speakers – the floor's height was counted twice (#521).
- **Energy cards:** the day curve stopped updating after the view had left the page once (another dashboard view and back) and only came back with a reload; it now refreshes again, at once when a wall tablet's screen comes back on, and no longer drops to zero for the last minutes the recorder has no value for yet (#527).
- **Roof windows:** a soft patch of daylight lies under every roof window with an open blind – also when the sun is on the other side of the roof or so low that its light fell onto the walls of a small room (D340).
- **Pets:** they no longer sink into rugs, a dog lies along the sofa instead of half inside it, and they wander through more of the house instead of going back and forth between two places (D507).
- **Cables:** a double click on a cable point takes it out again (D410).
- **Round parts that looked hollow:** cylinders lying along the depth showed only their outline from the front, and one end of every lying cylinder was missing – e.g. the **round mirror with light** of the Bath pack, a camera's lens and some pack items. They are solid again (#534). The Bath pack gets an update with a brighter mirror and a light ring round it.
- **Roof windows over a lower floor:** where the slope reaches down over the floor below, floating roof windows now show with that floor when the roof fades out (#482).
- **Light wells under a lawn or path:** a lawn, path or terrace drawn up to the house no longer covers the light well – its rim stands just above the surface by itself (#524).
- **Furniture type list:** it offered devices of the energy tool and parts not released yet (e.g. a ball valve) that are not in the library; it now offers what the library offers (#530).
- **Sidebar panel:** with themes that set safe-area insets it was taller than the window and its bottom was cut off (#529 – thanks @brentgl for the precise report).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.18.2** is a round of fixes from your reports: light wells you can leave out, sound rings back on their speakers, live energy curves, roof windows over lower floors, round mirrors you can see, daylight under roof windows, calmer pets – and the right mouse button pans the plan.

### New

- **Light wells your way (#524):** a window below the ground can do without its light well (the tick **Light well** in the window form – e.g. where a path runs past), and **Rim above the ground** raises the well's rim and grate above gravel or a path laid around the house.
- **A solar string can end at a battery (D410):** under *Connected to* a string can now also choose a battery with a solar input of its own (a power station such as EcoFlow) – its cable then runs there instead of to the nearest inverter.
- **Pan with the right mouse button (D518):** drag the plan with the right (or middle) mouse button; a right click without dragging still opens the menu.
- **Furniture down to 1 cm (D520):** width and depth can be typed down to 1 cm, e.g. for a narrow worktop strip.

### Fixed

- **Sound rings (Sound & Cinema) on upper floors** floated far above the speakers – the floor's height was counted twice (#521).
- **Energy cards:** the day curve stopped updating after the view had left the page once (another dashboard view and back) and only came back with a reload; it now refreshes again, at once when a wall tablet's screen comes back on, and no longer drops to zero for the last minutes the recorder has no value for yet (#527).
- **Roof windows:** a soft patch of daylight lies under every roof window with an open blind – also when the sun is on the other side of the roof or so low that its light fell onto the walls of a small room (D340).
- **Pets:** they no longer sink into rugs, a dog lies along the sofa instead of half inside it, and they wander through more of the house instead of going back and forth between two places (D507).
- **Cables:** a double click on a cable point takes it out again (D410).
- **Round parts that looked hollow:** cylinders lying along the depth showed only their outline from the front, and one end of every lying cylinder was missing – e.g. the **round mirror with light** of the Bath pack, a camera's lens and some pack items. They are solid again (#534). The Bath pack gets an update with a brighter mirror and a light ring round it.
- **Roof windows over a lower floor:** where the slope reaches down over the floor below, floating roof windows now show with that floor when the roof fades out (#482).
- **Light wells under a lawn or path:** a lawn, path or terrace drawn up to the house no longer covers the light well – its rim stands just above the surface by itself (#524).
- **Furniture type list:** it offered devices of the energy tool and parts not released yet (e.g. a ball valve) that are not in the library; it now offers what the library offers (#530).
- **Sidebar panel:** with themes that set safe-area insets it was taller than the window and its bottom was cut off (#529 – thanks @brentgl for the precise report).

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
