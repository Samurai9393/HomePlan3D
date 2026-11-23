# English-only product

## 2026-11-23 — English is the only built-in language
- What: Removed `frontend/lang/`, `custom_components/homeplan3d/frontend/lang/` and every non-English `custom_components/homeplan3d/translations/*.json`. Dropped the language-loading machinery (`languageReady`, `loadLanguage`, `languageCode`, `EXTRA_LANGUAGES`, `__FP3D_LANG_HASH__`, lang copy/hash in `build.mjs`) and all locale branches in voice, locate, importer, search, fit hints, timetravel and editor recognition. `translate()` ignores `hass.language`. Kept `en.json` only.
- Why: The fork is English-only; extra catalogues and runtime locale switching are maintenance debt and contradict the product contract. Do not reintroduce translations or locale branches.

## 2026-11-23 — Stable identifiers survive the translation
- What: Filenames, IDs and links were kept stable where practical: `docs/anleitung.md` remains the translated companion manual, entity IDs such as `cover.wohnzimmer`/`light.stehlampe`/`binary_sensor.fenster` remain in demo and test fixtures, and dead `?lang=en` query params remain no-ops. Distinctive German words in these technical identifiers are intentional, not missed prose.
- Why: Renaming them would break screenshot selectors, fixtures and existing user plans for no product benefit. Sweep for German prose, not for identifiers.

## 2026-11-23 — English-only branch and verification baseline
- What: All work is on `refactor/english-only` from `main`; final commit is the `refactor: make HomePlan 3D English-only` commit. Working tree is clean; not merged or pushed. Frontend typecheck, 713 tests and all 10 build budgets pass; bundles rebuild idempotently. Python ruff/format pass, pytest passes 159/159, and `mypy` matches the pre-existing 126-error baseline in 8 files.
- Why: Keeps `main` user-controlled and gives future runs a baseline; do not chase the remaining mypy errors as regressions.
