# Task: Review Android accessibility and Persian usability

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Validate that primary phone flows remain usable with TalkBack, larger text, the on-screen keyboard and Persian RTL, supplementing structural desktop/story evidence.

## Context

- Owning repositories: team coordination memory; `smart-paper-front/` for any later Android implementation.
- Roadmap: [ROADMAP.md](../ROADMAP.md); current capabilities/risks: [STATUS.md](../STATUS.md).
- Consolidates the roadmap accessibility item and native follow-ups from the [product/design audit](2026-10-06-android-product-design-audit.md); preserve existing handoffs as references.

## Acceptance Criteria

- [ ] Define bounded primary-flow coverage: Planner, Settings, Ideas, backup/restore and reporting; include optional features when enabled.
- [ ] On an actual Android device verify TalkBack labels/order, announcements, dialogs, focus recovery and meaningful actions.
- [ ] Check text scaling, small screens, touch targets, contrast and keyboard occlusion without loss of content/actions.
- [ ] Check Persian RTL alongside English, including mixed-direction dates/numbers, text entry and navigation.
- [ ] Designer/QA document reproduced issues with expected behavior and prioritization, reusing existing studio stories and handoffs for fixes.
- [ ] Track actual-device and desktop evidence separately; preserve data-safety and dirty-writing behavior while fixing usability issues.
- [ ] Record evidence, severity, remaining gaps and bounded follow-up tasks; do not claim unexecuted checks passed.

## Non-Goals

- Executing reviews/tests, changing app code or publishing a release during this backlog-recording request.
- New servers, telemetry uploads or a separate tracking system.

## Plan

1. Designer/QA choose representative flows and device/accessibility settings from current risks.
2. Execute bounded phone checks with synthetic data; compare existing bilingual handoffs.
3. Save ready fix handoffs for demonstrated issues, then implement/test/review under the normal workflow when scoped.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer authorized final backlog additions on 2026-10-08 | Saved as planned |
| Review/validation | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required for resulting user-visible changes; current task records review scope only.
- Phone/TalkBack follow-ups remain subject to existing release policy; do not silently introduce a new universal release gate.
- Any future user-visible fixes require a ready bilingual Designer handoff, relevant checks/review and the existing release workflow.

## Outcome / Handoff

Future work only; no app changes or QA executed. When selected, follow the bounded plan and preserve the current release/safety rules.
