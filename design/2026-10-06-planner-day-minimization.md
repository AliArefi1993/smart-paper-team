# Design: Planner day minimization

Status: ready for implementation — proposal for user review; application implementation and built-app QA pending
Updated: 2026-10-06
Owning frontend route/component: `/` — `smart-paper-front/src/components/weekly-planner.tsx`
Local studio: [Selected day](http://localhost:6006/?path=/story/proposals-planner-day-minimization--selected-day), [All days minimized](http://localhost:6006/?path=/story/proposals-planner-day-minimization--all-days-minimized), [Unsaved draft](http://localhost:6006/?path=/story/proposals-planner-day-minimization--unsaved-draft), [Phone dark](http://localhost:6006/?path=/story/proposals-planner-day-minimization--phone-dark), [Wide light](http://localhost:6006/?path=/story/proposals-planner-day-minimization--wide-light), [Wide dark](http://localhost:6006/?path=/story/proposals-planner-day-minimization--wide-dark)
Editable stories: `design/studio/src/stories/PlannerDayCollapse.stories.tsx`
Optional Figma: not used
Design type: proposed change

## Problem and evidence

The user wants a minimize control on each Planner day and the ability to minimize all seven days. Designer recommends this change. It suits a personal weekly planner because the person can reduce visual detail while retaining the week's shape and return directly to the day they need. It also extends the [Calm Planner](2026-10-04-planner-calm-flow.md) approach of showing summaries before editing. The user's positive feedback on that release supports preserving its readable editing flow; it does not validate this new interaction.

Current source renders all seven day articles. Below `lg`, the day rail selects a day and only its body is visible. Clicking its article header only selects it again, so the open day cannot close. At `lg` and above every body is forced visible with `hidden lg:block`; header `aria-expanded` still follows selection and therefore does not describe actual visibility. Proposed expansion state is independent of selection and describes visibility at every breakpoint.

## Outcome and scope

- Outcome: scan a quiet week overview, open any day directly, and retain unsaved work when reducing detail.
- In scope: header disclosure, explicit Minimize/Show cue, minimize-all control above the day list, summaries, recovery, bilingual and accessible states.
- Non-goals: new planner data, autosave, deletion, a redesigned week header, template/schedule changes, backend changes, or persistent collapse preferences.
- Acceptance criteria: each day can close; all seven can stay closed; header and rail reopen any day; collapse does not save, discard, change totals, or mark data dirty; manual Save and existing navigation warnings still operate with hidden drafts; true expansion is exposed to assistive technology.

## Design direction

Keep the existing day card header as the full-width disclosure button. Add a trailing minus and “Minimize” when open, plus and “Show” when closed. Both icon and word make the action clear; the entire header is the touch target. Do not nest another button inside it. Keep day name, date, minutes, and existing has-details/empty cue visible. When edits are unsaved, the existing global Save status remains visible; the prototype also demonstrates a day-level “Changes not saved” cue. This cue may be implemented only when change tracking can identify edited days accurately; do not infer saved state from expansion or content presence.

Place “Minimize all days” above the seven cards. It closes day bodies only. In the all-closed state display “Week overview. Choose a day to show its details.” A header opens its own day; the phone rail always opens the selected day, including tapping an already selected day. Day selection stays visible even when closed. Initial behavior stays familiar: selected day open on phone, all days open on wide layouts. No default of all closed is introduced.

| English | Persian |
| --- | --- |
| Minimize / Show | جمع کردن / باز کردن |
| Minimize all days | جمع کردن همه روزها |
| Week overview. Choose a day to show its details. | نمای کلی هفته. برای دیدن جزئیات، یک روز را باز کنید. |
| Changes not saved | تغییرات ذخیره نشده |
| Selected | انتخاب‌شده |

Reuse current paper/surface, teal, border, muted text, save bar, day totals, GrowingTextarea, and section accordions. No bitmap or Figma assets are required. Prototype colors follow `design/foundations.md`; implementation should use the current Planner's light/dark class roles rather than copying the studio CSS.

Alternatives: an icon alone is harder to discover; hiding day cards completely removes context and recovery; making the phone display multiple open forms increases the writing stack. The selected proposal preserves phone focus and allows wide users to reduce each column independently.

## States and layouts

| State | Behavior |
| --- | --- |
| Phone, populated | At most one day body open. Opening another day closes the previous body. The active day can close to leave none open. |
| Wide, populated | Each day opens/closes independently. Closing one day leaves other open days visible. Keep the existing grid and day order; no masonry/reordering. |
| All minimized | All headers, totals, content cues, week context, and manual Save remain available. Any header or phone rail reopens a day. |
| Edited draft / saving / save error | Collapse preserves day note, section fields, schedule state, and section-open choice in parent state. It does not count as an edit. Save works with hidden fields, errors retain drafts, and edits made while saving remain unsaved. |
| Empty | Zero minutes and “No details yet” remain visible. Opening offers the existing empty editor. A zero total alone must not imply absence of goals/notes/schedule. |
| Loading / load error | Collapse controls appear only with a loaded week. Existing loading/retry behavior continues. Stories include Loading and LoadError. |
| Offline | In Android local mode collapse is a local UI action and remains usable. No sync promise; retain existing storage failure handling. |
| Destructive / modal | Collapse is reversible, so no confirmation. Existing unsaved week/navigation, template overwrite, and schedule delete confirmations continue. A schedule sheet or full writing view owns focus; background collapse cannot interfere with it. |

On phone reopening a day brings its header and beginning of the form below the sticky context, using the existing calm scroll placement principle. Header activation keeps focus on the header; rail activation transfers focus to the newly opened header. Collapsing does not scroll to another day. Minimize-all keeps focus on its trigger and politely announces that days closed; if focus could be in hidden content from a programmatic action, move it to that trigger. When all are closed, use `aria-disabled` with a guarded no-op rather than disabling the currently focused button. This retains focus.

Use native buttons, Enter/Space activation, `aria-expanded` for actual visibility, and unique `aria-controls` linked to body IDs. Closed bodies leave the tab order and accessibility tree. Accessible button name includes day and action; its description includes date, total and content/unsaved cue. Keep selection semantics on the rail (`aria-pressed`), separate from expansion. Focus outline, textual state, 44px minimum touch targets, and light/dark contrast are required. Mirror alignment and trailing cues for Persian; localize numerals and existing dates without changing their calendar contract. Use logical CSS properties and allow translated controls to wrap. Growing text remains readable and the existing full writing view remains available; minimize controls do not replace it.

Expansion is transient UI state for the loaded week, never JSON/API/backup data. On an actual week switch reset to the familiar initial layout after the existing save/discard decision. Save responses for the same week must preserve collapse state. Theme/language changes must preserve drafts and expansion. If resizing wide to phone with several open days, keep the selected day if open, otherwise the first open day; preserve an all-closed choice. When moving back to wide keep the explicit open/closed choices rather than forcing all bodies open. The studio width/theme controls remount its illustrative state; this is a design-tool convenience, not the intended application behavior.

## Implementation handoff

- Map disclosure state to existing seven day dates, separate from `activeDayDate`; remove the CSS override that forces closed bodies visible at `lg`.
- The studio demonstrates day notes, editable main duration/goal, section disclosures, summaries and save feedback. Schedule, remaining section forms, week text, templates, full writing view, and navigation are contextual references; their authoritative behavior remains the application source and Calm handoff.
- Source constraints: retain ten configurable sections, active-section totals, exact-time schedule as separate data, Saturday–Friday ordering, manual week save and unsaved warnings. Do not derive collapse state from data content.
- Open decisions: none needed to implement the requested disclosure behavior. A reliable day-level dirty cue is optional as described above; global save feedback is required.
- Designer decision: ready for implementation, 2026-10-06. This turn supplies the Designer recommendation and reviewable proposal; no application code was changed.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio type check and production build | `npm run typecheck`, `npm run build` in `design/studio` | Passed 2026-10-06; existing large bundle advisory only |
| Phone EN/FA interaction | Paired 390px frames: edited English day note, minimized selected day, reopened via selected rail; exact draft retained. Persian minimize-all and Enter reopening checked. | Passed in studio |
| Wide EN/FA | 1180px frames; seven bodies initially visible, English Sunday collapse leaves six open, all-collapsed Persian dark overview inspected. | Passed in studio |
| Narrow phone and last day | 360px browser viewport (334px usable frame), EN/FA dark summaries, Persian Friday reopen and top-of-form placement, long translated controls. No frame horizontal overflow; day headers about 89px tall and bulk control 44px. | Passed in studio |
| Save/empty/error states | Simulated save failure retained draft state; retry showed Saved. Empty week and load-error recovery inspected. | Passed in studio; illustrative persistence only |
| Contrast and semantics | Light muted/accent/dirty text on white: 6.11/5.47/6.42:1; dark muted/accent/dirty on surface: 8.45/8.92/9.89:1. Visible focus and header expansion exposed in accessibility tree. | Passed targeted checks; physical TalkBack/font scaling pending |
| Current behavior comparison | `weekly-planner.tsx` day rail/article/body inspected; existing running Calm story inspected as design reference. | Source comparison complete; reference is illustrative |
| Built application comparison | No current app preview available: Docker unavailable and frontend host native dependencies incomplete. | Pending implementation QA; proposal is not validated as shipped UI |

Before release, compare the implemented screen with these stories in English/Persian, light/dark, 360–390px and wide. Check hidden draft saving, current-day rail reopening, last day scroll, breakpoint changes, week switch/unsaved warnings, all ten active sections, Android keyboard/safe areas and TalkBack. This is a proposal review, not a release validation claim.
