# Smart Paper Status

Last updated: 2026-09-29.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Android-first APK readiness is in progress; see `tasks/2026-09-29-android-apk-readiness.md`.
- Latest signed candidate: `smart-paper-v2026.09.2` (rebuilt 2026-09-29); tag and GitHub publication await physical-phone acceptance.
- Latest local and remote team tag: `smart-paper-v2026.09.1` (remote tag checked 2026-09-29). The `2026.09.2` record is prepared, not tagged.
- Next priority is a safe, phone-tested downloadable APK. Backend feature work is paused; see `ROADMAP.md` and decision D-007.

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

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.
- Frontend routes: planner, finance, summaries, export/import, and settings.
- Android release: `versionCode 11`, `versionName 2026.09.2`; stable-signed APKs must continue using the existing ignored local signing material.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Prepared-Release Checks

The updated `smart-paper-v2026.09.2` candidate passed on 2026-09-29:

- Backend tests: 33 passed.
- Backend migration drift check: no changes detected.
- Frontend lint, TypeScript check, local-data production build, and 5 import safety tests: passed in Docker.
- Stable-signed Android release build and APK signature verification: passed.

See `releases/smart-paper-v2026.09.2.md` for commands, artifact hashes, and scope. These checks describe that revision; rerun relevant checks after new changes.

## Current Unreleased Validation

- Frontend revision `a385e47`: Android local-data lint, TypeScript check, static build, and import safety tests (5) passed in Docker on 2026-09-29. The design pass was reviewed in browser at desktop and mobile widths in English/Persian; see `tasks/2026-09-29-design-system-review.md`.
- No physical Android device is available in this workspace; signed APK install, backup/restore, update, and final on-device layout checks remain open.

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
