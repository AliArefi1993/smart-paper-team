# Personal systems observations: Android baseline

Reviewed: 2026-10-06. Evidence: product records and frontend `ab37ee8` source; no new runtime or device verification. Advisory input to Product and Designer, not an implementation handoff.

## Current Routine

Planner, Timer, Finance, and Idea Space are independent local-data practices. Planner requires week Save; Ideas requires note Save with partial new-draft recovery; Timer retains its countdown and requires explicit next-phase start. Timer does not record planner minutes. An integrated routine is a hypothesis: **Needs confirmation**.

The maintainer's positive feedback on Calm Planner supports retaining compact summaries and expandable writing. It does not establish broader user preferences.

## Candidate Ideas

| Evidence / friction | Smallest useful candidate | Benefit | Cost or question |
| --- | --- | --- | --- |
| `smart-paper-front/src/components/idea-space.tsx`: Edit/Branch replace composer content; draft persistence stores body only and excludes edits | Protect displaced writing and preserve draft context | Reliable short capture and interruption recovery | Distinguish draft from saved note; handle deleted parents and storage failure. Runtime/device reproduction still needed |
| `smart-paper-front/src/components/finance-view.tsx`: income deletion is immediate, unlike confirmed Idea deletion | Consider confirmation or recovery | Reduce accidental entry loss | Extra action or temporary recovery state; frequency of accidental taps **Needs confirmation** |
| Practices have different persistence expectations | Review saved, pending, restored, and failed feedback in each existing flow | Clearer recovery and navigation decisions | Avoid implying all screens autosave; need EN/FA comparison |

## Designer Considerations

- Cover capture → Edit/Branch → leave → return, unsaved text, restored branch context, missing parent, storage failure, long Persian text, and open Android keyboard.
- Preserve independent practices and Timer pause/resume and explicit next-phase start.
- Finance and notes remain private; candidate connections must not silently include them in reports.
- Android back navigation, suspension, keyboard, and TalkBack remain device verification work. Browser/source evidence does not establish those flows.

## Downstream Review

- [Product assessment](2026-10-06-android-product-review.md)
- [Designer review](2026-10-06-android-design-review.md)
- [Independent QA comparison](2026-10-06-android-qa-review.md)
