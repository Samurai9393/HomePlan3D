import assert from "node:assert/strict";
import test from "node:test";
import { ENABLED_FEATURES, FEATURES, FUN, OPEN_SOURCE, hasFeature, knownFeature, labOn, released, unlockedFeatures } from "./features.ts";

test("the open-source configuration enables every feature it lists", () => {
  assert.equal(OPEN_SOURCE.mode, "open-source");
  assert.equal(OPEN_SOURCE.license, "MIT");
  assert.ok(OPEN_SOURCE.features.length > 0);
  for (const f of OPEN_SOURCE.features) assert.equal(f.enabled, true, `${f.id} is disabled`);
  assert.deepEqual(ENABLED_FEATURES, OPEN_SOURCE.features.map((f) => f.id));
});

test("features no longer depend on installed packs", () => {
  for (const f of OPEN_SOURCE.features) {
    assert.equal(hasFeature(f.id), true);
    assert.equal(hasFeature(f.id, []), true, `${f.id} needs a pack`);
    assert.equal(hasFeature(f.id, [{ features: ["something_else"] }]), true);
  }
  assert.equal(released("pool"), true);
  assert.equal(released("room_bar"), true);
  assert.equal(released("diagnostics"), true);
  assert.equal(labOn(), false, "the lab switch has no gating left to do");
});

test("the configuration covers the feature lists the UI uses", () => {
  for (const f of [...FEATURES, ...FUN]) assert.ok(knownFeature(f), `${f} is missing from the config`);
  for (const f of ["pool", "room_bar", "fridge_smart", "diagnostics", "locate"]) assert.ok(knownFeature(f));
  const unlocked = unlockedFeatures([]);
  for (const f of [...FEATURES, ...FUN]) assert.ok(unlocked.has(f), `${f} is not unlocked`);
});
