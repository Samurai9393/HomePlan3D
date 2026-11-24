# Plan: Move `Prompts/` and `Plans/` into `Planning/`

## Goal

Reorganize the repository root so prompt and plan files live under a single `Planning/` folder:

- `Prompts/` → `Planning/Prompts/`
- `Plans/` → `Planning/Plans/`

## Steps

1. Create a new root-level `Planning/` directory.
2. Move both folders into it with their contents unchanged and filenames intact.
   - Current files are untracked, so use a filesystem move rather than `git mv`.
   - Do not edit, delete, or rewrite any prompt or plan file content during the move.
3. Update path references in memory files:
   - `.claude/memory/general.md`: `Prompts/` → `Planning/Prompts/`, `Plans/` → `Planning/Plans/`.
   - `.claude/memory/memory.md`: same path update in the `general.md` index line.
   - `.claude/memory/domain/furniture-packs.md`: `Plans/fp3dpack-v1-plant-example.json` → `Planning/Plans/fp3dpack-v1-plant-example.json`.
   - `.claude/memory/domain/stl-converter-tool.md`: all `Plans/...` references → `Planning/Plans/...`.
4. Verify:
   - List `Planning/` to confirm both subfolders and all files are present.
   - Search for remaining `Prompts/` and `Plans/` path references; only intentionally updated text should remain.
   - Check `git status` to confirm no file was lost or accidentally modified.

## Non-goals

- No source code, build config, or HomePlan runtime files change.
- No new branch is needed: this is a filesystem/documentation move, not a code change.
- No files are renamed beyond gaining the `Planning/` parent path.
- No commit, merge, push, or remote change.

## Review

Do not execute this move until the user reviews and confirms this plan.
