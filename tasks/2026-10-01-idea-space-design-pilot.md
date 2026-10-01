# Task: Idea Space design pilot

Status: complete
Created: 2026-10-01
Updated: 2026-10-01

## Objective

Apply the new Product/Designer workflow to one real screen and improve the Idea Space writing flow in the Android-first frontend.

## Context

- Design handoff: `design/2026-10-01-idea-space-composer.md`.
- Owning application repository: `smart-paper-front/`. Team design and task records are in this repository.
- No backend or persistence contract change.

## Acceptance Criteria

- [x] Writing field and save action are visually primary; optional sparks follow the editor.
- [x] Existing Idea Space workflows remain available in English and Persian.
- [x] Frontend lint, type check, tests, and local-data build pass.
- [x] A running browser review checks mobile English and Persian layout.
- [x] Design record reflects what was built and what remains unverified.

## Plan

1. Build and inspect editable Figma mobile proposals.
2. Implement the selected hierarchy in `IdeaSpace`.
3. Validate automated checks and running layouts; fix findings.
4. Update durable records, commit and push scoped changes in each owning repository.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Figma visual review | English and Persian frame screenshots | Passed; Persian header overlap fixed |
| Frontend automated checks | Docker `npm ci`, lint, type, 23 tests, local build; final lint/type/tests/build rerun | Passed |
| Browser review | English/Persian at 390px; no horizontal overflow; save visible; spark expand/select/focus checked | Passed |

## Decisions And Risks

- Figma is a visual proposal. The implementation retains full translated copy, all four sparks, and language controls that the compact frames omit.
- Physical Android verification remains a release readiness risk.

## Outcome / Handoff

The editable Figma frames and frontend implementation are complete. Frontend revision `820692a` was pushed to `main`. The design record captures the source rationale and physical Android follow-up.
