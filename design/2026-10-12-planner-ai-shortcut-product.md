# Design: Planner viewed-week AI report shortcut — Product brief

Status: brief; ready for Designer
Updated: 2026-10-12
Owning frontend route/component: `/`, `/export`; `WeeklyPlanner`, `ExportView`, `AiReportPanel`
Local studio story links: Pending Designer handoff
Optional Figma file and frame links: Not required
Design type: proposed change

## Problem and evidence

- User job: prepare a selective report of the week currently being viewed for deliberate external reflection, without re-entering that week's dates.
- User direction: the maintainer authorized readiness-first offline backlog execution; the lead selected this existing request after Finance visibility publication closes. Backend remains paused and Timer remains available.
- Observed source: Planner currently links to Export without week context. `AiReportPanel` initializes both dates empty; `ExportPage` has no week/query input. Existing reports already support inclusive dates, field selection, preview, Copy, file Share and manual text selection.
- Source data safety: report preparation reads persisted data. Planner autosave writes synchronously, retains failed edits for Retry, and prevents navigation when saving failed. The scheduled-event editor also holds an uncommitted draft outside the saved week.
- Personal systems consultation (2026-10-12, read-only) recommends retaining the existing deliberate handoff, protecting failed writing, and distinguishing offline preparation from internet-dependent cloud responses. It provides hypotheses and source observations, not runtime/device verification.
- Needs confirmation: the shortcut reduces useful re-entry in actual use; users recognize the viewed past/future week and find the action. Validate discoverability and week recognition in bounded QA; do not imply a weekly review obligation.

## Outcome and scope

Success signal: from a loaded Planner week, one deliberate action opens the existing report with that exact Saturday–Friday range visibly selected, ready for field selection and preview. Saving failures or unfinished editing cannot silently produce an older report or discard writing.

In scope: local Android mode only; contextual entry, valid viewed-week handoff, existing report initialization, bilingual explanation, and focused safety/error states. Ordinary Export entry remains available.

Non-goals: embedded AI, automatic sending, AI accounts/API keys, backend changes, new sharing plugins, report content/field defaults redesign, Idea Space/draft inclusion, automatic Planner changes, notification or Timer integration, a required weekly ritual, or certifying native recipient delivery.

Acceptance criteria:

- [ ] A discoverable Planner action targets the loaded viewed week, including past/future weeks, using inclusive calendar dates from its Saturday–Friday bounds rather than today's week or timezone-shifted dates.
- [ ] The existing selective report opens with that range visibly selected. Dates and fields stay editable; preview and normal report options remain available. Valid shortcut entry makes its report purpose clear without triggering copy/share.
- [ ] Direct Export entry retains existing all-dates initialization. Invalid, incomplete, duplicate/ambiguous, impossible or non-week query context cannot silently create an unintended all-history report presented as this week's report; show an understandable error with deliberate recovery to ordinary date selection. Designer defines the recovery presentation; implementation defines and tests its narrow input contract.
- [ ] Current successfully saved edits appear. While Planner loading/saving fails, the shortcut cannot leave the screen or report stale saved data as current; preserve retained writing and direct the user to existing Retry. After successful Retry the action works. Pending event/template editing is preserved: do not navigate through an active editor without its existing explicit save/cancel resolution.
- [ ] Preparation works offline without an AI account, API key or Smart Paper server. Copy explains deliberate external paste/review/send, that cloud AI responses require connectivity, and that planning itself needs neither AI nor internet.
- [ ] Nothing transfers automatically. Reuse current Copy, Share and manual-selection paths, including clipboard failure and neutral chooser cancellation. Never promise opening an AI app attaches or sends the report.
- [ ] Finance starts excluded; existing unlock, hidden-Finance access and transfer-time authorization/fresh-preview checks remain effective. If source changes, retain the existing refreshed-preview review before another deliberate transfer.
- [ ] Empty weeks, long EN/FA content, past/future week labels, RTL/LTR, Light/Dark, keyboard/focus, disabled/error feedback and return to Planner pass focused checks without record mutations or lost writing.
- [ ] Ready Designer studio handoff, implementation checks, independent review, documentation and validated release gates pass. Native clipboard/chooser/recipient, lifecycle and TalkBack evidence remains explicitly unverified until observed; current policy treats these as follow-ups, not blanket publication blockers.

## Design direction

Designer owns placement, wording and presentation. Make the current week context and optional external review purpose understandable without competing with daily editing. Reuse existing report controls and shared tokens; avoid a second report builder.

Content meaning in both English and Persian: review the viewed week; prepare locally; choose exactly what to include; deliberately transfer; receiving cloud AI needs internet. Final translations belong to Designer.

Alternatives considered:

| Option | User value | Risk / size | Decision |
| --- | --- | --- | --- |
| Reuse Export report with viewed-week context | Removes date re-entry and uses familiar preview/privacy controls | Small; query validation and save safety | Selected |
| Add a separate report builder inside Planner | Avoids navigation | Larger duplicated controls and transfer/privacy logic | Excluded |
| PIN change next | Addresses reported credential discoverability | New credential persistence/recovery/import/session decisions | Later candidate |
| Diagnostics or review policy next | Improves support/process evidence | Broader unresolved collection or policy decisions | Later candidate |

## States and layouts

Designer should cover loaded/empty past/current/future week; loading; failed save with Retry; active editor; valid report context; malformed context recovery; offline explanation; clipboard denial; chooser cancellation; source refresh and finance denial. Use editable studio states in English/Persian with phone and wider viewport, long labels, font scaling, visible focus, accessible status and adequate touch targets. No physical-device validation is inferred from stories.

## Implementation handoff

- Product scope ready for Designer; Designer handoff is not yet ready for implementation.
- Lead condition: frontend implementation starts only after Finance visibility release closes and Designer marks the handoff ready.
- Frontend owns the narrow viewed-week initialization contract and reuses Planner save/editor boundaries and report transfer protections. No source data is carried in URLs; only validated calendar context may be passed.
- QA owns viewed-week correctness, direct/invalid entry, failed-save/editor preservation and bilingual deliberate transfer checks. Independent Security reviews Finance/privacy and source freshness; routine owns authorized scoped closeout/release after lead acceptance.
- Open design decisions: action placement/copy, report emphasis, malformed-context recovery presentation, and explanation of disabled action. No unresolved product capability decision is required for this bounded scope.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Source baseline | `weekly-planner.tsx`, `planner-local-autosave.ts`, `ai-report-panel.tsx`, `/export/page.tsx`, `ai-report.ts` | Narrow read-only inspection; no runtime claim |
| Personal systems | Read-only consultation forwarded by lead, 2026-10-12 | Incorporated; hypotheses marked |
| Designer studio / running UI | Future ready handoff and bounded comparison | Pending |
| Native Android delivery/accessibility | Observed device evidence | Unverified follow-up |
