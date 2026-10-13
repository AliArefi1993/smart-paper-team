# Design: Local reporting and diagnostics

Status: implemented; browser runtime design acceptance passed
Updated: 2026-10-13
Owning frontend: local-data Settings, recoverable operation errors, independent report composer
Design type: proposed change
Product scope: [brief](2026-10-13-local-diagnostics-product.md)
Editable source: [LocalDiagnostics.stories.tsx](studio/src/stories/LocalDiagnostics.stories.tsx)

## Problem and current behavior

The maintainer wants local evidence for problems and feature use without hosted telemetry, plus direct reporting by email. Source inspection of `settings-view.tsx` shows separate immediate Finance visibility and a manual Planner Settings form. Current operation errors offer retry or error text; there is no reporting composer. `file-share.ts` currently opens a generic file chooser, which does not meet the direct email requirement. Current baseline runtime comparison is pending; proposals below are new behavior.

## Selected flow and hierarchy

1. Place a **Report a problem / گزارش مشکل** action in the local-data Settings header area, before long Planner settings. The composer must open independently of primary-data reads and Settings save state. Preserve the Settings draft while the composer is open; do not route away and lose it.
2. Place a **Local diagnostics / عیب‌یابی روی دستگاه** card beside the existing independent preference cards, above Planner sections. Two separate immediately saved checkboxes: **Record local errors / ثبت خطاهای محلی** and **Count feature use / شمارش استفاده از بخش‌ها**. Both default ON only for genuinely missing preferences after the visible first-session disclosure and successful preference initialization. Preserve saved OFF. Read/malformed/persist failure disables the affected category; explain and offer retry.
3. Show a dismissible inline first-session/upgrade-session disclosure above the main route content when the defaults first initialize. It must be visible outside Settings, before recording begins, without blocking normal app use or requiring opt-in. Include **Open diagnostics settings / باز کردن تنظیمات عیب‌یابی** and **Got it / متوجه شدم**. Turning either category off from Settings stops it immediately and retains already recorded evidence.
4. In selected recoverable save/load/import/export/share error panels, add the same **Report a problem** action beside Retry. Never auto-open a report after failure. Primary content/error context remains behind the composer; raw error text must not enter its body. Also expose a safe reporting entry in rendering-error containment if introduced.
5. Open an independent in-flow/full-page composer surface (or accessible modal preserving its parent), with **What happened? / چه اتفاقی افتاد؟**, optional description and visible `0 / 4000` feedback. Nothing typed is automatically stored. Then two unchecked per-report choices **Include local errors / افزودن خطاهای محلی** and **Include feature counts / افزودن شمارش استفاده**, showing available counts/date span. Recording preferences never imply inclusion. Empty evidence choices are disabled with a reason. Offer inspection without losing the description.
6. **Review report / بررسی گزارش** creates a fixed readable snapshot with technical header, voluntary description and exactly selected evidence sections. Display recipient `arefi.ali90@gmail.com` in LTR, with subject and same body that the email action receives. No file attachment is required: selected evidence is included in the email body. Personal content is excluded from automatic evidence, but voluntary description may contain what the user chooses to type.
7. **Email Smart Paper / ایمیل به اسمارت پیپر** opens a draft addressed to the confirmed support recipient. **Copy report / کپی گزارش** copies the reviewed snapshot for manual email fallback; warn inline that copying places report text on the clipboard. Explain “Opens your email app. Review there and send when ready. Internet is only needed for email delivery.” Never say Sent/Delivered. Native missing-email/error keeps the snapshot/description and offers retry/copy. Browser mailto cannot establish handler or delivery.
8. **Edit report** returns with current description/inclusions; review again after edits. Close with nonempty description asks **Discard this description? / این توضیح کنار گذاشته شود؟** with Keep writing as primary and explicit Discard. Empty close clears composer without a confirmation. Cancel does not transfer data or change primary records.

## Bilingual content and limits

First-session English: “Local error recording and feature counts are now on. They exclude your writing, Finance records and PIN. You can turn either off in Settings. Nothing leaves this device until you choose to email a report.”

Persian: «ثبت خطاهای محلی و شمارش استفاده اکنون روشن هستند. نوشته‌ها، اطلاعات مالی و رمز ثبت نمی‌شوند. می‌توانید هرکدام را در تنظیمات خاموش کنید. تا وقتی خودتان گزارش را ایمیل نکنید، چیزی از دستگاه خارج نمی‌شود.»

Keep a short category explanation next to each checkbox: errors record coarse route/action/error codes; counts record daily feature totals and observed outcomes. Show exclusions plus “Only recent data is kept: up to 14 days, 200 errors and 128 KiB combined. Sudden app crashes may not be recorded.” / «فقط داده‌های اخیر نگه داشته می‌شوند: حداکثر ۱۴ روز، ۲۰۰ خطا و مجموع ۱۲۸ کیبی‌بایت. بسته شدن ناگهانی برنامه ممکن است ثبت نشود.» Empty evidence does not mean no failure occurred.

