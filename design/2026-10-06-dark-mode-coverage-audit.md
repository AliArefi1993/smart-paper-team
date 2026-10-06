# Design: Dark mode coverage gaps

Status: ready for implementation
Updated: 2026-10-06
Owning frontend components: `idea-space.tsx`, `focus-timer.tsx`, `globals.css`
Local studio stories: [CurrentLeaks](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--current-leaks), [FixedPhone](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--fixed-phone), [FixedWide](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--fixed-wide), [LightRegression](http://localhost:6006/?path=/story/fixes-dark-coverage-gaps--light-regression); [editable source](studio/src/stories/DarkCoverage.stories.tsx)
Design type: proposed coverage fix

## Problem and evidence

The user clarified the request to checking whether parts remain light in Dark mode. Source review of frontend `6d56f31` found two uncovered light surfaces. The earlier app-wide studio stories are illustrative route structures and do not reproduce every production control or Planner's separate slate palette. This audit uses production source and a dedicated excerpt preview, not those stories as proof of coverage.

| Gap | Source | Required dark treatment |
| --- | --- | --- |
| Idea Space spark expander and clear-spark action flash white on hover; teal labels lose contrast | `idea-space.tsx:157`, `:164`, `hover:bg-white/70` | Add dark override using existing hover surface `#30443f`; preserve existing label `#72dbcb` |
| Timer hourglass glass remains pale mint; dark teal frame is poorly distinguished against dark panel | `focus-timer.tsx:159`, `:162`, SVG fill/stroke literals | Dark glass uses `--primary-soft` (`#243e39`); both frame strokes use `--primary` (`#72dbcb`) |

## Outcome and scope

Fix these two gaps using existing dark roles. Acceptance: dark spark controls retain a dark surface on hover; hourglass glass and outline inherit dark roles in all timer phases; light rendering and gold sand `#d69a54` remain unchanged. Preview content is illustrative; no new capability or palette is proposed.

## Design direction

Preserve flow, hierarchy, text, and actions. Apply a shared CSS override to the existing hover utility and semantic classes to the timer SVG paths. English/Persian examples show the same coverage decisions: “Need a starting point?” / «برای شروع، یک جرقه می‌خواهید؟», “Clear spark” / «پاک کردن جرقه». Production translations remain authoritative.

## States and layouts

The excerpt stories show dark current/fixed phone and wide layouts plus light regression. A review-only checkbox holds hover appearance for comparison; the spark expander and clear action remain interactive. Existing language control is shown in its current dark slate treatment. Controls retain labels, visible focus, 44px button targets, `aria-expanded`, and RTL alignment. The SVG remains decorative (`aria-hidden`); timer text and progress retain existing accessible equivalents. Loading, empty, error, success, disabled and destructive states do not introduce these surfaces; their current source palettes were checked below.

## Implementation handoff

- `globals.css`: cover `.sp-page [class~="hover:bg-white/70"]:hover` under `html.sp-dark` using the existing dark hover surface.
- `focus-timer.tsx`: identify glass body and frame cap paths with semantic classes; dark-only CSS changes fill/stroke. Preserve light literals and sand geometry/color.
- Open decisions: none. Designer decision: ready for these coverage fixes, after source review and bilingual excerpt inspection. Running application comparison remains required after implementation; this does not validate a full app or Android build.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Seven-route source audit | Planner dark branches, day/section editing, schedule/template/unsaved sheets, writing view, savebar; Ideas edit/branch/search/errors; Timer panel/phase/settings; Finance lock/edit/forms; Summary filters/cards/details; Export lock/import; AI report dates/fields/status/preview; Settings inputs/feedback | Two gaps above; no other unmapped light surface found |
| Shared controls and special states | `LanguageToggle` already consumes `useTheme`; appearance control mapped; native inputs use dark `color-scheme`; Timer `from-[#ecf8f1]` gradient fully overridden; `bg-white`, `bg-white/80`, summary muted tiles, amber/error surfaces mapped | Covered in source; bright action/status colors and tiny day-content dot are intentional, not light panel leaks |
| EN/FA phone and wide excerpts | Browser screenshots of CurrentLeaks, FixedPhone, FixedWide and LightRegression; expanded spark controls inspected in both languages | Passed targeted preview checks; example text wraps and RTL order remains legible |
| Targeted contrast | sRGB calculation: `#72dbcb` on hover `#30443f` 6.28:1; SVG outline on glass 6.97:1 and panel 8.92:1 | Passed text/graphic contrast targets |
| Studio validation | `npm run typecheck`; `npm run build` | Passed 2026-10-06; existing bundle-size advisory only |
| Frontend implementation source | Designer reviewed `0186476` hover selector and SVG class diff against this handoff | Matches handoff; light colors/gold sand preserved. Committed and pushed. |
| Actual application / Android | Source-backed excerpt is not the application; no production screen/runtime comparison performed by this Designer review | Pending implementation comparison; native date/select popups, Android keyboard and touch remain device checks |
