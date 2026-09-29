# Smart Paper Release: smart-paper-v2026.09.2

Date: 2026-09-29

Status: signed candidate prepared; publication pending required physical-phone checks. No `smart-paper-v2026.09.2` tag exists locally or on origin as of 2026-09-29.

## Scope

- Expand week templates into full-week snapshots covering all days, notes, section durations/goals/notes, and timed items.
- Move templates out of the primary planner content into a compact mobile-friendly sheet.
- Automatically center the current selected week in the Android week rail on planner open.
- Validate local JSON imports before changing saved records, roll back failed writes, and require confirmation before replacing all data.
- Align planner, finance, summaries, export, and settings around a paper-and-teal design with improved contrast and Persian RTL navigation.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.2` | This release commit | Release record, APK artifact, app revisions |
| backend `smart-paper/` | `smart-paper-v2026.09.2` | `68c789b` | Full-week template storage, validation, import/export, migration, tests |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.2` | `a385e47` | Templates, import safety, visual design, RTL fixes, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 11 |
| Android versionName | `2026.09.2` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.2-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.2-release.apk` |
| APK SHA-256 | `06e192b93827d14794d646717db96d8fb3e43cfe2db5cc1bc2776667779a8139` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 33 tests, 2026-09-29 |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected, 2026-09-29 |
| Frontend lint/type/local build | `npm run lint && npx tsc --noEmit && NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed in Docker, 2026-09-29 |
| Frontend import safety tests | `npm test` | Passed, 5 tests, 2026-09-29 |
| Android signed release build | `scripts/build-android-release-docker.sh` | Passed, 2026-09-29 |
| APK signature and version | `apksigner verify --print-certs` and `aapt dump badging` | Passed; stable certificate, versionCode 11, versionName 2026.09.2 |
| Physical-phone acceptance | `tasks/2026-09-29-android-apk-readiness.md` checklist | Pending; no ADB-connected device in this workspace |

## Dependency Audit Scope

`npm audit --omit=dev` reports 1 critical, 4 high, and 1 moderate package findings. The Android package contains static Next.js output and no Next.js server; server-side Next.js findings do not expose a running server in this APK. `baseline-browser-mapping`, `postcss`, `nanoid`, and `sharp` are build-side dependencies in this path. The `xlsx` package runs in the app, but Smart Paper only writes spreadsheets; imports accept JSON, not arbitrary XLSX. The [SheetJS prototype-pollution advisory](https://github.com/advisories/GHSA-4r6h-8v6p-xvw6) explicitly says export-only workflows are unaffected. The [SheetJS ReDoS advisory](https://github.com/advisories/GHSA-5pgg-2g8v-p4x9) remains flagged, so avoid treating the audit as clean. Reassess dependencies before any hosted web release or spreadsheet import feature.

## Release Notes

- A week template now restores the complete seven-day plan, including timed items with fresh IDs.
- Template controls are compact and secondary, opening in a mobile-friendly sheet instead of occupying the main planner area.
- The planner opens with the current week visible and selected in the horizontal week rail.
- Local backup import rejects invalid data before mutation and restores prior data if a write fails.
- The five screens now share a calmer visual language, accessible action contrast, and corrected Persian RTL week/day navigation.

## Known Follow-Ups

- Test full-week template behavior and sheet usability on a physical Android device in both English and Persian.
- On a phone, verify an upgrade from 2026.09.1 preserves planner and finance data; export JSON outside the app, restore it on a spare device, and check offline use and notifications before tagging.
