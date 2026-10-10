# Design: Reachable event sheet in phone landscape

Status: implemented
Updated: 2026-10-10
Owning frontend: `smart-paper-front/src/components/weekly-planner.tsx`, schedule draft overlay near lines 1888–2010.
Design type: implemented bounded layout correction (ready handoff preceded frontend changes)
Editable canvas: [PhoneLandscape stories](studio/src/stories/PhoneLandscape.stories.tsx)
Review: [English landscape](http://localhost:6006/?path=/story/proposals-phone-landscape--english-landscape), [Persian landscape](http://localhost:6006/?path=/story/proposals-phone-landscape--persian-landscape), [Persian short error](http://localhost:6006/?path=/story/proposals-phone-landscape--persian-short-error), [Persian dark edit](http://localhost:6006/?path=/story/proposals-phone-landscape--persian-dark-edit).

## Problem and evidence

The maintainer reported phone landscape feels wrong and separately found Planner better after the footer removal. The current local-data Planner already keeps save status and Next day in flow. Preserve that behavior.

Against frontend `9419b2d`, the running local-data preview at `localhost:3100` confirmed the schedule overlay extends beyond the short viewport. At 740×360, the English event panel spans y=-60.5 to 420.5; Persian spans y=-63.5 to 423.5. The panel uses `overflow-y:visible`. The heading and bottom actions are clipped. Independent QA also reproduced English at 844×390 (panel -45.5..435.5) and 640×320 (-80.5..400.5). This is a concrete interaction failure: rotating while entering an event makes save/cancel unreachable.

Sources: [landscape task](../tasks/2026-10-09-phone-landscape-layout.md), [product contract](../PRODUCT.md), [foundations](foundations.md), the schedule component, and live browser screenshots/DOM measurements. Browser evidence supports WebView layout; native Android keyboard, rotation and TalkBack remain physical-device follow-ups.

## Outcome and scope

Keep the entire existing event form reachable at 640×320, 740×360 and 844×390, including errors and long notes, while retaining portrait and wide layouts. Only the schedule panel's height and scrolling change. Preserve all draft fields, event identity, dates, save/delete/cancel behavior, translations, auto-save, in-flow navigation and focus styling. No forced orientation, global breakpoint changes or Timer redesign.

Acceptance: panel stays inside the overlay's 16px padding; internal vertical scrolling reaches title and actions; rotation preserves input; no page-level horizontal overflow; English/Persian and Light/Dark pass; portrait 390×844 and wide 1100×720 remain usable.

## Design direction and states

Retain hierarchy: event heading → existing validation error → title → start/end → section → optional note → save, optional delete, cancel. Reuse existing green palette, borders, field labels and action styles. English content includes “Review the project draft with a clear next step”; Persian includes «مرور پیش‌نویس پروژه و تعیین قدم بعدی روشن». Keep time fields readable in RTL.

Constrain the panel to the dynamic viewport height minus both existing 16px overlay paddings; enable vertical overflow scrolling on that panel. Keep its 512px maximum width and current bottom/center alignment. Do not make the actions another fixed footer. Scrolling is preferable to compressing field labels or shrinking touch targets. Long GrowingTextarea content may enlarge its natural height; the surrounding panel remains scrollable.

The editable stories cover new/edit, error, long English/Persian text, Light/Dark, 320/360px landscape, portrait, wide and 220px keyboard-height simulation. Add/save closes the simulated sheet only; stories do not persist production records. Loading/offline/success states retain existing app behavior and gain no separate layout. No new destructive interaction is proposed; edit/delete merely exercises reachability.

Existing keyboard focus/labels must survive unchanged. Tab navigation should scroll a newly focused field/action into view; swipe/wheel must reach both form ends. Retain touch targets, screen-reader field names and non-color validation text. Keyboard-height simulation is structural evidence only. Do not claim native keyboard or TalkBack validation.

## Implementation handoff

On the schedule draft panel currently beginning `w-full max-w-lg rounded-2xl`, add a height bound equivalent to `max-height:calc(100dvh - 2rem)` and `overflow-y:auto`. No React state or conditional rendering change is required. Keep the existing overlay padding and schedule field layout. Other sheets are outside this confirmed fix unless independently reproduced and separately reviewed.

Open decisions: none for the bounded fix. Designer recommends implementation. Bilingual studio phone/wide render and build review passed. Production English/Persian landscape comparison passed after implementation. Prototype dialog semantics illustrate the form context; no production ARIA or focus-management change is in scope.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current schedule at 740×360 English/Persian | CUA live screenshots inspected, panel bounds and overflow measured | Confirmed clipping |
| Independent English landscape reproduction | QA at 640×320,740×360,844×390 | Confirmed clipping |
| Studio TypeScript | Docker `npm run typecheck` | Passed |
| Studio production build and rendered proposals | Docker isolated `npm ci`, typecheck, build passed; 12 stories have panel within 16px bounds and internal overflow; EN/FA landscape/error/dark action/wide screenshots inspected | Passed |
| Implemented landscape comparison | Designer independently inspected QA EN Dark error/top/actions and FA Light top/actions; panel16..344 at740×360, overflow auto; matches bounded layout | Passed |
| Seven-route matrix, rotation/input and portrait | [Independent QA record](2026-10-10-phone-landscape-qa.md); portrait artifact verified 390×844 | Bounded acceptance passed; residual EN Planner width metric documented without visible clipping |
| Physical Android keyboard/TalkBack | Device required | Follow-up |

Saved editable-proposal evidence: [Persian short error](evidence/2026-10-10-landscape/studio-persian-short-error.png), [reachable short-height actions](evidence/2026-10-10-landscape/studio-fa-short-actions.png), [English long note](evidence/2026-10-10-landscape/studio-english-long-note.png), [Persian portrait](evidence/2026-10-10-landscape/studio-persian-portrait.png), [Persian wide](evidence/2026-10-10-landscape/studio-persian-wide.png). These are proposal simulations, not implemented screenshots.

Implemented comparison evidence: [English Dark required-title error](evidence/2026-10-10-landscape/qa-en-740-top-dark.png), [English Dark reachable actions](evidence/2026-10-10-landscape/qa-en-740-actions-dark.png), [Persian title/focus](evidence/2026-10-10-landscape/qa-fa-740-top.png), [Persian reachable actions](evidence/2026-10-10-landscape/qa-fa-740-actions.png). Existing production field/action styles differ from the simplified studio sketches as expected; form hierarchy, 16px height bounds and internal scrolling match. No design mismatch requires further scope.
