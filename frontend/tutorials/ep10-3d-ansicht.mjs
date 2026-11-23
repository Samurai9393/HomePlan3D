// Tutorial episode 10 – "Die 3D-View bedienen", in two parts (manual chapter 5 does not fit into 8 minutes):
//   a) navigating and all the switches: house / floor / room (labels, drag, wheel, Esc, “Back”, double tap on a free
//      spot, floor pictures and their fold arrow, the bar at the top with ≡ / ↔), “Tall walls” / “Cut”,
//      “Apart” / “Stacked”, “Roof stays”, “Dimmed” / “Stacked” / “Alone”, the heatmap (Temp.,
//      Humidity, CO₂, Values, Normal), “Room names”, “Trail” / “Cameras” / “Weather” (Pro, one sentence), the header
//      options (quality, look, accent colour, markers, ◧ / ◨, ⌖ “Keep view”, FPS, version, ⚙ on phones) and the
//      eye (Energy Pro in one sentence).
//   b) Bedienen: tap, swipe, long press on lamps and blinds, windows, TV, double tap on a room, the room panel, the
//      star (central menu, favourites, own buttons), the search, warnings, sun and daylight, cameras in 3D, the
//      start views of house, floor and room.
// The full demo house (invented data, mock Home Assistant). Setup steps before a scene are invisible.
// Usage (from frontend/): node tutorials/ep10-3d-ansicht.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep10a/de and …/en, resp. ep10b)
// EP10_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4> --en tutorials/ep10a-narration-en.json

import { FPS, narration, startRecorder } from "./recorder.mjs";

const out = process.argv[2] ?? "tutorial-ep10";
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP10_FAST;
// the controls side (◧ / ◨) and “Keep view” (⌖) come with 1.12.7; the recorded build already has them
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D 1.12.7</span>`;

const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
const N = narration(R, process.argv.slice(4));
const { say, sayOver, chapter, catchUp } = N;
if (FAST) {
  const { move, type } = R;
  R.move = (x, y) => move(x, y, 0.04);
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
R.page.on("dialog", (d) => void d.accept());

// ---------------------------------------------------------------- helpers
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
/** Click and let the camera flight run with real frames. */
const clickLive = async (target, seconds = 0.5, flight = 1.2) => {
  await R.moveTo(target, seconds);
  await R.click();
  await live(R.time + flight);
};
const EYE = 'button[aria-label="Hide the controls – only the 3D view remains"]';
const EYE_BACK = 'button[aria-label="Show the controls again"]';
const STAR = 'button[aria-label="Central: all lights, blinds and favourites"]';
const FIND = 'button[aria-label="Search"]';
/** The main 3D view's viewer object. */
const VIEWER = `const v = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-view3d"); const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);`;
/** Set the main 3D view's camera around a plan point of a floor (or the house when floorId is null). */
const cam = (floorId, x, z, c) =>
  R.page.evaluate(
    (VIEWER, floorId, x, z, c) => {
      const fn = new Function("floorId", "x", "z", "c", `${VIEWER}
        const view = viewer.controls.view;
        if (floorId) {
          const fv = viewer.floorMap.get(floorId);
          const t = fv.group.position.clone().set(x, c.y ?? 0, z);
          fv.group.localToWorld(t);
          view.target.copy(t);
        }
        Object.assign(view, { theta: c.theta, phi: c.phi, radius: c.radius });
        viewer.invalidate();`);
      fn(floorId, x, z, c);
    },
    VIEWER,
    floorId,
    x,
    z,
    c,
  );
/** The camera as it stands (theta, phi, radius). */
const camNow = () => R.page.evaluate((VIEWER) => new Function(`${VIEWER} const w = viewer.controls.view; return { theta: w.theta, phi: w.phi, radius: w.radius };`)(), VIEWER);
/** Glide the main 3D camera around a plan point while recording. */
const glide = async (floorId, x, z, a, b, seconds) => {
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    await cam(floorId, x, z, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: (a.y ?? 0) + ((b.y ?? 0) - (a.y ?? 0)) * k });
    await R.frame(1 / FPS, 40);
  }
};
/** Glide from the camera as it stands: turn by dTheta, tilt by dPhi, zoom by a radius factor (target kept). */
const orbit = async (dTheta, factor = 1, seconds = 2, dPhi = 0) => {
  const a = await camNow();
  await glide(null, 0, 0, a, { theta: a.theta + dTheta, phi: a.phi + dPhi, radius: a.radius * factor }, seconds);
};
/** Screen point of a plan point (x, height y, z) of a floor in the main 3D view. */
const point3d = (floorId, x, y, z) =>
  R.page.evaluate(
    (VIEWER, floorId, x, y, z) =>
      new Function("floorId", "x", "y", "z", `${VIEWER}
        const fv = viewer.floorMap.get(floorId);
        const p = fv.group.position.clone().set(x, y, z);
        fv.group.localToWorld(p);
        p.project(viewer.camera);
        const c = (v.renderRoot ?? v.shadowRoot).querySelector("canvas").getBoundingClientRect();
        return { x: c.left + ((p.x + 1) / 2) * c.width, y: c.top + ((1 - p.y) / 2) * c.height };`)(floorId, x, y, z),
    VIEWER,
    floorId,
    x,
    y,
    z,
  );
