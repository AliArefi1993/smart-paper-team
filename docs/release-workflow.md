# Smart Paper Release And Tag Workflow

This workspace uses the root team repository as the durable release memory.
The backend and frontend remain independent Git repositories.

## When To Create A Tag

Create a release tag after one of these points:

- A mature feature or security improvement is complete.
- Several small improvements are complete and validated together.
- A working Android local-data build should be preserved as an installable version.

Do not tag while any required repository has uncommitted work.
Do not tag failed or partially validated work.

## Tag Naming

Use the same release name in all repositories that changed:

```text
smart-paper-vYYYY.MM.N
```

Examples:

```text
smart-paper-v2026.08.1
smart-paper-v2026.08.2
```

`YYYY.MM` is the release month. `N` starts at `1` and increments for each tagged release in that month.

## Android Version Rule

For every tagged release that includes a working Android local-data app:

- Increment `smart-paper-front/android/app/build.gradle` `versionCode`.
- Set `versionName` to the release tag without the `smart-paper-v` prefix.
- Build Android with `NEXT_PUBLIC_DATA_MODE=local`.
- Record the APK filename and validation result in `releases/`.

Example mapping:

```text
Git tag: smart-paper-v2026.08.1
Android versionCode: 2
Android versionName: "2026.08.1"
APK name: SmartPaper-local-2026.08.1-debug.apk
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

3. For Android local-data releases:

```bash
cd smart-paper-front
NEXT_PUBLIC_DATA_MODE=local npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

4. Copy or rename the debug APK using the release version:

```bash
cd smart-paper-front
cp android/app/build/outputs/apk/debug/app-debug.apk SmartPaper-local-2026.08.1-debug.apk
```

5. Create a release record in `releases/` from `releases/TEMPLATE.md`.

6. Commit each changed repository in its own Git history.

7. Create annotated tags in the repositories that changed:

```bash
git tag -a smart-paper-v2026.08.1 -m "Smart Paper 2026.08.1"
```

8. Push commits and tags only when approved:

```bash
git push
git push origin smart-paper-v2026.08.1
```

## Team Agent Responsibilities

- Product confirms the release is worth tagging.
- QA confirms acceptance criteria and user flows.
- Tester confirms automated checks.
- Security reviews sensitive changes before release.
- DevOps confirms release/build commands and artifact notes.
- Lead updates `STATUS.md`, `ROADMAP.md`, and `releases/`.

