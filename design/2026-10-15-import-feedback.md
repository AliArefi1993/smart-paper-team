# Design: Import feedback and access

Status: implemented — bounded design comparison accepted
Updated: 2026-10-16
Owning frontend: `/export`, `src/components/export-view.tsx`; local week list feeding `weekly-planner.tsx`
Design type: proposed change

Merge semantics in this historical feedback handoff are superseded by the [safe Merge correction](2026-10-16-safe-merge.md). Preserve receipt/focus behavior; do not restore incoming-wins handling for matching device data.

## Problem and scope

[Product brief](2026-10-15-import-feedback-product.md) owns scope and acceptance. Current source clears the file chooser and puts its shared success above the overview, away from the import control. Week/income counts mean incoming records, not net additions; Ideas/templates are missing. Saved weeks beyond the generated +/-8 week window are inaccessible through the current rail.

Recommend the contextual receipt and inclusion of saved dates in the existing rail. No preview wizard, diff calculation, new picker, schema/storage change, backend feature, or Planner deep link.

## Interaction handoff

1. Keep the existing mode controls and chooser. Immediately below the chooser, maintain one in-session receipt for the latest actual attempt. Snapshot file name and actual mode when selected; use structured state so language switching retranslates labels and numbers without losing identity. Reset the native input so the same file can be chosen again. Native chooser dismissal with no file does not start an attempt or erase the last receipt.
2. Loading title: **Importing backup… / در حال ورود نسخهٔ پشتیبان…**. Show filename/mode; disable chooser and mode changes during import. No focus change or automatic scroll while loading.
3. Success title: **Import complete / ورود اطلاعات انجام شد**; local success subline **Saved on this device. / در این دستگاه ذخیره شد.** Show **File / فایل**, **Mode / روش ورود**, then **Records in this backup / رکوردهای موجود در این نسخهٔ پشتیبان**. Local counts: Weeks / هفته‌ها; Income entries / درآمدها; Ideas / ایده‌ها; Week templates / الگوهای هفتگی. Explicit zero for absent optional collections. Explain **These counts describe the backup, not newly added records. Merge can update matching records. / این تعداد مربوط به نسخهٔ پشتیبان است، نه اطلاعات تازه افزوده‌شده. ادغام می‌تواند اطلاعات همسان را به‌روز کند.** Source these from the validated incoming backup; never merged device totals.
4. If incoming weeks exist, show their date range using existing localized date formatting, from earliest incoming start through six days after latest incoming start (do not trust optional end dates). Add **Open Planner / باز کردن برنامه‌ریز** linking `/`, with **In Planner, use the week navigation to find these dates. / در برنامه‌ریز، با جابه‌جایی هفته به این تاریخ‌ها بروید.** Incoming Ideas may offer `/ideas`. Preserve the current hidden-Finance disclosure and `/settings#finance-visibility` link only when Finance is hidden; do not imply Finance has been shown. Template-only imports remain fully represented by their count; no invented template deep link.
5. On terminal success/error/Replace cancellation, focus a receipt container with `tabIndex=-1` and scroll its beginning into view using nearest alignment; avoid smooth animation with reduced motion. The receipt stays beside the chooser and does not disappear on export/unlock messages. Keep one announcement: polite status for progress/success/cancellation, alert for errors; navigation outside the live announcement. Outcome must be clear by text, never color alone. Focus must not land on a distant global banner.
6. Replace retains native destructive confirmation with file, all four local incoming counts and existing warning. Cancel: **Import cancelled / ورود اطلاعات لغو شد**, **No changes were saved. / هیچ تغییری ذخیره نشد.** Never display success. Invalid JSON/validation/storage errors: **Import did not complete / ورود اطلاعات انجام نشد**, contextual existing error detail and select-file retry. Do not promise rollback succeeded unless authoritative; preserve current rollback handling. Finance expiry retains protected lock UI and PIN requirement, clears sensitive receipt and cannot show stale success. A newly selected file supersedes the previous receipt.
7. Django success reports supported backend week/income counts and truthful success wording; omit local-only Ideas/templates and device-only promises. Preserve Finance authorization, credential invalidation, validation before mutation, diagnostics privacy, Merge/Replace semantics, hidden visibility and PIN exclusions. Filename stays only in UI memory, never diagnostics/network.
8. Local Planner week list unions saved start dates with its normal generated range, unique and chronological. Do not generate intervening empty dates. Preserve current-week default selection and existing selected-button centering. Retain all existing week-card styling, current badge, horizontal phone scrolling/grid wide, keyboard order and press feedback. A distant saved week behaves like any existing week card when selected; no auto-selection after import.

