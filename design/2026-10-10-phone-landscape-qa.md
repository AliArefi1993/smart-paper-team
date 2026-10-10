# Phone landscape QA

Date: 2026-10-10. Browser: Codex in-app browser, local-data preview `http://localhost:3100`. Synthetic data only. Independent bounded QA of Planner/Ideas interactions and the seven-route matrix; Designer owns the handoff and visual comparison.

## Confirmed issue before fix

Planner schedule sheet clips its title and actions in landscape.

Steps: open Saturday, choose **+ Add Event**, resize to the dimensions below. Expected: sheet title and every field/action remain reachable by scrolling inside the sheet. Actual: centered sheet exceeds viewport with `overflow-y: visible`; title is above the viewport and action row extends below it.

| State | Viewport | Sheet top / bottom | Height |
| --- | --- | --- | --- |
| EN empty form | 844×390 | -45.5 / 435.5 | 481 |
| EN empty form | 740×360 | -60.5 / 420.5 | 481 |
| EN empty form | 640×320 | -80.5 / 400.5 | 481 |
| EN required-title error | 740×360 | -74.5 / 434.5 | 509 |
| FA empty form | 740×360 | -63.5 / 423.5 | 487 |

At EN 740×360, heading is y=-43.5..-15.5 and Cancel is y=355.5..403.5 (4.5px visible). Screenshot inspection agrees with DOM rectangles. Validation error reproduced by submitting empty title in portrait before rotating. Severity: high user impact for landscape event creation/cancellation; bounded layout fix required.

## Passing checks before fix

- Planner Saturday section opens and its controls are reachable through normal page scrolling at 844×390.
- Full-screen Goal writing modal has visible Done and textarea at 844×390 and 740×360. Synthetic goal `QA landscape goal 20261010` survives 844×390 → 390×844 → 740×360; textarea stays within viewport. Done returns same goal to inline editor and local save status becomes Saved on this device.
- Week Templates empty sheet is visible at 740×360. Saving synthetic `QA landscape template` succeeds and exposes saved item plus Delete Template.

## Post-fix verification

Schedule panel now stays within the viewport with internal vertical scrolling. At EN/FA 740×360 it occupies y=16..344 (`overflow-y: auto`); EN required-title error has scrollHeight 507 with client height 328. EN error at 844×390 occupies y=16..374 and at 640×320 y=16..304. Scrolling to the top exposes heading/error; scrolling to bottom exposes Add/Cancel. No fixed control overlaps the sheet.

- FA synthetic title plus 750-character note survives 740×360 → 390×844 → 740×360, then Add succeeds. Editing the title succeeds and reload preserves edited title and note. Changing title then Cancel preserves the previously saved title.
- EN Dark required-title validation and Cancel work in 740×360 after scrolling to actions. English writing-modal rotation and local save check above remain valid.
- FA portrait 390×844 sheet bounds x=16..374, y=216.5..828; title, every field, and both actions are visible.
- Ideas synthetic capture/save, Grow this idea, edit/save pass. EN branch text survives 740×360 → 390×844 → 844×390; FA branch text survives 740×360 → 390×844 → 740×360. Saved English edit and Persian branch remain after reload; parent relationships appear in saved cards. No horizontal Ideas overflow found.

Screenshots: [EN dark top/error](evidence/2026-10-10-landscape/qa-en-740-top-dark.png), [EN dark actions](evidence/2026-10-10-landscape/qa-en-740-actions-dark.png), [FA top](evidence/2026-10-10-landscape/qa-fa-740-top.png), [FA actions](evidence/2026-10-10-landscape/qa-fa-740-actions.png), [FA portrait](evidence/2026-10-10-landscape/qa-fa-390-portrait.png). Designer independently accepted the four landscape screenshots. Portrait screenshot was recaptured after verifying actual 390×844 viewport to avoid a resize/capture race.

## Seven-route bounded matrix

Hydration was confirmed through explicit FA then EN/FA language selection and rendered labels; initial pre-hydration metrics were discarded. Main route controls/navigation inspected in both languages at 740×360 and 844×390. Long routes use natural vertical scrolling. Finance tested in locked state, Export in local report/export locked state; this is a layout check, not a full workflow regression.

| Route | EN / FA 740×360 | EN / FA 844×390 |
| --- | --- | --- |
| Planner | Nav/controls present; EN width metric noted below; FA page width 740 | Page width 844 |
| Ideas | Page width 740; capture/edit/branch exercised | Page width 844; rotated branch exercised |
| Timer | Page width 740; timer/settings controls present | Page width 844 |
| Finance | Page width 740; PIN/unlock visible | Page width 844 |
| Summaries | Page width 740; loaded synthetic summary present | Page width 844 |
| Export | Page width 740; report/manual-selection/unlock controls present | Page width 844 |
| Settings | Page width 740; section fields/save/reminder controls present | Page width 844 |

Residual metric: hydrated EN Planner at 740×360 has document scrollWidth 766. Visible elements outside the viewport belong to intentional week/day horizontal scrollers; no visible element overflowing outside a scroll/clipping ancestor was found. Friday's visually hidden `No details yet` label has right edge 766 and may contribute (inference, not proven causality). No additional visible clipping/reachability defect reproduced; lead retained bounded schedule-only fix scope.

## Tool limitations / follow-ups

- Clicking saved template opens a native confirmation that caused CDP DOM/AX timeouts; `getJsDialog()` returned null. Supported native `tab.pressKey(null, 'Escape')` recovered the browser. Template use/delete completion is not certified by this attempt.
- Browser viewport override and localStorage language changes are shared across agent tabs; QA and Designer coordinate sequential ownership to prevent interference.
- Template delete/use completion remains unverified because native confirmation handling was unreliable. No template app defect is claimed.
- No physical Android keyboard, rotation, safe-area or TalkBack claim is made by browser resizing.

QA conclusion: confirmed schedule landscape issue corrected; bounded browser acceptance passes, with physical Android and template confirmation follow-ups recorded. Viewport reset and temporary QA tab closed; lead owns preview process cleanup.
