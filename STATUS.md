# Smart Paper Status

Last updated: 2026-09-30.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Android-first APK validation remains active; `2026.09.7` was released at maintainer direction before physical-phone checks. See `tasks/2026-09-30-ai-report-release.md`.
- Latest release: `smart-paper-v2026.09.7` (2026-09-30), browser AI-report sharing fallback after the `.6` selective report release.
- Latest local and remote team tag: `smart-paper-v2026.09.7`.
- Local browser QA covered report filtering, finance opt-in, backup download, Persian controls, and sharing fallback. Next priority is Android-runtime QA of install/upgrade, native sharing, restore, offline behavior, notifications, and layout. Backend feature work is paused; see `ROADMAP.md` and decision D-007.

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
- Android release: `versionCode 16`, `versionName 2026.09.7`; stable-signed APKs must continue using the existing ignored local signing material.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Release Checks

The `smart-paper-v2026.09.7` build passed on 2026-09-30:

- Backend 33 tests and migration check: passed; backend source unchanged.
- Frontend lint, TypeScript, 19 tests, and local-data production build: passed in Docker.
- Stable-signed Android APK build, signature, and versionCode 16/versionName 2026.09.7: passed.
- Local browser QA: field/date selection, finance opt-in, JSON backup download, Persian controls, and denied-share download fallback checked.

See `releases/smart-paper-v2026.09.7.md` for artifact checksum and scope. Physical install, upgrade, native backup restore and sharing, timer, notifications, and full bilingual layout remain unverified; the maintainer directed release before these checks.

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- No CI, broad frontend integration suite, backend lint, or backend type-check configuration is present.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Production environment and deployment documentation remain incomplete for any future hosted backend.
- Old `node_modules-blocked-*` directories in the frontend need a repository-hygiene decision.
- Local finance data is not encrypted; its client-side PIN is a screen lock only.
- The previous production dependency audit reported 1 critical, 4 high, and 1 moderate finding; static Android applicability and residual `xlsx` advisories are documented in the `.5` release record.

## Context Pointers

- Product contract: `PRODUCT.md`
- Short feature summary: `feature.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
