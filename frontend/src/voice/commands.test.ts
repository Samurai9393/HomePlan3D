import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyBuilding, newFloor, type Room } from "../model.ts";
import { findPlace, normalize, showCommand, withoutHere } from "./commands.ts";

const room = (id: string, name: string): Room => ({ id, name, area_id: null, points: [], floor_material: "wood" });
const building = {
  ...emptyBuilding(),
  floors: [
    { ...newFloor("gf", "Ground floor", 0), rooms: [room("lr", "Living room"), room("wc", "WC"), room("gwc", "Guest WC")] },
    { ...newFloor("uf", "Upper floor", 2.8), rooms: [room("kr", "Kids' room")] },
  ],
};

test("normalize: lower case, no accents or punctuation", () => {
  assert.equal(normalize("Guest WC!"), "guest wc");
  assert.equal(normalize("  Café "), "cafe");
});

test("a sentence names a room, a floor or the house", () => {
  assert.deepEqual(findPlace("Show me the living room", building), { kind: "room", floorId: "gf", roomId: "lr", name: "Living room" });
  assert.equal(findPlace("go to the guest WC", building)?.name, "Guest WC");
  assert.equal(findPlace("WC please", building)?.name, "WC");
  assert.deepEqual(findPlace("Upper floor", building), { kind: "floor", floorId: "uf", name: "Upper floor" });
  assert.equal(findPlace("show the whole house", building)?.kind, "house");
  assert.equal(findPlace("turn the light on", building), null);
  assert.equal(findPlace("", building), null);
});

test("a command to show: a show word or a bare place name – not a sentence that only names the room", () => {
  assert.equal(showCommand("Show the living room", building)?.name, "Living room");
  assert.equal(showCommand("Living room", building)?.name, "Living room");
  assert.equal(showCommand("the upper floor please", building)?.name, "Upper floor");
  assert.equal(showCommand("show the whole house", building)?.kind, "house");
  assert.equal(showCommand("Living room light on", building), null);
  assert.equal(showCommand("How warm is it in the kids' room", building), null);
  // the Home Assistant area's own name counts too
  assert.equal(showCommand("go to the den", building, (r) => (r.id === "lr" ? "Den" : null))?.name, "Living room");
});

test("a sentence said in the tablet's room loses its 'here'", () => {
  assert.equal(withoutHere("Turn the light on here", "en"), "Turn the light on");
  assert.equal(withoutHere("Light here on.", "en-US"), "Light on.");
  assert.equal(withoutHere("Here light off", "en"), "light off");
  // only whole words, not a word that happens to start with it
  assert.equal(withoutHere("Turn the light on hereabouts", "en"), "Turn the light on hereabouts");
  assert.equal(withoutHere("give her the light", "en"), "give her the light");
  // nothing left: the sentence as said
  assert.equal(withoutHere("here", "en"), "here");
});

test("room intents: vacuum and everything off, for a named room, here or there", async () => {
  const { roomIntent, saysThere, withoutThere } = await import("./commands.ts");
  const b = { ...emptyBuilding(), floors: [{ ...newFloor("gf", "Ground floor", 0), rooms: [{ id: "k", name: "Kitchen", area_id: "kitchen", points: [] }] }] } as never;
  assert.deepEqual(roomIntent("Vacuum the kitchen", b, "en"), { action: "clean", room: { floorId: "gf", roomId: "k" } });
  assert.deepEqual(roomIntent("Vacuum here", b, "en"), { action: "clean", room: "here" });
  assert.deepEqual(roomIntent("Turn everything off there", b, "en"), { action: "off", room: "there" });
  assert.deepEqual(roomIntent("Everything off", b, "en"), { action: "off", room: null });
  assert.deepEqual(roomIntent("Turn everything off in the kitchen", b, "en"), { action: "off", room: { floorId: "gf", roomId: "k" } });
  assert.equal(roomIntent("Light in the kitchen on", b, "en"), null);
  assert.equal(saysThere("Turn the light off there", "en"), true);
  assert.equal(withoutThere("Turn the light off there", "en"), "Turn the light off");
});
