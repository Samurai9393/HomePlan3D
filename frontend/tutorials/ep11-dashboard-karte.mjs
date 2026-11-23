// Tutorial episode 11 – "Dashboard card and wall tablet" (manual chapters 8 and 9), in two parts (the checklist does
// not fit into 8 minutes):
//   a) Creating and configuring the card: adding the card in Home Assistant (said over the card editor), then every
//      option of the visual card editor from the top: Floor, Size, Height, Look, Accent colour, Walls, Quality, Floors
//      darunter, Markers, Heatmap, power flow, Holograms, Switches in the card (and which), Stern, eigene Names,
//      hidden controls / hide after, mini views, room names, energy values, room details,
//      Full screen button, Floors apart, Roof ausblenden, and the section “Features” (Warnings, Sprung, Szenen,
//      Motion trail, Camera wall, Weather with its entity).
//   b) YAML, kiosk and old wall tablets: the section “Wall tablet (kiosk)” (idle return, screensaver turn, night
//      dimming by the sun or a time range, a button to a dashboard), the YAML code with the options that exist only
//      there (room, floor, start_view, controls_side, keep_view, buttons, free seconds), the performance display (no
//      drawing while idle), the quality level Tablet (pixel ratio 1, half-rate animations), Auto on weak devices, tips
//      for wall tablets, the card on a wall tablet in landscape and portrait.
// The preview's card mode (`preview/index.html?card`: the visual editor left, the card right, like Home Assistant's
// card dialog) with the invented demo house. The page is shown at 125 % (CSS 1536 × 864, screenshots 1920 × 1080).
// Usage (from frontend/): node tutorials/ep11-dashboard-karte.mjs <out-dir> a|b [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep11a/de and …/en, resp. ep11b)
// EP11_FAST=1: a quick dry run for checking the steps (the timing is not usable).
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4> --en tutorials/ep11a-narration-en.json

import { FPS, narration, startRecorder } from "./recorder.mjs";

