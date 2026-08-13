# Smart Paper Release: smart-paper-v2026.08.6

Date: 2026-08-13

## Scope

- Planner safety and mobile day-flow improvement after the `v2026.08.5` main-page redesign.
- Stable-signed Android local-data release APK with a new version number.

## Team Recommendation Used

- Product and QA recommended protecting unsaved planner edits before switching weeks.
- Design recommended a mobile day switcher so Android users can jump between active days without scrolling through all day cards.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.6` | Tagged release commit | Release memory and signed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.6` | `f75cff0` | Unchanged from previous release |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.6` | `56ae6be` | Planner guard, mobile day switcher, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android package | `com.aliarefi.smartpaper` |
| Android versionCode | `7` |
| Android versionName | `2026.08.6` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.6-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.6-release.apk` |
| APK SHA-256 | `df1c25ae77105f80f8035b4cf110422e9ef4bc268925b368b950bbac6c678abc` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend lint | Docker: `npm run lint` | Passed |
| Frontend type check | Docker: `npx tsc --noEmit` | Passed |
| Frontend local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Local web smoke check | Dev server on port `3008`, `curl /` | Passed |
| Android signed release build | Docker: `scripts/build-android-release-docker.sh` | Passed |
| Android signature verification | Docker: `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed |

## Release Notes

- Added an unsaved-changes guard when switching weeks with edits pending.
- Week switching now offers `Save & Switch`, `Discard changes`, or `Keep editing`.
- Save failures keep the user on the current week with dirty state intact.
- Browser refresh/close now uses the native unsaved-changes warning when planner edits are pending.
- Planner navigation links ask before leaving with unsaved edits.
- Added a mobile-only active-day switcher above the day cards.
- Added `Save + Next` in the mobile sticky bar for faster day-by-day capture.
- Added English and Persian copy for the new guard and mobile actions.

## Known Follow-Ups

- Run a real Android pass with the keyboard open and verify the modal/day switcher spacing in Persian.
- Consider a later autosave strategy only after the explicit save/discard flow feels reliable.
