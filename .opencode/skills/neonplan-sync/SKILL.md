---
name: NeonPlan upstream sync
description: Pull the latest neonplan3d code into HomePlan 3D while preserving open-source features, unsigned packs/modules, local-only diagnostics, the English-only UI and local tooling.
---

# NeonPlan upstream sync

Pull current `neonplan3d` code into this fork without undoing the open-source refactor. This skill is the only sanctioned upstream fetch path; normally `AGENTS.md` forbids syncing from upstream.

## Gate

- Run only when the user explicitly invokes this skill **and** confirms the network fetch for this run.
- Approval is run-scoped. Do not amend `AGENTS.md`, add a remote, or infer permission for later runs.
- If the user has not confirmed, stop and report that no fetch was performed.

## Workflow

1. **Prepare.** Require a clean working tree on `main`. Create `sync/neonplan-YYYYMMDD` from `main` before changing any file. If the branch exists, add a numeric suffix.
2. **Protect.** Read `references/protected-surfaces.md` before inspecting or applying upstream code. Those guarantees outrank upstream content.
3. **Fetch.** Use the direct URL into a temporary ref with `--no-tags`; never add or change a remote, never push, never merge to `main`, never open an upstream PR. See `references/merge-recipe.md`.
4. **Analyze.** Create temporary worktrees at the local import commit `b63d2ca` (base) and the fetched upstream ref (theirs). Diff both against `HEAD`. The histories are unrelated: do **not** use `git merge` or `git cherry-pick`.
5. **Classify each path:**
   - Protected: never take the upstream file wholesale; merge hunks by hand.
   - Shared: apply upstream changes while keeping this fork's edits.
   - Local-only: keep untouched (`furniture-packs/`, `tools/StlToFp3dPack/`, `Plans/`, `Prompts/`, `.claude/memory/`, demo data, site assets).
   - Upstream-new: copy only then strip shop/license/locale/branding content.
   - Upstream-deleted: keep the local file if it changed locally.
6. **Apply.** Edit files in the working tree with the editor tools. Do not copy upstream bundles; they are regenerated locally.
7. **Stop on conflict.** If a protected guarantee cannot be preserved, or a merge is ambiguous, stop and ask the user with file and line detail. Do not guess.
8. **Verify.** Rebuild bundles and run the CI-order checks listed in `AGENTS.md`; run tool tests if tool files changed; validate local packs with `read_pack()`.
9. **Clean up and report.** Remove temporary worktrees and the temporary ref. Report the upstream SHA, changed files, preserved guarantees, unresolved conflicts, and verification results. Leave the branch unmerged; commit only if the user asks.

Use `references/merge-recipe.md` for exact commands and byte-safe comparison on Windows.
