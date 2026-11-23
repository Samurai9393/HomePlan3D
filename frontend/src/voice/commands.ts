// Spoken commands: which room, floor or the whole house a sentence names ("Show the living room", "go to the
// upper floor", "show the kitchen"). Matched on the plan's own names, so no sentences have to be taught to anyone.

import { zonesOf, type Building, type Room } from "../model.ts";

export type Place = { kind: "room"; floorId: string; roomId: string; name: string } | { kind: "floor"; floorId: string; name: string } | { kind: "house"; name: string };

/** Lower case, without accents and punctuation: "Kids' room (Lea)!" → "kids room lea". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const HOUSE = /\b(house|whole house|home|overview|everything)\b/;

/** Whether `name` stands in `text` as whole words. */
function says(text: string, name: string): boolean {
  if (!name) return false;
  return ` ${text} `.includes(` ${name} `);
}

/**
 * The place a sentence names: a room (the longest name that stands in it wins, "Guest WC" before "WC"), else a
 * floor, else the whole house; null when it names none.
 */
/** Further names of a room: its Home Assistant area's name and its own aliases. */
export type RoomAlias = (room: Room) => string | null | undefined | (string | null | undefined)[];

export function findPlace(sentence: string, building: Building, alias?: RoomAlias): Place | null {
  const text = normalize(sentence);
  if (!text) return null;
  let best: Place | null = null;
  let len = 0;
  // between names of the same length: a room's own name before an outdoor area's, and both before a further name
  // (the Home Assistant area's, an alias) – "Garage" is the room in the basement, not the driveway linked to the
  // garage's area (#668)
  let rank = -1;
  for (const floor of building.floors) {
    // outdoor areas acting as rooms ("Garden", "Terrace") too; a room answers to its Home Assistant area's name as well
    for (const room of zonesOf(floor)) {
      const indoor = room.outdoor ? 0 : 1;
      const further = ([] as (string | null | undefined)[]).concat(alias?.(room) ?? [], room.aliases ?? []);
      for (const [name, own] of [[room.name, true], ...further.map((n) => [n, false] as const)] as const) {
        const n = name ? normalize(name) : "";
        const r = (own ? 2 : 0) + indoor;
        if ((n.length > len || (n.length === len && r > rank)) && says(text, n)) {
          best = { kind: "room", floorId: floor.id, roomId: room.id, name: room.name };
          len = n.length;
          rank = r;
        }
      }
    }
  }
  if (best) return best;
  for (const floor of building.floors) {
    const n = normalize(floor.name);
    if (n.length > len && says(text, n)) {
      best = { kind: "floor", floorId: floor.id, name: floor.name };
      len = n.length;
    }
  }
  if (best) return best;
  return HOUSE.test(text) ? { kind: "house", name: "" } : null;
}

/** Words that ask to see a place ("show", "go to", "open" …). */
const SHOW = /\b(show|go|open|switch|jump|view)\b/;
/** Little words around a bare place name ("the living room please"). */
const FILLER = new Set("the to please me my in at".split(" "));

/**
 * What a spoken sentence asks NeonPlan to show: a place, when the sentence says "show/go to …" or is no more than a
 * place's name ("Living room", "the upper floor please"). Null otherwise – the sentence is for Assist then ("Living room
 * light on" names the room but switches a light).
 */
export function showCommand(sentence: string, building: Building, alias?: RoomAlias): Place | null {
  const place = findPlace(sentence, building, alias);
  if (!place) return null;
  const text = normalize(sentence);
  if (SHOW.test(text)) return place;
  const theRoom = place.kind === "room" ? zonesOf(building.floors.find((f) => f.id === place.floorId)!).find((r) => r.id === place.roomId) : undefined;
  const names = place.kind === "house" ? [] : [place.name, ...(theRoom ? [...([] as (string | null | undefined)[]).concat(alias?.(theRoom) ?? []), ...(theRoom.aliases ?? [])] : [])];
  let rest = ` ${text} `;
  for (const n of names) if (n) rest = rest.replace(` ${normalize(n)} `, " ");
  if (place.kind === "house") rest = rest.replace(HOUSE, " ");
  return rest.split(" ").every((w) => !w || FILLER.has(w)) ? place : null;
}

/** "here" – the tablet's own room. */
const HERE = ["here"];

/**
 * A sentence for Assist said in the tablet's room, without its "here" ("Turn the light on here" → "Turn the light
 * on"): Assist knows the room from the device, and its sentences have no "here".
 */
export function withoutHere(sentence: string, _language: string): string {
  let out = sentence;
  for (const word of HERE) {
    out = out.replace(new RegExp(`(^|[\\s,])${word}(?=[\\s,.!?]|$)`, "giu"), "$1");
  }
  out = out.replace(/\s{2,}/g, " ").replace(/\s+([,.!?])/g, "$1").trim();
  return out || sentence;
}

/** "there" – the room that is open in the view ("Turn the light off there" after tapping into the living room). */
const THERE = ["there"];

function hasWord(sentence: string, words: readonly string[]): boolean {
  const text = ` ${normalize(sentence)} `;
  return words.some((w) => text.includes(` ${normalize(w)} `));
}

/** Whether a sentence says "there" (the room open in the view). */
export function saysThere(sentence: string, _language: string): boolean {
  return hasWord(sentence, THERE);
}

/** The sentence without its "there", for Assist (which then gets the open room's area). */
export function withoutThere(sentence: string, _language: string): string {
  let out = sentence;
  for (const word of THERE) {
    out = out.replace(new RegExp(`(^|[\\s,])${word}(?=[\\s,.!?]|$)`, "giu"), "$1");
  }
  out = out.replace(/\s{2,}/g, " ").replace(/\s+([,.!?])/g, "$1").trim();
  return out || sentence;
}

/** Words for sending the robot vacuum ("vacuum", "hoover", "clean", "mop" …), on the normalised sentence. */
const CLEAN = /\b(vacuum\w*|hoover\w*|clean\w*|mop)\b/;
/** "everything off" ("everything off", "turn everything off", "all off" …). */
const ALL_OFF = /\b(everything off|turn (off )?everything( off)?|switch (off )?everything( off)?|all off)\b/;

/** A room action a sentence asks for, and which room it means. */
export interface RoomIntent {
  action: "clean" | "off";
  /** A room named in the sentence; else "here" (the tablet's room), "there" (the room open in the view) or none. */
  room: { floorId: string; roomId: string } | "here" | "there" | null;
}

/**
 * "Vacuum the kitchen", "Vacuum here", "Turn everything off there", "Everything off in the kitchen": the robot vacuum or everything
 * off for a room. Null for any other sentence (it goes on to Assist).
 */
export function roomIntent(sentence: string, building: Building, _language: string, alias?: RoomAlias): RoomIntent | null {
  const text = normalize(sentence);
  const action = ALL_OFF.test(text) ? "off" : CLEAN.test(text) ? "clean" : null;
  if (!action) return null;
  const place = findPlace(sentence, building, alias);
  const room =
    place?.kind === "room"
      ? { floorId: place.floorId, roomId: place.roomId }
      : hasWord(sentence, THERE)
        ? "there"
        : hasWord(sentence, HERE)
          ? "here"
          : null;
  return { action, room };
}
