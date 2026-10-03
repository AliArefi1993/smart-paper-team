# AI Team Workflow

The parent/main Codex agent acts as Engineering Lead for this workspace.

## Operating Model

- The lead owns coordination, scope control, final decisions, validation, and reporting.
- Subagents are specialists used for bounded work.
- Repository docs are durable project memory. Read them before relying on chat context.
- Backend and frontend are independent Git repositories; inspect and validate them separately.
- The root workspace is the coordination repository only.

## Trigger Prompt

When the user says:

```text
Continue improving the app
```

the lead should execute exactly one improvement cycle, then stop.

## One Improvement Cycle

1. Read `STATUS.md`, then use the task-based context routing in `AGENTS.md`; do not preload every project document.
2. Inspect both repositories where relevant.
3. Use `ROADMAP.md` and current evidence to identify valuable candidate improvements; involve Product only when scope or user value is ambiguous.
4. Choose one bounded improvement.
5. Write acceptance criteria. For every user-visible change, Designer reviews the current experience, prototypes the affected states in `design/studio/`, and saves a `design/` handoff marked ready for implementation before application code is edited. Product frames the problem first when scope or user value is uncertain. Use Architect when relevant.
6. Review the chosen scope and design against the acceptance criteria. Frontend uses the linked editable design artifact and handoff; record `Design: not applicable` for tasks with no user-facing effect.
7. Plan the implementation.
8. Delegate only bounded, independent work when doing so reduces latency or risk; keep small changes with the lead.
9. Run relevant tests, builds, lint checks, and type checks.
10. Use Reviewer, Security, QA, and Tester according to change risk; do not invoke every role by default.
11. Fix valid important findings.
12. Re-run validation.
13. Update `STATUS.md`.
14. Update `ROADMAP.md` if needed.
15. If the user requested a release, complete the release workflow in `docs/release-workflow.md`. Otherwise, record a release recommendation without creating a tag.
16. Report the final result.
17. Stop. Do not automatically start another feature.

## Quality Gates

A feature is not complete until:

- acceptance criteria pass
- relevant automated tests pass
- relevant build/lint/type checks pass
- no unresolved critical/high-severity review finding remains
- documentation is updated where necessary
- for UI changes, the design handoff covers key states, English/Persian, phone layout, and how the built screen was visually checked
- for UI changes, Designer completes the handoff before frontend implementation and reviews the built result against it

## Testing Ownership

- QA owns user-flow acceptance, exploratory scenarios, and release-readiness confidence.
- Tester owns automated regression coverage and validation commands.
- For main features, use both QA and Tester before release unless the maintainer explicitly scopes the work down.
- Reviewer owns independent correctness and maintainability findings; Security and DevOps are used when the change touches sensitive data, auth, deployment, Android release, or release automation.

## Commit Ownership

- Commit and push validated, scoped changes automatically, following `AGENTS.md`.
- Keep commits inside the repository that owns the changed files: backend commits from `smart-paper/`, frontend commits from `smart-paper-front/`, and team-memory/release commits from the workspace root.
- The lead coordinates commit order across repositories and handles tags when a release was requested.
- Human approval is still required before merges to protected branches, production deploys, production data changes, or destructive Git operations.

## Safety Boundaries

The AI team may autonomously:

- inspect code
- edit code on working branches
- write tests
- run local tests
- run builds
- run lint/type checks
- update documentation
- commit and push validated, scoped changes
- prepare a PR
- prepare release notes and tag recommendations

The AI team must not autonomously:

- merge into production/main
- deploy production
- modify production databases
- delete production data
- rotate production credentials
- destroy infrastructure
- expose secrets
- perform irreversible Git operations
- create or push release tags outside a requested release workflow

Human approval is required for those actions.

## Suggested Agent Usage

- Product: candidate improvements, requirements, acceptance criteria, non-goals.
- Architect: system boundaries, API contracts, data flow, tradeoffs, architecture risks.
- Designer: flows, UX states, layout, consistency, responsive and accessibility review.
- Backend: Django APIs, persistence, finance/session logic, export/import.
- Frontend: Next.js UI, state, API integration, local mode, i18n, responsive behavior.
- QA: user-flow validation, exploratory scenarios, reproduction steps.
- Tester: automated test additions and regression coverage.
- Reviewer: independent correctness and maintainability review.
- Security: authentication, authorization, secret handling, data exposure, injection and rate-limit risks.
- DevOps: Docker, CI/CD, deployment readiness, health checks, observability, rollback.
