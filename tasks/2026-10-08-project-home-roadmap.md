# Task: Make features, future tasks and roadmap easy to browse

Status: planned
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Provide a clear, low-maintenance project home page where the maintainer can find shipped features, prepared future tasks, priorities and releases. Reuse repository Markdown rather than building a separate tool; project tracking must not distract from Smart Paper development.

## Context

- Owning repository: team coordination root only.
- Existing sources: [README](../README.md), [features](../feature.md), [roadmap](../ROADMAP.md), [task index](README.md), [status](../STATUS.md) and [releases](../releases/README.md).
- Maintainer approved the proposed lightweight approach on 2026-10-08 and requested recording it as future work, not performing the cleanup now.

## Acceptance Criteria

- [ ] README provides an obvious project home page with concise links to current features, roadmap, future-task index and latest release/APK; preserve essential workspace/repository guidance.
- [ ] ROADMAP distinguishes Now (active), Next (explicitly ordered queue), Later (agreed but not next), Ideas (unconfirmed) and Paused (deliberately deferred).
- [ ] Confirm priority order with the maintainer; do not treat file dates, list insertion order or saved plans as an approved implementation sequence. Do not invent deadlines.
- [ ] Roadmap entries show short outcomes, status and dependencies with links to detailed task records; avoid copying acceptance criteria into several places.
- [ ] Task index clearly exposes planned work and distinguishes it from active/completed work, without requiring a search through all task files.
- [ ] Existing feature.md remains the shipped-capability source; planned changes are visibly separate from current behavior.
- [ ] Existing plans, known risks and deferred physical-device checks are preserved or linked during reorganization; completed history stays in task/release records.
- [ ] Markdown reads clearly on GitHub and locally, with valid relative links and compact tables where helpful.
- [ ] Document lightweight maintenance as part of normal task/release closeout: update status, priority/dependencies and links when facts change; no separate manual synchronization process.

## Non-Goals

- Performing the cleanup during this task-recording request.
- New website, server, dashboard application, GitHub Projects/Issues synchronization or another tracking system.
- Application changes, an APK release or starting/reprioritizing product implementation automatically.

## Plan

1. Inventory existing source files/task states and confirm the next-work order with the maintainer when this task starts.
2. Update README, ROADMAP and tasks/README as the primary bounded cleanup; keep feature/task/release details in their existing owning documents.
3. Verify navigation, states, dependencies and links; remove redundant summaries and document upkeep.
4. Review the resulting entry page for quick discovery, then commit/push documentation only.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Scope | Maintainer discussion on 2026-10-08 | Approved direction recorded as planned |
| Cleanup/link review | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable to app screens; this is repository documentation/navigation only.
- Priority decisions remain open. A prepared task is not automatically next or active.
- Use links and short metadata to minimize drift; do not create a duplicate feature list or task specification.

## Outcome / Handoff

Future task saved only. When selected, confirm priority order and perform the bounded Markdown cleanup. No project home page redesign has been implemented yet.
