# Smart Paper Team Workspace

This repository coordinates the Smart Paper product. It stores durable project context, release records, and agent configuration; application code lives in two independent Git repositories.

## Project Home

- [Current status](STATUS.md)
- [Shipped capabilities](feature.md)
- [Prioritized roadmap](ROADMAP.md)
- [Prepared task index](tasks/README.md)
- [Release history](releases/README.md)
- Current Android release and verified download evidence: [STATUS.md](STATUS.md) → its latest published release record.
- [Growth & Community onboarding](docs/growth-community.md)
- [Persian Telegram channel](https://t.me/smart_paper_app) · [channel operating handoff](docs/growth/telegram-channel.md)

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
| [`skills/`](skills/) | reusable Product, Designer, Personal Systems, and Growth workflows |
| [`releases/`](releases/README.md) | shipped release records and APK artifacts |

## Fast Start

For the current state, run:

```bash
scripts/project-context.sh
```

Then read `STATUS.md` and only the task-specific document identified in `AGENTS.md`. Application work must also follow the nearest repository-specific `AGENTS.md`.

## Keeping Project Context Current

`feature.md` describes shipped capabilities; `ROADMAP.md` owns future-work priority; task files hold scope and evidence; release records hold shipped verification. At task or release closeout, update only the sources affected by changed facts, link evidence instead of copying it, and leave unexecuted device checks open. Do not add completed history to the roadmap.

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
