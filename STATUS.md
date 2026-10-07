# Smart Paper Status

Last updated: 2026-10-07.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Android/local-data is the primary product; backend feature work is paused. Android `2026.10.6` / frontend `37f3d2a` closes the approved audit findings: Ideas writing protection/context recovery, Settings end-of-form Save and Finance deletion confirmation. See [implementation task](tasks/2026-10-06-audit-followups.md).
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
- Two persistence modes: Django/SQLite API mode and browser `localStorage` mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- The Android APK packages `smart-paper-front/` in local-data mode; it does not require Django.
- Capacitor Android app with native file sharing and opt-in local morning plan notifications.
- Dedicated focus/rest timer with configurable lengths, hourglass progress, and deadline recovery after navigation or suspension; no planner-minute logging or background completion alarm.
- Local-data Idea Space with freeform notes, optional writing prompts, daily return of an older thought, branches, and search.

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.
- Frontend routes: planner, ideas, timer, finance, summaries, export/import, and settings.
- Latest Android release: `versionCode 23`, `versionName 2026.10.6`, using the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Checks

Frontend `37f3d2a` passes Docker lint, TypeScript, all 37 tests and local-data production build. Independent review found no unresolved blockers. Studio typecheck/build and bounded EN/FA structural review passed. Backend remains `68c789b`; prior 33-test/no-migration evidence reused.

Stable-signed APK certificate/version checks and all136 packaged asset comparisons passed. Bounded desktop Chrome Ideas/Settings persistence and EN/FA Finance cancellation checks passed; phone geometry/fault injection remain unexecuted. Release and runtime evidence are recorded in [2026.10.6 release](releases/smart-paper-v2026.10.6.md) and [QA](design/2026-10-06-audit-followups-qa.md). Physical Android/TalkBack remains unverified. Failed writing survives SPA return in session memory, but cannot be guaranteed after reload/process termination when device storage fails.

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
