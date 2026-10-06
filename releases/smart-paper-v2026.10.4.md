# Smart Paper Release: smart-paper-v2026.10.4

Date: 2026-10-06

Status: publication authorized under standing maintainer direction; physical checks are follow-ups.

## Scope

- Align Planner dark canvas, cards, fields, controls and mobile save bar with the shared green palette used on other pages.
- Apply the same roles to schedule/template/unsaved sheets and full writing view.
- Keep light colors, section/category accents, semantic feedback and all Planner behavior.
- Shared language control now uses the same dark roles.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | Release artifact, record, handoff and frontend pointer commit | `smart-paper-v2026.10.4` |
| backend | `68c789b` unchanged | `smart-paper-v2026.10.4` |
| frontend | `ab37ee8` | `smart-paper-v2026.10.4` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 21 |
| Android versionName | `2026.10.4` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.4-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.4-release.apk` |
| APK SHA-256 | `09c9f58ae90a0bb7580b780de710b2e7f7b18d3fc073d2de59c983813097ef9c` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Size | 4408472 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend | Unchanged; reused prior33-test/no-migration evidence |
| Frontend | Docker lint, TypeScript,27 tests and local-data production build passed; fresh signed-build static export includes final shadow utility correction |
| Independent review | Shadow-color utilities corrected; final compiled panel shadow verified in browser; no other findings |
| Browser | EN/FA390px phone and1280px wide dark palette; English template/schedule/writing editors; selected/field/focus colors; EN/FA light regression passed. Other modal/error states source-reviewed. Exact evidence in design handoff |
| Signed APK | Passed assembleRelease; stable certificate, code21/name2026.10.4 and136 exported assets byte-for-byte |
| Physical Android / TalkBack | Unverified follow-ups under maintainer direction |

## Release Notes

Planner dark mode now uses the same green-toned colors as the other pages, including editors and the phone save bar.

## Known Follow-Ups

- Physical-device checks remain follow-ups; maintainer installs published APKs and reports issues.
- Locked dependencies unchanged; installation audit reports21 total development/production findings. Prior static Android dependency assessment is recorded in2026.10.3/2026.10.2 release notes; no clean audit is claimed.
- This is a palette change. Import execution, native controls, notifications and exhaustive feature QA were not repeated.
