# Smart Paper Team Workspace

This repository is the AI/product coordination workspace for Smart Paper. It is not the backend app and it is not the frontend app.

## Repository Ownership

- `smart-paper/` is the backend Git repository. It has its own independent Git history.
- `smart-paper-front/` is the frontend Git repository. It has its own independent Git history.
- The workspace root is only the coordination repository for durable project memory, shared docs, and Codex team configuration.
- Never accidentally commit backend or frontend application files into the root coordination repository.

When operating on backend Git, run:

```bash
cd smart-paper
```

When operating on frontend Git, run:

```bash
cd smart-paper-front
```

## Fast Context Protocol

Do not preload every project document. Load context according to the task:

1. Read `STATUS.md` for the current snapshot, active risks, last verified checks, and repository revisions.
2. Run `scripts/project-context.sh` when repository state or revision freshness matters.
3. Read only the task-specific source below:
   - product behavior or scope: `PRODUCT.md`
   - quick list of shipped capabilities and recent work: `feature.md`
   - prioritization or next improvement: `ROADMAP.md`
   - cross-stack contracts or system boundaries: `docs/architecture.md`
   - persistence entities, relationships, or migrations: `docs/database.md`
   - why a durable choice was made: `docs/decisions.md`
   - continuing meaningful multi-step work: the relevant file under `tasks/`
   - product discovery or visual design: the relevant skill under `skills/` and files under `design/`
   - release or Android packaging: `docs/release-workflow.md`, `releases/NEXT.md`, and the latest relevant release record
   - implementation: the owning repository's `AGENTS.md`, then the relevant code and tests
4. Use `rg` and narrow file reads before opening large files. Treat code and migrations as authoritative for implementation details.

For a small, repository-local task, do not read product, roadmap, architecture, and release docs unless the task needs them.

## Chat And Token Budget

- Keep user-facing progress messages brief. Skip step-by-step narration; update only for a material finding, change in direction, blocker, or work lasting over a minute. Keep the final result concise while reporting validation and any remaining issue.
- Continue the current chat while pursuing the same unfinished objective or reviewing its result.
- For an unrelated objective, recommend a fresh chat in this project; its context comes from `STATUS.md`, the relevant task file, and narrow code reads, not a copied transcript.
- If the same objective continues but the chat grows slow or its context indicator is low, suggest Codex's compact action before starting over. Use a side chat for a short tangent when available.
- At a meaningful task boundary, leave only the essential result, remaining blocker, and next action in the relevant task/status files. Do not append conversation summaries or preload unrelated history.
- Do not start new chats or scheduled context checks automatically; suggest them only when useful and let the user choose.

## Subagent Delegation

- Use a cost-first model choice: default clear commands, narrow searches, factual documentation updates, checklists, test execution, first-pass failure summaries, and mechanical code changes with a ready specification to the `routine` or `scoped_implementation` category. Reserve larger models for ambiguous architecture, product or design decisions, security, and high-risk correctness review. If complex work remains uncertain, report the evidence and escalate instead of repeating broad attempts.
- Keep orchestration and acceptance concise. Delegate meaningful bounded chunks with named inputs and expected short outputs; reuse existing agents when suitable. Fork with no inherited turns unless context is necessary, avoid redundant exploration, tests, and builds, and do not spawn agents for trivial commands or fan out specialists by default. Preserve required design, QA, and security gates.
- For each requested task, use subagents when a bounded, independent workstream or specialist review would improve speed, coverage, or token use. Do not spawn one for a trivial command or a tightly sequential task.
- Choose one task category from `.codex/model-routing.toml` before model-dependent delegation: `routine`, `scoped_implementation`, `complex_implementation`, `product_design`, or `critical_review`. Read its current model and reasoning effort there and pass them explicitly when the client supports overrides. Do not copy model IDs into agent definitions or other project docs. If a selected model is unavailable, use a suitable available model for that run and report the substitution.
- For `routine`, prefer the `routine` agent with named inputs and an expected result. For `scoped_implementation`, prefer `scoped_implementer` with an owning repository, bounded module, acceptance criteria, and validation. User-visible frontend work still requires a ready design handoff.
- For `complex_implementation`, `product_design`, and `critical_review`, use the appropriate specialist agent. The main agent owns integration, verifies delegated results, and remains responsible for approvals and final decisions.
- The lead retains acceptance, scope, and release go/no-go decisions. For bounded work, delegate mechanical task closeout to the `routine` category: verified task-owned process cleanup, scoped commit/push, and (when already authorized and validated) version bump, build/sign, tag, and release publication. Keep model selection in `.codex/model-routing.toml`.
- Every agent handoff that starts a background process must send its inventory to the assigned routine closeout owner, including command, PID/tool session/container ID, ports, working directory, purpose, and whether it is still needed. Never include secrets. Routine must stop only verified task-owned servers, watchers, containers, or daemons after consumers are done; try graceful shutdown first, verify the result, and report processes with uncertain ownership. Never kill broad process classes, user services, shared reused daemons, or delete volumes.
- For product or design work that connects Planner, Focus Timer, Finance, or Idea Space into a personal routine, consult the read-only `personal_systems` specialist for observations and ideas, then pass its report to Product and Designer. This specialist only reports; Product owns scope and acceptance criteria, and Designer owns the interaction handoff. Use the `product_design` routing category for this consultation.
- This is standing project guidance; the user need not request delegation or a model category again in each new chat.

