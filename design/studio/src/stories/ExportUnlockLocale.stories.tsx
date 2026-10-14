import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

function ExportUnlockLocale({ language, width, largeText }: { language: "en" | "fa"; width: "phone" | "wide"; largeText: boolean }) {
  const [locale, setLocale] = useState(language);
  const fa = locale === "fa";
  const c = (en: string, persian: string) => fa ? persian : en;
  return <main lang={locale} dir={fa ? "rtl" : "ltr"} style={{ maxWidth: width === "phone" ? 390 : 896, margin: "auto", padding: 16, minHeight: "100vh", background: "#f7f8f5", color: "#172b29", fontSize: largeText ? 24 : 16 }}>
    <style>{`.export-locale-control{font:inherit;min-height:48px;padding:12px 16px;border:1px solid #b6c9bf;border-radius:12px;background:#f1f5f2;color:#172b29;white-space:normal}.export-locale-control:focus-visible{outline:3px solid #a66a24;outline-offset:3px}`}</style>
    <p>{c("Proposal · unlock feedback only", "پیشنهاد · فقط پیام باز شدن قفل")}</p>
    <header style={{ padding: 20, border: "1px solid #d9e4de", borderRadius: 16, background: "white" }}>
      <h1 style={{ color: "#172b29" }}>{c("Export Data", "خروجی داده‌ها")}</h1>
      <button className="export-locale-control" onClick={() => setLocale(fa ? "en" : "fa")}>{fa ? "English" : "فارسی"}</button>
    </header>
    <section style={{ marginTop: 24, padding: 20, border: "1px solid #d9e4de", borderRadius: 16, background: "white" }}>
      <p role="status" style={{ color: "#065f46", marginTop: 0 }}>{c("Finance unlocked.", "بخش مالی باز شد.")}</p>
      <div style={{ display: "grid", gridTemplateColumns: width === "wide" ? "repeat(3,1fr)" : "1fr", gap: 12 }}>
        {[["Weeks", "هفته‌ها", fa ? "۱۲" : "12"], ["Income Entries", "تعداد درآمدها", fa ? "۳" : "3"], ["Total Income", "کل درآمد", fa ? "۱٬۲۳۴٬۵۶۷" : "1,234,567"]].map(([en, persian, value]) => <div key={en} style={{ padding: 16, border: "1px solid #d9e4de", borderRadius: 12 }}><p>{c(en, persian)}</p><strong>{value}</strong></div>)}
      </div>
      <p>{c("Illustrative unlocked preview. Switching language preserves the displayed records and status identity.", "نمونه نمایشی خروجی بازشده. تغییر زبان اطلاعات نمایش‌داده‌شده و هویت پیام را حفظ می‌کند.")}</p>
    </section>
  </main>;
}
const meta = { title: "Proposals/Export unlock locale", component: ExportUnlockLocale, args: { language: "en", width: "phone", largeText: false }, argTypes: { language: { control: "radio", options: ["en", "fa"] }, width: { control: "radio", options: ["phone", "wide"] } } } satisfies Meta<typeof ExportUnlockLocale>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide", largeText: true } };
export const PersianWide: Story = { args: { language: "fa", width: "wide", largeText: true } };
