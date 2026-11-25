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

1. Create branch `sync/neonplan-YYYYMMDD` from `main` (add a numeric suffix if it exists) before changing files.
2. Fetch upstream `HEAD` into `refs/tmp/neonplan-sync/latest` with `--no-tags`; record and report the resolved SHA.
3. Create temporary worktrees at local import commit `b63d2ca` (base) and the fetched upstream ref (theirs). Diff both against `HEAD` to inventory upstream changes and local forks.
4. Classify paths: protected, shared, local-only, upstream-new, upstream-deleted. The histories are unrelated; do not use `git merge` or `git cherry-pick`.
5. Apply upstream changes per file with the editor tools:
   - Protected files: merge hunks by hand, never replace wholesale.
   - Shared files: keep this fork's edits while taking upstream improvements.
   - Local-only files: keep untouched (`furniture-packs/`, `tools/StlToFp3dPack/`, `tools/StlToFp3dPack.Tests/`, `Plans/`, `Prompts/`, `.claude/memory/`, `preview/demo-*`, `site/`).
   - Upstream-new files: copy only after checking for shop/license/locale/branding content.
   - Upstream-deleted files: keep local copies when they changed locally.
6. Stop and ask the user if a protected guarantee cannot be preserved or a merge is ambiguous.
7. Re-check the protected surfaces after applying:
   - `open-source-config.json` stays `open-source`/`MIT` with every implemented feature enabled.
   - `features.ts` keeps config-only gating, `released()` true, `labOn()` false, `packLacksModule()` false.
   - No `license/*`, `packs/install` or `previews/get` commands; module review/approval retained.
   - Packs stay unsigned `fp3dpack` v1; diagnostics stay local-only.
   - No language catalogues or locale branches; English-only prose and stable identifiers retained.
   - Bundles are rebuilt locally, never copied from upstream.
8. Verify in CI order from `frontend/`: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `git diff --exit-code -- ../custom_components/homeplan3d/frontend`.
9. Verify from the root: `pip install -r requirements_test.txt ruff mypy`, `ruff check custom_components tests`, `ruff format --check custom_components tests`, `mypy custom_components/homeplan3d`, `pytest -q`, and `read_pack()` over `furniture-packs/*.fp3dpack`. Compare `mypy` with the known pre-existing baseline.
10. Run `dotnet build` and `dotnet test` for the STL tool only if its files changed.
11. Remove temporary worktrees and the temporary ref. Run `git diff --check` and `git status --short --untracked-files=all`.
12. Report upstream SHA, changed files by category, preserved guarantees, unresolved conflicts, and verification results. Leave the branch unmerged; commit only if the user asks.

## Likely conflict areas

- `custom_components/homeplan3d/open-source-config.json`, `websocket.py`, `packs.py`, `diagnostics_report.py`.
- `frontend/src/features.ts`, `frontend/src/i18n.ts`, `frontend/src/i18n-editor.ts`, `frontend/build.mjs`.
- Any upstream reintroduction of shop/license workflows, language catalogues, locale branches, signed packs, telemetry or vendor branding.
- Committed `custom_components/homeplan3d/frontend/` bundles: regenerate, do not merge upstream output.

## Exclusions

- No real floor plans, IPs, device names, `deploy.local.json`, `private/`, `frontend/_*.{mjs,mts,ts}`, or `preview/screenshots/` enter the repository.
- No commit, merge, push, remote change, or PR as part of this plan unless the user explicitly requests it.
