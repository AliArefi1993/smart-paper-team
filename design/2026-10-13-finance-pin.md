# Design: Change the local Finance PIN

Status: implemented; Designer accepted
Updated: 2026-10-13
Owning frontend: `SettingsView`, local credential/store adapters, Finance and Export/AI report unlock consumers
Editable canvas: [FinancePin.stories.tsx](studio/src/stories/FinancePin.stories.tsx), `Proposals/Finance PIN`
Optional Figma: not required
Design type: proposed change

## Problem and evidence

Replace a known Finance default/current PIN on this device without changing records, Finance visibility or unrelated Settings edits. [Product brief](2026-10-13-finance-pin-product.md) and [task](../tasks/2026-10-09-finance-change-pin.md) own accepted scope and Security boundaries. Personal-systems and independent Security source observations are incorporated by Product. No usability research or observed forgotten-PIN incident is claimed.

Current frontend `4f62d32` source has no PIN-change flow: local unlock uses the exact build-configured value or `1234`, and Finance/Export hints derive from configuration. Finance visibility is a separate immediately saved Settings card above Planner section edits. One-hour unlock is in runtime memory; full JSON export/import requires Finance authorization. JSON records do not contain a PIN and remain unencrypted.

Designer compared narrow current source with actual saved Settings EN/FA and hidden-Finance screenshots from the [shipped Finance visibility review](evidence/2026-10-12-finance-visibility/implementation/). Settings/Finance layout remains unchanged in current source; this is a screenshot comparison, not a fresh running-build or native-device claim.

Proposed change: add one independent Settings card and a deliberate inline three-field form; preserve current navigation, visibility control and settings form. Studio sample fields/outcomes are illustrative and do not touch real credentials or records.

## Outcome and scope

A known-PIN holder can replace it offline, receive an accurate saved/relocked result, and unlock with the new PIN after restart. Failed validation, Cancel before commit and a thrown atomic write keep the prior credential/records/session unchanged. All protected consumers relock after successful commit before success appears.

In scope: local-only Settings entry, current/new/confirm, validation/retry/cancel/commit/success, accurate default hints and explicit no-recovery/backup boundaries. No backend action, cloud identity/recovery, data deletion/reset, encryption, forced setup, visibility change, new backup format or altered backup authorization.

Needs confirmation: discoverability in actual use, native keyboard/lifecycle/TalkBack, and real OS/OEM migration. These do not alter the accepted product boundary.

## Design direction

Place a separate **Finance PIN / رمز بخش مالی** card immediately below the existing Finance visibility card and above Planner section controls. It stays visible whether Finance is hidden, visible, locked or unlocked. A secondary **Change Finance PIN / تغییر رمز بخش مالی** button expands the form within the same card. Dedicated **Save new PIN / ذخیرهٔ رمز جدید** commits only the credential; existing **Save Settings** continues to own Planner/notification edits. No unrelated settings auto-save or visibility toggle occurs.

Collapsed description: **Change the PIN on this device. Finance visibility and saved records stay the same. / رمز این دستگاه را تغییر دهید. نمایش بخش مالی و اطلاعات ذخیره‌شده تغییر نمی‌کنند.** A visible **Forgot your PIN? / رمز را فراموش کرده‌اید؟** disclosure explains the boundary without suggesting a reset, default bypass, uninstall, storage clearing or deletion.

Expanded hierarchy: card heading → mandatory consequence copy → PIN rule → Current PIN → New PIN → Confirm new PIN → inline errors → primary Save new PIN and secondary Cancel. Do not hide the warnings inside an optional disclosure when the form is open; do not add a mandatory consent checkbox or second confirmation dialog. This is a deliberate save with clearly stated consequences.

Before Save, show these exact meanings in both languages:

