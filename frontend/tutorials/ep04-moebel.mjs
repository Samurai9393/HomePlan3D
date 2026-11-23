// Tutorial episode 4 – "Furniture: place, turn, adjust", in two parts (the checklist does not fit into 8 minutes):
//   a) place, turn and adjust furniture: the library (sections, search, preview, symbols), placing, moving (wall
//      snap, Alt, arrow keys, X/Y), every way to turn (handle, Alt, ↺/↻ 90°, R, “Turn”, 45° in 3D beside),
//      “Mirror”, size, “Height above the floor” (dryer on the washer, wall cabinet, “Automatic height”), a table lamp on
//      a table, name and “Furniture item”, “Fix” (L), “Duplicate”, delete, the right-click menu, all keys, and
//      “Furnish …” (room packages).
//   b) Electrical furniture, parking space and robot vacuum: TV with media player and power sensor (automatic), washer,
//      radiator, “State from” with two halves (bed), the parking spot with its sensors, the robot vacuum with its
//      current-room sensor, everything live in 3D.
// Only built-in (free) furniture: the preview's packs are hidden (no demo pack, no Pro features), like a fresh install.
// Starts from the house of episode 3 (loaded invisibly); part b starts from the furnished ground floor of part a.
// Usage (from frontend/): node tutorials/ep04-moebel.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep04a/de and …/en, resp. ep04b)
// EP04_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { appVersion, narration, startRecorder } from "./recorder.mjs";
import { helpers, tap } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep04";
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP04_FAST;
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;

// ---------------------------------------------------------------- states (the invented house of episode 3)
const rectRoom = (id, name, area_id, x0, z0, x1, z1, floor_material = "wood") => ({ id, name, area_id, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material });
const hole = (id, type, room_id, edge, offset, width, extra = {}) => ({ id, room_id, edge, offset, width, type, sill: type === "door" ? 0 : 0.9, height: type === "door" ? 2.05 : 1.3, hinge: "left", leaves: 1, swing: "in", cover: null, contact: null, contact2: null, tilt: null, ...extra });
const floorOf = (id, name, elevation, ha_floor, rooms, openings = [], extra = {}) => ({ id, name, elevation, height: 2.5, cut_height: 1.15, rooms, openings, furniture: [], placements: [], background: null, outdoor: [], walls: [], ha_floor, ...extra });
const item = (id, type, x, z, w, d, h, rotation = 0, extra = {}) => ({ id, type, x, z, w, d, h, rotation, variant: null, ...extra });

const ground = (garage = false) =>
  floorOf(
    "eg",
    "Ground floor",
    0,
    "erdgeschoss",
    [
      rectRoom("r_wohnen", "Living room", "wohnzimmer", 0, 0, 6, 4.5),
      rectRoom("r_kueche", "Kitchen", "kueche", 6, 0, 9.5, 4.5, "tiles"),
      rectRoom("r_flur", "Hall", "flur", 0, 4.5, 4, 7.5, "tiles"),
      rectRoom("r_bad", "Bathroom", "bad", 4, 4.5, 6.5, 7.5, "tiles"),
      rectRoom("r_schlafen", "Bedroom", "schlafzalways", 6.5, 4.5, 9.5, 7.5, "carpet"),
      ...(garage ? [rectRoom("r_garage", "Garage", "garage", 9.5, 0, 13, 5.5, "concrete")] : []),
    ],
    [
      hole("o1", "window", "r_wohnen", 0, 3, 1.6),
      hole("o2", "window", "r_kueche", 0, 1.75, 1.2),
      hole("o3", "door", "r_flur", 3, 2.3, 1.0),
      hole("o4", "door", "r_flur", 0, 1.2, 0.9),
      hole("o5", "door", "r_bad", 0, 1.25, 0.8),
      hole("o6", "window", "r_bad", 2, 1.25, 0.8, { sill: 1.3, height: 0.8 }),
      hole("o7", "door", "r_schlafen", 0, 1.5, 0.9),
      hole("o8", "window", "r_schlafen", 2, 1.5, 1.4),
      ...(garage ? [hole("g1", "garage", "r_garage", 1, 2.75, 2.5, { height: 2.1 })] : []),
    ],
  );
const upper = () =>
  floorOf(
    "og",
    "Upper floor",
    2.75,
    "obergeschoss",
    [rectRoom("r_kind", "Kids' room", "kinderzalways", 0, 0, 4.5, 4.5), rectRoom("r_arbeit", "Study", "arbeitszalways", 4.5, 0, 9.5, 4.5), rectRoom("r_flur_og", "Upper hallway", null, 0, 4.5, 9.5, 7.5)],
    [hole("p1", "window", "r_kind", 0, 2.25, 1.2), hole("p2", "window", "r_arbeit", 0, 2.5, 1.6), hole("p3", "door", "r_kind", 2, 2.25, 0.9), hole("p4", "door", "r_arbeit", 2, 2.5, 0.9), hole("p5", "window", "r_flur_og", 2, 4.75, 1.2)],
    { start_view: { theta: 3.6, phi: 0.85, radius: 15 } },
  );
const cellar = () =>
  floorOf(
    "kg",
    "Cellar",
    -2.45,
    "keller",
    [rectRoom("k_heiz", "Heating room", "heizung", 0, 1.38, 4, 4.44), rectRoom("k_hobby", "Hobby room", "hobby", 4, 1.38, 8, 4.44), rectRoom("k_vorrat", "Storage room", "vorrat", 0, 4.44, 4, 7.5), rectRoom("k_wasch", "Laundry room", "waschkueche", 4, 4.44, 8, 7.5)],
    [],
    { height: 2.2 },
  );
const attic = () => floorOf("dg", "Attic", 5.5, "dachgeschoss", [rectRoom("d_boden", "Attic floor", null, 0, 0, 9.5, 7.5)], [], { height: 2.2 });
/** The house as episode 3 left it (with its stairs). */
const houseEp03 = (garage = false) => {
  const f = [cellar(), ground(garage), upper(), attic()];
  f[1].furniture.push(item("st_main", "stairs", 2.0, 6.85, 1.0, 3.2, 2.75, 90));
  f[2].furniture.push(item("h_gallery", "stairwell", 2.0, 6.2, 3.2, 0.5, 0.02));
  return f;
};
/** Room packages of the furnished ground floor (applied with the editor's own “Furnish …”). */
const PACKAGES = [
  ["r_wohnen", "living"],
  ["r_kueche", "kitchen_row"],
  ["r_bad", "bath"],
  ["r_schlafen", "bedroom"],
  ["r_flur", "hall"],
];

// ---------------------------------------------------------------- recorder
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
const N = narration(R, process.argv.slice(4));
const { say, sayOver, chapter, catchUp } = N;
const h = helpers(R);
if (FAST) {
  const { move, glide, type } = R;
  R.move = (x, y) => move(x, y, 0.04);
  R.glide = (a, b) => glide(a, b, 0.12);
  R.type = (text) => type(text, 0.01);
}
// a draft that fails still writes what it recorded (for checking the stills)
for (const ev of ["uncaughtException", "unhandledRejection"]) {
  process.on(ev, async (err) => {
    console.error(err);
    await R.finish().catch(() => {});
    process.exit(1);
  });
}
// confirm() / alert() of the app: accepted at once (a native dialog is not in the screenshots; fakeDialog shows it)
R.page.on("dialog", (d) => void d.accept());

