# Smart Paper Release: smart-paper-v2026.10.29

Date: 2026-10-16

Status: Published on 2026-10-16. Product, Designer, implementation review, actual app comparison, corrected exact-source CI, unsigned/final artifact Security reviews, protected signing, GitHub publication and anonymous APK byte/hash verification passed. Superseded candidate run `38861435808` was canceled.

## Scope

- The reported export → add Thursday day note → Merge older backup flow now preserves the newly written note. In a matching week, other incoming fields still fill empty saved fields.
- Merge keeps whole conflicting device records, section configuration, and Finance goal without inferring recency from timestamps; it adds distinct records and reports unapplied categories, including when imported content remains hidden by inactive sections.
- Replace remains the existing explicit destructive restoration choice. This prevents future Merge overwrites; it does not recover the already overwritten historical note or add persistent import history. Backend source is unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.29` | `f6be0bd4dd5ba5285cca403fdacf33d351084475` | Release record, final APK and provenance are included in the tagged commit. |
| backend `smart-paper/` | `smart-paper-v2026.10.29` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Backend source unchanged; annotated marker tag. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.29` | `40c3516c7ccd4b3ed056b9227591ca35152fef63` | Exact source after test-only browser bootstrap fix. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 46 |
| Android versionName | `2026.10.29` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.29-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.29-release.apk` |
| APK size | 4,422,272 bytes |
| APK SHA-256 | `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.29-provenance.json` |
| Provenance SHA-256 | `02cdbf17e0a5e25fbc6f9692d03ca744ce761c56d8c685ece4914d918b54e0b0` |

The hosted unsigned APK is 4,363,361 bytes with SHA-256 `524965e78f3bf1617c9c748dc2ae5ef16be6a4392bf91793269efd1f193f10fb`.

## Unsigned Candidate Artifact

Stable-build run [38861893418](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861893418) produced artifact `12029303458` from exact frontend SHA `40c3516c7ccd4b3ed056b9227591ca35152fef63`. The preserved candidate archive is 6,747,288 bytes with SHA-256 `f0e78ec7573ba74aec193bba7ac570a7270d2bfc33eaf8ea82cad890be9e4ab7`; the unsigned APK is 4,363,361 bytes with SHA-256 `524965e78f3bf1617c9c748dc2ae5ef16be6a4392bf91793269efd1f193f10fb`. Metadata reports package `com.aliarefi.smartpaper`, versionCode 46/versionName 2026.10.29, non-debuggable local data mode, and 115 compared web assets. Independent Security accepted provenance, all 115 web assets, 559 unsigned payload entries and unsigned state. Original archive retained at `/private/tmp/smart-paper-2026.10.29-candidate.zip`.

## Validation

| Area | Command or evidence | Result |
| --- | --- | --- |
| Frontend Docker local checks | Node 24 lint, types, 26 focused tests and local-data build (refresh run 81429); earlier full suite 192 passed before final two focused cases/browser suite | Passed locally. |
| Product, Designer, source review | Approved safe-Merge semantics, ready EN/FA handoff, actual Chrome app comparison and independent review | Passed. Thursday note remained unchanged; empty same-week weekly text was filled. |
| Initial exact-source frontend CI | Run [38861399008](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861399008), SHA `3e3a1a4b9467d5c61b6e4fc73a9e5433d6fff6b5` | Lint, types, 194 unit tests and local-data build passed; 38/39 browser checks passed. EN case failed at the initial upload locator before Merge assertions; fixed the test helper to await cold-route bootstrap. |
| Corrected exact-source frontend CI | Run [38861867772](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861867772), SHA `40c3516c7ccd4b3ed056b9227591ca35152fef63` | Passed: lint, types, 194 unit tests, 39 browser checks, local-data build, Android verification APK and provenance. |
| Superseded hosted candidate | Run [38861435808](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861435808), SHA `3e3a1a4b9467d5c61b6e4fc73a9e5433d6fff6b5` | Canceled before artifact review because the test-only helper was corrected in a new commit. |
| Hosted stable candidate | Run [38861893418](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861893418), artifact `12029303458`, SHA `40c3516c7ccd4b3ed056b9227591ca35152fef63` | Unsigned artifact built and passed independent Security review; 115 web assets and 559 payload entries accepted. Original archive size/hash and APK details recorded above. |
| Protected signing | Run [38861893418](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861893418), final artifact `12030157154` | Exact-SHA approval submitted after CI, candidate review and lead authorization. Independent Security verified the pinned v2/v3 signer and all 559 unsigned payload entries unchanged except three signature metadata records. APK: 4,422,272 bytes, SHA-256 `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce`. |
| Public release | [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.29), publisher run [38863625805](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38863625805), APK asset `646440338` | Published 2026-10-16. The public APK is 4,422,272 bytes and its anonymous download SHA-256 matches the committed APK: `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce`. |

## Release Notes

- Merge keeps meaningful saved content when backup values differ, fills empty Planner fields and adds missing records.
- Replace continues to restore from the selected backup after explicit confirmation.
- Merge is not a deletion synchronizer; intentionally cleared Planner fields may be filled from the backup again.
- This release cannot restore previously overwritten writing if no remaining copy contains it.

## Known Follow-Ups

- Physical Android chooser, upgrade/data-retention and TalkBack behavior remain unverified; browser and desktop Chrome checks do not certify native behavior.
