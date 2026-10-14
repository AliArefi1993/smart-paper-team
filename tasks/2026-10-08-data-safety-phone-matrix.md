# Android data-safety execution matrix

Status: prepared; physical-device execution pending
Updated: 2026-10-14
Owner: [Android data-safety validation](2026-10-08-android-data-safety-validation.md)

Use synthetic records on a spare device. Keep an externally readable JSON backup before upgrade or interruption experiments; never uninstall the sole installation holding personal records. All rows below are **not run on a phone**.

## Record before execution

Record device model/Android/WebView version, installed and candidate APK versionCode/versionName, frontend revision, certificate SHA-256, APK checksum, backup filename/checksum and fixture values. Current published baseline is Android 2026.10.26 / code 43 / frontend `aa33f7942364185b5421fbdc65ed5944f539eda2`, app ID `com.aliarefi.smartpaper`, APK SHA-256 `201edcc40e57ce174ae21aad8fa3a06b3d372fe720bce33fc075479ef7db55d7`, stable certificate SHA-256 `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` ([release record](../releases/smart-paper-v2026.10.26.md)). This is the published reference version, not an observation that it is installed on the phone. A separate verification APK was prepared from exact-source CI 38334342301 at `/private/tmp/smart-paper-phone-qa-2026-10-13`: frontend `4a6736df8d98770ab608334583d1ba8a5ac1403d`, versionName `2026.10.21-verification`, package `com.aliarefi.smartpaper.verification`, SHA-256 `7bfac87ce19a280e7cdbea56f3e7a25be0aa9b5b1cbc8827f001244631ef8cca`. It was not installed; its distinct package ID cannot verify upgrade of the stable app. Treat it as preflight only. Use a verified higher-version stable-package candidate for an upgrade; do not modify personal records to test.

## Synthetic fixture

- One week beginning 2026-10-03: English and Persian goal/day notes, section activity and an exact-time event.
- Two distinct templates A/B; an incoming backup with updated B and new C; an incoming backup with an empty template list.
- Custom planner section labels and active/hidden slots, including a hidden slot with saved content.
- A finance goal and two income entries with distinct notes/dates.
- One saved idea and one branch; one unfinished draft with whitespace and known edit/branch origin.
- Device preferences: language, theme, reminder preference and timer state, recorded separately.

## Backup scope

The local export adapter includes weeks, planner sections, week templates, saved idea notes and finance. Language/theme/reminder preferences, timer state, finance unlock state and unfinished idea drafts are outside that backup payload; do not expect JSON restore to reproduce them. Upgrade retention and unfinished-draft recovery are separate tests. Schema-4 replace has no idea collection and clears saved ideas under current semantics; schema-4 merge preserves them.

## Execution

| Case | Expected observation | Evidence to record |
| --- | --- | --- |
| Export outside app | JSON readable at external destination; fixture records present; drafts absent | Filename/checksum and counts, no personal content |
| Same-certificate higher-code upgrade | Saved fixture records and device preferences persist; draft recovery checked separately | Before/after values, APK identity, restart behavior |
| Restore on clean spare installation | Included records match JSON; omitted device preferences are not promised | Collection/value comparison and exclusions |
| Merge empty/omitted templates | A/B retained | Template IDs/names after import |
| Merge B/C | A retained, B updated by ID, C added | IDs and full B content |
| Replace B/C; replace empty | Exact incoming template collection, no A; empty clears | Resulting IDs/counts |
| Cancel Replace | Every primary collection unchanged | Before/after snapshot |
| Invalid/future backup | Error before writes; every primary collection unchanged | Error and before/after snapshot |
| Schema-4 merge/replace | Legacy fields accepted; absent collections follow documented mode semantics | Fixture comparison, saved ideas checked explicitly |
| Suspension/restart after saved edits | Acknowledged saved content remains | Save result and reopened values |
| Draft recovery | New/edit/branch context and exact writing recover when device storage works | Context/whitespace comparison |
| Controlled write failure | No false success; rollback attempts restore primary keys; incomplete restoration reported if rollback fails | Error, per-collection inspection, recovery result |
| Termination during import | Record actual partial/full outcome; no crash-atomicity promise | Last visible feedback and all reopened collections |

Low-storage and termination tests belong only on a disposable environment with external backup. Helper fault injection is automated evidence, not a substitute for WebView/device tests. If recovery is needed, retain the original external file, verify its contents, then use explicit Replace on the test installation and compare every included collection. If writes still fail, free storage or use another test installation before retrying; preserve the backup.

## Current local evidence

On 2026-10-08 the frontend passed Docker lint, TypeScript and all 52 tests; the default-Merge template-loss bug is fixed and validated for [template merge safety](2026-10-08-template-merge-safety.md). On 2026-10-13 a Samsung A15 running Android 16 was available. Its USB cable did not charge it; Mac SPUSBHost inventory showed only buses and no attached device. The Mac was using the phone hotspot; no alternate Wi-Fi was reported. The published 2026.10.21/code 38 APK was the reference at that preparation; the current reference above is now 2026.10.26/code43. No app was installed during the preparation and no native or physical-device QA has run. The separate verification APK listed above was prepared only as a preflight artifact and cannot be used to establish stable-package upgrade behavior. No physical upgrade, restore, low-storage, lifecycle or process-termination result is claimed.
