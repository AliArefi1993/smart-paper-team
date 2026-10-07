# Task: Move tests and Android APK builds to GitHub Actions

Status: planned
Created: 2026-10-07
Updated: 2026-10-07

## Objective

Reduce local CPU/memory load and repetitive release work by running relevant automated checks and Android APK builds on GitHub-hosted runners, with safe release automation. No application server is required; installed Smart Paper remains offline/local-data.

## Context

- Roadmap: [Next, After Baseline Review](../ROADMAP.md#next-after-baseline-review).
- Repositories have independent histories: team coordination, `smart-paper-front/`, and `smart-paper/`. Workflows belong in the repository owning the relevant source; define cross-repository orchestration explicitly.
- Existing team `.github/workflows/publish-release.yml` publishes an already committed APK and release record on team release tags. It does not build the APK or run app tests.
- Current signing, versioning and release record rules: [release workflow](../docs/release-workflow.md).
- Backend feature work remains paused; frontend/Android automation is the first priority. Scope backend test CI separately if beneficial, without backend feature/deployment work.

## Acceptance Criteria

- [ ] Relevant frontend pull requests/pushes run lint, TypeScript, tests and the Android/local-data web production build using owning-repository commands; add studio checks when affected.
- [ ] Produce downloadable APK build artifacts on GitHub-hosted runners, distinguishing non-release verification builds from stable-signed releases.
- [ ] Use dependency/Gradle caches, path filters, timeouts and cancellation of obsolete non-release runs to avoid unnecessary load; serialize release version/publication work.
- [ ] Release builds retain the existing signing identity and increasing versionCode; verify certificate, version, packaged local-data assets and checksum before publication.
- [ ] Isolate secret-free untrusted PR checks from trusted release signing/publication. Do not commit signing keys/passwords, expose them in logs/caches/artifacts, or provide them to fork/untrusted code. Define secure provisioning and security review before enabling signing.
- [ ] Use minimal workflow permissions and reviewed/pinned actions. Protect the trusted release entry point under existing maintainer authorization; no automatic protected-branch merges or production deployment.
- [ ] Record exact source revisions across independent repositories, check results and APK provenance. Publish only the artifact built from validated source; do not silently rebuild different source for release.
- [ ] Extend or replace the existing publisher with a documented compatible transition covering release records, APK storage, tags and cross-repository triggers. Any change to current committed-APK policy is an explicit documented decision.
- [ ] Confirm actual repository visibility, Actions availability and account billing/storage limits. Bound artifact/cache retention; prefer standard hosted Linux runners and avoid paid larger runners without authorization.
- [ ] Verify the pipeline with representative success/failure cases, including failed tests blocking publication and PRs having no release-secret access.
- [ ] Keep a documented local fallback and actionable failure output. Remote automation supplements local development feedback and physical Android QA.
- [ ] Update release workflow, STATUS and relevant repository instructions only when automation is implemented and verified.

## Non-Goals

- Enabling workflows, configuring secrets, running builds or publishing a release during this planning request.
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
| Implementation checks | Deferred until task starts | Not run |

## Decisions And Risks

- Design: not applicable; this is build/test/release infrastructure work.
- Signing-key custody and untrusted public PRs are the main security boundary. Never move secrets merely to make a pipeline green.
- Exact workflow placement, trigger topology and artifact retention remain open. Preserve release identity and provenance rather than assuming all code belongs to the team repository.
- Current official guidance: [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [Using secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets). Standard hosted runners are free for public repos; artifact/cache allowances and larger-runner charges need separate consideration. Recheck when implementing.

## Outcome / Handoff

Saved as future work only. Next action when selected is a bounded DevOps plan for frontend CI and remote APK builds, with Security review before release signing. No workflows, secrets or app files changed.
