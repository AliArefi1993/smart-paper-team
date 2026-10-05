# Task: Calm Planner design proposal

Status: shipped in `smart-paper-v2026.10.2`; physical flow and accessibility review remain
Created: 2026-10-04
Updated: 2026-10-05

## Objective

Make Planner editing feel calm and predictable on a phone. Opening a section should reveal its beginning immediately, and longer goals or notes should remain readable. Saving must communicate whether changes are still at risk.

## Context

- Owning repository: team design workspace. The current app is in `smart-paper-front/`.
- Design handoff: [Calm Planner editing flow](../design/2026-10-04-planner-calm-flow.md).
- Editable prototype: [Planner calm stories](../design/studio/src/stories/PlannerCalm.stories.tsx). With Storybook running, open `http://127.0.0.1:6006/?path=/story/proposals-planner-calm-flow--overview`.

## Acceptance Criteria

- [x] Compact bilingual section overview with section-specific minutes, goal, and note.
- [x] Open any section with its heading visible; keep long writing readable inline and in a full writing view.
- [x] Show unsaved, saving, saved, and save-error states.
- [x] Document proposal scope and update design inventory/status.
- [x] Designer source comparison and ready handoff.
- [x] Complete browser QA of the implemented app in EN/FA, including long text, dark mode, unsaved navigation, and sheets.
- [ ] Complete physical Android and screen reader review.

## Non-Goals

- Frontend app changes or persisted Planner data in the prototype.
- Replacing the shipped baseline stories.

## Plan

1. Keep the interactive proposal and handoff in the team repository.
2. Review on a phone-sized viewport in English and Persian, then reconcile against the running app.
3. Implement in `smart-paper-front/` only after the handoff is ready.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Source | `npm run typecheck` in `design/studio/` | Passed |
| Static studio | `npm run build` in `design/studio/` | Passed |
| Phone interactions | Browser review of last-section scroll, growing note, writing view focus return, and save/error states | Passed for reviewed browser states; physical Android and screen reader remain |
| Built app | Docker lint, TypeScript, 23 tests, and local-data build; 390px browser interaction review | Passed; long-text overflow found and fixed during browser QA |

## Decisions And Risks

- Only one section form opens at a time, keeping the day overview short. The existing data model and manual save flow remain the implementation target.
- Story content, save feedback, and failure/retry are illustrative. The prototype does not persist data.
- Four example sections do not establish a product limit; the app supports ten configurable slots.

## Outcome / Handoff

The design is implemented in frontend commit `ed2b5a3` and shipped in the stable-signed `2026.10.2` APK. Browser QA passed in English and Persian. The user installed the new Android version and reported that its experience was substantially better than before the design-first workflow. This is feedback on the overall experience, not completion of the physical flow checklist. Android upgrade, backup/restore, notifications, full bilingual layout, and screen reader checks remain. See [release record](../releases/smart-paper-v2026.10.2.md).
