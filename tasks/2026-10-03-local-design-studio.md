# Task: Local design studio

Status: implemented; visual comparison pending
Created: 2026-10-03

## Objective

Make repo-native designs the primary Smart Paper design canvas by adding a separately runnable Storybook studio under `design/`. Keep screen prototypes and handoffs in the team repository, with Figma optional.

Design: not applicable to the shipped app; this changes design tooling and process only.

## Acceptance criteria

- [x] `design/studio/` runs locally without the backend, frontend app, or Figma account.
- [x] All seven shipped routes have editable, bilingual phone stories migrated from the existing structural atlas; representative material states are browsable separately.
- [x] The studio uses current paper/teal foundations and clearly marks illustrative data and unverified visual fidelity.
- [x] Designer skill, workspace instructions, inventory, and handoff docs name the local studio as the primary design artifact.
- [x] Dependency install, type check, static Storybook build, and dev-server smoke test pass. Visual comparison remains pending because the available browser surface blocked local file preview by policy in the earlier task; no alternate browser route was attempted.
- [x] Scoped team commit is pushed; backend and frontend repositories remain untouched.

## Plan

1. Add a standalone React/Vite Storybook package in `design/studio/`.
2. Migrate the atlas screen content into stories and add route state variants.
3. Update workflow and design records so prototype review precedes frontend implementation.
4. Validate, review changes, commit, and push.

## Verification and handoff

Storybook 10.6.1 and React/Vite run from `design/studio/`. Seven route story files provide 32 named bilingual baseline/state drafts. `npm run typecheck`, `npm run build`, and `npm run storybook -- --smoke-test --ci` passed. The static build index contains 32 stories. The built UI was not visually inspected, and the stories are structural sketches with illustrative text rather than pixel-matched current screens. Next design work should inspect the local stories and running app in a permitted preview, adjust layout/copy, then add proposal stories for future changes before Frontend work.
