# Design: Planner viewed-week AI report shortcut

Status: implemented; Designer accepted
Updated: 2026-10-13
Owning frontend route/component: `/`, `/export`; `WeeklyPlanner`, `ExportView`, `AiReportPanel`
Local studio: [PlannerAiShortcut.stories.tsx](studio/src/stories/PlannerAiShortcut.stories.tsx), `Proposals/Planner AI shortcut`
Optional Figma: not required
Design type: proposed change

## Problem and evidence

Prepare a selective report of the week being viewed without entering its dates again. This remains optional external reflection. [Product scope](2026-10-12-planner-ai-shortcut-product.md) and [task](../tasks/2026-10-07-planner-ai-review-shortcut.md) define acceptance; personal systems observations were incorporated by Product.

Current source and the running static frontend build at `c0ada33` show a week header with readable Shamsi dates, save status, totals and Week Templates. Export is a general route link; the existing selective report starts with blank date fields (all dates), below the backup introduction. It already has all eight field controls, counts, report disclosure, deliberate Copy/file Share/manual selection and Finance authorization/freshness checks.

Proposed departure: add one secondary action to the loaded week header, pass calendar context only, and bring the existing report into view with the week range selected. The studio summarizes surrounding screens and three field examples; it is not a replacement builder, field specification or pixel-identical app. Keep the application's current date formatting, report fields and defaults.

Needs confirmation: convenience and discoverability in real use. Browser checks establish layout and understandable context, not user research or native delivery.

## Outcome and scope

One deliberate action on a loaded local-mode Planner opens the existing report at the inclusive Saturday–Friday bounds of that viewed week. Dates and fields remain editable. Preparation stays offline; transfer is deliberate. App planning continues without AI or internet.

In scope: local Android contextual entry, report initialization/focus, bilingual explanation and failed-save/editor/invalid-context safety. No second builder, AI account/API integration, backend change, new report fields, automatic sending, automatic record edits or required weekly routine.

## Design direction

Place **Review this week with AI / مرور این هفته با هوش مصنوعی** beside the existing Week Templates action in the loaded week details header, above Week Goal. Use the same secondary bordered button treatment and wrap the action group. Keep the current readable Shamsi week heading and save status; do not add a competing top navigation item or a sticky footer action. The existing Export link remains ordinary Export.

Below the action group use one small muted sentence: **Optional: choose report fields, then review and share yourself. / اختیاری: داده‌های گزارش را انتخاب کنید، سپس خودتان بررسی و اشتراک‌گذاری کنید.** The action always refers to the loaded viewed week, including past/future weeks, never today's date. Empty loaded weeks can enter the report; the existing no-matching-data state blocks transfer when appropriate.

On valid entry, scroll the existing AI report heading into view and focus it programmatically (`tabIndex=-1`). Keep **Share with AI / اشتراک‌گذاری با هوش مصنوعی**, current description and controls. Add a compact context line immediately before date controls: **From Planner · viewed week / از برنامه · هفتهٔ نمایش‌داده‌شده**, followed by its inclusive bounds. Use readable date formatting consistent with Planner; native date inputs retain Gregorian values and `dir=ltr`. Remove/update the viewed-week claim after editing dates or selecting All dates; never leave a stale week badge above a broader report.

Retain current report controls and transfer instructions. Add one short explanation beside report preparation/transfer:

> Prepare this report offline. Copy or share it yourself, then review and send in your preferred AI app. Cloud AI responses need internet. Planning needs neither AI nor internet.

> این گزارش را آفلاین آماده کنید. خودتان آن را کپی یا اشتراک‌گذاری کنید، سپس در برنامهٔ هوش مصنوعی دلخواه بررسی و ارسال کنید. پاسخ هوش مصنوعی ابری به اینترنت نیاز دارد. برنامه‌ریزی به هوش مصنوعی یا اینترنت نیاز ندارد.

Reuse global surface, border, ink, muted, teal and focus roles. No assets or token changes. A separate in-Planner report builder was rejected because it duplicates selection/preview/privacy logic. An always-prominent AI tile was rejected because daily planning remains the screen's primary job.

## States and layouts

