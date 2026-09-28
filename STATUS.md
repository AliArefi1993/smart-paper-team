# Smart Paper Status

Last updated: 2026-09-29.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- No feature is currently in progress.
- Latest prepared release record: `smart-paper-v2026.09.2` (2026-09-27).
- Latest local team tag: `smart-paper-v2026.09.1`; confirm remote publication state before describing `2026.09.2` as published.
- Next priorities are production-safe backend settings, repeatable CI, and frontend regression tests; see `ROADMAP.md`.

## Repository Baseline

| Repository | Branch | Recorded revision | Role |
| --- | --- | --- | --- |
| team root | `main` | `46b29c7` | coordination, durable memory, releases |
| `smart-paper/` | `main` | `68c789b` | Django backend |
| `smart-paper-front/` | `main` | `2cdf6c0` | Next.js web UI and Capacitor Android app |

Run `scripts/project-context.sh` instead of assuming these revisions are still current.

## Implemented Product

- Single-user personal planner with Saturday-to-Friday weeks, weekly goals/notes, day notes, and ten stable configurable section slots.
- Exact-time day schedule entries and reusable full-week templates.
- Multi-week summaries and English/Persian UI.
- Finance goal and income tracking; Django mode protects finance and export/import with a throttled shared PIN/session unlock.
- JSON backup/import (`schema_version: 4`) plus CSV, XLSX, and Markdown exports.
- Two persistence modes: Django/SQLite API mode and browser `localStorage` mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- Capacitor Android app with native file sharing and opt-in local morning plan notifications.

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.
- Frontend routes: planner, finance, summaries, export/import, and settings.
- Android release: `versionCode 11`, `versionName 2026.09.2`; stable-signed APKs must continue using the existing ignored local signing material.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Prepared-Release Checks

The prepared `smart-paper-v2026.09.2` revision passed on 2026-09-27:

- Backend tests: 33 passed.
- Backend migration drift check: no changes detected.
- Frontend lint, TypeScript check, and production build: passed in Docker.
- Stable-signed Android release build and APK signature verification: passed.

See `releases/smart-paper-v2026.09.2.md` for commands, artifact hashes, and scope. These checks describe that revision; rerun relevant checks after new changes.

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- No CI, frontend automated tests, backend lint, or backend type-check configuration is present.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Production environment/deployment and backup-replace safety documentation remain incomplete.
- Old `node_modules-blocked-*` directories in the frontend need a repository-hygiene decision.
- The prepared `smart-paper-v2026.09.2` release has no corresponding local team tag; publishing state needs confirmation.

## Context Pointers

- Product contract: `PRODUCT.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
