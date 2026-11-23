// Tutorial episode 12 – "Settings, backup and moving", the last episode of the series, in two parts:
//   a) All Settings: where the sections are, “exterior wall” / “Interior wall” / “Grid”, “North” and
//      “Sunlight through the windows”, the simple “Roof” (pointing to episodes 7 and 8), “Weather entity”, the
//      weather effects (Weather outside in one sentence) and the rain warning, “Start view”, “Favourites”, “Eigene
//      buttons” with every action, “Broadcasters and playlists” (Sound & Cinema in one sentence), “🔒 Floor plan”, and pointers
//      to “Template (floor plan image)”, the energy tool and the language.
//   b) backup, moving and data protection: undo / redo, restore points, “Export” / “Als Template teilen” /
//      “Import …” (and what happens to areas and devices on another Home Assistant), “Full backup”, moving to
//      a new Home Assistant step by step, local JSON pack files, what NeonPlan stores locally (manual chapter 11),
//      help left, and the end of the series.
// The full demo house (invented data, mock Home Assistant). Setup steps before a scene are invisible. The preview
// has no full-backup commands: this script answers them in the page (export: the plan and the installed local packs;
// import: the plan and those pack files back). Packs are plain JSON files: no signature, no binding to an installation.
// Downloads go into the recording folder, never into the user's Downloads.
// Usage (from frontend/): node tutorials/ep12-einstellungen-sicherung.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep12a/de and …/en, resp. ep12b)
// EP12_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4> --en tutorials/ep12a-narration-en.json

import { mkdirSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { appVersion, FPS, narration, startRecorder } from "./recorder.mjs";

const out = resolve(process.argv[2] ?? "tutorial-ep12");
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP12_FAST;
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;
const DL = join(out, "downloads");
mkdirSync(DL, { recursive: true });

const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
const N = narration(R, process.argv.slice(4));
const { sayOver, chapter, catchUp } = N;
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
// confirm() / alert() of the app: accepted at once (a native dialog is not in the screenshots; fakeDialog shows it)
R.page.on("dialog", (d) => void d.accept());
// exported files land in the recording folder
{
  const cdp = await R.page.createCDPSession();
  await cdp.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: DL });
}

// ---------------------------------------------------------------- helpers
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** sayOver that returns the video time the line ends. */
const line = async (text) => {
  await sayOver(text);
  return R.time + N.length(text);
};
/** Real frames until video time `end` (3D runs), with an optional step per frame. */
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
const EYE = 'button[aria-label="Hide the controls – only the 3D view remains"]';
const STAR = 'button[aria-label="Central: all lights, blinds and favourites"]';
/** The main 3D view's viewer object. */
const VIEWER = `const v = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-view3d"); const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);`;
/** The editor's 3D pane. */
const PANE = `const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor"); const v = e.renderRoot.querySelector("fp3d-view3d"); const viewer = Object.values(v).find((o) => o && o.floors && o.floorMap);`;
/** Set a camera (main view or the editor's pane) around a plan point of a floor (or keep the target: floorId null). */
const camOf = (which, floorId, x, z, c) =>
  R.page.evaluate(
    (SRC, floorId, x, z, c) =>
      new Function("floorId", "x", "z", "c", `${SRC}
        const view = viewer.controls.view;
        if (floorId) {
          const fv = viewer.floorMap.get(floorId);
          const t = fv.group.position.clone().set(x, c.y ?? 0, z);
          fv.group.localToWorld(t);
          view.target.copy(t);
        }
        Object.assign(view, { theta: c.theta, phi: c.phi, radius: c.radius });
        viewer.invalidate();`)(floorId, x, z, c),
    which === "pane" ? PANE : VIEWER,
    floorId,
    x,
    z,
    c,
  );
const camNow = (which = "main") =>
  R.page.evaluate((SRC) => new Function(`${SRC} const w = viewer.controls.view; return { theta: w.theta, phi: w.phi, radius: w.radius };`)(), which === "pane" ? PANE : VIEWER);
/** Glide a camera (main view or pane) while recording. */
const glide = async (which, floorId, x, z, a, b, seconds) => {
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    await camOf(which, floorId, x, z, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k, y: (a.y ?? 0) + ((b.y ?? 0) - (a.y ?? 0)) * k });
    await R.frame(1 / FPS, 40);
  }
};
/** A camera with its target (world coordinates) – main view or pane. */
const camFull = (which = "main") =>
  R.page.evaluate(
    (SRC) => new Function(`${SRC} const w = viewer.controls.view; return { theta: w.theta, phi: w.phi, radius: w.radius, t: [w.target.x, w.target.y, w.target.z] };`)(),
    which === "pane" ? PANE : VIEWER,
  );
/** World point of a plan point (x, height y, z) of a floor. */
const worldOf = (which, floorId, x, y, z) =>
  R.page.evaluate(
    (SRC, floorId, x, y, z) =>
      new Function("floorId", "x", "y", "z", `${SRC} const fv = viewer.floorMap.get(floorId); const p = fv.group.position.clone().set(x, y, z); fv.group.localToWorld(p); return [p.x, p.y, p.z];`)(floorId, x, y, z),
    which === "pane" ? PANE : VIEWER,
    floorId,
    x,
    y,
    z,
  );
