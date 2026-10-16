import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type State = "ready" | "clean" | "conflicts" | "empty" | "storageFailure" | "cancelled" | "locked";
type Props = { language: "en" | "fa"; width: "phone" | "wide"; state: State; dark: boolean; largeText: boolean };
function SafeMerge({ language, width, state, dark, largeText }: Props) {
  const [locale, setLocale] = useState(language);
  const fa = locale === "fa";
  const c = (en: string, persian: string) => fa ? persian : en;
  const ink = dark ? "#eef5f1" : "#172b29", muted = dark ? "#b6c8c2" : "#536660", line = dark ? "#3b5550" : "#b6c9bf", surface = dark ? "#1b2b29" : "white", soft = dark ? "#243532" : "#f1f5f2", accent = dark ? "#72dbcb" : "#0f766e";
  const failed = ["storageFailure"].includes(state);
  const success = ["clean", "conflicts", "empty"].includes(state);
  const file = "smart-paper-نسخه-پشتیبان-برنامه‌ریزی-پیش‌از-نوشتن-یادداشت-پنجشنبه-2026-10-15.json";
  const number = (v: number) => new Intl.NumberFormat(fa ? "fa-IR" : "en-US").format(v);
  return <main className="safe-merge" dir={fa ? "rtl" : "ltr"} lang={locale} style={{ maxWidth: width === "phone" ? 390 : 896, minHeight: "100vh", margin: "auto", padding: 16, color: ink, background: dark ? "#101b1b" : "#f7f8f5", font: `${largeText ? 24 : 16}px/1.6 ${fa ? "Vazirmatn" : "system-ui"},sans-serif` }}>
    <style>{`.safe-merge h1{font-size:1.5em;margin:0 0 12px}.safe-merge h2{font-size:1.25em;margin:0 0 12px}.safe-merge h3{font-size:1.1em;margin:0 0 8px}.safe-merge p{color:inherit;margin:0 0 12px}.safe-merge section{margin:16px 0;padding:20px;background:${surface};border:1px solid ${line};border-radius:16px}.safe-merge button,.safe-merge a,.safe-merge label{font:inherit;min-height:48px;display:inline-flex;align-items:center;padding:10px 12px;white-space:normal}.safe-merge button{color:${ink};background:${soft};border:1px solid ${line};border-radius:12px}.safe-merge a{color:${accent};text-decoration:underline}.safe-merge button:focus-visible,.safe-merge a:focus-visible,.safe-merge input:focus-visible{outline:3px solid ${dark ? "#f5c66f" : "#a66a24"};outline-offset:3px}.safe-merge dd{margin:0;font-weight:700}.safe-merge ul{padding-inline-start:24px}`}</style>
    <h1>{c("Import Data", "ورود داده‌ها")}</h1>
    <button onClick={() => setLocale(fa ? "en" : "fa")}>{fa ? "English" : "فارسی"}</button>
    {state === "locked" ? <section><h2>{c("Finance is locked", "بخش مالی قفل است")}</h2><p role="alert">{c("Import did not complete. Enter your PIN to continue.", "ورود اطلاعات انجام نشد. برای ادامه رمز را وارد کنید.")}</p><label htmlFor="pin">{c("PIN", "رمز")}</label><input id="pin" type="password" inputMode="numeric" style={{ width: "100%", minHeight: 48, font: "inherit" }} /></section> : <section>
      <p>{c("Merge keeps saved values when they differ, fills empty planner fields and adds missing records. It does not apply deletions; a cleared planner field may receive backup content again.", "ادغام، مقدارهای ذخیره‌شدهٔ متفاوت را نگه می‌دارد، بخش‌های خالی برنامه‌ریز را پر می‌کند و رکوردهای موجودنبوده را اضافه می‌کند. حذف‌ها اعمال نمی‌شوند؛ ممکن است بخشی از برنامه‌ریز که پاک کرده‌اید، دوباره با محتوای پشتیبان پر شود.")}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <label style={{ border: `1px solid ${line}`, borderRadius: 12, gap: 8 }}><input type="radio" name="safe-mode" defaultChecked />{c("Merge · keep saved values", "ادغام · حفظ مقدارهای ذخیره‌شده")}</label>
        <label style={{ border: `1px solid ${line}`, borderRadius: 12, gap: 8 }}><input type="radio" name="safe-mode" />{c("Replace · delete old data first", "جایگزینی · حذف اطلاعات قبلی")}</label>
      </div>
      <label htmlFor="safe-file" style={{ paddingInline: 0, fontWeight: 700 }}>{c("Choose JSON backup", "انتخاب نسخهٔ پشتیبان JSON")}</label>
      <input id="safe-file" type="file" accept="application/json,.json" style={{ width: "100%", minWidth: 0, minHeight: 48, font: "inherit" }} />
      {state !== "ready" && <div tabIndex={-1} role="region" aria-labelledby="safe-result" style={{ marginTop: 16, padding: 16, background: soft, border: `1px solid ${line}`, borderRadius: 12, overflowWrap: "anywhere" }}>
        <div role={failed ? "alert" : "status"} aria-atomic="true">
          <h2 id="safe-result">{success ? c("Import complete", "ورود اطلاعات انجام شد") : state === "cancelled" ? c("Import cancelled", "ورود اطلاعات لغو شد") : c("Import did not complete", "ورود اطلاعات انجام نشد")}</h2>
          <p style={{ color: muted }}>{c("File: ", "فایل: ")}<bdi>{file}</bdi></p>
          <p>{state === "cancelled" ? c("Mode: Replace", "روش ورود: جایگزینی") : c("Mode: Merge · keep saved values", "روش ورود: ادغام · حفظ مقدارهای ذخیره‌شده")}</p>
          {success && <><p>{c("Saved on this device.", "در این دستگاه ذخیره شد.")}</p>
            {state === "conflicts" && <div style={{ padding: 12, borderInlineStart: `4px solid ${dark ? "#f5c66f" : "#97660d"}`, marginBottom: 16 }}>
              <h3>{c("Saved values kept", "مقدارهای ذخیره‌شده حفظ شد")}</h3>
              <p>{c("Some backup values were not applied because saved values were kept. Other missing content was imported.", "بعضی مقدارهای نسخهٔ پشتیبان اعمال نشد، چون اطلاعات ذخیره‌شده حفظ شد. محتوای دیگر که موجود نبود، وارد شد.")}</p>
              <p>{c("Affected: Planner · October 15, 2026; week templates; Ideas; income; Finance goal; planner sections.", "موارد: برنامه‌ریز · ۲۳ مهر ۱۴۰۵؛ الگوهای هفته؛ ایده‌ها؛ درآمدها؛ هدف مالی؛ بخش‌های برنامه‌ریز.")}</p>
              <p>{c("Keep the original backup to review unapplied content. Imported content in hidden sections remains saved; use section settings to show it.", "برای بررسی محتوای اعمال‌نشده، فایل پشتیبان اصلی را نگه دارید. محتوای واردشده در بخش‌های پنهان ذخیره می‌ماند؛ از تنظیمات بخش‌ها آن را نمایش دهید.")}</p>
            </div>}
            <h3>{c("Records in this backup", "رکوردهای موجود در این نسخهٔ پشتیبان")}</h3>
            <dl style={{ display: "grid", gridTemplateColumns: width === "wide" ? "1fr 1fr" : "1fr", gap: 8 }}>
              {[["Weeks", "هفته‌ها"], ["Income entries", "تعداد درآمدها"], ["Ideas", "فضای ایده‌ها"], ["Week templates", "الگوهای هفته"]].map(([en, persian], i) => <div key={en} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}><dt>{c(en, persian)}</dt><dd>{number(state === "empty" ? 0 : [1, 3, 2, 1][i])}</dd></div>)}
            </dl><p style={{ color: muted }}>{c("Backup counts are not newly added records or conflict counts.", "تعدادهای پشتیبان، تعداد اطلاعات تازه افزوده‌شده یا موارد اختلاف نیستند.")}</p>
          </>}
          {state === "storageFailure" && <p>{c("The backup could not be saved. Review the error and choose the file again to retry.", "پشتیبان ذخیره نشد. خطا را بررسی کنید و برای تلاش دوباره فایل را انتخاب کنید.")}</p>}
          {state === "cancelled" && <p>{c("No changes were saved.", "هیچ تغییری ذخیره نشد.")}</p>}
        </div>
        {success && <nav aria-label={c("Review imported data", "بررسی اطلاعات واردشده")}><a href="/">{c("Open Planner", "باز کردن برنامه‌ریز")}</a><a href="/ideas">{c("Open Ideas", "باز کردن ایده‌ها")}</a></nav>}
      </div>}
      <p style={{ marginTop: 24, color: muted }}>{c("Keep a verified JSON backup outside the app before using Replace. Replace deletes saved data after confirmation. JSON backups are unencrypted.", "پیش از جایگزینی، یک پشتیبان JSON بررسی‌شده بیرون از برنامه نگه دارید. جایگزینی پس از تأیید، اطلاعات ذخیره‌شده را حذف می‌کند. پشتیبان‌های JSON رمزگذاری نشده‌اند.")}</p>
    </section>}
  </main>;
}
const meta = { title: "Proposals/Safe merge", component: SafeMerge, args: { language: "en", width: "phone", state: "conflicts", dark: false, largeText: false }, argTypes: { language: { control: "radio", options: ["en", "fa"] }, width: { control: "radio", options: ["phone", "wide"] }, state: { control: "select", options: ["ready", "clean", "conflicts", "empty", "storageFailure", "cancelled", "locked"] } } } satisfies Meta<typeof SafeMerge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide" } };
export const PersianWide: Story = { args: { width: "wide", language: "fa" } };
export const Ready: Story = { args: { state: "ready" } };
export const NoConflicts: Story = { args: { state: "clean" } };
export const EmptyBackup: Story = { args: { state: "empty" } };
export const PersianStorageFailure: Story = { args: { state: "storageFailure", language: "fa" } };
export const ReplaceCancelled: Story = { args: { state: "cancelled" } };
export const AuthorizationExpired: Story = { args: { state: "locked" } };
export const PersianLargeDark: Story = { args: { language: "fa", dark: true, largeText: true } };
