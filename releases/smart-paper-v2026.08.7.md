# Smart Paper Release: smart-paper-v2026.08.7

Date: 2026-08-16

## Scope

- Add configurable planner sections with 10 stable slots.
- Add Settings page for renaming and activating/hiding planner sections.
- Preserve hidden section data while showing active-section planner totals and summaries.
- Update backend/local import-export support for planner section settings.
- Update durable team documentation for single-user product direction, team testing ownership, Docker frontend validation, and release readiness.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.7` | This release commit | Docs, release record, APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.7` | `fa3ab25` | Planner section settings API/model/import-export/tests |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.7` | `fa024ab` | Settings UI, planner/summaries/local mode, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 8 |
| Android versionName | `2026.08.7` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.7-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.7-release.apk` |
| APK SHA-256 | `1e77c1c99d953a5dc539fd5deafd270ff65f0fe1620fe38cb331678afea8cb16` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 28 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend Docker lint/type/build | `docker run --rm -v "$PWD":/app -w /app node:24-bookworm bash -lc 'npm ci && npm run lint && npx tsc --noEmit && npm run build'` | Passed |
| Android signed release build | `scripts/build-android-release-docker.sh` | Passed |
| APK signature | `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed; certificate SHA-256 matches stable release certificate |

## Release Notes

- Planner sections are now configurable from Settings.
- The app provides 10 stable section slots; Main, Second, Learning, and Exercise stay active by default, and slots 5-10 can be activated when needed.
- Renaming or hiding a section does not delete its saved planner data.
- Summaries and readable exports use active section labels.
- JSON backups include planner section settings and all slot data.

## Known Follow-Ups

- Add frontend automated tests for settings, planner section saves, and local import/export.
- Polish dense planner layout if many sections are active at once.
- Consider separate English/Persian labels for custom sections after real use.
