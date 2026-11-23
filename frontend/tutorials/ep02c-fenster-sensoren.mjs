// Tutorial episode 2, part 3 – "Windows, sensors and covers": the windows of the traced house (episode 2,
// parts 1 and 2) – two-leaf window, window with bars, a high bathroom window, a two-leaf terrace door, a glass wall –
// sill, styles, the automatic and the hand-picked contacts per leaf, the sensor kinds (contact, handle sensor,
// contact + tilt sensor, tilt angle sensor), blinds with a live position sensor, and everything live in 3D.
// The handle sensor, the tilt angle sensor, the blind level sensor and the bathroom door contact are added to the
// demo's mock Home Assistant at runtime (invented, like the rest of the demo).
// Usage (from frontend/): node tutorials/ep02c-fenster-sensoren.mjs <out-dir> [<voice-dir>] (with durations.json)
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { narration, startRecorder } from "./recorder.mjs";
import { VERSION, fastMode, helpers, tap, traceHouse } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep02c";
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
fastMode(R);
const N = narration(R, process.argv.slice(3));
const { say, sayOver, chapter, catchUp } = N;
const H = helpers(R);
const { fill, tapPlan, pointPlan, scrollSide, pickEntity, pickerMove, view3d, glide3d, setState } = H;

const ENTITIES = [
  ["binary_sensor.bad_tuer", "bad", "off", { friendly_name: "Bathroom door", device_class: "door" }],
  ["sensor.schlafzalways_fenstergriff", "schlafzalways", "closed", { friendly_name: "Bedroom window handle" }],
  ["sensor.schlafzalways_kippwinkel", "schlafzalways", "0", { friendly_name: "Bedroom tilt angle", unit_of_measurement: "°" }],
  ["sensor.wohnzimmer_rollladen_level", "wohnzimmer", "70", { friendly_name: "Living room roller shutter level", unit_of_measurement: "%" }],
];
/** Camera views of the 3D half (plan metres as target). */
const V = {
  // theta 0 looks from the south (plan bottom), pi from the north, -pi/2 from the west; windows from outside
  over: { theta: 0.45, phi: 0.9, radius: 28, target: { x: 7, y: 0.75, z: 4.25 } },
  wtop: { theta: 3.0, phi: 1.05, radius: 10, target: { x: 5.5, y: 1.3, z: 0 } },
  kueche: { theta: 3.25, phi: 1.05, radius: 10, target: { x: 12, y: 1.3, z: 0 } },
  badwin: { theta: 0.15, phi: 1.05, radius: 9, target: { x: 9, y: 1.5, z: 8.5 } },
  terr: { theta: -0.15, phi: 1.05, radius: 10, target: { x: 5.5, y: 1.1, z: 8.5 } },
  glas: { theta: -1.45, phi: 1.05, radius: 10, target: { x: 3.5, y: 1.2, z: 7.25 } },
  schlaf: { theta: 0.1, phi: 1.05, radius: 9, target: { x: 12.25, y: 1.3, z: 8.5 } },
};
let cam = V.over;
const look = async (to, seconds = 1.2) => {
  await glide3d(cam, to, seconds);
  cam = to;
};
const tool = () => R.clickOn({ text: "Door & Window", exact: true }, 0.5);
/** Move a blind (cover, or the number of a level sensor) in steps, so 3D shows it travelling. */
const travel = async (id, from, to, seconds, sensor = false) => {
  const n = Math.max(2, Math.round(seconds * 5));
  for (let i = 1; i <= n; i++) {
    const pos = Math.round(from + ((to - from) * i) / n);
    if (sensor) await setState(id, String(pos));
    else await setState(id, pos > 0 ? "open" : "closed", { current_position: pos });
    await R.hold(seconds / n);
  }
};

