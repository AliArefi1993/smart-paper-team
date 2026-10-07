# Task: Define lightweight problem-report triage

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Ensure reports from the maintainer and voluntary testers lead to reproducible, prioritized work and verified closure without building a support-management system.

## Context

- Owning repositories: team coordination memory; `smart-paper-front/` for any later Android implementation.
- Roadmap: [ROADMAP.md](../ROADMAP.md); current capabilities/risks: [STATUS.md](../STATUS.md).
- Related feature: [local reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md). Triage can also handle reports received before that feature exists.

## Acceptance Criteria

- [ ] Define a short report template: app version, expected/actual behavior, reproduction, impact and optional diagnostics.
- [ ] Define simple states (needs information, reproduced, planned, in progress, verified/closed) and severity rules; data loss/security/blocked primary flows receive prompt assessment.
- [ ] Deduplicate reports and link each actionable issue to its existing/new task and relevant release.
- [ ] Validate diagnoses from evidence; reproduce safely with synthetic fixtures and separate user observations from confirmed causes.
- [ ] Handle submitted attachments and sender information privately; never commit raw personal reports or publish diagnostic/user content in the public repository.
- [ ] Define an owner and minimal closure evidence, with any reporter reply requiring explicit messaging authorization.
- [ ] Use existing task/status/release files for sanitized findings; no assumed inbox access, automated email ingestion or new metrics burden.
- [ ] Record evidence, severity, remaining gaps and bounded follow-up tasks; do not claim unexecuted checks passed.

## Non-Goals

- Executing reviews/tests, changing app code or publishing a release during this backlog-recording request.
- New servers, telemetry uploads or a separate tracking system.

## Plan

1. Define the minimal intake/triage/closure convention and responsibility.
2. Walk through one synthetic report, including duplicate/insufficient-information cases.
3. Document the convention alongside the reporting task and normal closeout rules after a decision.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer authorized final backlog additions on 2026-10-08 | Saved as planned |
| Review/validation | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable to internal triage documentation; reporter-facing app changes need design.
- Voluntary reports are incomplete and do not represent all users. No external messaging or access to users' mail is authorized by this task.
- Any future user-visible fixes require a ready bilingual Designer handoff, relevant checks/review and the existing release workflow.

## Outcome / Handoff

Future work only; no app changes or QA executed. When selected, follow the bounded plan and preserve the current release/safety rules.
