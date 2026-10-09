# Task: Simplify the Planner fixed bottom area

Status: planned
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Review removing the Planner's fixed bottom area to recover useful screen space. The maintainer reports that the former Save button has been removed for autosave and the area now only contains Next day.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`.
- Planner autosave is shipped. Confirm current bottom-area contents and behavior before choosing the final treatment.
- Related: [Phone landscape layout review](2026-10-09-phone-landscape-layout.md).

## Acceptance Criteria

- [ ] Designer reviews whether the fixed area is still useful and recommends removing or simplifying it, including an accessible placement for Next day if needed.
- [ ] A ready design handoff and editable English/Persian studio stories cover portrait, landscape, and keyboard-open states before frontend implementation.
- [ ] The selected treatment reduces unnecessary fixed screen space and keeps day navigation discoverable and reachable, including the final day of a week.
- [ ] Autosave, pending edits, save-error feedback, and data preservation during day navigation continue to work.
- [ ] Targeted checks, independent review, documentation, and the validated Android release workflow are completed if implemented; record physical-device follow-ups explicitly.

## Non-Goals

- Implementation during this backlog request.
- Removing day navigation or changing the autosave contract.

## Plan

1. Inspect current Planner bottom-area behavior and its navigation/save states.
2. Designer assesses removal and prepares a ready bilingual studio handoff.
3. Implement the approved treatment; test day navigation, autosave, keyboard behavior, and both orientations; review and document.
4. Publish a validated Android release after implementation checks pass.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Backlog scope | Maintainer suggestion on 2026-10-09 | Recorded |
| Design and implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required before future screen changes; not applicable to this documentation-only backlog addition.
- Removing the fixed container should preserve a clear way to advance to the next day; final placement belongs to Designer.

## Outcome / Handoff

Planned only. Review the current area and prepare the design handoff before implementation.