// ---------------------------------------------------------------- 0. Teaser
await chapter("Teaser");
await R.open("empty");
await R.hideCursor();
await traceHouse(R, { walls: true, openings: true });
await tap(R, { text: "3D", exact: true });
await R.sleep(2500);
const A = { theta: -0.2, phi: 0.85, radius: 19 };
const B = { theta: 0.5, phi: 0.9, radius: 20 };
await setState("binary_sensor.kueche_fenster", "off");
await R.view(A);
await R.sleep(1200);
await R.title("Floor plan as template – part 3", `HomePlan 3D · Episode 2 · Windows, sensors and shutters${VERSION}`);
await sayOver("Windows that open and tilt live, blinds that move along – today we add the windows.");
await R.glide(A, { theta: 0.1, phi: 0.87, radius: 19.5 }, 2.5);
await setState("binary_sensor.kueche_fenster", "on");
await travel("cover.kueche", 40, 100, 1.5);
await R.untitle();
await sayOver("With every window style, every sensor type and the blind position sensor.");
await R.glide({ theta: 0.1, phi: 0.87, radius: 19.5 }, B, 3.5);

// ---------------------------------------------------------------- 1. Intro
await chapter("Was wir today machen");
await R.open("empty");
await traceHouse(R, { walls: true, openings: "doors" });
await H.addEntities(ENTITIES);
// the bathroom door as part 2 left it (starting state)
await H.editorEval(
  `e.change((doc, f) => { const d = f.openings.find((o) => o.room_id === "flur" && o.edge === 2 && o.offset === 5.5); if (d) Object.assign(d, { contact: "binary_sensor.bad_tuer", mark: "closed" }); });`,
);
await tap(R, { text: "3D beside", exact: true });
await R.sleep(1500);
await H.view2d(58, 25, 330);
await tap(R, { text: "Tall walls", exact: true });
await view3d(V.over);
await R.sleep(1200);
await R.hideCursor(false);
await R.move(700, 560, 0.01);
await sayOver("Part 3: the doors are in – now come the windows, with contacts, handle and tilt sensors, and blinds.");
await R.hold(0.8);
await pointPlan(5.5, 0, 0.6);
await sayOver("On the right, “3D beside” – runs along again, and like in part 2, contacts and blinds come from the room's area.");
await R.move(1240, 520, 0.6);