const out = process.argv[2] ?? "tutorial-ep11";
const PART = process.argv[3] === "b" ? "b" : "a";
const FAST = !!process.env.EP11_FAST;
// controls_side and keep_view (shown in part 2) come with 1.12.7
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D 1.12.7</span>`;

// ---------------------------------------------------------------- recorder
const R = await startRecorder({ outDir: out, width: 1536, height: 864, lang: "en" });
// 125 %: the editor's small labels stay readable in the video
await R.page.setViewport({ width: 1536, height: 864, deviceScaleFactor: 1.25 });
const N = narration(R, process.argv.slice(4));
const { say, sayOver, chapter, catchUp } = N;
if (FAST) {
  const { move, type } = R;
  R.move = (x, y) => move(x, y, 0.04);
  R.type = (text) => type(text, 0.01);
}
for (const ev of ["uncaughtException", "unhandledRejection"]) {
  process.on(ev, async (err) => {
    console.error(err);
    await R.finish().catch(() => {});
    process.exit(1);
  });
}
R.page.on("dialog", (d) => void d.accept());
await R.page.evaluateOnNewDocument(() => {
  try {
    localStorage.clear();
  } catch {
    // no storage
  }
});

// ---------------------------------------------------------------- helpers
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** Real frames until video time `end` (the card flies, effects run), with an optional step per frame. */
const live = async (end, each = null) => {
  const n = Math.max(1, Math.round((end - R.time) * FPS));
  for (let i = 1; i <= n; i++) {
    if (each) await each(i, n);
    await R.frame(1 / FPS, 15);
  }
};
const liveFor = (seconds, each) => live(R.time + seconds, each);
/** The card's 3D view and its viewer, as code for page.evaluate. */
const VIEWER = `const card = window.fp3dCard; const v = card.shadowRoot.querySelector("fp3d-view3d"); const viewer = v && Object.values(v).find((o) => o && o.floors && o.floorMap);`;
const inCard = (code, ...args) => R.page.evaluate((VIEWER, code, args) => new Function("args", `${VIEWER} ${code}`)(args), VIEWER, code, args);
/** The camera of the card (theta, phi, radius, target). */
const camNow = () => inCard(`const w = viewer.controls.view; return { theta: w.theta, phi: w.phi, radius: w.radius, target: { x: w.target.x, y: w.target.y, z: w.target.z } };`);
const setCam = (c) =>
  inCard(
    `const c = args[0]; const w = viewer.controls.view; w.theta = c.theta; w.phi = c.phi; w.radius = c.radius; if (c.target) w.target.set(c.target.x, c.target.y, c.target.z); viewer.invalidate();`,
    c,
  );
/** Glide the card's camera from where it stands by dTheta and a radius factor. */
const orbit = async (dTheta, factor = 1, seconds = 2, dPhi = 0) => {
  const a = await camNow();
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    await setCam({ theta: a.theta + dTheta * k, phi: a.phi + dPhi * k, radius: a.radius * (1 + (factor - 1) * k) });
    await R.frame(1 / FPS, 40);
  }
};
/** Screen point of a plan point (x, height y, z) of a floor in the card. */
const point3d = (floorId, x, y, z) =>
  inCard(
    `const [floorId, x, y, z] = args; const fv = viewer.floorMap.get(floorId); const p = fv.group.position.clone().set(x, y, z); fv.group.localToWorld(p); p.project(viewer.camera);
     const c = (v.renderRoot ?? v.shadowRoot).querySelector("canvas").getBoundingClientRect(); return { x: c.left + ((p.x + 1) / 2) * c.width, y: c.top + ((1 - p.y) / 2) * c.height };`,
    floorId,
    x,
    y,
    z,
  );
/** Tap a room of the card in 3D and let the flight run. */
const tapRoom = async (floorId, x, z, seconds = 0.5, flight = 1.4) => {
  const p = await point3d(floorId, x, 0.05, z);
  await R.move(p.x, p.y, seconds);
  await R.click();
  await liveFor(flight);
};
/** The configuration: set in the card and in the editor (invisible – for clean starting states only). */
const setCfg = (cfg) =>
  R.page.evaluate((cfg) => {
    window.fp3dCard._roomId = null;
    window.fp3dCard.setConfig(cfg);
    document.querySelector("homeplan3d-card-editor").setConfig(cfg);
  }, cfg);
const getCfg = () => R.page.evaluate(() => ({ ...document.querySelector("homeplan3d-card-editor")._config }));
/** A state of the mock Home Assistant (invented entities only), for the card and the editor. */
const setState = (id, state, attributes) =>
  R.page.evaluate(
    (id, state, attributes) => {
      const card = window.fp3dCard;
      const hass = card.hass;
      const old = hass.states[id];
      const states = { ...hass.states, [id]: { entity_id: id, ...(old ?? {}), state, attributes: { ...(old?.attributes ?? {}), ...(attributes ?? {}) } } };
      card.hass = { ...hass, states };
      document.querySelector("homeplan3d-card-editor").hass = card.hass;
    },
    id,
    state,
    attributes ?? null,
  );
/** Any element whose text contains `text` (innermost, last match): a point on it. */
const textBox = (text, nth = -1) =>
  R.page.evaluate(
    (text, nth) => {
      const walk = function* (root) {
        for (const el of root.querySelectorAll("*")) {
          yield el;
          if (el.shadowRoot) yield* walk(el.shadowRoot);
        }
      };
      const hits = [];
      for (const el of walk(document)) {
        if (!/^(P|SPAN|DIV|LABEL|BUTTON|B|H3|SMALL|CODE)$/.test(el.tagName)) continue;
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("");
        if (!own.includes(text)) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) hits.push(el);
      }
      const hit = nth < 0 ? hits[hits.length - 1] : hits[nth];
      if (!hit) return null;
      const r = hit.getBoundingClientRect();
      return { x: r.left + Math.min(r.width / 2, 110), y: r.top + Math.min(r.height / 2, 12), top: r.top };
    },
    text,
    nth,
  );
const moveToText = async (text, seconds = 0.5, nth = -1) => {
  const b = await textBox(text, nth);
  if (!b) throw new Error(`text not found: ${text}`);
  await R.move(b.x, b.y, seconds);
};
/** Scroll the page (the editor) with the wheel until the text sits `top` pixels from the top. */
const scrollEd = async (text, top = 160, seconds = 0.6) => {
  const cur = await R.page.evaluate(() => {
    const c = document.getElementById("tut-cursor").style.transform.match(/-?[\d.]+/g).map(Number);
    return { x: c[0] + 4, y: c[1] + 2 };
  });
  // the wheel over the card would zoom the 3D view: over the editor
  if (cur.x > 470) await R.move(300, Math.min(Math.max(cur.y, 200), 700), 0.35);
  await R.page.evaluate(() => {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    a?.blur?.();
  });
  const b = await textBox(text, 0);
  if (!b) throw new Error(`text not found: ${text}`);
  const total = b.top - top;
  const n = FAST ? 2 : Math.max(1, Math.round(seconds * FPS));
  let done = 0;
  for (let i = 1; i <= n; i++) {
    const step = Math.round(total * ease(i / n)) - done;
    done += step;
    if (step) await R.page.mouse.wheel({ deltaY: step });
    await R.frame(1 / FPS, 30);
  }
  await R.frame(1 / FPS, 120);
};
/** A select field of the editor whose own label text is exactly `label`: its centre. */
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
/** A click ring at x/y without clicking. */
const ring = async (x, y) => {
  await R.page.evaluate(
    (x, y) => {
      const r = document.createElement("div");
      r.id = "tut-ring";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 500);
    },
    x,
    y,
  );
  for (let i = 0; i < 8; i++) await R.frame(1 / FPS, 25);
};
/** Open a select field: its option list as an overlay (a native dropdown is not in headless screenshots). */
const openList = (label, option) =>
  R.page.evaluate(
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
      document.getElementById("tut-options")?.remove();
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
      o.style.minWidth = `${r.width}px`;
      document.body.appendChild(o);
      const hh = o.getBoundingClientRect().height;
      o.style.top = `${r.bottom + hh + 4 < innerHeight ? r.bottom + 2 : Math.max(4, r.top - hh - 2)}px`;
      if (!hit) return option ? null : { x: 0, y: 0 };
      hit.classList.add("tut-hover");
      const b = hit.getBoundingClientRect();
      return { x: b.left + Math.min(60, b.width / 2), y: b.top + b.height / 2 };
    },
    label,
    option,
  );
const setSelect = (label, option) =>
  R.page.evaluate(
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
/** Pick an option of a select field (its own label text exactly `label`); `hold` keeps the list open a moment. */
const pick = async (label, option, seconds = 0.5, hold = 0.3) => {
  const box = await selBox(label);
  if (!box) throw new Error(`no select: ${label}`);
  await R.move(box.x, box.y, seconds);
  await ring(box.x, box.y);
  const at = await openList(label, option);
  if (!at) throw new Error(`no option: ${label} / ${option}`);
  await R.frame(hold, 60);
  await R.move(at.x, at.y, 0.4);
  await R.click();
  await setSelect(label, option);
  await R.frame(1 / FPS, 250);
};
/** Show a select's option list for a while (the cursor walks down the options), then pick `option`. */
const showList = async (label, option, seconds) => {
  const box = await selBox(label);
  if (!box) throw new Error(`no select: ${label}`);
  await R.move(box.x, box.y, 0.5);
  await ring(box.x, box.y);
  await openList(label, option);
  const pts = await R.page.evaluate(() => [...document.querySelectorAll("#tut-options div")].map((d) => { const b = d.getBoundingClientRect(); return { x: b.left + 50, y: b.top + b.height / 2 }; }));
  const each = Math.max(0.35, (seconds - 0.8) / pts.length);
  for (const p of pts) {
    await R.move(p.x, p.y, Math.min(0.4, each));
    if (each > 0.4) await R.hold(each - 0.4);
  }
  const at = await openList(label, option);
  await R.move(at.x, at.y, 0.4);
  await R.click();
  await setSelect(label, option);
  await R.frame(1 / FPS, 250);
};
/** Click a toggle (checkbox label) of the editor by its text. */
const toggle = async (text, seconds = 0.5) => {
  const b = await R.page.evaluate((text) => {
    const ed = document.querySelector("homeplan3d-card-editor").shadowRoot;
    const l = [...ed.querySelectorAll("label.toggle, label.chip")].find((l) => l.textContent.replace(/\s+/g, " ").trim().startsWith(text));
    if (!l) return null;
    const r = l.querySelector("input").getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, text);
  if (!b) throw new Error(`no toggle: ${text}`);
  await R.move(b.x, b.y, seconds);
  await R.click();
  await R.frame(1 / FPS, 200);
};
/** Type into a text or number field of the editor (by label), then leave it (the change applies). */
const fillField = async (label, value, perLetter = 0.07) => {
  await R.clickOn({ label }, 0.5);
  await R.page.keyboard.down("Control");
  await R.page.keyboard.press("a");
  await R.page.keyboard.up("Control");
  await R.type(value, FAST ? 0.01 : perLetter);
  await R.page.evaluate(() => {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    a?.blur?.();
  });
  await R.frame(1 / FPS, 300);
};
/** A small caption at the top of the card ("a minute later"), or none. */
const caption = (text) =>
  R.page.evaluate((text) => {
    document.getElementById("tut-cap")?.remove();
    if (!text) return;
    const d = document.createElement("div");
    d.id = "tut-cap";
    d.style.cssText =
      "position:fixed;left:50%;top:38px;transform:translateX(-50%);z-index:2147483643;padding:10px 22px;border-radius:12px;background:rgba(8,16,34,.88);border:2px solid #37e0ff;box-shadow:0 0 22px rgba(55,224,255,.45);color:#eaf6ff;font:700 26px/1 system-ui,'Segoe UI',sans-serif";
    d.textContent = text;
    document.body.appendChild(d);
  }, text);
/** A big copy of the card's performance display at the bottom right of the card (the original is tiny). */
const statsCallout = (on = true) =>
  R.page.evaluate((on) => {
    let d = document.getElementById("tut-stats");
    if (!on) return d?.remove();
    const v = window.fp3dCard.shadowRoot.querySelector("fp3d-view3d");
    const s = (v.renderRoot ?? v.shadowRoot).querySelector(".fp3d-stats");
    if (!d) {
      d = document.createElement("div");
      d.id = "tut-stats";
      d.style.cssText =
        "position:fixed;left:660px;top:96px;z-index:2147483643;max-width:820px;padding:10px 18px;border-radius:12px;background:rgba(8,16,34,.9);border:2px solid #37e0ff;box-shadow:0 0 22px rgba(55,224,255,.45);color:#eaf6ff;font:600 21px/1.3 system-ui,'Segoe UI',sans-serif";
      document.body.appendChild(d);
    }
    d.textContent = s ? s.textContent.replace(/\s+/g, " ").trim() : "";
  }, on);
const park = () => R.page.mouse.move(250, 40);

// ---------------------------------------------------------------- the page
/** The preview's card mode at 125 %: the editor left (scrolls with the page), the card right (stays). */
const start = async (cfg = { type: "custom:homeplan3d-card" }) => {
  await R.open("card");
  await R.page.evaluate((cfg) => {
    const card = window.fp3dCard;
    const wrap = card.parentElement;
    wrap.style.gridTemplateColumns = "460px 1fr";
    wrap.style.alignItems = "start";
    wrap.firstElementChild.style.marginBottom = "520px";
    card.style.cssText = "position:sticky;top:24px;display:block";
    window.scrollTo(0, 0);
  }, cfg);
  await setCfg(cfg);
  await R.sleep(3500);
};
/** The card alone, dressed as a wall tablet (only the picture around it; the card is unchanged). */
const tablet = async (cfg, portrait = false) => {
  await R.page.evaluate(
    (cfg, portrait) => {
      const card = window.fp3dCard;
      const old = document.querySelector(".tut-bezel");
      const wrap = old ? old.parentElement : card.parentElement;
      if (old) {
        old.replaceWith(card);
      }
      document.getElementById("tut-yaml-box")?.remove();
      wrap.firstElementChild.style.display = "none";
      wrap.style.cssText += ";display:flex;align-items:center;justify-content:center;height:100vh;box-sizing:border-box;padding:0;background:radial-gradient(circle at 50% 40%, #1b2638, #070b14)";
      const bezel = document.createElement("div");
      bezel.className = "tut-bezel";
      bezel.style.cssText = "padding:28px;border-radius:38px;background:#0d0f13;box-shadow:0 30px 80px rgba(0,0,0,.7), inset 0 0 0 2px #2a2f38";
      const screen = document.createElement("div");
      screen.className = "tut-screen";
      const [w, h] = portrait ? [470, 760] : [1200, 750];
      screen.style.cssText = `width:${w}px;height:${h}px;border-radius:10px;overflow:hidden;background:#000`;
      card.style.cssText = "display:block";
      card.replaceWith(bezel);
      bezel.append(screen);
      screen.append(card);
      window.scrollTo(0, 0);
      card._roomId = null;
      card.setConfig({ ...cfg, height: h });
    },
    cfg,
    portrait,
  );
  await R.sleep(3500);
};

