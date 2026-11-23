// Tutorial episode 2, part 1 – "Floor plan as a template": the floor-plan picture (upload, opacity, handles to move,
// scale and turn, straighten, scale with the ruler, lay the house corner on the grid), tracing the rooms (rectangle,
// an L-shaped room with "Cleare Shape", corners, "+" on an edge, the point list, arrow keys) and the walls (thickness,
// heights, splitting a wall for a counter, "No wall", a free-standing half-height wall), checked in 3D beside.
// The picture is invented and deliberately crooked and too small (tutorials/assets/make-plan.py, bauplan-l.png).
// Usage (from frontend/): node tutorials/ep02a-bauplan-vorlage.mjs <out-dir> [<voice-dir>] (with durations.json)
// Then: python ../tools/make-tutorial.py <out-dir> <out.mp4>

import { narration, startRecorder } from "./recorder.mjs";
import { PLAN, PTS, VERSION, fastMode, helpers, tap, traceHouse } from "./ep02-common.mjs";

const out = process.argv[2] ?? "tutorial-ep02a";
const R = await startRecorder({ outDir: out, width: 1920, height: 1080, lang: "en" });
fastMode(R);
const N = narration(R, process.argv.slice(3));
const { say, sayOver, chapter, catchUp } = N;
const H = helpers(R);
const { fill, tapPlan, pointPlan, dragPlan, side, scrollSide, rowMove, rowClick, bgPoint, planElement } = H;

/** The "×" (delete point) of row `n` (1-based) of the room's point list. */
const pointRow = (n, what) =>
  H.editorEval(
    `const rows = e.renderRoot.querySelectorAll(".fp3d-point"); const row = rows[args[0] - 1]; if (!row) return null;
     const el = args[1] === "x" ? row.querySelector("button") : row.querySelectorAll("input")[args[1] === "z" ? 1 : 0];
     const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };`,
    n,
    what,
  );
/** Drag a range slider (found by its label) from its current value to `to`. */
const slide = async (label, from, to, min, max) => {
  const b = await R.locate({ label });
  const x = (v) => b.x - b.w / 2 + 8 + ((v - min) / (max - min)) * (b.w - 16);
  await R.move(x(from), b.y, 0.5);
  await R.drag(x(to), b.y, 0.8);
};

// ---------------------------------------------------------------- 0. Teaser: the traced house, live in 3D
await chapter("Teaser");
await R.open("empty");
await R.hideCursor();
await traceHouse(R, { walls: true, openings: true });
await tap(R, { text: "3D", exact: true });
await R.sleep(2500);
const A = { theta: 0.25, phi: 0.95, radius: 22 };
const B = { theta: 0.95, phi: 0.8, radius: 19 };
const C = { theta: 1.6, phi: 0.75, radius: 20 };
await R.view(A);
await R.sleep(1200);
await R.title("Floor plan as a template – part 1", `HomePlan 3D · episode 2${VERSION}`);
await sayOver("You have your floor plan as a picture? Then simply trace your house on top of it – in just a few minutes.");
await R.glide(A, B, 5.5);
await R.untitle();
await sayOver("With an L-shaped living room, a counter, an open hallway, doors and windows – and all of it live in 3D.");
await R.glide(B, C, 5);

// ---------------------------------------------------------------- 1. Intro
await chapter("Was wir today machen");
await R.open("empty");
await tap(R, { text: "Editor", exact: true });
await R.sleep(500);
await R.hideCursor(false);
await sayOver("In part 1 we put the plan underneath, straighten it, and use the ruler to bring it to the right scale.");
await R.move(800, 520, 0.6);
await R.hold(1);
await R.moveTo({ text: "Cleare Shape", exact: true }, 0.6);
await sayOver("Then we trace the rooms and set up the walls. Doors follow in part 2, windows in part 3.");
await R.hold(1.2);
await R.moveTo({ text: "Wall", exact: true }, 0.5);
await R.hold(0.8);
await R.moveTo({ text: "Door & Window", exact: true }, 0.5);
await sayOver("All you need is a photo or a scan of your floor plan. I'm using an invented plan – scanned crooked on purpose.");
await R.move(800, 520, 0.6);

