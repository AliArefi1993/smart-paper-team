# Smart Paper Roadmap

This file is the source for future-work priority. Shipped behavior belongs in [feature.md](feature.md); implementation history and evidence stay in the linked task and release records. This roadmap does not imply deadlines or close physical-device follow-ups.

<a id="current-goal-confidence-in-the-shipped-android-app"></a>

## Now

Focus on a useful, reliable Android app that works without internet. Prioritize observed issues affecting local data, task completion and bilingual phone use. Continue stable-signed APK publication after validated user-visible changes. No server is available; Django/backend and hosted-web work remain paused. Keep Timer available by default; the optional/hidden proposal was cancelled in [the task record](tasks/2026-10-07-timer-optional-default-hidden.md).

The maintainer-requested project-home cleanup, frontend hygiene review and [spreadsheet-writer upgrade](tasks/2026-10-12-spreadsheet-writer-upgrade.md) are complete. The [framework/build refresh](tasks/2026-10-12-framework-refresh.md) passed source, CI, signing and independent artifact review; Android 2026.10.18 publication is pending. Continue the readiness-first sequence in [backlog clearance](tasks/2026-10-12-backlog-clearance.md).

Open Android evidence remains follow-up work, not blanket release gates:

- Execute the [data-safety phone matrix](tasks/2026-10-08-data-safety-phone-matrix.md) on a spare device, including upgrade, backup/restore and interruption cases. Keep the broader [data-safety task](tasks/2026-10-08-android-data-safety-validation.md) open until observed results are recorded.
- Check English/Persian layout, notifications, templates, Timer suspension, Idea Space editing/backup/upgrade, sharing/recipient delivery, launcher rendering, native accessibility and TalkBack on a phone where applicable. See linked completed task/release records and the [notification review](tasks/2026-10-08-android-notification-review.md); do not mark device behavior verified without observation.

<a id="next-after-baseline-review"></a>

## Next — ordered ready work

1. Finish release verification for the bounded [framework/build-tool refresh](tasks/2026-10-12-framework-refresh.md); then take the selected Finance visibility work after its bilingual Designer handoff is ready.
2. Take user-visible work through Product and Designer discovery before implementation. Candidates include [Finance visibility](tasks/2026-10-07-finance-optional-default-hidden.md) and [PIN change](tasks/2026-10-09-finance-change-pin.md), [Idea Space relationships](tasks/2026-10-07-idea-space-connected-thoughts-refactor.md), the [Planner AI review shortcut](tasks/2026-10-07-planner-ai-review-shortcut.md), [accessibility/Persian review](tasks/2026-10-08-accessibility-persian-phone-review.md), and evidence-based improvements in the [notification review](tasks/2026-10-08-android-notification-review.md). No order is set among these candidates.

## Later

- Review project feedback/diagnostics and analytics policy before considering any implementation: [local problem reporting](tasks/2026-10-07-local-feedback-diagnostics.md) and [Clarity evaluation](tasks/2026-10-10-microsoft-clarity-evaluation.md). No hosted telemetry or automatic uploads are adopted.
- [Periodic team reviews](tasks/2026-10-08-periodic-team-reviews.md) remain a prepared proposal; use only if they help maintain the project without adding process overhead.
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