/** Long press at the cursor (quick menu): hold the button for `seconds`. */
const longPress = async (seconds = 0.8) => {
  await R.page.evaluate(() => {
    const r = document.createElement("div");
    r.id = "tut-hold";
    document.body.appendChild(r);
  });
  await R.page.mouse.down();
  const n = Math.max(1, Math.round(seconds * FPS));
  for (let i = 0; i < n; i++) await R.frame(1 / FPS, 30);
  await R.page.mouse.up();
  await R.page.evaluate(() => document.getElementById("tut-hold")?.remove());
  await R.frame(1 / FPS, 120);
};
/** Drag with the mouse (turning the 3D view) from the cursor by dx/dy. */
const turn = async (dx, dy, seconds = 1.2) => {
  const { x, y } = await R.page.evaluate(() => {
    const c = document.getElementById("tut-cursor").style.transform.match(/-?[\d.]+/g).map(Number);
    return { x: c[0] + 4, y: c[1] + 2 };
  });
  await R.drag(x + dx, y + dy, seconds);
};
/** The click ring at the cursor without clicking. */
const ringHere = async () => {
  await R.page.evaluate(() => {
    const c = document.getElementById("tut-cursor").style.transform.match(/-?[\d.]+/g).map(Number);
    const r = document.createElement("div");
    r.id = "tut-ring";
    r.style.left = `${c[0] + 4}px`;
    r.style.top = `${c[1] + 2}px`;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });
  for (let i = 0; i < 8; i++) await R.frame(1 / FPS, 25);
};
/** Set a state on the mock Home Assistant (attributes merged). */
const setState = (id, state, attributes = {}) =>
  R.page.evaluate(
    (id, state, attributes) => {
      const panel = window.fp3dPanel;
      const hass = panel.hass;
      const old = hass.states[id];
      hass.states[id] = { entity_id: id, ...(old ?? {}), state, attributes: { ...(old?.attributes ?? {}), ...attributes } };
      panel.hass = { ...hass, states: { ...hass.states } };
    },
    id,
    state,
    attributes,
  );
/** A double tap at the cursor (two quick clicks, one ring). */
const dbl = async () => {
  const { x, y } = await R.page.evaluate(() => {
    const c = document.getElementById("tut-cursor").style.transform.match(/-?[\d.]+/g).map(Number);
    return { x: c[0] + 4, y: c[1] + 2 };
  });
  const ring = (x, y) =>
    R.page.evaluate((x, y) => {
      const r = document.createElement("div");
      r.id = "tut-ring";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 500);
    }, x, y);
  await ring(x, y);
  await R.page.mouse.click(x, y);
  await R.sleep(70);
  await ring(x, y);
  await R.page.mouse.click(x, y);
  for (let i = 0; i < 8; i++) await R.frame(1 / FPS, 25);
};
/** Mouse wheel at the cursor in small steps (zoom). */
const wheel = async (total, seconds = 1) => {
  const n = Math.max(1, Math.round(seconds * FPS));
  for (let i = 0; i < n; i++) {
    await R.page.mouse.wheel({ deltaY: total / n });
    await R.frame(1 / FPS, 30);
  }
};
/** A service call on the mock Home Assistant. */
const service = (domain, name, data) => R.page.evaluate((d, s, data) => window.fp3dPanel.hass.callService(d, s, data), domain, name, data);
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
const moveToText = async (text, seconds = 0.5, nth = null, tags) => {
  const b = await textBox(text, nth, tags);
  if (!b) throw new Error(`text not found: ${text}`);
  await R.move(b.x, b.y, seconds);
};
/** A device pin of the main view (by entity), as a screen box. */
const pinBox = (entity) =>
  R.page.evaluate((entity) => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    for (const el of walk(document)) {
      if (el.dataset?.entity !== entity) continue;
      const r = el.getBoundingClientRect();
      if (r.width > 0) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return null;
  }, entity);
/** Open the 3D view at the house with the stored defaults (a fresh page). */
const fresh = async (query = "") => {
  await R.open(query);
  await R.sleep(800);
};

