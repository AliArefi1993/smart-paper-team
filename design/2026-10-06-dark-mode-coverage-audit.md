# Design: Dark mode coverage gaps

Status: implemented; bounded actual-application comparison passed
Updated: 2026-10-06
Owning frontend components: `idea-space.tsx`, `focus-timer.tsx`, `globals.css`; studio correction: `ScreenPreview.tsx`, `styles.css`
Local studio stories: [CurrentLeaks](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--current-leaks), [FixedPhone](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--fixed-phone), [FixedWide](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--fixed-wide), [LightRegression](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--light-regression); [editable source](studio/src/stories/DarkCoverage.stories.tsx)
Design type: implemented coverage fix; shared studio correction

## Problem and evidence

The user clarified the request to checking whether parts remain light in Dark mode. Source review of frontend `6d56f31` found two uncovered light surfaces. That review covered application source and dedicated excerpts; it missed light leaks in the original studio designs. The user's screenshot of [PlannerThemeContinuity](http://localhost:6006/?path=/story/proposals-app-wide-dark-mode--planner-theme-continuity) shows white section cards and fields with pale dark text. The earlier app-wide studio stories are illustrative route structures and do not reproduce every production control or Planner's separate slate palette.

Studio correction is complete and verified: the existing dark panel, ink, border, accent and focus roles now cover all four Planner section cards, week rail, labeled fields, quick-add controls and Timer preview glass/frame. The dark proposal board uses the existing dark canvas and readable review labels. Light baselines and current layouts/content are preserved. This correction does not request frontend application edits.

| Gap | Source | Required dark treatment |
| --- | --- | --- |
| Idea Space spark expander and clear-spark action flash white on hover; teal labels lose contrast | `idea-space.tsx:157`, `:164`, `hover:bg-white/70` | Add dark override using existing hover surface `#30443f`; preserve existing label `#72dbcb` |
| Timer hourglass glass remains pale mint; dark teal frame is poorly distinguished against dark panel | `focus-timer.tsx:159`, `:162`, SVG fill/stroke literals | Dark glass uses `--primary-soft` (`#243e39`); both frame strokes use `--primary` (`#72dbcb`) |
| Studio Planner section cards (including tints 2–4), fields, week rail and quick-add controls remain light under pale dark ink | `studio/src/styles.css`, Planner rules after initial dark mappings | Dark panel `#1b2b29`, ink `#eef5f1`, border `#3b5550`; placeholder `#b6c8c2`, selected rail accent with dark ink; amber focus and dark hover |
| Studio Timer SVG remains light; dark story canvas remains pale | `studio/src/ScreenPreview.tsx`, shared preview styles | Semantic SVG glass/frame classes consume studio dark soft/accent; dark-only board uses canvas `#101b1b` and readable metadata |

## Outcome and scope

Application scope: fix the two application gaps using existing dark roles. Acceptance: dark spark controls retain a dark surface on hover; hourglass glass and outline inherit dark roles in all timer phases; light rendering and gold sand `#d69a54` remain unchanged. Studio scope: correct shared Planner/Timer previews and the dark proposal board as specified above. Preview content is illustrative; no new capability or palette is proposed.

## Design direction

Preserve flow, hierarchy, text, and actions. Apply a shared CSS override to the existing hover utility and semantic classes to the timer SVG paths. English/Persian examples show the same coverage decisions: “Need a starting point?” / «برای شروع، یک جرقه می‌خواهید؟», “Clear spark” / «پاک کردن جرقه». Production translations remain authoritative.

## States and layouts

The excerpt stories show dark current/fixed phone and wide layouts plus light regression. A review-only checkbox holds hover appearance for comparison; the spark expander and clear action remain interactive. Existing language control is shown in its current dark slate treatment. Controls retain labels, visible focus, 44px button targets, `aria-expanded`, and RTL alignment. The SVG remains decorative (`aria-hidden`); timer text and progress retain existing accessible equivalents. Loading, empty, error, success, disabled and destructive states do not introduce these surfaces; their current source palettes were checked below.

## Implementation handoff

