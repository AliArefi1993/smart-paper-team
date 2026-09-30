# Smart Paper Release: smart-paper-v2026.09.4

Date: 2026-09-30

Status: released at the maintainer's direction. Physical-phone retest remains open.

## Scope

- Prevent horizontal page scrolling into blank space on the Android planner while retaining the week and day rails' own scrolling.
- Give the language selector a full mobile header row and keep header links inside their cells in English and Persian.
- Keep the mobile save bar inside the visible viewport at narrow phone widths.
- Make the signed Android build use the same Debian-based Node environment as validation, with a clean dependency install before building.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.4` | This release commit | Record, APK, docs, frontend pointer |
| backend `smart-paper/` | `smart-paper-v2026.09.4` | `68c789b` | No backend change |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.4` | `1dbd41f` | Mobile layout and build-script fix |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 13 |
| Android versionName | `2026.09.4` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.4-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.4-release.apk` |
| APK SHA-256 | `cd6cb6f1b02f78e1c2c085ea8a9c43f803414b9f79941f2cd6102ec3a29ecdf5` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Frontend lint, type, tests, build | Docker `npm ci`, lint, `tsc --noEmit`, 13 tests, local-data build | Passed |
| Final frontend build | Docker lint, type, local-data build after final header adjustment | Passed |
| Mobile browser acceptance | Built app at 320px and 360px in English/Persian | Passed; no overlapping language control, save bar visible, no document-level horizontal movement |
| Signed Android build | `scripts/build-android-release-docker.sh` | Passed with clean Node dependency install |
| APK signature and version | `apksigner verify --print-certs` and `aapt dump badging` | Passed; existing certificate, versionCode 13, versionName 2026.09.4 |
| Physical-phone retest | Install over 2026.09.3 and inspect both languages | Not run in workspace; no connected phone |

## Release Notes

- The planner opens within the phone screen rather than allowing sideways movement into a blank area.
- The language selector and navigation controls no longer overlap on small screens.
- The mobile save bar remains reachable at the bottom of the viewport.

## Known Follow-Ups

- Recheck the opening screen, sideways swipe, header controls, and save bar on the maintainer's phone in both English and Persian after installing this APK over 2026.09.3.