| Meaning | English | Persian |
| --- | --- | --- |
| Local lock, not encryption | This PIN is a screen lock for Finance and protected exports; it does not encrypt your data. | این رمز قفل صفحهٔ بخش مالی و خروجی‌های محافظت‌شده است؛ داده‌های شما را رمزگذاری نمی‌کند. |
| Forgotten PIN and full backup consequence | There is no in-app recovery if you forget it. Full JSON backup and import also require your PIN, including Planner and Ideas records. | اگر رمز را فراموش کنید، بازیابی آن در برنامه وجود ندارد. تهیه و ورود پشتیبان کامل JSON هم به رمز نیاز دارد؛ این شامل اطلاعات برنامه و ایده‌ها نیز می‌شود. |
| Existing backup cannot reset it | Backups contain records, not the PIN. Import keeps this device’s PIN and cannot reset a forgotten PIN. | فایل پشتیبان شامل اطلاعات است، نه رمز. ورود پشتیبان، رمز این دستگاه را حفظ می‌کند و رمز فراموش‌شده را بازنشانی نمی‌کند. |
| Relock/draft consequence | Saving a new PIN locks Finance again and clears unsaved Finance edits and protected report previews. | ذخیرهٔ رمز جدید، بخش مالی را دوباره قفل می‌کند و ویرایش‌های ذخیره‌نشدهٔ مالی و پیش‌نمایش گزارش‌های محافظت‌شده را پاک می‌کند. |
| New-PIN rule | New PIN: 4–12 digits; leading zeroes are allowed. English, Persian and Arabic digits are accepted. Choose a different PIN. | رمز جدید: ۴ تا ۱۲ رقم؛ صفر در ابتدای رمز مجاز است. رقم‌های انگلیسی، فارسی و عربی پذیرفته می‌شوند. رمزی متفاوت انتخاب کنید. |

Fields: **Current PIN / رمز فعلی**, **New PIN / رمز جدید**, **Confirm new PIN / تکرار رمز جدید**. Mask every field with `type=password`; keep raw PIN values out of feedback, logs and durable drafts. New/confirm use numeric input mode without coercing to Number, losing leading zeroes, trimming or truncating input into another credential. Current field must permit exact legacy nonnumeric input; use text input mode until a custom digit credential is known. Directional isolation keeps digit entry readable within Persian layout. Use visible labels, not placeholder-only labels. No reveal-PIN control is added in this bounded change.

Reuse existing card/border/ink/muted/teal/error/focus roles. Form is in-flow, avoiding a nested modal over the already long Settings page. A Finance-only placement was rejected because Finance can be hidden; coupling PIN save to Save Settings was rejected because credential persistence/relock is a distinct operation. Do not add a second change form on Finance/Export; a simple Settings link supplies discoverability.

## States, feedback and persistence meaning