- `globals.css`: cover `.sp-page [class~="hover:bg-white/70"]:hover` under `html.sp-dark` using the existing dark hover surface.
- `focus-timer.tsx`: identify glass body and frame cap paths with semantic classes; dark-only CSS changes fill/stroke. Preserve light literals and sand geometry/color.
- Open decisions: none. Designer decision: coverage fixes match the handoff and pass the bounded bilingual application comparison below. Native controls and physical Android checks remain separate.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Seven-route application source audit | Planner dark branches, day/section editing, schedule/template/unsaved sheets, writing view, savebar; Ideas edit/branch/search/errors; Timer panel/phase/settings; Finance lock/edit/forms; Summary filters/cards/details; Export lock/import; AI report dates/fields/status/preview; Settings inputs/feedback | Two application gaps above; no other unmapped application light surface found. Original studio coverage was not checked by this audit. |
| Shared controls and special states | `LanguageToggle` already consumes `useTheme`; appearance control mapped; native inputs use dark `color-scheme`; Timer `from-[#ecf8f1]` gradient fully overridden; `bg-white`, `bg-white/80`, summary muted tiles, amber/error surfaces mapped | Covered in source; bright action/status colors and tiny day-content dot are intentional, not light panel leaks |
| EN/FA phone and wide excerpts | Browser screenshots of CurrentLeaks, FixedPhone, FixedWide and LightRegression; expanded spark controls inspected in both languages | Passed targeted preview checks; example text wraps and RTL order remains legible |
| Targeted contrast | sRGB calculation: `#72dbcb` on hover `#30443f` 6.28:1; SVG outline on glass 6.97:1 and panel 8.92:1 | Passed text/graphic contrast targets |
| Studio validation | `npm run typecheck`; `npm run build` | Passed 2026-10-06; existing bundle-size advisory only |
| Frontend implementation source | Designer reviewed `0186476` hover selector and SVG class diff against this handoff | Matches handoff; light colors/gold sand preserved. Committed and pushed. |
| Actual application | Local-data production build `37b91ec` at http://127.0.0.1:3010/; exact route/state evidence below | Bounded EN/FA dark-surface comparison passed 2026-10-06; no additional application light-surface defect found in inspected states |
| Native / Android | Browser comparison does not render native file/date/select popups or establish device behavior | Physical Android keyboard, touch, TalkBack and native-control checks remain separate |

## Studio correction verification

The application-only audit above did not validate the original studio designs. The user's screenshot exposed that omission. The following checks compare the corrected designs with running Storybook, not the application.

