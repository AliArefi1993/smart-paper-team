# Task: Give users a place to change the Finance PIN

Status: planned
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Give users a clear, discoverable place to change the Finance password/PIN when they want to replace the default or their current PIN.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Primary implementation repository: `smart-paper-front/`, for Android/local-data mode; backend work remains paused.
- Maintainer reports a default Finance password and no clear place to change it. Confirm current credential behavior and any existing change flow before implementation.
- Related: [Privacy/local-data assessment](../docs/privacy-local-data-review.md) and [optional Finance visibility](2026-10-07-finance-optional-default-hidden.md).

## Acceptance Criteria

- [ ] Inspect current PIN setup, default, storage and change behavior; reuse or improve an existing flow if present.
- [ ] Users can discover a Change Finance PIN action in an appropriate settings or Finance location chosen by Designer.
- [ ] Changing the PIN requires verifying the current PIN, entering a valid new PIN and confirming it; incorrect current PIN, mismatch and save failure have clear feedback.
- [ ] Successful changes persist after restart: the new PIN unlocks Finance and the previous PIN no longer does. Cancellation or failed persistence leaves the previous PIN usable.
- [ ] Finance records remain unchanged, and session handling after a PIN change is explicitly defined and verified.
- [ ] Define forgotten-PIN and backup/import behavior before implementation without silently deleting records or introducing a default-PIN bypass.
- [ ] Designer saves a ready bilingual handoff and editable studio states; messages accurately describe the local PIN as a screen lock rather than data encryption.
- [ ] Relevant tests and independent Security/QA review pass, documentation is updated, and implemented changes follow the validated Android release workflow.

## Non-Goals

- Implementation during this backlog request.
- User accounts, cloud recovery, data encryption or backend credential changes.

## Plan

1. Inspect current local PIN behavior and agree bounded credential/session/recovery requirements with Product and Security.
2. Designer chooses the action placement and prepares a ready English/Persian handoff.
3. Implement, test persistence and error/cancellation cases, review, fix and document.
4. Publish a validated Android release when implementation is complete.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Backlog scope | Maintainer request on 2026-10-09 | Recorded as planned |
| Credential behavior and implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required for future user-facing implementation; not applicable to this documentation-only addition.
- The default and current change-flow availability are reported behavior, pending code verification.
- Recovery, backup/import and session invalidation need explicit decisions before implementation.

## Outcome / Handoff

Planned only. Start by inspecting existing PIN behavior, then produce a ready design handoff before implementation.
