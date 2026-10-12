# Product: Change the local Finance PIN

Status: brief — Product scope accepted; ready for implementation with Designer handoff
Updated: 2026-10-13
Owning frontend: local credential/store adapters; Settings, Finance and Export/AI report consumers
Local studio story links: [FinancePin.stories.tsx](studio/src/stories/FinancePin.stories.tsx), `Proposals/Finance PIN`
Design type: proposed change

## Problem and evidence

The person using Smart Paper needs to replace the Finance default or current PIN without losing records, changing Finance visibility, or requiring internet. The maintainer reported no clear change action in the backlog request. No usability research or observed forgotten-PIN incident is claimed.

Source inspected at frontend `4f62d32f493867625ff828fd765b8a1244372036`:

- [local-store.ts](../smart-paper-front/src/lib/local-store.ts) reads `NEXT_PUBLIC_FINANCE_PIN ?? "1234"`; it has no saved credential or change operation. Current PIN verification compares the exact string. Existing configured credentials are not constrained to digits by this code.
- Finance authorization lasts one hour in module memory, starts locked in a new runtime, and gates protected reads/mutations, full exports and JSON import. [finance-session.ts](../smart-paper-front/src/lib/finance-session.ts) invalidates stale Finance screen work and checks expiry every 30 seconds/focus/visibility return.
- [Finance](../smart-paper-front/src/components/finance-view.tsx) and [Export](../smart-paper-front/src/components/export-view.tsx) derive the default hint from build configuration alone. Neither currently exposes PIN change. [Settings](../smart-paper-front/src/components/settings-view.tsx) has an independent Finance visibility control.
- JSON schema 5 contains records, without PIN/credential/session metadata. Both Merge and Replace import require the receiving device's active Finance session. Local Finance records and JSON backups are unencrypted.
- The [Android backup policy](../docs/android-backup-policy.md) excludes cloud app-data backup and permits supported device transfer. Actual OS/OEM transfer remains unverified; memory-only unlock never migrates.

Required read-only personal-systems consultation, supplied by lead on 2026-10-13, identifies the same dependency: a forgotten custom PIN also prevents the existing full JSON backup/import path for Planner and Ideas. Keep the action accessible when Finance is hidden and disclose this consequence before committing a replacement. This is a source-backed observation, not user research. Independent read-only Security consultation on the same date confirmed absent-only fallback, single-key atomic persistence, JSON credential exclusion and immediate broadcast relock; its source constraints are incorporated below. Final implementation still requires independent Security review.

## Outcome and scope

Desired outcome: a person can deliberately change a known PIN offline; after restart only the new PIN works and all records remain intact. Success signals are observable acceptance results, not adoption targets or invented analytics.

In scope: one local Android PIN-change action, current/new/confirm verification, persistent local credential, accurate default hints, immediate post-change session revocation, and clear forgotten-PIN/import boundaries. Designer owns action placement and interaction; the action must be discoverable from Settings and usable independently of hidden/visible Finance without changing visibility.

Non-goals: account or cloud recovery, default reset for a forgotten custom PIN, record deletion/reset, encryption, server/backend changes, forced first-run setup, a new backup format, changing current export/import authorization, or broader Settings/Finance redesign. Normal Planner/Ideas use remains available under its existing rules.

## Options and recommendation

| Option | User value | Risk | Implementation size |
| --- | --- | --- | --- |
| Keep build-time PIN only | No replacement capability | Maintainer problem remains | None |
| Save a local replacement; omit it from JSON; import retains receiving-device PIN | Direct offline change, old backups remain usable with destination authorization | Forgotten PIN blocks existing full backup/import; local state needs careful failure handling | Bounded frontend credential/store + UI/session work; recommended |
| Include credential in JSON and restore it | Could carry a lock across JSON restore | Backup changes destination credential unexpectedly, ambiguous Merge/Replace authorization and stale old credentials | Larger contract/migration scope; defer |
| Recovery/reset flow | Could restore access after forgetting | A default bypass or destructive reset defeats the requested safety boundary; no authorized identity/recovery mechanism exists | Separate product/security decision; out of scope |

