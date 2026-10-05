# Smart Paper Status

Last updated: 2026-10-05.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Android-first APK validation remains active; `2026.09.8` was released at maintainer direction before physical-phone checks. See `tasks/2026-09-30-ai-report-handoff.md`.
- Latest release: `smart-paper-v2026.10.2` (2026-10-05), Calm Planner editing.
- Latest team tag: `smart-paper-v2026.10.2`.
- Local browser QA covered report filtering, finance opt-in, backup download, Persian controls, and sharing fallback. Next priority is Android-runtime QA of install/upgrade, native sharing, restore, offline behavior, notifications, and layout. Backend feature work is paused; see `ROADMAP.md` and decision D-007.
- Idea Space is included in the `2026.10.1` Android release: local notes, writing sparks, daily rediscovery, branches, search, and JSON backup support. Automated and browser checks passed; physical Android QA remains.
- Product and Designer have repo skills and a `design/` workspace for briefs, local screen stories, implementation handoffs, and bilingual Android review. Figma remains an optional reference.
- The first design pilot refreshed Idea Space in frontend revision `820692a`: editable English/Persian Figma frames and a writing-first layout with expandable sparks. Local-data lint, type check, 23 tests, and build passed; 390px browser review passed in both languages. Physical Android review remains.
- Shipped-screen coverage includes a route/state inventory, source-backed flow briefs for all seven routes, and a local React/Storybook design studio with 32 bilingual route/state stories. Designer and QA approved these as structural coverage only on 2026-10-03. The 2026-10-04 refinement improves route navigation, contextual sheets, timer states, control sizing, and example copy; Planner stories now show distinct minutes, goal, and note controls for each active section in English and Persian. Fidelity and complete flow handoffs remain unapproved until running-app comparison and re-review. The earlier atlas and Planner Figma drafts have not been visually checked; Figma Starter tool limits block further screenshots. Designer-ready local stories and a handoff are required before future user-visible frontend implementation. See `design/2026-10-04-baseline-story-refinement.md` and `tasks/2026-10-01-full-app-design-coverage.md`.
- The [Calm Planner design](design/2026-10-04-planner-calm-flow.md) is included in `2026.10.2`: compact section summaries, scroll placement, growing writing fields, full writing view, and safer save feedback. Docker lint/type/tests/build and 390px EN/FA browser review passed. Physical Android and screen reader review remain; see `releases/smart-paper-v2026.10.2.md`.

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
- Latest Android release: `versionCode 19`, `versionName 2026.10.2`, using the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Release Checks

The `smart-paper-v2026.10.2` build passed on 2026-10-05:

- Backend 33 tests and migration check: passed; backend source unchanged.
- Frontend lint, TypeScript, 23 tests, and local-data production build: passed in Docker.
- Stable-signed Android APK build, signature, and versionCode 19/versionName 2026.10.2: passed.
- 390px Planner browser QA in English and Persian: passed.

See `releases/smart-paper-v2026.10.2.md` for artifact checksum and scope. Physical install, upgrade, native backup restore and sharing, notes, timer, notifications, and full bilingual layout remain unverified; the maintainer directed release before these checks.

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
