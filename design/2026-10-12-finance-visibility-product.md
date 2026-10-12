# Design: Optional Finance visibility — Product brief

Status: brief — ready for Designer
Updated: 2026-10-12
Owning frontend route/component: local-data Settings, Planner, Summaries, Export and Finance
Local studio story links: Pending Designer; existing `Finance.stories.tsx` and `FinanceSessionExpiry.stories.tsx` are relevant baselines
Optional Figma file and frame links: Not required
Design type: proposed change

## Problem and evidence

- User job: use the offline Android planner without a Finance destination unless deliberately wanted. Maintainer explicitly requested optional/default-hidden Finance on 2026-10-07; on 2026-10-12 requested the backlog be completed one item at a time, easiest/fastest first. Timer remains available by default.
- Observed: Planner, Summaries and Export render unconditional Finance links (`weekly-planner.tsx:1187`, `week-summaries-view.tsx:106`, `export-view.tsx:218`). Settings currently manages Planner sections and morning notifications, with saved/unsaved/error handling. No Finance visibility preference was found in these flows.
- Observed data contract: `local-store.ts` stores Finance goal/entries under `smart-paper.local.finance`; reads default to zero/empty without creating that key. Full JSON export and Merge/Replace import require Finance unlock. JSON schema 5 contains Finance records, no visibility preference. The separate AI report starts Finance fields off and requires unlock for selected Finance data.
- Credential comparison evidence: the current local PIN is a public build-time `NEXT_PUBLIC_FINANCE_PIN` or fallback `1234`; Finance shows the default hint when no configured value exists. No mutable local credential or change flow exists. Unlock lasts one hour in runtime memory and resets after reload/restart. Change PIN would require additional credential persistence, recovery and invalidation decisions.
- Hypothesis: hiding an unused Finance destination reduces distraction. Needs confirmation through actual use; no user research or measured benefit is claimed.

## Outcome and scope

- Desired outcome/success signal: a fresh local install starts with Finance absent from normal navigation; the user can enable it offline, hide it again, restart, and regain unchanged saved records through deliberate re-enabling and the existing PIN gate.
- In scope: a locally saved Finance visibility preference, discoverable control, consistent navigation visibility, hidden direct-route state, safe existing-install fallback, bilingual feedback and bounded data-preservation verification.
- Non-goals: Change PIN, new Finance functionality, encryption/accounts, backend changes, Timer visibility, JSON schema changes or redesign of export authorization.

Acceptance criteria:

1. With no saved preference and no Finance storage key, Finance starts hidden. With no saved preference and an existing Finance storage key, retain visible Finance on upgrade, including empty or damaged saved Finance records. Use key presence, without inferring user intent from goal/amount or reading protected records for display. This is a Product recommendation resolving the task's open upgrade rule, not an observed migration.
2. An explicit saved preference overrides that fallback and persists across restart. Resolve and persist the initial preference once so a later import does not unexpectedly change visibility. Enabling/hiding works offline and updates all three existing navigation links consistently. Failed storage writes keep the previously effective preference and communicate failure; no false saved state. Invalid preference or unavailable storage gets a recoverable state and must not erase records or silently make known existing records inaccessible.
3. Settings always offers a discoverable way to enable/hide Finance. Designer owns placement, control, save timing and interaction details, accounting for existing unsaved Settings changes.
4. Direct `/finance` access while hidden explains the preference and offers a deliberate route to enable Finance. It must not automatically enable or show records. Enabling does not grant authorization; the existing PIN/session gate still applies. Visibility is a convenience preference, not a security boundary.
5. Hiding mutates only the preference: Finance goals/entries, Planner/Ideas/templates, PIN and session policy remain intact. Leaving an active Finance form to change visibility follows the existing unsaved-edit behavior; no silent new save or discarded edits. Re-enabling restores access to persisted records.
6. Export remains discoverable and fully usable while Finance is hidden. Full JSON backup/import still requires the existing unlock and includes/restores Finance. Existing CSV/XLSX and selected Finance AI report access remain available with their existing authorization. Explain that hiding does not remove Finance from backups or exports. Do not omit Finance silently.
7. JSON Merge/Replace imports never overwrite an explicit visibility preference. Restoring Finance into a hidden install leaves it hidden but retrievable through Settings; restoration success makes that access understandable. Visibility stays device-local and is excluded from JSON backups in this cycle; existing schema remains compatible.
8. English/Persian, RTL/LTR, Light/Dark, touch, keyboard and screen-reader states pass Designer/QA review. Focused tests cover fresh/existing/explicit preference cases, persistence failure, consistent links, hidden route, unchanged Finance data and retained backup/import/report authorization. Independent Security review verifies no authorization bypass; physical Android gaps are recorded accurately.

## Design direction

- Give the user control over whether Finance appears, make re-enabling understandable, and clearly distinguish hiding from deleting records. Designer chooses hierarchy and placement; no screen arrangement is prescribed.
- Meaning examples for Designer translation review: “Show Finance” / «نمایش بخش مالی»; “Hiding Finance keeps your saved records. Backups and exports can still include them.” / «پنهان کردن بخش مالی، اطلاعات ذخیره‌شده را حذف نمی‌کند. نسخه‌های پشتیبان و خروجی‌ها همچنان می‌توانند شامل این اطلاعات باشند.»
- Reuse current controls, appearance/language roles and notification/Settings feedback conventions where appropriate. Designer determines whether additions are necessary.
- Alternatives: **visibility now** has explicit user value and small-to-medium implementation across existing links/preferences, with manageable upgrade/data-access risks; **Change PIN now** addresses a real credential concern but is medium-to-large because no change/storage/recovery contract exists, and has higher security/error risk. Recommend visibility first. **Hide every existing install** is simplest but surprises current Finance users; reject in favor of preserving key-bearing installations. **Keep all existing installs visible** needs a broader installation marker absent from the inspected flow; the Finance-key fallback is bounded and preserves actual saved Finance state.

## States and layouts

- Cover fresh hidden, upgraded visible, explicitly hidden/visible, save success/failure, malformed/unavailable preference, direct route hidden, locked/unlocked re-enabled, import into hidden install, and navigation with existing Settings/Finance edits.
- Phone portrait and short landscape first; wider viewport must remain usable. Cover English/Persian long copy, RTL, font scaling, keyboard/focus, announced state/errors, touch targets and contrast.

## Implementation handoff

- Designer inputs: this brief, [existing task](../tasks/2026-10-07-finance-optional-default-hidden.md), current named components and Finance studio baselines. Review the running UI and create editable English/Persian stories before frontend work.
- Behavior/data constraints: the acceptance criteria above are proposed Product decisions; Designer may raise concrete conflicts. Storage format/error handling belongs to Frontend/Security; layout/control/save timing belongs to Designer.
- Open decisions: no user approval gap identified in this bounded scope. Designer must resolve placement and unsaved-change interaction; Frontend/Security must validate storage failure behavior. A future Change PIN recovery policy remains outside this cycle.
- Ready for implementation decision and reviewer: **not yet**; Product scope is ready for Designer. Frontend begins after Designer marks the interaction handoff ready, then continues through testing/review/release under standing authorization.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product scope and source inspection | Named frontend sources and existing task, 2026-10-12 | Brief ready for Designer |
| Design review on phone in English/Persian | Pending Designer studio handoff | Pending |
| Comparison with running UI | Source review only in Product preparation | Pending Designer |
| Accessibility and interaction states | Acceptance criteria above | Pending |
