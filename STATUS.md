# Smart Paper Status

Last updated: 2026-10-16.

This is a present-state snapshot, not a changelog. Shipped history and validation details live in `releases/`; implementation history lives in each repository's Git log.

## Current Focus

- Growth & Community role setup is tracked in [the team task](tasks/2026-10-16-growth-community-agent.md), with [onboarding](docs/growth-community.md) and a repo-local workflow. Audience, channels, budget, and pilot remain unselected; no outreach or campaign has started. Revisit the existing pre-user release authorization when actual users begin.

- [Safe Merge correction](tasks/2026-10-16-safe-merge.md) shipped in Android 2026.10.29/code46 at frontend `40c3516c7ccd4b3ed056b9227591ca35152fef63`. The reported export → add Thursday day note → Merge older backup loss is reproduced and fixed: keep populated device values, fill blanks/add missing records and disclose unapplied conflicts. Product/Designer actual-app acceptance, independent source/unsigned/final artifact reviews, exact-source CI (194 unit/39 browser checks), protected signing and anonymous public APK verification passed. No user-device data was accessed; an export predating the overwritten note cannot recover it. Physical chooser, upgrade/data retention and TalkBack remain unverified.

- [Import completion feedback](tasks/2026-10-15-import-feedback.md) shipped in Android 2026.10.28/code45 from frontend `baf05da37794e6c9314d9112d3c9a0c24e5fbe4b`. Contextual receipts identify file/mode and incoming collections; saved archived/future weeks are reachable through Planner. Product/Designer, 179 unit tests, 36 browser checks, exact-source CI, protected signing and independent source/unsigned/final artifact reviews passed. [Publication](releases/smart-paper-v2026.10.28.md) and anonymous byte/hash verification passed; physical chooser/TalkBack remain unverified.

- [Android Back navigation](tasks/2026-10-14-android-back-navigation.md) shipped in Android 2026.10.27/code44 from frontend `6ec0eee66add646ee64f2fe335e9f044171a4531`. Exact-source CI, protected signing, independent final artifact review, publication and anonymous APK verification passed. Physical keyboard, chooser, predictive/gesture Back and TalkBack remain unverified.

- [Empty-day notification correction](tasks/2026-10-14-empty-day-notification.md) shipped in Android 2026.10.26/code43 from frontend `aa33f7942364185b5421fbdc65ed5944f539eda2`. Empty target-day timed-event lists cancel the pending reminder and schedule nothing; saved choices and populated-event reminders remain intact. Exact-source CI, protected signing, independent final artifact review, publication and anonymous byte/hash verification passed. Physical notification delivery and TalkBack remain unverified.

- [Export unlock locale correction](tasks/2026-10-14-export-unlock-locale.md) shipped in Android 2026.10.25/code42 from frontend `9aee030bbbf312aff74fdb5caa82033585726906`. Exact-source CI, protected signing, independent final artifact Security review and anonymous public byte/hash verification passed. APK SHA-256 is `2cc65b2695afc6fe78f02f594a690efa2281dbf7001ba21a89177235719a76cb`. The change refreshes the visible EN/FA success status while retaining Finance authorization. Physical Android/TalkBack checks remain open.

- [Desktop backlog batch](tasks/2026-10-13-desktop-backlog-batch.md) shipped in Android 2026.10.24/code41 from frontend `4c9bfad4f26d1165e18894eef096ee405f6f21f5`. Exact-source CI, protected signing, independent candidate/final APK Security review and anonymous public byte/hash verification passed. The committed APK SHA-256 is `276e174cff438934f429cf5cc2c982a37c95ab7daf85bc4366a6be23fd001d6d`. Chrome 155 ran 10/10 browser flows and three small/large synthetic offline comparisons with full fixture integrity. Physical Android/TalkBack checks remain open.

- [Local reporting and diagnostics](tasks/2026-10-07-local-feedback-diagnostics.md) shipped in Android 2026.10.23/code40 at frontend `b5d0b6ddbb1807d3783a90bd119c37b00bb64029`: independent disclosed local recording defaults ON, preserved OFF choices, inspect/delete, unchecked per-report evidence and deliberate reviewed email/copy. Product/Designer, Docker 158 tests, bounded browser QA, independent source/candidate/signed APK reviews and exact-source CI/protected signing passed. Publisher [38449040776](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38449040776) succeeded; public APK asset `637924903` matches the committed 4,409,696-byte artifact (SHA-256 `a3d49e0e08c916f61260a4d4cfc869c429076780f89f6ce931c14d738dfa17c6`). Physical email delivery, lifecycle and TalkBack remain unverified.

