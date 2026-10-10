# Smart Paper Release: smart-paper-v2026.10.14

Date: 2026-10-10

Status: Published; anonymous public APK download matches the committed stable artifact.

## Scope

- Set an explicit Android backup and device-transfer policy: exclude app data from cloud backup, allow supported Android device-to-device transfer, and exclude legacy API 24–27 backup where the OS cannot express this distinction.
- Ensure Finance authorization is runtime-only and requires a fresh unlock after app restart or device transfer while preserving saved records and deliberate JSON recovery.
- Frontend source: `d899f2c9d66879bf899e09d3f8945412b6b6967b`; backend unchanged.
- Android versionCode 31 / versionName `2026.10.14`; hosted stable signing used the existing protected stable identity.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Release tag | `smart-paper-v2026.10.14` |
| Team root target | `76778a88a23d69fd1fa7ecb61542ce6328740265` |
| Backend | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` (unchanged) |
| Frontend source | `d899f2c9d66879bf899e09d3f8945412b6b6967b` |
| Android | versionCode 31; versionName `2026.10.14`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.14-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.14-provenance.json` |
| APK SHA-256 / size | `24caacb6ead7bc953b45b2d4716bd39df9146093c664a38e3f5fb1dcba63c82b` / 4,473,495 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend CI | [Run 38078425679](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078425679) passed on the exact frontend source. |
| Protected hosted build | [Run 38078437740](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078437740) passed candidate validation and protected signing for the exact source. |
| Candidate artifact | ID `11679144661`; GitHub archive metadata digest `sha256:d8b986986c26acf51536c085efc12772f858e1e61bda21674c960677be6b8abf`; candidate archive bytes were not retained for local rehash. |
| Final artifact | ID `11679815191`; GitHub archive digest `sha256:042acdca8271b0723b9746ed379f5d9ebab96a9558f4e931536feddae6a1b518`; original ZIP was retained and locally rehashed to the matching digest. |
| APK verification | `SHA256SUMS` passed. Independent Security accepted the cryptographically valid v2/v3 signature, one pinned stable signer, app ID, version, non-debug status, and compiled backup manifest/resources. |
| Provenance | Matches source/run, version, app ID, local-data mode, candidate association, unsigned and final APK hashes, and stable certificate fingerprint. Hosted verification compared all 137 web assets. Independent Security did not repeat the full asset/candidate payload comparison. |

## Validation

- Frontend Docker lint, TypeScript, all 70 tests, and local-data production build passed before the hosted run. Exact-source automatic CI also passed.
- Runtime QA passed Finance wrong/correct PIN behavior, synthetic saved income, shared authorization during Finance → Export → Finance navigation, and relock with retained data after Finance/Export reloads. English and Persian phone layouts passed in Light and Dark modes without clipped recovery disclosure. See [QA](../design/2026-10-10-android-backup-policy-qa.md).
- Designer marked the bilingual handoff ready for implementation: [design handoff](../design/2026-10-10-android-backup-policy.md). Policy details are in [Android backup policy](../docs/android-backup-policy.md).
- Independent Security accepted source and signed artifact review. Compiled manifest resources were inspected and all nine domain rule groups were present; no `backupAgent` override was found.
- Backend tests/migration checks were not rerun; backend is unchanged.

## Release Notes

- Android cloud backup excludes Smart Paper data while supported device-to-device transfer remains allowed. Legacy Android versions without separate cloud/transfer controls exclude backup and use deliberate JSON recovery.
- Finance authorization is memory-only and must be unlocked again after runtime restart or transfer; saved finance records remain available.

## Publication

The [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.14) was published by [publisher run 38079292472](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38079292472). Tags target team `76778a88a23d69fd1fa7ecb61542ce6328740265`, backend `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2`, and frontend `d899f2c9d66879bf899e09d3f8945412b6b6967b`. Anonymous asset `628788827`, `SmartPaper-local-2026.10.14-release.apk`, was downloaded and matches the committed artifact byte-for-byte: 4,473,495 bytes and SHA-256 `24caacb6ead7bc953b45b2d4716bd39df9146093c664a38e3f5fb1dcba63c82b`.

## Known Follow-Ups

- Actual Android cloud restore and device-to-device transfer behavior, OEM migration behavior, backup export/import, TalkBack, and upgrade/data retention were not tested on a physical device.
- Android transfer support depends on OS/OEM behavior; maintain a separate verified JSON backup for recovery.