Recommendation is the second option. A dedicated persisted credential must be separate from financial records and retain its identity through ordinary same-signer upgrades. Only an absent credential may use the legacy configured/default PIN. Invalid/unreadable saved credential state must never silently select `1234` or the build credential. Use one dedicated versioned local key containing a random salt and a derived verifier, rather than the raw chosen PIN. Use the available offline Web Crypto implementation; Security reviews the precise derivation parameters and implementation. If derivation/randomness/storage is unavailable, show a save error and preserve the existing credential rather than silently downgrading to plaintext. A verifier does not encrypt Finance records or certify resistance to device/origin access.

## Acceptance criteria

1. Local-only action remains discoverable whether Finance is hidden, visible, locked or unlocked. Changing its PIN leaves visibility, Planner, Ideas, templates, Finance goals and every income entry unchanged. Backend mode exposes no unsupported change action.
2. Require the current PIN even during an unlocked session, new PIN and confirmation. Verify the current credential at the actual commit boundary; opening the form or an earlier validation is insufficient. Distinct bilingual feedback covers missing/invalid new PIN, wrong current PIN, mismatch and persistence failure.
3. New-PIN rule: 4–12 digits, allow leading zeroes, reject unchanged PIN; normalize English, Persian and Arabic-Indic digits consistently for new/confirm and subsequent unlock. Preserve exact legacy configured-PIN verification so an existing nonnumeric credential remains usable for its first change. This is the bounded Product rule for this cycle, not a researched user preference. For a saved custom credential, normalize current-PIN input with the same digit mapping; for an absent-key legacy credential retain exact comparison.
4. Commit credential persistence before success and session revocation. A cancelled form before commit, failed validation or failed atomic write leaves the old credential and records unchanged, with no false success. Disable duplicate saves; cancellation during a pending commit must not falsely promise unchanged credentials. Use a single atomic `setItem` after complete validation; a thrown write preserves the old key under the storage contract. Treat successful return as the commit boundary and immediately revoke authorization; never attempt a multi-key credential/session commit. If storage cannot be read before validation, fail closed without writing. Recheck that the persisted credential still matches the validated snapshot immediately before commit; concurrent change must fail safely without overwriting it.
5. After confirmed success, revoke the current runtime Finance authorization immediately. Synchronously broadcast credential change to all sensitive consumers; clear Finance data, goal/add/edit drafts and protected Export/report previews and invalidate stale asynchronous results and transfers before publishing success. Require a fresh unlock with the new PIN. Advise the person before save that Finance will lock again and unsaved Finance edits will be cleared. No 30-second display grace after the change. Unrelated Settings drafts follow existing protection behavior.
6. New PIN succeeds and old PIN fails after ordinary route navigation, full reload and a new runtime. One-hour expiry/restart lock behavior remains. Cancellation/failure does not create a new unlock or extend the previous deadline.
7. Default-PIN hints in every local unlock surface use current credential state; after a custom credential exists they never advertise `1234` as usable. Credential read failures show an accurate unavailable/damaged state and fail closed. PIN input values are never logged, exported or durably saved as form drafts; clear them on cancellation/navigation/success.
8. JSON export contains no credential/verifier/session state. Merge and Replace retain the receiving device's credential; incoming credential-looking fields cannot replace it. Existing backup schema and older compatible backups remain supported. Fresh device JSON restore uses that device's current initial configured/default PIN for authorization, then leaves that credential unchanged; supported full OS transfer may copy the persisted credential with records and must start locked. No claim that unverified OEM transfer succeeds.
9. Before committing a new PIN, clearly state there is no in-app forgotten-PIN recovery and the existing full JSON backup/import requires that PIN. Existing backup files remain unencrypted records, without the PIN; restoring one into the locked installation cannot reset its PIN. Do not suggest uninstalling, clearing storage or deleting data as recovery. An external backup can only preserve records already deliberately exported; do not promise a backup can be made after forgetting the PIN.
10. Designer saves a ready English/Persian handoff with editable studio stories. Verify phone portrait/landscape, RTL/LTR, dark/light, long text/font scaling, keyboard/Back, labels/focus/status announcements and reachable controls. Include hidden/visible, locked/unlocked, mismatch/invalid/wrong current, cancel, committing, write/read failure, expiry/interruption, success/relock and backup-boundary states. Browser/studio evidence never substitutes for native Android or TalkBack evidence.
11. Focused automated tests cover legacy/default migration, persisted credential precedence, restart old/new denial, malformed/read/write failure, cancellation/duplicate and stale/concurrent work, all protected consumers, unchanged records, and JSON Merge/Replace/old backups. Independent Security and QA reviews have no unresolved critical/high finding. Lead accepts scope, then the requested work follows the validated Android release workflow; native lifecycle/upgrade/data retention/TalkBack follow-ups stay explicitly unverified until observed.

