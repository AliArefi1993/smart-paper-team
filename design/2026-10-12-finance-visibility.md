# Design: Optional Finance visibility

Status: ready for implementation
Updated: 2026-10-12
Owning frontend route/component: SettingsView, FinanceView, WeeklyPlanner, WeekSummariesView, ExportView; local preference adapter
Design type: proposed change
Optional Figma: not required
Editable canvas: [FinanceVisibility.stories.tsx](studio/src/stories/FinanceVisibility.stories.tsx), title `Proposals/Finance visibility`.

## Problem and evidence

The maintainer requested Finance hidden by default for new installs, with deliberate offline re-enabling. [Product brief](2026-10-12-finance-visibility-product.md) defines scope and upgrade/data-preservation acceptance. Timer stays available; backend parity remains paused.

Current Settings is a ten-section form with explicit Save Settings buttons, morning notifications, draft indicators and a leave confirmation. Running static frontend preview inspected at 390px and wide on 2026-10-12 confirms that hierarchy. Current Finance has a PIN gate and links to Planner/Summaries/Export. Source inspection found no Finance leave-edit confirmation, only delete confirmation. The proposal adds no Finance autosave or new draft preservation promise. User benefit remains a hypothesis; no native or user-research validation is claimed.

## Outcome and scope

Recommend the Product scope: a device-local visibility preference independent of Finance records, PIN, runtime unlock and JSON backup schema. All three Finance links (Planner, Summaries, Export) use the same effective preference. Settings stays reachable, Export stays available, and direct Finance access while hidden shows explanation rather than records or a PIN form. No visual redesign of existing destinations.

## Design direction

Insert a separate **Optional Finance** card immediately below the Settings header and before the existing Planner-section form, in local-data mode only. Reuse existing bordered surface, typography, checkbox and green feedback roles. Full-width stacked phone layout; same max-width as existing Settings on wide screens. Keep existing language/appearance/navigation controls unchanged (story navigation is summarized, not a request to add Export to Settings).

Use a native checkbox with an associated **Show Finance / نمایش بخش مالی** label and a minimum 48px clickable row. It saves immediately, independently of the existing batch. Do not mark/save/discard existing section/notification drafts when it changes. Do not block Finance changes because another Settings label is blank. Existing Save Settings buttons continue to save only their current batch.

Helper: **Saves immediately on this device. Other Settings edits still need Save Settings.** / «بلافاصله روی این دستگاه ذخیره می‌شود. تغییرات دیگر تنظیمات همچنان به «ذخیره تنظیمات» نیاز دارند.»

Preservation: **Hiding Finance keeps your saved records. Full JSON backups still include Finance. Exports and selected AI report fields keep their existing PIN checks.** / «پنهان کردن بخش مالی، اطلاعات ذخیره‌شده را حذف نمی‌کند. پشتیبان کامل JSON همچنان شامل اطلاعات مالی است. بررسی رمز فعلی برای خروجی‌ها و اطلاعات انتخابی گزارش هوش مصنوعی حفظ می‌شود.»

On successful change announce **Finance is now visible. / بخش مالی اکنون نمایش داده می‌شود.** or **Finance is hidden. / بخش مالی پنهان است.** in a local `role=status`. Keep focus on checkbox. No confirmation dialog: hiding is reversible and deletes nothing. While a write is pending disable duplicate activation and announce saving; re-enable after completion. Checkbox and navigation reflect only the effective committed preference, never an optimistic false success.

A failed write retains the previously effective value, with `role=alert` and Retry next to the control. Example hidden-to-visible failure: **Could not save Finance visibility. Finance remains hidden. Try again.** / «نمایش بخش مالی ذخیره نشد. بخش مالی همچنان پنهان است. دوباره تلاش کنید.» Mirror this meaning for a visible-to-hidden failure. Retry retries the attempted value; a subsequent explicit checkbox choice replaces the pending attempt. No mutation of records or unrelated drafts.

## Hidden route and restore

Keep existing Finance header/navigation/appearance/language. Replace Finance content with **Finance is hidden / بخش مالی پنهان است**, the preservation helper, and **Enable Finance in Settings to show it in navigation. Enabling it does not unlock your records.** / «برای نمایش بخش مالی در مسیرهای برنامه، آن را در تنظیمات فعال کنید. فعال کردن، قفل اطلاعات را باز نمی‌کند.» Primary link **Open Finance settings / باز کردن تنظیمات بخش مالی** goes to `/settings#finance-visibility`. Scroll/focus the Finance heading (programmatic `tabIndex=-1`) on arrival; no automatic enable. Enabling remains on Settings, announces success, then offers a secondary **Open Finance / باز کردن بخش مالی** link. It follows the existing Settings leave-draft guard. Finance shows its existing locked or valid-session content; enabling/hiding does not grant/revoke authorization or refresh session expiry.

There is no new hide control inside Finance, so changing visibility follows existing navigation away from that page. Its current unsaved local input behavior stays as implemented; never silently save Finance fields. Do not add a Settings link to Finance solely for this task. Cross-tab effective changes must not reveal protected data; normal preference/authorization checks remain authoritative.

Export disclosure near existing local backup notice: **Finance visibility is saved only on this device and is not included in JSON backups. Import does not change your visibility choice.** / «تنظیم نمایش بخش مالی فقط روی این دستگاه ذخیره می‌شود و در پشتیبان JSON نیست. ورود داده‌ها انتخاب شما را تغییر نمی‌دهد.» Do not imply encrypted files or guaranteed Android transfer.

