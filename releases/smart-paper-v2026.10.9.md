# Smart Paper Release: smart-paper-v2026.10.9

Date: 2026-10-09

## Scope

- Maintainer-requested stable release to exercise frontend CI, local stable signing and tag-driven GitHub publication.
- Android version increases to code26 / 2026.10.9. Application behavior remains that shipped in 2026.10.8; no features, persistence changes or data migrations are introduced.
- Hosted verification APKs remain a separate debug testing channel. The stable release is freshly built locally with the existing signing identity; no signing secrets moved to GitHub.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.9` |
| Frontend | `fada7d8288a0bf595f97fd92ed3e5d43a978e311` |
| Backend | `68c789b` unchanged |
| Team | Release commit containing this record and APK; resolve the annotated tag |
| Android | versionCode26; versionName `2026.10.9`; stable app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.9-release.apk` |
| SHA-256 / size | `5cc4ea722748a505ca39a4e37ed2bb4059003d3cab9e3d39e5cd122b69688d94` / 4,415,512 bytes |
| Certificate SHA-256 | Stable `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Verification

| Check | Result |
| --- | --- |
| Hosted frontend CI | [Run 37897954237](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37897954237) passed lint, TypeScript, all57 tests, local-data build, sync, Android verification assembly/verification and artifact upload on the exact frontend revision |
| Stable local build | Documented Docker build/sync/assembleRelease passed; signing stayed local |
| Stable APK identity | Correct app ID/label, code26/name2026.10.9, non-debuggable, one valid signer matching stable certificate |
| Packaged output | All136 exported files byte-match APK assets; two extra Cordova shims are zero-byte |
| Independent Security review | Version-only diff, candidate checksum/size and packaged files accepted; no blockers |
| Existing product/backend QA | Unchanged source: previous bilingual/report QA and backend33-test/no-migration evidence reused; no claim of new physical-device checks |
| Install advisories | npm ci reported21 (1 low,4 moderate,14 high,2 critical); locks unchanged; no clean audit claim |

## Publication

The existing team tag publisher uploads this committed APK without rebuilding it. Publication and public download verification are recorded in the [release check task](../tasks/2026-10-09-release-pipeline-check.md) and current STATUS after closeout.

## Follow-Ups

- Physical Android upgrade/data retention, backup/restore, clipboard/chooser/recipient behavior and TalkBack remain unverified; use the stable APK to run maintainer phone checks.
- Stable remote signing/publication automation remains a later reviewed stage. Current CI artifacts use a separate verification identity and cannot update the stable app.
