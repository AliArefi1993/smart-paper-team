# Design: Android backup recovery disclosure

Status: ready for implementation
Updated: 2026-10-10
Owning components: `smart-paper-front/src/components/export-view.tsx`, `finance-view.tsx`; translation source `src/lib/i18n.ts`
Design type: proposed change
Local studio: [Locked phone](http://localhost:6010/?path=/story/proposals-android-backup-policy--locked-phone), [Unlocked phone](http://localhost:6010/?path=/story/proposals-android-backup-policy--unlocked-phone), [Dark phone](http://localhost:6010/?path=/story/proposals-android-backup-policy--dark-phone), [Wide](http://localhost:6010/?path=/story/proposals-android-backup-policy--wide), [Dark wide](http://localhost:6010/?path=/story/proposals-android-backup-policy--dark-wide). Source: [AndroidBackupPolicy.stories.tsx](studio/src/stories/AndroidBackupPolicy.stories.tsx).

## Problem and evidence

Android/local data needs a dependable recovery path. Current Export already shows the unencrypted JSON warning above the report and PIN unlock; Settings has no recovery panel. Reviewed PRODUCT.md, the actual Settings/Export components, translations, foundations and the existing [Export baseline](2026-10-01-export-report-import-baseline.md). The selected policy excludes cloud backup and permits device transfer where Android/device support permits it. Security requires unlock authorization to stay in runtime memory, with initialization locked and a one-hour runtime expiry. OS/OEM transfer behavior is not validated.

## Outcome and scope

Add a local-only policy paragraph immediately after the existing `backupNotice` in the Export header. Keep encryption warning separate and visible before unlock. Keep Settings unchanged. No new control, modal or navigation. Keep JSON Merge/Replace, report selection, file validation, and replacement confirmation unchanged. Success means readers can distinguish excluded cloud backup, conditional device migration and their own external JSON recovery copy.

## Design direction and exact copy

Use new translation key `androidBackupPolicyNotice` in Export:

EN: “Android cloud backup is disabled for Smart Paper. Device-to-device transfer may be available, depending on your Android version and devices. Save a JSON backup outside the app and check the file before changing phones or uninstalling.”

FA: «پشتیبان‌گیری ابری اندروید برای اسمارت پیپر غیرفعال است. انتقال مستقیم بین دستگاه‌ها ممکن است بسته به نسخه اندروید و دستگاه‌های شما در دسترس باشد. پیش از تعویض گوشی یا حذف برنامه، یک پشتیبان JSON بیرون از برنامه ذخیره و فایل را بررسی کنید.»

Append to existing `localPinNotice` (Finance screen, already local-only):

EN: “Finance locks again when the app reloads or restarts, including after a device transfer.”

FA: «با بارگذاری دوباره یا اجرای مجدد برنامه، از جمله پس از انتقال به دستگاه دیگر، بخش مالی دوباره قفل می‌شود.»

Preserve the existing PIN-only screen-lock/no-encryption sentence. Do not add this Finance notice to Export, which has its own simpler unlock form. API-version specifics stay in policy documentation. Avoid promises of transfer success, encryption, automatic JSON backups or cloud synchronization.

## States and layouts

The new paragraph is static and visible when locked/unlocked, empty/populated, offline and during existing export/import loading/error/success/replace-confirmation states. It creates no new state or announcement. Preserve existing alert/status roles and destructive confirmation. Returning through normal navigation preserves a valid runtime unlock; full reload/relaunch and device migration begin locked. Existing expiry behavior remains.

Use existing Export header `text-sm`, `mt-2`, amber warning role and inherited dark override; add `leading-6` for long bilingual text if needed. No width/height restriction or text clipping. Wrap at 360–390px and wide max-width; retain document language and RTL/LTR, including readable JSON Latin text. Paragraphs remain in normal reading order. New copy adds no focusable target; preserve labeled PIN input, visible focus and existing touch targets. Studio shows full EN/FA content, locked/unlocked and light/dark phone/wide states; report controls are summarized intentionally, not redesigned.

## Implementation handoff

- `export-view.tsx`: local-data conditional paragraph directly after `backupNotice`; before header actions/report/PIN.
- `i18n.ts`: add the new EN/FA key; append the restart sentence to `localPinNotice`.
- `finance-view.tsx`: existing `localPinNotice` consumer remains the placement.
- Android configuration and runtime authorization implementation follow the Security policy; design is no OS-behavior certification.
- Reviewer: Designer, with lead-selected smallest Export disclosure scope and Security constraints. Required policy/copy decisions resolved; ready for implementation. Final frontend screenshot comparison belongs to implementation verification.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio TypeScript/build | `npm run typecheck`, `npm run build` | Passed; existing large-chunk build warning |
| EN/FA phone light/dark, locked/unlocked | Running built studio at localhost:6010, screenshots and accessibility tree | Readable wrapping and reading order; no clipping in 390px cards |
| Wide layout | Running Wide story; source includes both languages | English and Persian inspected in full-page Wide/DarkWide screenshots; readable and unclipped |
| Baseline comparison | Source above and existing `design/evidence/2026-10-06-app-dark/export-en-pin-error.png` | Preserves header/report/unlock order; prototype summarizes report and actions |
| Accessibility | Native labeled inputs in AX tree; static paragraphs; inherited focus roles and 48px sample controls | Bounded review passed; TalkBack/text enlargement/physical device follow-up |
| OS restore and transfer | No device evidence | Unverified; copy conditional |
| Production implementation | [QA report](2026-10-10-android-backup-policy-qa.md), final local-data build at task-isolated origin | Exact EN/FA Export and Finance copy; Light/Dark phone layouts readable; navigation and reload behavior passed |
