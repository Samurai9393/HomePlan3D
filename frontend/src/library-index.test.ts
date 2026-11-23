import assert from "node:assert/strict";
import { test } from "node:test";
import { basicTypes, buildIndex, cardsOf, classify, familyLabel, familyOf, filterEntries, roomKindOf, sizeText, variantLabel, type LibraryEntry } from "./library-index.ts";
import type { FurniturePack, PackItem } from "./packs.ts";

const part = { shape: "box" as const, x: 0, z: 0, w: 1, d: 1, y: 0, h: 1, color: "dark" };
const item = (id: string, en: string, extra: Partial<PackItem> = {}): PackItem => ({ id, name: { en }, size: [1, 0.5, 0.8], parts: [part], ...extra });

test("pack items are classified by their words, with the pack's room as the fallback", () => {
  assert.deepEqual(classify("mastershort.living", item("sofa_3", "3-seater sofa")), { kind: "sofa", rooms: ["living"] });
  assert.deepEqual(classify("mastershort.kitchen", item("base_60", "Base unit 60")), { kind: "kitchen", rooms: ["kitchen"] });
  assert.deepEqual(classify("mastershort.kitchen", item("coffee_machine", "Bean-to-cup coffee machine")).kind, "appliance");
  assert.deepEqual(classify("mastershort.pets", item("cat_tree", "Cat tree (large)")).kind, "pets");
  assert.deepEqual(classify("mastershort.garden", item("tree_oak", "Oak")), { kind: "plant", rooms: ["garden"] });
  assert.deepEqual(classify("mastershort.vehicles", item("campervan", "Campervan (pop-top)")), { kind: "vehicle", rooms: ["garage"] });
  assert.deepEqual(classify("mastershort.kids", item("kids_desk", "Kids desk")).kind, "kids");
  assert.deepEqual(classify("mastershort.bath", item("mirror_round", "Round mirror with light")).kind, "bath");
  assert.deepEqual(classify("mastershort.smarthome", item("wallbox", "Wallbox")).kind, "energy");
  assert.deepEqual(classify("mastershort.utility", item("gas_boiler", "Gas condensing boiler")).kind, "heating");
  assert.deepEqual(classify("mastershort.cinema", item("tower_speaker", "Floor-standing speaker")), { kind: "media", rooms: ["living", "hobby"] });
  assert.deepEqual(classify("mastershort.stairs", item("railing_glass", "Glass railing")).kind, "stairs");
  assert.deepEqual(classify("mastershort.office", item("printer_3d", "3D printer")).kind, "tech");
  assert.deepEqual(classify("mastershort.living", item("arc_lamp", "Arc floor lamp")).kind, "lamp");
  // a pack's own fields win
  assert.deepEqual(classify("mastershort.living", item("thing", "Sofa", { group: "deco", room: ["hall"] })), { kind: "deco", rooms: ["hall"] });
  // unknown words fall back to deco in the pack's room
  assert.deepEqual(classify("mastershort.bedroom", item("xyz", "Zorbulator")), { kind: "deco", rooms: ["bedroom"] });
});

test("a room's English name tells which room kind it is", () => {
  assert.equal(roomKindOf("Living room"), "living");
  assert.equal(roomKindOf("Lounge"), "living");
  assert.equal(roomKindOf("Kitchen"), "kitchen");
  assert.equal(roomKindOf("Dining"), "dining");
  assert.equal(roomKindOf("Kids' room Mia"), "kids");
  assert.equal(roomKindOf("Bedroom"), "bedroom");
  assert.equal(roomKindOf("Bathroom"), "bath");
  assert.equal(roomKindOf("Guest WC"), "bath");
  assert.equal(roomKindOf("Study"), "office");
  assert.equal(roomKindOf("Hallway"), "hall");
  assert.equal(roomKindOf("Utility room"), "utility");
  assert.equal(roomKindOf("Garage"), "garage");
  assert.equal(roomKindOf("Garden terrace"), "garden");
  assert.equal(roomKindOf("Hobby room"), "hobby");
  assert.equal(roomKindOf("Room 3"), null);
});

test("families: the size suffix of the id, the numbers of the name as the chip, the name without them as the label", () => {
  assert.equal(familyOf(item("sofa_3", "3-seater sofa")), "sofa");
  assert.equal(familyOf(item("cube_4x2", "Cube shelf 4 × 2")), "cube");
  assert.equal(familyOf(item("chesterfield", "Chesterfield sofa")), null);
  assert.equal(familyOf(item("x", "x", { family: "fam" })), "fam");
  assert.equal(familyLabel("Dining table 160 × 90"), "Dining table");
  assert.equal(familyLabel("Side table 160 × 90"), "Side table");
  assert.equal(familyLabel("2-seater sofa"), "Sofa");
  assert.equal(familyLabel("Sofa 2-seater"), "Sofa");
  assert.equal(familyLabel("3-door wardrobe"), "Wardrobe");
  assert.equal(familyLabel("Smart display 15″ (wall)"), "Smart display (wall)");
  assert.equal(variantLabel("Bed 160 × 200"), "160 × 200");
  assert.equal(variantLabel("2-seater sofa"), "2");
  assert.equal(variantLabel("Chesterfield sofa"), null);
});