// ---------------------------------------------------------------- YAML code view
const YAML_STYLE = `#tut-yaml-box { background:#1c1c1c; border-radius:12px; padding:16px 0 18px; font: 15px/1.55 Consolas, "Cascadia Mono", monospace; color:#d4d4d4; }
  #tut-yaml-box .hd { padding:0 18px 10px; margin-bottom:8px; border-bottom:1px solid rgba(225,225,225,.15); font:600 13px/1.2 system-ui,"Segoe UI",sans-serif; letter-spacing:.04em; text-transform:uppercase; color:#9b9b9b; }
  #tut-yaml-box .ln { padding:0 18px; white-space:pre; min-height:1.55em; transition: background .2s; }
  #tut-yaml-box .ln.hi { background: rgba(55,224,255,.16); box-shadow: inset 3px 0 0 #37e0ff; }
  #tut-yaml-box .k { color:#9cdcfe; } #tut-yaml-box .v { color:#ce9178; } #tut-yaml-box .c { color:#6a9955; }`;
/** The config as YAML lines (flat options, the buttons list nested). */
const toYaml = (cfg) => {
  const lines = [];
  for (const [k, v] of Object.entries(cfg)) {
    if (k === "buttons") {
      lines.push("buttons:");
      for (const b of v) {
        const e = Object.entries(b);
        e.forEach(([bk, bv], i) => lines.push(`${i ? "    " : "  - "}${bk}: ${bv}`));
      }
    } else if (Array.isArray(v)) lines.push(`${k}: [${v.join(", ")}]`);
    else if (v && typeof v === "object") lines.push(`${k}: { ${Object.entries(v).map(([a, b]) => `${a}: ${b}`).join(", ")} }`);
    else lines.push(`${k}: ${v}`);
  }
  return lines;
};
/** Show the code view instead of the visual editor, with these lines. */
const yamlShow = (lines) =>
  R.page.evaluate(
    (lines, style) => {
      const ed = document.querySelector("homeplan3d-card-editor");
      const box = ed.parentElement;
      box.style.display = "none";
      if (!document.getElementById("tut-yaml-style")) {
        const st = document.createElement("style");
        st.id = "tut-yaml-style";
        st.textContent = style;
        document.head.appendChild(st);
      }
      let y = document.getElementById("tut-yaml-box");
      if (!y) {
        y = document.createElement("div");
        y.id = "tut-yaml-box";
        box.after(y);
      }
      y.innerHTML = `<div class="hd">Code-Editor (YAML)</div>`;
      for (const l of lines) {
        const d = document.createElement("div");
        d.className = "ln";
        y.appendChild(d);
        window.tutYamlSet(d, l);
      }
      window.scrollTo(0, 0);
    },
    lines,
    YAML_STYLE,
  );
