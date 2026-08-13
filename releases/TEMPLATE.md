# Smart Paper Release: smart-paper-vYYYY.MM.N

Date:

## Scope

- 

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-vYYYY.MM.N` |  |  |
| backend `smart-paper/` | `smart-paper-vYYYY.MM.N` |  |  |
| frontend `smart-paper-front/` | `smart-paper-vYYYY.MM.N` |  |  |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode |  |
| Android versionName | `YYYY.MM.N` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-YYYY.MM.N-debug.apk` |
| APK path |  |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Backend tests | `.venv/bin/python manage.py test` |  |
| Backend migrations | `.venv/bin/python manage.py makemigrations --check --dry-run` |  |
| Frontend lint | `npm run lint` |  |
| Frontend type check | `npx tsc --noEmit` |  |
| Frontend build | `npm run build` |  |
| Android build | `NEXT_PUBLIC_DATA_MODE=local npm run build && npx cap sync android && cd android && ./gradlew assembleDebug` |  |

## Release Notes

- 

## Known Follow-Ups

- 