## Designer guidance

Communicate a deliberate local screen-lock change and its consequences without exposing records or implying encryption. Keep credential controls independent of the Finance visibility setting and other Settings saves. Choose the layout and presentation using existing app components/tokens; Product prescribes behavior, not visual arrangement.

Suggested meaning, subject to Designer language review:

- EN: “Change Finance PIN”; “Current PIN”; “New PIN”; “Confirm new PIN”; “PIN changed. Unlock Finance with your new PIN.”
- FA: «تغییر رمز بخش مالی»؛ «رمز فعلی»؛ «رمز جدید»؛ «تکرار رمز جدید»؛ «رمز تغییر کرد. بخش مالی را با رمز جدید باز کنید.»
- EN boundary: “This PIN locks Finance screens; it does not encrypt your data. There is no in-app recovery if you forget it. JSON backup and restore also require your PIN. Backups do not include the PIN.”
- FA boundary: «این رمز صفحه‌های بخش مالی را قفل می‌کند؛ داده‌های شما را رمزگذاری نمی‌کند. اگر آن را فراموش کنید، بازیابی رمز در برنامه وجود ندارد. تهیه و بازیابی پشتیبان JSON هم به رمز شما نیاز دارد. فایل پشتیبان شامل رمز نیست.»

## Implementation handoff and remaining gates

- Accepted Product scope: local-only current/new/confirm, 4–12 digits with cross-script normalization and leading zeroes, exact absent-key legacy compatibility, single-key salted verifier, immediate relock, JSON exclusion/destination-PIN continuity, and no forgotten-PIN reset.
- Security source constraints are accepted. Security must independently review the implemented derivation parameters, serialization/version validation, atomic write failures/concurrency and stale-work revocation. These are bounded engineering choices, not missing product scope.
- Designer owns placement, feedback, focus/keyboard/Back behavior and bilingual studio states; the ready handoff is recorded in [design/2026-10-13-finance-pin.md](2026-10-13-finance-pin.md).
- **Needs confirmation:** actual OS/OEM migration and native lifecycle/upgrade/TalkBack results remain unobserved; retain explicit follow-ups. No user-research claim establishes the preferred PIN length or placement.
- Adding recovery or decoupling full backup authorization requires separate supported scope; neither blocks the accepted explicit boundary for this cycle.
- Ready for implementation: **Yes** — Product scope and lead acceptance are recorded; the [Designer handoff](2026-10-13-finance-pin.md) is ready. Independent implementation Security/QA review remains a completion gate.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product/implementation evidence | STATUS, PRODUCT, PIN task, frontend AGENTS and narrow stores/components at revision above | Source facts recorded |
| Personal-systems consultation | Lead-delivered read-only report, 2026-10-13 | Incorporated |
| Independent Security source consultation | Read-only report delivered 2026-10-13 | Constraints incorporated; final implementation review still required |
| Designer editable bilingual handoff | [Ready handoff](2026-10-13-finance-pin.md), [editable studio stories](studio/src/stories/FinancePin.stories.tsx), and [captured states](evidence/2026-10-13-finance-pin/) | Accepted by Designer and lead; ready for implementation |
| Automated/browser/native validation | No implementation in this Product task | Not run |
