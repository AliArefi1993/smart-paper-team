# Design: Baseline story refinement

Status: needs validation
Updated: 2026-10-04
Owning frontend routes/components: all seven shipped routes; source is `smart-paper-front/src/components/`
Local studio stories: [`studio/src/stories/`](studio/src/stories/)
Design type: closer reference for current shipped behavior, not a product redesign

## Problem and evidence

Designer and QA reviewed the initial 32 bilingual stories on 2026-10-03. Their findings are recorded in [`tasks/2026-10-01-full-app-design-coverage.md`](../tasks/2026-10-01-full-app-design-coverage.md). The initial prototypes used a universal header and footer, hid the page behind generic state cards, used a circular timer, and showed editorial instructions as screen copy. Those patterns do not match the shipped frontend source.

## Design direction

- Use the route-specific header destinations found in the shipped components. Planner keeps its denser navigation and theme choices; focused routes show their own smaller destination sets. Remove the invented footer.
- Show schedule, template, unsaved, delete, and replace decisions as sheets over their owning page. Keep the underlying page visible as context.
- Give the timer a focus/rest phase control, hourglass, visible remaining time, progress, and session lengths in running, paused, and completed states.
- Give locked and empty states a clear page-level state without showing contradictory populated data underneath. Use actual labeled controls in state sketches, and at least 44px action targets.
- Replace design-instruction copy inside screens with illustrative user-facing English and Persian examples. The production translation source remains `smart-paper-front/src/lib/i18n.ts`.
- Planner's populated and sparse stories show the editable structure used by the shipped screen: weekly goal/note, selected day note and schedule, then a minutes input, +15/+30/+60/reset controls, goal, and note for each illustrative active section. Section minute shortcuts work locally in the prototype.

## Coverage and constraints

The seven route files and 32 named states are retained. Storybook controls switch language and phone/wide preview. These are static state previews: buttons and fields show hierarchy and focus treatment, but the prototype does not implement product data mutations or navigation. Wide mode is a preview width and has not been validated as the shipped responsive layout.

Remaining work before Designer and QA approval: compare every route and key state with the running local-data app in English and Persian; replace remaining generic inline state cards with route-specific layouts; cover loading, error, success, disabled, keyboard, long-text, dark planner, and Android safe-area behavior where applicable. Physical Android review is separate. No story in this refinement is marked ready for frontend implementation.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Local Storybook type check and build | `npm run typecheck`, `npm run build` on 2026-10-04 | Passed |
| Browser review of representative EN/FA states | Planner schedule sheet, Timer running, Finance locked in local Storybook; visual and accessibility snapshots | Passed for these samples |
| Planner section detail | Populated and sparse EN/FA stories show four distinct section forms; Main +15 updates only its own minutes in both languages | Passed in local browser |
| Comparison with running local-data frontend | Host preview requires missing macOS Next.js SWC binary | Blocked locally |
| Designer and QA approval of refined designs | Requires full comparison and state review | Pending |
