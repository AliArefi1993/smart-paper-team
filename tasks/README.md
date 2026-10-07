# Task Documents

Task documents preserve the intent and verification context of meaningful work so a future agent can continue without reconstructing the conversation.

## Future Work

Use [ROADMAP.md](../ROADMAP.md) as the shared list of future work. Save a linked `planned` task here when an idea has enough agreed detail to preserve. A planned task does not authorize starting implementation immediately.

- [Local problem reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md): agreed direction; implementation not started.
- [AI report Open ChatGPT handoff](2026-10-07-ai-report-chatgpt-handoff.md): reported problem; investigation and implementation not started.

## When To Create One

Create a task document for work that is cross-repository, spans multiple sessions, changes data/contracts, prepares a release, or has several acceptance criteria. Do not create one for a tiny local fix with obvious scope.

## Naming

Use a short descriptive filename:

```text
tasks/YYYY-MM-DD-short-name.md
```

Copy `tasks/TEMPLATE.md`. Keep one document per cohesive outcome.

## Maintenance

- Record decisions and evidence, not a chronological transcript.
- Keep acceptance criteria and verification results current.
- Link to code, releases, or durable decisions instead of copying them.
- Mark the task `complete`, `blocked`, or `cancelled` when work stops.
- Completed task documents may remain in `tasks/`; Git history and filename search provide the archive.
- Update `STATUS.md` only with facts that remain relevant after the task ends.
