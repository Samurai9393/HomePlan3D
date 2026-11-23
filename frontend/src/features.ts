/**
 * Open-source feature configuration. Every feature whose code lives in this repository is enabled by
 * `custom_components/homeplan3d/open-source-config.json`; a signed feature pack is no longer a licence.
 */
import config from "../../custom_components/homeplan3d/open-source-config.json";

export type Feature = "camera_cockpit" | "weather" | "screens" | "energy_pro" | "sound" | "auto_pro" | "time_travel" | "pool" | "household" | "frames" | "fridge_smart" | "fun_pets" | "fun_halloween" | "fun_winter";

/** Free built-in features (no pack ever unlocked them). */
export type FreeFeature = "diagnostics" | "locate" | "room_bar";
export type Gated = Feature | FreeFeature;

/** The open-source configuration, read by both the frontend and the backend. */
export const OPEN_SOURCE = config as {
  mode: string;
  license: string;
  features: readonly { id: Gated; enabled: boolean }[];
};

/** Feature ids enabled by the configuration. */
export const ENABLED_FEATURES: readonly Gated[] = OPEN_SOURCE.features.filter((f) => f.enabled).map((f) => f.id);

/** The add-ons shown on the extensions page. */
export const FEATURES: readonly Feature[] = ["camera_cockpit", "weather", "screens", "energy_pro", "sound", "auto_pro", "time_travel", "pool", "household", "frames"];

/** Fun extras, now ordinary free features shown with the others. */
export const FUN: readonly Feature[] = ["fun_pets", "fun_halloween", "fun_winter"];

/** The parked camera projection prototype: only with its own switch ("?fp3d_projection=1", "=0" off), off by default. */
export function projectionOn(): boolean {
  try {
    const flag = new URLSearchParams(location.search).get("fp3d_projection");
    if (flag === "1") localStorage.setItem("homeplan3d.projection", "1");
    else if (flag === "0") localStorage.removeItem("homeplan3d.projection");
    return localStorage.getItem("homeplan3d.projection") === "1";
  } catch {
    return false;
  }
}

/** Kept for older call sites: the lab switch no longer hides anything. */
export function labOn(): boolean {
  return false;
}

/** Whether a feature is enabled by the open-source configuration. */
export function hasFeature(feature: Gated, _packs?: readonly { features?: string[] }[]): boolean {
  return ENABLED_FEATURES.includes(feature);
}

/** All features are released; kept as the single query used by UI code. */
export function released(_feature: Gated): boolean {
  return true;
}

/** Whether this frontend knows a feature key at all (an older bundle does not know newer ones). */
export function knownFeature(key: string): boolean {
  return OPEN_SOURCE.features.some((f) => f.id === key);
}

/** Kept for compatibility with code that displays installed packs; features no longer depend on them. */
export function unlockedFeatures(_packs?: readonly { features?: string[] }[]): Set<Feature> {
  return new Set(ENABLED_FEATURES.filter((f): f is Feature => (FEATURES as readonly Gated[]).includes(f) || (FUN as readonly Gated[]).includes(f)));
}

/** A module is still installed only after an admin approved its code; features do not depend on it. */
export function packLacksModule(_pack: { features?: string[]; module?: unknown }): boolean {
  return false;
}
