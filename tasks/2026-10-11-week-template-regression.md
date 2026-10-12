# Week template lifecycle and backup regression coverage

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Cover week-template storage lifecycle, alias isolation, and a full seven-day serialized JSON Replace roundtrip through the public local store APIs.

## Acceptance criteria

- [x] Verify trimmed-name overwrite preserves a template ID, delete preserves another template, and generated IDs are distinct.
- [x] Verify mutating save inputs or returned data does not silently change stored templates.
- [x] Verify a seven-day Persian template retains weekly goals/notes, per-day sections, and scheduled section linkage and times through JSON Replace.
- [x] Design: not applicable; storage regression tests only.
- [x] Run focused tests in Docker Node 24.

## Verification

| Check | Result |
| --- | --- |
| Docker Node 24 focused week-template test | Passed: 2 tests, 0 failures (`node --test tests/local-week-template-records.test.mjs`) |
| Application and dependency files | Unchanged |

## Decisions and risks

- Inline UI template application remains unverified; this task covers storage and backup only.

## Outcome

Tests are in `smart-paper-front/tests/local-week-template-records.test.mjs`. No application source or dependency files changed. No persistent process was started.