// ---------------------------------------------------------------- helpers
const editorOpen = async () => {
  await tap(R, { text: "Editor", exact: true });
  await R.sleep(700);
};
/** A fresh install: no packs at all (no demo pack, no Pro features) – only the built-in furniture. */
const freeOnly = () =>
  R.page.evaluate(async () => {
    const p = window.fp3dPanel;
    const hass = p.hass;
    const orig = hass.callWS;
    hass.callWS = async (m) => (m.type === "homeplan3d/packs/list" ? { packs: [] } : orig(m));
    await p.data.reloadPacks();
  });
/**
 * The robot vacuum's device with a "current room" sensor (as Roborock or Dreame report it), invented for the demo.
 * The objects of the mock are changed in place, so its later state updates keep them.
 */
const robotSensor = (room) =>
  R.page.evaluate((room) => {
    const p = window.fp3dPanel;
    const hass = p.hass;
    hass.entities["vacuum.saugi"].device_id = "d_saugi";
    hass.entities["sensor.saugi_aktueller_raum"] = { entity_id: "sensor.saugi_aktueller_raum", area_id: "wohnzimmer", device_id: "d_saugi" };
    hass.states["sensor.saugi_aktueller_raum"] = { entity_id: "sensor.saugi_aktueller_raum", state: room, attributes: { friendly_name: "Vacuum current room" } };
    p.hass = { ...hass };
  }, room);
/** Load a state invisibly (no undo step) and show a floor. */
const loadState = async (floors, floorId) => {
  await R.editor(`const d = structuredClone(e._doc); d.floors = ${JSON.stringify(floors)}; e.setDoc(d, null); e.past = []; e._canUndo = false; e._floorId = ${JSON.stringify(floorId)}; e._roomId = null; e._furnitureId = null; e.fit();`);
  await R.sleep(900);
};
/** Furnish rooms invisibly with the editor's room packages (the same code as “Furnish …”). */
const furnish = async (list) => {
  await R.editor(`for (const [id, pkg] of ${JSON.stringify(list)}) { const room = e.floor.rooms.find((r) => r.id === id); e._roomId = id; e.applyPackage(room, pkg); } e._roomId = null; e._notice = null; e.past = []; e._canUndo = false;`);
  await R.sleep(600);
};
const { fill, typeOver, tapPlan, pointPlan, pickEntity, pickerMove, scrollSide, anywhere, view2d } = h;
const dragPlan = async (x0, z0, x1, z1, seconds = 1) => {
  const a = await R.planPoint(x0, z0);
  const b = await R.planPoint(x1, z1);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, seconds);
};
/** Hold a key while doing something (Alt while dragging). */
const holding = async (key, fn) => {
  await R.page.keyboard.down(key);
  try {
    await fn();
  } finally {
    await R.page.keyboard.up(key);
  }
};
/** Press a key (with modifiers) and show it as a key cap. */
const press = async (label, key, mods = [], times = 1) => {
  await blur();
  await keyCap(label);
  for (let i = 0; i < times; i++) {
    for (const m of mods) await R.page.keyboard.down(m);
    await R.page.keyboard.press(key);
    for (const m of mods.slice().reverse()) await R.page.keyboard.up(m);
    await R.frame(0.35, 120);
  }
};
/** Take the focus out of a form field (keys go to the plan then). */
const blur = () =>
  R.page.evaluate(() => {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    a?.blur?.();
  });
/** Tap the first furniture item of a type in the plan. */
const tapItem = async (type, seconds = 0.5) => {
  const f = await R.editor(`const f = e.floor.furniture.find((f) => f.type === ${JSON.stringify(type)}); return { x: f.x, z: f.z };`);
  await tapPlan(f.x, f.z, seconds);
  return f;
};
/** An element of the editor (by selector), the n-th match; its centre. */
const edEl = (selector, n = 0) =>
  R.editor(`const el = e.renderRoot.querySelectorAll(${JSON.stringify(selector)})[${n}]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`);
const moveEl = async (selector, n = 0, seconds = 0.5) => {
  const b = await edEl(selector, n);
  if (!b) throw new Error(`no editor element: ${selector}`);
  await R.move(b.x, b.y, seconds);
};
const clickEl = async (selector, n = 0, seconds = 0.5) => {
  await moveEl(selector, n, seconds);
  await R.click();
};
/** A key cap at the bottom left of the plan ("Alt", "Shift + R"), or none. */
const keyCap = (text) =>
  R.page.evaluate((text) => {
    document.getElementById("tut-key")?.remove();
    if (!text) return;
    const d = document.createElement("div");
    d.id = "tut-key";
    d.style.cssText =
      "position:fixed;left:40px;bottom:70px;z-index:2147483643;padding:12px 22px;border-radius:12px;background:rgba(8,16,34,.86);border:2px solid #37e0ff;box-shadow:0 0 22px rgba(55,224,255,.45);color:#eaf6ff;font:700 34px/1 system-ui,'Segoe UI',sans-serif;letter-spacing:.5px";
    d.textContent = text;
    document.body.appendChild(d);
  }, text);
/** A card with all keys, over the plan. */
const keyCard = (show) =>
  R.page.evaluate((show) => {
    document.getElementById("tut-keys")?.remove();
    if (!show) return;
    const rows = [
      ["R", "Turn 90° right"],
      ["Shift + R", "Turn 90° left"],
      ["L", "Fix / Unfix"],
      ["Delete", "Delete"],
      ["Arrow keys", "Nudge 5 cm (Shift 10 cm, Alt 1 cm)"],
      ["Alt while dragging", "Move freely, turn handle in 1° steps"],
      ["Ctrl + Z / Ctrl + Y", "Undo / Redo"],
      ["Esc", "Close menu, clear selection"],
      ["Right-click", "Fix, Duplicate, Turn, Mirror, Delete"],
    ];
    const d = document.createElement("div");
    d.id = "tut-keys";
    d.style.cssText =
      "position:fixed;left:120px;top:190px;z-index:2147483643;padding:28px 36px;border-radius:20px;background:rgba(8,16,34,.92);border:1px solid rgba(55,224,255,.6);box-shadow:0 0 40px rgba(55,224,255,.35);color:#eaf6ff;font:400 25px/1.25 system-ui,'Segoe UI',sans-serif";
    d.innerHTML =
      `<div style="font-weight:700;font-size:32px;margin-bottom:18px">Furniture: all keys</div>` +
      rows
        .map(
          ([k, t]) =>
            `<div style="display:flex;gap:22px;margin:10px 0;align-items:center"><span style="min-width:280px;text-align:right"><b style="display:inline-block;padding:4px 12px;border-radius:8px;border:2px solid #37e0ff;color:#fff">${k}</b></span><span>${t}</span></div>`,
        )
        .join("");
    document.body.appendChild(d);
  }, show);
/** The app's confirm() as a visible box with OK and “Cancel” (native dialogs are not in headless screenshots). */
const fakeConfirm = (text) =>
  R.page.evaluate((t) => {
    const d = document.createElement("div");
    d.id = "tut-dialog";
    d.style.cssText =
      "position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:2147483644;max-width:620px;padding:22px 26px;border-radius:12px;background:#f4f6fa;color:#111;font:18px/1.4 system-ui,'Segoe UI',sans-serif;box-shadow:0 12px 50px rgba(0,0,0,.6)";
    d.innerHTML = `<div style="font-size:14px;color:#555;margin-bottom:8px">127.0.0.1 says</div>${t}<div style="text-align:right;margin-top:18px"><span id="tut-ok" style="display:inline-block;padding:7px 22px;border-radius:6px;background:#1a73e8;color:#fff;margin-right:10px">OK</span><span id="tut-cancel" style="display:inline-block;padding:7px 18px;border-radius:6px;border:1px solid #1a73e8;color:#1a73e8">Cancel</span></div>`;
    document.body.appendChild(d);
  }, text);