/** Glide a camera to b (with target b.t) from where it stands. */
const flyTo = async (which, b, seconds) => {
  const a = await camFull(which);
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    const m = (p, q) => p + (q - p) * k;
    await R.page.evaluate(
      (SRC, c) =>
        new Function("c", `${SRC} const w = viewer.controls.view; w.target.set(c.t[0], c.t[1], c.t[2]); Object.assign(w, { theta: c.theta, phi: c.phi, radius: c.radius }); viewer.invalidate();`)(c),
      which === "pane" ? PANE : VIEWER,
      { theta: m(a.theta, b.theta), phi: m(a.phi, b.phi), radius: m(a.radius, b.radius), t: [0, 1, 2].map((j) => m(a.t[j], b.t[j])) },
    );
    await R.frame(1 / FPS, 40);
  }
};
/** Visible element by its text (through shadow roots), innermost last match or the n-th. */
const textAt = async (text, { exact = true, nth, tags = "H2,H3,H4,P,B,SPAN,A,BUTTON,LABEL,CODE,STRONG,SUMMARY,DIV" } = {}) => {
  const box = await R.page.evaluate(
    (text, exact, nth, tags) => {
      const ok = new Set(tags.split(","));
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      const hits = [];
      for (const el of walk(document)) {
        if (!ok.has(el.tagName)) continue;
        const t = el.textContent.replace(/\s+/g, " ").trim();
        if (exact ? t !== text : !t.includes(text)) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0) hits.push({ x: r.left + Math.min(r.width / 2, 140), y: r.top + Math.min(r.height / 2, 14) });
      }
      return typeof nth === "number" ? (hits[nth] ?? null) : (hits[hits.length - 1] ?? null);
    },
    text,
    exact,
    nth ?? null,
    tags,
  );
  if (!box) throw new Error(`text not found: ${text}`);
  return box;
};
const pointAt = async (text, seconds = 0.5, opts = {}) => {
  const b = await textAt(text, opts);
  await R.move(b.x, b.y, seconds);
  return b;
};
/** Park the cursor on the side panel and scroll a heading / button into view. */
const scrollSide = async (text, top, seconds = 0.6) => {
  await R.move(1780, 640, 0.3);
  await R.scrollTo(text, top, seconds);
};
/** The input of a number field by its label; select its text and type a new value, Enter. */
const setField = async (label, value, seconds = 0.5) => {
  await R.clickOn({ label }, seconds);
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("a");
  await R.page.keyboard.up("Control");
  await R.type(String(value), 0.08);
  await R.key("Enter");
  await R.frame(0.1, 300);
};
/** Click a text field by its label, clear it and type a new text (empty: just clear), Tab. */
const retype = async (label, text, perLetter = 0.05) => {
  await R.clickOn({ label }, 0.5);
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("a");
  await R.page.keyboard.up("Control");
  if (text) await R.type(text, perLetter);
  else await R.key("Delete");
  await R.key("Tab");
  await R.frame(0.1, 150);
};
/** The field of a searchable entity picker by its label. */
const pickerBox = (label) =>
  R.page.evaluate((label) => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    const all = [...walk(document)].filter((el) => el.tagName === "LABEL" && el.querySelector("fp3d-entity-picker") && el.getBoundingClientRect().width > 0);
    const hit = all.filter((el) => el.textContent.replace(/\s+/g, " ").trim().startsWith(label)).pop();
    if (!hit) return null;
    const r = hit.querySelector("fp3d-entity-picker").getBoundingClientRect();
    return { x: r.left + Math.min(120, r.width / 2), y: r.top + r.height / 2 };
  }, label);
/** Pick an entity: click the picker, type a search, click the hit (`option`: start of the entry's text). */
const pickEntity = async (label, search, option, seconds = 0.5) => {
  const b = await pickerBox(label);
  if (!b) throw new Error(`no picker: ${label}`);
  await R.move(b.x, b.y, seconds);
  await R.click();
  await R.frame(0.3, 80);
  if (search) await R.type(search, 0.07);
  await R.frame(0.4, 150);
  const at = await R.page.evaluate((option) => {
    const walk = function* (root) {
      for (const el of root.querySelectorAll("*")) {
        yield el;
        if (el.shadowRoot) yield* walk(el.shadowRoot);
      }
    };
    const li = [...walk(document)].find((el) => el.tagName === "LI" && el.getAttribute("role") === "option" && el.querySelector("span")?.textContent.trim().startsWith(option));
    if (!li) return null;
    const r = li.getBoundingClientRect();
    return { x: r.left + Math.min(90, r.width / 2), y: r.top + r.height / 2 };
  }, option);
  if (!at) throw new Error(`no entity option: ${option}`);
  await R.move(at.x, at.y, 0.45);
  await R.click();
  await R.frame(1 / FPS, 150);
};
/** Open a picker and show its list, then close it again with Escape (nothing changes). */
const peekPicker = async (label, seconds = 0.5, hold = 1.2) => {
  const b = await pickerBox(label);
  await R.move(b.x, b.y, seconds);
  await R.click();
  await R.hold(hold);
  await R.key("Escape");
  await R.frame(0.1, 150);
};
/** The app's confirm()/alert() as a visible box (native dialogs are not in headless screenshots). */
const fakeDialog = (text) =>
  R.page.evaluate((t) => {
    const d = document.createElement("div");
    d.id = "tut-dialog";
    d.style.cssText =
      "position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:2147483644;max-width:640px;padding:22px 26px;border-radius:12px;background:#f4f6fa;color:#111;font:18px/1.4 system-ui,'Segoe UI',sans-serif;box-shadow:0 12px 50px rgba(0,0,0,.6)";
    d.innerHTML = `<div style="font-size:14px;color:#555;margin-bottom:8px">127.0.0.1 says</div>${t}<div style="text-align:right;margin-top:18px"><span style="display:inline-block;padding:7px 22px;border-radius:6px;background:#1a73e8;color:#fff">OK</span></div>`;
    document.body.appendChild(d);
  }, text);
