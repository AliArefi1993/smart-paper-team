# Smart Paper Status

Last updated: 2026-10-10.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- [Explicit Android backup policy](tasks/2026-10-10-android-backup-policy.md) validated for Android `2026.10.14`/code 31 at frontend `d899f2c`: cloud backup excluded, supported device transfer permitted, Finance unlock kept only in runtime memory, and EN/FA recovery disclosure added. Docker lint/TypeScript/70 tests/local-data build, Designer/studio and bounded browser QA passed. Exact-source CI, protected signing and independent compiled APK/Security review passed; publication pending. Actual OS/OEM migration remains unverified.

- [Phone landscape review](tasks/2026-10-09-phone-landscape-layout.md) shipped in Android 2026.10.13/code 30. The Planner event editor now stays inside short viewports and scrolls internally; bilingual browser QA, seven-route layout review, lint, TypeScript, 66 tests, production build, exact-source CI, protected signing, independent Security artifact verification and anonymous public APK checksum verification passed. Native rotation/keyboard/safe-area/TalkBack remain follow-ups; no additional visible clipping was reproduced.

- [Planner bottom-area simplification](tasks/2026-10-09-planner-bottom-area.md) shipped in Android 2026.10.12/code 29 after exact-source CI, protected signing, independent Security review and anonymous public checksum verification. Local mode uses inline save status/Retry and in-flow day navigation; Django manual-save behavior is unchanged. Native keyboard, rotation and TalkBack remain unverified.

- [Finance session expiry fix](tasks/2026-10-09-finance-session-expiry.md) shipped in Android 2026.10.11/code 28 after exact-source CI, protected signing, independent Security review and public checksum verification. No migration or backend change. Native lifecycle/TalkBack remains unverified.

- [Privacy/local-data assessment](docs/privacy-local-data-review.md) completed against frontend `38f19c1` on 2026-10-09: no high/critical finding established in bounded source/configuration review. Finance expiry display was fixed in 2026.10.11; explicit Android backup policy and reminder-preview disclosure remain follow-ups. The assessment itself changed no app behavior; device/runtime evidence remains unverified.

- Hosted stable-build workflow at frontend `625cfe0` passed a protected signing run after explicit maintainer approval in chat. Run `37905792035` built source `625cfe02204191269459093fdfa66aa3755bba62`; independent verification accepted its downloaded APK signature, version, identity, and checksum. Environment reviewer/main-only/no-bypass protections are verified. Maintainer-reported secrets remain in GitHub and were not read. See the [setup guide](smart-paper-front/.github/STABLE-BUILDS.md). Publication remains a separate team tag workflow.

- Latest published release: [Android 2026.10.13](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.13), code 30. Frontend source `deaad89e3083d270fa74d7988c2ab99162cab674`; exact-source CI, protected signing, independent artifact review, publisher and anonymous public APK verification passed. APK SHA-256 `3189b69e5e79f6afd50dafbde7852f3fd4f925f77e23769ea22bc6c4a041d1d3`. Backend unchanged; see the [release record](releases/smart-paper-v2026.10.13.md).

- Maintainer standing authorization dated 2026-10-09 permits the agent-operated release flow without per-run user permission requests during the pre-user phase. Lead acceptance, release go/no-go, technical gates, and GitHub environment protections remain required. Revisit when real users start using the app or the maintainer revokes authorization. See [decision D-011](docs/decisions.md).

- User-requested [stable release pipeline check](tasks/2026-10-09-release-pipeline-check.md) passed: hosted frontend `fada7d8`, fresh stable APK, Security review, tag publisher and public download/checksum. Android 2026.10.9/code 26 is published; application behavior remains as shipped in 2026.10.8.

