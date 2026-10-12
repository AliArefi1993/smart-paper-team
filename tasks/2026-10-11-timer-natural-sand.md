# Task: Natural sand timer design

Status: shipped in Android 2026.10.16/code33
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

Both verified timer preview containers stopped gracefully; no timer-owned process remains. Dependency/build volumes were preserved.

Exact-source frontend CI run [38206205739](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38206205739) and protected stable build [38206221167](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38206221167) passed for source `ea05f160320f6a8c7017d6c25d8bf2625fc37e95`, including timer commit `6d3d34e`. The final artifact passed independent signer, version, provenance and compiled-payload review; the [release record](../releases/smart-paper-v2026.10.16.md) contains the full review evidence. A bounded ZIP scan confirmed packaged `sp-timer-hourglass` and `sp-timer-grain` JS/CSS, `sp-timer-sand-fall` CSS and `prefers-reduced-motion` CSS.

Anonymous public APK download matched the committed release artifact byte-for-byte: SHA-256 `7637204b749689d7209a09b064d97843cc2dadfb4b1acda28d9789350e8ad908`, 4,395,446 bytes. Published as [Android 2026.10.16](../releases/smart-paper-v2026.10.16.md). Native timer lifecycle, Android reduced-motion behavior and TalkBack remain unverified.

## Outcome
Selected warm mineral sand, walnut frame and clear glass; seven staggered falling grains, frozen on pause, suppressed for reduced motion. Designer accepted production after inspecting saved screenshots and matching source. Frontend timer source was committed and pushed as `6d3d34e`; final coordinated release source `ea05f16` shipped as Android 2026.10.16/code33 after exact-source checks and independent artifact review.
