# Task: Make the AI report ChatGPT handoff reliable

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Investigate and resolve the maintainer-reported problem with **Open ChatGPT** in the Android AI report flow. Establish a reliable, understandable report handoff before depending on it for the proposed Planner week-sharing shortcut.

## Context

- Maintainer report: choosing Open ChatGPT in the report "doesn't work well." Exact symptoms, environment and reproduction are not yet known; do not assume a root cause.
- Roadmap: [Confidence In The Shipped Android App](../ROADMAP.md#current-goal-confidence-in-the-shipped-android-app).
- Owning implementation repository: `smart-paper-front/`. Current product contract: [PRODUCT.md](../PRODUCT.md).
- Related proposed improvement: **Review this week with AI** on Planner, opening the existing report with the viewed week's dates selected. This task records the prerequisite issue, not authorization to implement that shortcut.

## Acceptance Criteria

- [ ] Capture actual versus expected behavior, reproduction steps, app/Android/ChatGPT versions and installed-app state.
- [ ] Review the current handoff and supported Android sharing behavior; determine a fix from evidence.
- [ ] Users can deliberately transfer the previewed report to ChatGPT through a verified path, or use clear save-and-attach instructions when direct sharing is unavailable.
- [ ] Copy distinguishes opening ChatGPT from attaching/sending the report; no unsupported promise of automatic attachment or sending.
- [ ] Handle missing ChatGPT, cancellation and sharing failure without losing the report or changing planner records.
- [ ] Preserve field/date selection, preview, and finance-off-by-default boundaries. No backend, account connection or embedded AI is introduced.
- [ ] Verify relevant English/Persian and accessibility states, automated checks and Android phone handoff behavior; record any unexecuted native checks explicitly.
- [ ] Update documentation and follow the normal validated Android release workflow when implemented.

## Non-Goals

- Investigation, code changes or release during this backlog-recording request.
- Implementing the Planner shortcut, AI accounts, model APIs or a server.

## Plan

1. Gather reproduction evidence and inspect the owning repository's instructions and handoff code when this task is started.
2. Designer reviews current behavior and saves a ready bilingual handoff/studio states before frontend changes.
3. Implement the bounded fix, test/review/fix, verify and document its limits.
4. Release after validation under the existing workflow; assess the Planner shortcut separately.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Issue evidence | Maintainer report on 2026-10-07 | Reported; not reproduced |
| Runtime checks | Deferred until task starts | Not run |

## Decisions And Risks

- Root cause is unknown. Opening the app, Android file permissions, attachment handling and recipient behavior must be distinguished during investigation.
- Design: required before future user-visible implementation; current change is documentation only.

## Outcome / Handoff

Saved as future work only. Next action when selected: obtain exact reproduction details and review the current Android report handoff. No app changes have been made.
