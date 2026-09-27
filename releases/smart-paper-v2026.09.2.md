# Smart Paper Release: smart-paper-v2026.09.2

Date: 2026-09-27

## Scope

- Expand week templates into full-week snapshots covering all days, notes, section durations/goals/notes, and timed items.
- Move templates out of the primary planner content into a compact mobile-friendly sheet.
- Automatically center the current selected week in the Android week rail on planner open.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.2` | This release commit | Release record, APK artifact, app revisions |
| backend `smart-paper/` | `smart-paper-v2026.09.2` | `68c789b` | Full-week template storage, validation, import/export, migration, tests |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.2` | `2cdf6c0` | Full-week template application, compact template sheet, centered week rail, Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 11 |
| Android versionName | `2026.09.2` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.2-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.2-release.apk` |
| APK SHA-256 | `5aa2a2639a0a2e01edf76ac6e8c978cc1318c03b7945f2a25de074ce58489c5b` |
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

- A week template now restores the complete seven-day plan, including timed items with fresh IDs.
- Template controls are compact and secondary, opening in a mobile-friendly sheet instead of occupying the main planner area.
- The planner opens with the current week visible and selected in the horizontal week rail.

## Known Follow-Ups

- Test full-week template behavior and sheet usability on a physical Android device in both English and Persian.
