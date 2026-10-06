# Design: Planner shared dark palette

Status: implemented; targeted browser comparison passed
Updated: 2026-10-06
Owning frontend: `smart-paper-front/src/components/weekly-planner.tsx`; shared language control where its dark styling appears in Planner.
Design type: proposed color alignment of shipped behavior

## Problem and evidence

The maintainer installed Android `2026.10.3`, likes the green dark appearance on other pages, and asks for the same palette in Planner. Current Planner defines a slate gradient, slate panels, fields, secondary buttons and sheets independently of the shared green roles in `src/app/globals.css`. Direct feedback establishes the requested visual preference; it does not validate every Android state.

`PRODUCT.md` already defines a saved appearance across all pages, weekly goals/notes, day notes, exact-time schedule entries, full-week templates, and manual save. This proposal aligns that existing interface. Current source and the running local Planner DOM were compared with the editable studio and its inspected phone/wide screenshots. The parent agent inspected a current running-app screenshot and confirmed navy canvas, slate panels and fields, with the appearance toggle already using shared green. The studio already expresses green surfaces; it is a color reference with illustrative data, not a replacement for the current Calm Planner/day minimization layout.

## Outcome and scope

Use the same green canvas, panel, input, ink, border and action roles as the other dark pages. Cover the week rail, weekly editor, collapsed/expanded days and sections, totals, neutral navigation/language controls, schedule editor, template list/apply sheet, unsaved sheet, writing view and phone save bar. Preserve light mode, spacing, typography, category identification, manual save, focus order, data and all interaction behavior.

Acceptance: no remaining slate neutral surface in dark Planner; selected controls/actions have readable dark ink; nested editors remain green; category badge colors and semantic success/attention/error feedback remain distinct; light appearance remains unchanged.

## Editable direction

