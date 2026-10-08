# Smart Paper Product

Smart Paper is a personal weekly planning, progress tracking, finance tracking, and data export application. Its primary release target is a downloadable Android APK that stores each person's data on their own phone.

The current validated release candidate targets Android `2026.10.8` / versionCode 25 (local-data mode); see the [release record](releases/smart-paper-v2026.10.8.md) for source revision and validation. Product and design priorities are phone use in English and Persian, preserving local records, and reliable existing flows. Browser and Storybook checks support Android work; native Android behavior requires separate evidence. The Django/hosted-web path is secondary and paused until needed.

## What It Currently Does

- Provides a Saturday-to-Friday weekly planner.
- Tracks a weekly goal and weekly note.
- Tracks seven day plans per week.
- Lets the user minimize individual day details or all seven days while keeping summaries visible; reopening preserves fields. Android/local-data Planner edits save automatically; Django mode retains manual week saving.
- Splits each day into configurable planner sections.
- Shows section summaries before editing; one section opens at a time with its duration, goal, and note. Long writing expands inline or opens a full writing view, with automatic week persistence in Android/local-data mode and an explicit save action in Django mode.
- Provides 10 stable planner section slots; the first four default to Main, Second, Learning, and Exercise, while slots 5-10 are hidden until activated.
- Lets the user rename planner sections and activate/hide section slots from Settings, then explicitly save the validated batch from the header or end of the full form.
- Records minutes, goals, and notes for each day section.
- Records day-level timed schedule entries such as `18:00-19:00 Meeting`.
- Shows week totals by active section and total visible minutes.
- Shows multi-week summaries with filters for empty weeks and selectable month ranges.
- Tracks a finance goal and income entries, with confirmation before deleting income and larger named save/add controls.
- Protects finance data behind a PIN/session unlock when using the Django backend.
- Exports planner and finance data as JSON, CSV, Excel, and Markdown for AI review.
- Lets Android users create a separate Markdown AI report with selected fields and an inclusive date range, review its text, copy it deliberately to the device clipboard or share its file through the device chooser. Manual text selection remains available when clipboard access fails. The report explains its scope and asks the receiving AI for a grounded first response. Finance fields start off and require the finance unlock.
- Imports Smart Paper JSON backups in merge/upsert or replace mode. Local Merge preserves unrelated saved week templates and updates matching IDs from the incoming backup; an empty or omitted template collection deletes nothing. Replace uses only the incoming collection.
- Gives Android JSON backups dated filenames and shows the chosen file's week and income counts before replace confirmation.
- Supports English and Persian UI text.
- Offers a saved Light/Dark appearance choice across Planner, Idea Space, Timer, Summaries, Finance, Export/AI report, and Settings, using shared green-toned dark roles including Planner.
- Supports a local browser-storage mode for Android/static export builds.
- Supports opt-in Android local morning plan notifications.
- Provides a focus/rest timer with editable session lengths, an hourglass display, and a countdown that resumes accurately after app navigation or suspension.
- Provides a separate Android Idea Space for freeform notes with expandable optional writing sparks, daily rediscovery, branching, editing, search, and local JSON backup/restore. Dirty writing is protected before Edit, Branch or Cancel; one contextual new/edit/branch draft recovers when device storage succeeds. Missing or changed source notes retain writing and offer explicit Keep as new thought. Drafts remain unfinished writing outside backups/reports; saving a note is deliberate. Storage failures distinguish draft recovery, note saving and cleanup, with retry and session-only fallback when storage fails.

## Likely Target Users

- The intended use is one person's planner, ideas, and finance record per device, distributed as a signed Android APK.
- Persian language support is intended for bilingual English/Persian personal use.
- Backup and restore safety is a release priority because phone data is stored locally.

## Primary User Workflows

- Choose the current, previous, or future week and record weekly goals/notes.
- Enter daily section goals, notes, and duration minutes.
- Add, edit, or delete exact-time day schedule entries.
- Edit the Android plan with automatic device saving and review planned/tracked minutes by category. Failed writes retain visible edits and offer Retry; Django mode retains Save week.
- Open Settings to rename section slots, choose active sections, and enable a morning plan notification.
- Open Focus Timer to run focus and rest sessions, pause or reset them, and explicitly start each next phase.
- Open Idea Space to capture an unfinished thought, use an optional spark, or grow a thought that returns from earlier writing.
- Open summaries to review recent weeks and hide or show empty weeks.
- Unlock Finance with a PIN screen lock on Android, set a finance goal, and add/edit/delete income records.
- Open Export to create or restore a JSON backup and export records; use the separate selective AI report flow to preview and share chosen fields. Report finance fields start off and require unlock; the full Markdown export button is backend-mode only.
- Choose report fields and dates, then copy the report and manually open ChatGPT to paste, review and send; file sharing through the device chooser remains available when a compatible recipient appears. Smart Paper does not open ChatGPT, attach or send automatically. If source data changed, review the refreshed preview before choosing a transfer action again. Finance authorization is checked on every Copy, Share and manual-selection action.
- Use the installed Android app offline with local device storage; preserve records across upgrades and transfer them with JSON backup/restore.

## Major Implemented Capabilities

- Django REST-style JSON endpoints for planner weeks, week summaries, export/import, finance unlock, finance overview, and income entry edits.
- SQLite persistence through Django models and migrations.
- Day schedule entries are stored separately from section minutes so exact-time plans do not replace category tracking.
- Session-based finance unlock using Django sessions and a configured password hash.
- Next.js App Router frontend with React client components.
- API abstraction that switches between backend API mode and local storage mode with `NEXT_PUBLIC_DATA_MODE=local`.
- Tailwind CSS-based responsive UI with light paper-and-teal and optional app-wide dark appearances.
- Capacitor Android shell configuration for static-export local mode.
- Capacitor local notifications for opt-in Android morning plan reminders.

## Explicit Non-Claims

- No multi-user account system is implemented.
- No per-user planner settings are implemented; section settings are global for the personal app.
- No background jobs are implemented.
- The focus timer does not add minutes to planner totals or issue an Android background completion notification.
- No production infrastructure beyond Docker/Docker Compose configuration was found.
- No broad frontend integration or end-to-end test suite is implemented.
- The Android PIN is only a screen lock; local finance data and JSON backups are not encrypted.
- Idea Space currently stores notes only in Android/local-data mode; the Django backend does not store them.
