# Open-source refactor

## 2026-11-23 — Pro features become open source
- What: User decided on full de-commercialisation. `custom_components/homeplan3d/open-source-config.json` is the single source of truth; every feature whose code is in this repo is free and enabled by default, including Pool Pro and room_bar. Shop, licence key, customer account, prices, bundles, supporter/beta gating and vendor links come out.
- Why: The fork is to stand on its own as MIT open source without a shop dependency. This explicitly supersedes the earlier "Pool Pro stays unreleased until Torsten releases it" guard.

## 2026-11-23 — Local packs stay unsigned; module approval stays
- What: Local JSON pack imports (furniture packs and module packs) are kept but unsigned: no signature check, publisher keys, instance binding or licensee. Module code still needs admin review/approval before it runs, so Announcements and frames keep working.
- Why: User chose weak authenticity over dropping module-based features, while keeping a human approval step for executable code.

## 2026-11-23 — Refactor branch
- What: Code changes for this refactor live on `refactor/open-source-config`, created from `main`; the agent does not merge.
- Why: Keeps `main` user-controlled, as with every code-changing prompt.
