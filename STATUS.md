# Smart Paper Status

Last updated: 2026-09-30.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Android-first APK validation remains active; see `tasks/2026-09-29-android-apk-readiness.md`, `tasks/2026-09-29-focus-rest-timer.md`, and `tasks/2026-09-30-android-launch-position.md`.
- Latest release: `smart-paper-v2026.09.5` (2026-09-30), a launch-position patch awaiting physical-phone retest.
- Latest local and remote team tag: `smart-paper-v2026.09.5`.
- Next priority is phone validation of the opening viewport and timer, backup/restore, upgrade, notifications, and English/Persian layouts. Backend feature work is paused; see `ROADMAP.md` and decision D-007.

## Repository State

Run `scripts/project-context.sh` for current branches, revisions, working-tree changes, and the latest local release tag.

## Implemented Product

- Single-user personal planner with Saturday-to-Friday weeks, weekly goals/notes, day notes, and ten stable configurable section slots.
- Exact-time day schedule entries and reusable full-week templates.
- Multi-week summaries and English/Persian UI.
- Finance goal and income tracking; Django mode protects finance and export/import with a throttled shared PIN/session unlock.
- JSON backup/import (`schema_version: 4`) plus CSV, XLSX, and Markdown exports.
- Two persistence modes: Django/SQLite API mode and browser `localStorage` mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- The Android APK packages `smart-paper-front/` in local-data mode; it does not require Django.
- Capacitor Android app with native file sharing and opt-in local morning plan notifications.
- Dedicated focus/rest timer with configurable lengths, hourglass progress, and deadline recovery after navigation or suspension; no planner-minute logging or background completion alarm.

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.
- Frontend routes: planner, timer, finance, summaries, export/import, and settings.
- Android release: `versionCode 14`, `versionName 2026.09.5`; stable-signed APKs must continue using the existing ignored local signing material.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Prepared-Release Checks

The `smart-paper-v2026.09.5` patch candidate passed on 2026-09-30:

- Backend unchanged; the previous release's 33 tests and migration check remain the latest backend validation.
- Frontend lint, TypeScript check, local-data production build, and 13 timer/import tests: passed in Docker.
- Stable-signed Android release build and APK signature verification: passed.

See `releases/smart-paper-v2026.09.5.md` for commands, artifact hashes, and scope. These checks describe that revision; rerun relevant checks after new changes.

## Current Unreleased Validation

- Frontend revision `0e7d5dd`: Android local-data lint, TypeScript check, static build, and 13 tests passed in Docker on 2026-09-30. A built browser review at 393px confirmed Persian fresh launch at the horizontal origin and save-bar placement in both languages.
- No physical Android device is available in this workspace; signed APK install, launch-position retest, timer suspension/expiry, backup/restore, and update checks remain open after publication.

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- No CI, broad frontend integration suite, backend lint, or backend type-check configuration is present.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Production environment and deployment documentation remain incomplete for any future hosted backend.
- Old `node_modules-blocked-*` directories in the frontend need a repository-hygiene decision.
- Local finance data is not encrypted; its client-side PIN is a screen lock only.
- Production dependency audit reports 1 critical, 4 high, and 1 moderate finding; Android static-export applicability was reviewed for this candidate, with residual `xlsx` advisories documented in the release record.

## Context Pointers

- Product contract: `PRODUCT.md`
- Short feature summary: `feature.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
