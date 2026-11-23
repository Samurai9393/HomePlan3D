import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyBuilding, newFloor, type Room } from "../model.ts";
import { showTarget, SYNONYMS, type Shown } from "./targets.ts";

const room = (id: string, name: string): Room => ({ id, name, area_id: null, points: [], floor_material: "wood" });
const building = {
  ...emptyBuilding(),
  floors: [{ ...newFloor("gf", "Ground floor", 0), rooms: [room("lr", "Living room"), room("hall", "Hallway"), room("ga", "Garden"), room("ut", "Utility room")] }],
};
const dev = (entity: string, name: string, room: string, camera = false): Shown => ({ id: entity, entity, name, room, camera });
const devices: Shown[] = [
  dev("camera.driveway", "Driveway camera", "Hallway", true),
  dev("camera.garden", "Garden cam", "Garden", true),
  dev("switch.washer", "Washing machine", "", false),
  dev("light.floor_lamp", "Floor lamp", "Living room"),
  dev("light.hall", "Hallway light", "Hallway"),
  dev("light.lr", "Living room ceiling", "Living room"),
];

const t = (s: string, d: readonly Shown[] = devices) => showTarget(s, building, d);
const id = (r: ReturnType<typeof t>) => (r as { id: string } | null)?.id;

test("devices by name, with a word that asks to see them", () => {
  assert.deepEqual(t("Show the washing machine"), { kind: "device", id: "switch.washer", entity: "switch.washer", name: "Washing machine", camera: false });
  assert.equal(id(t("Where is the floor lamp")), "light.floor_lamp");
  // naming a device without asking to see it is for Assist
  assert.equal(t("Hallway light on"), null);
});

test("cameras: by name, by 'camera' and their room, or all of them", () => {
  assert.equal(id(t("Show the driveway camera")), "camera.driveway");
  // a compound: "drivewaycamera" is "driveway" and "camera", so is "gardencam"
  assert.equal(id(t("Show the drivewaycamera")), "camera.driveway");
  assert.equal(id(t("show the gardencam")), "camera.garden");
  assert.equal(id(t("show the camera in the garden")), "camera.garden");
  assert.equal(t("Show me the cameras")?.kind, "cameras");
});

test("own aliases: a device by its further names, a room by its own", () => {
  const items: Shown[] = [{ id: "media_player.tv", entity: "media_player.tv", name: "Smart TV Pro", names: ["Smart TV Pro", "Living room television", "Telly"], room: "Living room", camera: false }];
  assert.equal(id(t("Show the living room television", items)), "media_player.tv");
  assert.equal(id(t("where is the telly", items)), "media_player.tv");
  const b = { ...building, floors: [{ ...building.floors[0], rooms: [{ ...room("lr", "Living room"), aliases: ["Den"] }] }] };
  assert.equal(showTarget("Show the den", b, [])?.kind, "room");
});

test("rooms stay rooms when a device only shares their name", () => {
  assert.deepEqual(t("Show the living room"), { kind: "room", floorId: "gf", roomId: "lr", name: "Living room" });
  assert.equal(id(t("Show the living room ceiling")), "light.lr");
  assert.equal(t("Garden")?.kind, "room");
});

test("furniture answers to its kind, its own name, everyday words and its sensor's name without the measuring word", () => {
  const items: Shown[] = [
    { id: "sensor.washer_power", entity: "sensor.washer_power", name: "Washing machine", names: ["Washing machine", "Washing machine power", ...SYNONYMS.washer], room: "Utility room", camera: false },
    { id: "furniture:d1", entity: null, name: "Dryer", names: ["Dryer", ...SYNONYMS.dryer], room: "Utility room", camera: false },
    { id: "media_player.tv", entity: "media_player.tv", name: "TV", names: ["Samsung TV", "TV", ...SYNONYMS.tv_board], room: "Living room", camera: false },
    { id: "furniture:p1", entity: null, name: "Pool pump", names: ["Pool pump", ...SYNONYMS.pool_pump], room: "Garden", camera: false },
    { id: "furniture:h1", entity: null, name: "Radiator", names: ["Radiator", ...SYNONYMS.radiator], room: "Hallway", camera: false },
    { id: "furniture:h2", entity: null, name: "Radiator", names: ["Radiator", ...SYNONYMS.radiator], room: "Living room", camera: false },
  ];
  // the sensor is "Washing machine power", asked for as the machine
  assert.equal(id(t("Show the washing machine", items)), "sensor.washer_power");
  assert.equal(id(t("Is the laundry running? show it", items)), "sensor.washer_power");
  // without any entity, by its kind
  assert.equal(id(t("Where is the dryer", items)), "furniture:d1");
  // everyday words
  assert.equal(id(t("Show the TV", items)), "media_player.tv");
  assert.equal(id(t("show the telly", items)), "media_player.tv");
  assert.equal(id(t("where is the pool pump", items)), "furniture:p1");
  assert.equal(id(t("show the pump", items)), "furniture:p1");
  // two of a kind: the one in the room named, else the first
  assert.equal(id(t("Show the heating in the living room", items)), "furniture:h2");
  assert.equal(id(t("Show the heating", items)), "furniture:h1");
  // the room still wins over a device that only shares its name
  assert.equal(t("Show the living room", items)?.kind, "room");
});

test("a room's own name wins over an outdoor area answering to the same name (#668)", () => {
  // the driveway on the ground floor is linked to the Home Assistant area "Garage"; the room "Garage" is in the basement
  const square: [number, number][] = [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
  ];
  const drive = { id: "drive", type: "driveway" as const, points: square, area_id: "garage", name: "" };
  const ground = { ...newFloor("gf", "Ground floor", 0), rooms: [room("lr", "Living room")], outdoor: [drive] };
  const basement = { ...newFloor("bs", "Basement", -2.5), rooms: [room("storage", "Pantry"), { ...room("ga", "Garage"), area_id: "garage" }] };
  const b = { ...emptyBuilding(), floors: [ground, basement] };
  const areas: Record<string, string> = { garage: "Garage" };
  const alias = (r: Room) => (r.area_id ? areas[r.area_id] : null);
  assert.deepEqual(showTarget("Show me garage", b, [], alias), { kind: "room", floorId: "bs", roomId: "ga", name: "Garage" });
  assert.deepEqual(showTarget("Show me pantry", b, [], alias), { kind: "room", floorId: "bs", roomId: "storage", name: "Pantry" });
  // a device in the driveway called "Garage" (the door's drive) does not take the room's place either
  const opener: Shown[] = [{ id: "cover.garage", entity: "cover.garage", name: "Garage", room: "", camera: false }];
  assert.equal(showTarget("Show me garage", b, opener, alias)?.kind, "room");
  // the room's own name only, without Home Assistant's area name: the same
  const b2 = { ...b, floors: [ground, { ...basement, rooms: [room("storage", "Pantry"), room("ga", "Garage")] }] };
  assert.equal((showTarget("Show me garage", b2, [], alias) as { roomId: string }).roomId, "ga");
  // an outdoor area's own name still beats a further name (alias) of a room
  const b3 = { ...b, floors: [{ ...ground, outdoor: [{ ...drive, name: "Driveway" }] }, { ...basement, rooms: [{ ...room("ga", "Garage"), aliases: ["Driveway"] }] }] };
  assert.equal((showTarget("Show the driveway", b3, [], alias) as { roomId: string }).roomId, "drive");
});
