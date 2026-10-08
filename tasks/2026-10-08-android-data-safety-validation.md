# Task: Validate Android data safety on a real phone

Status: in progress; phone execution pending
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Establish actual-device evidence that upgrades, backups and interrupted/failed operations preserve saved plans and ideas, and document realistic recovery limits.

## Context

- Owning repositories: team coordination memory; `smart-paper-front/` for any later Android implementation.
- Roadmap: [ROADMAP.md](../ROADMAP.md); current capabilities/risks: [STATUS.md](../STATUS.md).
- Consolidates outstanding data-safety phone checks from [Android APK readiness](2026-09-29-android-apk-readiness.md); reuse that checklist and historical evidence rather than opening duplicate verification streams.
- Use synthetic records on a spare/test device; never jeopardize the only copy of personal data.

## Acceptance Criteria

- [ ] Record exact APK/source revisions, certificate, device/Android version and fixture records before testing.
- [ ] Verify same-certificate, higher-version upgrades preserve plans, settings, templates, saved ideas/branches and finance data; verify drafts according to their recovery contract.
- [ ] Export a JSON backup outside the app and restore on a clean test installation; compare included records/settings and explicitly check draft exclusions.
- [ ] Exercise merge/replace, cancellation, invalid/older backups and bounded write-failure cases; confirm no unintended primary-data loss.
- [ ] Exercise controlled low-storage/write failures, app suspension/termination and restart on a test device; distinguish already saved records from unfinished/session-only writing.
- [ ] Document a practical recovery path and truthful limitations; triage discovered bugs before claiming resilience.
- [ ] Record evidence, severity, remaining gaps and bounded follow-up tasks; do not claim unexecuted checks passed.

## Non-Goals

- New product features or changes unrelated to observed data-safety findings.
- New servers, telemetry uploads or a separate tracking system.

## Plan

1. Prepare safe fixtures, external backup and a real-device test matrix using existing release/QA records.
2. Execute upgrade, restore and failure/interruption checks; capture expected versus actual behavior.
3. Review failures, create bounded fixes and update readiness/status evidence without duplicating history.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer authorized final backlog additions on 2026-10-08 | Saved as planned |
| Initial local baseline | Docker Node 24, frontend tests on 2026-10-08 | 37 passed |
| Discovered Merge issue | Independent review of template assignment in local-store.ts | High data-loss finding; fixed and validated for [2026.10.7](../releases/smart-paper-v2026.10.7.md) |
| Final local checks | Docker lint, TypeScript, all 52 tests, independent review and stable-signed release build | Passed; see [template merge task](2026-10-08-template-merge-safety.md) and release record |
| Phone execution | No ADB executable available in workspace PATH | Not run |
| Fixtures and matrix | [Execution matrix](2026-10-08-data-safety-phone-matrix.md) | Prepared; device fields pending |

## Decisions And Risks

- Design: not applicable to verification itself; user-visible fixes require design.
- Physical-device evidence is currently a recorded follow-up, not a new blanket publication gate. Discovered critical/high correctness issues still follow existing release blocking rules.
- Any future user-visible fixes require a ready bilingual Designer handoff, relevant checks/review and the existing release workflow.

## Outcome / Handoff

The discovered template Merge data-loss issue is fixed and validated for [2026.10.7](../releases/smart-paper-v2026.10.7.md). The broader phone checks remain open. Use the [prepared matrix](2026-10-08-data-safety-phone-matrix.md) on a spare device. Automated checks do not establish upgrade retention or crash atomicity.
