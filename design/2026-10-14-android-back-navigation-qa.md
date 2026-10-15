# QA: Android system Back

Status: bounded source/browser acceptance passed; physical Android checks unexecuted
Updated: 2026-10-14

Scope: [task acceptance](../tasks/2026-10-14-android-back-navigation.md), [ready interaction handoff](2026-10-14-android-back-navigation.md), and the frontend working change based on `aa33f7942364185b5421fbdc65ed5944f539eda2`. No backend change. QA owns the new [browser regression asset](../smart-paper-front/tests/browser/android-back.spec.cjs); engineer executed it against the shared local-data production build. No application edits by QA.

## Evidence

- Docker Node 24: lint, TypeScript, 178 unit tests and local-data production build passed. Five focused history tests cover owned route depth, reload/query/hash, unknown/external destinations and cleanup/reinstallation.
- Installed Chrome `155.0.8059.79`, Playwright `1.58.2`, isolated synthetic EN/FA storage fixtures, fixed date and shared Docker preview at `127.0.0.1:3192`. Preferred Playwright Docker image pull stalled; engineer stopped the verified task-owned pull and used the documented installed-Chrome fallback.
- Full browser suite: **28 passed, 2 failed from an impossible QA fixture expectation**. Local Planner blocks week switching immediately on autosave failure; the pending-week decision belongs to manual-save mode. After correcting those expectations, the two EN/FA failed-save cases passed independently (4.8s / 4.2s). Combined evidence covers all **18 new Back cases and 12 existing regressions**. This was not one wholly green local run; exact-commit CI must rerun the final complete suite.
- Earlier test-only selector corrections used actual Settings → Summaries links, Settings diagnostics entry, the production `+ Add Event` label, and the first of duplicated Retry controls. No production defect or application fix resulted from these test failures.

## Workflow outcomes

| Steps / affected area | Expected | Observed |
| --- | --- | --- |
| EN/FA Planner → Settings → Summaries → reload → successive Back | Return through Settings and Planner once; unguarded root returns exit permission | Passed; no route loop |
| Direct Export entry with earlier browser history → Back | Planner fallback, then root exit; ignore unrelated history length | Passed |
| Export `reportWeek` query entry → repeated Back; two callbacks before route commit | Query history unwinds; pending route transition is consumed once | Passed. Query entry is synthetic `history.pushState`, not a full export report selection workflow |
| EN/FA Idea collection → parent → child → Back twice, with unpublished writing | Child → parent → collection; draft unchanged; no published record | Passed; route stays Ideas while reader consumes events; saved count unchanged |
| EN/FA dirty Settings → decline Back → accept Back | Decline preserves current route/choice; accept leaves without saving | Passed; persisted setting unchanged |
| EN/FA PIN save held at async lock → Back | Stay in Settings with input retained during pending operation | Passed using a controlled pending/rejected lock; credential unchanged. Actual PIN crypto latency was not simulated |
| EN/FA report description → Back → Back → keep writing; deliberate copy held pending → Back | Discard decision consumes repeated Back; description retained; busy copy blocks departure | Passed using controlled clipboard completion; explicit discard then closes report without changing Settings route |
| EN/FA Planner storage write failure → Back → previous week | Root exit and week departure blocked; visible text and Retry retained; no success write | Passed after fixture correction; persisted fixture unchanged |
| EN/FA section writing → Back; template edit → Back; event edit → Back | Close existing surfaces; writing persists; writing/template trigger focus restored; unapplied event canceled | Passed; no route change; event storage unchanged |
| Web Planner → Settings → Summaries → browser Back | Ordinary browser navigation; Android callback absent | Passed |
| Existing autosave, Idea recovery, section visibility, import/export and template focus flows | No regression in existing deliberate actions/data recovery | All 12 existing browser regressions passed |

## Limits and follow-ups

Browser tests activate Capacitor's Android detection and call the real `window.smartPaperAndroidBack` coordinator. They establish rendered routing, surface and guard behavior after callback delivery. They do **not** establish the Android Activity's actual dispatch ordering or certify an installed APK.

Physical Samsung/Android Back button and predictive gestures, IME dismissal without a second app action, OS confirmation/chooser cancellation, lifecycle/upgrade behavior and TalkBack remain **unexecuted**. Native source has IME precedence, throttling and lifecycle checks; hosted exact-SHA compilation and artifact review remain separate gates. Finance session expiry and Timer deadline recovery rely on existing unchanged contracts/regressions, not a new native lifecycle observation. The manual-mode pending-week decision is source-reviewed only; local-data failed-save navigation is browser-verified.

No unresolved high/critical QA finding was established within this bounded coverage. Acceptance is source/browser-qualified; native acceptance must remain explicitly open.

QA started no background process. Engineer browser runners are finished. Shared preview `smart-paper-back-preview` (Docker, port 3192, tool session 75937) is no longer needed; assigned routine owner `back_closeout` owns its verified cleanup.
