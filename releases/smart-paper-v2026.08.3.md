# Smart Paper Release: smart-paper-v2026.08.3

Date: 2026-08-13

## Scope

- Android/mobile planner save ergonomics.
- Stable-signed Android local-data release APK.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.3` | Tagged release commit | Release memory and signed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.3` | `f75cff0` | Unchanged from previous release |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.3` | `d91bca7` | Mobile planner save controls and Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android package | `com.aliarefi.smartpaper` |
| Android versionCode | `4` |
| Android versionName | `2026.08.3` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.3-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.3-release.apk` |
| APK SHA-256 | `ce019dfe18a9dd849382fe48c45d67aa2c2e810da543218ea1d5ded1b40a2737` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend lint | Docker: `npm run lint` | Passed |
| Frontend type check | Docker: `npx tsc --noEmit` | Passed |
| Frontend local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Android signed release build | Docker: `scripts/build-android-release-docker.sh` | Passed |
| Android signature verification | Docker: `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed |

## Release Notes

- Added a mobile sticky Save Week action at the bottom of the planner so Android users do not need to scroll back to the top after entering minutes or notes.
- Added local Save Week actions near the weekly goal fields and inside each day card.
- Kept desktop Enter-to-save behavior for hardware keyboards.
- Added numeric keyboard hinting for minute inputs on mobile.
- Bumped Android version metadata to `versionCode 4` and `versionName 2026.08.3`.

## Known Follow-Ups

- Test the sticky Save Week bar on a real Android device with the keyboard open.
- Continue watching dark/focus mode contrast while editing long planner days.
