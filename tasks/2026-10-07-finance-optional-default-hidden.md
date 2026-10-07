# Task: Make Finance optional and hidden by default

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Keep Planner central by removing Finance from the default experience. Users can deliberately enable Finance when they want it; pause further Finance feature expansion.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; product contract: [PRODUCT.md](../PRODUCT.md).
- Maintainer direction from 2026-10-07; future work only.

## Acceptance Criteria

- [ ] Finance is hidden from default navigation for new users and can be enabled/hidden through a discoverable setting.
- [ ] Enabling/hiding persists locally across restarts and works offline.
- [ ] Hiding never deletes finance records, goals, or backup/export access; re-enabling restores access with existing protections.
- [ ] Decide and document upgrade behavior for existing installations, including users with finance data; no silent data loss or inaccessible records.
- [ ] Define hidden-route and cross-screen behavior without treating a visibility preference as a security boundary.
- [ ] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
- [ ] Relevant automated checks, independent review, documentation and validated Android release workflow are completed when implemented.

## Non-Goals

- Implementation or release during this planning request.
- New finance capabilities, budgeting, accounts or backend work.

## Plan

1. Product confirms open scope/acceptance decisions; inspect current owning-repository behavior when this task starts.
2. Designer reviews current behavior and saves a ready bilingual design handoff.
3. Implement the bounded change, test/review/fix and verify data preservation and offline behavior.
4. Update durable product/status documentation and release after validation under the existing workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Direction | Maintainer discussion on 2026-10-07 | Recorded as future work |
| Implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Exact setting placement and upgrade defaults remain open; default-hidden direction is agreed.
- Finance feature expansion is paused; this does not preclude necessary data-safety fixes.
- Design: required before future implementation; current change is documentation only.

## Outcome / Handoff

Planned only; no app changes. Start Product/Designer scoping when the maintainer selects this task.
