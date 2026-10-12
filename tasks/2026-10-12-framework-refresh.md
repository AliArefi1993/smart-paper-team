# Task: Refresh the offline app framework and build dependencies

Status: in progress — signed candidate accepted; publication pending
Created: 2026-10-12
Updated: 2026-10-12

## Objective

Reduce the recorded dependency findings with a bounded compatible framework/build-tool refresh, preserving offline Android behavior and existing screens.

## Context

- Next step after the published [writer upgrade](2026-10-12-spreadsheet-writer-upgrade.md) in the [sequential backlog](2026-10-12-backlog-clearance.md).
- Frontend source `047e4bd15d9542693fe03d1e6c4f42d65d798a65`, Android release candidate 2026.10.18/code35.
- [Dependency assessment](../docs/android-dependency-advisories.md); previous audit: 6 production / 20 full-install package findings; refreshed audit is 0 production / 8 full-install findings.
- Read-only preparation verified available Next/eslint-config-next 16.4.0 and compatible patch-level transitive candidates. Verify actual resolved audits before claiming remediation.

## Acceptance Criteria

- [x] Next and its ESLint config align at a verified available compatible version; selectively refresh necessary build dependencies without unrelated major upgrades or force audit fixes.
- [x] React/Capacitor/data/UI contracts preserved; local export retains vendored writer.
- [x] Docker fresh install, lint, TypeScript, full tests, local static build and fresh audit results recorded.
- [x] English/Persian navigation and local planner/export smoke checks cover compiler/routing risks, with browser evidence distinguished from native device evidence.
- [x] Independent code/Security review has no unresolved critical/high implementation finding.
- [x] Exact-source Android CI, protected signing and independent compiled artifact review pass.
- [ ] Team tag publishes the release; anonymous public APK download matches the reviewed artifact.
- [ ] Current docs/backlog records updated; remaining uncertainty accurately scoped.

## Non-Goals

- Backend/server work, visible redesign, new features, React/Capacitor major upgrades or automatic audit-fix.
- Claiming coverage of undisclosed future advisories or native Android behavior from static checks.

## Plan

1. Update aligned framework packages and narrow transitive lock entries; inspect relevant local Next upgrade guidance. Include the official Capacitor 8.5.1 proxy security patch after the full audit exposed the Android 8.5.0 runtime finding; retain Capacitor major 8.
2. Validate builds/tests/audits and bounded bilingual browser smoke, then independent Security/code review.
3. Commit and follow exact-source authorized Android release gates; update durable memory.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Scope preparation | Official Next support/security notices and registry metadata checked 2026-10-12 | 16.4.0 available; React19.2.4 peer-supported; targeted build dependency candidates prepared |
| Framework and native dependency scope | Direct Next/ESLint pins 16.4.0 and core/CLI/Android pins 8.5.1; no app source or native configuration edits | React19.2.4, vendor XLSX, Capacitor major8 and bilingual/data contracts retained |
| Selective transitive refresh | PostCSS8.5.23, NanoID3.3.20, source-map-js1.2.2, baseline2.11.28, sharp0.35.5; Babel7.29.7 family, browserslist4.29.3, brace-expansion1.1.21/5.0.12, js-yaml4.3.2, xmldom0.9.12 | Compatible recorded-advisory fixes; no force audit-fix, overrides or unrelated majors |
| Docker final validation | Node24.19.0; fresh npm ci, lint, TypeScript, all90tests, local-data static build, cap sync android | Passed; seven app routes plus not-found generated; plugins remain filesystem8.1.2 / notifications8.3.1 / share8.0.1 |
| Final registry audits | 2026-10-12T06:13:04.890Z; production0 exit0; full8 exit1 (5high/3moderate/0critical); lockSHA256 `3faf133f3cb5574e41511bc2caa464336ace832ed5e8a354d1312909e8ac2ab1` | Counts apply to npm scopes, not whole-APK/native assurance |
| Installed native patch inspection | Android8.5.1 `Bridge.launchIntent` blocks proxy path before plugin hooks; `WebViewLocalServer` requires enabled HTTP and rejects main-frame/iframe document requests | Source evidence only; compiled APK and device checks remain separate |
| Bounded browser smoke | Lead CUA on final static build localhost8874 | Seven routes rendered; EN/FA planner goal persisted after navigation/reload; Timer start/pause passed; Persian Idea saved/reloaded; Finance locked again after reload; actual XLSX ZIP/XML verified six sheets/Persian saved goal/no formulas; no console warnings/errors observed. Browser/static evidence only |
| Browser evidence | [Persian Planner](../docs/evidence/2026-10-12-framework-refresh/planner-fa.jpg), [English Planner](../docs/evidence/2026-10-12-framework-refresh/planner-en.jpg), [Persian Export](../docs/evidence/2026-10-12-framework-refresh/export-fa.jpg) | Saved from final tested candidate |
| Independent Security/code review | Registry integrity/peers, native proxy guards, residual build-tool paths | Passed; no actionable implementation finding; native patch requires rebuilt APK |
| Exact-source CI | [38212196581](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38212196581) on `047e4bd15d9542693fe03d1e6c4f42d65d798a65` | Passed |
| Stable build | [38212221396](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38212221396), code35/name `2026.10.18` | Passed; approval submitted after successful unsigned candidate |
| Independent artifact review | Candidate `11729891190`, final `11730385657`; original ZIPs and provenance | Passed; 556 candidate entries and 112 web assets match; pinned signer, identity, version, non-debug and native proxy guards accepted |
| Public release | Team tag and anonymous APK download | Pending publication gate |

