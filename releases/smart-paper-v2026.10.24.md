# Smart Paper Release: smart-paper-v2026.10.24

Date: 2026-10-14

## Scope

- Shipped the validated desktop backlog batch: Persian Idea Space recovery-status correction, meaningful browser integration coverage, synthetic offline performance comparison, and bilingual desktop keyboard/accessibility corrections.
- Backend behavior and source are unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.24` | `0b56075c535f8e3521c62ec538369ba79a09ab9a` | Release record, exact APK and provenance committed before tagging. |
| backend `smart-paper/` | `smart-paper-v2026.10.24` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; release marker only. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.24` | `4c9bfad4f26d1165e18894eef096ee405f6f21f5` | Exact source used for CI and hosted build. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 41 |
| Android versionName | `2026.10.24` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.24-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.24-release.apk` |
| APK size | 4,409,696 bytes |
| APK SHA-256 | `276e174cff438934f429cf5cc2c982a37c95ab7daf85bc4366a6be23fd001d6d` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.24-provenance.json` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend exact-source CI | [Run 38529064805](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38529064805) | Passed on `4c9bfad4f26d1165e18894eef096ee405f6f21f5`. |
| Local app checks | Docker Node 24 lint, TypeScript, 158 tests, local-data production build | Passed before hosted exact-source CI. |
| Browser QA | Chrome 155, 10 Playwright flows | 10/10 passed, including bilingual UI file import Merge/Replace and short viewport reachability. |
| Synthetic performance | Three interleaved small/large offline runs | Integrity checks passed; results and limits are in [task evidence](../tasks/2026-10-13-desktop-backlog-batch.md). |
| Hosted unsigned candidate | [Stable build run 38529803527](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38529803527) | Lint, TypeScript, tests, local-data build, Android assembly, candidate verification and upload passed. Candidate artifact `11877981120`; archive SHA-256 `cb4987ad11828492b2361c252fc0242e4864a42c5143894f9c030840f86764fb`. |
| Protected stable signing | [Stable build run 38529803527](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38529803527) | Passed. Final artifact `11877369384`; archive SHA-256 `39c7c081808207b927ab81ef35a9b9d7e73749dbc904fb2aed315d10bf13b123`. |
| Artifact Security review | Independent review of candidate and signed APK | Passed: expected v2/v3 signer, identity/version/non-debug, all 556 candidate payload entries and 112 web assets match; cloud exclusion/transfer manifest verified; no critical/high finding. |
| Public release | [Publisher run 38531489626](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38531489626) | Published non-draft release [Smart Paper 2026.10.24](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.24), asset `639665121`, 4,409,696 bytes. Anonymous download SHA-256 `276e174cff438934f429cf5cc2c982a37c95ab7daf85bc4366a6be23fd001d6d` matches the committed APK byte-for-byte. |
| Backend tests and migration check | Not run | Backend unchanged; no backend application change in this release. |

## Release Notes

- Persian Idea Space now reports recovered draft status correctly on cold entry and reload while preserving the writing.
- Browser integration coverage now exercises saving across routes, configurable sections, and JSON Merge/Replace through the UI.
- Bilingual desktop accessibility review corrected reproduced keyboard, focus, naming and short-viewport issues.
- Synthetic offline performance measurements for deterministic small and larger fixtures passed integrity checks. They describe the recorded Chrome/macOS environment and do not establish device capacity or performance guarantees.

## Known Follow-Ups

- Physical Android behavior, native lifecycle/data retention, recipient delivery, notifications and TalkBack remain unverified.
- The next candidate is the observed Export unlock-success localization on EN-to-FA switch, subject to a new bounded design handoff.
- Backend and hosted-web work remain paused.
