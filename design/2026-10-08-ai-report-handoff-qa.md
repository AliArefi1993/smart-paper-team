# QA: AI report handoff

Updated: 2026-10-08
Result: bounded interaction and production appearance acceptance passed
Reference: [ready design](2026-10-08-ai-report-handoff-design.md), [Product](2026-10-08-ai-report-handoff-product.md), [task](../tasks/2026-10-07-ai-report-chatgpt-handoff.md)

## Environment and fixtures

Actual frontend local-data development build at `http://localhost:3028/export`, parent-owned Docker container `smart-paper-ai-handoff-preview`, parent session 7684, frontend cwd. Native macOS Chrome Guest via CUA; no IAB enabled. Used a new Guest session with a synthetic weekly goal created through normal Planner autosave: `QA synthetic goal A — review report handoff. هدف آزمایشی`, then a bounded DevTools storage mutation to `QA synthetic goal B`. Frontend base revision `036d2c5` plus the task-owned working changes was under test. Only synthetic local data were used. No recipient app, external share destination or ChatGPT message was opened/sent.

## Executed checks

| Check | Evidence | Result |
| --- | --- | --- |
| Actual copy and exact reviewed content | Clicked Copy report text; received copied status. Pasted OS clipboard into a temporary local textarea, then compared its value with the report textarea using a typed DevTools assertion: `QA_CLIPBOARD_EXACT true`. Removed temporary field. | Pass |
| Manual report selection | Clicked Select text manually; disclosure opened, report textarea focused and entire content selected. Accessible Report text label and Select report action present. | Pass |
| Changed source | After opening preview A, changed stored synthetic goal to B without reloading. Clipboard spy recorded zero writes on first Copy; preview B and review-again message appeared. Second Copy recorded one write exactly equal to updated textarea, containing B: `QA_SECOND_CLICK 1 true true`. | Pass |
| Clipboard denied | Replaced clipboard write in this disposable page with a throwing `NotAllowedError`; Copy showed localized automatic-copy failure and focused selectable report text. No success message or automatic copy fallback. | Pass, injected browser failure |
| Share cancellation | Stubbed browser canShare=true and share throwing `AbortError`; Share showed cancellation wording and retained report/options. No receiving app was called. | Pass, browser injection; native cancellation unexecuted |
| Finance initial gate | Selected Current finance goal while locked: all three handoff actions disabled with unlock link. Finance fields start off; Income notes disabled unless income entries selected. | Pass |
| Finance expiry at transfer | Unlocked synthetic finance with default test PIN, selected finance, then set local unlock deadline to expired. Copy produced zero clipboard writes and removed report textarea: `QA_EXPIRED_WRITES 0 FINANCE_TEXT_VISIBLE false`. Unlock reason visible. | Pass, injected local expiry |
| Invalid range | Synthetic native-input setter plus input/change events set From 2030-01-01, To 2020-01-01. Localized invalid-range reason and all handoff actions disabled. | Pass, DOM input-event injection |
| Empty selected range | Set To 2030-01-02 against From 2030-01-01. Localized no matching data displayed; actions remained disabled. | Pass, DOM input-event injection |
| Selections after operations | Copy, manual, source-refresh and cancellation retained weekly-goals/section-activity and finance-off choices; all-date scope remained intact until explicit range test. | Pass for tested choices; a nonempty range surviving transfer was not independently checked |
| Actual EN/FA layout | Actual wide screenshots inspected in English/Persian. Chrome responsive toolbar committed width 390; Persian phone guidance wrapped and three action labels wrapped into reachable rows without horizontal truncation. Open report uses bounded textarea and visible focus. | Pass for observed light surfaces |
| External navigation | No Open ChatGPT action present; copy/share/manual instructions match ready handoff. | Pass |

The direct navigator.clipboard.readText diagnostic failed because DevTools held focus; this was a diagnostic limitation, not a failed app Copy action. Chrome blocked pasting raw Markdown into its Console; no warning bypass was used. The successful exact comparison instead used normal OS paste into a temporary local textarea and a typed equality assertion. All clipboard and share stubs existed only in this disposable page and disappeared on reload/Guest close.

## Appearance discrepancy and limits

With Dark selected, html had `sp-dark`, but the development runtime still rendered light Export surfaces after reload. Typed computed-style check returned root `--surface: #fff`, report section `rgb(255, 255, 255)`, and main class `sp-page`. Current unchanged globals source defines dark surface `#1b2b29` and targets `.sp-page` white surfaces, so the served dev CSS does not match the expected source theme contract. This was not attributed to the report patch. Parent inspected generated assets: dev CSS has zero `html.sp-dark` selectors/no dark surface value, whereas existing production CSS has 26 selectors and the expected dark value. This supports stale dev CSS as the cause. Final production export comparison below resolved this discrepancy; dark styling passed in the release export.

Source/automated evidence is owned by the lead (Docker lint/TypeScript/all 57 tests reported passed); this Designer pass did not rerun those checks. The bounded production dark/light EN/FA confirmation below passed. Physical Android clipboard permission/paste, OS chooser cancel/return/recipient acceptance, native cache-file handling and TalkBack remain unexecuted. Browser chooser return, file download and generic failure classifications were reviewed in source/studio rather than exercised against actual destinations/downloads. Changed-source Share and expired-finance Select/Share use the shared transfer path but were not each independently fault-injected here. Long report limits in ChatGPT are unverified.

## Cleanup and acceptance

No new server/container/process was started by Designer. Parent preview remains running for production comparison/lead cleanup; Designer must not stop it. Task-owned Guest window was closed (CUA subsequently reported no available window), discarding synthetic local records and browser-only overrides. No production files edited by Designer; QA record only. No critical/high interaction finding remains from executed cases. Final production comparison resolved the appearance discrepancy. Designer accepts the implemented handoff for the bounded desktop/responsive scope; native follow-ups remain explicit.


## Final production export comparison

The final release `out/` generated by the same Android 2026.10.8 build was served by the parent at `http://localhost:3038/export` (localhost-only static Python server with HTML fallback, parent session 67611, frontend cwd). Fresh Chrome Guest, synthetic Planner goal created via autosave: `Final QA synthetic goal — هدف آزمایشی برای بررسی گزارش و خوانایی متن طولانی`.

- Actual production English wide screenshots inspected in Light and Dark. Labeled read-only Report text, open disclosure and deliberate manual selection matched the handoff.
- Actual production 390px Persian phone screenshots inspected in Light and Dark. The long hint wraps without truncation; Copy, Share and manual selection form readable rows. No new Open ChatGPT link is present.
- Typed DevTools computed-style assertion: `FINAL_DARK #1b2b29 rgb(27, 43, 41) 390` (root surface, report section surface, viewport width). The production export applies the expected dark palette, unlike the stale development CSS.
- No clipboard/fault matrix was repeated; prior executed interaction evidence remains above. No external transfer occurred.
- Guest window closed after the pass; CUA reported no available window. No Designer-owned server/container was started. Parent session 67611/3038 remained untouched and its consumer is done; routine may stop it.

Designer acceptance: **passed** for implemented handoff, tested content-safety interactions and bounded production visual comparison. No unresolved critical/high Designer finding. Physical Android clipboard/chooser/ChatGPT/TalkBack and recipient text/file limits remain unverified.