- [Secret-free frontend CI, isolated verification APKs, and hosted stable signing](tasks/2026-10-07-github-actions-ci-android-builds.md) are live. Frontend `625cfe0` passed automatic verification and the protected stable signing run; a separate failing-test branch confirmed the gate. The latest released revision is frontend `deaad89`. Existing team publication remains separate.

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
- Latest Android release: `versionCode 30`, `versionName 2026.10.13`, using the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Checks

Frontend `d899f2c` passed Docker lint, TypeScript, 70 tests and local-data production build. Exact-source automatic CI [38078425679](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078425679) and protected hosted build [38078437740](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078437740) passed. Independent Security verified the code 31 APK's pinned v2/v3 signer, identity/version/non-debug status, checksum/size/provenance/source/run, compiled backup resources and memory-only Finance authorization. The final artifact ZIP was locally rehashed and extracted bytes matched; candidate archive digest is metadata-only and hosted 137-web-asset/unsigned-to-signed comparisons were not independently repeated. [Bilingual QA](design/2026-10-10-android-backup-policy-qa.md) passed navigation, reload/relock, retained synthetic income and Light/Dark phone copy checks. APK is 4,473,495 bytes, SHA-256 `24caacb6ead7bc953b45b2d4716bd39df9146093c664a38e3f5fb1dcba63c82b`; publication/public checksum verification pending. Actual OS/OEM backup/transfer and native checks remain follow-ups.

Frontend `625cfe0` passes hosted lint, TypeScript, all 57 tests, local-data production build, Android assembly, APK identity/signature/version/assets/provenance checks, cache save and verification artifact upload. The separate failing-test branch confirmed downstream build/upload skips and zero artifacts. Independent CI verification-archive download/extraction, fork/cancellation/cache-hit runs, and account-specific billing usage remain unverified. Hosted stable run [`37905792035`](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37905792035) signed source `625cfe02204191269459093fdfa66aa3755bba62` after explicit chat approval; APK artifact `11610804520` was downloaded and independently verified. APK SHA-256 is `f7577028a381ecab9b16f956c75035151231ef3f028c950cae3521ad508f0a79`; stable certificate SHA-256 is `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5`. The APK is versionCode 26/versionName 2026.10.9, app ID `com.aliarefi.smartpaper`, non-debuggable, with 136 verified web assets. Earlier frontend `efc027e` passed Docker lint, TypeScript and all 57 tests. Independent review found no unresolved blockers. Bilingual studio checks and production EN/FA Light/Dark review passed for the recorded cases. Backend remains `68c789b`; prior 33-test/no-migration evidence reused.

Hosted Android `2026.10.12` code 29 passed exact-source automatic CI [37986033565](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37986033565) and protected stable build [38023856839](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38023856839) at frontend source `9419b2dfe0a427f4fa776f6928fda5640740afb7`. The first candidate attempt failed on a transient Maven HTTP 500 downloading `kotlin-compiler-embeddable:2.2.20`; one unchanged-source retry passed. Security accepted the downloaded APK signature (v2/v3, one pinned stable signer), app/version/non-debug status, checksum and provenance. The public [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.12) was published by [publisher run 38027666094](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38027666094). Anonymous asset `627096915` matches the committed APK: 4,469,135 bytes and SHA-256 `28935a9ec432b19bcc5b98fa310972f7c0573c2dc4fb0d8d89fd4da12328a2a8`. Final artifact ID `11660382477`; candidate artifact ID `11659331307`. GitHub API archive digests are recorded in the [release record](releases/smart-paper-v2026.10.12.md); raw ZIP bytes were not retained for local rehash.

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
- Local finance data is not encrypted; its client-side PIN is a screen lock only. Finance expiry UI was fixed in 2026.10.11; frontend `d899f2c` adds runtime-only unlock and explicit cloud exclusion/supported device transfer rules. [Backup policy](docs/android-backup-policy.md) records legacy limits and unverified OS/OEM behavior. Reminders still include event titles; [privacy assessment](docs/privacy-local-data-review.md) records remaining notification/exposure scopes.
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
