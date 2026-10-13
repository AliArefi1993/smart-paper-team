# Task: Give users a place to change the Finance PIN

Status: complete; Android 2026.10.21 published and anonymous public APK checksum verified
Created: 2026-10-09
Updated: 2026-10-13

## Objective

Give users a clear, discoverable place to change the Finance password/PIN when they want to replace the default or their current PIN.

## Context

- Maintainer steering on 2026-10-13 adds [Finance visible by default](2026-10-13-finance-default-visible.md) to this release. Its ready design preserves saved preferences and Finance report exclusion.

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Primary implementation repository: `smart-paper-front/`, for Android/local-data mode; backend work remains paused.
- Source at frontend `4f62d32` confirms the local credential is build-time `NEXT_PUBLIC_FINANCE_PIN` or `1234`, with no persisted credential/change flow. Finance and Export default hints currently use build configuration alone.
- Product scope and acceptance: [Finance PIN brief](../design/2026-10-13-finance-pin-product.md). Required personal-systems observations are incorporated; independent Security source constraints are incorporated; final implementation review is still required.
- Related: [Privacy/local-data assessment](../docs/privacy-local-data-review.md) and [optional Finance visibility](2026-10-07-finance-optional-default-hidden.md).

## Acceptance Criteria

- [x] Inspect current PIN setup, default, storage and change behavior; reuse or improve an existing flow if present.
- [x] Users can discover a Change Finance PIN action in an appropriate settings or Finance location chosen by Designer.
- [x] Changing the PIN requires verifying the current PIN, entering a valid new PIN and confirming it; incorrect current PIN, mismatch and save failure have clear feedback.
- [x] Successful changes persist after restart: the new PIN unlocks Finance and the previous PIN no longer does. Cancellation or failed persistence leaves the previous PIN usable.
- [x] Finance records remain unchanged, and session handling after a PIN change is explicitly defined and verified.
- [x] Define forgotten-PIN and backup/import behavior before implementation without silently deleting records or introducing a default-PIN bypass.
- [x] Designer saves a ready bilingual handoff and editable studio states; messages accurately describe the local PIN as a screen lock rather than data encryption.
- [x] Relevant tests and independent Security/QA review pass, documentation is updated, and implemented changes follow the validated Android release workflow.

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
| Implementation checks | Fresh Docker install, lint/types, all 119 tests and local build; final amendment 24 focused credential/visibility/transfer tests, lint/types/local build; exact-source hosted CI `38334342301` | Passed; exact-source CI ran 121 tests, lint, types, local-data build and verification packaging |
| Independent source reviews | Final Security and QA; queued-save feedback corrected | Accepted; no unresolved actionable finding |
| Final Designer | Final PIN and Finance-default review, including corrected dark-status color | Accepted; implementation handoff closed |
| Actual built browser | Fresh visible default, saved-hidden clean reload, hidden PIN access, empty-current validation/focus, Cancel retains Settings draft, EN/FA Light/Dark phone/wide/landscape, direct fragment and locked Finance/report defaults | Passed; actual credential replacement and native behavior not claimed |
| Protected stable build | Run `38334700023` on exact source `4a6736df8d98770ab608334583d1ba8a5ac1403d`, Android code38/name `2026.10.21`; candidate artifact `11784845532`, final artifact `11786651262` | Passed; final artifact retained for independent Security review |
| Final artifact Security | Exact APK/provenance, stable identity, 557 payload entries and 113 assets | Accepted; no finding |
| Publication | Annotated frontend/backend/team tags, publisher run `38341157085`, public asset `635744418` (4,389,312 bytes, SHA-256 `5866485c0a266e6ecca1485c7d3cd4e870e888ce3c4ad4100fc0bef9675ece69`) | Passed; public release is non-draft/non-prerelease and anonymous download matches committed APK byte-for-byte |

## Decisions And Risks

- Design: final Designer accepted. Source Security, QA and independent final artifact Security accepted; native and direct credential-entry checks remain unverified follow-ups.
- Recommended boundary: separate persisted local credential; only missing credential uses legacy default; malformed/unreadable state fails closed. JSON Merge/Replace retain the receiving-device PIN and never restore a credential. No in-app forgotten-PIN recovery or silent data deletion. Product and lead accepted the scope; implementation must verify these behaviors.
- Existing full JSON backup/import also require the PIN, including Planner/Ideas records. This consequence must be disclosed before replacement; backups contain records, not the credential. The brief makes this consequence explicit for the bounded cycle.
- Successful persisted change immediately relocks all protected consumers and invalidates stale work; cancelled/failed atomic write retains prior credential/records. Use one atomic versioned salted-verifier key and safe concurrency handling; Security reviews the implemented derivation parameters and contract.
- Product rule: new PIN is 4–12 digits with leading zeroes and Persian/Arabic-Indic normalization; reject unchanged PIN and preserve exact absent-key legacy configured-credential compatibility.

## Outcome / Handoff

Implemented the independent Settings PIN action, strict dedicated salted verifier, absent-only exact legacy compatibility, 4–12 digit cross-script normalization, Web Locks serialization and single-write commit. Successful changes synchronously revoke credential-bound Finance/Export/report access and pending work; cancellation, validation and write failure preserve the old credential and records. JSON import retains destination credentials and no forgotten-PIN bypass is added. The maintainer’s default-visible amendment preserves stored choices and report Finance exclusion.

Source Security and QA accepted after the queued-save feedback fix. Fresh 119-test validation plus 24 focused final-amendment tests/lint/types/local build passed. Exact-source CI `38334342301` passed 121 tests, lint, types, local-data build and verification packaging at frontend `4a6736df8d98770ab608334583d1ba8a5ac1403d`. Actual browser checked default/reload/preferences, PIN entry/empty validation/Cancel, independent Settings drafts, direct fragment and bilingual layouts. New credentials were not entered or committed through browser automation; synthetic automated credential tests support the persistence/security acceptance. Actual credential UI interaction, native Web Locks, two actual windows, OS transfer, installation/upgrade, keyboard/lifecycle and TalkBack remain unverified follow-ups. The final Dark status-color correction passed lint/types/local build and actual EN/FA Cancel captures; Designer accepted the final PIN and default-visible states. Protected stable run `38334700023` succeeded, independent artifact Security accepted the exact signed APK/provenance with no finding, and publisher run `38341157085` plus anonymous asset byte verification passed. Android 2026.10.21/code38 is shipped; native/credential-entry limits remain open.
