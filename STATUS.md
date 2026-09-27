# Smart Paper Status

Last updated: 2026-09-27.

## Current Technical State

- Workspace root is a coordination Git repository with project memory files now populated.
- Team release workflow is documented in `docs/release-workflow.md`, with release records stored under `releases/`.
- `smart-paper/` is an independent backend Git repository.
- `smart-paper-front/` is an independent frontend Git repository.
- The app is treated as a single-user personal weekly planner, finance tracker, and export/import tool.
- Configurable planner sections are implemented: 10 stable section slots, first four active by default, remaining six hidden by default.
- Timed day schedule entries are implemented, with Android local morning notification settings.
- Day-level notes and reusable week goal/note templates are implemented.

## Implemented Backend

- Django 6.0.4 project with `planner` and `finance` apps.
- SQLite database with committed Django migrations.
- Planner APIs for week list, week detail save/load, summaries, and planner section settings.
- Planner data uses stable section slots `slot_1` through `slot_10`, with legacy `main`, `second`, `learning`, and `exercise` mapped to slots 1-4.
- Planner day schedule entries are persisted with `DayScheduleEntry` and included in week detail save/load.
- Finance APIs for PIN unlock, overview/update, and income edit/delete.
- Finance PIN unlock now throttles repeated invalid PIN attempts per client address.
- Export/import APIs for JSON, CSV, XLSX, Markdown, merge, and replace.
- Export/import JSON uses `schema_version: 4` and includes planner section settings, day notes, schedule entries, and week templates.
- Tests exist in `planner/tests.py` and `finance/tests.py`.
- Dockerfile, Docker Compose, and Gunicorn startup script exist.

## Implemented Frontend

- Next.js 16.2.4 / React 19.2.4 / TypeScript app.
- Routes for planner, finance, summaries, export/import, and settings.
- API wrappers for planner, planner section settings, finance, and export/import.
- Local browser-storage mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- Local browser-storage mode supports configurable planner sections and timed day schedule entries.
- Local browser-storage mode supports day notes and reusable week templates.
- Settings includes an opt-in Android local morning plan notification with configurable time.
- Android local-data export now uses native Capacitor file sharing instead of browser download links.
- Android UI polish now disables WebView forced darkening, improves planner dark/focus contrast, and makes headers more mobile-friendly.
- Android app version for release `smart-paper-v2026.09.1` is `versionCode 10` and `versionName 2026.09.1`.
- Android release APKs are stable-signed with the private local keystore in `smart-paper-front/android/`; future update-compatible APKs must use the same ignored signing files.
- Team repo tag pushes now publish GitHub Releases through `.github/workflows/publish-release.yml` when the matching release note and APK artifact are already committed.
- English/Persian translation support.
- Tailwind CSS styling.
- Capacitor Android project and build instructions.

## Test / Lint / Build Status

