# Smart Paper Release: smart-paper-v2026.10.2

Date: 2026-10-05

Status: publication approved by the maintainer on 2026-10-05 with physical-phone and screen-reader checks outstanding.

## Scope

- Make Planner sections compact until opened, then place the opened section heading below the top of the phone viewport.
- Keep each configurable section's minutes, goal, and note separate; retain timed schedule entries and week templates.
- Grow goal and note fields with their text and offer a full writing view for section goals and notes. Enter adds a line; Ctrl/Cmd+Enter saves.
- Keep manual week saving, show unsaved/saving/saved/failure feedback, and preserve edits made while a save is in progress.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | This release record, APK, design handoff, and frontend pointer commits | `smart-paper-v2026.10.2` |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.10.2` |
| frontend `smart-paper-front/` | `ed2b5a3` | `smart-paper-v2026.10.2` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 19 |
| Android versionName | `2026.10.2` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.2-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.2-release.apk` |
| APK SHA-256 | `ee518c2ac71892ef14c081f338e5f83cf8fc58de1755723519fadf5022195c68` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Size | 4,383,544 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend tests and migrations | Passed; 33 tests, no migration changes; backend source unchanged |
| Frontend lint, TypeScript, tests, local build | Passed in Docker; 23 tests and static export; final source lint and type check passed |
| Planner browser QA | Passed at 390px in English and Persian: last section scroll position, one open section, long text without horizontal overflow, multiline Enter, writing view focus return, save/reopen, dark mode, template/schedule sheets, and unsaved-week choice |
| Signed Android build | Passed with `scripts/build-android-release-docker.sh` |
| APK signature and version | Passed; stable certificate, code 19, name 2026.10.2 |
| Physical phone and screen reader | Not run; requested release preparation continues with these checks outstanding |

## Dependency Review

The production `npm audit` reports 1 critical, 4 high, and 1 moderate package findings. The critical Next.js advisories involve hosted server routes, image optimization, or `next/og`; this APK packages a static export and has no Next server. The app uses `xlsx` to write exports and does not call its workbook parser, where the two high advisories apply. `postcss` runs during the build, and `sharp` image optimization is not an Android runtime service. The locked dependencies remain unchanged; reassess before any hosted web distribution. References: [Next.js AVIF advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4), [SheetJS prototype pollution](https://github.com/advisories/GHSA-4r6h-8v6p-xvw6), [SheetJS ReDoS](https://github.com/advisories/GHSA-5pgg-2g8v-p4x9).

## Release Notes

- Open a Planner section to see its own time, goal, and note without a full stack of forms on the day.
- Write longer goals and notes comfortably, then save the week with explicit feedback.

## Known Follow-Ups

- On a physical Android phone, install over the prior release, reopen saved planner and finance data, test backup export/restore outside the app, offline use, notifications, and English/Persian layouts.
- Review Planner with a screen reader and test ten active sections with long custom labels.
- Configured section names are stored as user text; the current default English names remain English when the UI language switches to Persian. Optional language-specific section labels remain a roadmap item.
