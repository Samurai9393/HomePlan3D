// Furniture of other programs to NeonPlan's built-in types, by its name or category (English words). Anything not
// recognised becomes a plain cabinet keeping its own name.

import type { FurnitureType } from "../model.ts";

const RULES: [RegExp, FurnitureType | ((h: number, y: number) => FurnitureType)][] = [
  [/upper cabinet|wall cabinet/i, "kitchen_wall"],
  [/lower cabinet|base cabinet/i, "kitchen"],
  [/glass ?-?door cabinet|showcase|display cabinet/i, "tall_cabinet"],
  [/drawers?( cabinet)?/i, "dresser"],
  [/stair/i, "stairs"],
  [/bunk/i, "bunk_bed"],
  [/night ?stand|bedside/i, "nightstand"],
  [/\bbed\b|^bed|double bed|single bed|boxspring/i, "bed"],
  [/corner sofa|l-?sofa/i, "sofa_l"],
  [/sofa|couch/i, "sofa"],
  [/arm ?chair/i, "armchair"],
  [/office chair/i, "office_chair"],
  [/bar ?stool/i, "bar_stool"],
  [/stool/i, "stool"],
  [/chair/i, "chair"],
  [/corner bench/i, "corner_bench"],
  [/bench/i, "bench"],
  [/desk/i, "desk"],
  [/coffee ?table/i, "coffee_table"],
  [/round table/i, "table_round"],
  [/table/i, "table"],
  [/wardrobe/i, "wardrobe"],
  [/dresser|chest of drawers/i, "dresser"],
  [/sideboard/i, "sideboard"],
  [/tv|television/i, "tv_board"],
  [/book ?case|book ?shelf|shelf|shelves/i, "shelf"],
  [/smart ?fridge|fridge|refrigerator/i, "fridge"],
  [/dishwasher/i, "dishwasher"],
  [/washing machine|washer/i, "washer"],
  [/dryer/i, "dryer"],
  [/oven/i, "kitchen_tall"],
  [/cooker|cooktop|hob|stove/i, "stove"],
  [/kitchen sink|\bsink\b/i, "sink"],
  [/wall cabinet/i, "kitchen_wall"],
  [/tall cabinet/i, "kitchen_tall"],
  [/island/i, "island"],
  [/worktop|counter/i, "worktop"],
  [/kitchen|base cabinet/i, "kitchen"],
  [/toilet|\bwc\b/i, "wc"],
  [/bath ?tub|\bbath\b/i, "bathtub"],
  [/shower/i, "shower"],
  [/wash ?basin|basin/i, "washbasin"],
  [/radiator/i, "radiator"],
  [/air ?con/i, "ac_unit"],
  [/coat/i, "coat_rack"],
  [/plant|tree|aspen|birch|oak|pine|fir\b|palm|bush|shrub|hedge|ficus|bonsai/i, "plant"],
  [/rug|carpet/i, "rug"],
  [/robot|vacuum/i, "robot_vacuum"],
  [/wall ?(light|lamp)/i, "lamp_wall"],
  [/floor ?lamp/i, "lamp_floor"],
  [/table ?lamp/i, "lamp_table"],
  [/pendant|suspension/i, "lamp_pendant"],
  [/spot|downlight/i, "lamp_downlight"],
  // other lights: by the height they sit at
  [/lamp|light/i, (h, y) => (y > 1.6 ? "lamp_ceiling" : h > 1.2 ? "lamp_floor" : "lamp_table")],
];

/** Things other programs place like furniture that are no furniture in a floor plan: decoration, small things, parts of the building. */
const DECOR =
  /frame|picture|photo|poster|vase|plate|bowl|bottle|\bglass(es)?\b|candle|clock|mirror|curtain|blind|\bstore\b|tube|\bvent\b|outlet|switch|fence|railing|handrail|roof|tiles|\bbox\b|cylinder|triangle|\barch\b|keyboard|mouse|flowers|shampoo|trash|\bjar\b|guitar|\bbike\b|beetle|\bcar\b|\bauto\b|\bscale\b|ladder|chimney|\bhood\b|microwave|coffee|cofee|toaster|imac|ibook|laptop|\bpc\b|monitor|screen|\bdvd\b|phone|\bbook\b|towel|ustensils|cutlery|sushi|wine|\boil\b|heat system|aquarium|\bfish\b|\btoy\b|cushion|blanket/i;

/** Whether a named thing is decoration or a small part rather than furniture. */
export function isDecor(name: string): boolean {
  return DECOR.test(name.replace(/[_-]+/g, " "));
}

/** NeonPlan's type for a piece of furniture of another program; null when nothing fits. */
export function furnitureType(name: string, h = 0.8, y = 0): FurnitureType | null {
  const text = name.replace(/[_-]+/g, " ");
  for (const [re, t] of RULES) if (re.test(text)) return typeof t === "function" ? t(h, y) : t;
  return null;
}

/** Apple RoomPlan's object categories. */
export const ROOMPLAN_TYPES: Record<string, FurnitureType> = {
  storage: "tall_cabinet",
  refrigerator: "fridge",
  stove: "stove",
  bed: "bed",
  sink: "sink",
  washerDryer: "washer",
  toilet: "wc",
  bathtub: "bathtub",
  oven: "kitchen_tall",
  dishwasher: "dishwasher",
  table: "table",
  sofa: "sofa",
  chair: "chair",
  fireplace: "sideboard",
  television: "tv_board",
  stairs: "stairs",
};
