# Task: Prepare the first early-user pilot

Status: completed
Created: 2026-10-16
Updated: 2026-10-16

## Objective

Prepare a concrete small pilot proposal for learning whether Smart Paper helps friends or colleagues install, save a useful day plan, and return voluntarily. User selected friends or colleagues who use Android as the easiest recruitment audience. Preparation is authorized; contacting people and running the pilot are outside this assignment.

## Context

- Owning repository: team coordination root only.
- [Growth onboarding](../docs/growth-community.md), [growth workflow](../skills/smart-paper-growth/SKILL.md), [pilot package](../docs/growth/first-pilot.md).
- [Current release evidence](../releases/smart-paper-v2026.10.29.md) and [feedback triage](../docs/feedback-triage.md).
- Design: not applicable; text-only recruitment proposal, no app UI or visual assets changed.

## Acceptance Criteria

- [x] Bounded audience, zero-spend proposal, relative seven-day window, ownership and launch decisions documented.
- [x] EN/FA invitation, consent, installation, first-use, and follow-up materials prepared; unreviewed translation status explicit.
- [x] Manual aggregate measurement distinguishes downloads, installs, useful action, returning use, and missing observations; no user data collected.
- [x] Product/release claims, local links, whitespace and scope checked; current download evidence and any verification limits recorded.
- [x] Scoped commit/push complete; backend/frontend untouched.

## Non-Goals

- No outreach, public posting, paid promotion, automated reminders, telemetry, app changes, new releases, or actual pilot results.

## Plan

1. Growth prepares the package using current product and release evidence.
2. Lead verifies claims and readiness boundaries; routine checks and closes out scoped documentation.
3. Leave launch selections and explicit outreach authorization for maintainer review of the concrete package.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Initial repository scope | scripts/project-context.sh and separate Git status | All clean. Team 6bf8056, backend 68c789b, frontend 40c3516. |
| Role execution | Native growth spawn rejected as unknown in this running chat | Default subagent explicitly loaded growth role and skill using product_design model routing; no model substitution. |
| Release lookup | Read-only elevated gh release view | Public non-draft/non-prerelease release; uploaded APK filename, size 4,422,272 and SHA-256 match the release record on 2026-10-16. No fresh byte download or phone installation performed. Browser cache miss/default network failure did not prevent metadata verification. |
| Lead document checks | 20 local links across pilot/onboarding/task; git diff --check | Passed. User-facing instructions keep internal build verification in maintainer evidence. |
| Independent factual/boundary review | Routine review | Product/release claims, privacy, authorization and links passed. Corrected outcome threshold denominators to the same aggregate-consenting, completed-window subset with known outcomes; non-consent/unknowns are not failures. |

## Decisions And Risks

- Friends/colleagues using Android is user-confirmed; value/audience fit is still untested. Proposed cohort size and outcomes are pilot heuristics, not market evidence.
- Existing native data-safety/accessibility gaps remain open. Preparation does not amend release gates or pre-user authorization; revisit the latter before actual-user launch.
- No contact list, participant rows, or raw reports belong in Git. Any later outreach requires explicit authorization and follow-up consent.

## Outcome / Handoff

The [pilot package](../docs/growth/first-pilot.md) is ready for maintainer review. It proposes 5–8 adult Android friends/colleagues, zero spend, one saved/reopened day plan, seven days per install and optional day-2/day-7 follow-ups. Invitations, quick starts and follow-ups are drafted in EN/FA; Persian wording remains pending maintainer language review, and launch choices still require review and outreach authorization. No pilot, contacts, or results exist. Preparation is complete; the maintainer's next step is to review the package and decide whether to launch. No task-owned background process was started.
