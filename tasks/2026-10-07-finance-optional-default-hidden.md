# Task: Make Finance optional and hidden by default

Status: Product scoped; ready for Designer
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

- [ ] Finance is hidden from default navigation for new users and can be enabled/hidden through a discoverable setting.
- [ ] Enabling/hiding persists locally across restarts and works offline.
- [ ] Hiding never deletes finance records, goals, or backup/export access; re-enabling restores access with existing protections.
- [ ] Apply the Product upgrade rule: explicit preference wins; absent preference retains visible Finance when its local storage key exists, otherwise defaults hidden. Preserve even empty/damaged saved Finance records without inspecting amounts to infer intent.
- [ ] Hidden direct routes explain how to enable without revealing records or granting unlock; all existing Finance navigation links follow the preference. Designer defines interaction with unsaved settings/Finance edits.
- [ ] Storage failure does not falsely report success or erase data; JSON import preserves explicit visibility choice, and hidden Finance remains accessible through Settings and existing unlock-gated backup/import/report flows. Visibility stays outside JSON schema 5 in this cycle.
- [ ] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
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
| Implementation checks | Frontend Node 24 Docker: 8 focused visibility tests, all 98 tests, ESLint, TypeScript, local-data static build | Passed; independent review and visual QA pending |

## Frontend Implementation Evidence

- Added a device-local visibility store outside `local-store.ts`; fresh installs persist hidden, existing Finance-key installations default visible by key presence, and malformed/unavailable storage remains recoverable. Explicit state is retained through imports and reloads; no Finance data or PIN/session code is used to resolve visibility.
- Settings updates visibility immediately in its own card without changing Planner/notification drafts. Finance links in Planner, Summaries, and Export wait for initialization and follow the preference. A hidden direct route offers a Settings link; Finance bootstrap remains behind the visibility decision and its existing PIN/session gate.
- Export remains available and explains that hiding does not remove Finance from backups. Successful hidden-state imports link to Settings. JSON schema 5 and local Finance data writes are unchanged.
- Browser preview for lead/QA: `http://127.0.0.1:8880/settings`; other routes `/finance`, `/export`, `/summaries`, `/`. The loopback static server is task-owned and still running for review.
- Validation: 8 focused tests and all 98 frontend tests passed; ESLint, `npx tsc --noEmit`, and `NEXT_PUBLIC_DATA_MODE=local npm run build` passed in Node 24 Docker. The production server preview was stopped and verified closed; the current preview serves the built static export.
- Pending: lead/QA browser comparison in English and Persian, independent Security review, task acceptance, and release gates.

## Decisions And Risks

- Designer owns control placement and unsaved-change interaction. Product recommends the bounded key-presence upgrade fallback in the linked brief.
- Finance feature expansion is paused; this does not preclude necessary data-safety fixes.
- Design: required before implementation; Product brief is ready, editable bilingual interaction handoff remains pending.

## Outcome / Handoff

Frontend implementation and automated checks are prepared for independent review. The lead owns visual QA, Security review, final acceptance, root status/roadmap/backlog updates and validated Android release.
