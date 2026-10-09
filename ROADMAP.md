# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Current Goal: Confidence In The Shipped Android App

Android `2026.10.10` / versionCode 27 is the latest published release; the [hosted release](tasks/2026-10-09-hosted-signed-release.md) passed hosted checks, protected stable signing and public publication/download verification. Its application behavior includes the published AI report handoff correction; see its [task](tasks/2026-10-07-ai-report-chatgpt-handoff.md) and [release record](releases/smart-paper-v2026.10.8.md) for evidence and remaining native follow-ups. The seven-route audit remains a structural reference with native follow-ups.

- Prioritize observed design/implementation mismatches by effect on local data, task completion, and bilingual phone use. A user-visible fix requires a ready Designer handoff and targeted QA.

Completed 2026-10-08: [fixed template loss during Merge import](tasks/2026-10-08-template-merge-safety.md) with related storage-failure tests in one bounded validation/release cycle. Continue phone data-safety evidence when a test device is available; the [ChatGPT handoff correction](tasks/2026-10-07-ai-report-chatgpt-handoff.md) is now published with copy/manual transfer and truthful file-sharing feedback. Keep new feature implementation sequential; independent reviews and preparation may overlap.

- [Validate Android data safety on a real phone](tasks/2026-10-08-android-data-safety-validation.md): upgrades, backup/restore, failed/cancelled imports, low storage and interruption recovery; consolidates existing readiness follow-ups.
- Test planner, templates, finance, export/restore, English/Persian layout, offline use, and notification behavior on a phone.
- Shipped: [AI report handoff correction](tasks/2026-10-07-ai-report-chatgpt-handoff.md). The navigation-only URL is replaced by Copy report, file sharing and manual selection, with source/finance rechecks. Phone clipboard/paste, chooser/recipient acceptance and TalkBack remain follow-ups before relying on a recipient-specific path.
- Test the focus/rest timer on a phone, including app suspension and reopening after a session completes.
- Test Idea Space capture, editing, branching, search, keyboard behavior, backup/restore, and upgrade on a phone in English and Persian.
- Validate the compact template sheet and current-week auto-centering on a phone in both languages.
- Continue stable-signed APK publication with matching records and checksums after validated user-visible changes; physical-device/TalkBack checks remain recorded follow-ups under standing maintainer direction.
- Extend focused local-data tests for demonstrated gaps; current checks are recorded in the release record.
- Review production dependency advisories for the static Android build before wider sharing.

## Next, After Baseline Review

- Planned: [Phone landscape layout review and fixes](tasks/2026-10-09-phone-landscape-layout.md), addressing the maintainer's report that the app looks wrong after rotating the phone; reproduce affected screens and fix confirmed issues.
- Planned: [Planner bottom-area simplification](tasks/2026-10-09-planner-bottom-area.md), reviewing removal of the fixed bottom area now that Planner autosaves and the area reportedly only contains Next day; preserve discoverable day navigation and save feedback.

- Completed: [Privacy and local-data protection review](tasks/2026-10-08-privacy-local-data-review.md). [Ranked findings and bounded scopes](docs/privacy-local-data-review.md): finance expiry rechecks/clearing stale display are validated with [release underway](tasks/2026-10-09-finance-session-expiry.md); explicit OS backup policy and notification-preview disclosure are next. Share-cache retention, CSV text safety and import limits follow; app behavior is unchanged. User-visible fixes require Designer handoffs and validated Android releases.
- Planned: [Lightweight feedback triage](tasks/2026-10-08-feedback-triage-workflow.md), turning voluntary reports into reproduced, prioritized and verified tasks.

- Planned evaluation: [Periodic team reviews](tasks/2026-10-08-periodic-team-reviews.md) covering QA, independent feature proposals, necessary refactoring, new/updated agent skills and similar-app/technology research, with lightweight triggers and effort limits. No recurring jobs or new rules are enabled yet.

- Assessed: [Lightweight batching and release cadence](tasks/2026-10-08-batching-release-cadence.md), bounded related work and eligible unchanged-source evidence reuse adopted for this run; release cadence and standing authorization remain unchanged.

