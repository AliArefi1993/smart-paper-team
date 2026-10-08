# Design: Preserve saved week templates during Merge

Status: ready for implementation
Updated: 2026-10-08
Owning frontend: `src/components/export-view.tsx`, `src/lib/local-store.ts`
Design type: proposed data behavior correction; existing screen and copy retained

## Problem and evidence

The Export screen defaults to **Merge / upsert**. Existing English copy says “Merge keeps existing data”; Persian says «ادغام داده‌های فعلی را نگه می‌دارد». Code review of `importLocalExportPayload` found that an incoming `week_templates` array replaces the whole saved list in either mode. Unrelated saved templates disappear, including all saved templates when the incoming list is empty. This violates the existing interaction promise. This review concerns local-data mode; it does not certify Django import behavior.

Sources: [product contract](../PRODUCT.md), [data safety task](../tasks/2026-10-08-android-data-safety-validation.md), [foundations](foundations.md), and current frontend Export/import source. The current [Export studio baseline](http://localhost:6006/?path=/story/shipped-baselines-export--overview) is structural and does not exercise persistence.

## Outcome and scope

Merge preserves existing templates whose stable IDs are absent from the backup, adds incoming IDs, and replaces the complete record for a matching ID with the incoming version. Replace continues to keep only incoming records after the existing destructive confirmation. No new screen, copy, confirmation, counter, token, or migration is needed.

Acceptance:

- Saved IDs 1 and 2 plus incoming IDs 2 and 3 produce IDs 1, 2 and 3 in Merge; ID 2 contains the incoming record.
- Empty or absent incoming templates leave all saved templates intact in Merge.
- Replace produces only incoming templates; empty or absent incoming templates clear saved templates.
- Validation failure and cancelled Replace preserve existing data; existing loading/error/success feedback and import gating stay intact.
- Regression tests verify template content, uniqueness by stable ID, and unchanged Replace behavior. Existing validation remains authoritative for supported IDs/payloads.

## Design direction and layouts

Retain the current hierarchy: import explanation, Merge/Replace radio controls, file choice, then existing loading/error/success feedback. Match by ID, never by name; two distinct IDs with the same name remain distinct. Incoming-wins matches the current upsert interpretation and requires no conflict dialog. No additional merge confirmation is warranted for this bounded correction.

The editable [outcome story](studio/src/stories/TemplateMergeSafety.stories.tsx) deliberately shows sample records outside the production screen. Labels such as “After fix: Merge” / «پس از اصلاح: ادغام» are review annotations, not application copy. Existing `phone`, `wide`, `body`, `box`, ink/surface/border tokens and RTL Vazirmatn are reused. No app layout or visual divergence is proposed.

Story exports:

- [EnglishPhone](http://localhost:6006/?path=/story/proposals-template-merge-safety--english-phone), [PersianPhone](http://localhost:6006/?path=/story/proposals-template-merge-safety--persian-phone)
- [EnglishWide](http://localhost:6006/?path=/story/proposals-template-merge-safety--english-wide), [PersianWide](http://localhost:6006/?path=/story/proposals-template-merge-safety--persian-wide)
- [EmptyMerge](http://localhost:6006/?path=/story/proposals-template-merge-safety--empty-merge), [PersianEmptyMerge](http://localhost:6006/?path=/story/proposals-template-merge-safety--persian-empty-merge)

Phone and wide boards wrap long EN/FA names; ID values use `bdi` to isolate mixed direction. Semantic headings/lists communicate results without color alone. The board has no interactive controls. Production keyboard focus, labels, touch targets and screen-reader feedback are unchanged; their existing shortcomings are not certified or expanded by this handoff. No new empty/loading/error/offline UI is introduced. Empty input is a persistence case; it is not a new empty screen. Replace confirmation remains the destructive state.

## Implementation handoff

Only template-list construction in local import changes. Preserve all unrelated collections and their existing semantics. Keep complete incoming records, not partial field merging. Tests are authoritative for data outcomes; story data are illustrative. No unresolved interaction or language decision remains. Designer recommends implementation: the interaction and language decisions are resolved, and bounded studio rendering/checks passed. The lead owns integration and data-outcome verification.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current behavior and bilingual promise | Read Export component, i18n, local import and validator source; compared structural Export baseline | Source comparison passed; running structural EN/FA Export baseline inspected with CUA. Production runtime not exercised; no layout/copy change proposed. |
| Studio typecheck/build | `docker run --rm -v "$PWD/design/studio:/app" -w /app node:24-bookworm sh -c 'npm run typecheck && npm run build'` passed typecheck; Docker build hit existing native-binding mismatch. Host `npm run build` with existing dependencies passed (Node 25.2.1); no host install | Passed with environment limitation |
| EN/FA phone/wide, realistic long names, empty/destructive outcomes | CUA screenshots and accessibility trees inspected on 390px phone and 680px wide boards in EN/FA; long names wrap, Merge retains ID 1, matching ID 2 updates, Replace contains only incoming; bilingual empty-input stories inspected | Passed for structural outcome boards |
| Accessibility | Semantic headings/lists, isolated IDs, existing tokens; no new app controls | Semantic review and rendered legibility passed; font enlargement and native screen reader remain unexecuted |
| Android/TalkBack | No physical device available in this delegated design work | Unverified; remains a follow-up |

This is not a claim of validated native Android behavior or transactional resilience during storage failures.

Studio environment limitation: existing dependencies contain host native modules; Docker Storybook build misses `@oxc-resolver/binding-linux-arm64-gnu`. Isolated Docker `npm ci` also reports existing lockfile omissions for `@emnapi/core` and `@emnapi/runtime` 1.11.3. An ephemeral `npm install --no-package-lock` attempt was stopped after the host build succeeded; no package or lockfile edits were made. Build output and preview are generated artifacts, not committed source. The task-owned local preview was shut down after inspection.
