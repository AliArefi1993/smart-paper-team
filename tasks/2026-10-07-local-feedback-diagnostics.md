# Task: Local problem reporting and optional diagnostics

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Give Android users an easy-to-reach way to report a problem directly. Users may optionally record and share crash/error diagnostics and basic usage analytics to provide real-world QA evidence while Smart Paper remains offline and server-free.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; task memory belongs to the coordination repository.
- Current product: [PRODUCT.md](../PRODUCT.md). This capability is not implemented.

## Acceptance Criteria

- [ ] Report a problem is easy to discover; design determines placement, including relevant error states.
- [ ] Users can describe the problem and preview the report before sharing it through Android's share chooser, including email. Reporting works without enabling analytics.
- [ ] Separate, clearly explained optional controls govern local crash/error recording and basic usage analytics. Default states require a design/product decision; recording is never silently enabled.
- [ ] Diagnostics contain only allowlisted technical information such as app/device version, error codes and recent action names. Usage analytics contain minimal feature counts and flow outcomes.
- [ ] Exclude planner text, notes, ideas, finance records, PINs, credentials and other personal content from automatic collection. Scrub error messages/stack traces; do not collect raw state, screenshots or session replay.
- [ ] Users can inspect and delete collected records, and include or exclude them when manually sharing a report.
- [ ] Apply a bounded byte and age limit with automatic expiry/oldest-record removal; proposed starting limits are 2 MB and 14 days, subject to validation.
- [ ] No server, telemetry service or automatic network upload is used. Recording remains offline and does not delay normal interactions or compromise primary-data saving.
- [ ] Capture failures best-effort and explain limitations: sudden native crashes/process termination may leave incomplete or no diagnostics. Investigate JavaScript and native capture separately.
- [ ] English/Persian and accessibility states are designed and validated; cancellation sends nothing and preserves primary app data.
- [ ] Relevant automated checks, independent review, documentation and Android release workflow are completed when implemented.

## Non-Goals

- Implementation in the current documentation task.
- Automatic delivery, hosted monitoring, remote observation, session replay or full backups attached by default.
- Claiming voluntary reports represent all users or replace automated/physical-device QA.
- AI integration.

## Plan

1. Product confirms event scope, recording defaults, support destination and retention limits.
2. Designer reviews current entry points and saves a ready bilingual handoff in `design/` with editable studio stories before frontend implementation.
3. Implement bounded local recording, preview/delete controls and manual report sharing in the frontend repository; assess native crash capture feasibility.
4. Test storage limits/failures, privacy exclusions, settings, expiry, sharing/cancellation and offline behavior; review and fix findings.
5. Update product/status memory and follow the authorized Android release workflow after validation.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Planning record | Maintainer discussion on 2026-10-07 | Agreed direction captured; no implementation |
| Feature checks | Deferred until implementation | Not run |

## Decisions And Risks

- Automatic means local collection only; transmission always requires deliberate user sharing.
- Email sharing may disclose the sender's address and user-entered message to the recipient; automatic collection excludes personal app content.
- Exact placement, recording defaults, storage limits, event schema and native capture coverage remain open.
- Design: required before future implementation; this change only records future work.

## Outcome / Handoff

Planned future work only. Next action is Product/Designer scoping when the maintainer chooses to start this task. Do not implement based solely on this backlog entry.
