# Smart Paper Release And Tag Workflow

This workspace uses the root team repository as the durable release memory.
The backend and frontend remain independent Git repositories.
The maintainer gave standing authorization on 2026-10-06 to release Android after requested user-visible changes are implemented and validated. Continue automatically through the signed APK build and documented publication steps when release prerequisites pass. Do not request another release confirmation or wait for physical-device checks; the maintainer installs released builds and reports issues. Documentation-only work does not need a new APK.

The lead retains acceptance, scope, and release go/no-go decisions. After a validated parent handoff, the routine closeout owner executes the documented version bump, build/sign, scoped commits and pushes, tags, and publication under this standing authorization. Release preflight is advisory and does not authorize publication. Before final closeout, agents send the assigned routine owner an inventory of every started background process with command, PID/tool session/container ID, ports, working directory, purpose, whether it remains needed, and no secrets. Routine stops only verified task-owned processes after consumers finish, tries graceful shutdown first, verifies shutdown, and reports unclear ownership. Shared reused daemons, user services, and volumes are preserved.

## Verification Builds In GitHub Actions

[Secret-free frontend CI](../smart-paper-front/.github/CI.md) runs in the frontend repository; see the [verified hosted run](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37895850672). Verification APKs are a separate testing channel; they do not change this stable release workflow, its signing identity, release records or tag publisher. Never upload a verification APK as a stable release asset.

The verification package must have a separate application ID and a visible verification label. Its data is separate from the stable app. Keep the installed stable app and its data; do not uninstall it to try a verification build. Runner-generated debug certificates are temporary and do not provide stable upgrade continuity between verification builds. Use only artifacts from source and contributors you trust.

CI covers automated checks and packaging. Physical-device, accessibility and recipient-app checks still require the recorded follow-ups. The design studio belongs to the team repository and retains its own Docker typecheck/build checks; frontend CI cannot validate uncommitted or independent studio changes.

## Hosted Stable Build Setup

A manual **Hosted stable-signed APK** workflow is implemented in the frontend repository; follow its [exact setup guide](../smart-paper-front/.github/STABLE-BUILDS.md). DevOps/Security review, official actionlint and failure/cleanup fixtures passed. Real hosted signing is pending maintainer configuration and an approved run; it is not yet verified.

The main-only workflow freezes the dispatched source SHA and committed version. A secret-free runner checks/builds an unsigned candidate; a fresh protected `stable-signing` runner signs the immutable same-run artifact. Credentials reach only direct apksigner execution, not npm/Gradle. No verification caches are reused. The key is held in restricted runner-temp storage and removed; only the APK/checksum/provenance are final artifacts.

Configure environment protection before adding its four secrets. The maintainer enters the existing key/passwords privately in GitHub; the agent does not read or upload them. Require a maintainer reviewer, select Branch `main` only, disable administrator bypass, and allow self-review for the sole maintainer. Each approval must check the exact source SHA, version and signing-helper/workflow changes. Approval can be submitted by the agent through authenticated GitHub CLI after explicit maintainer authorization in chat; see the [command flow](hosted-stable-build-cli.md). Signing credentials remain in GitHub, and environment protections stay enabled.

A first test uses current code26/name2026.10.9 without replacing the published APK. For later authorized releases, increment the version first, build that committed revision, download and independently verify the hosted stable artifact, then commit and publish **those exact bytes** through the existing team tag publisher. Record source SHA/run/candidate and final checksums. Do not rebuild locally after validating a hosted artifact for publication. Keep the local stable Docker fallback until remote signing is verified.

## When To Create A Tag

Create a release tag after one of these points:

- A mature feature or security improvement is complete.
- Several small improvements are complete and validated together.
- A working Android local-data build should be preserved as an installable version.

Commit release-related work in each owning repository before tagging. Keep unrelated user edits outside the release; block only when they affect the release build or provenance.
Do not tag failed or partially validated work.

## Tag Naming

Use the same release name in all three repositories for every shipped release:

```text
smart-paper-vYYYY.MM.N
```

Examples:

```text
smart-paper-v2026.08.1
smart-paper-v2026.08.2
```

`YYYY.MM` is the release month. `N` starts at `1` and increments for each tagged release in that month.

## Android Version And Signing Rule

For every tagged release that includes a working Android local-data app:

