---
name: smart-paper-design
description: Create or review a repo-native Smart Paper screen design and handoff for Android-first English/Persian UI. Use for user-facing flows or substantial visual changes, not text-only or backend changes.
---

# Smart Paper design workflow

Read the product brief in `design/` or the relevant task, `design/foundations.md`, and the owning frontend screen. Design for the user's task and actual content before styling. Keep proposed behavior separate from shipped behavior.

Use direct user feedback as evidence, with its limits stated. The shipped [Calm Planner handoff](../../design/2026-10-04-planner-calm-flow.md) is a useful quality reference: the user found the Android release much better after the design-first work. Its transferable lessons are to keep the phone overview scannable, place opened content where the user can see its beginning, make long writing readable, and state clearly when edits are saved. Apply these principles to the task at hand rather than copying the Planner layout onto other screens. Installation and positive feedback do not verify every Android flow or accessibility state.

Use `design/studio/` as the primary editable canvas. Add or update route stories for a phone size, a relevant wide layout, English LTR, Persian RTL, and states that change the flow. Link specific story exports from the design record. The existing shipped baselines are structural examples; start a separate proposal story for a requested change and keep sample data and behavior distinct from production code. Use Figma as a supplement when requested or useful; record real frame links only.

Save one handoff under `design/` using `design/TEMPLATE.md`. Include flow and hierarchy, content examples, component and token reuse, interaction and feedback states, keyboard and screen-reader behavior, responsive behavior, bilingual/RTL behavior, and any deliberate divergence from current UI. Identify implementation constraints and unresolved decisions. Avoid decorative changes that reduce readability or make the dense planner harder to scan.

For a requested user-visible implementation task, finish this handoff and mark it `ready for implementation` before Frontend changes code. Existing shipped screens may be documented as `baseline` without implying a redesign; mark proposed departures explicitly. A design is not ready while a required language, flow state, or interaction decision is unresolved.

For requested changes, a recommended, ready handoff automatically continues to frontend implementation and the remaining engineering workflow. Do not end the task at the proposal or ask whether implementation should follow. Respect an explicit design-only/review-only scope, unresolved required decisions, and the workspace safety boundaries.

Before calling a design ready, run the studio type check and build, inspect its phone and wide stories with realistic long English and Persian text, and check empty, loading, error, success, and destructive states when applicable. Check contrast, visible focus, labels, touch targets, and non-color state cues. Compare the implemented screen with the handoff in a running preview or screenshots; record differences and actual verification in the design record. Story code is design context; frontend code and tests remain authoritative.