await R.page.evaluateOnNewDocument(() => {
  // colours a YAML line: key, value, comment
  window.tutYamlSet = (d, l) => {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const m = /^(\s*-?\s*)([\w]+)(:)(.*)$/.exec(l);
    d.innerHTML = m ? `${esc(m[1])}<span class="k">${esc(m[2])}</span>${m[3]}<span class="v">${esc(m[4])}</span>` : esc(l);
    d.dataset.raw = l;
  };
});
/** Type a new YAML line at the end (or after line `after`), letter by letter, highlighted. */
const yamlType = async (text, perLetter = 0.045) => {
  await R.page.evaluate(() => {
    for (const d of document.querySelectorAll("#tut-yaml-box .ln.hi")) d.classList.remove("hi");
    const d = document.createElement("div");
    d.className = "ln hi tut-new";
    document.getElementById("tut-yaml-box").appendChild(d);
  });
  const step = FAST ? text.length : 2;
  for (let i = step; i < text.length + step; i += step) {
    await R.page.evaluate((t) => {
      const d = document.querySelector("#tut-yaml-box .tut-new");
      window.tutYamlSet(d, t);
    }, text.slice(0, i));
    await R.frame(FAST ? 0.01 : perLetter * step, 10);
  }
  await R.page.evaluate(() => document.querySelector("#tut-yaml-box .tut-new")?.classList.remove("tut-new"));
};
/** Highlight the lines whose text starts with one of these keys. */
const yamlMark = (...keys) =>
  R.page.evaluate((keys) => {
    for (const d of document.querySelectorAll("#tut-yaml-box .ln")) d.classList.toggle("hi", keys.some((k) => d.dataset.raw?.trimStart().startsWith(k)));
  }, keys);
/** The end of the typed text of the last line (for the cursor). */
const yamlLastLine = () =>
  R.page.evaluate(() => {
    const all = document.querySelectorAll("#tut-yaml-box .ln");
    const d = all[all.length - 1];
    const r = d.getBoundingClientRect();
    return { x: r.left + Math.min(380, 18 + d.textContent.length * 8.3), y: r.top + r.height / 2 };
  });

// ---------------------------------------------------------------- shared places
const STAR = 'button[aria-label="Central: all lights, blinds and favourites"]';
const EYE_BACK = 'button[aria-label="Show the controls again"]';
// room centres (plan metres) of the demo house
const WOHNEN = ["eg", 3, 2.3];
const KUECHE = ["eg", 8, 2.3];
const BAD = ["eg", 5.6, 6.3];
const KIND = ["og", 2.2, 2.1];
/** The usual config of the card from the middle of part 1 on. */
const BASE = { type: "custom:homeplan3d-card", floor: "eg", height: 760 };

