import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const states = ["ready", "busy", "no-data", "locked", "changed", "copied", "returned", "downloaded", "cancelled", "share-error", "copy-error", "manual"] as const;
type State = typeof states[number];
type Props = { language: "en" | "fa"; width: "phone" | "wide"; theme: "light" | "dark"; state: State; largeText: boolean };

// Interaction sketch: state changes simulate results; no clipboard/network/native calls.
function AiReportHandoff({ language, width, theme, state: initialState, largeText }: Props) {
  const [state, setState] = useState(initialState);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fa = language === "fa";
  const c = (en: string, faText: string) => fa ? faText : en;
  const report = c("# Smart Paper report\n2026-10-03 — 2026-10-09\n\n## Weekly goals\nFinish a thoughtful first draft and review the longer notes from this week.\n\n## Activity\nStudy: 120 minutes\nFinance not included.", "# گزارش کاغذ هوشمند\n2026-10-03 — 2026-10-09\n\n## هدف‌های هفته\nپیش‌نویس اول را با دقت تمام کنم و یادداشت‌های طولانی این هفته را مرور کنم.\n\n## فعالیت\nمطالعه: ۱۲۰ دقیقه\nداده‌های مالی اضافه نشده‌اند.");
  const messages: Partial<Record<State, string>> = {
    busy: c("Preparing report…", "در حال آماده‌سازی گزارش…"),
    "no-data": c("No matching records for this selection.", "برای این انتخاب داده‌ای پیدا نشد."),
    locked: c("Unlock finance below to include finance details.", "برای افزودن داده‌های مالی، ابتدا بخش مالی را در پایین باز کنید."),
    changed: c("The report changed. Review the updated preview, then choose Copy or Share again.", "گزارش تغییر کرده است. پیش‌نمایش به‌روز را بررسی کنید، سپس دوباره کپی یا اشتراک‌گذاری را انتخاب کنید."),
    copied: c("Report copied. Open ChatGPT, paste it, review it, then send.", "گزارش کپی شد. ChatGPT را باز کنید، متن را جای‌گذاری و بررسی کنید و سپس بفرستید."),
    returned: c("Share menu closed. Check the receiving app before sending. You can also copy the report text.", "فهرست اشتراک‌گذاری بسته شد. پیش از ارسال، برنامه مقصد را بررسی کنید. می‌توانید متن گزارش را هم کپی کنید."),
    downloaded: c("Report download started. Check your downloads, then attach the file in ChatGPT and review before sending.", "بارگیری گزارش شروع شد. پوشه بارگیری‌ها را بررسی کنید، سپس فایل را در ChatGPT پیوست کنید و پیش از ارسال بررسی کنید."),
    cancelled: c("Sharing was cancelled. You can try again or copy the report text.", "اشتراک‌گذاری لغو شد. می‌توانید دوباره تلاش کنید یا متن گزارش را کپی کنید."),
    "share-error": c("Could not share the report file. Try again or copy the report text.", "اشتراک‌گذاری فایل گزارش انجام نشد. دوباره تلاش کنید یا متن گزارش را کپی کنید."),
    "copy-error": c("Could not copy automatically. Select the report text, then use your device’s Copy command.", "کپی خودکار انجام نشد. متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید."),
    manual: c("Select the report text, then use your device’s Copy command.", "متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید."),
  };
  const disabled = ["busy", "no-data", "locked"].includes(state);
  const manual = state === "manual" || state === "copy-error";
  return <article className={`phone ${width === "wide" ? "wide" : ""} theme-${theme}`} dir={fa ? "rtl" : "ltr"} lang={language} style={{ fontSize: largeText ? 22 : 15 }}>
    <div className="body">
      <p className="eyebrow">{c("Proposal · handoff area", "پیشنهاد · بخش انتقال گزارش")}</p>
      <h3>{c("Share with AI", "اشتراک‌گذاری با هوش مصنوعی")}</h3>
      <p>{c("Selected: weekly goals and section activity. Finance off. Date and field controls stay above this area.", "انتخاب: هدف‌های هفته و فعالیت بخش‌ها. داده‌های مالی خاموش است. کنترل‌های تاریخ و داده‌ها بالای این بخش می‌مانند.")}</p>
      {!disabled && <details className="box" open={state === "changed" || manual}>
        <summary>{c("Review the report text", "بررسی متن گزارش")}</summary>
        {manual ? <label style={{ display: "block" }}>{c("Report text", "متن گزارش")}
          <textarea ref={textarea} readOnly value={report} dir="auto" rows={8} style={{ width: "100%", marginBlock: 12, padding: 12, font: "inherit", color: "var(--ink)", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 9, outlineOffset: 3 }} />
        </label> : <pre dir="auto" style={{ font: "inherit", maxHeight: 220, overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{report}</pre>}
        {manual && <button className="btn alt" onClick={() => { textarea.current?.focus(); textarea.current?.select(); }}>{c("Select report", "انتخاب گزارش")}</button>}
      </details>}
      <p>{c("Copy the report, open ChatGPT yourself, then paste, review and send. Or share the file and choose ChatGPT if available. Smart Paper does not send it for you.", "گزارش را کپی کنید، خودتان ChatGPT را باز کنید، سپس متن را جای‌گذاری و بررسی کنید و بفرستید. یا فایل را به اشتراک بگذارید و اگر ChatGPT موجود بود آن را انتخاب کنید. کاغذ هوشمند گزارش را برای شما ارسال نمی‌کند.")}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, opacity: disabled ? 0.6 : 1 }} aria-busy={state === "busy"}>
        <button className="btn" disabled={disabled} onClick={() => setState("copied")}>{c("Copy report text", "کپی متن گزارش")}</button>
        <button className="btn alt" disabled={disabled} onClick={() => setState("returned")}>{c("Share report file", "اشتراک‌گذاری فایل گزارش")}</button>
        <button className="btn alt" disabled={disabled} onClick={() => setState("manual")}>{c("Select text manually", "انتخاب دستی متن")}</button>
      </div>
      {messages[state] && <p role={state.endsWith("error") ? "alert" : "status"}>{messages[state]}</p>}
    </div>
  </article>;
}

const meta = {
  title: "Proposals/AI report handoff",
  component: AiReportHandoff,
  args: { language: "en", width: "phone", theme: "light", state: "ready", largeText: false },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    state: { control: "select", options: states },
  },
} satisfies Meta<typeof AiReportHandoff>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhoneDark: Story = { args: { language: "fa", theme: "dark" } };
export const EnglishWideDark: Story = { args: { width: "wide", theme: "dark", state: "returned" } };
export const PersianWide: Story = { args: { language: "fa", width: "wide", state: "downloaded" } };
export const Busy: Story = { args: { state: "busy" } };
export const NoData: Story = { args: { state: "no-data" } };
export const FinanceLocked: Story = { args: { state: "locked" } };
export const ChangedPreview: Story = { args: { state: "changed" } };
export const Copied: Story = { args: { state: "copied" } };
export const ShareCancelled: Story = { args: { state: "cancelled" } };
export const ShareError: Story = { args: { state: "share-error" } };
export const CopyError: Story = { args: { state: "copy-error" } };
export const PersianManualLarge: Story = { args: { language: "fa", theme: "dark", state: "manual", largeText: true } };
