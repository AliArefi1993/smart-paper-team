# Design: Calm Planner editing flow

Status: implemented in frontend — browser QA passed; physical Android QA pending
Updated: 2026-10-05
Owning frontend route/component: `/` — `smart-paper-front/src/components/weekly-planner.tsx`
Local studio stories: `design/studio/src/stories/PlannerCalm.stories.tsx`
Design type: proposed change

## Problem and evidence

The user reports two recurring frustrations on a phone: opening a section such as Main leaves the expanded content below the visible area, requiring an upward scroll, and longer goals or notes outgrow their small text fields so the writing is hard to read. Source inspection shows the selected day currently renders every active section as a full form with a minutes field, four adjustment controls, a goal input, and a two-row note textarea. The page also has week details, day note, schedule, and a bottom save bar. The density makes it hard to stay oriented and confident that edits were saved.

## Desired outcome and scope

- The user can scan all active sections without reading every field.
- Opening any section places its heading and first control near the top of the visible editing area. The user never has to scroll upward to discover where the form began.
- Minutes, goal, and note remain separate for each configured section. Exact-time schedule entries remain a separate concept.
- A growing goal or note stays readable. A full writing view is available for longer text and returns to the same section.
- Save state uses clear words: changes not saved, saving, saved, or error. The design calls for retaining the existing unsaved-navigation confirmation when implemented.
- English and Persian have the same hierarchy, focus behavior, and reachable 44px controls at 360–390px.

## Design direction

The phone view keeps a compact week/day context at the top, then shows one-line summaries of Main, Second, Learning, and Exercise. A summary shows the section name, minutes, and a short goal cue. Tapping it opens only that section's form; the scroller moves its heading below the sticky context bar and focus moves to the heading. The previously open section collapses. This prevents a large stack of forms while preserving a quick overview.

The open form groups duration first, then goal and note. The duration input and +15/+30/+60/reset controls update only that section. Goal and note fields grow with content; an “Open writing view” action opens a large editor labeled with the section and field. Closing the editor returns focus to that section. The bottom bar stays visible above the safe area and shows the explicit Save week action and status. It does not imply automatic persistence.

The prototype uses illustrative data and local state. It does not replace the current app or change data contracts. Section labels remain configurable; the sample four sections are not a limit. The proposal should work with ten active sections and long Persian labels during implementation review.

## States and acceptance criteria

| State | Expected behavior |
| --- | --- |
| Overview | All active sections are scannable as compact cards; weekly and day context remain clear. |
| Section open | Only one section form is open; its heading stays visible after opening, including the last section. |
| Longer writing | Textarea grows; full writing view can show and edit the complete text, then returns to the same section. |
| Changed / saved | Editing minutes, goal, or note changes the status to unsaved; Save week visibly confirms saved. Edits made during saving remain unsaved until another save. |
| Save error | An error message and retry action are visible; the user can try again without losing draft text. |
| Sparse | Empty sections remain inviting and retain their own minutes, goal, and note controls. |
| Bilingual | LTR/RTL, numeric values, labels, focus, and keyboard access work in EN/FA at phone width. |

## Implementation handoff and verification

The designer compared the proposal with `smart-paper-front/src/components/weekly-planner.tsx` on 2026-10-05. The shipped screen renders all active section forms for the selected day; section goals use one-line inputs, notes use two-row textareas, and Enter saves from textareas. The proposal keeps the current week/day selection, totals, timed schedule, template sheets, dark theme, and manual save transaction. On a phone, section summaries replace the full stack of forms; only the selected section expands. Section goals become multiline fields. Enter inserts a newline and Ctrl/Cmd+Enter saves. Weekly goal/note and day note also grow with content. The full writing view applies to section goal and note. Existing week-switch and navigation warnings remain.

This handoff is ready for frontend implementation. Frontend should map it to the existing week/day/section state and save transaction without changing the data model. QA must compare the built screen in English and Persian, test the last section, long text, keyboard and focus, dark mode, unsaved navigation, schedule/template sheets, and Android safe areas. Physical Android checks remain a release validation item.

| Check | Result |
| --- | --- |
| Interactive Storybook build and type check | Passed locally on 2026-10-04 (`npm run typecheck`, `npm run build`) |
| Browser interaction review in English and Persian | Partial: 390px EN/FA stories rendered; last section scroll landed 90px below scroller top, long note grew, writing view opened and returned focus, unsaved/error/saving feedback inspected. Keyboard, screen reader, and physical Android review remain. |
| Current-app source comparison | Completed 2026-10-05; differences and preserved flows documented above |
| Designer implementation handoff | Ready 2026-10-05 |
| Built-app QA review | Passed on 2026-10-05 at 390px: last section lands 96px below viewport top in EN/FA; one section opens at a time; long goal/note fields fit without horizontal overflow; Enter inserts a newline; writing view returns focus; saved content reopens; Persian dark mode, template/schedule sheets, and unsaved-week warning remain usable. Physical Android and screen reader review remain. |
| User feedback after release | The user installed `2026.10.2` and reported a substantially better experience compared with the earlier Planner, attributing the improvement to the design-first workflow. This does not replace targeted Android or accessibility checks. |
