# Smart Paper Roadmap

This file is the source for future-work priority. Shipped behavior belongs in [feature.md](feature.md); implementation history and evidence stay in the linked task and release records. This roadmap does not imply deadlines or close physical-device follow-ups.

<a id="current-goal-confidence-in-the-shipped-android-app"></a>

## Now

Focus on a useful, reliable Android app that works without internet. Prioritize observed issues affecting local data, task completion and bilingual phone use. Continue stable-signed APK publication after validated user-visible changes. No server is available; Django/backend and hosted-web work remain paused. Keep Timer available by default; the optional/hidden proposal was cancelled in [the task record](tasks/2026-10-07-timer-optional-default-hidden.md).

The maintainer-requested project-home cleanup, frontend hygiene review, [spreadsheet-writer upgrade](tasks/2026-10-12-spreadsheet-writer-upgrade.md), [framework/build refresh](tasks/2026-10-12-framework-refresh.md), [Finance visibility](tasks/2026-10-07-finance-optional-default-hidden.md), [Planner AI report shortcut](tasks/2026-10-07-planner-ai-review-shortcut.md), [Finance PIN change](tasks/2026-10-09-finance-change-pin.md), and [local reporting/diagnostics](tasks/2026-10-07-local-feedback-diagnostics.md) are complete. Android 2026.10.23 is published and its anonymous APK bytes match the independently accepted artifact. Idea Space direct origin/branch reading shipped under the [ready bilingual Designer handoff](design/2026-10-13-ideas-relationships.md). Keep observed physical-device evidence open until completed.

Open Android evidence remains follow-up work, not blanket release gates:

- Execute the [data-safety phone matrix](tasks/2026-10-08-data-safety-phone-matrix.md) on a spare device, including upgrade, backup/restore and interruption cases. Keep the broader [data-safety task](tasks/2026-10-08-android-data-safety-validation.md) open until observed results are recorded.
- Check English/Persian layout, notifications, templates, Timer suspension, Idea Space editing/backup/upgrade, sharing/recipient delivery, launcher rendering, native accessibility and TalkBack on a phone where applicable. See linked completed task/release records and the [notification review](tasks/2026-10-08-android-notification-review.md); do not mark device behavior verified without observation.

<a id="next-after-baseline-review"></a>

## Next — ordered ready work

1. Review the reproduced Persian Idea Space draft-recovery status issue from the [first baseline checkpoint](tasks/2026-10-13-manual-baseline-checkpoint.md) with Designer before a bounded fix. Draft data remained intact; Product/Designer acceptance is pending.
2. Execute physical-device evidence when a spare device is available, including the [data-safety matrix](tasks/2026-10-08-data-safety-phone-matrix.md). Future user-visible work requires Product and Designer review. Candidates include [accessibility/Persian review](tasks/2026-10-08-accessibility-persian-phone-review.md), and evidence-based improvements in the [notification review](tasks/2026-10-08-android-notification-review.md). No order is set among these candidates.

## Later

- [Periodic team reviews](tasks/2026-10-08-periodic-team-reviews.md) have an adopted manual policy in [docs/periodic-reviews.md](docs/periodic-reviews.md); the [first baseline](tasks/2026-10-13-manual-baseline-checkpoint.md) is recorded; next manual cue is five app-change batches or 30 active app-work days, or a concrete risk trigger. Device connection preparation remains pending for the available Samsung A15 (Android 16).
- Validate week-template usage after release and consider daily/section-level defaults only if observed use supports them.
- Improve configurable-section UX only when actual use shows a problem; review active slots, hidden slots with saved data, and optional separate English/Persian labels.
- Add frontend integration coverage for primary user flows and configurable-section wiring where risk review supports it; current storage checks do not establish browser or native behavior.

## Ideas — needs confirmation

- Multi-user accounts and per-user data separation if Smart Paper stops being a single-user personal app.
- Charts/trends for planner or finance progress.
- Recurring timed events, calendar import/export, or per-event reminder alarms.
- Structured API errors for frontend display, if backend mode is resumed.

## Paused — backend or hosted web

Resume only when a server-backed use case is explicitly chosen. No server is currently available.

- Prepare deployment settings for secrets, debug/hosts, CSRF/CORS and database configuration.
- Add backend CI, health checks, logging, rollback documentation, linting, formatting and type-checking.
- Resume backend/local-data parity, import/export regression coverage, and any trusted-proxy or account-based throttling decisions.

## Maintenance

At task/release closeout, update only the status, priority, dependency and links affected by changed facts. Keep shipped capability descriptions in `feature.md`, task evidence in task records and release verification in release records. Preserve open device gaps until observed evidence closes them; avoid duplicating completed history here.
