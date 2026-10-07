# Smart Paper Data Model

This is a navigation guide, not a replacement for code. Django models and committed migrations in `smart-paper/` are authoritative. Browser-local mode maintains a compatible representation in `smart-paper-front/src/lib/local-store.ts`.

## Planner Relationships

```text
Week 1 ── many DayPlan (the product normally maintains seven)
DayPlan 1 ── many DayScheduleEntry

WeekTemplate          independent reusable full-week snapshot
PlannerSectionConfig  independent global slot configuration
```

- `Week`: unique `start_date`, weekly goal/note, timestamps. Product logic uses Saturday start dates; the model does not enforce the weekday.
- `DayPlan`: belongs to a week; unique per week/date; stores weekday index, day note, and duration/goal/note fields for ten stable section slots.
- `DayScheduleEntry`: UUID primary key; belongs to a day; stores start/end minutes, title, optional note and section ID, and display order.
- `PlannerSectionConfig`: one global record per stable `slot_1` through `slot_10`; stores label, active state, and unique position.
- `WeekTemplate`: unique name plus weekly goal/note and a JSON snapshot of all seven days. Applying a template creates fresh schedule-entry IDs.

Deleting a `Week` cascades to its days and schedule entries. Section configurations and templates are independent of saved weeks.

## Finance Relationships

The finance models are independent records rather than user-owned data because the current product is single-user:

- `FinanceState`: singleton-style finance goal amount.
- `IncomeEntry`: positive amount, optional note, received date, and creation timestamp.
- `FinanceUnlockAttempt`: per-client failed-attempt count and optional lock expiry used for PIN throttling.

The finance session unlock gates finance and export/import endpoints; it is not a user-account model.

## Dual Persistence

- Backend mode persists Django models in SQLite and exposes JSON endpoints.
- Local-data mode persists planner, template, section, finance, settings, and Idea Space records in browser `localStorage` for static/Android use. Idea Space currently has no Django model.
- Android is the primary release target. Django storage is paused unless a server or sync use case is chosen.
- Cross-stack data changes must review Django models/migrations, serializers/views, frontend types and adapters, local-store normalization, and import/export compatibility.

## Idea Draft Recovery

- `src/lib/idea-draft.ts` uses the existing `smart-paper.local.idea-draft` key for one unfinished new/edit/branch draft, including its source snapshot and optional commit receipt. It is separate from saved Idea Space records.
- The `smart-paper.idea-draft.v1` prefix plus newline identifies a version-1 JSON envelope. Unmarked legacy text, including JSON-like prose and checklists, remains a new-note draft verbatim. Invalid marked envelopes fail without overwriting stored writing.
- Receipts reconcile successful note writes after cleanup failure, preventing duplicate publication on retry/recovery. Missing sources or changed edit baselines block silent mutation; explicit Keep as new thought saves independently. Storage failures may retain session memory, but cannot guarantee recovery after reload/process termination.

## Backup Contract

- Local-data JSON backup schema: `schema_version: 5`, adding `idea_notes` with stable IDs, body, creation/update timestamps, and an optional parent ID. Older local backups remain importable; replace with an older backup clears Idea Space notes, while merge preserves existing notes.
- Unfinished drafts, source snapshots and commit receipts are excluded from backups/reports; contextual recovery does not change local schema 5 or saved-note fields.
- Django JSON backup schema remains `schema_version: 4`.
- Backend contract: `smart-paper/planner/export_views.py`.
- Local-data contract: `smart-paper-front/src/lib/local-store.ts` and `smart-paper-front/src/lib/export-format.ts`.
- Import supports merge/upsert and destructive replace behavior. Treat replace-mode changes as data-safety work.
- Android JSON backups are not encrypted. Save and verify a copy outside the app.

## Migration Rules

- Add Django migrations for model changes; do not rewrite applied migrations without explicit authorization.
- Run backend tests and `python manage.py makemigrations --check --dry-run` after schema changes.
- Preserve Saturday-based weeks and stable planner slot IDs unless the product decision changes.
- Update this file only when entities, relationships, ownership, or compatibility rules change.
