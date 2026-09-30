# Smart Paper Release: smart-paper-v2026.10.1

Date: 2026-10-01

Status: released at maintainer direction with physical-phone acceptance outstanding.

## Scope

- Add Idea Space as a separate, bilingual Android local-data notes area with no required title or category.
- Offer optional writing sparks, a daily return of an older thought, branching, editing, and search.
- Include saved ideas in schema 5 JSON backups; accept older backups with defined merge and replace behavior.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | This release record and APK commit | `smart-paper-v2026.10.1` |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.10.1` |
| frontend `smart-paper-front/` | `8411e08` | `smart-paper-v2026.10.1` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 18 |
| Android versionName | `2026.10.1` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.1-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.1-release.apk` |
| APK SHA-256 | `f93bafba2dd2d634f93a7b53504da50b48b228f2ad7f6bfafdd747ee055e3f95` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Size | 4,380,636 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend tests and migrations | Passed; 33 tests, no migration changes; backend source unchanged |
| Frontend lint, TypeScript, tests, local build | Passed in Docker; 23 tests, static `/ideas` route generated |
| Idea Space browser check | Capture, daily return, and Persian layout checked locally before release; no Android device check |
| Signed Android build | Passed with `scripts/build-android-release-docker.sh` |
| APK signature and version | Passed; stable certificate, code 18, name 2026.10.1 |
| Physical-phone acceptance | Not run before release; maintainer requested publication without an available device |

## Release Notes

- Write freely in Idea Space, use an optional prompt when you want a starting point, and grow a new thought from an older one.
- Find and edit saved thoughts without filing them into categories. JSON backups now include Idea Space notes.

## Known Follow-Ups

- Test install and upgrade over `2026.09.8` on a physical Android phone, confirming existing planner and finance data remains.
- Test notes capture, editing, branching, search, keyboard behavior, bilingual layout, offline persistence, and restore from schema 4 and 5 backups on the phone.
- Check native share, notifications, and other outstanding Android acceptance listed in `ROADMAP.md`.
- Existing dependency advisories remain under review; this release did not change dependencies.
