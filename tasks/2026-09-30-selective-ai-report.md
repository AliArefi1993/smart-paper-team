# Task: Selective AI report sharing

Status: implemented; phone handoff pending
Created: 2026-09-30
Updated: 2026-09-30

## Objective

Let a person choose the dates and fields in a human-readable report, review it, and share the file to an AI app through the device share chooser. Keep full JSON backup and restore separate.

## Context

- Primary target: Android local-data mode in `smart-paper-front/`.
- Existing `Export For AI` Markdown includes all planner and finance data.
- Product, design, and security reviews recommended explicit field selection, finance off by default, and user-initiated file sharing. ChatGPT file handoff depends on the installed app and device chooser.

## Acceptance Criteria

- [x] Inclusive date range filters planner days/events and income entries; partial-week totals use selected days.
- [x] Users can select report fields; omitted fields never appear in the generated report.
- [x] Finance starts off and remains protected by the existing unlock.
- [x] The user can review the file content before sharing; invalid or empty selections cannot be shared.
- [x] Android uses the share chooser; web can share or download. The UI explains how to attach the file in ChatGPT if it is not a chooser target.
- [x] Full JSON backup/import behavior is unchanged and clearly separate.
- [x] Lint, TypeScript, focused tests, and Android local-data build pass.

## Decisions And Risks

- Date range defaults to all dates, with editable From/To fields. Finance remains off by default.
- Week-level goals and notes apply when a week intersects the chosen range; day fields are filtered by day date.
- The finance goal is a current value if selected, independent of the date range. Income totals are recomputed from selected entries.
- No automatic upload, API key, or ChatGPT account integration. The app chooser may not offer ChatGPT on every phone.

## Verification

| Check | Result |
| --- | --- |
| Frontend lint/type/tests/local build | Passed in Docker; 18 tests, 2026-09-30 |
| Browser export screen | Persian narrow-width layout and invalid date feedback checked in local static build |
| Physical-phone share to ChatGPT | Pending; no device available in workspace |

## Outcome / Handoff

Frontend revision `6930db0` builds a field-limited Markdown report in local-data mode, shows its text for review, and uses the device share chooser or browser download. Finance authorization is checked again at share time. The Django-backed export screen keeps its existing full Markdown action while backend feature work is paused. Confirm ChatGPT appears as a file target on a physical phone; otherwise verify the save-and-attach fallback. The coordination repository revision is recorded by this file's Git history.
