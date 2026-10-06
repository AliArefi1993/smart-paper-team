# Task: App-wide dark mode

Status: implemented; full route visual verification pending
Created: 2026-10-05
Updated: 2026-10-06

## Objective

Make the Planner dark mode apply consistently across every app route, including summaries and export reports, and retain the choice while navigating.

## Context

- Owning repositories: frontend implementation; team design and product memory.
- Reported bug: the Planner is dark, but other routes remain light.
- Design: [ready bilingual handoff](../design/2026-10-05-app-wide-dark-mode.md) and linked studio stories.
- Coverage review: [2026-10-06 focused audit and ready fix handoff](../design/2026-10-06-dark-mode-coverage-audit.md). User clarified the request to light remnants, not a palette redesign.
- Studio correction: the user's exact `PlannerThemeContinuity` screenshot revealed light section cards and fields in the original designs. The prior application-only source audit missed these studio leaks. Shared studio coverage is now corrected and verified; this is distinct from application build/visual verification.

## Acceptance Criteria

- [x] Selecting dark mode in Planner is stored for all routes and reloads; selecting light uses the same shared preference.
- [ ] Summaries, reports, finance, timer, ideas, settings, and export surfaces, controls, and feedback pass visual review in English and Persian.
- [x] Production build passes in the preferred validation environment.
- [x] Durable docs describe the app-wide behavior.

## Plan

1. Review existing routes and obtain a ready design handoff.
2. Share and persist theme state; apply dark styling across route surfaces.
3. Validate behavior and update docs.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Frontend lint, types, 23 tests | Host commands with existing dependencies | Passed 2026-10-05 |
| CSS syntax | PostCSS parse | Passed 2026-10-05 |
| Production build | Current frontend local-data build in Docker | Passed 2026-10-06 |
| English/Persian route review | Real build available at http://127.0.0.1:3010/; Planner theme/language draft retention checked | Full other-route visual comparison pending; Designer follow-up interrupted by usage limit |
| Focused light-surface source audit | All seven routes, nested Planner sheets, form/feedback states, report preview, shared controls and SVG | Two gaps: Idea Space white hover and Timer pale SVG glass; existing language selector and gradient are covered |
| Coverage fix design preview | Dedicated EN/FA phone/wide excerpts; light regression; studio typecheck/build; targeted contrast | Passed 2026-10-06; source-backed excerpt, actual application comparison remains pending |
| Coverage fix source review | Designer checked shared hover selector and dark-only SVG classes against ready handoff; `git diff --check` | Passed; both gaps covered, light SVG/gold sand preserved |
| Coverage fix application checks | Current frontend Docker lint/types/27 tests/build | Passed 2026-10-06 |
| Original studio design correction | Exact PlannerThemeContinuity EN/FA 390px phone/680px wide screenshots and computed colors; all 14 other dark exports surface audit; Timer screenshot; light Planner regression | Passed 2026-10-06. All four Planner card variants, fields, quick add, week rail and shared Timer SVG covered with existing dark roles. Original light palette retained; screenshots and scope in coverage audit. |
| Studio correction validation | `npm run typecheck`; `npm run build`; `git diff --check` | Passed 2026-10-06; existing bundle-size advisory only |

## Decisions And Risks

- Design review preceded frontend edits under workspace workflow.
- Shared theme uses local storage and an early document class to preserve the choice across navigation and first paint. Existing route utility colors are mapped to semantic dark roles in shared CSS.
- Coverage fix decisions: use existing dark hover `#30443f` for Idea Space `hover:bg-white/70`; use existing `--primary-soft`/`--primary` for Timer glass/frame in dark only and retain gold sand/light rendering. Implemented in `0186476`; running UI verification remains.
- Studio correction reuses its existing dark palette. Shared preview dark CSS explicitly covers later Planner light declarations and uses semantic Timer SVG classes; the proposal board follows the dark canvas. Designer reviewed running Storybook and stored screenshots. No application code changed for this correction.

## Outcome / Handoff

Frontend revisions `6d56f31` (app-wide preference) and `0186476` (two remaining coverage gaps) were committed and pushed to `main`. Designer source audit and excerpt review are complete. Current frontend Docker lint/types/27 tests/build passed. Complete the remaining bilingual route visual comparison against the running build; the follow-up Designer agent reached its usage limit before reporting this gate. Physical Android review remains a separate release check.