- Idea Space origin/branch reading shipped in Android 2026.10.22/code39 at frontend `c489284d9483d6d2a05004d429ee50b08ca9c186`. Exact-source CI, protected signing, independent final artifact Security and anonymous public APK byte/hash verification passed; see the [release record](releases/smart-paper-v2026.10.22.md). Clarity adoption for Android diagnostics was rejected under D-018; its conditional pilot was not run. Manual QA/discovery/maintenance checkpoints were adopted on 2026-10-13; the [first baseline](tasks/2026-10-13-manual-baseline-checkpoint.md) recorded 55 focused passing tests and selected browser save/draft/export checks. Persian Idea Space recovery status was corrected in Android 2026.10.24; browser import coverage and synthetic larger-data performance were also completed in the desktop batch. Native coverage remains unexecuted. A Samsung A15 on Android 16 is available, but its USB cable did not charge the phone and the Mac USB host inventory showed no attached device. The Mac was using the phone hotspot; no alternate Wi-Fi was reported. Native checks have not run.

- Android `2026.10.22` / code39 is published from frontend `c489284d9483d6d2a05004d429ee50b08ca9c186`. Release publisher run `38389716149` succeeded. Public asset `636806775` is 4,393,408 bytes with SHA-256 `7d1d4091b4e339f775514f7ed4058463b0ccf08c40d054676aeaf090ab18cd89`; anonymous download matches the committed APK byte-for-byte. The [release record](releases/smart-paper-v2026.10.22.md) includes CI, protected signing, artifact Security and publication evidence.

- Android `2026.10.20` / code37 is published from frontend `4f62d32f493867625ff828fd765b8a1244372036`. Exact-source CI `38308396886`, protected stable build `38308970779`, independent final APK Security review and publisher run `38310395171` passed. Public asset `635037976` is 4,381,120 bytes with SHA-256 `784d4f232c0fc0c5bc8dcad1c9857b528aa71ccedb25e15dae5c66289d956f79`; anonymous download matches the committed APK byte-for-byte. The Planner viewed-week AI shortcut is shipped. All 110 tests, lint/types/local build, source Security, final Designer and synthetic browser failure/range/privacy checks passed. Native delivery, lifecycle, upgrade/data retention and TalkBack remain unverified.

- [Five sequential confidence tasks](tasks/2026-10-11-five-task-release-batch.md) completed: independent XLSX ZIP/XML, configurable-section visibility/restore, Finance CRUD/session denial, seven-day template lifecycle/backup tests, and accepted [CI/local-test policy](docs/ci-local-test-policy.md). Eleven new focused tests passed; independent test review found no actionable finding. Frontend test commit `2513a2a`; final release source `ea05f16` passed exact-source CI and protected signing. Independent artifact review passed; Android 2026.10.16/code33 is published and its anonymous APK download matches the committed artifact.

- [Natural sand timer redesign](tasks/2026-10-11-timer-natural-sand.md) shipped in Android 2026.10.16/code33 at frontend `ea05f16` (timer commit `6d3d34e`): walnut frame, translucent glass, warm mineral sand and seven falling grains; pause freezes motion and reduced-motion CSS suppresses it. Studio, Docker, browser QA, exact-source CI and independent artifact review passed. Public APK checksum matched the committed artifact; native Android/TalkBack remain unverified.

- [Android launcher icon redesign](tasks/2026-10-11-android-launcher-icon.md) is approved at frontend `99bd2de` and included in coordinated Android 2026.10.16/code33: approved folded paper/check on teal, adaptive/round/legacy resources and Android 13 themed alpha mask. Designer/studio, exact-source CI/protected signing and independent compiled APK review passed. Existing stable package/certificate preserved. Physical launcher rendering and installation/upgrade remain unverified.

- [Timed schedule regression coverage](tasks/2026-10-11-local-schedule-regression.md) adds six local-store tests for persistence, sorting/normalization and serialized JSON Merge/Replace restore with Persian content. Docker Node 24: all 76 tests, lint and TypeScript passed. Storage-level tests only; native interaction remains unverified.

