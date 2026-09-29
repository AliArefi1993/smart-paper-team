# Task: Coherent and accessible visual design

Status: complete
Created: 2026-09-29
Updated: 2026-09-29

## Objective

Review the Android-first English/Persian interface and apply a consistent, meaningful color and interaction system that improves readability, visual hierarchy, and state recognition.

## Context

- Owning repository: `smart-paper-front/`; coordination notes in this repository.
- The planner currently has light and dark modes, while other routes use separate dark palettes.
- The product is a personal planner and finance record stored locally in the APK.

## Acceptance Criteria

- [x] Core routes share a calm visual language with semantic action, attention, error, and success colors.
- [x] Small text on primary controls has sufficient contrast, and selected week/day states have programmatic cues.
- [x] English and Persian layouts, including the mobile RTL day rail, remain usable in browser preview.
- [x] Relevant frontend checks pass and browser visual review is complete.
- [x] Current product memory reflects the change.

## Plan

1. Apply designer's palette and accessibility recommendations in the frontend.
2. Validate with lint, type check, build, and browser review.
3. Update durable memory, commit scoped changes, and push current branches.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Frontend lint/type/build | `npm run lint && npx tsc --noEmit && NEXT_PUBLIC_DATA_MODE=local npm run build` in Docker | Passed, 2026-09-29 |
| Focused tests | `npm test` in Docker | 5 passed, 2026-09-29 |
| English/Persian visual review | Local browser at desktop and 390px mobile width, all five routes | Passed, 2026-09-29 |

## Decisions And Risks

- Palette uses paper, ink, and deep teal to reduce competing visual signals; no fixed emotional effect is claimed for a hue.
- Teal on white primary controls must meet normal-text contrast. Touch controls target roughly 44 CSS pixels where practical.

## Outcome / Handoff

Frontend revision `a385e47` was committed and pushed to `main`. All five screens now share a paper-and-teal palette; the planner keeps an optional dark mode. Primary controls have deeper teal for small white text, selected weeks/days have checkmarks and programmatic state, and the RTL week/day rails work in mobile browser preview. Document language/direction follows the chosen language. Physical Android layout and interaction checks remain part of APK readiness.
