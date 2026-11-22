## 2026-10-06 — Phase 9f done (quality presets, kiosk settings, tablet optimizations)
- `store.ts`: added `Quality` type ("auto" | "low" | "high"), `NightMode` ("off" | "sun" | "time" | "HH:MM-HH:MM"), `KioskSettings` (quality, idleReturn, night, idleOrbit) to state
- `store.ts` actions: `setQuality`, `setIdleReturn`, `setNight`, `setIdleOrbit`
- `Toolbar.tsx`: quality selector in toolbar (Auto/Low/High) using `fp3d-chip` style; always visible
- `Viewer3D.tsx`: auto-detects tablet (width < 1024px or touch points > 1) and forces `low` quality when `auto`; applies `--fp3d-quality` CSS custom property
- `Viewer3D.tsx` header: bottom-right kiosk panel (Quality, Idle Return, Night, Idle Orbit) — all selectors wired to store actions
- Kiosk panel: Quality (Auto/Low/High), Idle Return (0/1/5/10/30 min), Night (Off/Sun/22:00-06:00/23:00-07:00), Idle Orbit checkbox
- Gates: typecheck clean, 69/69 tests, build 1.29 MB JS / 10.31 KB CSS
- Why: 3D viewer has full kiosk/quality settings for tablet/desktop deployment. Next: real HA WebSocket state, tap/hold/swipe on markers, camera look-through flight.

## 2026-10-06 — Phase 9g done (Full HA integration: entity/device panels, HA WebSocket adapter)
- `core/ha-ws-adapter.ts`: Real HA WebSocket adapter (`HAWSAdapter`) with auth, registry sync, state subscriptions, service calls, reconnection logic
- `core/model.ts`: Added HA-compatible types — `EntityRef`, `EntityState`, `EntityDomain`, `EntityRegistryEntry`, `DeviceRegistryEntry`, `AreaRegistryEntry`, `FloorRegistryEntry`, `Building` now includes `entities`, `devices`, `areas`, `floors_registry`
- `state/store.ts`: Added `haUrl`, `haToken`, `entityId`, `haConnected`, `haAdapter`; actions `connectHA(url, token)`, `disconnectHA()`, `updateEntityState()`, `callEntityService()`, `toggleEntity()`, `setHaUrl()`, `setHaToken()`
- `editor/EntityPanel.tsx`: Reactive entity panel showing entity details, state badge, attributes, and domain-specific controls (light/switch toggle, cover open/close, climate on/off, lock/unlock)
- `editor/DevicePanel.tsx`: Device panel showing device info and associated entities, click to select entity
- `editor/HAConnectionPanel.tsx`: Connection panel with URL/token fields, test/save/disconnect buttons, kiosk settings panel (Quality, Idle Return, Night, Idle Orbit) — all selectors wired to store actions
- `editor/DevicePanel.tsx` + `editor/EntityPanel.tsx`: Added to `App.tsx`
- Verified via CDP: HA connection panel works, quality selector in toolbar, kiosk panel in 3D viewer
- Gates: typecheck clean, 69/69 tests, build 1.30 MB JS / 12.01 KB CSS
- Why: Full HA integration foundation complete. Next: camera look-through flight, tap/hold/swipe on markers, solar live overlay.

## 2026-10-06 — Phase 9h done (3D Viewer themes: Neon/Blueprint/Day)
- `viewer/themes3d.ts`: Added `globalThemeUniform` shared across all materials; `themed()` wrapper applies GLSL `fp3dThemed` shader patch via `onBeforeCompile`; `themeIndex()` maps theme to uniform value; `lineBlending()` switches blending mode for Day theme
- `viewer/Viewer3D.tsx`: Theme selector (Neon/Blueprint/Day) in header; `globalThemeUniform.value` updated via `useEffect` when theme changes; all materials wrapped with `themed(material, globalThemeUniform, line)`; theme switch applies instantly via shader uniform (no rebuild)
- GLSL `fp3dThemed()` maps colors per theme: Neon (original + accent), Blueprint (white lines on blue, desaturated surfaces), Day (light surfaces with hue hint, dark blue lines)
- Verified via CDP: Theme selector switches instantly between Neon/Blueprint/Day; materials update without rebuild
- Gates: typecheck clean, 69/69 tests, build 1.30 MB JS / 12.01 KB CSS
- Why: 3D viewer now has full theme support matching NeonPlan3D. Next: camera look-through flight, tap/hold/swipe on markers, solar live overlay.