## Decisions And Risks

- Design: not applicable; screens, copy and interactions must remain unchanged.
- Official October8 notice announces future October14 security disclosure; affected ranges and patched versions remain undisclosed as of October12. Do not claim those issues fixed by this refresh.
- Full npm audit exposed [Capacitor Android proxy advisory GHSA-rvm3-566m-v7fv](https://github.com/ionic-team/capacitor/security/advisories/GHSA-rvm3-566m-v7fv), affecting Android 8.5.0. Lead authorized the smallest official 8.5.1 patch and preferred core/CLI/Android patch alignment. The [8.5.1 release](https://github.com/ionic-team/capacitor/releases/tag/8.5.1) blocks proxy document navigation; JavaScript core also fixes listener removal and CLI adjusts iOS package paths. No app manifest, data, native-plugin or signing configuration changes. Disabled CapacitorHttp does not exempt the old native runtime.
- Production-only audit filtering excludes development dependencies, including the installed Android native runtime; it cannot establish whole-APK safety.
- PostCSS deduplicated to Next-pinned 8.5.23; this clears recorded ranges without adding a new direct dependency or override.
- Physical-device keyboard, lifecycle, accessibility and performance remain follow-ups.

## Residual Audit Paths

- Five high package findings share one advisory (`GHSA-vfj7-8cjw-p6xm`, braces <=3.0.3): `eslint-config-next16.4.0 → @next/eslint-plugin-next16.4.0 → fast-glob3.3.3 → micromatch4.0.8 → braces3.0.3`. Published latest braces remains3.0.3; npm suggests a Next ESLint14 downgrade, outside the compatible scope.
- Three moderate package findings share UUID advisory `GHSA-w5hq-g745-h8pq` (<11.1.1): `@capacitor/cli8.5.1 → xcode3.0.1 → uuid7.0.3`. UUID11 requires a major transitive substitution, while npm suggests CLI8.4.3. No automatic fix, override or downgrade applied; Security inspected xcode usage of uuid.v4(), outside the supplied-buffer v3/v5/v6 advisory path; no corresponding app runtime path demonstrated.
- Neither zero production findings nor absent vendor-XLSX advisories proves complete Android safety. Android runtime is declared under development dependencies; its native proxy patch is separately verified above.

## Outcome / Handoff

Implementation accepted after lead browser smoke and independent Security/code review. Frontend package manifests/lock, factual Next.js baseline, and Android version were committed in frontend `047e4bd15d9542693fe03d1e6c4f42d65d798a65`. Evidence and logs are at `/private/tmp/smart-paper-framework-evidence/` (`audit-full.json`, `audit-production.json`, `metadata.json`, `native-proxy-guards.txt`, install/lint/types/tests/build/cap-sync logs); raw audits, metadata and native guard evidence are preserved under [durable evidence](../docs/evidence/2026-10-12-framework-refresh/).

Task-owned final static server `python3 /private/tmp/smart-paper-framework-evidence/serve.py` was stopped with SIGINT after browser QA; PID43289 on `127.0.0.1:8874` exited and no listener remains. Docker validation containers exited 0 and were auto-removed. The exact APK/provenance are copied to the release staging paths; team publication and anonymous checksum verification remain pending. Other task-owned Finance design previews belong to the next task and were left untouched.
