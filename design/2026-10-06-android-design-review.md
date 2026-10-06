# Design review: Android baseline and studio maintenance

Status: baseline reviewed; bounded studio/documentation refactor complete; fidelity gaps remain
Updated: 2026-10-06
Owning frontend: seven Android routes at `ab37ee8` / release `2026.10.4`
Design type: current shipped behavior; no new feature proposal approved

## Problem and evidence

The maintainer requested a Designer/Product/personal-systems/QA review of the product as it exists on Android. The studio mixes older structural sketches with later shipped interaction references. The old inventory incorrectly left Calm Planner approval pending and omitted shipped day minimization and app-wide appearance. This makes a prototype's completeness and the app's actual completeness difficult to distinguish.

Inputs: [Product review](2026-10-06-android-product-review.md), [personal-systems report](2026-10-06-personal-systems-review.md), `PRODUCT.md`, `STATUS.md`, foundations, Calm/day minimization/shared dark handoffs, frontend source, the earlier dark review's running-app screenshots, and personal-systems observations supplied by the parent. This is an Android local-data review. Django session/security behavior is separate; neither cloud sync nor background timer completion is part of the Android product.

## Outcome and scope

Maintain an honest review surface for the current Android product and expose concrete gaps before another flow redesign. Preserve the seven independent modules and familiar Save semantics. The studio is illustrative; it does not contain production storage or Android runtime behavior.

Completed refactor: move already shipped references into a clear Storybook group while preserving their original IDs; mark historical dark leaks as historical; label structural route frames accurately; align the day-disclosure soft-selection and dark Save colors with shared roles; isolate sample schedule time direction in Persian; refresh foundations and route/state inventory; replace the invented Summaries from/to filters with the shipped 1/3/6/12-month count selector; correct Ideas edit-state copy to say explicit Save is required and unsaved edits do not recover after reload. Application code and persisted data are unchanged.

## Current references and hierarchy

| User task | Editable reference | Fidelity limit |
| --- | --- | --- |
| Scan week, minimize/reopen day, keep hidden draft | [Day minimization](studio/src/stories/PlannerDayCollapse.stories.tsx), [phone dark](http://localhost:6006/?path=/story/proposals-planner-day-minimization--phone-dark), [unsaved](http://localhost:6006/?path=/story/proposals-planner-day-minimization--unsaved-draft) | Partial editor: week text, schedule sheets, templates and full writing remain contextual |
| Open a section, read long writing, explicitly save week | [Calm Planner](studio/src/stories/PlannerCalm.stories.tsx), [long writing](http://localhost:6006/?path=/story/proposals-planner-calm-flow--long-writing) | Original 2026.10.2 interaction reference; day disclosure/dark appearance are later additions |
| Shared dark roles across seven routes | [Dark route states](studio/src/stories/DarkMode.stories.tsx), [fixed excerpts](studio/src/stories/DarkCoverage.stories.tsx) | Structural route sketches and source-backed excerpts, not exact screenshots |
| Ideas, Timer, Summaries, Finance, Export, Settings | [Route references](studio/src/stories/) | Several controls illustrate states without executing a full flow |

The historic URLs retain `proposals-*` to preserve existing handoffs, although these references now describe shipped behavior. A future proposal must have a separate story/record and a ready decision before frontend implementation.

## States, bilingual behavior and Android review priorities

Phone English/Persian with LTR/RTL are the main review surfaces; wide is a regression context. Keep long realistic writing, mixed-direction times and dates, visible action words, 44px touch targets, focus outlines, and save feedback. Example bilingual continuity copy remains “Changes not saved” / “تغییرات ذخیره نشده”; no new production copy was approved.

Planner uses explicit week Save, Ideas uses explicit note Save with partial draft recovery, and Timer recovers countdown automatically. These differences are valid current behavior. Do not suggest that opening Timer logs minutes, Ideas schedules work, or Summaries coach the person automatically.

Personal-systems and Product source review identified a meaningful Ideas continuity candidate: Edit replaces composer text; Branch clears it; persisted draft recovers body without edit/parent context and excludes edit drafts. The present studio does not cover these transitions. A follow-up Product brief and Designer proposal should cover unsaved capture → Edit/Branch, cancel, navigation/native Back, restart, and storage failure in EN/FA before implementing a fix. This review is not a ready handoff for that change.

Remaining design/QA priorities:

- Compare implemented full flows against their own handoffs using current phone data, rather than expecting older structural baselines to match current geometry.
- Exercise backup/restore merge/replace and interrupted import with disposable fixtures; protect explicit finance opt-in and distinguish AI report from restorable JSON.
- Check Android keyboard/Back, text enlargement, sticky Save and safe areas, TalkBack order and disclosure announcements. Browser evidence cannot validate them.
- Check timer suspension/resume, opt-in morning notification permission/time, native share chooser and install/upgrade. These are runtime checks, not screen-only designs.
- Finance delete confirmation/recovery is a candidate for Product assessment (`Needs confirmation`); do not redesign it from speculation.

## Implementation handoff decision

This work is a design-library maintenance review. No new application flow is marked ready for implementation. Existing shipped handoffs remain implemented, and future changes follow the design-first gate. The current studio is suitable for reviewing selected hierarchy and states; it is not a comprehensive Android acceptance suite.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Existing running-app screenshots | Inspected [Planner EN](evidence/2026-10-06-planner-green/english-phone.png), [Planner FA](evidence/2026-10-06-planner-green/persian-phone.png), [Ideas FA edit](evidence/2026-10-06-app-dark/ideas-fa-editor.png) | Shared green roles, translated controls, phone save bar and expanded writing visible. These are earlier same-day screenshots, not a fresh device run |
| Fresh studio visual review | IAB inspected paired 390px PhoneDark, reopened EN/FA day and long writing, light UnsavedDraft collapse/reopen, corrected populated/empty Summaries selectors; WideDark header excerpt | Passed bounded review. Dark Save role and Persian schedule time corrected. Wide full editor and other complete flows were not rechecked |
| Studio types/build | `npm run typecheck`, `npm run build` in `design/studio` after final selector/style edits | Passed; existing large-bundle advisory only |
| Physical Android/TalkBack/native states | No device used in this review | Unverified follow-up |
