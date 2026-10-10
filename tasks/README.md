# Task Documents

Task documents preserve the intent and verification context of meaningful work so a future agent can continue without reconstructing the conversation. This index groups records by current state; placement and dates do not imply priority or queue order.

## Active Follow-ups

- [Android data safety on a real phone](2026-10-08-android-data-safety-validation.md): broader upgrade, restore and failure-recovery checks remain; the discovered template Merge issue is already fixed and released.
- [Data-safety phone matrix](2026-10-08-data-safety-phone-matrix.md): prepared cases awaiting physical-device execution.

Many completed implementation and review records also retain phone, native Android, or TalkBack follow-ups. Their completed source, browser, design, or release work does not certify device validation; see each record's Outcome / Handoff and [STATUS.md](../STATUS.md).

## Planned / Future Work

These records preserve candidate work, not an approved sequence. Use [ROADMAP.md](../ROADMAP.md) for shared priorities; selecting a task for implementation requires the applicable scope and design decisions.

- [Android accessibility and Persian usability](2026-10-08-accessibility-persian-phone-review.md)
- [Android notifications review](2026-10-08-android-notification-review.md)
- [Finance optional and hidden by default](2026-10-07-finance-optional-default-hidden.md)
- [Finance change PIN](2026-10-09-finance-change-pin.md)
- [Idea Space connected-thoughts refactor](2026-10-07-idea-space-connected-thoughts-refactor.md)
- [Lightweight project home and roadmap cleanup](2026-10-08-project-home-roadmap.md): priority confirmation and the broader bounded cleanup remain outstanding.
- [Local problem reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md)
- [Microsoft Clarity evaluation](2026-10-10-microsoft-clarity-evaluation.md)
- [Periodic team reviews](2026-10-08-periodic-team-reviews.md)
- [Planner Review this week with AI shortcut](2026-10-07-planner-ai-review-shortcut.md)
- [Smart Paper Android launcher icon](2026-10-07-android-launcher-icon.md)
- [Timer optional and hidden by default](2026-10-07-timer-optional-default-hidden.md)

## Completed / Assessed

These records cover shipped work, completed documentation, or bounded assessments. Their task-specific outcomes and any still-open device follow-ups remain in the linked documents.

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
- [Full-app design coverage](2026-10-01-full-app-design-coverage.md) — partial; fidelity and implementation handoff are not approved.
- [GitHub Actions CI and Android builds](2026-10-07-github-actions-ci-android-builds.md) — hosted CI and stable signing evidence completed; remaining independent checks are recorded in the task.
- [Hosted signed release](2026-10-09-hosted-signed-release.md)
- [Idea Space](2026-10-01-idea-space.md)
- [Idea Space design pilot](2026-10-01-idea-space-design-pilot.md)
- [Local design studio](2026-10-03-local-design-studio.md) — implementation complete; visual comparison remains pending.
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
