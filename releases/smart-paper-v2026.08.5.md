# Smart Paper Release: smart-paper-v2026.08.5

Date: 2026-08-13

## Scope

- Main weekly planner experience redesign for faster mobile capture and clearer dark-mode readability.
- Stable-signed Android local-data release APK with a new version number.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.08.5` | Tagged release commit | Release memory and signed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.08.5` | `f75cff0` | Unchanged from previous release |
| frontend `smart-paper-front/` | `smart-paper-v2026.08.5` | `130a8a5` | Planner redesign and Android version bump |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android package | `com.aliarefi.smartpaper` |
| Android versionCode | `6` |
| Android versionName | `2026.08.5` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.08.5-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.08.5-release.apk` |
| APK SHA-256 | `d0391fba736749e9dc16ffe9cf50a51083857728e86549633c8438231317d73c` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend lint | Docker: `npm run lint` | Passed |
| Frontend type check | Docker: `npx tsc --noEmit` | Passed |
| Frontend local-data build | Docker: `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed |
| Local web smoke check | Dev server on port `3007`, `curl /` | Passed |
| Android signed release build | Docker: `scripts/build-android-release-docker.sh` | Passed |
| Android signature verification | Docker: `apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk` | Passed |

## Release Notes

- Changed the planner from a cramped seven-column feel into a calmer mobile-first capture flow.
- Added an active day card, mobile day focus, and a horizontally scrollable week rail.
- Made week goal and week note fields clearer with visible labels.
- Added saved, unsaved, saving, and error status text near the main save actions.
- Kept one primary save action per viewport: desktop header save and mobile safe-area sticky save.
- Added section total chips, day totals, and quick minute buttons for `+15`, `+30`, `+60`, and reset to `0`.
- Rebalanced day and section colors so dark mode keeps contrast and focus-mode style views stay readable.
- Guarded minute inputs against `NaN` values.

## Known Follow-Ups

- Run a real Android visual pass with the keyboard open on the planner page.
- Re-run browser screenshot QA when the Playwright Docker image pull is available locally.
