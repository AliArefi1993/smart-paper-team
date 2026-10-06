# QA: Android save controls and Planner automatic persistence

Status: bounded source/helper/runtime verification passed; native and browser fault-injection follow-ups recorded
Updated: 2026-10-06

Scope: implemented Android/local-data Planner persistence. [Product decisions](2026-10-06-save-controls-product.md) distinguish routine saving from deliberate creation/apply actions across all seven routes. Designer reviewed the seven-route baseline; independent QA compared the implemented Planner with the ready handoff. Runtime QA used disposable origin `http://127.0.0.1:3011/` only; existing port-3010 data and user records were untouched.

## Risk-led acceptance matrix

| Area | Exact scenario | Expected behavior | Evidence/result |
| --- | --- | --- | --- |
| Ordinary writing | Type distinct weekly goal/note, day note, section goal/note and minutes; reload | Latest committed values persist; local UI has no routine Save Week; accurate saved status | Passed browser: weekly goal/note and Tuesday note reload; section45 minutes, goal/note and full-writing read back in Summaries |
| Rapid edits | Type revision A, then B before prior save completes | B survives; stale A cannot replace B or advertise B saved | Passed browser A→B immediate reload; helper latest-write test passes |
| Week identity | Edit week A then immediately choose B, edit B, return to A | Each edit stays with its original start date; no stale response changes current week/status | Passed browser distinct current/next week goals; helper rejects stale identity |
| Immediate route departure | Type then immediately open Summaries or Export before debounce | Latest committed week data persists and downstream reads agree | Passed immediate latest note→Summaries; Export/backup readback not executed |
| Unload and background | Type then reload/pagehide or background; reopen | Latest committed text saved through synchronous local write; actual Android kill/background remains device follow-up | Passed immediate browser reload; source has synchronous event-handler persistence. Native suspension/kill pending |
| Storage failure | Inject quota/security failure on disposable origin, edit, attempt departure, recover storage and Retry | Text retained, visible failure, no false Saved, departure cannot silently discard; Retry writes latest values | Independent Docker helper passes injected quota/security, latest retention, no retry loop and explicit Retry; source navigation guard inspected. Browser fault UI not injected |
| Schedule draft | Blank title/invalid time, cancel, then add valid entry; edit/delete | Invalid and canceled intermediate values are never committed; Add/Update validates and resulting week change persists | Browser blank title rejected, canceled draft absent, Add event committed, edit Apply changes label correct. Native time-input injection did not change value; invalid-time/delete source reviewed only |
| Templates | Create named template, cancel apply, confirm apply and delete | Deliberate commands stay explicit; accepted week replacement persists | Browser named template Create passes. Apply confirm caused browser CDP stall; cancel/confirm/delete not runtime accepted. Source explicit validation/confirmation and autosaved apply inspected |
| Notifications | Ordinary writing with notification opt-in/off; schedule commit | No per-keystroke permission prompts; coalesced scheduling cannot interfere with storage; rejected native work handled | Source serialization/coalescing1200ms, permission=false for Planner and caught errors verified; native scheduling pending |
| Manual backend mode | Review mode branches; edit without pressing Save | Existing manual Save, dirty switch and navigation safeguards remain; no automatic-mode copy | Source mode branches verified; backend runtime not claimed |
| EN/FA Android layout | Phone LTR/RTL, dark/light, full writing, saving/error/retry | Status stays visible and truthful, Retry touch target accessible, Next Day is navigation, no keyboard obstruction | EN390 light, FA390 dark, EN1280 light and FA1280 dark runtime screenshots compared; full-writing status/copy confirmed. Storage-error UI, soft keyboard and TalkBack pending |
| Other routes | Ideas, Timer, Finance, Settings, Export/import, Summaries | Existing deliberate creation/apply/share/restore actions retain semantics; read-only pages add no Save | Product source matrix and Designer all-route baseline reviewed; other route components unchanged. Summaries actual latest readback passed |

## Baseline source findings

- `saveLocalWeek` writes local storage synchronously inside an async adapter. Flush must use the latest committed week and its original `start_date`, rather than a stale render closure.
- Existing `saveWeek` checks edit revision but not active week identity. Added automatic saves need both identity and revision protection.
- Schedule modal fields are separate staged state. Its commit validates title/time before mutating the week; this boundary should remain.
- `syncMorningPlanNotification` cancels and reschedules the same native notification and can request permission. Calling it for every keystroke is inappropriate; storage success must remain independent from native scheduling failure.

## Verification boundary

Independent Docker command `node --test tests/planner-local-autosave.test.mjs` passed3/3 against final source. Frontend `git diff --check` passed. Root/worker own full lint/types/build/test and signed-package evidence. No unresolved critical/high QA finding remains in bounded coverage.

One QA copy finding was fixed before final build: full-writing still instructed local users to Save the week after that button was removed. The implementation now uses automatic-on-device copy in local mode and keeps the manual hint in backend mode. Final runtime verified the fix.

Final build preview briefly became unreachable because rebuilding removed the static server's old directory inode. Root restarted the helper with an absolute serving directory; a fresh final-build tab confirmed data survived. This was a preview infrastructure issue, not an app defect.

The browser's documented evaluation API is read-only, so no storage monkeypatch or user-data quota fill was attempted. Fault UI is covered by source and independently executed helper faults, not by actual WebView/browser failure reproduction. Template confirmation stalled the browser automation after opening; no success is claimed for those unexecuted steps.

Physical Android keyboard/background/process-kill behavior, native notifications and TalkBack remain release follow-ups. A failed write lives in module memory through SPA navigation; reload/native process kill during storage failure cannot promise recovery. Browser/source/helper evidence cannot establish native behavior.
