# Smart Paper Releases

This directory contains prepared release records and tagged Smart Paper releases. A versioned record alone does not prove a tag was created or published; check the team repository tag and GitHub Release before describing it as shipped.

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