const noDialog = () => R.page.evaluate(() => document.getElementById("tut-dialog")?.remove());
/** Show the fake dialog, hold, click its OK button, close it. */
const dialogOk = async (text, hold = 0.6) => {
  await fakeDialog(text);
  await R.hold(hold);
  const ok = await R.page.evaluate(() => {
    const r = document.querySelector("#tut-dialog span").getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await R.move(ok.x, ok.y, 0.6);
  await R.click();
  await noDialog();
};
/** The browser's download note (headless Chrome shows none): a small chip at the top right for a moment. */
const downloadChip = (name) =>
  R.page.evaluate((name) => {
    document.getElementById("tut-dl")?.remove();
    const d = document.createElement("div");
    d.id = "tut-dl";
    d.style.cssText =
      "position:fixed;right:24px;top:18px;z-index:2147483644;display:flex;gap:12px;align-items:center;padding:12px 18px;border-radius:12px;background:#f4f6fa;color:#111;font:16px/1.3 system-ui,'Segoe UI',sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.55)";
    d.innerHTML = `<span style="font-size:22px">⬇</span><span><b>${name}</b><br><span style="color:#555;font-size:13px">Download abgeschlossen</span></span>`;
    document.body.appendChild(d);
  }, name);
const noChip = () => R.page.evaluate(() => document.getElementById("tut-dl")?.remove());
/** A step card (the moving steps, privacy points): a title and lines, `active` highlights one line. */
const card = (title, lines, active = -1) =>
  R.page.evaluate(
    (title, lines, active) => {
      let c = document.getElementById("tut-card");
      if (!c) {
        c = document.createElement("div");
        c.id = "tut-card";
        c.style.cssText =
          "position:fixed;left:48px;top:120px;z-index:2147483643;width:600px;padding:26px 30px;border-radius:20px;background:rgba(8,16,34,.86);border:1px solid rgba(55,224,255,.55);box-shadow:0 0 40px rgba(55,224,255,.3);color:#eaf6ff;font:22px/1.35 system-ui,'Segoe UI',sans-serif;backdrop-filter:blur(8px)";
        document.body.appendChild(c);
      }
      c.innerHTML =
        `<div style="font-size:30px;font-weight:600;margin-bottom:16px">${title}</div>` +
        lines
          .map(
            (l, i) =>
              `<div style="display:flex;gap:14px;margin:10px 0;padding:8px 12px;border-radius:12px;${i === active ? "background:rgba(55,224,255,.18);color:#fff" : active >= 0 ? "opacity:.55" : ""}"><span style="color:#37e0ff;font-weight:700;min-width:26px">${i + 1}</span><span>${l}</span></div>`,
          )
          .join("");
    },
    title,
    lines,
    active,
  );
const noCard = () => R.page.evaluate(() => document.getElementById("tut-card")?.remove());
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
/** Scroll the side panel back to its top with the wheel. */
const sideTop = async (seconds = 0.5) => {
  await R.move(1780, 600, 0.3);
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 0; i < n; i++) {
    await R.page.mouse.wheel({ deltaY: -4000 / n });
    await R.frame(1 / FPS, 30);
  }
};
/** Run code with the editor (e) – for a clean starting state, never for the steps shown. */
const editorDo = (code) => R.editor(code);
/** Open the 3D view at the house with the stored defaults (a fresh page). */
const fresh = async (query = "") => {
  await R.open(query);
  await R.sleep(800);
};
/** Open the editor (with the 3D pane) and wait. */
const toEditor = async (split = true) => {
  await quiet({ text: "Editor", exact: true }, 1500);
  if (split) await quiet({ text: "3D beside", exact: true }, 2000);
};
/** Open a side-panel section (a <summary>) if it is closed. */
const openSection = async (name, seconds = 0.5, retry = false) => {
  const open = await R.page.evaluate((name) => {
    const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
    const sm = [...e.renderRoot.querySelectorAll("summary")].find((x) => x.textContent.replace(/\s+/g, " ").trim().startsWith(name));
    return sm ? sm.parentElement.open : null;
  }, name);
  if (open === null) throw new Error(`no section: ${name}`);
  const b = await textAt(name, { exact: false, tags: "SUMMARY" }).catch(() => null);
  if ((!b || b.y < 130 || b.y > 1066) && !retry) {
    await toSection(name, 200, 0.6);
    return openSection(name, seconds, true);
  }
  if (!b) throw new Error(`section not visible: ${name}`);
  await R.move(b.x, b.y, seconds);
  if (!open) await R.click();
  await R.frame(0.1, 300);
  // a section low in the panel: bring its content up
  if (!open && b.y > 600) await toSection(name, 180, 0.6);
};
/** Close a side-panel section quietly. */
const closeSection = (name) =>
  R.page.evaluate((name) => {
    const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
    const sm = [...e.renderRoot.querySelectorAll("summary")].find((x) => x.textContent.replace(/\s+/g, " ").trim().startsWith(name));
    if (sm) sm.parentElement.open = false;
  }, name);
/** Scroll a side-panel section's summary to `top` px with the wheel. */
const toSection = async (name, top = 150, seconds = 0.7) => {
  await R.move(1780, 640, 0.3);
  const y = await R.page.evaluate((name) => {
    const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
    const sm = [...e.renderRoot.querySelectorAll("summary")].find((x) => x.textContent.replace(/\s+/g, " ").trim().startsWith(name));
    return sm ? sm.getBoundingClientRect().top : null;
  }, name);
  if (y == null) throw new Error(`no section: ${name}`);
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  const total = y - top;
  let done = 0;
  for (let i = 1; i <= n; i++) {
    const step = Math.round(total * ease(i / n)) - done;
    done += step;
    if (step) await R.page.mouse.wheel({ deltaY: step });
    await R.frame(1 / FPS, 30);
  }
  await R.frame(1 / FPS, 120);
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
    const a = { theta: d.theta - 0.6, phi: d.phi + 0.04, radius: d.radius * 1.05 };
    const b = { theta: d.theta + 0.35, phi: d.phi - 0.04, radius: d.radius * 0.92 };
    await camOf("main", null, 0, 0, a);
    await R.sleep(1200);
    await R.title("Settings, backup and moving", `HomePlan 3D · Episode 12 · part 1${VERSION}`);
    const l1 = "Wall thickness, north, weather, favourites and your own buttons: with the settings you fit HomePlan 3D to your home.";
    const l2 = "In this episode I go through every setting with you.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease((t1 - t0 + (i / n) * (end - t1)) / total);
        await camOf("main", null, 0, 0, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
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
  await sayOver("Episode 12 is the last episode of the series and has two parts. Part 1 is about all the settings in the editor.");
  await R.move(1300, 420, 1.4);
  await R.move(900, 640, 1.4);
  await sayOver("Part 2 shows backups, moving to a new Home Assistant, and which data NeonPlan stores. Once again I use the demo house from the online demo.");
  await R.move(1200, 500, 1.6);

  // ---------------------------------------------------------------- 3. Where
  await chapter("Where the settings are");
  await sayOver("You find everything in the Editor tab. At the top I switch on “3D beside” – so you see every change in 3D right away.");
  await R.clickOn({ text: "Editor", exact: true }, 0.6);
  await R.sleep(1200);
  await R.hold(0.4);
  await R.clickOn({ text: "3D beside", exact: true }, 0.6);
  await live(R.time + 1.6);
  await sayOver("At the very bottom of the sidebar on the right there are sections that fold open: Start view, Favourites, the Template, Settings – “Settings” – and Backup – “Backup”.");
  await toSection("Start view", 300, 1.0);
  for (const name of ["Start view", "Favourites", "Template", "Settings", "Backup"]) {
    await pointAt(name, 0.45, { exact: false, tags: "SUMMARY" });
    await R.hold(0.25);
  }
  await sayOver("Everything here applies to the whole plan – so also to the dashboard card, the kiosk and every wall tablet.");
  await R.move(1500, 520, 1.0);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 4. Walls and grid
  await chapter("Wall thicknesses and grid");
  await sayOver("I open Settings. At the top are the thicknesses for all walls: “Exterior wall” and “Interior wall”, in metres.");
  await openSection("Settings", 0.5);
  await toSection("Settings", 120, 0.8);
  await R.moveTo({ label: "exterior wall (m)" }, 0.5);
  await R.hold(0.3);
  await R.moveTo({ label: "Interior wall (m)" }, 0.4);
  await sayOver("The demo house has 24 centimetres outside. I make it 36 – on the right, every exterior wall gets thicker at once.");
  const paneHome = await camFull("pane");
  {
    // close to the living room's outer corner, so the thickness is easy to see
    const t = await worldOf("pane", "eg", 0.4, 0.6, 4.4);
    await R.move(1150, 600, 0.5);
    await flyTo("pane", { theta: paneHome.theta, phi: 0.5, radius: 9, t }, 1.4);
  }
  await setField("exterior wall (m)", "0.36", 0.5);
  await live(R.time + 1.2);
  await sayOver("A single wall, on the other hand, you set at its room, in the wall heights box with its thickness – that was in episode 2. I go back to 24.");
  await R.hold(1.2);
  await setField("exterior wall (m)", "0.24", 0.5);
  await live(R.time + 0.6);
  await R.move(1150, 600, 0.4);
  await flyTo("pane", paneHome, 1.2);
  await sayOver("Grid – “Grid” – is the step size for drawing: corners snap to this grid, in the demo house every 5 centimetres.");
  await R.moveTo({ label: "Grid (m)" }, 0.5);
  await R.hold(0.6);
  await sayOver("The arrow keys also move the selection by one grid step – with Shift by 10 and with Alt by one centimetre.");
  await R.move(700, 560, 0.8);
  await R.hold(0.4);
  await R.moveTo({ label: "Grid (m)" }, 0.6);
  await sayOver("My tip: keep the grid fine. With half a metre you will hardly hit a real measurement when you trace a plan.");
  await R.hold(0.6);

  // ---------------------------------------------------------------- 5. North and sun
  await chapter("North and sunlight");
  await sayOver("Below that is North – “North”: how many degrees clockwise from the top of the plan is north?");
  await R.moveTo({ label: "North" }, 0.5);
  await R.hold(0.4);
  await sayOver("NeonPlan needs it for the sun: from the sun's position in Home Assistant, light falls through the windows that face the sun.");
  await R.move(620, 520, 1.0);
  await R.hold(0.6);
  await sayOver("If the top of your plan points west, you enter 90 – a map app helps you find the direction.");
  await setField("North", "90", 0.6);
  await sayOver("If the sun comes through the wrong windows, this number is almost always wrong. I set it back to 0.");
  await R.hold(0.6);
  await setField("North", "0", 0.4);
  await sayOver("At the bottom of the section is “Sunlight through the windows”. Without the tick the floor stays free of sun patches.");
  await scrollSide("Sunlight through the windows", 700, 0.8);
  await R.moveTo({ text: "Sunlight through the windows" }, 0.5);
  await R.hold(0.6);
  await sayOver("By the way, closed blinds make the patches smaller, just like in real life.");
  await R.hold(0.6);

  // ---------------------------------------------------------------- 6. Roof
  await chapter("Das einfache Roof");
  await sayOver("Then the “Roof”. Here is the simple roof for the whole house: no roof, flat roof, gable roof – or “Roof sections (custom)”.");
  await toSection("Settings", 120, 0.7);
  await R.pickOption("roof", "Gable roof", 0.5);
  await sayOver("For a gable roof, Ridge – “Ridge” – sets whether the ridge runs along the long or the short side – the short one is typical for a terraced house.");
  await R.moveTo({ label: "Ridge" }, 0.5);
  await R.hold(0.6);
  await sayOver("Then roof pitch in degrees and roof overhang in metres. I set 50 degrees and take a look in the 3D tab.");
  await R.moveTo({ label: "Roof pitch" }, 0.5);
  await R.hold(0.3);
  await R.moveTo({ label: "Roof overhang" }, 0.4);
  await setField("Roof pitch", "50", 0.5);
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1200);
  await live(R.time + 0.6);
  await sayOver("The roof is much steeper now. Back in the editor I set it to 35 degrees again.");
  {
    const a = await camNow();
    await R.move(1000, 640, 0.4);
    await glide("main", null, 0, 0, a, { theta: a.theta + 0.45, phi: a.phi + 0.08, radius: a.radius * 0.95 }, 2.2);
  }
  await R.clickOn({ text: "Editor", exact: true }, 0.6);
  await R.sleep(1000);
  await R.frame(0.1, 200);
  await sayOver("Custom roof sections build the roof from several parts, with hips, dormers and roof windows – episodes 7 and 8 show that.");
  await openSection("Settings", 0.4);
  await toSection("Settings", 120, 0.6);
  await setField("Roof pitch", "35", 0.5);
  await R.moveTo({ label: "Ridge" }, 0.5);
  await R.move(1700, (await R.locate({ label: "Ridge" })).y - 63, 0.4);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 7. Weather
  await chapter("Weather and rain warning");
  await sayOver("On to the weather. Under “Weather entity” you choose where it comes from. “Automatic” takes the first weather entity in Home Assistant.");
  await scrollSide("Warning: window open while it rains", 860, 0.7);
  await peekPicker("Weather entity", 0.5, 1.6);
  await sayOver("Below are the weather effects in 3D: rain, snow, fog, clouds, lightning, sun and moon. You can switch off each effect on its own.");
  for (const name of ["Rain", "Snow", "Fog (greys the scene)", "Clouds dim the sky and the sun", "Lightning in storms", "Sun and moon in the sky"]) {
    await R.moveTo({ text: name, exact: true }, 0.35);
    await R.hold(0.15);
  }
  await sayOver("Fog is off at first, because it greys the whole scene. On the Tablet quality level only the dimming by clouds remains.");
  await R.moveTo({ text: "Fog (greys the scene)", exact: true }, 0.5);
  await R.hold(0.6);
  await sayOver("The weather around the house comes with the Pro add-on Weather outside. The warning below it is free.");
  await R.moveTo({ text: "Sun and moon in the sky", exact: true }, 0.5);
  await R.hold(0.4);
  await sayOver("“Warning: window open while it rains”: if the weather entity reports rain and a window is open, the room pulses red. If you don't need it, untick it here.");
  await R.moveTo({ text: "Warning: window open while it rains" }, 0.5);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 8. Start view
  await chapter("Start view");
  await closeSection("Settings");
  await sayOver("Further up is the start view: you turn the house on the right the way it should open, and press “Remember the current 3D view as the start”.");
  await toSection("Start view", 300, 0.8);
  await openSection("Start view", 0.4);
  await R.moveTo({ text: "Remember the current 3D view as the start", exact: true }, 0.5);
  await R.hold(0.5);
  await sayOver("That applies to the 3D view, the card and the kiosk; Default – “Default” – takes it back. Episode 10 shows start views for floors and rooms.");
  await R.move(1500, 520, 1.0);
  await R.hold(0.6);
  await closeSection("Start view");

  // ---------------------------------------------------------------- 9. Favourites
  await chapter("Favourites");
  await sayOver("Under Favourites – “Favourites” – you set what is in the star of the 3D view: scenes, scripts, automations, buttons and switches.");
  await toSection("Favourites", 160, 0.6);
  await openSection("Favourites", 0.4);
  await R.hold(0.6);
  await sayOver("Typical ones are party mode, presence simulation, shading or watering the garden.");
  await pointAt("Szenen, Skripte, Automationen", 0.8, { exact: false, tags: "P" });
  await R.hold(0.4);
  await sayOver("In “Add a favourite” you just start typing and pick the match. I take the script “Living room all off”.");
  await pickEntity("Add a favourite", "all", "Living room everything off", 0.5);
  await sayOver("The arrows change the order, the cross removes a favourite again.");
  {
    // the buttons of the newest favourite row
    const favBtn = (txt) =>
      R.page.evaluate((txt) => {
        const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
        const sm = [...e.renderRoot.querySelectorAll("summary")].find((x) => x.textContent.trim().startsWith("Favourites"));
        const rows = [...sm.parentElement.querySelectorAll(":scope > .fp3d-dev-row")];
        const el = [...rows[rows.length - 1].querySelectorAll("button")].find((b) => b.textContent.trim() === txt);
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }, txt);
    let b = await favBtn("↑");
    await R.move(b.x, b.y, 0.5);
    await R.click();
    await R.hold(0.4);
    b = await favBtn("✕");
    await R.move(b.x, b.y, 0.4);
    await R.hold(0.6);
  }

  // ---------------------------------------------------------------- 10. Own buttons
  await chapter("Own buttons");
  await sayOver("Below are your “Own buttons” – in the star they appear below the favourites. “+ Own button” adds a new one.");
  await scrollSide("+ Own button", 760, 0.8);
  await R.clickOn({ text: "+ Own button" }, 0.5);
  await R.hold(0.3);
  await scrollSide("+ Own button", 860, 0.6);
  await sayOver("It gets a label and an action. “Open a path” – jumps to a dashboard, for example your garden page.");
  {
    // the new button's form is the last one
    const lbl = await R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const forms = [...e.renderRoot.querySelectorAll(".fp3d-own-button")].filter((f) => f.querySelector("select"));
      const f = forms[forms.length - 1];
      const r = f.querySelector('input[type="text"]').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(lbl.x, lbl.y, 0.5);
    await R.click();
    await R.page.keyboard.down("Control");
    await R.page.keyboard.press("a");
    await R.page.keyboard.up("Control");
    await R.type("Garden", 0.08);
    await R.key("Tab");
  }
  await R.pickOption("Action", "Open a path", 0.5);
  await R.clickOn({ label: "Path" }, 0.5);
  await R.type("/lovelace/garden", 0.05);
  await R.key("Tab");
  await sayOver("“Entity details” opens a device's dialog from Home Assistant, for example the living room blind.");
  await R.pickOption("Action", "Entity details", 0.5);
  await retype("Entity", "cover.wohnzimmer");
  await sayOver("“Call a service” runs a service. Below go its data in JSON format, for example which script should run.");
  await R.pickOption("Action", "Call a service", 0.5);
  await retype("Service (domain.service)", "script.turn_on");
  await retype("Data (JSON)", '{"entity_id": "script.gute_nacht"}', 0.035);
  await sayOver("And fire-dom-event, together with browser_mod, opens a popup with your own card – for example all blinds at a glance.");
  await retype("Data (JSON)", "", 0.03);
  await R.pickOption("Action", "fire-dom-event (browser_mod)", 0.5);
  await R.moveTo({ label: "Data (JSON)" }, 0.5);
  await R.hold(0.6);
  await sayOver("For my garden button I stay with “Open a path”. The icon is a Material Design icon, here a flower.");
  await R.pickOption("Action", "Open a path", 0.5);
  await R.clickOn({ label: "Path" }, 0.4);
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("a");
  await R.page.keyboard.up("Control");
  await R.type("/lovelace/garden", 0.04);
  await R.key("Tab");
  {
    const icons = await R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const forms = [...e.renderRoot.querySelectorAll(".fp3d-own-button")].filter((f) => f.querySelector("select"));
      const f = forms[forms.length - 1];
      const r = f.querySelector(".fp3d-icon-row input").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(icons.x, icons.y, 0.5);
    await R.click();
    await R.type("flower", 0.08);
    await R.key("Tab");
  }
  await sayOver("The arrow moves a button up, “Delete” removes it.");
  await scrollSide("+ Own button", 860, 0.5);
  {
    const btn = async (txt) => {
      const b = await R.page.evaluate((txt) => {
        const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
        const forms = [...e.renderRoot.querySelectorAll(".fp3d-own-button")].filter((f) => f.querySelector("select"));
        const f = forms[forms.length - 1];
        const el = [...f.querySelectorAll("button")].find((x) => x.textContent.trim() === txt);
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }, txt);
      await R.move(b.x, b.y, 0.5);
    };
    await btn("↑");
    await R.hold(0.4);
    await btn("Delete");
    await R.hold(0.6);
  }
  await sayOver("In the 3D view the star now opens the favourites and below them your own buttons – with my new garden button.");
  await R.clickOn({ text: "3D", exact: true, nth: 0 }, 0.6);
  await R.sleep(1200);
  await R.clickOn(STAR, 0.7);
  await live(R.time + 1.6);
  await sayOver("At the very bottom of the favourites there are also stations and playlists. They belong to the Pro add-on Sound & Cinema.");
  await R.clickOn({ text: "Editor", exact: true }, 0.6);
  await R.sleep(1000);
  await R.frame(0.1, 200);
  await openSection("Favourites", 0.4);
  await scrollSide("Broadcasters and playlists (Sound & Cinema)", 500, 0.8);
  await pointAt("Broadcasters and playlists (Sound & Cinema)", 0.5, { tags: "H4" });
  await R.hold(0.6);
  await closeSection("Favourites");

  // ---------------------------------------------------------------- 11. Plan lock
  await chapter("Lock the floor plan");
  await sayOver("Once the floor plan is done, you lock it: at the top of the toolbar, “Floor plan” with the lock.");
  await R.clickOn({ text: "🔒 Floor plan", exact: true }, 0.7);
  await R.hold(0.5);
  await sayOver("Then rooms, walls, doors, windows and outdoor areas can no longer be moved by accident – not even newly drawn ones.");
  {
    const p = await R.planPoint(3.5, 5.2);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.hold(0.4);
    await R.drag(p.x + 140, p.y + 60, 1.2);
  }
  await sayOver("Dragging on a room now only moves the view. Selecting and changing things in the form still works.");
  await R.hold(0.6);
  await sayOver("The room shows “Floor plan locked” – one click on it unlocks again. A right-click on a room does it too.");
  await sideTop(0.5);
  await R.moveTo({ text: "Floor plan locked" }, 0.5);
  await R.hold(0.6);
  {
    const p = await R.planPoint(3.5, 5.2);
    await R.move(p.x, p.y, 0.6);
    await R.page.evaluate(() => {
      const c = document.getElementById("tut-cursor").style.transform.match(/-?[\d.]+/g).map(Number);
      const r = document.createElement("div");
      r.id = "tut-ring";
      r.style.left = `${c[0] + 4}px`;
      r.style.top = `${c[1] + 2}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 500);
    });
    await R.page.mouse.click(p.x, p.y, { button: "right" });
    for (let i = 0; i < 8; i++) await R.frame(1 / FPS, 25);
    await R.hold(0.8);
    await R.key("Escape");
  }
  await sayOver("Furniture and devices stay free. You fix them one by one with the lock in the form or with the L key – like in episode 4.");
  await R.clickOn({ text: "🔒 Floor plan", exact: true }, 0.6);
  await R.hold(0.8);

  // ---------------------------------------------------------------- 12. Elsewhere
  await chapter("Was woanders steht");
  await sayOver("Two things live elsewhere: the floor plan picture under Template – “Template” – you know from episode 2.");
  await R.clickOn({ text: "Back zur Floor" }, 0.5).catch(() => {});
  await toSection("Template", 400, 0.7);
  await pointAt("Template", 0.5, { exact: false, tags: "SUMMARY" });
  await R.hold(0.6);
  await sayOver("And the sensors for grid, solar and battery go into the Energy tool – “Energy” – there is an episode of its own for that.");
  await R.moveTo({ text: "Energy", exact: true, nth: 0 }, 0.7);
  await R.hold(0.8);
  await sayOver("You don't set the language here: NeonPlan follows your profile in Home Assistant.");
  await R.move(1100, 560, 1.0);
  await R.hold(0.6);

  // ---------------------------------------------------------------- 13. Outro
  await chapter("Wie geht es weiter");
  await catchUp();
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const d = await camNow();
    const a = { theta: d.theta - 0.5, phi: d.phi, radius: d.radius * 1.08 };
    const b = { theta: d.theta + 0.4, phi: d.phi - 0.05, radius: d.radius * 0.95 };
    await camOf("main", null, 0, 0, a);
    await R.sleep(700);
    const end = await line("In short: walls, grid, north, roof, weather, start view, favourites and your own buttons – all at the bottom of the editor's sidebar.");
    await glide("main", null, 0, 0, a, b, end - R.time);
  }
  await R.title("part 2: backup, moving and data protection", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  {
    let end = await line("In part 2 you back up your plan and move it to a new Home Assistant.");
    await live(end);
    end = await line("Left to the online demo and the manual are in the description. And HomePlan 3D also runs on old wall tablets. See you in part 2!");
    await live(end + 0.6);
  }
}

// ================================================================ part b
if (PART === "b") {
  /** The editor's notice line (restored, imported) as a screen point, or null. */
  const noticeBox = () =>
    R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const n = e.renderRoot.querySelector(".fp3d-notice");
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return r.width ? { x: r.left + Math.min(140, r.width / 2), y: r.top + r.height / 2 } : null;
    });
  /**
   * The preview has no full-backup commands: answer them in the page like a fresh Home Assistant would (export: the
   * plan and the installed local packs; import: the plan and those pack files back). Packs are plain JSON files:
   * no signature, no binding to an installation.
   */
  const mockBackup = () =>
    R.page.evaluate(async () => {
      const p = window.fp3dPanel;
      const h = p.hass;
      const orig = h.callWS;
      h.callWS = async (m) => {
        if (m.type === "homeplan3d/backup/export") {
          const { building } = await orig({ type: "homeplan3d/building/get" });
          return { format: "homeplan3d-backup", version: 1, building, packs: [{ id: "demo.living" }, { id: "demo.kitchen" }, { id: "demo.furniture" }] };
        }
        if (m.type === "homeplan3d/backup/import") {
          await orig({ type: "homeplan3d/history/snapshot" });
          await orig({ type: "homeplan3d/building/save", building: m.building });
          return { building: m.building, packs: 3 };
        }
        return orig(m);
      };
    });
  /** The newest file in the download folder with this start of its name. */
  const downloaded = async (start) => {
    for (let i = 0; i < 40; i++) {
      const f = readdirSync(DL).filter((x) => x.startsWith(start) && x.endsWith(".json"));
      if (f.length) return join(DL, f[f.length - 1]);
      await R.sleep(150);
    }
    throw new Error(`no download: ${start}`);
  };

  // ---------------------------------------------------------------- 1. Teaser
  await chapter("Teaser");
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const d = await camNow();
    const a = { theta: d.theta + 0.5, phi: d.phi + 0.05, radius: d.radius * 1.08 };
    const b = { theta: d.theta - 0.4, phi: d.phi - 0.03, radius: d.radius * 0.9 };
    await camOf("main", null, 0, 0, a);
    await R.sleep(1200);
    await R.title("Settings, backup and moving", `HomePlan 3D · Episode 12 · part 2${VERSION}`);
    const l1 = "One click too many, a new Home Assistant or new hardware – your plan won't get lost.";
    const l2 = "In part 2 I show you backups, importing and moving.";
    const total = N.length(l1) + N.length(l2);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease((t1 - t0 + (i / n) * (end - t1)) / total);
        await camOf("main", null, 0, 0, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
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
  await mockBackup();
  await toEditor(false);
  await R.move(960, 560, 0.01);
  await sayOver("Part 1 showed all the settings. Now it's about undo, restore points, the three kinds of files, moving and privacy.");
  await R.move(700, 120, 1.4);
  await R.move(1700, 700, 1.6);
  await sayOver("And at the end a few words to close this series.");
  await R.move(900, 560, 1.2);

  // ---------------------------------------------------------------- 3. Undo
  await chapter("Undo and redo");
  await sayOver("Ridge things first: if you move a room by accident …");
  {
    const p = await R.planPoint(3.5, 5.2);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await R.drag(p.x + 120, p.y + 90, 1.2);
  }
  await sayOver("… “Undo” at the top of the toolbar brings it back. “Redo” does it again.");
  await R.clickOn({ text: "Undo", exact: true }, 0.6);
  await R.hold(0.6);
  await R.clickOn({ text: "Redo", exact: true }, 0.5);
  await R.hold(0.5);
  await sayOver("It's quicker with Ctrl+Z – and holding Shift as well, you redo.");
  await R.move(700, 560, 0.6);
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("z");
  await R.page.keyboard.up("Control");
  await R.frame(0.1, 200);
  await R.hold(0.8);
  await sayOver("That works for everything you are editing right now. For older states there are the restore points.");
  await R.move(1400, 300, 0.8);
  await R.hold(0.4);

  // ---------------------------------------------------------------- 4. Restore points
  await chapter("Restore points");
  await sayOver("They are at the very bottom of the sidebar, in the Backup section – “Backup”.");
  await R.clickOn({ text: "Back zur Floor" }, 0.5).catch(() => {});
  await toSection("Backup", 200, 0.9);
  await openSection("Backup", 0.4);
  await R.hold(0.4);
  await sayOver("While you edit, a restore point – “Wiederherstellungspunkt” – is kept at most every 10 minutes, and the last 20 stay. Each row shows the time, the rooms and the furniture.");
  await pointAt("Restore points", 0.5, { tags: "H4" });
  await R.hold(0.6);
  await pointAt("Rooms,", 0.5, { exact: false, tags: "SPAN" });
  await R.hold(0.6);
  await sayOver("Restore – “Restore” – brings a state back, after asking you first. The current state is kept as a point itself, so you lose nothing.");
  await R.moveTo({ text: "Restore", exact: true }, 0.5);
  await R.hold(1.0);

  // ---------------------------------------------------------------- 5. Export
  await chapter("Export and share as template");
  await sayOver("Below that is File. Export – “Export” – saves the plan with all its left: rooms, furniture, devices and sensors.");
  await pointAt("File", 0.5, { tags: "H4" });
  await R.clickOn({ text: "Export", exact: true }, 0.5);
  await R.sleep(500);
  await downloadChip(basename(await downloaded("homeplan3d-backup")));
  await R.hold(1.0);
  await sayOver("Pictures are not included, it says so below. For the pictures there is the full backup in a moment.");
  await noChip();
  await pointAt("Background images are not part of the file.", 0.5, { tags: "P" });
  await R.hold(0.6);
  await sayOver("“Share as template” – leaves out everything that belongs to your Home Assistant: areas, devices, sensors and pictures.");
  await R.clickOn({ text: "Als Template teilen", exact: true }, 0.5);
  await R.sleep(500);
  const template = await downloaded("homeplan3d-template");
  await downloadChip(basename(template));
  await R.hold(0.8);
  await sayOver("That's the file for a friend, for a forum or for a bug report – without your devices.");
  await R.hold(0.6);
  await noChip();

  // ---------------------------------------------------------------- 6. Import
  await chapter("Import – and what happens to areas");
  await sayOver("Import – “Import” – loads such a file. I take the template from just now.");
  {
    const box = await R.locate({ text: "Import …", exact: true });
    await R.move(box.x, box.y, 0.5);
    // the confirm is shown as a box first; the app's own confirm is answered "yes" by the dialog handler
    await ringHere();
  }
  await sayOver("NeonPlan asks first: the whole floor plan is replaced, and the current state stays as a restore point.");
  await dialogOk("Replace the whole floor plan with the file? The current state is kept as a restore point.", 1.6);
  {
    const [chooser] = await Promise.all([
      R.page.waitForFileChooser(),
      R.page.evaluate(() => {
        const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
        const label = [...e.renderRoot.querySelectorAll("label.fp3d-upload")].find((l) => l.textContent.trim().startsWith("Import"));
        label.querySelector("input").click();
      }),
    ]);
    await chooser.accept([template]);
    await R.frame(0.3, 900);
  }
  await sayOver("This is what a template looks like: rooms, walls, doors and furniture are there – but no devices and no left.");
  {
    const c = await R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const r = e.renderRoot.querySelector("svg").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(c.x, c.y, 0.8);
    await R.hold(0.6);
  }
  await sayOver("The same happens on another Home Assistant: left go through the areas and entities. If they have the same names there, everything is connected right away.");
  await R.hold(0.6);
  await sayOver("Otherwise you pick the area – “Area” – again for each room, and its devices are back in the list.");
  {
    await scrollSide("Rooms", 400, 0.5).catch(() => {});
    await R.clickOn({ text: "Living room" }, 0.6);
    await R.frame(0.2, 300);
    await R.pickOption("Area", "Living room", 0.5);
    await R.hold(0.4);
    await scrollSide("Devices", 260, 0.8).catch(() => console.log("no Devices heading"));
    await R.hold(0.6);
  }
  await sayOver("Back to the old state? Under restore points there is now the point from just before the import.");
  await sideTop(0.5);
  await R.clickOn({ text: "Back zur Floor" }, 0.5);
  await toSection("Backup", 200, 0.8);
  await openSection("Backup", 0.3);
  await R.hold(0.3);
  const restoreBox = await R.moveTo({ text: "Restore", exact: true, nth: 0 }, 0.5);
  await sayOver("Restore – and the demo house is complete again, with all its devices.");
  await ringHere();
  {
    // the newest point is the one taken right before the import; its time as the row shows it
    const time = await R.page.evaluate(() => {
      const e = document.querySelector("homeplan3d-panel").shadowRoot.querySelector("fp3d-editor");
      const row = [...e.renderRoot.querySelectorAll(".fp3d-dev-row")].find((r) => r.textContent.includes("Restore"));
      return row ? row.querySelector("span").textContent.split("·")[0].trim() : "";
    });
    await dialogOk(`Restore the state from ${time}? The current state is kept as a restore point.`, 0.8);
  }
  // the real click after the shown dialog (its own confirm is answered "yes")
  await R.page.mouse.click(restoreBox.x, restoreBox.y);
  await R.frame(0.3, 1200);
  await live(R.time + 1.0);

  // ---------------------------------------------------------------- 7. Full backup
  await chapter("Full backup");
  await sayOver("For everything at once there is the full backup – “Full backup”. “Back up everything” – saves the plan, every background and screen picture and the installed packs.");
  await toSection("Backup", 200, 0.6);
  await openSection("Backup", 0.3);
  await pointAt("Full backup", 0.5, { tags: "H4" });
  await R.clickOn({ text: "Back up everything (plan, pictures, packs)", exact: true }, 0.5);
  const full = await downloaded("homeplan3d-full");
  await downloadChip(basename(full));
  await R.hold(0.8);
  await sayOver("The file stays local and contains only your plan, the pictures and the installed packs.");
  await pointAt("A file with the plan", 0.5, { exact: false, tags: "P" });
  await noChip();
  await R.hold(0.4);
  await sayOver("“Restore a full backup” – plays it back, into the same or another installation. Here too NeonPlan asks first.");
  await R.moveTo({ text: "Restore a full backup …", exact: true }, 0.5);
  await R.hold(0.6);
  await sayOver("The packs are local JSON files. They come back unchanged – no signature and no binding to a device.");
  await R.hold(0.8);
  await sayOver("By the way: the normal Home Assistant backup also saves HomePlan 3D completely.");
  await R.hold(0.6);

  // ---------------------------------------------------------------- 8. Moving
  await chapter("Moving to a new Home Assistant");
  const STEPS = [
    "Altes System: “Back up everything”",
    "New system: install HomePlan 3D through HACS, add the integration, create areas",
    "Editor › Backup › “Restore a full backup …”",
  ];
  await sayOver("Now moving, for example to a new mini PC. The easiest way is to restore your Home Assistant backup on the new hardware – then NeonPlan is there with everything.");
  await card("Path 1: the Home Assistant backup", ["Restore it on the new hardware – HomePlan 3D comes with the plan, images and packs"], 0);
  await R.move(1100, 560, 1.2);
  await R.hold(0.6);
  await sayOver("If you start fresh, it takes three steps. One: on the old system, “Back up everything”.");
  await card("Path 2: neu anfangen", STEPS, 0);
  await R.moveTo({ text: "Back up everything (plan, pictures, packs)", exact: true }, 0.6);
  await R.hold(0.6);
  await sayOver("Two: on the new system you install HomePlan 3D through HACS, add the integration and create your areas.");
  await card("Path 2: neu anfangen", STEPS, 1);
  await R.hold(0.8);
  await sayOver("Three: in the editor, under Backup, restore the full backup.");
  await card("Path 2: neu anfangen", STEPS, 2);
  {
    const [chooser] = await Promise.all([R.page.waitForFileChooser(), R.clickOn({ text: "Restore a full backup …", exact: true }, 0.5)]);
    await noCard();
    await dialogOk("Replace the plan, the pictures and the packs with the backup? The current state stays as a restore point.", 0.8);
    await chooser.accept([full]);
    await R.frame(0.3, 1500);
  }
  await sayOver("The message at the top tells you what came back – the plan, the pictures and all the local packs are there again.");
  {
    await sideTop(0.6);
    const n = await noticeBox();
    if (n) await R.move(n.x, n.y, 0.6);
    else console.log("no notice after the full backup");
    await R.hold(1.0);
  }
  await sayOver("Your own modules are local files too. An admin approves their code on the Extensions page – “Extensions” – before it runs.");
  await card("Local files", ["Pack files and modules stay on your installation", "Moduless code only runs after approval by an admin"], 0);
  await R.move(1100, 560, 1.2);
  await R.hold(0.8);
  await noCard();

  // ---------------------------------------------------------------- 9. Privacy
  await chapter("Data and data protection");
  await fresh();
  await quiet(EYE, 600);
  await R.hideCursor();
  {
    const d = await camNow();
    const a = { theta: d.theta - 0.5, phi: d.phi, radius: d.radius * 1.1 };
    const b = { theta: d.theta + 0.2, phi: d.phi - 0.03, radius: d.radius * 1.02 };
    await camOf("main", null, 0, 0, a);
    await R.sleep(600);
    const PRIV = ["Plan, images and packs: in Home Assistant under .storage", "No message to an external service: everything stays local", "Camera images, history, states: stay in Home Assistant"];
    const l1 = "And what does NeonPlan store where? Plan, pictures and packs live in Home Assistant, in the .storage folder. None of it leaves your installation.";
    const l2 = "Diagnostics reports stay local as well: you can view them in the editor and delete them again. Nothing goes to an external service.";
    const l3 = "Camera pictures, history and states stay in Home Assistant and are only shown in your browser.";
    const total = N.length(l1) + N.length(l2) + N.length(l3);
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease((t1 - t0 + (i / n) * (end - t1)) / total);
        await camOf("main", null, 0, 0, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
        await R.frame(1 / FPS, 15);
      }
    };
    await card("Data and data protection", PRIV, 0);
    await step(await line(l1));
    await card("Data and data protection", PRIV, 1);
    await step(await line(l2));
    await card("Data and data protection", PRIV, 2);
    await step(await line(l3));
    await noCard();
  }

  // ---------------------------------------------------------------- 10. Help
  await chapter("Help and feedback");
  await fresh();
  await R.hideCursor(false);
  await toEditor(false);
  await R.move(1500, 600, 0.01);
  await sayOver("If something goes wrong, the sidebar has Help and feedback: “Report a problem” – opens an issue on GitHub, “Propose an idea” a discussion.");
  await toSection("Template", 700, 0.9);
  await pointAt("Help and feedback", 0.5, { tags: "H3" });
  await R.hold(0.3);
  await R.moveTo({ text: "Report a problem" }, 0.5);
  await R.hold(0.4);
  await R.moveTo({ text: "Propose an idea" }, 0.5);
  await R.hold(0.6);

  // ---------------------------------------------------------------- 11. End of the series
  await chapter("End of the series");
  await catchUp();
  await fresh();
  await R.hideCursor();
  await quiet(EYE, 700);
  {
    const d = await camNow();
    const a = { theta: d.theta - 0.7, phi: d.phi + 0.04, radius: d.radius * 1.1 };
    const b = { theta: d.theta + 0.2, phi: d.phi - 0.03, radius: d.radius * 1.0 };
    await camOf("main", null, 0, 0, a);
    await R.sleep(700);
    const l1 = "That was the last episode of the series. From the first room to moving house, you now know every button in HomePlan 3D.";
    const l2 = "Thanks for watching along! You find every episode in the playlist “HomePlan 3D – Tutorials”.";
    const l3 = "Left to the online demo, the manual and GitHub for bug reports are in the description.";
    const l4 = "And remember: HomePlan 3D also runs on old wall tablets. See you soon!";
    const total = N.length(l1) + N.length(l2) + N.length(l3) + N.length(l4) + 0.6;
    const t0 = R.time;
    const step = async (end) => {
      const t1 = R.time;
      const n = Math.max(1, Math.round((end - t1) * FPS));
      for (let i = 1; i <= n; i++) {
        const k = ease(Math.min(1, (t1 - t0 + (i / n) * (end - t1)) / total));
        await camOf("main", null, 0, 0, { theta: a.theta + (b.theta - a.theta) * k, phi: a.phi + (b.phi - a.phi) * k, radius: a.radius + (b.radius - a.radius) * k });
        await R.frame(1 / FPS, 15);
      }
    };
    await step(await line(l1));
    await R.title("Thanks for watching!", `Playlist “HomePlan 3D – Tutorials”`);
    await step(await line(l2));
    await R.title("Demo · Manual · GitHub", `Left in the description`);
    await step(await line(l3));
    await R.title("HomePlan 3D", `also runs on old wall tablets${VERSION}`);
    await step((await line(l4)) + 0.6);
  }
}

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
