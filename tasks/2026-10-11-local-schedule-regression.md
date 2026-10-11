# Task: Protect local timed schedule persistence and restore

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Complete the roadmap's focused timed schedule test backlog item using real local-store operations and synthetic data.

## Context

- Owning repository: `smart-paper-front/`; coordination records live here.
- Backlog: [automated timed schedule coverage](../ROADMAP.md).
- Existing import tests cover templates and transaction failures, but there is no dedicated schedule persistence/round-trip suite.

## Acceptance Criteria

- [x] Add, edit and delete schedule entries through saved week snapshots and verify fresh reads.
- [x] Cover schedule sorting and normalization at storage/import boundaries.
- [x] Verify JSON backup/restore preserves schedule data, including Persian text and optional fields.
- [x] Relevant automated tests, lint and TypeScript checks pass; independent review has no unresolved high/critical finding.
- [x] Update backlog/status and commit/push scoped changes in each owning repository.

## Non-Goals

Application behavior changes, new UI, dependency remediation, backend work, native-device certification or a new APK.

## Plan

1. Add bounded local-store regression tests using the existing synthetic browser-storage test harness.
2. Run Docker validation and independently review behavioral coverage.
3. Record evidence and close out both repository scopes.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Tests, lint, types | Docker Node 24: `npm test && npm run lint && npx tsc --noEmit` | Passed: 76 tests, zero failures; lint and types exit 0. Existing module-type warnings remain. |
| Independent review | Routine independent source/test review | Passed; no findings. |
| Documentation | Relative Markdown links and `git diff --check` | Passed. |

## Decisions And Risks

- Design: not applicable; tests and documentation only.
- Storage-level tests do not certify UI interaction, WebView behavior, physical-device migration or notifications.
- Existing untracked launcher-icon assets/story/task belong to other work and are excluded.

## Outcome / Handoff

Six dedicated schedule tests complete the bounded backlog item; no production code changed and no APK is required. Frontend test commit `83f2fd05790588f82ce280b6dfc21fd6402940c2` is pushed to `smart-paper-front/main`. Docker validation containers exited successfully and were automatically removed; no task process remains. Physical Android/UI checks remain outside this task.
