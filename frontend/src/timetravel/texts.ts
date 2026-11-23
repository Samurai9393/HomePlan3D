// Time travel: the texts of phases 2 and 3 in English. They live in the lazily loaded bundle because the main
// bundle has no room to spare.



const TT: Record<string, string> = {
  tt_range_hint: "Range: 24 hours or several days",
  tt_days: "{n} d",
  tt_loading_day: "loading {day} …",
  tt_recorder_days: "Recorder: {n} days",
  tt_memory_full: "Memory limit reached",
  tt_now_reached: "Present reached",
  tt_sheet: "Events, summaries",
  tt_tab_events: "Events",
  tt_tab_away: "Away",
  tt_tab_day: "Day",
  tt_close: "Close",
  tt_f_safety: "Safety",
  tt_f_openings: "Doors & windows",
  tt_f_devices: "Devices",
  tt_f_energy: "Energy",
  tt_follow: "Camera follows events",
  tt_stop: "Stop at important events",
  tt_no_events: "No events",
  tt_ev_window: "{name} opened",
  tt_ev_battery_full: "Battery full: {name}",
  tt_ev_pv_peak: "Highest solar power of the day",
  tt_away_title: "While you were away",
  tt_away_since: "Since",
  tt_away_last: "since the last time travel",
  tt_away_quiet: "quiet {from}–{to}",
  tt_away_none: "Nothing happened – all quiet.",
  tt_away_door: "{name}: opened {n}×",
  tt_away_motion: "Motion {name}: {n}×",
  tt_away_light: "{name} was on for {d}",
  tt_away_open: "{name} stood open for {d}",
  tt_day_title: "Day summary {day}",
  tt_day_light: "Light",
  tt_day_window: "Window",
  tt_day_heat: "Heating",
  tt_day_temp: "Temp.",
  tt_day_pv: "Solar",
  tt_day_import: "Grid import",
  tt_day_export: "Export",
  tt_day_use: "Consumption",
  tt_day_self: "Self-sufficiency",
  tt_day_compare: "Compare with the day before",
  tt_day_before: "Day before",
  tt_day_none: "There are no values for this day yet.",
  tt_day_partial: "incomplete (from {time})",
  tt_yesterday: "Yesterday at this time",
};

/** Fall back to the bundled English table when the host does not know a key. */
export function withTexts(t: (key: string, vars?: Record<string, string | number>) => string) {
  return (key: string, vars: Record<string, string | number> = {}): string => {
    const s = t(key, vars);
    if (s !== key) return s;
    let out = TT[key] ?? key;
    for (const [k, v] of Object.entries(vars)) out = out.replace(`{${k}}`, String(v));
    return out;
  };
}
