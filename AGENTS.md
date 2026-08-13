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

## Git Rules

- Inspect Git status separately in the root workspace, `smart-paper/`, and `smart-paper-front/` before and after meaningful work.
- Do not merge to protected branches automatically.
- Do not force push.
- Do not rewrite history.
- Do not deploy production automatically.
- Do not run destructive Git commands unless the user explicitly asks for them.
- Keep commits scoped to the repository that owns the changed files.
- For Android releases, follow `docs/release-workflow.md`: build a stable-signed APK, commit the APK and release record to the team repo, push `main`, then push the `smart-paper-v*` team tag so GitHub Releases publish automatically.
- Normal scoped commits, pushes, and release tags are allowed when they complete the requested work; human approval is still required for destructive Git, production deploys, production data changes, or secret exposure.

## Engineering Workflow

For meaningful changes, follow:

UNDERSTAND -> SPECIFY -> PLAN -> IMPLEMENT -> TEST -> REVIEW -> FIX -> VERIFY -> DOCUMENT

The repository files are durable project memory. Agents should inspect the repositories and docs rather than relying only on conversation context.

## Product Boundaries

- Do not invent product capabilities that are not present in the code or durable docs.
- Mark uncertain product assumptions as `Needs confirmation`.
- Do not implement product features during workspace setup or documentation-only tasks.

## Validation Expectations

- Backend changes should use commands discovered in `smart-paper/AGENTS.md`.
- Frontend changes should use commands discovered in `smart-paper-front/AGENTS.md`.
- Documentation changes should be validated for obvious syntax and link/path accuracy.
- A feature is not complete until acceptance criteria pass, relevant automated checks pass, no unresolved critical/high review finding remains, and docs are updated where necessary.

## Safety Boundaries

The AI team may autonomously inspect code, edit code on working branches, write tests, run local checks, update docs, prepare commits, and prepare PRs.

Human approval is required before merging to production/main, deploying production, modifying production databases, deleting production data, rotating production credentials, destroying infrastructure, exposing secrets, or performing irreversible Git operations.
