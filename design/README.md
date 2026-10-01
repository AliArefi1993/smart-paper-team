# Smart Paper design workspace

This directory holds durable design work for the Android-first Smart Paper interface. Figma is the preferred editable canvas; this repository holds the problem, decisions, handoff, and verification so Product, Designer, Frontend, and QA can work from the same evidence.

Editable Figma file: [Smart Paper — Product Design](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n). The first frame is the [interface foundations board](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=1-2). Add screen frames to this file or link a separate file from the relevant design record.

## Files

- `foundations.md`: current interface foundations and design constraints.
- `screen-inventory.md`: shipped routes, feature flows, state coverage, and verified Figma frame links.
- `coverage-atlas.html`: editable English/Persian phone-width structural drafts for all seven shipped routes. Open locally in a browser; these are illustrative and require running-UI review before implementation.
- `2026-10-01-planner-timer-summaries-baseline.md` and the Finance, Export, and Settings baseline briefs: source-backed flow and state maps with outstanding design checks.
- `TEMPLATE.md`: copy to `design/YYYY-MM-DD-short-name.md` for a meaningful screen or flow change.
- Add exported SVG/PNG references under a matching `design/assets/<short-name>/` directory only when they help review or implementation. Prefer links to editable Figma frames over large binary exports.

## Handoff

1. Product defines the user problem and acceptance criteria when scope is uncertain. For every user-visible implementation task, Designer first reviews the current flow and creates a ready design handoff with editable frames when Figma is connected.
2. Designer updates the same record with selected direction, states, RTL/LTR notes, component mapping, and frame links. Mark open questions clearly.
3. Frontend begins in `smart-paper-front/` after the handoff is marked ready for implementation, using the record and actual Figma context. A generated snippet is a starting point, not the production source.
4. Designer and QA compare the running UI with the record on a phone-sized screen in both languages. Record observed differences and validation.

The Figma connection is account-specific; repo documents remain usable without it.

Baseline frames of shipped UI are reference material. A future redesign needs its own proposal and implementation handoff; a baseline alone is not approval to change behavior.
