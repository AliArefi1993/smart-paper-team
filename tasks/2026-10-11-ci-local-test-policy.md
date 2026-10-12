# Evaluate CI Coverage And Local Test Policy

Status: complete; policy accepted by lead
Created: 2026-10-11
Updated: 2026-10-12

## Objective

Decide which checks should run in GitHub CI and which local checks are useful before handoff, using observed coverage, change risk, runtime and cost. The evaluation may recommend much less frequent full local runs, but must not assume local checks can be eliminated before evidence supports that policy.

## Context

- Relevant roadmap item: [CI coverage and local test policy](../ROADMAP.md).
- Owning repositories: coordination workspace and frontend; backend remains paused unless explicitly resumed.
- Existing frontend CI: [verification workflow](../smart-paper-front/.github/workflows/verification.yml) and [stable build workflow](../smart-paper-front/.github/workflows/stable-build.yml) run tests, lint, type checks and a production build; task-specific coverage and event triggers should be inventoried before proposing changes.
- Prior CI setup and known follow-ups: [GitHub Actions CI and Android builds](2026-10-07-github-actions-ci-android-builds.md).
- Design: not applicable.

## Acceptance Criteria

- [x] Inventory frontend automated coverage, workflow triggers, and important uncovered or duplicated checks; identify justified missing CI tests for a subsequent implementation phase.
- [x] Recommend which categories need no local test run, targeted local tests, or the full local suite, covering documentation-only edits, scoped fixes, data/import/migration changes, security/dependency changes, native changes, CI failures, and offline work.
- [x] Assess when successful CI for the exact commit can be reused as validation, while retaining targeted local debugging or checks where justified.
- [x] Compare observed runtime and cost evidence; document tradeoffs and remaining uncertainty.
- [x] Keep existing release gates intact; make no workflow, application, or backend changes as part of this evaluation.
- [x] Record accepted risk-based local checks and exact-commit CI reuse in the policy document and operating guidance.

## Non-Goals

- Changing CI workflows or application code.
- Resuming backend work or relaxing release/build/signing gates.
- Declaring CI a substitute for physical-device, accessibility, or artifact review evidence.

## Plan

1. Inspect frontend tests and workflow event/condition behavior; record coverage and gaps. Inspect backend only if it is resumed.
2. Build a change-risk matrix for local and hosted checks, including exact-commit evidence reuse and failure/offline cases.
3. Estimate elapsed time and hosted cost from available runs; mark unavailable cost data as unknown.
4. Present the recommendation for lead acceptance before changing durable policy documentation.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Workflow and test inventory | Inspect `smart-paper-front/tests/`, `.github/workflows/`, `.github/CI.md`, and frontend commands | 17 test files inventoried; triggers, overlap and gaps recorded in [recommendation](../docs/ci-local-test-policy.md) |
| Runtime/cost comparison | `gh run list/view` for three recent successful verification jobs; official GitHub billing documentation and repository visibility | 3m42s–5m49s observed; inspected runs had cache misses, so no clean/cache comparison. Repository is public and standard hosted Linux use is free per current docs; account-specific usage/storage unknown. No dollar estimate made. |
| Link/path validation | Resolve local Markdown paths and inspect diff | Passed: local targets exist; diff checked during batch closeout |

## Decisions And Risks

- Lead accepted the policy on 2026-10-12; exact-SHA reuse never replaces audits, design/device evidence or release artifact gates.
- Any justified CI coverage additions are identified for a subsequent implementation phase; this evaluation does not change workflows or tests.
- Backend remains paused unless resumed; retain existing release acceptance, exact-source, signing and artifact gates.
- Runtime and account-specific billing may not be available from public repository evidence.

## Outcome / Handoff

Evaluation and lead acceptance complete. [Policy](../docs/ci-local-test-policy.md) and decision D-013 record defaults and exact-commit reuse; AGENTS.md links the policy. No workflow, application, backend or test changes are included in this evaluation.
