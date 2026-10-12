# Smart Paper Release: smart-paper-v2026.10.16

Date: 2026-10-12

Status: Published and publicly verified.

## Scope

- Complete five sequential confidence tasks: independent XLSX ZIP/XML regressions, configurable-section persistence/visibility/restore, Finance CRUD/calculations/session-denial, seven-day template lifecycle/backup regressions, and accepted risk-based CI/local-test policy.
- Include the separately accepted launcher icon and natural-sand timer: walnut frame, warm mineral sand, paused grains and reduced-motion suppression. Designer, bilingual browser/studio and independent source review evidence is in the linked task records.
- The reviewed 2026.10.15 icon-only signed candidate was never published; this coordinated release supersedes it.
- No data migration, new product capability, dependency upgrade or backend change.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Release tag | `smart-paper-v2026.10.16` |
| Team target | Release commit identified by the annotated tag |
| Backend | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` (unchanged) |
| Frontend source | `ea05f160320f6a8c7017d6c25d8bf2625fc37e95` |
| Android | versionCode 33; versionName `2026.10.16`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.16-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.16-provenance.json` |
| APK SHA-256 / size | `7637204b749689d7209a09b064d97843cc2dadfb4b1acda28d9789350e8ad908` / 4,395,446 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Validation

- Focused Docker Node 24 tests passed sequentially: XLSX 2, sections 4, Finance 3, templates 2. Independent read-only Reviewer found no actionable finding in the four test files. The initial shared-checkout broad run was disrupted by concurrent clean installs and is not accepted as validation.
- A clean isolated source copy was prepared but no completed local broad-run evidence exists. Full source checks are supplied by successful hosted checks on the exact final commit under the [accepted policy](../docs/ci-local-test-policy.md); no repeated local broad run is claimed.
- Exact-source automatic CI: [38206205739](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38206205739) passed lint, TypeScript, tests, local-data build and isolated verification APK checks.
- Protected hosted stable build: [38206221167](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38206221167) passed source checks, unsigned candidate validation and protected stable signing. Workflow/signing helper diff since reviewed icon source is empty; protected reviewer/main-only/no-bypass controls remain required.
- Independent Security artifact review passed: one pinned v2/v3 signer; correct stable package/version/non-debug status; exact checksum/provenance/source/run and both archive digests; all 581 unsigned payload entries and 137 web files matched. All 380 compiled resource entries plus resources.arsc match the accepted icon candidate; compiled launcher/backup XML and packaged timer pause/reduced-motion/seven-grain assets checked. No high/critical artifact finding. No source rebuild or native runtime test was claimed.
- Backend checks were not rerun; its source is unchanged and backend feature work remains paused.
- CI policy review inventoried coverage/triggers/gaps and observed 3m42s–5m49s verification-job runtimes. Account billing/storage remains unknown; no workflow or release gate was removed.

## Task Evidence

- [Five-task batch](../tasks/2026-10-11-five-task-release-batch.md)
- [XLSX tests](../tasks/2026-10-11-xlsx-export-regression.md), [section tests](../tasks/2026-10-11-planner-section-regression.md), [Finance tests](../tasks/2026-10-11-finance-record-regression.md), [template tests](../tasks/2026-10-11-week-template-regression.md), [CI policy](../tasks/2026-10-11-ci-local-test-policy.md)
- [Launcher icon](../tasks/2026-10-11-android-launcher-icon.md) and [natural-sand timer](../tasks/2026-10-11-timer-natural-sand.md)

## Publication

The annotated release tag was pushed to frontend `ea05f160320f6a8c7017d6c25d8bf2625fc37e95`, backend `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2`, and team release commit `fb6cbe3e8959a899048a098eb630f584e9cbe0e2` in that order. Publisher run [38207188159](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38207188159) completed successfully. The public [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.16) is non-draft/non-prerelease and contains APK asset `632745926` (`SmartPaper-local-2026.10.16-release.apk`, 4,395,446 bytes). An anonymous download matched the committed APK byte-for-byte; SHA-256 is `7637204b749689d7209a09b064d97843cc2dadfb4b1acda28d9789350e8ad908`.

## Known Follow-Ups

Physical Android installation/upgrade/data retention, OEM icon rendering/tints, timer lifecycle, low-memory/file chooser/spreadsheet opening, native OS reduced motion and TalkBack remain unverified. Template UI application and broad browser wiring remain outside the regression tests. Existing dependency advisories and SheetJS remediation remain unresolved; this release changes no dependencies.

## Hosted Archive Evidence

Candidate artifact `11727319206` original ZIP SHA-256 `e8ee84c659554c021e5237617b7f500ec59f6617c169b0dcb15fc4d7e7245773`; final artifact `11727776511` original ZIP SHA-256 `86a534d82c0d83e03b0813233a3900c19aff93e4e4b8069a3e5fbd70e08a6ef8`. Lead downloaded and independently rehashed both to match GitHub API metadata. Provenance records 137 compared web assets and the exact source/run/version. Publish the exact downloaded final bytes; no local rebuild.

Automated CI test step passed; completed run-log retrieval timed out, so the exact full-suite count is not claimed. Eleven new focused tests are independently recorded. All artifact-review read-only Docker sessions exited and task containers were removed.
