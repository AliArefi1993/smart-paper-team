# Task: Android save controls and selective autosave

Status: complete
Created: 2026-10-06
Updated: 2026-10-06

## Objective

Inspect save controls on all seven app pages, improve their design and remove unnecessary manual saving where safe. Product and Designer decide a bounded scope from actual Android/local-data behavior; a ready handoff continues through implementation, QA and release.

## Context

- Baseline frontend `ab37ee8`, Android `2026.10.4`; repositories initially clean.
- User reports poor save-button design and proposes autosave where appropriate.
- Prior audit found Ideas unsaved text displacement and draft-context recovery gaps.
- Owning repositories: team design/docs and frontend application.

## Acceptance Criteria

- [x] Actual page save controls reviewed with source and runtime evidence.
- [x] All-seven save/autosave decision matrix distinguishes persistence from explicit commands.
- [x] Ready Designer handoff with EN/FA phone/wide and saving/saved/error states.
- [x] Approved scope implemented without losing edits or misreporting saved state.
- [x] Relevant automated checks and independent review pass; actual UI compared to design.
- [x] Durable docs, scoped commits/pushes and signed Android release completed when prerequisites pass.

## Non-Goals

- Automatic imports/deletes/sharing or notification permission prompts.
- Backend feature expansion, sync or cloud storage.

## Plan

1. Personal systems advice, Product decision and Designer app review/proposal.
2. Implement ready bounded recommendation; test and independently review.
3. Verify EN/FA UI, update memory and publish signed Android build.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Initial repositories | `scripts/project-context.sh` | All clean; team `5d47259`, backend `68c789b`, frontend `ab37ee8` |
| Design | Studio typecheck/build; EN/FA phone/wide states | Passed; ready handoff implemented |
| Automated frontend | Frozen-source Docker lint, `npx tsc --noEmit`, `npm test`, local-data build | Passed; 30 tests |
| Independent review | Source review including failure owner, notifications, full-writing focus/status | No unresolved findings |
| Bounded browser QA | [QA report](../design/2026-10-06-save-controls-qa.md), isolated `127.0.0.1:3011` | Passed EN/FA phone/wide, rapid reload, week identity/read-back, full writing and schedule staging |
| Signed release | `scripts/build-android-release-docker.sh`, apksigner/aapt and byte comparison | Passed; code22/name2026.10.5, stable certificate, all136 assets |
| Repository/link checks | Separate statuses, `git diff --check`, scoped local links | Passed; backend unchanged |

## Decisions And Risks

- Autosave must have honest failure feedback and retain recoverable text.
- Timer duration Apply can reset an active session; not equivalent to passive persistence.
- Preserve data and explicit actions; physical Android checks remain recorded follow-ups.

## Outcome / Handoff

Product and Designer recommend local Planner autosave only; retained actions on other pages remain deliberate. Ready [handoff](../design/2026-10-06-save-controls-design.md) approved synchronous accepted-edit persistence, compact status/Retry and navigation-only Next day. Schedule commands become Add event / Apply changes. Settings save placement is a separate design follow-up. Implemented in frontend `45d4130`; backend remains `68c789b`. Frontend `45d4130` and team release commit `d7739d2` pushed. Stable-signed [APK](../releases/artifacts/SmartPaper-local-2026.10.5-release.apk), [release record](../releases/smart-paper-v2026.10.5.md), and coordinated `smart-paper-v2026.10.5` tags published under standing authorization. GitHub API confirmed the [public release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.5) is not a draft and contains the matching APK. All three worktrees clean after publication.

Automatic edits persist synchronously; failed text is retained across SPA return, Retry stores the latest snapshot, and explicit week/page departure is blocked during failure. No recovery promise after reload/process kill when storage fails. Independent review fixed Retry keyboard/live status and notification ordering; final checks passed.

Remaining verification: browser fault-UI injection, complete template confirmation execution, physical Android keyboard/lifecycle/notifications/TalkBack and representative large-history typing latency. These are documented follow-ups, not passed checks. Separate next design: Idea Space writing continuity and Settings save placement; autosave does not fix those existing gaps.
