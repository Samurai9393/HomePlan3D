import assert from "node:assert/strict";
import { test } from "node:test";
import { restoreBackup, RESTORE_WHOLE_MAX } from "./api.ts";
import { emptyBuilding } from "./model.ts";
import type { HomeAssistant } from "./types.ts";

function fakeHass(fail: string[] = []) {
  const sent: Record<string, unknown>[] = [];
  const hass = {
    callWS: async (msg: Record<string, unknown>) => {
      sent.push(msg);
      if (msg.type === "homeplan3d/backup/import") return { revision: 2, building: msg.building, packs: (msg.packs as unknown[]).length, skipped: [] };
      const pack = JSON.parse(msg.pack as string) as { id?: string; payload?: { id?: string } };
      const id = pack.payload?.id ?? pack.id ?? "unknown";
      if (fail.includes(id)) throw { code: "wrong_instance" };
      return { id };
    },
  } as unknown as HomeAssistant;
  return { hass, sent };
}

// A stored pack keeps the original unsigned file as `source`; older backups may still carry a signature envelope.
const pack = (id: string, size: number) => ({ id, name: id, source: { id, blob: "x".repeat(size) }, imported_at: 1 }) as never;

test("a small backup is restored in one message, as before", async () => {
  const { hass, sent } = fakeHass();
  const res = await restoreBackup(hass, { building: emptyBuilding(), packs: [pack("a", 100), pack("b", 100)] });
  assert.equal(sent.length, 1);
  assert.equal(res.packs, 2);
});

test("a backup too large for one message sends the plan first and every unsigned pack on its own (#1213)", async () => {
  const { hass, sent } = fakeHass(["b"]);
  const big = Math.ceil(RESTORE_WHOLE_MAX / 2);
  const bare = { id: "bare", name: "bare" } as never;
  const legacy = { id: "legacy", name: "legacy", source: { payload: { id: "legacy", blob: "x" }, signature: { key: "k", value: "v" } } } as never;
  const res = await restoreBackup(hass, { building: emptyBuilding(), packs: [pack("a", big), pack("b", big), bare, legacy] });
  assert.deepEqual(sent.map((m) => m.type), [
    "homeplan3d/backup/import",
    "homeplan3d/packs/import",
    "homeplan3d/packs/import",
    "homeplan3d/packs/import",
    "homeplan3d/packs/import",
  ]);
  assert.deepEqual(sent[0].packs, []);
  assert.ok(sent.every((m) => JSON.stringify(m).length <= RESTORE_WHOLE_MAX));
  assert.deepEqual(JSON.parse(sent[1].pack as string), { id: "a", blob: "x".repeat(big) });
  assert.deepEqual(JSON.parse(sent[3].pack as string), { id: "bare", name: "bare" });
  assert.deepEqual(JSON.parse(sent[4].pack as string), (legacy as { source: unknown }).source);
  assert.equal(res.packs, 3);
  assert.deepEqual(res.skipped, [{ id: "b", reason: "wrong_instance" }]);
});
