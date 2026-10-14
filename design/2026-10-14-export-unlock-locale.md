# Design: Export unlock feedback follows language

Status: ready for implementation
Updated: 2026-10-14
Owning component: `smart-paper-front/src/components/export-view.tsx`
Design type: proposed bounded correction

## Problem and evidence

The [previous browser review](2026-10-13-desktop-backlog.md#reproduced-keyboard-corrections--ready-for-implementation) observed English unlock-success feedback after EN→FA switching on Export. Current source stores `t("financeUnlocked")` as an already-translated string. The language toggle translates surrounding controls but cannot retranslate this stored text. Both translations already exist. This correction supports PRODUCT.md's bilingual local backup/export flow.

## Outcome and scope

Keep the current feedback in the current UI language: English **Finance unlocked.**; Persian **بخش مالی باز شد.** Reuse `financeUnlocked`, the existing emerald status text, location above preview counts, `role="status"`, language toggle, fonts, theme and direction. No copy, hierarchy, layout, asset or token additions are proposed.

Acceptance:

- English unlock followed by Persian switching displays the Persian success message; reverse switching restores the English message. Persian initial unlock also shows Persian.
- A language switch does not initiate another unlock, discard/reload the preview for this correction, change Finance authorization, reset import/report choices, or move focus away from the language control.
- Keep current unlock guards, PIN clearing, pending/disabled state, credential invalidation, session checks and error handling. Never treat translation as authorization or reinstate success after another operation replaces/clears it.
- Export filename/readiness messages and import result counts still replace unlock feedback through their current flow. This fix must not add unlock text to those messages, alter native import/Replace confirmation, or lose hidden-Finance recovery links.

## Interaction, states and layouts

Represent unlock success semantically and translate during rendering, rather than freezing a translated string. The implementation may use a discriminated feedback value; preserve other existing message text/data and every current clear/replace site. Avoid comparing translated strings or changing effects/session behavior to force a refresh.

Locked/initial/loading/error/export/import/destructive/offline behavior is current behavior and outside the proposed visual change. The proposal story deliberately shows only successful unlock and language switching with disposable illustrative counts. It does not simulate real authorization, sharing or import.

At 360–390px phone and wider screens the short success sentence wraps naturally, aligns with LTR/RTL and retains existing contrast roles in light/dark. Retain the live status region rather than adding an alert or autofocus; the new translation may be announced politely. No new keyboard actions or touch targets. Preserve current visible toggle focus, 48px control targets and text scaling. App-level language semantics remain authoritative.

## Editable canvas and handoff

[Story source](studio/src/stories/ExportUnlockLocale.stories.tsx): `EnglishPhone`, `PersianPhone`, `EnglishWide`, `PersianWide` under **Proposals/Export unlock locale**. The language button demonstrates both directions; wide variants enlarge text to 24px. Story IDs: `proposals-export-unlock-locale--english-phone`, `--persian-phone`, `--english-wide`, `--persian-wide` (same prefix for each).

Reviewer: Designer. Recommended and ready for implementation; no unresolved design decision. Frontend implementation and browser regression verification remain the lead's next steps.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Current running UI comparison | Recorded previous Export browser observation above plus current component/translation review | Existing mismatch confirmed; corrected app not yet implemented |
| Studio typecheck/build | `npm run typecheck`; `npm run build` in `design/studio` | Passed; build has existing large-chunk advisory |
| English/Persian phone and wide | Local built Storybook inspection at port 6023; 390px content and 896px wide; wide 24px text | Both directions show correct sentence, counts persist and focus stays on toggle |
| Accessibility/state boundary | Existing status role retained; text-plus-color feedback; no extra focus, controls or authorization paths | Source/story review passed; native Android/TalkBack unverified |

This is a ready correction specification and reviewed prototype, not a claim that the application fix or native behavior is validated.
