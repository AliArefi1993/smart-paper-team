import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type State = "new" | "edit" | "branch" | "session" | "saved" | "empty" | "loading" | "error";
function IdeaRecoveryLocale({ language, width, state, largeText }: { language: "en" | "fa"; width: "phone" | "wide"; state: State; largeText: boolean }) {
  const [locale, setLocale] = useState(language);
  const [body, setBody] = useState("  فکر ناتمام\nMixed writing preserved exactly.\n\nفرصتی برای فکر کردن دربارهٔ هفتهٔ آینده و نوشتن جزئیات بیشتر بدون ذخیرهٔ خودکار به‌عنوان فکر.  ");
  const fa = locale === "fa";
  const c = (en: string, faText: string) => fa ? faText : en;
  const messages: Record<State, [string, string]> = {
    new: ["New draft restored. It is not a saved thought yet.", "پیش‌نویس تازه بازیابی شد. هنوز فکر ذخیره‌شده نیست."],
    edit: ["Edit draft restored. Changes are not saved to the note yet.", "پیش‌نویس ویرایش بازیابی شد. تغییرات هنوز در یادداشت ذخیره نشده‌اند."],
    branch: ["Branch draft restored. It is not a saved thought yet.", "پیش‌نویس شاخه بازیابی شد. هنوز فکر ذخیره‌شده نیست."],
    session: ["Unfinished writing kept in this session. It is not a saved thought yet.", "نوشته ناتمام در این نشست حفظ شد. هنوز فکر ذخیره‌شده نیست."],
    saved: ["Thought saved.", "فکر ذخیره شد."],
    empty: ["", ""], loading: ["", ""],
    error: ["Could not read the stored draft or thoughts. Existing draft was left untouched. Retry loading before writing.", "خواندن پیش‌نویس یا فکرهای ذخیره‌شده ممکن نشد. پیش‌نویس قبلی دست‌نخورده است. پیش از نوشتن دوباره بارگذاری کنید."],
  };
  return <article lang={locale} dir={fa ? "rtl" : "ltr"} style={{maxWidth: width === "phone" ? 390 : 1024, margin: "auto", padding: 20, background: "#f7f8f5", color: "#172b29", fontSize: largeText ? 22 : 16, minHeight: "100vh"}}>
    <style>{`.recovery-control {min-height:48px; padding:12px 16px; border:1px solid #bfd3c7; border-radius:12px; background:white;color:#125b53;font:inherit;white-space:normal;} .recovery-control:focus-visible {outline:3px solid #a66a24;outline-offset:3px;}`}</style>
    <p>{c("Proposal · recovery status only", "پیشنهاد · فقط وضعیت بازیابی")}</p>
    <h1>{c("Idea Space", "فضای ایده‌ها")}</h1>
    <button className="recovery-control" onClick={() => setLocale(fa ? "en" : "fa")}>{c("فارسی", "English")}</button>
    <p>{c("A place for unfinished thoughts.", "جایی برای فکرهای ناتمام.")}</p>
    {messages[state][0] && <p role={state === "error" ? "alert" : "status"} style={{color: state === "error" ? "#78350f" : "#065f46", fontWeight: 600}}>{c(...messages[state])}</p>}
    {state !== "loading" && state !== "error" && <section style={{background:"#e7f4ef",border:"1px solid #d9e4de",padding:20,borderRadius:24,marginTop:24}}>
      <h2>{state === "edit" ? c("Edit thought", "ویرایش فکر") : c("Write a thought", "یک فکر بنویس")}</h2>
      <label htmlFor={`recovery-body-${language}-${width}`}>{c("Your thought", "فکر شما")}</label>
      <textarea className="recovery-control" id={`recovery-body-${language}-${width}`} dir="auto" rows={6} value={state === "empty" || state === "saved" ? "" : body} onChange={event => setBody(event.target.value)} style={{display:"block", width:"100%",resize:"vertical",marginBlock:12,lineHeight:1.65,color:"#173c36"}} />
      <button className="recovery-control" style={{background:"#0f766e", color:"white"}}>{state === "edit" ? c("Save changes", "ذخیره تغییرات") : c("Keep thought", "نگه‌داشتن فکر")}</button>
    </section>}
    <p>{c("Language switching changes the explanation; writing and draft identity stay intact. Publishing is illustrative only in this story.", "تغییر زبان فقط توضیح را تغییر می‌دهد؛ نوشته و هویت پیش‌نویس دست‌نخورده می‌مانند. انتشار در این نمونه نمایشی است.")}</p>
  </article>;
}
const meta = { title: "Proposals/Idea recovery locale", component: IdeaRecoveryLocale, args: {language:"fa",width:"phone",state:"new",largeText:false}, argTypes:{language:{control:"radio",options:["en","fa"]},width:{control:"radio",options:["phone","wide"]},state:{control:"select",options:["new","edit","branch","session","saved","empty","loading","error"]}} } satisfies Meta<typeof IdeaRecoveryLocale>;
export default meta;
type Story = StoryObj<typeof meta>;
export const PersianPhone: Story = {};
export const EnglishPhone: Story = {args:{language:"en"}};
export const PersianWide: Story = {args:{width:"wide",largeText:true}};
export const EnglishWide: Story = {args:{language:"en",width:"wide",largeText:true}};
export const EditRecovered: Story = {args:{state:"edit"}};
export const BranchRecovered: Story = {args:{state:"branch"}};
export const SessionOnly: Story = {args:{state:"session"}};
export const Loading: Story = {args:{state:"loading"}};
export const Empty: Story = {args:{state:"empty"}};
export const LoadError: Story = {args:{state:"error"}};
export const Saved: Story = {args:{state:"saved"}};
