# Task: Show Finance by default

Status: implemented and verified; release pending
Updated: 2026-10-13

The maintainer changed the default to **Show Finance = true** because Finance is now useful to keep available. This supersedes the fresh-install default from the shipped 2026.10.19 visibility task, without removing the toggle or replacing saved choices.

## Acceptance

- No saved preference defaults visible, independently of Finance records.
- Saved visible/hidden choices remain authoritative after restart and import.
- Initial malformed preference uses visible with the existing truthful error and explicit Retry repair.
- PIN/session/record preservation and excluded-by-default Finance report fields stay unchanged.
- Bounded tests, actual fresh/reload/hide browser checks and the validated Android release pass.

Design: [ready addendum](../design/2026-10-13-finance-default-visible.md), with updated editable visibility/PIN studio baselines. Designer typecheck/build passed. Frontend owner integrates this bounded change with the active [Finance PIN task](2026-10-09-finance-change-pin.md); no backend changes.

Focused tests, lint/types/local build and actual fresh/default/hidden-clean-reload checks passed. Source Security and QA accepted; publication remains pending. Do not rewrite earlier release records or override an existing saved hidden preference.
