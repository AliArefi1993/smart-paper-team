# Task: Execute the readiness-first backlog

Status: in progress
Created: 2026-10-12
Updated: 2026-10-12

## Objective

Work through the maintainer-authorized backlog in sequence, starting with the easiest and most ready bounded work. Preserve the focus on offline Android use, keep Timer available by default, and leave backend/hosted-web work paused while no server-backed use case is selected.

## Context

- Priority source: [ROADMAP.md](../ROADMAP.md).
- Owning repository varies by step; coordinate in this team repository and keep app changes in their owning repositories.
- Current Android baseline: [2026.10.16 release record](../releases/smart-paper-v2026.10.16.md).
- The maintainer authorized the queue and requested no artificial closure of physical-device gaps.

## Acceptance Criteria

- [x] Complete and validate the project-home/roadmap cleanup as the initial step.
- [ ] Review frontend repository hygiene without deleting or resetting files; report findings and proposed narrow action.
- [ ] Implement the evaluated XLSX writer upgrade with focused compatibility/security regressions and required reviews.
- [ ] Complete a bounded framework/build-tool refresh with scoped checks and release evidence.
- [ ] For later user-visible candidates, have Product/Designer define scope and a ready handoff before implementation; no priority order among those candidates is assumed.
- [ ] Preserve open physical-device evidence until actual device results are recorded.
- [ ] Keep task, roadmap, product and status documentation accurate as each step completes.

## Non-Goals

- Starting backend or hosted-web work without an explicitly chosen server-backed use case.
- Hiding Timer or adding Timer-to-Planner integration.
- Treating browser, automated, or release checks as proof of native device behavior.
- Inventing deadlines or sequencing uncertain Product/Designer candidates.

## Plan

1. Complete the project-home and roadmap cleanup; submit for lead acceptance.
2. Inspect frontend repository hygiene and return findings before any cleanup action.
3. Upgrade the spreadsheet writer using the completed evaluation and implementation handoff.
4. Refresh the framework/build tools within a bounded scope.
5. Take user-visible candidates through Product and Designer discovery, then implement approved ready work sequentially.
6. Preserve and execute device follow-ups when a suitable test phone is available.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Initial backlog step | [Project-home cleanup task](2026-10-08-project-home-roadmap.md) | Documentation changes prepared; awaiting lead acceptance |
| Frontend hygiene | Read-only inspection and findings | Not started |
| XLSX writer upgrade | Evaluation handoff and focused regression/security checks | Not started |
| Framework refresh | Bounded source and validation record | Not started |
| Physical-device follow-ups | Observed Android device results | Open; do not infer completion |

## Decisions And Risks

- Design: not applicable to the documentation and repository-inspection steps; required for later user-visible changes.
- The roadmap order reflects maintainer direction, not estimates or deadlines.
- Repository hygiene may reveal files requiring separate scope; do not remove user data as part of inspection.

## Outcome / Handoff

Project-home/roadmap cleanup is the initial step and is ready for lead acceptance. Next inspect frontend repository hygiene; preserve any `node_modules-blocked-*` data and report findings before proposing changes. Backend remains paused. Android device evidence remains open.