// ================================================================ part a
if (PART === "a") {
  // ---------------------------------------------------------------- 1. Teaser
  await chapter("Teaser");
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const d = await camNow();
    const a = { theta: d.theta - 0.7, phi: d.phi + 0.05, radius: d.radius * 1.05 };
    const b = { theta: d.theta + 0.3, phi: d.phi - 0.05, radius: d.radius * 0.92 };
    await cam(null, 0, 0, a);
    await R.sleep(1200);
    await R.title("Die 3D-View bedienen", `HomePlan 3D · Episode 10 · part 1${VERSION}`);
    const l1 = "The 3D view is what you use every day: your home live, to look at and to control.";
    const l2 = "In this episode I show you every button and every switch in it.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease((t1 - t0 + (i / n) * (end - t1)) / total);
        await cam(null, 0, 0, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
        await R.frame(1 / FPS, 15);
      }
    };
    await step(await line(l1));
    await R.untitle();
    await step(await line(l2));
  }

  // ---------------------------------------------------------------- 2. Intro
  await chapter("Worum es today geht");
  await fresh();
  await R.move(960, 560, 0.01);
  await sayOver("Episode 10 has two parts. Part 1 is about getting around and about all the switches of the view.");
  await R.move(700, 1040, 1.2);
  await R.move(1500, 70, 1.4);
  await sayOver("Part 2 is about controlling things: lamps and blinds, the room panel, the star, the search, warnings and start views. I'm using the demo house from the online demo.");
  await R.move(960, 520, 1.2);

  // ---------------------------------------------------------------- 3. House, floor, room
  await chapter("House, Floor, Room");
  await sayOver("At the top, on “3D”, you first see the whole house. Every floor has a label: how many rooms and how many lights are on right now.");
  await R.moveTo({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.hold(0.5);
  await R.moveTo('button[data-floor="og"]', 0.7);
  await R.hold(0.6);
  await R.moveTo('button[data-floor="eg"]', 0.6);
  await sayOver("Dragging turns the view, the mouse wheel or two fingers zoom.");
  await R.move(1000, 640, 0.5);
  await turn(-320, -40, 1.4);
  await wheel(-500, 1.0);
  await wheel(400, 0.8);
  await sayOver("A tap on the label opens the floor. The floors above fly away.");
  await clickLive('button[data-floor="eg"]', 0.6, 2.0);
  await sayOver("A tap on a room flies into it, and the room panel opens on the right – more about it in part 2.");
  await clickLive('button[data-room="wohnen"]', 0.6, 2.4);
  await sayOver("You go up one level with Esc, with “Back” – at the bottom …");
  await R.move(1000, 640, 0.5);
  await R.key("Escape");
  await live(R.time + 1.2);
  await clickLive({ text: "Back", exact: true }, 0.7, 1.4);
  await sayOver("… or with a double tap on an empty spot.");
  await clickLive('button[data-floor="eg"]', 0.6, 1.6);
  await R.move(1500, 260, 0.6);
  await dbl();
  await live(R.time + 0.7);
  await sayOver("On the left are the floor pictures. A tap jumps straight to a floor, the house above them shows all floors again.");
  await clickLive({ text: "Upper floor", exact: true, nth: 1 }, 0.6, 1.8);
  await clickLive({ text: "All floors", exact: true, nth: 1 }, 0.5, 1.4);
  await sayOver("The small arrow above them folds them into plain buttons – and back. The device remembers that.");
  await R.clickOn('button[aria-label="Fold the floor pictures into buttons"]', 0.6);
  await R.hold(1.0);
  await R.clickOn('button[aria-label="Show the floor pictures again"]', 0.4);
  await sayOver("The bar at the top lists all floors and the rooms. In the house view each floor's rooms come after its name.");
  await R.moveTo({ text: "All floors", exact: true, nth: 0 }, 0.6);
  await R.hold(0.4);
  await moveToText("Ground floor", 0.6, 1, "SPAN");
  await R.hold(0.4);
  await sayOver("If they don't fit into one row, the bar scrolls sideways, on a PC with the mouse wheel. The button on the right wraps it onto several rows, a second tap brings back the single row.");
  await R.clickOn('button[aria-label="Wrap the bar: every floor and room on several lines"]', 0.8);
  await R.hold(1.2);
  await R.clickOn('button[aria-label="Bar in one line (scrolls sideways)"]', 0.5);

  // ---------------------------------------------------------------- 4. Walls
  await chapter("Tall walls and cut");
  await quiet('button[data-floor="eg"]', 1800);
  await sayOver("The switches are at the bottom. “Tall walls” – shows the walls at full height; the front ones turn into tinted glass so you can still see inside.");
  await R.moveTo({ text: "Tall walls", exact: true }, 0.7);
  await R.hold(0.3);
  await orbit(0.5, 0.75, 2.4);
  await sayOver("“Cut” – cuts all walls at hip height. Tall furniture like wardrobes, stairs or tall cabinets is cut as well, so it doesn't hide anything behind it.");
  await R.clickOn({ text: "Cut", exact: true }, 0.5);
  await orbit(-0.5, 1, 3.0);
  await sayOver("Every device remembers its choice: the wall tablet may show the cut, the phone the tall walls.");
  await R.clickOn({ text: "Tall walls", exact: true }, 0.6);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 5. Floors and roof
  await chapter("Floors and roof");
  await sayOver("The house view adds two switches. “Apart” – pulls the floors apart, “Stacked” – puts them on top of each other like the real house.");
  await clickLive({ text: "All floors", exact: true, nth: 0 }, 0.6, 1.4);
  await R.clickOn({ text: "Stacked", exact: true }, 0.6);
  await live(R.time + 1.6);
  await R.clickOn({ text: "Apart", exact: true }, 0.5);
  await live(R.time + 1.2);
  await sayOver("Normally the roof lifts and fades out as you zoom in, so you can look into the house.");
  await R.clickOn({ text: "Stacked", exact: true }, 0.5);
  await R.move(960, 560, 0.6);
  const houseCam = await camNow();
  await orbit(0, 0.75, 1.8);
  await live(R.time + 0.6);
  await sayOver("With “Roof stays” it stays in place. Tap when you want to show the house from outside, say the roof with the solar panels.");
  await R.clickOn({ text: "Roof stays", exact: true }, 0.6);
  await live(R.time + 1.6);
  await R.clickOn({ text: "Roof stays", exact: true }, 0.4);
  await R.move(960, 560, 0.5);
  await glide(null, 0, 0, await camNow(), houseCam, 1.0);
  await R.clickOn({ text: "Apart", exact: true }, 0.5);
  await sayOver("With a floor open, you choose what happens to the floors below: “Dimmed” …");
  await clickLive('button[data-floor="og"]', 0.6, 1.8);
  await R.moveTo({ text: "Dimmed", exact: true }, 0.5);
  await R.hold(0.4);
  await sayOver("… “Stacked” – the whole house up to here – or “Alone” – just this one floor.");
  await R.clickOn({ text: "Stacked", exact: true }, 0.5);
  await live(R.time + 1.4);
  await R.clickOn({ text: "Alone", exact: true }, 0.5);
  await live(R.time + 1.2);
  await R.clickOn({ text: "Dimmed", exact: true }, 0.5);

  // ---------------------------------------------------------------- 6. Heatmap
  await chapter("Heatmap and values");
  await quiet({ text: "Ground floor", exact: true, nth: 0 }, 1800);
  await sayOver("The next group is the heatmap. “Temp.” colours the floors by the temperature in the room, the colour scale is at the edge.");
  await R.clickOn({ text: "Temp.", exact: true }, 0.6);
  await R.hold(0.6);
  await R.moveTo(".fp3d-legend", 0.6);
  await sayOver("It uses the sensors in the room's area. The unit comes from Home Assistant, Celsius or Fahrenheit, and is converted correctly.");
  await orbit(0.35, 1, 2.2);
  await sayOver("“Humidity” – and “CO2” work the same way. If no room has such a sensor, the scale says so.");
  await R.clickOn({ text: "Humidity", exact: true }, 0.5);
  await R.hold(1.0);
  await R.clickOn({ text: "CO₂", exact: true }, 0.5);
  await R.hold(0.8);
  await sayOver("“Values” – colours nothing; it writes temperature, humidity and CO2 as numbers under the room names.");
  await R.clickOn({ text: "Values", exact: true }, 0.5);
  await R.hold(1.0);
  await sayOver("“Normal” turns the heatmap off again.");
  await R.clickOn({ text: "Normal", exact: true }, 0.5);

  // ---------------------------------------------------------------- 7. Room names and the Pro switches
  await chapter("Room names, trail, cameras and weather");
  await sayOver("“Room names” – hides the room names and shows them again – for a calm picture on the wall.");
  await R.clickOn({ text: "Room names", exact: true }, 0.6);
  await R.hold(1.2);
  await R.clickOn({ text: "Room names", exact: true }, 0.4);
  await sayOver("“Trail” and “Cameras” and “Cameras” – belong to the Camera Cockpit extension, “Weather” – to Outdoor Weather. Without the extension there's a lock in front of them.");
  await R.moveTo({ text: "Trail", exact: true }, 0.6);
  await R.hold(0.6);
  await R.moveTo({ text: "Cameras", exact: true }, 0.4);
  await R.hold(0.6);
  await R.moveTo({ text: "Weather", exact: true }, 0.4);
  await R.hold(0.6);

  // ---------------------------------------------------------------- 8. Quality and look
  await chapter("Quality and look");
  await sayOver("The view options are at the top right. Ridge, the quality: “Auto” chooses by itself.");
  await R.moveTo({ text: "Auto", exact: true }, 0.8);
  await sayOver("“Tablet” leaves out patterns, shadows and halos. It's the lightest level, and on Fire tablets it's chosen automatically.");
  await R.clickOn({ text: "Tablet", exact: true }, 0.5);
  await live(R.time + 1.5);
  await sayOver("“High” – also shows light cones under the spots, like here in the bathroom.");
  await R.clickOn({ text: "High", exact: true }, 0.5);
  await live(R.time + 1.2);
  await R.clickOn({ text: "Auto", exact: true }, 0.5);
  await sayOver("Next to it is the look: “Neon” is the default, “Blueprint” looks like a construction plan, and “Day” – shows the house bright.");
  await R.clickOn({ text: "Blueprint", exact: true }, 0.6);
  await live(R.time + 1.4);
  await R.clickOn({ text: "Day", exact: true }, 0.5);
  await live(R.time + 1.4);
  await R.clickOn({ text: "Neon", exact: true }, 0.5);
  await sayOver("The colour field next to it sets your own accent colour. In the Neon look, lines and glowing edges take it on, buttons and pins in every look.");
  // only a ring on the colour field: a real click would open the native colour picker
  await R.moveTo('input[aria-label="Accent colour"]', 0.6);
  await ringHere();
  await R.page.evaluate(() => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    for (const el of walk(document)) {
      if (el.matches?.('input[aria-label="Accent colour"]')) {
        el.value = "#ff8a00";
        el.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      }
    }
  });
  await live(R.time + 1.6);
  await sayOver("The arrow next to it brings back the cyan.");
  await R.clickOn('button[aria-label="Back to cyan"]', 0.5);
  await R.hold(0.5);

  // ---------------------------------------------------------------- 9. Markers, controls side, keep view, FPS
  await chapter("Markers, Page, Keep view, FPS");
  // a calm house for the FPS counter (music paused, no colour effect, the robot docked, no solar sweep)
  for (const id of ["media_player.kueche_lautsprecher", "media_player.bad_lautsprecher", "media_player.fernseher"]) await setState(id, "paused");
  await setState("light.led_band", "on", { effect: "none" });
  await setState("vacuum.saugi", "docked");
  // the solar modules sweep while they produce: evening for the counter
  await setState("sensor.pv_leistung", "0");
  await setState("sensor.balkon_leistung", "0");
  await sayOver("“Symbols” – decides which device symbols appear. “All” – shows every device …");
  await R.clickOn({ text: "All", exact: true }, 0.6);
  await R.hold(1.0);
  await sayOver("… “Important” – only devices without their own 3D model, and values like watts or the running app. “None” – hides them.");
  await R.clickOn({ text: "Important", exact: true }, 0.5);
  await R.hold(1.0);
  await R.clickOn({ text: "None", exact: true }, 0.5);
  await R.hold(0.8);
  await R.clickOn({ text: "Important", exact: true }, 0.5);
  await sayOver("The two buttons with the half squares put the floor pictures, the star, the search and the eye on the left or on the right – handy when the view sits at the left edge of the dashboard.");
  await R.clickOn('button[aria-label="Controls on the right"]', 0.6);
  await R.hold(1.4);
  await R.clickOn('button[aria-label="Controls on the left"]', 0.5);
  await sayOver("The crosshair is called “Keep view”: when you switch floors, the camera stays where it is, only the height moves along.");
  await R.clickOn('button[aria-label="Keep view"]', 0.6);
  await R.move(1000, 640, 0.5);
  await turn(-150, 20, 0.9);
  await clickLive({ text: "Upper floor", exact: true, nth: 1 }, 0.6, 1.6);
  await clickLive({ text: "Ground floor", exact: true, nth: 1 }, 0.5, 1.4);
  await R.clickOn('button[aria-label="Keep view"]', 0.6);
  await sayOver("“FPS” shows the frame rate at the bottom right, the slowest frame and the reason for every frame drawn.");
  await R.clickOn({ text: "FPS", exact: true }, 0.6);
  await live(R.time + 1.0);
  await sayOver("At rest it says zero frames per second: NeonPlan only draws when something changes. That's why it also runs on old wall tablets.");
  await live(R.time + 2.0);
  await R.clickOn({ text: "FPS", exact: true }, 0.5);
  await sayOver("The installed version is on the far right. On a phone, a gear folds these options open and closed.");
  await moveToText("v1.", 0.6, null, "SPAN");
  await R.hold(0.6);

  // ---------------------------------------------------------------- 10. The eye
  await chapter("Das Auge");
  await sayOver("At the bottom left, next to the magnifier, sits the eye. One tap hides everything that isn't the 3D view: header, bars, floor pictures and switches.");
  await R.clickOn(EYE, 0.7);
  await live(R.time + 1.2);
  await sayOver("The energy values at the top left disappear too – they come from the Energy Pro extension.");
  await R.move(180, 160, 0.8);
  await sayOver("You can still tap a room, and a tap on the eye brings everything back. Every device remembers this choice too, like all the switches.");
  await R.clickOn(EYE_BACK, 0.7);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 11. Outro
  await chapter("Wie geht es weiter");
  await catchUp();
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const d = await camNow();
    const a = { theta: d.theta + 0.2, phi: d.phi, radius: d.radius };
    const b = { theta: d.theta + 1.0, phi: d.phi - 0.08, radius: d.radius * 0.9 };
    await cam(null, 0, 0, a);
    await R.sleep(700);
    const end = await line("That was house, floor and room, and all the switches of the view.");
    await glide(null, 0, 0, a, { ...b, theta: 0.5 }, end - R.time);
    await R.title("part 2: Das House bedienen", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
    let e2 = await line("In part 2 we control the house: lamps, blinds, room panel, star, search, warnings and start views.");
    await glide(null, 0, 0, { ...b, theta: 0.5 }, b, e2 - R.time);
    e2 = await line("Left to the online demo and the manual are in the description. See you in a moment!");
    await live(e2 + 0.6);
  }
}

