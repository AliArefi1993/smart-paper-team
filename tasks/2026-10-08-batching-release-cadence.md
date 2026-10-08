# Task: Evaluate lightweight batching and release cadence

Status: decision recorded
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Decide whether and how to group related work into batches and release less frequently to reduce token use, local build load, coordination, repeated QA sessions and maintainer installation effort. Keep the process simpler than the work it supports.

## Context

- Owning repository: team coordination root.
- Existing workflow: [AGENTS.md](../AGENTS.md) and [release workflow](../docs/release-workflow.md).
- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Lead decision under the maintainer's explicit direction on 2026-10-08: adopt the bounded related-work rhythm and eligible unchanged-source evidence reuse for this run. Defer any release-cadence change; preserve the current standing publication trigger and required gates.

## Acceptance Criteria

- [x] Assess where current coordination, specialist handoffs, tests, builds, releases and separate sessions repeat unnecessarily, using existing evidence rather than assuming savings.
- [x] Propose a concise working rhythm: agree a bounded batch and done criteria; implement/test/review together; verify/document/release once the agreed batch is ready.
- [x] Define simple readiness cues for Product, Design, implementation, QA/tests, independent review, refactoring and release. These are activities within a work cycle, not mandatory separate chats or documents.
- [x] Preserve ready design handoffs for user-visible work, relevant checks, independent review and data-safety/security gates. Reuse valid unchanged-source evidence where already allowed; batching does not mean skipping necessary checks.
- [x] Define limits on scope growth, cross-repository coordination and urgent fixes. Example starting size for discussion: one substantial feature or two to four closely related small changes; this is not an adopted rule.
- [x] Refactor only for demonstrated problems or to support the agreed change; avoid speculative cleanup and forced backend work while backend scope is paused.
- [x] Decide whether lightweight observations of repeated builds, QA rework, post-release bugs and coordination effort help; no new metrics system or recurring reporting burden by default.
- [x] Review the proposal with the maintainer and record adopt/revise/defer plus the chosen release trigger. Only after a decision, update conflicting workflow/release instructions consistently.

## Non-Goals

- Changing the release cadence or agent configuration.
- Starting product implementation, builds or an APK release from this workflow assessment alone.
- New project-management tools, elaborate stage checklists, scheduled process reviews or guaranteed token/time savings.

## Plan

1. Review a small sample of recent task/release evidence and identify avoidable repetition.
2. Draft a short proposal with entry/exit cues, batch boundaries, urgent-fix exceptions and preserved gates.
3. Discuss tradeoffs and make a maintainer decision; keep current rules if deferred.
4. Record the lead decision; update workflow guidance only if it conflicts with the adopted rhythm or release trigger.

## Assessment And Proposal

Evidence sampled: the 2026.10.5 and 2026.10.6 release records plus their implementation tasks, current `AGENTS.md`, and `docs/release-workflow.md`. Both releases reused unchanged backend evidence, but each still ran frontend lint/type checks/tests/build, independent review, Studio checks, bounded browser QA, a signed APK build, and package/signature verification. The .6 task also scoped several related Ideas, Settings and Finance fixes into one implementation. This supports reusing valid unchanged-source evidence and coordinating related fixes; two samples do not establish guaranteed token, time, or QA savings. No evidence here shows avoidable duplicate chats or failed repeated builds.

Adopted rhythm for this run:

1. Select one substantial change or two to four closely related small fixes, with a shared outcome, owning repo(s), acceptance criteria and explicit exclusions. Keep urgent data-loss, security, or blocked-primary-flow fixes eligible to proceed immediately; do not wait for an unrelated batch.
2. Product sets scope when value is uncertain. For user-visible work, Designer reviews current behavior and leaves the bilingual handoff ready before implementation. These are readiness cues, not mandatory separate agents, chats, or documents.
3. Implement the agreed scope sequentially where changes depend on each other. Run relevant automated checks after the combined source is ready; reuse prior evidence only for unchanged source where release guidance allows. QA checks accepted flows and languages, then an independent reviewer checks the finished change. Fix findings and rerun affected checks.
4. Refactor only when evidence shows a defect or the agreed change needs it. Avoid speculative cleanup, unrelated cross-repository edits, and backend work while its feature scope is paused. If scope grows beyond the agreed batch, record a follow-up or get the lead to reset acceptance criteria before continuing.
5. Verify the final revisions, update only the relevant task/status/feature/release records, and prepare release evidence. Release remains governed by current standing authorization and release rules; deferring or changing release frequency requires an explicit lead/maintainer decision and consistent policy updates. Documentation-only work does not need an APK.

For a low-overhead signal, note the cause when an ordinary batch materially repeats a build or QA session, reopens a post-release defect, or needs avoidable coordination. Do not start a metric, recurring report, or guaranteed-savings target unless repeated evidence later shows it would help.

**Decision:** adopt bounded related work and reuse eligible unchanged-source evidence for this run. Keep the existing publication trigger: validated requested user-visible Android changes proceed to release under standing maintainer authorization. Release cadence is unchanged. No `AGENTS.md` or release-workflow edit is needed because the adopted rhythm fits existing guidance; batching does not defer a release.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Lead decision under explicit maintainer direction, 2026-10-08 | Bounded rhythm adopted for this run; release cadence unchanged |
| Process evaluation | Two recent release/task records and current workflow documents | Assessed; proposal recorded above |

## Decisions And Risks

- Design: not applicable; this is a team workflow decision, not an app-screen change.
- Large or unrelated batches can increase diagnosis difficulty and rework. More process can cost more than it saves.
- Current guidance releases validated user-visible changes under standing authorization. This decision preserves that trigger.
- Related but separate: [project home/roadmap cleanup](2026-10-08-project-home-roadmap.md) and [remote CI/APK builds](2026-10-07-github-actions-ci-android-builds.md).

## Outcome / Handoff

The bounded working rhythm and eligible unchanged-source evidence reuse were applied to the validated 2026.10.7 template-safety batch. Release cadence and the current standing publication trigger remain unchanged. No workflow-policy edits were necessary.
