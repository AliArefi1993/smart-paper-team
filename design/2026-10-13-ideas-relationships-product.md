# Product brief: Find a thought's origin and branches

Status: Product scope accepted; Designer handoff ready for frontend implementation
Updated: 2026-10-13
Owning frontend route/component: `/ideas`, `smart-paper-front/src/components/idea-space.tsx`
Local studio stories: [IdeasRelationships.stories.tsx](studio/src/stories/IdeasRelationships.stories.tsx); full handoff and evidence: [Designer handoff](2026-10-13-ideas-relationships.md)
Design type: proposed change

## Problem and evidence

The maintainer reported on 2026-10-07 that Idea Space feels unnatural because the relationship between two connected ideas is hard to find. The job is to revisit a saved thought, understand which earlier thought it grew from, and read the thoughts grown from it without losing current writing.

Observed at frontend `4a6736d` / Android 2026.10.21:

- `idea-notes.ts` stores one nullable `parent_id`; `commitIdeaDraft` assigns the source ID when saving a branch. Editing preserves it. This represents origin/branch lineage, not arbitrary association between independently saved notes.
- `idea-space.tsx` shows an origin's first 70 characters as noninteractive “From” text. There is no origin-opening action or discovery of a note's direct branches. Search filters only note bodies and results use the existing daily scatter order.
- `idea-draft.ts` already protects new/edit/branch writing, missing sources, changed edit sources and partial saves. Deleting a note retains other notes and their `parent_id` values. Local backup uses schema 5, validates unique IDs, accepts missing origins and cyclic parent references, and merges incoming records by ID.
- Existing tests contain `first: An unfinished thought` and `second: A branch`, with `second.parent_id = first`. This is a source-derived relationship example, not user research.

Read-only personal systems consultation independently identified the same origin excerpt and absent direct-branch discovery as barriers to revisiting a thought in a routine. It recommends direct lineage first while preserving capture and retrieval; this is source-based assessment, not observed usability.

Hypotheses: clearer bidirectional lineage will address part of the maintainer's complaint; whether they also need to associate independently captured thoughts is **Needs confirmation**. No observed user study or usage data establishes that requirement. It is deferred and does not block the supported lineage improvement.

## Outcome and scope

Desired outcome: someone can identify a saved thought's direct origin and direct branches, open either in full and return to their starting context offline. Success is observable task completion in EN/FA fixtures: open child → origin → another direct branch → return, including a target absent from current search results, with exact unfinished writing preserved.

In scope: clear directional origin/branch language, full saved-thought viewing, direct relationship navigation, reliable return, and truthful unavailable-origin states. Keep the existing creation, edit, delete, daily return and search capabilities.

Non-goals: arbitrary links, reparenting, graph/tree visualization, recursive family browsing, automated similarity or AI relationships, tags, schema migration, backend support, Planner/Timer/Finance integration, changing search ranking or draft storage. Independently saved notes remain independent even when their wording is similar.

| Option | User value | Risk | Implementation size |
| --- | --- | --- | --- |
| Clearer origin excerpt only | Better label; still cannot read origin or find branches | Low; does not resolve navigation friction | Small |
| Direct origin and branch viewing (recommended) | Reuses real saved relationships; enables reading both directions | Moderate interaction/focus and draft-preservation work; no new persistence | Small–medium |
| Explicit independent-note links | Could address broader associations, if wanted | Unsupported need; authoring/deletion/import semantics and extra data contract | Large relative to this cycle |

## Behavior and acceptance criteria

