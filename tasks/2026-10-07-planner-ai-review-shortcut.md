# Task: Review the viewed Planner week with AI

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Make the existing selective AI report easier to discover from Planner through a **Review this week with AI** action. Users prepare and preview the viewed week's report, then deliberately share it with their preferred AI app.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; current behavior: [PRODUCT.md](../PRODUCT.md).
- Dependency: [Open ChatGPT handoff issue](2026-10-07-ai-report-chatgpt-handoff.md). Establish a reliable sharing path before relying on it in this shortcut.
- Proposed explanatory copy: "Share your selected week with your preferred AI app for reflection and suggestions." Final copy and placement belong to Designer.

## Acceptance Criteria

- [ ] Planner offers a discoverable action for AI review of the week currently being viewed, including past/future weeks rather than always today's week.
- [ ] Reuse the existing selective AI report flow with that week's inclusive Saturday-to-Friday dates preselected; preserve the user's ability to choose fields and preview the exact report.
- [ ] Finance remains excluded by default and requires its existing unlock if deliberately included.
- [ ] Nothing is sent automatically. Sharing uses Android's chooser with a verified path and understandable save-and-attach fallback where needed.
- [ ] Report preparation works offline and requires no Smart Paper server, AI account connection or API key; clarify that receiving cloud AI responses needs connectivity.
- [ ] Returning/cancelling preserves planner records and pending edits; report contents reflect applicable saved/current data consistently without silent loss or misleading omissions.
- [ ] Do not imply AI runs inside Smart Paper or that opening an AI app automatically attaches/sends a report.
- [ ] English/Persian, RTL/LTR and accessibility states have a ready design handoff, relevant automated checks and bounded Android validation.
- [ ] Documentation and the validated Android release workflow are completed when implemented.

## Non-Goals

- Implementation in the current planning request.
- Embedded AI, account linking, API billing, backend hosting or automatic planner modifications.
- Adding Idea Space or unfinished drafts to report scope.

## Plan

1. Review the linked handoff issue and confirm the reliable sharing path.
2. Designer reviews Planner and report behavior; save a ready bilingual handoff and editable studio stories before frontend implementation.
3. Implement the shortcut by reusing existing report logic, defining week/date and pending-edit handling explicitly.
4. Test week selection, field privacy, preview, sharing/cancellation, offline preparation and language states; review/fix and document.
5. Release after validation under the existing Android workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Planning scope | Maintainer discussion on 2026-10-07 | Saved as future work |
| Implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required before future user-visible implementation; this change only records the task.
- Report handoff reliability is a prerequisite; do not assume a ChatGPT deep link transfers report content.
- Final placement/copy and treatment of pending or failed planner saves remain design/technical decisions.

## Outcome / Handoff

Planned only. When selected, resolve the sharing dependency and produce the design handoff before implementation. No app changes made.