| State | Required behavior and bilingual copy |
| --- | --- |
| Loaded saved past/current/future week | Enabled secondary action; selected loaded bounds, not current-week bounds. Context shown at report entry. |
| Loading/no loaded detail | Disabled shortcut; **Loading the viewed week… / در حال خواندن هفتهٔ نمایش‌داده‌شده…**. Do not use stale detail while selection changes. |
| Saving/load failure | Disabled until the loaded week is current and successfully persisted. Keep existing load recovery/save Retry and retained writing. |
| Failed save | Existing save error and Retry stay primary recovery; explain **Save failed. Retry saving before preparing a report. / ذخیره انجام نشد. پیش از آماده‌سازی گزارش، دوباره ذخیره کنید.** Successful Retry enables entry with saved edits. No automatic navigation after Retry. |
| Open event/template/full-writing editor | Disable while an editor/sheet is active. **Finish editing before preparing a report. / پیش از آماده‌سازی گزارش، ویرایش را تمام کنید.** Preserve each editor’s existing controls: event Add/Save or Cancel; template sheet Close; full-writing Done with existing autosave/status/Retry. Full-writing Done does not discard or require a manual save. Keep dirty-writing protections; do not introduce an implicit discard or generic Save/Cancel promise. |
| Invalid contextual entry | Focus report heading and announce inline alert: **The week link is invalid. No report was prepared. Choose dates to continue. / پیوند هفته معتبر نیست. گزارشی آماده نشد. برای ادامه، تاریخ‌ها را انتخاب کنید.** Empty disabled dates/fields, no report preview, all three transfer actions disabled. Ordinary backup/export controls remain independent. |
| Invalid recovery | **Choose report dates / انتخاب تاریخ‌های گزارش** clears invalid context, enables blank date controls and focuses From date. Keep report preview and transfer unavailable until the user supplies a valid inclusive range or deliberately chooses existing **All dates / همهٔ تاریخ‌ها**. Do not silently preview all history on recovery. No viewed-week claim after recovery. |
| No matching data/source error/busy | Reuse existing no-data/source-load error/busy states and action locks; don't fabricate an empty-week report or successful transfer. |
| Copy denied | Reuse existing error, open report disclosure, focus readable text/manual selection. **Could not copy automatically. Select the report text, then use your device’s Copy command. / کپی خودکار انجام نشد. متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید.** |
| Cancelled chooser | Existing neutral cancellation feedback; allow retry/Copy. Cancellation is not delivery, attachment or sending. |
| Source changed | Reuse refreshed-preview review and deliberate second action; announce change and show updated text. No automatic retry. |
| Finance selected but locked/expired | Keep Finance excluded by default. Existing unlock link, hidden-Finance recovery, transfer-time authorization and source freshness remain required for Copy, Share and manual selection. No bypass from shortcut context. |
| Return to Planner | Existing Planner route/browser Back stays available. Report changes do not mutate records; entry only occurs after save/editor resolution. No new promise to retain the viewed-week selection across route remounts. |

Phone: use the current week-header flow at 390px; action group wraps with at least 48px targets and no fixed height/truncation. Date controls stack as needed; context dates get their own line. Wide: retain existing header grouping and max-width report; no extra desktop sidebar. Long EN/FA text and 22px prototype text wrap vertically. UI carries `lang` and `dir`; use logical alignment and spacing, directional isolation for dates, and `dir=auto` for report/user writing.

Native disabled buttons expose disabled state; surrounding helper/status remains readable when skipped by Tab. Associate reason with `aria-describedby` without replacing existing save status or duplicating live announcements. Errors use `role=alert`; status uses polite announcements. Order: header context/status, Templates, shortcut, week writing. On report entry focus heading; recovery focuses first date; route return follows existing navigation. Keyboard Tab/Enter/Space uses native controls. Preserve visible focus, labeled dates/checkboxes/text, readable text contrast and non-color feedback. No new destructive action.

## Implementation handoff

- `WeeklyPlanner`: local-mode secondary action, existing save/load/editor guard, derive dates only from validated loaded `weekDetail` (also match selected-week state). Recheck guards at activation to avoid a selection/save race.
- `/export` / `ExportView`: route-context read and report entry focus; keep ordinary Export initialization unchanged. Suggested narrow contract: `/export?reportWeek=2026-10-03#ai-report`, one strict Gregorian Saturday start date; derive Friday via calendar addition. Frontend may use another equally narrow tested name/contract. No notes, fields, Finance data or report content in the URL.
- Context present but empty/duplicate/impossible/non-Saturday/outside supported date range must take invalid recovery; context absent takes ordinary all-dates behavior. Do not normalize malformed dates into another week. Date-only arithmetic must avoid timezone shifts. Frontend owns parsing tests and any accepted supported-range bounds.
- `AiReportPanel`: initial bounds/context and blocked-invalid/recovery state; retain all eight current fields/defaults, preview format, counts, no-data logic and transfer protections. One-time contextual initialization must not overwrite user date edits during rerenders/language changes. Recovery requires deliberate date/all-date choice before preparing any report.
- Existing manual selection, clipboard, native/browser sharing, download/cancel/source-refresh feedback remain authoritative. Story buttons simulate outcomes and never invoke clipboard/network/native APIs; story sample report content must not enter production.
- No required design choice remains unresolved. Designer recommends implementation after the lead confirms Finance visibility release closure. This design is ready; frontend implementation and final comparison remain separate gates.

## Editable stories and evidence

Base: `http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--`.

