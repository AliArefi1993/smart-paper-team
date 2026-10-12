# Task: Upgrade the offline XLSX writer

Status: in progress — release publication pending
Created: 2026-10-12
Updated: 2026-10-12

## Objective

Replace the stale registry XLSX writer with the evaluated official vendored SheetJS CE candidate while preserving the existing offline six-sheet export contract.

## Context

- Third step of [sequential backlog execution](2026-10-12-backlog-clearance.md).
- Owning implementation repository: `smart-paper-front/`.
- [Evaluation and implementation handoff](../docs/spreadsheet-writer-evaluation.md); existing ZIP/XML regression tests at frontend `ea05f16`.
- Vendor installation guidance rechecked 2026-10-12: https://docs.sheetjs.com/docs/getting-started/installation/nodejs/ still identifies 0.20.3 and recommends vendoring.

## Acceptance Criteria

- [x] Official tarball version, origin, SHA-256, license and npm integrity recorded; Docker clean install resolves vendored package.
- [x] Six-sheet headers/order, text/numeric values, Persian/escaping and formula-like text compatibility pass independent ZIP/XML tests.
- [x] Filename/MIME, locked and expired Finance denial, late writer failure non-mutation and bounded synthetic larger export verified.
- [x] Docker clean install, lint, TypeScript, tests, local production build and audits recorded; remaining advisories stated accurately.
- [x] Independent Security/code review reported no actionable security/code finding.
- [x] Exact-source CI, protected signed Android artifact and independent provenance review passed.
- [ ] Team tag publication and anonymous public APK download verified.
- [x] Durable docs and task/backlog status updated.

## Non-Goals

- Backend work, new export formats, UI/copy changes or runtime CDN access.
- Claiming a clean audit because a vendored package is absent from registry advisory results.
- Inferring physical-device spreadsheet rendering or chooser behavior from automated tests.

## Plan

1. [x] Vendor official pinned package and preserve adapter; reuse existing relevant regressions and fill demonstrated gaps.
2. [x] Validate in Docker; independent Security/code review completed with no actionable finding.
3. Commit/push accepted source; verify exact-source hosted checks, protected signing, independent Security review and public release.
4. Update docs and sequential task tracker.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Official vendor guidance | Rechecked official installation page on 2026-10-12 | 0.20.3 candidate and vendoring confirmed |
| Tarball provenance | `vendor/README.md`, copied Apache-2.0 license, SHA-256 `8dc73fc3b00203e72d176e85b50938627c7b086e607c682e8d3c22c02bb99fe8`; lock SHA-512 matches tarball | Verified; Security independently streamed and matched official origin |
| Clean install, lint, TypeScript, tests | Docker Node 24 `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test` | Passed; 90 tests |
| XLSX-focused regression | Docker Node 24 `node --test tests/export-xlsx-regression.test.mjs` | Passed; 5 tests. Year-sized 52-week, 10-section, 3-event/day workbook: 213 ms and 1,846,021 bytes in this run |
| Local production build and offline bundle | Docker Node 24 `NEXT_PUBLIC_DATA_MODE=local npm run build`; searched `.next/static` for XLSX CDN references | Build passed; no runtime XLSX CDN references. Export component JS chunks grew from 440,096 to 522,249 raw bytes (+82,153 / 18.7%) |
| npm audits | Baseline full install: 21 (1 low, 4 moderate, 14 high, 2 critical); candidate full: 20 (1 low, 4 moderate, 13 high, 2 critical). Candidate production: 6 (1 moderate, 4 high, 1 critical) across baseline-browser-mapping, nanoid, next, postcss, sharp, source-map-js | One high-severity package finding removed from full and production audit views; remaining findings are unrelated dependencies. Vendored package absence from registry results is not a safety proof |
| Independent review and release | Security/code review of source/tests completed; exact-source CI, protected signing and artifact review | No actionable security/code finding; release gates pending lead acceptance |
| Exact-source hosted checks | Frontend CI [38209364570](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38209364570); protected stable build [38209384856](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38209384856) | Both succeeded for frontend `41e6b2e4daf4f5d67529a6d0fb97430ae5c90163`, versionCode 34/name `2026.10.17` |
| Independent artifact review | Candidate artifact `11728887296`; final artifact `11729141851`; provenance in [release record](../releases/smart-paper-v2026.10.17.md) | Security accepted signer, identity/version, all 581 candidate payload entries, 137 web assets and bundled SheetJS 0.20.3; no actionable artifact finding |
| Public artifact | [Android 2026.10.17](../releases/smart-paper-v2026.10.17.md) | Pending team tag and anonymous download |

## Decisions And Risks

- Design: not applicable; dependency-only change must preserve user-visible behavior.
- Backend remains paused; framework advisories are a separate next step.
- Physical phone chooser, spreadsheet rendering and low-memory behavior remain follow-ups.

## Outcome / Handoff

Implemented as frontend `41e6b2e4daf4f5d67529a6d0fb97430ae5c90163`. Exact-source checks, protected signing and independent Security review passed. The signed release record and APK are ready for publication; public download verification remains open. Physical-device chooser, spreadsheet rendering and low-memory behavior remain unverified; backend work remains paused. No persistent background processes were started.
