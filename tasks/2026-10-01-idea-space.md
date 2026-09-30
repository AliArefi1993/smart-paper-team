# Task: Give ideas a separate home

Status: released in `smart-paper-v2026.10.1`; Android device QA pending
Created: 2026-10-01
Updated: 2026-10-01

## Objective

Add a phone-first notes space that makes it easy to start writing and revisit unfinished thoughts without requiring folders, categories, or a polished title.

## Context

- Owning repository: `smart-paper-front/` (Android local-data mode).
- D-007 pauses backend feature parity. This feature is not available in backend mode.
- JSON backup/restore must include the new data before phone distribution.

## Acceptance Criteria

- [x] Reach Idea Space from the planner; write, edit, search, and delete a thought.
- [x] Optional sparks help start writing without rewriting the person's words.
- [x] One existing thought returns each day; a new thought can branch from it or any card.
- [x] English and Persian copy and responsive layout are present.
- [x] Local JSON backup includes notes; merge and replace imports handle notes, including older backups.
- [ ] Validate layout, keyboard, backup/restore, and upgrade on a physical Android phone.

## Product Decisions

- Plain text keeps capture quick, portable, and accessible. No generated content or claim of AI understanding.
- Sparks are optional sentence starters. The daily return picks deterministically from saved notes, so it needs no cloud service or notification permission.
- Notes use no folders, tags, ranking, or pressure to make a task. Search remains available for retrieval.
- Branches keep a link to their source note. Deleting a source leaves its branches intact.
- The unsaved new-note draft is kept locally; a saved note enters the JSON backup.

## Verification

| Check | Result |
| --- | --- |
| Frontend lint, types, 23 tests, local build | Passed in Docker |
| Local browser capture and Persian layout | Passed; physical Android validation remains |
| Physical Android test | Pending after requested release |

## Outcome / Handoff

Frontend feature commit `bff7ea2` and release version commit `8411e08` are in `smart-paper-v2026.10.1`. The maintainer requested publication before physical-phone checks. Next, test the Android keyboard, new and edited notes, branches, search, language switch, install/upgrade, and restore from both schema 4 and schema 5 backups. A backend notes API is a later decision if hosted use resumes.