// ---------------------------------------------------------------- 2. Upload
await chapter("Picture hochladen");
await sayOver("Ridge, the floor, like in episode 1: “Add floor” – and “Ground floor”.");
await R.clickOn({ text: "Add floor" }, 0.5);
await R.hold(0.4);
await R.clickOn({ text: "Ground floor", nth: 0 }, 0.5);
await sayOver("At the very bottom of the side panel, open “Template (floor plan image)”, and click “Choose image”.");
await side();
await R.scrollTo("Template (floor plan image)", 760, 0.8);
await R.clickOn({ text: "Template (floor plan image)" }, 0.5);
{
  const [chooser] = await Promise.all([R.page.waitForFileChooser(), R.clickOn({ text: "Choose image" }, 0.5)]);
  await R.hold(0.6);
  await chooser.accept([PLAN]);
  await R.sleep(1500);
  await R.frame(1 / 25, 200);
}
await sayOver("PNG, JPG or WebP – a phone photo works too, as long as it's taken straight from above.");
await scrollSide({ text: "Template (floor plan image)" }, 150, 0.6);
await pointPlan(-0.5, 0.5, 0.6);
await sayOver("The picture now lies under the grid – one square is one metre, and the picture starts out twelve metres wide. You can see right away: the plan is too small and crooked.");
{
  // along the crooked top wall of the picture
  const a = await bgPoint(...PTS.top_left);
  const b = await bgPoint(...PTS.top_right);
  await R.move(a.x, a.y, 0.6);
  await R.move(b.x, b.y, 1.4);
}
await sayOver("“Opacity”, makes it stronger or fainter. The template only exists here in the editor, not in 3D – and every floor has its own.");
await slide("Opacity", 0.5, 0.75, 0.05, 1);
await R.hold(0.6);

// ---------------------------------------------------------------- 3. Handles
await chapter("Move, scale and turn");
await sayOver("“Move, scale and turn” – gives the picture handles, just like a piece of furniture.");
await R.clickOn({ text: "Move, scale and turn" }, 0.5);
await R.hold(0.4);
await sayOver("Dragging moves it.");
{
  const a = await bgPoint(0.5, 0.45);
  await R.move(a.x, a.y, 0.5);
  await R.drag(a.x + 40, a.y + 30, 0.9);
}
await sayOver("The handle at the bottom right makes it bigger or smaller.");
{
  const c = await planElement("[data-bg-handle]");
  await R.move(c.x, c.y, 0.5);
  await R.drag(c.x + 120, c.y + 84, 1);
}
await sayOver("And the round handle at the top turns it – hold Shift for 15-degree steps.");
{
  const r = await planElement("[data-bg-rotate] circle");
  await R.move(r.x, r.y, 0.5);
  await R.drag(r.x + 60, r.y + 6, 1.1);
}
await sayOver("On the right you see the values: X and Y, the “Width in plan” and the “Rotation”, accurate to a tenth of a degree.");
await R.moveTo({ label: "X (m)" }, 0.5);
await R.hold(0.3);
await R.moveTo({ label: "Width in the plan" }, 0.5);
await R.moveTo({ label: "Turn" }, 0.5);
await sayOver("But by eye it's never quite exact. I set the rotation back to zero and tap “Done”.");
await fill("Turn", "0");
await R.clickOn({ text: "Done", exact: true }, 0.5);
await sayOver("Now the picture is fixed and you can draw over it undisturbed – the hint in the form says so too.");
{
  const vb = await R.locate({ text: "Move, scale and turn" });
  await R.move(vb.x, vb.y + vb.h / 2 + 24, 0.5);
}
await R.hold(0.6);
await R.moveTo({ text: "Straighten" }, 0.5);

