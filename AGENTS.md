# AGENTS.md

## Project status

- This workspace is a separate local project. Code was copied once from `https://github.com/Mastershort/neonplan3d` at commit `1cc184f5f774805af88cbf0198bc19c37bc28f67` (2026-11-22). Do not fetch, pull, push, or open PRs there; there is no sync relationship.
- Local `origin` is `https://github.com/Samurai9393/Neoplan3d2.git`. Do not push or change remotes without explicit instruction.
- Local git HEAD/history predates this copy and does not match the working tree. Verify against working-tree config and scripts, not `git show HEAD:`.
- Treat the copied code as a baseline to modify here. Add stack, layout, and command facts only after verifying them in the working tree.

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
