# Smart Paper Release Draft

This is the working release record for the next tag. Rename it to the final tag name, for example `smart-paper-v2026.08.1.md`, when the release is approved.

## Proposed Tag

`smart-paper-v2026.08.1`

## Current Candidate Scope

- Backend finance PIN brute-force protection.
- Android local-data export file sharing fix.
- Android dark/focus mode UI polish.
- Team release/tag workflow and Android local-data version record.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.1` | Pending | Release memory/docs |
| backend `smart-paper/` | `smart-paper-v2026.08.1` | Pending | Finance PIN throttling |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.1` | Pending | Android export fix |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Current Android versionCode | `1` |
| Current Android versionName | `1.0` |
| Proposed release versionCode | `2` |
| Proposed release versionName | `2026.08.1` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.1-debug.apk` |
| APK path | Pending build |

## Validation So Far

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` | Passed, 22 tests |
| Backend finance tests | `.venv/bin/python manage.py test finance` | Passed, 11 tests |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` | Passed, no changes detected |
| Frontend lint | Docker: `npm run lint` | Passed |
| Frontend type check | Docker: `npx tsc --noEmit` | Passed |
| Frontend build | Docker: `npm run build` | Passed |
| Android local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Android local-data sync | Docker: `npx cap sync android` | Passed |
| Android build | `NEXT_PUBLIC_DATA_MODE=local npm run build && npx cap sync android && cd android && ./gradlew assembleDebug` | Blocked by Docker Android SDK image pull failure |

## Release Notes Draft

- Added finance PIN throttling using a backend database record keyed by client address.
- Throttle blocks repeated invalid PIN attempts and preserves lockout across browser sessions and backend workers.
- Added regression tests for lockout, cooldown, fresh sessions, and spoofed forwarding headers.
- Fixed Android export so generated files are written through Capacitor Filesystem and opened with the native share sheet.
- Improved Android dark/focus mode reliability by disabling WebView forced darkening and tightening planner contrast, focus states, input surfaces, and mobile header wrapping.
- Added team release documentation for Git tags and Android local-data version records.

## Open Before Tagging

- Commit backend changes in `smart-paper/`.
- Decide whether to bump Android `versionCode` and `versionName` now.
- Run final Android APK build once the Docker Android SDK image is available.
- Commit team release docs and this release record in the root repository.
- Create annotated Git tags only after approval.