After a successful import into a hidden install append to the existing result: **Finance remains hidden. Enable it in Settings to view restored records.** / «بخش مالی همچنان پنهان است. برای دیدن اطلاعات بازیابی‌شده، آن را در تنظیمات فعال کنید.» Offer the same Settings link. Do not announce counts/data before the existing import authorization succeeds. Existing Replace confirmation, Merge/Replace semantics, JSON/CSV/XLSX gates and selective AI-report PIN checks remain unchanged. Hidden installs can still unlock Export and include selected Finance report fields.

## States and implementation constraints

- Initialize before showing Finance links/content. During initialization show neutral loading text; avoid a visible Finance flash and avoid protected reads just to decide visibility.
- An explicit valid preference wins. Without one, presence of `smart-paper.local.finance` means visible even if empty/damaged; absence means hidden. Persist that initial choice once, before imports can change the key. Read key presence only, never infer intent from stored amounts.
- Malformed preference: keep a recoverable warning, resolve the same key-presence fallback, and allow a deliberate checkbox choice/Retry to repair preference. Do not erase Finance records. No invented explicit value from malformed bytes.
- If storage is unreadable and key presence is unknown, conservatively keep Finance available for recovery behind its unchanged PIN gate, with **Could not read Finance visibility. Finance stays available for recovery; the PIN is still required. Retry to save a choice.** / «تنظیم نمایش بخش مالی خوانده نشد. بخش مالی برای بازیابی در دسترس می‌ماند؛ رمز همچنان لازم است. برای ذخیره انتخاب، دوباره تلاش کنید.» If a last effective choice is known in this runtime, retain it instead of switching to recovery-visible.
- A failed initial write keeps the resolved runtime preference and reports that it could not be saved; do not call it saved. Hold that effective snapshot through imports in this runtime and retry persistence. Cross-restart durability cannot be promised while storage fails. On next startup repeat fallback if no value was stored.
- Once storage recovers, Retry reads the valid explicit choice if one exists; otherwise persist the held fallback. Explicit user changes take precedence. Frontend/Security own robust storage serialization/concurrency tests.
- Loading and read/write failures affect only this local card. Planner drafts, notification settings and usable recovery routes remain available. Backend mode retains current behavior and omits this local-only control/disclosure.

## Responsive, bilingual and accessibility behavior

Real translated sentences wrap vertically, including long Persian helper/error text. Keep no fixed card heights, truncation or horizontal scroll at 360–390px and wide layouts. RTL reverses alignment/control order through existing direction roles; mixed `JSON`/dates/numbers follow existing formatting. Short landscape scrolls in document flow, with no new sticky/modal regions. Text enlargement must remain reflowable.

Native checkbox exposes checked/disabled state; helper is associated with `aria-describedby`. Error/success use words, not color alone. Retry and route links have at least 48px height. Reuse the current global visible keyboard focus outline; Tab follows content order, Space changes checkbox, Enter activates Retry/links. Avoid duplicate live announcements from the existing form. Keep current PIN disclosure and input labels on re-entry; the studio PIN scene is a structural summary, not replacement copy.

## Editable states

Story URLs when studio runs at port 6006:

- [SettingsPhone](http://localhost:6006/?path=/story/proposals-finance-visibility--settings-phone): hidden preference with other unsaved Settings edits; interactive success checkbox.
- [ErrorDarkPhone](http://localhost:6006/?path=/story/proposals-finance-visibility--error-dark-phone): failed save, effective hidden value and Retry.
- [HiddenPhone](http://localhost:6006/?path=/story/proposals-finance-visibility--hidden-phone): hidden direct route.
- [ReenabledDarkPhone](http://localhost:6006/?path=/story/proposals-finance-visibility--reenabled-dark-phone): visible links and unchanged PIN gate.
- [ImportWide](http://localhost:6006/?path=/story/proposals-finance-visibility--import-wide): backup disclosure and successful hidden restore.
- [UnavailableDarkWide](http://localhost:6006/?path=/story/proposals-finance-visibility--unavailable-dark-wide): recoverable unknown-storage warning.

Controls expose EN/FA/both, Light/Dark, phone/wide and loading. Stories model the new card/states and summarize existing content; they do not replace production behavior or certify authorization. No shipped baseline stories changed.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current UI comparison | Built current frontend `/settings` at phone/wide and `/finance` locked; source Settings/Finance/Export inspection | Current behavior grounded; proposed additions distinguished |
| Studio Docker typecheck/build | Disposable Node 24 container with isolated Linux dependencies; npm ci, npm run typecheck, npm run build | Passed final correction build; only existing bundle-size warning |
| Phone/wide EN/FA Light/Dark and relevant states | Evidence under [evidence directory](evidence/2026-10-12-finance-visibility/) | Passed representative EN Light Settings, FA Dark error, FA Light hidden at 360px, EN Dark re-enabled PIN at 360px, bilingual Light import/wide and Dark unavailable/wide; loading/short-landscape inspected |
| Native Android, TalkBack, enlarged-font and upgrade/data preservation | Requires implementation and device checks | Unverified; no native validation claim |

## Implementation handoff

**Ready for implementation**, Designer, 2026-10-12. Recommend implementation after the lead's preceding framework-publication gate. No required product/interaction choice remains unresolved. Frontend must compare the actual implementation with these states in both languages, test persistence failures and preserve authorization/data contracts; QA/Security review remains required. This artifact does not authorize skipping release gates.

Studio interaction check: checkbox success exposes checked state, adds Finance navigation, announces success and retains the unrelated Unsaved settings draft; Tab remains operable. DOM geometry confirms wide articles have matching client/scroll widths and action buttons are 48px high. Light/Dark readable text and error cues reviewed visually; production focus/contrast and enlarged-font behavior must be checked after implementation. Read-only DOM measured Dark helper `#b6c8c2` on `#1b2b29`.
