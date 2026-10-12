# Task: Natural sand timer design

Status: implemented and accepted; coordinated release pending
Created: 2026-10-11
Updated: 2026-10-12

## Objective
Improve the existing focus/rest hourglass with visible falling sand and natural colours, taking the maintainer's suggestions as input and exercising design judgment.

## Scope and acceptance
- Designer reviews existing timer and saves a ready bilingual, light/dark, phone/wide studio handoff before implementation.
- Natural glass/frame and mineral sand; clearly visible falling grains only while running, frozen when paused, no idle/completed falling sand.
- Reduced-motion preference suppresses decorative animation while progress/countdown remain accurate.
- Existing timer state, durations, persistence, controls, translations and accessibility remain intact.
- Docker frontend checks, bounded browser QA, independent review, scoped commit/push and verified release.

## Ownership and coordination
Frontend timer component/hourglass styles only; team timer story/handoff/task and relevant memory. Preserve concurrent icon, XLSX regression and five-task batch changes. An active batch release is tracked in `tasks/2026-10-11-five-task-release-batch.md`; avoid competing version selection/signing/publication. Timer source must pass its gates before inclusion in that release, otherwise use a subsequent release after the batch concludes.

## Verification
Designer handoff ready: `design/2026-10-11-timer-natural-sand.md`. Docker Node 24 studio typecheck/build and rendered phone/wide, English/Persian, light/dark, paused/reduced-motion and endpoint checks passed. Frontend Docker lint, TypeScript, all 82 current tests and local-data production build passed. Independent Reviewer found no actionable issues or high/critical findings. Built-browser English/Persian, light/dark, 360/390/1024px no-overflow, seven running grains, stable paused transforms, resume, completion with no grains, completed reload recovery and deliberate next-phase start passed. Production reduced-motion rule reviewed; studio simulation passed; actual OS preference/native Android/TalkBack unverified.

Task-owned processes: Designer Docker container `sp-timer-design-studio`, session 40719, host port6007, mounted `design/studio`, needed for comparison. Isolated frontend preparation `sp-timer-frontend-prepare`, session72310, named dependency volume `sp-timer-frontend-deps`, no ports. Earlier duplicate preparation container `hungry_cartwright` stopped; unrelated/shared processes preserved.

Preparation/check containers completed. Snapshot static preview container `sp-timer-preview`, session58570, localhost3017→3000, working `/preview` from `/private/tmp/sp-timer-preview`, stopped gracefully after QA along with the studio container on 2026-10-12; earlier preview session32490 stopped for route-handler correction. Docker confirms neither timer preview remains running; unrelated processes and volumes preserved.

## Outcome
Selected warm mineral sand, walnut frame and clear glass; seven staggered falling grains, frozen on pause, suppressed for reduced motion. Designer accepted production after independently inspecting saved screenshots and matching source. Lead accepts implementation: all visual/behavior gates passed, no high/critical finding. Frontend source committed and pushed as `6d3d34e` (timer only), followed by independent batch-test commit `2513a2a`. Release go granted for this validated timer source after exact-source release checks. A batch owner may include the committed timer in its later validated stable release; do not include uncommitted timer files in the already-signed icon 2026.10.15/code32 artifact.
