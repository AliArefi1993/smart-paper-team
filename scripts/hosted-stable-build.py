#!/usr/bin/env python3
"""Safely dispatch and approve the hosted stable APK workflow via gh."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from typing import Any

REPO = "AliArefi1993/smart-paper-front"
WORKFLOW = "stable-build.yml"
ENVIRONMENT = "stable-signing"
REVIEWER = "AliArefi1993"
SHA_RE = re.compile(r"^[0-9a-fA-F]{40}$")


class SafeError(Exception):
    pass


def api(method: str, endpoint: str, *args: str) -> Any:
    command = ["gh", "api", "--hostname", "github.com", "--method", method, endpoint, *args]
    try:
        result = subprocess.run(command, check=False, capture_output=True, text=True)
    except OSError:
        raise SafeError("GitHub CLI is unavailable; install gh and authenticate privately.") from None
    if result.returncode:
        raise SafeError("GitHub API request failed; check gh authentication and repository access.")
    try:
        return json.loads(result.stdout) if result.stdout.strip() else None
    except json.JSONDecodeError:
        raise SafeError("GitHub API returned an invalid response.") from None


def require_sha(value: str) -> str:
    if not SHA_RE.fullmatch(value):
        raise SafeError("Expected source SHA must be a full 40-character hexadecimal commit SHA.")
    return value.lower()


def workflow_id() -> int:
    wf = api("GET", f"repos/{REPO}/actions/workflows/{WORKFLOW}")
    if not isinstance(wf, dict) or wf.get("path") != f".github/workflows/{WORKFLOW}":
        raise SafeError("The configured workflow is not stable-build.yml.")
    return int(wf["id"])


def get_run(run_id: str, expected_sha: str) -> dict[str, Any]:
    if not run_id.isdigit():
        raise SafeError("Run ID must be numeric.")
    expected_sha = require_sha(expected_sha)
    run = api("GET", f"repos/{REPO}/actions/runs/{run_id}")
    if not isinstance(run, dict):
        raise SafeError("Run details were unavailable.")
    if run.get("workflow_id") != workflow_id():
        raise SafeError("Run does not belong to stable-build.yml.")
    if (run.get("head_branch") != "main" or run.get("event") != "workflow_dispatch"
            or str(run.get("head_sha", "")).lower() != expected_sha):
        raise SafeError("Run source, branch, event, or expected SHA did not match.")
    return run


def verify_environment() -> None:
    env = api("GET", f"repos/{REPO}/environments/{ENVIRONMENT}")
    rules = env.get("protection_rules", []) if isinstance(env, dict) else []
    reviewers = [r for r in rules if r.get("type") == "required_reviewers"]
    if len(reviewers) != 1:
        raise SafeError("stable-signing must have exactly one required-reviewer rule.")
    rule = reviewers[0]
    names = {entry.get("reviewer", {}).get("login") for entry in rule.get("reviewers", [])}
    if names != {REVIEWER} or rule.get("prevent_self_review") is not False or rule.get("bypass"):
        raise SafeError("stable-signing reviewer, self-review, or bypass protection is unsafe.")
    policy = env.get("deployment_branch_policy") or {}
    if env.get("can_admins_bypass") is not False:
        raise SafeError("stable-signing must disable administrator bypass.")
    if policy.get("protected_branches") is not False or policy.get("custom_branch_policies") is not True:
        raise SafeError("stable-signing must allow only its explicit main branch policy.")
    branches = api("GET", f"repos/{REPO}/environments/{ENVIRONMENT}/deployment-branch-policies")
    entries = branches.get("branch_policies", []) if isinstance(branches, dict) else []
    if (branches.get("total_count") != 1 or
            [(item.get("type"), item.get("name")) for item in entries] != [("branch", "main")]):
        raise SafeError("stable-signing deployment policy must contain only branch main.")


def jobs(run_id: str) -> list[dict[str, Any]]:
    data = api("GET", f"repos/{REPO}/actions/runs/{run_id}/jobs?per_page=100")
    return data.get("jobs", []) if isinstance(data, dict) else []


def pending_approval(run_id: str) -> int | None:
    data = api("GET", f"repos/{REPO}/actions/runs/{run_id}/pending_deployments")
    if not isinstance(data, list):
        return None
    for deployment in data:
        env = deployment.get("environment", {})
        if env.get("name") == ENVIRONMENT and deployment.get("current_user_can_approve") is True:
            return int(env["id"])
    return None


def compact_status(run: dict[str, Any], run_jobs: list[dict[str, Any]]) -> None:
    print(f"run {run['id']} | {run.get('status')} / {run.get('conclusion') or 'pending'}")
    print(f"source {run.get('head_branch')} {run.get('head_sha')} | {run.get('event')}")
    print(f"url {run.get('html_url', '')}")
    for job in run_jobs:
        print(f"job {job.get('name')}: {job.get('status')} / {job.get('conclusion') or 'pending'}")


def command_status(args: argparse.Namespace) -> None:
    run = get_run(args.run_id, args.expected_sha)
    verify_environment()
    compact_status(run, jobs(args.run_id))


def command_approve(args: argparse.Namespace) -> None:
    run = get_run(args.run_id, args.expected_sha)
    run_jobs = jobs(args.run_id)
    if not any(j.get("name") == "Check main and build unsigned candidate" and
               j.get("status") == "completed" and j.get("conclusion") == "success" for j in run_jobs):
        raise SafeError("Unsigned candidate job must be completed successfully before approval.")
    verify_environment()
    user = api("GET", "user")
    if not isinstance(user, dict) or user.get("login") != REVIEWER:
        raise SafeError("Approval requires gh authentication as AliArefi1993.")
    environment_id = pending_approval(args.run_id)
    if environment_id is None:
        raise SafeError("This run has no pending stable-signing approval available to this user.")
    api("POST", f"repos/{REPO}/actions/runs/{args.run_id}/pending_deployments",
        "-f", "state=approved", "-f", "comment=Approved after exact source and unsigned build review.",
        "-F", f"environment_ids[]={environment_id}")
    print(f"Approved stable-signing for run {args.run_id} ({run['head_sha']}).")


def command_start(args: argparse.Namespace) -> None:
    sha = require_sha(args.expected_sha)
    if not args.version_code.isdigit() or not args.version_name.strip():
        raise SafeError("Version code must be numeric and version name must be non-empty.")
    current = api("GET", f"repos/{REPO}/commits/main")
    if str(current.get("sha", "")).lower() != sha:
        raise SafeError("Expected SHA is not the current main commit; dispatch refused.")
    workflow_id()
    verify_environment()
    api("POST", f"repos/{REPO}/actions/workflows/{WORKFLOW}/dispatches",
        "-f", "ref=main", "-f", f"inputs[expected_version_code]={args.version_code}",
        "-f", f"inputs[expected_version_name]={args.version_name}")
    print(f"Dispatched stable-build.yml for main at {sha}, version {args.version_name} (code {args.version_code}).")
    print("GitHub does not return a run ID for dispatch. Retrieve the exact run, then use status/approve with its ID and this SHA.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("status", "approve"):
        p = sub.add_parser(name)
        p.add_argument("run_id")
        p.add_argument("--expected-sha", required=True)
        p.set_defaults(func=command_status if name == "status" else command_approve)
    p = sub.add_parser("start")
    p.add_argument("--expected-sha", required=True)
    p.add_argument("--version-code", required=True)
    p.add_argument("--version-name", required=True)
    p.set_defaults(func=command_start)
    args = parser.parse_args()
    try:
        args.func(args)
    except SafeError as exc:
        print(str(exc), file=sys.stderr)
        return 1
    except (KeyError, TypeError, ValueError):
        print("GitHub response was incomplete or invalid.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