| Check | Evidence | Result |
| --- | --- | --- |
| Exact reported Planner story, EN/FA phone and wide | [PlannerThemeContinuity](http://localhost:6006/?path=/story/proposals-app-wide-dark-mode--planner-theme-continuity); Controls → width: wide. Screenshots: [phone](evidence/2026-10-06-studio-dark/planner-phone.png), [wide](evidence/2026-10-06-studio-dark/planner-wide.png) | Passed 2026-10-06: computed 390px/680px frames without overflow; all four section cards, inputs, textareas and quick-add buttons use `#1b2b29` / `#eef5f1`; placeholders `#b6c8c2`, board `#101b1b`. Wide sections retain two columns. |
| Focus and contrast | Keyboard Tab into quick-add; computed 3px `#f2c578` outline; source hover and placeholder selectors inspected. sRGB calculations | Field text 13.32:1; placeholder 8.45:1; accent label on soft 6.89:1; selected rail 9.78:1; focus against panel 9.15:1. Targets remain 44px. |
| Shared dark route coverage | Remaining 14 exports in `DarkMode.stories.tsx`, each EN/FA; populated/empty/filtered summaries, report, export lock/replace dialog, finance populated/locked, ideas populated/empty, timer running, settings, summaries/report wide | Computed audit found no opaque near-white element backgrounds and no frame overflow. This is surface coverage, not full interaction or accessibility validation. |
| Timer shared preview | [TimerRunning](http://localhost:6006/?path=/story/proposals-app-wide-dark-mode--timer-running); [screenshot](evidence/2026-10-06-studio-dark/timer-phone.png) | Bilingual screenshot inspected; glass `#1c403b` and frame `#72dbcb` consume the existing studio palette. Gold sand and geometry preserved. Both generated baseline SVG and state SVG use semantic classes. |
| Light regression | [Planner populated](http://localhost:6006/?path=/story/shipped-baselines-planner--populated); [screenshot](evidence/2026-10-06-studio-dark/planner-light.png) | EN/FA original four card tints, white fields, dark ink and light canvas retained; no frame overflow. Dark selectors and SVG classes do not replace light literals. |
| Studio validation | `npm run typecheck`; `npm run build`; `git diff --check` | Passed 2026-10-06; existing bundle-size advisory only. |

These studio results are separate from the actual application evidence below.

## Actual application comparison

Designer reviewed the running local-data production build `37b91ec` on 2026-10-06 at http://127.0.0.1:3010/. The scope is visible dark surfaces, readable controls and feedback, English/Persian direction, and overflow at 390px phone plus relevant 1280px wide layouts. Disposable preview data was used. No external AI provider, share, production data or APK action was invoked.

| Route | Exact runtime language/state coverage | Evidence / result |
| --- | --- | --- |
| Summaries | EN and FA phone populated cards, empty weeks and 1-month filter; FA wide populated view | [EN filtered](evidence/2026-10-06-app-dark/summaries-en-filtered.png), [FA filtered](evidence/2026-10-06-app-dark/summaries-fa-filtered.png), [EN empty weeks](evidence/2026-10-06-app-dark/summaries-en-empty-visible.png), [FA empty weeks](evidence/2026-10-06-app-dark/summaries-fa-empty-visible.png), [FA wide](evidence/2026-10-06-app-dark/summaries-fa-wide.png). Cards, details, totals and filter controls remain dark and readable. |
| Export / AI report | FA phone expanded deterministic report, dates/checkboxes/status and finance opt-in lock warning; EN phone wrong-PIN error; EN wide expanded report and export/import controls. Import merge/replace/file-picker controls visible in both languages | [FA report](evidence/2026-10-06-app-dark/report-fa-preview.png), [FA finance lock](evidence/2026-10-06-app-dark/report-fa-finance-locked.png), [EN PIN error](evidence/2026-10-06-app-dark/export-en-pin-error.png), [EN wide report](evidence/2026-10-06-app-dark/report-en-wide-preview.png). Report text, disabled/lock/error surfaces and inputs readable. Existing deterministic report content is English in both UI languages. |
| Finance | EN and FA phone locked and populated views, goal settings, saved-income history and entry editor; FA income-added success feedback | [EN lock](evidence/2026-10-06-app-dark/finance-en-locked.png), [FA lock](evidence/2026-10-06-app-dark/finance-fa-locked.png), [EN populated](evidence/2026-10-06-app-dark/finance-en-populated-settings.png), [FA populated](evidence/2026-10-06-app-dark/finance-fa-populated-settings.png), [EN editor](evidence/2026-10-06-app-dark/finance-en-entry-edit.png), [FA editor](evidence/2026-10-06-app-dark/finance-fa-entry-edit.png). Cards, amber notice, fields, notes and actions readable. Closed date input inspected; native picker excluded. |
| Idea Space | EN and FA phone expanded optional sparks, empty composer, populated thought and long FA text editor; actual expander hover in both languages and clear-spark hover in FA | [EN sparks](evidence/2026-10-06-app-dark/ideas-en-sparks.png), [FA sparks](evidence/2026-10-06-app-dark/ideas-fa-sparks.png), [EN editor](evidence/2026-10-06-app-dark/ideas-en-editor.png), [FA editor](evidence/2026-10-06-app-dark/ideas-fa-editor.png), [FA clear hover](evidence/2026-10-06-app-dark/ideas-fa-clear-hover.png). Actual hover background `rgb(48, 68, 63)` and ink `rgb(114, 219, 203)` match handoff; EN clear-action hover is source-backed by the same selector, not separately invoked. |
| Timer | FA phone running panel/hourglass and numeric session settings; EN phone paused panel, settings and field focus; EN wide panel/settings | [FA panel](evidence/2026-10-06-app-dark/timer-fa-panel.png), [EN settings](evidence/2026-10-06-app-dark/timer-en-settings.png), [EN wide](evidence/2026-10-06-app-dark/timer-en-wide.png). SVG glass computed fill `rgb(36, 62, 57)` and frame stroke `rgb(114, 219, 203)`; gold sand retained. Timer deadline/background behavior is outside this surface review. |
| Settings | EN and FA phone active/inactive section controls and unchanged-save success feedback; FA inactive notification/time-field focus; FA wide reload | [EN feedback](evidence/2026-10-06-app-dark/settings-en-feedback.png), [FA feedback](evidence/2026-10-06-app-dark/settings-fa-feedback.png), [FA notification](evidence/2026-10-06-app-dark/settings-fa-notification.png), [FA wide reload](evidence/2026-10-06-app-dark/settings-fa-wide-reload.png). Controls/feedback readable and stored dark theme survives navigation/reload. Native picker and Android notification dispatch excluded. |

Inspected visible route states had `html.sp-dark`, no horizontal document overflow, and no opaque near-white panel/background leak in the targeted viewport audit. The Planner runtime comparison is recorded in [its task](../tasks/2026-10-06-planner-day-minimization.md); that review accepted its then-current slate palette. Subsequent maintainer preference aligns Planner to shared green roles; see [the palette handoff](2026-10-06-planner-shared-dark-palette.md). No further application patch is required by this bounded review.

### Limits

Import success/error feedback remains **source-backed only**: the browser file-chooser interaction stalled before a file could be supplied, so import/merge/replace execution and resulting feedback were not runtime tested. No external generated AI report was requested; the visible deterministic preview was checked in both languages. Screenshots and DOM checks establish the named browser surfaces, not exhaustive feature QA, native popup appearance, physical Android/TalkBack behavior or a release gate. Earlier Docker lint/types/27 tests/build passed for `37b91ec`; this review changed documentation/evidence only.
