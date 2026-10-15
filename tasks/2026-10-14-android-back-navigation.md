# Task: Android system Back returns within Smart Paper

Status: publishing
Created: 2026-10-14
Updated: 2026-10-15

## Objective

Make Android system Back return through the user's current app context instead of closing Smart Paper while a previous screen or active app surface remains. Preserve existing save, cancel, draft recovery, Finance and root-exit behavior.

## Context

- User evidence: the maintainer reports that Android system Back closes the app instead of returning, and requests Product/Designer investigation and a fix.
- Product contract: [PRODUCT.md](../PRODUCT.md), Android offline EN/FA use and preservation of local records. Owning repository: `smart-paper-front/`; no backend change.
- Observed source: root layout has no app Back coordinator; Android MainActivity extends BridgeActivity without custom Back behavior. Source absence supports investigation; actual installed native event behavior remains to be verified.
- Idea reader already maps cancel to previous thought, then its collection/daily entry. Planner writing has a close action retaining current field values; template and event editors have existing close/cancel actions. Settings navigation confirms unsaved changes and blocks during PIN operations. Local Planner navigation blocks failed autosave. Diagnostics close respects busy state and deliberate report discard confirmation.
- Designer owns interaction review and bilingual studio handoff before implementation; this task defines behavior without prescribing a screen layout.

## Acceptance Criteria

Checked items are verified by source, browser and hosted build evidence. Physical Android dispatch is a recorded follow-up under the standing release policy.

- [x] From Planner → any existing secondary route, Android Back returns to Planner; from Planner → Settings → another route, successive Back actions return through the actual in-app route sequence once each.
- [x] A fresh non-Planner route with no app navigation predecessor returns to Planner; Back at Planner with no previous app route and no active surface/guard allows the normal Android exit behavior. No navigation loop or permanent Back trap.
- [ ] The native keyboard and OS-owned chooser/confirmation handle their own Back first; a single Back action never also closes a surface, changes route or exits unexpectedly.
- [x] Top app surface consumes Back through its existing cancel/close semantics before route navigation: Idea reader steps through viewed thoughts before returning to collection/daily context; Planner writing returns to its day with text intact; template/event editors use existing Cancel semantics; diagnostics preserves its busy/discard protections.
- [x] Android Back respects Settings unsaved-change confirmation and PIN-operation blocking; declining stays on the same route with drafts intact. Planner failed local autosave prevents route departure/root exit and preserves visible edits and Retry. Idea drafts retain their existing recovery behavior and are never silently published or deleted by Back.
- [x] Existing deliberate save, apply, delete, unlock, copy/share, report and import actions remain deliberate; Back performs none of them. Timer countdown recovery and Finance access rules remain intact after return.
- [x] EN/FA route, overlay, unsaved, save-failure and repeated-Back checks pass; cleanup/remount does not duplicate listeners. Web navigation retains its existing behavior.
- [x] Focused automated regressions, appropriate frontend checks and independent review pass; source/browser evidence and unexecuted physical Android/keyboard/TalkBack checks are distinguished honestly.
- [x] Relevant product/status/release documentation reflects verified behavior and remaining native gaps.

## Non-Goals

- New navigation destinations, visual redesign, double-Back exit prompts, a universal draft system, new persistence/schema, backend changes or timer/Finance feature changes.
- Changing existing event/template Cancel behavior into auto-save or adding unrelated discard confirmations.

## Plan

1. Designer reviews existing surfaces, guards and route entry behavior; saves ready bilingual studio handoff.
2. Frontend implements a bounded Android Back coordinator and connects existing context handlers/guards.
3. Verify route history, single-action surface priority, data safety and listener cleanup; perform independent review and fixes.
4. Update durable docs, commit/push scoped changes, and follow the authorized validated Android release flow.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Product evidence | STATUS, PRODUCT, root layout/MainActivity, Planner, Settings, Idea reader/draft, diagnostics source | Reviewed; no native reproduction yet |
| Designer handoff and bilingual studio | [Ready handoff](../design/2026-10-14-android-back-navigation.md), EN/FA phone/wide/large text; studio typecheck/build | Pass; simulated interaction only |
| Local frontend | Docker Node 24: lint, TypeScript, 178 unit tests and local-data build | Pass; includes 5 history regressions |
| Independent source review | Correctness and Security review of native callback, coordinator/history and existing guards | No actionable blocker; native runtime remains unverified |
| Browser acceptance | Chrome 155.0.8059.79: 18 new Back scenarios (EN/FA) and 12 existing regressions | All 30 cases pass across full run and focused rerun; two initial fixture-only failures corrected without app changes |
| Exact-source frontend checks | Frontend `6ec0eee66add646ee64f2fe335e9f044171a4531`, [CI 38630913342](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38630913342): lint/types/tests/build/browser | Pass; final complete browser suite passed all 30 in one run |
| Native compilation | Exact-source CI 38630913342, isolated Android verification APK assemble/verify | Pass; full run succeeded at the final SHA; no physical dispatch observation |
| Unsigned release candidate | [Stable build 38630950484](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38630950484), artifact `11925799407`, archive SHA-256 `12bb565171a458620773f51b9d8b284f95743e1137cc0c70fc59a1fec6efa461` | Independent Security accepted binary identity/version/non-debug status, source/provenance, all 113 web assets and native/web Back handlers; unsigned state confirmed |
| Protected signing | Same exact-source release run; final artifact `11927385937`, archive SHA-256 `3cceb7b0aa641876624464037954d92ccb86743dfdea5b1116377f5daf474690` | Pass after candidate review and required environment approval; transient API error resolved by bounded retry with unchanged protections |
| Final artifact Security | APK SHA-256 `4473ed6dd843b4875b9f241f6eafcfaf4cf786af3b561fde1c493531aaf2863a`, 4,413,888 bytes | Pass: one pinned v2/v3 signer, binary identity/version/non-debug, exact provenance and all 557 unsigned payload entries match; only signing metadata added |
| Publication | [Release record](../releases/smart-paper-v2026.10.27.md) | Lead release go; tagging/public anonymous verification pending |

## Decisions And Risks

- Recommended option: existing surface/guard → actual app route history → Planner fallback → platform root exit. High user value, moderate implementation size, bounded risk if one action consumes each event and existing guards are reused.
- Route-history-only handling is smaller but misses Idea reading and current edit/report surfaces; rejected as incomplete. Blanket interception is small but creates trapped navigation and unexpected root behavior; rejected.
- Keyboard/system-surface event dispatch and installed APK reproduction: **Needs confirmation** from native observation. Browser/studio success cannot establish these facts.
- Fresh secondary-route fallback to Planner is a Product/Designer choice based on existing “Back to Planner” links, not a reported user research finding.
- Existing drafts differ: Planner writing edits live fields; schedule/template Cancel discards their pending form state; Settings has explicit unsaved guards; Idea recovery remains storage-dependent. Preserve those contracts rather than promising every draft survives Cancel.

## Outcome / Handoff

Product, Designer, independent correctness and Security source reviews accepted the implementation. Docker checks and [bilingual browser acceptance](../design/2026-10-14-android-back-navigation-qa.md) passed. Frontend `6ec0eee66add646ee64f2fe335e9f044171a4531` is committed/pushed for Android 2026.10.27/code44; exact-source CI, protected signing and independent final artifact Security passed. The lead authorized publication of the exact verified APK; public verification remains pending. Physical Android behavior remains unobserved. The task-owned preview was stopped after QA; no task server remains.
