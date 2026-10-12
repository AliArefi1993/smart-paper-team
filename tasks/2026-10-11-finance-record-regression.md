# Local Finance record regression coverage

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Cover local income record create, edit and delete persistence, calculated totals, and locked or expired mutation rejection through public store APIs.

## Acceptance criteria

- [x] Verify goal and income CRUD persist across a fresh module runtime with deterministic record IDs.
- [x] Verify numeric totals, remaining amount, progress, edited date and Persian notes while preserving other entries.
- [x] Verify locked and expired add/edit/delete attempts reject with 403 and leave saved Finance storage unchanged.
- [x] Design: not applicable; tests only.
- [x] Run the focused regression in Docker Node 24.

## Verification

| Check | Result |
| --- | --- |
| Docker Node 24 focused Finance record test | Passed: 3 tests, 0 failures (`node --test tests/local-finance-records.test.mjs`) |
| Application and dependency files | Unchanged |

## Outcome

Tests are in `smart-paper-front/tests/local-finance-records.test.mjs`. No application source or dependency files changed. No persistent process was started.
