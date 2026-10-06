# Task: Review Planner day minimization

Status: implemented and verified; physical Android checks pending
Created: 2026-10-06
Updated: 2026-10-06

## Objective

Implement individual Planner day minimization and a minimize-all action after the Designer's recommendation and ready bilingual handoff.

## Context

- Product: quiet weekly scanning and safe manual-save editing in `PRODUCT.md`.
- Owners: team design/task memory and frontend `src/components/weekly-planner.tsx`.
- [Design handoff](../design/2026-10-06-planner-day-minimization.md); [Calm Planner reference](../design/2026-10-04-planner-calm-flow.md).

## Acceptance Criteria

- [x] Designer gives a product-grounded recommendation and distinguishes proposal from current behavior.
- [x] Interactive phone/wide English/Persian light/dark proposal covers individual and all-day collapse and reopening.
- [x] Hidden drafts and global Save feedback stay available; accessibility and state decisions are specified.
- [x] Studio type check/build and targeted browser review pass.
- [x] Frontend implements the ready design and compares a running build with it.
- [x] Collapse/reopen preserves drafts and save behavior, works in both languages/themes, and meets the handoff's breakpoint/focus rules.

## Non-Goals

Backend/data changes, Android release, and production changes are outside this task.

## Plan

1. Inspect source, product and Calm Planner reference.
2. Build and review the disclosure proposal in the repo studio.
3. Implement the ready recommendation and verify the application against the handoff.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio | `npm run typecheck`, `npm run build` | Passed |
| Browser | 390px EN/FA paired frames, 360px viewport, wide light/dark; draft restore, Persian Enter, independent collapse, retry | Passed targeted prototype checks |
| Frontend validation | Docker lint, TypeScript, 27 tests including four expansion tests, local-data production build; diff check | Passed 2026-10-06 |
| Independent review | Calendar-order fallback corrected and regression tested; final review of fallback/focus/grid changes | No remaining findings |
| Application comparison | Real local-data build: EN/FA 360/390px and wide; individual/bulk minimize, current rail reopen, hidden-draft save, long Friday note, Enter/Space, language/theme retention, resize all-closed retention, unsaved week warning | Passed targeted Designer runtime checks |

## Decisions And Risks

- Recommend the request: it extends the scan-first Calm Planner design while keeping day summaries and direct reopening.
- Keep selected day distinct from expansion; rail reopens even the selected day. Phone keeps at most one open body, wide supports independent bodies, and all may close.
- Collapse is UI state, never a save/discard action. Physical Android, keyboard/safe areas and TalkBack checks remain.

## Outcome / Handoff

Designer handoff is ready. The user explicitly made implementation after recommended, ready designs an automatic workflow step. Frontend `37b91ec` implements the handoff and retains manual-save guarantees. Docker checks, independent review and targeted Designer runtime comparison passed. The six-route dark-surface follow-up was interrupted by an agent usage limit; no additional coverage is claimed. [Open the proposal](http://localhost:6006/?path=/story/proposals-planner-day-minimization--selected-day).

[Open the actual application preview](http://127.0.0.1:3010/). This frontend change is ready for the next APK; no release was made.
