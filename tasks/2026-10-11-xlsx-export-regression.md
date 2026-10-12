# XLSX export regression coverage

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Add independent ZIP/XML regression checks for the existing XLSX writer, following the [evaluation handoff](../docs/spreadsheet-writer-evaluation.md).

## Acceptance criteria

- [x] Cover populated and empty exports, six-sheet order and headers, text and numeric cells, Persian/XML-sensitive text, and formula-like text without formula nodes.
- [x] Keep application behavior and the existing `xlsx` dependency unchanged.
- [x] Design: not applicable; tests only.
- [x] Run the focused regression in Docker Node 24 and record results.

## Verification

| Check | Result |
| --- | --- |
| Docker Node 24 focused XLSX test | Passed: 2 tests, 0 failures (`node --test tests/export-xlsx-regression.test.mjs`) |
| Broader `npm test` attempt | 76 passed, 2 failed. The XLSX assertion failure was corrected and the focused file then passed; `file-share.test.mjs` also failed because `@capacitor/core/index.js` was unavailable after clean install. Concurrent clean installs share this checkout's `node_modules`, so the broader result is inconclusive and needs a clean rerun after installs stop. |
| Package manifest and lock | Unchanged; existing `xlsx` dependency remains as-is |

## Outcome

Regression test added in `smart-paper-front/tests/export-xlsx-regression.test.mjs`. No application source or dependency files changed. This task added no persistent processes; Docker test containers exited with `--rm`.
