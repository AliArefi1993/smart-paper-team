# Design: Local problem reporting — Product brief

Status: brief; ready for Designer, not frontend implementation
Updated: 2026-10-13
Owning frontend: Android/local-data mode; reporting entry, Settings and selected error states
Local studio story links: Designer to supply bilingual editable stories
Design type: proposed change
Related task: [Local problem reporting](../tasks/2026-10-07-local-feedback-diagnostics.md)

## Problem and evidence

Users need to explain an Android failure with enough context to reproduce it while keeping personal writing and Finance content on their phone. The maintainer requested easy problem reporting and optional local error/usage evidence; reporting preparation must work offline with no server. This is user direction, not evidence of measured report volume or adoption.

Current implementation already shares a file using the Android chooser through [file-share.ts](../smart-paper-front/src/lib/file-share.ts). [Settings](../smart-paper-front/src/components/settings-view.tsx) has existing preferences and error states. [local-store.ts](../smart-paper-front/src/lib/local-store.ts) writes primary records to browser storage and can fail while reading/writing. The application route inventory contains no `error.tsx`/`global-error.tsx`; [MainActivity](../smart-paper-front/android/app/src/main/java/com/aliarefi/smartpaper/MainActivity.java) only extends `BridgeActivity`, and the manifest of frontend packages contains no crash SDK. These establish existing paths and gaps, not runtime crash coverage. Diagnostics/reporting is not shipped.

[Clarity evaluation](../docs/clarity-evaluation.md) rejects automatic hosted capture/upload. Voluntary reviewed sharing remains authorized. Useful reproduction from coarse context is **Needs confirmation** until independent QA reviews synthetic reports; do not imply reports represent all users.

## Outcome and scope