1. A saved note with a resolvable `parent_id` identifies its origin and lets the reader open its full current saved body. A note identifies and exposes its direct children, selected from the whole saved collection by `parent_id === note.id`, with each child shown once by ID. Use a deterministic order: `created_at` ascending, then ID as tie-breaker. Relationship meaning must remain clear in both languages; no generic “related” claim.
2. Full saved-thought viewing is separate from the composer: opening, hopping between relationships and returning do not edit, save, clear, replace or write the active draft. New/edit/branch modes, whitespace, source snapshot, receipt, recovery errors and session-only fallback remain intact. Pure viewing needs no discard confirmation. Keep the existing guard before an explicit Edit/Grow action replaces dirty writing; declining stays in the current view with writing intact. If an action successfully selects a composer draft, reveal/focus that composer and return to its existing workflow. Cleanup-pending saves still block replacement exactly as today.
3. The reader can return one viewing step and exit to the original collection or daily-return entry point. Preserve the search query, result ordering, collection scroll and entry control focus where the entry remains present. Exiting restores focus to the entry; if deletion removed it, use the collection heading. Returning between viewed thoughts places focus on the returned thought's heading. Designer chooses the presentation and accessible control names; these are behavior requirements, not a layout prescription.
4. Search remains body-only, case-insensitive with trimmed query and the existing ordering. Relationship targets resolve from all notes, even when they do not match the query. Do not clear the query or inject extra matches; exiting returns to the same filtered collection. Empty collection and no matches remain distinct. Opening daily rediscovery supports the same relationship reading and return without changing its selection algorithm.
5. No origin (`parent_id === null`) is an independent thought. A non-null parent that cannot be resolved shows “Original thought unavailable” / “فکر اصلی در دسترس نیست” without a dead action or invented replacement. No direct children is a clear empty relationship state. If a viewed note disappears after deletion/refresh/import, report it unavailable, retain writing and offer return; do not show stale content as a current saved note.
6. Edit updates the saved body's excerpts without changing IDs/lineage. Delete retains the existing confirmation and removes only the selected note; surviving children keep their IDs and parent references, then show origin unavailable. Active source deletion retains the existing explicit Keep as new thought recovery decision. Do not cascade, relink, or silently detach saved children.
7. Identity is ID, never body text: two different IDs with identical prose remain distinct thoughts and navigation targets. Duplicate IDs continue to fail current validation with saved data untouched. A self-parent reference is shown as an unavailable/invalid origin without a self-opening control; exclude the note from its own child set. Imported multi-note cycles retain their records and allow direct single-hop navigation; no recursive traversal, automatic expansion or claim of a valid tree. Return operates on user navigation steps, so cycles cannot trigger an automatic loop.
8. Preserve `IdeaNote`, note storage, contextual draft format and schema 5 exactly; no migration. Schema 5 exports round-trip IDs, timestamps, bodies and parent references; schema 1–4 backups remain accepted. Merge keeps unrelated notes and incoming records win matching IDs; Replace uses incoming notes only, and absent `idea_notes` clears notes in Replace and preserves them in Merge. Orphan/cyclic references remain importable as today. Viewing performs no storage mutation or repair.
9. Designer supplies EN/FA studio states for connected and independent notes, longer mixed-direction bodies, multiple branches, empty/no-match, missing targets, identical prose, self-reference/cycle and dirty/recovered/failing drafts. Use accessible names distinguishing opening a saved thought from growing/editing it; cover touch, keyboard focus/return, screen readers, phone portrait/landscape, dark/light and text enlargement. Android physical-device/TalkBack gaps remain explicitly unverified until observed.

## Concrete synthetic fixtures

Use the actual test record shape, with valid ISO timestamps, and no real personal writing:

- Existing test: `first`, “An unfinished thought”, parent null; `second`, “A branch”, parent `first`. Opening second reveals first; opening first reveals second.
- Bilingual extension: `a`, “A quieter morning / صبحی آرام‌تر”, parent null; `b`, “Try preparing breakfast the night before / آماده‌کردن صبحانه از شب قبل”, parent `a`; `c`, “Leave space before the first appointment / پیش از اولین قرار فرصت بگذار”, parent `a`; `d`, “Write down what felt different / بنویس چه چیزی متفاوت بود”, parent `b`. At b show a and d as direct relationships; c appears only after opening a.
- `e` has the same body as a and parent null; never infer a link. Search “breakfast” matches b only, yet a and d remain reachable through viewing; return restores that search.
- Orphan `o` points to missing ID; `s` points to itself; `x` points to `y`, `y` points to `x`. All bodies remain readable and stored unchanged; no recursion or self-opening control.
- Draft “  فکر ناتمام\nMixed writing  ” in each mode remains byte-for-byte unchanged during relationship viewing and return. Existing draft tests supply source-missing, conflict and cleanup-failure examples.

These are acceptance/design fixtures inferred from code and existing tests. They are not maintainer examples of independently related thoughts.

## Designer handoff and verification

Product recommends direct origin/branch viewing from existing lineage. The Designer has compared current behavior with the studio flow and marked the bilingual handoff ready for implementation. The maintainer chose existing branches first. No essential user clarification blocks this supported improvement; any independent-link proposal requires a separately confirmed example and scope.

| Check | Evidence | Result |
| --- | --- | --- |
| Current contract and source | PRODUCT Idea Space contract; frontend note/draft/component/import code at `4a6736d` | Read; facts recorded |
| Source fixture and recovery tests | `tests/idea-notes.test.mjs`, `tests/idea-draft.test.mjs` | Inspected; no test run claimed |
| Personal systems consultation | `/root/ideas_personal_scope` report relayed by lead; direct lineage recommended, broader associations unconfirmed | Incorporated |
| Designer studio | [Ready bilingual handoff](2026-10-13-ideas-relationships.md), editable stories and rendered evidence | Accepted; implementation may proceed |
| Frontend implementation, QA, Security and release validation | Owning repositories and existing gates | Pending; no app behavior or physical-device QA is claimed here |
