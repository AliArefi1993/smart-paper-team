# Smart Paper Status

Last updated: 2026-10-09.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- [Finance session expiry fix](tasks/2026-10-09-finance-session-expiry.md) passed Docker lint/TypeScript/all 66 tests/local-data build, synthetic production browser QA and Designer/Security review. Exact-source Android 2026.10.11/code 28 release is underway; no migration or backend change. Native lifecycle/TalkBack remains unverified.

- [Privacy/local-data assessment](docs/privacy-local-data-review.md) completed at frontend `38f19c1` on 2026-10-09: no high/critical finding established in bounded source/configuration review. Prioritized follow-ups are finance expiry display, explicit Android backup policy and reminder-preview disclosure. No app behavior changed; device/runtime evidence remains unverified.

- Hosted stable-build workflow at frontend `625cfe0` passed a protected signing run after explicit maintainer approval in chat. Run `37905792035` built source `625cfe02204191269459093fdfa66aa3755bba62`; independent verification accepted its downloaded APK signature, version, identity, and checksum. Environment reviewer/main-only/no-bypass protections are verified. Maintainer-reported secrets remain in GitHub and were not read. See the [setup guide](smart-paper-front/.github/STABLE-BUILDS.md). Publication remains a separate team tag workflow.

- Latest published release: [Android 2026.10.10](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.10), code 27. Hosted frontend source `38f19c1a6a151fce04a02c951a06dab6ae9a1f76`, signing, Security review, publisher and anonymous public APK download/checksum verification passed. No application behavior or data migration changed. See the [release task](tasks/2026-10-09-hosted-signed-release.md) and [release record](releases/smart-paper-v2026.10.10.md).

- Maintainer standing authorization dated 2026-10-09 permits the agent-operated release flow without per-run user permission requests during the pre-user phase. Lead acceptance, release go/no-go, technical gates, and GitHub environment protections remain required. Revisit when real users start using the app or the maintainer revokes authorization. See [decision D-011](docs/decisions.md).

- User-requested [stable release pipeline check](tasks/2026-10-09-release-pipeline-check.md) passed: hosted frontend `fada7d8`, fresh stable APK, Security review, tag publisher and public download/checksum. Android 2026.10.9/code 26 is published; application behavior remains as shipped in 2026.10.8.

- [Secret-free frontend CI, isolated verification APKs, and hosted stable signing](tasks/2026-10-07-github-actions-ci-android-builds.md) are live. Frontend `625cfe0` passed automatic verification and the protected stable signing run; a separate failing-test branch confirmed the gate. The latest released revision is frontend `38f19c1`. Existing team publication remains separate.

- Android/local-data is the primary product; backend feature work is paused. The frontend now uses deliberate copy, file-share, and manual-selection paths for AI reports. See [2026.10.9 release record](releases/smart-paper-v2026.10.9.md) and [implementation task](tasks/2026-10-07-ai-report-chatgpt-handoff.md).
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
- Latest Android release: `versionCode 27`, `versionName 2026.10.10`, using the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Checks

Frontend `625cfe0` passes hosted lint, TypeScript, all 57 tests, local-data production build, Android assembly, APK identity/signature/version/assets/provenance checks, cache save and verification artifact upload. The separate failing-test branch confirmed downstream build/upload skips and zero artifacts. Independent CI verification-archive download/extraction, fork/cancellation/cache-hit runs, and account-specific billing usage remain unverified. Hosted stable run [`37905792035`](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37905792035) signed source `625cfe02204191269459093fdfa66aa3755bba62` after explicit chat approval; APK artifact `11610804520` was downloaded and independently verified. APK SHA-256 is `f7577028a381ecab9b16f956c75035151231ef3f028c950cae3521ad508f0a79`; stable certificate SHA-256 is `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5`. The APK is versionCode 26/versionName 2026.10.9, app ID `com.aliarefi.smartpaper`, non-debuggable, with 136 verified web assets. Earlier frontend `efc027e` passed Docker lint, TypeScript and all 57 tests. Independent review found no unresolved blockers. Bilingual studio checks and production EN/FA Light/Dark review passed for the recorded cases. Backend remains `68c789b`; prior 33-test/no-migration evidence reused.

Hosted Android `2026.10.10` code 27 passed automatic verification CI [37920967920](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920967920) and protected stable build [37920986616](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920986616) at frontend source `38f19c1a6a151fce04a02c951a06dab6ae9a1f76`. Security independently verified the downloaded APK signature (v2/v3, one pinned stable signer), app/version/non-debug status, checksum, and provenance. The public [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.10) was published by [run 37922107371](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37922107371). Anonymous asset `624735317` download matches the committed APK: 4,469,135 bytes and SHA-256 `e1c3946eb8a9150c9de648992a1353d38345faf6b9022c2adbb30fccc3269c46`. Final artifact ID is `11612476619`; candidate artifact ID is `11612581391`. The release record includes the original provenance JSON.

Stable-signed Android `2026.10.9` code 26 build passed; certificate and version were verified, and all 136 exported files byte-match APK assets. The public, non-draft GitHub release asset matches the committed APK size (4,415,512 bytes) and SHA-256 (`5cc4ea722748a505ca39a4e37ed2bb4059003d3cab9e3d39e5cd122b69688d94`). npm install reported 21 advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed. Physical Android clipboard/chooser/recipient delivery, TalkBack and the broader upgrade/restore data-safety matrix remain unverified follow-ups. See [2026.10.9 release](releases/smart-paper-v2026.10.9.md).

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- Frontend secret-free CI and hosted stable signing/environment protection are verified. Broad frontend integration coverage, backend lint and backend type-check configuration remain absent; fork/cancellation/cache-hit, physical-device, and account-usage checks remain recorded follow-ups.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Idea Space capture, editing, branching, keyboard behavior, backup/restore, and upgrade still need physical Android checks.
- Production environment and deployment documentation remain incomplete for any future hosted backend.
- Old `node_modules-blocked-*` directories in the frontend need a repository-hygiene decision.
- Local finance data is not encrypted; its client-side PIN is a screen lock only. Finance expiry UI is fixed in the validated release candidate (bounded polling/resume checks and stale-result guards); Android backup is enabled without explicit extraction rules and reminders include event titles. [Privacy assessment](docs/privacy-local-data-review.md) records severities and bounded fixes; actual backup/notification behavior remains untested.
- The 2026.10.9 `npm ci` output reported 21 dependency advisories; this is not a clean audit, and prior static Android applicability assessments remain documented in release records.

## Context Pointers

- Product contract: `PRODUCT.md`
- Short feature summary: `feature.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
