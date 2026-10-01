# Task: Product and design capability

Status: complete
Created: 2026-10-01
Updated: 2026-10-01

## Objective

Give Product and Designer stronger, reusable workflows and a durable place for design work, so future Smart Paper UI changes have reviewable designs and clearer implementation handoffs.

## Context

- Owning repository: team coordination root. Application repositories are unchanged.
- Current focus: Android-first local-data app, English/Persian UI, physical-device QA still pending.
- Existing agents had short role prompts and no saved design artifact workflow.

## Acceptance Criteria

- [x] Product and Designer have task-specific reusable skills and updated role instructions.
- [x] Designers can save artifacts in a documented `design/` workspace.
- [x] A selected visual tool has a clear path from editable design to frontend implementation.
- [x] Design handoff and verification cover Android phone, English/Persian, states, and accessibility.
- [x] No application behavior changes are implied by the documentation.

## Plan

1. Update agent responsibilities and reusable workflows.
2. Create design workspace, template, and current interface foundations.
3. Validate files, commit, and push the team repository changes.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Skill format | Frontmatter structure check on both skills | Passed; bundled validator unavailable because host Python lacks PyYAML |
| TOML syntax | Python `tomllib` parse | Passed |
| Paths and diff | `git diff --check`, targeted path checks | Passed |

## Decisions And Risks

- Figma is the preferred editable canvas because the available integration can create/edit designs and return structured design context to implementation agents. Its connection is not yet confirmed, so no Figma file or frame is claimed.
- Repo design records remain the durable handoff. Figma-generated code requires adaptation and validation against the frontend.
- The design process improves the conditions for better UI; actual design quality must be judged on a future concrete screen and device review.

## Outcome / Handoff

Product and Designer workflows, design workspace, and handoff template are ready. Connect Figma to produce editable frames in a future design task; use a saved repo artifact meanwhile. Run the first screen redesign through the new workflow and compare it on a physical Android device.
