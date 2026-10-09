# Smart Paper Release: smart-paper-v2026.10.9

Date: 2026-10-09
Status: Published; public APK download matches the committed stable artifact.

## Scope

- Maintainer-requested stable release to exercise frontend CI, local stable signing and tag-driven GitHub publication.
- Android version increases to code 26 / 2026.10.9. Application behavior remains that shipped in 2026.10.8; no features, persistence changes or data migrations are introduced.
- Hosted verification APKs remain a separate debug testing channel. The stable release is freshly built locally with the existing signing identity; no signing secrets moved to GitHub.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.9` |
| Frontend | `fada7d8288a0bf595f97fd92ed3e5d43a978e311` |
| Backend | `68c789b` unchanged |
| Team | `951f0c7` tagged release commit |
| Android | versionCode 26; versionName `2026.10.9`; stable app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.9-release.apk` |
| SHA-256 / size | `5cc4ea722748a505ca39a4e37ed2bb4059003d3cab9e3d39e5cd122b69688d94` / 4,415,512 bytes |
| Certificate SHA-256 | Stable `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Verification

| Check | Result |
| --- | --- |
| Hosted frontend CI | [Run 37897954237](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37897954237) passed lint, TypeScript, all 57 tests, local-data build, sync, Android verification assembly/verification and artifact upload on the exact frontend revision |
| Stable local build | Documented Docker build/sync/assembleRelease passed; signing stayed local |
| Stable APK identity | Correct app ID/label, code 26/name 2026.10.9, non-debuggable, one valid signer matching stable certificate |
| Packaged output | All 136 exported files byte-match APK assets; two extra Cordova shims are zero-byte |
| Independent Security review | Version-only diff, candidate checksum/size and packaged files accepted; no blockers |
| Existing product/backend QA | Unchanged source: previous bilingual/report QA and backend 33-test/no-migration evidence reused; no claim of new physical-device checks |
| Install advisories | npm ci reported 21 (1 low, 4 moderate, 14 high, 2 critical); locks unchanged; no clean audit claim |

## Publication

[GitHub release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.9) was published by [publisher run 37899216492](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37899216492). The anonymous public release/asset pages were available, and the downloaded APK matched the committed file: 4,415,512 bytes and SHA256 `5cc4ea722748a505ca39a4e37ed2bb4059003d3cab9e3d39e5cd122b69688d94`. An initial API 404 during publication was superseded by public-page and actual-download verification. The publisher uploaded the committed APK without rebuilding it. See the [release check task](../tasks/2026-10-09-release-pipeline-check.md).

## Follow-Ups

- Physical Android upgrade/data retention, backup/restore, clipboard/chooser/recipient behavior and TalkBack remain unverified; use the stable APK to run maintainer phone checks.
- Stable remote signing/publication automation remains a later reviewed stage. Current CI artifacts use a separate verification identity and cannot update the stable app.
