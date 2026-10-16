# Design: Preserve current writing during local Merge

Status: brief — ready for Designer
Updated: 2026-10-16
Owning route/component: Android/local `/export`; `export-view.tsx`, `local-store.ts`, `idea-notes.ts`
Local studio story links: Designer to provide
Design type: proposed correction to existing Merge behavior

## Problem and evidence

The user exported a backup, wrote a Thursday **day note** in the Android app, then merged the older backup. The newly written note disappeared. They expect Merge to preserve current writing. This reported sequence is the primary acceptance case.

Source explains the loss: `importLocalExportPayload` spreads the incoming week over its saved match, including the entire days array. The same function also replaces matching template and income IDs, the Finance goal and planner-section configuration. `mergeIdeaNotes` replaces matching Idea IDs. These are observed hazards; no further user losses are claimed. Planner fields have no trustworthy per-field timestamps. An export timestamp cannot establish which version of each field is newer; Idea timestamps also do not establish user intent or reliable device clock ordering.

Sources: `STATUS.md`, `PRODUCT.md` import contract, `src/lib/local-store.ts`, `src/lib/idea-notes.ts`, `src/lib/local-import-safety.ts`, `src/lib/smart-paper-types.ts`. The previous feedback task preserved the old import semantics and did not correct this hazard.

## Outcome and scope

Desired outcome: Merge never silently overwrites current meaningful values. It restores missing/nonconflicting content even within a matching week and explicitly says when backup conflicts were left unapplied. Current-device preference is a safety policy, not a claim that device data is newer.

Success signals: the exact Thursday note survives; distinct incoming notes in the same week appear; every supported local data class has a deterministic collision regression; repeated Merge does not duplicate records. English/Persian users can understand preserved conflicts and retain the incoming backup for unapplied values.

In scope: local safe Merge, truthful conflict outcome and existing Replace safety. Backend remains paused. Non-goals: automatic preimport snapshots/recovery UI, timestamps/migrations for editing, sync, per-field conflict editor, undo history, automatic text concatenation, money/minute summation, guessing deletions, or rewriting existing user notes.

## Options and decision

| Option | Value and risk | Size | Decision |
| --- | --- | --- | --- |
| Skip every existing week | Prevents reported loss but misses unrelated content in that week | Small | Reject |
| Apply incoming version after a generic warning | Retains the demonstrated data-loss risk | Small | Reject |
| Keep device conflicts, fill blank planner fields, add distinct records; disclose conflicts | Preserves writing and useful incoming content with a deterministic policy | Medium | Recommend |
| Full per-field choice/comparison tool | Flexible but large and easy to misresolve on phone | Large | Defer |

Product decision: implement the recommended deterministic policy. Conflict resolution for this cycle is **keep the device value**. No extra confirmation is needed for non-destructive Merge. Replace remains the deliberate destructive alternative with its existing confirmation; do not recommend it casually to resolve a single conflict.

## Recommended implementation contract

Compare normalized user-authored values, excluding derived labels/totals and record ordering metadata. Never use import order, array position or export timestamps to choose a winner. Existing identities remain authoritative. Blank incoming values never erase a saved meaningful value.

| Data | Safe Merge rule |
| --- | --- |
| Weeks/days | Match week by start date and day by calendar date, not array position. Import unmatched valid weeks. For matching weeks, independently merge weekly goal, weekly note, each day note and each section's goal/note/duration. A blank saved text field may receive incoming text; zero saved duration may receive positive incoming duration. If both meaningful values differ, keep saved and record a conflict. Equal values are no-ops. Keep exact saved text, including whitespace, when it is meaningful; whitespace-only is blank. Do not concatenate text or add minutes. |
| Scheduled events | Preserve current events; add distinct incoming identities. Equal matching records are no-ops. A same-ID event with differing user-authored fields is a conflict: preserve the complete current event. Deduplicate an identical event with a different ID by its full user-authored content, so reimport does not inflate it. Distinct events may overlap in time; overlap alone does not justify deleting or replacing either. |
| Week templates | Add unmatched IDs. A matching equal template is a no-op; differing same-ID templates retain the complete saved template and are disclosed as conflicts. Templates are reusable named records; do not silently synthesize a hybrid template or rename/re-ID a conflicting copy. Nonconflicting additions elsewhere in the backup still import. |
| Ideas | Add unmatched IDs; keep equal matching content. Differing same-ID note body or parent relationship retains the complete current note and is disclosed. Do not infer recency from timestamps, generate duplicate copies or relink branches. New children referencing a kept existing parent retain that identity. Timestamp-only differences must not overwrite existing timestamps or produce duplicate notes. |
| Income | Add unmatched IDs; equal matching amount/date/note is a no-op. Differing same-ID income retains the complete existing entry and is disclosed. Do not field-merge money records or sum duplicate entries. Preserve compatibility for valid legacy entries without IDs: assign a stable retained identity when first imported, and ensure repeat import of the same legacy record does not duplicate it. Do not broaden accepted backup validity. |
| Finance goal | If Finance has never been saved on this device, initialize from incoming. Otherwise keep the current goal, including an intentional zero; disclose a differing incoming goal. Existence must use actual stored state, not the normalized default. |
| Planner section configuration | If the raw configuration key is absent immediately before this import's normalization, initialize from incoming or established defaults. Otherwise retain the complete current configuration, including inactive flags, labels and order; disclose differences from incoming. UI reads currently persist defaults; an already materialized default is treated as existing because there is no provenance to distinguish it. Match section data using existing canonical stable slot identities and legacy normalization. Do not switch labels/visibility to reinterpret saved writing. Imported content for inactive slots remains saved and discoverable through existing section settings; disclose this limitation when relevant. |

