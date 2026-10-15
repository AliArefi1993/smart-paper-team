# Design: Android system Back

Status: ready for implementation
Updated: 2026-10-14
Owning frontend: Android activity, global navigation integration, Planner, Settings, Idea Reader and Diagnostics overlays.
Design type: proposed interaction correction; existing screen layouts and visible copy reused.

## Problem and evidence

The maintainer reports Android system Back exits rather than returning. Source review confirms no app-owned native Back handler, while several screens already implement close/cancel and unsaved-work protection. This report establishes the experienced failure, not a complete device-state reproduction. Product scope and acceptance are in the [task brief](../tasks/2026-10-14-android-back-navigation.md).

Current anchors: `weekly-planner.tsx` closeWritingView, closeScheduleDraft, closeTemplateSheet, handlePlannerNavigation; `settings-view.tsx` handleSettingsNavigation; `idea-reader.tsx` onCancel/onBack; `idea-space.tsx` readerBack/exitReader; `diagnostics-root.tsx` requestClose. These existing actions are the interaction baseline.

## Flow and bounded implementation contract

One Back gesture performs at most one action, in this order:

1. Android handles its current keyboard, native confirmation or external chooser. Dismissing these must not also close an app overlay or navigate. Actual OS/OEM ordering needs native evidence.
2. The top visible app overlay receives its existing close/cancel operation. This layer consumes Back even when a busy state or unfinished-description decision prevents closure. Do not bubble that same event to routes.
3. Before leaving a route or exiting root, apply its existing departure guard. Planner local save failure retains writing and Retry; Settings PIN work blocks departure and unsaved settings use the existing confirmation. Declining preserves the current screen. Never label failed or pending writes as saved.
4. Return to the previous valid Smart Paper route in the current app navigation session. Include meaningful route/query state such as the selected export report week. External history must not become an app Back destination. Do not infer a valid prior route solely from history length. Repeated Back must unwind, without re-adding the popped route or looping.
5. A directly opened non-Planner route with no prior app route returns to Planner. Planner with no prior route, overlay or unresolved guard permits normal platform exit. Planner reached through actual navigation still unwinds that history first. No new exit confirmation or double-Back toast.

| Context | Back result |
| --- | --- |
| Planner full writing view | Reuse closeWritingView. Preserve underlying week text and current save/error status; restore trigger focus. |
| Planner template sheet | Reuse closeTemplateSheet and its existing pending-form semantics and focus restoration. |
| Planner schedule editor | Reuse current Cancel semantics: discard unapplied form fields and close, without saving an event. This is deliberate parity with the current explicit Cancel; no new draft system or dirty-event prompt. |
| Planner pending-week decision | Cancel pending switch/keep current week, unless existing busy state prevents it. Never interpret Back as discard-and-switch. |
| Idea Reader | Reuse readerBack: previous thought first; at reader entry return to collection/daily context with existing scroll/focus restoration. Composer draft stays unchanged. |
| Diagnostics | Reuse requestClose: empty description may close; unfinished description opens current discard decision; busy/discard states consume Back. No implicit transfer, evidence selection or deletion. |
| Native destructive confirmation | Android dismisses/cancels confirmation first; no underlying route departure or destructive action. |
| Ideas composer / Finance | Existing navigation and draft semantics continue. Back does not publish a thought, submit income, unlock Finance, or invent a new broad form guard. |
| Timer | Route changes retain existing timer deadline recovery. Back does not reset/pause it. |

## Editable canvas and states

Primary canvas: [AndroidBack.stories.tsx](studio/src/stories/AndroidBack.stories.tsx). Open with `npm run storybook` from `design/studio/`.

