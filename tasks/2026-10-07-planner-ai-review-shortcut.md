# Task: Review the viewed Planner week with AI

Status: design ready; authorized implementation
Created: 2026-10-07
Updated: 2026-10-12

## Objective

Make the existing selective AI report easier to discover from Planner through a **Review this week with AI** action. Users prepare and preview the viewed week's report, then deliberately share it with their preferred AI app.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; current behavior: [PRODUCT.md](../PRODUCT.md).
- Dependency: [Report handoff correction](2026-10-07-ai-report-chatgpt-handoff.md) shipped deliberate Copy, file Share and manual selection. Reuse those paths; native chooser/recipient delivery remains unverified follow-up under the current release policy.
- Lead selected this next readiness-first offline task. [Product brief](../design/2026-10-12-planner-ai-shortcut-product.md) incorporates the required personal systems consultation. Implementation waits for Finance visibility release closure and a ready Designer handoff.
- Proposed explanatory copy: "Share your selected week with your preferred AI app for reflection and suggestions." Final copy and placement belong to Designer.

## Acceptance Criteria

- [ ] Planner offers a discoverable action for AI review of the week currently being viewed, including past/future weeks rather than always today's week.
- [ ] Reuse the existing selective AI report flow with that week's inclusive Saturday-to-Friday dates preselected; preserve the user's ability to choose fields and preview the exact report.
- [ ] Finance remains excluded by default and requires its existing unlock if deliberately included.
- [ ] Nothing is sent automatically. Reuse existing Copy, file Share and manual selection; clipboard denial and chooser cancellation have understandable feedback. Do not promise recipient attachment or claim unobserved native delivery verified.
- [ ] Report preparation works offline and requires no Smart Paper server, AI account connection or API key; clarify that receiving cloud AI responses needs connectivity.
- [ ] Failed Planner saves retain writing and block shortcut navigation/reporting until Retry succeeds. Successfully saved edits appear; active event/template editing must reach its existing explicit save/cancel resolution before leaving. Returning/cancelling preserves records without silently losing writing or misrepresenting an older saved report.
- [ ] Direct Export retains its existing all-dates defaults. Invalid/incomplete/ambiguous/impossible or non-week query context shows understandable recovery without silently presenting all-history data as the viewed week. Pass only calendar context in URLs, never report content.
- [ ] Do not imply AI runs inside Smart Paper or that opening an AI app automatically attaches/sends a report.
- [ ] English/Persian, RTL/LTR, Light/Dark, empty/past/future week, long content, focus and error states have a ready editable studio handoff and relevant source/browser checks. Native delivery, lifecycle and TalkBack remain explicit follow-ups until observed.
- [ ] Documentation and the validated Android release workflow are completed when implemented.

## Non-Goals

- Implementing before Finance visibility publication closes or before the Designer handoff is ready.
- Embedded AI, account linking, API billing, backend hosting or automatic planner modifications.
- Adding Idea Space or unfinished drafts to report scope.

## Plan

1. Product scope and personal systems consultation are recorded in the linked brief; retain the existing shipped handoff and explicit native evidence limits.
2. Designer reviews Planner and report behavior; save a ready bilingual handoff and editable studio stories before frontend implementation. Finance visibility release must close first.
3. Implement the shortcut by reusing existing report logic, defining week/date and pending-edit handling explicitly.
4. Test week selection, field privacy, preview, sharing/cancellation, offline preparation and language states; review/fix and document.
5. Release after validation under the existing Android workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Planning scope | Maintainer discussion on 2026-10-07 | Saved as future work |
| Selection / Product | Lead selection and read-only personal systems consultation, 2026-10-12; linked Product brief | Ready for Designer; no implementation |
| Narrow source evidence | Report dates initialize empty; Export lacks week context; synchronous Planner autosave retains failed writing; report reads persisted data | Bounded reuse scope with failed-save/editor guard |
| Designer | Ready handoff, studio typecheck/build, actual EN/FA phone/wide Light/Dark screenshots, invalid/save/editor/focus/enlarged-text states | Passed; structural prototype, not native certification |
| Implementation checks | Deferred until Finance publication closure | Not run |

## Decisions And Risks

- Design: [ready bilingual handoff](../design/2026-10-12-planner-ai-shortcut.md) and editable studio states accepted; implementation still awaits Finance closure.
- Existing Copy/file/manual handoff is accepted for reuse; no ChatGPT deep link or automatic transfer. Native recipient evidence remains open under current release policy.
- Product decision: block the shortcut on failed saving rather than report older persisted data; resolve active editor save/cancel first. Designer owns placement/copy and recovery presentation; Frontend owns narrow validated date initialization.
- Needs confirmation: actual convenience/discoverability and recognition of viewed past/future week; no usage-research finding is claimed.

## Outcome / Handoff

Selected after Finance visibility release closure. Product scope incorporates personal systems advice; Designer saved the ready handoff and verified editable studio evidence. Reuse the shipped selective-report and deliberate-transfer behavior; preserve failed writing and current Finance protections. Finance publication and anonymous APK verification passed in Android 2026.10.19. The bilingual handoff is ready; frontend implementation is now authorized. No app changes or runtime checks were made in Product scoping; native evidence remains open.