// ---------------------------------------------------------------- 4. Straighten
await chapter("Straighten");
await sayOver("It's more precise with “Straighten”. The button then turns into “Cancel straightening” – in case you change your mind.");
await R.clickOn({ text: "Straighten" }, 0.5);
await R.moveTo({ text: "Cancel straightening" }, 0.4);
await R.hold(0.8);
await sayOver("Tap the start of a long wall that should be straight – here the outer wall at the top –");
{
  const a = await bgPoint(...PTS.top_left);
  await R.move(a.x, a.y, 0.7);
  await R.click();
}
await sayOver("and then its end. The picture turns to fit.");
{
  const b = await bgPoint(...PTS.top_right);
  await R.move(b.x, b.y, 1);
  await R.click();
}
await R.hold(0.5);
await sayOver("Now the wall runs exactly along the grid. The rotation shows 2.5 degrees.");
{
  const a = await bgPoint(...PTS.top_left);
  const b = await bgPoint(...PTS.top_right);
  await R.move(a.x, a.y - 22, 0.5);
  await R.move(b.x, b.y - 22, 1.1);
}
await R.moveTo({ label: "Turn" }, 0.5);

// ---------------------------------------------------------------- 5. Ruler
await chapter("Scale with a ruler");
await sayOver("Now the scale. I zoom out a little with the mouse wheel – you move the view by dragging on an empty spot. On a tablet you do both with two fingers.");
await R.move(820, 560, 0.5);
for (let i = 0; i < 8; i++) {
  await R.page.mouse.wheel({ deltaY: 30 });
  await R.frame(1 / 25, 40);
}
await R.move(1450, 900, 0.5);
await R.drag(1440, 870, 0.6);
await sayOver("For the ruler – “Scale with a ruler” – you need a distance whose length you know. Best is the longest dimension line in the plan: 14 metres. Here too, the button now says “Cancel the ruler”.");
await R.clickOn({ text: "Scale with a ruler" }, 0.5);
await R.moveTo({ text: "Cancel ruler" }, 0.4);
await R.hold(0.5);
{
  const a = await bgPoint(...PTS.dim_left);
  const b = await bgPoint(...PTS.dim_right);
  await R.move(a.x, a.y - 30, 0.6);
  await R.move(b.x, b.y - 30, 1.2);
}
await sayOver("I tap the start of the dimension line … and its end.");
{
  const a = await bgPoint(...PTS.dim_left);
  await R.move(a.x, a.y, 0.7);
  await R.click();
  const b = await bgPoint(...PTS.dim_right);
  await R.move(b.x, b.y, 1.1);
  await R.click();
}
await sayOver("On the right you see what NeonPlan measured – a lot less. I enter the real length: 14 – and “Apply the scale”.");
{
  const b = await R.locate({ label: "Real length" });
  await R.move(b.x, b.y - 58, 0.5);
}
await R.hold(0.8);
await R.clickOn({ label: "Real length" }, 0.5);
await R.type("14", 0.08);
await R.clickOn({ text: "Apply scale" }, 0.5);
await sayOver("The picture grows to fit, and the first point stays where it is. To check: the garage is now three and a half squares wide.");
{
  const a = await bgPoint(...PTS.corner);
  await R.move(a.x, a.y + 40, 0.6);
  await R.move(a.x + 3.5 * (await H.editorEval("return e._view.scale")), a.y + 40, 1.2);
}
await sayOver("Finally I move the corner of the house exactly onto a grid point – then the rooms snap neatly onto the walls while you draw.");
await R.clickOn({ text: "Move, scale and turn" }, 0.5);
{
  const a = await bgPoint(...PTS.corner);
  const b = await R.planPoint(0, 0);
  await R.move(a.x, a.y, 0.6);
  await R.drag(b.x, b.y, 1.2);
}
// the drag lands within millimetres; lay the picture exactly (invisible)
await H.exactPlan();
await R.clickOn({ text: "Done", exact: true }, 0.5);
await sayOver("Remember the order: straighten first, then the scale, then draw. And “Remove template”, takes the picture away again.");
await R.moveTo({ text: "Straighten" }, 0.5);
await R.hold(0.6);
await R.moveTo({ text: "Scale with a ruler" }, 0.5);
await R.hold(0.6);
await R.moveTo({ text: "Remove template" }, 0.5);

