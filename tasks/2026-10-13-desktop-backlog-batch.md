# Task: Complete desktop backlog confidence work

Status: in progress
Created: 2026-10-13
Updated: 2026-10-14

## Objective

Complete the four desktop workstreams authorized by the maintainer: Persian Idea Space recovery-status correction, meaningful browser integration coverage, the deferred synthetic performance comparison, and bounded bilingual desktop accessibility review with fixes to reproduced issues.

## Context

- Input revisions: team `05c6ce52d9c475167751759ad5882c3504f2e537`; frontend `b5d0b6ddbb1807d3783a90bd119c37b00bb64029`; backend `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2`. All clean at intake.
- [First checkpoint evidence](../docs/evidence/2026-10-13-manual-checkpoint/README.md) reproduced English recovery status on Persian cold entry; draft text remained intact.
- [Accessibility task](2026-10-08-accessibility-persian-phone-review.md), [manual policy](../docs/periodic-reviews.md), [test policy](../docs/ci-local-test-policy.md).
- Design required for app changes; test infrastructure and synthetic measurements have no user-facing design effect.

## Acceptance Criteria

- [x] Ready bilingual Designer/studio handoff precedes app changes; Persian cold entry/reload and switching preserve writing and explain draft state correctly.
- [x] Reproducible browser tests cover cross-route saving, configurable sections and JSON Merge/Replace through UI.
- [x] Small/larger deterministic mixed EN/FA fixtures have three comparable runs, measurements and integrity checks; limits recorded.
- [x] Desktop EN/FA keyboard/focus/names/short-viewport coverage and reproduced defects are recorded separately from native gaps.
- [x] Relevant local checks, independent source review and documentation pass; no unresolved critical/high finding. Hosted exact-source checks remain tied to publication.
- [ ] Scoped commit/push and signed Android release complete for validated user-visible changes, including exact-source CI, protected signing, independent artifact review and public APK verification.

## Non-Goals

Physical connection, native/TalkBack claims, backend/hosted work, new product features, private records or speculative redesign.

## Plan

1. Designer prepares recovery-status handoff and desktop accessibility review; Tester builds independent browser confidence/performance work.
2. Implement only ready bounded app changes, verify browser regressions and compare Designer expectations.
3. Independent review, fix/verify, update durable docs and routine-owned scoped Git/release closeout.

## Verification

- Ready [Designer handoff](../design/2026-10-13-desktop-backlog.md) and four EN/FA phone/wide studio stories passed typecheck/build and visual review. Final production preview confirmed Persian restored text, named keyboard-reachable JSON chooser, and native Templates modal focus/Escape/restore.
- Frontend local commits `a359cad` and `4c9bfad`: Docker Node24 lint, TypeScript, 158 tests and local-data production build passed for app changes. Independent source review found no actionable issue. Final Chrome 155 on macOS: **10/10 Playwright browser flows passed**, including real UI file-input Merge/Replace, cancel, invalid file, both languages and 390×600 changed-control reachability. The Playwright 1.58.2 official Docker image pull stalled; system Chrome was used locally. CI remains configured to use the pinned image.
- [Raw synthetic measurements](../docs/evidence/2026-10-14-desktop-backlog/performance.json): three interleaved runs each, small 4 weeks/20 Ideas/112,337 fixture bytes and large 52 weeks/500 Ideas/1,741,397 bytes. Median milliseconds, small → large: startup 181.8→154.9, offline week switch 72.7→81.3, offline Ideas open 141.9→194.6, offline search 8.4→11.4, offline type/save 726.4→728.1, offline reopen 51.9→47.2. Every run compared all seeded week/day/section/schedule and Idea records and one newly saved Idea. Larger fixture increased offline Ideas opening by about 53 ms in this sample; startup variance makes a speed ranking unreliable. Chrome 155/macOS desktop, warmed routes before offline, fixed UTC date, locator waits and 20 ms/character typing; no device, cold-offline, native lifecycle or promised capacity inference.
- Browser-runner syntax and diff checks passed. Physical Android/TalkBack remain unverified. Task-owned preview container `smart-paper-desktop-preview` on port 3192 is pending cleanup after final browser use.

## Decisions And Risks

Actual phone lifecycle, upgrade/OS transfer, native recipient delivery, notifications and TalkBack remain open. Desktop measurements are environment-specific and synthetic fixture sizes are trial stress cases, not promised capacity.

## Outcome / Handoff

App and browser evidence are locally complete. Frontend commits and team documentation remain local; exact-source CI, protected signing, artifact review and publication await a push. Automatic approval review rejected the scoped fast-forward frontend `main` push despite project standing authorization, and an explicit user approval request is pending. Do not work around that rejection. The next backlog candidate after this release is the observed Export unlock-success localization on EN→FA switch, subject to a new bounded design handoff.
