import { useId, useState } from "react";
import "./timer-natural-sand.css";

export type SandState = "ready" | "running" | "paused" | "completed";
export function NaturalHourglass({ progress, state }: { progress: number; state: SandState }) {
  const id = useId().replace(/:/g, "");
  const p = Math.max(0, Math.min(100, progress));
  const top = 28 + 66 * (1 - Math.cbrt(1 - p / 100));
  const peak = 170 - p * .66;
  return <svg viewBox="0 0 160 190" className="natural-hourglass" data-state={state} aria-hidden="true" style={{ "--sand-fall": `${Math.max(8, peak - 95)}px` } as React.CSSProperties}>
    <defs>
      <clipPath id={`${id}-top`}><path d="M24 20H136Q130 63 85 94H75Q30 63 24 20Z"/></clipPath>
      <clipPath id={`${id}-bottom`}><path d="M75 96H85Q130 127 136 170H24Q30 127 75 96Z"/></clipPath>
      <linearGradient id={`${id}-sand`} x1="0" y1="0" x2=".7" y2="1"><stop stopColor="var(--sand-light)"/><stop offset=".55" stopColor="var(--sand-body)"/><stop offset="1" stopColor="var(--sand-shadow)"/></linearGradient>
      <linearGradient id={`${id}-glass`}><stop stopColor="var(--glass-fill)" stopOpacity=".7"/><stop offset=".45" stopColor="var(--glass-fill)" stopOpacity=".15"/><stop offset="1" stopColor="var(--glass-fill)" stopOpacity=".55"/></linearGradient>
      <pattern id={`${id}-texture`} width="9" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="var(--sand-shadow)" opacity=".32"/><circle cx="6" cy="5" r=".6" fill="var(--sand-light)" opacity=".7"/></pattern>
    </defs>
    <path d="M24 20H136Q130 63 85 94H75Q30 63 24 20Z M75 96H85Q130 127 136 170H24Q30 127 75 96Z" fill={`url(#${id}-glass)`} stroke="var(--glass-edge)" strokeWidth="3" strokeLinejoin="round"/>
    {p < 100 && <g clipPath={`url(#${id}-top)`}><path d={`M20 ${top}Q80 ${top+4} 140 ${top}V96H20Z`} fill={`url(#${id}-sand)`}/><path d={`M20 ${top}Q80 ${top+4} 140 ${top}V96H20Z`} fill={`url(#${id}-texture)`}/><path d={`M20 ${top}Q80 ${top+4} 140 ${top}`} fill="none" stroke="var(--sand-light)" strokeWidth="2"/></g>}
    {p > 0 && <g clipPath={`url(#${id}-bottom)`}><path d={`M20 171H140V${peak+14}Q113 ${peak+15} 80 ${peak}Q47 ${peak+15} 20 ${peak+14}Z`} fill={`url(#${id}-sand)`}/><path d={`M20 171H140V${peak+14}Q113 ${peak+15} 80 ${peak}Q47 ${peak+15} 20 ${peak+14}Z`} fill={`url(#${id}-texture)`}/></g>}
    {(state === "running" || state === "paused") && p < 100 && <g clipPath={`url(#${id}-bottom)`}>{[0,1,2,3,4,5,6].map(n=><circle key={n} className="natural-grain" cx={79 + (n%3-1)*1.4} cy="95" r={n%2 ? 1 : 1.2} fill={n%2 ? "var(--sand-light)" : "var(--sand-body)"} style={{animationDelay:`${-.17*n}s`,animationDuration:`${.7+n*.05}s`}}/>)}</g>}
    <path d="M34 29Q40 57 65 76 M34 160Q38 137 61 118" stroke="var(--glass-shine)" strokeWidth="3" strokeLinecap="round" opacity=".75" fill="none"/>
    <path d="M16 18H144M16 173H144" stroke="var(--frame)" strokeWidth="10" strokeLinecap="round"/>
    <path d="M21 15H139M21 170H139" stroke="var(--frame-light)" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
export function TimerNaturalSand({language="both",width="phone",theme="light",state="running",progress=42,reducedMotion=false}:{language?:"both"|"en"|"fa";width?:"phone"|"narrow"|"wide";theme?:"light"|"dark";state?:SandState;progress?:number;reducedMotion?:boolean}) {
 const [current,setCurrent]=useState<SandState>(state);
 const languages=language==="both"?["en","fa"] as const:[language];
 const p=current==="ready"?0:current==="completed"?100:progress;
 return <main className={`natural-preview ${theme} ${reducedMotion?"reduce-motion":""}`}><div className="natural-layout">{languages.map(lang=><section key={lang} lang={lang} dir={lang==="fa"?"rtl":"ltr"} className={`natural-phone ${width}`}>
  <header><small>SMART PAPER</small><h1>{lang==="fa"?"زمان‌سنج تمرکز":"Focus timer"}</h1></header>
  <div className="natural-card"><small>{lang==="fa"?"یک کار، یک بازه":"ONE TASK, ONE SESSION"}</small><h2>{lang==="fa"?"تمرکز":"Focus"}</h2><p>{lang==="fa"?"برای یک کار مشخص زمان بگذار و بعد استراحت کن.":"Make time for one clear task, then take a break."}</p>
   <div className="natural-phases"><button aria-pressed="true" disabled={current==="running"}>{lang==="fa"?"تمرکز":"Focus"}</button><button aria-pressed="false" disabled={current==="running"}>{lang==="fa"?"استراحت":"Rest"}</button></div>
   <p className="natural-hint">{lang==="fa"?"وقتی زمان‌سنج متوقف است، مرحله را انتخاب کن.":"Choose a phase while the timer is stopped."}</p>
   <div className="natural-object"><NaturalHourglass progress={p} state={current}/></div>
   <div className="natural-count" dir="ltr">{current==="completed"?"00:00":current==="ready"?"25:00":"14:30"}</div>
   <p role="status">{({ready:{en:"Ready when you are",fa:"آمادهٔ شروع"},running:{en:"Session running",fa:"زمان‌سنج در حال اجراست"},paused:{en:"Paused",fa:"متوقف شده"},completed:{en:"Session complete",fa:"بازه تمام شد"}})[current][lang]}</p>
   <div className="natural-progress" role="progressbar" aria-label={lang==="fa"?"پیشرفت زمان‌سنج":"Timer progress"} aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${p}%`}}/></div>
   <div className="natural-actions"><button onClick={()=>setCurrent(current==="running"?"paused":"running")}>{current==="running"?(lang==="fa"?"توقف":"Pause"):current==="completed"?(lang==="fa"?"آماده‌سازی استراحت":"Prepare rest"):current==="paused"?(lang==="fa"?"ادامه":"Resume"):(lang==="fa"?"شروع":"Start")}</button><button onClick={()=>setCurrent("ready")}>{lang==="fa"?"بازنشانی":"Reset"}</button></div>
  </div><p className="natural-note">{lang==="fa"?"پیش‌نمایش طراحی: زمان و پیشرفت نمونه هستند.":"Design preview: time and progress are sample values."}</p>
 </section>)}</div></main>;
}