// ---------------------------------------------------------------- 6. Tracing
await chapter("Trace rooms");
await catchUp();
await H.view2d(70, 310, 150);
await scrollSide({ text: "Add floor" }, 140, 0.5).catch(() => null);
await sayOver("Rectangular rooms you drag out with “Rectangle”, like in episode 1 – here the garage, from corner to corner.");
await R.clickOn({ text: "Rectangle", exact: true }, 0.5);
await dragPlan([0, 0], [3.5, 6], 1.3);
await sayOver("For the L-shaped living room you use “Free shape”, and set one point after another on the corners.");
await R.clickOn({ text: "Cleare Shape", exact: true }, 0.5);
await tapPlan(3.5, 0, 0.6);
await tapPlan(10, 0, 0.7);
await tapPlan(10, 4, 0.6);
await sayOver("The hint for the tool is always shown at the bottom. Corners snap to the grid, to the corners and edges of other rooms, and to their alignment lines.");
await tapPlan(7.1, 4, 0.6);
await tapPlan(7.5, 8.5, 0.6);
await tapPlan(3.5, 8.5, 0.6);
await R.move(400, 1064, 0.6);
await R.hold(1);
await sayOver("Hold Alt to place points without snapping. You close the shape by tapping the first point – or with Enter. Escape cancels.");
await R.hold(1.6);
await tapPlan(3.5, 0, 0.8);
await sayOver("Kitchen, hallway, bathroom and bedroom are rectangles – they're done in no time.");
await R.clickOn({ text: "Rectangle", exact: true }, 0.45);
await dragPlan([10, 0], [14, 4], 0.7);
await R.clickOn({ text: "Rectangle", exact: true }, 0.45);
await dragPlan([7.5, 4], [14, 5.5], 0.7);
await sayOver("The corners snap to the neighbouring rooms – so there are no gaps between the rooms.");
await R.clickOn({ text: "Rectangle", exact: true }, 0.45);
await dragPlan([7.5, 5.5], [10.5, 8.5], 0.6);
await R.clickOn({ text: "Rectangle", exact: true }, 0.45);
await dragPlan([10.5, 5.5], [14, 8.5], 0.6);
await sayOver("Then you link the rooms to their Home Assistant areas – just like in episode 1.");
await scrollSide({ label: "Area" }, 230, 0.6);
await R.moveTo({ label: "Area" }, 0.5);
await R.hold(0.6);