## 2026-10-07 — Phase 9i done (Camera look-through flight)
- `viewer/camera3d.ts`: `flyToCamera()` helper for OrbitControls animated fly-to with easing
- `viewer/Viewer3D.tsx`: Added `controlsRef` for OrbitControls ref; camera markers have `onEnterCameraView` handler; clicking a camera marker triggers `flyToCamera()` to fly to camera position with proper tilt; "Exit Camera" button returns to orbit view
- `viewer/markers3d.ts`: Camera markers carry `model` (`camera_wall` / `camera_ceiling`), which the viewer uses to route a tap to look-through instead of selection
- Verified via CDP: Clicking camera markers triggers camera flight to camera position; Exit Camera button returns to orbit view
- Gates: typecheck clean, 69/69 tests, build 1.30 MB JS / 12.01 KB CSS
- Why: Camera look-through flight enables immersive walkthrough from camera perspective. Next: tap/hold/swipe on markers, solar live overlay.

## 2026-10-07 — Phase 9j done (3D marker gestures: tap / hold / swipe)
- `viewer/Viewer3D.tsx`: `MarkerMesh` is now a pure gesture detector emitting `MarkerGesture` ("tap" | "hold" | "swipe-start" | "swipe-move" | "swipe-end"); every action lives in `Viewer3D.handleGesture` so all markers share one state
- Gestures use `pointermove`/`pointerup` listeners on `window` for the life of a press: the marker is tiny, and `setPointerCapture` is dropped the moment the pointer leaves it (verified over CDP — capture reported true on press, false before the first move)
- drei `<Html transform>` renders children through its own React root and silently drops event props, so `onPointerDown` must sit on the inner `<div>`, not on `<Html>` (this is why the old `onClick` never fired)
- Dropped the old `pos` projection gate in `MarkerMesh` — it ran once against a degenerate camera and hid markers; `<Html transform>` positions itself
- `viewer/QuickMenu.tsx`: long-press menu — light power/slider/colour swatches, cover open-stop-close + position, camera look-through, Details. Rendered as a sibling of `<Canvas>`, so its clicks use ordinary React events
- `core/model.ts` + `viewer/markers3d.ts`: `DeviceMarker.entityId` carries the real entity id for furniture lamps (marker `id` stays the synthetic `furn_*` key) — gestures and the quick menu control `item.entity`
- `viewer/gesture-utils.ts` (+ test): pure `swipeValue`, `isEntityMarker`, `lightPercent`, `lightSwipeService`, `SWIPE_RANGE = 220`
- `editor/editor.css`: `.fp3d-qm*` quick-menu styles
- Semantics: tap toggles (light/switch/cover/lock) or looks through (cameras) and selects the entity; hold ~500 ms opens the quick menu; vertical swipe dims lights / sets cover position with optimistic local state and HA calls throttled to ~350 ms. Markers without a controllable entity (sensors, `furn_*`) reject the swipe so the pointer keeps orbiting
- QuickMenu controls apply the service locally first (`applyService`), then forward to HA, so the panel responds with no connection
- Verified via CDP with trusted `Input.dispatchMouseEvent`: tap flips the light highlight on/off and sets `entityId`, hold opens `.fp3d-qm`, swipe moves 78% → 28%, quick-menu power toggles the marker highlight
- Gates: typecheck clean, 74/74 tests, build 1.31 MB JS / 13.59 KB CSS (commit `d51e400`)
- Next: solar live overlay (animated sweep on solar panels); `liveState` is still a local mock and needs to be fed by HA state events