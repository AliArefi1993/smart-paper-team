# Task: Define periodic QA, discovery and maintenance reviews

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Decide lightweight rules for periodically checking the whole app, getting independent feature proposals from agents and identifying necessary refactoring within their areas. Keep quality and discovery proactive without waiting for the maintainer to originate every idea, while limiting token use, local load and coordination overhead.

## Context

- Owning repository: team coordination root; any later implementation stays in the relevant app repository.
- Related decision: [batching and release cadence](2026-10-08-batching-release-cadence.md).
- Existing rules: [AGENTS.md](../AGENTS.md), [release workflow](../docs/release-workflow.md) and [status/risks](../STATUS.md).
- Maintainer requested this as a future task on 2026-10-08. Frequency, triggers and execution authority have not been decided; no recurring jobs are requested or enabled now.

## Acceptance Criteria

- [ ] Decide when broad app QA is due: compare completed-batch/release counts, elapsed time and risk/change triggers; choose a simple policy instead of assuming every release needs a new full audit.
- [ ] Define broad QA coverage across relevant routes, local saving, backup/restore, upgrades, offline use, English/Persian, accessibility and native behavior; distinguish automated, desktop and actual-device evidence. Record unexecuted coverage rather than claiming complete testing.
- [ ] Define a periodic independent discovery review where Product/Designer and relevant specialists propose a small ranked set of features or simplifications without needing the maintainer's initial ideas. Ground suggestions in observed product/code/user problems; mark hypotheses and avoid merely echoing prior requests.
- [ ] Feature proposals state the problem, expected value, evidence/uncertainty, rough effort and boundaries. Separate proposing from implementation; lead/maintainer scope and prioritization decisions still apply.
- [ ] Define periodic specialist maintenance reviews of owned areas for necessary refactoring, with concrete evidence, bounded files/scope, risk and behavior-preservation checks. No quota-driven rewrites or changes simply because a review is due.
- [ ] Decide which low-risk scoped fixes may proceed under existing authority and which findings become future tasks; preserve required design, QA, security and release gates.
- [ ] Consider whether security/dependency, performance or documentation-drift reviews should share these checkpoints; add only justified scope, not a mandatory new audit for every discipline.
- [ ] Set named owners and short expected outputs, cost-first model routing, effort limits and stop conditions. Reuse recent valid evidence and agents; avoid redundant specialist fan-out.
- [ ] Maintain a compact last-reviewed/source-revision/next-due indication in existing task/status files so new sessions can recognize due work. Decide explicitly between session/release checkpoints and scheduled automation; do not create background jobs by implication.
- [ ] Align with the batching decision and obtain a maintainer decision on the proposed rules before changing workflow instructions or enabling recurrence.

## Non-Goals

- Running QA, soliciting new feature proposals, refactoring code or changing agent instructions during this task-recording request.
- Creating scheduled automations, new tracking systems, mandatory separate chats or an unbounded review program.
- Automatically implementing every agent suggestion, resuming paused backend feature work or weakening safety/release rules.

## Plan

1. Review recent task/release evidence and identify gaps that focused per-change checks miss.
2. Draft a concise policy covering broad QA, independent discovery and necessary maintenance, with proposed triggers, owners and budgets.
3. Decide with the maintainer and align the policy with batching/release cadence; defer unresolved parts.
4. If adopted, update durable instructions and compact due-work tracking; enable scheduling only if explicitly chosen and authorized.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer request on 2026-10-08 | Future policy task recorded |
| Review/rule evaluation | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable to this policy task; future user-visible proposals retain their design requirements.
- Independent proposals still respect Android/offline boundaries and existing evidence; independence does not authorize invented capabilities or automatic feature delivery.
- Full QA cannot guarantee no bugs, and native coverage requires device evidence. Necessary maintenance should be justified by a concrete problem.
- Frequency is deliberately open. Reviews should reduce missed issues without recreating the repeated effort that batching aims to remove.

## Outcome / Handoff

Future decision task only. When selected, propose a lightweight periodic-review policy for discussion. Current rules remain unchanged; no reviews or recurring processes have started.
