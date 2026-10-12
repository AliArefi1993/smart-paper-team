# Smart Paper Releases

This directory contains prepared release records and tagged Smart Paper releases. A versioned record alone does not prove a tag was created or published; check the team repository tag and GitHub Release before describing it as shipped.

## Latest Release

[Android 2026.10.16](smart-paper-v2026.10.16.md), versionCode 33, passed exact-source CI, protected signing and independent artifact review, then published successfully. The [public APK](https://github.com/AliArefi1993/smart-paper-team/releases/download/smart-paper-v2026.10.16/SmartPaper-local-2026.10.16-release.apk) was anonymously downloaded and matched the committed artifact byte-for-byte: 4,395,446 bytes, SHA-256 `7637204b749689d7209a09b064d97843cc2dadfb4b1acda28d9789350e8ad908`. The signed icon-only 2026.10.15 candidate remains unpublished and is preserved as review evidence.

## Recent Releases

| Version | Outcome |
| --- | --- |
| [2026.10.16](smart-paper-v2026.10.16.md) | Approved icon and natural-sand timer; four regression tasks plus accepted CI policy; published and publicly verified. |
| [2026.10.14](smart-paper-v2026.10.14.md) | Published; backup/device-transfer policy and runtime-only Finance unlock; public APK matched the committed artifact. |
| [2026.10.13](smart-paper-v2026.10.13.md) | Published; Planner event editor fits short landscape viewports; public APK matched the committed artifact. |
| [2026.10.12](smart-paper-v2026.10.12.md) | Published; simplified Planner bottom area and inline save status; public APK matched the committed artifact. |
| [2026.10.11](smart-paper-v2026.10.11.md) | Published; Finance session expiry fix; public APK matched the committed artifact. |
| [2026.10.10](smart-paper-v2026.10.10.md) | Published; version-only Android update with no application behavior or data migration changes; public APK matched the committed artifact. |

Use [NEXT.md](NEXT.md) for the draft release, [TEMPLATE.md](TEMPLATE.md) for new records, and the [release workflow](../docs/release-workflow.md) for release steps. As part of normal release closeout, update this recent-release table and latest-release link.

Each release file should include:

- root team repository tag and commit
- backend tag and commit, if backend changed
- frontend tag and commit, if frontend changed
- Android local-data version and APK filename, if an Android build was produced
- Android signing certificate fingerprint, if a stable-signed APK was produced
- validation commands and results
- short release notes

Use `TEMPLATE.md` for new release records.
Use `NEXT.md` as the draft record for the next tag.

Release records are committed in the root team repository so the project has one durable place to see what shipped.

Use stable-signed release APKs, not debug APKs, for phone installs that should support future Android updates.

## GitHub Release Publishing

The team repository publishes GitHub Releases with `.github/workflows/publish-release.yml`.

For future releases, pushing a `smart-paper-v*` tag from the team repository creates or updates the matching GitHub Release and uploads the matching APK from `releases/artifacts/`.

For an existing tag, run the `Publish GitHub Release` workflow manually in GitHub Actions and pass the tag, for example `smart-paper-v2026.08.3`.