Inspection groups Errors and Feature counts, with readable dates/static codes and counts; never present raw exception prose. Provide Delete errors, Delete counts, and Delete all recorded data. Confirm the exact category and say primary Planner/Ideas/Finance records are kept; settings stay unchanged. Cancel is safe; deletion failure retains evidence and offers Retry; claim success only after verified deletion. No export/import/AI backup integration.

## States and layout

Reuse paper/teal/light/dark tokens, the immediate preference pattern and existing buttons/focus styles. No new visual asset. One main action at each stage: report opening, review, then email. Secondary Edit/Copy/Close wrap below. On 360–390px phones use one column, 16px outer spacing, full-width writing and wrapping actions; on wide screens cap composer near 720px. Composer and preview scroll in document flow, with no action obscuring the keyboard. Do not trap the user behind long preview text. Preview wraps codes/body; recipient and technical tokens use bidi isolation/LTR; description preserves user direction with `dir=auto`. Persian uses Vazirmatn inherited in textarea, English uses existing font. Dark errors use readable rose/amber ink with alert words.

Each checkbox's whole label is at least 48px tall, input at least 24px. Labels are programmatic; help uses `aria-describedby`; loading choices disabled until initialized. Visible focus and normal tab order; entering composer/preview focuses its heading; returning focuses originating Report button; inspection/delete returns to the prior surface without wiping writing. Modal implementation, if chosen, needs dialog name, focus containment, Escape using the same discard rule, background inertness and restored focus. Alerts announce recording/email/deletion failure; status announces verified save/copy/handoff without live-announcing every typed character. Counter is readable without an intrusive live region. Content remains usable under enlarged text; no hard viewport height on the editor.

## Editable story map

All stories are bilingual by default and expose language/theme/width/state controls:

