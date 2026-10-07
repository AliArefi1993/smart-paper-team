# Product brief: close actionable Android audit findings

Status: accepted scope; ready Designer handoff implemented
Updated: 2026-10-07
Owning routes: Ideas `/ideas`, Finance `/finance`, Settings `/settings`
Design type: proposed change to Android/local-data baseline `45d4130`, release `2026.10.5`
Local studio links: [ready handoff and bilingual stories](2026-10-06-audit-followups-design.md)

## Problem and evidence

The user now asks to implement all actionable findings and publish Android. The job is to capture and revise private thoughts without losing writing, apply a long settings form without unnecessary return travel, and remove a financial record deliberately.

Observed facts: [audit Product](2026-10-06-android-product-review.md), [QA-1/2/3](2026-10-06-android-qa-review.md), and the supplied [personal-systems observations](2026-10-06-personal-systems-review.md) identify displaced Idea writing, body-only new-draft recovery, skipped edit recovery and immediate income deletion. [Idea Space source](../smart-paper-front/src/components/idea-space.tsx) confirms these behaviors and suppresses draft-storage errors. [save-controls review](2026-10-06-save-controls-design.md) identifies top-only Settings Save and small Finance goal controls as bounded follow-ups; Planner autosave is already shipped per [STATUS](../STATUS.md). QA-4 was corrected in design references; QA-5 requires accurate evidence labels and complete handoffs, not invented application interactions.

Frequency of accidental deletion, draft loss and long-form abandonment is **Needs confirmation**. No usability measurement is asserted; explicit user direction and source-confirmed safety gaps justify this cycle. The personal-systems report is advisory; it does not authorize new integration features.

## Outcome and scope

Desired outcome: existing deliberate note/financial/settings commits remain understandable and reachable, with recoverable contextual writing and accurate failure feedback. Success signals: the transition/recovery matrix passes, Finance cancel leaves the record intact, and Settings can be applied from the end of its full form in EN/FA phone use.

In scope: Ideas dirty-composer protection and contextual draft recovery; local storage error honesty; Finance deletion confirmation; bounded presentation of remaining save/apply controls in Ideas, Finance, Timer and Settings where Designer finds an actual consistency/reachability gap. Settings remains a validated batch operation. Other audit items are evidence/documentation corrections or recorded native validation follow-ups.

Non-goals: cross-route routine integration, new dashboard, accounts/sync/backend work, note auto-publication, financial autosave, timer automation, notification changes during typing, new backup schema, drafts in exports/backups, or a generalized redesign. Preserve Planner autosave and explicit schedule/template/file/share commands.

## Options and decisions

| Decision | User value | Risk | Size estimate |
| --- | --- | --- | --- |
| Ideas: guard displacement plus one contextual draft | Protects existing capture/edit/branch jobs | Recovery migration, missing records, stale edits and storage failure | Medium; recommended required safety work |
| Ideas: multiple draft library | Could retain many unfinished notes | New product surface, retention/privacy choices | Large; unsupported, defer |
| Finance: confirm before deletion | Prevents accidental removal using existing Ideas pattern | One extra deliberate action | Small; recommended |
| Finance: undo after deletion | Allows reversal without preflight friction | Recovery lifetime, reload, relock and persistence complexity | Medium; defer |
| Settings: apply available at end of form | Removes return travel with existing batch semantics | Duplicated actions must share state and validation | Small; recommended functional requirement |
| Settings: sticky dirty summary | Can expose persistence status while scrolling | Keyboard obstruction and more layout/state work | Medium; optional only if Designer establishes need |
| Retained commands: bounded shared styling | Makes primary commit affordances easier to identify and tap | Broad CSS changes can regress route hierarchy | Small–medium; Designer selects affected controls, retain semantics |

Product chooses Finance confirmation and one contextual Ideas draft as the smallest sufficient safeguards. Designer chooses presentation, exact localized copy, placement and reusable tokens; no new visual layout is prescribed here.

## Acceptance criteria

