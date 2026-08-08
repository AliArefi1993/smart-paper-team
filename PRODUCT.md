# Smart Paper Product

Smart Paper is a personal weekly planning, progress tracking, finance tracking, and data export application.

## What It Currently Does

- Provides a Saturday-to-Friday weekly planner.
- Tracks a weekly goal and weekly note.
- Tracks seven day plans per week.
- Splits each day into four sections: main, second, learning, and exercise.
- Records minutes, goals, and notes for each day section.
- Shows week totals by section and total minutes.
- Shows multi-week summaries with filters for empty weeks and selectable month ranges.
- Tracks a finance goal and income entries.
- Protects finance data behind a PIN/session unlock when using the Django backend.
- Exports planner and finance data as JSON, CSV, Excel, and Markdown for AI review.
- Imports Smart Paper JSON backups in merge/upsert or replace mode.
- Supports English and Persian UI text.
- Supports a local browser-storage mode for Android/static export builds.

## Likely Target Users

- Needs confirmation: the primary user appears to be an individual using the app as a personal "smart paper" for weekly goals, time tracking, progress review, income tracking, and AI-assisted reflection.
- Needs confirmation: Persian language support suggests the app is intended for bilingual English/Persian personal use.

## Primary User Workflows

- Choose the current, previous, or future week and record weekly goals/notes.
- Enter daily section goals, notes, and duration minutes.
- Save the week and review total planned/tracked minutes by category.
- Open summaries to review recent weeks and hide or show empty weeks.
- Unlock Finance with a PIN, set a finance goal, and add/edit/delete income records.
- Open Export, unlock finance, preview aggregate data, download/share a backup or report file, or import a JSON backup.
- Build an Android local-data version that uses browser/device storage instead of the backend API.

## Major Implemented Capabilities

- Django REST-style JSON endpoints for planner weeks, week summaries, export/import, finance unlock, finance overview, and income entry edits.
- SQLite persistence through Django models and migrations.
- Session-based finance unlock using Django sessions and a configured password hash.
- Next.js App Router frontend with React client components.
- API abstraction that switches between backend API mode and local storage mode with `NEXT_PUBLIC_DATA_MODE=local`.
- Tailwind CSS-based responsive UI with dark visual styling in the current screens.
- Capacitor Android shell configuration for static-export local mode.

## Explicit Non-Claims

- No multi-user account system is implemented.
- No background jobs are implemented.
- No production infrastructure beyond Docker/Docker Compose configuration was found.
- No committed frontend automated test suite was found.
