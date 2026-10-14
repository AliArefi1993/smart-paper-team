# CI And Local Test Policy

Status: accepted by lead on 2026-10-12 under the authorized five-task batch
Prepared: 2026-10-11

## Evidence

The frontend exposes `npm test` (`node --test tests/*.test.mjs`) across 25 test files at frontend `aa33f79` (inventory checked 2026-10-14). Coverage is strongest around deterministic logic: backup/import safety and merge/replace behavior, local schedule/template/planner-section/Finance persistence, Finance session expiry and runtime unlock, timer deadline recovery, Idea Space drafts/notes, report preparation, file sharing fallback, planner expansion/autosave, XLSX output, and mocked native morning-reminder scheduling. The four 2026-10-11 batch files were committed and pushed in frontend `2513a2a0fdd75cb3b55dfc853050d48d4833d39f`: `export-xlsx-regression.test.mjs`, `local-finance-records.test.mjs`, `local-planner-sections.test.mjs`, and `local-week-template-records.test.mjs`; hosted validation for this batch is recorded separately in its task/release record.

These are mostly Node tests with isolated storage/runtime mocks or source inspection. Focused browser integration now covers selected navigation/autosave, import, bilingual draft/Export status and changed-control flows in `tests/browser/`; this is bounded desktop coverage. Broad browser component coverage, actual Android runtime tests and broad Django API integration remain absent. Native file chooser, notifications, upgrade/restore and TalkBack behavior need device checks. The existing team-repository design studio is outside frontend CI. A passing suite is not a dependency-security audit. The older SheetJS 0.18.5 writer assessment left ReDoS reachability unresolved; the [writer upgrade](../tasks/2026-10-12-spreadsheet-writer-upgrade.md) replaced it with official vendored CE 0.20.3 in Android 2026.10.17. Vendored-package absence from registry audit results does not certify safety; current dated dependency scopes remain in the [advisory assessment](android-dependency-advisories.md).

`verification.yml` runs on relevant PRs, pushes to `main` and `codex/ci-validation/**`, and manual dispatch; its path filter includes app, tests, Android, scripts, config/package, and workflow files, while omitting docs-only edits. One Ubuntu 24.04 job uses Node 24/Java 21/SDK 36 and runs `npm ci`, lint, `tsc --noEmit`, all tests, local-data production build, Capacitor sync, isolated debug APK assembly and APK/provenance checks. Obsolete runs for an event/ref are canceled. Dependencies restore from an exact lock/config/tool key; only successful default-branch pushes save the bounded cache. A skipped path-filtered workflow should not be made an unconditional required check without handling skipped status.

`stable-build.yml` is manual and main-only. It repeats source/version/signing preflight, `npm ci`, lint, type check, tests, production build, Capacitor sync and an unsigned APK build; then a separate protected `stable-signing` environment signs the exact run candidate and verifies signature/checksum/provenance. Verification CI and stable signing overlap on source checks and APK construction but have different purposes: CI makes a secret-free debug artifact; the stable workflow rebuilds/validates a release candidate and crosses the protected signing gate. That overlap is intentional release defense and should remain.

Recent successful verification run evidence from GitHub CLI:

| Run | Commit | Job elapsed | Cache evidence |
| --- | --- | ---: | --- |
| [38164641840](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164641840) | `99bd2de7` | 5m49s | exact key missed; saved afterward |
| [38078425679](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38078425679) | `d899f2c9` | 4m26s | exact key missed; saved afterward |
| [38076385159](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38076385159) | `deaad89e` | 3m42s | exact key missed; saved afterward |

