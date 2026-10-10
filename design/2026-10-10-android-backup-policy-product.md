# Product: Explicit Android backup policy

Status: accepted scope; ready for implementation
Updated: 2026-10-10
Owning repository: `smart-paper-front/`
Designer handoff: [Android backup recovery disclosure](2026-10-10-android-backup-policy.md)

## Problem and evidence

Users need to preserve their local plans, ideas and finance when changing phones without unknowingly making sensitive data eligible for Android cloud backup. [Privacy review](../docs/privacy-local-data-review.md) found `allowBackup=true` with no explicit extraction rules; actual WebView backup inclusion remains unverified. Saved records and the persisted Finance unlock deadline use WebView localStorage. JSON export/import already provides an independent plaintext recovery path; drafts and some device preferences are outside that JSON contract.

The maintainer selected cloud exclusion with device-to-device transfer permitted where supported. Lead accepts Finance relocking on full WebView reload/relaunch as the smallest reliable way to prevent restored storage carrying unlock authorization. This is an intentional behavior change; normal navigation and resume within the same runtime retain the existing one-hour maximum.

## Outcome and constraints

Make cloud exclusion explicit, preserve supported device migration and existing manual recovery, and start every restored or restarted runtime with Finance locked. Success signals are packaged policy matching the selected rules, saved-record preservation, rejection of legacy persisted unlock state, and clear EN/FA recovery disclosure.

Implement the Security-confirmed compatibility policy: API 24–27 exclude OS backup; API 28–30 permit legacy backup only with the device-to-device transfer flag; API 31+ explicitly exclude cloud and permit device transfer. Record these as configured intentions, not universal OEM guarantees. Keep the app offline-capable and backend behavior unchanged. Runtime Finance authorization stays in module memory, initialized locked; never trust the legacy localStorage unlock key.

## Options and decision

| Option | User value | Risk and size |
| --- | --- | --- |
| Exclude cloud, permit supported device transfer | Balances privacy and phone migration | Selected; medium effort, needs runtime unlock isolation and device evidence |
| Exclude both | Stronger configured exclusion | Smaller configuration scope, greater dependence on external JSON copies |
| Permit both explicitly | More automatic recovery | Cloud privacy tradeoff conflicts with selected direction; medium effort |

## Acceptance criteria

- Applicable legacy/current XML rules and compiled manifest explicitly implement the selected policy; independent Security review verifies the candidate APK.
- Backup policy changes do not delete saved Planner, templates, Ideas or Finance records, alter JSON Merge/Replace semantics, or change JSON exclusions.
- Finance initializes locked on full reload/relaunch and restored runtime even when storage contains a future legacy unlock deadline. Successful unlock lasts at most one hour in the current runtime; ordinary navigation/resume retains only a still-valid runtime unlock. Existing expiry clearing and stale-response protections remain effective.
- Export shows the ready Designer's local-only EN/FA policy paragraph; the existing Finance PIN notice explains restart/reload relocking. Both preserve existing no-encryption warnings and wrap in light/dark phone layouts. No Settings changes.
- Targeted automated checks cover runtime initialization, legacy-deadline rejection, valid unlock, expiry and saved-record preservation. Relevant frontend checks, bilingual implementation QA and independent review pass with no unresolved critical/high findings.
- Publish a validated stable APK through the existing exact-source/signing/provenance process and update task/status/release memory.
- Keep synthetic-device tests for upgrade retention, actual cloud exclusion/device transfer, JSON recovery and restored Finance locking in the existing [phone data-safety task](../tasks/2026-10-08-android-data-safety-validation.md). Record Android/OEM/build versions and distinguish configured policy from demonstrated behavior.

## Non-goals and remaining evidence

No encryption, sync, servers, new backup controls, Settings panel, notification changes or broad storage refactoring. Native cloud/migration behavior, OEM compliance and actual WebView inclusion are unverified. Device availability and migration test setup are Needs confirmation; they remain documented follow-ups under existing release policy, not evidence of successful recovery. No product-policy question remains open.
