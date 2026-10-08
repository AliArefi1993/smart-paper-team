# Task: Make the AI report ChatGPT handoff reliable

Status: implemented and reviewed; release candidate validated, publication pending
Created: 2026-10-07
Updated: 2026-10-08

## Objective

Investigate and resolve the maintainer-reported problem with **Open ChatGPT** in the Android AI report flow. Establish a reliable, understandable report handoff before depending on it for the proposed Planner week-sharing shortcut.

## Context

- Maintainer confirmed on 2026-10-08: tapping Open ChatGPT opens the app then redirects to the ChatGPT website; nothing is attached. Android/ChatGPT versions remain unrecorded; ChatGPT app presence is maintainer-reported.
- Source confirms the action is a plain `https://chatgpt.com/` anchor with no report payload; it cannot attach a report. The precise app-to-site routing remains device-dependent.
- Independent review confirms native cache sharing has no separate recovery action, and fresh source reads can differ from the reviewed preview.
- Roadmap: [Confidence In The Shipped Android App](../ROADMAP.md#current-goal-confidence-in-the-shipped-android-app).
- Owning implementation repository: `smart-paper-front/`. Current product contract: [PRODUCT.md](../PRODUCT.md).
- Related proposed improvement: **Review this week with AI** on Planner, opening the existing report with the viewed week's dates selected. This task records the prerequisite issue, not authorization to implement that shortcut.

## Acceptance Criteria

- [ ] Capture actual versus expected behavior, reproduction steps, app/Android/ChatGPT versions and installed-app state.
- [x] Review the current handoff and supported Android sharing behavior; determine a fix from evidence.
- [ ] Users can deliberately copy or share the reviewed report, with manual text selection and clear paste/review/send instructions when direct sharing or clipboard access is unavailable; record actual recipient behavior separately.
- [x] Copy distinguishes opening ChatGPT from attaching/sending the report; no unsupported promise of automatic attachment or sending.
- [ ] Handle missing ChatGPT, cancellation and sharing failure without losing the report or changing planner records.
- [x] Preserve field/date selection, preview, and finance-off-by-default boundaries. No backend, account connection or embedded AI is introduced.
- [ ] Verify relevant English/Persian and accessibility states, automated checks and Android phone handoff behavior; record any unexecuted native checks explicitly.
- [ ] Update documentation and follow the normal validated Android release workflow when implemented.

## Non-Goals

- App-specific undocumented deep links, automatic uploads/sending, new native plugins or backend services.
- Implementing the Planner shortcut, AI accounts, model APIs or a server.

## Plan

1. Gather reproduction evidence and inspect the owning repository's instructions and handoff code when this task is started.
2. Designer reviews current behavior and saves a ready bilingual handoff/studio states before frontend changes.
3. Implement the bounded fix, test/review/fix, verify and document its limits.
4. Release after validation under the existing workflow; assess the Planner shortcut separately.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Issue evidence | Maintainer report on 2026-10-07 | Reported; not reproduced |
| Maintainer reproduction | ChatGPT app opens then redirects to site, nothing attached | Confirmed symptom; versions pending |
| Source and specialist review | Plain URL has no payload; native cache is not external download; fresh share source can differ from preview | Bounded corrective scope selected |
| Product/Designer | [Product brief](../design/2026-10-08-ai-report-handoff-product.md) and [ready handoff](../design/2026-10-08-ai-report-handoff-design.md) | Scope approved; bilingual studio typecheck/build and bounded render checks passed |
| Implementation | Bounded file/copy/manual handoff with preview freshness/auth checks | Implemented |
| Automated checks | Docker lint, TypeScript and all 57 tests | Passed |
| Review/fix | Formatter import, stale fallback preview, native cancellation, test fixtures | Findings corrected; final independent review has no blockers |
| Actual browser QA | [Bounded QA](../design/2026-10-08-ai-report-handoff-qa.md): exact copy, manual selection, refreshed-preview second click, clipboard denial, cancellation, finance expiry, invalid/empty range; production Light/Dark comparison in EN/FA | Passed recorded desktop/responsive cases; native recipient behavior remains unverified |
| Signed Android candidate | `scripts/build-android-release-docker.sh`, `apksigner`, aapt, exported-asset comparison | Passed; code25/name2026.10.8, stable certificate, all 136 exported files byte-match; two zero-byte Cordova bridge shims also packaged. `npm ci` reported 21 advisories; no clean audit claimed. |
| Publication | Coordinated commits/tags and GitHub asset verification | Pending team commit/tag and public asset verification |
| Physical Android | Clipboard, chooser/recipient, app versions and TalkBack | Unexecuted follow-ups |

## Decisions And Risks

- The missing attachment is explained by the old navigation-only URL. App-to-site routing and receiving-app file acceptance remain device-dependent and independently unverified; Android/ChatGPT versions remain unrecorded.
- Design: required; Product/Designer handoff before implementation.
- Selected scope: remove the misleading URL shortcut; retain file sharing and add deliberate Copy report with manual app/paste/send guidance. Neutral chooser feedback; selectable preview remains fallback when clipboard fails.
- Transfer must match the preview; recheck finance authorization and refresh changed source before a second deliberate transfer.

## Outcome / Handoff

Current user evidence resolves the missing-attachment symptom: navigation never carried the report. Product/Designer approved a minimal bilingual file/copy/manual handoff; implementation, automated checks, bounded interaction QA, production Light/Dark comparison, independent review, and signed build/package checks passed. Coordinated commits, tags and GitHub asset verification remain before publication. Phone app-to-site routing, installed versions and recipient delivery remain unverified; do not claim a native attachment path is certified.
