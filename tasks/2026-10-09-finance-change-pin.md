# Task: Give users a place to change the Finance PIN

Status: active — Product scope and Designer handoff ready; implementation authorized
Created: 2026-10-09
Updated: 2026-10-13

## Objective

Give users a clear, discoverable place to change the Finance password/PIN when they want to replace the default or their current PIN.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Primary implementation repository: `smart-paper-front/`, for Android/local-data mode; backend work remains paused.
- Source at frontend `4f62d32` confirms the local credential is build-time `NEXT_PUBLIC_FINANCE_PIN` or `1234`, with no persisted credential/change flow. Finance and Export default hints currently use build configuration alone.
- Product scope and acceptance: [Finance PIN brief](../design/2026-10-13-finance-pin-product.md). Required personal-systems observations are incorporated; independent Security source constraints are incorporated; final implementation review is still required.
- Related: [Privacy/local-data assessment](../docs/privacy-local-data-review.md) and [optional Finance visibility](2026-10-07-finance-optional-default-hidden.md).

## Acceptance Criteria

- [x] Inspect current PIN setup, default, storage and change behavior; reuse or improve an existing flow if present.
- [ ] Users can discover a Change Finance PIN action in an appropriate settings or Finance location chosen by Designer.
- [ ] Changing the PIN requires verifying the current PIN, entering a valid new PIN and confirming it; incorrect current PIN, mismatch and save failure have clear feedback.
- [ ] Successful changes persist after restart: the new PIN unlocks Finance and the previous PIN no longer does. Cancellation or failed persistence leaves the previous PIN usable.
- [ ] Finance records remain unchanged, and session handling after a PIN change is explicitly defined and verified.
- [x] Define forgotten-PIN and backup/import behavior before implementation without silently deleting records or introducing a default-PIN bypass.
- [x] Designer saves a ready bilingual handoff and editable studio states; messages accurately describe the local PIN as a screen lock rather than data encryption.
- [ ] Relevant tests and independent Security/QA review pass, documentation is updated, and implemented changes follow the validated Android release workflow.

## Non-Goals

- User accounts, cloud recovery, data encryption or backend credential changes.
- Default-PIN bypass, destructive reset, forced first-run setup, changed JSON schema, or broader Settings/Finance redesign.

## Plan

1. Inspect current local PIN behavior and agree bounded credential/session/recovery requirements with Product and Security.
2. Designer chose the action placement and prepared a ready English/Persian handoff; see [design handoff](../design/2026-10-13-finance-pin.md), [editable studio story](../design/studio/src/stories/FinancePin.stories.tsx), and [captured evidence](../design/evidence/2026-10-13-finance-pin/).
3. Implement, test persistence and error/cancellation cases, review, fix and document.
4. Publish a validated Android release when implementation is complete.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Backlog scope | Maintainer request on 2026-10-09 | Recorded as planned |
| Credential behavior | Narrow source inspection at frontend `4f62d32`; local-store/finance-store/finance-session/Finance/Settings/Export | Build-time default only; one-hour memory unlock; JSON excludes credential |
| Product/personal-systems scope | Linked Product brief and lead-delivered consultation, 2026-10-13 | Accepted; independent Security source constraints incorporated |
| Designer handoff | [Ready bilingual handoff](../design/2026-10-13-finance-pin.md), editable story and [37 evidence captures](../design/evidence/2026-10-13-finance-pin/) | Accepted; implementation ready |
| Studio validation | `npm run typecheck`, `npm run build` in `design/studio`; actual IAB captures and bounded prototype interactions | Passed; structural prototype only, no frontend behavior claim |
| Implementation checks | No app changes in Product discovery | Not run |

## Decisions And Risks

- Design: ready for implementation; final independent Security/QA review remains required.
- Recommended boundary: separate persisted local credential; only missing credential uses legacy default; malformed/unreadable state fails closed. JSON Merge/Replace retain the receiving-device PIN and never restore a credential. No in-app forgotten-PIN recovery or silent data deletion. Product and lead accepted the scope; implementation must verify these behaviors.
- Existing full JSON backup/import also require the PIN, including Planner/Ideas records. This consequence must be disclosed before replacement; backups contain records, not the credential. The brief makes this consequence explicit for the bounded cycle.
- Successful persisted change immediately relocks all protected consumers and invalidates stale work; cancelled/failed atomic write retains prior credential/records. Use one atomic versioned salted-verifier key and safe concurrency handling; Security reviews the implemented derivation parameters and contract.
- Product rule: new PIN is 4–12 digits with leading zeroes and Persian/Arabic-Indic normalization; reject unchanged PIN and preserve exact absent-key legacy configured-credential compatibility.

## Outcome / Handoff

Product discovery and the ready bilingual Designer handoff are complete; no application code changed. Security source constraints are incorporated. Frontend implementation may begin against the [Product brief](../design/2026-10-13-finance-pin-product.md) and [ready design](../design/2026-10-13-finance-pin.md). Credential persistence, concurrency, protected-cache invalidation, native lifecycle, independent Security/QA review and release validation remain open; this design closeout does not claim implementation or native verification.
