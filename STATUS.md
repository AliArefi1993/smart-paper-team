# Smart Paper Status

Last updated: 2026-08-08.

## Current Technical State

- Workspace root is a coordination Git repository with project memory files now populated.
- `smart-paper/` is an independent backend Git repository.
- `smart-paper-front/` is an independent frontend Git repository.
- The app appears to be a working personal weekly planner, finance tracker, and export/import tool.
- No product feature implementation was changed during this setup pass.

## Implemented Backend

- Django 6.0.4 project with `planner` and `finance` apps.
- SQLite database with committed Django migrations.
- Planner APIs for week list, week detail save/load, and summaries.
- Finance APIs for PIN unlock, overview/update, and income edit/delete.
- Export/import APIs for JSON, CSV, XLSX, Markdown, merge, and replace.
- Tests exist in `planner/tests.py` and `finance/tests.py`.
- Dockerfile, Docker Compose, and Gunicorn startup script exist.

## Implemented Frontend

- Next.js 16.2.4 / React 19.2.4 / TypeScript app.
- Routes for planner, finance, summaries, and export/import.
- API wrappers for planner, finance, export/import.
- Local browser-storage mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- English/Persian translation support.
- Tailwind CSS styling.
- Capacitor Android project and build instructions.

## Test / Lint / Build Status

- Backend tests: passed on 2026-08-08 with `.venv/bin/python manage.py test` (`16` tests).
- Backend lint: no lint command or lint config discovered.
- Backend type check: no type-check command or config discovered.
- Frontend lint: passed on 2026-08-08 with `npm run lint`.
- Frontend type check: passed on 2026-08-08 with `npx tsc --noEmit`.
- Frontend build: passed on 2026-08-08 with `npm run build`.
- Frontend tests: no test script or test config discovered.

## Known Technical Problems

- Backend settings contain development defaults: hard-coded Django `SECRET_KEY`, `DEBUG = True`, and `ALLOWED_HOSTS = []`.
- Backend mutation endpoints use `csrf_exempt`.
- Planner endpoints have no authentication/authorization.
- Finance uses a shared PIN unlock rather than per-user accounts/authorization.
- No rate limiting found for finance PIN attempts.
- No CI configuration found.
- No frontend automated tests found.
- No backend lint/type-check tooling found.
- `smart-paper-front/` contains old dependency-like directories named `node_modules-blocked-*`; they are excluded by `tsconfig.json`/ESLint ignores but should be reviewed for repository hygiene.

## Missing Documentation

- Production deployment requirements and environment variables need clearer documentation.
- Security model needs confirmation: single-user private app versus multi-user app.
- Backup/import safety expectations should be documented before larger data changes.
- Android release/signing workflow is not documented.

## Major TODOs

- Decide whether Smart Paper is strictly single-user local/private software or needs multi-user auth.
- Create production settings strategy for Django secrets, debug, allowed hosts, CSRF, CORS, and database configuration.
- Add CI for backend tests and frontend lint/type/build.
- Add frontend automated tests for planner, finance, export/import, and language flows.
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
