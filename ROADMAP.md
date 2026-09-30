# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Current Goal: Downloadable Android APK

- Prove JSON backup and restore on a phone, including failed and cancelled imports.
- Validate install and upgrade on a physical phone without losing saved data.
- Test planner, templates, finance, export/restore, English/Persian layout, offline use, and notification behavior on a phone.
- Test selective AI report sharing to ChatGPT through Android's chooser and the save-then-attach fallback on a phone.
- Test the focus/rest timer on a phone, including app suspension and reopening after a session completes.
- Test Idea Space capture, editing, branching, search, keyboard behavior, backup/restore, and upgrade on a phone in English and Persian.
- Validate the compact template sheet and current-week auto-centering on a phone in both languages.
- Publish only a stable-signed release APK with a matching record and checksum.
- Add focused local-data regression tests and repeatable frontend lint/type/build checks.
- Review production dependency advisories for the static Android build before wider sharing.

## After Android Release

- Add frontend automated tests around primary user flows: weekly planner save/load, finance unlock/add/edit/delete, export/import, language switching.
- Add frontend automated tests around configurable planner sections: settings save/load, hide/activate behavior, planner save/load with custom labels, summaries, and local export/import.
- Add frontend automated tests around timed schedule entries: add/edit/delete, sorting, local storage normalization, and export/import round trip.
- Validate week-template usage after release; consider optional daily and section-level template defaults if they prove useful.
- Use team-level release records and Git tags after mature changes, including Android local-data version metadata for each tagged release.

## Paused Until Backend Or Hosted Web Is Needed

- Prepare backend settings for non-development deployment, including secrets, debug/hosts, CSRF/CORS, and database configuration.
- Add backend CI, health checks, logging, and rollback documentation.
- Add backend linting/formatting/type-checking tools if the backend is resumed.
- Resume backend/local-data parity and backend import/export regression tests when a server or sync is in scope.

## Improvements

- Review repository hygiene for `node_modules-blocked-*` directories in `smart-paper-front/`.
- Make API error handling more structured for frontend display.
- Polish configurable section UX after real use: compact planner layout with many active sections, hidden-section-with-data visibility, and optional separate English/Persian labels.
- Add accessibility review for forms, focus states, keyboard flows, and RTL/LTR behavior.
- Validate Android local morning notifications on a real device, including permission denial, app restart, and device reboot behavior.
- Consider trusted-proxy client address handling or user-account-based throttling if Smart Paper becomes a multi-user or internet-exposed app.
- Consider a native completion notification only if phone use shows a need for an alert while the app is in the background.

## Later / Ideas

- Needs confirmation: multi-user accounts and per-user data separation if Smart Paper stops being a single-user personal app.
- Needs confirmation: charts/trends for planner and finance progress.
- Needs confirmation: recurring timed events, calendar import/export, or per-event reminder alarms.
