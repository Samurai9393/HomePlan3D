// Tutorial episode 3 – "Floors, stairs and cellar", in two parts (the checklist does not fit into 8 minutes):
//   a) Floors and cellar: the floor form in full (add from HA floors, height above ground, ceiling height, a cellar
//      below ground with rooms from HA areas and “Close gaps", an attic, an empty floor, order, delete,
//      shift / turn / “Take all floors”, the floor start view with “3D beside”), checked in 3D.
//   b) stairs and floor openings: the free stair from the ground floor up (direction, height, the opening it cuts),
//      the floor-opening tool (gallery, L shape, the "outside a room" warning), the stair types of the pack
//      “Stairs & railings” (L, U, spiral to the cellar, space saver to the attic), “3D beside” in detail, 3D check.
// Starts from a small house like the end of episode 1 (loaded invisibly); part b starts where part a ends.
// The stair pack is served from private/packs/src/stairs.json by request interception (the recorder itself does not
// serve private/), only for this episode. Its old pack id is rewritten to demo.stairs while it is served.
// Usage (from frontend/): node tutorials/ep03-etagen-treppen-keller.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep03a/de and …/en, resp. ep03b)
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { appVersion, narration, startRecorder } from "./recorder.mjs";

const out = process.argv[2] ?? "tutorial-ep03";
const PART = process.argv[3] === "b" ? "b" : "a";
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;
const STAIR_PACK = "pack:demo.stairs";

// ---------------------------------------------------------------- states (invented demo house, ep01 style)
const rectRoom = (id, name, area_id, x0, z0, x1, z1, floor_material = "wood") => ({ id, name, area_id, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material });
const hole = (id, type, room_id, edge, offset, width, extra = {}) => ({ id, room_id, edge, offset, width, type, sill: type === "door" ? 0 : 0.9, height: type === "door" ? 2.05 : 1.3, hinge: "left", leaves: 1, swing: "in", cover: null, contact: null, contact2: null, tilt: null, ...extra });
const floorOf = (id, name, elevation, ha_floor, rooms, openings = [], extra = {}) => ({ id, name, elevation, height: 2.5, cut_height: 1.15, rooms, openings, furniture: [], placements: [], background: null, outdoor: [], walls: [], ha_floor, ...extra });
const item = (id, type, x, z, w, d, h, rotation = 0, extra = {}) => ({ id, type, x, z, w, d, h, rotation, variant: null, ...extra });

const ground = () =>
  floorOf("eg", "Ground floor", 0, "erdgeschoss", [
    rectRoom("r_wohnen", "Living room", "wohnzimmer", 0, 0, 6, 4.5),
    rectRoom("r_kueche", "Kitchen", "kueche", 6, 0, 9.5, 4.5, "tiles"),
    rectRoom("r_flur", "Hall", "flur", 0, 4.5, 4, 7.5, "tiles"),
    rectRoom("r_bad", "Bathroom", "bad", 4, 4.5, 6.5, 7.5, "tiles"),
    rectRoom("r_schlafen", "Bedroom", "schlafzalways", 6.5, 4.5, 9.5, 7.5, "carpet"),
  ], [
    hole("o1", "window", "r_wohnen", 0, 3, 1.6),
    hole("o2", "window", "r_kueche", 0, 1.75, 1.2),
    hole("o3", "door", "r_flur", 3, 2.3, 1.0),
    hole("o4", "door", "r_flur", 0, 1.2, 0.9),
    hole("o5", "door", "r_bad", 0, 1.25, 0.8),
    hole("o6", "window", "r_bad", 2, 1.25, 0.8, { sill: 1.3, height: 0.8 }),
    hole("o7", "door", "r_schlafen", 0, 1.5, 0.9),
    hole("o8", "window", "r_schlafen", 2, 1.5, 1.4),
  ]);
const upper = (extra = {}) =>
  floorOf("og", "Upper floor", 2.75, "obergeschoss", [
    rectRoom("r_kind", "Kids' room", "kinderzalways", 0, 0, 4.5, 4.5),
    rectRoom("r_arbeit", "Study", "arbeitszalways", 4.5, 0, 9.5, 4.5),
    rectRoom("r_flur_og", "Upper hallway", null, 0, 4.5, 9.5, 7.5),
  ], [
    hole("p1", "window", "r_kind", 0, 2.25, 1.2),
    hole("p2", "window", "r_arbeit", 0, 2.5, 1.6),
    hole("p3", "door", "r_kind", 2, 2.25, 0.9),
    hole("p4", "door", "r_arbeit", 2, 2.5, 0.9),
    hole("p5", "window", "r_flur_og", 2, 4.75, 1.2),
  ], extra);