Fill-empty applies only to planner text/duration fields with the explicit conventions above. Merge is not a deletion synchronizer: a deliberately cleared field may regain backup content. This is a documented limitation, not an inferred edit history. Needs confirmation: no user preference has been gathered about restoring intentionally cleared fields; the bounded policy favors retaining recoverable content without overwriting meaningful writing.

## Recovery and current-state safety

- Automatic preimport snapshots are deferred by lead scope decision: they add sensitive persistence, quota and recovery lifecycle costs. Conservative no-overwrite Merge prevents this reported loss without that expansion. Preserve the existing manual JSON export and backup warnings. Replace remains destructive and should be preceded by an external backup through the existing flow.
- Retain unapplied conflicting incoming values in the original backup; tell the user to keep that file. Do not expose note bodies in conflict summaries, diagnostics or network requests. No new content archive is required.
- Existing rollback behavior must preserve all primary collections on recoverable write failure. No partial success claim after a failed multi-key commit; preserve the existing truthful rollback-failure error where complete restoration is impossible.
- Read actual current storage immediately before synchronous merge computation/commit, after asynchronous file reading and authorization checks. Do not import against an old screen preview or insert an asynchronous prepared-plan step. Preserve existing atomic rollback; do not claim browser cross-tab transaction atomicity. No partial success claim after a failed multi-key commit.
- The user's already overwritten Thursday note is not reconstructable from an older backup. This fix cannot retroactively recover it. Recovery is possible only if some existing draft, newer external backup or still-retained copy actually contains that writing; do not promise recovery without evidence.

## Acceptance criteria and Designer handoff

1. Exact regression: export a week, write a Thursday day note, Merge that old file. The note is unchanged. A separate incoming nonblank day/section/weekly field in the same week still imports into an empty saved field. Blank incoming notes never erase meaningful current text.
2. Exercise equal/different/empty/absent cases across every row of the contract; include same/different IDs, legacy shape, out-of-window weeks, inactive sections, intentional zero Finance goal, empty backup and repeated Merge. Totals recalculate from resulting durations, never by adding backup totals.
3. Existing receipt distinguishes success with preserved conflicts from full application. Keep incoming backup counts labelled as such. Explicitly say that differing current values were kept and some backup content was not applied, identifying affected categories without exposing contents. No numeric conflict counter is required in this cycle (lead scope decision). A conflict means different meaningful planner values on both sides, a differing complete matching-ID record, a differing persisted Finance goal (zero is legitimate), or different existing section configuration. Empty incoming planner text/duration is normal preservation, not a conflict; equal content and Idea timestamp-only differences are no-ops. Keep the original backup available as the source of unapplied conflicting content.
4. Merge choice copy communicates “Keep saved values when they differ; fill empty planner fields and add missing records.” Remove any promise that matching records/Finance goal are simply updated. EN intent: “Import complete. Some backup values were not applied because saved values were kept.” FA intent: «ورود اطلاعات انجام شد. بعضی مقدارهای نسخهٔ پشتیبان اعمال نشد، چون اطلاعات ذخیره‌شده حفظ شد.» Designer reconciles precise terms with existing translations.
5. EN/FA stories and running QA cover no conflicts, Thursday-note conflict with other content imported, multi-category conflicts, storage rollback, latest current-state reads, cancellation and authorization expiry. Preserve local-only category boundaries, existing filename/mode feedback, keyboard/status behavior and hidden-Finance guidance. Physical device/TalkBack evidence remains separately stated.
6. Replace semantics stay exact incoming restoration after destructive confirmation; Merge omissions/empty collections delete nothing. PIN/session/visibility exclusions, Finance expiry and stale-result suppression remain intact. No new cloud/data transfer behavior.
7. Independent correctness/security review must verify preservation and rollback/current-state behavior before release. Update PRODUCT, relevant feature/status/task memory and tests to supersede the old incoming-wins contract. Previous source acceptance does not certify the new semantics.

Designer owns interaction hierarchy, bilingual studio states and the ready handoff. Product recommends implementation after that handoff; no layout is prescribed here.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Report and collision implementation review | Source paths above; user Android Thursday day-note report | Complete |
| EN/FA design and implemented comparison | Designer handoff | Pending |
| Safety regression tests and independent review | Owning frontend | Pending |
