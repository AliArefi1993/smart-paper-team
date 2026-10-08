# Design: AI report copy and share handoff

Status: implemented (bounded desktop/responsive QA passed; native follow-ups recorded)
Updated: 2026-10-08
Owner: Designer; frontend Export / `AiReportPanel`
Design type: proposed correction to the existing report handoff

## Problem and evidence

The maintainer reports that Open ChatGPT opens the app then redirects to the website without attaching anything. Current source is a plain URL without a payload; the cause of device routing is unverified. Current sharing silently refreshes report content and uses the same success message for chooser return and browser download. Product scope and acceptance are in [the approved brief](2026-10-08-ai-report-handoff-product.md) and [task](../tasks/2026-10-07-ai-report-chatgpt-handoff.md). [Foundations](foundations.md), current `ai-report-panel.tsx`, `file-share.ts`, and EN/FA i18n anchor this proposal. The existing Export studio baseline is structural, not recipient-delivery evidence.

## Outcome and scope

Remove Open ChatGPT entirely. Keep **Share report file**, add **Copy report text**, and make manual text selection available independently when sharing cannot reach a useful recipient or copying is unavailable. Nothing opens, attaches, copies, or sends automatically. Existing date/field controls, report formatting, finance defaults, unlock behavior and Markdown file content remain intact. Do not add a save action, deep link, plugin, or Planner shortcut.

Success means the user deliberately transfers the reviewed content or can select it manually, receives truthful localized feedback, and retains selections after recoverable failures. Native recipient acceptance and clipboard capability require phone follow-up; this design does not certify them.

## Flow and hierarchy

Keep the existing title, introduction, date controls, fields, summary, then report review. In the handoff area place a short instruction paragraph, primary Copy report text, secondary Share report file, and tertiary Select text manually. Buttons wrap naturally on phones; do not squeeze long Persian labels onto a single line. Reuse the existing report review disclosure for fallback text instead of creating another report panel. In production the existing `pre` may become a labeled read-only textarea throughout; it retains report formatting and full content, with a bounded scroll area and `dir="auto"`.

Copy and Share are peers with distinct effects; Copy is primary because the reported receiving-app route is unreliable. Manual selection is always discoverable for eligible reports. It opens the report disclosure, focuses its read-only textarea, and selects its content only after the freshness/auth check. A Select report button within the open manual fallback repeats that deliberate selection, including the same check. Browser/OS Copy is the final manual action; never call clipboard APIs from fallback selection.

## Exact bilingual copy

Existing title, dates/fields, review label, no-data/unlock/selection/invalid-date messages remain. Replace the handoff hint and use these labels/results; no raw platform error is shown to the user.

| Purpose | English | Persian |
| --- | --- | --- |
| Copy action | Copy report text | کپی متن گزارش |
| File action | Share report file | اشتراک‌گذاری فایل گزارش |
| Manual action | Select text manually | انتخاب دستی متن |
| Textarea label | Report text | متن گزارش |
| Selection action | Select report | انتخاب گزارش |
| Busy | Preparing report… | در حال آماده‌سازی گزارش… |
| Hint | Copy the report, open ChatGPT yourself, then paste, review and send. Or share the file and choose ChatGPT if available. Smart Paper does not send it for you. | گزارش را کپی کنید، خودتان ChatGPT را باز کنید، سپس متن را جای‌گذاری و بررسی کنید و بفرستید. یا فایل را به اشتراک بگذارید و اگر ChatGPT موجود بود آن را انتخاب کنید. کاغذ هوشمند گزارش را برای شما ارسال نمی‌کند. |
| Changed preview | The report changed. Review the updated preview, then choose Copy or Share again. | گزارش تغییر کرده است. پیش‌نمایش به‌روز را بررسی کنید، سپس دوباره کپی یا اشتراک‌گذاری را انتخاب کنید. |
| Copied | Report copied. Open ChatGPT, paste it, review it, then send. | گزارش کپی شد. ChatGPT را باز کنید، متن را جای‌گذاری و بررسی کنید و سپس بفرستید. |
| Chooser return | Share menu closed. Check the receiving app before sending. You can also copy the report text. | فهرست اشتراک‌گذاری بسته شد. پیش از ارسال، برنامه مقصد را بررسی کنید. می‌توانید متن گزارش را هم کپی کنید. |
| Browser download | Report download started. Check your downloads, then attach the file in ChatGPT and review before sending. | بارگیری گزارش شروع شد. پوشه بارگیری‌ها را بررسی کنید، سپس فایل را در ChatGPT پیوست کنید و پیش از ارسال بررسی کنید. |
| Cancelled | Sharing was cancelled. You can try again or copy the report text. | اشتراک‌گذاری لغو شد. می‌توانید دوباره تلاش کنید یا متن گزارش را کپی کنید. |
| Share error | Could not share the report file. Try again or copy the report text. | اشتراک‌گذاری فایل گزارش انجام نشد. دوباره تلاش کنید یا متن گزارش را کپی کنید. |
| Clipboard denied/unavailable | Could not copy automatically. Select the report text, then use your device’s Copy command. | کپی خودکار انجام نشد. متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید. |
| Manual selection guidance | Select the report text, then use your device’s Copy command. | متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید. |
| Source read error | Could not prepare the report. Try again. | آماده‌سازی گزارش انجام نشد. دوباره تلاش کنید. |