- [Disclosure phone](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--disclosure-phone): fresh/upgrade notice plus both ON controls.
- [Settings dark wide](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--settings-dark-wide): immediate switches.
- [Composer phone](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--composer-phone): realistic description; inclusion starts unchecked.
- [Preview dark phone](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--preview-dark-phone): exact snapshot/recipient and email/copy/edit.
- [Empty phone](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--empty-phone), [Inspection wide](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--inspection-wide), [Delete phone](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--delete-phone).
- [Recording error](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--recording-error-phone), [Email error](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--email-error-dark-phone), [Email handoff](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--handoff-phone).
- [Loading](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--loading-phone), [Primary failure](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--primary-error-phone), [Discard](http://127.0.0.1:6006/?path=/story/proposals-local-diagnostics--cancel-phone).

Prototype samples are illustrative; native email is simulated, never sent. The text record owns per-category deletion and disclosure timing; story rendering alone does not certify actual recording/recipient behavior.

## Implementation constraints and decision

Use Product's strict allowlist, bounded separate store, failure isolation and excluded content contract. Composer must work while primary store is unreadable. No native crash promise, new device capture, remote upload, file-cache dependency or automatic sending. Direct email support uses ACTION_SENDTO/mailto; both recipient and body are the reviewed snapshot. Native URI/body-size failure must preserve the snapshot and offer copy; browser cannot promise mailto handling. Do not silently truncate report text. Accepted implementation mapping: one root provider owns the visible disclosure, initialization/runtime listeners and native `<dialog>` composer/inspection; local-mode Report buttons open it without raw error prefill, and an independent Settings card saves each preference. An immutable JSON report snapshot may be the exact email/copy body: technical keys/codes must remain LTR, wrap without horizontal clipping, and preserve localized description legibility. Localized surrounding guidance explains what the snapshot contains; this is a serialization choice, not additional collected content.

Open design decisions: none in scope. Designer recommends this change and marks the handoff ready for implementation after Docker-only typecheck/build and final bilingual story inspection. Ready is an implementation handoff, not a claim that the application or native Android behavior is validated. Final running implementation comparison and physical Android/TalkBack remain separate follow-ups.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current source baseline | Settings source + current generic file-share code inspected | New interactions grounded in actual source; running comparison pending |
| Final studio typecheck/build | Node 24.19.0 Docker `node:24-bookworm`; isolated Linux dependency volume; `npm ci --no-audit --no-fund`, `npm run typecheck`, `npm run build` | Passed final source; only existing large-chunk build warning. Initial host-dependency native-binding failure resolved by isolated volume |
| EN/FA phone composer | Docker-served Storybook, Chrome, 390px paired phone articles | Long sample text, Persian inherited font, labels and unchecked inclusions readable; no observed clipping |
| Final Docker preview: 13 bilingual stories | Disclosure, settings dark wide, composer, preview dark, empty, inspection wide, delete, recording failure, email failure dark, handoff, loading, primary failure, discard screenshots and AX trees | Passed structural review: wrapping actions, explicit states, LTR codes, RTL text, unchecked/disabled loading and empty controls, Retry and per-category deletion present |
| Keyboard / reviewed evidence | Deliberate error inclusion then Review, Tab from Email to Copy in rebuilt story | Error code included, counts excluded, visible gold focus; no email or clipboard transmission performed |
| Implemented visual comparison | Latest local-data Docker static preview at localhost:3000, synthetic headless Chromium screenshots and QA DOM measurements; Designer independently viewed images | Passed final browser runtime acceptance: EN/FA 360/390px phone, 1280px wide and 740×360 landscape; independent QA close-flow regressions passed after fix |
| Native Android / TalkBack / delivery | No device evidence | Unverified; not implied by stories |

## Process inventory and next validation

Docker studio preview container `sp-diagnostics-studio-preview` / `7b908c06efaa`, tool session `48853`, serves `127.0.0.1:6006`, working directory `/work` mounted from `design/studio/`. Command: isolated-volume npm ci, typecheck/build, then `npm run storybook -- --host 0.0.0.0 --ci`. Designer comparison is complete; routine closeout may stop only this verified task-owned container after remaining consumers finish. The dependency volume is anonymous; do not delete unrelated volumes. Frontend needs this ready handoff and Product brief; no new scope discussion is required. Final comparison will assess actual Settings/composer/error state behavior, including focus restoration, primary draft preservation and email failure retention.

Earlier interrupted Docker CLI sessions `11245` / `49980` and host static preview `4065` are stopped. This resumed turn ran no host Node checks/builds. Shared Docker daemon was not stopped or modified.

## Final implementation visual comparison

Designer independently inspected the actual Docker-served application screenshots in `/private/tmp/sp-diagnostics-qa/`: `en-disclosure-390.png`, `en-composer-390.png`, `en-preview-390.png`, `en-dark-preview-390.png`, `fa-composer-390.png`, `fa-composer-360.png`, `fa-dark-preview-390.png`, `fa-wide-preview-1280.png`, `fa-short-preview-740x360.png`, `fa-short-preview-actions-740x360.png`, and `en-delete-390.png`. These are temporary synthetic QA artifacts, not native-device captures. QA supplied the browser harness; Designer independently reviewed images and the bounded `evidence.json` / `scroll.json` measurements. No existing signed-in Chrome pages were used for this final review.

Observed acceptance: first-session disclosure is clearly above Settings and recording writes were observed only once its DOM was visible; reporting is available before the long manual Settings form. The native dialog keeps primary content behind it, wraps actions and preserves a readable 16px phone margin. EN/FA text and mixed Persian description are readable; Persian textarea computed direction is RTL and font is Vazirmatn. The exact JSON preview uses LTR technical keys, visible recipient/subject and wrapping content; a read-only textarea is an accepted implementation serialization layout. Dark surfaces, explicit white primary ink and focus outline remain readable. All measured dialog buttons are 48px tall, and dialog horizontal scroll width equals client width at phone/wide/landscape sizes. Heading focus and returning trigger focus were observed by QA.

Landscape is deliberately internally scrollable: at 740×360 the dialog stays at y18 with height324, inner client height322 and scroll height742. At scrollTop420, Email/Copy/Edit/Inspect sit at y213–261 and Close at y269–317; Designer inspected the corresponding screenshot and confirmed actions are reachable. This is a browser short-viewport check, not Android rotation or keyboard evidence. At 360px, secondary composer actions sit below the initial fold and remain part of the scroll flow; they do not cover the writing area.

The implementation matches the accepted global `<dialog>` proposal and independent immediate Settings controls. No blocking visual issue was found. A small non-gating copy refinement remains optional: isolate each Gregorian ISO date separately in Persian aggregate summaries, since an entire RTL summary's bidi isolation currently displays the span as `13-10-2026` rather than preserving `2026-10-13`. Codes and recipient are readable.

Final browser runtime interaction acceptance **passed** after independent QA rebuilt the corrected source and reran the main harness successfully (`qa.cjs` exit 0). Ten rapid-double-Escape cycles kept the discard confirmation open and preserved the exact description. Forced unexpected `dialog.close()` safely reopened; deliberate discard and empty close stayed closed. QA's `recovery.json` records all four close-path outcomes as true, and refreshed `evidence.json` records the functional, focus, disclosure-before-recording and layout results. This resolves the previous Escape finding. The lead accepted final source after independent Security review. Designer accepts the actual browser implementation against the handoff, using the eleven independently reviewed images plus independent QA's corrected interaction evidence.

This acceptance is bounded to the local-data Docker browser build and synthetic state checks. It does not validate a physical Android keyboard, rotation/safe areas, native lifecycle/process termination, TalkBack, actual email-app draft/recipient delivery or completed sending. Opening or copying a report remains a handoff, never a delivery claim. Physical follow-ups remain open; no additional source or UI changes were made for this acceptance update.

Designer final review created no task-owned server or container. Routine owns cleanup of both retained localhost app/studio previews. No source edits were made during final review.