const noDialog = () => R.page.evaluate(() => document.getElementById("tut-dialog")?.remove());
/** Keep the app's confirm()/alert() from firing (a fake dialog is shown instead); confirm answers "no". */
const muteDialogs = (on) =>
  R.page.evaluate((on) => {
    if (on) {
      window.__tutConfirm = window.confirm;
      window.confirm = () => false;
    } else if (window.__tutConfirm) window.confirm = window.__tutConfirm;
  }, on);
/** Move the cursor onto any element whose text contains `text` (innermost last match). */
const moveToText = async (text, seconds = 0.5) => {
  const box = await R.page.evaluate((text) => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    let hit = null;
    for (const el of walk(document)) {
      if (!/^(P|SPAN|DIV|LABEL|BUTTON|B)$/.test(el.tagName)) continue;
      if (!el.textContent.includes(text)) continue;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0) hit = el;
    }
    if (!hit) return null;
    const r = hit.getBoundingClientRect();
    return { x: r.left + Math.min(r.width / 2, 120), y: r.top + Math.min(r.height / 2, 14) };
  }, text);
  if (!box) throw new Error(`text not found: ${text}`);
  await R.move(box.x, box.y, seconds);
};
/** Centre of an element inside the editor's plan (svg), e.g. the turn handle. */
const planEl = (selector) =>
  R.editor(`const el = e.renderRoot.querySelector(${JSON.stringify(selector)}); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`);
/** The selected furniture item (id, x, z, rotation …). */
const selected = () => R.editor(`const f = e.furnitureItem; return f ? JSON.parse(JSON.stringify(f)) : null;`);
const de = (v) => String(Math.round(v * 100) / 100).replace(".", ",");
/** Drag the turn handle of the selected item around its centre, from its angle by `turn` degrees (screen, clockwise). */
const turnHandle = async (turn, seconds = 1.6) => {
  const f = await selected();
  const c = await R.planPoint(f.x, f.z);
  const hnd = await planEl(`[data-rotate="${f.id}"] .fp3d-hit`);
  const r = Math.hypot(hnd.x - c.x, hnd.y - c.y);
  const a0 = Math.atan2(hnd.y - c.y, hnd.x - c.x);
  await R.move(hnd.x, hnd.y, 0.5);
  await R.page.evaluate(() => {}); // keep order
  await R.page.mouse.down();
  const n = Math.max(2, Math.round(seconds * 25));
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const a = a0 + ((turn * Math.PI) / 180) * k;
    await R.move(c.x + Math.cos(a) * r, c.y + Math.sin(a) * r, 1 / 25);
  }
  await R.page.mouse.up();
  await R.frame(0.2, 60);
};
/** Pick an option of a select field without the overlay (long lists): a ring on the field, then the value. */
const setSelect = async (label, option) => {
  const box = await R.moveTo({ label }, 0.5);
  await R.click();
  await R.page.evaluate(
    (label, option) => {
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      let sel = null;
      for (const el of walk(document)) {
        if (el.tagName !== "LABEL" || !el.textContent.replace(/\s+/g, " ").trim().startsWith(label)) continue;
        const s = el.querySelector("select");
        if (s && s.getBoundingClientRect().width > 0) sel = s;
      }
      const opt = [...sel.options].find((o) => o.textContent.trim() === option);
      sel.value = opt.value;
      sel.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      sel.blur();
    },
    label,
    option,
  );
  await R.frame(1 / 25, 200);
  return box;
};
/** Scroll the side panel back to its top (wheel at its edge). */
const sideTop = async (seconds = 0.5) => {
  await h.side(0.3);
  const top = await R.editor(`const s = e.renderRoot.querySelector("aside.fp3d-side:not(.fp3d-side-strip)"); return s ? s.scrollTop : 0;`);
  if (!top) return;
  const n = Math.max(1, Math.round(seconds * 25));
  let done = 0;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = Math.round(top * k) - done;
    done += step;
    if (step) await R.page.mouse.wheel({ deltaY: -step });
    await R.frame(1 / 25, 30);
  }
  await R.frame(1 / 25, 120);
};
/** Empty the library's search field (all sections back). */
const clearSearch = async () => {
  await R.clickOn("input.fp3d-search", 0.4);
  await typeOver("");
  await R.key("Escape");
};
/** Search the library (the room is selected, so the library is on top). */
const search = async (text) => {
  await R.clickOn("input.fp3d-search", 0.5);
  await typeOver(text);
  await R.frame(0.3, 150);
};
/** Point the editor's 3D pane at a plan point (x, z) of a floor – like turning and zooming by hand. */
const setPane = (floorId, x, z, cam, main = false) =>
  R.page.evaluate(
    (floorId, x, z, cam, main) => {
      const panel = document.querySelector("homeplan3d-panel").shadowRoot;
      const v = main ? panel.querySelector("fp3d-view3d") : panel.querySelector("fp3d-editor").renderRoot.querySelector("fp3d-view3d");
      const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
      const fv = viewer.floorMap.get(floorId);
      const t = fv.group.position.clone().set(x, 0, z);
      fv.group.localToWorld(t);
      const view = viewer.controls.view;
      view.target.copy(t);
      Object.assign(view, cam);
      viewer.invalidate();
    },
    floorId,
    x,
    z,
    cam,
    main,
  );
/** Glide the 3D pane (or the main view) around a plan point. */
const glidePane = async (floorId, x, z, a, b, seconds, main = false) => {
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * 25));
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await setPane(floorId, x, z, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k }, main);
    await R.frame(1 / 25, 40);
  }
};
/** Screen point of a plan point (x, height y, z) of a floor in the editor's 3D pane. */
const panePoint = (floorId, x, y, z) =>
  R.page.evaluate(
    (floorId, x, y, z) => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const v = e.renderRoot.querySelector("fp3d-view3d");
      const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
      const fv = viewer.floorMap.get(floorId);
      const p = fv.group.position.clone().set(x, y, z);
      fv.group.localToWorld(p);
      p.project(viewer.camera);
      const c = (v.renderRoot ?? v.shadowRoot).querySelector("canvas").getBoundingClientRect();
      return { x: c.left + ((p.x + 1) / 2) * c.width, y: c.top + ((1 - p.y) / 2) * c.height };
    },
    floorId,
    x,
    y,
    z,
  );
/** Record frames while something moves on its own (the robot): `seconds` of video. */
const live = async (seconds) => {
  const end = R.time + seconds;
  while (R.time < end - 0.02) await R.frame(1 / 25, 30);
};
/** “Whole plan”: the whole plan in view again (adding an item pans the plan to it). */
const fitPlan = () => R.clickOn({ text: "Whole plan", exact: true }, 0.4);
/** Tap an empty spot of a room; if the tap missed (it should not), select the room the way the tap would. */
const tapRoom = async (x, z, id, seconds = 0.5) => {
  await tapPlan(x, z, seconds);
  const got = await R.editor(`return e._roomId;`);
  if (got !== id) {
    console.log(`tap at ${x}/${z} selected ${got}, not ${id}`);
    await R.editor(`e.selectItem("room", ${JSON.stringify(id)});`);
    await R.frame(1 / 25, 200);
  }
};
/** Up to the floor form: select tool, then "Back to …" until nothing is selected. */
const toFloor = async () => {
  await R.clickOn({ text: "Select", exact: true }, 0.45);
  for (let i = 0; i < 3; i++) {
    const up = await R.locate({ text: "Back to" }).catch(() => null);
    if (!up) break;
    await R.clickOn({ text: "Back to" }, 0.45);
  }
};