// the cellar as part a leaves it: four rooms from the HA areas, gaps closed, shifted 1.38 m to the back wall
const cellar = () =>
  floorOf("kg", "Cellar", -2.45, "keller", [
    rectRoom("k_heiz", "Heating room", "heizung", 0, 1.38, 4, 4.44),
    rectRoom("k_hobby", "Hobby room", "hobby", 4, 1.38, 8, 4.44),
    rectRoom("k_vorrat", "Storage room", "vorrat", 0, 4.44, 4, 7.5),
    rectRoom("k_wasch", "Laundry room", "waschkueche", 4, 4.44, 8, 7.5),
  ], [], { height: 2.2 });
const attic = () => floorOf("dg", "Attic", 5.5, "dachgeschoss", [rectRoom("d_boden", "Attic floor", null, 0, 0, 9.5, 7.5)], [], { height: 2.2 });
const OG_VIEW = { theta: 3.6, phi: 0.85, radius: 15 };
const startFloors = () => [ground(), upper()];
const partAEnd = () => [cellar(), ground(), upper({ start_view: OG_VIEW }), attic()];
const finalFloors = () => {
  const f = partAEnd();
  f[0].furniture.push(item("st_spiral", `${STAIR_PACK}:spiral`, 3.1, 5.35, 1.6, 1.6, 2.45));
  f[1].furniture.push(item("st_main", "stairs", 2.0, 6.85, 1.0, 3.2, 2.75, 90));
  f[2].furniture.push(item("st_space", `${STAIR_PACK}:space_saver`, 7.6, 6.0, 0.7, 2.4, 2.75, 90));
  f[2].furniture.push(item("h_gallery", "stairwell", 2.0, 6.2, 3.2, 0.5, 0.02));
  return f;
};

// "dump": write the final state (for probes) and stop
if (process.argv[3] === "dump") {
  (await import("node:fs")).writeFileSync(out, JSON.stringify(finalFloors()));
  process.exit(0);
}

// ---------------------------------------------------------------- the stair pack (paid pack, shown as an extension)
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
const N = narration(R, process.argv.slice(4));
const { say, sayOver, chapter, catchUp } = N;
{
  const file = resolve(import.meta.dirname, "..", "..", "private", "packs", "src", "stairs.json");
  const pack = existsSync(file) ? readFileSync(file, "utf-8") : null;
  if (!pack && PART === "b") throw new Error("part b needs private/packs/src/stairs.json");
  await R.page.setRequestInterception(true);
  R.page.on("request", (req) => {
    const u = req.url();
    if (u.includes("/private/packs/src/index.json")) return req.respond({ status: 200, contentType: "application/json", body: pack ? '["stairs.json"]' : "[]" });
    if (u.includes("/private/packs/src/stairs.json") && pack) return req.respond({ status: 200, contentType: "application/json", body: pack.replace(/master.?short/gi, "demo") });
    if (u.includes("/private/")) return req.respond({ status: 404, body: "" });
    return req.continue();
  });
}
// confirm() / alert() of the app: accepted at once (a native dialog is not in the screenshots; fakeDialog shows it)
R.page.on("dialog", (d) => void d.accept());

// ---------------------------------------------------------------- helpers
const editorOpen = async () => {
  await R.clickOn({ text: "Editor", exact: true }, 0.01);
  await R.sleep(700);
};
/** Load a state invisibly (no undo step) and show a floor. */
const loadState = async (floors, floorId) => {
  await R.editor(`const d = structuredClone(e._doc); d.floors = ${JSON.stringify(floors)}; e.setDoc(d, null); e.past = []; e._canUndo = false; e._floorId = ${JSON.stringify(floorId)}; e._roomId = null; e.fit();`);
  await R.sleep(900);
};
/** Type over the value of a form field (by its label). */
const fill = async (label, value, seconds = 0.5) => {
  await R.clickOn({ label }, seconds);
  await typeOver(value);
};
const typeOver = async (value) => {
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("a");
  await R.page.keyboard.up("Control");
  await R.type(value, 0.06);
  await R.key("Enter");
};
const tapPlan = async (x, z, seconds = 0.5) => {
  const p = await R.planPoint(x, z);
  await R.move(p.x, p.y, seconds);
  await R.click();
};
const pointPlan = async (x, z, seconds = 0.5) => {
  const p = await R.planPoint(x, z);
  await R.move(p.x, p.y, seconds);
};
const dragPlan = async (x0, z0, x1, z1, seconds = 1) => {
  const a = await R.planPoint(x0, z0);
  const b = await R.planPoint(x1, z1);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, seconds);
};
const chip = (name) => R.clickOn({ text: name, exact: true, nth: 0 }, 0.5);
const back = (seconds = 0.5) => R.clickOn({ text: "Back to the floor" }, seconds);
/** Park the cursor on the side panel's edge and scroll a heading / button into view. */
const scrollSide = async (text, top, seconds = 0.6) => {
  await R.move(1607, 640, 0.35);
  await R.scrollTo(text, top, seconds);
};
/** The app's confirm()/alert() as a visible box (native dialogs are not in headless screenshots). */
const fakeDialog = (text) =>
  R.page.evaluate((t) => {
    const d = document.createElement("div");
    d.id = "tut-dialog";
    d.style.cssText =
      "position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:2147483644;max-width:620px;padding:22px 26px;border-radius:12px;background:#f4f6fa;color:#111;font:18px/1.4 system-ui,'Segoe UI',sans-serif;box-shadow:0 12px 50px rgba(0,0,0,.6)";
    d.innerHTML = `<div style="font-size:14px;color:#555;margin-bottom:8px">127.0.0.1 says</div>${t}<div style="text-align:right;margin-top:18px"><span style="display:inline-block;padding:7px 22px;border-radius:6px;background:#1a73e8;color:#fff">OK</span></div>`;
    document.body.appendChild(d);
  }, text);
