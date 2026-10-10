# Task: Simplify the Planner fixed bottom area

Status: publication pending
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

- [x] Designer reviews whether the fixed area is still useful and recommends removing or simplifying it, including an accessible placement for Next day if needed.
- [x] A ready design handoff and editable English/Persian studio stories cover portrait, landscape, and keyboard-open states before frontend implementation.
- [x] The selected treatment reduces unnecessary fixed screen space and keeps day navigation discoverable and reachable, including the final day of a week.
- [x] Autosave, pending edits, save-error feedback, and data preservation during day navigation continue to work.
- [ ] Targeted checks, independent review, documentation, and the validated Android release workflow are completed if implemented; record physical-device follow-ups explicitly.

## Non-Goals

- Broad Planner redesign, autosave/storage contract changes or removing Django manual-save controls.
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
| Current reproduction | Browser portrait390x844 and landscape740x360; fixedfooter73px (~20% short viewport) | Confirmed; captures in [handoff](../design/2026-10-09-planner-bottom-area.md) |
| Design | Ready handoff, EN/FA portrait/landscape/short-height/wide prototypes and error day-end review; isolated Docker studio install/typecheck/build | Passed; native keyboard not simulated |
| Frontend checks/review | Independent source review accepted mode/active-day controls, unchanged storage/departure guards, Django footer and single live save region; isolated Docker lint/typecheck/66 tests/local build | Passed; 21 existing dependency advisories |
| Production QA | Rotation/notes/Next/Friday/Retry/failed-write guards in synthetic browser fixture | Passed; edits persist through rotation/reload, inline/minimized navigation, Friday disabled and failed-save recovery; EN/FA Light/Dark screenshots |
| Android release | Exact-source CI, protected signing, independent APK review | Passed; team tag publisher and anonymous public checksum verification pending |

## Decisions And Risks

- Chosen treatment is local-only: remove fixed overlay/reserved gap, expose existing status/Retry inline at week heading and active opened day end; add in-flow Next before day rail and at active day end. Friday Next stays visible disabled; no week rollover.
- Same-week day navigation remains available during failed storage writes, retaining in-memory edits; route/week departure guards remain unchanged. Django manual save/footer remains unchanged.

- Design: ready handoff implemented and accepted against the built Planner; native keyboard, physical rotation and TalkBack remain device follow-ups.
- Existing root horizontal overflow was observed before and after this bounded change; the separate landscape review remains open.

## Outcome / Handoff

Implemented and verified; Designer, source review and production-browser acceptance passed. The exact signed artifact passed independent Security review; team tag publication and public checksum verification remain. Synthetic failure injection was served from a temporary QA origin, not added to application assets.