- Planned: [Lightweight project home page and roadmap cleanup](tasks/2026-10-08-project-home-roadmap.md), making current features, future tasks, priorities and releases easier to browse through existing Markdown files.

- Shipped: [GitHub Actions CI and Android builds](tasks/2026-10-07-github-actions-ci-android-builds.md), including hosted frontend checks, isolated verification APK artifacts, verified success/failed-test gates, and a Security-accepted protected stable signing run. Existing team tag publication remains separate; independent CI archive download, fork/cancellation/cache-hit, physical-device, and account-usage checks remain follow-ups.

- Planned: [Design and install a Smart Paper Android launcher icon](tasks/2026-10-07-android-launcher-icon.md); important visual identity task covering the installed home-screen/app-drawer icon, not a full brand redesign.

- Planned: [Finance optional and hidden by default](tasks/2026-10-07-finance-optional-default-hidden.md); preserve existing records and pause feature expansion.
- Planned: [Change the Finance PIN](tasks/2026-10-09-finance-change-pin.md), giving users a discoverable place to replace the default/current Finance PIN while preserving their records.
- Planned: [Timer optional and hidden by default](tasks/2026-10-07-timer-optional-default-hidden.md); pause expansion and keep it independent of Planner.
- Planned: [Idea Space connected-thoughts refactor](tasks/2026-10-07-idea-space-connected-thoughts-refactor.md); clarify and navigate relationships before expanding writing tools. Interaction/model needs Product/Designer discovery.

- Planned: Planner **Review this week with AI** shortcut, reusing the existing selective report with the viewed week's dates preselected. Resolve the reported ChatGPT handoff issue before relying on that path. See the [future task](tasks/2026-10-07-planner-ai-review-shortcut.md); implementation is not started.

- Planned: accessible Android **Report a problem**, with optional local crash/error diagnostics and basic usage analytics, preview/delete controls, and voluntary file sharing through Android/email. No server or automatic uploads. See the [future task](tasks/2026-10-07-local-feedback-diagnostics.md); implementation is not started.

- Add frontend automated tests around primary user flows: weekly planner save/load, finance unlock/add/edit/delete, export/import, language switching.
- Add frontend automated tests around configurable planner sections: settings save/load, hide/activate behavior, planner save/load with custom labels, summaries, and local export/import.
- Add frontend automated tests around timed schedule entries: add/edit/delete, sorting, local storage normalization, and export/import round trip.
- Validate week-template usage after release; consider optional daily and section-level template defaults if they prove useful.
- Prioritize Planner usability; Timer-to-Planner integration is not planned under the maintainer's current direction. Idea Space relationship discovery and optional Finance/Timer visibility are tracked separately above.

## Paused Until Backend Or Hosted Web Is Needed

- Prepare backend settings for non-development deployment, including secrets, debug/hosts, CSRF/CORS, and database configuration.
- Add backend CI, health checks, logging, and rollback documentation.
- Add backend linting/formatting/type-checking tools if the backend is resumed.
- Resume backend/local-data parity and backend import/export regression tests when a server or sync is in scope.

## Improvements

- Review repository hygiene for `node_modules-blocked-*` directories in `smart-paper-front/`.
- Make API error handling more structured for frontend display.
- Polish configurable section UX after real use: assess ten active sections, hidden-section-with-data visibility, and optional separate English/Persian labels.
- [Android accessibility and Persian usability review](tasks/2026-10-08-accessibility-persian-phone-review.md): TalkBack, text scaling, touch targets, keyboard behavior and RTL/LTR on primary flows.
- [Review and improve Android notifications](tasks/2026-10-08-android-notification-review.md): verify existing morning reminders on a real device; improve notification design/UX, bilingual messages, and the place and timing of the notification-permission request based on evidence.
- Consider trusted-proxy client address handling or user-account-based throttling if Smart Paper becomes a multi-user or internet-exposed app.
- Consider a native completion notification only if phone use shows a need for an alert while the app is in the background.

## Later / Ideas

- Needs confirmation: multi-user accounts and per-user data separation if Smart Paper stops being a single-user personal app.
- Needs confirmation: charts/trends for planner and finance progress.
- Needs confirmation: recurring timed events, calendar import/export, or per-event reminder alarms.
