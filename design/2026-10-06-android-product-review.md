# Product review: the shipped Android baseline

Status: review complete; next improvement candidate requires a separate ready handoff
Updated: 2026-10-06
Owning routes: all seven Android/local-data routes; next bounded candidate `/ideas`
Local studio: [route stories](studio/src/stories/), [Planner Calm stories](studio/src/stories/PlannerCalm.stories.tsx)
Design type: current shipped behavior audit with one proposed improvement candidate

## Problem and evidence

The user's job is to plan a week, focus, capture thoughts, and review their own records on an Android phone. Their explicit direction is to review/refactor designs, assess the current product with personal-planning input, and compare implementation with design. The immediate problem is confidence in what is shipped and what has actually been validated, rather than a request for more capabilities.

Observed repository facts:

- The shipped baseline is [2026.10.4](../releases/smart-paper-v2026.10.4.md), frontend `ab37ee8`, stable-signed Android versionCode 21, local-data mode; backend `68c789b` is unchanged and secondary.
- Seven routes provide Planner, Ideas, Timer, Summaries, Finance, Export/report/import, and Settings. English/Persian and shared Light/Dark are implemented. Planner calm editing, day minimization, and green dark roles are shipped.
- Release evidence records lint/types/27 tests/local-data build and bounded browser comparisons. It does not prove native sharing, notifications, Android keyboard/Back, upgrade, restore, or TalkBack.
- Studio stories are editable structural/design references. The older inventory still lists some shipped Planner work as pending. Route coverage and proposal readiness do not imply fidelity or native-flow approval.
- Idea Space currently replaces the composer when Edit or Branch is selected without guarding unsaved text. Draft recovery stores body only, skips edits, and does not restore `parentId`/`editingId`: [source](../smart-paper-front/src/components/idea-space.tsx:37), [edit/branch handlers](../smart-paper-front/src/components/idea-space.tsx:102). This is source-confirmed; phone reproduction and frequency are unverified.
- Finance invokes income deletion directly: [source](../smart-paper-front/src/components/finance-view.tsx:210). Ideas asks for confirmation. Accidental-delete frequency and preferred recovery are **Needs confirmation**.

Personal-systems consultation ([report](2026-10-06-personal-systems-review.md)): the existing modules can support an optional plan → focus → review loop, with idea capture when useful. A demand for tighter integration or new automation is **Needs confirmation**. Protecting writing continuity has concrete code evidence and is the smallest candidate; Finance deletion is a separate candidate.

## Outcome and scope

Desired outcome: a trustworthy Android design baseline, clearly separated evidence levels, and one actionable improvement chosen from observed friction. Success signals are a reconciled route/state inventory, QA differences linked to shipped source, and a Designer decision on the writing-continuity candidate.

This cycle covers refactoring design documentation/stories to represent current behavior, bilingual phone comparison, and prioritization. The writing-continuity candidate requires a separate Designer handoff. It does not prescribe a visual layout.

Acceptance criteria for this review:

1. All seven routes have current story/handoff pointers and explicit labels for reference, implemented, browser-checked, or Android-unverified states; completed Planner work is not presented as an unapproved future proposal.
2. QA separates concrete implementation/design differences from missing coverage and hypotheses. High-impact data risks lead the follow-up list.
3. Phone English/Persian, Light/Dark, long/mixed-script text, keyboard obstruction, Android Back, font scaling and TalkBack are considered; unperformed checks are recorded without a pass claim.
4. Product priorities preserve local data, explicit save/phase choices, privacy and the Android focus. Any implementation begins only after a ready Designer handoff.

## Options for the next bounded improvement

| Option | User value | Risk | Implementation size / evidence |
| --- | --- | --- | --- |
| Reconcile stories, inventory and QA evidence | Clarifies current product and prevents implementation against stale references | Low; documentation/prototype scope | Small–medium; explicit user request and stale coverage evidence |
| Protect Idea Space writing continuity | Prevents unsaved capture/edit displacement and lost branch/edit context | Draft migration and storage-error behavior need review | Small–medium estimate; source-confirmed gap, runtime check pending; recommended candidate |
| Safer Finance deletion | May prevent losing an income entry by accidental tap | Adds friction; confirmation versus recovery unresolved | Small estimate; immediate-delete behavior confirmed, user frequency **Needs confirmation** |
| Integrate plan/focus/ideas/review navigation or automation | Potentially reduces routine friction | Invents workflow assumptions; expands scope/data coupling | Medium–large estimate; demand **Needs confirmation**, defer |

Recommendation: complete the baseline reconciliation now. Give Designer the Idea Space writing-continuity problem for one improvement cycle; use QA reproduction to confirm the exact affected transitions. Keep Finance deletion separate and defer routine integration until phone use supports it.

Candidate acceptance criteria, if selected: unsaved new, branch, and edited writing cannot be silently replaced by choosing another note action; cancel retains the original text/context; a successful save updates or creates the intended note and preserves branch origin; supported route/reload recovery preserves intended context; storage failure keeps recoverable text and understandable feedback. Cover legacy body-only drafts and English/Persian cases. Designer chooses the interaction and documents recovery limits before readiness; these criteria are a brief, not implementation approval.

## Constraints and non-goals

- Android phone use is primary; wider browser layouts support QA. Physical-device checks remain recorded release follow-ups under standing direction.
- Preserve Saturday–Friday weeks, ten stable section slots, manual week save, existing backup compatibility, offline local storage and saved records.
- Timer phases remain explicitly started; no automatic planner-minute logging or background completion alarm is promised.
- Finance remains optional; AI report finance starts off and requires unlock. Do not silently share private writing or change the PIN screen lock into an encryption claim.
- No backend/sync/account work, new routine dashboard, calendar integration, AI integration, or generalized redesign.

## Handoff and verification

Designer owns interaction/story refactoring and readiness. QA owns implementation comparison and reproducible differences. Product owns scope and priority; the personal-systems report supplies observations, not feature approval.

| Check | Evidence | Result |
| --- | --- | --- |
| Shipped baseline and checks | STATUS and 2026.10.4 record | Confirmed from repository records; checks not rerun by Product |
| Focused automated coverage | Six test files: timer, share fallback, day expansion, import safety, ideas persistence, AI report | Exists; not broad UI/native coverage |
| Writing-displacement/context risk | Idea Space source cited above; personal-systems report | Source-confirmed; runtime QA pending |
| Design/implementation comparison | [Designer](2026-10-06-android-design-review.md) and [QA](2026-10-06-android-qa-review.md) | Completed bounded audit; structural fidelity limits and production risks recorded |
| Physical Android/TalkBack | Current release follow-ups | Unverified |
