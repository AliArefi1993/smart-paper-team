# Planner bottom area

Status: implemented; bounded browser acceptance complete
Updated: 2026-10-09
Owning component: `smart-paper-front/src/components/weekly-planner.tsx`
Design type: proposed Android/local Planner layout change
Task: [Planner bottom area](../tasks/2026-10-09-planner-bottom-area.md)

## Evidence and direction

The maintainer reports unnecessary space after routine Save was removed. Source at frontend `052be41` confirms the mobile fixed area also contains autosave status and conditional Retry; Django mode retains manual save controls. Local save status under the week heading is hidden below `md`. The fixed area persists while day fields are focused. Reviewed running-baseline screenshots: [portrait](evidence/2026-10-09-planner-bottom-area/before-portrait.png) and [740×360 landscape](evidence/2026-10-09-planner-bottom-area/before-landscape.png), captured by lead on 2026-10-09. The landscape footer is about 73px tall, approximately 20% of viewport height, and covers the start of Day Schedule content. These are browser viewport screenshots, not a native keyboard test.

Recommend removing the fixed area in local autosave mode, together with its 7rem bottom reservation, and placing existing feedback/navigation in normal page flow. This recovers usable reading/writing space in portrait and short landscape views. Preserve Django mobile manual-save/footer behavior and its bottom reservation; backend saving is outside this change.

## Placement and states

1. Show existing save status and conditional Retry under the week heading on all widths, using the current text and theme roles. Keep the existing single screen-reader save live region; visible duplicate status is ordinary text.
2. Add a secondary **Next day / روز بعد** beside **Minimize all days** in the normal-flow day-navigation row before the day rail. It remains available when every day is minimized. Wrap controls on narrow phones rather than shrink their targets. The rail continues to provide arbitrary same-week navigation.
3. At the end of the **active, expanded day body**, add a small in-flow row with existing save status, conditional Retry, and the same Next day action. This keeps recovery and continuation reachable after writing without scrolling back to the week heading. Do not add it to other expanded days: the existing handler uses the globally active day. No fixed/sticky positioning or extra card overlay.
4. Preserve existing Next day semantics: local mode advances/reveals the following day and focuses/places its heading, retains visible failed edits in the same week, and never crosses weeks. In local mode, disable both Next buttons on the final day (Friday) rather than offering the current no-op/reveal-Friday action; its visible Friday heading provides context. Friday still allows other rail/day selections. This is the only deliberate navigation-state change. No invented next-week operation or new save requirement. Django `saveAndGoToNextDay` behavior remains unchanged.

| State | Required behavior |
| --- | --- |
| Initial/empty | Existing “Changes save automatically on this device.”; do not claim defaults were saved |
| Pending/saving/saved | Existing status text; preserve current disabled condition during saving/loading |
| Save failure | “Couldn’t save. Your changes are still here.” / “ذخیره نشد. تغییرات شما هنوز اینجاست.” with **Retry / تلاش دوباره** under week heading and active-day end; latest content retained |
| Loading | Existing loading state; no operative Next action without loaded week |
| All minimized | Next remains in top day-navigation row; no hidden active-day footer required |
| Friday | Next day remains visible but disabled; rail/day choices remain usable; no week departure or data reset |
| Full writing / schedule dialog | Existing controls/save feedback and keyboard behavior remain; they have their own recovery UI |

The status row is intentionally scrollable with content. Removing a permanent status overlay is the selected tradeoff; recovery remains at the top of the loaded week and end of active writing, with the existing live alert. Route/week departure guards, beforeunload protection and failed-snapshot recovery must remain intact. Same-week navigation stays available during failure. Do not add persistence, save calls, retry loops or duplicate live announcements.

## Editable bilingual canvas

[Story source](studio/src/stories/PlannerBottomArea.stories.tsx); controls support EN/FA LTR/RTL, Light/Dark, portrait/landscape/keyboard-short-height/wide and saved/error/pending/saving/empty/loading.

