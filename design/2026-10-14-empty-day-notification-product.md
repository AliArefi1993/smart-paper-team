# Design: Empty-day morning notification product brief

Status: brief
Updated: 2026-10-14
Owning frontend route/component: `smart-paper-front/src/lib/notifications.ts`; Settings reminder disclosure if Designer recommends clarification
Local studio story links: Designer to supply bilingual Settings states
Optional Figma file and frame links: Not required
Design type: proposed change

## Problem and evidence

- User job and friction: receive a useful morning preview of saved timed events without an empty-day interruption. The maintainer asked what is sent when nothing has been entered, then authorized Product/Designer assessment followed by action.
- Observed source: `notificationBody()` returns the generic Settings description when the target day has zero `schedule_entries`; `performNotificationSync()` still schedules notification 8001. Its title is “Today’s plan” / “برنامه امروز”; the fallback describes sending a reminder rather than conveying that day's content.
- Product contract: `PRODUCT.md` promises optional local morning-plan notifications. Current Settings copy specifies the day's timed events. The existing [notification review task](../tasks/2026-10-08-android-notification-review.md) preserves wider permission, timing, privacy and device discovery work.
- Read-only personal_systems assessment: skip this timed-event reminder when no timed entries exist; notes, goals and intentional rest remain valid plans. Removing the last event and adding events later must update pending reminders.
- Needs confirmation: whether a separate daily planning nudge would be useful. Do not add it in this cycle. No physical-device delivery observation supports this brief.
- Proposed difference: preserve the existing next local reminder date calculation and populated notification content; cancel any pending morning reminder and omit scheduling when that target date has no timed events.

## Outcome and scope

- Desired outcome and success signal: the enabled timed-event reminder creates no pending notification for an empty target date; after an event is added, normal synchronization schedules its preview again. Saving Planner content continues to succeed independently of notification availability.
- In scope: empty-day suppression, cancellation of stale pending reminder after removal, later-addition scheduling through existing synchronization, and clear EN/FA disclosure of the rule if Designer recommends it.
- Non-goals: daily planning nudges, per-event alarms, timer alarms, new permissions/controls, repeating/background scheduling changes, notes/goals in notification bodies, broader lock-screen privacy changes, or promises of delivery without reopening the app. Preserve the broader backlog task.
- Acceptance criteria:
  1. In mocked native-plugin regression checks, an enabled/permitted reminder for a target day with zero timed entries cancels notification 8001 and makes no schedule call. Missing day and missing week follow the same rule.
  2. Notes-only and goals-only data do not qualify for a timed-event notification; no copy claims the user has no plan.
  3. Removing the last event cancels the previous pending notification on synchronization; adding a later event schedules again through existing Settings/Planner synchronization without changing the saved enabled choice or time.
  4. A populated target day retains the current title, first-four-event body and selected reminder time. Today's populated schedule does not cause a reminder when the actual target is an empty tomorrow, and an empty today does not suppress populated tomorrow. Cover Saturday week boundaries and target-week loading in local mode.
  5. Disabled and denied/revoked-permission behavior stays intact; background Planner synchronization requests no permission. Web behavior and Settings persistence stay intact. Native failures do not turn a successful Planner save into a failure.
  6. English and Persian disclosure, if changed, clearly say reminders occur only on days with timed events; both locales retain populated notification content. Designer verifies Settings RTL/readability/accessibility in the local studio before frontend implementation.
  7. Automated mocked tests prove scheduling decisions only. Record real Android delivery/lifecycle validation as unexecuted unless actually performed; preserve the existing native follow-ups.

## Design direction

- Flow and information hierarchy: explain what the existing optional reminder sends and when it stays silent. Retain current controls and user choices. Designer owns presentation and final wording.
- Content constraints for English/Persian: describe timed events and empty-day silence without suggesting notes/goals are absent or delivery is guaranteed. Preserve the current populated notification title/body unless a separately justified scope decision is documented.
- Reused components and tokens: existing Settings reminder controls and studio conventions; no new component required by Product.
- Alternatives: suppression offers the clearest value with a small scheduling/disclosure change. “No timed events today” is similarly small but still interrupts intentional rest. A separate planning nudge has uncertain value and greater control/copy scope; Needs confirmation and excluded.

## States and layouts

- Relevant states: enabled/populated, enabled/empty, disabled, permission denied, and offline. Empty scheduling must not silently disable the user's saved preference.
- Phone/wider viewport, LTR/RTL, long text, font scaling, focus and screen-reader behavior: Designer assesses any changed Settings disclosure within existing controls; Product prescribes no layout.

## Implementation handoff

- Mapping and assets: Designer supplies local studio links and the ready interaction/copy handoff; no assets requested.
- Behavior/data constraints: select the same next local date and target week as the current implementation; preserve notification ID, permission policy, settings, offline/local behavior and serialized/coalesced synchronization. No persistence migration or application-data edits.
- Open decisions: Designer may recommend a concise Settings disclosure. A separate planning nudge remains outside scope.
- Ready for implementation decision and reviewer: Product scope approved for Designer assessment; this brief is not the ready design handoff. Frontend waits for Designer's ready decision.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product/source review | `PRODUCT.md`, existing notification review task, `notifications.ts`, EN/FA `i18n.ts` | Empty-day fallback mismatch confirmed in source |
| Personal routine assessment | Existing personal_systems report supplied by lead | Incorporated; no duplicate consultation |
| Bilingual studio / accessibility | Designer handoff | Pending |
| Scheduling regressions | Mocked native plugin, target-date cases above | Pending implementation |
| Physical Android delivery | Existing STATUS/native follow-ups | Unexecuted |
