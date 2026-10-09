# Task: Review and fix phone landscape layout

Status: planned
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Investigate the maintainer's report that Smart Paper does not look right when the phone rotates to landscape, and fix confirmed layout or interaction problems where needed.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`.
- Reported affected screens and exact symptoms: Needs confirmation through reproduction.

## Acceptance Criteria

- [ ] Reproduce and record affected screens, viewport sizes, and rotation behavior.
- [ ] Confirmed issues are fixed: content and controls remain reachable without unintended clipping, overlap, or obstructive fixed areas in landscape.
- [ ] Rotation preserves current input, saved data, and usable navigation.
- [ ] Designer saves a ready handoff and editable English/Persian studio stories before frontend changes; portrait layout remains usable.
- [ ] Targeted checks, independent review, documentation, and the validated Android release workflow are completed if fixes are implemented; record physical-device follow-ups explicitly.

## Non-Goals

- Implementation during this backlog request.
- Broad redesign or forced portrait orientation without a separate justified decision.

## Plan

1. Reproduce the report and identify affected routes and layout constraints.
2. Designer reviews current behavior and prepares a ready bilingual studio handoff for confirmed fixes.
3. Implement bounded fixes, test rotation and both orientations, review, and document.
4. Publish a validated Android release if application changes are needed.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Backlog scope | Maintainer report on 2026-10-09 | Recorded |
| Layout reproduction and implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required for future screen changes; not applicable to this documentation-only backlog addition.
- The report is user evidence, not yet a reproduced diagnosis; scope fixes from observed behavior.

## Outcome / Handoff

Planned only. Start with reproduction and Designer review; take action if confirmed issues need fixes.