// ---------------------------------------------------------------- 2. Windows
await chapter("Window einsetzen");
await sayOver("“Doors & windows”, and tap the outer wall of the living room. At first it becomes a front door – so pick “Double window” at the top.");
await tool();
await tapPlan(5.5, 0, 0.7);
await H.sideTop();
await R.hold(0.4);
await R.clickOn({ text: "Double window", exact: true }, 0.5);
await look(V.wtop, 1.3);
await sayOver("Windows also have the “Sill height”: the height of the lower edge above the floor. Plus “Width”, “Centre from corner” and “Height”, just like the doors.");
await R.moveTo({ label: "Sill height" }, 0.5);
await R.hold(0.8);
await R.moveTo({ label: "Width" }, 0.5);
await R.moveTo({ label: "Height" }, 0.5);
await sayOver("Under “Style”: standard, with glazing bars, or a fixed glass wall.");
await R.pickOption("Style", "Default", 0.5);
await sayOver("The “Blind”, has already been found: “Automatic (Living room Blind)”. With two leaves, each leaf has its own sensors – main leaf and second leaf.");
await scrollSide(() => H.pickerBox("Blind"), 380, 0.6);
await pickerMove("Blind", 0.5);
await R.hold(0.6);
await pickerMove("Contact", 0.5, 0);
await R.hold(0.4);
await pickerMove("Contact", 0.5, 1);
await sayOver("The contact says “Automatic (Patio door)” – the first contact in the living room. But this window doesn't have one: “None”.");
await pickerMove("Contact", 0.5, 0);
await R.hold(1.2);
await pickEntity("Contact", "", "None", 0.4, 0);
await sayOver("The kitchen gets a window with glazing bars: tap the wall, “Window” at the top, style “With glazing bars”. The bars divide the glass into small panes.");
await tool();
await tapPlan(12, 0, 0.7);
await H.sideTop();
await R.clickOn({ text: "Window", exact: true }, 0.5);
await look(V.kueche, 1.2);
await R.pickOption("Style", "With glazing bars", 0.5);
await sayOver("NeonPlan finds the contact and the blind in the kitchen area by itself. In the demo the window is open – it stands open in 3D and glows warm.");
await scrollSide(() => H.pickerBox("Blind"), 380, 0.5);
await pickerMove("Blind", 0.5);
await R.hold(0.5);
await pickerMove("Contact", 0.5);
await R.hold(0.6);
await sayOver("In the bathroom the window sits higher: 80 centimetres wide, sill at 1.3 metres, height 0.8. That way nobody can look in from outside.");
await tool();
await tapPlan(9, 8.5, 0.7);
await H.sideTop();
await look(V.badwin, 1.2);
await fill("Width", "0,8");
await fill("Sill height", "1,3");
await fill("Height", "0,8");
await sayOver("Towards the terrace there's a two-leaf terrace door – “French doors” – which is basically a window with a sill height of zero.");
await tool();
await tapPlan(5.5, 8.5, 0.7);
await H.sideTop();
await R.clickOn({ text: "French doors", exact: true }, 0.5);
await look(V.terr, 1.2);
await R.moveTo({ label: "Sill height" }, 0.5);
await sayOver("I pick its contacts by hand: the main leaf gets “Patio door”, the second leaf the “Fixed leaf”.");
await scrollSide(() => H.pickerBox("Blind"), 330, 0.5);
await pickEntity("Contact", "Terrace", "Terrace door ·", 0.5, 0);
await pickEntity("Contact", "fixed", "Terrace door fixed panel", 0.5, 1);
await sayOver("Now the main leaf opens in 3D – and with the second contact, the fixed leaf too.");
await R.hold(1);
await setState("binary_sensor.wohnzimmer_terrasse_2", "on");
await R.hold(1.6);
await setState("binary_sensor.wohnzimmer_terrasse_2", "off");
await sayOver("And on the left, the glass wall: tap the wall, “Glass wall” at the top, “Glass wall”. Fixed, floor to ceiling, no leaves – you set width and height freely.");
await tool();
await tapPlan(3.5, 7.25, 0.7);
await H.sideTop();
await R.clickOn({ text: "Glass wall", exact: true }, 0.5);
await look(V.glas, 1.2);
await R.moveTo({ label: "Width" }, 0.5);
await R.moveTo({ label: "Height" }, 0.5);

// ---------------------------------------------------------------- 3. Sensor kinds
await chapter("Sensor type: contact, handle, tilt");
await sayOver("Now the bedroom. The tool remembered the glass wall – so “Window” at the top, width 1.40.");
await tool();
await tapPlan(12.25, 8.5, 0.7);
await H.sideTop();
await R.clickOn({ text: "Window", exact: true }, 0.5);
await look(V.schlaf, 1.2);
await fill("Width", "1,4");
await sayOver("The important part is the “Sensor type”. A window contact only reports open or closed – that's the default.");
await scrollSide({ label: "Sensor type" }, 420, 0.6);
await R.moveTo({ label: "Sensor type" }, 0.5);
await sayOver("A “Handle sensor” reports open, tilted and closed – that's a window handle with three positions. I choose “Bedroom window handle”.");
await R.pickOption("Sensor type", "Handle sensor (open/tilted/closed)", 0.5);
await pickEntity("Handle sensor", "handle", "Bedroom window handle", 0.5);
await sayOver("Tilted tilts the leaf in 3D, open opens it – and closed is closed.");
await setState("sensor.schlafzalways_fenstergriff", "tilted");
await R.hold(1.6);
await setState("sensor.schlafzalways_fenstergriff", "open");
await R.hold(1.6);
await setState("sensor.schlafzalways_fenstergriff", "closed");
await sayOver("The third type: “Contact + tilt sensor” – a normal contact plus a second sensor that only reports “tilted”.");
await R.pickOption("Sensor type", "Contact + tilt sensor", 0.5);
await pickEntity("Tilt sensor", "tilted", "Bedroom window tilted", 0.5);
await R.hold(0.6);
await sayOver("Optionally, a “Tilt angle sensor” provides the angle in degrees. Then the leaf tilts exactly that far – with fields for the “fully tilted” angle, an offset and the counting direction.");
await pickEntity("Tilt angle sensor", "tilt angle", "Bedroom tilt angle", 0.5);
await scrollSide({ label: "Angle for" }, 640, 0.5);
await setState("sensor.schlafzalways_kippwinkel", "6");
await R.moveTo({ label: "Angle for" }, 0.5);
await R.moveTo({ label: "Offset" }, 0.5);
await R.moveTo({ label: "Angle counts the other way round" }, 0.5);
await sayOver("By the way, tilted also counts for the “Window open in the rain” warning. With the “Weather outside” extension you'll even see the rain at the house.");
await setState("sensor.schlafzalways_kippwinkel", "15");
await R.hold(1.2);

