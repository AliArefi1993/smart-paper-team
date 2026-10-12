# Task: Make Finance optional and hidden by default

Status: implementation accepted; publication verification pending
Created: 2026-10-07
Updated: 2026-10-12

## Objective

Keep Planner central by removing Finance from the default experience. Users can deliberately enable Finance when they want it; pause further Finance feature expansion.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; product contract: [PRODUCT.md](../PRODUCT.md).
- Maintainer direction from 2026-10-07; implementation is now authorized by the 2026-10-12 sequential backlog-clearance request.
- [Product brief](../design/2026-10-12-finance-visibility-product.md) recommends this as the next bounded visible improvement after framework refresh. Change PIN needs a larger credential/recovery contract.

## Acceptance Criteria

- [x] Finance is hidden from default navigation for new users and can be enabled/hidden through a discoverable setting.
- [x] Enabling/hiding persists locally across restarts and works offline.
- [x] Hiding never deletes finance records, goals, or backup/export access; re-enabling restores access with existing protections.
- [x] Apply the Product upgrade rule: explicit preference wins; absent preference retains visible Finance when its local storage key exists, otherwise defaults hidden. Preserve even empty/damaged saved Finance records without inspecting amounts to infer intent.
- [x] Hidden direct routes explain how to enable without revealing records or granting unlock; all existing Finance navigation links follow the preference. Designer defines interaction with unsaved settings/Finance edits.
- [x] Storage failure does not falsely report success or erase data; JSON import preserves explicit visibility choice, and hidden Finance remains accessible through Settings and existing unlock-gated backup/import/report flows. Visibility stays outside JSON schema 5 in this cycle.
- [x] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
- [ ] Relevant automated checks, independent review, documentation and validated Android release workflow are completed when implemented.

## Non-Goals

- New finance capabilities, budgeting, accounts or backend work.
- Change PIN, encryption, Timer visibility or new backup schema.

## Plan

1. Product confirms open scope/acceptance decisions; inspect current owning-repository behavior when this task starts.
2. Designer reviews current behavior and saves a ready bilingual design handoff.
3. Implement the bounded change, test/review/fix and verify data preservation and offline behavior.
4. Update durable product/status documentation and release after validation under the existing workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Direction | Maintainer discussion on 2026-10-07 | Recorded as future work |
| Product/source review | Local Finance key/default/session, existing navigation and backup/import paths; linked Product brief | Ready for Designer |
| Implementation checks | Frontend Node 24 Docker: all 102 tests, ESLint, TypeScript, local-data static build | Passed; Security and final Designer/browser review accepted; hosted release checks pending |

## Frontend Implementation Evidence

- Added a device-local visibility store outside `local-store.ts`; fresh installs persist hidden, existing Finance-key installations default visible by key presence, and malformed/unavailable storage remains recoverable. Explicit state is retained through imports and reloads; no Finance data or PIN/session code is used to resolve visibility.
- Settings updates visibility immediately in its own card without changing Planner/notification drafts. Finance links in Planner, Summaries, and Export wait for initialization and follow the preference. A hidden direct route offers a Settings link; Finance bootstrap remains behind the visibility decision and its existing PIN/session gate.
- Export remains available and explains that hiding does not remove Finance from backups. After a successful local import, the recovery hint follows the current visibility snapshot and appears only while Finance is hidden. JSON schema 5 and local Finance data writes are unchanged.
- Browser evidence: [implementation review](../design/evidence/2026-10-12-finance-visibility/implementation/README.md), including maintainer Cancel preserving a Settings draft, fresh hidden default, saved-record upgrade, EN/FA Light/Dark phone/wide, PIN retention, hidden Export backup/Merge and live recovery hint.
- Independent Security accepted final source and the controlled-clock expiry witness with zero post-expiry income appearances; no unresolved actionable finding. Final Designer accepted corrected backup/PIN copy and actual 1280px evidence.
- Validation: 102 tests, ESLint, TypeScript and local-data build passed. Copy-only correction passed lint/types/build; exact-source hosted verification and independent signed APK review remain pending.
- Local previews are temporary task-owned processes; closeout verifies cleanup after browser consumers finish.

## Decisions And Risks

- Designer owns control placement and unsaved-change interaction. Product recommends the bounded key-presence upgrade fallback in the linked brief.
- Finance feature expansion is paused; this does not preclude necessary data-safety fixes.
- Design: ready bilingual handoff and final implementation review accepted; native/TalkBack remain unverified.

## Outcome / Handoff

Frontend behavior and final copy are accepted. Frontend initial commit `f7e8297` includes Android 2026.10.19/code36; final copy commit `c0ada332093baea9ff2d0b83a953d37642a037f8` passed CI `38276109486`. First stable run `38276691881` failed an upstream Google Maven `lint-checks-31.13.0.jar` HTTP 503; retry `38277577658` passed unsigned assembly and candidate verification, then received protected signing approval. Candidate artifact `11760645019`, original archive SHA-256 `57d77400edcbe20f2f6c549c6fbdd8bb3dc8568567bd3b37daaba6b48845bb90`, matches source/version and 113 packaged web assets. Signed artifact review passed: independent Security accepted one stable v2/v3 signer, identity/code36, provenance, 557 payload entries and 113 web assets; no actionable finding. Publication/public checksum remain required. Do not mark shipped until independent artifact review, publication and public checksum verification pass. Backend stays paused; Timer remains available.
