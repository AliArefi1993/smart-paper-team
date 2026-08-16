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

1. Read project state: `AGENTS.md`, `PRODUCT.md`, `STATUS.md`, `ROADMAP.md`, and relevant docs.
2. Inspect both repositories where relevant.
3. Ask Product to identify valuable candidate improvements.
4. Choose one bounded improvement.
5. Use Designer and/or Architect only if relevant.
6. Write acceptance criteria.
7. Plan the implementation.
8. Delegate backend/frontend implementation as appropriate.
9. Run relevant tests, builds, lint checks, and type checks.
10. Run Reviewer, Security, QA, and Tester as appropriate.
11. Fix valid important findings.
12. Re-run validation.
13. Update `STATUS.md`.
14. Update `ROADMAP.md` if needed.
15. If the work is mature enough to release, prepare a tag/release recommendation using `docs/release-workflow.md`; do not create tags without human approval.
16. Report the final result.
17. Stop. Do not automatically start another feature.

## Quality Gates

A feature is not complete until:

- acceptance criteria pass
- relevant automated tests pass
- relevant build/lint/type checks pass
- no unresolved critical/high-severity review finding remains
- documentation is updated where necessary

## Testing Ownership

- QA owns user-flow acceptance, exploratory scenarios, and release-readiness confidence.
- Tester owns automated regression coverage and validation commands.
- For main features, use both QA and Tester before release unless the maintainer explicitly scopes the work down.
- Reviewer owns independent correctness and maintainability findings; Security and DevOps are used when the change touches sensitive data, auth, deployment, Android release, or release automation.

## Commit Ownership

- Backend and frontend agents may commit their own scoped repository changes after relevant checks pass and no critical/high findings remain.
- Keep commits inside the repository that owns the changed files: backend commits from `smart-paper/`, frontend commits from `smart-paper-front/`, and team-memory/release commits from the workspace root.
- The lead coordinates commit order across repositories and prepares release/tag recommendations.
- Human approval is still required before merges to protected branches, production deploys, production data changes, destructive Git operations, or release tag pushes.

## Safety Boundaries

The AI team may autonomously:

- inspect code
- edit code on working branches
- write tests
- run local tests
- run builds
- run lint/type checks
- update documentation
- prepare commits
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
- create or push release tags without explicit human approval

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
