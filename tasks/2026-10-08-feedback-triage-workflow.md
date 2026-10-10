# Task: Define lightweight problem-report triage

Status: complete
Created: 2026-10-08
Updated: 2026-10-10

## Objective

Ensure reports from the maintainer and voluntary testers lead to reproducible, prioritized work and verified closure without building a support-management system.

## Context

- Owning repositories: team coordination memory; `smart-paper-front/` for any later Android implementation.
- Roadmap: [ROADMAP.md](../ROADMAP.md); current capabilities/risks: [STATUS.md](../STATUS.md).
- Related feature: [local reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md). Triage can also handle reports received before that feature exists.

## Acceptance Criteria

- [x] Define a short report template: app version, expected/actual behavior, reproduction, impact and optional diagnostics.
- [x] Define simple states and severity rules; data loss/security/blocked primary flows receive prompt assessment.
- [x] Define deduplication and task/release linking.
- [x] Define evidence-based diagnosis and synthetic-fixture reproduction, separating observation from confirmed cause.
- [x] Define private handling of attachments/sender information and prohibit committing raw reports or publishing diagnostic/user content.
- [x] Assign maintainer triage ownership and require explicit authorization for reporter replies; define closure evidence.
- [x] Keep findings sanitized and within existing task/status/release files; no assumed inbox access, automated ingestion or metrics.
- [x] Record evidence, severity, gaps and bounded follow-up without claiming unexecuted checks.

## Non-Goals

- App changes, Android release work, and handling live reports during this documentation task.
- New servers, telemetry uploads or a separate tracking system.

## Plan

1. Define the minimal intake/triage/closure convention and responsibility.
2. Walk through one synthetic report, including duplicate/insufficient-information cases.
3. Document the convention alongside the reporting task and normal closeout rules after a decision.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Documentation | [Triage convention](../docs/feedback-triage.md) covers intake, states, severity, privacy, ownership, deduplication and closure | Complete |
| Synthetic walkthrough | Illustrative report, duplicate and insufficient-information cases in the convention | Complete; no user report accessed |
| Links and scope | Checked referenced task/status/roadmap paths and confirmed documentation-only scope | Passed |
| Markdown structure | Inspected headings, checklist state, code fence and table delimiters in changed Markdown | Passed |

## Decisions And Risks

- Design: not applicable to internal triage documentation; reporter-facing app changes need design.
- Voluntary reports are incomplete and do not represent all users. No external messaging or access to users' mail was used or authorized by this task.
- Any future user-visible fixes require a ready bilingual Designer handoff, relevant checks/review and the existing release workflow.

## Outcome / Handoff

Completed documentation-only convention and synthetic walkthrough. No app changes, live reports, user inboxes, external messaging, QA execution or release work were involved. Design: not applicable. No background processes were started.
