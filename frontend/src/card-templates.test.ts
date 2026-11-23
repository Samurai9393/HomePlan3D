import assert from "node:assert/strict";
import { test } from "node:test";
import { cardTemplate, editWorking, effectiveConfig, publishDraft, renameTemplate, setLive, templateId, workingConfig, type CardConfig } from "./card-config.ts";
import { emptyBuilding, type Building } from "./model.ts";

const plan = (): Building => ({
  ...emptyBuilding(),
  card_templates: [{ id: "kueche_fire", name: "Kitchen Fire tablet", config: { floor: "eg", room_bar: true, height: 600 } }],
});
const card = (c: Partial<CardConfig> = {}): CardConfig => ({ type: "custom:homeplan3d-card", ...c });

test("card templates: a card naming a template shows the template, with only its size of its own", () => {
  const c = effectiveConfig(card({ template: "kueche_fire", height: 800, plain: true, screen: "Hallway" }), plan());
  assert.equal(c.floor, "eg");
  assert.equal(c.room_bar, true);
  assert.equal(c.height, 800, "the card's size is its own (it belongs to the dashboard)");
  assert.equal(c.plain, undefined, "an old card's floor plan only does not hide the furniture");
  assert.equal(c.type, "custom:homeplan3d-card");
  assert.equal(c.screen, "Kitchen Fire tablet", "the template's name is the screen name");
});

test("card templates: without a template, or with one the plan lacks, the YAML stays as it is", () => {
  const own = card({ floor: "og" });
  assert.equal(effectiveConfig(own, plan()), own);
  const missing = card({ template: "weg", floor: "og" });
  assert.equal(effectiveConfig(missing, plan()), missing);
  assert.equal(effectiveConfig(card({ template: "kueche_fire" }), null).floor, undefined, "the plan still loading");
});

test("card templates: an id from the name, accents removed, unique in the plan", () => {
  assert.equal(templateId("Kitchen Fire tablet", []), "kitchen_fire_tablet");
  assert.equal(templateId("Hallway", ["hallway"]), "hallway_2");
  assert.equal(templateId("Hallway", ["hallway", "hallway_2"]), "hallway_3");
  assert.equal(templateId("  ", []), "template");
  assert.equal(templateId("Cafe Street", []), "cafe_street");
});

test("card templates: renamed, the id follows the name and the old one still finds the template", () => {
  const b = plan();
  const list = b.card_templates!;
  list.push({ id: "flur", name: "Hallway", config: {} });
  assert.equal(renameTemplate(list, "kueche_fire", "Kitchen tablet")?.id, "kitchen_tablet");
  assert.deepEqual(list[0].aliases, ["kueche_fire"]);
  assert.equal(cardTemplate(b, "kueche_fire")?.name, "Kitchen tablet", "a tablet set up before");
  assert.equal(effectiveConfig(card({ template: "kueche_fire" }), b).floor, "eg");
  // named back: no alias for its own id; a name another template has gets a number
  renameTemplate(list, "kitchen_tablet", "Kitchen Fire");
  assert.deepEqual(list[0].aliases, ["kueche_fire", "kitchen_tablet"].filter((x) => x !== list[0].id));
  assert.equal(renameTemplate(list, "flur", "Kitchen tablet")?.id, "kitchen_tablet_2", "the first one still answers to it");
});

test("card templates: with \"send with a button\" the tablets keep the old options until they are sent", () => {
  const b = plan();
  const tpl = b.card_templates![0];
  setLive(tpl, false);
  editWorking(tpl, { ...workingConfig(tpl), clock: "tl" });
  assert.equal(effectiveConfig(card({ template: "kueche_fire" }), b).clock, undefined, "the tablet still shows the old state");
  assert.equal(workingConfig(tpl).clock, "tl", "the editor and its preview the new one");
  publishDraft(tpl);
  assert.equal(effectiveConfig(card({ template: "kueche_fire" }), b).clock, "tl");
  assert.equal(tpl.draft, undefined);
  // back to live: a change not sent yet goes out with it
  editWorking(tpl, { ...workingConfig(tpl), clock: "br" });
  setLive(tpl, true);
  assert.equal(tpl.config.clock, "br");
  assert.equal(tpl.live, undefined);
});

test("card templates: an old card's fill and full-screen button stay, its floor plan only does not", () => {
  const c = effectiveConfig(card({ template: "kueche_fire", fill: true, fullscreen_button: true, plain: true, time_travel: true }), plan());
  assert.equal(c.fill, true);
  assert.equal(c.fullscreen_button, true);
  assert.equal(c.plain, undefined);
  assert.equal(c.time_travel, undefined, "everything else comes from the template");
});