| State | Presentation and required behavior |
| --- | --- |
| Hidden/visible; locked/unlocked | Settings action available in all combinations, without unlocking Finance or changing visibility. Current PIN required even if a session is unlocked. No Finance records appear in this card. |
| Opening | Expand in-flow, scroll card heading into view and focus it (`tabIndex=-1`) so the warnings are readable before entry. Tab reaches the fields in order. Keep existing unrelated Settings draft. |
| Missing current | **Enter your current PIN. / رمز فعلی را وارد کنید.** Focus Current PIN; mark invalid. No save attempt. |
| Wrong current | **The current PIN is incorrect. / رمز فعلی درست نیست.** Focus Current PIN; keep all entered values in memory so they can be corrected. Do not create or extend a session. |
| Invalid/missing new | **Enter a new PIN with 4–12 digits. English, Persian and Arabic digits are accepted. / رمز جدید باید ۴ تا ۱۲ رقم داشته باشد. رقم‌های انگلیسی، فارسی و عربی پذیرفته می‌شوند.** Focus New PIN; retain other values. |
| Unchanged credential | **Choose a PIN different from your current PIN. / رمزی متفاوت از رمز فعلی انتخاب کنید.** Focus New PIN. Compare using the accepted credential semantics rather than raw cross-script spelling. |
| Confirmation mismatch | **The confirmation does not match the new PIN. / تکرار رمز با رمز جدید یکسان نیست.** Focus Confirm; retain current/new values. |
| Committing | **Saving PIN… / در حال ذخیرهٔ رمز…**, busy status and disabled fields/Save/Cancel. No duplicate submit. Do not claim success or unchanged credential while commit is pending. |
| Write/derivation failure before commit | **Could not save the new PIN. Your previous PIN still works. Try again. / رمز جدید ذخیره نشد. رمز قبلی همچنان کار می‌کند. دوباره تلاش کنید.** Keep in-memory fields and explicit Save retry; credential/records/session unchanged. Unsupported offline crypto/randomness gets **PIN changes are unavailable on this device. Your current PIN and records are unchanged. / تغییر رمز در این دستگاه در دسترس نیست. رمز فعلی و اطلاعات شما تغییر نکرده‌اند.** No plaintext fallback. |
| Cancel before commit | Clear all PIN fields, collapse, return focus to Change Finance PIN. **Cancelled. Your PIN is unchanged. / لغو شد. رمز شما تغییر نکرد.** Other Settings drafts remain. |
| Success | After durable write and synchronous sensitive-state revocation: clear all fields, replace form with **PIN changed. Finance is locked again. Use your new PIN for Finance and protected exports. / رمز تغییر کرد. بخش مالی دوباره قفل شد. برای بخش مالی و خروجی‌های محافظت‌شده از رمز جدید استفاده کنید.** Saved records and visibility unchanged. Focus success heading/status; Done collapses. Do not automatically unlock or navigate to Finance, particularly when hidden. |
| Credential unreadable | **Could not read the saved PIN. Finance and protected exports remain locked. Try reading it again. / رمز ذخیره‌شده خوانده نشد. بخش مالی و خروجی‌های محافظت‌شده قفل می‌مانند. خواندن رمز را دوباره امتحان کنید.** No active form/default hint. **Check again / بررسی دوباره** re-reads only; it does not reset or overwrite the key. |
| Invalid saved credential | **The saved PIN cannot be used. Finance and protected exports remain locked. Your records have not been deleted. There is no PIN reset in this app. / رمز ذخیره‌شده قابل استفاده نیست. بخش مالی و خروجی‌های محافظت‌شده قفل می‌مانند. اطلاعات شما حذف نشده‌اند. این برنامه امکان بازنشانی رمز ندارد.** No default fallback, credential write, delete/reset action or promise that old PIN works. Safe re-read is allowed but not presented as guaranteed repair. |
| Credential changed elsewhere/concurrent commit rejected | Clear credential inputs and protected data; **The PIN changed in another window. Finance is locked. Re-enter the current PIN to continue. / رمز در پنجره‌ای دیگر تغییر کرد. بخش مالی قفل است. برای ادامه، رمز فعلی را دوباره وارد کنید.** Do not overwrite a concurrent change or publish stale success. |
| Session expiry | Existing protected screens lock immediately per accepted session rule. Current-PIN change form never relies on that session; recheck current credential at commit. Status may say **Finance locked because its session expired. Your current PIN is still required to change it. / به‌دلیل پایان نشست، بخش مالی قفل شد. برای تغییر رمز همچنان باید رمز فعلی را وارد کنید.** No draft deletion solely from ordinary validation. |
| Navigation/Back/interruption | Before commit, leaving clears ephemeral PIN values; existing Settings dirty-draft protection remains authoritative. No durable PIN draft/recovery. Back behaves as route navigation, not an implicit Save. During commit, disable in-page Cancel/navigation that would imply cancellation; if platform interruption occurs, ignore stale async UI, reread credential and keep Finance locked on return. Do not promise cancellation of an already committed write. |
| Finance/Export lock surfaces | Existing unlock form, privacy notice and accurate credential state. Default hint only when credential is genuinely absent and the legacy build default is actually `1234`; custom or corrupt/unreadable states never advertise it. Add secondary **Change Finance PIN in Settings / تغییر رمز بخش مالی در تنظیمات** link to `/settings#finance-pin`, without unlocking or revealing Finance. No new flow in backend mode. |

## Responsive, bilingual and accessibility behavior

Use the existing Settings card width (`max-w-5xl`), modest padding and natural vertical flow. Keep the form fields in one readable column (maximum about 560px) on wide screens; no fixed dialog height, sticky footer or page-wide credential fields. Warnings wrap above the fields; action buttons wrap and remain reachable through normal scrolling on phone portrait/landscape and with the keyboard. Do not force the entire form into one viewport or truncate the consequences.

EN LTR and FA RTL use existing fonts and logical alignment/spacing. PIN fields keep readable digit order, and Persian/Arabic-Indic input is accepted according to the data contract. Long section-label examples below the card remain independently editable; do not redesign Settings section controls.

Targets at least 48px; labels/fieldsets expose purpose, errors use `aria-invalid` and associated descriptions, and busy state uses `aria-busy`. Show errors with words and `role=alert`, success/loading with polite status, and one visible focus outline. After validation failure focus the field needing correction without replacing its value. Don't announce actual digits. Keyboard Tab follows visible content, Enter submits once, and native Space operates buttons/disclosures. If a programmatic focus scrolls a warning or error offscreen, adjust scrolling to include its relevant text. Native TalkBack/IME/Back/lifecycle remains a follow-up until observed.