Clipboard operations write only the selected report text to the device clipboard after a deliberate click. They do not upload it; do not promise clipboard encryption or isolation from the operating system. Recipient, clipboard and device permissions remain outside this app's control. Do not add a new privacy dialog.

## States and implementation constraints

1. Capture the selected options, language and reviewed formatted text on click. Busy-lock dates, All dates, field controls, Copy, Share and manual selection for the operation; keep focus on the initiating control. Show one busy status and prevent concurrent operations.
2. Refresh only the source required for the selected fields, retaining dates and field filters. Recheck finance authorization for every Copy, Share and Select report/manual selection action. Finance stays off by default. On expired access, invoke the existing expiry handler, hide financial preview/fallback text, show the localized unlock message, and perform no transfer or selection.
3. Compare the refreshed formatted report with the reviewed preview. If changed, update the matching source snapshot (planner state or finance refresh callback), show the changed-preview message, open the disclosure and bring its beginning into view. Perform no copy/share/selection. The user reviews and deliberately clicks again; a later change repeats this check. Do not treat a second click as blanket permission to bypass subsequent changes.
4. Transfer exactly the stable reviewed report. Copy success is announced only when the clipboard promise resolves. Clipboard absence or failure opens the manual fallback without automatically selecting or copying; focus the labeled text for discovery, then let Select report or the OS selection mechanism perform selection deliberately. A source-read failure cannot expose newly read/stale unauthorized content.
5. File helper outcome `shared` receives neutral chooser-return text, never sent/attached/success language. `downloaded` receives download-started wording. Explicit cancellation has its own neutral status and does not trigger copying. Share failure retains preview and controls; no automatic fallback clipboard write. Native cache creation is not called a download.
6. Empty results, no selected field, invalid range, source loading and locked finance disable all three handoff actions with the existing reason visible. Clear obsolete result messages when options or preview content change. For source errors, keep selections and provide retry via the action; authorization failures clear sensitive fallback content.

## Layout, RTL and accessibility

Use existing app surface/ink/muted/border and teal primary roles in both themes, with existing rounded controls and visible focus. No new tokens or assets. Match the existing report max width; retain phone padding and 44px minimum action targets. Secondary/tertiary controls wrap, not truncate; text enlarges without fixed-height clipping. Keep report body read-only, labeled, scrollable and selectable. Do not place the full report in a live region. Operation feedback uses one polite `role=status`; recoverable failures use `role=alert` once. Native focus order follows date/field controls, disclosure, handoff actions and manual selection; disclosure state is programmatic, focus outlines remain visible in both themes. Preserve document language and RTL alignment; dates remain LTR and report paragraphs use auto direction for mixed user text. No automatic clipboard mutation, recipient launch, or keyboard opening on first render.