- [Spreadsheet writer upgrade](tasks/2026-10-12-spreadsheet-writer-upgrade.md) shipped in Android 2026.10.17 after source, hosted and independent artifact checks; public APK verification passed. Phone opening/rendering and low-memory behavior remain unverified.

- [Dependency assessment](tasks/2026-10-11-android-dependency-advisories.md) now records frontend `047e4bd`: npm audit reports 0 production findings and 8 full-install findings (5 high, 3 moderate, 0 critical). The production-only scope excludes Android runtime packages; native Capacitor 8.5.1 guards and residual full-install paths are separately reviewed in the [framework task](tasks/2026-10-12-framework-refresh.md). An announced future October 14 disclosure remains unpublished and unverified.

- [Lightweight feedback triage](tasks/2026-10-08-feedback-triage-workflow.md) completed as documentation only: sanitized intake, severity/state rules, duplicate handling, privacy boundaries and closure evidence are in [docs/feedback-triage.md](docs/feedback-triage.md). No app behavior or live reports were involved.

- [Explicit Android backup policy](tasks/2026-10-10-android-backup-policy.md) shipped in Android `2026.10.14`/code 31 at frontend `d899f2c`: cloud backup excluded, supported device transfer permitted, Finance unlock kept only in runtime memory, and EN/FA recovery disclosure added. Docker lint/TypeScript/70 tests/local-data build, Designer/studio and bounded browser QA passed. Exact-source CI, protected signing, independent compiled APK/Security review and public anonymous checksum verification passed. Actual OS/OEM migration remains unverified.

- [Phone landscape review](tasks/2026-10-09-phone-landscape-layout.md) shipped in Android 2026.10.13/code 30. The Planner event editor now stays inside short viewports and scrolls internally; bilingual browser QA, seven-route layout review, lint, TypeScript, 66 tests, production build, exact-source CI, protected signing, independent Security artifact verification and anonymous public APK checksum verification passed. Native rotation/keyboard/safe-area/TalkBack remain follow-ups; no additional visible clipping was reproduced.

- [Planner bottom-area simplification](tasks/2026-10-09-planner-bottom-area.md) shipped in Android 2026.10.12/code 29 after exact-source CI, protected signing, independent Security review and anonymous public checksum verification. Local mode uses inline save status/Retry and in-flow day navigation; Django manual-save behavior is unchanged. Native keyboard, rotation and TalkBack remain unverified.

- [Finance session expiry fix](tasks/2026-10-09-finance-session-expiry.md) shipped in Android 2026.10.11/code 28 after exact-source CI, protected signing, independent Security review and public checksum verification. No migration or backend change. Native lifecycle/TalkBack remains unverified.

- [Privacy/local-data assessment](docs/privacy-local-data-review.md) completed against frontend `38f19c1` on 2026-10-09: no high/critical finding established in bounded source/configuration review. Finance expiry display was fixed in 2026.10.11, and the explicit Android backup policy shipped in 2026.10.14. Actual OS/OEM migration behavior and reminder-preview disclosure remain follow-ups; device/runtime evidence remains unverified.

- Hosted stable-build workflow at frontend `625cfe0` passed a protected signing run after explicit maintainer approval in chat. Run `37905792035` built source `625cfe02204191269459093fdfa66aa3755bba62`; independent verification accepted its downloaded APK signature, version, identity, and checksum. Environment reviewer/main-only/no-bypass protections are verified. Maintainer-reported secrets remain in GitHub and were not read. See the [setup guide](smart-paper-front/.github/STABLE-BUILDS.md). Publication remains a separate team tag workflow.

- Latest published release: [Android 2026.10.29](releases/smart-paper-v2026.10.29.md), code46, frontend `40c3516c7ccd4b3ed056b9227591ca35152fef63`. Publisher run [38863625805](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38863625805) succeeded; public APK asset `646440338` matches the committed artifact byte-for-byte (4,422,272 bytes; SHA-256 `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce`). Backend source unchanged.

- Maintainer standing authorization dated 2026-10-09 permits the agent-operated release flow without per-run user permission requests during the pre-user phase. Lead acceptance, release go/no-go, technical gates, and GitHub environment protections remain required. Revisit when real users start using the app or the maintainer revokes authorization. See [decision D-011](docs/decisions.md).