- [Portrait English Light](http://localhost:6006/?path=/story/proposals-planner-bottom-area--portrait-english-light), [Persian Dark](http://localhost:6006/?path=/story/proposals-planner-bottom-area--portrait-persian-dark), [Persian Light](http://localhost:6006/?path=/story/proposals-planner-bottom-area--portrait-persian-light), [English Dark](http://localhost:6006/?path=/story/proposals-planner-bottom-area--portrait-english-dark).
- [Landscape English](http://localhost:6006/?path=/story/proposals-planner-bottom-area--landscape-english), [Landscape Persian Dark](http://localhost:6006/?path=/story/proposals-planner-bottom-area--landscape-persian-dark).
- [Keyboard English](http://localhost:6006/?path=/story/proposals-planner-bottom-area--keyboard-english), [Keyboard Persian error](http://localhost:6006/?path=/story/proposals-planner-bottom-area--keyboard-persian-error), [Save failure](http://localhost:6006/?path=/story/proposals-planner-bottom-area--save-failure).
- [Friday](http://localhost:6006/?path=/story/proposals-planner-bottom-area--friday), [All minimized](http://localhost:6006/?path=/story/proposals-planner-bottom-area--minimized), [Loading](http://localhost:6006/?path=/story/proposals-planner-bottom-area--loading), [Empty](http://localhost:6006/?path=/story/proposals-planner-bottom-area--empty), [Wide](http://localhost:6006/?path=/story/proposals-planner-bottom-area--wide).

The illustrative keyboard reduces the canvas height; it does not simulate native IME events. Sample long English/Persian notes remain editable. Prototype Next and Retry simulate state changes without storage writes; production source/tests remain authoritative. No application header, section-card or writing-view redesign is proposed.

## Accessibility and implementation

Reuse existing navigation button appearance, save/error text roles, `renderRetryButton`, `saveStatusText`, `saveStatusClass` and `saveAndGoToNextDay`. Retain at least 44px targets (prototype uses 48px), visible focus and ordinary keyboard order. Use logical start/end alignment; long Persian error wraps before/alongside Retry and Next without clipping. On Next, existing day-header focus/scroll placement continues; saving never moves focus. Theme alone must not convey saving/failure. No new translations/assets are needed.

Local Planner padding should become ordinary bottom spacing plus safe-area inset instead of the fixed-footer reservation. Keep the original Django branch padding/footer. Do not replace min-height scrolling with a viewport-sized application scroller, hide page overflow vertically, or add keyboard detection just for this change. Confirm no local fixed footer at portrait 390×844, narrow 360px, landscape 740×360/844×390, and a short 390×380 viewport. Intentional horizontal week/day rails may scroll internally; no new root horizontal overflow is acceptable.

## Verification and handoff

| Check | Evidence | Result |
| --- | --- | --- |
| Current UI | Reviewed baseline portrait and 740×360 landscape captures plus owning source | Footer/status/Retry contents and short-height obstruction confirmed |
| Prototype type check | Host `npm run typecheck`, 2026-10-09 | Passed |
| Studio isolated Linux install/typecheck/build | Routine Docker `npm ci && npm run typecheck && npm run build`, 2026-10-09 | Passed; clean install reported 0 vulnerabilities; existing >500kB Storybook chunk advisory |
| Prototype bilingual portrait/landscape/keyboard/wide | [EN portrait](evidence/2026-10-09-planner-bottom-area/proposal-portrait-en.png), [FA Dark landscape](evidence/2026-10-09-planner-bottom-area/proposal-landscape-fa-dark.png), [FA Dark keyboard/error](evidence/2026-10-09-planner-bottom-area/proposal-keyboard-fa-error.png), [wide](evidence/2026-10-09-planner-bottom-area/proposal-wide.png), [FA error day-end](evidence/2026-10-09-planner-bottom-area/proposal-day-end-fa-error.png); lead DOM inspection of both inline action locations | Passed bounded visual review: hierarchy and long status wrap, Retry/Next wrap to separate rows at narrow width, no persistent overlay, controls scroll above illustrative keyboard. Canvas weekly-goal uses illustrative browser-default typography; production retains existing fonts. |
| Built production short landscape | [FA Dark landscape](evidence/2026-10-09-planner-bottom-area/after-landscape-fa-dark.png), 740×360, and [short-height](evidence/2026-10-09-planner-bottom-area/after-short-height-fa-dark.png), 390×380 | Accepted for shown editing/schedule/day-card regions: no local fixed footer, more vertical reading space, current typography and RTL retained. Existing horizontal overflow also occurred in baseline; broader landscape task remains unresolved. |
| Built production portrait | [EN Light](evidence/2026-10-09-planner-bottom-area/after-portrait-en.png), [FA Dark](evidence/2026-10-09-planner-bottom-area/after-portrait-fa-dark.png), corrected 390×844 captures | Accepted: week-heading save feedback visible on phone, focused Persian writing retained, layout/RTL/typography unchanged apart from selected controls; no fixed footer |
| Built production day-end controls | [FA Dark day-end](evidence/2026-10-09-planner-bottom-area/after-day-end-fa-dark.png), 390×844 | Accepted: existing save status and visibly disabled Friday Next fit the active expanded day end, clean RTL alignment, separation from editor and reachable document flow; no overlay. Failure/Retry behavior verified by lead runtime QA rather than this saved-state screenshot. |
| Browser behavior QA | Lead-reported persisted edits/rotation, all-minimized Next, Friday disabled, 48px actions, save failure/Retry, route/week departure guards, same-week failed draft retention and Retry/reload persistence | Passed lead runtime QA; Designer did not repeat these tests |
| Device | Actual keyboard/caret reachability, rotation preservation, TalkBack, upgrade | Follow-up; not certified by browser screenshots |

Required implementation regression checks: normal same-week Next, Friday disabled/no rollover, all-minimized recovery, pending/saved feedback, failed-save Retry retaining edited text, blocked route/week departure after failure, unchanged full-writing/schedule behavior and Django manual save/footer. Product contract and persistence are unchanged. Designer approved the ready handoff before implementation and now accepts the bounded rebuilt layout against the reviewed captures and reported browser QA. No design blocker remains for this change. Existing horizontal overflow belongs to the broader landscape task; native keyboard/rotation and TalkBack remain unverified follow-ups.
