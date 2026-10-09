# Hosted stable-build command line

This helper dispatches, inspects, and submits the protected-environment approval for the frontend repository's `stable-build.yml` workflow. It never reads or prints credentials, calls secret endpoints, edits protection rules, creates tags, or publishes releases. Under the maintainer's 2026-10-09 standing authorization, the agent may run it for an eligible validated Android change or explicit release request without asking for per-run user permission. The lead retains release go/no-go.

## Authenticate once

The maintainer completes GitHub's interactive sign-in once in a private terminal when the existing CLI session is absent or expired. Eligible release runs reuse the authenticated `AliArefi1993` review identity; no per-run login or permission request is needed. Do not paste an authentication token into chat or the command line:

```sh
gh auth login --hostname github.com --git-protocol https --web
```

The helper uses the `gh` CLI's existing authentication. It does not read/export tokens itself. The signed artifact still requires the already-protected `stable-signing` environment and its signing secrets. See [frontend stable-build setup](../smart-paper-front/.github/STABLE-BUILDS.md) for private one-time environment/secret setup. If either setup or authentication is incomplete, commands fail closed.

## Dispatch and inspect

From the team workspace, dispatch the current `main` commit only when its full SHA is known and reviewed. Supply the version already committed in the frontend repository:

```sh
python3 scripts/hosted-stable-build.py start \
  --expected-sha FULL_40_CHARACTER_SHA \
  --version-code 27 \
  --version-name 2026.10.10
```

The example matches the 2026.10.10 release; always use the version committed to frontend `main` before dispatching a later build. The helper checks the current full `main` SHA before dispatch. GitHub's dispatch API does not return a run ID, and `main` could advance before GitHub starts the run, so the separate exact-SHA check is mandatory. Retrieve recent runs with:

```sh
gh run list --repo AliArefi1993/smart-paper-front \
  --workflow stable-build.yml --limit 10 \
  --json databaseId,headSha,status,conclusion,url
```

Choose the new run only after confirming its source SHA and version, then inspect it:

```sh
python3 scripts/hosted-stable-build.py status RUN_ID --expected-sha FULL_40_CHARACTER_SHA
```

Status checks that the run belongs to `stable-build.yml`, is a `workflow_dispatch` on `main` at the exact expected SHA, and that `stable-signing` has the required reviewer, no self-review prevention, no administrator bypass, and only the `main` branch policy. It prints the workflow URL and compact job states.

## Submit the protected approval

Status is read-only. For an eligible validated change or explicit release request, proceed under standing maintainer authorization after the lead accepts the scope and gives release go-ahead. Before approval, verify the exact run URL, source commit and version against the approved changes, review workflow/signing-helper changes, and confirm the unsigned build job succeeded. Then invoke the approval command:

```sh
python3 scripts/hosted-stable-build.py approve RUN_ID --expected-sha FULL_40_CHARACTER_SHA
```

Approval requires the authenticated GitHub API identity to be `AliArefi1993`, the unsigned candidate job to have completed successfully, and GitHub to report that this account can approve the pending `stable-signing` deployment. The helper rechecks the exact source and environment protections immediately before submission. This submits the required GitHub reviewer decision under the existing review identity; it does not bypass GitHub protection. The standing authorization is not a scheduler or unattended signing permission and does not cover production/database changes, destructive Git operations, or credential handling. Revisit it when real users begin using the app or the maintainer revokes it; no date-based expiry applies.

After signing succeeds, download and verify the final artifact as described in the frontend setup guide. Under the standing release authorization and lead go-ahead, commit the exact verified APK, original provenance, and release record to the team repository. Push annotated frontend and backend tags, then the team tag last; verify the published non-draft release and anonymously download/checksum the public APK. This helper itself never tags or publishes.