- User-requested [stable release pipeline check](tasks/2026-10-09-release-pipeline-check.md) passed: hosted frontend `fada7d8`, fresh stable APK, Security review, tag publisher and public download/checksum. Android 2026.10.9/code 26 is published; application behavior remains as shipped in 2026.10.8.

- [Secret-free frontend CI, isolated verification APKs, and hosted stable signing](tasks/2026-10-07-github-actions-ci-android-builds.md) are live. Frontend `625cfe0` passed automatic verification and the protected stable signing run; a separate failing-test branch confirmed the gate. The latest released revision is frontend `d899f2c`. Existing team publication remains separate.

- Android/local-data is the primary product, focused on use without internet; no server is available, so backend and hosted-web work remain paused. Timer stays available by default; the optional/hidden Timer proposal is cancelled (maintainer direction, 2026-10-12). The frontend now uses deliberate copy, file-share, and manual-selection paths for AI reports. See [2026.10.9 release record](releases/smart-paper-v2026.10.9.md) and [implementation task](tasks/2026-10-07-ai-report-chatgpt-handoff.md).
- Ready implementation backlog is complete and the [task index](tasks/README.md) is reconciled. Remaining work proceeds one task at a time: phone data safety, accessibility/Persian, then notifications; device connection is the next dependency. Baseline studio fidelity remains deferred. Backlog order is recorded in [ROADMAP.md](ROADMAP.md); project-home cleanup, frontend hygiene, XLSX writer, framework refresh, Finance visibility and Planner AI shortcut are complete. Finance and Planner releases have public APK verification. Physical-device evidence remains open until observed; backend and hosted-web work remain paused.
- Planner local autosave, green Light/Dark surfaces and day minimization remain shipped. Ideas auto-recovers unfinished writing; publishing a saved thought remains deliberate.
- Product/Designer/personal systems/QA assessment and editable bilingual studio handoffs guide changes; structural stories do not certify native Android behavior.
- Standing maintainer direction: publish stable-signed Android releases after validated user-visible changes. Physical keyboard/lifecycle, upgrade/data retention, native notifications/sharing and TalkBack remain recorded follow-ups, not publication gates.

## Repository State

Run `scripts/project-context.sh` for current branches, revisions, working-tree changes, and the latest local release tag.

## Implemented Product

