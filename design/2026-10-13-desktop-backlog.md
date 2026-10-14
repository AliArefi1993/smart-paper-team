# Design: Desktop backlog recovery and accessibility

Status: ready for implementation (Idea recovery, JSON chooser, Templates keyboard correction)
Updated: 2026-10-13
Owning frontend: `src/components/idea-space.tsx`; additional candidates `export-view.tsx`, `weekly-planner.tsx`
Design type: proposed bounded corrections to shipped behavior

## Problem and evidence

The [first checkpoint](../docs/evidence/2026-10-13-manual-checkpoint/README.md) reproduced Persian cold-entry/reload displaying an English recovery explanation with intact writing. Source comparison confirms `useLanguage` starts in English and syncs the stored language on mount, while Idea Space captures translated recovery strings during its mount-only load. Current behavior preserves new/edit/branch drafts and deliberately publishes saved thoughts; that contract remains authoritative in `PRODUCT.md`.

## Outcome and scope

Recovery explanations follow the current UI language on cold entry, reload, navigation and language switching. Preserve exact draft body including whitespace, mode, source identity, receipt and reader context; language changes must never reload writing, clear it or publish it. No storage format, publishing, generic language-hook or screen redesign is required.

Acceptance: EN/FA recovered new/edit/branch draft, session-only retained draft and committed-cleanup success show the existing appropriate translated status. Switching EN ↔ FA changes an already visible status without replacing typed writing or creating a saved card. Editing clears status as today. Deliberate publish creates exactly one saved thought; retry/cleanup and conflict decisions retain their existing meaning.

## Design direction and states

Keep the status above the composer, current text sizing/palette and `role="status"`. Store semantic feedback identity and derive text at render time from the current language. Errors already selected at render time remain alerts. Loading/empty have no recovery success message; load errors keep existing Retry, and save/cleanup states retain deliberate actions. Do not transfer focus merely because language/status changes. Text wraps naturally in RTL/LTR; textarea stays `dir="auto"` and the page mirrors as today. Existing named native controls and visible focus stay intact. Retain dark color mapping, avoid introducing new tokens or assets.

Copy:

| State | English | Persian |
| --- | --- | --- |
| New | New draft restored. It is not a saved thought yet. | پیش‌نویس تازه بازیابی شد. هنوز فکر ذخیره‌شده نیست. |
| Edit | Edit draft restored. Changes are not saved to the note yet. | پیش‌نویس ویرایش بازیابی شد. تغییرات هنوز در یادداشت ذخیره نشده‌اند. |
| Branch | Branch draft restored. It is not a saved thought yet. | پیش‌نویس شاخه بازیابی شد. هنوز فکر ذخیره‌شده نیست. |
| Session | Unfinished writing kept in this session. It is not a saved thought yet. | نوشته ناتمام در این نشست حفظ شد. هنوز فکر ذخیره‌شده نیست. |
| Saved | Existing `ideasSaved` translation | Existing `ideasSaved` translation |

## Editable studio and handoff