## Git Rules

- Inspect Git status separately in the root workspace, `smart-paper/`, and `smart-paper-front/` before and after meaningful work.
- Do not merge to protected branches automatically.
- Do not force push.
- Do not rewrite history.
- Do not deploy production automatically.
- Do not run destructive Git commands unless the user explicitly asks for them.
- Keep commits scoped to the repository that owns the changed files.
- After completing and validating requested changes, the routine closeout owner creates a scoped commit and pushes it to the current branch. Include only files belonging to the task; leave unrelated user changes untouched. If a push fails, report the failure and keep the local commit.
- After validated requested user-visible Android changes, automatically release when build prerequisites pass under the maintainer’s standing authorization (2026-10-06). Physical-device and screen-reader checks are recorded follow-ups and must not hold publication. Documentation-only changes do not require an APK.
- For Android releases, the routine closeout owner follows `docs/release-workflow.md` after a validated parent handoff and under the maintainer's standing authorization: build a stable-signed APK, commit the APK and release record to the team repo, push `main`, then push the `smart-paper-v*` team tag so GitHub Releases publish automatically. A release preflight alone does not authorize publication.
- Normal scoped commits, pushes, and release tags are allowed when they complete the requested work; human approval is still required for destructive Git, production deploys, production data changes, or secret exposure.

## Engineering Workflow

For meaningful changes, follow:

UNDERSTAND -> SPECIFY -> PLAN -> IMPLEMENT -> TEST -> REVIEW -> FIX -> VERIFY -> DOCUMENT

For any task that changes a user-visible screen, interaction, copy, or flow, Designer must review the current behavior and save a design handoff under `design/` before frontend implementation begins. Use the repo-native Storybook studio in `design/studio/` as the primary editable canvas; link the affected stories and cover English and Persian states. Figma may supplement the handoff when requested or available. Product defines the problem and acceptance criteria first when scope or user value is uncertain. Frontend starts only after the handoff is marked ready for implementation. For a task with no user-facing effect, record `Design: not applicable` in its task or plan instead of inventing a screen design.

The repository files are durable project memory. Agents should inspect the repositories and docs rather than relying only on conversation context.

Design completion is an intermediate step for requested changes. When Designer recommends the change and marks its handoff ready for implementation, automatically continue through frontend implementation, testing, review, fixes, verification, documentation, and scoped commit/push. Do not stop at the design artifact or ask whether to implement it. Follow an explicit user limit such as design-only or review-only when given. If Designer rejects the change or a required design decision remains unresolved, explain that finding before implementing dependent work. The existing safety approval boundaries still apply.

For multi-step, cross-repository, migration, or release work, create or update a task document from `tasks/TEMPLATE.md`. Keep it concise and evidence-based. Small local fixes do not require one.

## Product Boundaries

- Do not invent product capabilities that are not present in the code or durable docs.
- Mark uncertain product assumptions as `Needs confirmation`.
- Do not implement product features during workspace setup or documentation-only tasks.

## Validation Expectations

- Backend changes should use commands discovered in `smart-paper/AGENTS.md`.
- Frontend changes should use commands discovered in `smart-paper-front/AGENTS.md`.
- Documentation changes should be validated for obvious syntax and link/path accuracy.
- A feature is not complete until acceptance criteria pass, relevant automated checks pass, no unresolved critical/high review finding remains, and docs are updated where necessary.

## Memory Maintenance

Update durable memory in the same change when facts move:

- `STATUS.md`: current capability, current risk, repository revision, and latest relevant validation only.
- `PRODUCT.md`: user-visible behavior or explicit product boundary changes.
- `feature.md`: short feature list and most recent completed work; keep it current after user-visible changes.
- `ROADMAP.md`: priority changes; remove work that is complete.
- `docs/architecture.md`: contracts, persistence, integration, or system-boundary changes.
- `docs/database.md`: entity, relationship, ownership, migration, or backup-contract changes.
- `docs/decisions.md`: only decisions that constrain future work or would otherwise be debated again.
- `tasks/`: active work context, acceptance criteria, verification, and handoff for meaningful tasks.
- `releases/`: shipped history. Reset `releases/NEXT.md` after a release.

Prefer replacing stale status facts over appending a new chronological entry. Git and release records preserve the chronology.

## Safety Boundaries

The AI team may autonomously inspect code, edit code on working branches, write tests, run local checks, update docs, prepare commits, and prepare PRs.

Human approval is required before merging to production/main, deploying production, modifying production databases, deleting production data, rotating production credentials, destroying infrastructure, exposing secrets, or performing irreversible Git operations.
