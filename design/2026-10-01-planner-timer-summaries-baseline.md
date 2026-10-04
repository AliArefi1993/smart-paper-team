# Planner, timer, and summaries — shipped flow baseline

Status: structural baseline; Figma and running-UI comparison incomplete
Updated: 2026-10-04
Design type: current shipped behavior
Sources: `smart-paper-front/src/components/weekly-planner.tsx`, `focus-timer.tsx`, `week-summaries-view.tsx`, `src/lib/i18n.ts`, `PRODUCT.md`, and `design/screen-inventory.md`
Visual reference: [editable Planner stories](studio/src/stories/Planner.stories.tsx), [Planner preview source](studio/src/PlannerPreview.tsx), [bilingual route drafts](coverage-atlas.html#planner), [Planner English Figma draft](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-2), [Planner Persian Figma draft](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-55)

## Planner `/`

- **User job:** choose a Saturday–Friday week, set a weekly goal/note, plan one day at a time on phone, record minutes/goals/notes in configurable sections, and place exact-time entries. The current layout also exposes full-week templates and a planner-only dark mode.
- **Primary flow:** change week or day → edit weekly/day content → add or edit scheduled entries as needed → save and read feedback. The phone save bar must remain reachable above system controls and the keyboard.
- **Material decisions:** leaving an unsaved week or route needs the existing confirmation; schedule creation/edit/deletion and template save/apply/deletion need their own sheets and destructive or overwrite warnings. Empty schedule and sparse section content must remain legible.
- **Section structure in local stories:** the populated and sparse English/Persian Planner previews show separate weekly goal/note, day note, timed schedule, and four illustrative active sections (Main, Second, Learning, Exercise). Each section has its own editable minutes input, +15/+30/+60 and reset shortcuts, goal, and note. This follows the section structure in `weekly-planner.tsx`; sample values and copy are illustrative. The minute shortcuts were checked in the local browser in both languages on 2026-10-04.
- **Designer coverage still needed:** compare the local and Figma drafts with the running UI and fix wrapping/overflow, especially the weekly goal card. Verify the section layout with all ten configurable slots, long names, dark mode, loading/error/success, sheets, and a wide layout. Use exact `i18n.ts` copy in final frames.

## Focus timer `/timer`

- **User job:** choose focus or rest, configure whole-minute lengths, run a countdown, pause/resume/reset it, and explicitly advance after completion. A restored deadline survives navigation or suspension, but the timer does not log planner minutes or run a completion alarm.
- **Primary flow:** configure → start → pause/resume or reset → completed → choose the next phase. Keep phase, status, and primary action clear without relying on color alone.
- **Material states:** ready, running, paused, completed awaiting the next action, invalid duration, settings/storage error, and a restored countdown. The bilingual [timer atlas draft](coverage-atlas.html#timer) represents the ready state only; it is an editable structural sketch, not a visually verified screen.
- **Designer coverage still needed:** EN/FA Figma variants for each state and both phases, long labels, accessible progress text, larger type, phone and wide layouts, and a comparison with the running timer.

## Week summaries `/summaries`

- **User job:** choose a month range, decide whether empty weeks appear, then scan weekly goals, notes, section totals, and details. Current week is highlighted.
- **Primary flow:** choose range → toggle empty weeks → compare week cards → open or inspect details. Preserve the distinction between no weeks in range and an empty week shown by the filter.
- **Material states:** loading, failed load, no visible weeks, populated cards, current-week highlight, long goals/notes, and a variable number of configured sections. The bilingual [summaries atlas draft](coverage-atlas.html#summaries) represents a populated range only.
- **Designer coverage still needed:** EN/FA Figma populated/empty/filter frames, wide card grid, accessible current-week cue, long content, and a running-UI comparison.

## Shared handoff and verification

Use the paper/teal foundations in [foundations.md](foundations.md). The atlas and new Planner Figma frames are structural drafts based on source inspection, not approved redesigns. Before a future implementation, Designer must resolve layout and interaction questions in a separate proposal, review EN/FA at phone width and a wider viewport, check focus/labels/touch targets, and mark that proposal `ready for implementation`. Physical Android keyboard, notification, share, and safe-area behavior remains a separate verification step.

| Check | Result |
| --- | --- |
| Source-backed flow and state mapping | Recorded |
| Bilingual editable repo-native structural drafts | Planner populated and sparse stories visually checked for section fields on 2026-10-04; running-app comparison pending |
| Planner editable Figma drafts | Present; screenshot/overflow review blocked by Starter tool limit |
| Timer and summaries Figma frames | Pending |
| Running UI and physical Android comparison | Pending |
