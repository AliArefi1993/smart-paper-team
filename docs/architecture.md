# Smart Paper Architecture

## Overview

Smart Paper is split into two independent application repositories inside this coordination workspace:

- Backend: `smart-paper/`, a Django 6 project exposing JSON endpoints.
- Frontend: `smart-paper-front/`, a Next.js 16 / React 19 app that calls the backend API or uses browser local storage in local-data mode.

```text
User browser / Android WebView
  |
  | Next.js app routes and React client components
  v
smart-paper-front/src
  |
  | fetch JSON, credentials included for finance/export
  | default API base: http://127.0.0.1:8010/api
  v
smart-paper Django backend
  |
  | Django ORM
  v
SQLite db.sqlite3

Alternative local mode:
smart-paper-front with NEXT_PUBLIC_DATA_MODE=local
  -> browser localStorage
  -> static export / Capacitor Android build
```

## Backend

- Language/framework: Python with Django 6.0.4.
- Entry points: `manage.py`, `config/urls.py`, `config/settings.py`, `config/wsgi.py`, `config/asgi.py`.
- Apps:
  - `planner`: week/day planning, summaries, export/import.
  - `finance`: finance goal, income entries, PIN unlock/session access.
- Database: Django SQLite database at `BASE_DIR / "db.sqlite3"`.
- Migrations:
  - `planner/migrations/0001_initial.py`
  - `planner/migrations/0002_dayplan_exercise_goal_dayplan_learning_goal_and_more.py`
  - `planner/migrations/0003_plannersectionconfig_and_more.py`
  - `planner/migrations/0004_dayscheduleentry.py`
  - `finance/migrations/0001_initial.py`
- Background jobs: none found.

See `docs/database.md` for entity relationships, persistence ownership, and schema-change checks.

## Backend Modules

- `planner/models.py`: `Week`, `WeekTemplate`, `DayPlan`, `DayScheduleEntry`, and `PlannerSectionConfig`. `DayPlan` stores day notes and 10 stable section slots; `WeekTemplate` stores reusable full-week snapshots; `DayScheduleEntry` stores exact-time agenda items separately from section minutes.
- `planner/views.py`: week list/detail, summaries, full-week templates, planner section settings, timed schedule entry serialization, and Saturday-based week calculation.
- `planner/export_views.py`: JSON/CSV/XLSX/Markdown export and JSON import.
- `planner/urls.py`: `/api/weeks/`, `/api/week-summaries/`, `/api/weeks/<start_date>/`, `/api/week-templates/`, `/api/planner-sections/`, `/api/export/`, `/api/import/`.
- `finance/models.py`: `FinanceState` and `IncomeEntry`.
- `finance/views.py`: finance unlock, overview, income edit/delete, finance serialization.
- `finance/urls.py`: `/api/finance/unlock/`, `/api/finance/`, `/api/finance/incomes/<entry_id>/`.
- `config/middleware.py`: simple CORS middleware for local frontend origins.

## Authentication And Authorization

- No general user authentication flow was found.
- Finance and export/import endpoints require a finance session unlock.
- Finance unlock checks a PIN against `FINANCE_PIN_HASH`.
- `scripts/start_backend.sh` can derive `FINANCE_PIN_HASH` from `FINANCE_PIN` on startup.
- The frontend sends `credentials: "include"` for finance/export/import API calls so Django session cookies work.
- Planner week endpoints and planner section settings are unauthenticated because Smart Paper is currently treated as single-user/private software.

## API Communication

- Frontend API base is resolved by `src/lib/api-client.ts`.
- Default server-side fallback is `http://127.0.0.1:8010/api`.
- In the browser, the API base uses the current protocol/hostname with port `8010`.
- `NEXT_PUBLIC_API_BASE_URL` can override the base URL.
- The backend CORS middleware allows `http://localhost:3000` and `http://127.0.0.1:3000` and credentials.

## Frontend

- Framework: Next.js 16.2.4 App Router.
- Language: TypeScript, React 19.2.4.
- Styling/component approach: React client components with Tailwind CSS classes; no separate component library found.
- Routes:
  - `/`: weekly planner.
  - `/finance`: finance.
  - `/export`: export/import.
  - `/settings`: planner section settings.
  - `/summaries`: multi-week summaries.
- Key components:
  - `WeeklyPlanner`
  - `FinanceView`
  - `ExportView`
  - `SettingsView`
  - `WeekSummariesView`
  - `LanguageToggle`
- State management: React `useState`, `useEffect`, `useMemo`; no external state library found.
- Internationalization: custom `src/lib/i18n.ts` and `useLanguage`, persisted in localStorage.
- Local data mode: `src/lib/local-store.ts` implements planner, planner section settings, finance, export/import, and finance unlock behavior in browser storage.
- `src/lib/planner-sections.ts` normalizes planner section metadata and maps old four-section data into stable `slot_1` through `slot_10` records for backend and local-storage modes.
- `src/lib/notifications.ts` stores opt-in morning notification settings and schedules the next Android local notification when supported and permitted.

## External Services And Integrations

- No third-party hosted service integrations were found.
- `openpyxl` is used by the backend for Excel export.
- `xlsx` is used by the frontend for client-side Excel export in local mode.
- `@capacitor/local-notifications` is used for opt-in Android local morning plan reminders.
- Capacitor Android is configured for a local static build.

## Deployment

- Backend `Dockerfile` exposes port `8010`; default image command runs migrations and Django dev server, while Compose overrides with `scripts/start_backend.sh` and Gunicorn.
- `smart-paper/docker-compose.yml` runs:
  - backend container on `8010`
  - frontend Node container on `3000`, mounting `../smart-paper-front`
- Frontend production command is `npm run build` then `npm run start`.
- Android build uses `NEXT_PUBLIC_DATA_MODE=local npm run build`, then `npx cap sync android`, then Gradle `assembleDebug`.

## Known Architecture Risks

- `DEBUG = True`, hard-coded `SECRET_KEY`, and empty `ALLOWED_HOSTS` are development defaults and are not production-ready.
- Planner endpoints and planner section settings are unauthenticated.
- Finance protection is a shared PIN/session gate, not per-user authorization.
- CSRF exemptions are used on JSON mutation endpoints.
- No background processing, observability, health checks, or CI/CD configuration was found.
- Morning plan reminders are local device notifications, not server push notifications.
