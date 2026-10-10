# Task: Evaluate Microsoft Clarity for Android UX diagnostics

Status: planned
Created: 2026-10-10
Updated: 2026-10-10

## Objective

Determine with a bounded QA and privacy review whether Microsoft Clarity can safely and usefully help reproduce Smart Paper UX behavior and failures in its packaged Android app.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Related work: [Local problem reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md).
- Owning repository: `smart-paper-front/` for any future app integration; this task is evaluation only.
- Microsoft documents the [Clarity Mobile SDK](https://learn.microsoft.com/en-us/clarity/mobile-sdk/) and its [Android overview](https://learn.microsoft.com/en-us/clarity/mobile-sdk/mobile-sdk-overview), plus [SDK masking](https://learn.microsoft.com/en-us/clarity/mobile-sdk/clarity-sdk-masking). Documentation describes Android buffering and upload to Clarity servers, and masking defaults/options; it does not establish compatibility with Smart Paper's Capacitor 8 packaged local WebView.
- Existing reporting scope remains local-only with no upload. Hosted telemetry requires an explicit product decision.

## Acceptance Criteria

- [ ] Verify whether the Clarity Mobile SDK works with Smart Paper's Capacitor 8 packaged local WebView; do not infer this from guidance for websites or from support for other hybrid frameworks.
- [ ] Produce an isolated pilot plan using synthetic data, including setup, removal/disable steps, and boundaries that prevent real user data from entering the pilot.
- [ ] Define QA cases for English and Persian RTL replay accuracy across keyboard use, rotation, and app resume; record observed results only after executing them.
- [ ] Test whether masked replay provides enough detail to reproduce blocked flows. Include displayed saved freeform text as well as input fields; do not assume default masking protects all rendered app content.
- [ ] Distinguish JavaScript errors, native crashes, storage failures, and import/export failures from behavior analytics; document which Clarity signals help and which failure modes remain uncovered.
- [ ] Assess masking for all Planner, Idea Space, Finance, PIN, import, and export content, including event metadata. Review user consent and disable controls, network transfer, retention, access and deletion, and offline, data, battery, and performance costs.
- [ ] Compare the evidence and costs with planned voluntary local diagnostics and manual report sharing.
- [ ] QA and Security provide an evidence-based adopt, reject, or defer recommendation with blockers. No hosted telemetry is adopted without an explicit product decision.

## Non-Goals

- Implementing or enabling Clarity in the app.
- Using production or personal user data for evaluation.
- Changing the current local-only voluntary reporting scope.
- Treating session replay or behavior analytics as crash/error diagnostics.

## Plan

1. Confirm SDK applicability and data-flow/masking claims from Microsoft documentation and the packaged app configuration.
2. Prepare a synthetic-data isolated pilot and repeatable bilingual QA matrix; obtain required Product, Designer, QA, and Security review before any UI or integration work.
3. Run only the approved pilot, record observed results and costs, compare with local diagnostics, and document the recommendation and blockers.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Documentation review | [Clarity Android overview](https://learn.microsoft.com/en-us/clarity/mobile-sdk/mobile-sdk-overview) and [SDK masking](https://learn.microsoft.com/en-us/clarity/mobile-sdk/clarity-sdk-masking) | Reviewed for planning; Smart Paper compatibility and behavior not verified |
| Compatibility and QA matrix | Synthetic-data pilot, if approved and scoped | Not run |

## Decisions And Risks

- Microsoft documents Android local buffering followed by upload to Clarity servers; the service is not local-only.
- Documented masking defaults do not establish that all saved freeform content or event metadata is safe. Test rendered content and metadata explicitly.
- Clarity replay/behavior signals may not capture or explain JavaScript errors, native crashes, storage failures, or import/export failures; evaluate coverage separately.
- Design: not applicable for backlog-only work. Any future consent, settings, or disclosure UI requires a ready Designer handoff before frontend implementation.

## Outcome / Handoff

Planned evaluation only; no pilot or QA has been executed. Next action is to scope the synthetic-data pilot and obtain QA and Security review. Hosted telemetry still needs an explicit product decision.
