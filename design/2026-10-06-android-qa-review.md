# QA: Android implementation and design comparison

Reviewed: 2026-10-06. Target: frontend `ab37ee8`, Android local-data release `2026.10.4` (code 21). Scope: audit and design references; no application changes or device data mutations.

## Decision and evidence boundary

The seven routes exist and match the documented product boundaries. Recent Planner handoffs have targeted application evidence. The all-route studio remains a structural reference: it cannot certify persistence, navigation, Android behavior, complete state coverage, or exact responsive/copy fidelity. Android is the current product target; Django behavior is not the acceptance target for this audit.

- **Source:** current route components, local stores, `ScreenPreview.tsx`, `atlas-data.ts`, `variants.ts`, and linked handoffs were compared. Source confirms deterministic handler risks below; their proposed reproduction steps were not executed against user data.
- **Fresh browser:** read-only access to all seven routes at `http://127.0.0.1:3010/` in the existing Persian/dark state; Planner inspected at 390×844 and default wider viewport. Confirmed rendered route controls and baseline states. Did not unlock finance, save edits, delete, import, share, or alter language/theme preferences. This does not rerun the full EN/FA light/dark interaction matrix.
- **Prior evidence:** the linked Planner and app-wide dark handoffs record EN/FA phone/wide/light-regression checks and screenshots. Their evidence is historical, not a fresh test by this reviewer. The running preview's build identity was not independently hashed against the APK; source HEAD is `ab37ee8`.
- **Native Android:** no new install, upgrade, physical keyboard/back, share, notification, TalkBack, or device restore test. Device acceptance remains pending. Browser rendering cannot resolve those checks.

## Seven-route comparison

| Route | Implementation/design comparison | Acceptance boundary and remaining gap |
| --- | --- | --- |
| Planner `/` | Current source and fresh phone view retain compact section disclosures, growing writing fields, manual save, independent day collapse, minimize-all, full writing, schedule and template flows. Matches [Calm Planner](2026-10-04-planner-calm-flow.md), [day minimization](2026-10-06-planner-day-minimization.md), and [shared dark palette](2026-10-06-planner-shared-dark-palette.md). | Generic populated Planner stories predate shipped refinements; use dedicated stories for those behaviors. Optional per-day dirty cue is not an implementation failure: handoff explicitly permits omission without reliable tracking. Native keyboard/save-bar/back and all-ten-slot review remain. |
| Ideas `/ideas` | Writing field precedes optional sparks; note collection, edit/branch/delete/search are present, matching [writing flow](2026-10-01-idea-space-composer.md). Fresh browser shows composer, search and saved-note actions. | Recovery is partial: new-note body only; no edit draft or restored branch identity. See QA-1/2. Generic story controls and abbreviated text are illustrative. |
| Timer `/timer` | Focus/rest, remaining time, paused/resume/reset, progress and configurable lengths are present. Fresh browser showed a restored paused timer. The refined studio hourglass direction matches implementation. | Static running/paused/completed stories are layout references; they do not prove deadline recovery, suspension or explicit next-phase behavior. No planner-minute logging or background completion alarm is promised. |
| Summaries `/summaries` | Fresh UI shows one month-count selector (1/3/6/12), empty-week toggle, current-week cue and section details. Source matches the [baseline brief](2026-10-01-planner-timer-summaries-baseline.md). Designer corrected populated and empty reference controls this turn. | QA-4 resolved in reference source. Variable slots and long-content/browser failure/native enlarged-text states remain incompletely represented. |
| Finance `/finance` | Fresh browser shows PIN lock and local no-encryption notice. Source matches goal/add/edit/delete flow in [finance brief](2026-10-01-finance-baseline.md). | Immediate delete is documented shipped behavior, not a deviation from an approved redesign. QA-3 is a safety refinement candidate. Static currency/sample dates do not establish actual Shamsi formatting or financial calculations. Unlocked states were source-reviewed only this turn. |
| Export `/export` | Fresh browser shows unencrypted-backup notice, report/backup distinction, inclusive dates, planner defaults, finance off, disabled dependent income notes, preview and separate ChatGPT link. Matches [export brief](2026-10-01-export-report-import-baseline.md). | Locked report still available is important: generic lock reference must not imply whole-page inaccessibility. Merge/replace, schema-5 saved Ideas and native share/restore require execution evidence. Full replace warning must use production copy and all affected data categories. |
| Settings `/settings` | Fresh UI shows ten stable slots, four active, single Save and opt-in notification/time. Source matches [settings brief](2026-10-01-settings-baseline.md). | Four-slot studio sample is a declared simplification, not a product limit. Native permission denial, notification delivery, last-active rule, unsaved back, long labels and keyboard reach need complete states/execution. |

