# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Current Goal: Confidence In The Shipped Android App

Android `2026.10.5` is shipped (frontend `45d4130`). The seven-route product/design/QA baseline audit is complete with structural-reference limits and Android follow-ups recorded. Local Planner autosave addresses the maintainer’s save-control feedback; see [save-controls task](tasks/2026-10-06-save-controls-autosave.md).

- Next bounded design: protect Idea Space unsaved writing and recover edit/branch context; existing high/medium source-confirmed risks are not fixed by Planner autosave. See [QA audit](design/2026-10-06-android-qa-review.md).
- Review Settings save placement at the end of its long phone form; retain explicit notification consent and batch validation. Finance action styling is a separate visual candidate.
- Prioritize observed design/implementation mismatches by effect on local data, task completion, and bilingual phone use. A user-visible fix requires a ready Designer handoff and targeted QA.

- Prove JSON backup and restore on a phone, including failed and cancelled imports.
- Validate install and upgrade on a physical phone without losing saved data.
- Test planner, templates, finance, export/restore, English/Persian layout, offline use, and notification behavior on a phone.
- Test selective AI report sharing to ChatGPT through Android's chooser and the save-then-attach fallback on a phone.
- Test the focus/rest timer on a phone, including app suspension and reopening after a session completes.
- Test Idea Space capture, editing, branching, search, keyboard behavior, backup/restore, and upgrade on a phone in English and Persian.
- Validate the compact template sheet and current-week auto-centering on a phone in both languages.
- Continue stable-signed APK publication with matching records and checksums after validated user-visible changes; physical-device/TalkBack checks remain recorded follow-ups under standing maintainer direction.
- Extend the existing focused local-data tests only for demonstrated gaps; lint/type/30 tests/local-data build already pass at the shipped baseline.
- Review production dependency advisories for the static Android build before wider sharing.

## Next, After Baseline Review

- Add frontend automated tests around primary user flows: weekly planner save/load, finance unlock/add/edit/delete, export/import, language switching.
- Add frontend automated tests around configurable planner sections: settings save/load, hide/activate behavior, planner save/load with custom labels, summaries, and local export/import.
- Add frontend automated tests around timed schedule entries: add/edit/delete, sorting, local storage normalization, and export/import round trip.
- Validate week-template usage after release; consider optional daily and section-level template defaults if they prove useful.
- Needs confirmation: use a small plan → focus → review routine with existing screens and optional idea capture. Gather phone-use evidence before proposing cross-route shortcuts or automation; Finance remains an optional separate workflow.

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