test("the index lists built-in kinds and pack items, folds families into cards and filters by room, words and chips", () => {
  const pack: FurniturePack = {
    id: "mastershort.living",
    name: "Living room",
    publisher: "Mastershort",
    licensee: null,
    release: 4,
    items: [
      item("sofa_2", "2-seater sofa"),
      item("sofa_3", "3-seater sofa"),
      item("chesterfield", "Chesterfield sofa"),
      item("arc_lamp", "Arc floor lamp", { light: "floor" }),
      item("tv_stand", "TV on a stand", { electric: true }),
    ],
  };
  const entries = buildIndex({
    packs: [pack],
    basics: basicTypes(),
    language: "en",
    basicName: (t) => `EN ${t}`,
    basicNameEn: (t) => `EN ${t}`,
    kindName: (k) => `kind ${k}`,
    size: () => [1, 1, 1],
  });
  assert.ok(entries.length > 70, "built-in kinds are in");
  const sofa2 = entries.find((e) => e.type === "pack:mastershort.living:sofa_2")!;
  assert.equal(sofa2.label, "2-seater sofa");
  assert.equal(sofa2.family, "sofa");
  assert.equal(sofa2.variant, "2");
  assert.equal(sofa2.packRelease, 4);
  assert.equal(entries.find((e) => e.type === "pack:mastershort.living:arc_lamp")!.light, true);

  const sofas = cardsOf(entries, "sofa");
  const family = sofas.find((c) => c.key === "mastershort.living:sofa")!;
  assert.equal(family.label, "Sofa");
  assert.equal(family.entries.length, 2);
  assert.ok(sofas.some((c) => c.key === "pack:mastershort.living:chesterfield"), "a lone item is its own card");
  assert.ok(sofas.some((c) => c.key === "sofa"), "the built-in sofa is a card too");

  const none = { query: "", room: null, electric: false, light: false, outdoor: false };
  assert.equal(filterEntries(entries, { ...none, query: "chester" }).length, 1);
  assert.equal(filterEntries(entries, { ...none, query: "sofa seat" }).length, 2, "every word must match");
  assert.ok(filterEntries(entries, { ...none, query: "tv stand" }).some((e) => e.type === "pack:mastershort.living:tv_stand"));
  assert.ok(filterEntries(entries, { ...none, query: "lamp" }).some((e) => e.type === "lamp_ceiling"), "everyday words find a kind");
  const kitchen = filterEntries(entries, { ...none, room: "kitchen" });
  assert.ok(kitchen.every((e) => !e.rooms.length || e.rooms.includes("kitchen")));
  assert.ok(!kitchen.some((e) => e.type === "pack:mastershort.living:sofa_2"));
  assert.ok(kitchen.some((e) => e.type === "lamp_ceiling"), "items for any room fit every room");
  assert.ok(filterEntries(entries, { ...none, light: true }).every((e: LibraryEntry) => e.light));
  assert.ok(filterEntries(entries, { ...none, electric: true }).some((e) => e.type === "pack:mastershort.living:tv_stand"));
});

test("an item for one side gets a mirrored twin for the other, explicit pairs become a family", () => {
  const pack: FurniturePack = {
    id: "mastershort.living",
    name: "Living room",
    publisher: "Mastershort",
    licensee: null,
    items: [item("sofa_chaise", "Sofa with chaise (left)"), item("corner_left", "Corner sofa (left)"), item("corner_right", "Corner sofa (right)")],
  };
  const entries = buildIndex({ packs: [pack], basics: [], language: "en", basicName: (t) => t, basicNameEn: (t) => t, kindName: (k) => k, size: () => [1, 1, 1] });
  const twin = entries.find((e) => e.key === "pack:mastershort.living:sofa_chaise#m")!;
  assert.ok(twin, "a twin exists");
  assert.equal(twin.mirror, true);
  assert.equal(twin.type, "pack:mastershort.living:sofa_chaise");
  assert.equal(twin.label, "Sofa with chaise (right)");
  assert.ok(!entries.some((e) => e.key.endsWith("corner_left#m")), "an explicit pair needs no twin");
  const cards = cardsOf(entries, "sofa");
  const chaise = cards.find((c) => c.key === "mastershort.living:pack:mastershort.living:sofa_chaise")!;
  assert.equal(chaise.entries.length, 2);
  assert.deepEqual(chaise.entries.map((e) => e.variant), ["left", "right"]);
  const corner = cards.find((c) => c.key === "mastershort.living:corner")!;
  assert.equal(corner.entries.length, 2, "corner_left and corner_right fold into one card");
});

test("sizes read as centimetres, big things as metres", () => {
  assert.equal(sizeText([2.1, 0.92, 0.85], "en"), "210 × 92 cm");
  assert.equal(sizeText([12, 3.5, 2], "en"), "12 × 3.5 m");
});
