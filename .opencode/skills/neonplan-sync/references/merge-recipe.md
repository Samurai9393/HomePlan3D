# Merge recipe

Use this after the user confirms the fetch for the current run. The local repo's history starts at a content copy, not at an upstream commit, so a git merge of the two histories is wrong. Compare trees and apply changes per file.

## 1. Prepare the branch

```powershell
git status --short          # must be empty
git switch main
$stamp = Get-Date -Format yyyyMMdd
$branch = "sync/neonplan-$stamp"
git switch -c $branch       # add -2, -3, ... if it already exists
```

## 2. Fetch without touching remotes

```powershell
$upstream = 'https://github.com/Mastershort/neonplan3d.git'
$ref = 'refs/tmp/neonplan-sync/latest'
git fetch --no-tags $upstream "+HEAD:$ref"
$sha = git rev-parse $ref   # report this SHA
```

No `remote add`, no `git pull`, no `push`, no PR. The ref is temporary and will be deleted.

## 3. Create comparison worktrees

```powershell
$work = Join-Path $env:TEMP "neonplan-sync-$stamp"
git worktree add --detach (Join-Path $work 'base') b63d2ca
git worktree add --detach (Join-Path $work 'upstream') $ref

git diff --name-status b63d2ca $ref      # upstream changes since the copy
git diff --name-status b63d2ca HEAD      # local changes since the copy
```

`base` is the content copied from upstream pin `1cc184f5f774805af88cbf0198bc19c37bc28f67` into local commit `b63d2ca`.

## 4. Compare one path

For a relative path such as `frontend/src/features.ts`:

```powershell
$path = 'frontend/src/features.ts'
git diff --no-index (Join-Path $work "base\$path") (Join-Path $work "upstream\$path")
git diff --no-index (Join-Path $work "base\$path") (Join-Path (Get-Location) $path)
```

Apply upstream hunks to the file in the working tree with the edit tool. Skip or rewrite anything in `protected-surfaces.md`. For a new upstream file, copy it from the upstream worktree into the working tree and then strip protected content. For an upstream deletion, keep the local file if it has local changes.

PowerShell redirection re-encodes text. If byte-preserving extraction or `git merge-file` is needed, run the commands in Git Bash or through `cmd /c` instead of PowerShell `>`.

## 5. Verify

From `frontend/`:

```powershell
npm ci
npm run typecheck
npm test
npm run build
git diff --exit-code -- ../custom_components/homeplan3d/frontend
```

From the repository root:

```powershell
pip install -r requirements_test.txt ruff mypy
ruff check custom_components tests
ruff format --check custom_components tests
mypy custom_components/homeplan3d
pytest -q
python -c "from pathlib import Path; from custom_components.homeplan3d.packs import read_pack; [read_pack(p.read_text(encoding='utf-8')) for p in Path('furniture-packs').glob('*.fp3dpack')]"
```

If tool files changed:

```powershell
dotnet build tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release
dotnet test tools/StlToFp3dPack.Tests/StlToFp3dPack.Tests.csproj -c Release
```

## 6. Clean up

```powershell
git worktree remove --force (Join-Path $work 'base')
git worktree remove --force (Join-Path $work 'upstream')
git update-ref -d $ref
git diff --check
```

Leave `sync/neonplan-YYYYMMDD` unmerged. Commit only if the user asks.