[Story source](studio/src/stories/IdeaRecoveryLocale.stories.tsx). Local links: [Persian phone](http://localhost:6018/?path=/story/proposals-idea-recovery-locale--persian-phone), [English phone](http://localhost:6018/?path=/story/proposals-idea-recovery-locale--english-phone), [Persian wide](http://localhost:6018/?path=/story/proposals-idea-recovery-locale--persian-wide), [English wide](http://localhost:6018/?path=/story/proposals-idea-recovery-locale--english-wide). The same story provides edit/branch/session, loading, empty, saved and error controls. This is a status-focused illustrative canvas, not a replacement production screen; visible prototype field label differs intentionally from shipped screen-reader-only composer label, and the publish button is illustrative.

Designer recommends the recovery correction and marks it **ready for implementation**. No unresolved design decision. Frontend owns persistence and publishing regression checks. Native Android/TalkBack remain unverified.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current behavior comparison | Checkpoint screenshot/DOM record and actual Idea Space + useLanguage source | Reproduced localization defect; draft preservation observed in checkpoint |
| Studio typecheck/build | Docker Node24 isolated node_modules: `npm ci && npm run typecheck && npm run build` | Pass; existing bundle size warning only |
| EN/FA phone and wide | Browser screenshots and accessibility tree; 390px story phone, 1024px wide, long mixed-language draft, wide 22px text | Status wraps/readable; no horizontal clipping; wide form continues via document scrolling |
| Live language switch | FA phone → EN via story button | Exact body retained; explanation and UI language changed |
| Empty/loading/error/saved | Named story controls and source state mapping | Included; runtime inspection of these variants pending |

## Bounded accessibility review

Source review covers primary Planner, Settings, Ideas, Export/AI report and local reporting. Settings fields have explicit/wrapping labels and invalid-state focus. Idea composer/search and reader actions have names, reader focus/return handling and inert background. AI dates/fields/preview have labels and text feedback; reporting uses native modal dialog with heading focus and opener restore. These are source observations, not a full assistive-technology certification.

Initial source candidates, subsequently reproduced below: Export JSON chooser hides its input with `display:none` inside a nonfocusable label; Planner Template dialog lacks source initial focus, containment, Escape/restore behavior and a real template-name label. No broad redesign recommended. Desktop/browser evidence and ready minimal handoff will be recorded below after reproduction; native keyboard, TalkBack, physical short viewport/rotation remain unverified.

## Reproduced keyboard corrections — ready for implementation

Production output reviewed on disposable local origin `http://localhost:6020/index.html` and `/export.html`, 1280×720, before implementation:

- Templates: opening Week Templates leaves focus on opener, pressing Escape does not close, and pressing Tab moves into background WEEKLY GOAL. Accessibility tree exposes template name as an unnamed text field. Source confirms absent containment/initial focus/restore handler; Persian shares the same markup and interaction.
- Export: after synthetic default-PIN unlock, EN/FA accessibility trees expose Choose JSON Backup as plain text, with no file control. Tab after the last import-mode radio skips the chooser. Source `display:none` file input explains keyboard exclusion. No import was performed during this review.

Minimal approved correction: keep the template sheet layout/content/actions, add a real translated template-name label (existing `templateName` translation), focus that input on open, contain Tab and Shift+Tab, close with Escape, and restore the opener on Cancel/Escape/success close. Keep inactive background unavailable while modal is open. Native modal dialog or equivalent correct focus management is acceptable; do not add persistence/discard behavior or alter template overwrite/apply confirmation. Keep short viewport internal scrolling and current theme roles. Existing schedule editor is outside this handoff.

Export correction: render a visible, keyboard-focusable native file input with an explicit EN/FA label using the current `chooseJsonBackup` translation. Reuse import button color/padding if desired while preserving visible filename/control and focus outline. Disable during importing, preserve `accept`, `handleImport`, Merge/Replace and confirmations. Native file control text is browser/OS localized, not app-owned copy. Do not make a custom picker or change import safety.

[Editable keyboard story](studio/src/stories/DesktopKeyboardFixes.stories.tsx), [EN phone](http://localhost:6021/?path=/story/proposals-desktop-keyboard-fixes--english-phone), [FA phone](http://localhost:6021/?path=/story/proposals-desktop-keyboard-fixes--persian-phone), [EN wide](http://localhost:6021/?path=/story/proposals-desktop-keyboard-fixes--english-wide), [FA wide](http://localhost:6021/?path=/story/proposals-desktop-keyboard-fixes--persian-wide). Story uses native dialog and real file input as interaction reference, with no persistence. Final host and Docker Node24 studio typecheck/build passed. EN/FA 390px phone and 1024px wide screenshot review passed. Persian modal focused the named template input, Shift+Tab stayed inside, Escape closed and returned focus to opener; background was absent from its modal accessibility tree. Implementation behavior is fully specified and recommended: ready for implementation.

Incidental existing observation: Export unlock success string remains English when switching to Persian after English unlock. This is a language-switch feedback issue, not cold-entry failure; recorded for later scope decision, not a new requirement in this handoff.

Additional baseline browser sample: Persian Settings exposed named section fields, visibility/diagnostic checkboxes and time control; Report Problem focused its heading, Escape closed an empty report and restored the trigger. Persian empty Ideas composer was named, sparks had expanded-state semantics, and deliberate Keep Thought remained named. English Planner/Export fields and selected report checkboxes had names in accessibility trees. These samples establish only tested controls/states, not broad screen-reader or native coverage. Short viewport inspection of final implementation remains a lead/Tester verification gate.

## Implemented preview comparison

On the final local-data production export at `http://localhost:3192`, the Templates native modal showed only modal controls in the accessibility tree, focused the translated Template name field on open, and returned focus to Week Templates after Escape. Export unlocked with synthetic default PIN exposed a named native Choose JSON Backup control; Tab from the last import-mode radio reached it. Persian Idea Space recovered a synthetic unfinished draft with the Persian explanation and exact body after route navigation. Automated browser/short-viewport checks and final release evidence are recorded in the [batch task](../tasks/2026-10-13-desktop-backlog-batch.md); no phone or TalkBack behavior is inferred here.
