// Tutorial episode 7 – "Roofs part 1: Gable roof, Hipdach & Co." (manual 4.19, first half), in two parts (the
// checklist does not fit into 8 minutes):
//   a) roof sections and every roof shape: the simple roof in the settings (No roof, Flat roof, Gable roof with
//      Ridge, Roof pitch, Roof overhang) and why an L-shaped house needs more, “Roof sections (custom)” with the proposal
//      from the rooms, the roof tool (3D beside, the note, the list, the plan labels, the floor buttons, selecting),
//      deleting a proposal and drawing a section yourself, moving it, resizing it at its corners, “Duplicate”,
//      every “Shape” in 3D one after another and the ridge direction.
//   b) Eave, pitch, pent roof and garage: eave and pitch per side (a catslide), “Ridge height”, the lean-to with a
//      pent roof and “Swap sides”, “Top of walls”, “Sits on floor”, overlapping sections, the garage with
//      a flat roof and a parapet, “Height” and “Roof overhang”, “Fix” (L) and the plan lock, “Create from rooms
//      erzeugen”, “Back to one roof”, and the result in 3D.
// Dormers, roof windows, knee walls and the carport are episode 8 – only mentioned.
// The house is invented for this episode: two floors in an L shape, a utility lean-to in the inner corner, a garage.
// Usage (from frontend/): node tutorials/ep07-daecher.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep07a/de and …/en, resp. ep07b)
// EP07_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4> --en tutorials/ep07a-narration-en.json

import { appVersion, narration, startRecorder } from "./recorder.mjs";
import { helpers, tap } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep07";
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP07_FAST;
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;

// ---------------------------------------------------------------- the invented house
const rect = (id, name, area_id, x0, z0, x1, z1, floor_material = "wood") => ({ id, name, area_id, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material });
const hole = (id, type, room_id, edge, offset, width, extra = {}) => ({
  id,
  room_id,
  edge,
  offset,
  width,
  type,
  sill: type === "window" ? 0.9 : 0,
  height: type === "window" ? 1.3 : type === "garage" ? 2.1 : 2.05,
  hinge: "left",
  leaves: 1,
  swing: "in",
  cover: null,
  contact: null,
  contact2: null,
  tilt: null,
  ...extra,
});
const floorOf = (id, name, elevation, ha_floor, rooms, openings) => ({ id, name, elevation, height: 2.5, cut_height: 1.15, rooms, openings, furniture: [], placements: [], background: null, outdoor: [], walls: [], ha_floor });
const HOUSE = [
  floorOf(
    "eg",
    "Ground floor",
    0,
    "erdgeschoss",
    [
      rect("r_wohnen", "Living room", "wohnzimmer", 0, 0, 6, 4.5),
      rect("r_kueche", "Kitchen", "kueche", 6, 0, 9.5, 4.5, "tiles"),
      rect("r_flur", "Hall", "flur", 0, 4.5, 4, 7.5, "tiles"),
      rect("r_bad", "Bathroom", "bad", 4, 4.5, 6.5, 7.5, "tiles"),
      rect("r_schlafen", "Bedroom", "schlafzalways", 6.5, 4.5, 9.5, 7.5, "carpet"),
      rect("r_essen", "Dining room", null, 0, 7.5, 4, 12),
      rect("r_hwr", "Utility", null, 4, 7.5, 7, 10, "tiles"),
      rect("r_garage", "Garage", "garage", 9.5, 0, 13, 6, "concrete"),
    ],
    [
      hole("o1", "window", "r_wohnen", 0, 3, 1.6),
      hole("o2", "window", "r_kueche", 0, 1.75, 1.2),
      hole("o3", "window", "r_essen", 3, 2.25, 1.6),
      hole("o4", "window", "r_essen", 2, 2, 1.2),
      hole("o5", "door", "r_hwr", 2, 1.5, 0.9),
      hole("o6", "window", "r_schlafen", 2, 1.2, 1.2),
      hole("g1", "garage", "r_garage", 0, 1.75, 2.5),
    ],
  ),
  floorOf(
    "og",
    "Upper floor",
    2.75,
    "obergeschoss",
    [
      rect("r_kind", "Kids' room", "kinderzalways", 0, 0, 4.5, 4.5),
      rect("r_arbeit", "Study", "arbeitszalways", 4.5, 0, 9.5, 4.5),
      rect("r_flur_og", "Upper hallway", null, 0, 4.5, 9.5, 7.5),
      rect("r_eltern", "Elternzalways", null, 0, 7.5, 4, 12, "carpet"),
    ],
    [hole("p1", "window", "r_kind", 0, 2.25, 1.2), hole("p2", "window", "r_arbeit", 0, 2.5, 1.6), hole("p3", "window", "r_eltern", 3, 2.25, 1.2), hole("p4", "window", "r_eltern", 2, 2, 1.2), hole("p5", "window", "r_flur_og", 2, 4.75, 1.2)],
  ),
];
/** The garage section as part 1 draws, moves and resizes it. */
const GARAGE = { x0: 9.25, z0: -0.25, x1: 13.25, z1: 6.25 };
// plan points
const MAIN = [4.75, 2.6];
const WING = [2, 10.3];
const HWR = [5.5, 8.9];
const GAR = [11.25, 3.2];
// 3D targets (plan x, height, plan z) of the 3D half
const T_MAIN = { x: 4.75, y: 5, z: 3.75 };
const T_HOUSE = { x: 6.5, y: 3, z: 6 };
const T_WING = { x: 2, y: 4, z: 9.5 };
const T_HWR = { x: 5.5, y: 2.5, z: 8.5 };
const T_GAR = { x: 11.25, y: 2, z: 3 };

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
// confirm() of the app: accepted at once (a native dialog is not in the screenshots; fakeConfirm shows it)
R.page.on("dialog", (d) => void d.accept());
await R.page.evaluateOnNewDocument(() => {
  try {
    localStorage.clear();
  } catch {
    // no storage
  }
});