- Backend tests: passed on 2026-08-25 with `.venv/bin/python manage.py test` (`32` tests) for configurable planner sections and timed schedule entries.
- Backend tests: passed on 2026-09-27 with `.venv/bin/python manage.py test` (`33` tests) for day notes and reusable week templates.
- Backend lint: no lint command or lint config discovered.
- Backend type check: no type-check command or config discovered.
- Frontend lint: passed on 2026-08-08 with `npm run lint`.
- Frontend type check: passed on 2026-08-08 with `npx tsc --noEmit`.
- Frontend build: passed on 2026-08-08 with `npm run build`.
- Frontend Docker validation for Android export fix: passed on 2026-08-13 with `npm run lint`, `npx tsc --noEmit`, `npm run build`, `NEXT_PUBLIC_DATA_MODE=local npm run build`, and `npx cap sync android`.
- Frontend Docker validation for Android UI polish: passed on 2026-08-13 with `npm run lint`, `npx tsc --noEmit`, `npm run build`, `NEXT_PUBLIC_DATA_MODE=local npm run build`, and `npx cap sync android`.
- Frontend Docker validation for configurable planner sections: passed on 2026-08-16 with `docker run --rm -v "$PWD":/app -w /app node:24-bookworm bash -lc 'npm ci && npm run lint && npx tsc --noEmit && npm run build'`.
- Frontend Docker validation for timed schedule entries and notification settings: passed on 2026-08-25 with `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `NEXT_PUBLIC_DATA_MODE=local npm run build`.
- Capacitor Android sync for timed schedule notification plugin: passed on 2026-08-25 with `npx cap sync android`.
- Android signed release build for `smart-paper-v2026.08.8`: passed on 2026-08-25 with `scripts/build-android-release-docker.sh`; artifact is `releases/artifacts/SmartPaper-local-2026.08.8-release.apk`.
- Android signed release build for `smart-paper-v2026.09.1`: passed on 2026-09-27 with `scripts/build-android-release-docker.sh`; artifact is `releases/artifacts/SmartPaper-local-2026.09.1-release.apk`.
- Android signed release build: passed on 2026-08-13 with `scripts/build-android-release-docker.sh`; latest signed artifact is `releases/artifacts/SmartPaper-local-2026.08.4-release.apk`.
- Android signed release build for `smart-paper-v2026.08.7`: passed on 2026-08-16 with `scripts/build-android-release-docker.sh`; artifact is `releases/artifacts/SmartPaper-local-2026.08.7-release.apk`.
- GitHub Release publishing workflow: validated on 2026-08-13 by tag `smart-paper-v2026.08.4`.
- Frontend tests: no test script or test config discovered.

## Known Technical Problems

- Backend settings contain development defaults: hard-coded Django `SECRET_KEY`, `DEBUG = True`, and `ALLOWED_HOSTS = []`.
- Backend mutation endpoints use `csrf_exempt`.
- Planner endpoints and planner section settings have no authentication/authorization.
- Finance uses a shared PIN unlock rather than per-user accounts/authorization.
- No CI configuration found.
- No frontend automated tests found.
- Android local notification delivery still needs real-device validation for permission denied/allowed states and app restart behavior.
- No backend lint/type-check tooling found.
- `smart-paper-front/` contains old dependency-like directories named `node_modules-blocked-*`; they are excluded by `tsconfig.json`/ESLint ignores but should be reviewed for repository hygiene.

## Missing Documentation

- Production deployment requirements and environment variables need clearer documentation.
- Security model is currently single-user private/personal; multi-user auth would be a future product direction change.
- Backup/import safety expectations should be documented before larger data changes.
- Android release/signing workflow and GitHub Release publishing are documented in `docs/release-workflow.md` and `releases/README.md`.

## Major TODOs

- Treat Smart Paper as single-user local/private software unless the maintainer explicitly changes direction.
- Create production settings strategy for Django secrets, debug, allowed hosts, CSRF, CORS, and database configuration.
- Add CI for backend tests and frontend lint/type/build.
- Add frontend automated tests for planner, finance, export/import, and language flows.
- Add frontend automated tests for timed schedule entry creation/edit/delete, sorting, and local import/export.
- Add a small health check endpoint or operational readiness path if deployment will continue.
- Review and remove or document `node_modules-blocked-*` directories in the frontend repo.

## Git Status At Setup Start

- Root workspace: `main...origin/main`, clean.
- Backend `smart-paper/`: `main...origin/main`, clean.
- Frontend `smart-paper-front/`: `main...origin/main`, clean.

## Git Status After Setup

- Root workspace: `main...origin/main` with modified `.codex/config.toml`, `AGENTS.md`, `PRODUCT.md`, `ROADMAP.md`, `STATUS.md`; untracked `.codex/agents/` and `docs/`; nested repositories show as modified because their own `AGENTS.md` files changed.
- Backend `smart-paper/`: `main...origin/main` with modified `AGENTS.md`.
- Frontend `smart-paper-front/`: `main...origin/main` with modified `AGENTS.md`.
