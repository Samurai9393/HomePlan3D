# Plan: create the `neonplan-sync` skill

## Verified inputs

- OpenCode V2 skills live at `.opencode/skills/<id>/SKILL.md`; supporting files sit beside it and paths are relative to that directory.
- `AGENTS.md` forbids upstream sync. User chose the narrow override: fetch only when the skill is explicitly invoked and the user confirms that run.
- The local import commit `b63d2ca` copied upstream pin `1cc184f5f774805af88cbf0198bc19c37bc28f67`. Histories are unrelated, so `git merge` is wrong; use a content-level three-way merge with `b63d2ca` as base.
- Protected surfaces: `open-source-config.json`, `features.ts`, unsigned packs/module approval, local-only diagnostics, English-only UI, committed bundles, local packs and STL tool.

## Files to create

1. `.opencode/skills/neonplan-sync/SKILL.md`
   - Frontmatter: `name: NeonPlan upstream sync`, `description` that makes the skill discoverable, no autoinvoke suppression.
   - Gate: refuse to run unless explicitly invoked and the user confirms the fetch; this approval is run-scoped and does not amend `AGENTS.md`.
   - Workflow:
     1. Require a clean tree and `main`; create `sync/neonplan-YYYYMMDD` from `main`.
     2. Fetch the upstream URL directly into a temporary ref with `--no-tags`; never add or change a remote, never push, never merge to `main`, never open an upstream PR.
     3. Classify files: local-only (keep), protected (manual merge), shared (three-way merge).
     4. Apply per-file merges with `git merge-file` using `git show b63d2ca:<path>` as base; copy genuinely new upstream files, then strip protected/commercial content; keep local files for upstream deletions when locally changed.
     5. Stop and ask the user if a protected guarantee cannot be preserved without manual conflict resolution.
     6. Rebuild frontend bundles, run CI-order frontend/Python checks, run tool tests if tool files changed, validate packs with `packs.read_pack()`.
     7. Report upstream commit, changed files, preserved guarantees, conflicts and verification; leave the branch unmerged.
2. `.opencode/skills/neonplan-sync/references/protected-surfaces.md`
   - Concrete non-negotiables with file anchors: every listed feature enabled and MIT/open-source mode, no pack-based gating or `UNRELEASED`/shop/license/preview commands, unsigned packs, module review/approval, no telemetry endpoint, no language catalogues or locale branches, no hand-edited bundles, local `furniture-packs/` and `tools/StlToFp3dPack/` preserved, no vendor branding, real plans or IPs.
3. `.opencode/skills/neonplan-sync/references/merge-recipe.md`
   - Exact PowerShell/git commands for the temporary ref, three-way file merge, conflict handling and cleanup.

## Constraints

- No branch for this creation: skill files are documentation/config, not application code.
- No commit, merge, push, remote change or upstream fetch now.
- Do not touch `.claude/memory/memory.md`; it currently has unresolved merge markers from an earlier merge. Report that separately.

## Verification

- Read the final skill files; `git diff --check`.
- No build/test run needed for skill files.