// ---------------------------------------------------------------- helpers
const { fill, typeOver, tapPlan, pointPlan, scrollSide, view3d } = h;
const T = (o) => JSON.stringify(o);
/** The house without a roof, loaded invisibly (no undo step), the ground floor shown. */
const loadHouse = async () => {
  await R.editor(`const d = structuredClone(e._doc); d.floors = ${T(HOUSE)}; d.settings.roof = { type: "none", pitch: 35, overhang: 0.4 }; e.setDoc(d, null); e.past = []; e._canUndo = false; e._floorId = "eg"; e._roomId = null; e.fit();`);
  await R.sleep(900);
};
/** The roof as part 1 leaves it (the proposal, the garage drawn anew); `final`: as part 2 leaves it. */
const roofState = (final = false) =>
  R.editor(`e.useRoofSections(true);
  const s = e._doc.settings.roof.sections;
  const garage = s.find((x) => x.x0 > 9);
  const rest = s.filter((x) => x !== garage);
  const g = { ...garage, ...${T(GARAGE)}, id: "roof_garage" };
  if (${final}) {
    const hwr = rest.find((x) => x.x0 > 3 && x.z0 > 7);
    Object.assign(hwr, { shape: "pent", flip: true, pitch_a: 15 });
    Object.assign(g, { shape: "parapet", overhang: 0 });
  }
  const d = structuredClone(e._doc); d.settings.roof.sections = [...rest, g]; e.setDoc(d, null);
  e.past = []; e._canUndo = false; e._roofId = null;`);
/** Open the preview with the house; the 3D tab shows the floors stacked (the roof sits on the house). */
const start = async () => {
  await R.open("empty");
  await tap(R, { text: "Editor", exact: true });
  await R.sleep(700);
  await loadHouse();
  await tap(R, { text: "3D", exact: true, nth: 0 });
  await R.sleep(1500);
  await tap(R, { text: "Stacked", exact: true });
  await R.sleep(300);
  await tap(R, { text: "Editor", exact: true });
  await R.sleep(900);
};
/** The roof tool with 3D beside, invisibly. */
const roofTool = async () => {
  await tap(R, { text: "roof", exact: true });
  await R.sleep(2500);
  await tap(R, { text: "Whole plan", exact: true });
};
/** Change the building in the 3D tab (teaser only): roof sections patched by a test. */
const patch3d = (fn) =>
  R.page.evaluate((src) => {
    const p = window.fp3dPanel;
    const b = structuredClone(p.data.building);
    new Function("b", src)(b);
    p.data.edit(b);
  }, fn);
/** Glide the main 3D view (theta, phi, radius). */
const glideMain = async (a, b, seconds) => {
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * 25));
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await R.view({ theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
    await R.frame(1 / 25, 40);
  }
};
/** The 3D half's camera (with its target) and a glide of it. */
const cam = (theta, phi, radius, target) => ({ theta, phi, radius, target });
const setCam = (c) => view3d(c);
const glide3d = (a, b, seconds) => h.glide3d(a, b, FAST ? 0.1 : seconds);
/** Record frames while nothing is clicked (the 3D half settles). */
const live = async (seconds) => {
  const end = R.time + seconds;
  while (R.time < end - 0.02) await R.frame(1 / 25, 40);
};
/** Take the focus out of a form field (keys go to the plan then). */
const blur = () =>
  R.page.evaluate(() => {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    a?.blur?.();
  });
/** A key cap at the bottom left of the plan, or none. */
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
const press = async (label, key) => {
  await blur();
  await keyCap(label);
  await R.page.keyboard.press(key);
  await R.frame(0.35, 150);
};
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
/** Centre of an element of the editor (selector), the n-th match. */
const edEl = (selector, n = 0) =>
  R.editor(`const el = e.renderRoot.querySelectorAll(${T(selector)})[${n}]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`);
/** The id of the roof section that contains a plan point (the last one, drawn on top). */
const secAt = (x, z) => R.editor(`const s = (e._doc.settings.roof.sections ?? []).filter((s) => s.x0 <= ${x} && ${x} <= s.x1 && s.z0 <= ${z} && ${z} <= s.z1); return s.length ? s[s.length - 1].id : null;`);
const selected = () => R.editor(`const s = e.roofSection; return s ? JSON.parse(JSON.stringify(s)) : null;`);
/** Tap a roof section in the plan; if the tap picked another one, select the right one the way the tap would. */
const tapSection = async ([x, z], seconds = 0.5) => {
  const want = await secAt(x, z);
  await tapPlan(x, z, seconds);
  const got = await R.editor(`return e._roofId;`);
  if (got !== want) {
    console.log(`tap at ${x}/${z} selected ${got}, not ${want}`);
    await R.editor(`e._roofId = ${T(want)};`);
    await R.frame(1 / 25, 200);
  }
};
/** A select field whose label text (without its options) is exactly `label`: its centre. */
const selBox = (label) =>
  R.page.evaluate((label) => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    for (const el of walk(document)) {
      if (el.tagName !== "LABEL") continue;
      const s = el.querySelector("select");
      if (!s || s.getBoundingClientRect().width === 0) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
      if (own !== label) continue;
      const r = s.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return null;
  }, label);
