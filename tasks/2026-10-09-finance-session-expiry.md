# Task: Relock Finance promptly after session expiry

Status: complete; Android 2026.10.11 published
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Prevent previously rendered finance data remaining visible for almost an extra hour after the local screen-lock session expires; recheck on focus/resume and reject stale asynchronous UI updates.

## Context

- Requested after the [privacy assessment](../docs/privacy-local-data-review.md), finding 1.
- Frontend owns implementation; team owns handoff/task/release memory. Backend unchanged.
- Baseline frontend `38f19c1`, backend `68c789b`; team `3e6ee63`, all clean.
- Design: [expiry handoff](../design/2026-10-09-finance-session-expiry.md), ready for implementation.

## Acceptance Criteria

- [x] Foreground session checks never use the full one-hour TTL as a polling interval; detection bounded to 30 seconds while timers run.
- [x] Focus and visible/resume events recheck the session without requiring a user mutation.
- [x] Expiry clears rendered finance, add/edit/goal fields, pending PIN/success state and shows truthful EN/FA locked recovery; saved records remain untouched.
- [x] Late loads/mutation/session results cannot restore data or overwrite a newer lock/unlock lifecycle.
- [x] Relevant tests, lint, TypeScript, local build, targeted QA and independent sensitive-change review pass.
- [x] Eligible exact-source stable Android release is independently verified, published and public checksum checked; durable memory updated.

## Non-Goals

- App encryption, changing PIN/TTL, new manual Lock feature, immediate lock on every background event, Android backup policy, notification changes or backend feature work.
- Guaranteeing timers run during suspension; native device/TalkBack checks remain explicit follow-ups.

## Plan

1. Ready bilingual Designer/studio handoff for expired lock and unsaved edit handling.
2. Bounded frontend implementation with regression tests for near-expiry, focus/visibility and asynchronous races.
3. QA/security review, fixes, relevant checks and lead release acceptance.
4. Routine scoped commits/push and hosted stable Android 2026.10.11/code 28 flow under standing authorization; document exact artifacts/publication.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Baseline | `scripts/project-context.sh` and separate repository status | Clean |
| Design | Designer handoff and EN/FA studio states, existing copy retained, lock focus and PIN naming scoped | Ready; studio checks passed, rebuilt QA pending |
| Automated checks and targeted QA | Isolated Docker npm ci/lint/TypeScript/npm test/local-data build; all 66 tests passed | Passed; existing 21 dependency advisories remain |
| Independent review | Security source review found and reproduced a microtask publication race; post-await guards plus regression added and re-review accepted | Source and fixed race regression accepted; signed APK/provenance also independently accepted |
| Production browser QA | Synthetic data on isolated loopback8766; focus/visibility expiry, all drafts/PIN/status cleared, focus recovery, wrong-PIN and saved321 record recovery; foreground unlocked at 27.9s, locked by 37.0s observation; helper verifies 30s interval | Passed; synthetic events, no Android runtime guarantee |
| Designer rebuilt acceptance | EN/FA Light/Dark at 390px and EN/FA wrapping at 360px | Passed; [EN expiry screenshot](../design/evidence/2026-10-09-finance-session-expiry/en-expired.png) |
| Stable release/publication | Frontend CI run 37980072688; hosted stable run 37980511818; [public team release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.11), publisher run 37982644853 | Passed; anonymous APK SHA-256 `83e19d56c73159fa8bd9ba834d4b01838756ba8e9c224f43a0980dc19f743e52`, 4,469,135 bytes |

## Decisions And Risks

- Studio Linux reproducibility required a narrow 25-line optional-dependency lock repair; isolated Docker install/typecheck/build passed. Host dependencies were preserved.
- Source review caught success/403 checks resolving together; every final awaited publication now synchronously checks the current lifecycle before state setters.

- Existing local PIN remains a screen lock only; no encryption promise.
- Unsaved edit handling follows ready design; persisted records are not deleted on expiry.
- Runtime Android suspension, keyboard/TalkBack and upgrade retention remain unverified until exercised on a phone.

## Outcome / Handoff

Frontend source `052be41c465669b2a3a18342fd443f96a8fc3c5b` is committed/pushed; Android code 28/name 2026.10.11 is published as [Smart Paper v2026.10.11](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.11). The exact hosted artifact passed independent Security verification and its anonymous public download matches the committed APK byte-for-byte. Team release commit `f85ed4f158e44fd2142a9ac1fe22f8b9245685a6` contains the release record, APK and original provenance. Frontend/backend/team annotated tags target their validated release commits. Task-owned preview/studio servers were stopped and ports verified clear.

Lead accepted the bounded change and authorized publication after exact-source CI, candidate verification, protected signing and independent Security review passed. No backend changes or migration. Standing authorization covered the agent-operated release flow.
