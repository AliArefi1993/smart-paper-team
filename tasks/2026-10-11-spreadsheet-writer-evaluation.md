# Task: Evaluate maintained spreadsheet writer options

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Complete a bounded source/API evaluation of the Android XLSX writer and hand off a concrete remediation candidate with compatibility and security checks.

## Context

- Selected under the maintainer request to pick and complete a new task.
- Owning repository: team coordination root; frontend inspected read-only at `d899f2c`.
- Follow-up to [production dependency assessment](2026-10-11-android-dependency-advisories.md).
- Result: [spreadsheet writer evaluation](../docs/spreadsheet-writer-evaluation.md).

## Acceptance Criteria

- [x] Record current exported sheets, cell semantics and adapter contract.
- [x] Compare official SheetJS and a replacement using primary sources.
- [x] Recommend a bounded candidate and define regression/security/release checks without claiming remediation.
- [x] Independent Security review has no unresolved material finding.
- [x] Validate Markdown paths and diff; commit/push scoped documentation.

## Non-Goals

Dependency installation or remediation, app behavior changes, APK release, benchmarks or workbook-import support.

## Plan

1. Inspect source and vendor evidence.
2. Write comparison and implementation handoff.
3. Independent Security review, path/diff validation and scoped closeout.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Source/API inventory | Export writer/caller, package manifest, test search | Six-sheet synchronous writer; no XLSX-specific tests found |
| Vendor evidence | Linked official installation, writer/utilities and advisory notices; ExcelJS maintainer README | Official 0.20.3 candidate; ReDoS fixed in >=0.20.2; replacement requires different adapter |
| Independent Security review | Specialist source/vendor and report review | No unresolved material finding after ID correction and Finance-gate test addition |
| Documentation validation | Relative Markdown targets in the six task files; `git diff --check` | All local targets exist; diff check passed (2026-10-11) |
| Scoped closeout | Root coordination Git | Commit `881ece39d525ea58c64ce01b3a4805e58b44b421` pushed to `origin/main` (2026-10-11) |

## Decisions And Risks

- Design: not applicable; source/API assessment only.
- Prefer official pinned SheetJS candidate before a writer rewrite; recommendation, not a completed upgrade.
- Current shipped advisories and unproven writer ReDoS reachability remain unchanged.

## Outcome / Handoff

Source/vendor evaluation and independent Security review are complete. Income IDs were corrected to numeric, and Finance expiry rejection was added to the regression handoff. Implementation should follow the bounded checks in the report; no application files changed. Documentation validation and commit/push evidence are recorded below during closeout.
