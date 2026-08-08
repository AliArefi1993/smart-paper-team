# Smart Paper Roadmap

This roadmap is based on repository inspection only. Speculative ideas are marked as ideas, not committed product work.

## Critical

- Decide and document the intended security model.
  - Needs confirmation: single-user private app or multi-user product.
- Prepare backend settings for non-development deployment.
  - Move secrets and debug/host/CSRF/CORS settings to environment-aware configuration.
- Add brute-force protection or rate limiting for finance PIN unlock attempts.
- Add CI or a repeatable validation script for backend tests and frontend lint/type/build.

## High Value

- Add frontend automated tests around primary user flows: weekly planner save/load, finance unlock/add/edit/delete, export/import, language switching.
- Document production deployment and environment variables.
- Add import/export regression tests across backend and local-storage frontend mode.
- Improve operational readiness: health check, logging expectations, deployment rollback notes.

## Improvements

- Review repository hygiene for `node_modules-blocked-*` directories in `smart-paper-front/`.
- Add backend linting/formatting/type-checking tools if desired by the maintainer.
- Make API error handling more structured for frontend display.
- Clarify backup replace mode in UX and docs because it deletes old planner/finance data before import.
- Add accessibility review for forms, focus states, keyboard flows, and RTL/LTR behavior.

## Later / Ideas

- Needs confirmation: richer AI review workflow using exported Markdown/JSON.
- Needs confirmation: multi-user accounts and per-user data separation.
- Needs confirmation: charts/trends for planner and finance progress.
- Needs confirmation: Android release signing and distribution workflow.
