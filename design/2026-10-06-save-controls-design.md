# Design: Android save controls

Status: implemented; frontend `45d4130`, Android `2026.10.5`
Updated: 2026-10-06
Owning frontend: weekly-planner.tsx and i18n.ts
Design type: proposed change, current running app reviewed; bounded final implementation verification complete
Product: [brief](2026-10-06-save-controls-product.md)
Editable proposal: [component](studio/src/PlannerAutosave.tsx), [stories](studio/src/stories/PlannerAutosave.stories.tsx)

## Evidence and all-page decisions

User dislikes save controls and asks about autosave. Designer inspected actual `localhost:3010` pages at 390×844 phone and Planner at desktop width on 2026-10-06 without saving form data. Source-backed semantics are in Product brief.

| Page | Current phone finding | Decision |
| --- | --- | --- |
| Planner | Fixed footer Save + Next and Save Week even when All changes saved; desktop Save Week duplicates routine persistence | Remove routine local-mode save buttons; keep clear status and Next day navigation. |
| Ideas | Full-width Keep this thought directly after composer | Keep intentional note creation. Contextual draft recovery is separate work. |
| Timer | Apply lengths belongs to session lengths; explicitly resets timer | Keep deliberate Apply; typing must not reset focus. |
| Finance | Small teal Save Goal immediately below goal; Add Income groups with entry | Keep explicit record/goal commit. Consistent larger primary button width is a possible later visual follow-up. |
| Summaries | No save; filter applies directly | No save to remove. |
| Export | Export/share/import are file/disclosure commands | Keep deliberate actions and safeguards. |
| Settings | Save Settings at top of ten sections plus notification form | Keep validated batch save. Long return travel is a follow-up: end-of-form Apply settings or dirty sticky summary requires its own complete form handoff. |

## Approved implementation scope

Local Planner week/day/section writing and minutes persist on accepted changes, including full-writing. Backend mode remains manual. Retain template create/apply/delete commands. Retain schedule modal validation and cancel; create primary label Add event / افزودن رویداد, edit primary Apply changes / اعمال تغییرات. Accepted event becomes part of the automatically saved week; incomplete modal inputs do not.

Remove local desktop Save Week, local phone Save Week and Save + Next. Retain a single secondary Next day / روز بعد button; it only navigates. Moving/collapsing days in the same loaded week remains available during save failure and preserves failed content.

Wide: status below week heading. Phone: compact status in existing bottom region beside one secondary Next day action, using existing safe-area padding. Keep visibility on scroll. Full-writing: retain status near top and accessible error/Retry in current controls. Prototype footer illustrates hierarchy; production should preserve shipped cards/layout and existing fixed footer placement. Keyboard must not obscure active caret or Retry; reuse existing keyboard/viewport handling. Never move focus on successful saving.

## States and safety

| State | English / Persian | Contract |
| --- | --- | --- |
| Loading | Loading week… / در حال بارگذاری هفته… | No saved claim or editing/writing loaded defaults. |
| Loaded new empty week | Changes save automatically on this device. / تغییرات به‌طور خودکار روی همین دستگاه ذخیره می‌شوند. | Do not claim unwritten defaults saved. |
| Pending | Changes pending… / تغییرات در انتظار ذخیره… | Neutral cue only while actual work pending. |
| Saving | Saving on this device… / در حال ذخیره روی این دستگاه… | No artificial delay to make synchronous status paint. |
| Saved | Saved on this device / روی همین دستگاه ذخیره شد | Confirmed stored read/write; no typing toast. |
| Failure | Couldn’t save. Your changes are still here. / ذخیره نشد. تغییرات شما هنوز اینجاست. | Alert and Retry / تلاش دوباره, latest visible writing retained, no repeating auto retry loop. |

Synchronous write on each accepted local edit is approved; pending/saving may not paint. Failed explicit app link/week departure stays on Planner, displays error and Retry; user can retry or continue writing. Add no discard command this cycle. Module memory can retain failed snapshot after SPA browser Back and restore on return; do not add a history sentinel/trap. Preserve beforeunload warning. Storage failure plus reload/native process kill cannot guarantee recovery; do not claim recovery/backup. Keep week identity/latest revision safe and never write loaded defaults on initialization. Notification rescheduling is coalesced independently; Planner typing never prompts notification permission.

## Bilingual canvas, accessibility and verification

Story IDs prefix `proposals-planner-automatic-saving--`. [English phone](http://localhost:6006/?path=/story/proposals-planner-automatic-saving--english-phone-light), [Persian phone](http://localhost:6006/?path=/story/proposals-planner-automatic-saving--persian-phone-light), [dark Persian error](http://localhost:6006/?path=/story/proposals-planner-automatic-saving--persian-storage-error), [wide English](http://localhost:6006/?path=/story/proposals-planner-automatic-saving--english-wide-light). Exports also include EN/FA phone/wide light/dark, PendingChanges, Saving, StorageError, PersianStorageError, FullWriting, PersianFullWriting, ScheduleDraft, PersianScheduleDraft, Loading and EmptyWeek.

Reuse existing ink/surface/teal/error roles, logical spacing and Vazirmatn RTL. Prototype ≥48px controls, explicit textarea labels, 3px focus and words plus state cue. Production has one polite status live region (do not announce every keystroke), failure alert when first entered; avoid duplicate header/footer live announcements. Long Persian error wraps above Retry; never compress target. Mixed numeric event time is LTR. State simulator is design-only.

| Check | Evidence | Result |
| --- | --- | --- |
| Actual current UI | All seven routes, Planner desktop and 390px phone screenshots | Baseline inspected |
| Studio typecheck/build | npm run typecheck/build 2026-10-06 | Passed after final formatting; build exit 0, existing chunk-size warning |
| Phone EN/FA | 390px English light/Persian dark error; 360px English error, Persian writing/schedule | Inspected; corrected dark header style collision |
| Wide EN/FA | 1280px English light and Persian dark with long copy | Inspected |
| Retry interaction | Prototype error Retry returns saved, writing remains | Passed prototype |
| Physical Android keyboard/TalkBack | Behavior specified; no physical device used | Release follow-up |
| Final app comparison | Implemented footer/status/copy/storage must be compared | Passed bounded EN/FA phone/wide, full-writing and read-back comparison; [QA](2026-10-06-save-controls-qa.md); browser failure injection and native checks remain |

Designer recommends this bounded change and marks it ready. Language/state/navigation decisions resolved; implementation may start. This is not a claim that the production change is already validated.
