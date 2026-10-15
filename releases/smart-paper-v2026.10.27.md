# Smart Paper Release: smart-paper-v2026.10.27

Date: 2026-10-15

## Scope

- Android system Back returns through the user's current app context: existing surface and guard behavior first, then in-app route history, Planner fallback, and normal Android exit at the unguarded root.
- Existing data-safety behavior for Idea reading, Planner writing, editors, diagnostics, Settings unsaved changes, and Finance access remains in place. No backend behavior changed.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.27` | Pending tag commit | Release record, exact APK, and provenance committed before tagging. |
| backend `smart-paper/` | `smart-paper-v2026.10.27` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Backend source unchanged; release marker only. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.27` | `6ec0eee66add646ee64f2fe335e9f044171a4531` | Exact source used for CI and hosted build. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 44 |
| Android versionName | `2026.10.27` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.27-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.27-release.apk` |
| APK size | 4,413,888 bytes |
| APK SHA-256 | `4473ed6dd843b4875b9f241f6eafcfaf4cf786af3b561fde1c493531aaf2863a` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.27-provenance.json` |

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Backend tests and migration check | Not run | Backend unchanged; no backend application change in this release. |
| Frontend local checks | Docker Node 24: lint, TypeScript, 178 tests, local-data build | Passed. |
| Browser acceptance | Chrome 155: 18 new EN/FA Back scenarios plus 12 existing regressions | All 30 cases passed; two initial fixture-only failures were corrected without app changes. |
| Frontend exact-source CI | [Run 38630913342](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38630913342) | Passed on `6ec0eee66add646ee64f2fe335e9f044171a4531`: lint, types, tests, local-data build, browser integration, isolated Android APK assembly and verification. |
| Hosted unsigned candidate | [Stable build run 38630950484](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38630950484), artifact `11925799407` | Passed. Independent Security accepted package/version/non-debug identity, provenance, 113 web assets, native/web handlers, and unsigned state. Candidate archive SHA-256 `12bb565171a458620773f51b9d8b284f95743e1137cc0c70fc59a1fec6efa461`. |
| Protected stable signing | [Stable build run 38630950484](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38630950484), final artifact `11927385937` | Passed after required environment approval. Downloaded archive SHA-256 `3cceb7b0aa641876624464037954d92ccb86743dfdea5b1116377f5daf474690`. |
| Final artifact Security review | Signed APK and provenance | Passed: pinned v2/v3 certificate, package/version/non-debug identity, provenance, and all 557 unsigned payload entries match; only signing metadata was added. |
| Public release | Pending | Publication and anonymous APK download verification remain in progress. |

## Release Notes

- Android system Back returns through the current app surface and route history, falls back to Planner for a fresh secondary route, and allows the normal platform exit at the unguarded root.
- Existing cancel, save, discard, unlock, and retry guards remain deliberate and data-safe.
- Prepared for publication as Android 2026.10.27/code44; the public tag and download checks are pending.

## Known Follow-Ups

- Physical Android keyboard, chooser, predictive/gesture Back, and TalkBack behavior remain unverified; browser and hosted APK checks do not establish device behavior.
- Backend source and hosted-web work remain paused.
