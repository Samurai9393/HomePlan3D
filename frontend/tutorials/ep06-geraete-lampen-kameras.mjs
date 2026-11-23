// Tutorial episode 6 – "Devices, lamps and cameras", in two parts (the checklist does not fit into 8 minutes):
//   a) Place devices, markers and names: the device list of a room (grouping, “+n more”, which sensors show,
//      search, the sources “This area” / “Other areas” / “No area”), “Place”, “Place all n …”
//      with undo, ☆ / 👁 / Aa for the room panel (checked live in 3D), “Room climate”, the device form (X/Y, symbol
//      height, turn, “Fix”, “To room centre”, “Remove”), “Ask before switching” (live in 3D), “Symbol
//      in 3D” and the “Markers” switch, watts from a power sensor (Energy Pro hologram in one sentence), an own mdi
//      icon, an own name under the symbol, “Show as furniture” / “Back to a device pin”.
//   b) lamps and cameras: the lamp types, a wall light with its light, “Colour and brightness from”, “Brightness in
//      3D”, pendant shapes, the table lamp on its nightstand, a light as a plain pin with its mount, LED strips,
//      “Place spots”, operating lamps live in 3D (tap, swipe, quick menu, double tap), cameras (mount, cone, handle,
//      angle, reach, tilt, cone in 3D, red on motion, still and live picture; Camera cockpit in one sentence).
// The full demo house (invented data, mock Home Assistant). Setup steps before a scene are invisible.
// Usage (from frontend/): node tutorials/ep06-geraete-lampen-kameras.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep06a/de and …/en, resp. ep06b)
// EP06_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4> --en tutorials/ep06a-narration-en.json

import { appVersion, FPS, narration, startRecorder } from "./recorder.mjs";
import { helpers } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep06";
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP06_FAST;
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;

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
    await R.page.screenshot({ path: `${out}/error.png` }).catch(() => {});
    await R.frame(0.04).catch(() => {});
    await R.finish().catch(() => {});
    process.exit(1);
  });
}
// every scene starts from the demo's stored defaults
await R.page.evaluateOnNewDocument(() => {
  try {
    localStorage.clear();
  } catch {
    // no storage
  }
});
// Home Assistant draws mdi icons with its <ha-icon> element; the preview's mock has none, so an own symbol would
// stay empty. A tiny stand-in with the one icon the episode uses (the mdi "coffee" path) – recording only.
await R.page.evaluateOnNewDocument(() => {
  const PATHS = { "mdi:coffee": "M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" };
  const define = () => {
    if (customElements.get("ha-icon")) return;
    customElements.define(
      "ha-icon",
      class extends HTMLElement {
        static get observedAttributes() {
          return ["icon"];
        }
        set icon(v) {
          this.setAttribute("icon", v);
        }
        get icon() {
          return this.getAttribute("icon");
        }
        attributeChangedCallback() {
          const d = PATHS[this.getAttribute("icon")] ?? "";
          this.style.display = "inline-flex";
          this.innerHTML = d ? `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)"><path fill="currentColor" d="${d}"/></svg>` : "";
        }
      },
    );
  };
  if (window.customElements) define();
});
// confirm() of the app: accepted at once (a native dialog is not in the screenshots; fakeConfirm shows it)
R.page.on("dialog", (d) => void d.accept());

// ---------------------------------------------------------------- helpers
const { typeOver, tapPlan, pointPlan, pickEntity, pickerMove, scrollSide } = h;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** sayOver that returns the video time the line ends. */
const line = async (text) => {
  await sayOver(text);
  return R.time + N.length(text);
};
/** Real frames until video time `end` (lights blink, effects run), with an optional step per frame. */
const live = async (end, each = null) => {
  const n = Math.max(1, Math.round((end - R.time) * FPS));
  for (let i = 1; i <= n; i++) {
    if (each) await each(i, n);
    await R.frame(1 / FPS, 15);
  }
};
/** A setup click before a scene's first line: nothing is recorded. */
const quiet = async (target, wait = 400) => {
  const b = await R.locate(target);
  await R.page.mouse.click(b.x, b.y);
  await R.sleep(wait);
};
/**
 * The editor's side panel is 320 px wide; the device rows (name, 👁, Aa, ☆, “Place”) are wider and their
 * last button is cut off at the window's edge. For the video the panel gets 360 px (a style in the recording only).
 */
const widenSide = () =>
  R.editor(`if (!e.renderRoot.getElementById("tut-wide")) { const s = document.createElement("style"); s.id = "tut-wide"; s.textContent = ".fp3d-editor { grid-template-columns: 1fr 360px !important; }"; e.renderRoot.appendChild(s); }`);
const editorOpen = async (record = false) => {
  if (record) await R.clickOn({ text: "Editor", exact: true }, 0.5);
  else await quiet({ text: "Editor", exact: true }, 300);
  await widenSide();
  await R.sleep(700);
};
/** Tap an empty spot of a room; if the tap missed, select the room the way the tap would. */
const tapRoom = async (x, z, id, seconds = 0.5) => {
  await tapPlan(x, z, seconds);
  const got = await R.editor(`return e._roomId;`);
  if (got !== id || (await R.editor(`return !!(e._furnitureId || e._deviceId);`))) {
    console.log(`tap at ${x}/${z} selected ${got}, not ${id}`);
    await R.editor(`e._furnitureId = null; e._deviceId = null; e.selectItem("room", ${JSON.stringify(id)});`);
    await R.frame(1 / 25, 200);
  }
};
/** Tap a placed device pin in the plan (by entity); falls back to selecting it the way the tap would. */
const tapDevice = async (id, seconds = 0.5) => {
  const at = await R.editor(`for (const f of e._doc.floors) { const p = f.placements.find((p) => p.entity_id === ${JSON.stringify(id)}); if (p) return [p.x, p.z]; } return null;`);
  await tapPlan(at[0], at[1], seconds);
  if ((await R.editor(`return e._deviceId;`)) !== id) {
    console.log(`tap missed ${id}`);
    await R.editor(`e.selectItem("device", ${JSON.stringify(id)});`);
    await R.frame(1 / 25, 200);
  }
};
/** Tap a furniture item (the first of a type, or by entity) in the plan; falls back to selecting it. */
const tapItem = async (pick, seconds = 0.5) => {
  const f = await R.editor(`const f = e.floor.furniture.find((f) => f.type === ${JSON.stringify(pick)} || f.entity === ${JSON.stringify(pick)}); return f ? { id: f.id, x: f.x, z: f.z } : null;`);
  await tapPlan(f.x, f.z, seconds);
  if ((await R.editor(`return e._furnitureId;`)) !== f.id) {
    console.log(`tap missed ${pick}`);
    await R.editor(`e.selectItem("furniture", ${JSON.stringify(f.id)});`);
    await R.frame(1 / 25, 200);
  }
  return f;
};
/** A button in the device row named `name` of the side panel: "Place", "Remove", "☆", "👁", "Aa" … */
const rowBox = (name, label) =>
  R.editor(
    `const rows = [...e.renderRoot.querySelectorAll(".fp3d-dev-row")];
     const own = (r) => { const sp = r.querySelector(".fp3d-dev-name span"); if (!sp) return ""; const c = sp.cloneNode(true); c.querySelector("small")?.remove(); return c.textContent.trim(); };
     const row = rows.find((r) => own(r) === ${JSON.stringify(name)} && r.getBoundingClientRect().width > 0);
     if (!row) return null;
     const el = ${JSON.stringify(label)} === "name" ? row.querySelector(".fp3d-dev-name span") : [...row.querySelectorAll("button")].find((b) => b.textContent.trim() === ${JSON.stringify(label)});
     if (!el) return null; const r = el.getBoundingClientRect();
     return { x: r.left + Math.min(r.width / 2, 70), y: r.top + r.height / 2 };`,
  );
