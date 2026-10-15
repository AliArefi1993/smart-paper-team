import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type Scene = "route" | "reader" | "writing" | "event" | "report" | "unsaved" | "failure" | "root";
function AndroidBack({ language, width, scene, largeText }: { language: "en" | "fa"; width: "phone" | "wide"; scene: Scene; largeText: boolean }) {
  const fa = language === "fa";
  const c = (en: string, persian: string) => fa ? persian : en;
  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState("");
  const [text, setText] = useState(c("A long unfinished reflection about next week's priorities, with enough detail to remember what matters when I return.", "نوشتهٔ ناتمام دربارهٔ اولویت‌های هفتهٔ آینده، همراه با جزئیات کافی برای اینکه هنگام بازگشت بدانم چه چیزهایی برایم مهم بوده‌اند."));
  const back = () => {
    if (scene === "failure") { setOutcome(c("Stay here. Save failed; Retry remains available.", "در همین صفحه بمانید. ذخیره نشد؛ تلاش دوباره در دسترس است.")); return; }
    if (scene === "report" || scene === "unsaved") { setStep(1); setOutcome(c("Leave decision is open. No navigation or deletion occurred.", "تصمیم خروج باز است. جابه‌جایی یا حذف انجام نشده است.")); return; }
    if (scene === "reader" && step === 0) { setStep(1); setOutcome(c("Returned to previous thought. Writing is unchanged.", "به فکر قبلی برگشتید. نوشته تغییر نکرده است.")); return; }
    setStep(2);
    setOutcome(scene === "root" ? c("Platform exit is allowed from Planner root.", "خروج سیستم از ریشهٔ برنامه‌ریز مجاز است.") : scene === "route" ? c("Returned to Planner, the previous app route.", "به برنامه‌ریز، صفحهٔ قبلی برنامه، برگشتید.") : scene === "event" ? c("Event editor cancelled. No event was saved.", "ویرایش رویداد لغو شد. رویدادی ذخیره نشد.") : c("Closed the open view. Underlying route remains visible.", "نمای باز بسته شد. صفحهٔ زیر آن نمایش داده می‌شود."));
  };
  const titles: Record<Scene, [string, string]> = { route: ["Settings", "تنظیمات"], reader: [step === 0 ? "Grown thought" : "Original thought", step === 0 ? "فکر رشدکرده" : "فکر اصلی"], writing: ["Day notes", "یادداشت‌های روز"], event: ["Add schedule entry", "افزودن رویداد زمان‌بندی"], report: ["Report a problem", "گزارش مشکل"], unsaved: ["Settings", "تنظیمات"], failure: ["Planner", "برنامه‌ریز"], root: ["Planner", "برنامه‌ریز"] };
  return <main lang={language} dir={fa ? "rtl" : "ltr"} style={{ maxWidth: width === "phone" ? 390 : 960, padding: 20, margin: "auto", minHeight: "100vh", background: "#f7f8f5", color: "#172b29", fontSize: largeText ? 24 : 16, overflowWrap: "anywhere" }}>
    <style>{`.android-back-control{font:inherit;min-height:48px;padding:12px 16px;border:1px solid #536660;border-radius:12px;background:white;color:#172b29;white-space:normal}.android-back-control:focus-visible{outline:3px solid #a66a24;outline-offset:3px}`}</style>
    <p>{c("Proposal · simulated Android Back. This control belongs to the studio only.", "پیشنهاد · شبیه‌سازی بازگشت اندروید. این دکمه فقط برای استودیو است.")}</p>
    <section aria-label={c("Current app view", "نمای فعلی برنامه")} style={{ background: "white", border: "1px solid #d9e4de", borderRadius: 16, padding: 20 }}>
      <h1>{step === 2 ? c("Planner", "برنامه‌ریز") : c(...titles[scene])}</h1>
      {step !== 2 && ["writing", "event", "report"].includes(scene) && <><label htmlFor="android-back-writing">{c("Writing", "نوشته")}</label><textarea id="android-back-writing" dir="auto" rows={5} className="android-back-control" value={text} onChange={event => setText(event.target.value)} style={{ width: "100%", marginBlock: 12, lineHeight: 1.7 }} /><p>{scene === "writing" ? c("Example after successful local save · closing returns to the day without deleting writing.", "نمونه پس از ذخیرهٔ موفق روی دستگاه · بستن، بدون حذف نوشته، به روز برمی‌گردد.") : scene === "event" ? c("Unsaved event fields follow the existing Cancel action.", "فیلدهای ذخیره‌نشدهٔ رویداد از رفتار فعلی لغو پیروی می‌کنند.") : c("Description is not saved. Closing asks before discarding.", "توضیح ذخیره نمی‌شود. پیش از کنار گذاشتن آن پرسیده می‌شود.")}</p></>}
      {scene === "reader" && step !== 2 && <><p dir="auto">{text}</p><p>{c("Your unfinished writing is unchanged.", "نوشتهٔ ناتمام شما تغییر نکرده است.")}</p></>}
      {scene === "failure" && <p role="alert">{c("Could not save locally. Your writing remains here. Retry.", "ذخیره روی دستگاه ممکن نشد. نوشتهٔ شما اینجا باقی است. دوباره تلاش کنید.")}</p>}
      {step === 1 && ["report", "unsaved"].includes(scene) && <section role="alertdialog" aria-labelledby="android-back-decision" style={{ border: "2px solid #536660", borderRadius: 12, padding: 16 }}><h2 id="android-back-decision">{scene === "report" ? c("Discard this description?", "این توضیح کنار گذاشته شود؟") : c("Leave with unsaved changes?", "با تغییرات ذخیره‌نشده خارج شوید؟")}</h2><div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}><button className="android-back-control" onClick={() => { setStep(0); setOutcome(c("Kept editing. Writing is preserved.", "ویرایش ادامه دارد. نوشته حفظ شده است.")); }}>{c("Keep editing", "ادامهٔ ویرایش")}</button><button className="android-back-control" onClick={() => { setStep(2); setOutcome(c("Explicit leave/discard confirmed.", "خروج یا کنار گذاشتن صریحاً تأیید شد.")); }}>{c("Discard / Leave", "کنار گذاشتن / خروج")}</button></div></section>}
    </section>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBlock: 20 }}><button className="android-back-control" onClick={back}>{c("Simulate system Back", "شبیه‌سازی بازگشت سیستم")}</button><button className="android-back-control" onClick={() => { setStep(0); setOutcome(""); }}>{c("Reset preview", "شروع دوبارهٔ نمونه")}</button></div>
    <p role="status">{outcome}</p>
    <p>{c("Keyboard and native confirmation dismissal belong to Android. This story cannot verify them.", "بستن صفحه‌کلید و تأییدهای سیستمی به اندروید مربوط است. این نمونه آن‌ها را تأیید نمی‌کند.")}</p>
  </main>;
}
const meta = { title: "Proposals/Android Back", component: AndroidBack, args: { language: "en", width: "phone", scene: "route", largeText: false }, argTypes: { language: { control: "radio", options: ["en", "fa"] }, width: { control: "radio", options: ["phone", "wide"] }, scene: { control: "select", options: ["route", "reader", "writing", "event", "report", "unsaved", "failure", "root"] } } } satisfies Meta<typeof AndroidBack>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide", largeText: true, scene: "writing" } };
export const PersianWide: Story = { args: { language: "fa", width: "wide", largeText: true, scene: "writing" } };
export const NestedThought: Story = { args: { scene: "reader" } };
export const PersianWriting: Story = { args: { language: "fa", scene: "writing" } };
export const EventCancel: Story = { args: { scene: "event" } };
export const UnfinishedReport: Story = { args: { language: "fa", scene: "report" } };
export const UnsavedSettings: Story = { args: { scene: "unsaved" } };
export const SaveFailure: Story = { args: { language: "fa", scene: "failure" } };
export const PlannerRoot: Story = { args: { scene: "root" } };