- [PlannerThemeContinuity — English/Persian phone](http://127.0.0.1:6006/?path=/story/proposals-app-wide-dark-mode--planner-theme-continuity).
- [Same editable story — English/Persian wide](http://127.0.0.1:6006/?path=/story/proposals-app-wide-dark-mode--planner-theme-continuity&args=width:wide).
- Source: `design/studio/src/stories/DarkMode.stories.tsx`, `ScreenPreview.tsx`, `PlannerPreview.tsx`, `styles.css`.
- Inspected [phone evidence](evidence/2026-10-06-studio-dark/planner-phone.png) and [wide evidence](evidence/2026-10-06-studio-dark/planner-wide.png). Existing exports and styling are sufficient; no duplicate prototype is needed for this palette change.

## Token and component mapping

| Role | Existing shared dark value | Planner application |
| --- | --- | --- |
| Canvas | `--background`, `#101b1b` | Replace slate gradient; full writing canvas |
| Panel and field | `--surface`, `#1b2b29` | Week/day cards, section bodies, inputs, textareas/selects, all sheet panels, writing panel, sticky save bar |
| Muted surface | `--surface-muted`, `#243532` | Inset schedule/notes/totals areas, unselected secondary controls, language wrapper |
| Primary ink | `--foreground`, `#eef5f1` | Headings, field values, neutral labels and control text |
| Muted ink | `--muted-foreground`, `#b6c8c2` | Helper text, dates, placeholders, empty/loading copy |
| Decorative border | `--border`, `#3b5550` | Panels, dividers, neutral section boundaries |
| Field boundary | muted ink at 60% over surface | Input/textarea/select border; preserve stronger input recognition rather than replacing slate500 with a weak divider |
| Accent | `--primary`, `#72dbcb` | Selected week/day, Save/Add/apply actions, active links, focused field border |
| Accent ink | existing appearance selected ink, `#092522` | Text on filled selected/action controls; no white text on pale teal |
| Soft selection | `--primary-soft`, `#243e39` | Subtle selected/attention-to-active context, accent hover surface |
| Neutral hover | existing appearance hover, `#30443f` | Secondary controls; accent border/text supplies emphasis |
| Focus | existing global `#f5c66f`, 3px outline with offset | Keyboard focus across controls; retain current global visible focus |
| Backdrop | canvas hue at 60% opacity | Schedule/template/unsaved scrim, separate from solid sheet panel |

Use roles in dark branches; preserve the existing light branches. Category containers replace their common slate fill with the shared green panel; keep their fuchsia/cyan/amber/emerald/violet/sky/rose/lime/orange/indigo outlines and badge fills. Their existing dark badge ink may remain because these are category identity colors. Preserve rose destructive styling and amber/emerald status text with words; recolor neutral fill behind those cues. Disabled actions use muted surface and muted ink with existing disabled semantics.

The current shared LanguageToggle uses slate dark styles. Align its visible wrapper and select with these roles, either scoped to Planner or by reusing shared semantic dark roles in the component. Its light styling and language behavior remain unchanged. Reusing that dark role mapping elsewhere is visually consistent with the existing shared palette.

## States, content and accessibility

Keep existing hierarchy and all collapsed/expanded states. Example long content is the running draft “Finish the first complete draft and leave enough time for a thoughtful review.” and “مرور پیش‌نویس را با آرامش انجام بدهم و برای توضیح ایده‌هایی که هنوز کامل نشده‌اند وقت کافی بگذارم.” Existing story examples include minutes, category goals/notes, empty notes, schedule time and manual save in both languages. No new copy is required.

Use the role mapping consistently for empty/loading content, saved/unsaved/save error, disabled saving controls and destructive confirmation. These states retain their current words and status semantics. Local persistence/offline behavior is unchanged. Sheet sample data remains separate from user data.

Phone remains 360–390px with the existing reachable save bar and safe-area behavior; wider layouts retain their current grid. English LTR and Persian RTL use identical color roles. Text length, font scaling, mixed-direction dates and minutes, labels, touch targets, focus order and screen reader names remain governed by the shipped component. Color-only changes must not alter sizing, positioning, ARIA or event handlers.

Measured opaque text contrast: foreground/panel 13.32:1; muted/panel 8.45:1; foreground/muted surface 11.63:1; muted/muted surface 7.38:1; selected ink/accent 9.78:1; focus/panel 9.26:1. The shared divider border is decorative and has lower contrast; retain a stronger boundary for editable fields. Category differentiation also has visible names. Implementation QA should check actual rendered fields, hover/focus and translucent overlays rather than infer their contrast from opaque tokens.

## Verification and handoff decision

| Check | Evidence | Result |
| --- | --- | --- |
| Phone/wide English/Persian palette | Inspected existing studio evidence linked above, plus source role mapping | Passed for color direction; structural prototype is not current app layout |
| Current behavior comparison | Running `http://127.0.0.1:3010/` dark Planner DOM contains current save, templates, day collapse, schedule, long bilingual notes; source neutral colors are slate | Parent screenshot confirms navy/slate mismatch against target green; full implementation review follows |
| Studio typecheck/build | `npm run typecheck` and `npm run build` on 2026-10-06 | Passed; nonblocking existing bundle size warning |
| Contrast/state requirements | Calculated ratios above; current labels, disabled and semantic feedback sourced from component | Ready constraints recorded |
| Android/TalkBack | Not performed for this proposal | Release follow-up under standing maintainer direction |

Designer recommends implementation with the mapping above. No required design decision remains. The parent implementation workflow owns frontend validation, bounded rendered comparison of phone/wide EN/FA, nested panels and light regression, documentation and release. This ready design decision does not claim the new frontend palette is implemented or visually validated yet.

## Implementation verification

Frontend `ab37ee8` consumes shared semantic roles in dark branches. Existing light branches and category/status cues remain. Shared language control also consumes green roles. Independent review found two shadow utilities requiring explicit color hints; corrected and final compiled panel shadows verified in browser.

Docker lint, TypeScript,27 tests and local-data production build passed. Parent inspected actual EN/FA390px phone and1280px wide screenshots, English template/schedule sheets and full writing view, selected controls, field borders and global amber focus. Canvas `rgb(16,27,27)`, panel/input `rgb(27,43,41)`, selected background `rgb(114,219,203)` and selected ink `rgb(9,37,34)` match roles. Visible dark-neutral `bg-slate-*` elements: zero. Body width matches viewport; week rail retains its clipped horizontal scrolling. EN/FA light mode retains canvas `#f7f8f5`, white panels/fields and original selected teal/white colors. Unsaved sheet/disabled/semantic-error styling was source-reviewed, not separately triggered. No interaction or data handler changed.

Evidence: [English phone](evidence/2026-10-06-planner-green/english-phone.png), [Persian phone](evidence/2026-10-06-planner-green/persian-phone.png), [English wide](evidence/2026-10-06-planner-green/english-wide.png). Physical-device checks remain follow-ups under standing release policy.