// ---------------------------------------------------------------- 7. Corners and points
await chapter("Adjust corners and points");
await sayOver("One corner of the living room is off. With “Select”, tap the room and drag the corner to the right spot.");
await tapPlan(5.5, 2, 0.6);
await R.hold(0.6);
await dragPlan([7.1, 4], [7.5, 4], 1);
await sayOver("The small plus in the middle of each edge adds a new point – for a bay window, say. Tap it, then drag the new point.");
await tapPlan(5.5, 8.5, 0.6);
await R.hold(0.6);
await dragPlan([5.5, 8.5], [5.5, 9.3], 1.1);
await sayOver("On the right, the “Corners” list, “Corners”, shows every corner with X and Y – you can type measurements straight in. The cross deletes a point.");
await scrollSide({ text: "Corners" }, 300, 0.7);
{
  const y = await pointRow(6, "z");
  await R.move(y.x, y.y, 0.6);
  await R.hold(0.8);
  const x = await pointRow(6, "x");
  await R.move(x.x, x.y, 0.5);
  await R.click();
}
await sayOver("The arrow keys move the selection by one grid step, with Shift by ten centimetres, with Alt by one.");
await pointPlan(5.5, 2.5, 0.5);
await R.page.keyboard.down("Shift");
await R.key("ArrowRight");
await R.hold(0.35);
await R.key("ArrowRight");
await R.page.keyboard.up("Shift");
await R.hold(0.6);
await sayOver("And Ctrl+Z undoes anything – or “Undo” at the top. “Redo” brings it back, and “Whole plan” fits all rooms into view.");
await R.page.keyboard.down("Control");
await R.key("z");
await R.hold(0.3);
await R.key("z");
await R.page.keyboard.up("Control");
await R.moveTo({ text: "Undo", exact: true }, 0.5);
await R.moveTo({ text: "Redo", exact: true }, 0.5);
await R.clickOn({ text: "Whole plan", exact: true }, 0.5);

// ---------------------------------------------------------------- 8. Walls
await chapter("Walls: thickness, height, counter, open");
await sayOver("The walls appear by themselves: every shared edge becomes an interior wall, every outer edge an exterior wall. Corners and T-joints are joined cleanly.");
await pointPlan(10, 2.8, 0.6);
await R.hold(0.6);
await pointPlan(14, 2, 0.6);
await sayOver("Their thickness is set further down under “Settings”. In the plan the exterior walls are 30 centimetres thick – so I enter 0.3 for “Exterior wall”.");
await scrollSide({ text: "Back zur Floor" }, 150, 0.6);
await R.clickOn({ text: "Back zur Floor" }, 0.5);
await scrollSide({ text: "Settings" }, 260, 0.8);
await R.clickOn({ text: "Settings" }, 0.5);
await scrollSide({ label: "exterior wall" }, 520, 0.6);
await fill("exterior wall", "0,3");
await R.moveTo({ label: "Interior wall" }, 0.5);
await sayOver("Now the living room: the “Wall heights” box lists every wall of the room, named after the corner numbers in the plan, with its length.");
await tapPlan(5.5, 2, 0.6);
await scrollSide(() => H.rowBox("Wall 1–2", "row"), 200, 0.7);
await rowMove("Wall 1–2", "row", 0.5);
await sayOver("Hover over a row and the wall lights up in the plan. Where a neighbouring room only touches part of a wall, you get separate rows: part 1 and part 2.");
await rowMove("Wall 2–3", "row", 0.5);
await R.hold(0.8);
await scrollSide(() => H.rowBox("Wall 6–1 · part 1", "row"), 700, 0.6);
await rowMove("Wall 6–1 · part 2", "row", 0.5);
await R.hold(0.6);
await scrollSide(() => H.rowBox("Wall 1–2", "row"), 200, 0.6);
await sayOver("According to the plan there's a two-metre counter towards the kitchen. So I split “Wall 2–3” with the scissors.");
await rowClick("Wall 2–3", "✂", 0.6);
await sayOver("The split point sits in the middle. You move it with “Split point from corner”, and the cross joins the parts again.");
await rowMove("Wall 2–3 · part 2", "split", 0.5);
await R.hold(0.6);
await rowMove("Wall 2–3 · part 2", "⨉", 0.5);
await sayOver("Part 1 gets a height of 1.1 metres – and there's the counter. Low walls look lighter in the plan, and windows and doors in them end at the wall height.");
await rowClick("Wall 2–3 · part 1", "height", 0.5);
await H.typeOver("1,1");
await pointPlan(10, 1, 0.6);
await R.hold(0.8);
await sayOver("The up arrow puts a wall back to full height. When two rooms share a wall, the lower height wins.");
await rowMove("Wall 2–3 · part 1", "↥", 0.6);
await sayOver("The dining area is open to the hallway: on “Wall 3–4” click “No wall”. In Home Assistant they stay separate areas, and light shines through.");
await rowClick("Wall 3–4", "No wall", 0.6);
await pointPlan(8.75, 4, 0.6);
await sayOver("Every wall also has a “Thickness” field – for that one thicker exterior wall or a thin partition. The circular arrow resets it to the house setting.");
await rowClick("Wall 1–2", "thick", 0.6);
await H.typeOver("0,365");
await R.hold(0.6);
await rowClick("Wall 1–2", "↺", 0.5);
await sayOver("When two rooms share a wall, the thicker setting wins – and the wall stays centred on the boundary.");
await pointPlan(6.75, 0, 0.6);