## Findings and smallest follow-ups

### QA-1 — High: selecting Edit or Branch can displace unsaved Idea writing

Affected area: `smart-paper-front/src/components/idea-space.tsx:102` (`editNote`) and `:113` (`branchFrom`), draft effect `:52`.

Reproduction to execute in disposable local test data:

1. Save note A. Type new thought B in the composer without saving.
2. Tap Edit on A: B is replaced with A. Saving A or cancelling clears the composer; the draft effect then removes B's stored draft. B is not reachable through the UI while editing.
3. Repeat with B, then tap Branch on A: composer clears immediately; the non-edit draft effect removes the stored draft.
4. Repeat while editing A with unsaved changes, then select another note's Edit/Branch: unsaved edit is replaced immediately.

Expected acceptance for a reliable capture flow: an explicit keep/discard decision, or preserved recoverable writing, before another action replaces dirty composer content. Actual source has no dirty guard in these handlers. This is an existing product risk; the visual-only Ideas handoff preserved existing storage and did not approve a new guard. Smallest follow-up: Product/Designer define the displaced-draft decision and recovery state before frontend changes. Test each transition, cancel/save and failure in EN/FA.

### QA-2 — Medium: interruption recovery loses branch context and unsaved edits

Affected area: `idea-space.tsx:38–58`, initial `editingId`/`parentId` state, and `saveNote`.

Steps: branch from saved note A → type B → navigate away/reload → return → save the restored B. Expected recovery for a branch is B with its relation to A. Actual persistence stores only B's string body; `parentId` starts null, so saving creates an independent note. Edit A → change body without Save → leave/return: changes are not persisted because the effect skips `editingId`; a previously stored new draft may reappear instead. Saved A remains intact.

Source-confirmed; not executed on device. The current general draft-recovery description must be qualified as **new-note body recovery only**. Smallest follow-up: specify body/mode/origin recovery, missing-parent/deleted-note handling, explicit Save semantics and storage failure; avoid silently treating an edit as a new note. Designer corrected the studio edit copy this turn: it now requires Save and states that unsaved edits are not recovered after reload. Source reinspection confirms that reference fix; the production recovery risk remains. This should not imply global autosave.

### QA-3 — Medium candidate: income deletion has no confirmation or undo

Affected area: `finance-view.tsx:210` and history Delete button; `local-store.ts` `deleteLocalIncome` filters and persists the entry collection.

Steps in disposable local data: unlock Finance → add entry A → tap its Delete. Expected safer behavior, if approved: confirmation or a recoverable undo before permanent removal. Actual: delete handler calls the store immediately; no confirmation/undo state. An external earlier backup is not in-product undo and may omit recent work.

Matches the source-derived Finance baseline; no approved design violation is claimed. Smallest follow-up: Designer/Product choose whether confirmation or recovery fits Android use. This audit must not change records or silently implement a new deletion contract.

### QA-4 — Medium design fidelity: Summaries reference invented a date-range interaction

