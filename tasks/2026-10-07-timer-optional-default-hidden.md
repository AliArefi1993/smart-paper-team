# Task: Make Timer optional and hidden by default

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Hide Timer from the default experience while retaining optional access. The maintainer does not find the standalone timer useful enough to prioritize further investment and does not trust connecting it to Planner.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; product contract: [PRODUCT.md](../PRODUCT.md).
- Maintainer direction from 2026-10-07; future work only.

## Acceptance Criteria

- [ ] Timer is hidden from default navigation for new users and can be enabled/hidden through a discoverable setting.
- [ ] Visibility persists locally across restarts and works offline.
- [ ] Preserve timer configuration and define safe upgrade/hide behavior for an active session.
- [ ] Define existing-installation defaults and hidden-route behavior without unexpectedly starting or resetting sessions.
- [ ] Timer remains independent of Planner; no automatic or optional planner-minute logging is added in this task.
- [ ] Relevant English/Persian and accessibility states are covered by a ready Designer handoff and editable studio stories before frontend implementation.
- [ ] Relevant automated checks, independent review, documentation and validated Android release workflow are completed when implemented.

## Non-Goals

- Implementation or release during this planning request.
- Timer expansion, Planner integration, session logging, coaching or new background alarms.

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

- Existing-user default and active-session behavior require design decisions.
- Further timer expansion is paused; maintain essential safety/reliability as needed.
- Design: required before future implementation; current change is documentation only.

## Outcome / Handoff

Planned only; no app changes. Start Product/Designer scoping when the maintainer selects this task.
