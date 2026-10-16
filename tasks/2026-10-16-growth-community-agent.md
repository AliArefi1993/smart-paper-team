# Task: Add Growth & Community to the team

Status: complete
Created: 2026-10-16
Updated: 2026-10-16

## Objective

Equip a dedicated agent to prepare Smart Paper sharing and early-user learning, with current product evidence and clear ownership boundaries.

## Context

- User requested role setup and necessary information/skills before recruitment.
- Owning repository: team coordination root only.
- Design: not applicable; no app screen, interaction, or public campaign is changed.
- Sources: [product](../PRODUCT.md), [status](../STATUS.md), [onboarding](../docs/growth-community.md).

## Acceptance Criteria

- [x] Growth role is registered alongside existing agents and points to valid instructions.
- [x] Focused repo-local skill and onboarding brief define sources, responsibilities, handoffs, measurement, and authorization boundaries.
- [x] Configuration, skill metadata, local links, and scope checks pass.
- [x] Scoped team commit is pushed; app repositories remain untouched.

## Non-Goals

- No campaign execution, audience selection, outreach, spending, telemetry, or app/release changes.

## Plan

1. Add role, reusable workflow, and factual onboarding brief.
2. Review boundaries and validate configuration, skill, and links.
3. Update discovery/status pointers and complete scoped commit/push.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Initial scope | Separate root/backend/frontend Git status | All clean; root main f4dbc2d, backend 68c789b, frontend 40c3516. |
| Configuration | Python tomllib parses config and all registered role files; role names/required fields and paths checked | Passed. |
| Skill | Ruby safe YAML parse, required metadata/name/description bounds, and scaffold check | Passed. Bundled quick_validate.py could not run because PyYAML is absent; temporary install failed at network DNS. No project dependency changed. |
| Links and whitespace | 13 local links across new skill/brief/task; git diff --check | Passed. |
| Independent review | Routine review of role, registration, skill, and onboarding | No major finding; clarified text-only growth drafts preserve Designer ownership. Task marked for final closeout. |
| Scope | Separate backend/frontend Git status | Both clean and unchanged before and after closeout. |

## Decisions And Risks

- Role key `growth`; display purpose Growth & Community. Reuse existing model-routing categories instead of pinning a model in its definition.
- Repository-local skill is explicitly referenced by the role, matching existing project conventions; runtime role loading is separate from file validation.
- Audience, budget, channels, pricing, and first pilot details remain open. Public user arrival triggers review of existing pre-user release authorization, not an automatic policy rewrite.

## Outcome / Handoff

The Growth & Community role, repo-local workflow, and evidence-based onboarding brief are complete and pushed in the scoped team commit. The next bounded assignment is to prepare one small early-user pilot proposal for maintainer review; no pilot, outreach, spending, telemetry, or publication has started. Agent runtime spawning was not exercised because this chat's available role inventory predates the configuration edit. Both temporary pip processes exited; no task-owned background process remains.
