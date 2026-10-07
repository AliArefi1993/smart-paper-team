# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Current Goal: Confidence In The Shipped Android App

Android `2026.10.6` / versionCode 23 implements the bounded audit follow-ups: Ideas writing protection/contextual recovery, end-of-form Settings Save and Finance deletion confirmation/commit targets. See the [task](tasks/2026-10-06-audit-followups.md) and [release record](releases/smart-paper-v2026.10.6.md) for bounded QA, revision and publication status. The seven-route audit remains a structural reference with native follow-ups.

- Prioritize observed design/implementation mismatches by effect on local data, task completion, and bilingual phone use. A user-visible fix requires a ready Designer handoff and targeted QA.

- Prove JSON backup and restore on a phone, including failed and cancelled imports.
- Validate install and upgrade on a physical phone without losing saved data.
- Test planner, templates, finance, export/restore, English/Persian layout, offline use, and notification behavior on a phone.
- Investigate and fix the maintainer-reported **Open ChatGPT** problem in the AI report before relying on it for a Planner shortcut; test Android chooser and save-then-attach fallback on a phone. See the [future task](tasks/2026-10-07-ai-report-chatgpt-handoff.md).
- Test the focus/rest timer on a phone, including app suspension and reopening after a session completes.
- Test Idea Space capture, editing, branching, search, keyboard behavior, backup/restore, and upgrade on a phone in English and Persian.
- Validate the compact template sheet and current-week auto-centering on a phone in both languages.
- Continue stable-signed APK publication with matching records and checksums after validated user-visible changes; physical-device/TalkBack checks remain recorded follow-ups under standing maintainer direction.
- Extend focused local-data tests for demonstrated gaps; current checks are recorded in the release record.
- Review production dependency advisories for the static Android build before wider sharing.

## Next, After Baseline Review

- Planned: [Design and install a Smart Paper Android launcher icon](tasks/2026-10-07-android-launcher-icon.md); important visual identity task covering the installed home-screen/app-drawer icon, not a full brand redesign.

- Planned: [Finance optional and hidden by default](tasks/2026-10-07-finance-optional-default-hidden.md); preserve existing records and pause feature expansion.
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
- Add accessibility review for forms, focus states, keyboard flows, and RTL/LTR behavior.
- Validate Android local morning notifications on a real device, including permission denial, app restart, and device reboot behavior.
- Consider trusted-proxy client address handling or user-account-based throttling if Smart Paper becomes a multi-user or internet-exposed app.
- Consider a native completion notification only if phone use shows a need for an alert while the app is in the background.

## Later / Ideas

- Needs confirmation: multi-user accounts and per-user data separation if Smart Paper stops being a single-user personal app.
- Needs confirmation: charts/trends for planner and finance progress.
- Needs confirmation: recurring timed events, calendar import/export, or per-event reminder alarms.
