# Task: Android mobile layout hotfix

Status: complete; physical-phone retest open
Created: 2026-09-30
Updated: 2026-09-30

## Objective

Fix the phone-width planner layout reported after installing 2026.09.3: sideways blank space and a language selector that overlaps the header links. Ship a signed patch APK.

## Acceptance Criteria

- [x] English and Persian planner headers fit 320px and 360px widths without controls overlapping.
- [x] The mobile save bar stays within the visible viewport.
- [x] The document cannot scroll sideways into blank space; week and day rails retain their own horizontal scrolling.
- [x] Android 2026.09.4 APK is signed, verified, recorded, and published.

## Verification

| Check | Result |
| --- | --- |
| Docker lint, TypeScript, 13 tests, local-data build | Passed |
| Built browser preview at 320px/360px, EN/FA | Passed; header and save bar visible, document overflow clipped |
| Signed Android APK | Passed; versionCode 13, versionName 2026.09.4, existing certificate |
| Physical phone | Pending maintainer retest |

## Decisions And Risks

- The issue was reproduced in the built browser app at 360px; the English language control exceeded its grid cell.
- The document also reported horizontal overflow from the planner's scrollable rails. The document is clipped horizontally while the rails retain their own scrolling.
- No connected Android phone is available in this workspace, so the installed-app result requires a phone retest.

## Outcome / Handoff

Signed patch APK published. The maintainer can install it over 2026.09.3 and verify the opening viewport in both languages.
