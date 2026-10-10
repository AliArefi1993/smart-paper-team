# Android OS backup policy

Selected: 2026-10-10. Implementation and release evidence: [task](../tasks/2026-10-10-android-backup-policy.md).

## Selected policy

Exclude application data from Android cloud backup. Permit supported Android device-to-device migration. External JSON export/import remains the deliberate recovery path on every supported version.

The application uses `allowBackup=true`, `fullBackupContent=@xml/backup_rules` and `dataExtractionRules=@xml/data_extraction_rules`. All-domain rules cover `root`, `file`, `database`, `sharedpref`, `external`, `device_root`, `device_file`, `device_database` and `device_sharedpref`, with `path="."`.

| Android API | Configuration |
| --- | --- |
| 24–27 | Base `res/xml/backup_rules.xml` excludes all nine domains. Cloud and OS transfer are excluded; use JSON recovery. |
| 28–30 | `res/xml-v28/backup_rules.xml` includes all nine domains only with `requireFlags="deviceToDeviceTransfer"`. |
| 31–36 | `data_extraction_rules.xml` excludes all nine cloud-backup domains and explicitly includes all nine device-transfer domains. |

Missing or empty modern sections must not be treated as disabling extraction. `allowBackup=false` cannot express the selected legacy migration policy. Actual transfer depends on Android/OEM behavior; rules do not certify every manufacturer's migration mechanism. Previously created cloud snapshots are not proven deleted by changing these rules. Android 16 QPR2/API 36.1 cross-platform transfer is separate scope; no matching iOS counterpart is declared.

References: [Android Auto Backup rules](https://developer.android.com/identity/data/autobackup), [Android 12 backup changes](https://developer.android.com/about/versions/12/behavior-changes-12#backup-restore).

## Finance authorization

Saved finance records remain in existing storage. The unlock deadline exists only in JavaScript module memory, starts locked, and never trusts the legacy `smart-paper.local.finance-unlocked-until` storage key. Full document/process recreation requires PIN entry again; ordinary navigation retains the running module's one-hour deadline. Existing expiry/resume and read/mutation/export authorization checks remain required.

Copied persisted deadlines cannot authorize a new runtime. This does not encrypt finance or protect against modified app-origin code or device-level access. `sessionStorage` is not a documented Android backup-exclusion boundary. A native install nonce in `getNoBackupFilesDir()` is a future alternative only if restart-persistent authorization is needed; initialization must precede authorization.

References: [Web storage specification](https://html.spec.whatwg.org/multipage/webstorage.html), [Android no-backup directory](https://developer.android.com/reference/android/content/Context#getNoBackupFilesDir()).

## Static acceptance and device follow-up

Independently inspect the actual APK's compiled manifest and resolved XML resources: selected boolean, both resource references, all nine base/v28 rules, modern cloud exclusions/transfer includes, and no overriding backup agent. Verify packaged web assets reject persisted unlock deadlines alongside normal signer/version/source/provenance checks. Regression checks cover restored legacy authorization, new runtime locked state, correct/wrong PIN, expiry, protected reads/mutations/exports and existing JSON recovery.

Static checks establish packaged configuration and bounded application behavior, not actual OS migration. Device tests use synthetic records and disposable devices/accounts only. Record API/OEM/WebView/app versions and transfer mechanism. Cover API 24/27, 28/30, 31 and 36 where available: cloud recovery exclusion, old-version transfer exclusion, supported transfer retaining saved records while requiring fresh Finance unlock, same-signer upgrade retention, expiry/resume and deliberate JSON export/import. Test real two-device migration as well as available framework transport simulations. Do not uninstall/reset the user's installed app to collect evidence.

[Official Android backup testing guidance](https://developer.android.com/identity/data/testingbackup). Actual OS backup/migration and OEM behavior remain unverified until recorded in the task or release.

## Verified packaged configuration

Frontend `d899f2c9d66879bf899e09d3f8945412b6b6967b`, [hosted run 38078437740](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078437740), code 31 / `2026.10.14`: independent Security inspected the actual signed APK with `apksigner` and `aapt`. Manifest backup references resolve to base `res/Qq.xml`, v28 `res/xo.xml` and modern extraction `res/4j.xml`; all nine rules in each applicable section are correct, with no overriding backup agent. Packaged JavaScript initializes authorization at zero, validates a memory deadline and assigns one hour after PIN success; no legacy unlock key occurs in the 32 JavaScript assets. Bounded browser QA confirms continuity through actual in-app links and relocking after full document reload. These are static/application checks, not proof of actual OS migration. See the [task](../tasks/2026-10-10-android-backup-policy.md) for publication and device follow-ups.
