# Task: Evaluate lightweight batching and release cadence

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Decide whether and how to group related work into batches and release less frequently to reduce token use, local build load, coordination, repeated QA sessions and maintainer installation effort. Keep the process simpler than the work it supports.

## Context

- Owning repository: team coordination root.
- Existing workflow: [AGENTS.md](../AGENTS.md) and [release workflow](../docs/release-workflow.md).
- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- The maintainer requested future evaluation and a decision, not immediate adoption or an implementation batch. Current release authorization and required gates remain unchanged.

## Acceptance Criteria

- [ ] Assess where current coordination, specialist handoffs, tests, builds, releases and separate sessions repeat unnecessarily, using existing evidence rather than assuming savings.
- [ ] Propose a concise working rhythm: agree a bounded batch and done criteria; implement/test/review together; verify/document/release once the agreed batch is ready.
- [ ] Define simple readiness cues for Product, Design, implementation, QA/tests, independent review, refactoring and release. These are activities within a work cycle, not mandatory separate chats or documents.
- [ ] Preserve ready design handoffs for user-visible work, relevant checks, independent review and data-safety/security gates. Reuse valid unchanged-source evidence where already allowed; batching does not mean skipping necessary checks.
- [ ] Define limits on scope growth, cross-repository coordination and urgent fixes. Example starting size for discussion: one substantial feature or two to four closely related small changes; this is not an adopted rule.
- [ ] Refactor only for demonstrated problems or to support the agreed change; avoid speculative cleanup and forced backend work while backend scope is paused.
- [ ] Decide whether lightweight observations of repeated builds, QA rework, post-release bugs and coordination effort help; no new metrics system or recurring reporting burden by default.
- [ ] Review the proposal with the maintainer and record adopt/revise/defer plus the chosen release trigger. Only after a decision, update conflicting workflow/release instructions consistently.

## Non-Goals

- Changing current workflow, release cadence or agent configuration during this task-recording request.
- Starting product implementation, a pilot batch, builds or an APK release automatically.
- New project-management tools, elaborate stage checklists, scheduled process reviews or guaranteed token/time savings.

## Plan

1. Review a small sample of recent task/release evidence and identify avoidable repetition.
2. Draft a short proposal with entry/exit cues, batch boundaries, urgent-fix exceptions and preserved gates.
3. Discuss tradeoffs and make a maintainer decision; keep current rules if deferred.
4. If adopted, update AGENTS/release guidance and a durable decision with minimal maintenance overhead; assess on subsequent ordinary work.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer discussion on 2026-10-08 | Future evaluation requested; no policy adopted |
| Process evaluation | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable; this is a team workflow decision, not an app-screen change.
- Large or unrelated batches can increase diagnosis difficulty and rework. More process can cost more than it saves.
- Current guidance releases validated user-visible changes under standing authorization. Do not override that policy from this planned entry alone.
- Related but separate: [project home/roadmap cleanup](2026-10-08-project-home-roadmap.md) and [remote CI/APK builds](2026-10-07-github-actions-ci-android-builds.md).

## Outcome / Handoff

Future decision task only. When selected, prepare a lightweight proposal and decide with the maintainer before updating policy. Current working/release rules remain unchanged.
