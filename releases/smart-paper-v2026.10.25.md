# Smart Paper Release: smart-paper-v2026.10.25

Date: 2026-10-14

## Scope

- Shipped the Export unlock feedback locale correction. Switching between English and Persian updates the displayed success message while retaining Finance authorization and leaving Export/import behavior unchanged.
- Backend source and behavior are unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.25` | `d7e7c569c6bfcc69f68093bf74cb55089085e868` | Release record, exact APK and provenance committed before tagging. |
| backend `smart-paper/` | `smart-paper-v2026.10.25` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; release marker only. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.25` | `9aee030bbbf312aff74fdb5caa82033585726906` | Exact source used for CI and hosted build. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 42 |
| Android versionName | `2026.10.25` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.25-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.25-release.apk` |
| APK size | 4,409,696 bytes |
| APK SHA-256 | `2cc65b2695afc6fe78f02f594a690efa2281dbf7001ba21a89177235719a76cb` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.25-provenance.json` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Frontend exact-source CI | [Run 38533170570](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38533170570) | Passed on `9aee030bbbf312aff74fdb5caa82033585726906`. |
| Local app checks | Docker Node 24 lint, TypeScript, 158 tests, local-data production build | Passed before hosted exact-source CI. |
| Browser QA | Chrome 155, 11 browser flows and two focused Export locale tests | Passed, including EN/FA switching after success without changing authorization. |
| Hosted unsigned candidate | [Stable build run 38533879927](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38533879927) | Lint, TypeScript, tests, local-data build, Android assembly, candidate verification and upload passed. Candidate artifact `11879411625`; archive SHA-256 `28aef958f4681a1456a5d1e66c15d36ea33dbd97d584559b6d6c43e95876e42c`. |
| Protected stable signing | [Stable build run 38533879927](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38533879927) | Passed. Final artifact `11879582475`; archive SHA-256 `c2b68b78fee8576ac070c16b2316d35d806dafbd9f65285b522a9435b20fadee`. |
| Artifact Security review | Independent review of candidate and signed APK | Passed: pinned v2/v3 signer, identity/version/non-debug, all 556 candidate payload entries and 112 web assets match; no high/critical finding. Final SHA-256 matches checksum and provenance. |
| Public release | [Publisher run 38535232702](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38535232702) | Published non-draft release [Smart Paper 2026.10.25](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.25), asset `639742194`, 4,409,696 bytes. Anonymous download SHA-256 `2cc65b2695afc6fe78f02f594a690efa2281dbf7001ba21a89177235719a76cb` matches the committed APK byte-for-byte. |
| Backend tests and migration check | Not run | Backend unchanged; no backend application change in this release. |

## Release Notes

- Export unlock success feedback now updates when the app language changes between English and Persian.
- The change preserves the active Finance authorization and does not reload data or change Export/import behavior.

## Known Follow-Ups

- Physical Android behavior, native lifecycle/data retention, recipient delivery, notifications and TalkBack remain unverified.
- Backend and hosted-web work remain paused.
