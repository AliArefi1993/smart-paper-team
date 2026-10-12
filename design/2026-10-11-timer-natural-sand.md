# Design: Natural sand focus timer

Status: implemented
Updated: 2026-10-11
Owning frontend route/component: `/timer`, `smart-paper-front/src/components/focus-timer.tsx` and timer-specific rules in `src/app/globals.css`
Design type: proposed visual change

Editable studio: [component and SVG geometry](studio/src/TimerNaturalSand.tsx), [isolated styles](studio/src/timer-natural-sand.css), [stories](studio/src/stories/TimerNaturalSand.stories.tsx).

Specific preview stories on the task studio at `http://localhost:6007`:
[Running](http://localhost:6007/?path=/story/proposals-timer-natural-sand--running), [Ready](http://localhost:6007/?path=/story/proposals-timer-natural-sand--ready), [Paused](http://localhost:6007/?path=/story/proposals-timer-natural-sand--paused), [Completed](http://localhost:6007/?path=/story/proposals-timer-natural-sand--completed), [Dark Persian at 360px](http://localhost:6007/?path=/story/proposals-timer-natural-sand--dark-persian), [Wide](http://localhost:6007/?path=/story/proposals-timer-natural-sand--wide), [Reduced motion](http://localhost:6007/?path=/story/proposals-timer-natural-sand--reduced-motion), [Near completion](http://localhost:6007/?path=/story/proposals-timer-natural-sand--near-completion), [0/50/100 geometry](http://localhost:6007/?path=/story/proposals-timer-natural-sand--geometry-endpoints).

## Problem and evidence

The maintainer requests more visible moving sand and natural colours. The shipped SVG has flat ochre rectangular fills behind green glass outlines; the fills change with timer progress but there are no falling particles. This evidence establishes a visual preference, not a measured usability issue. PRODUCT.md establishes focus/rest timing, editable durations, persistence/deadline recovery, explicit next-phase start, and no planner logging/background alarm. Those contracts remain unchanged.

## Outcome and scope

Make the existing decorative hourglass look like warm mineral sand inside clear glass with a natural wood frame. The countdown, progressbar, phase labels and controls remain the authoritative time and state information. Reuse the existing layout, 160×190 viewBox and responsive wrapper. No canvas, requestAnimationFrame, fullscreen, new settings, translation strings, timer persistence or behavior changes.

Acceptance: upper sand decreases and lower dune increases from ready to completion; visible falling grains only animate while running; pause freezes them without looping; ready/completed have no stream; reduced-motion has no particle motion. Light and Dark retain readable controls/countdown with distinct sand/glass/frame. Geometry is identical in English/Persian. Phone widths 360–390px and wide layouts remain usable.

## Design direction

Existing flow and hierarchy: phase context → phase selector/hint → hourglass → countdown/status → progressbar → primary timer action and Reset → duration settings/errors. Do not transplant the studio's illustrative headers/copy into production. Existing translated text remains authoritative; English `Pause`/`Resume` and Persian `توقف`/`ادامه` demonstrate action-length differences.

A separate SVG component is recommended. Reuse the shipped upper/lower shell paths, with a thinner 3-unit neutral glass stroke. A slight bowl-shaped upper surface and peaked lower dune replace flat rectangular deposits; a sparse repeating dot texture differentiates sand from tinted glass. Add unobtrusive glass reflection strokes and rounded walnut caps. Keep UI action teal; the natural palette is confined to the hourglass.

| SVG role | Light | Dark |
| --- | --- | --- |
| Sand highlight | `#d5b477` | `#e0c184` |
| Sand body | `#b88a48` | `#bf9656` |
| Sand shadow | `#8c6334` | `#916a3d` |
| Glass fill (gradient opacity .15–.7) | `#e9eee8` | `#33423e` |
| Glass edge | `#89938a` | `#95a69b` |
| Glass reflection | `#fffdf5` | `#b6c8c2` |
| Frame | `#70523a` | `#b69a78` |
| Frame highlight | `#a48564` | `#dfc8a4` |

For clamped percentage `p`, upper surface y = `28 + 66 * (1 - cbrt(1 - p/100))`; use a Q curve dipping four units at centre. Lower dune peak y = `170 - .66*p`, shoulders 14 units below peak, base y171; clip to lower bulb. These are a visual progress metaphor, not a physical mass simulation; numerical time/progress remains exact. Hide top sand at100 and bottom sand at0.

Seven staggered grains at x77.6–80, radius 1–1.2, start y95, linear .70–1.00 second loops with negative delays spaced .17 seconds. Travel distance equals current dune peak minus95 (minimum8), so grains land on the dune. CSS transform only; no JS animation clock. Pause with `animation-play-state:paused`. A single per-instance `useId` namespace protects all clip/gradient/pattern references when multiple timers render. Reduced-motion suppresses particles; timed fill geometry can still update without CSS transitions.

## States and layouts

- Ready: full upper sand, empty lower bulb, no stream. Running: sand levels follow real remaining time and particles loop. Paused: same level, frozen particles. Completed: upper empty, dune full, no stream; current completion copy/action retained.
- Initialization/loading, invalid duration, storage errors, offline use and disabled controls keep current behavior; the SVG introduces no new feedback or destructive operation. Error/settings text is outside the unchanged hourglass wrapper.
- Phone: retain 160px×192px visual footprint. Wide: retain192px×224px. Do not add fixed screen heights or page overflow restrictions.
- Arabic/Persian RTL: symmetrical object remains unchanged; keep countdown LTR and existing text/font direction. No text inside SVG. Touch targets, keyboard controls, global focus outlines and existing roles remain untouched.
- Decorative SVG has `aria-hidden=true`; do not announce grains/progress every frame. Existing `role=timer` with `aria-live=off`, polite status and progressbar remain the accessible state. Sand is never the only state/time cue.

## Implementation handoff

Map `NaturalHourglass` to a production SVG component receiving clamped progress and actual status. Replace only existing inline hourglass markup; add scoped theme/animation rules and remove or supersede old green-glass timer overrides. Studio UI interactions and synthetic14:30 countdown are illustrative, not production logic. Do not copy the prototype state machine or sample copy.

Ready for implementation decision: Designer recommends this visual direction after the source comparison, bilingual studio inspection and passing studio checks. No unresolved product/design decisions. Proposed palette and geometry are recommended; production may refine dune conservation at intermediate percentages while retaining endpoints and the visible falling stream.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current source comparison | FocusTimer hourglass and dark overrides inspected; baseline rectangular deposits and no grains confirmed | Pass |
| Studio typecheck | Docker Node24; final source check | Pass |
| Studio build | Docker Node24, isolated Linux dependencies; successful static Storybook build | Pass |
| Phone/wide EN/FA Light/Dark visual inspection | IAB rendered bilingual390px, Persian360px Dark and wide stories; natural glass/frame/sand visible; illustrative header style isolated | Pass |
| Paused/reduced motion and endpoints | IAB0/50/100 snapshot; all14 bilingual grains computed paused, reduced-motion all14 display none; ready/completed without stream | Pass |
| Running production comparison | Designer inspected built-preview screenshots at390px Persian Dark and1024px English Light; checked implementation paths/palette/motion CSS against approved story | Pass |
| Physical Android/TalkBack | Not available in this local design pass | Follow-up |

## Implementation acceptance

Designer accepts the implemented hourglass on 2026-10-11. The built local-data preview at `http://localhost:3017/timer` matches the selected warm sand, walnut frame, neutral glass, grain texture, reflections and dune direction. Independently inspected lead-captured `production-fa-dark.jpg` (390px Persian RTL) and `production-en-light-wide.jpg` (1024px English LTR) from `/private/tmp/sp-timer-preview/`; the hourglass fits cleanly, remains distinct against both surfaces, and leaves the countdown, state, controls and duration settings readable. Retained review evidence: [Persian dark phone](assets/timer-natural-sand/persian-dark-phone.jpg), [English light wide](assets/timer-natural-sand/english-light-wide.jpg), and [English light phone](assets/timer-natural-sand/english-light-phone.jpg). Direct Designer browser access was unavailable due to missing IAB and failed browser request-header policy; this acceptance is explicitly screenshot/source based.

Source comparison confirms unchanged wrapper footprints and timer controls/copy/state semantics; production's evenly spread grain x77.6–82.4 is an accepted refinement within the neck channel. Seven grains, radii1/1.2, staggered timing, palette, clamped fill formulas, unique IDs, decorative semantics and reduced-motion suppression match the handoff. The lead separately verified no horizontal overflow at360/390/1024px,160px/192px hourglass widths, running seven grains, all seven paused with unchanged transforms over separate observations, completed zero grains, deadline recovery and explicit next-phase start. Those runtime findings are reported by the lead, not repeated by Designer.

No design blocker remains for commit/release. Actual Android motion preference, physical-device layout and TalkBack remain follow-ups.
