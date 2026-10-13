# Task: Local problem reporting and optional diagnostics

Status: Product scoped; Designer handoff is next after the adopted baseline checkpoint
Created: 2026-10-07
Updated: 2026-10-13

## Objective

Give Android users an easy-to-reach way to report a problem directly. Users may optionally record and share crash/error diagnostics and basic usage analytics to provide real-world QA evidence while Smart Paper remains offline and server-free.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`; task memory belongs to the coordination repository.
- Current product: [PRODUCT.md](../PRODUCT.md). This capability is not implemented.

## Acceptance Criteria

- [ ] Report a problem is easy to discover; design determines placement, including relevant error states.
- [ ] Users can describe the problem and preview the report before sharing it through Android's share chooser, including email. Reporting works without enabling analytics.
- [ ] Separate optional local error-recording and usage-count controls both start OFF, including existing installs. They persist independently, fail closed and stop their own category immediately when disabled; recording is never silently enabled.
- [ ] Diagnostics follow the strict static schema in the [Product brief](../design/2026-10-13-local-diagnostics-product.md): packaged app/build version and coarse route/action/error codes; daily feature counts and observable aggregate flow outcomes. No device/OS identifiers or new device plugin in this cycle.
- [ ] Exclude planner text, notes, ideas, finance records, PINs, credentials and other personal content from automatic collection. Never collect raw error messages, rejection reasons or stack traces; do not collect raw state, screenshots, identifiers or session replay. The voluntary report description is composer-only, outside collected records and backups.
- [ ] Users can inspect and delete collected records, and include or exclude them when manually sharing a report.
- [ ] Apply automatic expiry/oldest-record removal on store access. Proposed starting defaults are 128 KiB serialized UTF-8 combined, at most 200 errors and 14 calendar days, subject to failure/quota validation; this tightens the original 2 MB proposal. Bound the description to 4,000 characters with visible feedback.
- [ ] No server, telemetry service or automatic network upload is used. Recording remains offline and does not delay normal interactions or compromise primary-data saving.
- [ ] Capture JS runtime/known operation failures best-effort and explain limitations. Separate source/API feasibility assessment is recorded in the Product brief: no native crash integration exists; no native crash SDK/handler is added this cycle. Sudden native crashes/process termination may leave incomplete or no diagnostics; never promise full crash coverage.
- [ ] English/Persian and accessibility states are designed and validated; cancellation sends nothing and preserves primary app data.
- [ ] Relevant automated checks, independent review, documentation and Android release workflow are completed when implemented.

## Non-Goals

- Implementation in the current documentation task.
- Automatic delivery, hosted monitoring, remote observation, session replay or full backups attached by default.
- Claiming voluntary reports represent all users or replace automated/physical-device QA.
- AI integration.

## Plan

1. Run the first adopted manual QA/discovery/maintenance baseline checkpoint at the next normal work boundary; this is not a release gate.
2. Designer reviews current entry points and saves a ready bilingual handoff in `design/` with editable studio stories before frontend implementation. Product scope is ready in the [brief](../design/2026-10-13-local-diagnostics-product.md): both controls OFF, strict event schema, proposed smaller storage defaults and user-owned chooser recipient. No support destination decision is required.
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
- Product defaults/schema/capture limits are specified in the brief. Designer owns placement and bilingual interactions; byte/count defaults need implementation validation and native sharing needs observed evidence.
- Design: required before future implementation; this change only records future work.

## Outcome / Handoff

Product scope is ready for Designer under the maintainer's sequential offline backlog direction. The next normal work boundary is the first adopted manual baseline checkpoint; after that, Designer reviews current behavior and prepares an editable bilingual studio handoff. Frontend implementation has not started and requires that handoff to be marked ready. No app code, implementation verification or release is included in this preparation.
