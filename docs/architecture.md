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
  - `finance/migrations/0001_initial.py`
- Background jobs: none found.

## Backend Modules

- `planner/models.py`: `Week` and `DayPlan`.
- `planner/views.py`: week list, week detail, week summaries, serialization, Saturday-based week calculation.
- `planner/export_views.py`: JSON/CSV/XLSX/Markdown export and JSON import.
- `planner/urls.py`: `/api/weeks/`, `/api/week-summaries/`, `/api/weeks/<start_date>/`, `/api/export/`, `/api/import/`.
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
- Planner week endpoints are unauthenticated.

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
  - `/summaries`: multi-week summaries.
- Key components:
  - `WeeklyPlanner`
  - `FinanceView`
  - `ExportView`
  - `WeekSummariesView`
  - `LanguageToggle`
- State management: React `useState`, `useEffect`, `useMemo`; no external state library found.
- Internationalization: custom `src/lib/i18n.ts` and `useLanguage`, persisted in localStorage.
- Local data mode: `src/lib/local-store.ts` implements planner, finance, export/import, and finance unlock behavior in browser storage.

## External Services And Integrations

- No third-party hosted service integrations were found.
- `openpyxl` is used by the backend for Excel export.
- `xlsx` is used by the frontend for client-side Excel export in local mode.
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
- Planner endpoints are unauthenticated.
- Finance protection is a shared PIN/session gate, not per-user authorization.
- CSRF exemptions are used on JSON mutation endpoints.
- No background processing, observability, health checks, or CI/CD configuration was found.
