# Design: Empty-day morning notification

Status: implemented
Updated: 2026-10-14
Owning frontend route/component: `src/lib/notifications.ts`, `src/lib/i18n.ts`, existing `src/components/settings-view.tsx` reminder section
Design type: proposed change
Optional Figma: not required

## Problem and evidence

The [Product brief](2026-10-14-empty-day-notification-product.md) and read-only personal systems assessment support suppressing an interruption when the reminder's target date has no saved timed events. Current `notificationBody()` instead uses Settings explanatory text as the notification body. Notes, goals and rest may still be meaningful plans; absence of timed events must not be described as absence of a plan.

Compared with baseline frontend `9aee030` running at port 3210: English and Persian Settings show the existing reminder title, explanatory paragraph, active checkbox, time input and end-of-form Save Settings. The success message says settings were saved; it makes no scheduling claim. The proposal changes only the paragraph and scheduling decision, retaining that flow and feedback.

## Outcome and scope

- Enabled/permitted reminders cancel the existing pending notification and schedule nothing when the actual next reminder date has zero timed events, a missing day or missing week. Do not search ahead for a later populated day.
- Removing the last event cancels a stale preview on existing synchronization; later addition schedules normally. Saved enabled choice/time remain intact.
- Keep the title, first four timed-event previews, selected time, serialized/coalesced synchronization, local target-week loading, offline operation and Planner save independence.
- No planning nudge, no extra status/banner, no notes/goals in notification bodies, no new controls, no delivery guarantee.

## Design direction and exact copy

Retain the current title and controls. Replace `notificationDescription` with:

| Locale | Settings disclosure |
| --- | --- |
| English | Get a local Android reminder for the day's timed events. No reminder is sent when that day has no timed events. |
| Persian | یک یادآوری محلی اندروید با رویدادهای زمان‌دار آن روز دریافت کنید. اگر آن روز رویداد زمان‌داری نداشته باشد، اعلانی فرستاده نمی‌شود. |

Keep existing settings-saved and notification-settings-saved messages for successful persistence, including empty-day skips. Keep existing denied/error/loading feedback. Return an explicit service result such as `empty` to distinguish no schedule from `scheduled`; it need not become visible UI. Remove the generic paragraph fallback from notification scheduling so it cannot reappear as a notification body.

Reuse existing Settings layout, colors, typography, focus, borders and responsive grid. No new assets or tokens. The story's dashed scenario annotation is review context and must not be implemented.

## States, layouts and accessibility

Editable source: [EmptyDayNotification stories](studio/src/stories/EmptyDayNotification.stories.tsx). Local links (start studio on port 6006): [English phone](http://localhost:6006/?path=/story/proposals-empty-day-notification--english-phone), [Persian phone](http://localhost:6006/?path=/story/proposals-empty-day-notification--persian-phone), [English wide/populated](http://localhost:6006/?path=/story/proposals-empty-day-notification--english-wide), [Persian wide](http://localhost:6006/?path=/story/proposals-empty-day-notification--persian-wide), [Persian dark](http://localhost:6006/?path=/story/proposals-empty-day-notification--persian-dark), [denied](http://localhost:6006/?path=/story/proposals-empty-day-notification--permission-denied), [disabled](http://localhost:6006/?path=/story/proposals-empty-day-notification--disabled), [saving](http://localhost:6006/?path=/story/proposals-empty-day-notification--saving), [error](http://localhost:6006/?path=/story/proposals-empty-day-notification--error).

The paragraph wraps naturally within the existing 390px phone canvas; at 896px wide with 24px base text it remains readable in both locales without clipping. RTL mirrors the wide checkbox column and label alignment; keep the native time readable. Preserve keyboard tab order, visible focus, associated checkbox/time labels and polite saved/error feedback. The existing full label provides the checkbox touch target, and time/Save controls remain at least 48px high. State feedback uses words, not color alone. Existing background/ink/muted roles remain legible; prototype native time controls use the correct color scheme in dark mode. Empty/populated states share the same Settings UI. Offline is the existing local-data behavior. Destructive state is not applicable because this change deletes no planner data.

## Implementation handoff

- Preserve Settings' current permission request even on an empty date; background Planner synchronization must continue requesting no permission. Suppression occurs after the existing permission decision and current target-week lookup. No permission-policy redesign.
- Distinguish the next local notification date from the currently viewed Planner day/week; cover tomorrow and Saturday week rollover in tests.
- Map paragraph copy to `i18n.ts`; suppression/result to `notifications.ts`; Settings success copy/layout require no edit.
- No required design decision remains. Designer recommends this bounded change; handoff is ready for implementation. Lead owns final acceptance/release.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio TypeScript/static build | Docker Node 24 bookworm, isolated Linux dependencies, `npm run typecheck` and `npm run build` | Passed, including final dark-input adjustment recheck |
| Phone/wide EN/FA | Running Storybook screenshots of both 390px canvases and both 896px enlarged-text stories | Passed; no truncation/overlap |
| Existing running UI comparison | Docker-built local-mode baseline `9aee030` at `127.0.0.1:3210/settings`, English/Persian reminder section screenshots and accessibility trees | Passed; copy-only presentation change fits existing structure |
| Relevant states/accessibility | Save click announced saved settings, labelled checkbox/time, denied/error screenshots, saving disabled button and disabled checkbox trees; dark palette review | Passed at prototype level; source globals provide focus styling |
| Implemented UI comparison | Docker-built changed local-data export at port 3210; native Chrome Guest screenshots at responsive 390px and wide desktop, English/Persian exact disclosure and Save Settings success | Passed; no new layout/copy discrepancy |
| Android delivery/lifecycle/TalkBack | No physical execution | Unverified; existing follow-ups remain |

The first Alpine build used host-native dependencies and failed to resolve a Linux binding. Isolated Docker dependencies corrected that environment mismatch; no dependency manifest changes were needed. Browser viewport override did not change captured browser width, so the phone evidence is the constrained story canvas, not a claim of native device testing.

Final Designer acceptance (2026-10-14): implemented EN/FA disclosure exactly matches the handoff. Chrome responsive toolbar showed 390px; paragraph wrapped without truncation, controls and full-width phone save remained reachable. Wide English/Persian preserved the current mirrored grid. Saving in each locale produced its settings-saved confirmation. An existing status string keeps its prior language after switching locale until the next save; this unchanged Settings feedback behavior is outside this paragraph/scheduling change. Native Chrome Guest was used because browser surfaces were unavailable on reactivation; the task-created guest tab was closed after review. No native delivery claim. Both task previews are no longer needed by Designer.
