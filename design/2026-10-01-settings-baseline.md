# Settings — shipped behavior baseline

Status: brief; Figma coverage and visual validation pending
Updated: 2026-10-01
Owning route/component: `/settings`, `smart-paper-front/src/components/settings-view.tsx`
Figma frames: Pending

## Problem and evidence

- User job: decide which planner sections are visible, give them meaningful names, and optionally schedule a local morning reminder.
- User direction: capture all implemented user flows as design before future frontend changes.
- Evidence: `SettingsView`, `src/lib/i18n.ts`, `PRODUCT.md`, and `design/screen-inventory.md`. This baseline is derived from source, not visual validation or user research.
- Current friction or redesign hypothesis: Needs confirmation.

## Outcome and scope

- Desired outcome: editable EN/FA settings frames cover the shipped settings and save decisions, allowing later design-first changes to start from verified behavior.
- In scope: ten stable section slots, labels and active flags, notification toggle/time, save, validation and unsaved navigation.
- Non-goals: changing section IDs/order, planner data, notification delivery behavior, or adding account-level settings.
- Acceptance criteria for coverage: show default and edited slot lists, one-active-section and blank-label constraints, notification controls, save progress/success/permission denial, unsaved navigation, and phone/wide plus EN/FA behavior.

## Baseline of shipped behavior

1. Settings loads ten stable planner section slots. The first four default to Main, Second, Learning, and Exercise; slots 5–10 are hidden until activated. Each slot has an editable label and active checkbox. The screen shows an active section count.
2. At least one slot must remain active. A blank label makes **Save Settings** unavailable; trying to turn off the last active slot shows an error. Editing a label or toggle records unsaved changes.
3. **Morning plan notification** has an active/inactive checkbox and editable time. The save action persists section settings and notification settings, then attempts to synchronize the local Android reminder. It reports success or denied notification permission. The reminder description refers to the day's timed events.
4. Clicking the route's Planner or Summaries link with unsaved changes opens a browser confirmation; cancelling stays on Settings. A browser unload also triggers an unsaved-change guard. Loading and save failures show feedback.

## Designer constraints and states

- Preserve stable slot identity and the at-least-one-active rule. Use exact full English/Persian labels from `src/lib/i18n.ts`; **Save Settings / ذخیره تنظیمات** and **Morning plan notification / اعلان صبح برنامه** are anchors for baseline mapping.
- Show EN LTR and FA RTL with long custom section labels, mixed-script names, number/count formatting, and native time-input behavior. Account for phone keyboard, focus, touch targets, contrast, and warning visibility.
- Represent loading, default/sparse and edited lists, validation, disabled save, saving, success, permission denial, load/save error, and the unsaved navigation decision. The current UI uses one save action for section and notification changes.
- Alternative information hierarchy or control patterns remain **proposals** until reviewed and accepted; this baseline does not request implementation.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Shipped behavior inventory | Source and translations above | Recorded |
| Editable EN/FA frames | Figma | Pending |
| Comparison with running phone/wide UI | Screenshots or browser/device review | Pending |
| Native notification and accessibility review | Physical Android | Pending |
