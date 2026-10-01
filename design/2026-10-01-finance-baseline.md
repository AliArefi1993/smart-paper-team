# Finance — shipped behavior baseline

Status: brief; Figma coverage and visual validation pending
Updated: 2026-10-01
Owning route/component: `/finance`, `smart-paper-front/src/components/finance-view.tsx`
Figma frames: Pending

## Problem and evidence

- User job: privately review progress toward a yearly income goal and maintain income records on the phone.
- User direction: document every implemented feature before future screen changes, with Designer working before frontend implementation.
- Evidence: `FinanceView`, `src/lib/i18n.ts`, `PRODUCT.md`, and `design/screen-inventory.md`. This is a source-derived inventory, not a claim that the rendered UI has been validated.
- Friction or improvement hypothesis: Needs confirmation from use or design review. No redesign is specified here.

## Outcome and scope

- Desired outcome: editable English and Persian design coverage that faithfully represents the shipped finance flow and its important states. Success means Designer can compare each frame with the running app and mark differences without guessing behavior.
- In scope: locked and unlocked finance, goal controls, income creation/history/edit/delete, status and validation messages.
- Non-goals: changing financial calculations, adding accounts, encrypting local data, or altering the PIN contract.
- Acceptance criteria for baseline coverage: show locked, empty, populated, goal editing, income editing, validation/error, progress, and success states; represent both languages and phone/wide layouts; record comparison with running UI separately.

## Baseline of shipped behavior

1. The route attempts to load finance data. A forbidden response shows the PIN lock. The local Android notice explains that the PIN hides the screen but does not encrypt finance data; a default PIN hint appears only if the local PIN was not configured. An empty or wrong PIN produces feedback. A successful unlock loads the finance overview. Session expiry relocks the view.
2. The unlocked overview shows year total income, year goal (or **Not Set**), remaining amount, and percentage progress. **Goal Settings** expands an amount input and **Save Goal**; zero is valid, negative or noninteger values are rejected.
3. **Add Income** accepts a positive whole amount and optional note. History shows amount, note or **No note**, and a readable Shamsi date. With no entries it says **No income added yet**.
4. **Edit** replaces a history row with amount, note, and date inputs, plus **Save** and **Cancel**. Amount must be positive and date is required. **Delete** removes an entry; the current UI has no separate delete confirmation. Saves and deletes show progress/feedback or an error.

## Designer constraints and states

- Preserve the current meanings of **Finance Is Locked / بخش مالی قفل است**, **Goal Settings / تنظیمات هدف**, **Add Income / افزودن درآمد**, and the local PIN warning. Use the exact full strings in `src/lib/i18n.ts` for final frames; these examples are identifiers, not replacement copy.
- Represent EN LTR and FA RTL, mixed numeral/currency/date content, long income notes, keyboard-open editing, and narrow phone layouts. Show accessible labels, focus, touch targets, and non-color status cues in the design review.
- Distinguish loading, locked/wrong PIN, no goal/no entries, populated, add/edit in progress, validation error, success, and session expiry. The code uses a single message/error area above the flow.
- Screen structure or interaction refinements are **proposals**, requiring a separate design decision and acceptance criteria before implementation. None are approved by this baseline.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Shipped behavior inventory | Source and translations above | Recorded |
| Editable EN/FA frames | Figma | Pending |
| Comparison with running phone/wide UI | Screenshots or browser/device review | Pending |
| Physical Android and accessibility review | Device/assistive technology | Pending |
