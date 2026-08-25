# Smart Paper Release: smart-paper-v2026.08.8

Date: 2026-08-25

## Scope

- Add timed day schedule entries to the weekly planner.
- Add add/edit/delete agenda UI for exact-time events such as `18:00-19:00 Meeting`.
- Persist schedule entries in backend API mode and Android/local-storage mode.
- Include schedule entries in JSON, CSV, XLSX, and Markdown export/import.
- Add opt-in Android local morning plan notifications with configurable notification time.
- Update durable product, architecture, status, and roadmap documentation.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.8` | This release commit | Docs, release record, APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.8` | `e44638f` | DayScheduleEntry model/API/export/import/tests |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.8` | `5e038ff` | Planner agenda UI, local mode, notifications, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 9 |
| Android versionName | `2026.08.8` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.8-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.8-release.apk` |
| APK SHA-256 | `079749002414768a394feeb756b0eddcf935aee16bf7318486db58bfb14f5763` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 32 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend Docker lint/type/build | `docker run --rm -v "$PWD":/app -w /app node:24-bookworm bash -lc 'npm run lint && npx tsc --noEmit && npm run build && NEXT_PUBLIC_DATA_MODE=local npm run build'` | Passed |
| Android signed release build | `scripts/build-android-release-docker.sh` | Passed |
| APK signature | `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed; certificate SHA-256 matches stable release certificate |

## Release Notes

- Planner days now have a Day Schedule area for exact-time agenda items.
- Timed entries can be added, edited, deleted, sorted, and saved with the week.
- Timed entries work in backend API mode and Android/local-storage mode.
- Backups and readable exports include timed entries.
- Settings now supports an opt-in Android morning plan notification.

## Known Follow-Ups

- Validate Android notification permission and delivery behavior on a real device.
- Add frontend automated tests for timed schedule entry CRUD, sorting, and local import/export.
- Consider recurring events, calendar import/export, or per-event reminders later.
