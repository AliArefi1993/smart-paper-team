# Task: Evaluate Microsoft Clarity for Android UX diagnostics

Status: complete — current adoption rejected; conditional technical pilot deferred
Created: 2026-10-10
Updated: 2026-10-13

## Objective

Determine with a bounded QA and privacy review whether Microsoft Clarity can safely and usefully help reproduce Smart Paper UX behavior and failures in its packaged Android app.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Related work: [Local problem reporting and optional diagnostics](2026-10-07-local-feedback-diagnostics.md).
- Owning repository: `smart-paper-front/` for any future app integration; this task is evaluation only.
- Microsoft documents the [Clarity Mobile SDK](https://learn.microsoft.com/en-us/clarity/mobile-sdk/) and its [Android overview](https://learn.microsoft.com/en-us/clarity/mobile-sdk/mobile-sdk-overview), plus [SDK masking](https://learn.microsoft.com/en-us/clarity/mobile-sdk/clarity-sdk-masking). Documentation describes Android buffering and upload to Clarity servers, and masking defaults/options; it does not establish compatibility with Smart Paper's Capacitor 8 packaged local WebView.
- Existing reporting scope remains local-only with no upload. Hosted telemetry requires an explicit product decision.

## Acceptance Criteria

The [documentary assessment and conditional pilot plan](../docs/clarity-evaluation.md), together with [decision D-018](../docs/decisions.md), resolve the current adoption decision. Independent QA and Security both recommend rejection because automatic hosted upload conflicts with the maintainer's offline/local-only reporting boundary; lead accepted that disposition on 2026-10-13. No pilot is needed to establish that conflict. The original technical scope is preserved below for a future explicitly selected pilot, not claimed as executed or required to reject current adoption.

- [x] Verify current primary-source data-flow and applicability evidence without inferring runtime compatibility.
- [x] Prepare an isolated conditional pilot and bilingual QA matrix; retain explicit unexecuted limits.
- [x] Compare documented diagnostic/privacy costs with voluntary local manual reporting.
- [x] Obtain independent QA/Security recommendations and lead disposition without adopting telemetry.

### Conditional pilot criteria — unexecuted

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

1. Review SDK applicability and data-flow/masking claims from Microsoft documentation and the packaged app configuration.
2. Prepare the conditional synthetic-data pilot plan and bilingual QA matrix; Product, QA and Security assess whether current adoption fits the local-only reporting boundary.
3. Lead rejects current adoption; do not run the pilot. Reopen only after an explicit decision to evaluate hosted synthetic testing, then require fresh scope and safety review before execution.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Documentation review | [Clarity Android overview](https://learn.microsoft.com/en-us/clarity/mobile-sdk/mobile-sdk-overview) and [SDK masking](https://learn.microsoft.com/en-us/clarity/mobile-sdk/clarity-sdk-masking) | Reviewed for planning; Smart Paper compatibility and behavior not verified |
| Compatibility and QA matrix | Synthetic-data pilot, if approved and scoped | Not run |
| Current Product assessment | [Evidence, options and conditional pilot plan](../docs/clarity-evaluation.md), 2026-10-13 | Recommend rejecting current adoption: hosted automatic transfer conflicts with local-only reporting |
| Independent QA/Security and lead acceptance | Read-only primary-source and matrix reviews, 2026-10-13 | Both reject current adoption and defer pilot; lead accepted. Guest links/export tokens and observable canary/replay-usefulness criteria tightened |

## Decisions And Risks

- Microsoft documents Android local buffering followed by upload to Clarity servers; the service is not local-only.
- Documented masking defaults do not establish that all saved freeform content or event metadata is safe. Test rendered content and metadata explicitly.
- Clarity replay/behavior signals may not capture or explain JavaScript errors, native crashes, storage failures, or import/export failures; evaluate coverage separately.
- Design: not applicable for backlog-only work. Any future consent, settings, or disclosure UI requires a ready Designer handoff before frontend implementation.
- Official [Ionic (Capacitor) installation guidance](https://learn.microsoft.com/en-us/clarity/mobile-sdk/cordova-ionic-sdk) makes integration plausible, but does not verify Smart Paper's Capacitor 8.5.1 packaged local WebView. Smart Paper supports API 24+, whereas Microsoft's current documented SDK range starts at API 29.

## Outcome / Handoff

Current adoption rejected after Product, independent QA/Security and lead acceptance; evaluation decision complete in [docs/clarity-evaluation.md](../docs/clarity-evaluation.md) and durable [decision D-018](../docs/decisions.md). This applies to Android diagnostics and does not set a general hosted-services ban. Continue the separately scoped voluntary local diagnostics/manual sharing work. No SDK, account, pilot, data transmission or telemetry-policy change occurred. A synthetic pilot is deferred until explicitly selected; conditional technical criteria remain unverified and must be reopened if adoption is reconsidered. No Android release is needed for this documentation-only decision.
