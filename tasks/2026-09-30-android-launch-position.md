# Task: Fix Android planner launch position

Status: published; physical-phone retest open
Created: 2026-09-30
Updated: 2026-09-30

## Objective

Fix the 2026.09.4 Android planner opening on a blank horizontal area, with the page and mobile save bar only partly visible after scrolling.

## Evidence

- Maintainer screenshots show the Persian planner correctly laid out when scrolled into view, a blank area on app open, and the save bar displaced with the page.
- The maintainer confirmed this happens immediately on opening 2026.09.4, before a swipe.
- In the built browser version, the document reported a 766px horizontal scroll width at a 393px viewport after planner content loaded.

## Acceptance Criteria

- [x] The planner opens at the page's horizontal origin in English and Persian.
- [x] Week/day rows keep their own horizontal scrolling without shifting the document.
- [x] The mobile save bar is anchored to the viewport width and both actions remain visible.
- [x] A stable-signed patch APK is published with matching version metadata and checksum.

## Verification

| Check | Result |
| --- | --- |
| Frontend lint, TypeScript, 13 tests, local-data build | Passed in Docker |
| Built browser at 393px, Persian fresh launch | Passed; document width 393px, planner and save bar at x=0 |
| Built browser at 393px, English launch and page-level sideways gesture | Passed; planner and save bar remained at x=0 |
| Signed Android APK | Passed; versionCode 14, versionName 2026.09.5, existing certificate |
| Physical Android phone | Pending maintainer retest |

## Decision And Risk

- Keep document direction LTR and set RTL on each screen's content. The document's direction change during startup was a plausible contributor to the horizontal shift; the root cause cannot be confirmed without a connected Android device.
- Center the selected week by setting the rail's own `scrollLeft`, and reset any horizontal page drift. The week/day rails retain local scroll containment.

## Outcome / Handoff

Signed 2026.09.5 APK published. The maintainer should install it over 2026.09.4 and test the first screen without swiping.