## Implementation constraints

- Local-only dedicated card/action, independent of Finance visibility and Save Settings. Hidden Finance is not a reason to hide the credential action. Direct fragment entry expands/focuses the card without a credential in URLs.
- Only absent saved credential uses exact legacy configured/default verification, including nonnumeric legacy values. Custom new/confirm/current unlock normalize English/Persian/Arabic-Indic digits consistently; keep 4–12 digits and leading zeroes. No trim/Number conversion or digit-only restriction on legacy current input.
- One versioned, salted derived verifier in a dedicated key outside JSON schema; complete offline crypto and current credential reauthentication first. Snapshot recheck immediately before one atomic write. Security owns derivation parameters/version validation and final independent review.
- Successful write synchronously revokes every protected runtime consumer/cache/draft/preview and pending async read/unlock/transfer before success. Receiving contexts detect change and relock. Failed validation/Cancel/thrown atomic write leave prior key/records/session unchanged. Never make a multi-key success claim or fall back to plaintext.
- JSON export excludes credential/verifier/session; Merge and Replace leave destination PIN unchanged and reject/ignore incoming credential-looking metadata according to the store contract. Existing schema/old-backup support and full backup/import PIN gate remain unchanged. Existing files cannot reset a locked installation.
- PIN values are ephemeral component state only, cleared on Cancel/navigation/success/external credential change; no logs, exported content, persistent form draft or query parameters.
- Frontend/QA must test implementation rather than treat studio callbacks as credential/security code. Stories perform no storage/crypto/unlock/native calls and model explicit outcomes only.

## Editable stories and verification

Base: `http://localhost:6006/?path=/story/proposals-finance-pin--`.

| Coverage | Story exports |
| --- | --- |
| Phone EN Light/Dark | `EnglishPhone`, `EnglishPhoneDark` |
| Phone FA Light/Dark | `PersianPhone`, `PersianPhoneDark` |
| Wide EN Light/Dark | `EnglishWide`, `EnglishWideDark` |
| Wide FA Light/Dark | `PersianWide`, `PersianWideDark` |
| Validation and persistence | `MissingCurrent`, `WrongCurrent`, `InvalidNew`, `Mismatch`, `Unchanged`, `Saving`, `WriteError`, `Unsupported` |
| Recovery boundary and session | `Corrupt`, `Unavailable`, `Forgotten`, `ChangedElsewhere`, `Expired`, `Interrupted`, `FinanceLocked`, `ExportLocked`, `PersianLarge` |

