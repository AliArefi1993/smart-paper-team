#!/usr/bin/env bash

set -euo pipefail

SMART_PAPER_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

repository_state() {
  local label="$1"
  local path="$2"
  local branch
  local revision
  local changes

  branch="$(git -C "$path" branch --show-current)"
  revision="$(git -C "$path" rev-parse --short HEAD)"
  changes="$(git -C "$path" status --short | wc -l | tr -d ' ')"
  printf '%-16s branch=%-12s revision=%-10s changes=%s\n' "$label" "$branch" "$revision" "$changes"
}

printf 'Smart Paper project context\n'
repository_state "team" "$SMART_PAPER_ROOT"
repository_state "backend" "$SMART_PAPER_ROOT/smart-paper"
repository_state "frontend" "$SMART_PAPER_ROOT/smart-paper-front"

latest_tag="$(git -C "$SMART_PAPER_ROOT" tag --list 'smart-paper-v*' --sort=-v:refname | sed -n '1p')"
latest_record_path="$(find "$SMART_PAPER_ROOT/releases" -maxdepth 1 -type f -name 'smart-paper-v*.md' -print | sort -V | tail -n 1)"
latest_record="${latest_record_path##*/}"
latest_record="${latest_record%.md}"
status_date="$(sed -n 's/^Last updated: \(.*\)\.$/\1/p' "$SMART_PAPER_ROOT/STATUS.md")"
android_version="$(sed -n 's/^[[:space:]]*versionName "\([^"]*\)"/\1/p' "$SMART_PAPER_ROOT/smart-paper-front/android/app/build.gradle")"

printf 'latest_record    %s\n' "${latest_record:-none}"
printf 'latest_local_tag %s\n' "${latest_tag:-none}"
printf 'android_version  %s\n' "${android_version:-unknown}"
printf 'status_updated   %s\n' "${status_date:-unknown}"
printf 'next_read        STATUS.md, then the task-specific source listed in AGENTS.md\n'
