# Smart Paper Release: smart-paper-v2026.09.5

Date: 2026-09-30

Status: released for maintainer phone retest. Physical Android acceptance remains unverified.

## Scope

- Keep the Android planner at the page's horizontal origin on launch instead of allowing a blank side area to appear first.
- Center the selected week by scrolling only its row, and contain the week/day rows' horizontal movement.
- Anchor the mobile save bar to the viewport width so both actions remain visible.
- Keep the root document's direction stable while each screen applies its own English/Persian direction.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.5` | This release commit | Record, APK, docs, frontend pointer |
| backend `smart-paper/` | `smart-paper-v2026.09.5` | `68c789b` | No backend change |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.5` | `0e7d5dd` | Planner launch and save-bar position |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 14 |
| Android versionName | `2026.09.5` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.5-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.5-release.apk` |
| APK SHA-256 | `84606657e00e7486feba3a053d34db0097357d0de9e7f16aa83301a285ff99ec` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Frontend lint/type/tests/build | Docker lint, `tsc --noEmit`, `npm test`, local-data build | Passed; 13 tests |
| Built browser, Persian fresh launch | 393px viewport after planner load | Passed; document 393px wide, planner and save bar at x=0 |
| Built browser, English launch/sideways gesture | 393px viewport | Passed; planner and save bar stayed at x=0 |
| Signed Android build | `scripts/build-android-release-docker.sh` | Passed |
| APK signature and version | `apksigner verify --print-certs` and `aapt dump badging` | Passed; existing certificate, versionCode 14, versionName 2026.09.5 |
| Physical Android retest | Open after installing over 2026.09.4 | Not run in workspace; no connected device |

## Release Notes

- The planner now resets the page's horizontal position on launch and keeps week navigation inside the week row.
- The mobile save controls are constrained to the phone viewport.

## Known Follow-Ups

- Install over 2026.09.4 and check the first screen before swiping in Persian and English, then test the week/day rows and save bar. The Android-specific root cause remains a hypothesis until this device retest.