// ================================================================ part b
if (PART === "b") {
  /** Range inputs of the room panel (brightness, colour temperature, position …) as screen boxes, top to bottom. */
  const panelSliders = () =>
    R.page.evaluate(() => {
      const panel = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-room-panel");
      const root = panel.shadowRoot ?? panel.renderRoot;
      return [...root.querySelectorAll('input[type="range"]')]
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.top > 120 && r.bottom < 1060)
        .map((r) => ({ x: r.left, y: r.top + r.height / 2, w: r.width }));
    });
  /** Scroll the room panel with the wheel over it. */
  const panelWheel = async (dy, seconds = 0.8) => {
    await R.move(1720, 640, 0.4);
    await wheel(dy, seconds);
  };
  /** The camera of the demo reports motion now and then; quiet for the lamp scenes. */
  const noMotion = () =>
    R.page.evaluate(() => {
      const panel = window.fp3dPanel;
      const hass = panel.hass;
      for (const id of ["binary_sensor.wohnzimmer_kamera_bewegung", "binary_sensor.wohnzimmer_kamera_person"]) hass.states[id] = { ...hass.states[id], state: "off" };
      panel.hass = { ...hass, states: { ...hass.states } };
    });
  /** The editor's 3D pane: its centre, its camera, and setting its camera around a plan point. */
  const PANE = `const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor"); const v = e.renderRoot.querySelector("fp3d-view3d"); const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);`;
  const paneCentre = () =>
    R.page.evaluate((PANE) => new Function(`${PANE} const r = v.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`)(), PANE);
  const paneView = () => R.page.evaluate((PANE) => new Function(`${PANE} const w = viewer.controls.view; return { theta: w.theta, phi: w.phi, radius: w.radius };`)(), PANE);
  const pane = (floorId, x, z, c) =>
    R.page.evaluate(
      (PANE, floorId, x, z, c) =>
        new Function("floorId", "x", "z", "c", `${PANE}
          const fv = viewer.floorMap.get(floorId);
          const t = fv.group.position.clone().set(x, c.y ?? 0, z);
          fv.group.localToWorld(t);
          viewer.controls.view.target.copy(t);
          Object.assign(viewer.controls.view, { theta: c.theta, phi: c.phi, radius: c.radius });
          viewer.invalidate();`)(floorId, x, z, c),
      PANE,
      floorId,
      x,
      z,
      c,
    );
  /** Close a quick menu with a tap on an empty floor spot. */
  const away = async () => {
    const open = await R.locate(".fp3d-menu-backdrop").catch(() => null);
    if (!open) return;
    await R.page.mouse.click(1700, 980);
    await R.sleep(300);
  };

  // ---------------------------------------------------------------- 1. Teaser
  await chapter("Teaser");
  await fresh();
  await R.hideCursor();
  await quiet('button[data-floor="eg"]', 1800);
  await quiet(EYE, 700);
  {
    const a = { theta: -0.2, phi: 0.8, radius: 10, y: 0.4 };
    const b = { theta: 0.45, phi: 0.72, radius: 8.5, y: 0.4 };
    await cam("eg", 6.5, 2.4, a);
    await R.sleep(1200);
    await R.title("Die 3D-View bedienen", `HomePlan 3D · Episode 10 · part 2${VERSION}`);
    const l1 = "Lights on, blinds down, start a scene – all right in the 3D house.";
    const l2 = "In part 2 I show you how to control your home in the 3D view.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease((t1 - t0 + (i / n) * (end - t1)) / total);
        await cam("eg", 6.5, 2.4, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0.4 });
        await R.frame(1 / FPS, 15);
      }
    };
    await step(await line(l1));
    await R.untitle();
    await step(await line(l2));
  }

  // ---------------------------------------------------------------- 2. Intro
  await chapter("Worum es today geht");
  await fresh();
  await quiet('button[data-floor="eg"]', 1800);
  await R.move(960, 560, 0.01);
  await sayOver("Part 1 was about getting around and the switches. Now we control things: lamps, blinds, the room panel, the star with the favourites, and the search.");
  await R.move(1300, 600, 1.4);
  await sayOver("After that: warnings, sunlight, cameras, and the start view for house, floor and room.");
  await R.move(60, 950, 1.2);

  // ---------------------------------------------------------------- 3. Lamps
  await chapter("Switch and dim lamps");
  await noMotion();
  await cam("eg", 4.2, 1.6, { theta: -0.35, phi: 0.78, radius: 9, y: 0.6 });
  await R.sleep(800);
  await sayOver("A tap on a lamp switches it. It bleft briefly to confirm.");
  {
    const p = await point3d("eg", 5.3, 1.35, 0.7);
    await R.move(p.x, p.y, 0.7);
    await R.click();
    await live(R.time + 1.2);
    await R.click();
    await live(R.time + 0.8);
  }
  await sayOver("Swiping vertically dims it: up is brighter, down is darker. The value shows next to your finger.");
  {
    const p = await point3d("eg", 5.3, 1.35, 0.7);
    await R.move(p.x, p.y, 0.3);
    await R.page.mouse.down();
    await R.move(p.x, p.y - 170, 1.4);
    await R.move(p.x, p.y - 70, 0.9);
    await R.page.mouse.up();
    await live(R.time + 0.6);
  }
  await sayOver("A long press opens the quick menu: brightness, colour temperature and colours.");
  {
    const p = await point3d("eg", 5.3, 1.35, 0.7);
    await R.move(p.x, p.y, 0.4);
    await longPress(0.8);
    await R.hold(0.6);
    const sw = await R.locate(".qm-swatch").catch(() => null);
    if (sw) {
      await R.move(sw.x, sw.y, 0.5);
      await R.click();
    }
    await live(R.time + 0.8);
  }
  await sayOver("A double tap on the floor of a room switches all the room's lights off – and on again.");
  {
    await away();
    const p = await point3d("eg", 2.2, 0, 3.6);
    await R.move(p.x, p.y, 0.6);
    await dbl();
    await live(R.time + 1.6);
    await dbl();
    await R.sleep(150);
    const off = await R.page.evaluate(() => window.fp3dPanel.hass.states["light.wohnzimmer_decke"].state !== "on");
    if (off) {
      console.log("double tap on: fallback");
      for (const id of ["light.wohnzimmer_decke", "light.stehlampe", "light.led_band"]) await service("light", "turn_on", { entity_id: id });
    }
    await live(R.time + 1.0);
  }
  await sayOver("Devices with “Ask before switching” – are left out and don't react to swiping either – that was episode 6.");
  await R.move(1100, 700, 1.0);

  // ---------------------------------------------------------------- 4. Blinds, windows, TV
  await chapter("Blinds, windows and TV");
  await sayOver("On a blind or a window, a vertical swipe moves the blind.");
  {
    const p = await point3d("eg", 1.6, 1.6, 0.05);
    await R.move(p.x, p.y, 0.6);
    await R.page.mouse.down();
    await R.move(p.x, p.y + 150, 1.4);
    await R.page.mouse.up();
    await live(R.time + 1.2);
  }
  await sayOver("A long press shows “Up”, “Stop”, “Down”, “Stop”, “Zu” – and fixed positions.");
  {
    const p = await point3d("eg", 1.6, 1.6, 0.05);
    await R.move(p.x, p.y, 0.4);
    await longPress(0.8);
    await R.hold(0.8);
  }
  await sayOver("Venetian blinds with slats also get a slat slider here and in the room panel, as soon as the entity supports it.");
  await R.move(1200, 520, 0.8);
  await R.hold(0.4);
  await sayOver("A tap on the window – frame, glass or blind, it doesn't matter – opens this menu, like here in the kitchen. A window without a blind shows its contact.");
  {
    await away();
    await cam("eg", 6.5, 1.6, { theta: -0.35, phi: 0.78, radius: 9.5, y: 0.6 });
    await R.frame(0.2, 300);
    const p = await point3d("eg", 8.4, 1.6, 0.05);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.hold(1.0);
  }
  await sayOver("TVs, doors and garage doors can be tapped directly as well.");
  {
    await away();
    await cam("eg", 3.0, 1.6, { theta: -0.35, phi: 0.78, radius: 9, y: 0.6 });
    await R.frame(0.2, 300);
    const p = await point3d("eg", 3.0, 1.1, 0.35);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.hold(1.2);
    await away();
  }

  // ---------------------------------------------------------------- 5. The room panel
  await chapter("Das Roomfenster");
  await sayOver("When I tap the room, the camera flies in and the room panel opens on the right. On a phone, and in portrait, it sits at the bottom.");
  await clickLive('button[data-room="wohnen"]', 0.6, 2.2);
  await sayOver("At the top are the name and the room values, below that the devices by type. Under “Light” – every lamp has its switch, brightness, colour temperature and colours.");
  await moveToText("21,4", 0.6, null, "P");
  await R.hold(0.4);
  {
    const sl = await panelSliders();
    const b = sl[4] ?? sl[0];
    await R.move(b.x + b.w * 0.6, b.y, 0.6);
    await R.drag(b.x + b.w * 0.9, b.y, 0.9);
  }
  await sayOver("“All off” – switches off all the room's lights. When they're all off, it says “All on”.");
  await R.moveTo({ text: "All off", exact: true }, 0.6);
  await R.hold(0.6);
  await sayOver("Blinds have “Up”, “Stop”, “Down” and the position, and with several of them also “All up” and “All down”.");
  await R.moveTo({ text: "Stop", exact: true }, 0.6);
  await R.hold(0.6);
  await sayOver("Further down: the heating with target temperature and mode, media with volume, switches, cameras with a still picture, sensors, and the area's scenes and scripts.");
  await panelWheel(500, 1.2);
  await R.hold(0.6);
  await panelWheel(700, 1.4);
  await R.hold(0.6);
  await sayOver("The room panel shows the devices placed in the room on the plan, plus everything you added with the star in the editor. “More devices of the area” – shows the rest.");
  await panelWheel(1500, 1.0);
  {
    // the panel's last row sits partly under the switch bar: click its right end, which stays free
    const m = await R.locate({ text: "More devices of the area" }).catch(() => null);
    if (m) {
      await R.move(m.x + m.w / 2 - 25, m.y, 0.6);
      await R.click();
      await R.hold(0.6);
      await panelWheel(400, 0.6);
    } else console.log("no “More devices of the area”");
  }
  await sayOver("A tap on a device name opens its details from Home Assistant, the cross at the top closes the panel.");
  await panelWheel(-4000, 1.0);
  await moveToText("Ceiling light", 0.5, null, "BUTTON");
  await R.hold(0.5);
  await R.clickOn('button[aria-label="Close"]', 0.6);
  await live(R.time + 0.8);
  await sayOver("In the dashboard card you can turn the room panel off. Then the room's scenes and scripts appear as buttons at the bottom – more about that in episode 11.");
  await R.move(960, 990, 1.0);

  // ---------------------------------------------------------------- 6. The star
  await chapter("The star: central menu and favourites");
  await sayOver("The star at the bottom left opens the central menu: all lights on or off and all blinds up or down – for the floor you're looking at.");
  await R.clickOn(STAR, 0.7);
  await R.hold(0.5);
  await R.clickOn({ text: "Off", exact: true }, 0.6);
  await live(R.time + 1.2);
  await R.clickOn({ text: "On", exact: true }, 0.5);
  await live(R.time + 0.8);
  await sayOver("In the house view it applies to the whole house. Then the button first asks “Sure?” – and only a second tap runs it. Garage doors don't count as blinds here.");
  await R.clickOn({ text: "All floors", exact: true, nth: 0 }, 0.6);
  await live(R.time + 1.0);
  await R.clickOn(STAR, 0.6);
  await R.hold(0.4);
  await R.clickOn({ text: "Off", exact: true }, 0.6);
  await R.hold(1.6);
  await sayOver("Below are your favourites: scenes, scripts, automations, buttons and switches. A tap starts the scene or toggles the switch.");
  await R.clickOn({ text: "Living room Film", exact: true }, 0.6);
  await R.hold(0.6);
  await moveToText("Gute Tot", 0.5, null, "BUTTON");
  await sayOver("And at the very bottom your own buttons: they open a dashboard page or an entity's details, call a service, or open a popup with your own card. A button lights up while its entity is on.");
  await moveToText("Blinds", 0.6, null, "BUTTON");
  await R.hold(0.6);
  await moveToText("Energy", 0.5, null, "BUTTON");
  await R.hold(0.6);
  await R.clickOn(STAR, 0.6);

  // ---------------------------------------------------------------- 7. Search
  await chapter("Search: Where is …?");
  await sayOver("The magnifier below it opens “Where is …?”. Type a device name or a room …");
  await R.clickOn(FIND, 0.6);
  await R.clickOn('input[type="search"]', 0.4);
  await R.type("Stehl", 0.12);
  await R.hold(0.6);
  await sayOver("… a tap on the result flies the camera there, and the device bleft.");
  await moveToText("Floor lamp", 0.5, null, "W");
  await R.click();
  await live(R.time + 2.6);
  await sayOver("If the result is a room, the room opens right away.");
  await R.clickOn(FIND, 0.6);
  await R.clickOn('input[type="search"]', 0.4);
  await R.type("Kids", 0.1);
  await R.hold(0.4);
  await moveToText("Kids' room", 0.5, null, "W");
  await R.click();
  await live(R.time + 1.0);

  // ---------------------------------------------------------------- 8. Warnings
  await chapter("Warnings");
  await fresh("alerts");
  await quiet('button[data-floor="eg"]', 2000);
  await sayOver("NeonPlan warns you for free and without any setup. Here the kitchen smoke detector reports smoke: the room pulses red, and a banner appears at the top.");
  await R.move(960, 560, 0.4);
  await live(R.time + 1.0);
  await moveToText("Smoke", 0.7, null, "BUTTON");
  await live(R.time + 1.0);
  await sayOver("A tap on the warning jumps into the room.");
  await R.click();
  await live(R.time + 2.0);
  await sayOver("There are warnings for smoke, gas, carbon monoxide and water, for a triggered alarm system, and for open windows in the rain – like the kitchen window right now.");
  await moveToText("Rain", 0.7, null, "BUTTON");
  await live(R.time + 1.6);
  await sayOver("The rain warning uses the weather entity from the plan's settings. There you can also turn it off on its own, under “Warning: window open while it rains”.");
  await live(R.time + 1.0);

  // ---------------------------------------------------------------- 9. Sun and daylight
  await chapter("Sun and daylight");
  await fresh();
  await quiet('button[data-floor="eg"]', 1500);
  // cut walls: the sun patch on the bedroom floor is not hidden behind the wall
  await quiet({ text: "Cut", exact: true }, 600);
  await noMotion();
  await cam("eg", 2.2, 6.3, { theta: 0, phi: 0.85, radius: 9, y: 0.3 });
  await R.sleep(800);
  await sayOver("If the north direction is set in the editor, sunlight from Home Assistant falls through the windows facing the sun – as soft patches on the floor, like here in the bedroom.");
  await glide("eg", 2.2, 6.3, { theta: 0, phi: 0.85, radius: 9, y: 0.3 }, { theta: 0.45, phi: 0.75, radius: 8, y: 0.3 }, 3.0);
  await sayOver("Lowered blinds make the patches smaller. And in the daytime the sky behind the house gets brighter.");
  await glide("eg", 2.2, 6.3, { theta: 0.45, phi: 0.75, radius: 8, y: 0.3 }, { theta: 0.45, phi: 1.05, radius: 16, y: 0.3 }, 2.6);
  await sayOver("If you don't like the patches, turn them off in the settings with “Sunlight through the windows”.");
  await live(R.time + 0.8);

  // ---------------------------------------------------------------- 10. Cameras in 3D
  await chapter("Cameras in 3D");
  await cam("eg", 1.6, 1.6, { theta: -0.75, phi: 0.72, radius: 6.8, y: 0.6 });
  await R.sleep(700);
  await sayOver("A tap on a camera or on its view cone opens the still picture. It refreshes every few seconds, and the cone is the much bigger target.");
  {
    const p = await point3d("eg", 1.2, 0.02, 1.3);
    await R.move(p.x, p.y, 0.7);
    await R.click();
    await R.hold(1.0);
  }
  await sayOver("Tapping the picture opens the live view from Home Assistant.");
  await R.moveTo(".qm-camera", 0.6).catch(() => {});
  await R.hold(0.6);
  await away();

  // ---------------------------------------------------------------- 11. Start views
  await chapter("Start view for house, floor and room");
  await sayOver("Finally, the start views. You set them in the editor, with “3D beside”.");
  await R.clickOn({ text: "Editor", exact: true }, 0.6);
  await R.sleep(1200);
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await live(R.time + 1.6);
  await sayOver("For the whole house, turn the 3D view on the right until you like the picture – for example from the garden side.");
  {
    const c = await paneCentre();
    await R.move(c.x + 160, c.y + 120, 0.5);
    await ringHere();
    // the turn itself: a smooth glide of the pane's camera while the cursor drags
    const a = await paneView();
    const b = { theta: a.theta + 2.2, phi: 0.95, radius: 24 };
    for (let i = 1, n = FAST ? 2 : 35; i <= n; i++) {
      const k = ease(i / n);
      await pane("eg", 6.8, 4.6, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0 });
      await R.page.evaluate((x, y) => {
        const c = document.getElementById("tut-cursor");
        if (c) c.style.transform = `translate(${x - 4}px, ${y - 2}px)`;
      }, c.x + 160 - 360 * k, c.y + 120);
      await R.frame(1 / FPS, 40);
    }
    await R.move(c.x - 200, c.y + 120, 0.01);
  }
  await sayOver("Then, at the bottom of the sidebar, open “Start view” – and click “Remember the current 3D view as the start”. That's how the 3D view, the card and the kiosk open the house.");
  await R.move(1760, 700, 0.5);
  await R.scrollTo("Start view", 300, 0.8);
  await R.clickOn({ text: "Start view", exact: true }, 0.5);
  await R.hold(0.4);
  await R.clickOn({ text: "Remember the current 3D view as the start", exact: true }, 0.6);
  await R.hold(0.6);
  await sayOver("Below it is the line for a card's YAML, in case a card should start differently. “Default” – takes your own start view back.");
  await R.moveTo(".fp3d-code", 0.6).catch(() => {});
  await R.hold(0.6);
  await R.moveTo({ text: "Default", exact: true }, 0.5);
  await sayOver("For a floor there's “View as this floor's start” at the top – you know it from episode 3.");
  await R.move(1760, 500, 0.4);
  await R.scrollTo("View as this floor's start", 450, 0.8);
  await R.moveTo({ text: "View as this floor's start", exact: true }, 0.5);
  await R.hold(0.6);
  await sayOver("And for a room: tap the room, turn the 3D view onto the room and zoom in …");
  await R.clickOn({ text: "Living room", nth: 0 }, 0.6).catch(async () => {
    await R.editor(`e.selectItem("room", "wohnen");`);
  });
  if ((await R.editor(`return e._roomId;`)) !== "wohnen") await R.editor(`e.selectItem("room", "wohnen");`);
  await R.frame(0.2, 400);
  {
    const c = await paneCentre();
    await R.move(c.x, c.y, 0.5);
    const a = await paneView();
    const b = { theta: -0.55, phi: 0.78, radius: 9 };
    for (let i = 1, n = FAST ? 2 : 40; i <= n; i++) {
      const k = ease(i / n);
      await pane("eg", 3, 2.3, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: 0.5 });
      await R.frame(1 / FPS, 40);
    }
  }
  await sayOver("… then “View as this room's start”. The arrow next to it removes it again.");
  await R.move(1760, 500, 0.4);
  await R.scrollTo("View als Start des Rooms", 520, 0.8);
  await R.clickOn({ text: "View als Start des Rooms", exact: true }, 0.5);
  await R.hold(0.4);
  await R.moveTo('button[title="Remove the room\'s start view (from above again)"]', 0.5).catch(() => {});
  await R.hold(0.5);
  await sayOver("Under “Favourites” – you decide what appears in the star, plus your own buttons.");
  await R.clickOn({ text: "Back zur Floor" }, 0.5);
  await R.frame(0.1, 300);
  {
    const fav = () =>
      R.page.evaluate(() => {
        const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
        const sm = [...e.renderRoot.querySelectorAll("summary")].find((x) => x.textContent.trim().startsWith("Favourites"));
        if (!sm) return null;
        const r = sm.getBoundingClientRect();
        return { x: r.left + 60, y: r.top + r.height / 2 };
      });
    await R.move(1760, 700, 0.4);
    let f = await fav();
    if (f) {
      const n = FAST ? 2 : 20;
      const total = f.y - 200;
      let done = 0;
      for (let i = 1; i <= n; i++) {
        const step = Math.round(total * ease(i / n)) - done;
        done += step;
        if (step) await R.page.mouse.wheel({ deltaY: step });
        await R.frame(1 / FPS, 30);
      }
      f = await fav();
      await R.move(f.x, f.y, 0.5);
      await R.click();
      await R.hold(0.4);
      await R.move(f.x + 60, f.y + 260, 0.8);
    } else console.log("no Favourites summary");
  }
  await sayOver("Back in 3D: a tap on the living room – and the camera flies to exactly this view.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1200);
  await clickLive({ text: "Living room", exact: true, nth: 0 }, 0.6, 2.6);

  // ---------------------------------------------------------------- 12. Outro
  await chapter("Zusammenfassung");
  await catchUp();
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const a = { theta: -0.6, phi: 0.95, radius: 28 };
    const b = { theta: 0.4, phi: 0.85, radius: 24 };
    await cam(null, 0, 0, a);
    await R.sleep(700);
    const end = await line("In short: tapping switches, swiping dims, a long press opens the quick menu. Plus the room panel, the star, the search and the warnings.");
    await glide(null, 0, 0, a, b, end - R.time);
  }
  await R.title("Next episode: dashboard card and wall tablet", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  {
    let end = await line("In the next episode we bring the 3D view into the dashboard as a card, and onto the wall tablet.");
    await live(end);
    end = await line("Left to the online demo and the manual are in the description. And HomePlan 3D also runs on old wall tablets. See you next time!");
    await live(end + 0.6);
  }
}

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
