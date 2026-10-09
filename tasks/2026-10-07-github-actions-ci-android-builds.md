# Task: Move tests and Android APK builds to GitHub Actions

Status: hosted stable-build implementation ready; maintainer setup/real signing run pending
Created: 2026-10-07
Updated: 2026-10-09

## Objective

Reduce local CPU/memory load and repetitive release work by running relevant automated checks and Android APK builds on GitHub-hosted runners, with safe release automation. No application server is required; installed Smart Paper remains offline/local-data.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Repositories have independent histories: team coordination, `smart-paper-front/`, and `smart-paper/`. Workflows belong in the repository owning the relevant source; define cross-repository orchestration explicitly.
- Existing team `.github/workflows/publish-release.yml` publishes an already committed APK and release record on team release tags. It does not build the APK or run app tests.
- Current signing, versioning and release record rules: [release workflow](../docs/release-workflow.md).
- Backend feature work remains paused; frontend/Android automation is the first priority. Scope backend test CI separately if beneficial, without backend feature/deployment work.

## Acceptance Criteria

- [x] Relevant frontend pull requests/pushes run lint, TypeScript, tests and the Android/local-data web production build using owning-repository commands; add studio checks when affected.
- [x] Produce downloadable APK build artifacts on GitHub-hosted runners, distinguishing non-release verification builds from stable-signed releases.
- [ ] Use dependency/Gradle caches, path filters, timeouts and cancellation of obsolete non-release runs to avoid unnecessary load; serialize release version/publication work.
- [ ] Release builds retain the existing signing identity and increasing versionCode; verify certificate, version, packaged local-data assets and checksum before publication.
- [ ] Isolate secret-free untrusted PR checks from trusted release signing/publication. Do not commit signing keys/passwords, expose them in logs/caches/artifacts, or provide them to fork/untrusted code. Define secure provisioning and security review before enabling signing.
- [x] Use minimal workflow permissions and reviewed/pinned actions. Protect the trusted release entry point under existing maintainer authorization; no automatic protected-branch merges or production deployment.
- [ ] Record exact source revisions across independent repositories, check results and APK provenance. Publish only the artifact built from validated source; do not silently rebuild different source for release.
- [ ] Extend or replace the existing publisher with a documented compatible transition covering release records, APK storage, tags and cross-repository triggers. Any change to current committed-APK policy is an explicit documented decision.
- [ ] Confirm actual repository visibility, Actions availability and account billing/storage limits. Bound artifact/cache retention; prefer standard hosted Linux runners and avoid paid larger runners without authorization.
- [ ] Verify the pipeline with representative success/failure cases, including failed tests blocking publication and PRs having no release-secret access.
- [x] Keep a documented local fallback and actionable failure output. Remote automation supplements local development feedback and physical Android QA.
- [x] Update release workflow, STATUS and relevant repository instructions only when automation is implemented and verified.

## Non-Goals

- Stable signing, release publication, backend CI and production deployment in this first stage. The user authorized secret-free frontend checks and verification APK builds on 2026-10-09.
- Hosting the application, production deployment, telemetry infrastructure or changing offline product behavior.
- Replacing physical-device/accessibility validation with CI claims.

## Plan

1. DevOps inventories existing build scripts, source/release topology, runner needs and actual Actions settings; propose a staged pipeline.
2. Add secret-free frontend checks and non-release APK artifacts first; validate remote execution and reduced local workload.
3. Security reviews trusted signing/publication boundaries; configure prerequisites without exposing credentials.
4. Add stable-signed release builds and compatible publishing/provenance with exact revisions and serialized versioning.
5. Exercise failure paths, verify downloadable artifacts, and document operation and local fallback.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Existing publishing | Team `.github/workflows/publish-release.yml` and release workflow inspected | Publishes committed APK; no build/test pipeline found in app `.github/` directories |
| Hosted-runner feasibility | Official GitHub billing and secrets documentation, checked 2026-10-07 | Standard public-repository runners supported; actual settings/quotas still to verify |
| Specialist review | DevOps implementation and independent Security review, 2026-10-09 | No blocking findings; no release secret references or publisher coupling |
| Static checks | Official checksum-verified actionlint v1.7.12, Bash/Python syntax, YAML pin/permission/retention assertions, diff whitespace, helper refusal and verifier fixtures | Passed; invalid stable package ID and altered packaged asset rejected |
| Hosted checks | [Main run 37894127020](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37894127020), frontend `093f55d` | Lint, TypeScript, tests, local-data build, Android sync and APK compilation passed; verifier rejected aapt whitespace; artifact upload correctly blocked |
| Verifier correction | SDK 36 `aapt` against existing release APK, read-only disposable Docker; spacing/identity/label/redaction regression checks | Real tool emits two spaces between launcher fields; parser now accepts whitespace while preserving exact identity/label. Security accepted; hosted rerun exposed debug-keystore path assumption |
| Hosted verifier diagnostic | [Run 37894791059](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37894791059), `e9a66d5`; dedicated check-run annotations endpoint | Signature/package/label checks reached debug certificate export; keytool failed on assumed default keystore path. Upload remained blocked; explicit runner-temp debug key correction accepted by Security; corrected hosted run passed |
| Explicit debug key | Disposable network-disabled Java 21 Docker: generate temporary debug key, export DER cert, sign copied APK, apksigner verify + digest comparison | Passed; original APK/SDK read-only; fixed runner-temp key path shared by signing and verifier, excluded from caches/artifacts |
| Workflow context correction | Official GitHub context availability and real actionlint v1.7.12 | Previous job-level `runner.temp` rejected before jobs; moved to Assemble/Verify step environments. Actionlint rejects old configuration and passes fixed workflow; Security accepted |
| Corrected hosted build | [Run 37895850672](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37895850672), frontend `4ffd09f` | Passed all frontend checks, Android assembly and APK identity/signature/version/assets/provenance verification, default-branch cache save and artifact upload |
| Failed test gate | [Failure run 37894257931](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37894257931), branch `codex/ci-validation/failing-test`, `8fa3ce8` | Tests intentionally failed; all build/verify/upload steps skipped; artifact count 0; fixture kept out of main |
| Verification artifact | Successful run page: `smart-paper-verification-4ffd09f782ae108ac62866fab69249b1a2dd8bde-1`, 5.24 MB; archive digest `sha256:5b864e186716ed786063eae1e104f0d651d4ef5773fea915db3fe6767f3fcfc1` | Uploaded with three-day retention. Archive download attempt was rate-limited (REST remaining 0); independent archive extraction/checksum check remains unverified, not an authorization finding |
| Actual repository | Public GitHub repository API, 2026-10-09 | Public frontend/main; Actions enabled as proven by hosted execution; account-specific usage/budget unavailable |