const noDialog = () => R.page.evaluate(() => document.getElementById("tut-dialog")?.remove());
/** The two inputs of “Shift the floor” (X and Y; the app names the second one Z). */
const shiftField = (axis) => R.clickOn(`input[aria-label="${axis}"]`, 0.5);
/** Centre of the editor's 3D pane, for drags that turn its camera. */
const paneBox = () => R.locate(".fp3d-editor-3d");
/** Up to the floor form: select tool, then "Back to …" until nothing is selected. */
const toFloor = async () => {
  await R.clickOn({ text: "Select", exact: true }, 0.45);
  for (let i = 0; i < 3; i++) {
    const up = await R.locate({ text: "Back to" }).catch(() => null);
    if (!up) break;
    await R.clickOn({ text: "Back to" }, 0.45);
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
/** Point the editor's 3D pane at a plan point (x, z) of a floor – a clean framing, like turning and zooming by hand. */
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
/** Glide the editor's 3D pane camera from its current view to another (theta, phi, radius). */
const panePaneView = () =>
  R.page.evaluate(() => {
    const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
    const v = e.renderRoot.querySelector("fp3d-view3d");
    const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);
    const { theta, phi, radius } = viewer.controls.view;
    return { theta, phi, radius };
  });
/** Move the cursor onto any element (also a paragraph) whose text contains `text`; the innermost last match. */
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
      if (!/^(P|SPAN|DIV|LABEL|BUTTON)$/.test(el.tagName)) continue;
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
/** Keep the app's confirm()/alert() from firing on the next click (a fake dialog is shown instead). */
const muteDialogs = (on) =>
  R.page.evaluate((on) => {
    if (on) {
      window.__tutConfirm = window.confirm;
      window.__tutAlert = window.alert;
      window.confirm = () => false;
      window.alert = () => {};
    } else if (window.__tutConfirm) {
      window.confirm = window.__tutConfirm;
      window.alert = window.__tutAlert;
    }
  }, on);
/** Show the fake dialog, click its OK button, close it. */
const dialogOk = async (text) => {
  await fakeDialog(text);
  await R.hold(0.3);
  const ok = await R.page.evaluate(() => {
    const r = document.querySelector("#tut-dialog span").getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await R.move(ok.x, ok.y, 0.6);
  await R.click();
  await noDialog();
};
/** Teaser: the finished house of both parts, live in 3D, floors pulled apart. */
const teaser = async (title, line1, line2) => {
  await chapter("Teaser");
  await R.open("empty");
  await R.hideCursor();
  await editorOpen();
  await loadState(finalFloors(), "eg");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.01);
  await R.sleep(1500);
  await R.clickOn({ text: "All floors", exact: true }, 0.01);
  await R.clickOn({ text: "Apart", exact: true }, 0.01);
  await R.sleep(2000);
  const A = { theta: 0.75, phi: 1.0, radius: 30 };
  const B = { theta: 1.9, phi: 0.85, radius: 27 };
  const C = { theta: 2.6, phi: 0.75, radius: 29 };
  await R.view(A);
  await R.sleep(900);
  await R.title(title, `HomePlan 3D · episode 3 · ${PART === "a" ? "part 1" : "part 2"}${VERSION}`);
  await sayOver(line1);
  await R.glide(A, B, 5);
  await R.untitle();
  await sayOver(line2);
  await R.glide(B, C, 4.5);
};

if (PART === "a") {
  // ================================================================ PART 1: Floors and cellar
  await teaser(
    "Floors, stairs and cellar",
    "A house with a cellar, ground floor, upper floor and attic – every floor at the right height.",
    "Today it's all about the floors. In the second part we add the stairs and the openings in the floor.",
  );

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await R.open("empty");
  await editorOpen();
  await loadState(startFloors(), "eg");
  await R.hideCursor(false);
  await sayOver("We start with the small house from episode one: ground floor and upper floor.");
  await R.move(800, 560, 0.6);
  await R.hold(0.5);
  await sayOver("We'll add a cellar below ground and an attic. Everything you see here is free.");
  await R.moveTo({ text: "Add floor" }, 0.6);

  // ---------------------------------------------------------------- the floor form
  await chapter("The floor form");
  await sayOver("Your floors are listed at the top right. One click switches the floor in the plan – here the upper floor,");
  await chip("Upper floor");
  await sayOver("and the ground floor lies dashed underneath. That way you draw neatly on top of each other.");
  await pointPlan(9.5, 7.5, 0.6);
  await R.hold(0.8);
  await chip("Ground floor");
  await sayOver("You see the floor form whenever nothing is selected. If a room is selected, click “Back to the floor”.");
  await tapPlan(2, 6, 0.6);
  await R.hold(0.6);
  await back(0.6);
  await sayOver("Here you have “Name” and “Elevation” – the ground floor sits at zero –");
  await R.moveTo({ label: "Name" }, 0.5);
  await R.hold(0.5);
  await R.moveTo({ label: "Height above the floor" }, 0.5);
  await sayOver("and the “Ceiling height”: that's how tall the walls get. Below it, the link to the floor in Home Assistant.");
  await R.moveTo({ label: "Ceiling height" }, 0.5);
  await R.hold(0.8);
  await R.moveTo({ label: "Floor in Home Assistant" }, 0.5);

  // ---------------------------------------------------------------- cellar
  await chapter("Cellar below ground");
  await sayOver("Now the cellar: “Add floor”. The menu only lists the Home Assistant floors that are still missing, with their level.");
  await R.clickOn({ text: "Add floor" }, 0.5);
  await R.hold(0.5);
  await R.moveTo({ text: "Cellar", nth: 0 }, 0.5);
  await R.hold(0.6);
  await R.moveTo({ text: "Emptye Floor" }, 0.5);
  await sayOver("In Home Assistant the cellar has level minus one.");
  await R.clickOn({ text: "Cellar", nth: 0 }, 0.5);
  await sayOver("So it automatically sits at minus 2.75 metres – below ground. And it's at the bottom of the list: floors are sorted from bottom to top.");
  await R.moveTo({ label: "Height above the floor" }, 0.5);
  await R.hold(1.6);
  await R.moveTo({ text: "Cellar", exact: true, nth: 0 }, 0.5);
  await sayOver("Cellar rooms are often lower. I set the ceiling height to 2.20.");
  await fill("Ceiling height", "2,2");
  await sayOver("Then the cellar has to sit higher too: ceiling height plus 25 centimetres of ceiling must reach exactly zero – so minus 2.45.");
  await R.hold(0.6);
  await fill("Height above the floor", "-2,45");
  await sayOver("The rule of thumb works for every floor: elevation plus ceiling height plus ceiling gives the height of the next floor.");
  await R.moveTo({ label: "Ceiling height" }, 0.5);
  await R.hold(0.5);
  await R.moveTo({ label: "Height above the floor" }, 0.5);

  // ---------------------------------------------------------------- rooms from areas, gaps
  await chapter("Rooms from areas, Close gaps");
  await sayOver("The cellar rooms already exist as areas in Home Assistant. This button adds a room for each of them – four in all.");
  await R.clickOn({ text: "Add rooms from HA areas" }, 0.6);
  await sayOver("They're tiles of four by three metres, already linked to the right area. Now you move them into place.");
  await R.hold(1);
  await sayOver("I drag the hobby room to the boiler room – the corners snap into place.");
  await dragPlan(6.5, 1.5, 6.0, 1.5, 1.2);
  await sayOver("For exact positions use the fields: tap the laundry room, “X” four, “Y” 3.12. The twelve-centimetre gap is like measuring from the inside.");
  await tapPlan(2, 5, 0.6);
  await fill("X (m)", "4");
  await fill("Y (m)", "3,12");
  await sayOver("The storage room goes next to it: “X” zero, “Y” 3.12.");
  await back(0.5);
  await tapPlan(11, 1.5, 0.6);
  await fill("X (m)", "0");
  await fill("Y (m)", "3,12");
  await back(0.5);
  await sayOver("If you measured inside, there are gaps between the rooms. “Close gaps” – joins rooms up to 60 centimetres apart.");
  await R.moveTo({ text: "Close gaps" }, 0.6);
  await R.hold(0.6);
  await R.click();
  await sayOver("Below, it tells you what happened: two places closed, and the gap becomes an inner wall – twelve centimetres.");
  await R.moveTo("p.fp3d-notice", 0.5).catch(() => R.move(1700, 760, 0.5));
  await R.hold(0.6);

  // ---------------------------------------------------------------- shift and turn
  await chapter("Shift and turn the floor");
  await sayOver("The cellar is shorter than the house: 6.12 instead of 7.5 metres. It should be flush with the lower outer wall – so 1.38 metres down.");
  await R.moveTo(`input[aria-label="X"]`, 0.6);
  await R.hold(0.8);
  await sayOver("That's what “Shift the floor” is for – “Shift the floor”: the first field for X to the right, the second for Y down. Then click “Shift”.");
  await shiftField("Z");
  await typeOver("1,38");
  await R.clickOn({ text: "Shift", exact: true }, 0.5);
  await sayOver("Everything on the floor moves along: rooms, furniture, devices, outdoor areas, free walls and the background picture. The roof and cables stay put.");
  await R.move(800, 560, 0.6);
  await R.hold(1.2);
  await sayOver("“Turn 90°” – turns the floor clockwise around the centre of its rooms – in case you drew it turned.");
  await R.clickOn({ text: "Turn 90°" }, 0.6);
  await R.hold(1.2);
  await sayOver("I don't want that here: Ctrl+Z or “Undo” – brings everything back.");
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await sayOver("With the tick “Take every floor along” – shift and turn act on the whole house, with roof, garden, cables and meter.");
  await R.clickOn({ text: "All floors mitnehmen" }, 0.6);
  await R.hold(1.2);
  await R.clickOn({ text: "All floors mitnehmen" }, 0.5);

  // ---------------------------------------------------------------- attic, empty floor, order, delete
  await chapter("Attic and empty floor");
  await sayOver("Now the attic. It has level two and lands at 5.50 metres – right above the upper floor.");
  await R.clickOn({ text: "Add floor" }, 0.5);
  await R.clickOn({ text: "Attic", nth: 0 }, 0.5);
  await R.moveTo({ label: "Height above the floor" }, 0.5);
  await sayOver("The walls under the roof are lower: ceiling height 2.20. We build the sloped ceilings in the roof episode.");
  await fill("Ceiling height", "2,2");
  await sayOver("One big room for the attic: “Rectangle” – once across the whole house; the upper floor dashed below shows the corners.");
  await R.clickOn({ text: "Rectangle", exact: true }, 0.5);
  await dragPlan(0, 0, 9.5, 7.5, 1.3);
  await fill("Name", "Attic floor");
  await sayOver("By the way, saving happens by itself – at the top right it says “Saved”.");
  await R.move(1830, 34, 0.5);
  await R.hold(0.4);
  await back(0.5);
  await sayOver("Now every Home Assistant floor is taken. So “Add floor” right away adds an empty floor – on top of the house.");
  await R.clickOn({ text: "Add floor" }, 0.5);
  await R.hold(0.6);
  await sayOver("Under “Floor in Home Assistant” nothing is free any more – every HA floor already belongs to a floor in the plan.");
  await R.pickOption("Floor in Home Assistant", "– none –", 0.5);
  await sayOver("“Move up” and “Move down”, “Down” – only change the order in the list. Where a floor sits in the house is set by its elevation alone.");
  await R.clickOn({ text: "Down", exact: true }, 0.5);
  await R.hold(0.8);
  await R.clickOn({ text: "Up", exact: true }, 0.5);
  await sayOver("I don't need it: “Delete floor”. After a confirmation it's gone with its rooms – Ctrl+Z brings it back.");
  await muteDialogs(true);
  await R.clickOn({ text: "Delete floor" }, 0.5);
  await dialogOk("Delete floor “Floor 4” with all its rooms?");
  await muteDialogs(false);
  await R.editor("e.deleteFloor();");
  await R.frame(1 / 25, 300);

  // ---------------------------------------------------------------- 3D beside and the floor start view
  await chapter("3D beside and the floor start view");
  await sayOver("One more button: “View as this floor's start”. Without a 3D view it answers like this:");
  await chip("Upper floor");
  await muteDialogs(true);
  await R.clickOn({ text: "View as this floor's start" }, 0.6);
  await catchUp();
  await dialogOk("Turn on “3D beside” first and turn the floor the way it should open.");
  await muteDialogs(false);
  await sayOver("So at the top, “3D beside”: the floor appears in 3D on the right, and every change follows a moment later.");
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await R.sleep(1500);
  await R.hold(1.6);
  await sayOver("The bar in between sets the width.");
  {
    const h = await R.locate(".fp3d-split-handle");
    await R.move(h.x, h.y, 0.5);
    await R.drag(h.x - 160, h.y, 0.8);
  }
  await sayOver("I turn the 3D view until I see the upper floor from behind …");
  {
    const p = await paneBox();
    for (let i = 0; i < 2; i++) {
      await R.move(p.x + 230, p.y + 160, 0.4);
      await R.drag(p.x - 230, p.y + 140, 1.1);
    }
    console.log("pane view after turning:", JSON.stringify(await panePaneView()));
  }
  await sayOver("… and click “View as this floor's start”. When you open the upper floor in 3D, it comes up exactly like this.");
  await R.clickOn({ text: "View as this floor's start" }, 0.6);
  await sayOver("Next to it there's now an arrow: it takes the start view back.");
  await R.moveTo({ text: "↺", exact: true }, 0.5);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 3D check
  await chapter("Check floors in 3D");
  await sayOver("Now let's check everything in the 3D view: “3D” at the top, then “All floors”.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1200);
  await R.clickOn({ text: "All floors", exact: true }, 0.6);
  await R.sleep(1200);
  await sayOver("With “Apart” – the floors float separately: attic and upper floor at the top, then the ground floor – and the cellar at the very bottom.");
  await R.clickOn({ text: "Apart", exact: true }, 0.6);
  await R.hideCursor();
  {
    const A = { theta: 0.8, phi: 1.15, radius: 30 };
    const B = { theta: 1.5, phi: 1.3, radius: 28 };
    await R.view(A);
    await R.glide(A, B, 4.5);
  }
  await R.hideCursor(false);
  await sayOver("“Stacked” – puts them on top of each other. From the side you see: the cellar sits below ground, under the ground floor – and is a bit shorter than the house.");
  await R.clickOn({ text: "Stacked", exact: true }, 0.6);
  await R.hideCursor();
  {
    const A = { theta: 1.5, phi: 1.35, radius: 26 };
    const B = { theta: 1.65, phi: 1.45, radius: 24 };
    await R.view(A);
    await R.glide(A, B, 3.5);
  }
  await R.hideCursor(false);
  await sayOver("You open a floor in the bar at the top or with the pictures on the left. The upper floor now comes from behind – that's the start view.");
  await R.clickOn({ text: "Upper floor", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.hold(1.4);
  await sayOver("At the bottom you choose what happens to the floors below: “Dimmed”, “Stacked” or “Alone”, “Stacked”, “Alone”.");
  await R.clickOn({ text: "Stacked", exact: true }, 0.6);
  await R.hold(1.2);
  await R.clickOn({ text: "Alone", exact: true }, 0.6);
  await R.hold(1.0);
  await R.clickOn({ text: "Dimmed", exact: true }, 0.6);
  await sayOver("And the cellar: four rooms, all linked to their area.");
  await R.clickOn({ text: "Cellar", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.hold(1.0);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("part 2: stairs and floor openings", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await say("That was the floors: adding, elevation, ceiling height, cellar, shifting, turning and the start view. In the second part we connect them with stairs.");
  await say("Left to the online demo and the manual are in the description. NeonPlan also runs on old wall tablets, by the way. See you in part two!");
  await R.hold(0.6);
} else {
  // ================================================================ PART 2: stairs and floor openings
  await teaser(
    "stairs and floor openings",
    "Stairs from the ground floor up, spiral stairs down to the cellar, space-saver stairs up to the attic.",
    "And every staircase cuts its hole into the ceiling. Let's build it step by step.",
  );

  // ---------------------------------------------------------------- intro
  await chapter("Was wir today machen");
  await R.open("empty");
  await editorOpen();
  await loadState(partAEnd(), "eg");
  await R.hideCursor(false);
  await sayOver("We carry on where part one ended: four floors from the cellar up to the roof.");
  await R.moveTo({ text: "Attic", exact: true, nth: 0 }, 0.6);
  await sayOver("The simple stairs come free. At the end I'll show you more stair types from the pack “Stairs & Railings”.");
  await R.move(800, 560, 0.6);

  // ---------------------------------------------------------------- the free stair
  await chapter("Stairs from the ground floor upwards");
  await sayOver("Stairs are a piece of furniture – and they always belong to the lower floor. We're on the ground floor. Ridge, I tap the hallway,");
  await tapPlan(2, 5.5, 0.6);
  await sayOver("then “Furniture” at the top: new furniture lands in the middle of the room. In the search field I type “stairs”.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.clickOn("input.fp3d-search", 0.5);
  await R.type("Stairs", 0.07);
  await R.hold(0.6);
  await sayOver("Under “Work & other” – there are the “Stairs”. One click – and they stand in the hallway.");
  await R.clickOn({ text: "Stairs", exact: true }, 0.6);
  await sayOver("Their height is already right: 2.75 metres, exactly up to the upper floor. NeonPlan works that out when it places them.");
  await R.moveTo({ label: "Height (m)" }, 0.5);
  await R.hold(1);
  await sayOver("The arrow in the plan shows the direction: the stairs climb from the marked front edge to the back.");
  await pointPlan(2, 6.6, 0.6);
  await R.hold(1.2);
  await sayOver("They should go up to the right along the outer wall. So “↻ 90°” – or a number under “Rotation”.");
  await R.clickOn({ text: "↻ 90°", exact: true }, 0.6);
  await R.moveTo({ label: "Turn" }, 0.5);
  await sayOver("Now I drag them to the wall. For exact positions use “X” and “Y”: 2 and 6.85.");
  await dragPlan(2, 6, 2, 6.8, 1);
  await fill("X (m)", "2");
  await fill("Y (m)", "6,85");
  await sayOver("“Width” and “Depth” fit – “Width”, “Depth”: one metre wide, 3.20 long. The text below reminds you of the direction.");
  await R.moveTo({ label: "Width" }, 0.5);
  await R.hold(0.4);
  await R.moveTo({ label: "Depth" }, 0.5);
  await R.hold(0.4);
  await moveToText("The stairs rise towards the back", 0.5).catch(() => R.move(1700, 800, 0.5));

  // ---------------------------------------------------------------- the opening it cuts
  await chapter("The opening in the ceiling");
  await sayOver("If stairs reach the floor above, they cut the opening into its floor by themselves. Let's look: “3D beside”.");
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await R.sleep(1500);
  await setPane("eg", 2, 6.4, { theta: 0.45, phi: 0.8, radius: 14 });
  await sayOver("The 3D half always shows the floor you're editing: on the ground floor the stairs stand at the wall. Now up to the upper floor –");
  await R.hold(1.2);
  await toFloor();
  await chip("Upper floor");
  await R.sleep(1500);
  await setPane("og", 3.5, 6, { theta: 0.4, phi: 0.65, radius: 14 });
  await sayOver("and in the upper hallway there's the hole in the floor, right above the stairs.");
  await pointPlan(2, 6.85, 0.6);
  await R.hold(1.2);
  await sayOver("Important: up there the opening has to lie completely inside one room. If it crosses a room border, nothing is cut out.");
  await R.hold(0.6);

  // ---------------------------------------------------------------- floor openings
  await chapter("Floor openings");
  await sayOver("For everything else there's the “Floor opening” tool at the top: for a gallery, an open space or a wider stairwell.");
  await R.clickOn({ text: "Floor opening", exact: true }, 0.6);
  await sayOver("The hint is at the bottom of the plan. It belongs to the floor whose floor it opens – so here the upper floor.");
  await R.move(300, 1062, 0.5);
  await R.hold(0.8);
  await sayOver("I make the stairwell wider, like a small gallery – and drag it too big on purpose, into the kids' room.");
  await dragPlan(0.4, 4.0, 3.6, 6.4, 1.2);
  await sayOver("The form then shows a note: the opening crosses a room border and is not cut out.");
  await moveToText("This opening crosses a room boundary", 0.6);
  await R.hold(1.4);
  await sayOver("So smaller: “Depth” 0.5 and “Y” 6.2. Now it lies completely in the hallway, and the note is gone.");
  await fill("Depth (m)", "0,5");
  await fill("Y (m)", "6,2");
  await R.hold(0.6);
  await sayOver("It overlaps the stairwell – that's allowed. Overlapping openings become one, which is how you build an L shape too.");
  await pointPlan(2, 6.3, 0.6);
  await R.hold(1.2);
  await sayOver("You change size and position in the form or at the corners; “Delete” – removes it again.");
  await R.moveTo({ label: "Width" }, 0.5);
  await R.hold(0.6);

  // ---------------------------------------------------------------- 3D beside in detail
  await chapter("3D beside im Detail");
  await sayOver("A quick word on the 3D half: at the top you switch between “Tall walls” and “Cut” and “Cut”.");
  await R.clickOn({ text: "Tall walls", exact: true }, 0.6);
  await R.hold(1);
  await R.clickOn({ text: "Cut", exact: true }, 0.5);
  await sayOver("You can also tap and drag furniture in 3D. A bar then appears at the bottom: width, depth, height, turning in 45-degree steps, fix and delete.");
  await toFloor();
  await chip("Ground floor");
  await R.sleep(1800);
  await setPane("eg", 2, 6.85, { theta: 0.6, phi: 0.8, radius: 14 });
  await R.sleep(400);
  {
    const id = await R.editor(`return e.floor.furniture.find((f) => f.type === "stairs").id;`);
    const p = await panePoint("eg", 1.2, 0.8, 6.85);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.sleep(600);
    // a tap in 3D that missed the stair: select it the way the tap would (same picture)
    if (!(await R.editor(`return e._furnitureId === ${JSON.stringify(id)};`))) {
      console.log("3D tap missed the stair");
      await R.editor(`e.selectFrom3d("furniture", ${JSON.stringify(id)});`);
    }
    await R.frame(1 / 25, 300);
    await R.clickOn({ text: "↻ 45°", exact: true }, 0.5);
    await R.hold(0.6);
    await R.clickOn({ text: "↺ 45°", exact: true }, 0.5);
  }
  await sayOver("The sidebar is “Pinned”. One click on it, and it folds away beside the 3D view – more room.");
  await R.clickOn({ text: "Pinned" }, 0.6);
  await R.hold(1.2);
  await sayOver("Small buttons on the right edge bring it back: menu, details, furniture, doors. With the pin it stays open again.");
  await R.clickOn({ text: "☰", exact: true }, 0.6);
  await R.hold(0.6);
  await R.clickOn({ text: "Pin" }, 0.6);

  // ---------------------------------------------------------------- stair pack: L, U, spiral, space saver
  await chapter("Stair shapes from the pack");
  await sayOver("More stair types come with the extension “Stairs & Railings”: straight, floating, L, U, spiral, space-saver and outdoor stairs, landing and railings.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.clickOn("input.fp3d-search", 0.5);
  await typeOver("Stairs");
  await R.hold(1);
  await sayOver("To have a look, I put L-shaped stairs into the living room. You set where they turn with “Rotation” – and “Mirror”, makes them turn to the other side.");
  await tapPlan(3, 2.2, 0.6);
  await R.clickOn({ text: "L-Stairs" }, 0.6);
  await R.hold(1.2);
  await R.clickOn({ text: "Mirror" }, 0.6);
  await R.hold(1.2);
  await sayOver("With “Item” – you swap the type without placing it again – here for the U-shaped stairs. I delete them again.");
  await R.pickOption("Furniture item", "U-stairs (half-turn)", 0.6);
  await R.hold(1.2);
  await R.clickOn({ text: "Delete", exact: true }, 0.5);

  await chapter("Spiral stairs down to the cellar");
  await sayOver("Now the spiral stairs. They stand in the cellar and lead up to the ground floor: choose the cellar, tap the storage room,");
  await toFloor();
  await chip("Cellar");
  await tapPlan(2, 6, 0.6);
  await sayOver("“Furniture”, “Spiral stairs” – and with “X” 3.1 and “Y” 5.35 into the corner below the hallway.");
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.clickOn({ text: "Spiral stairs" }, 0.6);
  await fill("X (m)", "3,1");
  await fill("Y (m)", "5,35");
  await sayOver("Careful, a common mistake: stairs from the pack have a fixed height, here 3.80. But from the cellar to the ground floor it's 2.45.");
  await R.moveTo({ label: "Height (m)" }, 0.5);
  await R.hold(1);
  await fill("Height (m)", "2,45");
  await sayOver("Now they end exactly at the ground floor's floor – and cut the opening there, in the hallway.");
  await toFloor();
  await chip("Ground floor");
  await R.sleep(1500);
  await setPane("eg", 3.1, 5.6, { theta: 0.3, phi: 0.5, radius: 12 });
  await pointPlan(3.1, 5.35, 0.6);
  await R.hold(1.4);

  await chapter("Space-saver stairs up to the attic");
  await sayOver("Finally the attic: upper floor, tap the upper hallway, “Space-saver stairs”.");
  await toFloor();
  await chip("Upper floor");
  await tapPlan(7.5, 6, 0.6);
  await R.clickOn({ text: "Furniture", exact: true }, 0.5);
  await R.clickOn({ text: "Space-saver stairs" }, 0.6);
  await sayOver("Turn with “↻ 90°”, “X” 7.6 – and the height to 2.75, exactly up to the attic.");
  await R.clickOn({ text: "↻ 90°", exact: true }, 0.5);
  await fill("X (m)", "7,6");
  await fill("Height (m)", "2,75");
  await sayOver("On the attic floor the opening is there now.");
  await toFloor();
  await chip("Attic");
  await R.sleep(1500);
  await setPane("dg", 7.6, 6, { theta: 0.3, phi: 0.65, radius: 9 });
  await pointPlan(7.6, 6, 0.6);
  await R.hold(1.2);

  // ---------------------------------------------------------------- 3D check
  await chapter("Check everything in 3D");
  await sayOver("And now the whole house: “3D” at the top, “All floors”, “Apart”, “Apart”.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1200);
  await R.clickOn({ text: "All floors", exact: true }, 0.6);
  await R.clickOn({ text: "Apart", exact: true }, 0.6);
  await R.hideCursor();
  {
    const A = { theta: 0.8, phi: 0.95, radius: 30 };
    const B = { theta: 1.6, phi: 0.8, radius: 27 };
    await R.view(A);
    await sayOver("The spiral stairs in the cellar, the stairs on the ground floor, the space-saver stairs on the upper floor – and above each one the hole in the floor.");
    await R.glide(A, B, 6);
  }
  await R.hideCursor(false);
  await sayOver("I open the upper floor and set “Stacked” at the bottom – “Stacked”. From above I look through the opening down onto the stairs on the ground floor.");
  await R.clickOn({ text: "Upper floor", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.clickOn({ text: "Stacked", exact: true }, 0.6);
  await R.sleep(800);
  await R.hideCursor();
  for (let i = 0; i <= 50; i++) {
    const k = i / 50;
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    await setPane("og", 2.2, 6.6, { theta: 0.6 - 0.4 * e, phi: 0.8 - 0.35 * e, radius: 15 - 5 * e }, true);
    await R.frame(1 / 25, 40);
  }
  await R.hideCursor(false);
  await sayOver("And in the cellar the spiral stairs stand below the hallway.");
  await R.clickOn({ text: "Cellar", exact: true, nth: 0 }, 0.6);
  await R.sleep(1500);
  await R.hold(1.2);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await R.title("Next episode: Furniture", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await say("That was stairs and floor openings. In the next episode we furnish the house – all with the free furniture.");
  await say("Left to the online demo and the manual are in the description. And NeonPlan also runs on old wall tablets. See you next time!");
  await R.hold(0.6);
}

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
