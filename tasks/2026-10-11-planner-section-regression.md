# Planner section regression coverage

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Cover planner section settings, active totals, retained hidden data, and JSON Replace behavior through the public local store API.

## Acceptance criteria

- [x] Verify Persian labels and custom ordering persist for slot 10.
- [x] Verify hiding a populated section retains its data and removes its active totals; reactivation restores totals.
- [x] Verify serialized JSON Replace preserves section configuration and hidden data.
- [x] Design: not applicable; tests only.
- [x] Run the focused regression in Docker Node 24.

## Verification

| Check | Result |
| --- | --- |
| Docker Node 24 focused planner section test | Passed: 4 tests, 0 failures (`node --test tests/local-planner-sections.test.mjs`) |
| Application and dependency files | Unchanged |

## Outcome

Tests are in `smart-paper-front/tests/local-planner-sections.test.mjs`. No application source or dependency files changed. No persistent process was started.