/** A click ring at x/y without clicking (for select fields). */
const ring = async (x, y) => {
  await R.page.evaluate((x, y) => {
    const r = document.createElement("div");
    r.id = "tut-ring";
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 500);
  }, x, y);
  for (let i = 0; i < 8; i++) await R.frame(1 / 25, 25);
};
/**
 * Pick an option of a select field (its own label text exactly `label`): a ring on the field, the option list as an
 * overlay (a native dropdown is not in headless screenshots), the option clicked, then the value set.
 */
const pick = async (label, option, seconds = 0.5) => {
  const box = await selBox(label);
  if (!box) throw new Error(`no select: ${label}`);
  await R.move(box.x, box.y, seconds);
  // only the ring: a real click would open the native dropdown beside the overlay (it shows up in the screenshots)
  await ring(box.x, box.y);
  const at = await R.page.evaluate(
    (label, option) => {
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      let sel = null;
      for (const el of walk(document)) {
        if (el.tagName !== "LABEL") continue;
        const s = el.querySelector("select");
        if (!s || s.getBoundingClientRect().width === 0) continue;
        if ([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim() === label) sel = s;
      }
      if (!sel) return null;
      if (!document.getElementById("tut-options-style")) {
        const st = document.createElement("style");
        st.id = "tut-options-style";
        st.textContent = `#tut-options { position: fixed; z-index: 2147483640; background: #101a2e; border: 1px solid #37e0ff; border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0,0,0,.6); padding: 4px 0; font: 15px/1.2 system-ui, "Segoe UI", sans-serif; color: #eaf6ff; overflow: hidden; }
          #tut-options div { padding: 7px 14px; white-space: nowrap; }
          #tut-options div.tut-sel { color: #37e0ff; }
          #tut-options div.tut-hover { background: #1f6f86; color: #fff; }`;
        document.head.appendChild(st);
      }
      const r = sel.getBoundingClientRect();
      const o = document.createElement("div");
      o.id = "tut-options";
      let hit = null;
      for (const opt of sel.options) {
        const d = document.createElement("div");
        d.textContent = opt.textContent.trim();
        if (opt.selected) d.className = "tut-sel";
        if (d.textContent === option) hit = d;
        o.appendChild(d);
      }
      o.style.left = `${r.left}px`;
      o.style.width = `${r.width}px`;
      document.body.appendChild(o);
      const hh = o.getBoundingClientRect().height;
      o.style.top = `${r.bottom + hh + 4 < innerHeight ? r.bottom + 2 : Math.max(4, r.top - hh - 2)}px`;
      if (!hit) return null;
      hit.classList.add("tut-hover");
      const b = hit.getBoundingClientRect();
      return { x: b.left + Math.min(60, b.width / 2), y: b.top + b.height / 2 };
    },
    label,
    option,
  );
  if (!at) throw new Error(`no option: ${label} / ${option}`);
  await R.frame(0.4, 60);
  await R.move(at.x, at.y, 0.5);
  await R.click();
  await R.page.evaluate(
    (label, option) => {
      document.getElementById("tut-options")?.remove();
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      for (const el of walk(document)) {
        if (el.tagName !== "LABEL") continue;
        const s = el.querySelector("select");
        if (!s || s.getBoundingClientRect().width === 0) continue;
        if ([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim() !== label) continue;
        const opt = [...s.options].find((o) => o.textContent.trim() === option);
        s.value = opt.value;
        s.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        s.blur();
        return;
      }
    },
    label,
    option,
  );
  await R.frame(1 / 25, 250);
};
/** Drag from one plan point to another. */
const dragPlan = async (x0, z0, x1, z1, seconds = 1) => {
  const a = await R.planPoint(x0, z0);
  const b = await R.planPoint(x1, z1);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, seconds);
};
/** Drag a corner handle of the selected section to a plan point. */
const dragCorner = async (kx, kz, x, z, seconds = 1) => {
  const id = await R.editor(`return e._roofId;`);
  const a = await edEl(`[data-roof-corner="${id}:${kx}:${kz}"] .fp3d-hit`);
  if (!a) throw new Error("no corner handle");
  const b = await R.planPoint(x, z);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, seconds);
};
/** Scroll the side panel back to its top. */
const sideTop = async (seconds = 0.4) => {
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
/** A point in the 3D half (for pointing at the roof): plan x, height y, plan z. */
const panePoint = (x, y, z) =>
  R.editor(`const v = e.renderRoot.querySelector("fp3d-view3d"); const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
    const fv = viewer.floorMap.get("eg"); const p = fv.group.position.clone().set(${x}, ${y}, ${z}); fv.group.localToWorld(p);
    p.project(viewer.camera); const c = (v.renderRoot ?? v.shadowRoot).querySelector("canvas").getBoundingClientRect();
    return { x: c.left + ((p.x + 1) / 2) * c.width, y: c.top + ((1 - p.y) / 2) * c.height };`);
const point3d = async (x, y, z, seconds = 0.5) => {
  const p = await panePoint(x, y, z);
  await R.move(p.x, p.y, seconds);
};

// ================================================================ PART 1: roof sections and every roof shape
if (PART === "a") {
  // ---------------------------------------------------------------- teaser: the finished roof, shapes changing
  await chapter("Teaser");
  await start();
  await roofState(true);
  await R.hideCursor();
  await tap(R, { text: "3D", exact: true, nth: 0 });
  await R.sleep(2500);
  {
    const A = { theta: 0.35, phi: 0.95, radius: 30 };
    const B = { theta: 0.85, phi: 0.9, radius: 27 };
    const C = { theta: 1.5, phi: 0.95, radius: 29 };
    const shape = (s) => patch3d(`b.settings.roof.sections[0].shape = ${T(s)};`);
    await R.view(A);
    await R.sleep(1500);
    await R.title("Roofs: Gable roof, Hipdach & Co.", `HomePlan 3D · episode 7 · part 1${VERSION}`);
    await sayOver("Gable, hip, half-hip or mansard – in NeonPlan every house gets a roof of its own.");
    await glideMain(A, { theta: 0.5, phi: 0.94, radius: 29.5 }, 1.6);
    await shape("hip");
    await glideMain({ theta: 0.5, phi: 0.94, radius: 29.5 }, { theta: 0.65, phi: 0.93, radius: 28.5 }, 1.6);
    await shape("halfhip");
    await glideMain({ theta: 0.65, phi: 0.93, radius: 28.5 }, B, 1.6);
    await shape("mansard");
    await R.untitle();
    await sayOver("In this video I'll show you how to build a roof from roof sections – and every roof shape in 3D.");
    await glideMain(B, { theta: 1.15, phi: 0.92, radius: 28 }, 2.2);
    await shape("gable");
    await glideMain({ theta: 1.15, phi: 0.92, radius: 28 }, C, 2.6);
  }

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await start();
  await R.hideCursor(false);
  await sayOver("For this episode I've prepared a house: two floors in an L shape, plus a lean-to with a utility room and a garage.");
  await pointPlan(2, 9.8, 0.6);
  await R.hold(0.6);
  await pointPlan(5.5, 8.8, 0.5);
  await R.hold(0.6);
  await pointPlan(11.25, 3, 0.6);
  await sayOver("It doesn't have a roof yet. Let's change that.");
  await pointPlan(4.75, 2.2, 0.6);

  // ---------------------------------------------------------------- the simple roof
  await chapter("The simple roof in Settings");
  await sayOver("The quickest way is the simple roof. You find it at the bottom of the sidebar, under “Settings”.");
  await scrollSide({ text: "Settings" }, 760, 0.9);
  await R.clickOn({ text: "Settings" }, 0.5);
  await scrollSide(() => selBox("roof"), 420, 0.8);
  await sayOver("Under “Roof” – you choose no roof, a flat roof, a gable roof or “Roof sections (custom)”. I take the gable roof, “Gable roof”.");
  await pick("roof", "Gable roof", 0.5);
  await sayOver("Three fields appear: “Ridge” – along the long or the short side, for a terraced house for example –, the “Roof pitch” and the “Roof overhang” beyond the outer walls.");
  await R.moveTo({ label: "Ridge" }, 0.5);
  await R.hold(1.6);
  await R.moveTo({ label: "Roof pitch" }, 0.5);
  await R.hold(0.8);
  await R.moveTo({ label: "Roof overhang" }, 0.5);
  await sayOver("This roof always covers the whole top floor. Let's look at it in 3D.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(2000);
  {
    const A = { theta: 0.2, phi: 0.95, radius: 31 };
    const B = { theta: 0.75, phi: 0.92, radius: 29 };
    await R.view(A);
    await R.frame(0.2, 400);
    await sayOver("With an L-shaped house you can see the problem: the gable roof covers the whole rectangle – even the corner where there is no house at all. The lean-to and the garage get nothing.");
    await glideMain(A, B, 5);
    await sayOver("For a simple rectangular house that's perfectly fine. For everything else there are roof sections.");
    await glideMain(B, { theta: 0.95, phi: 0.92, radius: 29 }, 2);
  }
  await R.clickOn({ text: "Editor", exact: true }, 0.6);
  await R.sleep(1500);

  // ---------------------------------------------------------------- roof sections from the rooms
  await chapter("Roof sections from the rooms");
  await sayOver("Back in the editor I take the “Roof” tool at the top – “Roof” – and then “Create roof sections from the rooms”.");
  await R.clickOn({ text: "roof", exact: true }, 0.6);
  await R.sleep(1500);
  await R.frame(0.5, 300);
  await R.clickOn({ text: "Create roof sections from the rooms" }, 0.6);
  await R.sleep(1500);
  await R.frame(0.3, 300);
  await setCam(cam(0.75, 0.92, 36, T_HOUSE));
  await R.clickOn({ text: "Whole plan", exact: true }, 0.6);
  await sayOver("NeonPlan proposes the roof sections right away from your rooms: per floor, the parts with no higher floor above them – each one with a gable roof.");
  await glide3d(cam(0.75, 0.92, 36, T_HOUSE), cam(0.35, 0.95, 34, T_HOUSE), 5);
  await sayOver("Here there are four: the main house and the side wing over the upper floor, plus the garage and the lean-to over the ground floor.");
  await moveToText("1 · Gable · 10", 0.5);
  await R.hold(0.6);
  await moveToText("2 · Gable", 0.4);
  await R.hold(0.6);
  await moveToText("3 · Gable", 0.4);
  await R.hold(0.6);
  await moveToText("4 · Gable", 0.4);
  await sayOver("The Roof tool opens the 3D view of the whole house beside the plan. You see every change there straight away.");
  await R.moveTo({ text: "roof", exact: true }, 0.6);
  await R.hold(0.8);
  await R.move(1250, 560, 0.6);
  await sayOver("The same happens if you choose “Roof sections (custom)” – under “Roof” in the settings.");
  await moveToText("1 · Gable · 10", 0.5);
  await R.hold(0.6);
  await sayOver("The note at the top says: here only roof sections and roof windows can be moved – rooms and furniture are locked.");
  await moveToText("Only roof sections can go here", 0.6);
  await R.hold(0.6);

  // ---------------------------------------------------------------- selecting
  await chapter("Select roof sections");
  await sayOver("The list shows every roof section with its number, shape, size and ridge height. The plan shows the same in short at the ridge.");
  await moveToText("1 · Gable · 10", 0.5);
  await R.hold(0.8);
  await pointPlan(4.4, 3.75, 0.6);
  await sayOver("Tapping selects a section, in the list or right in the plan. I tap the main house: its form appears on the right, and its corners in the plan.");
  await tapSection(MAIN, 0.5);
  await R.hold(1.2);
  await sayOver("“Roof sections” at the top takes you back to the list.");
  await R.clickOn({ text: "‹ Roof sections" }, 0.5);
  await sayOver("The buttons at the top choose which floor the plan shows underneath. On the upper floor you see its rooms – handy for drawing along their walls.");
  await R.clickOn({ text: "Upper floor", exact: true }, 0.5);
  await R.hold(1.4);
  await R.clickOn({ text: "Ground floor", exact: true }, 0.5);
  await sayOver("The line at the bottom always says what works in the plan: draw, tap, drag, corners.");
  await moveToText("Draw a roof section", 0.6);
  await R.hold(0.6);

  // ---------------------------------------------------------------- drawing one yourself
  await chapter("Draw a roof section yourself");
  await sayOver("I'll draw the garage myself. Ridge I delete the proposal: tap it, then “Delete” – at the bottom.");
  await setCam(cam(2.4, 1.0, 22, T_GAR));
  await tapSection(GAR, 0.6);
  await R.clickOn({ text: "Delete", exact: true }, 0.6);
  await R.hold(0.4);
  await sayOver("Then I drag a rectangle in the plan – roughly is fine for now.");
  await dragPlan(13.6, 5.6, 10.0, 0.4, 1.4);
  await R.hold(0.3);
  console.log("drawn:", JSON.stringify(await selected()));
  await sayOver("The new section gets a gable roof. It takes its height from the walls below – here from the garage, whatever floor the plan is showing.");
  await glide3d(cam(2.4, 1.0, 22, T_GAR), cam(2.75, 1.0, 21, T_GAR), 4);
  await sayOver("Dragging moves the section. I push it flush against the corner.");
  {
    const s = await selected();
    const cx = (s.x0 + s.x1) / 2;
    const cz = (s.z0 + s.z1) / 2;
    await dragPlan(cx, cz, cx + (GARAGE.x0 - s.x0), cz + (GARAGE.z0 - s.z0), 1.2);
    console.log("moved:", JSON.stringify(await selected()));
  }
  await sayOver("At the corners you change the size – until the section covers the garage up to the outer face of its walls. NeonPlan adds the roof overhang itself.");
  await dragCorner(1, 1, GARAGE.x1, GARAGE.z1, 1.3);
  console.log("resized:", JSON.stringify(await selected()));
  await R.hold(0.6);
  await sayOver("“Duplicate” – puts a copy next to it, for a double garage for example. I don't need it, so I take it away again with “Undo”.");
  await R.clickOn({ text: "Duplicate", exact: true }, 0.5);
  await R.hold(2.2);
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.5);

  // ---------------------------------------------------------------- every shape
  await chapter("All Roof shapeen in 3D");
  await sayOver("Now the shapes. I tap the main house. At the very top of the form is “Shape” – and there are eight of them.");
  await tapSection(MAIN, 0.6);
  await setCam(cam(-2.05, 1.0, 30, T_MAIN));
  await R.moveTo({ label: "Shape" }, 0.5);
  await R.hold(0.4);
  const shapes = [
    ["Gable", null, "“Gable”, the gable roof, is the classic: two roof faces, with a gable at each end."],
    ["Hip", "Hip", "“Hip”, the hip roof: the gable ends slope too – four roof faces all round."],
    ["Half-hip", "Half-hip", "“Half-hip”: a gable with its tip hipped off. You see it on lots of older houses."],
    ["Pyramid", "Pyramid", "“Pyramid”, the pyramid roof: four faces meeting in one point at the top – ideal for an almost square house."],
    ["Mansard", "Mansard", "“Mansard”: steep at the bottom, flat at the top. That leaves plenty of room in the attic."],
    ["Pent", "Pent", "“Pent”, the pent roof: one single sloping face – typical for a lean-to or a modern house."],
    ["Flat", "Flat", "“Flat”: a flat roof, like on a bungalow."],
    ["Parapet", "Parapet", "And “Parapet”: a flat roof with a parapet all round."],
  ];
  let th = -2.05;
  for (const [, option, text] of shapes) {
    await sayOver(text);
    const end = R.time + N.length(text) - 0.3;
    if (option) await pick("Shape", option, 0.4);
    await point3d(T_MAIN.x, 6.2, T_MAIN.z, 0.5);
    const left = Math.max(0.6, end - R.time);
    await glide3d(cam(th, 1.0, 30, T_MAIN), cam(th + 0.12, 1.0, 30, T_MAIN), left);
    th += 0.12;
  }
  await sayOver("For our house I'll stay with the gable roof.");
  await pick("Shape", "Gable", 0.5);
  await glide3d(cam(th, 1.0, 30, T_MAIN), cam(th + 0.1, 1.0, 30, T_MAIN), 1);

  // ---------------------------------------------------------------- ridge direction
  await chapter("Die Ridgerichtung");
  await sayOver("Below the shape, two buttons set how the ridge runs: across the plan, or from top to bottom.");
  await R.moveTo({ text: "Ridge ↔", exact: true }, 0.5);
  await R.hold(0.6);
  await R.clickOn({ text: "Ridge ↕", exact: true }, 0.5);
  await sayOver("Now the roof spans the long side and gets higher. The ridge height is shown at the bottom of the form – and in the plan at the ridge.");
  await glide3d(cam(th + 0.1, 1.0, 30, T_MAIN), cam(th - 0.2, 0.98, 31, T_MAIN), 2.5);
  await moveToText("Ridge height:", 0.5);
  await R.hold(0.8);
  await pointPlan(4.75, 3.75, 0.5);
  await sayOver("On our house the ridge runs across. So back again.");
  await R.clickOn({ text: "Ridge ↔", exact: true }, 0.5);
  await R.hold(0.8);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("Part 2: eave, pitch, pent roof and garage", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await sayOver("That was part one: the simple roof, roof sections from the rooms, drawing your own, moving, all eight shapes and the ridge direction.");
  await R.clickOn({ text: "‹ Roof sections" }, 0.5);
  await glide3d(cam(th - 0.2, 0.98, 31, T_MAIN), cam(0.6, 0.93, 36, T_HOUSE), 3);
  await catchUp();
  await say("In part two we set eaves and pitch, build the pent roof on the lean-to and the flat roof of the garage – and see how roof sections overlap.");
  await say("Left to the online demo and the manual are in the description. NeonPlan also runs on old wall tablets, by the way. See you in part two!");
  await R.hold(0.6);
} else {
  // ================================================================ PART 2: Eave, pitch, pent roof and garage
  // ---------------------------------------------------------------- teaser
  await chapter("Teaser");
  await start();
  await roofState(true);
  await R.hideCursor();
  await tap(R, { text: "3D", exact: true, nth: 0 });
  await R.sleep(2500);
  {
    const A = { theta: 1.3, phi: 0.95, radius: 30 };
    const B = { theta: 0.7, phi: 0.9, radius: 26 };
    const C = { theta: 0.1, phi: 0.95, radius: 29 };
    await R.view(A);
    await R.sleep(1500);
    await R.title("Eave, pitch, pent roof and garage", `HomePlan 3D · episode 7 · part 2${VERSION}`);
    await sayOver("A lean-to with a pent roof, a garage with a flat roof and an L-shaped house – all made of separate roof sections.");
    await glideMain(A, B, 5.5);
    await R.untitle();
    await sayOver("In this video we fine-tune every roof section: eaves, pitch, heights and floor.");
    await glideMain(B, C, 4.5);
  }

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await start();
  await roofState(false);
  await roofTool();
  await setCam(cam(0.6, 0.93, 36, T_HOUSE));
  await R.sleep(800);
  await R.hideCursor(false);
  await sayOver("We carry on with the house from part one: four roof sections, all still with a gable roof.");
  await moveToText("1 · Gable · 10", 0.6);
  await R.hold(0.5);
  await moveToText("4 · Gable", 0.5);

  // ---------------------------------------------------------------- eave and pitch per side
  await chapter("Eave and pitch per side");
  await sayOver("I tap the side wing. Every roof section has two sides, and for each one you set the “Eave” – and the “Pitch”.");
  await tapSection(WING, 0.6);
  await setCam(cam(-0.75, 1.0, 24, T_WING));
  await R.moveTo({ label: "Eave (m) left" }, 0.5);
  await R.hold(0.4);
  await R.moveTo({ label: "Pitch (°) right" }, 0.6);
  await sayOver("The eave is the height of the lower edge of the roof. Because the ridge runs from top to bottom here, the sides are called left and right – otherwise top and bottom.");
  await R.moveTo({ label: "Eave (m) left" }, 0.5);
  await R.hold(1.2);
  await sayOver("All heights count from the ground: 5.25 metres, right on the walls of the upper floor.");
  await R.moveTo({ label: "Eave (m) right" }, 0.5);
  await R.hold(0.6);
  await sayOver("If I set the left eave to 3 metres, that side reaches further down. That gives you a catslide roof, the kind you often see over a low extension.");
  await fill("Eave (m) left", "3");
  await glide3d(cam(-0.75, 1.0, 24, T_WING), cam(-0.45, 0.98, 24, T_WING), 4);
  await sayOver("“Undo” takes it back. The pitch makes one side steeper or flatter – here 50 degrees on the right.");
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.4);
  await fill("Pitch (°) right", "50");
  await glide3d(cam(-0.45, 0.98, 24, T_WING), cam(0.35, 0.98, 25, T_WING), 2.5);
  await sayOver("Eave and pitch change the “Ridge height”. It's shown at the bottom of the form, in the list and in the plan at the ridge.");
  await moveToText("Ridge height:", 0.5);
  await R.hold(1);
  await pointPlan(2, 9.9, 0.5);
  await R.hold(0.4);
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.4);

  // ---------------------------------------------------------------- lean-to with a pent roof
  await chapter("Lean-to with a pent roof");
  await sayOver("Now the lean-to. A typical case: a pent roof leaning against the house wall. Under “Shape” I choose “Pent”, the pent roof.");
  await tapSection(HWR, 0.6);
  await setCam(cam(0.8, 1.05, 18, T_HWR));
  await pick("Shape", "Pent", 0.5);
  await sayOver("A pent roof rises from the first side – here from the top of the plan, so away from the house wall. That's the wrong way round.");
  await glide3d(cam(0.8, 1.05, 18, T_HWR), cam(0.55, 1.1, 18, T_HWR), 3.5);
  await sayOver("“Swap sides” – turns it round: now the high side is at the house wall.");
  await R.clickOn({ text: "Swap sides" }, 0.6);
  await R.hold(1.2);
  await sayOver("A pent roof has only one eave and one pitch. I set a shallow 15 degrees.");
  await R.moveTo({ label: "Eave (m)" }, 0.5);
  await R.hold(0.4);
  await fill("Pitch (°)", "15");
  await glide3d(cam(0.55, 1.1, 18, T_HWR), cam(0.8, 1.05, 18, T_HWR), 1.5);
  await sayOver("Where the pent roof meets the higher house wall, the overhang is left out – the roof ends at the wall.");
  await glide3d(cam(0.8, 1.05, 18, T_HWR), cam(0.25, 1.2, 15, T_HWR), 3.5);

  // ---------------------------------------------------------------- top of walls
  await chapter("Die Top of walls");
  await sayOver("“Top of walls” – is the height where the walls under the roof end: 2.5 metres for the lean-to, like its rooms.");
  await R.moveTo({ label: "Top of walls" }, 0.5);
  await R.hold(0.8);
  await sayOver("From there NeonPlan builds the walls up to the roof. So the room under the pent roof is closed all round.");
  await glide3d(cam(0.25, 1.2, 15, T_HWR), cam(1.15, 1.15, 16, T_HWR), 4);
  await sayOver("A new roof section takes the top of walls from the rooms below. If it's lower than the ceiling, you get sloped ceilings – I'll show that in the next episode.");
  await moveToText("Below the ceiling height", 0.6);
  await R.hold(1);

  // ---------------------------------------------------------------- sits on floor
  await chapter("Sits on floor");
  await sayOver("Next to it, “Sits on floor” – shows which floor the roof belongs to: the ground floor.");
  await R.moveTo({ label: "Sits on floor" }, 0.5);
  await R.hold(0.6);
  await sayOver("If I choose the upper floor, the section jumps onto the walls of the upper floor. The top of walls and the eaves move along.");
  await pick("Sits on floor", "Upper floor", 0.5);
  await glide3d(cam(1.15, 1.15, 16, T_HWR), cam(0.8, 1.0, 22, T_HWR), 2.5);
  await R.moveTo({ label: "Top of walls" }, 0.5);
  await sayOver("You need this when a new section has landed on the wrong floor – over an upper floor with a stairwell in the middle, for example. I set it back to the ground floor.");
  await R.hold(2.5);
  await pick("Sits on floor", "Ground floor", 0.5);
  await glide3d(cam(0.8, 1.0, 22, T_HWR), cam(0.8, 1.05, 18, T_HWR), 1.5);

  // ---------------------------------------------------------------- overlapping sections
  await chapter("Roof sections overlap");
  await R.clickOn({ text: "‹ Roof sections" }, 0.5);
  await setCam(cam(0.25, 0.95, 26, { x: 3, y: 5, z: 8 }));
  await sayOver("Look at the plan: the side wing and the lean-to reach a little into the main house. That's on purpose.");
  await pointPlan(2, 7.5, 0.6);
  await R.hold(0.8);
  await pointPlan(5.5, 7.5, 0.5);
  await R.hold(0.6);
  await sayOver("The lower roof runs under the higher one, just like a real extension. The ridge of the side wing disappears into the roof face of the main house.");
  await point3d(2, 6.6, 8.2, 0.6);
  await glide3d(cam(0.25, 0.95, 26, { x: 3, y: 5, z: 8 }), cam(-0.25, 0.95, 25, { x: 3, y: 5, z: 8 }), 4.5);
  await sayOver("I even drag the side wing further in – nothing changes in 3D. So the sections don't have to meet exactly.");
  await tapSection(WING, 0.5);
  {
    const s = await selected();
    await dragCorner(0, 0, s.x0, s.z0 - 1.5, 1.2);
  }
  await R.hold(2.6);
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.4);

  // ---------------------------------------------------------------- the garage: flat roof, parapet
  await chapter("Garage with a flat roof");
  await sayOver("The garage gets a flat roof: “Shape”.");
  await tapSection(GAR, 0.6);
  await setCam(cam(2.4, 1.0, 21, T_GAR));
  await pick("Shape", "Flat", 0.5);
  await sayOver("Instead of eave and pitch there's now only the “Height” – 2.5 metres, on the garage walls.");
  await R.moveTo({ label: "Height (m)" }, 0.5);
  await R.hold(0.8);
  await sayOver("“Parapet” adds a parapet all round. That's what many garages with a flat roof look like.");
  await pick("Shape", "Parapet", 0.5);
  await glide3d(cam(2.4, 1.0, 21, T_GAR), cam(2.1, 0.95, 20, T_GAR), 2);
  await sayOver("The “Roof overhang” is set per roof section: how far the roof reaches beyond the walls. For the garage I take zero.");
  await fill("Roof overhang (m)", "0");
  await R.hold(1);
  await sayOver("Solar fields go onto the roof later with the “Energy” tool – “Energy” – flat roofs included. With the Energy Pro extension the modules then come alive with the sun.");
  await R.moveTo({ text: "Energy", exact: true }, 0.6);
  await R.hold(1.2);
  await sayOver("“Canopy”, the dormer buttons and “Take the floor's outline” I'll show in the next episode.");
  await R.moveTo({ text: "Canopy (Pfosten" }, 0.5);
  await R.hold(0.5);
  await R.moveTo({ text: "Umriss des Geschosses" }, 0.5);
  await R.hold(0.5);

  // ---------------------------------------------------------------- fix
  await chapter("Fix");
  await sayOver("When a roof section is finished, you fix it: “Fix” at the top – “Fix” – or the L key.");
  await sideTop(0.3);
  await R.clickOn({ text: "Fix" }, 0.5);
  await R.hold(0.5);
  await sayOver("Now it can't slip any more. Dragging only moves the view, and a note appears at the bottom.");
  await dragPlan(GAR[0], GAR[1], GAR[0] - 1.4, GAR[1] + 0.8, 1.1);
  await R.hold(0.6);
  await moveToText("Fixed – release it first", 0.5).catch(() => {});
  await R.hold(0.6);
  await R.clickOn({ text: "Whole plan", exact: true }, 0.5);
  await sayOver("“Release” – frees it again, also with L.");
  await h.side(0.3);
  await press("L", "l");
  await keyCap(null);
  // the "Fixed" hint under the plan stays until the next tap in the plan, also after releasing: take it away
  await R.editor(`e._fixedHint = false;`);
  await R.moveTo({ text: "Fix" }, 0.4);
  await R.hold(0.3);
  await sayOver("And “Floor plan” – in the top bar locks all roof sections at once, together with rooms and walls. A second click lifts the lock.");
  await R.clickOn({ text: "🔒 Floor plan", exact: true }, 0.6);
  await R.hold(0.6);
  await R.moveTo({ text: "Floor plan locked" }, 0.5);
  await R.hold(0.6);
  await R.clickOn({ text: "🔒 Floor plan", exact: true }, 0.6);
  await R.hold(0.4);

  // ---------------------------------------------------------------- regenerate, back to one roof
  await chapter("Create new and back to a roof");
  await R.clickOn({ text: "‹ Roof sections" }, 0.5);
  await setCam(cam(0.6, 0.93, 36, T_HOUSE));
  await sayOver("Below the list there are two buttons. “Create again from the rooms” – replaces all roof sections with a fresh proposal. NeonPlan asks first.");
  await R.page.evaluate(() => {
    window.__tutConfirm = window.confirm;
    window.confirm = () => false;
  });
  await R.clickOn({ text: "Create again from the rooms" }, 0.6);
  await fakeConfirm("Replace all roof sections with a new proposal from the rooms?");
  await R.hold(0.8);
  {
    const b = await R.page.evaluate(() => {
      const r = document.querySelector("#tut-ok").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(b.x, b.y, 0.5);
    await R.click();
  }
  await noDialog();
  await R.editor(`window.confirm = () => true; e.useRoofSections(true); window.confirm = window.__tutConfirm;`);
  await R.frame(0.4, 600);
  await sayOver("Everything is a gable roof again. With “Undo” my work is back at once.");
  await R.hold(1);
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.8);
  await sayOver("“Back to one roof” – switches to the simple gable roof from the settings.");
  await R.clickOn({ text: "Back to one roof" }, 0.6);
  await R.hold(1.5);
  await sayOver("Your roof sections stay saved: one click on “Create roof sections from the rooms” – and they're back, nothing is lost.");
  await R.clickOn({ text: "Create roof sections from the rooms" }, 0.6);
  await R.hold(1.2);

  // ---------------------------------------------------------------- result in 3D
  await chapter("Das Ergebnis in 3D");
  await sayOver("And this is what the house looks like in 3D now.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(2000);
  await R.hideCursor();
  {
    const A = { theta: 1.4, phi: 0.95, radius: 31 };
    const B = { theta: 0.3, phi: 0.9, radius: 27 };
    await R.view(A);
    await R.frame(0.2, 400);
    await sayOver("The main house and the side wing with gable roofs, the lean-to with its pent roof against the house wall, and the garage with a parapet.");
    await glideMain(A, B, 8);
  }
  await R.hideCursor(false);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("Next episode: dormers, roof windows, sloping ceilings and carport", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await say("That was part two: eaves and pitch per side, the pent roof and swapping sides, top of walls, floor, overlaps, flat roof and parapet, fixing and creating again.");
  await say("In the next episode we carry on with the roof: dormers, roof windows, sloped ceilings with knee walls, and a carport.");
  await say("Left to the online demo and the manual are in the description. And NeonPlan also runs on old wall tablets. See you next time!");
  await R.hold(0.6);
}

await catchUp();
N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
