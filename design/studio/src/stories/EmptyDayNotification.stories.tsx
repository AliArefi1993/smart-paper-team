import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

function EmptyDayNotification({ language, width, state, dark, largeText }: { language: "en" | "fa"; width: "phone" | "wide"; state: "empty" | "populated" | "disabled" | "denied" | "saving" | "error"; dark: boolean; largeText: boolean }) {
  const fa = language === "fa";
  const c = (en: string, persian: string) => fa ? persian : en;
  const [enabled, setEnabled] = useState(state !== "disabled");
  const [saved, setSaved] = useState(false);
  const ink = dark ? "#eef5f1" : "#172b29";
  const muted = dark ? "#b6c8c2" : "#536660";
  const surface = dark ? "#1b2b29" : "#ffffff";
  const border = dark ? "#3b5550" : "#d9e4de";
  const control = { font: "inherit", color: ink, background: surface, colorScheme: dark ? "dark" as const : "light" as const, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", minHeight: 48 };
  return <main lang={language} dir={fa ? "rtl" : "ltr"} style={{ maxWidth: width === "phone" ? 390 : 896, margin: "auto", padding: 16, minHeight: "100vh", background: dark ? "#101b1b" : "#f7f8f5", color: ink, fontSize: largeText ? 24 : 16 }}>
    <style>{`.reminder-proposal input:focus-visible,.reminder-proposal button:focus-visible{outline:3px solid ${dark ? "#f5c66f" : "#a66a24"};outline-offset:3px}`}</style>
    <p style={{ color: muted }}>{c("Proposal · reminder disclosure", "پیشنهاد · توضیح یادآوری")}</p>
    <h1>{c("Settings", "تنظیمات")}</h1>
    <section className="reminder-proposal" style={{ padding: 16, border: `1px solid ${border}`, borderRadius: 12, background: surface }}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: width === "wide" ? "minmax(0,1fr) auto" : "1fr", alignItems: "center" }}>
        <div><h2 style={{ fontSize: "1.125em", margin: 0 }}>{c("Morning plan notification", "اعلان صبح برنامه")}</h2>
          <p style={{ margin: "4px 0 0", lineHeight: 1.7, fontSize: ".875em", color: muted }}>{c("Get a local Android reminder for the day's timed events. No reminder is sent when that day has no timed events.", "یک یادآوری محلی اندروید با رویدادهای زمان‌دار آن روز دریافت کنید. اگر آن روز رویداد زمان‌داری نداشته باشد، اعلانی فرستاده نمی‌شود.")}</p>
        </div>
        <label style={{ ...control, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, minWidth: width === "wide" ? 192 : undefined }}><span>{enabled ? c("Active", "فعال") : c("Inactive", "غیرفعال")}</span><input type="checkbox" checked={enabled} onChange={e => { setEnabled(e.target.checked); setSaved(false); }} style={{ width: 20, height: 20, accentColor: "#0f766e" }} /></label>
      </div>
      <label style={{ display: "block", maxWidth: 320, marginTop: 16 }}><span style={{ fontSize: ".75em", fontWeight: 600, color: muted }}>{c("Notification time", "زمان اعلان")}</span><input aria-label={c("Notification time", "زمان اعلان")} type="time" defaultValue="08:00" onChange={() => setSaved(false)} style={{ ...control, marginTop: 8, width: "100%", boxSizing: "border-box" }} /></label>
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${border}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <p role="status" style={{ margin: 0, fontSize: ".875em", color: state === "error" ? (dark ? "#fda4af" : "#be123c") : muted }}>{state === "saving" ? c("Saving…", "در حال ذخیره…") : state === "denied" ? c("Notification permission is denied.", "اجازه اعلان رد شده است.") : state === "error" ? c("Unable to save settings. Try again.", "ذخیره تنظیمات انجام نشد. دوباره تلاش کنید.") : saved ? c("Settings saved. Notification settings saved.", "تنظیمات ذخیره شد. تنظیمات اعلان ذخیره شد.") : c("Unsaved settings", "تنظیمات ذخیره‌نشده")}</p>
        <button disabled={state === "saving"} onClick={() => setSaved(true)} style={{ ...control, background: dark ? "#72dbcb" : "#0f766e", color: dark ? "#092522" : "white", fontWeight: 600 }}>{c("Save settings", "ذخیره تنظیمات")}</button>
      </div>
    </section>
    <aside style={{ marginTop: 24, padding: 16, border: `1px dashed ${border}`, lineHeight: 1.7, color: muted }}>
      <strong>{c("Design scenario — not additional app UI", "سناریوی طراحی — رابط جدید برنامه نیست")}</strong>
      <p>{state === "populated" ? c("Next reminder date has timed events: keep the existing Today's plan title and first four event previews.", "روز یادآوری بعدی رویداد زمان‌دار دارد: عنوان «برنامه امروز» و پیش‌نمایش چهار رویداد اول حفظ می‌شود.") : c("Next reminder date has no timed events: cancel the pending reminder and schedule nothing. Saved enable/time choices stay intact. Notes and goals still count as a plan.", "روز یادآوری بعدی رویداد زمان‌دار ندارد: یادآوری قبلی لغو می‌شود و اعلانی زمان‌بندی نمی‌شود. انتخاب فعال بودن و زمان حفظ می‌شود. یادداشت‌ها و هدف‌ها همچنان برنامه محسوب می‌شوند.")}</p>
    </aside>
  </main>;
}
const meta = { title: "Proposals/Empty day notification", component: EmptyDayNotification, args: { language: "en", width: "phone", state: "empty", dark: false, largeText: false }, argTypes: { language: { control: "radio", options: ["en", "fa"] }, width: { control: "radio", options: ["phone", "wide"] }, state: { control: "select", options: ["empty", "populated", "disabled", "denied", "saving", "error"] } } } satisfies Meta<typeof EmptyDayNotification>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide", largeText: true, state: "populated" } };
export const PersianWide: Story = { args: { language: "fa", width: "wide", largeText: true } };
export const PersianDark: Story = { args: { language: "fa", dark: true } };
export const PermissionDenied: Story = { args: { state: "denied" } };
export const Disabled: Story = { args: { state: "disabled" } };
export const Saving: Story = { args: { state: "saving" } };
export const Error: Story = { args: { state: "error" } };
