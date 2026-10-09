# Finance session expiry

Status: ready for implementation
Updated: 2026-10-09
Owning component: `smart-paper-front/src/components/finance-view.tsx`
Design type: proposed lifecycle fix; existing locked screen retained

## Problem and evidence

The user should stop seeing Finance details when its unlock expires. Source review of `FinanceView` shows a 30-second default replaced by the server's full unlock TTL (one hour locally), without focus/visibility rechecking. `forceLock` clears records and draft fields, but leaves earlier success messages, goal disclosure and pending UI states. PRODUCT.md defines the local PIN as a screen lock; no encryption promise is appropriate.

The current exported app at `http://127.0.0.1:8765/finance.html` was inspected on 2026-10-09 in English and Persian. Its locked hierarchy and screen-lock warning agree with the source. The PIN input has no accessible name in its observed accessibility tree; add `aria-label={t("financePin")}` while retaining its existing placeholder.

## Outcome and scope

- While active, check at intervals no greater than 30 seconds; recheck on focus and return to visible state. Suspension can defer timers, so this is no guarantee of background detection.
- On confirmed expiry/forbidden session, replace all sensitive content with the existing lock card and recovery alert. Discard unsaved goal, new-income and edited-income fields; do not save them, persist a recovery draft, or ask before hiding them. This extends the current `forceLock` policy consistently. Saved records remain untouched by relocking.
- Reset PIN input, goal disclosure, operation/busy state, error and success feedback. Retain only the current locked recovery alert. A later successful unlock reloads saved records with empty add/edit fields and closed goal settings.
- Late asynchronous results must not restore records, reopen edits, report prior success, or interfere with a newer unlock. A mutation already accepted by storage/server may still have saved; the next unlock reloads authoritative data. Relocking itself never writes or deletes records.
- No manual Lock action, TTL/PIN change, encryption, automatic background lock, finance redesign, or unrelated Export change.

## Content and hierarchy

Keep the header/navigation, single alert area, and amber lock card with PIN and Unlock. Reuse existing copy with no new translation keys:

| State | English | Persian |
| --- | --- | --- |
| Expired recovery alert | Finance Is Locked. Enter PIN. | بخش مالی قفل است. رمز را وارد کنید. |
| Lock heading | Finance Is Locked | بخش مالی قفل است |
| PIN accessible name | Finance PIN | رمز بخش مالی |
| PIN prompt | Enter PIN | رمز را وارد کنید |
| Action | Unlock | باز کردن |
| Pending | Unlocking... | در حال باز کردن... |
| Local warning | On Android, the PIN only hides this screen. Finance data is not encrypted. | در اندروید، رمز فقط این صفحه را پنهان می‌کند. داده‌های مالی رمزگذاری نشده‌اند. |

Retain conditional default-PIN hint and the existing wrong-PIN/loading/network error behavior. The existing alert truthfully communicates the required recovery without making a new expiry-time or save guarantee. Draft-clearing is intentional for the privacy boundary; no claim of draft recovery is shown.

## Editable states and accessibility

All stories default to paired English LTR/Persian RTL; controls select one language, phone/wide, and Light/Dark. [Story source](studio/src/stories/FinanceSessionExpiry.stories.tsx):

- [Expired Light](http://localhost:6006/?path=/story/fixes-finance-session-expiry--expired-light) and [Expired Dark](http://localhost:6006/?path=/story/fixes-finance-session-expiry--expired-dark).
- [Initial Locked Light](http://localhost:6006/?path=/story/fixes-finance-session-expiry--locked-light) and [Initial Locked Dark](http://localhost:6006/?path=/story/fixes-finance-session-expiry--locked-dark).
- [Wide expiry](http://localhost:6006/?path=/story/fixes-finance-session-expiry--wide-expired), [Unlocking](http://localhost:6006/?path=/story/fixes-finance-session-expiry--unlocking), [Wrong PIN](http://localhost:6006/?path=/story/fixes-finance-session-expiry--wrong-pin).

Reuse current production color mappings, responsive card width and focus outline; no assets/tokens added. Allow the long local warning to wrap naturally at 360–390px, including Persian. Alert must remain `role="alert"`; screen-reader announcement and text make the lock state independent of color. Provide the PIN accessible name; keep password masking and at least 44px PIN/action targets. When an edited control disappears on relock, move focus to the lock heading/card (programmatic focus with `tabIndex={-1}`, no keyboard opening), and scroll it into view if the user was deep in income history. Do not auto-focus the PIN on resume. Preserve navigation focus if it remains present. Keyboard order then reaches PIN and Unlock normally.

The canvas is structural: its header switches are illustrative, and its visible PIN label demonstrates naming. Production can use the same name through `aria-label` without adding visible copy. Preserve existing production header behavior and geometry. Empty/history/save/delete states are unchanged and intentionally absent from the locked state; no sensitive note, amount or date may remain in DOM after expiry.

## Implementation and verification

Designer recommends this bounded change; there are no unresolved design decisions. Frontend may implement. Validate near-expiry active polling, focus/visibility expiry, draft removal, old success removal, re-unlock from saved data and late-result races. Check the rebuilt EN/FA Light/Dark phone UI, 360px wrapping, focus relocation from a deeply scrolled editor, accessible PIN naming and ordinary unlock/wrong-PIN recovery. Physical Android suspension, keyboard and TalkBack remain follow-ups.

| Check | Evidence | Result |
| --- | --- | --- |
| Current screen comparison | Running exported app English/Persian locked screen; source/translation review | Existing hierarchy/copy confirmed; unnamed PIN found |
| Editable phone and wide stories | Running Storybook expiry Light/Dark paired phone and wide screenshots; bilingual accessibility tree | Wrapping and recovery hierarchy reviewed |
| Studio checks | Host `npm run typecheck`, `npm run build` on 2026-10-09 | Passed; build emits existing chunk-size warning |
| Docker studio checks | Isolated Linux `npm ci && npm run typecheck && npm run build` after adding the two missing optional `@emnapi` lock entries | Passed; clean install reported 0 vulnerabilities. Storybook emitted its existing >500 kB chunk advisory. |
| Accessibility review | Story named PIN, alert role, password masking, target dimensions and theme text roles | Source/visual review passed; actual focus lifecycle and assistive tech pending implementation |
| Rebuilt production locked screen | Chrome via CUA, isolated `http://127.0.0.1:8766/finance.html`, 390×844 EN/FA Light/Dark; 360×800 EN/FA Light; 2026-10-09 | Accepted: exact lock heading/prompt/warning/action, named PIN in bilingual accessibility tree, RTL alignment and warning wrapping; production retains header/card geometry and uses aria-label without visible PIN label. Existing narrow English language-select value truncation remains outside this expiry fix. No records, PIN or session were changed during visual review. |
| Native runtime | Android suspension, keyboard and TalkBack | Pending; browser review does not certify native focus or assistive technology |
