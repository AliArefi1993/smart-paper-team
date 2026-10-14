# Task: Keep Export unlock feedback in the selected language

Status: local implementation validated; release pending
Created: 2026-10-14
Updated: 2026-10-14

## Objective

Correct the observed Export unlock-success message that stays English after switching the app to Persian. Keep the active Finance authorization and Export/import behavior intact.

## Context

- [Desktop backlog design review](../design/2026-10-13-desktop-backlog.md) observed the issue after English unlock and language switch.
- Latest shipped Android release: [2026.10.24](../releases/smart-paper-v2026.10.24.md); frontend source `4c9bfad4f26d1165e18894eef096ee405f6f21f5`.
- Frontend `src/components/export-view.tsx` stored a translated success string when unlock completed, so later language changes did not update that status. [Ready handoff](../design/2026-10-14-export-unlock-locale.md) is implemented in frontend commit `9aee030`.

## Acceptance Criteria

- [x] Ready bilingual Designer handoff precedes the frontend change.
- [x] English/Persian switching updates the visible unlock-success feedback without relocking, reloading data or altering the status role/focus.
- [ ] Focused browser regression and relevant local checks pass with no unresolved high/critical finding; hosted exact-source checks pending.
- [ ] Documentation, scoped commits and the authorized signed Android release are complete; physical/native gaps remain accurately marked.

## Non-Goals

Finance credential changes, import/export semantics, new copy, physical-device claims or backend work.

## Verification

- Studio EN/FA phone/wide story typecheck/build and interactive switching passed; final handoff ready.
- Docker Node24 lint, TypeScript, 158/158 unit tests and local-data production build passed. Chrome 155 on macOS: existing 11 browser flows passed after the fix; two focused Export language tests passed after the final Persian-first case was added. `git diff --check` and browser test syntax passed. Independent source review found no actionable issue.
- Final frontend commit `9aee030` includes Android code42/name2026.10.25. Exact-source hosted CI, signing and final artifact review remain pending; physical Android/TalkBack unverified.

## Outcome / Handoff

Implementation is ready for scoped fast-forward push and hosted checks, then the authorized signed Android release. A task-owned production preview container was stopped after browser tests; no task-owned background process remains.
