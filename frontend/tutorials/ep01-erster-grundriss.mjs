// Tutorial episode 1 – "Your first floor plan": teaser, a floor, a floor-plan picture as template (short, episode 2
// shows it in full), rooms drawn over it, linking the rooms to their Home Assistant areas, an open kitchen, doors and
// windows, a second floor, the 3D view with live room values.
// Drives the preview with invented demo data (its areas: Living room, Kitchen, Hall, Bathroom, Bedroom, Kids' room,
// Study …); the floor-plan picture is invented too (tutorials/assets/make-plan.py).
// Usage (from frontend/): node tutorials/ep01-erster-grundriss.mjs <out-dir> [<voice-dir>]
//   (voice dirs: private/tutorial-audio/ep01/de and …/en; a line then lasts the longer of both plus 0.3 s)
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { join } from "node:path";
import { appVersion, narration, startRecorder } from "./recorder.mjs";

const out = process.argv[2] ?? "tutorial-ep01";
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
const N = narration(R, process.argv.slice(3));
const { say, sayOver, chapter, catchUp } = N;
/** sayOver that returns the time the line ends (to start the next steps just before it). */
const sayOverEnd = async (text) => {
  await sayOver(text);
  return R.time + N.length(text);
};
const holdUntil = async (t) => {
  if (t - R.time > 0.02) await R.hold(t - R.time);
};
const PLAN = join(import.meta.dirname, "assets", "bauplan-eg.png");
// record from a snapshot (TUTORIAL_ROOT, see SERIES.md); the version line goes on the title and outro cards
const VERSION = `<br><span style="font-size:20px;opacity:.7">recorded with HomePlan 3D ${appVersion()}</span>`;

