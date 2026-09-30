# Smart Paper Release: smart-paper-v2026.09.7

Date: 2026-09-30

Status: released at maintainer direction with physical-phone acceptance outstanding.

## Scope

- Save the selected Markdown AI report when a browser advertises file sharing but denies the share dialog at runtime.
- Add a regression test for that fallback. Native Android sharing remains unchanged.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | This release record and APK commit | `smart-paper-v2026.09.7` |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.09.7` |
| frontend `smart-paper-front/` | `75a0275` | `smart-paper-v2026.09.7` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 16 |
| Android versionName | `2026.09.7` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.7-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.7-release.apk` |
| APK SHA-256 | `6853bd4a7032018953be9de9a8a383ec481850f5d0a0223b3278251f2af51668` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Size | 4,353,071 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend tests and migrations | Passed for `.6` and backend source unchanged; 33 tests, no migration changes |
| Frontend lint, TypeScript, tests, local build | Passed in Docker; 19 tests |
| Signed Android build | Passed with `scripts/build-android-release-docker.sh` |
| APK signature and version | Passed; stable certificate, code 16, name 2026.09.7 |
| Local browser QA | Selected report fields and dates, finance opt-in, Persian UI, JSON backup, and denied share fallback checked; details in `tasks/2026-09-30-ai-report-release.md` |
| Physical-phone acceptance | Not run before release; maintainer directed publication first |

## Release Notes

- If a browser blocks its sharing dialog, Smart Paper downloads the selected AI report so it can be attached manually.

## Known Follow-Ups

- Android install and upgrade, native share chooser, restore through the native picker, offline persistence, notifications, and phone layout still need an Android runtime or physical device.
