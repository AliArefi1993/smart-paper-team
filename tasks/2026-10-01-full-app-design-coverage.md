# Task: Design coverage for shipped app

Status: partial — design baseline recorded; Figma Starter tool limit blocks full frame coverage
Created: 2026-10-01
Updated: 2026-10-01

## Objective

Document every shipped Android-facing Smart Paper route in editable design artifacts and durable design records, then make a ready Designer handoff a required step before future user-visible implementation. Complete Figma coverage remains the target once the account tool limit permits it.

## Context

- Team repository owns design records and agent workflow; `smart-paper-front/` owns the frontend development rules.
- Current Figma file: [Smart Paper — Product Design](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n).
- Route/feature/state inventory: `design/screen-inventory.md`.
- Existing editable design coverage before this task: foundations and Idea Space English/Persian populated mobile proposals.

## Acceptance Criteria

- [x] Each shipped route has an editable English and Persian repo-native mobile structural draft linked from the inventory. Figma frame coverage remains open.
- [x] Key feature flows and important interaction states are recorded for every route in the inventory and route briefs. Materially different Figma states remain open.
- [x] Repo-native drafts use the current paper/teal palette; all are marked as structural drafts rather than approved redesigns. Figma parity remains unverified.
- [x] The team and frontend instructions require Designer's ready handoff before user-visible implementation.
- [ ] Figma screenshots and structure are reviewed. Starter tool limit stopped screenshots; documentation and repository checks are recorded below.
- [x] Scoped team and frontend commits are pushed; unrelated changes remain untouched.

## Non-Goals

- Implementing a redesign across all frontend screens in this task.
- Claiming physical Android validation from Figma frames or browser screenshots.
- Adding product capabilities not present in the code.

## Plan

1. Inventory shipped routes, flows, variants, and design gaps.
2. Build editable current-behavior baselines in Figma using Smart Paper foundations; use repo-native designs when Figma is unavailable.
3. Record route handoffs, frame links, states, and verification limits.
4. Enforce the design-first gate in agent and repository instructions.
5. Validate and commit/push the owning repositories.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Route/state inventory | Code, `PRODUCT.md`, `feature.md`, route briefs | Recorded |
| Editable bilingual structural drafts | `design/coverage-atlas.html` | Present; visual QA pending |
| Figma frame coverage | Idea Space frames `3:2`/`3:32`; Planner drafts `15:2`/`15:55` | Planner visual QA and five routes pending; Starter tool limit |
| Documentation syntax/paths | `git diff --check`, HTML parser, JavaScript syntax, local link checks | Passed; visual rendering not checked |
| Agent configuration | Python `tomllib` parse | Passed |

## Decisions And Risks

- Baseline designs document what is shipped. Future changes need a distinct proposal and a ready implementation handoff.
- Figma frames alone do not prove interaction, accessibility, or Android runtime behavior. Records must name unverified states.
- The planner and export routes contain many nested flows; a representative primary frame plus targeted state frames and a written state map is more useful than duplicating every minor status message visually.
- The Figma Starter tool returned a plan-limit error immediately after the Planner EN/FA draft write; screenshots and further writes failed. The browser UI blocked opening the repo's local HTML file by policy, so visual QA of the atlas is also pending. Static validation is possible and does not substitute for visual review.

## Outcome / Handoff

All seven routes have source-backed flow/state coverage and bilingual editable HTML structural drafts; Planner and Idea Space also have Figma frames. The Planner frames are not visually verified. Timer, Summaries, Finance, Export, and Settings Figma frames and targeted state variants remain. No baseline is a `ready for implementation` redesign handoff. Frontend agent instruction revision `6e13acd` was pushed to `main`; this team's commit revision is recorded by Git. Resume frame creation and EN/FA visual comparison when Figma access is available, then inspect the atlas or running UI in a permitted browser/device and fix any fidelity gaps.
