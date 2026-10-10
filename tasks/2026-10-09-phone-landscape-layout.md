# Task: Review and fix phone landscape layout

Status: in progress
Created: 2026-10-09
Updated: 2026-10-10

## Objective

Investigate the maintainer's report that Smart Paper does not look right when the phone rotates to landscape, and fix confirmed layout or interaction problems where needed.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Owning implementation repository: `smart-paper-front/`.
- Maintainer reports that removing the Planner footer improved landscape comfort (2026-10-10); review current screens and fix only reproduced problems.

## Acceptance Criteria

- [x] Reproduce and record affected screens, viewport sizes, and rotation behavior (event editor confirmed; bounded seven-route EN/FA review complete).
- [x] Confirmed issues are fixed: content and controls remain reachable without unintended clipping, overlap, or obstructive fixed areas in landscape.
- [x] Browser resize preserves current input, saved data, and usable navigation; native rotation remains a device follow-up.
- [x] Designer saves a ready handoff and editable English/Persian studio stories before frontend changes; portrait layout remains usable.
- [ ] Targeted checks, independent review, documentation, and the validated Android release workflow are completed if fixes are implemented; record physical-device follow-ups explicitly.

## Non-Goals

- Broad changes without reproduced landscape issues.
- Broad redesign or forced portrait orientation without a separate justified decision.

## Plan

1. Reproduce the report and identify affected routes and layout constraints.
2. Designer reviews current behavior and prepares a ready bilingual studio handoff for confirmed fixes.
3. Implement bounded fixes, test rotation and both orientations, review, and document.
4. Publish a validated Android release if application changes are needed.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Backlog scope | Maintainer report on 2026-10-09 | Recorded |
| Landscape reproduction | Designer running preview, EN 740×360: schedule panel extends from -60.5 to 420.5 px in a 360 px viewport | Confirmed; title and Add/Cancel clipped |
| Ready design | [Bilingual studio handoff](../design/2026-10-10-phone-landscape.md); Docker studio typecheck/build and rendered proposals | Passed before implementation |
| Implementation | Schedule panel only: dynamic height bound and internal vertical scrolling | Applied; independent Security source review accepted |
| Frontend lint / TypeScript / tests | Docker preview container: lint, tsc --noEmit, npm test | Passed, 66/66 tests |
| Targeted production QA | [QA record](../design/2026-10-10-phone-landscape-qa.md): EN/FA landscape bounds/scroll, title error, long-note resize, add/edit/reload/cancel | Passed; seven-route EN/FA matrix and portrait complete |
| Frontend source | Scoped commit `deaad89e3083d270fa74d7988c2ab99162cab674`, main pushed | Schedule CSS + versionCode 30/versionName 2026.10.13 only |
| Local-data production build | Docker node:24-bookworm npm ci + NEXT_PUBLIC_DATA_MODE=local npm run build | Passed; 10/10 static routes |
| Exact-source automatic CI | [Run 38076385159](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38076385159), deaad89e3083d270fa74d7988c2ab99162cab674 | Passed, including isolated APK verification/upload |
| Hosted stable build | [Run 38076417837](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38076417837), exact source deaad89e3083d270fa74d7988c2ab99162cab674 | Candidate and protected signing passed; independent downloaded APK review accepted |
| Signed artifact | Final artifact 11679541147, SHA-256 3189b69e5e79f6afd50dafbde7852f3fd4f925f77e23769ea22bc6c4a041d1d3 | Independent Security accepted: v2/v3 single pinned signer, identity/version/non-debug, checksum/size/source/run; compiled fix present |
| Task-owned preview cleanup | Routine gracefully stopped exact studio/preview containers after Designer/QA finished | Verified stopped; shared Docker daemon preserved |

## Decisions And Risks

- Design: ready bilingual handoff and editable studio stories approved before the schedule-panel implementation.
- Confirmed fix scope is the schedule editor only; other routes had no additional visible clipping reproduced in bounded EN/FA checks.
- EN Planner at 740×360 reports document scrollWidth 766; no visible element outside intended clipping/scroll containers was found. The visually hidden Friday summary may contribute (unproven). Track the measurement without claiming an additional visible defect.
- Native Android keyboard, safe areas, rotation and TalkBack remain unverified; template use/delete native-confirmation testing was tool-limited.
- npm ci reports 21 dependency advisories (1 low, 4 moderate, 14 high, 2 critical), unchanged from the prior release; no clean audit is claimed.

## Outcome / Handoff

Review authorized 2026-10-10. The event editor clipped its heading and actions at short landscape heights in English/Persian. Ready Designer handoff preceded a one-line schedule-panel height/scroll fix. Production QA and independent source review passed. Exact-source CI, protected signing and independent signed APK verification passed; publication/public-download validation is in progress.