These small samples establish an observed full hosted-job range, not a stable estimate or a clean-versus-cache effect. Different commits had different cache keys; all inspected runs missed. No reliable cached timing comparison is available. The frontend repository is public and uses standard `ubuntu-24.04`; GitHub’s current [Actions billing documentation](https://docs.github.com/en/billing/concepts/product-billing/github-actions) says standard hosted runner use is free for public repositories. Account-specific billing/storage use, cache/artifact consumption, and any organization/account exceptions remain unknown. Do not infer a dollar cost or claim account billing is zero from that public-repository rule.

## Recommended Local/Hosted Decision Matrix

Accepted operating policy. Matrix local checks are defaults before CI evidence is available. In every risk tier, successful named checks on the exact final commit may replace identical repeated local checks under the reuse conditions below; audits, specialized review, studio/browser/device checks and artifact gates remain separate.

| Change or situation | Local check before handoff | Hosted/release evidence |
| --- | --- | --- |
| Documentation-only, links/status/task records | No app test run; check changed links, paths, Markdown and factual claims | No frontend run expected from current path filters. Do not claim app validation. |
| Narrow deterministic frontend fix with a related test | Run the focused test file and relevant lint/type check when locally available | Require successful verification for the exact final commit before merge/release acceptance. If that run already passed for the same SHA and unchanged workflow/tool inputs, reuse its named checks rather than rerunning locally. |
| Routine screen styling/copy/layout | Focused tests if logic changes; lint/type check; inspect EN/FA and relevant viewport/studio handoff | Exact-SHA CI for code. Designer handoff and visual/browser checks remain separate evidence; CI does not prove visual behavior. |
| Data persistence, backup/import/export, schema or migration | Focused tests plus full `npm test`, lint, type check and relevant build; inspect backward compatibility/data preservation. Backend migration/API changes also use backend-owned checks if backend work resumes. | Full exact-SHA verification CI; release workflow remains required for Android release. Review migration/restore evidence separately. |
| Security, authentication/session, dependency or lockfile change | Full suite, lint, type check, production build, fresh dependency install; run applicable audit/advisory and focused security review | Exact-SHA CI plus required security/dependency review. CI currently does not itself provide a comprehensive dependency audit. Stable signing/artifact gates remain unchanged. |
| Native Android, Capacitor, manifest, plugin, Gradle or packaging change | Full suite and local build/assembly when practical; targeted install/runtime check on a device for changed native behavior | Exact-SHA CI and verification APK. Physical-device, accessibility, signing and artifact review remain separate as applicable. |
| Workflow, build script, toolchain or CI configuration change | Run relevant syntax/static checks and a local equivalent where feasible; do not rely on source tests alone | Require a hosted run exercising the changed workflow path. Preserve least permissions, exact-source checks, artifact verification and protected stable signing. |
| Failed or ambiguous CI | Reproduce the failing step locally when possible and inspect logs; fix or identify an external/transient cause before handoff | A failed, canceled, stale-SHA, skipped or incomplete run cannot validate the final commit. Retry only after understanding or correcting the failure. |
| Offline work | Run focused or full local checks according to risk and record that hosted evidence is pending | Do not mark hosted validation complete or release based on stale CI. Resume exact-SHA workflow when connectivity returns. |
| Dirty source or concurrent edits | Identify whether local changes are included in the tested revision; run local checks against the actual handoff tree when it differs from committed CI source | CI validates only its checked-out SHA. It cannot validate uncommitted edits; commit/revision identity must match the accepted handoff. |

### Exact-SHA CI reuse conditions

Successful CI can satisfy repeated local lint/type/test/build checks for a handoff when the run checked the exact final commit; all required jobs completed successfully; workflow, dependency lockfiles and relevant build inputs at that SHA match; and the run is recent enough that the maintainer still trusts its toolchain and external dependencies. The run must include the relevant path/job for the change. A PR synthetic merge commit is evidence for that merge candidate, while provenance also records the PR head; it does not validate later commits. CI success never proves physical device behavior, accessibility, release signing or the final public artifact unless those gates themselves were separately completed and verified.

For exact-SHA reuse, local runs become focused debugging and early feedback rather than a ritual full-suite repeat on every handoff. Do not skip targeted local reproduction when a failure is difficult to interpret, when offline, when source is dirty, or when CI does not cover the changed behavior. Revisit this policy when coverage, toolchains or observed failures change.

## Gaps For A Later Implementation Phase

- Add focused browser-level coverage for critical user flows where deterministic unit tests cannot catch React wiring, routing, keyboard or RTL regressions; first define a small set of high-value flows and tool/runtime cost.
- Decide whether a lightweight studio check belongs in team CI when `design/studio/` changes; it is outside the frontend repository and should be owned there.
- Add an explicit dependency advisory/audit policy rather than treating `npm ci` as a security scan.
- Keep native device/accessibility scenarios as explicit manual QA until an approved reliable device automation environment exists.
- Keep backend CI scoped as a separate decision while backend feature work is paused.

## Constraints

This evaluation changes no workflow, application code, tests, backend behavior or release gate. The lead accepted risk-based local checks and exact-commit evidence reuse on 2026-10-12; no workflow or release gate changed. Exact-source hosted checks, stable signing approval, APK provenance/artifact review, publication controls, Designer review and physical-device/accessibility follow-ups remain as currently required by their owning processes.
