# Task: Refactor Idea Space around connected thoughts

Status: implementing from ready Designer handoff
Created: 2026-10-07
Updated: 2026-10-13

## Objective

Make relationships between saved thoughts understandable and easy to navigate. The maintainer finds Idea Space unnatural because they cannot find the relationship between two connected ideas. Refactor around that concrete problem before adding more writing features.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; product contract: [PRODUCT.md](../PRODUCT.md).
- Maintainer direction from 2026-10-07; selected under the 2026-10-13 instruction to continue the offline backlog.
- Current evidence: frontend `4a6736d`, Android 2026.10.21; [product brief](../design/2026-10-13-ideas-relationships-product.md).

## Acceptance Criteria

- [x] Product records source-derived branch examples and synthetic bilingual fixtures; scope is existing origin/branch lineage. Independent-note associations remain Needs confirmation, with no research or maintainer example claimed.
- [x] Review existing branching behavior and distinguish branch lineage from relationships between independently saved thoughts.
- [ ] Users can recognize and navigate the agreed relationships between thoughts through a tested, understandable interaction.
- [x] Product recommends direct origin/branch viewing using existing records. Explicit linking is unsupported for this cycle; no graph assumed. The maintainer chose existing branches first, and the Designer accepted the interaction handoff.
- [ ] Preserve saved notes, existing branch relationships, search, writing/draft recovery and local backup/restore through the refactor.
- [x] Product specifies unchanged schema/draft contracts and edit/deletion/import compatibility, including missing origins, duplicate IDs and cycles; implementation must verify preservation.
- [ ] Keep capture and retrieval usable offline; evaluate connected and unconnected notes, empty states and longer English/Persian writing.
- [x] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
- [ ] Relevant automated checks, independent review, documentation and validated Android release workflow are completed when implemented.

## Non-Goals

- Arbitrary independent-note links or relationship schema expansion during this improvement cycle. Implementation and release proceed after the ready Designer handoff under current backlog authorization.
- A predetermined graph UI, AI-generated relationships, server sync or a general notes-platform expansion.
- Planner/Timer integration unless separately scoped and authorized.

## Plan

1. Product scoping complete: bidirectional direct lineage viewing; incorporate any maintainer steering before dependent design.
2. Designer completed the [ready bilingual handoff](../design/2026-10-13-ideas-relationships.md), editable stories and actual rendered matrix; a Dark relationship-date contrast issue was corrected before acceptance.
3. Implement the bounded change, test/review/fix and verify data preservation and offline behavior.
4. Update durable product/status documentation and release after validation under the existing workflow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Direction | Maintainer 2026-10-07 problem plus 2026-10-13 backlog continuation | Scoped existing lineage first |
| Product source review | Frontend `4a6736d`: IdeaSpace, idea-notes, idea-draft, import validation/store and existing tests | Brief records exact viewing/return/draft/search/orphan/cycle/import contracts |
| Personal systems | Read-only report from `ideas_personal_scope` | Incorporated; direct lineage recommended, independent links unsupported |
| Designer handoff | [Bilingual editable stories and rendered evidence](../design/2026-10-13-ideas-relationships.md) | Ready for implementation; reviewed EN/FA, Light/Dark, phone/wide, landscape and key draft/relationship states |
| Physical device | Samsung A15 / Android 16; Mac USB host inventory | Host detects no attached device; cable/port and wireless preparation pending; no device QA run |
| Frontend implementation checks | Owning repository and approved acceptance criteria | Pending; no app behavior is claimed |

## Decisions And Risks

- Model remains existing `parent_id` lineage; no migration. Designer handoff settles interaction/focus/return presentation in the bilingual studio; implementation must verify behavior and data preservation.
- Whether independently saved thoughts need links is Needs confirmation; a concrete non-private example is required before future model expansion, not before this supported improvement.
- Consult the read-only personal_systems specialist during Product/Designer discovery under standing project guidance; Product owns scope and Designer owns the handoff.
- Design: ready for implementation; see the [Designer handoff](../design/2026-10-13-ideas-relationships.md). Physical-device pairing is not a prerequisite for beginning scoped frontend work, but native QA remains unverified.

## Outcome / Handoff

Product scope and the Designer handoff are complete; the handoff is ready for implementation under the lead’s current backlog direction. The maintainer selected existing branches first. Frontend implementation, focused relationship/draft/import checks, independent reviews and existing release gates remain pending. No application behavior or physical-device QA is claimed; the available Samsung A15 is not yet detected by the Mac host while cable/port and wireless preparation are unresolved.