## Layout and accessibility

Reuse existing rounded import panel, soft surface, border, teal action and existing success/error roles; no new asset. On 360–390px use a single count column with aligned label/value. Wide can use two columns. Filename uses `bdi`, `overflow-wrap:anywhere`; modes and route links wrap with minimum 48px targets. Persian uses Vazirmatn/RTL and localized numerals; dates use established helpers. At 150% text all content grows vertically. Dark uses foundation surface/ink/muted/accent roles and visible amber focus. Preserve the existing unencrypted-backup disclosure.

## Editable stories

Source: [ImportFeedback.stories.tsx](studio/src/stories/ImportFeedback.stories.tsx). Studio base `http://localhost:6016/?path=/story/proposals-import-feedback--`.

- [English phone](http://localhost:6016/?path=/story/proposals-import-feedback--english-phone), [Persian phone](http://localhost:6016/?path=/story/proposals-import-feedback--persian-phone), [English wide](http://localhost:6016/?path=/story/proposals-import-feedback--english-wide), [Persian wide](http://localhost:6016/?path=/story/proposals-import-feedback--persian-wide).
- Initial, Importing/PersianImporting, ReplaceComplete, ReplaceCancelled, PersianError, StorageFailure, AuthorizationExpired (existing lock surface with no receipt), EmptyBackup, RepeatedMerge, IdeasOnly, TemplatesOnly cover outcomes. EnglishLargeDark/PersianLargeDark cover enlargement and dark tokens.
- ArchivedWeekEnglish/ArchivedWeekPersian and CurrentWeekDefault show the existing rail with a distant saved week and current selection; samples omit intervening normal-window cards for compactness. Production preserves the full generated window.

Stories are editable state studies; the native input is illustrative and does not import files. Receipt actions reflect existing routes. Production errors/PIN handling remain authoritative.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product/current source comparison | Brief + export-view/local import + weekly-planner rail source reviewed | Complete |
| Studio typecheck/build | Docker Node24 isolated Linux dependencies: typecheck/build passed; local studio typecheck/build passed. Initial cross-platform binding failure resolved using isolated Linux dependencies | Passed |
| EN/FA phone/wide rendered review, long text/dark/states | CUA IAB screenshots: EN/FA phone 390px, FA error/archive 360px, EN/FA wide 1200px, FA 150% dark. Rendered text/no page overflow checked for loading/cancel/empty/repeated/Ideas-only/templates-only/storage error/current default. Long filename wraps and counts remain readable | Passed |
| Implemented app comparison | Native Chrome Guest, local static preview `127.0.0.1:3192`, synthetic JSON: EN receipt automatically focused with title visible, filename/mode/device-save and 1/0/1/1 counts; language switch retranslates receipt without moving focus; FA dark RTL screenshot readable; Open Planner defaults current, existing rail opens Jan 2001 archive and exact imported goal | Passed in wide browser; no blocking visual difference |
| Implemented phone regression evidence | EN/FA 390px browser tests assert terminal title in viewport, focused receipt and no receipt overflow; execution belongs to exact-source CI. IAB backend was unavailable for app comparison, native responsive controls did not open | Pending CI; app phone screenshot review not claimed |
| Exact app phone/error regressions | [CI 38802594305](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38802594305), browser step on frontend `baf05da` | EN/FA focused receipt heading within viewport, no overflow, locale/focus retention, error/cancel/expiry and archived data checks passed |
| Physical Android/TalkBack | Not available in this design pass | Follow-up; no native validation claimed |

Open product/interaction decisions: none. Designer recommends implementation; no unresolved interaction decision remains. Studio build/render checks passed. Clear the receipt on authorization expiry and use the existing PIN surface with generic failure text. Disable export actions during import to avoid overlapping operations. Implementation acceptance additionally requires running app comparison and relevant regression checks.

## Implementation comparison decision

Designer accepts the implemented hierarchy and interactions based on actual wide EN/FA dark screenshots, native file import and archived-week navigation, studio phone state review, and source comparison. Existing labels (Idea Space, Week Templates, Merge / update) appropriately reuse established translations. Open Planner also appears for template-only imports; this ordinary route helps access templates without inventing a deep link. The existing Report Problem error action is preserved. No blocking design difference found.

The native app error attempt was not completed: the preview returned 404 when returning to `/export` during rebuild. Error layout was inspected in the studio and compared in source; full app failure/phone assertions remain in the browser regression suite. Native Android picker, TalkBack, exact phone app screenshots and physical text scaling are not certified by this review.