- [English phone](http://localhost:6006/?path=/story/proposals-android-back--english-phone), [Persian phone](http://localhost:6006/?path=/story/proposals-android-back--persian-phone)
- [English wide/large text](http://localhost:6006/?path=/story/proposals-android-back--english-wide), [Persian wide/large text](http://localhost:6006/?path=/story/proposals-android-back--persian-wide)
- [Nested thought](http://localhost:6006/?path=/story/proposals-android-back--nested-thought), [Persian writing](http://localhost:6006/?path=/story/proposals-android-back--persian-writing), [Event Cancel](http://localhost:6006/?path=/story/proposals-android-back--event-cancel)
- [Unfinished report](http://localhost:6006/?path=/story/proposals-android-back--unfinished-report), [Unsaved Settings](http://localhost:6006/?path=/story/proposals-android-back--unsaved-settings), [Save failure](http://localhost:6006/?path=/story/proposals-android-back--save-failure), [Planner root](http://localhost:6006/?path=/story/proposals-android-back--planner-root)

These stories simulate the routing contract with an explicitly labelled studio-only Back button. They are not screen-fidelity mocks or native dispatch tests. No production Back button, explanatory copy, dialog or asset is introduced. Successful-save sample copy applies only after a successful save. Existing empty/loading/success/offline/error layouts are reused; these states do not change the Back priority. A blocking failure remains visible rather than becoming a silent exit.

## Language, layout and accessibility

No visual redesign. Reuse current tokens, EN/FA translations, dialog labels, focus behavior and safe-area layouts. Stories show 390px content and 960px wide content, long EN/FA writing, 24px enlarged text, RTL/LTR, visible focus and controls at least 48px tall. Examples: “Back to previous thought” / «بازگشت به فکر قبلی»; “Your unfinished writing is unchanged.” / «نوشتهٔ ناتمام شما تغییر نکرده است.» Existing production translations are authoritative.

Closing overlays restores focus through their existing callbacks; route changes keep existing heading/navigation accessibility behavior. Keyboard dismissal takes precedence over overlay closure. Do not move focus to a vanished control or announce a background route while the overlay stays open. Story alertdialog is an explanatory simulator rather than a replacement for current dialog implementations. TalkBack, predictive gesture behavior and physical IME dismissal remain native follow-ups.

## Decision and verification

Designer recommends this correction; Product agreed priority, root policy and existing Cancel semantics. No required interaction decision remains. Frontend implementation may proceed. Readiness is based on the bounded source-grounded contract and inspected studio; implementation/native behavior is not yet validated.

| Check | Evidence | Result |
| --- | --- | --- |
| Baseline comparison | Reviewed existing production overlay, navigation, save/draft and Settings guard callbacks listed above; no running app baseline available at handoff. | Source-grounded; runtime comparison follows implementation. |
| Studio checks | `npm run typecheck`, `npm run build` passed; existing large-chunk warning only. | Pass; final copy/large-text adjustment rechecked successfully. |
| Phone and wide EN/FA | Browser inspected route EN/FA, Persian unfinished-report decision and wide layouts. Long writing and 24px layouts included. | Studio reviewed; full native behavior unverified. |
| Interaction/accessibility | Simulated Persian route Back, unfinished-report decision, nested thought Back, event Cancel and blocked save-failure Back; inspected semantic labels, RTL and focus styling. EN/FA long writing at 24px inspected after final build. Current controls/guard messages reused. | Bounded pass; TalkBack/IME not tested. |
| Required implementation acceptance | Final Designer source comparison: native IME dismissal precedes JS; coordinator consumes one top dialog/Planner surface, reuses departure guards, tracks app-only history/query state, replaces fresh secondary entry with Planner and allows unguarded root backgrounding. Existing screens/copy unchanged. [QA report](2026-10-14-android-back-navigation-qa.md) covers 18 new and 12 existing passing browser cases across full/focused runs. | Source and bounded browser behavior accepted; no design finding. Exact-source CI and native device evidence remain separate. |

Open required decisions: none. Remaining evidence gaps: Android keyboard/chooser/gesture/TalkBack/device behavior. No new visual layout/copy requires an additional runtime visual comparison; QA owns the interaction comparison.
