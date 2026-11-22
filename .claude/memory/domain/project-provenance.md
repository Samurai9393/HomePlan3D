# Project provenance

## 2026-11-22 — Workspace is a one-time copy of upstream neonplan3d
- What: 706 files copied from `https://github.com/Mastershort/neonplan3d` at commit `1cc184f5f774805af88cbf0198bc19c37bc28f67`; no sync relationship.
- Why: User requires a fully separate project; never push, open PRs, or otherwise change that GitHub repo.

## 2026-11-22 — Local origin is not the copied upstream
- What: `origin` is `https://github.com/Samurai9393/Neoplan3d2.git`; no push or remote changes have been made.
- Why: Prevents accidental writes to the wrong remote.

## 2026-11-22 — Local git HEAD does not match the working tree
- What: HEAD is `d3427a4` from the earlier local state; working-tree files are the copied upstream version.
- Why: `git show HEAD:` and history are misleading; verify against working-tree config and scripts.