Affected area: `design/studio/src/atlas-data.ts` Summaries EN/FA content originally showed From month/To month; shipped `week-summaries-view.tsx` and fresh browser show a single month-count selector.

Steps: open Summaries populated/empty stories in EN/FA; compare the filter region with the running route. Expected current-behavior reference: single 1/3/6/12 month control and empty-week toggle. Actual pre-refactor story had two fields, implying a capability absent from the shipped UI. **Resolved in the reference refactor:** populated atlas and empty variant now name the single month-count selector; `VariantScene` renders its 1/3/6/12 choices. QA source reinspection confirms the corrected mapping. Designer owns final build/visual validation. No new frontend range feature is warranted.

### QA-5 — Low design fidelity: state sketches are not final-copy or dialog specifications

Affected area: generic `VariantScene` and atlas content. They use fabricated sheets for native `window.confirm`, a combined Ideas edit/branch scene, abbreviated save labels and only selected Settings slots. Some fields are generic text inputs where production uses multiline/numeric controls. These are acceptable as explicitly illustrative structural previews, but insufficient as implementation handoffs. Keep that limitation visible; do not certify these stories as exact visual/interaction matches. Full state/copy refactoring requires source and running-app comparison per route.

## Native acceptance matrix

Execute each row in **EN light, EN dark, FA light, FA dark**, using disposable data and an external verified backup first. Current result for all rows: **pending native execution**. Record Android/version, APK revision, viewport/font size, exact steps, expected/actual, screenshot and recovery outcome. Physical checks remain recorded follow-ups under standing release direction.

| Area | Save/restore and interruption acceptance | Back/keyboard/accessibility acceptance |
| --- | --- | --- |
| Install/upgrade/offline | Upgrade existing app without clearing data; cold-start offline retains saved weeks, slots, Ideas, finance and Timer state. Verify external JSON schema-5 backup restores saved notes/branches and financial records; do not assume composer drafts are backed up. | Android system back/gesture, app suspension and process recreation do not silently imply saved drafts. |
| Planner | Edit long goal/note/minutes, collapse all, Save while hidden, reopen and relaunch; edits during Save remain unsaved. Exercise failed-save retry, templates and timed entries. | Keyboard leaves Save reachable; full-writing close returns focus; last day/section reachable with ten slots. Back/navigation and week switch honor unsaved decisions. TalkBack announces actual disclosure states. |
| Ideas | Create/edit/branch/save/search/delete-cancel and interrupted draft return. Record QA-1/2 actual behavior separately rather than passing recovery broadly. | Long Persian composition, caret/multiline, keyboard return, safe areas, system back and TalkBack names/focus. |
| Timer | Start/pause/resume/reset, suspend, return after deadline and explicitly advance. No implied logging or alarm. | Back preserves correct deadline/phase; no accidental reset from settings or phase control; progress has accessible text. |
| Summaries | Month count, empty-week visibility, current week and ten-section totals reflect saved Planner data after relaunch. | Long mixed text, enlarged type, scrolling and RTL controls remain readable. |
| Finance | Wrong/correct PIN, goal/save/add/edit validations, deletion risk, relock and restored backup accuracy. | Keyboard retains error/save context; accidental delete protection status recorded; PIN notice and amount/date readable to TalkBack. |
| Export/restore | Save backup outside app; inspect file; native share success/cancel/error; merge/replace confirmation cancel and restore of disposable data. Report finance stays opt-in; report is not a backup. | File picker return/cancel, native share sheet, Android back, filenames/ISO date LTR inside FA and destructive warning reachability. |
| Settings/notification | One active minimum, blank label, ten slots, Save/relaunch, opt-in/out and permission denial; verify actual notification on device. | Keyboard and time picker do not hide Save; back warns on unsaved changes; checkbox labels and focus remain identifiable. |

Review links: [Product](2026-10-06-android-product-review.md), [Designer](2026-10-06-android-design-review.md), [personal systems observations](2026-10-06-personal-systems-review.md).
