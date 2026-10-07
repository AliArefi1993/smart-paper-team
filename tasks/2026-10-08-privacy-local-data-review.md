# Task: Review privacy and local-data protection

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Create an accurate account of what Smart Paper stores and shares, assess realistic local-data risks and recommend proportionate improvements without assuming offline storage is encrypted.

## Context

- Owning repositories: team coordination memory; `smart-paper-front/` for any later Android implementation.
- Roadmap: [ROADMAP.md](../ROADMAP.md); current capabilities/risks: [STATUS.md](../STATUS.md).
- Product contract: [PRODUCT.md](../PRODUCT.md). Related future work: [local feedback/diagnostics](2026-10-07-local-feedback-diagnostics.md).

## Acceptance Criteria

- [ ] Security reviews local app storage, Android backup configuration, exported files, selective sharing and finance screen-lock behavior against actual code/configuration.
- [ ] Document what remains on-device, what can leave only through user actions, and existing protection limits; distinguish proposed diagnostics from implemented behavior.
- [ ] Assess privacy leaks through errors/logs, exported files and future diagnostic/report attachments without collecting real personal data.
- [ ] Rank justified improvements by risk/value/effort; evaluate encryption and key recovery only if warranted rather than promising or implementing it by default.
- [ ] Identify any misleading privacy/PIN copy and provide a design-ready scope for necessary clarification; preserve backup and recovery usability.
- [ ] Record evidence, severity, remaining gaps and bounded follow-up tasks; do not claim unexecuted checks passed.

## Non-Goals

- Executing reviews/tests, changing app code or publishing a release during this backlog-recording request.
- New servers, telemetry uploads or a separate tracking system.

## Plan

1. Perform a bounded read-only Security review with explicit local/offline threat assumptions.
2. Produce a concise data-flow/protection summary and prioritized findings.
3. Decide scoped fixes with the lead/maintainer and update durable contracts after validated changes.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer authorized final backlog additions on 2026-10-08 | Saved as planned |
| Review/validation | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable to the technical assessment; privacy/settings copy changes require design.
- No legal/compliance certification or cryptographic redesign is implied. The existing Android PIN is a screen lock, not encryption.
- Any future user-visible fixes require a ready bilingual Designer handoff, relevant checks/review and the existing release workflow.

## Outcome / Handoff

Future work only; no app changes or QA executed. When selected, follow the bounded plan and preserve the current release/safety rules.
