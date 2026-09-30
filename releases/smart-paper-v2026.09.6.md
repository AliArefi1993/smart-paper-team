# Smart Paper Release Candidate: smart-paper-v2026.09.6

Date: 2026-09-30

Status: stable-signed candidate prepared; tag and GitHub Release pending physical-phone acceptance.

## Scope

- Select planner and finance fields and an inclusive date range for a Markdown AI report in Android local-data mode.
- Review the report text and share the file through the device chooser, with a save-and-attach fallback for ChatGPT.
- Keep finance off by default and recheck the finance unlock when sharing.
- Give JSON backups dated filenames and validate a chosen restore file before replace confirmation.

## Repository Revisions And Tags

| Repository | Prepared commit | Tag status |
| --- | --- | --- |
| team root | This candidate record and APK commit | `smart-paper-v2026.09.6` pending |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.09.6` pending |
| frontend `smart-paper-front/` | `82b46d0` | `smart-paper-v2026.09.6` pending |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 15 |
| Android versionName | `2026.09.6` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.6-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.6-release.apk` |
| APK SHA-256 | `a718260a4a6126759a7cf4e00ef2147c13a39a7bbc1d2586d4d759c59092cd1d` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Evidence | Result |
| --- | --- | --- |
| Backend tests and migrations | `.venv/bin/python manage.py test`; `makemigrations --check --dry-run` | Passed; 33 tests, no changes |
| Frontend lint, TypeScript, tests, local build | Docker checks at `6930db0` | Passed; 18 tests |
| Android local-data sync and signed build | `scripts/build-android-release-docker.sh` at `82b46d0` | Passed |
| APK signature and version | Docker `apksigner verify --print-certs`; `aapt dump badging` | Passed; stable certificate, code 15, name 2026.09.6 |
| Local browser export screen | Persian narrow-width layout and invalid date feedback | Passed |
| Physical-phone acceptance | Install, upgrade, backup/restore, AI share, bilingual/offline/timer/notification checks | Pending; no connected phone or `adb` in workspace |

## Release Notes

- Choose the dates and details you want in a human-readable report for AI conversations.
- Review the report before handing its file to another app; attach it manually in ChatGPT if the device chooser does not offer ChatGPT.
- JSON backups use dated filenames and show their contents before replacing saved data.

## Known Follow-Ups

- Complete the phone checklist in `releases/NEXT.md`, including the outstanding `.5` upgrade/launch retest. Record the results before creating the three repository tags; push the team tag last to trigger GitHub Release publishing.
