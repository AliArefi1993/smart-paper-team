# Product brief: fewer save actions on Android

Status: approved bounded scope implemented; frontend `45d4130`, Android `2026.10.5`
Updated: 2026-10-06
Owning route: Planner `/`; all seven routes assessed for save semantics
Design type: proposed change to shipped Android/local-data behavior
Local studio: Designer to link affected bilingual stories in its handoff

## Problem and evidence

The user says the save controls are poorly designed and asks whether some can disappear through automatic saving. The job is to enter and revise a personal plan on a phone without repeatedly managing persistence or losing writing when moving between days and pages.

Observed source facts: [Planner](../smart-paper-front/src/components/weekly-planner.tsx) has a desktop Save Week, phone Save Week and Save and Next Day, full-writing status, keyboard save shortcuts, and a dirty-week switch dialog. Schedule Save validates a separate modal draft and only then changes the week. [planner-store](../smart-paper-front/src/lib/planner-store.ts) routes week saves to synchronous local persistence wrapped in an async interface for Android, or an asynchronous Django PUT. Current revision checking protects newer edits during an in-flight save, but does not itself implement automatic saving. [PRODUCT](../PRODUCT.md) currently documents manual saving; the new user instruction supports changing that boundary after a ready design and verified implementation.

The Android local-data app is primary, per [STATUS](../STATUS.md). Source review supplies behavior evidence, not phone usability measurements. Designer/QA should attach running-app English/Persian evidence. **Needs confirmation:** how often users miss Save or abandon partial entries; no analytics or user research establishes frequency. The explicit complaint supports reducing unnecessary routine controls without inventing that frequency.

## Seven-route save decision matrix

| Route and current operation | Product decision | Reason and source evidence |
| --- | --- | --- |
| Planner: week/day/section writing and minutes; Save Week, Save and Next Day | Automatically persist committed week edits in local mode; remove routine Save Week and separate day movement from persistence | Existing ordinary editable state, central phone workflow; multiple explicit persistence affordances. Preserve immediate feedback and failure recovery. [Planner](../smart-paper-front/src/components/weekly-planner.tsx), [local-store](../smart-paper-front/src/lib/local-store.ts) |
| Planner: schedule modal Save; Save as Template; apply/delete template | Keep explicit commands; Designer can make their intent clearer | Modal Save validates title/time and commits a draft; template creation creates a named reusable object, applying changes a whole week. Do not auto-create schedule entries/templates from incomplete typing. |
| Ideas: Keep Thought and Save Changes; body-only new draft recovery | Keep deliberate creation/update for this cycle; draft recovery is a separate safety concern | Keep Thought creates a note and clears composer. Current recovery excludes edit body and omits branch/edit context; auto-publishing would create different semantics and could conceal that gap. [Idea Space](../smart-paper-front/src/components/idea-space.tsx) |
| Timer: Apply Durations; start/pause/reset/next phase | Keep explicit Apply and phase commands | Timer state already persists automatically. Applying durations creates fresh timer state and resets the session; automatically applying valid numbers while typing could interrupt focus. [Timer](../smart-paper-front/src/components/focus-timer.tsx) |
| Finance: Save Goal, Add Income, edit Save, delete; PIN/unlock | Retain explicit financial commands; assess clearer action wording/controls | Amount validation, protected access and record creation/update are material actions. Automatically creating income while typing risks incomplete/duplicate records. Goal autosave is plausible later, but less justified than Planner now. [Finance](../smart-paper-front/src/components/finance-view.tsx) |
| Summaries: period selection and navigation | No Save to eliminate | Read-only summary loading; period selection already updates the view. [Summaries](../smart-paper-front/src/components/week-summaries-view.tsx) |
| Export/import: backup/export/share report; restore confirmation | Retain explicit file/share/replace commands | These produce a file, disclose selected data or replace local records; automatic execution on input change would violate user intent. [Export](../smart-paper-front/src/components/export-view.tsx) |
| Settings: Save Settings; language/theme controls | Keep validated batch apply; language/theme already persist independently | Save validates at least one active section and nonblank names, saves sections and notification preferences, then syncs notification permission/scheduling. Autosaving the whole form can commit invalid intermediate labels or initiate permission changes. [Settings](../smart-paper-front/src/components/settings-view.tsx) |

## Options and recommendation

| Option | User value | Risk | Size estimate |
| --- | --- | --- | --- |
| Restyle all Save controls while retaining manual persistence | Improves affordances, keeps established semantics | Low, but keeps routine save burden | Small–medium |
| Android/local Planner automatic persistence with accurate status and retry | Removes repeated saving from the primary planning workflow | Moderate: lifecycle loss, stale writes, storage failure and navigation need explicit handling | Medium; recommended first implementation cycle |
| Automatically commit every form across all routes | Broad theoretical reduction in actions | High: financial duplicates, timer resets, partial settings and accidental note publication | Large; unsupported as one cycle |
| Ideas contextual draft recovery first | Valuable source-confirmed protection for writing | Moderate: legacy drafts, branch/edit context and displacement | Small–medium; separate follow-up, not a prerequisite for bounded Planner work |