// ---------------------------------------------------------------- 4. Blinds
await chapter("Covers");
await sayOver("Back to the living room window: the blind moves in 3D with its position from Home Assistant.");
await tapPlan(5.5, 0, 0.7);
await look(V.wtop, 1.2);
await travel("cover.wohnzimmer", 70, 15, 2);
await sayOver("If your blind reports its position through a separate sensor in percent, pick it under “Position sensor”. Then it moves live while it's travelling.");
await scrollSide(() => H.pickerBox("Blind"), 380, 0.5);
await pickEntity("Position sensor", "level", "Living room roller shutter level", 0.5);
await travel("sensor.wohnzimmer_rollladen_level", 70, 25, 1.6, true);
await travel("sensor.wohnzimmer_rollladen_level", 25, 85, 1.6, true);
await sayOver("If the sensor counts the other way round, “Sensor counts the other way round” fixes that. And you already know “Ask before switching” from the garage door.");
await R.moveTo({ label: "Sensor counts in reverse" }, 0.5);
await R.hold(0.8);
await R.moveTo({ label: "Ask before switching" }, 0.5);
await sayOver("Blinds work in front of doors too: on the terrace door the field is called “Blind”, on the front door and the sliding door “Drive”.");
await tapPlan(14, 4.75, 0.7);
await scrollSide(() => H.pickerBox("Drive"), 500, 0.5);
await pickerMove("Drive", 0.5);
await R.hold(0.8);

// ---------------------------------------------------------------- 5. Live in 3D
await chapter("All live in 3D");
await sayOver("And now the whole house: click “3D” at the top.");
await R.clickOn({ text: "3D", exact: true }, 0.6);
await R.sleep(1500);
await catchUp();
await R.hideCursor();
const D = { theta: 0.2, phi: 0.85, radius: 25 };
const M = { theta: 0.5, phi: 0.8, radius: 24 };
const E = { theta: 0.8, phi: 0.75, radius: 24 };
await R.view(D);
await R.sleep(1000);
await sayOver("Open windows and doors glow warm, tilted ones tilt, blinds and the garage door move along – all live from Home Assistant.");
await R.glide(D, M, 3);
await setState("binary_sensor.haustuer", "on");
await travel("cover.garagentor", 60, 100, 1.5);
await sayOver("And the bathroom door glows as long as it's shut – exactly as we set it in part 2.");
await R.glide(M, E, 4);

// ---------------------------------------------------------------- 6. Outro
await chapter("Wie geht es weiter");
await R.title("Next episode: Floors, stairs and cellar", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
await say("That was episode 2: putting the plan underneath, tracing, walls, doors and windows. Episode 3 is about floors, stairs and the cellar.");
await say("Left to the online demo and the manual are in the description. And NeonPlan also runs on old wall tablets. See you next time!");
await R.hold(0.6);

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
