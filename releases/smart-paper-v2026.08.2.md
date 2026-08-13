# Smart Paper Release: smart-paper-v2026.08.2

Date: 2026-08-13

## Scope

- Stable Android release signing workflow.
- Android local-data release APK for phone installs and future updates.
- Android version bump for the stable-signed release line.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.2` | Tagged release commit | Release memory and signed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.2` | `f75cff0` | Unchanged from previous release |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.2` | `2a631ae` | Stable release signing and Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android package | `com.aliarefi.smartpaper` |
| Android versionCode | `3` |
| Android versionName | `2026.08.2` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.2-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.2-release.apk` |
| APK SHA-256 | `41ecbbf5ef88d41814f873e2818eafabacb47bdaea9c60852013639c986b7649` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Android local-data sync | Docker: `npx cap sync android` | Passed |
| Android signed release build | Docker: `scripts/build-android-release-docker.sh` | Passed |
| Android signature verification | Docker: `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed |

## Release Notes

- Added local release signing support through ignored `android/keystore.properties`.
- Added `android/keystore.properties.example` so future machines can configure signing without committing secrets.
- Added `scripts/build-android-release-docker.sh` to build signed local-data Android releases in Docker.
- Bumped Android version metadata to `versionCode 3` and `versionName 2026.08.2`.
- Stored the stable-signed Android release APK in the team repository release artifacts.

## Install Note

- If the phone currently has Smart Paper installed with a different signing key, Android will still require one uninstall before this stable-signed release can be installed.
- After installing this stable-signed APK, future APKs signed with the same local keystore can update normally.

## Known Follow-Ups

- Back up `smart-paper-front/android/smart-paper-release.jks` and `smart-paper-front/android/keystore.properties` somewhere private; losing this key prevents update-compatible APKs.
- Consider moving APK binaries to GitHub Release assets or Git LFS if release artifacts grow large.
