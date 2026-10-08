# Smart Paper Release: smart-paper-v2026.10.7

Date: 2026-10-08
Status: validated stable-signed Android release.

## Scope

- Preserve saved week templates absent from an imported JSON backup when Merge is selected, including when the backup omits templates or supplies an empty collection.
- Match templates by stable ID: incoming records update matching IDs and add new IDs while unrelated saved templates remain.
- Keep Replace semantics unchanged: only incoming templates remain; omitted or empty templates clear the collection.
- Cover adapter persistence, validation, and storage write/rollback outcomes with regression tests.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.7` |
| Frontend | `036d2c5` |
| Backend | `68c789b` unchanged |
| Team | Release artifact/record/design/docs and frontend pointer commit |
| Android | versionCode 24; versionName `2026.10.7`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.7-release.apk` |
| SHA-256 / size | `8554c574d60b3e8ec7c33d9026d7c8eac0b9a4c033297ce90097377d2ea59a2f` / 4,413,128 bytes |
| Certificate SHA-256 | Stable `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Verification

| Check | Result |
| --- | --- |
| Backend | Unchanged; prior 33-test/no-migration evidence reused |
| Studio | Ready handoff; studio typecheck/build and bounded EN/FA phone/wide outcome review passed with the documented Studio environment limitation |
| Frontend / independent review | Docker lint, TypeScript and all 52 tests passed on final source; independent review found no blocking issues and confirmed Replace retains exact collection behavior |
| Android release build | `scripts/build-android-release-docker.sh` passed: Next production build, Capacitor sync and Gradle `assembleRelease` (`BUILD SUCCESSFUL`); npm install reported 21 advisories (1 low, 4 moderate, 14 high, 2 critical) |
| Signed APK / packaged assets | `apksigner` passed; code24/name2026.10.7 and stable certificate verified. All 136 exported web files byte-match APK assets. The APK also contains two zero-byte Capacitor-generated Cordova bridge shims. |
| Actual Android / TalkBack | Unverified follow-ups; no physical device check is claimed |

The install-time advisory counts are recorded as npm output, not as a clean security audit or as a comparison with another audit scope. Dependency locks were not changed. Gradle emitted SDK, file-watcher, plugin and deprecation warnings but completed successfully.

See [implementation task](../tasks/2026-10-08-template-merge-safety.md), [design handoff](../design/2026-10-08-template-merge-safety.md), and [phone data-safety matrix](../tasks/2026-10-08-data-safety-phone-matrix.md) for scope, evidence and remaining device checks.

## Boundaries And Follow-Ups

- The change affects local-data import behavior. Django import behavior was not changed or revalidated.
- Template IDs are local identities; collisions between independently created installations remain possible.
- Storage rollback tests do not establish process-termination atomicity or real-device durability.
- Physical Android upgrade, backup/restore, interruption and TalkBack checks remain unverified follow-ups.
- npm install reported dependency advisories; no dependency audit remediation was part of this release.
