# Task: Refactor Idea Space around connected thoughts

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Make relationships between saved thoughts understandable and easy to navigate. The maintainer finds Idea Space unnatural because they cannot find the relationship between two connected ideas. Refactor around that concrete problem before adding more writing features.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; product contract: [PRODUCT.md](../PRODUCT.md).
- Maintainer direction from 2026-10-07; future work only.

## Acceptance Criteria

- [ ] Product captures concrete examples of related thoughts and confirms what relationships users need to express and rediscover.
- [ ] Review existing branching behavior and distinguish branch lineage from relationships between independently saved thoughts.
- [ ] Users can recognize and navigate the agreed relationships between thoughts through a tested, understandable interaction.
- [ ] Product/Designer determine whether existing relationships need clearer presentation, explicit linking is needed, or both; do not assume a graph is required.
- [ ] Preserve saved notes, existing branch relationships, search, writing/draft recovery and local backup/restore through the refactor.
- [ ] If persistence changes are needed, specify migrations, old-backup compatibility and safe relationship handling on edit/deletion/import before implementation.
- [ ] Keep capture and retrieval usable offline; evaluate connected and unconnected notes, empty states and longer English/Persian writing.
- [ ] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
- [ ] Relevant automated checks, independent review, documentation and validated Android release workflow are completed when implemented.

## Non-Goals

- Implementation or release during this planning request.
- A predetermined graph UI, AI-generated relationships, server sync or a general notes-platform expansion.
- Planner/Timer integration unless separately scoped and authorized.

## Plan

1. Product confirms open scope/acceptance decisions; inspect current owning-repository behavior when this task starts.
2. Designer reviews current behavior and saves a ready bilingual design handoff.
3. Implement the bounded change, test/review/fix and verify data preservation and offline behavior.
4. Update durable product/status documentation and release after validation under the existing workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Direction | Maintainer discussion on 2026-10-07 | Recorded as future work |
| Implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Final relationship model and interaction are unresolved; discovery/design must settle them before dependent implementation.
- Consult the read-only personal_systems specialist during Product/Designer discovery under standing project guidance; Product owns scope and Designer owns the handoff.
- Design: required before future implementation; current change is documentation only.

## Outcome / Handoff

Planned only; no app changes. Start Product/Designer scoping when the maintainer selects this task.
