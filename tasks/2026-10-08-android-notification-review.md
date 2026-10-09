# Task: Review and improve Android notifications

Status: planned
Created: 2026-10-08
Updated: 2026-10-09

## Objective

Verify that existing optional local morning-plan notifications are reliable and useful, then scope improvements to timing, controls, content and navigation from actual findings. Preserve offline use and user control rather than adding reminders indiscriminately.

Include the maintainer's 2026-10-09 request for better notification design and UX, clearer messages, and a better place and moment to ask for Android notification permission.

## Context

- Owning implementation repository: `smart-paper-front/`; coordination/design evidence belongs in the team repository.
- Current behavior: [PRODUCT.md](../PRODUCT.md); native notification checks remain outstanding in [STATUS.md](../STATUS.md).
- Consolidates the existing [roadmap](../ROADMAP.md) morning-notification validation item; historical phone checklists remain references.
- [Timer visibility task](2026-10-07-timer-optional-default-hidden.md) pauses timer expansion; timer completion alarms are not included by implication.

## Acceptance Criteria

- [ ] Inspect current scheduling, permission, settings and tap behavior; record actual versus intended behavior before proposing fixes.
- [ ] On a real Android device check opt-in, permission denial/revocation, enable/disable, time edits, app restart, device reboot, offline use, upgrade and relevant battery/background restrictions.
- [ ] Check duplicate/stale notifications and time/date/timezone changes, including behavior when the app has not been opened recently. Distinguish normal suspension from force-stop and document platform limits without promising guaranteed delivery.
- [ ] Verify tapping a reminder opens a useful, correct Planner destination without overwriting pending edits or changing saved records.
- [ ] Product/Designer assess usefulness, frequency, timing controls and understandable permission/disabled/error states; agree a bounded improvement scope before implementation.
- [ ] Designer reviews the complete notification experience, including setup, reminder controls, delivery feedback and tap destination, and specifies improvements to confusing interactions.
- [ ] Improve notification titles/body text and in-app setup/status/error messages in English and Persian so their purpose and next action are clear; do not imply delivery is guaranteed.
- [ ] Choose a contextual, discoverable place and moment to request notification permission, explain the reminder benefit before the Android prompt, and preserve the user's choice to decline or defer without repeated unsolicited prompts.
- [ ] Define clear denied/revoked-permission states and an accessible route to Android notification settings when needed; show the actual permission state when returning to the app.
- [ ] Review English/Persian content, RTL/readability, accessibility and lock-screen privacy; avoid exposing private plan/idea/finance text by default.
- [ ] Keep reminders local/offline, optional and easy to disable; no server, cloud push, account or unrelated permission prompts.
- [ ] Save a ready bilingual design handoff/studio states before any user-visible changes; consult personal_systems during routine-related discovery under existing guidance.
- [ ] Add relevant scheduling/state regression checks for demonstrated gaps and verify actual-device behavior separately; document unexecuted native checks.
- [ ] Review/fix, update documentation and follow the existing validated Android release workflow for implemented changes.

## Non-Goals

- Running notification checks, changing settings, scheduling reminders or implementing changes during this task-recording request.
- Timer alarms, per-event reminders or a broader notification system unless separately justified and scoped.
- Assuming more notifications improve engagement, or making physical-device checks a new blanket release gate.

## Plan

1. Review current code/contract and reproduce the existing reminder flow on a test phone with synthetic data.
2. Product/Designer use findings to choose necessary fixes and useful improvements, including notification UX, bilingual messages and permission-request placement/timing; produce a ready handoff.
3. Implement the bounded change, test/review/fix and verify scheduling, privacy and device behavior.
4. Record limits and follow-ups, update product/status evidence and release under current rules.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer request on 2026-10-08 | Saved as future work |
| Expanded UX scope | Maintainer request on 2026-10-09 | Notification design, messages and permission-request placement/timing recorded |
| Code/device checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: required before future user-visible implementation. Exact improvements are open pending evidence.
- Android versions, device vendors and user/system settings affect delivery; check current official guidance when implementing.
- Use test-device data and avoid altering the maintainer's live reminders during investigation without explicit scope.

## Outcome / Handoff

Future task saved only. When selected, establish current behavior and native evidence before designing improvements. No app or reminder changes made.
