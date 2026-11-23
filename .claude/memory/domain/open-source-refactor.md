# Open-source refactor

## 2026-11-23 — Pro features become open source
- What: User decided on full de-commercialisation. `custom_components/homeplan3d/open-source-config.json` is the single source of truth; every feature whose code is in this repo is free and enabled by default, including Pool Pro and room_bar. Shop, licence key, customer account, prices, bundles, supporter/beta gating and vendor links come out.
- Why: The fork is to stand on its own as MIT open source without a shop dependency. This explicitly supersedes the earlier "Pool Pro stays unreleased until Torsten releases it" guard.

## 2026-11-23 — Local packs stay unsigned; module approval stays
- What: Local JSON pack imports (furniture packs and module packs) are kept but unsigned: no signature check, publisher keys, instance binding or licensee. Module code still needs admin review/approval before it runs, so Announcements and frames keep working.
- Why: User chose weak authenticity over dropping module-based features, while keeping a human approval step for executable code.

## 2026-11-23 — Diagnostics are local-only
- What: Removed the vendor telemetry endpoint and all network sending from `diagnostics_report.py`. Opt-in diagnostics now collect local aggregates and a local preview in `.storage`; the editor can clear them. `homeplan3d/diagnostics/get` no longer returns `endpoint`, and `delete` clears local data instead of calling a server.
- Why: Remote telemetry to api.mastershort.de is a vendor URL and contradicts full de-commercialisation.

## 2026-11-23 — Refactor branch
- What: Code changes for this refactor live on `refactor/open-source-config`, created from `main`; the agent does not merge.
- Why: Keeps `main` user-controlled, as with every code-changing prompt.

## 2026-11-23 — Frontend test blocker (pre-existing)
- What: `npm test` on Node 24.1.0 fails 6 suites with `ERR_IMPORT_ATTRIBUTE_MISSING` for `open-source-config.json` imported by untouched `frontend/src/features.ts`; `sun-path.test.ts` also fails a date assertion. `features.ts`, `features.test.ts` and `tsconfig.json` are off-limits for this prompt, so the agent leaves the blocker unchanged and reports it.
- Why: Recorded so future runs do not mistake these failures for refactor regressions.
