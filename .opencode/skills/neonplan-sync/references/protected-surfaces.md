# Protected surfaces

These are fork guarantees. Upstream content that conflicts with them is dropped or rewritten, not merged verbatim. Verify each one after applying upstream changes.

## Open-source feature configuration

- `custom_components/homeplan3d/open-source-config.json` stays `"mode": "open-source"` and `"license": "MIT"`.
- Every feature whose code exists in this repository is `enabled: true`. `frontend/src/features.test.ts` enforces this and no pack gating.
- New upstream feature IDs may be added only when their code is present here; add them to the config, `frontend/src/features.ts` types/lists and tests, enabled. Disabled or `UNRELEASED` entries are not acceptable.
- Never restore shop, licence key, customer account, price, bundle, supporter/beta gate, vendor telemetry or vendor links.

## Feature gating in the frontend

- `frontend/src/features.ts`: `hasFeature()` reads the shipped config only and ignores installed packs; `released()` always returns true; `labOn()` returns false; `packLacksModule()` returns false.
- Keep the JSON import with `with { type: "json" }` and the `ENABLED_FEATURES`, `FEATURES`, `FUN` and `FreeFeature` coverage used by tests.
- `tests/test_packs.py::test_shop_and_license_commands_are_gone` must keep passing.

## Backend commands and packs

- `custom_components/homeplan3d/websocket.py` must not expose `homeplan3d/license/*`, `homeplan3d/packs/install` or `homeplan3d/previews/get`.
- Keep `homeplan3d/modules/code`, `modules/review` and `modules/approve`; module code still requires explicit admin approval before it runs.
- `custom_components/homeplan3d/packs.py` stays unsigned `fp3dpack` v1: no signature check, publisher keys, instance binding, `licensee` or `instance` requirement. Keep `module_sha()` and the pending-approval path.
- Validate every local pack with `read_pack()` after syncing pack code.

## Diagnostics

- `custom_components/homeplan3d/diagnostics_report.py` is local-only: no network endpoint, no telemetry sending, no vendor URL.
- `homeplan3d/diagnostics/get` must not return `endpoint`; `delete` clears local data. Keep `tests/test_diagnostics_report.py` green.

## English-only product

- Do not reintroduce `frontend/lang/`, `custom_components/homeplan3d/frontend/lang/` or non-English `custom_components/homeplan3d/translations/*.json`. `en.json` is the only catalogue.
- `translate()` ignores `hass.language`; strip upstream locale branches in voice, locate, importer, search, fit hints, timetravel and editor recognition.
- Strip upstream German prose from UI strings, docs and comments. German words inside stable technical identifiers, fixtures and screenshot selectors are intentional (`docs/anleitung.md`, `cover.wohnzimmer`, `light.stehlampe`, `binary_sensor.fenster`) and must not be renamed just for language cleanup.

## Bundles and local files

- Bundles under `custom_components/homeplan3d/frontend/` are committed build output. Never hand-edit them or copy upstream bundles; rebuild from `frontend/` with `npm run build` and commit the regenerated result.
- Keep local-only directories intact: `furniture-packs/`, `tools/StlToFp3dPack/`, `tools/StlToFp3dPack.Tests/`, `Plans/`, `Prompts/`, `.claude/memory/`, `preview/demo-*`, `site/`.
- Never bring in real floor plans, IPs, device names, `deploy.local.json`, `private/`, `frontend/_*.{mjs,mts,ts}` or `preview/screenshots/`.

## Build invariants

- Frontend build targets Safari 15/Chrome 94; keep the old-WebView guards and bundle budgets from `frontend/build.mjs`.
- CI order stays `npm run typecheck` -> `npm test` -> `npm run build`, then Python `ruff check` -> `ruff format --check` -> `mypy` -> `pytest -q`. Compare `mypy` output with the known pre-existing baseline instead of treating all errors as regressions.
