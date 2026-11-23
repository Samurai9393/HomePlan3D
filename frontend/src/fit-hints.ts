/**
 * Which features fit this home: read from Home Assistant's entities and the plan, in the browser only (nothing is
 * sent anywhere). The extensions page lists the fitting ones first with a small sign of why (📷 3 = three cameras).
 * Lives in the editor bundle with the extensions page; its texts are English here so the main bundle stays as it is.
 */
import type { Feature } from "./features.ts";
import type { Building } from "./model.ts";

type States = Record<string, { entity_id: string; attributes?: Record<string, unknown> }>;

// names as integrations give them; a word part between dots and underscores where a short one would match too much
const PV = /pv|solar|photovolt|inverter|fronius|(^|[._])sma([._]|$)|growatt|hoymiles|opendtu|ahoy|enphase|solaredge/i;
const CHARGER = /wallbox|ev_?charg|car_?charg|(^|[._])go_?e([._]|$)|easee|openwb|evcc|wallbe|zappi|keba/i;
const WASTE = /waste|trash|garbage|recycl/i;

const domain = (id: string) => id.slice(0, id.indexOf("."));

/** The features that fit, each with a short sign of why (an icon, a count when there are several). */
export function fitHints(states: States | undefined, building: Building | null | undefined): Map<Feature, string> {
  const out = new Map<Feature, string>();
  const all = Object.values(states ?? {});
  const count = (test: (s: (typeof all)[number]) => boolean) => all.filter(test).length;
  const sign = (icon: string, n: number) => (n > 1 ? `${icon} ${n}` : icon);
  const cameras = count((s) => domain(s.entity_id) === "camera");
  if (cameras) out.set("camera_cockpit", sign("📷", cameras));
  const name = (s: (typeof all)[number]) => `${s.entity_id} ${String(s.attributes?.friendly_name ?? "")}`;
  const energy = building?.energy;
  const pv = !!energy?.solar || all.some((s) => domain(s.entity_id) === "sensor" && ["power", "energy"].includes(String(s.attributes?.device_class)) && PV.test(name(s)));
  if (pv) out.set("energy_pro", "☀️");
  else if (energy?.grid || energy?.battery) out.set("energy_pro", "⚡");
  const players = count((s) => domain(s.entity_id) === "media_player");
  if (players) out.set("sound", sign("🔊", players));
  const parked = !!building?.floors.some((f) => f.furniture.some((m) => m.type === "parking"));
  if (parked || all.some((s) => ["sensor", "binary_sensor", "switch", "select", "number"].includes(domain(s.entity_id)) && CHARGER.test(s.entity_id))) out.set("auto_pro", "🚗");
  if (all.some((s) => domain(s.entity_id) === "weather")) out.set("weather", "🌦");
  if (all.some((s) => ["sensor", "calendar"].includes(domain(s.entity_id)) && WASTE.test(s.entity_id))) out.set("household", "🗑");
  return out;
}

export type HintKey = "fit" | "finish_title" | "finish_hint" | "finish_wood" | "finish_fabric" | "finish_front" | "finish_body" | "finish_own" | "finish_all" | "live_title" | "live_hint" | "live_own" | "lib_live" | "lib_live_hint";

const TEXTS: Record<HintKey, string> = {
  fit: "Fits your home", finish_title: "Finish", finish_hint: "Own colours for wood, fabric and fronts – shown in the homely styles.", finish_wood: "Wood", finish_fabric: "Fabric", finish_front: "Fronts", finish_body: "Carcass", finish_own: "Standard", finish_all: "For all the same in the plan", live_title: "Live parts", live_hint: "These parts move with Home Assistant: doors and flaps open, drawers slide out, levels rise, status lights show green, off or red. Pick the fitting entity for each.", live_own: "Without a choice it takes the item's entity.", lib_live: "Live", lib_live_hint: "✨ = moves with Home Assistant: doors, drawers, levels, status lights, fans",
};

/** The English hint text for a feature (the caller passes the viewer's language for compatibility). */
export function fitText(_lang: string | undefined, key: HintKey): string {
  return TEXTS[key];
}