- Increment `smart-paper-front/android/app/build.gradle` `versionCode`.
- Set `versionName` to the release tag without the `smart-paper-v` prefix.
- Build Android with the stable-signed release workflow.
- Record the APK filename, checksum, signing certificate fingerprint, and validation result in `releases/`.
- Do not publish debug APKs for phone installs that should support future updates.
- Keep `smart-paper-front/android/smart-paper-release.jks` and `smart-paper-front/android/keystore.properties` private and backed up. They are intentionally ignored by Git.

Example mapping:

```text
Git tag: smart-paper-v2026.08.5
Android versionCode: 6
Android versionName: "2026.08.5"
APK name: SmartPaper-local-2026.08.5-release.apk
```

## Release Checklist

1. Inspect Git state separately:

```bash
git status --short --branch
cd smart-paper && git status --short --branch
cd ../smart-paper-front && git status --short --branch
```

2. Run validation relevant to the release:

```bash
cd smart-paper
.venv/bin/python manage.py test
.venv/bin/python manage.py makemigrations --check --dry-run
```

```bash
cd smart-paper-front
npm run lint
npx tsc --noEmit
npm run build
```

For a downloadable Android APK, also run `npm test` and the local-data build. Recent passing checks on unchanged source may be reused; verify the newly built APK signature, version and packaged local-data assets for each release. Under the maintainer’s standing direction, physical-phone and screen-reader checks are follow-ups, not publication gates. Record them as unverified when not run; do not imply installation proves them. Optional follow-up checks include upgrade/data retention, backup export/restore, English/Persian layout, offline use, notifications and TalkBack. Automated failures, invalid signing/version, or unresolved critical/high implementation findings still block release. Existing safety boundaries for production deployments, data and irreversible operations remain.

3. For Android local-data releases, build the stable-signed APK:

```bash
cd smart-paper-front
scripts/build-android-release-docker.sh
```

4. Verify the APK signature. The certificate SHA-256 should stay stable across releases:

```bash
cd smart-paper-front
docker run --rm --platform linux/amd64 \
  -v "$PWD":/app \
  -v smart-paper-front-android-sdk:/opt/android-sdk \
  -w /app \
  eclipse-temurin:21-jdk \
  sh -lc 'export PATH=/opt/android-sdk/build-tools/36.0.0:$PATH; apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk'
```

Current stable signing certificate SHA-256:

```text
59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5
```

5. Copy the APK into the team repository before tagging:

```bash
cd ..
cp smart-paper-front/android/app/build/outputs/apk/release/app-release.apk \
  releases/artifacts/SmartPaper-local-YYYY.MM.N-release.apk
shasum -a 256 releases/artifacts/SmartPaper-local-YYYY.MM.N-release.apk
```

6. Create a release record in `releases/` from `releases/TEMPLATE.md`.

The release record path must match the tag:

```text
releases/smart-paper-vYYYY.MM.N.md
```

7. Commit each changed repository in its own Git history.

For the team repo, commit the release record, APK artifact, and nested app repo pointer before creating the tag.

8. Create annotated tags in all three repositories:

```bash
git tag -a smart-paper-vYYYY.MM.N -m "Smart Paper vYYYY.MM.N"
```

9. Push commits first, then push tags:

```bash
git push
git push origin smart-paper-vYYYY.MM.N
```

## GitHub Release Publishing

The team repository has `.github/workflows/publish-release.yml`.

When a `smart-paper-v*` tag is pushed in the team repository, GitHub Actions automatically creates or updates the GitHub Release and uploads the matching APK asset.

As final release closeout, confirm the GitHub Release is published with the expected downloadable APK asset, download or otherwise inspect that asset and verify its SHA-256 against the committed artifact, then report the result. Also report the final branch, revision, and working-tree state for the team, backend, and frontend repositories.

The workflow expects both files to already exist in the tagged team commit:

```text
releases/smart-paper-vYYYY.MM.N.md
releases/artifacts/SmartPaper-local-YYYY.MM.N-release.apk
```

The workflow publishes committed APK artifacts. It does not build the APK itself.

Correct order for automatic publishing:

```text
build signed APK
copy APK into releases/artifacts/
write release note
commit and push app repos
commit and push team main
create and push tags, with the team tag last
GitHub Release is generated automatically
```

For an existing tag, run the `Publish GitHub Release` workflow manually from GitHub Actions and pass the tag name.

## Team Agent Responsibilities

- Product confirms the release is worth tagging.
- QA confirms acceptance criteria and user flows.
- Tester confirms automated checks.
- Security reviews sensitive changes before release.
- DevOps confirms release/build commands and artifact notes.
- Lead updates `STATUS.md`, `ROADMAP.md`, and `releases/`.
