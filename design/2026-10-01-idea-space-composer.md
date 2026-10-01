# Design: Idea Space writing flow

Status: implemented; physical Android validation pending
Updated: 2026-10-01
Owning frontend route/component: `/ideas`, `smart-paper-front/src/components/idea-space.tsx`
Figma frames: [English mobile proposal](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=3-2), [Persian RTL proposal](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=3-32)

## Problem and evidence

- User direction: improve the quality of Smart Paper designs and establish a designer workflow.
- Code evidence: the current Idea Space composer places four optional writing sparks before the textarea, so the optional choices precede the main task of writing. The screen also uses a decorative gradient and staggered note cards. This is a design critique based on source inspection, not a user research finding.
- Hypothesis: putting the editor immediately after the section heading will make the primary action easier to find on a phone. This still needs user testing or observed use.

## Outcome and scope

- Desired outcome: a calmer, writing-first mobile screen with a clear save action and optional sparks close to the editor.
- In scope: visual hierarchy, spacing, card treatment, responsive control sizing, and position of the existing spark controls.
- Non-goals: new note capabilities, persistence changes, altered copy, backend parity, or changing the current app's navigation.
- Acceptance criteria: the editor precedes optional sparks; save, edit, branch, delete, search, daily rediscovery, draft recovery, error/success feedback, and English/Persian remain functional; mobile controls remain reachable and readable.

## Design direction

- The composer uses the existing paper/teal palette with a muted green surface and plain white editor. The writing field is the dominant element. Optional sparks sit behind a disclosure so four long labels do not push the save action below the first phone screen. The save action fills the available width on phones.
- The privacy hint follows the composer so it remains visible without competing with the save action.
- The returning thought uses a quiet amber surface. Saved notes form a regular grid with no stagger; search fills available phone width.
- The Figma frames are editable visual proposals showing the collapsed spark state. Implementation retains all four existing sparks behind the disclosure and the language control. Figma's example note text is illustrative, not production copy.

## States and layouts

- Existing code covers loading, local-mode unavailable, empty collection, no search matches, save/error feedback, editing, branching, and destructive confirmation. These states are part of the handoff even though only the populated mobile state is drawn in Figma. Expanding the spark disclosure reveals four choices; selection collapses the list and returns focus to the editor.
- Phone frame width is 390px. Wider screens retain the frontend's responsive grid. Long Persian labels can wrap within chips; RTL direction and the Vazirmatn font are preserved.
- Textarea keeps a programmatic label; spark group has a programmatic label and pressed states. Focus styles, keyboard submission, and 44px minimum spark targets remain.

## Implementation handoff

- `IdeaSpace` owns the layout. No new component abstraction or data contract is needed.
- Keep the full translated text and all four sparks from `src/lib/i18n.ts` rather than copying abbreviated Figma examples.
- Preserve all local-storage behavior. This is a visual and order change, not a data migration.
- Physical Android use, text enlargement, and the full matrix of error/empty/edit states still require device review.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Editable Figma English/Persian proposals | Frames `3:2` and `3:32`; screenshots inspected, RTL header overlap fixed | Passed |
| Frontend lint, type, tests, local build | Docker lint, TypeScript, 23 tests, local-data production build after final changes | Passed |
| Running UI at 390px in English/Persian | Browser screenshots and accessibility tree; no horizontal overflow, save visible, spark selection checked | Passed |
| Focus after spark selection | Browser accessibility tree reported focus on `idea-body` after selecting a spark | Passed |
| Physical Android layout and interactions | Device review | Pending |
