# Android backup policy QA

Date: 2026-10-10. Status: bounded browser acceptance passed; packaged/device evidence separate.

Scope: [task](../tasks/2026-10-10-android-backup-policy.md), [policy](../docs/android-backup-policy.md), [ready bilingual handoff](2026-10-10-android-backup-policy.md). Synthetic data on a task preview origin only. No installed app data collection, user app reset, or real personal records.

## Acceptance and targeted browser matrix

Run against the lead-provided local-data production preview. Record source revision, URL, browser, viewport, language/theme and actual result. A reload creates a new document runtime; use in-app links for the ordinary-navigation case. Do not interpret navigation by typed URL as an in-app navigation test.

| Case | Exact steps | Expected behavior | Result |
| --- | --- | --- | --- |
| Fresh runtime | Open Finance in a fresh task origin with no unlock; enter wrong PIN, then the preview's configured synthetic PIN. | Initially locked; wrong PIN exposes no records/actions; correct PIN opens Finance. | Passed: wrong `0000`, correct public preview PIN `1234`. |
| Migrated legacy deadline | On the task origin, set `smart-paper.local.finance-unlocked-until` to a future numeric timestamp; reload Finance, then Export. Also try a malformed value. | Neither value authorizes a new runtime. Finance and protected backup/import remain locked. | Browser injection not run: documented evaluate API is read-only. Dedicated runtime-unlock automated coverage reported separately by lead. |
| Record retention/restart | Create synthetic goal/income, save a planner note and idea. Record these task-owned records; reload Finance; unlock again. | Restart locks Finance without deleting/changing saved records; all four synthetic records remain. | Bounded Finance record passed: amount `7654`, note `QA backup synthetic 20261010`. Planner/Ideas/goal creation not run; unchanged broader retention remains follow-up. |
| Navigation continuity | Unlock Finance; follow in-app links to Planner, Export, Finance without reload. | Existing valid one-hour runtime unlock survives client navigation; protected export is available. | Passed: actual Next links Finance → Export → Finance; Export showed one income and `7,654` without PIN re-entry. |
| Export restart protection | Unlock and view populated Export; reload. Unlock again. | Reload replaces protected export controls/data with PIN gate; correct PIN restores access to existing data. | Passed: Finance reload relocked, re-unlock preserved income; Export reload restored PIN gate. |
| JSON recovery regression | Export synthetic backup after unlock; inspect schema and synthetic records; import that fixture via Merge on task origin. Exercise Replace cancel only unless using a separate disposable origin. | JSON remains readable and complete; Merge preserves unrelated synthetic records/templates; Replace cancel leaves data unchanged. | Not run |
| EN disclosure | At 390×844 light and 740×360 dark, open locked Export, unlock, and inspect full header. Inspect locked Finance. | Exact handoff recovery paragraph follows unencrypted warning and precedes report/PIN; visible in locked/unlocked states. Finance preserves no-encryption sentence plus restart/device-transfer hint. No clipping or horizontal overflow; controls reachable by scrolling. | Passed: EN light 390×844 and dark 740×360 full-page screenshots inspected; Finance EN text matched handoff. |
| FA disclosure | Repeat preceding layout case using visible Persian toggle; confirm document language and RTL reading order. | Exact Persian copy including readable JSON wraps completely; existing PIN labels/focus and controls preserved. | Passed: FA light 390×844 and dark 740×360 full-page screenshots inspected; document `lang=fa`, main `dir=rtl`, width/scrollWidth 390; Finance FA text matched handoff. Focus traversal not run. |
| Placement regression | Visit Settings and Finance; inspect Export PIN header. | Recovery paragraph appears only in local Export; Finance uses existing `localPinNotice`; Export has no duplicated Finance notice; Settings has no new recovery panel. | Not run |

