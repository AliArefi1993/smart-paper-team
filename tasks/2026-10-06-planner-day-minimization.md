# Task: Review Planner day minimization

Status: design ready for user review and implementation; frontend implementation pending
Created: 2026-10-06
Updated: 2026-10-06

## Objective

Assess the user's request to minimize individual Planner days and all seven days, and provide an editable bilingual design proposal grounded in the current Planner.

## Context

- Product: quiet weekly scanning and safe manual-save editing in `PRODUCT.md`.
- Owner of this change: team `design/` and this task document only.
- Future application owner: `smart-paper-front/src/components/weekly-planner.tsx`.
- [Design handoff](../design/2026-10-06-planner-day-minimization.md); [Calm Planner reference](../design/2026-10-04-planner-calm-flow.md).

## Acceptance Criteria

- [x] Designer gives a product-grounded recommendation and distinguishes proposal from current behavior.
- [x] Interactive phone/wide English/Persian light/dark proposal covers individual and all-day collapse and reopening.
- [x] Hidden drafts and global Save feedback stay available; accessibility and state decisions are specified.
- [x] Studio type check/build and targeted browser review pass.
- [ ] Frontend implements the ready design and compares a running build with it, if implementation is requested.

## Non-Goals

Application code, backend/data changes, Android release, and production changes are outside this design review.

## Plan

1. Inspect source, product and Calm Planner reference.
2. Build and review the disclosure proposal in the repo studio.
3. Save recommendation and implementation acceptance criteria for user review.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio | `npm run typecheck`, `npm run build` | Passed |
| Browser | 390px EN/FA paired frames, 360px viewport, wide light/dark; draft restore, Persian Enter, independent collapse, retry | Passed targeted prototype checks |
| Application comparison | Source inspected; running app unavailable due to local build environment | Pending built-app QA |

## Decisions And Risks

- Recommend the request: it extends the scan-first Calm Planner design while keeping day summaries and direct reopening.
- Keep selected day distinct from expansion; rail reopens even the selected day. Phone keeps at most one open body, wide supports independent bodies, and all may close.
- Collapse is UI state, never a save/discard action. Built-app, physical Android and TalkBack checks remain.

## Outcome / Handoff

Designer handoff is ready for implementation and the prototype is ready for user review. [Open the proposal](http://localhost:6006/?path=/story/proposals-planner-day-minimization--selected-day). No application files were changed by this task. Next action is user review or frontend implementation against the handoff; retain the application's existing manual-save guarantees.