Recommendation: implement local Planner automatic persistence after Designer marks the handoff ready. Review all seven route controls for meaning, but keep persistence changes bounded to Planner and its copy/status/navigation; do not turn this into seven simultaneous persistence redesigns. Consistent presentation of the remaining explicit save/apply controls can join the cycle only where Designer supplies a bounded ready handoff and semantics stay unchanged.

The read-only personal-systems consultation supplied by the parent agrees: remove repetitive Planner persistence work, distinguish schedule Add/Apply from saving the week, preserve deliberate Ideas/Finance commits and Timer resets, and treat notification permission as intentional. It flags week identity/newer edits and debounced notification synchronization. These are observations and design constraints, not approval for new integration features.

## Outcome, constraints and acceptance criteria

Success signals: in English and Persian phone use, routine Planner editing requires no Save tap; leaving and returning restores the latest accepted edits; status describes actual persistence; storage failure gives an actionable retry without losing visible writing. Preserve day advancement as a useful command with a label describing movement, if Designer retains it.

1. Local-mode weekly goal/note, day note and section goal/note/minutes persist automatically after accepted edits, including in full-writing mode. Exactly one ordered persistence owner handles changes; newer edits cannot be overwritten or marked saved by an older write.
2. Week selection, app navigation and browser/Android suspension must retain the latest accepted edits. A pending-write strategy must flush or recover drafts before leaving; do not depend solely on a debounce or browser beforeunload, and do not promise crash recovery without evidence. Native Android lifecycle limitations are recorded honestly.
3. Do not write loaded defaults over stored data during initialization or week loading. Writes stay attached to their week; switching week cannot copy a previous week's fields into the destination.
4. Show understandable pending/saving/saved/failure states only when supported by actual persistence results. Initial loading must not claim all changes are saved. Failure retains current text, offers explicit Retry and avoids a repeated automatic-failure loop. Routine Save controls disappear only in the automatic mode; retry remains reachable.
5. Storage failure during departure cannot silently discard writing or navigate under a false success claim. Navigation protection and error recovery must cover route and week changes. Do not describe local saved state as a backup or synchronized data.
6. Schedule modal validation/cancel semantics stay deliberate. Once an entry is explicitly committed to the week, it participates in automatic persistence. Its command should distinguish adding/updating a schedule entry from persisting the whole week. Template create/apply/delete remain intentional commands; existing warnings against replacing populated content remain. Automatic data persistence must not cause notification permission prompts or notification scheduling on every keystroke; preserve deliberate notification opt-in and coalesce synchronization safely.
7. Retain Django mode's manual Save and its current dirty-navigation behavior for compatibility. The automatic-mode copy and behavior must never appear in a manual-mode build. No backend changes required.
8. Designer provides local stories for EN/FA phone status, retry/failure, full-writing, week/day navigation and retained commands, respecting shared Light/Dark tokens, keyboard visibility, accessible status and touch targets. The handoff chooses presentation; Product does not prescribe a layout.
9. QA verifies rapid edits, immediate week/route departure, latest-write ordering, failed local storage/retry, schedule commit/cancel, template actions and read-back through Summaries/backup. Relevant automated checks pass, with no unresolved critical/high review findings; native Android/TalkBack gaps remain named release follow-ups under standing authorization.

Non-goals: backend autosave, sync/accounts, changing backup schema, publishing Ideas drafts, automatic income creation, timer phase automation, automatic exports/sharing/restores, notification permission changes on typing, or a new routine dashboard. Update PRODUCT/feature/STATUS and release notes only after verified implementation changes behavior.

## Verification and ownership

Product: source-backed scope and criteria. Designer: running-app assessment, interaction/story design and readiness. Frontend: safe local persistence and compatibility. QA/reviewer: independent behavior, ordering and failure checks. No application code changed by this brief.

| Check | Evidence | Result |
| --- | --- | --- |
| All seven route semantics | Linked frontend components/store above | Source assessed |
| User direction | Current save-controls/autosave request | Explicit |
| Personal-systems input | Read-only report passed by parent; recommendations summarized above | Incorporated |
| Running-app visual review | [Designer](2026-10-06-save-controls-design.md), [QA](2026-10-06-save-controls-qa.md) | All-route baseline assessed; bounded final EN/FA Planner comparison passed |
| Implementation and Android release | [Task](../tasks/2026-10-06-save-controls-autosave.md), [release record](../releases/smart-paper-v2026.10.5.md) | Implemented/validated; signed APK verified |
