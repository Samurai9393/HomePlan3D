# Plan: sync HomePlan 3D with latest neonplan3d code

Use the `neonplan-sync` skill. This plan is for review only; no fetch or code change happens until it is executed.

## Goal

Bring current upstream `neonplan3d` code into this fork while keeping the open-source refactor intact: all features free and enabled, no shop/licence gating, unsigned local packs and module approval, local-only diagnostics, English-only UI, and local tooling.

## Preconditions

- Load skill `neonplan-sync` and read both `references/protected-surfaces.md` and `references/merge-recipe.md`.
- Ask for and receive explicit confirmation to fetch upstream for this run. The approval is run-scoped and does not amend `AGENTS.md`.
- Require a clean tree on `main`. Current baseline: `main` at `cbf59e1`, clean.
- Fetch only from `https://github.com/Mastershort/neonplan3d.git` into a temporary ref. Never add/change a remote, push, merge to `main`, or open an upstream PR.

## Steps

- [x] Create branch `sync/neonplan-YYYYMMDD` from `main` (add a numeric suffix if it exists) before changing files.
- [x] Fetch upstream `HEAD` into `refs/tmp/neonplan-sync/latest` with `--no-tags`; record and report the resolved SHA.
- [x] Create temporary worktrees at local import commit `b63d2ca` (base) and the fetched upstream ref (theirs). Diff both against `HEAD` to inventory upstream changes and local forks.
- [x] Classify paths: protected, shared, local-only, upstream-new, upstream-deleted. The histories are unrelated; do not use `git merge` or `git cherry-pick`.
- [x] Apply upstream changes per file with the editor tools:
  - Protected files: merge hunks by hand, never replace wholesale.
  - Shared files: keep this fork's edits while taking upstream improvements.
  - Local-only files: keep untouched (`furniture-packs/`, `tools/StlToFp3dPack/`, `tools/StlToFp3dPack.Tests/`, `Plans/`, `Prompts/`, `.claude/memory/`, `preview/demo-*`, `site/`).
  - Upstream-new files: copy only after checking for shop/license/locale/branding content.
  - Upstream-deleted files: keep local copies when they changed locally.
- [x] Stop and ask the user if a protected guarantee cannot be preserved or a merge is ambiguous.
- [x] Re-check the protected surfaces after applying:
  - `open-source-config.json` stays `open-source`/`MIT` with every implemented feature enabled.
  - `features.ts` keeps config-only gating, `released()` true, `labOn()` false, `packLacksModule()` false.
  - No `license/*`, `packs/install` or `previews/get` commands; module review/approval retained.
  - Packs stay unsigned `fp3dpack` v1; diagnostics stay local-only.
  - No language catalogues or locale branches; English-only prose and stable identifiers retained.
  - Bundles are rebuilt locally, never copied from upstream.
- [x] Verify in CI order from `frontend/`: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `git diff --exit-code -- ../custom_components/homeplan3d/frontend`.
- [x] Verify from the root: `pip install -r requirements_test.txt ruff mypy`, `ruff check custom_components tests`, `ruff format --check custom_components tests`, `mypy custom_components/homeplan3d`, `pytest -q`, and `read_pack()` over `furniture-packs/*.fp3dpack`. Compare `mypy` with the known pre-existing baseline.
- [x] Run `dotnet build` and `dotnet test` for the STL tool only if its files changed (skipped: no tool files changed).
- [x] Remove temporary worktrees and the temporary ref. Run `git diff --check` and `git status --short --untracked-files=all`.
- [x] Report upstream SHA, changed files by category, preserved guarantees, unresolved conflicts, and verification results. Leave the branch unmerged; commit only if the user asks.

## Execution notes (steps 1–6)

- Upstream SHA: `503bcb368ba06cd8e31e2df6da1a1000158cf275`; worktrees at `b63d2ca` and that SHA remain in `C:\Users\dan.100ACREWOOD.000\AppData\Local\Temp\opencode\neonplan-sync-20261125`.
- 48 upstream paths classified: 28 source/docs/config paths merged, one new test copied, language catalogues and upstream bundles skipped, upstream deletions of local-only files ignored.
- Three textual conflicts resolved without asking: `frontend/build.mjs` kept local `homeplan3d` bundle names while taking the 940 KB budget; `frontend/src/components/editor.ts` kept local English-only i18n imports while taking `freeOpeningTurned`; `frontend/src/devices.ts` kept the English room-name comment while taking `roomNamed(..., match)` and `robotRoomAcross`.
- New changelog/manual prose was stripped of the upstream Slovak note and vendor name where it was introduced; historical entries were left alone.
- Protected files (`open-source-config.json`, `features.ts`, websocket, packs, diagnostics report) are unchanged. No language catalogue, locale branch, upstream bundle or sensitive file was copied.

## Execution notes (steps 7–12)

- Protected-surface re-check passed: config, features, websocket commands, pack format, diagnostics, bundles, translations and prose are unchanged where protected.
- Frontend checks passed in CI order: `npm ci`, typecheck, tests, build and the local-bundle no-diff check. Rebuilt bundles were staged so the no-diff check passed against the index; `homeplan3d-3d.js` is 930.4 KB against the 940 KB budget and all build guards passed.
- Python checks passed: ruff check, ruff format (37 files), and 159/159 pytest. On Windows the recorded shim was required: `PYTHONPATH` pointed at `C:\Users\dan.100ACREWOOD.000\AppData\Local\Temp\opencode\ha-stubs;C:\Users\dan.100ACREWOOD.000\AppData\Local\Temp\opencode` with `python -m pytest -q -p ha_sockets_plugin` because the default HA plugin imports `fcntl`.
- `mypy` reports 126 errors in 8 files, exactly the recorded pre-existing baseline; no new typing regression.
- `read_pack()` validated all three furniture packs: `GardenOutdoors` (4 items), `Lights` (3), `Plants` (1), all `fp3dpack` v1.
- STL tool checks were skipped: no `tools/StlToFp3dPack*` path changed.
- Cleanup passed: both temporary worktrees and `refs/tmp/neonplan-sync/latest` were removed; only the primary worktree remains. `git diff --check` is clean; status shows 29 modified non-bundle files, one new test, and six regenerated staged bundles.
- No unresolved sync conflicts. The pre-existing merge markers in `.claude/memory/memory.md` and `.claude/memory/domain/stl-converter-tool.md` were left untouched.
- Branch `sync/neonplan-20261125` remains at `f4260e4c`, the same commit as `main`; all sync work is uncommitted. No merge, push, remote change or PR was made.

## Likely conflict areas

- `custom_components/homeplan3d/open-source-config.json`, `websocket.py`, `packs.py`, `diagnostics_report.py`.
- `frontend/src/features.ts`, `frontend/src/i18n.ts`, `frontend/src/i18n-editor.ts`, `frontend/build.mjs`.
- Any upstream reintroduction of shop/license workflows, language catalogues, locale branches, signed packs, telemetry or vendor branding.
- Committed `custom_components/homeplan3d/frontend/` bundles: regenerate, do not merge upstream output.

## Exclusions

- No real floor plans, IPs, device names, `deploy.local.json`, `private/`, `frontend/_*.{mjs,mts,ts}`, or `preview/screenshots/` enter the repository.
- No commit, merge, push, remote change, or PR as part of this plan unless the user explicitly requests it.
