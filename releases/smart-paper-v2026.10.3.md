# Smart Paper Release: smart-paper-v2026.10.3

Date: 2026-10-06

Status: publication authorized by the maintainer; physical-phone and screen-reader checks are follow-ups under standing release direction.

## Scope

- Persist Light/Dark across Planner, Summaries, Export/reports, Finance, Ideas, Timer and Settings.
- Keep Idea Space hover controls and Timer hourglass glass dark and readable.
- Minimize/show individual Planner days or minimize all days; keep summaries visible and preserve drafts/manual saving.
- Retain collapsed choices across resize, theme and language changes; direct day navigation reopens a day.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | Release record, APK and frontend pointer commit | `smart-paper-v2026.10.3` |
| backend `smart-paper/` | `68c789b` (unchanged) | `smart-paper-v2026.10.3` |
| frontend `smart-paper-front/` | `130ddf3` | `smart-paper-v2026.10.3` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 20 |
| Android versionName | `2026.10.3` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.3-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.3-release.apk` |
| APK SHA-256 | cd2b5f098ab731b654e1a6d35ca7ccfef65a5d3ef37ff14c956e89f27a07c8d5 |
| Signing certificate SHA-256 | 59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5 |
| Size | 4408216 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend tests and migrations | Unchanged source; reused last release evidence: 33 tests, no migration changes |
| Frontend lint, TypeScript, tests | Passed in Docker on37b91ec; 27 tests; subsequent source change only Android version bump |
| Local-data production build / Capacitor assets | Passed fresh release build |
| Planner runtime review | Targeted EN/FA phone/wide collapse/reopen, hidden-draft save, resize, focus, language/theme retention and unsaved-week checks passed |
| Dark route runtime review | Bounded EN/FA six-route phone/selected-wide dark-surface review passed; no new light-surface gaps |
| Independent implementation review | No remaining findings after calendar-order correction |
| Signed Android build / APK signature and version | Passed fresh Docker assembleRelease, stable certificate, code20/name2026.10.3; all136 static export files match packaged assets byte-for-byte |
| Physical phone / TalkBack | Not run; not publication gates under maintainer direction |

## Dependency Notes

Locked dependencies are unchanged. The fresh installation audit reports 21 total development/production findings (2 critical,14 high,4 moderate,1 low); this is not a clean dependency audit. Static Android applicability and previous known package findings are documented in [the prior release](smart-paper-v2026.10.2.md#dependency-review); reassess before hosted web distribution.

## Release Notes

- Dark mode now follows you across every app page, including summaries and reports.
- Minimize one day or every day to scan the week, then reopen any day with your edits retained.

## Known Follow-Ups

- Maintainer installs published APKs and reports physical-device issues; upgrade data retention, native backup/share, keyboard, notifications and TalkBack remain unverified.
- Import execution feedback was not browser-tested because its file chooser stalled; source coverage was reviewed.
- Browser review covers the recorded states, not exhaustive feature or native-popup QA. See the dark coverage audit and day-minimization task.