| Coverage | Story exports / URL suffixes |
| --- | --- |
| EN phone Light/Dark | [EnglishPhone](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--english-phone), [EnglishPhoneDark](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--english-phone-dark) |
| FA phone Light/Dark | [PersianPhone](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--persian-phone), [PersianPhoneDark](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--persian-phone-dark) |
| EN wide Light/Dark | [EnglishWide](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--english-wide), [EnglishWideDark](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--english-wide-dark) |
| FA wide Light/Dark | [PersianWide](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--persian-wide), [PersianWideDark](http://localhost:6006/?path=/story/proposals-planner-ai-shortcut--persian-wide-dark) |
| Safety and handoff | `SaveError`, `Editor`, `Loading`, `EmptyWeek`, `InvalidContext`, `InvalidPersian`, `CopyError`, `Cancelled`, `Changed`, `FinanceLocked`, `PersianLarge` |

[Saved screenshots](evidence/2026-10-12-planner-ai-shortcut/) include all eight phone/wide/theme combinations, current Planner/Export baseline, save error, EN/FA invalid context, FA editor, copy failure, keyboard focus and enlarged Persian content. Surrounding prototype content is deliberately summarized. Baseline frontend static export at `c0ada33` was served unchanged on task-owned loopback 8891; studio on 6006. Baseline browser interaction was read-only navigation on an isolated origin, with no record or appearance edits.

| Check | Evidence | Result |
| --- | --- | --- |
| Studio source | `npm run typecheck`, `npm run build` in `design/studio` after final story change | Passed; pre-existing bundle-size warning only |
| Phone/wide EN/FA Light/Dark | Actual supported IAB screenshots: 390px phone and 1280px viewport wide | Inspected, readable and no visible clipping; native date appearance remains browser-specific |
| States | Actual DOM/screenshots of loading, empty, failed save/Retry, editor, invalid EN/FA, clipboard failure, cancel, changed source and Finance lock | Correct labels, disabled states and non-color feedback in structural prototype; app behavior must be tested after implementation |
| Recovery interaction | Invalid recovery leaves Copy disabled; explicit All dates then enables it | Passed; no silent all-history preview |
| Accessibility | Keyboard Tab to shortcut screenshot; labeled native controls/disabled AX; 22px Persian text, measured 390px scroll width and visible button heights ≥48px | Passed bounded browser checks; no TalkBack claim |
| Text contrast | Light ink/soft 13.50:1, muted/white 6.11:1; Dark ink/soft 11.63:1, muted/surface 8.45:1 | Above 4.5:1 for checked text roles; disabled contrast is not an enabled-action cue |
| Running-app comparison | Baseline Planner week header/date/save/Templates and direct Export blank-date/default-field flow, saved screenshots | Passed current-behavior comparison; proposal intentionally adds action/context/focus only |
| Actual implementation | Parent QA and final Designer screenshot review, 2026-10-13 | Accepted after editor-helper correction; bounded browser evidence only |
| Native Android | Clipboard/chooser/recipient, lifecycle, keyboard and TalkBack | Unverified follow-ups; no device validation inferred |

## Actual implementation review — 2026-10-13

Designer reviewed the parent’s actual implementation screenshots in [implementation evidence](evidence/2026-10-12-planner-ai-shortcut/implementation/), including past/future EN date context, FA wide report, invalid link/recovery, storage-failure retained writing and event/full-writing guards. Existing eight fields, excluded Finance, clear offline/external AI explanation, visible focus and readable Light/Dark surfaces match the handoff. Parent QA reports exact week inclusion/exclusion, date/language preservation, explicit invalid recovery, save/editor guards and Retry success; these behavior claims are attributed to QA rather than inferred from static images.

The bounded editor-helper correction is implemented and source-verified in both languages: **Finish editing before preparing a report. / پیش از آماده‌سازی گزارش، ویرایش را تمام کنید.** The observed full-writing view has **Done** and automatic saving, so the earlier Save/Cancel wording inaccurately names its controls. Event controls and guards remain unchanged. Studio helper matches the corrected meaning. No unresolved Designer finding remains.

The new Export Suspense boundary has no fallback. A fleeting pre-hydration blank was reported; there is no evidence of sustained loading or a user-facing failure. A new loading presentation is not required by this bounded review; defer it unless slow-device evidence establishes a material delay. Do not claim the current Suspense boundary displays a loading state. Native Android/TalkBack evidence remains unverified.

Final Designer acceptance: inspected [FA Dark phone, 390×844](evidence/2026-10-12-planner-ai-shortcut/implementation/final-future-report-fa-dark-phone.jpg), [FA Dark wide, 1280×900](evidence/2026-10-12-planner-ai-shortcut/implementation/final-future-report-fa-dark-wide.jpg), and [EN Light wide, 1280×900](evidence/2026-10-12-planner-ai-shortcut/implementation/final-future-report-en-light-wide.jpg). Viewed-week Shamsi context and Gregorian date inputs agree, RTL/LTR order and wrapping are readable, all eight fields remain present with Finance off, and focus is visible in the FA contextual entry. These clean captures and the earlier actual error/editor/failure witnesses match the amended handoff. **Accepted for the lead’s remaining validation/release gates.** Native Android behavior is not certified by this review.
