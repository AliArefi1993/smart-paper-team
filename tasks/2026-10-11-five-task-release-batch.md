# Task: Five sequential confidence tasks and stable release

Status: five tasks complete; accepted stable release publication in progress
Created: 2026-10-11
Updated: 2026-10-12

## Objective

Complete five bounded tasks sequentially under the maintainer's request, then publish a verified stable Android release from the final committed source.

## Scope and acceptance

1. XLSX export regression coverage: independent ZIP/XML inspection, bilingual text and cell semantics.
2. Configurable planner sections: settings persistence, visibility without data loss, JSON restore.
3. Finance records: unlocked CRUD/goal persistence and locked/expired rejection.
4. Week templates: save/overwrite/delete and full seven-day serialized backup round trips without aliasing/data loss.
5. CI/local-test policy evaluation: coverage/triggers, risk-based check recommendations and evidence reuse.

Each task completes before the next begins. Tests target gaps rather than repeat existing assertions. Design: not applicable; no app screen/copy/flow changes are planned. The existing icon implementation at frontend `99bd2de` and its uncommitted team design files belong to an earlier task; preserve them and coordinate publication, avoiding competing releases.

## Verification and release

- Targeted Docker Node 24 checks for each test task; final lint, types, full tests and local-data build.
- Independent test/code review; no unresolved high/critical findings.
- Exact committed source CI, protected stable signing, independent APK/provenance review, matching records/tags and anonymous public checksum verification.
- Keep backend paused; preserve unrelated changes. Phone/TalkBack/data-retention checks remain unverified follow-ups.

## Outcome

Task 1 complete: independent XLSX ZIP/XML checks passed (2 focused Docker Node 24 tests). Task 2 complete: four focused planner-section persistence/visibility/restore checks passed. Task 3 complete: three focused Finance CRUD/calculation/session-denial checks passed. Task 4 complete: two focused template lifecycle/serialized-restore checks passed. Task 5 complete: risk-based local checks/exact-commit CI reuse accepted, coverage/triggers and observed 3m42s–5m49s hosted runtimes recorded; billing/storage details remain unknown. Independent read-only review accepted all four new test files with no actionable findings. Scoped test commit and isolated clean full validation are assigned to routine closeout. A concurrent clean install interfered with the preliminary broad suite; final validation will use an isolated source copy. Existing icon build 38164657390 targets 2026.10.15/code 32; select a higher release version after that task closes. Unrelated timer design work also appeared during this batch and must remain scoped to its owner.

Release go: publish Android 2026.10.16/code 33 including accepted icon and timer commits. Icon 2026.10.15 was signed/reviewed but its owner hit usage limits before publication; its prepared record/artifact are preserved, and the final batch supersedes that unpublished candidate. The routine isolated source copy was prepared but no completed broad-run evidence survived; use final exact-source hosted CI and stable workflow checks under the accepted policy. Four test files committed/pushed at `2513a2a`. Independent reviewer accepted all four. No task-owned process remains (Docker inventory empty at lead takeover).

Final source `ea05f16` passed automatic CI38206205739 and protected signing38206221167. Independent Security accepted final APK/checksum/provenance, pinned single v2/v3 signer, code33/name2026.10.16/non-debug identity, 581 payload entries, 137 web files, preserved compiled icon/backup resources and packaged timer assets. Lead grants publication go. Exact final bytes committed from hosted artifact; physical checks remain unverified. Public verification pending.
