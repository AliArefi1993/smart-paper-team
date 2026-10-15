import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type State = "ready" | "loading" | "success" | "replace" | "cancelled" | "error" | "storageError" | "locked" | "empty" | "repeated" | "ideasOnly" | "templatesOnly" | "archivedWeek" | "currentWeek";
type Props = { language: "en" | "fa"; width: "phone" | "wide"; state: State; dark: boolean; largeText: boolean };
function ImportFeedback({ language, width, state, dark, largeText }: Props) {
  const [locale, setLocale] = useState(language);
  const fa = locale === "fa";
  const c = (en: string, persian: string) => fa ? persian : en;
  const n = (value: number) => new Intl.NumberFormat(fa ? "fa-IR" : "en-US").format(value);
  const ink = dark ? "#eef5f1" : "#172b29";
  const muted = dark ? "#b6c8c2" : "#536660";
  const surface = dark ? "#1b2b29" : "#fff";
  const border = dark ? "#3b5550" : "#b6c9bf";
  const accent = dark ? "#72dbcb" : "#0f766e";
  const [selectedArchive, setSelectedArchive] = useState(state === "archivedWeek");
  const success = ["success", "replace", "empty", "repeated", "ideasOnly", "templatesOnly"].includes(state);
  const failed = ["error", "storageError", "locked"].includes(state);
  const filename = "smart-paper-نسخه-پشتیبان-برنامه‌ریزی-و-ایده‌های-بلند-2026-10-15.json";
  const empty = state === "empty";
  const counts = empty ? [0, 0, 0, 0] : state === "ideasOnly" ? [0, 0, 6, 0] : state === "templatesOnly" ? [0, 0, 0, 2] : [3, 4, 6, 2];
  const title = success ? c("Import complete", "ورود اطلاعات انجام شد") : state === "loading" ? c("Importing backup…", "در حال ورود نسخهٔ پشتیبان…") : state === "cancelled" ? c("Import cancelled", "ورود اطلاعات لغو شد") : c("Import did not complete", "ورود اطلاعات انجام نشد");
  return <main className="import-feedback" lang={locale} dir={fa ? "rtl" : "ltr"} style={{ maxWidth: width === "phone" ? 390 : 896, padding: 16, minHeight: "100vh", background: dark ? "#101b1b" : "#f7f8f5", color: ink, fontSize: largeText ? 24 : 16, fontFamily: fa ? "Vazirmatn, sans-serif" : "system-ui, sans-serif" }}>
    <style>{`.import-feedback *{color:inherit}.import-feedback p{margin:0 0 12px}.import-feedback h1{font-size:1.5em;margin:0 0 16px}.import-feedback h2{font-size:1.25em;margin:0 0 8px}.import-feedback h3{font-size:1.05em;margin:0 0 12px}.import-feedback button,.import-feedback a,.import-feedback label{font:inherit;min-height:48px;display:inline-flex;align-items:center;padding:10px 12px;border-radius:12px;white-space:normal}.import-feedback button:focus-visible,.import-feedback a:focus-visible,.import-feedback input:focus-visible{outline:3px solid ${dark ? "#f5c66f" : "#a66a24"};outline-offset:3px}.import-feedback a{text-decoration:underline;color:${accent}}.import-feedback section{margin:16px 0;padding:20px;border:1px solid ${border};border-radius:16px;background:${surface}}.import-feedback input{accent-color:${accent}}.import-feedback dl{margin:12px 0}.import-feedback dd{margin:0;font-weight:700}.import-feedback dt{color:${muted}}`}</style>
    <h1>{c("Export Data", "خروجی داده‌ها")}</h1>
    <button style={{ border: `1px solid ${border}`, background: surface }} onClick={() => setLocale(fa ? "en" : "fa")}>{fa ? "English" : "فارسی"}</button>
    <p style={{ marginTop: 16, color: muted }}>{c("Proposal · Import area of the existing Export screen", "پیشنهاد · بخش ورود اطلاعات در صفحهٔ خروجی فعلی")}</p>
    {state === "locked" ? <section><h2>{c("Finance is locked", "بخش مالی قفل است")}</h2><p role="alert">{c("Import did not complete. Enter your PIN to continue.", "ورود اطلاعات انجام نشد. برای ادامه رمز را وارد کنید.")}</p><label htmlFor="pin">{c("PIN", "رمز")}</label><input id="pin" type="password" inputMode="numeric" style={{ width: "100%", minHeight: 48, font: "inherit" }} /><button style={{ marginTop: 12, border: `1px solid ${border}`, background: surface }}>{c("Unlock", "باز کردن قفل")}</button></section> : (state === "archivedWeek" || state === "currentWeek") ? <section>
      <h2>{c("Choose a week", "انتخاب هفته")}</h2>
      <p>{c("Existing week rail · saved dates join the normal window; current week still opens first.", "نوار هفتهٔ فعلی · تاریخ‌های ذخیره‌شده به بازهٔ معمول اضافه می‌شوند؛ هفتهٔ جاری همچنان ابتدا باز می‌شود.")}</p>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: 4 }}>
        {[c("January 3–9, 2026", "۱۳ تا ۱۹ دی ۱۴۰۴"), c("October 10–16, 2026 · Current", "۱۸ تا ۲۴ مهر ۱۴۰۵ · جاری")].map((date, i) => <button key={date} aria-pressed={i === 0 ? selectedArchive : !selectedArchive} onClick={() => setSelectedArchive(i === 0)} style={{ minWidth: 180, flexShrink: 0, border: `1px solid ${accent}`, background: (i === 0 ? selectedArchive : !selectedArchive) ? accent : surface, color: (i === 0 ? selectedArchive : !selectedArchive) ? (dark ? "#092522" : "white") : ink }}>{date}</button>)}
      </div>
      <p style={{ marginTop: 16 }}>{selectedArchive ? c("Saved archived week opened", "هفتهٔ قدیمی ذخیره‌شده باز شد") : c("Current week opened", "هفتهٔ جاری باز شد")}</p>
    </section> : <section aria-labelledby="import-title">
      <h2 id="import-title">{c("Import Data", "ورود اطلاعات")}</h2>
      <p style={{ color: muted }}>{c("Import a Smart Paper JSON backup. Merge updates matching saved records; Replace deletes old data first.", "نسخهٔ پشتیبان JSON اسمارت پیپر را وارد کنید. ادغام، اطلاعات همسان را به‌روز می‌کند؛ جایگزینی ابتدا اطلاعات قبلی را حذف می‌کند.")}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <label style={{ border: `1px solid ${border}`, gap: 8 }}><input type="radio" name="mode" defaultChecked={state !== "replace" && state !== "cancelled"} disabled={state === "loading"} />{c("Merge / Upsert", "ادغام / به‌روزرسانی")}</label>
        <label style={{ border: `1px solid ${border}`, gap: 8 }}><input type="radio" name="mode" defaultChecked={state === "replace" || state === "cancelled"} disabled={state === "loading"} />{c("Delete Old Data First", "ابتدا اطلاعات قبلی حذف شود")}</label>
      </div>
      <label htmlFor="backup-file" style={{ paddingInline: 0, fontWeight: 700 }}>{c("Choose JSON backup", "انتخاب نسخهٔ پشتیبان JSON")}</label>
      <input id="backup-file" type="file" accept="application/json,.json" disabled={state === "loading"} style={{ width: "100%", minWidth: 0, minHeight: 48, font: "inherit", border: `1px solid ${border}`, borderRadius: 12 }} />
      {state !== "ready" && <div style={{ marginTop: 16, padding: 16, border: `1px solid ${border}`, borderRadius: 12, background: dark ? "#243532" : "#f1f5f2", overflowWrap: "anywhere" }}>
        <div role={failed ? "alert" : "status"} aria-live={failed ? "assertive" : "polite"} aria-atomic="true">
          <h3>{title}</h3>
          <p style={{ color: muted }}>{c("File: ", "فایل: ")}<bdi>{filename}</bdi></p>
          <p>{c("Mode: ", "روش ورود: ")}{state === "replace" || state === "cancelled" ? c("Replace", "جایگزینی") : c("Merge", "ادغام")}</p>
          {state === "loading" && <p>{c("Keep this screen open while the backup is saved.", "تا ذخیره شدن نسخهٔ پشتیبان، این صفحه را باز نگه دارید.")}</p>}
          {success && <>
            <p>{c("Saved on this device.", "در این دستگاه ذخیره شد.")}</p>
            <h3>{c("Records in this backup", "رکوردهای موجود در این نسخهٔ پشتیبان")}</h3>
            <dl style={{ display: "grid", gridTemplateColumns: width === "wide" ? "1fr 1fr" : "1fr", gap: 12 }}>
              {[["Weeks", "هفته‌ها"], ["Income entries", "درآمدها"], ["Ideas", "ایده‌ها"], ["Week templates", "الگوهای هفتگی"]].map(([en, persian], i) => <div key={en} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><dt>{c(en, persian)}</dt><dd>{n(counts[i])}</dd></div>)}
            </dl>
            <p style={{ color: muted }}>{c("These counts describe the backup, not newly added records. Merge can update matching records.", "این تعداد مربوط به نسخهٔ پشتیبان است، نه اطلاعات تازه افزوده‌شده. ادغام می‌تواند اطلاعات همسان را به‌روز کند.")}</p>
            {counts[0] > 0 && <p>{c("Imported weeks: October 3–23, 2026. In Planner, use the week navigation to find these dates.", "هفته‌های واردشده: ۱۱ مهر تا ۱ آبان ۱۴۰۵. در برنامه‌ریز، با جابه‌جایی هفته به این تاریخ‌ها بروید.")}</p>}
          </>}
          {state === "cancelled" && <p>{c("No changes were saved.", "هیچ تغییری ذخیره نشد.")}</p>}
          {state === "error" && <p>{c("Choose a valid Smart Paper JSON backup and try again.", "یک نسخهٔ پشتیبان JSON معتبر اسمارت پیپر انتخاب کنید و دوباره تلاش کنید.")}</p>}
          {state === "storageError" && <p>{c("The backup could not be saved. Review the error and choose the file again to retry.", "نسخهٔ پشتیبان ذخیره نشد. خطا را بررسی کنید و برای تلاش دوباره فایل را انتخاب کنید.")}</p>}
        </div>
        {success && <nav aria-label={c("Review imported data", "بررسی اطلاعات واردشده")} style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {counts[0] > 0 && <a href="/">{c("Open Planner", "باز کردن برنامه‌ریز")}</a>}
          {counts[2] > 0 && <a href="/ideas">{c("Open Ideas", "باز کردن ایده‌ها")}</a>}
          {counts[1] > 0 && <a href="/settings#finance-visibility">{c("Finance visibility settings", "تنظیمات نمایش بخش مالی")}</a>}
        </nav>}
      </div>}
      <p style={{ color: muted, marginTop: 16 }}>{c("JSON backups include unencrypted finance data. Keep a verified copy outside the app.", "نسخه‌های پشتیبان JSON شامل اطلاعات مالی رمزگذاری‌نشده هستند. یک نسخهٔ بررسی‌شده را خارج از برنامه نگه دارید.")}</p>
    </section>}
  </main>;
}
const meta = { title: "Proposals/Import feedback", component: ImportFeedback, args: { language: "en", width: "phone", state: "success", dark: false, largeText: false }, argTypes: { language: { control: "radio", options: ["en", "fa"] }, width: { control: "radio", options: ["phone", "wide"] }, state: { control: "select", options: ["ready", "loading", "success", "replace", "cancelled", "error", "storageError", "locked", "empty", "repeated", "ideasOnly", "templatesOnly"] } } } satisfies Meta<typeof ImportFeedback>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide" } };
export const PersianWide: Story = { args: { width: "wide", language: "fa" } };
export const Initial: Story = { args: { state: "ready" } };
export const Importing: Story = { args: { state: "loading" } };
export const PersianImporting: Story = { args: { state: "loading", language: "fa" } };
export const ReplaceComplete: Story = { args: { state: "replace" } };
export const ReplaceCancelled: Story = { args: { state: "cancelled" } };
export const PersianError: Story = { args: { state: "error", language: "fa" } };
export const StorageFailure: Story = { args: { state: "storageError" } };
export const AuthorizationExpired: Story = { args: { state: "locked" } };
export const EmptyBackup: Story = { args: { state: "empty" } };
export const RepeatedMerge: Story = { args: { state: "repeated" } };
export const IdeasOnly: Story = { args: { state: "ideasOnly" } };
export const TemplatesOnly: Story = { args: { state: "templatesOnly" } };
export const EnglishLargeDark: Story = { args: { dark: true, largeText: true } };
export const PersianLargeDark: Story = { args: { dark: true, largeText: true, language: "fa" } };

export const ArchivedWeekEnglish: Story = { args: { state: "archivedWeek" } };
export const ArchivedWeekPersian: Story = { args: { state: "archivedWeek", language: "fa" } };
export const CurrentWeekDefault: Story = { args: { state: "currentWeek" } };
