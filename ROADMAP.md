# Smart Paper Roadmap

This file is the source for future-work priority. Shipped behavior belongs in [feature.md](feature.md); implementation history and evidence stay in the linked task and release records. This roadmap does not imply deadlines or close physical-device follow-ups.

<a id="current-goal-confidence-in-the-shipped-android-app"></a>

## Now

Focus on a useful, reliable Android app that works without internet. Prioritize observed issues affecting local data, task completion and bilingual phone use. Continue stable-signed APK publication after validated user-visible changes. No server is available; Django/backend and hosted-web work remain paused. Keep Timer available by default; the optional/hidden proposal was cancelled in [the task record](tasks/2026-10-07-timer-optional-default-hidden.md).

The requested [empty-day reminder correction](tasks/2026-10-14-empty-day-notification.md) shipped in Android 2026.10.26/code43 after accepted Product/Designer scope, implementation, exact-source CI, protected signing and independent final artifact review. The wider native notification review and physical delivery evidence remain in the queue below.

The maintainer-requested project-home cleanup, frontend hygiene review, [spreadsheet-writer upgrade](tasks/2026-10-12-spreadsheet-writer-upgrade.md), [framework/build refresh](tasks/2026-10-12-framework-refresh.md), [Finance visibility](tasks/2026-10-07-finance-optional-default-hidden.md), [Planner AI report shortcut](tasks/2026-10-07-planner-ai-review-shortcut.md), [Finance PIN change](tasks/2026-10-09-finance-change-pin.md), [local reporting/diagnostics](tasks/2026-10-07-local-feedback-diagnostics.md), [desktop backlog batch](tasks/2026-10-13-desktop-backlog-batch.md), and [Export unlock locale correction](tasks/2026-10-14-export-unlock-locale.md) are complete. Android 2026.10.26 is now published after exact-source CI, protected signing, independent artifact review and anonymous APK byte verification. Idea Space direct origin/branch reading shipped under the [ready bilingual Designer handoff](design/2026-10-13-ideas-relationships.md). Keep observed physical-device evidence open until completed.

Open Android evidence remains follow-up work, not blanket release gates:

- Execute the [data-safety phone matrix](tasks/2026-10-08-data-safety-phone-matrix.md) on a spare device, including upgrade, backup/restore and interruption cases. Keep the broader [data-safety task](tasks/2026-10-08-android-data-safety-validation.md) open until observed results are recorded.
- Check English/Persian layout, notifications, templates, Timer suspension, Idea Space editing/backup/upgrade, sharing/recipient delivery, launcher rendering, native accessibility and TalkBack on a phone where applicable. See linked completed task/release records and the [notification review](tasks/2026-10-08-android-notification-review.md); do not mark device behavior verified without observation.

<a id="next-after-baseline-review"></a>

## Next — ordered remaining work

Work sequentially: finish and document one selected task before starting the next. The ready implementation queue is complete; do not create speculative features to fill it.

1. [Android data-safety validation](tasks/2026-10-08-android-data-safety-validation.md), using the [phone matrix](tasks/2026-10-08-data-safety-phone-matrix.md). Establish a working spare-device connection first; Samsung A15/Android 16 pairing was unsuccessful and no native cases have run.
2. [Accessibility/Persian phone review](tasks/2026-10-08-accessibility-persian-phone-review.md), after data-safety execution.
3. [Notification review](tasks/2026-10-08-android-notification-review.md), after accessibility. Product/Designer scope improvements from observed evidence before implementation.

These tasks retain physical-device dependencies; desktop evidence cannot close them. Any reproduced issue follows the normal design, test, review and release workflow.

## Later

- Full baseline studio/app fidelity comparison remains deferred in the [coverage task](tasks/2026-10-01-full-app-design-coverage.md); structural stories are reference drafts. Per-change ready Designer handoffs remain required.

- [Periodic team reviews](tasks/2026-10-08-periodic-team-reviews.md) have an adopted manual policy in [docs/periodic-reviews.md](docs/periodic-reviews.md); the [first baseline](tasks/2026-10-13-manual-baseline-checkpoint.md) is recorded; next manual cue is five app-change batches or 30 active app-work days, or a concrete risk trigger. Device connection preparation remains pending for the available Samsung A15 (Android 16).
- Validate week-template usage after release and consider daily/section-level defaults only if observed use supports them.
- Improve configurable-section UX only when actual use shows a problem; review active slots, hidden slots with saved data, and optional separate English/Persian labels.
- Extend the new browser integration coverage where observed risks support it; native behavior remains a separate phone check.

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
