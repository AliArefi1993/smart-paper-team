# Smart Paper Release: smart-paper-v2026.10.15

Date: 2026-10-11

Status: Signed and independently reviewed; unpublished candidate superseded by the coordinated 2026.10.16 release.

## Scope

- Replace generic Android launcher artwork with the approved Smart Paper paper identity across adaptive, round, legacy-density, and themed icons.
- Preserve app ID and stable signing identity for upgrade compatibility.
- Frontend source: `99bd2de7b852801416fbb6b550c30ee1239a968f`; backend unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.15` | Pending final release commit |  |
| backend `smart-paper/` | `smart-paper-v2026.10.15` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged from 2026.10.14. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.15` | `99bd2de7b852801416fbb6b550c30ee1239a968f` | Launcher resources and Android version only. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 32 |
| Android versionName | `2026.10.15` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.15-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.15-release.apk` |
| APK SHA-256 / size | `a04e4aa3e9dee2d22dd9e51db80a471e9e8e402af599f06f713091e6d8576320` / 4,391,350 bytes |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.15-provenance.json` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend CI | [Run 38164641840](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164641840) passed on the exact frontend source. |
| Protected hosted build | [Run 38164657390](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164657390) passed unsigned candidate validation and protected stable signing for the exact source. |
| Candidate artifact | ID `11711519062`; archive SHA-256 `ed6d67291f7e01c21f0dd548e5990d83bd4323fe5649ad5098a0584d25c3f82e`; original ZIP downloaded and independently rehashed to match GitHub metadata. |
| Final artifact | ID `11712351079`; archive SHA-256 `0f7394c986b9903d395d87ba6e7c3f54d5455a4b4fb0811287581703e8d42177`; original ZIP downloaded and independently rehashed to match GitHub metadata. |
| APK verification | `SHA256SUMS` passed. Independent `apksigner` verification accepted v2/v3 signatures and one signer matching the stable certificate. `aapt` confirmed app ID, versionCode 32, versionName `2026.10.15`, and compile SDK 36. |
| Provenance | Matches source/run, version, app ID, local-data mode, candidate artifact ID/archive digest, unsigned and final APK hashes, stable certificate fingerprint, and 137 compared web assets. |
| Independent artifact review | Passed. All 581 shared signed/unsigned payload entries and 137 web assets matched. Compiled v26/v33 adaptive, vector, and monochrome resources plus ten legacy PNGs passed pixel/resource parity checks; existing backup rules were preserved. |

The final APK was copied byte-for-byte from the hosted signed artifact. No local rebuild was used.

## Validation

| Area | Result |
| --- | --- |
| Frontend lint, type check, tests, local-data production build, Android assembly | Exact-source hosted run passed all checks. The test step passed; the exact count was not established from the completed run log. |
| Source review and design | Designer acceptance and independent Security source review passed; no high or critical finding remained. |
| Signed artifact review | Passed independent review. |
| Physical Android installation and upgrade | Unverified; no host-connected Android device/adb was available. |

## Release Notes

- Updated the Android launcher icon to use the Smart Paper paper identity in adaptive, round, legacy-density, and themed icon resources.
- No screen, data, persistence, or backend behavior changed.

## Known Follow-Ups

- Physical OEM mask rendering, themed icon tint, installation, and upgrade/data retention remain unverified.
- This candidate was not published after its owner hit usage limits. Icon changes are included in the coordinated 2026.10.16 release; retain this artifact as build evidence, not a published release.
