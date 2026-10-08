# Smart Paper Status

Last updated: 2026-10-08.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Latest published release: [Android 2026.10.6](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.6), verified non-draft APK with matching size/SHA-256. Validated stable-signed candidate `2026.10.7` / code24 is ready for coordinated publication. Android/local-data is the primary product; backend feature work is paused. Frontend `036d2c5` preserves saved templates absent from a Merge backup while keeping Replace behavior. See [release record](releases/smart-paper-v2026.10.7.md) and [implementation task](tasks/2026-10-08-template-merge-safety.md).
- Planner local autosave, green Light/Dark surfaces and day minimization remain shipped. Ideas auto-recovers unfinished writing; publishing a saved thought remains deliberate.
- Product/Designer/personal systems/QA assessment and editable bilingual studio handoffs guide changes; structural stories do not certify native Android behavior.
- Standing maintainer direction: publish stable-signed Android releases after validated user-visible changes. Physical keyboard/lifecycle, upgrade/data retention, native notifications/sharing and TalkBack remain recorded follow-ups, not publication gates.

## Repository State

Run `scripts/project-context.sh` for current branches, revisions, working-tree changes, and the latest local release tag.

## Implemented Product

- Single-user personal planner with Saturday-to-Friday weeks, weekly goals/notes, day notes, and ten stable configurable section slots.
- Exact-time day schedule entries and reusable full-week templates.
- Multi-week summaries and English/Persian UI.
- Finance goal and income tracking; Django mode protects finance and export/import with a throttled shared PIN/session unlock.
- Local JSON backup/import (`schema_version: 5`, including Idea Space notes) plus CSV, XLSX, and Markdown exports; older backups remain importable. Django backup remains schema 4.
- Local JSON Merge preserves unrelated saved week templates when incoming templates are empty or omitted; matching IDs use the incoming record. Replace uses only the incoming collection.
- Two persistence modes: Django/SQLite API mode and browser `localStorage` mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- The Android APK packages `smart-paper-front/` in local-data mode; it does not require Django.
- Capacitor Android app with native file sharing and opt-in local morning plan notifications.
- Dedicated focus/rest timer with configurable lengths, hourglass progress, and deadline recovery after navigation or suspension; no planner-minute logging or background completion alarm.
- Local-data Idea Space with freeform notes, optional writing prompts, daily return of an older thought, branches, and search.

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.
- Frontend routes: planner, ideas, timer, finance, summaries, export/import, and settings.
- Latest Android release: `versionCode 23`, `versionName 2026.10.6`; validated next candidate is code24/name2026.10.7 with the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Checks

Frontend `036d2c5` passes Docker lint, TypeScript and all 52 tests. Independent review found no unresolved blockers. Studio typecheck/build and bounded EN/FA structural review passed with the documented environment limitation. Backend remains `68c789b`; prior 33-test/no-migration evidence reused.

Stable-signed Android `2026.10.7` code24 candidate build passed; certificate and version were verified, and all 136 exported files byte-match APK assets. Team tag and GitHub publication verification remain pending. npm install reported 21 advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed. Template Merge adapter and five-key rollback coverage passed. Physical Android/TalkBack and the broader upgrade/restore data-safety matrix remain unverified follow-ups. See [2026.10.7 release](releases/smart-paper-v2026.10.7.md).

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- No CI, broad frontend integration suite, backend lint, or backend type-check configuration is present.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Idea Space capture, editing, branching, keyboard behavior, backup/restore, and upgrade still need physical Android checks.
- Production environment and deployment documentation remain incomplete for any future hosted backend.
- Old `node_modules-blocked-*` directories in the frontend need a repository-hygiene decision.
- Local finance data is not encrypted; its client-side PIN is a screen lock only.
- The 2026.10.7 `npm ci` output reported 21 dependency advisories; this is not a clean audit, and prior static Android applicability assessments remain documented in earlier release records.

## Context Pointers

- Product contract: `PRODUCT.md`
- Short feature summary: `feature.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