Language, theme, width, hidden/visible, locked/unlocked, initial/default credential and enlarged text remain editable story controls. Direct review links: [English phone](http://localhost:6006/?path=/story/proposals-finance-pin--english-phone), [English phone Dark](http://localhost:6006/?path=/story/proposals-finance-pin--english-phone-dark), [Persian phone](http://localhost:6006/?path=/story/proposals-finance-pin--persian-phone), [Persian phone Dark](http://localhost:6006/?path=/story/proposals-finance-pin--persian-phone-dark), [English wide](http://localhost:6006/?path=/story/proposals-finance-pin--english-wide), [English wide Dark](http://localhost:6006/?path=/story/proposals-finance-pin--english-wide-dark), [Persian wide](http://localhost:6006/?path=/story/proposals-finance-pin--persian-wide), [Persian wide Dark](http://localhost:6006/?path=/story/proposals-finance-pin--persian-wide-dark).

| Check | Evidence | Result |
| --- | --- | --- |
| Current source/screenshots | Settings/Finance/Export/local stores at `4f62d32`; saved shipped EN/FA Settings and hidden Finance screenshots | Compared; current behavior separated from proposal |
| Studio checks | `npm run typecheck`, `npm run build` in `design/studio` after final story amendments; `git diff --check` | Passed; existing bundle-size warning only |
| Rendered phone/wide and states | [Actual studio captures](evidence/2026-10-13-finance-pin/) from parent-supported IAB; all eight EN/FA Light/Dark phone/wide scenes and explicit edge states | Designer inspected: readable hierarchy, masked fields, required warnings before Save, distinct save/cancel/error/relocked outcomes; no visible clipping |
| Focus, validation, portrait/landscape and scaling | 390×844 phone, 1280×900 wide, 844×390 landscape fields/focus; enlarged Persian full-page; mock mismatch/Cancel screenshots | Passed bounded visual review; parent observed mock values retained on mismatch and cleared on Cancel while Settings draft remained |
| Actual frontend | Implementation screenshots, source and parent browser QA, with final Dark feedback correction | Designer accepted; parent reports automated/source Security gates passed; no native claim |

Ready decision: **Designer recommends this change and marks the handoff ready for implementation.** No required design choice remains unresolved. Product scope and Security source constraints are accepted by the lead. Continue through frontend implementation, tests, independent Security/QA review, actual-screen comparison and validated release gates; no further design-only stopping point is required.

Designer inspected parent-captured main eight scenes, full EN/FA forms/success, missing/wrong current, invalid/mismatched/unchanged new PIN, committing, read/write/crypto failures, corrupted credential, forgotten-PIN disclosure, cross-context change, expiry/interruption and current Finance/Export entry mock states. The [mismatch witness](evidence/2026-10-13-finance-pin/mock-mismatch-preserved-full.jpg) preserves masked sample values; [Cancel witness](evidence/2026-10-13-finance-pin/mock-cancel-unchanged-full.jpg) collapses with unchanged-PIN feedback and retains the independent Settings draft. Parent performed these prototype-only interactions; no actual credential/store changed. [Landscape field/focus witness](evidence/2026-10-13-finance-pin/english-landscape-fields.jpg) shows normal scroll and visible focus rather than a clipped fixed sheet. [Enlarged Persian](evidence/2026-10-13-finance-pin/persian-large-full.jpg) wraps without truncating warnings or controls.

The prototype intentionally does not implement credential cryptography, concurrent writes, protected caches or OS/native lifecycle. These remain implementation/Security/QA gates. Actual error-field focus and fragment entry are now verified by parent browser QA and implementation captures below. Native Back/keyboard remains a follow-up; studio code does not establish production credential behavior. Native Android/TalkBack and real upgrade/transfer remain unverified.

Process inventory for routine closeout: task-owned `npm run storybook -- --host 127.0.0.1`, listener PID `82453`, tool session `18790`, loopback port `6006`, working directory `design/studio`; no longer needed by Designer after parent capture completion. Parent resets its viewport and closes its capture tab. No app server or application edits were started by Designer.

## Actual implementation review — 2026-10-13

Designer inspected [actual implementation captures](evidence/2026-10-13-finance-pin/implementation/): fresh checked visibility, EN Light and FA Dark phone/wide PIN cards, required warnings, empty-current validation, direct fragment entry, hidden Finance action, landscape fields/actions, still-locked Finance and excluded Finance report fields. Placement and copy match this handoff; the production warnings use the existing plain muted text rather than the studio’s optional soft grouping, preserving readability and order without adding assets or tokens.

Parent browser QA observed fresh default true, explicit hidden choice retained across clean reload, PIN action available while hidden, empty Save focusing Current PIN, legacy text/new numeric input modes, Cancel preserving unrelated Settings draft, direct `#finance-pin` expansion/focus, Finance still locked after showing it and report Finance fields still off. These are parent-observed behavior results rather than inferences from static images. No new PIN was entered or committed through computer use; credential persistence/crypto/concurrency/relock remain covered by the separate reported automated/source Security gates (119 total tests plus 24 focused tests).

The bounded final-review contrast finding is resolved: `FinancePinCard` now uses the existing `text-emerald-800` status role for the shared success/Cancel feedback paragraph. Source verification confirms that class, and parent measured the rendered Dark color as `rgb(169,232,188)` (`#a9e8bc`). Designer inspected the final [English Dark Cancel](evidence/2026-10-13-finance-pin/implementation/final-cancel-feedback-en-dark-phone.jpg) and [Persian Dark Cancel](evidence/2026-10-13-finance-pin/implementation/final-cancel-feedback-fa-dark-phone.jpg) screenshots: feedback is readable, accurate and separate from other Settings controls. Parent used empty forms; no credential was entered or changed. Lint/types/local build passed after the one-class correction, as reported by parent.

**Final Designer acceptance: accepted for the lead’s remaining validation/release gates; no unresolved design finding remains.** The PIN change and default-visible implementation match the handoffs within the observed browser scope. Native Android/TalkBack, real upgrade/transfer and lifecycle remain unverified; actual browser success/relock is not claimed because no new credential was entered.
