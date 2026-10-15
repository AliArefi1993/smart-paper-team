# Task Documents

Task documents preserve the intent and verification context of meaningful work so a future agent can continue without reconstructing the conversation. Completed record placement and dates do not imply priority; ROADMAP owns the remaining queue order.

## Remaining queue — one task at a time

[ROADMAP.md](../ROADMAP.md#next-after-baseline-review) owns the order. The ready implementation queue is complete; the remaining phone reviews await observed device evidence.

1. [Android data safety on a real phone](2026-10-08-android-data-safety-validation.md), using the [execution matrix](2026-10-08-data-safety-phone-matrix.md). Next action: establish a working spare-device connection and record installed/candidate APK identities before testing. Samsung A15/Android 16 connection was unsuccessful; no phone cases have run.
2. [Android accessibility and Persian usability](2026-10-08-accessibility-persian-phone-review.md): execute after the data-safety review; native TalkBack, scaling, keyboard and RTL evidence remains open.
3. [Android notifications review](2026-10-08-android-notification-review.md): execute after accessibility; scope Product/Designer improvements from observed behavior before implementation.

Complete and document each selected task before starting the next. Reproduced issues take the normal design, implementation, verification and release path. Completed records retain their unobserved phone follow-ups; completion of source/browser/release work does not certify native behavior.

## Deferred / Reference Work

- [Full-app design coverage](2026-10-01-full-app-design-coverage.md) and [local design studio](2026-10-03-local-design-studio.md): tooling/structural coverage exists; full baseline fidelity comparison and approval remain incomplete. These are reference drafts, not ready implementation handoffs. Future screen work still requires its own ready Designer review.
- Periodic reviews and evidence-based candidates remain in [ROADMAP.md](../ROADMAP.md); backend/hosted-web work stays paused.

## Cancelled

- [Timer optional and hidden by default](2026-10-07-timer-optional-default-hidden.md) — cancelled on 2026-10-12; keep Timer available by default.

## Completed / Assessed

- [Android Back navigation](2026-10-14-android-back-navigation.md): shipped in Android 2026.10.27 after exact-source checks, protected signing, independent artifact review and public APK verification; physical Back/IME/chooser/TalkBack follow-ups remain open.

- [Empty-day morning reminder](2026-10-14-empty-day-notification.md): shipped in Android 2026.10.26; physical delivery/TalkBack and the wider notification review remain open.
- [Sequential backlog clearance](2026-10-12-backlog-clearance.md): ready implementation queue complete; phone work remains in the ordered queue above.
- [Idea Space connected-thoughts refactor](2026-10-07-idea-space-connected-thoughts-refactor.md): shipped in Android 2026.10.22.
- [First manual baseline checkpoint](2026-10-13-manual-baseline-checkpoint.md): bounded baseline recorded; its localization follow-up shipped in the desktop batch.
- [Desktop backlog batch](2026-10-13-desktop-backlog-batch.md): shipped in Android 2026.10.24; browser coverage, synthetic performance and bounded desktop accessibility evidence complete.
- [Export unlock locale correction](2026-10-14-export-unlock-locale.md): shipped in Android 2026.10.25.

- [Local problem reporting and diagnostics](2026-10-07-local-feedback-diagnostics.md): shipped in Android 2026.10.23; independent final APK Security and public byte/hash verification passed; native follow-ups remain.

- [Microsoft Clarity evaluation](2026-10-10-microsoft-clarity-evaluation.md): current Android diagnostic adoption rejected; conditional pilot deferred and unexecuted under [D-018](../docs/decisions.md).
- [Periodic team reviews](2026-10-08-periodic-team-reviews.md): manual checkpoint policy adopted; first baseline recorded on 2026-10-13.

- [Finance change PIN](2026-10-09-finance-change-pin.md): shipped in Android 2026.10.21; independent artifact Security and public APK verification passed. Native/direct credential-entry follow-ups remain.
- [Finance visible by default](2026-10-13-finance-default-visible.md): shipped in Android 2026.10.21; saved visibility preferences remain authoritative.

- [Planner AI review shortcut](2026-10-07-planner-ai-review-shortcut.md): shipped in Android 2026.10.20; independent artifact Security and public APK verification passed.

- [Finance visibility](2026-10-07-finance-optional-default-hidden.md): shipped Android 2026.10.19; public APK verified.

- [Lightweight project home and roadmap cleanup](2026-10-08-project-home-roadmap.md) — completed and pushed in team commit `3257063`.

- [Framework/build dependency refresh](2026-10-12-framework-refresh.md) — Next.js 16.4.0 and Capacitor 8.5.1; published in Android 2026.10.18 after CI, protected signing, Security review and anonymous APK verification.

- [Offline XLSX writer upgrade](2026-10-12-spreadsheet-writer-upgrade.md) — vendored SheetJS CE 0.20.3; shipped in Android 2026.10.17 after CI, Security review and anonymous public APK verification.

- [Five sequential confidence tasks and release](2026-10-11-five-task-release-batch.md) — four focused data/export regression tasks and accepted CI/local-test policy; release closeout recorded in the task.
- [CI/local-test policy](2026-10-11-ci-local-test-policy.md) — risk-based local checks and exact-commit hosted evidence reuse; release gates preserved.
- [XLSX export regression](2026-10-11-xlsx-export-regression.md)
- [Planner section regression](2026-10-11-planner-section-regression.md)
- [Finance record regression](2026-10-11-finance-record-regression.md)
- [Week template regression](2026-10-11-week-template-regression.md)
- [Android launcher icon](2026-10-11-android-launcher-icon.md) — approved source and artifact; consolidated publication in 2026.10.16.
- [Natural sand timer](2026-10-11-timer-natural-sand.md) — approved bilingual design/browser checks and source; consolidated publication in 2026.10.16.

These records cover shipped work, completed documentation, or bounded assessments. Their task-specific outcomes and any still-open device follow-ups remain in the linked documents.

- [Local timed schedule regression tests](2026-10-11-local-schedule-regression.md) — persistence, normalization and bilingual serialized backup/restore coverage; no app behavior change.
- [Spreadsheet writer evaluation](2026-10-11-spreadsheet-writer-evaluation.md) — evaluation complete; writer upgrade shipped in Android 2026.10.17.
- [Android production dependency advisories](2026-10-11-android-dependency-advisories.md) — bounded assessment complete; writer/framework remediation is recorded in the linked upgrade tasks, with residual advisory limits in STATUS.
- [Frontend repository hygiene review](2026-10-12-frontend-repository-hygiene.md) — no blocked dependency directories or tracked paths found; ignore rule confirmed.
- [Android APK readiness](2026-09-29-android-apk-readiness.md) — historical implementation; phone follow-up transferred.
- [Android launch position](2026-09-30-android-launch-position.md)
- [Android mobile layout hotfix](2026-09-30-android-mobile-layout-hotfix.md)
- [Android product and design audit](2026-10-06-android-product-design-audit.md)
- [Android release](2026-10-06-android-release.md)
- [Android backup policy](2026-10-10-android-backup-policy.md)
- [App-wide dark mode](2026-10-05-app-wide-dark-mode.md)
- [Audit follow-ups](2026-10-06-audit-followups.md)
- [AI report ChatGPT handoff](2026-10-07-ai-report-chatgpt-handoff.md)
- [AI report handoff](2026-09-30-ai-report-handoff.md)
- [AI report release](2026-09-30-ai-report-release.md)
- [Batching and release cadence assessment](2026-10-08-batching-release-cadence.md) — decision recorded; cadence and publication policy unchanged.
- [Design capability](2026-10-01-design-capability.md)
- [Design system review](2026-09-29-design-system-review.md)
- [Finance session expiry](2026-10-09-finance-session-expiry.md)
- [Feedback triage workflow](2026-10-08-feedback-triage-workflow.md) — documentation convention; see [intake and closure rules](../docs/feedback-triage.md).
- [Focus and rest timer](2026-09-29-focus-rest-timer.md)
- [GitHub Actions CI and Android builds](2026-10-07-github-actions-ci-android-builds.md) — hosted CI and stable signing evidence completed; remaining independent checks are recorded in the task.
- [Hosted signed release](2026-10-09-hosted-signed-release.md)
- [Idea Space](2026-10-01-idea-space.md)
- [Idea Space design pilot](2026-10-01-idea-space-design-pilot.md)
- [Planner calm design](2026-10-04-planner-calm-design.md)
- [Planner day minimization](2026-10-06-planner-day-minimization.md)
- [Planner shared dark palette](2026-10-06-planner-shared-dark-palette.md)
- [Planner bottom-area simplification](2026-10-09-planner-bottom-area.md)
- [Planner save controls and autosave](2026-10-06-save-controls-autosave.md)
- [Privacy and local-data assessment](2026-10-08-privacy-local-data-review.md) — source/configuration review complete; device and transfer checks remain.
- [Release pipeline check](2026-10-09-release-pipeline-check.md)
- [Selective AI report](2026-09-30-selective-ai-report.md)
- [Template Merge safety](2026-10-08-template-merge-safety.md)
- [Phone landscape layout](2026-10-09-phone-landscape-layout.md)

## When To Create One

Create a task document for work that is cross-repository, spans multiple sessions, changes data/contracts, prepares a release, or has several acceptance criteria. Do not create one for a tiny local fix with obvious scope.

## Naming

Use a short descriptive filename:

```text
tasks/YYYY-MM-DD-short-name.md
```

Copy `tasks/TEMPLATE.md`. Keep one document per cohesive outcome.

## Maintenance

- Record decisions and evidence, not a chronological transcript.
- Keep acceptance criteria and verification results current.
- Link to code, releases, or durable decisions instead of copying them.
- Mark the task `complete`, `blocked`, or `cancelled` when work stops.
- Completed task documents may remain in `tasks/`; Git history and filename search provide the archive.
- Update `STATUS.md` only with facts that remain relevant after the task ends.
- Keep [ROADMAP.md](../ROADMAP.md) as the single source for future-work priority; shipped capability belongs in `feature.md`, and task/release records own evidence.
