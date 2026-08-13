# Smart Paper Release: smart-paper-v2026.08.1

Date: 2026-08-13

## Scope

- Backend finance PIN brute-force protection.
- Android local-data export file sharing fix.
- Android dark/focus mode UI polish.
- Team release/tag workflow and Android local-data version record.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.1` | Tagged release commit | Release memory/docs and app repo pointers |
| backend `smart-paper/` | `smart-paper-v2026.08.1` | `f75cff0` | Finance PIN throttling |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.1` | `6d0bd21` | Android export fix, Android UI polish, Android version metadata |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | `2` |
| Android versionName | `2026.08.1` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.1-debug.apk` |
| APK path | Not produced in this environment |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 22 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend lint | Docker: `npm run lint` | Passed |
| Frontend type check | Docker: `npx tsc --noEmit` | Passed |
| Frontend build | Docker: `npm run build` | Passed |
| Android local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Android local-data sync | Docker: `npx cap sync android` | Passed |
| Android APK build | Docker: `cd android && ./gradlew assembleDebug` | Blocked before Gradle by Docker Android SDK image registry/TLS timeout |

## Release Notes

- Added finance PIN throttling using a backend database record keyed by client address.
- Throttle blocks repeated invalid PIN attempts and preserves lockout across browser sessions and backend workers.
- Added regression tests for lockout, cooldown, fresh sessions, and spoofed forwarding headers.
- Fixed Android export so generated files are written through Capacitor Filesystem and opened with the native share sheet.
- Improved Android dark/focus mode reliability by disabling WebView forced darkening and tightening planner contrast, focus states, input surfaces, and mobile header wrapping.
- Added team release documentation for Git tags and Android local-data version records.

## Known Follow-Ups

- Re-run the Android APK build when the Docker Android SDK image can be pulled successfully.
- Rename/copy the APK to `SmartPaper-local-2026.08.1-debug.apk` once produced.
- Review dependency audit findings separately; npm reported 11 audit issues during Docker dependency installation.

