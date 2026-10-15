# Smart Paper Release: smart-paper-v2026.10.28

Date: 2026-10-16

Status: Published and verified. Exact-source CI, independent unsigned/final artifact Security reviews, GitHub publication, and anonymous APK byte/hash verification passed.

## Scope

- The Export screen now gives visible, bilingual feedback after JSON backup imports, preserves the selected filename, reports truthful backup record counts, and links to imported records for inspection.
- Imported archived and future weeks appear in the existing Planner week selector without creating intervening weeks.
- Merge, Replace confirmation, Finance visibility, imported Ideas and templates, and storage-failure behavior remain covered by regression checks. Backend source is unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.28` | `ec415c703e49a2a64e9d34c84c60bdf7d608e58f` | Release record and final APK/provenance are included in the tagged commit. |
| backend `smart-paper/` | `smart-paper-v2026.10.28` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Backend source unchanged; annotated marker tag. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.28` | `baf05da37794e6c9314d9112d3c9a0c24e5fbe4b` | Exact source for verification and stable-build candidate. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 45 |
| Android versionName | `2026.10.28` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.28-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.28-release.apk` |
| APK size | 4,413,888 bytes |
| APK SHA-256 | `27718fdcfc11f3632282cafc3248b4dcba9fd8f2b85db244b1f68556078e4016` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.28-provenance.json` |

## Candidate Artifact

Hosted stable-build run [38802646169](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802646169) built unsigned artifact `12005051605` from frontend SHA `baf05da37794e6c9314d9112d3c9a0c24e5fbe4b`. Its archive is 6,716,668 bytes with SHA-256 `8d668022ed587b104a1d17d36401ee6ae45348eb023d1c08cf23830868bf292e`. The candidate APK SHA-256 is `eccc0195d7e48ffd3376bb4fa0b89aca5359b101804d3a06bcbcb2c8bcf0e025`; build metadata records versionCode 45/versionName 2026.10.28, package `com.aliarefi.smartpaper`, non-debuggable state, local data mode, 113 compared web assets, and the exact source SHA. Independent Security review passed: package/version/non-debug/local-mode identity, provenance, all 113 web assets and 557 unsigned payload entries were accepted. The original archive is retained under `/private/tmp/smart-paper-2026.10.28-candidate/` for review and rehashing.

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Backend tests and migrations | Not run | Backend source unchanged. |
| Frontend lint, types, and local-data build | Docker `node:24-bookworm`: `npm run lint`, `npx tsc --noEmit`, `NEXT_PUBLIC_DATA_MODE=local npm run build` | Passed on the final source tree. |
| Frontend unit tests | Docker `node:24-bookworm`: `npm test` | 179 passed, 0 failed; executed before the browser-only import suite was added. Exact-source CI Tests step passed afterward. |
| Browser acceptance | Exact-source CI run [38802594305](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802594305) | Critical browser integration passed; the six new import-feedback cases cover English/Persian success, Replace cancel/invalid, Replace categories, storage failure, and read-time authorization expiry. |
| Exact-source frontend CI | Run [38802594305](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802594305), source `baf05da37794e6c9314d9112d3c9a0c24e5fbe4b` | Passed: lint, types, 179 unit tests, local-data build, 36 browser tests (including six import-feedback cases), Android verification APK assembly and provenance. |
| Hosted unsigned candidate | Stable-build run [38802646169](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802646169), artifact `12005051605` | Built; independent Security review passed for package/version/local mode, provenance, 113 web assets, 557 unsigned payload entries, and unsigned signer state. |
| Protected signing | Stable-build run [38802646169](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802646169), final artifact `12005417537` | Passed after required reviewer approval. Independent Security verified the pinned v2/v3 signer and all 557 unsigned payload entries unchanged except signing metadata. |
| Public release | [Publisher run 38804857069](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38804857069) | Published at [GitHub Releases](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.28); APK asset `645128069`, 4,413,888 bytes. Anonymous download SHA-256 `27718fdcfc11f3632282cafc3248b4dcba9fd8f2b85db244b1f68556078e4016` matches the committed APK byte-for-byte. |

## Release Notes

- Import completion stays visible beside the action, identifies the selected backup, and links to content that can be inspected after import.
- Archived and future imported weeks can be opened from the existing Planner selector; intermediate weeks are not generated.
- Published stable-signed Android 2026.10.28/code45 from frontend `baf05da37794e6c9314d9112d3c9a0c24e5fbe4b`, after exact-source CI, independent candidate/final artifact review, and public APK byte/hash verification.
- Count wording describes records present in the backup rather than claiming a count of newly added records.

## Known Follow-Ups

- Physical Android chooser behavior and TalkBack checks remain unverified; browser checks do not certify native behavior.
