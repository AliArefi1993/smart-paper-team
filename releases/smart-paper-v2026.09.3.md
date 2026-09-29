# Smart Paper Release: smart-paper-v2026.09.3

Date: 2026-09-29

Status: released at the maintainer's direction. Physical-phone acceptance remains unverified.

## Scope

- Add a dedicated Focus Timer with selectable focus and rest phases, configurable lengths (25/5 minute defaults), and an hourglass display.
- Support start, pause, resume, reset, and explicit transition to the next phase.
- Recover a running countdown after navigation or app suspension from its saved deadline. Timer sessions remain separate from planner totals.
- Provide English/Persian labels and responsive RTL layout.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.09.3` | This release commit | Record, APK, docs, app pointer |
| backend `smart-paper/` | `smart-paper-v2026.09.3` | `68c789b` | No backend change |
| frontend `smart-paper-front/` | `smart-paper-v2026.09.3` | `3926f34` | Timer, tests, Android version |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 12 |
| Android versionName | `2026.09.3` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.09.3-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.09.3-release.apk` |
| APK SHA-256 | `56f3394718e39d82986f5597e1616bdc96cd8ef351f2b3671b498cd85fbff85e` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 33 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend tests | Docker `npm ci && npm test` | Passed, 13 tests |
| Frontend lint/type/local build | Docker `npm ci && npm run lint && npx tsc --noEmit && NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed; static `/timer` route generated |
| Browser acceptance | Built app at phone width, English/Persian, keyboard controls, reload recovery | Passed |
| Android signed release build | `scripts/build-android-release-docker.sh` | Passed |
| APK signature and version | `apksigner verify --print-certs` and `aapt dump badging` | Passed; existing certificate, versionCode 12, versionName 2026.09.3 |
| Physical-phone acceptance | Install and upgrade on Android device | Not run; no connected device in workspace |

## Release Notes

- Use a dedicated focus/rest timer from the planner, with a visual hourglass and a large countdown.
- Set separate focus and rest lengths, switch phases, and pause or reset sessions.
- A session waits for an explicit start; a running session resumes accurately when the app is reopened.

## Known Follow-Ups

- On a physical Android phone, install over 2026.09.2 and confirm saved planner/finance data remains, then test timer suspension and expiry, offline use, English/Persian layout, backup/restore, and notifications.
- The timer has no background completion alarm and does not add its minutes to planner totals.
