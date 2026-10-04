# Smart Paper design workspace

This directory holds durable design work for the Android-first Smart Paper interface. The local Storybook studio is the primary editable canvas. Product, Designer, Frontend, and QA can review versioned prototypes and handoffs without a Figma account or either app repository.

The existing [Smart Paper Figma file](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n) remains an optional reference. The [foundations board](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=1-2) and linked Idea Space and Planner frames are not a substitute for the local state stories.

## Run the local studio

From `design/studio/`, run `npm ci`, then `npm run storybook`. Open the local address printed by Storybook. `npm run typecheck` and `npm run build` validate source and generate a static Storybook output; `npm run format` formats editable source. The package has its own dependencies and does not build or modify the product frontend.

The [route stories](studio/src/stories/) have bilingual 390px baselines for all seven shipped routes and separate material states. The controls switch between English/Persian and phone/wide; each named story selects a state. The [screen content](studio/src/atlas-data.ts) and [state examples](studio/src/variants.ts) are editable, illustrative structural prototypes. They are not exact rendered app screens or approved proposals; compare them with the running app before calling them validated.

The [2026-10-04 baseline refinement](2026-10-04-baseline-story-refinement.md) records route-specific navigation, state sheets, timer and control improvements, plus the remaining Designer and QA approval gates.
The [Planner preview](studio/src/PlannerPreview.tsx) now exposes each active section's separate minutes, quick adjustments, goal, and note in the populated and sparse bilingual stories.
The [Calm Planner proposal](2026-10-04-planner-calm-flow.md) has interactive [overview, section, writing, sparse, unsaved, and error stories](studio/src/stories/PlannerCalm.stories.tsx). It proposes one open section at a time, scroll placement, growing writing fields, a full writing view, and explicit save feedback. This is a reviewable proposal, not shipped UI or an approved handoff.

## Files

- `foundations.md`: current interface foundations and design constraints.
- `screen-inventory.md`: shipped routes, feature flows, local stories, and remaining validation gaps.
- `studio/`: local React/Storybook design source, dependencies, and bilingual route/state stories.
- `coverage-atlas.html`: the earlier standalone structural atlas, retained as a historical reference; the studio is the maintained design canvas.
- `2026-10-01-planner-timer-summaries-baseline.md` and the Finance, Export, and Settings baseline briefs: source-backed flow and state maps with outstanding design checks.
- `TEMPLATE.md`: copy to `design/YYYY-MM-DD-short-name.md` for a meaningful screen or flow change.
- Add exported SVG/PNG references under a matching `design/assets/<short-name>/` directory only when they help review or implementation. Prefer links to editable local stories over large binary exports.

## Handoff

1. Product defines the user problem and acceptance criteria when scope is uncertain. For every user-visible implementation task, Designer first reviews the current flow and creates proposal stories in the local studio.
2. Designer updates the same record with selected direction, states, RTL/LTR notes, component mapping, and story links. Mark open questions clearly. Figma frames may supplement the stories.
3. Frontend begins in `smart-paper-front/` after the handoff is marked ready for implementation, using the record and stories as design context. Prototype code is not the production source.
4. Designer and QA compare the running UI with the record on a phone-sized screen in both languages. Record observed differences and validation.

The local studio needs npm dependencies but no Figma connection. A visual comparison with the running app and physical Android review are still separate checks.

Baseline frames of shipped UI are reference material. A future redesign needs its own proposal and implementation handoff; a baseline alone is not approval to change behavior.
