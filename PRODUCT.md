# Smart Paper Product

Smart Paper is a personal weekly planning, progress tracking, finance tracking, and data export application.

## What It Currently Does

- Provides a Saturday-to-Friday weekly planner.
- Tracks a weekly goal and weekly note.
- Tracks seven day plans per week.
- Splits each day into configurable planner sections.
- Provides 10 stable planner section slots; the first four default to Main, Second, Learning, and Exercise, while slots 5-10 are hidden until activated.
- Lets the user rename planner sections and activate/hide section slots from Settings.
- Records minutes, goals, and notes for each day section.
- Records day-level timed schedule entries such as `18:00-19:00 Meeting`.
- Shows week totals by active section and total visible minutes.
- Shows multi-week summaries with filters for empty weeks and selectable month ranges.
- Tracks a finance goal and income entries.
- Protects finance data behind a PIN/session unlock when using the Django backend.
- Exports planner and finance data as JSON, CSV, Excel, and Markdown for AI review.
- Imports Smart Paper JSON backups in merge/upsert or replace mode.
- Supports English and Persian UI text.
- Supports a local browser-storage mode for Android/static export builds.
- Supports opt-in Android local morning plan notifications.

## Likely Target Users

- The current intended user is one individual using the app as a personal "smart paper" for weekly goals, time tracking, progress review, income tracking, and AI-assisted reflection.
- Persian language support is intended for bilingual English/Persian personal use.
- Data migration perfection is not a priority while the app remains single-user/personal; practical forward progress is preferred unless the maintainer explicitly requests careful historical migration.

## Primary User Workflows

- Choose the current, previous, or future week and record weekly goals/notes.
- Enter daily section goals, notes, and duration minutes.
- Add, edit, or delete exact-time day schedule entries.
- Save the week and review total planned/tracked minutes by category.
- Open Settings to rename section slots, choose active sections, and enable a morning plan notification.
- Open summaries to review recent weeks and hide or show empty weeks.
- Unlock Finance with a PIN, set a finance goal, and add/edit/delete income records.
- Open Export, unlock finance, preview aggregate data, download/share a backup or report file, or import a JSON backup.
- Build an Android local-data version that uses browser/device storage instead of the backend API.

## Major Implemented Capabilities

- Django REST-style JSON endpoints for planner weeks, week summaries, export/import, finance unlock, finance overview, and income entry edits.
- SQLite persistence through Django models and migrations.
- Day schedule entries are stored separately from section minutes so exact-time plans do not replace category tracking.
- Session-based finance unlock using Django sessions and a configured password hash.
- Next.js App Router frontend with React client components.
- API abstraction that switches between backend API mode and local storage mode with `NEXT_PUBLIC_DATA_MODE=local`.
- Tailwind CSS-based responsive UI with dark visual styling in the current screens.
- Capacitor Android shell configuration for static-export local mode.
- Capacitor local notifications for opt-in Android morning plan reminders.

## Explicit Non-Claims

- No multi-user account system is implemented.
- No per-user planner settings are implemented; section settings are global for the personal app.
- No background jobs are implemented.
- No production infrastructure beyond Docker/Docker Compose configuration was found.
- No committed frontend automated test suite was found.
