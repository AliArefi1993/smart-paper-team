# Task: Make features, future tasks and roadmap easy to browse

Status: complete
Created: 2026-10-08
Updated: 2026-10-12

## Objective

Provide a clear, low-maintenance project home page where the maintainer can find shipped features, prepared future tasks, priorities and releases. Reuse repository Markdown rather than building a separate tool; project tracking must not distract from Smart Paper development.

## Context

- Owning repository: team coordination root only.
- Existing sources: [README](../README.md), [features](../feature.md), [roadmap](../ROADMAP.md), [task index](README.md), [status](../STATUS.md) and [releases](../releases/README.md).
- Maintainer authorized the roadmap cleanup and confirmed a readiness-first queue on 2026-10-12. The active sequential backlog request is tracked in [backlog clearance](2026-10-12-backlog-clearance.md).

## Acceptance Criteria

- [x] README provides an obvious project home page with concise links to current features, roadmap, future-task index and latest release/APK; preserve essential workspace/repository guidance.
- [x] ROADMAP distinguishes Now, ordered Next, Later, Ideas (unconfirmed) and Paused work.
- [x] Maintainer-confirmed readiness order is recorded without invented deadlines or an artificial order among uncertain Product/Designer candidates.
- [x] Roadmap entries summarize outcomes and link to detailed task/evidence records without duplicating acceptance criteria.
- [x] Task index clearly exposes planned work and distinguishes it from active/completed work, without requiring a search through all task files.
- [x] Existing feature.md remains the shipped-capability source; planned changes are visibly separate from current behavior.
- [x] Open plans, paused backend work and physical-device follow-ups are preserved or linked; completed history stays in task/release records.
- [x] Markdown reads clearly on GitHub and locally, with valid relative links.
- [x] README and task index document lightweight task/release closeout maintenance without a separate synchronization process.

## Non-Goals

- New website, server, dashboard application, GitHub Projects/Issues synchronization or another tracking system.
- Application changes, an APK release or starting/reprioritizing product implementation automatically.

## Plan

1. Inventory existing source files/task states and record the maintainer-confirmed work order.
2. Update README, ROADMAP and tasks/README as the primary bounded cleanup; keep feature/task/release details in their existing owning documents.
3. Verify navigation, states, dependencies and links; remove redundant summaries and document upkeep.
4. Review the resulting entry page for quick discovery, then commit/push documentation only.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer discussion on 2026-10-08 | Approved direction recorded as planned |
| Task-index state/link review | 2026-10-10, this bounded documentation update | `tasks/README.md` now groups all dated task records by active follow-up, planned/future, and completed/assessed state; ROADMAP cleanup and priority confirmation remain outstanding |
| README navigation and local links | 2026-10-10, this bounded documentation update | Added project-home links and clickable workspace-map paths; latest APK path and release record confirmed locally. Markdown link/path check and `git diff --check` passed. |
| Roadmap and task links | 2026-10-12, seven changed documentation files | All local Markdown targets exist; `git diff --check` passed |

## Decisions And Risks

- Design: not applicable to app screens; this is repository documentation/navigation only.
- Product/Designer candidates remain unordered until discovery. A prepared task is not automatically active.
- Use links and short metadata to minimize drift; do not create a duplicate feature list or task specification.

## Outcome / Handoff

README navigation and task-index grouping remain current. ROADMAP now has Now/ordered Next/Later/Ideas/Paused sections, preserves open device evidence and backend pause, and links to detailed task/release records. `feature.md` remains the shipped-capability source. A separate active tracker records the sequential backlog queue; repository hygiene is next after acceptance. Product release pointer was corrected to Android 2026.10.16. No app behavior or device validation changed.