One bounded Android cycle gives the user a discoverable Report a problem entry, a description, an exact preview and deliberate sharing. Users can report with both recording switches off. No destination, contact address or account is needed: the user chooses a compatible installed app and recipient, including an email app when available. Email/network delivery depends on the receiving app, not offline report preparation. The [Capacitor Share API](https://capacitorjs.com/docs/apis/share) supports installed sharing apps and an email subject; it does not establish recipient delivery.

Two independent persistent choices start **OFF**, including existing installations: **Record errors on this device** and **Count feature use on this device**. Explain each separately; enabling one never enables the other. Turning a switch off immediately stops its collection without deleting existing inspectable records; provide explicit deletion. Failure to read/validate/persist a choice fails closed and is explained. No retroactive capture.

Users can inspect recorded errors and usage counts, clear either category or both, and choose independently whether each category enters the preview. Inclusion starts unchecked for each new report. The description is voluntary user-entered content, only in the report composer; it is never a diagnostic event or persisted draft. Show that anything typed may be disclosed to the chosen recipient. Closing/discarding the composer clears its description without altering primary records.

## Allowlisted evidence contract

Unknown fields, routes, actions and codes are dropped at the recording boundary. Reconstruct approved fields rather than sanitizing an arbitrary object. A raw exception is never stored, stringified or used as report text.

| Category | Allowed fields and values | Boundary |
| --- | --- | --- |
| Report technical header | schema version, packaged app version/build if trustworthy, platform enum `android`/`web`, data mode `local`, UI language `en`/`fa` | Report preparation only; unknown version is shown as unavailable. No new device plugin needed. |
| Recorded error | coarse calendar day for age/inspection; static route enum `planner`, `ideas`, `timer`, `finance`, `summaries`, `export`, `settings`, `unknown`; action enum `load`, `save`, `import`, `export`, `share`, `runtime`; allowlisted code below | No pathname/query/hash, record ID, title, source URL, filename, stack, raw message, rejection reason or exact tap sequence. |
| Usage | daily aggregate counts by static feature route; aggregate flow outcomes for `save`, `import`, `export`, `share`: `completed`, `failed`, `cancelled`, `chooser-returned` when actually observable | No per-action event history, durations, time-of-day, screen content, Finance amount/PIN events, custom labels or identifier. Cap numeric counts; no delivery claim from chooser return. |

Initial error codes: `LOCAL_READ_FAILED`, `LOCAL_SAVE_FAILED`, `IMPORT_FAILED`, `EXPORT_FAILED`, `SHARE_FAILED`, `JS_RUNTIME_ERROR`, `JS_UNHANDLED_REJECTION`. Emit codes only at known operation boundaries; generic runtime listeners record a generic code and allowlisted route, without reading error/reason/message/stack payloads. Known file-plugin promise failures are JS-visible operation failures, not native crash reports. Do not instrument every field, tap or keystroke. The two controls govern their own categories independently, including failed-flow counts.

Never automatically collect Planner/Ideas prose, Finance data, PINs, credential values, clipboard/import/export/report contents, screenshots/replay, raw state, account/device/session identifiers, model/manufacturer, IP/network metadata, user agent or OS details. App version and platform provide this cycle's technical version context; device/OS version collection is deliberately excluded to keep the report smaller and avoid a new plugin. Primary backups/AI reports must not incorporate diagnostic records or the report description.

## Storage and failure limits

Use a separate diagnostic store that never rewrites primary records. Proposed starting limit is **128 KiB serialized UTF-8 across both categories, at most 200 error records, and 14 calendar days**; this tightens the earlier 2 MB proposal because fields are small and primary browser-storage capacity matters. Validate these defaults under synthetic high-volume/quota tests before implementation acceptance; lowering a limit with evidence needs no new product question. Oldest records/day buckets expire first. Enforce bounds on load, append, inspection and report preparation; expired content cannot be included. Expiry runs when the app accesses the store, not by a promised background daemon. Cap report description at 4,000 characters with visible feedback; never silently truncate the user's writing.

Diagnostic I/O is best-effort, isolated and bounded. Run recording after the primary operation's result; diagnostic exceptions never change success/failure, mask the original user-facing failure, trigger recursive logs, modify primary records or block saving. On quota pressure, shed diagnostic records rather than evicting user data. Inspection/deletion/storage failures show a recoverable message; do not claim deletion or persistent recording succeeded without evidence. Error recording is necessarily incomplete when storage is unavailable.

The report preview is a fixed snapshot. Newly recorded events do not silently change what gets shared; refreshing or changing inclusion/description requires a new review. A temporary chooser file may contain the user's description: keep it out of backups, bound it to the report size, and remove stale report cache files on subsequent report preparation/startup. Native lifecycle cleanup must preserve the receiving app's handoff; do not delete prematurely or claim instantaneous external deletion.

## Capture feasibility and limits

JavaScript runtime listeners plus explicit app operation failures can provide best-effort codes after opt-in. Rendering failures may need a safe error entry/containment path; Designer reviews relevant error-state access before any frontend changes. No listener is evidence of complete coverage.

Native coverage is a separate investigated boundary: the repository has no native capture integration, and the [official Capacitor plugin catalogue](https://capacitorjs.com/docs/apis) does not list a crash-recorder API. This is a bounded source review, not proof that native capture is impossible. This cycle adds **no native crash SDK/handler**; sudden native crashes, process termination, startup failure or blocked WebView may leave no record and make reporting temporarily unavailable. Copy must say “local errors” with those limitations, never “all crashes recorded.” Native capture requires a separately reviewed feasibility scope if later evidence warrants it; this satisfies the existing task's investigation/limitations criterion without a false promise.

## Alternatives

| Option | User value | Risk | Size / decision |
| --- | --- | --- | --- |
| Description and chooser only | Easy offline reporting | No optional stored evidence; misses explicit backlog criteria | Small; insufficient alone |
| Description + two opt-in local categories | Reproduction context with user control | Incomplete capture and storage pressure; addressed by strict schema and bounds | Medium, one cycle; selected |
| Native crash SDK or hosted telemetry | Potential broader capture | Additional privacy/lifecycle/compatibility work; hosted transfer violates current scope | Larger; out of scope |

## Acceptance criteria and success signals

1. Report a problem is discoverable without enabling either recorder, including a Designer-selected path from relevant recoverable error states. A primary-data read failure does not prevent the composer opening.
2. Fresh/existing installs collect nothing with both switches off. Independent toggling, failed preference persistence, restart, disabling and deletion behave as described; no silent opt-in.
3. The user prepares a description and readable exact preview offline, inspects records and independently includes/excludes either category. Personal-content canaries and unknown metadata never enter automatic collection.
4. Share opens the chooser only after deliberate action. A compatible installed email app can receive the report; no email address is prefilled. Cancel/discard sends nothing from Smart Paper and preserves primary data. Chooser return is described as a handoff, never delivered/sent. Sharing failure retains the current composer for retry.
5. Store byte/count/age limits, malformed-store handling and quota failures are tested. Primary save outcomes/records remain unchanged when every diagnostic operation fails; no logging recursion.
6. Preview includes app/build/platform/language and clear capture/retention limitations; absent error records are not evidence of no failures. Error and usage deletion leave the other category and primary records intact.
7. Designer supplies English/Persian studio stories and handoff for empty/populated, switches, inspection/deletion, report preview, failed recording/sharing, cancellation, offline and recoverable primary failure. Validate RTL, keyboard, focus, font scaling, screen-reader labels and contrast without prescribing a layout here.
8. Focused automated tests and independent QA/Security review establish allowlisting, failure isolation, consent, deletion/expiry and exact-preview transfer. Native sharing, keyboard and TalkBack require honest observed evidence/follow-up. Complete existing authorized Android release gates when implemented.

Success is a synthetic report that independent QA can understand and use to reproduce a covered failure without personal automatic content, while disabling/clearing diagnostics and forcing diagnostics failure leave primary workflows intact. No numeric adoption target is invented.

## Designer handoff

Product scope is ready for Designer. Designer owns placement, interaction hierarchy and bilingual copy using existing studio/tokens, including access after a recoverable error and an explanation of the user's recipient choice. No support contact decision blocks this scope. No personal-systems consultation applies: this is technical reporting, not a routine connecting Planner/Timer/Finance/Ideas.

Frontend implementation waits for the adopted manual baseline checkpoint and a separately ready Designer handoff. Storage defaults and native recipient behavior require validation, not a new user permission question. No unresolved product decision requires clarification today.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product scope | Existing task, current STATUS, narrow product/source reads and Clarity decision | Ready for Designer |
| API applicability | Official Capacitor v8 Share docs and plugin catalogue, 2026-10-13 | Chooser fits; full native crash coverage unestablished |
| Studio/current UI review | Designer work pending | Not performed by Product |
| App/runtime tests | Planning only | Not run |
