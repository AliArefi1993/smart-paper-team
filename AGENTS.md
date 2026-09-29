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
   - release or Android packaging: `docs/release-workflow.md`, `releases/NEXT.md`, and the latest relevant release record
   - implementation: the owning repository's `AGENTS.md`, then the relevant code and tests
4. Use `rg` and narrow file reads before opening large files. Treat code and migrations as authoritative for implementation details.

For a small, repository-local task, do not read product, roadmap, architecture, and release docs unless the task needs them.

## Chat And Token Budget

- Continue the current chat while pursuing the same unfinished objective or reviewing its result.
- For an unrelated objective, recommend a fresh chat in this project; its context comes from `STATUS.md`, the relevant task file, and narrow code reads, not a copied transcript.
- If the same objective continues but the chat grows slow or its context indicator is low, suggest Codex's compact action before starting over. Use a side chat for a short tangent when available.
- At a meaningful task boundary, leave only the essential result, remaining blocker, and next action in the relevant task/status files. Do not append conversation summaries or preload unrelated history.
- Do not start new chats or scheduled context checks automatically; suggest them only when useful and let the user choose.

## Git Rules

- Inspect Git status separately in the root workspace, `smart-paper/`, and `smart-paper-front/` before and after meaningful work.
- Do not merge to protected branches automatically.
- Do not force push.
- Do not rewrite history.
- Do not deploy production automatically.
- Do not run destructive Git commands unless the user explicitly asks for them.
- Keep commits scoped to the repository that owns the changed files.
- After completing and validating requested changes, create a scoped commit and push it to the current branch automatically. Include only files belonging to the task; leave unrelated user changes untouched. If a push fails, report the failure and keep the local commit.
- For Android releases, follow `docs/release-workflow.md`: build a stable-signed APK, commit the APK and release record to the team repo, push `main`, then push the `smart-paper-v*` team tag so GitHub Releases publish automatically.
- Normal scoped commits, pushes, and release tags are allowed when they complete the requested work; human approval is still required for destructive Git, production deploys, production data changes, or secret exposure.

## Engineering Workflow

For meaningful changes, follow:

UNDERSTAND -> SPECIFY -> PLAN -> IMPLEMENT -> TEST -> REVIEW -> FIX -> VERIFY -> DOCUMENT

The repository files are durable project memory. Agents should inspect the repositories and docs rather than relying only on conversation context.

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
