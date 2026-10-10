# Smart Paper Team Workspace

This repository coordinates the Smart Paper product. It stores durable project context, release records, and agent configuration; application code lives in two independent Git repositories.

## Project Home

- [Current status](STATUS.md)
- [Shipped capabilities](feature.md)
- [Prioritized roadmap](ROADMAP.md)
- [Prepared task index](tasks/README.md)
- [Release history](releases/README.md)
- Latest Android release: [2026.10.14 release record](releases/smart-paper-v2026.10.14.md) · [download APK](https://github.com/AliArefi1993/smart-paper-team/releases/download/smart-paper-v2026.10.14/SmartPaper-local-2026.10.14-release.apk)

## Workspace Map

| Path | Purpose |
| --- | --- |
| `smart-paper/` | Django backend repository |
| `smart-paper-front/` | Next.js frontend and Capacitor Android repository |
| [`STATUS.md`](STATUS.md) | concise current-state snapshot |
| [`PRODUCT.md`](PRODUCT.md) | implemented product behavior and boundaries |
| [`feature.md`](feature.md) | short feature list and recent completed work |
| [`ROADMAP.md`](ROADMAP.md) | prioritized future work |
| [`docs/architecture.md`](docs/architecture.md) | cross-stack architecture and contracts |
| [`docs/database.md`](docs/database.md) | persistence model and data ownership |
| [`docs/decisions.md`](docs/decisions.md) | durable decisions and their reasons |
| [`tasks/`](tasks/README.md) | context for active and completed multi-step work |
| [`design/`](design/) | product design briefs, interface foundations, and implementation handoffs |
| [`skills/`](skills/) | reusable Product and Designer workflows |
| [`releases/`](releases/README.md) | shipped release records and APK artifacts |

## Fast Start

For the current state, run:

```bash
scripts/project-context.sh
```

Then read `STATUS.md` and only the task-specific document identified in `AGENTS.md`. Application work must also follow the nearest repository-specific `AGENTS.md`.

## Repository Safety

The root, backend, and frontend have separate Git histories. Check each independently:

```bash
git status --short --branch
git -C smart-paper status --short --branch
git -C smart-paper-front status --short --branch
```

Commit files only in the repository that owns them. Validated task changes are committed and pushed automatically under `AGENTS.md`. Do not merge protected branches, deploy production, modify production data, or perform irreversible Git operations without human approval.

## Starting Meaningful Work

For a multi-step feature, migration, release, or cross-repository change, copy `tasks/TEMPLATE.md` to a descriptive task file and keep it updated. Small local fixes do not need a task document.