// ---------------------------------------------------------------- 9. A free-standing wall
await chapter("Alone wall: room divider");
await sayOver("That leaves the room divider. For that there's the “Wall” tool at the top, “Wall”: just drag. Shift keeps it straight, Alt draws without snapping.");
await R.clickOn({ text: "Wall", exact: true }, 0.5);
await dragPlan([3.5, 5], [5.2, 5], 1.1);
await sayOver("Where it meets a room wall, the corner is joined cleanly. On the right you have “Length”, “Wall thickness” and “Height”.");
await R.hold(0.8);
await R.moveTo({ label: "Length" }, 0.5);
await sayOver("According to the plan: two metres long, ten centimetres thick and 1.20 high – a half-height wall.");
await fill("Length", "2");
await fill("Wall thickness", "0,1");
await fill("Height", "1,2");
await sayOver("You drag the ends by their handles and the whole wall by its line. Doors and windows work in single walls too – and “Delete” removes them along with it.");
await pointPlan(5.5, 5, 0.6);
await R.hold(0.6);
await pointPlan(4.5, 5, 0.5);
await R.hold(0.4);
await R.moveTo({ text: "Delete", exact: true }, 0.6);

// ---------------------------------------------------------------- 10. 3D check
await chapter("Kontrolle in 3D");
await sayOver("Now let's check: “3D beside”, shows the house right next to the plan.");
await R.clickOn({ text: "3D beside", exact: true }, 0.6);
await R.sleep(1500);
await H.view2d(52, 60, 330);
const D = { theta: 0.3, phi: 0.95, radius: 32, target: { x: 7, y: 0.75, z: 4.25 } };
const E = { theta: 0.95, phi: 0.8, radius: 30, target: { x: 7, y: 0.75, z: 4.25 } };
await H.view3d(D);
await R.sleep(1200);
await R.frame(1 / 25, 200);
await sayOver("At the top you switch between “Tall walls” – all walls at full height – and “Cut”: then they're cut off at hip height.");
await R.clickOn({ text: "Tall walls", exact: true }, 0.6);
await R.sleep(800);
await R.hold(1);
await R.clickOn({ text: "Cut", exact: true }, 0.6);
await R.sleep(800);
await R.clickOn({ text: "Tall walls", exact: true }, 0.6);
await catchUp();
await R.hideCursor();
await sayOver("There they are: the counter to the kitchen, the open hallway, the garage and the half-height divider in the living room.");
await H.glide3d(D, E, 6);

// ---------------------------------------------------------------- 11. Outro
await chapter("Wie geht es weiter");
await R.title("Part 2: Doors and garage door", `HomePlan 3D – also runs on old wall tablets${VERSION}`);
await say("That was part 1: setting up the plan, tracing the rooms, adjusting the walls. Part 2 adds the doors and the garage door, part 3 the windows – with contacts and blinds.");
await say("Left to the online demo and the manual are in the description. And NeonPlan runs on old wall tablets too. See you in part 2!");
await R.hold(0.6);

N.report();
const result = await R.finish();
console.log(`recorded ${result.frames} frames, ${result.duration.toFixed(1)} s → ${out}`);
