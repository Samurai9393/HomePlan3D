# AGENTS.md

Home Assistant custom integration `neonplan3d` (HACS, min HA 2025.1): Python backend in
`custom_components/neonplan3d/`, Lit 3 + TypeScript frontend in `frontend/`, built bundles **committed**
to `custom_components/neonplan3d/frontend/`.

- Spec and phase plan: `docs/plan.md` (German; §5 performance hard rules, §9 pitfalls still apply).
  Talk to the user in English; code, identifiers and comments in English. `CLAUDE.md` carries the same
  session rules for Claude — keep them in sync.
- No decorators in the frontend (`erasableSyntaxOnly`), explicit `.ts` extensions on relative imports,
  `strict` + `noUnusedLocals/Parameters`.

## Working Preferences

- Always create a plan for me to review before you start any work
- Give me direct feedback (no hedging, no gentle suggestions)
- Use bullet points for summaries
- Ask clarifying questions one at a time so I can give complete answers
- No emojis unless I explicitly ask for them

## Memory Management 

Maintain a structured memory system rooted at .claude/memory/ 

### Structure 

- memory.md — index of all memory files, updated whenever you create or modify one 
- general.md — cross-project facts, preferences, environment setup 
- domain/{topic}.md — domain-specific knowledge (one file per topic) 
- tools/{tool}.md — tool configs, CLI patterns, workarounds  

### Rules 

1. When you learn something worth remembering, write it to the right file immediately 
2. Keep memory.md as a current index with one-line descriptions
3. Entries: date, what, why — nothing more 
4. Read memory.md at session start. Load other files only when relevant
5. If a file doesn't exist yet, create it  

### Maintenance 

When I say "reorganize memory": 
1. Read all memory files 
2. Remove duplicates and outdated entries 
3. Merge entries that belong together 
4. Split files that cover too many topics 
5. Re-sort entries by date within each file
6. Update memory.md index 
7. Show me a summary of what changed

## Commands (all verified)

Frontend — run in `frontend/`:

```bash
npm ci
npm run typecheck        # tsc --noEmit
npm test                 # node --test "src/**/*.test.ts", pure logic, 174 tests
node --test src/model.test.ts                              # one file
node --test --test-name-pattern="gable ridge" src/viewer/roof.test.ts   # one case
npm run build            # writes bundles + enforces size budgets
npm run watch
npm run screenshot       # needs local Chrome/Edge (or CHROME_PATH); output preview/screenshots/ is gitignored
```

Tests live in `src/*.test.ts`, `src/viewer/` and `src/geometry/` — pass the real path.

Python — root, tools are unpinned (`pip install -r requirements_test.txt ruff mypy`):

```bash
ruff check custom_components tests
ruff format --check custom_components tests
mypy custom_components/neonplan3d
pytest -q                # Windows: fails (homeassistant imports fcntl) — Linux CI only
```

CI (`.github/workflows/ci.yml`) runs, in order: `typecheck → test → build →
git diff --exit-code -- custom_components/neonplan3d/frontend`, then ruff/format/mypy/pytest,
hassfest and HACS.

## Rules that are easy to break

- **Bundles are committed.** Any change under `frontend/src` needs `npm run build` before committing,
  otherwise CI fails the `git diff` step. Never hand-edit `custom_components/neonplan3d/frontend/`
  (generated; currently byte-identical to a fresh build).
- **Bump `version` in `custom_components/neonplan3d/manifest.json` before building**: `build.mjs` reads
  it and inlines it as `__FP3D_VERSION__`; the frontend warns when it disagrees with the backend, and a
  release tag must equal the manifest version (`.github/workflows/release.yml`).
- Size budgets live in `BUDGET` in `frontend/build.mjs` (main 370 KB, 3d 710 KB, editor 480 KB,
  card editor 145 KB — currently at ~365/703/474/143). The numbers in `docs/plan.md` §5 are stale.
- Never commit real floor plans, IPs or device names. `private/`, `deploy.local.json`,
  `preview/screenshots/` are gitignored on purpose.

## Wiring (not obvious from filenames)

- Backend entry `custom_components/neonplan3d/__init__.py`: registers a static path and the sidebar
  panel serving `neonplan3d.js?v=<version>`; websocket API in `websocket.py`; plan storage and
  versioned migrations in `storage.py` (`STORAGE_MINOR_VERSION`).
- Four bundles, entry points in `frontend/build.mjs`: `src/main.ts` → `neonplan3d.js` (panel + card),
  `src/viewer/viewer3d.ts` → `neonplan3d-3d.js` (three.js, lazy), `src/components/editor.ts` →
  `neonplan3d-editor.js`, `src/card-editor.ts` → `neonplan3d-card-editor.js`. Each is loaded through a
  `?v=<content-hash>` URL with the hash injected at build (`__FP3D_*_HASH__`), so build order in
  `build.mjs` matters and changing one bundle rebuilds its dependents.
- i18n: German first, English fallback, both inline in `src/i18n.ts`; `fr/es/nl/it/hu` live in
  `frontend/lang/*.json` and are copied into the output; HA config-flow text in `strings.json` +
  `translations/*.json`.
- Visual self-check without HA: `preview/index.html` + `preview/demo-data.js` (invented data, mock
  `hass`), optionally via `npm run screenshot`; GitHub Pages publishes `site/` + preview on release.
- Deploy to a test instance: `npm run deploy` (target from untracked `deploy.local.json` or
  `NEONPLAN_DEPLOY_TARGET`; deletes stale files in the target).

## Codebase-specific pitfalls (`docs/plan.md` §9)

- Lit components share styles: use unique class names (`.bar`, `.room` collide). Never name a property
  `focus`, `blur`, `hidden` — it clashes with `HTMLElement`.
- `THREE.Color(...).multiplyScalar(k).getHex()` overflows above `k = 1` (white turns black): clamp
  channels before `getHex()`.
- GLSL ES 3.0 reserves `active` (and others) — don't use them as shader variable names.
- `[data-look]` selectors also match `<body data-look>`; scope them to the control.
- Keep small parts (window frames, furniture pieces) merged into few meshes — draw calls blow the
  budget fast; images never go into the undo history or the frequently saved stores.
- Performance floor from §5: render only on demand (no idle loop), prebaked shadows/AO, quality levels
  for Fire tablets, ≤60k triangles and ≤60 draw calls per floor.

## This machine (Windows, repo on a UNC share)

- The checkout lives at `\\192.168.1.21\...`. `npm ci`/`npm install` **fails there** (esbuild
  postinstall can't run with a UNC cwd; `EPERM` on cleanup). Copy the repo to a local path (or `subst`
  a drive) — a temp copy ran `npm ci → typecheck → test → build` cleanly.
- Default Node is 22.16 via nvm: TS type stripping is off, so `npm test` dies with `SyntaxError`.
  Node **24.1.0 is installed** — use it (`nvm use 24`); CI uses Node 24 too.
- Only Python 3.14 is installed (CI: 3.13); ruff/mypy/pytest are not on PATH. In a venv, ruff passes
  and pytest still fails on `fcntl` (expected), while mypy reports ~31 pre-existing `vol.Required`
  dict-item errors in `websocket.py` that CI does not report — trust CI, don't chase them.