const rowMove = async (name, label, seconds = 0.5) => {
  let b = await rowBox(name, label);
  if (b && (b.y > 1030 || b.y < 160)) {
    await scrollSide(() => rowBox(name, label), 640, 0.6);
    b = await rowBox(name, label);
  }
  if (!b) throw new Error(`no ${label} in row ${name}`);
  await R.move(b.x, b.y, seconds);
};
const rowClick = async (name, label, seconds = 0.5) => {
  await rowMove(name, label, seconds);
  await R.click();
};
/** Any visible element whose text contains `text` (innermost last match, or the n-th). */
const textBox = (text, nth = null, tags = "P|SPAN|DIV|LABEL|BUTTON|B|SMALL|SUMMARY|H3") =>
  R.page.evaluate(
    (text, nth, tags) => {
      const re = new RegExp(`^(${tags})$`);
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      const hits = [];
      for (const el of walk(document)) {
        if (!re.test(el.tagName) || !el.textContent.includes(text)) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0) hits.push(el);
      }
      const hit = nth === null ? hits[hits.length - 1] : hits[nth];
      if (!hit) return null;
      const r = hit.getBoundingClientRect();
      return { x: r.left + Math.min(r.width / 2, 120), y: r.top + Math.min(r.height / 2, 14) };
    },
    text,
    nth,
    tags,
  );
const moveToText = async (text, seconds = 0.5, nth = null) => {
  const b = await textBox(text, nth);
  if (!b) throw new Error(`text not found: ${text}`);
  await R.move(b.x, b.y, seconds);
};
/** Pick an option of a select field without the overlay: a ring on the field, then the value. */
const setSelect = async (label, option) => {
  await R.moveTo({ label }, 0.5);
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
};
/** Fill a number/text field found by its label (Ctrl+A, type, Enter). */
const fill = async (label, value, seconds = 0.5) => {
  await R.clickOn({ label }, seconds);
  await typeOver(value);
};
/** Take the focus out of a form field. */
const blur = () =>
  R.page.evaluate(() => {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    a?.blur?.();
  });
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
/** Keep the app's confirm() from firing; it answers "no" (a fake dialog is shown instead). */
const muteDialogs = (on) =>
  R.page.evaluate((on) => {
    if (on) {
      window.__tutConfirm = window.confirm;
      window.confirm = () => false;
    } else if (window.__tutConfirm) window.confirm = window.__tutConfirm;
  }, on);