// "dump": print the furnished ground floor (for planning) and stop
if (process.argv[3] === "dump") {
  await R.open("empty");
  await freeOnly();
  await editorOpen();
  await loadState(houseEp03(true), "eg");
  await furnish(PACKAGES);
  console.log(JSON.stringify(await R.editor(`return e.floor.furniture.map((f) => [f.type, f.x, f.z, f.w, f.d, f.rotation, f.entity ?? null])`)));
  await R.page.screenshot({ path: `${out}-dump.png` });
  await R.finish();
  process.exit(0);
}

// ================================================================ PART 1: place, turn and adjust furniture
if (PART === "a") {
  // ---------------------------------------------------------------- teaser: the furnished ground floor in 3D
  await chapter("Teaser");
  await R.open("empty");
  await freeOnly();
  await R.hideCursor();
  await editorOpen();
  await loadState(houseEp03(), "eg");
  await furnish(PACKAGES);
  await tap(R, { text: "3D", exact: true, nth: 0 });
  await R.sleep(1500);
  await tap(R, { text: "Ground floor", exact: true, nth: 0 });
  await R.sleep(2500);
  {
    const A = { theta: 0.35, phi: 0.95, radius: 15 };
    const B = { theta: 1.15, phi: 0.75, radius: 12.5 };
    const C = { theta: 1.9, phi: 0.85, radius: 14 };
    await setPane("eg", 4.75, 3.75, A, true);
    await R.sleep(900);
    await R.title("Furniture: place, turn, adjust", `HomePlan 3D · episode 4 · part 1${VERSION}`);
    await sayOver("A ground floor, fully furnished: sofa, kitchen, bed and bathroom – and the lamps glow with Home Assistant.");
    await glidePane("eg", 4.75, 3.75, A, B, 5.5, true);
    await R.untitle();
    await sayOver("In this video I'll show you everything about furniture: placing, moving, turning, size and height.");
    await glidePane("eg", 4.75, 3.75, B, C, 4.5, true);
  }

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await R.open("empty");
  await freeOnly();
  await editorOpen();
  await loadState(houseEp03(), "eg");
  await view2d(112, 270, 60);
  await R.sleep(500);
  await R.hideCursor(false);
  await sayOver("We carry on with the house from episode three. The ground floor is still empty, only the stairs are already in the hall.");
  await pointPlan(2, 6.85, 0.6);
  await R.hold(0.4);
  await sayOver("Everything you see today is built in and free.");
  await pointPlan(3, 2.2, 0.6);

  // ---------------------------------------------------------------- the library
  await chapter("The furniture library");
  await sayOver("Ridge, I tap the room the furniture should go into: the living room. Then “Furniture” at the top.");
  await tapRoom(3, 1.2, "r_wohnen");
  await R.clickOn({ text: "Furniture", exact: true }, 0.6);
  await sayOver("The library opens on the right. At the top it says: new furniture goes into the middle of the living room.");
  await moveToText("New furniture appears in the middle", 0.6);
  await R.hold(0.6);
  await sayOver("Below are the sections: lights, living, dining, kitchen, sleeping, bathroom and utility, work, and parking spots.");
  await R.moveTo({ text: "Lights" }, 0.5);
  await R.hold(0.4);
  await R.moveTo({ text: "Living" }, 0.5);
  await R.hold(0.4);
  await R.moveTo({ text: "Parking" }, 0.6);
  await sayOver("One click opens a section, another one closes it again.");
  await R.clickOn({ text: "Dining" }, 0.5);
  await R.hold(0.7);
  await R.clickOn({ text: "Dining" }, 0.4);
  await sayOver("When you move the mouse over an entry, a small preview shows the item in 3D.");
  await R.moveTo({ text: "Sofa", exact: true }, 0.5);
  await R.frame(0.9, 600);
  await R.moveTo({ text: "Armchair", exact: true }, 0.4);
  await R.frame(0.9, 600);
  await sayOver("The little bulb means: a lamp you link to a light. The symbol on the TV board means: an electric item. More on that in part two.");
  await R.moveTo(".fp3d-lib-electric .fp3d-lib-badge", 0.5).catch(() => R.moveTo({ text: "Ceiling light" }, 0.5));
  await R.frame(0.9, 600);
  await R.moveTo({ text: "TV board" }, 0.6);
  await R.frame(1.2, 600);
  await sayOver("The search field knows names. I type “bench” – and find the bench and the corner bench.");
  await R.clickOn("input.fp3d-search", 0.5);
  await R.type("bench", 0.08);
  await R.frame(0.5, 150);
  await sayOver("Several words work too, in any order. Escape clears the field again.");
  await typeOver("tisch rund");
  await R.hold(0.6);
  await sayOver("A special case is the “Worktop”: a free-standing top without a base, for gaps in the kitchen or a home-made desk. Its height is the top edge.");
  await typeOver("arbeitsplatte");
  await R.moveTo({ text: "Worktop", exact: true, nth: 0 }, 0.5);
  await R.frame(1.2, 600);
  await R.moveTo({ text: "Worktop", exact: true, nth: 1 }, 0.5);
  await R.frame(0.6, 400);
  await catchUp();
  await R.clickOn("input.fp3d-search", 0.4);
  await R.key("Escape");
  await sayOver("At the very bottom, “Open extensions” – leads to more furniture; I'll show you that in episode five. Today we only use the built-in items.");
  await scrollSide({ text: "Open extensions" }, 900, 0.8);
  await R.moveTo({ text: "Open extensions" }, 0.5);
  await R.hold(0.6);
  await sideTop(0.6);

  // ---------------------------------------------------------------- placing and moving
  await chapter("Place and move furniture");
  await sayOver("One click on “Sofa” – it stands in the middle of the room and is selected right away. The plan shows its size.");
  await R.clickOn({ text: "Sofa", exact: true }, 0.5);
  await pointPlan(3, 1.55, 0.6);
  await R.hold(0.4);
  await sayOver("The line at the front marks the front – on the sofa, the side you sit on.");
  await pointPlan(3.6, 2.7, 0.5);
  await R.hold(0.6);
  await sayOver("Dragging moves it. Near a wall it snaps in flush, with its back to the wall – and if it's only roughly lined up, it straightens itself out.");
  await dragPlan(3, 2.25, 1.6, 0.6, 1.4);
  const sofa = await selected();
  console.log("sofa after snap:", sofa.x, sofa.z, sofa.rotation);
  await R.hold(0.5);
  await sayOver("Hold down the Alt key to move it freely, without snapping.");
  await keyCap("Alt");
  await holding("Alt", () => dragPlan(sofa.x, sofa.z, sofa.x + 0.1, sofa.z + 0.5, 1));
  await keyCap(null);
  await sayOver("For fine moves use the arrow keys: one press is five centimetres, with Shift ten, with Alt one.");
  await press("↑", "ArrowUp", [], 2);
  await press("Shift + ↑", "ArrowUp", ["Shift"], 2);
  await press("Alt + ↑", "ArrowUp", ["Alt"], 2);
  await keyCap(null);
  await sayOver("And for exact positions use “X” and “Y” in the form – now the sofa is back against the wall.");
  await sideTop(0.3);
  await fill("X (m)", de(sofa.x));
  await fill("Y (m)", de(sofa.z));
  await R.hold(0.3);

  // ---------------------------------------------------------------- turning
  await chapter("Turning – every method");
  await sayOver("Now turning. There are several ways to do it – I'll take an armchair.");
  await tapRoom(3.2, 3.6, "r_wohnen");
  await R.clickOn({ text: "Armchair", exact: true }, 0.5);
  await sayOver("In front of the item sits the turn handle. Drag it and the item turns in 15-degree steps – the front always points at the mouse.");
  await turnHandle(-150, 2.6);
  await R.hold(0.4);
  await sayOver("Hold Alt while you do it, and it turns in single degrees.");
  await keyCap("Alt");
  await holding("Alt", () => turnHandle(37, 1.4));
  await keyCap(null);
  await R.moveTo({ label: "Turn" }, 0.5);
  await sayOver("At the bottom of the form, the two arrow buttons turn it by exactly 90 degrees – anticlockwise or clockwise.");
  await R.clickOn({ text: "↺ 90°", exact: true }, 0.5);
  await R.hold(0.5);
  await R.clickOn({ text: "↻ 90°", exact: true }, 0.5);
  await sayOver("Even quicker is the R key. With Shift it turns the other way.");
  await h.side(0.3);
  await press("R", "r");
  await R.hold(0.3);
  await press("Shift + R", "R", ["Shift"]);
  await keyCap(null);
  await sayOver("For any angle there's the “Rotation” field – “Turn”. I type 45 – now the armchair stands at a slant.");
  await fill("Turn", "45");
  await R.hold(0.4);
  await sayOver("By the way, zero degrees means the front points down in the plan.");
  await R.moveTo({ label: "Turn" }, 0.4);
  await R.hold(0.4);

  // ---------------------------------------------------------------- mirror
  await chapter("Mirror");
  await sayOver("“Mirror” – is something else: it only swaps left and right. You see that best on the corner bench.");
  await tapRoom(5, 3.9, "r_wohnen");
  await search("eckbank");
  await R.clickOn({ text: "Corner bench", exact: true }, 0.5);
  await sayOver("I drag it into the top right corner – it snaps against the wall.");
  await dragPlan(3, 2.25, 5.0, 0.85, 1.3);
  const bench = await selected();
  console.log("bench after snap:", bench.x, bench.z, bench.rotation);
  await sayOver("Tick “Mirror” – and the short part points to the other side. That's also how you get the cupboard with its door on the other side.");
  await R.clickOn({ label: "Mirror" }, 0.5);
  await R.hold(1);
  await sayOver("Turning turns the front, mirroring only swaps the sides.");
  await pointPlan(bench.x, bench.z, 0.5);
  await R.hold(0.4);

  // ---------------------------------------------------------------- 3D beside: 45° steps
  await chapter("In 3D beside drehen");
  await sayOver("Let's switch on “3D beside”. “Whole plan” – brings the whole plan back into view.");
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await R.sleep(1500);
  await R.clickOn({ text: "Whole plan", exact: true }, 0.5);
  await setPane("eg", 2.6, 1.6, { theta: 0.3, phi: 0.8, radius: 8.5 });
  await R.frame(0.4, 300);
  await sayOver("You can tap an item in the 3D half as well. A bar then appears at the bottom.");
  {
    const chair = await R.editor(`return e.floor.furniture.find((f) => f.type === "armchair").id;`);
    const p = await panePoint("eg", 3, 0.6, 2.25);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.sleep(600);
    if (!(await R.editor(`return e._furnitureId === ${JSON.stringify(chair)};`))) {
      console.log("3D tap missed the armchair");
      await R.editor(`e.selectFrom3d("furniture", ${JSON.stringify(chair)});`);
    }
    await R.frame(1 / 25, 300);
  }
  await sayOver("Here the arrows turn it in 45-degree steps.");
  await R.clickOn({ text: "↻ 45°", exact: true }, 0.5);
  await R.hold(0.5);
  await R.clickOn({ text: "↻ 45°", exact: true }, 0.4);
  await R.hold(0.4);
  await sayOver("Next to them: width, depth, height and the height above the floor, plus fix and delete.");
  await moveEl(".fp3d-3d-bar .fp3d-3d-size", 0);
  await R.hold(0.3);
  await moveEl(".fp3d-3d-bar .fp3d-3d-size", 3);
  await R.hold(0.3);
  await moveEl(".fp3d-3d-bar .fp3d-fix");
  await sayOver("Dragging works in 3D too – the item stays in its room. To move it into another room, drag it in the plan.");
  {
    const a = await panePoint("eg", 3, 0.6, 2.25);
    const b = await panePoint("eg", 3.6, 0.6, 2.9);
    await R.move(a.x, a.y, 0.5);
    await R.drag(b.x, b.y, 1.2);
  }
  await R.hold(0.4);

  // ---------------------------------------------------------------- size
  await chapter("Change size");
  await sayOver("You change the size at the corners of the selected item. I make the sofa a bit longer.");
  await tapPlan(sofa.x, sofa.z, 0.5);
  await setPane("eg", 1.8, 0.8, { theta: 0.25, phi: 0.75, radius: 7 });
  {
    // the corner [1, 1] moves outwards along the sofa's width (the depth stays)
    const s = await selected();
    const corner = await planEl(`[data-resize="${s.id}:1:1"] .fp3d-hit`);
    const k = (await R.editor("return e._view.scale")) * 0.3;
    const a = (s.rotation * Math.PI) / 180;
    await R.move(corner.x, corner.y, 0.5);
    await R.drag(corner.x + Math.cos(a) * k, corner.y + Math.sin(a) * k, 1);
  }
  await sayOver("For exact sizes use “Width”, “Depth” and “Height” in the form. I set the width to 2.40.");
  await sideTop(0.3);
  await fill("Width", "2,4");
  await R.hold(0.4);

  // ---------------------------------------------------------------- height above the floor
  await chapter("Height above the floor");
  await sayOver("“Height above floor” – lifts an item. With it you can, for example, put the dryer on top of the washing machine.");
  await tapRoom(5.25, 5.4, "r_bad");
  await setPane("eg", 5.8, 5.3, { theta: 0.2, phi: 0.75, radius: 5 });
  await search("washing machine");
  await R.clickOn({ text: "Washing machine", exact: true }, 0.5);
  await sayOver("Ridge, the washing machine against the wall, then the dryer – with “X” and “Y” exactly on the same spot.");
  await dragPlan(5.25, 6, 6.1, 4.85, 1);
  const washer = await selected();
  console.log("washer:", washer.x, washer.z, washer.rotation);
  await tapRoom(4.5, 5.2, "r_bad");
  await search("trockner");
  await R.clickOn({ text: "Dryer", exact: true }, 0.5);
  await fill("X (m)", de(washer.x));
  await fill("Y (m)", de(washer.z));
  await fill("Turn", String(washer.rotation));
  await sayOver("The washing machine is 85 centimetres tall. So height above floor 0.85 – and the dryer sits on top.");
  await fill("Height above the floor", "0,85");
  await R.hold(1);
  await sayOver("Some items hang by themselves: a wall cabinet sits at 1.45 metres, a wall TV is centred at 1.30.");
  await tapRoom(7.75, 3.6, "r_kueche");
  await setPane("eg", 6.6, 0.9, { theta: 0.15, phi: 0.95, radius: 5 });
  await search("oberschrank");
  await R.clickOn({ text: "Wall cabinet", exact: true }, 0.5);
  await dragPlan(7.75, 2.25, 6.6, 0.3, 1);
  await R.moveTo({ label: "Height above the floor" }, 0.5);
  await R.hold(0.4);
  await sayOver("I set it to 1.60. “Automatic height” – brings it back. You hang a shelf or a network cabinet on the wall the same way – the height always counts from the floor.");
  await fill("Height above the floor", "1,6");
  await R.hold(0.6);
  await R.clickOn({ text: "Automatic height" }, 0.5);
  await R.hold(0.6);
  await sayOver("Ceiling lights, stairs and parking spots don't have this field: they hang from the ceiling or lie on the floor.");
  await R.moveTo({ label: "Height above the floor" }, 0.5);
  await R.hold(0.4);

  // ---------------------------------------------------------------- stacking
  await chapter("Lamp on the table");
  await sayOver("A table lamp stands on the item below it by itself. Ridge a coffee table in front of the sofa …");
  await tapRoom(2.2, 3.9, "r_wohnen");
  await setPane("eg", sofa.x, sofa.z + 0.8, { theta: 0.3, phi: 0.75, radius: 5.5 });
  await search("couchtisch");
  await R.clickOn({ text: "Coffee table", exact: true }, 0.5);
  await fill("X (m)", de(sofa.x));
  await fill("Y (m)", de(sofa.z + 1.1));
  await sayOver("… then a table lamp. With “X” and “Y” I put it on the table – in 3D it stands on top. That works on a bedside table, a sideboard or a desk too.");
  await tapRoom(2.2, 3.9, "r_wohnen");
  await search("tischlampe");
  await R.clickOn({ text: "Table lamp", exact: true }, 0.5);
  await fill("X (m)", de(sofa.x + 0.3));
  await fill("Y (m)", de(sofa.z + 1.1));
  await R.hold(1);

  // ---------------------------------------------------------------- name and item type
  await chapter("Name and furniture item");
  await sayOver("At the top of the form you give an item a name of its own. Then a tick box appears: the name is shown in 3D under its symbol.");
  await tapItem("armchair");
  await sideTop(0.3);
  await fill("Name", "Reading chair");
  await R.moveTo({ text: "Name under the marker" }, 0.5).catch(() => moveToText("Name under the marker", 0.5));
  await R.hold(0.4);
  await sayOver("With “Item” – you swap the type without placing it again: the armchair becomes a stool. I'll undo that right away.");
  await setSelect("Furniture item", "Stool");
  await R.hold(0.8);
  await R.clickOn({ text: "Undo", exact: true }, 0.5);

  // ---------------------------------------------------------------- fix
  await chapter("Fix");
  await sayOver("Once an item is in the right place, you fix it: “Fix” at the top – “Fix” – or the L key.");
  await tapPlan(sofa.x, sofa.z, 0.5);
  await sideTop(0.3);
  await clickEl("aside .fp3d-fix");
  await sayOver("Now it can't be moved any more – dragging only moves the view. You can still change it in the form.");
  await dragPlan(sofa.x, sofa.z, sofa.x + 1.2, sofa.z + 0.4, 1.1);
  await R.hold(0.3);
  await R.clickOn({ text: "Whole plan", exact: true }, 0.5);
  await sayOver("Deleting it only works after a confirmation. And in the 3D half a fixed item stays put as well.");
  await muteDialogs(true);
  await h.side(0.3);
  await press("Delete", "Delete");
  await fakeConfirm("This item is fixed. Delete it anyway?");
  await keyCap(null);
  await R.hold(0.6);
  {
    const b = await R.page.evaluate(() => {
      const r = document.querySelector("#tut-cancel").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(b.x, b.y, 0.5);
    await R.click();
  }
  await noDialog();
  await muteDialogs(false);
  await sayOver("“Release” – frees it again; that works with L too.");
  await h.side(0.3);
  await press("L", "l");
  await keyCap(null);
  await moveEl("aside .fp3d-fix");
  await R.hold(0.4);

  // ---------------------------------------------------------------- duplicate, delete
  await chapter("Duplicate and delete");
  await sayOver("“Duplicate” – puts a copy next to it; handy for chairs or a second armchair.");
  {
    const chair = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "armchair"); return { x: f.x, z: f.z };`);
    await tapPlan(chair.x, chair.z, 0.5);
    await sideTop(0.3);
    await R.clickOn({ text: "Duplicate", exact: true }, 0.5);
    await R.hold(0.4);
    const copy = await selected();
    await dragPlan(copy.x, copy.z, chair.x + 0.2, chair.z - 1.25, 1.1);
  }
  await sayOver("“Delete” – or the Delete key removes it. Ctrl+Z brings it back.");
  await h.side(0.3);
  await press("Delete", "Delete");
  await R.hold(0.4);
  await press("Ctrl + Z", "z", ["Control"]);
  await keyCap(null);
  await R.hold(0.3);

  // ---------------------------------------------------------------- context menu
  await chapter("The right-click menu");
  await sayOver("The most important commands are in the right-click menu as well. On a tablet you press and hold the item.");
  {
    const p = await R.planPoint(bench.x, bench.z);
    await R.move(p.x, p.y, 0.6);
    await R.page.evaluate((x, y) => {
      const c = document.getElementById("tut-cursor");
      const r = document.createElement("div");
      r.id = "tut-ring";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      r.style.borderColor = "#ffb547";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 500);
      void c;
    }, p.x, p.y);
    await R.page.mouse.click(p.x, p.y, { button: "right" });
    for (let i = 0; i < 8; i++) await R.frame(1 / 25, 25);
  }
  await sayOver("Fix, duplicate, turn 90°, mirror and delete.");
  for (const t of ["Fix", "Duplicate", "Turn 90°", "Mirror", "Delete"]) {
    await R.moveTo(`.fp3d-ctx button:nth-child(${["Fix", "Duplicate", "Turn 90°", "Mirror", "Delete"].indexOf(t) + 1})`, 0.4);
    await R.hold(0.35);
  }
  await sayOver("I choose “Mirror” – and the corner bench is back as before. Escape closes the menu and clears the selection.");
  await R.clickOn(".fp3d-ctx button:nth-child(4)", 0.4);
  await R.hold(0.8);
  await h.side(0.3);
  await press("Esc", "Escape");
  await keyCap(null);

  // ---------------------------------------------------------------- all keys
  await chapter("All keys at a glance");
  await keyCard(true);
  await say("Here are all the keys at a glance: R turns, L fixes, Delete deletes, the arrow keys nudge, Alt makes everything free and fine, Ctrl+Z undoes.");
  await R.hold(1.2);
  await keyCard(false);

  // ---------------------------------------------------------------- room packages
  await chapter("Set up rooms");
  await sayOver("Finally the quick way: a whole room at once. I pick “Select” – tap the bedroom, and at the bottom “Furnish …”.");
  await R.clickOn({ text: "Select", exact: true }, 0.5);
  await tapRoom(8, 6, "r_schlafen");
  await setPane("eg", 8, 6, { theta: 0.25, phi: 0.45, radius: 8.5 });
  await scrollSide({ text: "Furnish …" }, 380, 0.8);
  await R.clickOn({ text: "Furnish …" }, 0.5);
  await sayOver("There are nine packages to choose from, and each one lists what's in it.");
  await moveToText("row at the back wall", 0.5);
  await scrollSide({ text: "Double bed with two" }, 560, 0.8);
  await sayOver("Kitchen row, L-shaped kitchen, bathroom, bedroom, living room, dining room, office, kids' room and hall.");
  await moveToText("Washbasin, WC", 0.4);
  await R.hold(0.3);
  await moveToText("Desk with office chair", 0.5);
  await R.hold(0.3);
  await scrollSide({ text: "Coat rack, two downlights" }, 900, 0.6).catch(() => {});
  await moveToText("Coat rack, two downlights", 0.5).catch(() => {});
  await R.hold(0.3);
  await scrollSide({ text: "Double bed with two" }, 560, 0.6);
  await sayOver("I take “Bedroom”: a double bed with bedside tables, a wardrobe, a chest of drawers and a ceiling light – all against the walls.");
  await R.clickOn({ text: "Double bed with two" }, 0.5);
  await R.hold(1.2);
  await sayOver("The ceiling light is already linked to the area's light. If you don't like the package, Ctrl+Z takes it all back at once.");
  await moveToText("Furniture placed", 0.5).catch(() => R.move(1700, 760, 0.5));
  await R.hold(0.4);
  await h.side(0.3);
  await press("Ctrl + Z", "z", ["Control"]);
  await R.hold(0.6);
  await press("Ctrl + Y", "y", ["Control"]);
  await keyCap(null);
  await sayOver("I furnish the hall the same way – kitchen and bathroom work like that too. Afterwards you adjust single items, as shown before.");
  for (const [x, z, pkg, id] of [[3, 5.4, "Coat rack, two downlights", "r_flur"]]) {
    await tapRoom(x, z, id, 0.4);
    await scrollSide({ text: "Furnish …" }, 380, 0.5);
    await R.clickOn({ text: "Furnish …" }, 0.35);
    await scrollSide({ text: pkg }, 600, 0.4);
    await R.clickOn({ text: pkg }, 0.4);
    await R.frame(0.3, 300);
  }

  // ---------------------------------------------------------------- 3D check
  await chapter("Das Ergebnis in 3D");
  await sayOver("And this is what the ground floor looks like in 3D now.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.clickOn({ text: "Ground floor", exact: true, nth: 0 }, 0.6);
  await R.sleep(2000);
  await R.hideCursor();
  {
    const A = { theta: 0.3, phi: 0.9, radius: 14 };
    const B = { theta: 1.3, phi: 0.75, radius: 11.5 };
    await setPane("eg", 4.75, 3.75, A, true);
    await sayOver("Sofa and armchair, the corner bench, the dryer on the washing machine, the lamp on the table – and the furnished bedroom.");
    await glidePane("eg", 4.75, 3.75, A, B, 8, true);
  }
  await R.hideCursor(false);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("part 2: Electrical furniture, parking space and robot vacuum", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await say("That was part one: placing, moving, turning, mirroring, size, height, fixing and furnishing whole rooms. In part two we link furniture to Home Assistant.");
  await say("Left to the online demo and the manual are in the description. NeonPlan also runs on old wall tablets, by the way. See you in part two!");
  await R.hold(0.6);
} else {
  // ================================================================ PART 2: Electrical furniture, parking space and robot vacuum
  const startB = async () => {
    await R.open("empty");
    await freeOnly();
    await robotSensor("Kueche");
    await editorOpen();
    await loadState(houseEp03(true), "eg");
    await furnish(PACKAGES);
  };
  /** Part 2's end: the radiator, the bed's halves, the parking spot and the robot – for the teaser. */
  const finishB = () =>
    R.editor(`e.change((_, f) => {
      const bed = f.furniture.find((x) => x.type === "bed");
      Object.assign(bed, { state_entity: "binary_sensor.bett_left", state_entity2: "binary_sensor.bett_right", state_split: "left_right" });
      f.furniture.push({ id: "t_rad", type: "radiator", x: 1.1, z: 0.05, w: 1, d: 0.1, h: 0.6, rotation: 0, variant: null });
      f.furniture.push({ id: "t_park", type: "parking", x: 11.25, z: 2.75, w: 2.6, d: 5.2, h: 0.02, rotation: 0, variant: null, entity: "binary_sensor.garage_auto" });
      f.furniture.push({ id: "t_robot", type: "robot_vacuum", x: 5.6, z: 4.15, w: 0.36, d: 0.5, h: 0.1, rotation: 180, variant: null });
    }); e.past = []; e._canUndo = false;`);

  // ---------------------------------------------------------------- teaser
  await chapter("Teaser");
  await startB();
  await finishB();
  await R.hideCursor();
  await tap(R, { text: "3D", exact: true, nth: 0 });
  await R.sleep(1500);
  await tap(R, { text: "Ground floor", exact: true, nth: 0 });
  await R.sleep(2500);
  {
    const A = { theta: 0.5, phi: 0.85, radius: 13 };
    const B = { theta: 1.3, phi: 0.7, radius: 11 };
    const C = { theta: 2.0, phi: 0.8, radius: 13 };
    await setPane("eg", 5.5, 3.5, A, true);
    await R.sleep(900);
    await R.title("Electrical furniture, parking space and robot vacuum", `HomePlan 3D · episode 4 · part 2${VERSION}`);
    await sayOver("The TV glows, the bed shows who's lying in it, and the robot vacuum drives through the kitchen.");
    await glidePane("eg", 5.5, 3.5, A, B, 5.5, true);
    await R.untitle();
    await sayOver("In this video we link furniture to Home Assistant – plus the parking spot and the robot vacuum.");
    await glidePane("eg", 5.5, 3.5, B, C, 4.5, true);
  }

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await startB();
  await tap(R, { text: "3D beside", exact: true });
  await R.sleep(1500);
  await tap(R, { text: "Whole plan", exact: true });
  await setPane("eg", 5.5, 3, { theta: 0.5, phi: 0.85, radius: 15 });
  await R.sleep(800);
  await R.hideCursor(false);
  await sayOver("We carry on with the ground floor from part one. All rooms are furnished, and there's now a garage next to the house.");
  await pointPlan(11.25, 2.75, 0.6);
  await R.hold(0.4);
  await sayOver("Again, everything today is included for free.");
  await pointPlan(3, 2.25, 0.6);

  // ---------------------------------------------------------------- electric furniture: the TV
  await chapter("Electrical furniture: the TV");
  await sayOver("In the library you recognise electric furniture by this symbol: TV, washing machine, dryer, dishwasher, radiator, robot vacuum and more.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.moveTo({ text: "TV board" }, 0.6);
  await R.frame(1.2, 600);
  await sayOver("I tap the TV board in the living room.");
  {
    const tv = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "tv_board"); return { x: f.x, z: f.z };`);
    await tapPlan(tv.x, tv.z, 0.6);
    await setPane("eg", tv.x, tv.z, { theta: 0.6, phi: 0.8, radius: 7 });
  }
  await sideTop(0.3);
  await sayOver("The “TV” field – “TV” – says “Automatic”: NeonPlan looks for the matching media player in the area by itself – here, the TV.");
  await scrollSide({ label: "TV (Media-Player" }, 380, 0.6);
  await pickerMove("TV (Media-Player", 0.5);
  await R.hold(0.6);
  await sayOver("If you have an older TV on a smart plug, simply pick the plug's switch here.");
  await R.hold(0.4);
  await sayOver("Below it, the “Power sensor” – also found automatically. With it the item shows its watts.");
  await pickerMove("Power sensor", 0.5);
  await R.hold(0.8);
  await sayOver("“Ask before switching” – asks first before a tap in 3D switches it. I'll show you the “Marker in 3D” in episode six, with the devices.");
  await R.clickOn({ text: "Ask before switching" }, 0.5);
  await R.hold(0.4);
  await R.clickOn({ text: "Ask before switching" }, 0.4);
  await R.moveTo({ label: "Marker in 3D" }, 0.5);
  await R.hold(0.4);
  await sayOver("If you pick the entity by hand, “Back to a device pin” – appears at the bottom: it turns the item back into a plain pin.");
  await pickEntity("TV (Media-Player", "fern", "TV", 0.5);
  await scrollSide({ text: "Back to a device pin" }, 760, 0.6);
  await R.moveTo({ text: "Back to a device pin" }, 0.5);
  await R.hold(0.6);

  // ---------------------------------------------------------------- washer, radiator
  await chapter("Washing machine and radiator");
  await sayOver("The washing machine in the bathroom finds its power sensor by itself as well. It glows in 3D while it's working – that is, while it draws power.");
  {
    const w = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "washer"); return { x: f.x, z: f.z };`);
    await tapPlan(w.x, w.z, 0.6);
    await setPane("eg", w.x + 0.4, w.z - 0.3, { theta: 1.9, phi: 0.65, radius: 5 });
  }
  await sideTop(0.3);
  await scrollSide({ label: "Power sensor" }, 420, 0.5);
  await pickerMove("Power sensor", 0.5);
  await R.hold(0.6);
  await sayOver("The “Device” field takes a switch, a plug, or a status sensor, such as the print status of a 3D printer.");
  await pickerMove("Device", 0.5);
  await R.hold(0.8);
  await sayOver("A radiator takes the thermostat. I put one on the wall to the left of the TV board.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.4);
  await fitPlan();
  await tapRoom(4.6, 3.6, "r_wohnen");
  await sideTop(0.3);
  await search("heizk");
  await R.clickOn({ text: "Radiator", exact: true }, 0.5);
  await dragPlan(3, 2.25, 1.1, 0.15, 1.1);
  await setPane("eg", 1.2, 0.8, { theta: 0.3, phi: 0.7, radius: 5.5 });
  await sayOver("“Heating” – is set to automatic and finds the thermostat. Because it's heating right now, the radiator glows in 3D.");
  await scrollSide({ label: "Heating (thermostat)" }, 420, 0.5).catch(() => {});
  await pickerMove("Heating (thermostat)", 0.5).catch(() => {});
  await R.hold(1.2);

  // ---------------------------------------------------------------- state from: the bed's halves
  await chapter("State from: the bed with two halves");
  await sayOver("Any other item can glow with “State from”: the bed with an occupancy mat, the armchair, the sauna.");
  {
    const b = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "bed"); return { x: f.x, z: f.z };`);
    await R.clickOn({ text: "Select", exact: true }, 0.4);
    await tapPlan(b.x, b.z + 0.3, 0.6);
    await setPane("eg", b.x, b.z + 0.4, { theta: 5.7, phi: 0.55, radius: 7.5 });
  }
  await sideTop(0.3);
  await scrollSide({ label: "State from" }, 420, 0.5);
  await sayOver("I pick “bed left occupied”. Then a second field appears for the other half: “bed right occupied”.");
  await pickEntity("State from", "bed", "Bed left occupied", 0.5);
  await pickEntity("Second state", "bed", "Bed right occupied", 0.5);
  await sayOver("Under “Halves” – you choose left and right, or bottom and top for a loft bed.");
  await R.pickOption("Halves", "Bottom / top (bunk bed)", 0.5);
  await R.hold(0.4);
  await R.pickOption("Halves", "Left / right", 0.5);
  await sayOver("In 3D the left half glows now – someone is lying there.");
  await R.hold(1.2);

  // ---------------------------------------------------------------- parking spot
  await chapter("Parking space in the garage");
  await sayOver("Now the garage. In the library, under “Parking spots” – you'll find the “Parking spot”.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.4);
  await fitPlan();
  await tapRoom(11.25, 4.4, "r_garage");
  await sideTop(0.3);
  await clearSearch();
  await scrollSide({ text: "Parking" }, 600, 0.6);
  await R.clickOn({ text: "Parking" }, 0.5);
  await R.clickOn({ text: "Parking spot", exact: true }, 0.5);
  await setPane("eg", 11.25, 2.75, { theta: 0.6, phi: 0.8, radius: 9 });
  await sayOver("It marks where a car is parked: in the garage, on the driveway or anywhere on your property.");
  await pointPlan(11.25, 2.75, 0.5);
  await R.hold(0.5);
  await sideTop(0.3);
  await scrollSide({ label: "Sensor \"car present\"" }, 330, 0.5);
  await sayOver("For the “Sensor \"car present\"” field – I pick “car in the garage”. As long as it reports a car, the vehicle is shown – without a sensor it's always there.");
  await pickEntity("Sensor \"car present\"", "auto", "Car in the garage", 0.5);
  await sayOver("The vehicle itself comes from the “Vehicles” pack – that's why this note is here. The parking spot is free.");
  await moveToText("No vehicle pack imported", 0.5);
  await R.hold(0.6);
  await sayOver("“Size” – fits the vehicle to the spot. If it's taller than the room, the editor warns you.");
  await R.moveTo({ label: "Size (%)" }, 0.5);
  await R.hold(0.5);
  await sayOver("And the “Vehicle type sensor”: if, say, a camera analysis reports which car is there, you assign a vehicle to each state.");
  await pickEntity("Vehicle type sensor", "vehicle", "Garage vehicle type", 0.5);
  await scrollSide({ text: "+ Mapping" }, 600, 0.5);
  await R.clickOn({ text: "+ Mapping" }, 0.5);
  await R.hold(0.6);

  // ---------------------------------------------------------------- robot vacuum
  await chapter("Der Robot vacuum");
  await sayOver("Finally the robot vacuum. It goes where its dock is – in my case, the living room.");
  await fitPlan();
  await tapRoom(4.6, 3.6, "r_wohnen");
  await sideTop(0.3);
  await search("saug");
  await R.clickOn({ text: "Robot vacuum", exact: true }, 0.5);
  await setPane("eg", 4.6, 3.4, { theta: 0.3, phi: 0.7, radius: 6 });
  await dragPlan(3, 2.25, 5.6, 4.1, 1.1);
  await sayOver("“Robot vacuum” – is set to automatic and finds “Saugi”. When it cleans in Home Assistant, it drives lanes through the room in 3D and then back to its dock.");
  await sideTop(0.3);
  await scrollSide({ label: "Robot vacuum" }, 400, 0.5);
  await pickerMove("Robot vacuum", 0.5);
  await R.hold(0.5);
  await sayOver("The path is simulated, because Home Assistant usually doesn't know the exact position. But many robots report the room they're cleaning.");
  await R.hold(0.3);
  await sayOver("NeonPlan finds this sensor on the robot's device by itself: “Current room”. Here it reports “Kueche”, the kitchen spelled without the umlaut.");
  await pickerMove("Aktueller Room", 0.5);
  await R.hold(0.6);
  await sayOver("Upper and lower case and umlauts don't matter: “Kueche” matches the kitchen. So that's where it drives now.");
  await setPane("eg", 7.75, 2.5, { theta: 0.6, phi: 0.7, radius: 7.5 });
  await live(N.length("Upper and lower case and umlauts don't matter: “Kueche” matches the kitchen. So that's where it drives now."));
  await sayOver("It steers around cupboards, sofas and beds. It drives under tables and chairs, over rugs and under wall cabinets.");
  await live(N.length("It steers around cupboards, sofas and beds. It drives under tables and chairs, over rugs and under wall cabinets."));
  await sayOver("If no room matches, it stays in the room of its dock.");
  await live(N.length("If no room matches, it stays in the room of its dock."));

  // ---------------------------------------------------------------- everything live in 3D
  await chapter("All live in 3D");
  await sayOver("Now everything together in the 3D view.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.clickOn({ text: "Ground floor", exact: true, nth: 0 }, 0.6);
  await R.sleep(2000);
  await R.hideCursor();
  {
    const A = { theta: 0.3, phi: 0.85, radius: 16 };
    const B = { theta: 1.0, phi: 0.7, radius: 10.5 };
    await setPane("eg", 7, 3, A, true);
    await sayOver("The TV glows, the radiator glows, the washing machine is running, someone is lying on the left of the bed – and the robot vacuum drives through the kitchen.");
    await glidePane("eg", 7, 3, A, B, 9, true);
  }
  await R.hideCursor(false);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("Next episode: local packs and modules", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await say("That was electric furniture, state and halves, the parking spot and the robot vacuum – all with the free furniture.");
  await say("In episode five I'll show you local JSON packs: more furniture and vehicles to import – and modules that an admin approves.");
  await say("Left to the online demo and the manual are in the description. And NeonPlan also runs on old wall tablets. See you next time!");
  await R.hold(0.6);
}

await catchUp();
N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