1. Selecting Edit or Branch from any saved/featured note cannot silently replace dirty new, branch or edit writing. Declining the discard decision preserves exact body, mode and origin; approving replaces only the active draft. Cancel/reset of dirty writing is equally deliberate. Unchanged saved edit text need not trigger a warning.
2. Draft recovery preserves new/edit/branch mode, body and target/origin identifiers across route return and reload when storage succeeds. A restored edit remains an edit; a restored branch keeps its origin. Recovery is identified as unfinished writing, never as a saved note. Whitespace and long mixed-script text are preserved until explicit commit validation.
3. Existing body-only drafts recover as new-note drafts. Invalid contextual drafts fail safely without crashing or modifying saved notes; distinguish legacy raw text from malformed structured data. Never overwrite stored draft with empty initialization state.
4. Missing branch parent or edited target produces an understandable recovery decision with text retained. Saving independently requires explicit intent; no silent conversion of an edit/branch into a new note and no nonexistent relation. Restored edits detect a changed original (using saved baseline/version evidence) and require an explicit conflict decision before overwriting; the newest saved body and recovered writing remain available for that decision.
5. Note save/update rereads authoritative saved state as needed so unrelated newer notes are not lost. Only confirmed successful note persistence clears the composer. A failed note write retains text/context and offers a reachable retry. Deleting a note involved in the active draft must preserve recoverable writing or require an explicit discard decision.
6. Draft write/read/remove failures are visible in localized, useful language without raw private contents or misleading saved/recovered claims. Failed draft writing retains visible text and supports explicit retry. Failure plus reload/process termination cannot guarantee recovery; copy names that limit. If a note saves but old-draft cleanup fails, distinguish these results and prevent a stale recovered draft from silently duplicating/replacing the committed note. No private writing enters logs, reports or new telemetry.
7. Finance Delete asks for confirmation before mutation. Cancel keeps record/totals/edit state unchanged; confirm deletes the selected record once using existing store/API semantics. Failure preserves the record and gives existing localized error feedback. No undo promise or financial information outside the unlocked screen.
8. Settings provides a reachable apply action at the end of all ten slots and notification controls, with existing validation, saving/disabled state and success/error feedback. Repeated placements share one commit handler; typing never commits settings or prompts notification permission. Failed/invalid saves retain form input and current dirty protections.
9. Retained primary commit controls use consistent accessible emphasis and adequate touch targets without changing intentional Save/Add/Apply semantics. Preserve hierarchy against destructive and navigation commands, shared Light/Dark colors, RTL logical spacing and wrapping Persian labels. Designer explicitly lists the affected controls in its handoff; no generic styling sweep.
10. Designer compares affected current behavior, supplies editable EN/FA phone stories including displacement, recovered new/edit/branch, missing origin/conflict and storage failure, Finance confirm/cancel, and complete Settings apply state. Check long text, wider layout, keyboard reach, focus, status announcements and target sizes. Ready handoff precedes application work.
11. QA exercises dirty-to-Edit/Branch/cancel transitions, unchanged edits, legacy recovery, route/reload, missing origin, stale edit, storage write/cleanup failure and retry, Finance cancellation/deletion failure, Settings validation and saved read-back. Relevant automated checks and independent review pass without critical/high findings. Physical Android keyboard/Back/process recreation/TalkBack remain named release follow-ups when unexecuted; browser/studio evidence never claims a native pass.

## Handoff and verification

Product owns these scope/criteria; Designer owns complete interaction stories and implementation readiness; Frontend owns persistence/compatibility; QA and independent review own verification. User instruction authorizes implementation after ready design and Android release under standing workflow. No app files changed by this brief.

| Check | Evidence | Result |
| --- | --- | --- |
| Baseline and prior findings | STATUS; linked audit, save-controls and advisory reports | Read; `.5` is baseline, prior `.4` claims historical |
| Source behavior | Idea Space, Finance and Settings owning components | Narrow source inspection confirms scope |
| Brief links and syntax | Repository-relative paths, Markdown structure | Checked locally |
| Interaction/readiness | Designer handoff | Ready; studio typecheck/build and bounded bilingual review passed |
| Implementation/native verification | Owning task/release evidence | Implemented; final release checks recorded in task. Native checks remain follow-ups |
