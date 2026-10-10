# Lightweight feedback triage

Use this convention for voluntary maintainer or tester reports. Keep the original report and any attachments in their private source location; copy only sanitized facts into team documentation. Do not assume inbox access or permission to reply. The maintainer is the triage owner and decides whether a report warrants a task.

## Intake

Record only what is available. Ask for optional diagnostics only when needed, and remove names, contact details, account data, and unrelated content before retaining a sanitized summary.

```text
Date received:
App version/build and platform/device (if known):
Expected behavior:
Observed behavior:
Steps to reproduce, if known:
Impact and frequency:
Optional diagnostics or attachment reference (private; do not paste here):
Reporter follow-up permission/authorization: not assumed
```

## Triage

Use one state per actionable report:

- **Needs information** — a key detail is missing; record the specific question internally. Any reply must be explicitly authorized by the maintainer.
- **Reproduced** — the behavior was observed with a safe, synthetic fixture. Record environment and steps; keep observation separate from suspected cause.
- **Planned** — accepted for work and linked to an existing or new task.
- **In progress** — implementation or investigation is underway in that task.
- **Verified/closed** — acceptance evidence is recorded, or the report is closed as duplicate/out of scope with a reason and canonical link.

Set severity based on demonstrated impact, not speculation: **S1 critical** for confirmed data loss, security exposure, or a blocked primary flow with no practical workaround; **S2 high** for a serious impairment or repeatable loss limited to a secondary flow; **S3 normal** for a workaroundable functional defect; **S4 low** for cosmetic or minor friction. Promptly assess any report alleging data loss, security impact, or a blocked primary flow. Mark unconfirmed claims “reported, not reproduced” until evidence supports them.

Search task files, release records, and known issues for the same behavior before opening work. If it matches, link it as a duplicate to the canonical task and preserve only sanitized version/impact differences that matter. Otherwise create or update a task with steps, severity, owner (maintainer or named assignee), and relevant release/version links. Use synthetic data for reproduction; never use a reporter's personal data in fixtures.

## Closure

The task owner records the fix or disposition, exact version/revision where relevant, and the checks actually run with outcomes. Close as verified only when the reported behavior and acceptance criteria are checked; otherwise state what remains unverified. A duplicate closes against its canonical task and inherits no claim that the underlying defect is fixed. Do not commit raw reports, sender identities, attachments, or diagnostic/user content, and do not publish them in release notes. No automated ingestion, inbox access, telemetry, or reporting metrics are implied.

## Synthetic walkthrough

Synthetic report: “On Android build 2026.10.14, saving a Planner note sometimes removes the note; it happened twice. Expected it to remain after save. I have a screenshot.” Intake captures the build, expected/observed behavior and frequency. The screenshot stays private and is not copied into Git. Because data loss is alleged, assign provisional S1 for prompt assessment, state **Needs information** if the exact steps or whether the note was confirmed saved are unclear, and do not label a cause. If a synthetic local fixture reproduces loss after save, move to **Reproduced**, document the steps and evidence, then link/create an owned task and relevant release. If it cannot be reproduced, retain the observation as unconfirmed and request more detail only with explicit authorization.

Duplicate case: search finds an existing task for the same save-loss behavior. Link this report as a duplicate of that task; add the new build/frequency only if useful. Do not open a second fix task or claim verification.

Insufficient-information case: “The app is broken” has no build, expected/actual behavior, or steps. Set **Needs information**, note which details would distinguish a defect, and leave severity provisional. Do not infer a diagnosis or create an implementation task until evidence is sufficient; an authorized follow-up may be made by the maintainer.
