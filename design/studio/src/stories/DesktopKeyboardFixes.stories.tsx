import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
function DesktopKeyboardFixes({ language, width }: {language:"en"|"fa";width:"phone"|"wide"}) {
  const fa=language==="fa";
  const c=(en:string,persian:string)=>fa?persian:en;
  const dialog=useRef<HTMLDialogElement>(null), opener=useRef<HTMLButtonElement>(null), name=useRef<HTMLInputElement>(null);
  const [templateName,setTemplateName]=useState("");
  function close(){dialog.current?.close();opener.current?.focus();}
  return <article lang={language} dir={fa?"rtl":"ltr"} style={{maxWidth:width==="phone"?390:1024,margin:"auto",padding:20,minHeight:"100vh",background:"#f7f8f5"}}>
    <style>{`.keyboard-fix-control{font:inherit;min-height:48px;border:1px solid #b6c9bf;border-radius:12px;padding:12px;background:white;color:#172b29;max-width:100%;} .keyboard-fix-control:focus-visible{outline:3px solid #a66a24;outline-offset:3px;}`}</style>
    <h1>{c("Desktop keyboard corrections", "اصلاح دسترسی با صفحه‌کلید")}</h1>
    <p>{c("Illustrative controls; no app records are read or changed.", "کنترل‌های نمایشی؛ داده‌های برنامه خوانده یا تغییر داده نمی‌شوند.")}</p>
    <button ref={opener} className="keyboard-fix-control" onClick={()=>{dialog.current?.showModal();name.current?.focus();}}>{c("Week Templates", "قالب‌های هفته")}</button>
    <label style={{display:"block",marginBlock:24}}>{c("Background weekly goal", "هدف هفتگی پشت پنجره")}<input className="keyboard-fix-control" style={{display:"block",width:"100%"}}/></label>
    <section><h2>{c("Import Data", "ورود داده‌ها")}</h2><p>{c("Merge keeps existing data; replace deletes old data first.", "ادغام داده‌های قبلی را نگه می‌دارد؛ جایگزینی اول داده‌های قبلی را حذف می‌کند.")}</p>
      <label htmlFor={`keyboard-json-${language}`} style={{display:"block",fontWeight:600}}>{c("Choose JSON Backup", "انتخاب فایل پشتیبان JSON")}</label>
      <input id={`keyboard-json-${language}`} className="keyboard-fix-control" type="file" accept="application/json,.json" style={{display:"block",width:"100%",marginTop:12}}/>
    </section>
    <dialog ref={dialog} dir={fa?"rtl":"ltr"} aria-labelledby={`keyboard-template-heading-${language}`} onCancel={event=>{event.preventDefault();close();}} style={{width:"calc(100% - 32px)",maxWidth:512,maxHeight:"calc(100dvh - 32px)",overflowY:"auto",padding:20,border:"1px solid #d9e4de",borderRadius:24,background:"#f7f8f5",color:"#172b29"}}>
      <h2 id={`keyboard-template-heading-${language}`}>{c("Week Templates", "قالب‌های هفته")}</h2>
      <button className="keyboard-fix-control" onClick={close}>{c("Cancel", "انصراف")}</button>
      <label htmlFor={`keyboard-name-${language}`} style={{display:"block",marginTop:16}}>{c("Template name", "نام قالب")}</label>
      <input id={`keyboard-name-${language}`} ref={name} className="keyboard-fix-control" maxLength={80} value={templateName} onChange={event=>setTemplateName(event.target.value)} style={{width:"100%",marginBlock:12}}/>
      <button className="keyboard-fix-control" disabled={!templateName.trim()}>{c("Save as Template", "ذخیره به‌عنوان قالب")}</button>
      <p>{c("Native modal keeps Tab/Shift+Tab inside. Escape closes and returns focus to Week Templates. No template data is saved by this story.", "پنجرهٔ محاوره‌ای بومی حرکت Tab را درون خود نگه می‌دارد. Escape پنجره را می‌بندد و تمرکز را به قالب‌های هفته بازمی‌گرداند. این نمونه داده‌ای ذخیره نمی‌کند.")}</p>
    </dialog>
  </article>;
}
const meta={title:"Proposals/Desktop keyboard fixes",component:DesktopKeyboardFixes,args:{language:"en",width:"phone"},argTypes:{language:{control:"radio",options:["en","fa"]},width:{control:"radio",options:["phone","wide"]}}} satisfies Meta<typeof DesktopKeyboardFixes>;
export default meta;
type Story=StoryObj<typeof meta>;
export const EnglishPhone:Story={};
export const PersianPhone:Story={args:{language:"fa"}};
export const EnglishWide:Story={args:{width:"wide"}};
export const PersianWide:Story={args:{language:"fa",width:"wide"}};