const rect = async (x0, z0, x1, z1, seconds = 1) => {
  await R.clickOn({ text: "Rectangle", exact: true }, 0.45);
  const a = await R.planPoint(x0, z0);
  const b = await R.planPoint(x1, z1);
  await R.move(a.x, a.y, 0.5);
  await R.drag(b.x, b.y, seconds);
};
/** Type over the value of a form field. */
const fill = async (label, value) => {
  await R.clickOn({ label }, 0.5);
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
/** Back to the floor (a fresh room form: the area field then shows the right value). */
const back = async (seconds = 0.5) => {
  await R.clickOn({ text: "Back to the floor" }, seconds);
};
/** Back to the floor, tap a room in the plan and link it to a Home Assistant area. */
const link = async (x, z, area, seconds = 0.5) => {
  await back(seconds);
  await tapPlan(x, z, seconds);
  await R.pickOption("Area", area, seconds);
};
const opening = async (x, z) => {
  await R.clickOn({ text: "Door & Window", exact: true }, 0.5);
  await tapPlan(x, z, 0.55);
};
/** Park the cursor on the side panel's edge (no field under it) and scroll a section into view. */
const scrollSide = async (text, top, seconds = 0.7) => {
  await R.move(1607, 640, 0.4);
  await R.scrollTo(text, top, seconds);
};

// ---------------------------------------------------------------- 0. Teaser: the finished house, live
await chapter("Teaser");
await R.open("");
await R.hideCursor();
await R.clickOn({ text: "Editor", exact: true }, 0.01);
await R.editor("e.fit();");
await R.sleep(600);
await R.clickOn({ text: "3D", exact: true }, 0.01);
await R.sleep(600);
await R.clickOn({ text: "All floors", exact: true }, 0.01);
await R.clickOn({ text: "Stacked", exact: true }, 0.01);
await R.sleep(1500);
const A = { theta: 0.9, phi: 0.95, radius: 26 };
const B = { theta: 2.2, phi: 0.8, radius: 23 };
const C = { theta: 3.0, phi: 0.65, radius: 25 };
await R.view(A);
await R.sleep(800);
await R.title("Your first floor plan", `HomePlan 3D · Episode 1${VERSION}`);
await sayOver("This is your home in 3D – live from Home Assistant: lights, windows, temperatures, all in real time.");
await R.glide(A, B, 5);
await R.untitle();
await sayOver("And it even runs on old wall tablets. Today we'll draw your first floor plan together.");
await R.glide(B, C, 5);

// ---------------------------------------------------------------- 1. Intro
await chapter("Was wir today bauen");
await R.open("empty");
await R.clickOn({ text: "Editor", exact: true }, 0.01);
await R.sleep(500);
await R.hideCursor(false);
await sayOver("We'll add a floor, draw five rooms and link them to Home Assistant.");
await R.move(800, 550, 0.6);
await R.hold(0.6);
await sayOver("Plus doors, windows, an open kitchen, an upper floor – and at the end, everything in 3D.");
await R.moveTo({ text: "3D", exact: true }, 0.6);
await R.hold(0.8);
await sayOver("At the top is the toolbar, in the middle the drawing area,");
await R.moveTo({ text: "Rectangle", exact: true }, 0.6);
await R.hold(0.6);
await R.move(800, 550, 0.6);
await sayOver("and on the right the sidebar: it always shows the settings for whatever you have selected.");
await R.moveTo({ text: "Add floor" }, 0.6);

// ---------------------------------------------------------------- 2. A floor
await chapter("Add a floor");
await sayOver("Ridge we need a floor: click “Add floor” on the right.");
await R.clickOn({ text: "Add floor" }, 0.4);
await R.hold(0.5);
await sayOver("These are the floors from your Home Assistant. I'll take the ground floor, “Ground floor”.");
await R.hold(1.6);
await R.clickOn({ text: "Ground floor", nth: 0 }, 0.5);
await sayOver("On the right you now see the name, the “Elevation”, zero for the ground floor –");
await R.moveTo({ label: "Name" }, 0.5);
await R.hold(0.6);
await R.moveTo({ label: "Height above the floor" }, 0.5);
await sayOver("and the “Ceiling height”: two and a half metres. That's how tall the walls get in 3D.");
await R.moveTo({ label: "Ceiling height" }, 0.5);
await sayOver("Below that: the floor is already linked to the ground floor in Home Assistant.");
await R.moveTo({ label: "Floor in Home Assistant" }, 0.5);
await sayOver("Tip: this button adds a room for every area. Today I'll draw them myself – then the sizes are right straight away.");
await R.moveTo({ text: "Add rooms from HA areas" }, 0.5);

// ---------------------------------------------------------------- 3. A floor-plan picture as template (short)
await chapter("Floor plan as a template");
await sayOver("Got a floor plan as a picture? Then simply lay it under the drawing area. Right at the bottom, under “Template” –");
await R.move(1607, 640, 0.4);
await R.scrollTo("Template (floor plan image)", 900, 0.7);
await R.clickOn({ text: "Template (floor plan image)" }, 0.5);
await sayOver("you click “Choose image” – and pick your plan.");
{
  const [chooser] = await Promise.all([R.page.waitForFileChooser(), R.clickOn({ text: "Choose image" }, 0.5)]);
  await R.hold(0.8);
  await chooser.accept([PLAN]);
  await R.sleep(1200);
  await R.frame(1 / 25, 200);
}
await sayOver("There it is, under the grid. “Move, scale and turn” – gives the picture handles,");
await R.hold(0.8);
await R.move(1607, 640, 0.4);
await R.scrollTo("Move, scale and turn", 500, 0.6);
await R.clickOn({ text: "Move, scale and turn" }, 0.5);
await catchUp();
await sayOver("and I move it so that the corner of the house sits on the zero point.");
{
  const a = await R.planPoint(5, 4);
  const b = await R.planPoint(3.5, 2.5);
  await R.move(a.x, a.y, 0.6);
  await R.drag(b.x, b.y, 1.4);
}
// the drag lands within a centimetre; lay the picture exactly (invisible)
await R.editor("e.updateFloor({ background: { ...e.floor.background, x: -1.5, z: -1.5 } });");
await sayOver("“Done” – and now it stays put. How to get the scale exactly right, I'll show you in detail in episode two.");
await R.clickOn({ text: "Done", exact: true }, 0.5);
await R.move(1607, 640, 0.4);
await R.scrollTo("Name", 122, 0.6);

// ---------------------------------------------------------------- 4. Rooms
await chapter("Draw rooms");
await sayOver("Now we simply trace it. At the top, “Rectangle” – then drag from corner to corner with the mouse button held down.");
await rect(0, 0, 6, 4, 1.3);
await sayOver("The sizes show right on the walls. Four metres deep is too little – on the right, under “Depth”, I type 4.5.");
await R.hold(1.4);
await fill("Depth", "4,5");
await sayOver("You can also drag the corners with “Select”. And Ctrl+Z undoes every step.");
await pointPlan(6, 4.5, 0.6);
await R.hold(1.4);
await R.moveTo({ text: "Undo", exact: true }, 0.6);
await sayOver("The next room joins right on: the corners snap into place, and the shared edge automatically becomes an inner wall.");
await rect(6, 0, 9.5, 4.5, 1.1);
await sayOver("The same way I draw the hallway, bathroom and bedroom below – always along the walls of the template.");
await rect(0, 4.5, 3, 7.5, 0.7);
await rect(3, 4.5, 6, 7.5, 0.7);
await sayOver("The rooms are still called “Room 1” to “Room 5”. For L-shaped rooms there's “Free shape”, by the way – “Cleare Shape”.");
await rect(6, 4.5, 9.5, 7.5, 0.7);
await R.moveTo({ text: "Cleare Shape", exact: true }, 0.6);

// ---------------------------------------------------------------- 5. Link the rooms to Home Assistant areas
await chapter("Connect rooms to Home Assistant");
await sayOver("Now the most important step: every room gets its area from Home Assistant.");
await tapPlan(3, 1.6, 0.6);
await sayOver("That's how NeonPlan knows which lights, sensors and shutters are in which room. Right now it says “No area” –");
await R.moveTo({ label: "Area" }, 0.6);
await R.hold(1.6);
{
  const end = await sayOverEnd("and under “Devices”, there's only a note.");
  await scrollSide("Devices", 300, 0.6);
  await R.moveTo({ text: "This area" }, 0.5);
  // scroll back while the line ends, so the next one follows without a pause
  await holdUntil(end - 0.9);
  await scrollSide("Room", 140, 0.6);
}
await sayOver("So: click “Area” – and choose the living room, “Living room”.");
await R.pickOption("Area", "Living room", 0.6);
await sayOver("The room is now called Living room: without a name of its own, it takes the name of the area.");
await pointPlan(3, 2.4, 0.6);
await R.hold(1);
await R.moveTo({ label: "Name" }, 0.6);
await sayOver("And under devices there are now twelve devices from the living room – lights, shutter, heating, TV and sensors.");
await scrollSide("Devices", 200, 0.6);
await R.moveTo({ text: "This area" }, 0.5);
{
  const end = await sayOverEnd("Under “Room climate” – you see where the temperature comes from: “Automatic” uses the sensors of the area.");
  await scrollSide("Room climate", 330, 0.6);
  await R.clickOn({ text: "Room climate" }, 0.5);
  await holdUntil(end - 0.9);
  await scrollSide("Room", 140, 0.6);
}
await sayOver("The other rooms go quickly: “Back to the floor” – tap the room, choose the area. Room 2 becomes the kitchen.");
await link(7.75, 1.6, "Kitchen", 0.55);
await sayOver("Room 3 becomes the hallway, room 4 the bathroom and room 5 the bedroom.");
await link(1.5, 6.6, "Hall", 0.4);
await sayOver("The list shows every area from your Home Assistant – including the ones for the upper floor.");
await link(4.5, 6.6, "Bathroom", 0.4);
await sayOver("If an area is missing, add it in Home Assistant under Settings. Then it shows up here in the list.");
await link(7.75, 6.6, "Bedroom", 0.4);
await back(0.5);
await pointPlan(4.75, 4.5, 0.6);

// ---------------------------------------------------------------- 6. Walls: an open kitchen
await chapter("Changing walls: open kitchen");
await sayOver("Now an open kitchen. I click into the living room. On the right, under “Wall heights” – every wall is listed, named after the corner numbers in the plan.");
await tapPlan(3, 1.6, 0.6);
await R.hold(1.2);
await R.moveTo({ text: "No wall", nth: 1 }, 0.6);
await catchUp();
await sayOver("The wall to the kitchen is “Wall 2–3”. One click on “No wall” – and it's gone.");
await R.hold(1.6);
await R.click();
await sayOver("In Home Assistant they stay two areas. The arrow next to it brings the wall back – and a low wall turns into a counter.");
await pointPlan(6, 2.25, 0.6);

// ---------------------------------------------------------------- 7. Doors and windows
await chapter("Doors and windows");
await sayOver("On to doors: at the top, “Doors & windows” – then click the wall, here from the hallway into the living room.");
await R.hold(0.6);
await opening(1.5, 4.5);
await sayOver("On the right you choose the type: door, window, terrace door and more. Below that, width and height.");
await R.moveTo({ text: "Terrace door", exact: true }, 0.6);
await R.hold(1.4);
await R.moveTo({ label: "Width" }, 0.6);
await sayOver("If the door opens the wrong way, “Swap hinge side” helps – “Swap hinge side”.");
await R.clickOn({ text: "Swap hinge side" }, 0.6);
await sayOver("One more door into the bathroom, and one in the outer wall of the hallway.");
await opening(3, 6);
await opening(1.5, 7.5);
await sayOver("In an outer wall, NeonPlan automatically makes it a front door.");
await R.moveTo({ label: "Style" }, 0.6);
await sayOver("Now the windows: “Doors & windows” again, click the outer wall, and on the right click “Window”.");
await opening(3, 0);
await R.clickOn({ text: "Window", exact: true }, 0.6);
await sayOver("And one for the kitchen.");
await opening(7.75, 0);
await sayOver("NeonPlan finds contacts and shutters by itself in the area of the room – one more reason to link them.");
await R.clickOn({ text: "Window", exact: true }, 0.6);
await pointPlan(7.75, 0, 0.6);

// ---------------------------------------------------------------- 8. A second floor
await chapter("Zweite Floor");
await sayOver("Now the upper floor: back to the floor, and “Add floor” once more.");
// back up to the floor (from the window to its room, from the room to the floor)
for (let i = 0; i < 3; i++) {
  const up = await R.locate({ text: "Back to" }).catch(() => null);
  if (!up) break;
  await R.clickOn({ text: "Back to" }, 0.5);
}
await R.clickOn({ text: "Add floor" }, 0.5);
await R.clickOn({ text: "Upper floor", nth: 0 }, 0.5);
await sayOver("It automatically sits above the ground floor: 2.75 metres – ceiling height plus the ceiling. You see the ground floor dashed below.");
await R.moveTo({ label: "Height above the floor" }, 0.6);
await R.hold(2);
await pointPlan(6, 4.5, 0.6);
await sayOver("Here I draw two rooms and choose the area right away: first the kids' room,");
await rect(0, 0, 4.5, 7.5, 0.9);
await R.pickOption("Area", "Kids' room", 0.5);
await sayOver("and next to it the study. The corners snap into place by themselves again.");
await back(0.5);
await rect(4.5, 0, 9.5, 7.5, 0.9);
await sayOver("Saving happens by itself – at the top right it says “Saved”.");
await R.pickOption("Area", "Study", 0.5);
await R.move(1830, 34, 0.6);

// ---------------------------------------------------------------- 9. 3D
await chapter("All in 3D");
await sayOver("And now the best moment: “3D” at the top.");
await R.clickOn({ text: "3D", exact: true }, 0.6);
await R.sleep(800);
await R.clickOn({ text: "All floors", exact: true }, 0.5);
await catchUp();
await R.hideCursor();
const D = { theta: 0.8, phi: 0.95, radius: 18 };
const E = { theta: 2.0, phi: 0.75, radius: 16 };
await R.view(D);
await sayOver("There's your house – two floors, doors, windows and the open kitchen. You turn and zoom with the mouse or your finger.");
await R.glide(D, E, 6.5);
await R.hideCursor(false);
await sayOver("Because the rooms are linked, there's already life in it: open the ground floor and click “Values” at the bottom – “Values”.");
await R.clickOn({ text: "Ground floor", exact: true }, 0.6);
await R.hold(1);
await R.clickOn({ text: "Values", exact: true }, 0.6);
await catchUp();
await sayOver("Every room shows its temperature and humidity, live from Home Assistant. And the two windows glow because they're open in the demo –");
await R.hideCursor();
await sayOver("without placing a single device.");

// ---------------------------------------------------------------- 10. Outro
await chapter("Wie geht es weiter");
await R.title("Next episode: Floor plan as a template", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
await say("That was your first floor plan. Episode two is all about the floor-plan picture as a template, then devices, lamps and furniture.");
await say("Left to the online demo and the manual are in the description. And NeonPlan also runs on old wall tablets. See you next time!");
await R.hold(0.6);

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
