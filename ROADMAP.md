# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Critical

- Prepare backend settings for non-development deployment.
  - Move secrets and debug/host/CSRF/CORS settings to environment-aware configuration.
- Add CI or a repeatable validation script for backend tests and frontend lint/type/build.

## High Value

- Add frontend automated tests around primary user flows: weekly planner save/load, finance unlock/add/edit/delete, export/import, language switching.
- Add frontend automated tests around configurable planner sections: settings save/load, hide/activate behavior, planner save/load with custom labels, summaries, and local export/import.
- Add frontend automated tests around timed schedule entries: add/edit/delete, sorting, local storage normalization, and export/import round trip.
- Validate week-template usage after release; consider optional daily and section-level template defaults if they prove useful.
- Validate the compact template sheet and current-week auto-centering on physical Android devices in English and Persian.
- Document production deployment and environment variables.
- Use team-level release records and Git tags after mature changes, including Android local-data version metadata for each tagged release.
- Add import/export regression tests across backend and local-storage frontend mode.
- Improve operational readiness: health check, logging expectations, deployment rollback notes.

## Improvements

- Review repository hygiene for `node_modules-blocked-*` directories in `smart-paper-front/`.
- Add backend linting/formatting/type-checking tools if desired by the maintainer.
- Make API error handling more structured for frontend display.
- Clarify backup replace mode in UX and docs because it deletes old planner/finance data before import.
- Polish configurable section UX after real use: compact planner layout with many active sections, hidden-section-with-data visibility, and optional separate English/Persian labels.
- Add accessibility review for forms, focus states, keyboard flows, and RTL/LTR behavior.
- Validate Android local morning notifications on a real device, including permission denial, app restart, and device reboot behavior.
- Consider trusted-proxy client address handling or user-account-based throttling if Smart Paper becomes a multi-user or internet-exposed app.

## Later / Ideas

- Needs confirmation: richer AI review workflow using exported Markdown/JSON.
- Needs confirmation: multi-user accounts and per-user data separation if Smart Paper stops being a single-user personal app.
- Needs confirmation: charts/trends for planner and finance progress.
- Needs confirmation: Android release signing and distribution workflow.
- Needs confirmation: recurring timed events, calendar import/export, or per-event reminder alarms.