- Single-user personal planner with Saturday-to-Friday weeks, weekly goals/notes, day notes, and ten stable configurable section slots.
- Exact-time day schedule entries and reusable full-week templates.
- Multi-week summaries and English/Persian UI.
- Optional Android Finance goal and income tracking: fresh installs show Finance by default, saved visibility choices remain authoritative, and an independent Settings checkbox preserves records and backup access. A known local PIN can be changed in Settings; Django mode retains its separate throttled shared PIN/session unlock.
- Local JSON backup/import (`schema_version: 5`, including Idea Space notes) plus CSV, XLSX, and Markdown exports; older backups remain importable. Django backup remains schema 4.
- Local safe Merge preserves populated device Planner values, fills blanks/adds missing records and retains saved records on matching-ID conflicts, including templates and Ideas. Saved Finance goal/configuration remain authoritative. Empty or omitted collections delete nothing; Replace uses incoming collections. See [D-020](docs/decisions.md#d-020--local-merge-preserves-device-values-on-conflict).
- Two persistence modes: Django/SQLite API mode and browser `localStorage` mode selected by `NEXT_PUBLIC_DATA_MODE=local`.
- The Android APK packages `smart-paper-front/` in local-data mode; it does not require Django.
- Capacitor Android app with native file sharing and opt-in local morning plan notifications.
- Dedicated focus/rest timer with configurable lengths, hourglass progress, and deadline recovery after navigation or suspension; no planner-minute logging or background completion alarm.
- Local-data Idea Space with freeform notes, optional writing prompts, daily return of an older thought, branches, and search.

## Technical Baseline

- Backend: Python, Django 6.0.4, SQLite, `planner` and `finance` apps, committed migrations, Docker/Compose, Gunicorn startup path.
- Frontend: Next.js 16.4.0, React 19.2.4, TypeScript, Tailwind CSS 4, Capacitor 8.5.1 (Android/core/CLI); Capacitor major remains 8.
- Frontend routes: planner, ideas, timer, finance, summaries, export/import, and settings.
- Current Android release: `versionCode 46`, `versionName 2026.10.29`, using the stable signing certificate.
- Team `smart-paper-v*` tags publish GitHub Releases when the matching release record and APK are committed.

## Latest Verified Checks

Frontend `40c3516c7ccd4b3ed056b9227591ca35152fef63` passed exact-source [CI 38861867772](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861867772): lint, TypeScript, 194 unit tests, local-data build, all 39 browser checks and isolated Android APK/provenance verification. Docker Node24 full 192-test run and final 26-test targeted refresh, lint/types/build and studio checks passed. Product/Designer accepted the EN/FA flow in the running app, including preservation of the Thursday note and filling missing weekly text. Independent source review passed after correcting hidden-slot guidance. Protected stable [build 38861893418](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38861893418), unsigned/final artifact Security, pinned v2/v3 signing and provenance passed; 115 web assets and all 559 unsigned payload entries were verified. [Publisher 38863625805](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38863625805) published 2026.10.29; anonymous asset `646440338` matches the committed 4,422,272-byte APK SHA-256 `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce`. See the [release record](releases/smart-paper-v2026.10.29.md). Physical Android chooser, upgrade/data retention and TalkBack remain unverified. Backend remains paused and unchanged.

Older release verification details and the transient Maven failure are recorded in the [2026.10.12 release record](releases/smart-paper-v2026.10.12.md); its candidate/final artifact archive bytes were not retained for local rehash. The [2026.10.9 record](releases/smart-paper-v2026.10.9.md) documents its signed/public APK verification and 21 npm advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed. The earlier stable APK was independently downloaded and verified, and backend 33-test/no-migration evidence was reused; see the [CI task](tasks/2026-10-07-github-actions-ci-android-builds.md) and [2026.10.9 release record](releases/smart-paper-v2026.10.9.md). Independent CI verification-archive download/extraction, fork/cancellation/cache-hit runs, and account-specific billing usage remain unverified. Historical physical/native gaps remain in Known Risks And Gaps.

## Known Risks And Gaps

- Backend production settings are unsafe defaults: hard-coded `SECRET_KEY`, `DEBUG = True`, and empty `ALLOWED_HOSTS`.
- JSON mutation endpoints use `csrf_exempt`; planner APIs have no authentication. This is accepted only for the current private/single-user boundary.
- Finance uses a shared PIN/session gate, not user accounts.
- Frontend secret-free CI and hosted stable signing/environment protection are verified. Broad frontend integration coverage, backend lint and backend type-check configuration remain absent; fork/cancellation/cache-hit, physical-device, and account-usage checks remain recorded follow-ups.
- Android notifications and full-week template UX still need physical-device checks in English and Persian.
- Idea Space capture, editing, branching, keyboard behavior, backup/restore, and upgrade still need physical Android checks; clipboard/chooser/recipient delivery, TalkBack, and broader upgrade/restore data-safety checks also remain unverified.
- Production environment and deployment documentation remain incomplete for any future hosted backend.
- Local finance data is not encrypted; its client-side PIN is a screen lock only. Finance expiry UI was fixed in 2026.10.11; frontend `d899f2c` adds runtime-only unlock and explicit cloud exclusion/supported device transfer rules. [Backup policy](docs/android-backup-policy.md) records legacy limits and unverified OS/OEM behavior. Reminders still include event titles; [privacy assessment](docs/privacy-local-data-review.md) records remaining notification/exposure scopes.
- The [dependency assessment](docs/android-dependency-advisories.md) records 0 production npm findings and 8 full-install findings (5 high, 3 moderate). These package scopes do not certify whole-APK or future-disclosure safety; Capacitor 8.5.1 native guards were separately reviewed in the [framework task](tasks/2026-10-12-framework-refresh.md). The announced October 14 disclosure remains unpublished.

## Context Pointers

- Product contract: `PRODUCT.md`
- Short feature summary: `feature.md`
- Priorities: `ROADMAP.md`
- System design: `docs/architecture.md`
- Data model: `docs/database.md`
- Durable decisions: `docs/decisions.md`
- Multi-step work context: `tasks/`
- Release process/history: `docs/release-workflow.md` and `releases/`
