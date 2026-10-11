# Spreadsheet writer evaluation

Reviewed: 2026-10-11. Source: frontend `d899f2c9d66879bf899e09d3f8945412b6b6967b`. [Task](../tasks/2026-10-11-spreadsheet-writer-evaluation.md).

## Recommendation

Prefer a bounded upgrade to **SheetJS CE 0.20.3 from its official distribution**, preserving the existing export adapter. This is a source/API evaluation, not an installed candidate, compatibility certification or completed remediation. Version 0.20.3 is the candidate shown in current [vendor installation guidance](https://docs.sheetjs.com/docs/getting-started/installation/nodejs/). Recheck the version and advisories when implementation starts.

The vendor fixes the known ReDoS advisory in 0.20.2 or later. Its [ReDoS notice](https://cdn.sheetjs.com/advisories/CVE-2024-22363) does not exempt writers; do not claim that current export-only use rules out that finding. The separate [prototype-pollution notice](https://cdn.sheetjs.com/advisories/CVE-2023-30533) explicitly exempts export-only workflows. Reachability of ReDoS through the existing writer remains unproven; upgrading avoids depending on an exemption that the vendor has not given.

## Existing contract

[Writer](../smart-paper-front/src/lib/export-format.ts) and [caller](../smart-paper-front/src/lib/export-store.ts) establish:

- Local export calls synchronous `formatExportXlsx(payload): ArrayBuffer`, then passes bytes through the existing file/download path. Django mode requests its own server export.
- Exactly six sheets, in order: `Overview`, `Weeks`, `Day Sections`, `Schedule`, `Day Notes`, `Income`. Headers and sheet names are currently English; user text may be English or Persian.
- Arrays contain plain strings and numbers. Dates/times are strings; income IDs, amounts, durations, totals and progress are numbers. No application formula, style, hyperlink, macro or workbook-reader API is used.
- Only active planner sections are exported; schedule rows resolve section labels with the existing fallback. Day notes are conditional, and all sheets keep their headers even when empty.
- Filename remains `smart-paper-export.xlsx`; MIME remains `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.
- Idea Space and templates are not included in these XLSX sheets. JSON remains the backup/restore format; this evaluation does not expand spreadsheet coverage.

The existing `book_new`, `aoa_to_sheet`, `book_append_sheet` and `write({bookType: "xlsx", type: "array"})` pattern remains documented by SheetJS. This suggests a smaller migration than a replacement, but compiled output still needs verification. See [array utilities](https://docs.sheetjs.com/docs/api/utilities/array/) and [writer API](https://docs.sheetjs.com/docs/api/write-options/).

## Options

| Candidate | Fit | Tradeoff / evidence needed |
| --- | --- | --- |
| Official SheetJS CE 0.20.3 | Existing API and synchronous byte contract; preferred first candidate | Official tarball replaces stale public-registry dependency. Verify package identity, license, integrity, lock resolution and offline bundling. No benchmark or candidate build was run. |
| ExcelJS | Browser workbook writer; plausible fallback | Different workbook/cell API and asynchronous `workbook.xlsx.writeBuffer()`, requiring an adapter/caller change. Audit its resolved dependency tree and measure bundle/runtime cost before choosing. No claim of cleaner dependencies or better performance. |
| Custom OOXML/ZIP writer | Could target only these six sheets | Creates XML escaping, cell-type, ZIP and interoperability maintenance obligations; disproportionate to this bounded remediation. |

ExcelJS documents browser support for the document workbook and buffer writing in its [maintainer README](https://github.com/exceljs/exceljs). Browser streaming APIs are not the appropriate replacement here. Availability of a writer is not proof of current maintenance cadence or absence of advisories.

## Implementation handoff

1. In frontend Docker validation, obtain the exact official SheetJS tarball. Prefer committing a vendored tarball and `file:` dependency, following vendor guidance, so clean installs do not depend on CDN availability. Record origin/version/SHA-256 and license; confirm the package version and npm lock integrity. Do not use a runtime CDN script or change all dependencies with `npm audit fix --force`.
2. Preserve the six-sheet contract and existing synchronous return type. Do not change formats, translated copy, section selection or sharing behavior. Design: not applicable if behavior stays identical; any proposed visible change requires a ready Designer handoff first.
3. Add focused export regression tests: populated and empty workbooks; exact sheet order/headers; row counts and section fallback; zero/decimal/negative numeric values; numeric income IDs and date/time strings; Persian text, newlines, quotes and XML-sensitive characters; formula-like strings (`=`, `+`, `-`, `@`) stored as text with no formula nodes. Inspect the ZIP/XML independently rather than relying exclusively on a same-library write/read round trip. Existing `tests/` had no `formatExportXlsx`/XLSX coverage in the reviewed revision.
4. Confirm filename/MIME/byte handling, locked/expired Finance rejection through `getExportFile("xlsx")`, and that failed writes do not mutate source data. Use a deterministic larger synthetic fixture and a bounded timeout to detect gross performance regressions; record actual time/size rather than inventing a performance guarantee.
5. Run Docker clean install, lint, TypeScript, all tests and local static build. Inventory the bundled writer version, confirm offline operation and no runtime CDN requests, and compare output/bundle sizes. Re-run production and full-install audits; a missing tarball advisory entry is not proof of safety, and unrelated framework findings remain.
6. Obtain independent Security/code review, then exact-source Android CI, protected signing, artifact/provenance review and publication under the standing release workflow. Phone chooser/spreadsheet opening, Persian rendering and low-memory behavior remain physical-device checks.

## Limits

No package installation, tarball inspection, workbook generation, exploit probe, bundle measurement or APK change was performed. The recommendation is supported by current source contracts and primary vendor documentation; the implementation checks above remain open. The [existing production audit](android-dependency-advisories.md) still describes the shipped dependency state.
