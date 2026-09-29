# Task: Focus and rest timer

Status: complete, with physical-phone validation open
Created: 2026-09-29
Updated: 2026-09-29

## Objective

Ship an Android-first, hourglass-inspired timer for focus and rest sessions in the local-data app.

## Context

- Owning repository: `smart-paper-front/` for the timer and Android version; team root for product and release memory.
- Current app uses “Focus Mode” for a planner theme, so the timer has a distinct “Focus Timer” entry.
- Release target: `smart-paper-v2026.09.3`.

## Acceptance Criteria

- [x] The planner opens a dedicated timer screen with focus/rest selection, editable positive whole-minute durations (25/5 defaults), large countdown, and hourglass progress.
- [x] Start, pause, resume, and reset behave correctly; completed phases wait for an explicit start of the next phase.
- [x] A running timer catches up after route navigation or app suspension, never displaying negative time in the tested clock logic.
- [x] English/Persian, RTL, phone-width layout, keyboard controls, and accessible labels work in the built browser preview.
- [x] Relevant automated checks, signed APK build, signature check, and release documentation pass.

## Non-Goals

- Automatic planner-minute logging, server sync, and background Android completion notifications.

## Plan

1. Product and design define the timer flow; implement the timer screen and clock-state logic.
2. Add focused tests, validate the frontend and Android build, review, then prepare and push the release.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Timer and import tests | `npm test` in Docker | Passed, 13/13 |
| Frontend lint/type/build | Docker `npm ci`, lint, TypeScript, local-data build | Passed |
| Backend baseline | Django tests and migration check | Passed, 33 tests; no migration drift |
| Signed APK and signature | Release script, `apksigner`, `aapt` | Passed; versionCode 12; existing certificate |
| Built browser preview | Phone-width EN/FA, keyboard phase controls, reload recovery | Passed |
| Physical Android flows | Connected phone | Not run; no connected phone in workspace |

## Decisions And Risks

- A finished phase waits for user action before the next phase starts.
- The timer is local to the device and separate from planner totals and backup data.
- No device is connected; install, upgrade, suspension, and final layout checks on Android remain open.

## Outcome / Handoff

Timer implementation and signed APK are prepared. The release record documents the remaining physical-phone checks.
