// Tutorial episode 2, part 2 – "Doors and garage door": the doors of the traced house (episode 2, part 1) with every
// kind and style – front door with glass panel and side lights, interior door, sliding door, double glass door, a
// passage without a door – width, position, height, hinge side and opening direction, door contacts (automatic from
// the area, and picked by hand), "Show closed without a sensor", the garage door with its motor, "Highlight in 3D"
// and the plan lock, each change seen live in the 3D half beside the plan.
// The bathroom door contact ("Bathroom door") is added to the demo's mock Home Assistant at runtime (invented, like the rest).
// Usage (from frontend/): node tutorials/ep02b-tueren-garagentor.mjs <out-dir> [<voice-dir>] (with durations.json)
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { narration, startRecorder } from "./recorder.mjs";
import { VERSION, fastMode, helpers, tap, traceHouse } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep02b";
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
fastMode(R);
const N = narration(R, process.argv.slice(3));
const { say, sayOver, chapter, catchUp } = N;
const H = helpers(R);
const { fill, tapPlan, pointPlan, side, scrollSide, pickEntity, pickerMove, view3d, glide3d, setState } = H;

const BAD_TUER = ["binary_sensor.bad_tuer", "bad", "off", { friendly_name: "Bathroom door", device_class: "door" }];
/** Camera views of the 3D half (plan metres as target). */
const V = {
  // theta 0 looks from the south (plan bottom), pi/2 from the east; the 3D half beside the plan needs a large radius
  over: { theta: 0.45, phi: 0.9, radius: 28, target: { x: 7, y: 0.75, z: 4.25 } },
  front: { theta: 1.35, phi: 1.0, radius: 10, target: { x: 14, y: 1.1, z: 4.75 } },
  bad: { theta: 2.9, phi: 0.7, radius: 10, target: { x: 8.5, y: 0.8, z: 5.5 } },
  schiebe: { theta: 2.9, phi: 0.7, radius: 10, target: { x: 12.45, y: 0.8, z: 5.5 } },
  doppel: { theta: -1.75, phi: 0.7, radius: 10, target: { x: 10, y: 0.8, z: 3 } },
  durch: { theta: 1.75, phi: 0.7, radius: 10, target: { x: 7.5, y: 0.8, z: 4.75 } },
  garage: { theta: 0.1, phi: 1.0, radius: 11, target: { x: 1.75, y: 1.2, z: 6 } },
};
let cam = V.over;
const look = async (to, seconds = 1.2) => {
  await glide3d(cam, to, seconds);
  cam = to;
};
const tool = () => R.clickOn({ text: "Door & Window", exact: true }, 0.5);
/** Move a cover (garage door) in steps, so 3D shows it travelling. */
const travel = async (id, from, to, seconds) => {
  const n = Math.max(2, Math.round(seconds * 5));
  for (let i = 1; i <= n; i++) {
    const pos = Math.round(from + ((to - from) * i) / n);
    await setState(id, pos > 0 ? "open" : "closed", { current_position: pos });
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
const A = { theta: 1.0, phi: 0.85, radius: 19 };
const B = { theta: 0.35, phi: 0.9, radius: 21 };
await R.view(A);
await R.sleep(1200);
await R.title("Floor plan as a template – part 2", `HomePlan 3D · Episode 2 · Doors and garage door${VERSION}`);
await sayOver("A front door that opens live, a garage door that moves along – today the doors go into our traced floor plan.");
await R.glide(A, { theta: 0.7, phi: 0.87, radius: 20 }, 2.5);
await setState("binary_sensor.haustuer", "on");
await R.glide({ theta: 0.7, phi: 0.87, radius: 20 }, B, 3);
await R.untitle();
await sayOver("Every kind, every style, every field – and how to connect them to the contacts in Home Assistant.");
await travel("cover.garagentor", 60, 100, 2.5);
await R.glide(B, { theta: 0.2, phi: 0.9, radius: 21 }, 2);

// ---------------------------------------------------------------- 1. Intro
await chapter("Was wir today machen");
await R.open("empty");
await traceHouse(R, { walls: true });
await H.addEntities([BAD_TUER]);
await tap(R, { text: "3D beside", exact: true });
await R.sleep(1500);
await tap(R, { text: "Tall walls", exact: true });
await H.view2d(58, 25, 330);
await view3d(V.over);
await R.sleep(1200);
await R.hideCursor(false);
await R.move(700, 560, 0.01);
await sayOver("We pick up where part 1 left off: the plan lies underneath, rooms and walls are traced.");
await R.hold(1);
await pointPlan(10.75, 4.75, 0.6);
await sayOver("The rooms are already linked to their Home Assistant areas, like in episode 1. That's how NeonPlan finds the door contacts by itself.");
await R.hold(0.8);
await R.move(1240, 520, 0.6);
await sayOver("On the right, “3D beside” – runs along, so you see every change right away. The windows come in part 3.");
await R.moveTo({ text: "3D beside", exact: true }, 0.6);

// ---------------------------------------------------------------- 2. Front door
await chapter("Die Front door");
await sayOver("Click “Doors & windows” at the top. The hint at the bottom says: tap a wall – you pick the kind afterwards on the right.");
await tool();
await R.move(330, 1064, 0.6);
await R.hold(1);
await sayOver("I tap the outer wall at the end of the hallway, right where the plan shows the front door.");
await tapPlan(14, 4.75, 0.7);
await look(V.front, 1.4);
await sayOver("In an exterior wall a door automatically becomes a front door: under “Style”, it says “Automatic (front door)”.");
await R.moveTo({ label: "Style" }, 0.6);
await R.hold(0.6);
await sayOver("At the top you pick the kind: door, front door, double door, window, terrace door, garage door and glass wall – each with fitting sizes.");
await R.moveTo({ text: "Door", exact: true }, 0.5);
await R.moveTo({ text: "Double door", exact: true }, 0.5);
await R.moveTo({ text: "Terrace door", exact: true }, 0.5);
await R.moveTo({ text: "Garage door", exact: true }, 0.5);
await R.moveTo({ text: "Glass wall", exact: true }, 0.5);
await sayOver("Below that: “Width”, “Centre from corner” – where it sits in the wall – and “Height”. According to the plan: one metre wide and 2.10 high.");
await R.moveTo({ label: "Centre ab Ecke" }, 0.5);
await fill("Width", "1");
await fill("Height", "2,1");
await sayOver("You can also move it in the plan: drag the door along the wall. The arrow keys move it along the wall as well.");
{
  const a = await R.planPoint(14, 4.75);
  const b = await R.planPoint(14, 5.05);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, 0.8);
  await R.drag(a.x, a.y, 0.8);
}
await sayOver("“Swap hinge side”, puts the hinges on the other side; “Reverse opening direction”, makes the door open outwards.");
await R.clickOn({ text: "Swap hinge side" }, 0.6);
await R.hold(0.8);
await R.clickOn({ text: "Swap hinge side" }, 0.5);
await R.moveTo({ text: "Reverse opening direction" }, 0.5);
await sayOver("The “Hinge” field shows the hinge side – always seen from the room the door belongs to. At the top it says “Back to Hall”.");
await R.moveTo({ label: "Hinge" }, 0.5);
await R.hold(0.8);
await R.moveTo({ text: "Back to" }, 0.6);
await sayOver("At the very bottom is the “Contact”: “Automatic (Front door)”. NeonPlan found the door contact in the hallway area.");
await scrollSide({ label: "Show closed without a sensor" }, 820, 0.6);
await pickerMove("Contact", 0.5);
await sayOver("When the front door opens in Home Assistant, it swings open in 3D too. In the demo I switch the contact by hand.");
await R.hold(0.8);
await setState("binary_sensor.haustuer", "on");
await R.hold(1.6);
await setState("binary_sensor.haustuer", "off");
await sayOver("Front doors have their own styles: with a glass panel, with one sidelight or with two.");
await scrollSide({ label: "Style" }, 420, 0.5);
await R.pickOption("Style", "Front door with sidelight", 0.5);
await sayOver("With a sidelight you set its width below – empty means automatic. The checkbox puts it on the hinge side.");
await R.moveTo({ label: "Sidelight width" }, 0.5);
await R.hold(0.6);
await R.moveTo({ label: "Sidelight on the hinge side" }, 0.5);
await sayOver("With two sidelights there's a field for left and right. I go for the front door with a glass panel – like in the plan.");
await R.pickOption("Style", "Front door with two sidelights", 0.5);
await R.moveTo({ label: "Left sidelight" }, 0.5);
await R.moveTo({ label: "Right sidelight" }, 0.5);
await R.pickOption("Style", "Front door with glass", 0.5);

// ---------------------------------------------------------------- 3. Interior doors
await chapter("Interior doors and contacts");
await sayOver("Now the bathroom door. After each opening the tool jumps back to “Select” – so “Doors & windows” again, and tap the wall between hallway and bathroom.");
await R.clickOn({ text: "Cut", exact: true }, 0.5);
await tool();
await tapPlan(8.5, 5.5, 0.7);
await H.sideTop();
await look(V.bad, 1.3);
await sayOver("Inside, it automatically becomes a room door. 80 centimetres wide is enough, and it should open into the bathroom: “Reverse opening direction”.");
await fill("Width", "0,8");
await R.clickOn({ text: "Reverse opening direction" }, 0.6);
await R.hold(0.6);
await sayOver("The contact says “Automatic (none found)”. NeonPlan hands out an area's contacts one after another – and the hallway's door contact already belongs to the front door.");
await scrollSide({ label: "Show closed without a sensor" }, 820, 0.6);
await pickerMove("Contact", 0.5);
await R.hold(1.5);
await sayOver("So I pick it by hand: click the field, type “Bathroom”, choose “Bathroom door”. That works for every sensor – and “None” switches it off completely.");
await pickEntity("Contact", "Bathroom", "Bathroom door", 0.5);
await R.hold(0.5);
await setState("binary_sensor.bad_tuer", "on");
await sayOver("So if a room has several doors, quickly check the automatic assignment. Now the bathroom door swings along too.");
await R.hold(1.6);
await setState("binary_sensor.bad_tuer", "off");
await sayOver("The bedroom gets a sliding door. “Style” lists every door style: room door, four front doors, glass door, sliding door and opening.");
await tool();
await tapPlan(12.45, 5.5, 0.7);
await H.sideTop();
await look(V.schiebe, 1.2);
await R.pickOption("Style", "Sliding door", 0.6);
await R.hold(0.6);
await sayOver("From the dining area into the kitchen there's a double door: tap the wall, “Double door” at the top – and “Glass door” as the style.");
await tool();
await tapPlan(10, 3, 0.7);
await H.sideTop();
await R.clickOn({ text: "Double door", exact: true }, 0.5);
await look(V.doppel, 1.2);
await R.pickOption("Style", "Glass door", 0.5);
await sayOver("With two leaves, the button and the field are called “Main leaf”: they decide which leaf opens first. And each leaf can have its own contact.");
await R.moveTo({ text: "Swap main leaf" }, 0.5);
await R.hold(0.4);
await R.moveTo({ label: "Main leaf (seen from the room)" }, 0.5);
await R.hold(0.4);
await scrollSide({ label: "Show closed without a sensor" }, 820, 0.6);
await pickerMove("Contact main leaf", 0.5);
await pickerMove("Contact second leaf", 0.5);
await sayOver("Without a contact, a door stands half open in 3D – the hint at the bottom says so too. “Show closed without a sensor” draws it shut.");
await R.hold(0.6);
await R.clickOn({ label: "Show closed without a sensor" }, 0.5);
await R.hold(0.6);
await sayOver("That leaves the opening from the hallway into the living room. The tool remembers the last kind you picked – that's why it starts as a double door.");
await tool();
await tapPlan(7.5, 4.75, 0.7);
await H.sideTop();
await look(V.durch, 1.2);
await R.hold(0.6);
await sayOver("I click “Door” and choose “Opening (no door)”: a gap without frame or door leaf, and light falls through it too.");
await R.clickOn({ text: "Door", exact: true }, 0.5);
await R.pickOption("Style", "Opening (no door)", 0.5);
await fill("Width", "1");

// ---------------------------------------------------------------- 4. Garage door
await chapter("Garage door");
await sayOver("Now the garage door: “Doors & windows”, tap the front wall of the garage – and “Garage door” at the top.");
await tool();
await tapPlan(1.75, 6, 0.7);
await H.sideTop();
await R.clickOn({ text: "Garage door", exact: true }, 0.5);
await R.clickOn({ text: "Tall walls", exact: true }, 0.5);
await look(V.garage, 1.3);
await sayOver("A gate has no style and no hinge. Under “Drive”, NeonPlan found the garage door in the garage area – it's at 60 percent right now.");
await pickerMove("Drive", 0.6);
await R.hold(1);
await sayOver("When the door moves, it moves in 3D too – the open part lies under the ceiling. Instead of a drive, a garage door contact works as well.");
await travel("cover.garagentor", 60, 100, 2);
await travel("cover.garagentor", 100, 0, 2.5);
await pickerMove("Contact", 0.5);
await sayOver("“Position sensor” takes the position from a separate sensor. And “Ask before switching”, asks first before the door moves – good for tablets in the hallway.");
await pickerMove("Position sensor", 0.5);
await R.hold(0.8);
await R.clickOn({ label: "Ask before switching" }, 0.5);
await travel("cover.garagentor", 0, 60, 1.5);

// ---------------------------------------------------------------- 5. Mark in 3D
await chapter("Highlight in 3D");
await sayOver("Back to the bathroom door. “Highlight in 3D”, is normally set to “When open”: open doors and windows glow warm.");
await R.clickOn({ text: "Cut", exact: true }, 0.5);
await tapPlan(8.5, 5.5, 0.7);
await look(V.bad, 1.2);
await scrollSide({ label: "Highlight in 3D" }, 520, 0.5);
await R.moveTo({ label: "Highlight in 3D" }, 0.5);
await sayOver("“When closed” turns that around – handy for the toilet: the door glows as long as it's shut. For that it needs a contact.");
await R.pickOption("Highlight in 3D", "When closed (e.g. WC)", 0.5);
await R.hold(1.2);
await sayOver("When it opens, the glow is gone.");
await setState("binary_sensor.bad_tuer", "on");
await R.hold(1.4);
await setState("binary_sensor.bad_tuer", "off");

// ---------------------------------------------------------------- 6. Lock and delete
await chapter("Lock and delete");
await sayOver("Once everything fits, lock the floor plan with “Floor plan” at the top, “Floor plan”: rooms, walls, doors and windows can no longer be moved by accident.");
await R.clickOn({ text: "Floor plan", exact: false, nth: 0 }, 0.6);
await R.hold(0.6);
await side();
await scrollSide({ text: "Floor plan locked" }, 300, 0.4).catch(() => null);
await R.moveTo({ text: "Floor plan locked" }, 0.5).catch(() => null);
await sayOver("A click on “Floor plan locked” at the top of the form unlocks it again. And you delete with “Delete” at the bottom of the form, or with the Delete key.");
await R.clickOn({ text: "Floor plan locked" }, 0.5).catch(() => null);
await scrollSide({ text: "Delete", exact: true }, 700, 0.5);
await R.moveTo({ text: "Delete", exact: true }, 0.5);
await look(V.over, 1.5);

// ---------------------------------------------------------------- 7. Outro
await chapter("Wie geht es weiter");
await R.hideCursor();
await R.title("Part 3: Windows, sensors and covers", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
await say("Those were the doors and the garage door. Part 3 brings the windows: terrace door, glass wall, handle and tilt sensors, and blinds that move live.");
await say("Left to the online demo and the manual are in the description. And NeonPlan runs on old wall tablets too. See you in a moment!");
await R.hold(0.6);

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
