import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

function ScheduleSheet({ language = "en", layout = "landscape", theme = "light", state = "new" }: {
  language?: "en" | "fa";
  layout?: "portrait" | "landscape" | "short" | "keyboard" | "wide";
  theme?: "light" | "dark";
  state?: "new" | "edit" | "error" | "long";
}) {
  const fa = language === "fa", dark = theme === "dark";
  const c = (en: string, faText: string) => fa ? faText : en;
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(state === "error");
  const [title, setTitle] = useState(state === "error" ? "" : c("Review the project draft with a clear next step", "مرور پیش‌نویس پروژه و تعیین قدم بعدی روشن"));
  const [note, setNote] = useState(state === "long" ? c("Review the first draft, record outstanding questions, and prepare a short agenda before the afternoon appointment. ", "پیش‌نویس را مرور کنم، پرسش‌های باقی‌مانده را بنویسم و پیش از قرار بعدازظهر برنامه‌ای کوتاه آماده کنم. ").repeat(8) : "");
  const width = layout === "portrait" ? 390 : layout === "wide" ? 1100 : layout === "short" ? 640 : 740;
  const height = layout === "portrait" ? 844 : layout === "wide" ? 720 : layout === "short" ? 320 : layout === "keyboard" ? 220 : 360;
  const colors = { ink: dark ? "#eef5f1" : "#172b29", surface: dark ? "#1b2b29" : "#fff", line: dark ? "#3b5550" : "#d9e4de", paper: dark ? "#101b1b" : "#f7f8f5", primary: dark ? "#72dbcb" : "#0f766e" };
  const input = { width: "100%", minHeight: 44, padding: "8px 12px", border: `1px solid ${colors.line}`, borderRadius: 8, background: colors.surface, color: colors.ink, font: "inherit", boxSizing: "border-box" as const };
  const button = { minHeight: 48, borderRadius: 12, border: `1px solid ${colors.line}`, padding: "8px 16px", background: colors.surface, color: colors.ink, font: "inherit", cursor: "pointer" };
  return <div style={{ padding: 20 }}>
    <p>Proposal simulation · {width}×{height} · {c("Scrollable schedule sheet", "پنجره رویداد با پیمایش داخلی")}</p>
    <div dir={fa ? "rtl" : "ltr"} style={{ position: "relative", width, maxWidth: "100%", height, overflow: "hidden", background: colors.paper, color: colors.ink }}>
      <div style={{ padding: 24 }}><h1>{c("Weekly Smart Paper", "برنامه هفتگی")}</h1><h2>{c("Day Schedule", "برنامه زمانی روز")}</h2><button style={button} onClick={() => setOpen(true)}>{c("Add Event", "افزودن رویداد")}</button><p>{c("Changes save automatically on this device.", "تغییرات به‌صورت خودکار روی این دستگاه ذخیره می‌شوند.")}</p></div>
      {open && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: layout === "portrait" ? "end" : "center", justifyContent: "center", padding: 16, boxSizing: "border-box", background: "#172b2966" }}>
        <section role="dialog" aria-modal="true" aria-labelledby="schedule-sheet-title" style={{ width: "100%", maxWidth: 512, margin: 0, maxHeight: "100%", overflowY: "auto", boxSizing: "border-box", padding: 16, border: `1px solid ${colors.line}`, borderRadius: 16, background: colors.surface }}>
          <h2 id="schedule-sheet-title" style={{ margin: 0, fontSize: 18 }}>{state === "edit" ? c("Edit Event", "ویرایش رویداد") : c("Add Event", "افزودن رویداد")}</h2>
          {error && <p role="alert" style={{ color: dark ? "#ffb6bc" : "#be123c" }}>{c("Event title is required.", "عنوان رویداد الزامی است.")}</p>}
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <label>{c("Event title", "عنوان رویداد")}<input style={input} value={title} onChange={e => setTitle(e.target.value)} /></label>
            <div style={{ display: "grid", gridTemplateColumns: layout === "portrait" ? "1fr" : "1fr 1fr", gap: 12 }}>
              <label>{c("Start time", "زمان شروع")}<input style={input} type="time" defaultValue="08:00" /></label>
              <label>{c("End time", "زمان پایان")}<input style={input} type="time" defaultValue="09:00" /></label>
            </div>
            <label>{c("Section label", "نام بخش")}<select style={input}><option>{c("Not Set", "تنظیم نشده")}</option><option>{c("Learning", "یادگیری")}</option></select></label>
            <label>{c("Note (optional)", "یادداشت (اختیاری)")}<textarea style={{ ...input, minHeight: state === "long" ? 230 : 90, resize: "vertical" }} value={note} onChange={e => setNote(e.target.value)} /></label>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            <button style={{ ...button, background: colors.primary, color: dark ? "#092522" : "white" }} onClick={() => title.trim() ? setOpen(false) : setError(true)}>{state === "edit" ? c("Apply changes", "اعمال تغییرات") : c("Add event", "افزودن رویداد")}</button>
            {state === "edit" && <button style={{ ...button, color: dark ? "#ffb6bc" : "#be123c" }} onClick={() => setOpen(false)}>{c("Delete", "حذف")}</button>}
            <button style={button} onClick={() => setOpen(false)}>{c("Cancel", "لغو")}</button>
          </div>
        </section>
      </div>}
    </div>
  </div>;
}

const meta = { title: "Proposals/Phone landscape", component: ScheduleSheet, args: { language: "en", layout: "landscape", theme: "light", state: "new" } } satisfies Meta<typeof ScheduleSheet>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishLandscape: Story = {};
export const PersianLandscape: Story = { args: { language: "fa" } };
export const EnglishShortError: Story = { args: { layout: "short", state: "error" } };
export const PersianShortError: Story = { args: { language: "fa", layout: "short", state: "error" } };
export const PersianDarkEdit: Story = { args: { language: "fa", theme: "dark", state: "edit" } };
export const EnglishLongNote: Story = { args: { state: "long" } };
export const PersianLongNote: Story = { args: { language: "fa", state: "long" } };
export const PersianKeyboard: Story = { args: { language: "fa", layout: "keyboard" } };
export const EnglishPortrait: Story = { args: { layout: "portrait" } };
export const PersianPortrait: Story = { args: { language: "fa", layout: "portrait" } };
export const EnglishWide: Story = { args: { layout: "wide" } };
export const PersianWide: Story = { args: { language: "fa", layout: "wide" } };
