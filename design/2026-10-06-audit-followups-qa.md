# QA: audit follow-ups

Updated: 2026-10-07.

Target baseline: frontend `45d4130`; implemented follow-ups tested on the final local-data static preview on 2026-10-07. This record does not certify native Android behavior.

## Acceptance scenarios

| Area | Steps | Expected |
| --- | --- | --- |
| Ideas displacement | Save A/B; type new C; select Edit A, Branch A, then Edit B with dirty writing. Exercise keep/cancel and approved discard action. | Dirty body and mode/origin survive cancelled transitions. Replacement occurs only after explicit approved discard. |
| Ideas interruption | Write new, edit A, and branch A separately; navigate away/return and reload before Save. | Body and original mode return; saving an edit updates A once; saving a branch preserves parent A. |
| Legacy draft | Seed the previous raw-string draft format, open Ideas, save. | Original body remains available as a new draft, without a parse error or lost text. |
| Missing origin | Restore draft whose edit target or branch parent was removed. | Clear recovery state; no silent edit-to-new conversion or false branch relation. User can deliberately recover body. |
| Stale edit | Recover an unsaved edit after saved A changed; review both versions and cancel/confirm the approved conflict decision. | Newest saved A remains intact until deliberate replacement; recovered writing remains available. |
| Current collection | Add B in newer persisted state while editing A; save A. | A updates without dropping B or unrelated changes. |
| Active origin deletion | Delete the edit target/branch parent while its composer contains unsaved writing. | Writing survives or explicit discard is required; no silent context reassignment. |
| Storage failure | Fail draft persistence or note save, attempt transition and retry. | Failure visible; body/context retained; retry saves correct content once. Draft cleanup failure must not silently recreate a duplicate after reload. |
| Edit re-save | Edit saved A, Save, reload and return; repeat Save where permitted. | Collection contains one updated A; completed edit draft does not create another note. |
| Settings reach | At 390px, edit slot 10 with long label and keyboard-focused input; scroll through all slots; Save and reload. | Save reachable, validation visible, saved slots retain correct labels/active state. Browser viewport is only a proxy for keyboard behavior. |
| Finance deletion | If approved: add A/B, Delete A, cancel; Delete A, confirm; relaunch. | Cancel preserves both; confirmation removes only A; dialog identifies affected record. |

Runtime matrix: bounded English/Persian, light/dark, phone and selected wide checks on disposable preview `http://127.0.0.1:3011`. Existing `3010` user state must remain untouched. Storage injection may need helper/test evidence because browser evaluation is read-only.

## Remaining native checks

Physical Android keyboard/safe area, system back/process recreation, TalkBack dialog focus/announcements and install/upgrade data retention remain release follow-ups under standing maintainer authorization.

## Results

Bounded actual UI QA completed through native Chrome CUA on disposable `http://localhost:3011` on 2026-10-07, after the final draft-envelope refresh. Browser API failed request-header policy twice and inventory timed out on Statsig; native fallback recovered after active-user-interaction interruptions. Port 3010 was untouched. No earlier interrupted agent's runtime result is assumed.

| Executed steps | Expected | Actual / result |
| --- | --- | --- |
| EN dark: type `QA final new draft`, choose Edit on saved origin, Cancel native confirmation. | Preserve exact dirty writing and new mode. | Exact body retained; new composer retained. Pass. Native cancellation focus returned to Edit trigger; composer refocus after cancelled guard was not observed. |
| Reload new draft; save it; Edit that thought, replace body with `QA final edited draft`, reload, Save changes. | Restore distinct new/edit modes; update existing thought once. | Correct restoration notices and exact text. Saved collection showed updated thought and unrelated origin, no duplicate original new body. Pass for this sequence. |
| Grow updated thought; type `QA final branch draft`; reload; Keep this thought. | Restore branch origin and body; preserve parent on save. | Branch restoration notice and Growing from retained; saved child showed From relation and parent remained. Pass. |
| EN dark Settings: clear slot 10 and activate bottom Save Settings; correct to long label, save from bottom, reload. | Visible validation, focus first invalid field; correction saved without re-entry. | Required-label errors appeared at both actions; focus slot 10. Long corrected label persisted after reload; slot remained inactive. Pass at desktop viewport. |
| Switch Settings to Persian. | Bilingual top/end actions and input labels. | Both ذخیره تنظیمات actions and ten labelled fields exposed in AX. Text/control presence pass; phone RTL geometry unexecuted. |
| FA dark Finance: unlock displayed default, add disposable income 123, Delete then Cancel; switch EN and repeat Delete then Cancel. | Localized confirmation; cancellation preserves entry and total and returns focus. | Both localized messages observed; disposable entry and total 123 unchanged; focus returned to Delete. Pass. |
| Actual EN wide dark Finance screenshot. | Readable controls without overlap. | Goal cards, form and history fit; Add Income and destructive Delete visually distinct. Pass for observed desktop layout. |

Source contract comparison corroborates separate edit/branch context, authoritative note reread before save/deletion, shared Settings handler/state at both actions, invalid-field focus, bilingual native Finance confirmation and pending-delete guard. Source inspection is not a runtime fault-injection pass. Initial unmarked JSON-shaped draft content displayed literally as legacy prose, consistent with the final compatibility contract; subsequent checks used UI-created drafts.

Unexecuted browser scenarios: phone viewport/keyboard geometry, light-mode comparison, Persian Ideas recovery/guard, affirmative discard/deletion, route-return recovery, legacy seed save, stale/missing/actively deleted origin, concurrent collection changes, storage/read/save/cleanup failures, and repeated-save reconciliation after cleanup failure. Use the separate automated helper/review evidence for those contracts; this record does not promote them to browser passes. No critical/high failure was found in the executed sequences. Lead assessment: cancelling the native Ideas guard leaves focus on its Edit trigger, with body/mode unchanged. The handoff’s composer-focus instruction applies after an accepted transition; native cancellation returning to its trigger is retained. No implementation change required.

Physical Android keyboard/safe area, system Back/process recreation, TalkBack focus/announcements and install/upgrade retention remain unexecuted release follow-ups. Browser desktop AX and screenshots do not certify those behaviors.
