# Hosted stable-build command line

This helper dispatches, inspects, and explicitly approves the frontend repository's `stable-build.yml` workflow. It never reads or prints credentials, calls secret endpoints, edits protection rules, creates tags, or publishes releases. The agent runs `approve` only after explicit maintainer approval in chat.

## Authenticate once

Run this command yourself in a private terminal and complete GitHub's interactive sign-in. Do not paste an authentication token into chat or the command line:

```sh
gh auth login --hostname github.com --git-protocol https --web
```

The helper uses the `gh` CLI's existing authentication. It does not read/export tokens itself. The signed artifact still requires the already-protected `stable-signing` environment and its signing secrets. See [frontend stable-build setup](../smart-paper-front/.github/STABLE-BUILDS.md) for private one-time environment/secret setup. If either setup or authentication is incomplete, commands fail closed.

## Dispatch and inspect

From the team workspace, dispatch the current `main` commit only when its full SHA is known and reviewed. Supply the version already committed in the frontend repository:

```sh
python3 scripts/hosted-stable-build.py start \
  --expected-sha FULL_40_CHARACTER_SHA \
  --version-code 26 \
  --version-name 2026.10.9
```

Use the version committed to frontend `main`; the values above match the currently recorded `main` version. The helper checks the current full `main` SHA before dispatch. GitHub's dispatch API does not return a run ID, and `main` could advance before GitHub starts the run, so the separate exact-SHA check is mandatory. Retrieve recent runs with:

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

## Explicit approval

Status is read-only. The agent performs dispatch only after the user requests/approves that action, and performs approval only after explicit approval in the current chat. After reviewing the exact run URL, source commit, version, workflow and signing helper changes, and confirming the unsigned build job succeeded, invoke approval explicitly:

```sh
python3 scripts/hosted-stable-build.py approve RUN_ID --expected-sha FULL_40_CHARACTER_SHA
```

Approval requires `gh auth status` to resolve through the API as `AliArefi1993`, the unsigned candidate job to have completed successfully, and GitHub to report that this account can approve the pending `stable-signing` deployment. The environment protection settings are rechecked immediately before approval. No approval is inferred from dispatch or status inspection.

After signing succeeds, download and verify the final artifact as described in the frontend setup guide. Release publication remains a separate tag-triggered step under the existing maintainer authorization: commit the verified APK and release record to the team repository, then publish through the authorized `smart-paper-v*` tag workflow. This helper never tags or publishes.
