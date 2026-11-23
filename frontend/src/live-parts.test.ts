import assert from "node:assert/strict";
import { test } from "node:test";
import { bindValue, hasLiveParts, liveGroups, liveKey, slotEntity } from "./live-parts.ts";
import { finishHex, finishRolesOf } from "./finishes.ts";
import { buildIndex, filterEntries } from "./library-index.ts";
import type { HassEntity } from "./types.ts";
import type { PackItem } from "./packs.ts";

const st = (entity_id: string, state: string, attributes: Record<string, unknown> = {}) => ({ entity_id, state, attributes }) as unknown as HassEntity;

test("live parts: a door opens with its contact, a cover with its position, a tank fills with its percent", () => {
  assert.equal(bindValue("open", st("binary_sensor.door", "on")), 1);
  assert.equal(bindValue("open", st("binary_sensor.door", "off")), 0);
  assert.equal(bindValue("open", st("cover.flap", "open", { current_position: 40 })), 0.4);
  assert.equal(bindValue("level", st("sensor.print_progress", "37", { unit_of_measurement: "%" })), 0.37);
  assert.equal(bindValue("level", st("sensor.fill", "0.8")), 0.8);
  assert.equal(bindValue("spin", st("sensor.fan_power", "120", { unit_of_measurement: "W" })), 1);
  assert.equal(bindValue("open", undefined), 0);
});

test("live parts: a status light shows fine, off or a fault", () => {
  assert.equal(bindValue("blink", st("binary_sensor.server", "on")), 1);
  assert.equal(bindValue("blink", st("sensor.printer", "printing")), 1);
  assert.equal(bindValue("blink", st("binary_sensor.server", "off")), 0);
  assert.equal(bindValue("blink", st("sensor.printer", "error")), -1);
  assert.equal(bindValue("blink", st("binary_sensor.nas", "unavailable")), -1);
  assert.equal(bindValue("blink", st("binary_sensor.problem", "on", { device_class: "problem" })), -1);
});

test("live parts are grouped by slot and kind; one slot takes the item's own entity", () => {
  const parts = [
    { bind: { slot: "door", kind: "open" as const, hinge: "left" as const } },
    { bind: { slot: "door", kind: "open" as const, hinge: "left" as const } },
    { bind: { slot: "status", kind: "blink" as const } },
    {},
  ];
  const groups = liveGroups(parts);
  assert.equal(groups.size, 2);
  assert.equal(groups.get(liveKey(parts[0].bind!))?.parts.length, 2);
  assert.equal(hasLiveParts({ parts }), true);
  assert.equal(hasLiveParts({ parts: [{}] }), false);
  assert.equal(slotEntity(null, "door", 1, "binary_sensor.own"), "binary_sensor.own");
  assert.equal(slotEntity(null, "door", 2, "binary_sensor.own"), null);
  assert.equal(slotEntity({ door: "binary_sensor.x" }, "door", 2, null), "binary_sensor.x");
  // an oven's power switch does not open its door: the slot takes contacts only
  assert.equal(slotEntity(null, "door", 1, "switch.oven", ["binary_sensor"]), null);
  assert.equal(slotEntity(null, "door", 1, "binary_sensor.oven_door", ["binary_sensor"]), "binary_sensor.oven_door");
});

test("finishes: the roles a built-in or a pack item is drawn with, and a placed item's colour", () => {
  assert.deepEqual(finishRolesOf("sofa", null), ["fabric", "wood"]);
  assert.deepEqual(finishRolesOf("fridge", null), []);
  const item = { id: "x", name: { en: "x" }, size: [1, 1, 1], parts: [{ color: "wood" }, { color: "cushion", top: "white" }] } as unknown as PackItem;
  assert.deepEqual(finishRolesOf("pack:p:x", item), ["wood", "fabric", "front"]);
  assert.equal(finishHex({ finish: { wood: "#6b4a32" } }, "wood"), "#6b4a32");
  assert.equal(finishHex({ finish: { wood: "red" } }, "wood"), null);
  assert.equal(finishHex({}, "fabric"), null);
});

test("the library indexes installed local packs with their items, sizes and search words", () => {
  const living = { id: "mastershort.living", name: "Living room", items: [{ id: "sofa_3", name: { en: "3-seat sofa" }, size: [2.1, 0.9, 0.8], parts: [] }] };
  const entries = buildIndex({ packs: [living as never], basics: [], language: "en", basicName: (t) => t, basicNameEn: (t) => t, kindName: (k) => k, size: () => [1, 1, 1] });
  assert.deepEqual(entries.map((e) => e.type), ["pack:mastershort.living:sofa_3"]);
  assert.equal(entries[0].label, "3-seat sofa");
  assert.equal(entries[0].pack, "mastershort.living");
  assert.equal((entries[0] as { locked?: unknown }).locked, undefined);
  const f = { query: "sofa", room: null, electric: false, light: false, outdoor: false };
  assert.equal(filterEntries(entries, f).length, 1);
  assert.equal(filterEntries(entries, { ...f, query: "treppe" }).length, 0);
});