// ================================================================ PART 1: the card and every option of its editor
if (PART === "a") {
  // ---------------------------------------------------------------- teaser
  await chapter("Teaser");
  await start();
  await R.hideCursor();
  await tablet({ type: "custom:homeplan3d-card", controls: true, fullscreen_button: true });
  {
    await setCam({ theta: -0.9, phi: 0.95, radius: 34 });
    await R.frame(0.2, 900);
    await R.title("Dashboard card and wall tablet", `HomePlan 3D · Episode 11 · part 1${VERSION}`);
    const l1 = "HomePlan 3D as a card on your dashboard – and on the wall, on an old tablet, all day long.";
    await sayOver(l1);
    await orbit(0.7, 0.92, N.length(l1));
    await R.untitle();
    const l2 = "In this episode you set up the card. Part one shows every option in the card editor.";
    await sayOver(l2);
    await orbit(0.6, 0.95, N.length(l2));
  }

  // ---------------------------------------------------------------- adding the card
  await chapter("Die Karte anlegen");
  await start();
  await R.hideCursor(false);
  await R.move(700, 420, 0.01);
  await sayOver("You add the card in Home Assistant: edit the dashboard, “Add card”, and search for “NeonPlan”.");
  await R.move(1000, 260, 0.8);
  await liveFor(1.5);
  await sayOver("It comes with the integration and loads by itself. You don't need to add a resource.");
  await R.move(800, 330, 0.8);
  await sayOver("Then this editor opens. All options are on the left, the card is on the right – every change shows at once.");
  await moveToText("View", 0.6, 0);
  await R.hold(1.2);
  await R.move(1000, 250, 0.7);
  await sayOver("Whatever stays at its default, the editor leaves out of the YAML. That keeps the configuration short.");
  await R.move(260, 300, 0.7);

  // ---------------------------------------------------------------- view: floor, size, height
  await chapter("Floor, size and height");
  await sayOver("At the top, the floor. “Whole house” shows every floor, and a tap on a floor opens it.");
  await showList("Floor", "Whole house (tap a floor to open it)", 3);
  await sayOver("Pick a floor and the card starts there – for example on the ground floor.");
  await pick("Floor", "Ground floor");
  await liveFor(1.5);
  await sayOver("Under “Size” you get a fixed height or “Fill the screen”. Filling works best in a dashboard view of the type “Panel”.");
  await pick("Size", "Fill the screen");
  await liveFor(0.6);
  await moveToText("Best on a dashboard view", 0.6);
  await liveFor(1.2);
  await sayOver("With a fixed height you set the height in pixels. I'll take 760 instead of 420.");
  await pick("Size", "Fixed height");
  await fillField("Height (pixels)", "760");
  await liveFor(0.8);

  // ---------------------------------------------------------------- look, accent, walls
  await chapter("Look, accent colour and walls");
  await sayOver("The look: neon, blueprint like a building plan, or day – bright and friendly.");
  await pick("Look", "Blueprint", 0.4, 0.2);
  await liveFor(0.4);
  await pick("Look", "Day", 0.4, 0.2);
  await liveFor(0.4);
  await pick("Look", "Neon", 0.4, 0.2);
  await sayOver("The accent colour, “Accent colour”, gives lines, buttons and pins your colour. “Back to cyan” resets it.");
  {
    const b = await R.page.evaluate(() => {
      const r = document.querySelector("homeplan3d-card-editor").shadowRoot.querySelector('input[type="color"]').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await R.move(b.x, b.y, 0.5);
    await ring(b.x, b.y);
    await R.page.evaluate(() => {
      const i = document.querySelector("homeplan3d-card-editor").shadowRoot.querySelector('input[type="color"]');
      i.value = "#ff8a00";
      i.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    });
    await liveFor(2.2);
    await R.clickOn({ text: "Back to cyan" }, 0.5);
    await liveFor(0.6);
  }
  await sayOver("Walls: “Tall walls” shows them at full height, “Cut” cuts every wall at hip height.");
  await pick("Walls", "Cut");
  await liveFor(1.2);
  await pick("Walls", "Tall walls");
  await liveFor(0.4);

  // ---------------------------------------------------------------- quality, floors below
  await chapter("Quality and floors below");
  await sayOver("“Quality”: Auto, Tablet or High. Auto spots weak devices and then picks the frugal Tablet level by itself.");
  await showList("Quality", "Auto", 3);
  await moveToText("is the most economical setting", 0.6);
  await sayOver("High also shows light cones under spotlights. What Tablet saves exactly, I show you in part two.");
  await R.hold(0.6);
  await sayOver("“Floors below” applies to an opened floor. For this I start on the upper floor for a moment.");
  await pick("Floor", "Upper floor");
  await liveFor(1.4);
  await sayOver("“Dimmed” shows the ground floor dark below it, “Stacked” the whole house up to here, “Hidden” only this floor.");
  await liveFor(0.6);
  await pick("Floors below", "Stacked (the house up to here)");
  await liveFor(1.2);
  await pick("Floors below", "Hidden (only this floor)");
  await liveFor(1.2);
  await pick("Floors below", "Dimmed");
  await catchUp();
  await setCfg(BASE);
  await R.sleep(1500);

  // ---------------------------------------------------------------- markers, heatmap, flows
  await chapter("Markers, heatmap and power flow");
  await sayOver("Under “Show”: markers, “Markers” – none, only the important ones, or every device marker.");
  await scrollEd("Show", 120);
  await pick("Markers", "All");
  await liveFor(1.2);
  await pick("Markers", "Important");
  await sayOver("The heatmap colours the floors by temperature, humidity or CO₂. “Values at the room name” writes the numbers next to it.");
  await pick("Heatmap", "Temperature");
  await liveFor(1.4);
  await pick("Heatmap", "Values at the room names");
  await liveFor(1.4);
  await pick("Heatmap", "Normal");
  await sayOver("Power flow and holograms: always on, always off, or a switch of their own in the card. Both belong to the Energy Pro extension.");
  await pick("power flow", "Always on", 0.4, 0.2);
  await liveFor(0.8);
  await pick("Holograms", "Always on", 0.4, 0.2);
  await liveFor(0.8);
  await pick("power flow", "Switches in the card", 0.4, 0.2);
  await pick("Holograms", "Switches in the card", 0.4, 0.2);

  // ---------------------------------------------------------------- switches in the card
  await chapter("Switches in the card");
  await sayOver("“Switches in the card”, puts a bar at the bottom of the card. Below it you pick which ones: walls, floors, temperature, humidity and CO₂.");
  await scrollEd("Switches in the card", 140);
  await toggle("Switches in the card");
  await liveFor(0.6);
  await moveToText("Floors apart", 0.6, 0);
  await R.hold(0.6);
  await toggle("CO₂");
  await liveFor(0.4);
  await sayOver("In the card you then switch yourself – here to temperature and back again.");
  await R.clickOn({ text: "Temp.", exact: true }, 0.6);
  await liveFor(1.4);
  await R.clickOn({ text: "Normal", exact: true }, 0.5);
  await liveFor(0.3);
  await sayOver("The star with the central menu switches all lights and blinds of the floor and shows your favourites.");
  await R.clickOn(STAR, 0.6);
  await liveFor(1.8);
  await R.clickOn(STAR, 0.4);
  await liveFor(0.2);
  await sayOver("“Own names at the markers” writes the name under every device that has a name of its own.");
  await toggle("Own names at the markers");
  await liveFor(1.8);
  await toggle("Own names at the markers");
  await sayOver("“Start with the controls hidden” shows only the 3D view. The eye at the bottom left brings everything back.");
  await toggle("Start with the controls hidden");
  await liveFor(1.4);
  await R.clickOn(EYE_BACK, 0.7);
  await liveFor(1.0);
  await toggle("Start with the controls hidden");
  await sayOver("“Hide controls after” tidies up the card by itself after a wait, say after ten seconds without a touch.");
  await pick("Hide the controls after", "10 s without a touch");
  await liveFor(0.8);
  await R.move(1420, 120, 0.6);
  await catchUp();
  // the real ten seconds pass without frames
  await R.sleep(FAST ? 10500 : 10500);
  await caption("10 seconds later");
  await sayOver("One touch shows everything again.");
  await liveFor(0.6);
  await R.click();
  await caption(null);
  await liveFor(0.4);
  await pick("Hide the controls after", "Never", 0.4, 0.2);

  // ---------------------------------------------------------------- thumbs, names, panel, full screen
  await chapter("Mini views, room panel and full screen");
  await sayOver("“Floors as miniatures”: small pictures of the floors at the side. With a start floor they're off, but you can turn them on.");
  await scrollEd("Floors as miniatures", 150);
  await toggle("Floors as miniatures");
  await liveFor(1.0);
  await moveToText("The chosen floor is then the start floor", 0.6);
  await liveFor(0.6);
  await sayOver("“Show room names” and “Show energy values at the top” turn the names and the energy values on or off.");
  await toggle("Show room names");
  await liveFor(1.0);
  await toggle("Show room names");
  await toggle("Energywerte top anzeigen");
  await liveFor(1.0);
  await toggle("Energywerte top anzeigen");
  await sayOver("“Room details on tap”: tapping a room opens its room panel with lights, blinds and cameras.");
  await moveToText("Room details on tap", 0.5);
  await R.hold(0.4);
  await tapRoom("eg", WOHNEN[1], WOHNEN[2], 0.5, 1.0);
  await liveFor(0.3);
  await sayOver("Without the tick the room is only selected, and “Back” at the bottom leads out again.");
  await R.clickOn("button.fp3d-rp-close", 0.4);
  await liveFor(0.6);
  await toggle("Room details on tap", 0.4);
  await tapRoom("eg", WOHNEN[1], WOHNEN[2], 0.5, 1.0);
  await liveFor(0.6);
  await R.clickOn({ text: "Back", exact: true }, 0.5);
  await liveFor(0.6);
  await toggle("Room details on tap", 0.4);
  await sayOver("The full-screen button, “Full screen button”, puts a button at the top right that hides the dashboard around the card – handy on a wall tablet.");
  await toggle("Full screen button");
  await liveFor(0.4);
  {
    const b = await R.locate('button[aria-label="Full screen"]');
    await R.move(b.x, b.y, 0.6);
    await R.hold(1.2);
  }
  await sayOver("Pulling the floors apart and fading the roof when you zoom in, you know from the 3D view. The performance display comes in part two.");
  await moveToText("Pull floors apart in the house view", 0.6);
  await R.hold(1.0);
  await moveToText("Fade the roof out while zooming in", 0.5);
  await R.hold(1.0);
  await moveToText("Performance display", 0.5);

  // ---------------------------------------------------------------- features
  await chapter("Features: Warnings, Szenen, Cameras, Weather");
  await sayOver("Under features, “Features”: “Show warnings”. With smoke, water, an alarm or a window open in the rain, the room pulses and a note appears at the top.");
  await scrollEd("Features", 120);
  await moveToText("Show warnings", 0.5);
  await R.hold(1.0);
  await sayOver("With “Jump to the room of a new warning” the card flies there by itself. Here the smoke detector in the kitchen goes off.");
  await setCam({ theta: -0.9, phi: 0.95, radius: 30 });
  await toggle("Jump to the room of a new warning");
  await liveFor(0.6);
  await setState("binary_sensor.kueche_rauch", "on");
  await liveFor(3.2);
  await setState("binary_sensor.kueche_rauch", "off");
  await liveFor(0.4);
  await toggle("Jump to the room of a new warning");
  await setCfg(await getCfg());
  await R.sleep(800);
  await sayOver("“Scene buttons in the room” are the buttons you just saw under the view without the room panel. The room panel has the scenes anyway.");
  await moveToText("Scene buttons in the room", 0.5);
  await R.hold(1.0);
  await sayOver("The motion trail shows where motion was reported in the last half hour, with the time.");
  await toggle("Motion trail");
  await liveFor(2.4);
  await toggle("Motion trail");
  await sayOver("The “Cameras” button at the bottom of the card opens the camera wall with the pictures of every camera.");
  await toggle("Knopf “Cameras”");
  await liveFor(0.4);
  await R.clickOn({ text: "Cameras", exact: true }, 0.6);
  await liveFor(2.0);
  await R.clickOn({ text: "Cameras", exact: true }, 0.5).catch(() => undefined);
  await liveFor(0.4);
  await toggle("Knopf “Cameras”");
  await sayOver("“Weather outside” shows rain, snow and clouds around the house. Below it you pick the weather entity.");
  await scrollEd("Weather outside", 300);
  await toggle("Weather outside");
  await toggle("Weather outside");
  await pick("Weather entity", "Weather");
  await setState("weather.zuhause", "rainy", { cloud_coverage: 85 });
  await liveFor(2.4);
  await sayOver("Motion trail, camera wall and weather are Pro extensions. Without them these switches simply do nothing.");
  await moveToText("Motion trail and weather are Pro extensions", 0.6);
  await liveFor(2.0);

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await setState("weather.zuhause", "sunny");
  await R.hideCursor();
  await tablet({ ...BASE, floor: undefined, controls: true, fullscreen_button: true });
  await setCam({ theta: -0.6, phi: 0.95, radius: 32 });
  await R.title("Part 2: YAML, kiosk and old wall tablets", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  await sayOver("That was part one: adding the card and every option in the editor, from the floor to the features.");
  await orbit(0.5, 0.95, N.length("That was part one: adding the card and every option in the editor, from the floor to the features."));
  await sayOver("Part two is about the wall tablet: kiosk, night dimming, screensaver, YAML and the settings for old tablets.");
  await orbit(0.5, 0.97, N.length("Part two is about the wall tablet: kiosk, night dimming, screensaver, YAML and the settings for old tablets."));
  await say("Left to the online demo and the manual are in the description. See you in part two!");
  await R.hold(0.6);
}

// ================================================================ PART 2: kiosk, YAML, old wall tablets
if (PART === "b") {
  // ---------------------------------------------------------------- teaser
  await chapter("Teaser");
  await start();
  await R.hideCursor();
  await tablet({ ...BASE, floor: undefined, controls_hidden: true, idle_return: 1, idle_orbit: true });
  {
    await setCam({ theta: -0.9, phi: 0.95, radius: 34 });
    await R.title("Dashboard card and wall tablet", `HomePlan 3D · Episode 11 · part 2${VERSION}`);
    const l1 = "An old tablet on the wall: the card returns by itself, turns slowly and dims at night.";
    await sayOver(l1);
    await orbit(0.6, 0.95, N.length(l1) * 0.55);
    await setState("sun.sun", "below_horizon", { elevation: -8 });
    await R.page.evaluate(() => window.fp3dCard.setConfig({ ...window.fp3dCard._config, night: "sun" }));
    await orbit(0.4, 0.97, N.length(l1) * 0.45);
    await R.untitle();
    const l2 = "Part two: the kiosk section, the options that only exist in YAML, and everything for old, weak wall tablets.";
    await sayOver(l2);
    await orbit(0.6, 0.95, N.length(l2));
    await setState("sun.sun", "above_horizon", { elevation: 32 });
  }

  // ---------------------------------------------------------------- idle return and screensaver
  await chapter("Back to the start view and screensaver");
  await start({ ...BASE, controls: true, fullscreen_button: true });
  await R.hideCursor(false);
  await R.move(300, 400, 0.01);
  await sayOver("At the very bottom of the editor is “Wall tablet (kiosk)”. “Back to the start view after”: one, two, five or ten minutes without a touch.");
  await scrollEd("Wall tablet (kiosk)", 110, 0.8);
  await showList("Back to the start view after", "1 min without a touch", 3.2);
  await sayOver("Then the card closes the room and shows the start view again. In the morning the tablet no longer sits in last night's bathroom.");
  await moveToText("After the wait the card closes", 0.6);
  await R.hold(0.6);
  await sayOver("With “Camera turn as screensaver” the house then turns slowly until someone touches the tablet.");
  await toggle("Camera turn as screensaver");
  await liveFor(0.4);
  await catchUp();
  // tap the bath, then a real minute passes without frames
  const tapped = Date.now();
  await sayOver("I tap the bathroom and leave the tablet alone for a minute.");
  await tapRoom("eg", BAD[1], BAD[2]);
  await liveFor(1.4);
  await R.move(300, 560, 0.6);
  await catchUp();
  await R.sleep(Math.max(0, 62000 - (Date.now() - tapped)));
  await caption("a minute later");
  await sayOver("One minute without a touch: the card is back, and the camera turn is running.");
  await liveFor(N.length("One minute without a touch: the card is back, and the camera turn is running."));
  await sayOver("A tap ends it.");
  await R.move(1420, 120, 0.5);
  await R.click();
  await caption(null);
  await liveFor(1.0);

  // ---------------------------------------------------------------- night
  await chapter("Night dimming");
  await sayOver("Night dimming, “Night dimming”, darkens the whole card: “By the sun”, as soon as the sun sets, or in a time range.");
  await showList("Night dimming", "By the sun", 2.6);
  await setState("sun.sun", "below_horizon", { elevation: -8 });
  await liveFor(2.0);
  await sayOver("For the time range you enter the start and the end, for example from 10 pm to 6 am.");
  await setState("sun.sun", "above_horizon", { elevation: 32 });
  await pick("Night dimming", "Time range");
  await liveFor(0.4);
  await fillField("Time range (e.g. 22:00-06:00)", "22:00-06:00");
  await liveFor(0.6);
  await pick("Night dimming", "Off");

  // ---------------------------------------------------------------- dashboard button
  await chapter("Button to a dashboard");
  await sayOver("“Button to a dashboard” puts a button at the top right that opens another view – your home dashboard, say.");
  await fillField("Button to a dashboard (path)", "/lovelace/home", 0.06);
  await liveFor(0.4);
  {
    const b = await R.locate('button[aria-label="/lovelace/home"]');
    await R.move(b.x, b.y, 0.6);
    await R.hold(0.6);
  }
  await sayOver("With “Label of the button” a word stands there. Without one it shows a small house.");
  await fillField("Label of the button", "Start");
  await liveFor(0.4);
  {
    const b = await R.locate('button[aria-label="Start"]');
    await R.move(b.x, b.y, 0.6);
    await R.hold(0.8);
  }

  // ---------------------------------------------------------------- YAML
  await chapter("YAML: options in code only");
  let cfg = await getCfg();
  await sayOver("Everything also works in YAML. In Home Assistant you switch the card dialog to the code editor.");
  await R.move(260, 200, 0.6);
  await yamlShow(toYaml(cfg));
  await liveFor(1.0);
  await sayOver("Every option from the editor has its line there. A few exist only here.");
  await yamlMark("floor", "height", "idle_return", "idle_orbit", "dashboard");
  await liveFor(N.length("Every option from the editor has its line there. A few exist only here.") - 0.2);
  {
    const line = "“room” starts the card in a room – a display for the kids' room. The idle return then leads back there too.";
    await sayOver(line);
    await yamlMark("floor");
    await R.page.evaluate(() => {
      for (const d of document.querySelectorAll("#tut-yaml-box .ln")) if (d.dataset.raw.startsWith("floor:")) window.tutYamlSet(d, "floor: og");
    });
    await liveFor(0.5);
    await yamlType("room: kind");
    cfg = { ...cfg, floor: "og", room: "kind" };
    await setCfg(cfg);
    await liveFor(N.length(line) - 1.6);
  }
  {
    const line = "“start_view” gives the card a start view of its own. The ready-made line is in the editor under settings, “Start view”.";
    await sayOver(line);
    await yamlType("start_view: { theta: 0.8, phi: 1.0, radius: 20 }", 0.03);
    await liveFor(1.0);
  }
  {
    const line = "“controls_side: right” moves the floor pictures, the star, the search and the eye to the right – good when the card sits at the left edge.";
    await sayOver(line);
    cfg = { type: cfg.type, floor: "eg", height: 760, controls: true, floor_thumbs: true };
    await setCfg(cfg);
    await yamlShow(toYaml(cfg));
    await liveFor(1.4);
    await yamlType("controls_side: right");
    await setCfg({ ...cfg, controls_side: "right" });
    cfg = { ...cfg, controls_side: "right" };
    await liveFor(1.6);
  }
  {
    const line = "“keep_view: true” keeps the camera when you switch floors. Only the height moves along.";
    await sayOver(line);
    await yamlType("keep_view: true");
    cfg = { ...cfg, keep_view: true };
    await setCfg(cfg);
    await R.sleep(1500);
    await orbit(0.9, 0.9, 1.2);
    const thumb = await R.locate({ text: "Upper floor", exact: true });
    if (thumb) {
      await R.move(thumb.x, thumb.y, 0.5);
      await R.click();
    }
    await liveFor(1.8);
  }
  {
    const line = "Under “buttons” you put buttons of your own into the star, just for this card: open a page, details, a service or a popup.";
    await sayOver(line);
    await yamlType("buttons:");
    await yamlType("  - label: Garden", 0.035);
    await yamlType("    icon: flower", 0.035);
    await yamlType("    action: navigate", 0.035);
    await yamlType("    target: /lovelace/garden", 0.035);
    cfg = { ...cfg, buttons: [{ label: "Garden", icon: "flower", action: "navigate", target: "/lovelace/garden" }] };
    await setCfg(cfg);
    await R.sleep(800);
    await R.clickOn(STAR, 0.6);
    await liveFor(0.6);
    const b = await textBox("Garden");
    if (b) await R.move(b.x, b.y, 0.5);
    await liveFor(1.0);
  }
  {
    const line = "And “idle_return” or “controls_hide_after” take any number of seconds here, not just the values from the list.";
    await sayOver(line);
    await R.clickOn(STAR, 0.5).catch(() => undefined);
    await yamlType("idle_return: 90");
    await yamlType("controls_hide_after: 45");
    await liveFor(0.8);
  }

  // ---------------------------------------------------------------- old wall tablets
  await chapter("Old and weak wall tablets");
  await start({ ...BASE });
  // a quiet moment in the demo house: no music, the robot docked, no sun on the modules (else they animate)
  for (const id of ["media_player.fernseher", "media_player.kueche_lautsprecher", "media_player.bad_lautsprecher"]) await setState(id, "paused");
  await setState("vacuum.saugi", "docked");
  await setState("light.led_band", "on", { effect: "none" });
  await setState("sensor.pv_leistung", "0");
  await setState("sensor.balkon_leistung", "0");
  await R.sleep(1500);
  await R.move(300, 300, 0.01);
  await sayOver("NeonPlan also runs on old, weak wall tablets. The most important part: no work while idle.");
  await scrollEd("Performance display (frames per second)", 380, 0.6);
  await toggle("Performance display (frames per second)");
  await liveFor(1.5);
  await sayOver("The performance display, “Performance display”, shows it: when nothing moves, the card draws not a single frame – “at rest, zero frames per second”.");
  await R.move(1100, 700, 0.5);
  await statsCallout();
  await liveFor(N.length("The performance display, “Performance display”, shows it: when nothing moves, the card draws not a single frame – “at rest, zero frames per second”.") - 0.8, () => statsCallout());
  {
    const line = "Only when something moves does it draw – and it says why. Here a lamp's colour effect is running.";
    await sayOver(line);
    // the LED strip's colour loop runs: the display says why it draws (mirrored big)
    await R.move(1100, 600, 0.5);
    await setState("light.led_band", "on", { effect: "colorloop" });
    // the display needs a moment of real time to measure (no video time passes)
    await R.sleep(1500);
    await liveFor(3.4, () => statsCallout());
    await setState("light.led_band", "on", { effect: "none" });
    await liveFor(1.0, () => statsCallout());
  }
  await sayOver("The Tablet level saves the most: no patterns, shadows, halos or particles, and animations at half the frame rate.");
  await scrollEd("View", 40, 0.6);
  await pick("Quality", "Tablet");
  await liveFor(1.8, () => statsCallout());
  await sayOver("On top of that it draws with a pixel ratio of one instead of up to two. That's up to four times fewer pixels in every frame.");
  await liveFor(2.5, () => statsCallout());
  await sayOver("On Fire tablets and on devices with little memory or at most four processor cores, Auto picks this level by itself.");
  await pick("Quality", "Auto");
  await liveFor(1.0, () => statsCallout());
  await statsCallout(false);
  await sayOver("My tip: Fully Kiosk Browser with hardware acceleration, the card in a panel view with “Fill the screen”, and leave the quality on Auto.");
  await pick("Size", "Fill the screen");
  await liveFor(0.8);
  await moveToText("Best on a dashboard view", 0.6);
  await liveFor(0.8);
  await sayOver("Which tablets work well is on my recommendation page. The link is in the description.");
  await R.move(1000, 400, 0.6);
  await liveFor(1.0);

  // ---------------------------------------------------------------- on the wall
  await chapter("Am Wall tablet");
  await R.hideCursor();
  await tablet({ ...BASE, floor: undefined, controls_hidden: true, idle_return: 60, idle_orbit: true, quality: "low" });
  await setCam({ theta: -0.8, phi: 0.95, radius: 32 });
  {
    const line = "This is how it looks on a wall tablet: the card filling the screen, the controls hidden, the Tablet level.";
    await sayOver(line);
    await orbit(0.8, 0.92, N.length(line));
  }
  await tablet({ ...BASE, floor: "eg", quality: "low" }, true);
  {
    const line = "In portrait, the room panel appears at the bottom instead of at the side.";
    await sayOver(line);
    await R.hideCursor(false);
    const p = await point3d("eg", WOHNEN[1], 0.05, WOHNEN[2]);
    await R.move(p.x, p.y, 0.6);
    await R.click();
    await liveFor(Math.max(1.5, N.length(line) - 1));
    await R.hideCursor();
  }

  // ---------------------------------------------------------------- outro
  await chapter("Wie geht es weiter");
  await tablet({ ...BASE, floor: undefined, controls: true, fullscreen_button: true });
  await setCam({ theta: -0.6, phi: 0.95, radius: 32 });
  await R.title("Next episode: settings, backup and moving", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
  {
    const l1 = "That was episode eleven: the dashboard card with all its options, the kiosk section, YAML and the wall tablet.";
    await sayOver(l1);
    await orbit(0.5, 0.95, N.length(l1));
    const l2 = "The next episode is about the settings, backups and moving to a new Home Assistant.";
    await sayOver(l2);
    await orbit(0.5, 0.97, N.length(l2));
  }
  await say("Left to the online demo, the manual and the tablet recommendation are in the description. See you next time!");
  await R.hold(0.6);
}

await catchUp();
N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