## Editable studio and mapping

[AiReportHandoff.stories.tsx](studio/src/stories/AiReportHandoff.stories.tsx) maps the report review and handoff portion to `AiReportPanel`; preceding filters are abbreviated review context, not proposed replacement controls. Story buttons simulate results and never use the actual clipboard/native chooser. Production freshness/auth checks remain frontend responsibility.

Review links: [English phone](http://localhost:6006/?path=/story/proposals-ai-report-handoff--english-phone), [Persian phone dark](http://localhost:6006/?path=/story/proposals-ai-report-handoff--persian-phone-dark), [English wide dark](http://localhost:6006/?path=/story/proposals-ai-report-handoff--english-wide-dark), [Persian wide](http://localhost:6006/?path=/story/proposals-ai-report-handoff--persian-wide), [large Persian manual fallback](http://localhost:6006/?path=/story/proposals-ai-report-handoff--persian-manual-large). Additional story exports:

- `english-phone`, `persian-phone-dark`, `english-wide-dark`, `persian-wide`
- `busy`, `no-data`, `finance-locked`, `changed-preview`, `copied`
- `share-cancelled`, `share-error`, `copy-error`, `persian-manual-large`

All stories also expose language/theme/width/state controls; realistic EN/FA report content and long guidance are included. No Figma supplement is needed for this bounded existing-screen change.

## Readiness and verification

Designer recommends implementation. Required interaction/language decisions are resolved; bounded studio checks passed. Frontend data-path tests and post-implementation QA must verify the actual behavior, including matching transfer content, authorization expiry and honest outcome classification.

| Check | Evidence | Result |
| --- | --- | --- |
| Baseline comparison | Current panel/helper/i18n and current Export baseline; user report recorded by Product | Source comparison completed; actual development interaction checks and final release export comparison completed; see QA record |
| Studio check/build | `npm run typecheck && npm run build` using existing host dependencies; Node 25.2.1, no installs, no package/lock change | Passed |
| EN/FA phone/wide light/dark, long labels, manual large text | Native Chrome Guest via CUA: screenshots of 390px EN light / FA dark phones, 680px EN dark / FA light wide, FA 22px manual text; wrapping and focus/selection visible | Passed structural review |
| Busy/disabled/changed/error/copied/cancelled/returned/download/manual | CUA AX checked all listed states; clicked Copy simulation and Select report; focus outline and selected textarea screenshot inspected | Passed studio simulation; actual operations pending implementation |
| Native Android clipboard/chooser/ChatGPT/TalkBack | Requires actual-device follow-up | Unexecuted; do not claim recipient delivery |

Known existing studio environment limitations: Docker reusing host dependencies misses the Linux `@oxc-resolver` native binding; Docker npm ci reports lock omissions for `@emnapi/core` and `@emnapi/runtime`. Reuse installed host dependencies for validation without changing package/lock files.

Preview inventory: task-owned `python3 -m http.server 6027 --bind 127.0.0.1 --directory design/studio/storybook-static` (tool session 5977, team root cwd) was used only for this review. IAB was unavailable (no enabled browsers); native Chrome Guest CUA supplied rendered evidence. The task-owned Guest window was closed. The server exited cleanly and lsof confirmed no listener on 6027. No shared Chrome process was killed. Generated Storybook output is ignored.


## Implementation comparison

Compared implemented Export handoff with this design in the running local-data development app and final Android 2026.10.8 production export. Copy, Share and manual selection labels/instructions match; the existing disclosure contains a labeled read-only textarea throughout (the permitted implementation option). Actual copied text matched the reviewed report exactly; changed-source and finance-expiry safeguards passed bounded injected checks. Final production English wide Light/Dark and Persian 390px Light/Dark screenshots show readable wrapped actions and guidance, with expected dark surface `#1b2b29`. The development-only stale CSS discrepancy was resolved by production comparison. See [exact QA evidence and limits](2026-10-08-ai-report-handoff-qa.md). Native Android/TalkBack/recipient behavior remains unverified; no delivery claim is made.
