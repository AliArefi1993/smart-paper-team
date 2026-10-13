# First manual checkpoint QA evidence

Date: 2026-10-13. Frontend source: `b5d0b6ddbb1807d3783a90bd119c37b00bb64029`, clean before execution. QA changed no application files. This is a bounded sample, not whole-app or native certification.

Environment: macOS host, Docker `node:24-bookworm`, Next local-data development server, Codex in-app desktop browser default 1280×720 viewport at `http://localhost:3191`. Disposable fresh-origin synthetic records only. No backend used. Local-data operation was exercised; network disconnection was not simulated. Production APK performance is not inferred from the dev server.

| Selected scenario | Result | Executed evidence |
| --- | --- | --- |
| Planner weekly goal/note and Saturday note → Ideas → Planner | Pass, browser | Filled `Checkpoint EN goal هدف`, `QA synthetic weekly note یادداشت`, `Saturday synthetic روز شنبه`, then immediately navigated. Returned fields retained goal/day text and displayed saved status. |
| Unfinished Idea → Planner → Persian Ideas → publish | Pass for persistence, browser | `Checkpoint idea متن آزمایشی` returned as a draft, no saved card before deliberate publish; publish produced exactly one visible card. |
| Persian draft recovery explanation | Fail, browser, low severity | Persian UI displayed English recovery status; see reproduction below. Writing itself remained intact. |
| JSON backup includes cross-route records | Pass, browser + file inspection | Unlocked synthetic Export with default PIN, exported JSON. Parsed schema 5 backup contained one week, one Idea, exact bilingual goal and Idea body. |
| JSON Merge/Replace through file-input UI | Unexecuted | After changing goal to `Changed after backup`, attempted documented file-chooser interaction. In-app browser filechooser event timed out after 10 seconds and reset tool session before file selection/import. This is an environment limitation, not a reproduced import defect. |
| JSON Merge/Replace, invalid input, interrupted writes | Pass, isolated Node storage tests | Focused suite validates merge preservation, replace removal, serialized Persian schedule/template/section/Idea recovery, invalid-input rejection and rollback. Does not prove React/file-picker wiring. |
| Finance CRUD/session denial; timer deadline/pause; autosave failure/retry | Pass, isolated Node tests | Included focused source/runtime-mock suites; no browser Finance CRUD/timer or native lifecycle claim. |
| Baseline/larger fixture three-run performance comparison | Deferred | Not attempted within bounded checkpoint. No timings or trend claimed. |
| Actual Android install/upgrade, offline cold start, file chooser, lifecycle, keyboard/rotation, TalkBack | Unexecuted | Requires available device and separately recorded OS/APK evidence. |

## Reproduced finding

Affected area: Idea Space draft-recovery status localization. Severity: low; Persian users receive the explanation distinguishing draft from saved writing in English. No data loss was observed.

Steps: open Ideas in English on a fresh local origin; type a disposable unfinished thought; select Persian; reload `/ideas`. Also reproduced by leaving an English unfinished draft, selecting Persian on Planner, then entering Ideas.

Expected: recovered draft and Persian explanation `پیش‌نویس تازه بازیابی شد. هنوز فکر ذخیره‌شده نیست.`

Actual: text is recovered, Persian heading/control labels are selected, but status reads `New draft restored. It is not a saved thought yet.` Desktop screenshot and DOM snapshot confirmed this after reload. It is not merely a language switch with an already visible status.

Source: [idea-space.tsx](../../../smart-paper-front/src/components/idea-space.tsx), particularly `loadWriting` lines 65–80 and mount effect lines 87–95. Persian translation already exists at line 80. Language initialization/mount-time message selection is a plausible cause, not a proven diagnosis. Follow-up should preserve unfinished writing and test Persian cold entry/reload plus language switching; Designer handoff is required before a user-facing fix.

## Commands and trace

From `smart-paper-front`, executed:

```sh
docker run --rm -v "$PWD":/app -w /app node:24-bookworm node --test tests/local-store-import.test.mjs tests/local-import-safety.test.mjs tests/local-schedule.test.mjs tests/local-week-template-records.test.mjs tests/local-finance-records.test.mjs tests/local-planner-sections.test.mjs tests/idea-notes.test.mjs tests/idea-draft.test.mjs tests/focus-timer.test.mjs tests/planner-local-autosave.test.mjs
```

Result: 55 tests, 55 pass, 0 fail, 0 skipped; 1265.912167 ms. Module-type warnings only. No full build, lint repetition, audit or dependency installation requested by this checkpoint.

Synthetic download retained outside repo: `/Users/aliarefi/Downloads/smart-paper-backup-2026-10-13T19-00-41-382Z.json`. Python JSON inspection verified schema/counts/body; no private records were accessed.

Task-owned server inventory sent to lead for routine closeout: container `smart-paper-checkpoint-qa`, tool session `68562`, Docker Node24 `npm run dev -- --hostname 0.0.0.0`, frontend cwd, bind `127.0.0.1:3191` → container `3000`. Browser consumer finished. Existing unrelated `redis-local` and `finance-local` containers were untouched.
