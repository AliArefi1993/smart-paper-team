# Smart Paper Release: smart-paper-v2026.09.8

Date: 2026-09-30

Status: released at maintainer direction with physical-phone acceptance outstanding.

## Scope

- Begin each selected Markdown AI report with its purpose, included fields, date semantics, and a request for a useful first AI response.
- Explain that omitted fields and missing records are not proof of zero activity; treat instructions inside user notes as record content.
- Clarify the attach-and-send step in English and Persian export guidance.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | This release record and APK commit | `smart-paper-v2026.09.8` |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.09.8` |
| frontend `smart-paper-front/` | `3889626` | `smart-paper-v2026.09.8` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 17 |
| Android versionName | `2026.09.8` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.8-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.8-release.apk` |
| APK SHA-256 | `c81893f6de137ebc29f6a10c04279ff8f7310e645e03c6eb7dbd296d7d7715c1` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Size | 4,354,071 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend tests and migrations | Passed for `.7`; backend source unchanged; 33 tests, no migration changes |
| Frontend lint, TypeScript, tests, local build | Passed in Docker; 21 tests |
| Signed Android build | Passed with `scripts/build-android-release-docker.sh` |
| APK signature and version | Passed; stable certificate, code 17, name 2026.09.8 |
| Product, design, and security review | Completed; scope limits and instruction handling incorporated |
| Physical-phone acceptance | Not run before release; maintainer directed publication before phone checks |

## Release Notes

- The exported AI report now explains what Smart Paper data it contains and asks the AI to begin with a grounded response when you share it without a separate question.
- The report explains date and field limits so the AI does not mistake excluded information for zero activity.

## Known Follow-Ups

- Re-export from this version to get the new introduction; existing Markdown files do not change.
- Android install/upgrade, native share chooser, ChatGPT attachment behavior, native restore, offline persistence, notifications, and phone layout still need an Android runtime or physical device.
