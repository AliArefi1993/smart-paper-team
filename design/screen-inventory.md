# Shipped screen and design coverage inventory

Updated: 2026-10-04. Source: `PRODUCT.md`, `feature.md`, and the current routes/components in `smart-paper-front/src/app/` and `src/components/`. This lists implemented Android/local-data behavior. It is a coverage map, not validation of every rendered state.

The primary editable canvas is the [local Storybook studio](studio/src/stories/). It has bilingual phone baselines for all seven routes and separate source-backed state sketches; phone/wide controls are available, though wide layouts are not yet visually validated. Story data and content are illustrative. The earlier [atlas](coverage-atlas.html) is retained as a historical reference. The optional [Figma file](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n) contains [foundations](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=1-2), reviewed [Idea Space English](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=3-2) and [Persian](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=3-32) proposal frames, and unreviewed [Planner English](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-2) and [Persian](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-55) drafts.

## Local story coverage

All stories default to paired English/Persian 390px drafts. The named exports in [route story files](studio/src/stories/) cover:

| Route | Baseline and material state stories |
| --- | --- |
| `/` | [Planner](studio/src/stories/Planner.stories.tsx): Populated, Sparse, ScheduleSheet, TemplateSheet, UnsavedDecision |
| `/ideas` | [Ideas](studio/src/stories/Ideas.stories.tsx): Populated, Empty, NoSearchMatches, Edit, DeleteDecision |
| `/timer` | [Timer](studio/src/stories/Timer.stories.tsx): Ready, Running, Paused, Completed, InvalidDuration |
| `/summaries` | [Summaries](studio/src/stories/Summaries.stories.tsx): Populated, Empty, Filtered |
| `/finance` | [Finance](studio/src/stories/Finance.stories.tsx): Unlocked, Locked, Empty, EditIncome, Validation |
| `/export` | [Export](studio/src/stories/Export.stories.tsx): Overview, Locked, AiReport, ImportReplaceDecision, Validation |
| `/settings` | [Settings](studio/src/stories/Settings.stories.tsx): Default, Edit, Validation, UnsavedDecision |

These are structural sketches migrated from source-backed inventory, not fidelity-checked UI. The 2026-10-04 refinement adds route-specific navigation, contextual decision sheets, and a closer timer state; see [the design record](2026-10-04-baseline-story-refinement.md). Loading, success, accessibility, keyboard, and other states listed below still need design review. Figma coverage in the next table is optional and remains incomplete.

## Route coverage

| Shipped route and owner | Primary user flow and important implemented states | Documented Figma coverage and gap |
| --- | --- | --- |
| `/` — `weekly-planner.tsx` | Choose a Saturday–Friday week; edit weekly goal/note, one day at a time on phone, section minutes/goals/notes, and timed entries; save with status feedback. Includes loading/errors, empty schedule, selected/current week and day, light/dark planner modes, mobile save bar, unsaved week/navigation choice, add/edit/delete schedule sheet, and full-week template save/apply/delete sheet with confirmations. | [Local populated/sparse baselines](studio/src/stories/Planner.stories.tsx) show per-section minutes, quick adjustments, goal, and note in EN/FA. [Calm Planner proposal](2026-10-04-planner-calm-flow.md) has [interactive EN/FA states](studio/src/stories/PlannerCalm.stories.tsx) for section opening, long writing, sparse, unsaved, and error feedback. [EN Figma draft](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-2), [FA Figma draft](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=15-55), [atlas draft](coverage-atlas.html#planner). Proposal approval and running-UI comparison, dark mode, loading/error/success, and wide validation remain. |
| `/ideas` — `idea-space.tsx` | Capture a note; expand optional sparks; daily return; search; branch, edit, delete. Includes loading, unavailable outside local mode, empty/no matches, draft recovery, feedback and delete confirmation. | [EN/FA Figma handoff](2026-10-01-idea-space-composer.md), [atlas draft](coverage-atlas.html#ideas). Expanded sparks, empty/search, edit/branch, errors, confirmation, and wide layout still need Figma frames. Physical Android review pending. |
| `/timer` — `focus-timer.tsx` | Choose focus/rest, edit lengths, start/pause/resume/reset, then explicitly advance after completion. Includes ready/running/paused/completed, settings/storage errors and restored countdown after navigation. | [EN/FA atlas draft](coverage-atlas.html#timer). Figma frames, phase/status variants, duration error, and wide layout remain. |
| `/summaries` — `week-summaries-view.tsx` | Set month range, show/hide empty weeks, scan per-week goal/note, section totals and details. Includes loading/error, no visible weeks, current week highlight and variable section count. | [EN/FA atlas draft](coverage-atlas.html#summaries). Figma frames, empty/filter states, and wide card grid remain. |
| `/finance` — `finance-view.tsx` | Unlock local PIN screen; view annual goal/progress; set goal; add, edit, delete income entries. Includes locked, incorrect PIN/error, loading, no income, inline edit, save/delete progress and feedback. Android PIN is a screen lock and does not encrypt data. | [Route brief](2026-10-01-finance-baseline.md), [EN/FA atlas draft](coverage-atlas.html#finance). Figma locked/unlocked variants, edits, and wide layout remain. |
| `/export` — `export-view.tsx`, `ai-report-panel.tsx` | Unlock finance; review counts; download JSON backup, CSV/XLSX; import JSON by merge or replace with selected-file counts and replace confirmation; choose AI report fields and inclusive dates, preview scope/text, share or download fallback. Includes loading/errors, disabled actions, no selected data, finance field opt-in/unlock, invalid import, success and destructive replace. Full Markdown export button is backend-mode only; Android uses the selective report. | [Route brief](2026-10-01-export-report-import-baseline.md), [EN/FA atlas draft](coverage-atlas.html#export). Figma overview/report/import variants and wide layout remain. |
| `/settings` — `settings-view.tsx` | Rename and activate/hide ten stable planner slots; set optional morning notification time; save. Includes loading/error, disabled save, validation, success and unsaved-navigation confirmation. | [Route brief](2026-10-01-settings-baseline.md), [EN/FA atlas draft](coverage-atlas.html#settings). Figma default/edited/validation states, unsaved decision, and wide layout remain. |

## Shared design requirements

- Draw Android phone frames at 360–390px and a relevant wide layout. Include safe-area and keyboard behavior where controls or dialogs can be obscured.
- Show English LTR and Persian RTL for each route. Test long section names, notes, schedule titles, income notes, and translated labels. Mirror directional navigation intentionally; keep dates, times, amounts, and mixed-script user text legible.
- Cover empty, loading, error, success, disabled, and destructive states where each flow uses them. Check touch targets, labels, focus, screen-reader names, contrast, and non-color selection cues.
- Compare proposed frames with the running build or screenshots before calling a route validated. Record the result in its `design/` handoff. Physical Android behavior remains a separate review.

## Design-first implementation gate

For future user-facing changes, Product records the problem and acceptance criteria in `design/` or the relevant task, Designer creates proposal stories for changed flows and states in `design/studio/` and writes a `design/TEMPLATE.md` handoff, then Frontend implements against that handoff. Designer and QA compare the running result in both languages and record any differences. Existing baseline stories and Figma frames are reference context, not proof that every shipped state has been visually validated.
