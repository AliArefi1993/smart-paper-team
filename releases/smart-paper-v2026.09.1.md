# Smart Paper Release: smart-paper-v2026.09.1

Date: 2026-09-27

## Scope

- Repair Android local-data weekly totals so saved durations are recalculated from daily entries.
- Add a separate daily note to each planner day, including persistence and readable exports.
- Add named reusable week templates for weekly goals and notes in backend and offline Android modes.
- Include day notes and week templates in JSON backups.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.1` | This release commit | Release record, APK artifact, app revisions |
| backend `smart-paper/` | `smart-paper-v2026.09.1` | `204fd29` | Daily notes and reusable week-template API, migration, export/import, tests |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.1` | `9579056` | Daily notes, local total repair, reusable templates, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 10 |
| Android versionName | `2026.09.1` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.1-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.1-release.apk` |
| APK SHA-256 | `70452e7a5cc98430f2b8e1c325cffb201b3d6f2e2ee1a28911d6a59d9a4f06cd` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 33 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend lint/type/build | `npm run lint && npx tsc --noEmit && npm run build` | Passed in Docker |
| Android signed release build | `scripts/build-android-release-docker.sh` | Passed |
| APK signature | `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed; stable certificate fingerprint matches |

## Release Notes

- Weekly duration totals remain accurate after saving and reopening the Android local-data app.
- A day can now have its own note in addition to section notes and scheduled-event notes.
- Save, apply, update, and delete named templates for weekly goals and notes.

## Known Follow-Ups

- Templates currently cover weekly goals and notes only; daily/section defaults can be considered after real use.