## Decisions And Risks

- Design: not applicable; this is build/test/release infrastructure work.
- Signing-key custody and untrusted public PRs are the main security boundary. Never move secrets merely to make a pipeline green. Validate future workflow edits with real actionlint; YAML parsing does not check expression-context availability. CI signing/verifier share an explicit runner-temp debug-key path rather than assuming Android/Java home locations.
- Frontend owns `.github/workflows/verification.yml`; relevant main pushes, PRs and manual dispatch run checks. `codex/ci-validation/**` pushes support isolated gate tests. Artifacts expire after three days; caches exclude keys/output and save only on successful main pushes, capped at 2 GiB per entry. Standard Linux runners only. No workflow belongs to the backend in this stage.
- Current official guidance: [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [Using secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets). Standard hosted runners are free for public repos; artifact/cache allowances and larger-runner charges need separate consideration. Recheck when implementing.

## Outcome / Handoff

First stage completed at frontend `4ffd09f`: secret-free frontend CI, isolated verification APKs, exact source/run provenance, bounded caches and short retention. DevOps and Security accepted the implementation; hosted success and intentional failed-test gates passed. Backend `68c789b`, stable Android code25/version2026.10.8, and the team release publisher remain unchanged. The failing fixture is confined to `codex/ci-validation/failing-test` (`8fa3ce8`); the local checkout is clean main. No task-owned background processes remain.

Independent archive extraction/download, a fork PR, cancellation, cache-hit rerun, physical install and account-specific billing usage are unverified follow-ups. The artifact exists and in-run APK verification passed; API rate limiting prevented independent download checking. Studio checks remain in the owning team repository.

User selected hosted stable signed builds on 2026-10-09. DevOps implemented a main-only manual workflow with exact-source APK verification; Security accepted it before maintainer configuration. Environment `stable-signing` is designed to hold four signing secrets and require explicit maintainer approval/main-only deployment; the maintainer must configure it before adding secrets. The agent does not read or upload private keys. No verification cache reuse or cross-repository write token is introduced.

Preserve the existing team publisher: download and independently verify the hosted stable artifact, then commit that exact APK with its record and tag. Do not rebuild a different APK locally for that release. GitHub secret setup and a real hosted signing run remain pending; no successful stable hosted run is claimed.


Hosted workflow implementation: frontend `625cfe0`; manual main-only exact-SHA/version inputs, secret-free unsigned builder and separate protected direct-apksigner job; immutable same-run artifact ID/digest, pinned stable certificate and complete payload/assets verification. Final artifact includes APK/checksum/provenance; signing key stays outside caches/artifacts with restricted permissions and cleanup. Actionlint, syntax, source/version/run/checksum/certificate/debug/assets/payload rejection and missing-secret/cleanup fixtures passed; Security accepted. See [setup instructions](../smart-paper-front/.github/STABLE-BUILDS.md). Automatic verification CI [37902689933](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37902689933) passed all checks and verification artifact upload. No secrets were read/uploaded and no hosted stable run was dispatched. Real signing/protected-environment checks remain unverified until the maintainer completes setup and approves the exact source.

Chat-based signing approval (2026-10-09): maintainer requested agent-operated GitHub CLI commands with explicit chat authorization. Environment API confirms reviewer AliArefi1993, self-review allowed, administrator bypass disabled and only Branch main. Secrets are maintainer-reported, not inspected. Initial hosted run [37905792035](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37905792035) at `625cfe02204191269459093fdfa66aa3755bba62` passed the unsigned build and is waiting for signing approval. CLI helper syntax and mocked dispatch/source/protection/pending-approval checks passed; independent Security review found no blockers. CLI installation/authentication and protected signing execution are pending; see [CLI procedure](../docs/hosted-stable-build-cli.md). Design: not applicable.