const clickFakeOk = async () => {
  const b = await R.page.evaluate(() => {
    const r = document.getElementById("tut-ok").getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await R.move(b.x, b.y, 0.5);
  await R.click();
  await noDialog();
};
/** A service call on the mock Home Assistant (as the confirmed tap would do it). */
const service = (domain, name, data) => R.page.evaluate((d, s, data) => window.fp3dPanel.hass.callService(d, s, data), domain, name, data);
/** Set the main 3D view's camera around a plan point of a floor. */
const cam = (floorId, x, z, c) =>
  R.page.evaluate(
    (floorId, x, z, c) => {
      const v = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-view3d");
      const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
      const fv = viewer.floorMap.get(floorId);
      const t = fv.group.position.clone().set(x, c.y ?? 0, z);
      fv.group.localToWorld(t);
      const view = viewer.controls.view;
      view.target.copy(t);
      Object.assign(view, { theta: c.theta, phi: c.phi, radius: c.radius });
      viewer.invalidate();
    },
    floorId,
    x,
    z,
    c,
  );
/** Glide the main 3D camera around a plan point while recording. */
const glide = async (floorId, x, z, a, b, seconds) => {
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    await cam(floorId, x, z, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: (a.y ?? 0) + ((b.y ?? 0) - (a.y ?? 0)) * k });
    await R.frame(1 / FPS, 40);
  }
};
/** Screen point of a plan point (x, height y, z) of a floor in the main 3D view. */
const point3d = (floorId, x, y, z) =>
  R.page.evaluate(
    (floorId, x, y, z) => {
      const v = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-view3d");
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
/** Long press at the cursor (quick menu): hold the button for `seconds`. */
const longPress = async (seconds = 0.8) => {
  await R.page.mouse.down();
  const n = Math.max(1, Math.round(seconds * FPS));
  for (let i = 0; i < n; i++) await R.frame(1 / FPS, 30);
  await R.page.mouse.up();
  await R.frame(1 / FPS, 120);
};
/** Up to the floor form: "Back to …" until nothing is selected. */
const toFloor = async () => {
  for (let i = 0; i < 3; i++) {
    const up = await R.locate({ text: "Back to" }).catch(() => null);
    if (!up) break;
    await R.clickOn({ text: "Back to" }, 0.4);
  }
};
const fitPlan = () => R.clickOn({ text: "Whole plan", exact: true }, 0.4);

// ================================================================ part a
if (PART === "a") {
  // ---------------------------------------------------------------- 1. Teaser: the living room live, pins and the camera cone
  await chapter("Teaser");
  await R.open("");
  await R.hideCursor();
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1200);
  await quiet('button[aria-label="Hide the controls – only the 3D view remains"]', 700);
  {
    const a = { theta: -0.75, phi: 0.78, radius: 12.5, y: 0.3 };
    const b = { theta: -0.2, phi: 0.7, radius: 10, y: 0.3 };
    await cam("eg", 4.0, 2.3, a);
    await R.sleep(1500);
    await R.title("Devices, lamps and cameras", `HomePlan 3D · episode 6 · part 1${VERSION}`);
    const l1 = "Lamps that glow in 3D exactly like yours at home, sensors with their values, and cameras with their field of view.";
    const l2 = "In this episode I'll show you how your devices from Home Assistant get into the plan.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    let end = await line(l1);
    const n1 = Math.max(1, Math.round((end - t0) * FPS));
    for (let i = 1; i <= n1; i++) {
      const k = ease(((i / n1) * (end - t0)) / total);
      await cam("eg", 4.0, 2.3, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0.3 });
      await R.frame(1 / FPS, 15);
    }
    await R.untitle();
    end = await line(l2);
    const t1 = R.time;
    const n2 = Math.max(1, Math.round((end - t1) * FPS));
    for (let i = 1; i <= n2; i++) {
      const k = ease((t1 - t0 + (i / n2) * (end - t1)) / total);
      await cam("eg", 4.0, 2.3, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0.3 });
      await R.frame(1 / FPS, 15);
    }
  }

  // ---------------------------------------------------------------- 2. Intro
  await chapter("Worum es today geht");
  await R.open("");
  // the radiator of the demo stands for the heating already; here the heating is a plain pin (for “Show as furniture”)
  await R.page.evaluate(() => {});
  await editorOpen();
  await R.editor(`e.change((doc) => { const f = doc.floors[0]; f.furniture = f.furniture.filter((m) => m.type !== "radiator"); const k = f.placements.find((p) => p.entity_id === "switch.kaffeemaschine"); k.x = 8.85; k.z = 0.75; }); e.past = []; e._canUndo = false;`);
  await R.sleep(500);
  await R.move(900, 560, 0.01);
  await sayOver("Episode 6 comes in two parts. Part 1 is about a room's device list, placing devices, symbols and names.");
  await R.move(780, 470, 1.2);
  await sayOver("Part 2 covers lamps and cameras in detail. All you need are rooms linked to an area in Home Assistant – that was episode 1.");
  await pointPlan(3.0, 1.6, 1.0);

  // ---------------------------------------------------------------- 3. The device list
  await chapter("A room's device list");
  await sayOver("In the editor I tap the living room. On the right, under Devices – you see everything that sits in the living room area in Home Assistant.");
  await tapRoom(5.5, 4.0, "wohnen");
  await R.hold(0.4);
  await scrollSide({ text: "This area" }, 200, 0.8);
  { const b = await textBox("Devices", null, "H3"); if (b) await R.move(b.x, b.y, 0.5); }
  await sayOver("The list is grouped by device: the main entity comes first, the rest is tucked in behind it.");
  await rowMove("Ceiling light", "name", 0.5);
  await R.hold(0.6);
  await rowMove("TV", "name", 0.5);
  await R.hold(0.4);
  await moveToText("+1 weitere", 0.4);
  await sayOver("The pixel clock, for example, has four more lights for indicators and effects. “+4 more” – unfolds them, “less” – folds them away again.");
  await rowMove("Pixel clock", "name", 0.5);
  await R.hold(0.5);
  await R.clickOn({ text: "+4 weitere" }, 0.5);
  await R.hold(1.6);
  await R.clickOn({ text: "less", exact: true }, 0.5);
  await sayOver("Sensors show up when they measure something for the room: temperature, humidity, CO2, power and energy, gas and water, brightness and air pressure.");
  await rowMove("Humidity", "name", 0.6);
  await R.hold(0.8);
  await rowMove("Temperature", "name", 0.5);
  await sayOver("Battery and signal sensors are left out. And if a device is missing, it's usually assigned to a different area in Home Assistant.");
  await R.move(1700, 900, 1.0);
  await sayOver("For large areas, the search field helps.");
  await R.clickOn('input[type="search"]', 0.5);
  await R.type("temp", 0.08);
  await R.hold(0.8);
  await typeOver("");
  await R.key("Escape");

  // ---------------------------------------------------------------- 4. Other sources
  await chapter("Other areas and no area");
  await sayOver("Above the list you pick the source. “This area” – is the default, and the number tells you how many devices it has.");
  await R.moveTo({ text: "This area" }, 0.6);
  await R.hold(1.2);
  await sayOver("“Other areas” – shows the devices of all the other areas, sorted by area. If one is already placed in another room, it says so.");
  await R.clickOn({ text: "Other areas" }, 0.5);
  await R.hold(0.6);
  { const b = await textBox("Study", 0, "DIV"); if (b) await R.move(b.x, b.y, 0.5); }
  await R.hold(0.6);
  await moveToText("in Study", 0.5, 0);
  await sayOver("“Place” – then brings it over here. Its area in Home Assistant stays as it is.");
  await rowMove("Desk lamp", "Place", 0.6);
  await sayOver("“No area” – shows everything that isn't assigned to an area: template lights, groups and helpers. Here every sensor with a number and a unit counts.");
  await R.clickOn({ text: "No area" }, 0.5);
  await R.hold(0.6);
  await rowMove("Pool Spot", "name", 0.5);
  await R.hold(0.6);
  await sayOver("If there are too many, the list tells you how many more there are – then you narrow it down with the search.");
  await R.moveTo('input[type="search"]', 0.6);

  // ---------------------------------------------------------------- 5. Placing
  await chapter("Place devices");
  await sayOver("Back to “This area”. Bright entries are already in the plan, faded ones are not yet.");
  await R.clickOn({ text: "This area" }, 0.5);
  await R.hold(0.4);
  await rowMove("Ceiling light", "name", 0.5);
  await R.hold(0.5);
  await rowMove("Temperature", "name", 0.5);
  await sayOver("“Place” puts a device into the room. The temperature sensor now sits in the plan as a symbol.");
  await rowClick("Temperature", "Place", 0.5);
  await R.hold(0.3);
  {
    const p = await R.editor(`const p = e.floor.placements.find((p) => p.entity_id === "sensor.wohnzimmer_temperatur"); return [p.x, p.z];`);
    await pointPlan(p[0], p[1], 0.7);
  }
  await sayOver("I drag it to its spot – onto the wall next to the kitchen.");
  {
    const p = await R.editor(`const p = e.floor.placements.find((p) => p.entity_id === "sensor.wohnzimmer_temperatur"); return [p.x, p.z];`);
    const a = await R.planPoint(p[0], p[1]);
    await R.move(a.x, a.y, 0.3);
    const b = await R.planPoint(5.75, 1.45);
    await R.drag(b.x, b.y, 1.1);
  }
  await sayOver("“Place all 5 …” – asks once and then places all the remaining main devices in one go.");
  await scrollSide({ text: "Place all 5" }, 900, 0.6).catch(() => scrollSide({ text: "Place …" }, 900, 0.6));
  await muteDialogs(true);
  await R.clickOn({ text: "Place …" }, 0.5);
  await fakeConfirm("Put 5 devices into the room at once? (Ctrl+Z or “Undo” takes them all back in one step.)");
  await R.hold(0.6);
  await clickFakeOk();
  await muteDialogs(false);
  {
    // the real click behind the fake dialog (confirm() is answered "yes" by the dialog handler)
    const b = await R.locate({ text: "Place …" });
    await R.page.mouse.click(b.x, b.y);
    await R.sleep(300);
  }
  await R.hold(0.4);
  await sayOver("Lights are placed straight away as a lamp from the library, so they glow in 3D – like the pixel clock here. More on that in part 2.");
  {
    const f = await R.editor(`const f = e.floor.furniture.find((f) => f.entity === "light.pixeluhr"); return f ? [f.x, f.z] : [3, 2];`);
    await pointPlan(f[0], f[1], 0.8);
  }
  await sayOver("If you don't like it, “Undo” – or Ctrl+Z takes them all back in one step.");
  await R.clickOn({ text: "Undo", exact: true }, 0.7);
  await R.hold(0.6);
  await sayOver("To take a placed device out again, use “Remove” – in its row.");
  await scrollSide({ text: "This area" }, 300, 0.6);
  await rowMove("Blind", "Remove", 0.6);

  // ---------------------------------------------------------------- 6. The room panel: ☆, 👁, Aa
  await chapter("Star, eye and Aa for the room panel");
  await sayOver("The small buttons in each row belong to the room panel in 3D. It shows the devices placed in the room.");
  await rowMove("Ceiling light", "👁", 0.6);
  await R.hold(0.5);
  await rowMove("Ceiling light", "Aa", 0.4);
  await sayOver("The star adds a device to it without placing it – here the humidity.");
  await rowClick("Humidity", "☆", 0.6);
  await R.hold(0.6);
  await sayOver("The eye hides a device from the room panel. It gets crossed out, and a second tap brings it back.");
  await rowClick("TV", "👁", 0.6);
  await R.hold(0.8);
  await sayOver("“Aa” only hides the state – handy for a blind that doesn't report its position.");
  await rowClick("Blind", "Aa", 0.6);
  await R.hold(0.8);
  await sayOver("In 3D, the humidity now shows up in the room panel, the TV is gone, and the blind comes without a percentage.");
  await R.clickOn({ text: "3D", exact: true }, 0.6);
  await R.sleep(1000);
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1000);
  await R.clickOn({ text: "Living room", exact: true }, 0.5);
  await R.sleep(1500);
  await R.frame(0.2, 100);
  await moveToText("Blind", 0.6);
  await R.hold(0.8);
  {
    // scroll the room panel down to the sensors
    const b = await textBox("Blind");
    await R.move(b.x + 120, b.y, 0.4);
    for (let i = 0; i < 12; i++) {
      await R.page.mouse.wheel({ deltaY: 70 });
      await R.frame(1 / FPS, 30);
    }
  }
  await moveToText("Humidity", 0.5).catch(() => {});
  await sayOver("At the very bottom, “More devices in this area” – shows the rest; hidden ones stay away.");
  {
    const b = await textBox("More devices of the area");
    if (b) await R.move(b.x, b.y, 0.6);
    else {
      for (let i = 0; i < 10; i++) {
        await R.page.mouse.wheel({ deltaY: 90 });
        await R.frame(1 / FPS, 30);
      }
      await moveToText("More devices of the area", 0.5);
    }
  }

  // ---------------------------------------------------------------- 7. Room climate
  await chapter("Room climate");
  await sayOver("Back in the editor: under “Room climate” – you choose which sensors provide the room's temperature, humidity and CO2 – for the heatmap and the room panel.");
  await editorOpen(true);
  await tapRoom(5.5, 4.0, "wohnen");
  await scrollSide({ text: "Room climate" }, 360, 0.7).catch(async () => {
    await scrollSide(() => textBox("RAUMKLIMA"), 360, 0.7);
  });
  {
    const b = await textBox("Room climate", null, "SUMMARY");
    await R.move(b.x, b.y, 0.5);
    await R.click();
  }
  await R.hold(0.6);
  await sayOver("“Automatic” takes the area's sensors and the ones placed in the room – but no device temperatures, say from a 3D printer. You can also pick a sensor, or “None”.");
  await pickerMove("Temperature", 0.5);
  await R.hold(1.0);
  await pickerMove("Humidity", 0.4);
  await R.hold(0.8);
  await pickerMove("CO₂", 0.4);

  // ---------------------------------------------------------------- 8. The device form
  await chapter("The device form");
  await sayOver("Tap a device in the plan and its form opens on the right. At the top you see its type and name, and next to it “Lock” – against moving it by accident.");
  await tapDevice("sensor.wohnzimmer_temperatur", 0.6);
  await R.hold(0.4);
  await R.moveTo(".fp3d-dev-title", 0.5);
  await R.hold(0.5);
  await R.moveTo({ text: "Fix" }, 0.5);
  await sayOver("X and Y set the position exactly. “Symbol height” – sets how high the pin floats in 3D, and “Automatic height” – resets it.");
  await R.moveTo({ label: "X (m)" }, 0.5);
  await R.hold(0.4);
  await fill("Marker height", "1,5");
  await R.hold(0.4);
  await R.clickOn({ text: "Automatic height", exact: true }, 0.5);
  await sayOver("“Rotation” – turns the device. That matters most for cameras – more on that in part 2.");
  await R.moveTo({ label: "Turn" }, 0.5);
  await sayOver("“To room centre” – brings a stray device back to the middle, and “Remove” takes it out of the plan.");
  await R.moveTo({ text: "To room centre", exact: true }, 0.5);
  await R.hold(0.7);
  await R.moveTo({ text: "Remove", exact: true }, 0.5);

  // ---------------------------------------------------------------- 9. Ask before switching
  await chapter("Ask before switching");
  await sayOver("Switches and lamps have “Ask before switching”. I'll take the coffee machine in the kitchen.");
  await tapDevice("switch.kaffeemaschine", 0.7);
  await R.hold(0.4);
  await sayOver("With the tick set, NeonPlan asks first – when you tap it in 3D, in the quick menu and in the room panel. That protects, say, the server switch from an accidental tap.");
  await R.clickOn({ text: "Ask before switching" }, 0.6);
  await R.hold(0.8);
  await sayOver("A double tap on the room, which switches all the lights, leaves such a device out. And swiping doesn't move it either.");
  await R.move(1300, 420, 1.2);

  // ---------------------------------------------------------------- 10. Marker in 3D and power
  await chapter("Marker in 3D and power");
  await sayOver("If a device has a power sensor in Home Assistant, its symbol in 3D shows the watts – right now the coffee machine draws 900 watts.");
  await R.moveTo({ label: "Marker in 3D" }, 0.6);
  await sayOver("“Marker in 3D” – decides when the pin appears. “Automatic” follows the switch in the 3D view, “Always show” – always shows it.");
  await R.pickOption("Marker in 3D", "Always show", 0.5);
  await sayOver("“Without watts” – leaves out the power, for a smart plug for example. “Hide” – never shows a symbol.");
  {
    const b = await R.locate({ label: "Marker in 3D" });
    await R.move(b.x, b.y, 0.5);
    await R.hold(1.6);
  }
  await sayOver("With Energy Pro you also get a hologram above the device: power right now, today's consumption and the day's curve.");
  await R.moveTo({ text: "Hologram over the device" }, 0.6);

  // ---------------------------------------------------------------- 11. Own icon and name
  await chapter("Own symbol and own name");
  await sayOver("“Own symbol” – replaces the symbol for the device type. You enter the name of a Material Design icon, just like in Home Assistant.");
  await R.clickOn({ label: "Own symbol" }, 0.6);
  await R.type("mdi:coffee", 0.08);
  await R.key("Enter");
  await sayOver("A preview appears right next to it. Leave it empty for the standard symbol.");
  await R.moveTo({ label: "Own symbol" }, 0.4);
  {
    const b = await R.locate({ label: "Own symbol" });
    await R.move(b.x + b.w / 2 + 20, b.y, 0.5);
  }
  await R.hold(0.8);
  await sayOver("“Own name” – only applies in the plan; the entity in Home Assistant stays as it is.");
  await fill("Own name", "Espresso");
  await sayOver("Then “Show name below the symbol in 3D” appears – “Show the name under the marker in 3D”. That way, say, three thermometers in the garden stay easy to tell apart.");
  await R.clickOn({ text: "Show the name under the marker in 3D" }, 0.6);
  await R.hold(0.6);
  await sayOver("The dashboard card also has an option that shows all own names – more in the episode about the card.");
  await R.move(1300, 500, 1.0);

  // ---------------------------------------------------------------- 12. In 3D: the pin, the markers switch, the question
  await chapter("In 3D: markers and confirmation");
  await sayOver("In 3D, the pin now shows a coffee cup, the watts and the name.");
  await R.clickOn({ text: "3D", exact: true }, 0.6);
  await R.sleep(800);
  await quiet({ text: "Kitchen", exact: true }, 1500);
  await R.clickOn('button[aria-label="Close"]', 0.01).catch(() => {});
  await cam("eg", 8.4, 1.6, { theta: -0.25, phi: 0.82, radius: 6.5 });
  await R.sleep(800);
  await R.frame(0.1, 100);
  await R.moveTo('.fp3d-dev[data-entity="switch.kaffeemaschine"]', 0.7);
  await sayOver("Top right, you choose which symbols the 3D view shows: “None”, “Important” or “All”, “Important”, “All”.");
  await R.moveTo({ text: "Important", exact: true }, 0.7);
  await R.hold(0.5);
  await R.clickOn({ text: "All", exact: true }, 0.4);
  await R.hold(0.8);
  await sayOver("“Important” leaves out lamps and devices that their 3D model already shows; sensors and watts stay. “None” hides them all – even the ones set to “Always show”.");
  await R.clickOn({ text: "Important", exact: true }, 0.5);
  await R.hold(1.0);
  await R.clickOn({ text: "None", exact: true }, 0.5);
  await R.hold(1.0);
  await R.clickOn({ text: "Important", exact: true }, 0.5);
  await sayOver("When I tap the coffee machine now, the question comes first. Only “OK” switches it.");
  await muteDialogs(true);
  await R.clickOn('.fp3d-dev[data-entity="switch.kaffeemaschine"]', 0.7);
  await fakeConfirm("Really switch Coffee machine?");
  await R.hold(1.0);
  await clickFakeOk();
  await muteDialogs(false);
  await service("switch", "turn_off", { entity_id: "switch.kaffeemaschine" });
  await R.hold(0.5);
  await sayOver("A long press opens the quick menu for switches and lamps. Part 2 shows how to control lamps in 3D.");
  await R.moveTo('.fp3d-dev[data-entity="switch.kaffeemaschine"]', 0.5);
  await longPress(0.8);
  await R.hold(1.2);

  // ---------------------------------------------------------------- 13. As furniture
  await chapter("Show as furniture");
  await sayOver("Some devices look better as furniture. The heating in the living room is still a plain pin.");
  await editorOpen(true);
  await tapDevice("climate.wohnzimmer", 0.6);
  await R.hold(0.4);
  await sayOver("“Show as furniture” – replaces the pin with a matching item in the same spot, already linked to the device. The list only shows what fits the device type.");
  await scrollSide({ text: "To room centre", exact: true }, 700, 0.5);
  await R.pickOption("Show as furniture", "Radiator", 0.6);
  await R.hold(0.6);
  await sayOver("The heating has become a radiator that glows in 3D while it's heating. A speaker, a lamp or the robot vacuum work the same way.");
  {
    const f = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "radiator"); return [f.x, f.z];`);
    await pointPlan(f[0], f[1], 0.6);
  }
  await R.hold(1.2);
  await sayOver("In the furniture form, “Back to a device pin” – brings back the plain pin, and Ctrl+Z undoes either.");
  await scrollSide({ text: "Back to a device pin" }, 800, 0.6);
  await R.moveTo({ text: "Back to a device pin" }, 0.5);

  // ---------------------------------------------------------------- 14. Outro
  await chapter("Zusammenfassung");
  await catchUp();
  await R.clickOn({ text: "3D", exact: true }, 0.6);
  await R.sleep(1000);
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1200);
  await R.hideCursor();
  await quiet('button[aria-label="Hide the controls – only the 3D view remains"]', 700);
  {
    const a = { theta: -0.6, phi: 0.95, radius: 13 };
    const b = { theta: 0.4, phi: 0.85, radius: 11 };
    const l1 = "To sum up: the device list shows the room's area, “Place” puts devices into the plan, and in the form you set the symbol, the name and the question before switching.";
    await cam("eg", 5.5, 3.5, a);
    await R.sleep(700);
    const end = await line(l1);
    await glide("eg", 5.5, 3.5, a, b, end - R.time);
  }
  await R.title("part 2: lamps and cameras", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  {
    let end = await line("Part 2 is about lamps and cameras.");
    await live(end);
    end = await line("Left to the online demo and the manual are in the description. And HomePlan 3D also runs on old wall tablets. See you in part 2!");
    await live(end + 0.6);
  }
}

// ================================================================ part b
if (PART === "b") {
  /** Point the editor's 3D pane ("3D beside") at a plan point of a floor. */
  const pane = (floorId, x, z, c) =>
    R.page.evaluate(
      (floorId, x, z, c) => {
        const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
        const v = e.renderRoot.querySelector("fp3d-view3d");
        const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
        const fv = viewer.floorMap.get(floorId);
        const t = fv.group.position.clone().set(x, c.y ?? 0, z);
        fv.group.localToWorld(t);
        const view = viewer.controls.view;
        view.target.copy(t);
        Object.assign(view, { theta: c.theta, phi: c.phi, radius: c.radius });
        viewer.invalidate();
      },
      floorId,
      x,
      z,
      c,
    );
  const paneCentre = () =>
    R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const r = e.renderRoot.querySelector("fp3d-view3d").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

  // ---------------------------------------------------------------- 1. Teaser: the kitchen's coloured lights, the camera cone
  await chapter("Teaser");
  await R.open("");
  await R.hideCursor();
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1200);
  await quiet('button[aria-label="Hide the controls – only the 3D view remains"]', 700);
  {
    const a = { theta: 0.5, phi: 0.75, radius: 13, y: 0.3 };
    const b = { theta: -0.35, phi: 0.68, radius: 10.5, y: 0.3 };
    await cam("eg", 5.5, 2.3, a);
    await R.sleep(1500);
    await R.title("Devices, lamps and cameras", `HomePlan 3D · episode 6 · part 2${VERSION}`);
    const l1 = "Lamps that glow in the colour and brightness your lights really have, and cameras with their field of view in the room.";
    const l2 = "This is part 2 of episode 6: lamps and cameras.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease(Math.min(1, (t1 - t0 + (i / n) * (end - t1)) / total));
        await cam("eg", 5.5, 2.3, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0.3 });
        await R.frame(1 / FPS, 15);
      }
    };
    await step(await line(l1));
    await R.untitle();
    await step(await line(l2));
  }

  // ---------------------------------------------------------------- 2. Intro, 3D beside
  await chapter("Worum es today geht");
  await R.open("");
  await editorOpen();
  await R.move(900, 560, 0.01);
  await sayOver("Part 1 covered the device list and placing devices. Now let's take a closer look at lamps and cameras.");
  await R.move(700, 500, 1.2);
  await sayOver("So you can see what happens, I switch on “3D beside” – the 3D view next to the plan.");
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await R.sleep(2500);
  // full walls in the pane: the cut at 1.15 m would hide pendants and wall lights
  await R.clickOn({ text: "Tall walls", exact: true }, 0.5);
  await fitPlan();
  await pane("eg", 2.2, 6.3, { theta: -0.5, phi: 0.75, radius: 8, y: 0.3 });
  await R.hold(0.5);

  // ---------------------------------------------------------------- 3. Lamps in the library, a wall light
  await chapter("Lights from the library");
  await sayOver("Lamps are furniture with a linked light. I tap the bedroom – in the “Furniture” tool they're right at the top under “Lights”.");
  await tapRoom(3.7, 5.2, "schlafen");
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.hold(0.5);
  await sayOver("Ceiling light, recessed spot, surface spot, LED panel, pendant light, floor lamp, uplighter, table lamp, wall light, LED strip, path light and garden spot.");
  for (const name of ["Ceiling light", "Downlight", "Surface spot", "LED panel", "Pendant light", "Floor lamp", "Floor uplight", "Table lamp", "Wall light", "LED strip", "Path light", "Garden spot"]) {
    await R.moveTo({ text: name, exact: true }, 0.3);
    await R.hold(0.15);
  }
  await sayOver("I'll take a wall light. When I drag it to a wall, it snaps on – wall lights hang at 1.75 metres by default.");
  await R.clickOn({ text: "Wall light", exact: true }, 0.4);
  await R.hold(0.4);
  {
    const f = await R.editor(`const f = e.furnitureItem; return [f.x, f.z];`);
    const a = await R.planPoint(f[0], f[1]);
    await R.move(a.x, a.y, 0.5);
    // the 10 cm lamp sits under the plan's size handles, so a real drag grabs a handle: the item follows the cursor
    // the way a drag moves it (the editor's own wall snap at the end)
    const n = FAST ? 2 : 25;
    await R.page.evaluate((x, y) => {
      const c = document.getElementById("tut-cursor");
      if (c) c.style.transform = `translate(${x - 4}px, ${y - 2}px)`;
    }, a.x, a.y);
    for (let i = 1; i <= n; i++) {
      const k = ease(i / n);
      const x = f[0] + (4.3 - f[0]) * k;
      const z = f[1] + (5.3 - f[1]) * k;
      const q = await R.planPoint(x, z);
      await R.editor(`const f = e.furnitureItem; const snap = ${i === n} ? e.snapToWall({ ...f, x: ${x}, z: ${z} }) : null; e.change((_, floor) => Object.assign(floor.furniture.find((m) => m.id === f.id), snap ?? { x: ${Math.round(x * 100) / 100}, z: ${Math.round(z * 100) / 100} }), undefined, ${i === n});`);
      await R.move(q.x, q.y, 1 / FPS);
    }
    await R.frame(0.2, 100);
    const at = await R.editor(`const f = e.furnitureItem; return f ? [f.x, f.z, f.rotation] : null;`);
    console.log(`wall light at ${JSON.stringify(at)}`);
  }
  await R.clickOn({ text: "Select", exact: true }, 0.5);
  await pane("eg", 4.2, 5.4, { theta: -1.5, phi: 1.2, radius: 3.6, y: 1.5 });
  await R.hold(0.3);
  await sayOver("Under “Light or switch” – you choose the light from Home Assistant. I'll take the bedside light.");
  await scrollSide({ label: "Light or switch" }, 520, 0.6).catch(() => {});
  await pickEntity("Light or switch", "Tot", "Nightstand", 0.5);
  await R.hold(0.6);
  await sayOver("Several lamps may follow the same light: the table lamp is on the same light, so now both glow together.");
  await pane("eg", 3.7, 6.6, { theta: -1.0, phi: 1.0, radius: 5.2, y: 0.9 });
  {
    const b = await paneCentre();
    await R.move(b.x, b.y, 0.8);
  }
  await R.hold(1.0);
  await sayOver("Instead of a light you can also use a switch, say a relay for the ceiling light. The lamp then glows as long as it's on.");
  await pickerMove("Light or switch", 0.6);
  await sayOver("If such a relay switches a lamp that knows its own colour and brightness, enter the lamp under “Colour and brightness from”: on and off come from the switch, the colour from there.");
  await pickerMove("Colour and brightness from", 0.6);
  await R.hold(1.5);
  await moveToText("For lamps that use a relay", 0.6);
  await sayOver("“Glow in 3D” – sets how strongly the lamp shines in 3D: below 100 percent it's softer, above it's brighter. It doesn't switch anything in Home Assistant.");
  await fill("Glow in 3D", "150");
  await R.hold(1.2);
  await sayOver("“Height above floor” – hangs it higher or lower, and “Automatic height” resets it.");
  await scrollSide({ label: "Height above the floor" }, 500, 0.5).catch(() => {});
  await fill("Height above the floor", "2,1");
  await R.hold(0.8);
  await R.clickOn({ text: "Automatic height", exact: true }, 0.5);

  // ---------------------------------------------------------------- 4. Pendant, table and floor lamps
  await chapter("Pendant and table lamps, lights as pins");
  await sayOver("For the pendant light above the dining table, you choose its look under “Shape”: shade, globe, cone or drum.");
  await tapItem("lamp_pendant", 0.7);
  await pane("eg", 8.0, 2.9, { theta: -0.6, phi: 1.05, radius: 4.2, y: 1.4 });
  await scrollSide({ label: "Shape" }, 600, 0.5).catch(() => {});
  await R.pickOption("Shape", "Shade", 0.5);
  await R.hold(0.2);
  await R.pickOption("Shape", "Cone", 0.3);
  await R.hold(0.2);
  await sayOver("Its height is how far it hangs down from the ceiling – say, above the dining table.");
  await R.pickOption("Shape", "Drum", 0.3);
  await R.hold(0.3);
  await R.pickOption("Shape", "Globe", 0.3);
  await R.moveTo({ label: "Height (m)" }, 0.5);
  await sayOver("A table lamp sits on the piece of furniture below it by itself – here on the nightstand.");
  await tapItem("lamp_table", 0.7);
  await pane("eg", 3.3, 7.6, { theta: 2.7, phi: 1.0, radius: 3.4, y: 0.6 });
  await R.hold(1.0);
  await sayOver("If a light sits in the plan as a plain device pin, you choose in its form under “Lamp” – how it's mounted: ceiling light, floor lamp, table lamp or wall light.");
  await R.moveTo({ label: "Furniture item" }, 0.6);
  await R.hold(1.2);
  await R.moveTo({ label: "Height above the floor" }, 0.6);

  // ---------------------------------------------------------------- 5. LED strips
  await chapter("LED strip");
  await sayOver("LED strips snap onto the wall just like wall lights, and by default they hang right below the ceiling.");
  {
    const f = await R.editor(`const f = e.floor.furniture.find((f) => f.type === "led_strip" && !f.upright); return { id: f.id, x: f.x, z: f.z };`);
    await tapPlan(f.x, f.z + 0.02, 0.7);
    if ((await R.editor(`return e._furnitureId;`)) !== f.id) await R.editor(`e.selectItem("furniture", ${JSON.stringify(f.id)});`);
  }
  await pane("eg", 2.6, 0.6, { theta: 0.15, phi: 1.2, radius: 5.5, y: 1.3 });
  await R.hold(0.6);
  await sayOver("Below one metre – along the skirting board or behind a cabinet – they shine up the wall; mounted higher, they shine down.");
  await scrollSide({ label: "Height above the floor" }, 500, 0.5).catch(() => {});
  await fill("Height above the floor", "0,3");
  await R.hold(1.6);
  await R.clickOn({ text: "Automatic height", exact: true }, 0.5);
  await sayOver("A strip below the cut height stays visible even when the walls are cut.");
  await R.move(1150, 700, 1.0);
  await sayOver("“Tilt along the length” – lays the strip against a sloped ceiling or tips it sideways. “Upright” – stands it on end, like the light column here by the window.");
  await R.moveTo({ label: "Tilt about its length" }, 0.5);
  await R.hold(0.8);
  await R.moveTo({ text: "Upright" }, 0.4);
  await R.hold(0.6);
  await pane("eg", 0.3, 1.3, { theta: 1.45, phi: 1.05, radius: 5, y: 1.1 });
  await pointPlan(0.12, 1.2, 0.7);
  await sayOver("And if a colour effect like a colour loop runs in Home Assistant, it's animated in 3D.");
  await live(R.time + 0.5);
  await catchUp();

  // ---------------------------------------------------------------- 6. Spots
  await chapter("Place spots");
  await sayOver("For recessed spots, the room has “Place spots”. It lays out a grid of lamps that all follow one light – say six spots on one dalways.");
  await tapRoom(3.7, 5.2, "schlafen", 0.7);
  await scrollSide({ text: "Place spots", exact: true }, 640, 0.6);
  await R.clickOn({ text: "Place spots", exact: true }, 0.5);
  await R.hold(0.5);
  await sayOver("You choose the lamp, the columns and rows, and the light.");
  await R.moveTo({ label: "Lamp" }, 0.5);
  await R.hold(0.4);
  await fill("Columns", "3");
  await fill("Rows", "2");
  await pickerMove("Light or switch", 0.5);
  await sayOver("“Place 6 lamps” – done. Afterwards you can move each spot on its own, like any piece of furniture.");
  await R.clickOn({ text: "Place 6 lights" }, 0.5);
  await pane("eg", 2.2, 6.3, { theta: 0.3, phi: 0.62, radius: 7.5, y: 0.3 });
  await R.hold(1.2);
  await sayOver("And if a room has several lights as ceiling pins, “Spread ceiling lights evenly” – at the top of the device list spreads them over the room.");
  await scrollSide({ text: "This area" }, 600, 0.6);
  {
    const b = await textBox("Devices", null, "H3");
    if (b) await R.move(b.x, b.y, 0.5);
  }
  await R.hold(1.0);
  await R.moveTo({ text: "This area" }, 0.5);

  // ---------------------------------------------------------------- 7. Lamps live in 3D
  await chapter("Lampn live in 3D");
  await sayOver("In 3D every lamp glows in the colour and brightness Home Assistant reports. The floor and walls light up too, and two coloured ceiling lights blend in between.");
  await R.clickOn({ text: "3D", exact: true }, 0.6);
  await R.sleep(1000);
  await quiet({ text: "Kitchen", exact: true }, 1500);
  await R.clickOn('button[aria-label="Close"]', 0.01).catch(() => {});
  {
    const a = { theta: -0.2, phi: 0.75, radius: 8.5, y: 0.5 };
    const b = { theta: 0.25, phi: 0.7, radius: 7.5, y: 0.5 };
    await cam("eg", 8.0, 2.4, a);
    await R.sleep(600);
    await glide("eg", 8.0, 2.4, a, b, 3.5);
    await sayOver("Light only falls into the next room through doors.");
    await glide("eg", 8.0, 2.4, b, { theta: 0.45, phi: 0.72, radius: 7.5, y: 0.5 }, 2.0);
  }
  await sayOver("A tap switches the lamp, and it bleft briefly to confirm.");
  {
    const p = await point3d("eg", 8.0, 1.75, 2.9);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await live(R.time + 1.2);
    await R.click();
    await live(R.time + 0.8);
  }
  await sayOver("Swiping up or down dims it – the value appears at your finger.");
  {
    const p = await point3d("eg", 8.0, 1.75, 2.9);
    await R.move(p.x, p.y, 0.3);
    await R.page.mouse.down();
    await R.move(p.x, p.y - 160, 1.4);
    await R.move(p.x, p.y - 60, 0.8);
    await R.page.mouse.up();
    await live(R.time + 0.6);
  }
  await sayOver("A long press opens the quick menu: brightness, colour temperature and colours.");
  {
    const p = await point3d("eg", 8.0, 1.75, 2.9);
    await R.move(p.x, p.y, 0.4);
    await longPress(0.8);
    await R.hold(1.0);
  }
  await sayOver("A double tap on the room switches all of its lights off – and back on.");
  {
    // close the quick menu with a tap beside it, then double tap the kitchen floor
    const p = await point3d("eg", 6.7, 0, 2.2);
    await R.move(p.x, p.y, 0.6);
    await R.page.mouse.click(p.x, p.y);
    await R.frame(0.6, 600);
    await R.page.mouse.click(p.x, p.y);
    await R.sleep(80);
    await R.page.mouse.click(p.x, p.y);
    await live(R.time + 1.6);
    await R.page.mouse.click(p.x, p.y);
    await R.sleep(80);
    await R.page.mouse.click(p.x, p.y);
    await R.sleep(150);
    // the second double tap is not always taken (it follows the first too closely): switch the room back on the
    // way it would
    const off = await R.page.evaluate(() => window.fp3dPanel.hass.states["light.esstisch"].state !== "on");
    if (off) {
      console.log("double tap on: fallback");
      for (const id of ["light.esstisch", "light.kueche_left", "light.kueche_right", "light.kueche"]) await service("light", "turn_on", { entity_id: id });
    }
    await live(R.time + 1.2);
    await R.clickOn('button[aria-label="Close"]', 0.4).catch(() => {});
  }

  // ---------------------------------------------------------------- 8. Cameras in the editor
  await chapter("Cameras ausrichten");
  await sayOver("You place cameras like any other device. In the plan, a cone shows where the camera is looking.");
  await editorOpen(true);
  await tapDevice("camera.wohnzimmer", 0.7);
  await pane("eg", 2.6, 2.0, { theta: -0.75, phi: 0.75, radius: 9, y: 0.3 });
  await R.hold(0.6);
  await sayOver("Under “Mounting” – it hangs on a wall and looks in one direction, its rotation. On the ceiling it's a dome that looks all around.");
  await R.pickOption("Mount", "Ceiling (dome, all round)", 0.5);
  await R.hold(1.2);
  await R.pickOption("Mount", "Wall (looks along its rotation)", 0.4);
  await R.hold(0.4);
  await sayOver("The handle at the tip of the cone turns the camera and sets its range at the same time.");
  {
    const hnd = await R.editor(`const el = e.renderRoot.querySelector('[data-aim] .fp3d-hit'); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`);
    await R.move(hnd.x, hnd.y, 0.6);
    const a = await R.planPoint(4.2, 3.4);
    await R.drag(a.x, a.y, 1.0);
  }
  await sayOver("For exact values, use the numbers: “Field of view”, “Range” and “Tilt down”, “Reach”, “Tilt down”.");
  await fill("Field of view", "110");
  await R.hold(0.4);
  await R.moveTo({ label: "Reach" }, 0.4);
  await R.hold(0.4);
  await R.moveTo({ label: "Tilt down" }, 0.4);
  await sayOver("“Show the field of view in 3D” – hides and shows the cone for this camera.");
  await R.clickOn({ text: "Show the field of view in 3D" }, 0.5);
  await R.hold(0.8);
  await R.clickOn({ text: "Show the field of view in 3D" }, 0.3);
  await sayOver("In 3D the cone stops at the first wall: an indoor camera doesn't see through the wall into the next room.");
  await pane("eg", 3.0, 2.3, { theta: -0.4, phi: 0.6, radius: 10, y: 0.3 });
  await R.move(1150, 560, 0.8);

  // ---------------------------------------------------------------- 9. Cameras in 3D
  await chapter("Cameras in 3D");
  await sayOver("In 3D, the camera hangs on the wall as a small model, and its field of view lies on the floor as a cone.");
  await R.clickOn({ text: "3D", exact: true }, 0.6);
  await R.sleep(1000);
  await quiet({ text: "Living room", exact: true }, 1500);
  await R.clickOn('button[aria-label="Close"]', 0.01).catch(() => {});
  // evening: the living room's lights off, so the cone on the floor stands out (set up before the line)
  for (const id of ["light.wohnzimmer_decke", "light.stehlampe", "light.led_band", "light.pixeluhr"]) await service("light", "turn_off", { entity_id: id });
  await service("media_player", "turn_off", { entity_id: "media_player.fernseher" });
  await h.setState("binary_sensor.wohnzimmer_kamera_bewegung", "off");
  await h.setState("binary_sensor.wohnzimmer_kamera_person", "off");
  await cam("eg", 1.6, 1.6, { theta: -0.75, phi: 0.72, radius: 6.8, y: 0.6 });
  await R.sleep(700);
  {
    const p = await point3d("eg", 0.2, 2.2, 0.2);
    await R.move(p.x, p.y, 0.7);
  }
  await R.hold(0.5);
  await sayOver("When a motion or presence sensor of the camera reports movement, the cone turns red.");
  // the demo reports motion now and then: hold the sensors at "off" until the moment it turns red
  await live(R.time + 1.2, async () => {
    if (await R.page.evaluate(() => ["binary_sensor.wohnzimmer_kamera_bewegung", "binary_sensor.wohnzimmer_kamera_person"].some((id) => window.fp3dPanel.hass.states[id].state !== "off"))) {
      await h.setState("binary_sensor.wohnzimmer_kamera_bewegung", "off");
      await h.setState("binary_sensor.wohnzimmer_kamera_person", "off");
    }
  });
  await h.setState("binary_sensor.wohnzimmer_kamera_bewegung", "on");
  await live(R.time + 1.6);
  await sayOver("Tapping the camera or its cone opens the snapshot, which refreshes every few seconds. The cone is the much bigger target to tap.");
  {
    const p = await point3d("eg", 1.2, 0.02, 1.3);
    await R.move(p.x, p.y, 0.7);
    await R.click();
    await R.hold(0.8);
  }
  await sayOver("Tapping the picture opens the live view from Home Assistant.");
  await R.moveTo(".qm-camera", 0.6).catch(() => {});
  await R.hold(0.6);
  await sayOver("With the Camera Cockpit, a Pro extension, you can also look through the camera into the 3D view and see all live pictures on a camera wall.");
  await R.moveTo({ text: "Look through the camera" }, 0.6).catch(() => {});
  await R.hold(1.0);
  await R.moveTo({ text: "Cameras", exact: true }, 0.8).catch(() => {});

  // ---------------------------------------------------------------- 10. Outro
  await chapter("Zusammenfassung");
  await catchUp();
  await R.open("");
  await R.hideCursor();
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1200);
  await quiet('button[aria-label="Hide the controls – only the 3D view remains"]', 700);
  {
    const a = { theta: -0.6, phi: 0.95, radius: 13 };
    const b = { theta: 0.4, phi: 0.85, radius: 11 };
    await cam("eg", 5.5, 3.5, a);
    await R.sleep(700);
    const end = await line("To sum up: lamps are furniture with a light, with a shape, a height and a glow setting. Cameras show with their cone what they can see.");
    await glide("eg", 5.5, 3.5, a, b, end - R.time);
  }
  await R.title("Next episode: Roofs, part 1", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  {
    let end = await line("The next episode is about roofs: gable roofs, hip roofs and more.");
    await live(end);
    end = await line("Left to the online demo and the manual are in the description. And HomePlan 3D also runs on old wall tablets. See you next time!");
    await live(end + 0.6);
  }
}

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
