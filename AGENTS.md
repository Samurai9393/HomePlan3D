# AGENTS.md

## Project status

- NeonPlan 3D is a Home Assistant custom integration (`custom_components/neonplan3d`, domain `neonplan3d`, min HA 2025.1) with a Lit 3 + TypeScript frontend in `frontend/`; three.js is a separate lazy bundle.
- One-time copy from `https://github.com/Mastershort/neonplan3d` at `1cc184f5f774805af88cbf0198bc19c37bc28f67` (2026-11-22). No sync: do not fetch, pull, push, or open PRs there.
- Local `origin` is `https://github.com/Samurai9393/HomePlan3D-main.git`. Do not push or change remotes without explicit instruction.
- Local git history is just the import commit `b63d2ca` ("import prompt", 2026-11-22), not upstream history; do not infer upstream intent from it.

## Working preferences

- Always create a plan for me to review before you start any work.
- Give direct feedback (no hedging, no gentle suggestions).
- Use bullet points for summaries.
- Ask clarifying questions one at a time.
- No emojis unless explicitly asked.

## Instruction sources

- `CLAUDE.md` is copied upstream guidance: keep its German user-prose / English code, identifiers and comments convention, but treat its `private/docs/...` paths and upstream repo links as absent here, and do not follow its "push" step without explicit instruction.

## Developer commands

### Frontend (`frontend/`, Node 24 in CI)

- `npm ci` then `npm run typecheck` -> `npm test` -> `npm run build` (CI order).
- Single test: `node --test src/<name>.test.ts`. Full script: `node --test "src/**/*.test.ts"`.
- `npm run build` writes bundles to `custom_components/neonplan3d/frontend/` and `site/import/neonplan-import.js`, enforces size budgets plus old-WebView guards, and must leave no diff in the committed integration frontend (`git diff --exit-code -- ../custom_components/neonplan3d/frontend`).
- `npm run screenshot` needs local Chrome/Edge (or `CHROME_PATH`) and writes ignored `preview/screenshots/`; `npm run watch` is dev mode.
- `npm run deploy` builds then copies `custom_components/neonplan3d` to `NEONPLAN_DEPLOY_TARGET` or untracked `deploy.local.json` (`{"target":"<ha config>/custom_components/neonplan3d"}`). Target basename must be `neonplan3d`; extra files there are deleted.

### Python (root, Python 3.13 in primary CI)

- `pip install -r requirements_test.txt ruff mypy`
- `ruff check custom_components tests` -> `ruff format --check custom_components tests` -> `mypy custom_components/neonplan3d` -> `pytest -q` (CI order).
- Single test: `pytest tests/test_<name>.py -q`. The Python 3.14/current-HA job is advisory (`continue-on-error`), not a merge gate.

## Architecture / gotchas

- Main frontend entry is `frontend/src/main.ts`; dashboard card is `src/card.ts` (auto-loaded, no resource registration needed); admin editor is `src/components/editor.ts`; 3D viewer is `src/viewer/viewer3d.ts` in a lazy bundle.
- The integration serves `custom_components/neonplan3d/frontend/` with no-cache and registers websocket commands. Built bundles are committed: never hand-edit them; rebuild from `frontend/`.
- Build targets Safari 15/Chrome 94 and fails on `?.(...spread)`, `Object.hasOwn`, `findLast*`, `toSorted*`, or bare `dvh`; use older syntax guarded by build.
- `npm test` includes `unreleased-guard.test.ts`: add-on names in `UNRELEASED` must not appear in `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `docs/manual.md`, or `docs/anleitung.md`; Pool Pro stays gated until explicitly released.
- Never commit real floor plans, IPs, device names, `deploy.local.json`, `private/`, `frontend/_*.{mjs,mts,ts}`, or `preview/screenshots/`. The guard test specifically rejects tracked `private/` and `frontend/_*` files.
- `preview/` is invented demo data with mock hass; `site/` is the GitHub Pages demo/import site, not integration code.

## Memory

- Maintain `.claude/memory/`: `memory.md` index, `general.md`, `domain/<topic>.md`, `tools/<tool>.md`; create missing files.
- At session start read `memory.md`; record durable facts as date / what / why. On "reorganize memory": dedupe, merge/split, re-sort by date, update index, report changes.
