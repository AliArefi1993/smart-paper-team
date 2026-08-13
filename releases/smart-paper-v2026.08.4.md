# Smart Paper Release: smart-paper-v2026.08.4

Date: 2026-08-13

## Scope

- GitHub Release publishing workflow smoke test.
- Stable-signed Android local-data release APK with a new version number.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.4` | Tagged release commit | Release memory, workflow, and signed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.4` | `f75cff0` | Unchanged from previous release |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.4` | `f9e5034` | Android version bump only |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android package | `com.aliarefi.smartpaper` |
| Android versionCode | `5` |
| Android versionName | `2026.08.4` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.4-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.4-release.apk` |
| APK SHA-256 | `ea5b668aea8e8b45d90d2875681ea3262e5d75330f16ea8eaef24ab13843ef77` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Android local-data sync | Docker: `npx cap sync android` | Passed |
| Android signed release build | Docker: `scripts/build-android-release-docker.sh` | Passed |
| Android signature verification | Docker: `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed |

## Release Notes

- Bumped Android version metadata to `versionCode 5` and `versionName 2026.08.4`.
- Produced a stable-signed release APK to test automatic GitHub Release publishing on tag push.
- No product behavior changed from `smart-paper-v2026.08.3`.

## Known Follow-Ups

- Confirm the `Publish GitHub Release` workflow creates the GitHub Release and uploads the APK asset after the team tag push.
