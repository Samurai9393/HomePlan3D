**HomePlan 3D 1.20.1** is a fix-up: old wall tablets show the house again, waste bins show the right day, and supporters see their beta add-ons properly.

### Fixed

- **Old wall tablets show the house again:** on older WebViews (Fire 7 and others before Chrome 108) the NeonPlan page lost its height since 1.18.2 – only the header was left and the 3D view stayed empty. Fixed, and the build now refuses the newer browser functions those tablets lack. Thanks to @diegood, whose CasaNeon fork found it!
- **Bins emptied every two or four weeks (#585):** a bin whose next pickup was more than 10 days away showed nothing. NeonPlan now reads the waste calendar six weeks ahead. Thanks @sir-captain-awesome!
- **Wrong number of days from a sensor:** a sensor whose text holds another number ("Residual waste bin every 2 weeks in 4 days") showed that number instead of the days. Thanks @LortusX!
- **Pickup day one day early:** across the change to winter time the day shown on a tap on the bin was one day early.
- **Supporters and beta add-ons (#583):** a Supporter-Pass holder whose key does not have a beta add-on yet saw "Become a supporter". Now it says the beta is theirs, and a beta pack waiting on the key says to install it. Thanks @twynne!

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).

---
**HomePlan 3D 1.20.1** is a fix-up: old wall tablets show the house again, waste bins show the right day, and supporters see their beta add-ons properly.

### Fixed

- **Old wall tablets show the house again:** on older WebViews (Fire 7 and others before Chrome 108) the NeonPlan page lost its height since 1.18.2 – only the header was left and the 3D view stayed empty. Fixed, and the build now refuses the newer browser functions those tablets lack. Thanks to @diegood, whose CasaNeon fork found it!
- **Bins emptied every two or four weeks (#585):** a bin whose next pickup was more than 10 days away showed nothing. NeonPlan now reads the waste calendar six weeks ahead. Thanks @sir-captain-awesome!
- **Wrong number of days from a sensor:** a sensor whose text holds another number ("Residual waste bin every 2 weeks in 4 days") showed that number instead of the days. Thanks @LortusX!
- **Pickup day one day early:** across the change to winter time the day shown on a tap on the bin was one day early.
- **Supporters and beta add-ons (#583):** a Supporter-Pass holder whose key does not have a beta add-on yet saw "Become a supporter". Now it says the beta is theirs, and a beta pack waiting on the key says to install it. Thanks @twynne!

### How to update

Settings → System → Updates. HACS only looks for new versions every few hours, so a fresh update may not show there yet. Then: HACS → HomePlan 3D → ⋮ → **Update information** → **Download**. Restart Home Assistant and reload the page (Ctrl+F5).
