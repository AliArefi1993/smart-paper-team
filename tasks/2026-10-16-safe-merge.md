# Task: Preserve device writing when merging an older backup

Status: verified; publication in progress
Created: 2026-10-16
Updated: 2026-10-16

## Objective

Prevent Merge from silently deleting newer device content when importing an older backup. The user reproduced this in Android by exporting, adding a Thursday day note, and importing the previous backup with Merge.

## Evidence and scope

- Frontend `baf05da`, Android 2026.10.28/code45. Backend remains paused.
- `importLocalExportPayload` spreads an incoming matching week over the existing week, replacing the complete days array. This directly explains the reported loss.
- Earlier feedback work preserved those semantics and its tests did not cover export → edit → older Merge. This gap needs correction, not a wording-only change.
- No user-device storage has been accessed. Recovery remains an investigation; do not promise recovery from an older backup that predates the note.

## Acceptance Criteria

- [x] Reproduce the reported Thursday day-note loss with an actual export/edit/import regression.
- [x] Product defines safe handling of matching fields/records and Designer supplies ready EN/FA interaction/copy handoff.
- [x] Older Merge preserves current writing; incoming nonconflicting data remains importable; conflicting content is handled without silent loss.
- [x] Replace remains deliberate and explicit; validation, rollback, PIN and privacy protections remain intact.
- [x] Relevant automated/browser checks and independent data-safety review pass.
- [ ] Scoped commits/push, documentation and verified Android release complete.

## Plan

1. Reproduce, investigate recovery limits, and specify safe merge semantics.
2. Ready design, implementation, data-loss/conflict regression coverage.
3. Review, verify, document and release under standing authorization.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Cause | Matching week overwrites existing `days` array in local import | Confirmed from source |
| Actual user device | Android Thursday day note, user report | Not inspected |
| Reproduction before fix | Real export → save Thursday day/section note → older Merge | Both failed: written text became empty |
| Product/Designer | [Product](../design/2026-10-16-safe-merge-product.md), [ready EN/FA handoff](../design/2026-10-16-safe-merge.md), Docker studio typecheck/build and rendered review | Passed |
| Frontend local | Docker Node24 lint/types, 192 full tests and local-data build | Passed |
| Review correction | Hidden-slot fill disclosure must not require configuration conflict | Fixed; independent review accepted |
| Final targeted checks | Docker lint/types, 26 import tests (including two additional hidden-slot tests), local-data build | Passed; full expected total now 194, exact CI pending |
| Browser regressions | New EN/FA actual file export → Thursday writing → older Merge, conflicts/blank fields/locale/hidden content | All 39 checks passed on corrected exact-source CI, including three new safe-Merge cases |
| Actual app/Designer acceptance | Native Chrome: autosaved Thursday note → older conflicting backup; reopen note and same-week weekly note; EN/FA receipt and language-focus check | Passed: exact note retained, missing weekly text filled; no blocking design difference |
| Initial browser run | [CI 38861399008](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861399008), source `3e3a1a4` | 38/39 passed; EN cold entry checked PIN before async initialization. Test helper now waits for PIN/chooser readiness; app code unchanged. Obsolete unsigned run `38861435808` canceled before signing. |
| Exact-source CI | Frontend `40c3516c7ccd4b3ed056b9227591ca35152fef63`, [CI 38861867772](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861867772) | Fully passed: lint/types, 194 unit tests, local build, all 39 browser checks and Android verification APK/provenance |
| Unsigned candidate/Security | [Stable build 38861893418](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861893418), artifact `12029303458` | Independently passed: exact SHA/code46/name2026.10.29, stable package/local/non-debug, 115 matching web assets, 559 payload entries, expected unsigned state. Original archive SHA-256 `f0e78ec7573ba74aec193bba7ac570a7270d2bfc33eaf8ea82cad890be9e4ab7` |
| Protected signing/final Security | Same stable run, artifact `12030157154` | Passed: pinned v2/v3 certificate, all 559 unsigned payload entries unchanged, only signature metadata added; provenance/checksums match. APK 4,422,272 bytes, SHA-256 `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce` |

## Outcome / Handoff

Safe local Merge committed/pushed as frontend `40c3516c7ccd4b3ed056b9227591ca35152fef63` and accepted in the running app: keep meaningful device fields/whole conflicting records, fill empty Planner fields, add distinct records and disclose affected categories. The latest stored data is read immediately before synchronous merge/commit; primary normalization writes are deferred to the rollback-managed commit. Replace remains incoming restoration. Preimport snapshot/history and per-field conflict wizard were explicitly deferred; there is no retroactive recovery for the user's overwritten note from an export that predates it. Exact-source CI passed all 194 unit and 39 browser checks. Android 2026.10.29/code46 unsigned/final artifact Security, protected signing and provenance passed; lead approved publication. Public APK verification remains pending. Released 2026.10.28 remains unsafe until the correction is published. Task-owned previews stopped; dependency volume and synthetic fixtures retained.
