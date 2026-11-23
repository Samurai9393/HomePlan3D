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

## 2026-11-23 — Refactor branch and final commit
- What: All refactor work is on `refactor/open-source-config` from `main`; final commit is `bacc759` (`refactor: finish open-source de-commercialisation`) on top of `8f2b6a5`. Working tree is clean; not merged or pushed.
- Why: Keeps `main` user-controlled; the user merges at their own pace.

## 2026-11-23 — Frontend import blocker resolved
- What: `features.ts` now imports `open-source-config.json` with `with { type: "json" }`, `tsconfig.json` supports it, and `frontend/src/sun-path.test.ts` was adjusted. `npm test` passes 713/713.
- Why: The earlier `ERR_IMPORT_ATTRIBUTE_MISSING` and sun-path date failure were a temporary state, not a lasting constraint.

## 2026-11-23 — Verification baseline after refactor
- What: Frontend typecheck, 713 tests and build budgets pass; Python ruff/format pass and pytest passes 159/159 with `ha_sockets_plugin`. `mypy` still reports 126 pre-existing errors in 8 files, down from 134; generated bundles are idempotent (33 files).
- Why: Future runs need a baseline; do not chase the remaining mypy errors as refactor regressions.
