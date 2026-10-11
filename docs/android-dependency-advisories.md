# Android production dependency advisory assessment

Reviewed: 2026-10-11. Frontend source `d899f2c9d66879bf899e09d3f8945412b6b6967b`, shipped Android 2026.10.14/code 31. [Task](../tasks/2026-10-11-android-dependency-advisories.md).

## Result and scope

The current production npm audit flags **7 packages: 1 critical, 5 high and 1 moderate**, spanning 44 unique advisory URLs. These are package findings, not seven demonstrated APK vulnerabilities. Independent Security source review did not demonstrate an exploitable path in the static local-data APK. SheetJS ReDoS writer reachability remains unproven; this assessment does not certify a clean audit or safe wider distribution.

This completes the bounded assessment, not dependency remediation. Application code, locks and APK are unchanged. Native Gradle dependencies, WebView/OS vulnerabilities, development-only npm dependencies and exploit testing are outside scope. Packages declared as development dependencies can still ship: Capacitor core is one example. `--omit=dev` is a reporting filter, not a complete Android inventory.

## Reproducible evidence

- Command: `npm audit --omit=dev --json`, using temporary copies of the current package manifests, with no installation or application mutation.
- Docker `node:24-bookworm` was attempted but its daemon was unavailable. Read-only fallback used host Node `v25.2.1`, npm `11.6.2`.
- Observation time: `2026-10-11T18:23:53.659831+00:00`. Audit exit 1 is expected with findings; the actual npm exit code was not separately captured.
- Lock SHA-256: `b274dd978de0c66753e2ffb3b629b6d1ba1047ffcb42fe7abc2a57e8f6f8df89`.
- [Raw audit JSON](evidence/2026-10-11-production-npm-audit.json) and [metadata](evidence/2026-10-11-production-npm-audit-metadata.json); raw audit SHA-256 `957b1e44d39bec9d56812b0b2bdb18a7d2363a3afb96c4fa4fa14feae538b940`.

The historical full-install count of 21 is a different scope and observation time; do not infer that advisories were fixed by comparing it with this production-only count. The registry result is a dated snapshot.

## Applicability by package

| Locked package | Audit severity | Current path and assessment |
| --- | --- | --- |
| `next` 16.2.4 | Critical | Local mode sets `output: "export"`; Capacitor packages `out`, with no Next Node server. Server RCE, image optimization, Server Actions, cache, middleware/proxy and server request handling prerequisites are absent from this deployment. HTML-generation XSS findings require separate checks: no `next/script`/`beforeInteractive` use or request-derived CSP nonce was found. The theme bootstrap is fixed script text. No current trigger demonstrated; this is not a blanket exemption for static HTML. |
| `xlsx` 0.18.5 | High | Runs in the WebView for `aoa_to_sheet`/`write`; import reads JSON, with no workbook `read`/`readFile` call found. Vendor explicitly exempts export-only use from prototype pollution. ReDoS advisory does **not** provide that exemption: writer reachability was not proven or ruled out. Retain as residual uncertainty and prioritize a maintained dependency or replacement. |
| `postcss` 8.4.31 (audited Next nested copy) | High | Build-time CSS transformation. Source-map file-read/path-traversal and stylesheet stringify findings require attacker-controlled CSS/maps or relevant embedding. No user CSS input or runtime PostCSS API found. Trusted-source builds reduce current reachability; malicious source/dependency inputs remain build risks. Root development copy 8.5.10 also predates later fixes and needs full-audit review. |
| `sharp` 0.34.5 | High | Native Node image-processing dependency, not an Android WebView image service. No direct app use found; Next image optimization is absent from the static package. Image processing in future builds/hosted servers needs reassessment. |
| `nanoid` 3.3.11 | High | Transitive build-tool dependency through PostCSS. Negative/zero/custom-size generator and integer-overflow findings remain flagged. No app import found; no demonstrated user-controlled invocation. |
| `baseline-browser-mapping` 2.10.21 | Moderate | Build-target tooling. Invalid-input process termination has no identified APK runtime call or user-controlled build input. |
| `source-map-js` 1.2.1 | High | Transitive PostCSS source-map processing; indexed section-offset DoS requires crafted maps. No app runtime use found. New relative to historical six-package production records; fixed version is 1.2.2. |

Code evidence: [Next configuration](../smart-paper-front/next.config.ts), [Capacitor configuration](../smart-paper-front/capacitor.config.ts), [export writer](../smart-paper-front/src/lib/export-format.ts), [JSON import](../smart-paper-front/src/components/export-view.tsx), [HTML layout](../smart-paper-front/src/app/layout.tsx), and [lockfile](../smart-paper-front/package-lock.json). No fresh bundle inventory or APK unpacking was performed; existing exact-source release evidence identifies the static package. Classification above is a source/deployment inference, not an exploit result.

Primary advisory records: [Next Windows server RCE](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), [AVIF optimization RCE](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [next/og RCE](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j), [beforeInteractive XSS](https://github.com/advisories/GHSA-gx5p-jg67-6x7h), [CSP nonce XSS](https://github.com/advisories/GHSA-ffhc-5mcf-pf4q), [PostCSS source-map file read](https://github.com/advisories/GHSA-6g55-p6wh-862q), [sharp inherited vulnerabilities](https://github.com/advisories/GHSA-f88m-g3jw-g9cj), [nanoid generator DoS](https://github.com/advisories/GHSA-2v37-7h3g-55p8), [baseline invalid input](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv), and [source-map-js offsets](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). All 44 URLs and ranges remain in the raw audit. Primary-source verification covered the material families above, not an independent review of all 44 records.

SheetJS vendor records: [prototype pollution](https://cdn.sheetjs.com/advisories/CVE-2023-30533) and [ReDoS](https://cdn.sheetjs.com/advisories/CVE-2024-22363). Historical [2026.10.2 release wording](../releases/smart-paper-v2026.10.2.md) grouped both SheetJS findings as parser-specific. That was too broad for the vendor ReDoS evidence; use this current assessment when making decisions.

## Recommended follow-up

1. Prepare a bounded framework/build-tool upgrade and lock refresh. The current audit recommends Next 16.4.0; treat that as a candidate, verify supported versions when implementation starts, align `eslint-config-next`, and review transitive locks. Do not apply `npm audit fix --force`. Validate lint, TypeScript, local tests/static build and exact-source Android release gates.
2. The [completed writer evaluation](spreadsheet-writer-evaluation.md) recommends official pinned SheetJS CE 0.20.3 as the smallest candidate. Implement and validate that upgrade, or evaluate the replacement fallback if it fails compatibility checks. npm reports no automatic fix for the public `xlsx` dependency. Preserve bilingual sheet text, numeric/text cell behavior and exports; add focused writer regression coverage when changing it.
3. Reassess before any hosted Next deployment, untrusted build-input processing or workbook-import feature. Re-run the production audit after remediation and add full build/native coverage before claiming broader supply-chain assurance.

These are proposed remediation scopes, not completed fixes or an approved product queue. No background audit processes remain. Physical-device, privacy and data-safety follow-ups remain in their existing tasks.