Expiry/resume, protected store reads/mutations/export/import and fresh module initialization need focused automated coverage. Browser clock manipulation can be unreliable; do not claim expiry passing solely from source or a hidden-tab check. Existing automated test owners should report concrete commands/results for `tests/finance-session.test.mjs` and local import suites. A Django preview is optional for checking local-only conditional copy; absent runtime evidence, report that boundary as source inspection only.

## Packaged Android matrix and device follow-up

Static APK reviewer verifies compiled manifest `allowBackup=true`, both XML references, no overriding backup agent, nine domains in base/v28/modern resources, API 24–27 exclusions, API 28–30 device-transfer-required includes, and API 31+ separate full cloud exclusions/device-transfer includes. Packaged web assets must reject persisted authorization. Browser QA cannot establish these packaged settings.

Actual cloud/D2D behavior remains untested until synthetic device evidence is recorded. Disposable API 24/27, 28/30, 31 and 36 environments should cover cloud recovery exclusion; legacy transfer exclusion; supported transfer retaining records but requiring a fresh PIN; same-signer upgrade retention; manual JSON recovery; native lifecycle/expiry and TalkBack. Record Android/OEM/WebView/app versions and transport. Real two-device migration and framework simulations are separate evidence. Conditional copy must not promise OEM migration or deletion of old cloud snapshots.

## Environment options and ownership

- Preferred browser surface: Codex in-app browser on the lead-provided local-data preview. Prior task evidence used `http://localhost:3100`; availability/source for this task are unconfirmed. Lead owns startup/cleanup. Do not reuse a user-data origin.
- Design reference: built Storybook at `http://localhost:6010` with LockedPhone/UnlockedPhone/DarkPhone/Wide/DarkWide; the ready handoff records Designer's checks. These prototypes do not certify application behavior.
- Frontend validation is Docker per frontend `AGENTS.md`; this QA agent's initial read-only `docker ps` failed because the sandbox cannot access the Docker socket. No server/container started. Lead can provide a preview using its authorized validation environment.
- Browser viewport and origin storage can be shared across agent tabs. Coordinate sequential ownership with Designer; reset viewport and close task tabs after checks. Avoid mutating shared/user origins.

## Evidence and conclusion

Production local-data build served at task-isolated `http://127.0.0.1:8014`; baseline frontend `deaad89` plus task working-tree changes. Lead reported Docker lint, TypeScript, 70 tests and production build passed; QA did not independently rerun them. Browser: Codex in-app browser. DOM snapshots and full-page screenshots inspected in-tool; no screenshot files retained by this QA agent.

Independent bounded browser acceptance passed for wrong/correct PIN, actual client navigation sharing the memory unlock, full document reload requiring PIN again, saved synthetic income retention, bilingual disclosure and existing report authorization. Selecting income inclusion while locked displayed the unlock link and disabled report actions; after FA Finance unlock and Next navigation, selecting income inclusion showed one income and enabled report actions. No copy duplication or visible clipping in inspected Export states. New policy paragraph remains separate from unencrypted warning and before report/unlock.

Preview-only obstacle: initial Python static handler redirected `/finance` to the Next payload directory. Lead corrected HTML precedence; an existing cached redirect required `/finance?qa=restart` to obtain a full Finance document. Subsequent full reload on that URL definitively returned the PIN gate. This was a preview routing issue, not an app defect. Initial pre-hydration English/loading snapshots after reload were discarded; the settled Persian state confirmed the Export PIN gate.

JSON chooser/import workflows, extra Planner/Ideas creation, expiry timing, Django conditional-copy runtime, Settings runtime, installed APK, actual cloud/D2D, native lifecycle and TalkBack were not tested by this agent. These stay separate automated/static/device evidence or follow-ups; no such passes claimed.

QA started no server/container. Lead-owned preview: Python `/private/tmp/smart-paper-backup-preview.py`, frontend `out` working directory, port 8014, active tool session `55252` (old `35652` stopped). QA viewport reset and temporary tab closed; lead/routine owns verified preview cleanup. Synthetic task-origin income remains for disposable QA evidence only.
