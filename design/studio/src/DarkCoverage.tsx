import { useState } from "react";
import type { Language } from "./atlas-data";
import "./dark-coverage.css";

export type DarkCoverageProps = {
  language: "both" | Language;
  width: "phone" | "wide";
  theme: "light" | "dark";
  coverage: "current" | "fixed";
};

// Source-backed excerpts only: idea-space.tsx sparks controls and focus-timer.tsx SVG.
// The current dark source uses shared green roles; this is not a full route recreation.
function Excerpt({ language, width, theme, coverage }: Omit<DarkCoverageProps, "language"> & { language: Language }) {
  const [hover, setHover] = useState(true);
  const [sparks, setSparks] = useState(false);
  const [selectedSpark, setSelectedSpark] = useState(true);
  const c = (en: string, fa: string) => language === "fa" ? fa : en;
  const dark = theme === "dark";
  const fixed = coverage === "fixed";
  const glass = dark && fixed ? "#243e39" : "#e7f4ef";
  const outline = dark && fixed ? "#72dbcb" : "#0f766e";
  return <section className={`dc-frame dc-${theme} dc-${width}`} dir={language === "fa" ? "rtl" : "ltr"} lang={language}>
    <header className="dc-meta">
      <strong>{c("Dark coverage excerpts", "نمونه‌های پوشش حالت تیره")}</strong>
      <p>{c("Source-backed excerpts; example content. Not a running app screenshot.", "نمونه بر اساس کد با محتوای نمایشی؛ تصویر برنامهٔ اجراشده نیست.")}</p>
      <label><input type="checkbox" checked={hover} onChange={event => setHover(event.target.checked)} />{c("Hold hover state for review", "نمایش حالت اشاره برای بررسی")}</label>
    </header>
    <div className="dc-panels">
      <section className="dc-ideas" aria-label={c("Idea Space controls", "کنترل‌های فضای ایده")}>
        <h2>{c("Idea Space", "فضای ایده")}</h2>
        <label className="dc-language">{c("Language", "زبان")}<select defaultValue={language}><option value="en">English</option><option value="fa">فارسی</option></select></label>
        <h3>{c("A thought worth keeping", "فکری که ارزش نگه‌داشتن دارد")}</h3>
        <label className="dc-writing-label">{c("Your thought", "فکر شما")}<textarea rows={3} defaultValue={c("Make time to read the complete draft slowly and write the next small step.", "برای خواندن آرامِ تمام پیش‌نویس وقت بگذارم و گام کوچک بعدی را بنویسم.")} /></label>
        <button className={`dc-spark ${fixed ? "dc-fixed" : "dc-current"} ${hover ? "dc-hover" : ""}`} aria-expanded={sparks} onClick={() => setSparks(value => !value)}>{c("Need a starting point?", "برای شروع، یک جرقه می‌خواهید؟")} <span aria-hidden="true">{sparks ? "−" : "+"}</span></button>
        {sparks && <button className="dc-choice" onClick={() => { setSelectedSpark(true); setSparks(false); }}>{c("Something I noticed today", "چیزی که امروز متوجه شدم")}</button>}
        {selectedSpark && <div className="dc-selected"><p>{c("Something I noticed today…", "چیزی که امروز متوجه شدم…")}</p><button className={`dc-spark ${fixed ? "dc-fixed" : "dc-current"} ${hover ? "dc-hover" : ""}`} onClick={() => setSelectedSpark(false)}>{c("Clear spark", "پاک کردن جرقه")}</button></div>}
        <button className="dc-primary">{c("Keep this thought", "این فکر را نگه دار")}</button>
      </section>
      <section className="dc-timer" aria-label={c("Focus Timer hourglass", "ساعت شنی تایمر تمرکز")}>
        <h2>{c("Focus Timer", "تایمر تمرکز")}</h2>
        <p>{c("Focus session", "زمان تمرکز")}</p>
        <svg viewBox="0 0 160 190" className="dc-hourglass" aria-hidden="true">
          <defs><clipPath id={`dc-top-${language}`}><path d="M24 20 H136 Q130 63 85 94 H75 Q30 63 24 20 Z" /></clipPath><clipPath id={`dc-bottom-${language}`}><path d="M75 96 H85 Q130 127 136 170 H24 Q30 127 75 96 Z" /></clipPath></defs>
          <path d="M24 20 H136 Q130 63 85 94 H75 Q30 63 24 20 Z M75 96 H85 Q130 127 136 170 H24 Q30 127 75 96 Z" fill={glass} stroke={outline} strokeWidth="5" strokeLinejoin="round" />
          <rect x="20" y="42.5" width="120" height="52.5" fill="#d69a54" clipPath={`url(#dc-top-${language})`} />
          <rect x="20" y="147.5" width="120" height="22.5" fill="#d69a54" clipPath={`url(#dc-bottom-${language})`} />
          <path d="M15 18 H145 M15 172 H145" stroke={dark && fixed ? "#72dbcb" : "#125b53"} strokeWidth="8" strokeLinecap="round" />
        </svg>
        <p className="dc-countdown" dir="ltr">17:30</p><p role="status">{c("Running", "در حال اجرا")}</p>
        <button className="dc-primary">{c("Pause", "توقف موقت")}</button>
      </section>
    </div>
  </section>;
}

export function DarkCoverage(props: DarkCoverageProps) {
  const languages: Language[] = props.language === "both" ? ["en", "fa"] : [props.language];
  return <div className="dc-board">{languages.map(language => <Excerpt key={language} {...props} language={language} />)}</div>;
}
