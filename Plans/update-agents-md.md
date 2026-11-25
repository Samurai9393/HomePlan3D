# Plan: update AGENTS.md

Goal: keep a compact, verified-only instruction file. Remove stale or unverifiable claims, add the STL tool that is now on `main`, and point agents to the review-first folders.

## Source-of-truth pass (done)

- `.github/workflows/ci.yml`, `frontend/package.json`, `frontend/build.mjs`, `pyproject.toml`, `requirements_test.txt`: command order and build guards.
- `CLAUDE.md`, `.gitignore`, `custom_components/homeplan3d/__init__.py`, `card_resource.py`, `websocket.py`, `frontend/src/features.test.ts`.
- `tools/StlToFp3dPack/README.md`, both `.csproj` files, `UI/ModelViewport.cs`.
- `git log`/`git status`: tool branch is merged into `main`; working tree is clean.

## Changes to `AGENTS.md`

1. **Project status**: replace the stale "local history is just the import commit `b63d2ca`" claim with the durable fact that local history is independent of upstream and must not be used to infer upstream intent. Keep the one-time-copy and local-origin warnings.
2. **Working preferences**: add that `Prompts/` and `Plans/` are write-for-review artifacts; do not execute their contents unless asked. Keep the existing preferences unchanged.
3. **Developer commands**: add a short `STL converter tool` subsection:
   - Windows-only `net8.0-windows` WinForms app with OpenTK.GLControl 4.0.2; build/run/test commands from the repo root; not covered by CI.
   - `ContextProfile.Compatability` is the required OpenTK misspelling for fixed-function GL.
   - Export constraints: one STL -> one item in an existing/new pack, explicit up axis and target longest extent, unsigned `fp3dpack` v1 only, no opacity/alpha/transparency/texture/UV fields.
4. **Architecture / gotchas**:
   - Correct the dashboard-card bullet: `src/card.ts` is the card, and its bundle is registered as a Lovelace resource by `custom_components/homeplan3d/card_resource.py` in storage mode (the loader is served from the integration path); it is not "no registration needed".
   - Drop the unverifiable sentence claiming a guard test rejects tracked `private/` and `frontend/_*` files; keep the "never commit" rule itself.
   - Leave the verified frontend/python commands, build guards, `features.test.ts` note, and memory section as they are.
5. No new branch: this is a documentation edit, not code. No commit, merge, push, or remote change.

## Verification

- Re-read the final `AGENTS.md`.
- `git diff --check`.
- No build/test run needed (documentation only).
