import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Language } from "./atlas-data";

export type PlannerCalmProps = {
  language: "both" | Language;
  start: "overview" | "main" | "last" | "long" | "sparse" | "unsaved" | "error";
};

type Text = { en: string; fa: string };
type Field = "goal" | "note";
const t = (language: Language, text: Text) => text[language];
const formatMinutes = (language: Language, minutes: number) =>
  language === "fa"
    ? new Intl.NumberFormat("fa-IR").format(minutes)
    : String(minutes);

const sectionNames: Text[] = [
  { en: "Main", fa: "اصلی" },
  { en: "Second", fa: "دوم" },
  { en: "Learning", fa: "یادگیری" },
  { en: "Exercise", fa: "ورزش" },
];
const sampleGoals: Text[] = [
  { en: "Draft the first page", fa: "پیش‌نویس صفحه اول را بنویس" },
  { en: "Reply to important messages", fa: "به پیام‌های مهم پاسخ بده" },
  { en: "Read one chapter", fa: "یک فصل بخوان" },
  { en: "Take a short walk", fa: "یک پیاده‌روی کوتاه انجام بده" },
];
const sampleNotes: Text[] = [
  {
    en: "Start with the outline, then write without editing.",
    fa: "از طرح کلی شروع کن و بعد بدون ویرایش بنویس.",
  },
  { en: "Keep replies brief.", fa: "پاسخ‌ها را کوتاه نگه دار." },
  { en: "Write down three useful ideas.", fa: "سه ایده مفید را یادداشت کن." },
  { en: "", fa: "" },
];
const longNotes: Text = {
  en: "I want this writing session to feel unhurried. Start with the outline, then write the first page without stopping to polish every sentence. If a new idea appears, leave a short marker and keep moving. After the session, read the whole page once and write down what should happen next. The aim is steady progress, not a perfect draft.",
  fa: "می‌خواهم این جلسه نوشتن آرام و بدون شتاب باشد. از طرح کلی شروع کنم و بعد صفحه اول را بدون توقف برای ویرایش هر جمله بنویسم. اگر ایده تازه‌ای آمد، فقط نشانه کوتاهی بگذارم و ادامه بدهم. پس از پایان، یک بار کل صفحه را بخوانم و گام بعدی را یادداشت کنم. هدف، پیشرفت پیوسته است نه پیش‌نویس بی‌نقص.",
};

function GrowingField({
  label,
  value,
  placeholder,
  onChange,
  onExpand,
  language,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onExpand?: (trigger: HTMLButtonElement) => void;
  language: Language;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.max(86, textarea.scrollHeight)}px`;
  }, [value]);

  return (
    <div className="calm-field">
      <div className="calm-field-head">
        <label>
          {label}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(event.target.value)
            }
            placeholder={placeholder}
            rows={2}
          />
        </label>
      </div>
      {onExpand && (
        <button
          type="button"
          className="calm-text-action"
          onClick={(event) => onExpand(event.currentTarget)}
        >
          {t(language, { en: "Open writing view", fa: "باز کردن نمای نوشتن" })}
        </button>
      )}
    </div>
  );
}

function PlannerPhone({
  language,
  start,
}: {
  language: Language;
  start: PlannerCalmProps["start"];
}) {
  const sparse = start === "sparse";
  const [openSection, setOpenSection] = useState<number | null>(
    start === "main" ||
      start === "long" ||
      start === "unsaved" ||
      start === "error"
      ? 0
      : start === "last"
        ? 3
        : null,
  );
  const [minutes, setMinutes] = useState(
    sparse ? [0, 0, 0, 0] : [45, 30, 20, 0],
  );
  const [goals, setGoals] = useState(
    sectionNames.map((_, index) =>
      sparse ? "" : t(language, sampleGoals[index]),
    ),
  );
  const [notes, setNotes] = useState(
    sectionNames.map((_, index) =>
      sparse
        ? ""
        : start === "long" && index === 0
          ? t(language, longNotes)
          : t(language, sampleNotes[index]),
    ),
  );
  const [weekGoal, setWeekGoal] = useState(
    sparse
      ? ""
      : t(language, {
          en: "Finish a focused writing session",
          fa: "یک جلسه نوشتن متمرکز را به پایان برسان",
        }),
  );
  const [dayNote, setDayNote] = useState(
    sparse
      ? ""
      : t(language, {
          en: "Leave the afternoon open for review.",
          fa: "بعدازظهر را برای مرور خالی نگه دار.",
        }),
  );
  const [saveState, setSaveState] = useState<
    "saved" | "unsaved" | "saving" | "error"
  >(start === "unsaved" ? "unsaved" : start === "error" ? "error" : "saved");
  const [editor, setEditor] = useState<{
    section: number;
    field: Field;
  } | null>(start === "long" ? { section: 0, field: "note" } : null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const headingRefs = useRef<Array<HTMLElement | null>>([]);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const editRevisionRef = useRef(0);
  const saveTimerRef = useRef<number | null>(null);

  const moveSectionIntoView = (index: number, smooth: boolean) => {
    const scroller = scrollRef.current;
    const section = sectionRefs.current[index];
    if (!scroller || !section) return;
    const top =
      scroller.scrollTop +
      section.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top -
      90;
    scroller.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
    headingRefs.current[index]?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (openSection === null) return;
    const frame = requestAnimationFrame(() =>
      moveSectionIntoView(openSection, false),
    );
    return () => cancelAnimationFrame(frame);
    // The initial story state should place the open form in view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editor) editorRef.current?.focus();
  }, [editor]);

  useEffect(
    () => () => {
      if (saveTimerRef.current !== null)
        window.clearTimeout(saveTimerRef.current);
    },
    [],
  );

  function markChanged() {
    editRevisionRef.current += 1;
    setSaveState("unsaved");
  }

  function open(index: number) {
    const next = openSection === index ? null : index;
    setOpenSection(next);
    if (next !== null)
      requestAnimationFrame(() =>
        moveSectionIntoView(
          next,
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        ),
      );
  }

  function changeMinutes(index: number, value: number) {
    setMinutes((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? Math.max(0, value) : item,
      ),
    );
    markChanged();
  }

  function changeText(field: Field, index: number, value: string) {
    const setter = field === "goal" ? setGoals : setNotes;
    setter((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
    markChanged();
  }

  function openEditor(
    section: number,
    field: Field,
    trigger: HTMLButtonElement,
  ) {
    returnFocusRef.current = trigger;
    setEditor({ section, field });
  }

  function closeEditor() {
    setEditor(null);
    requestAnimationFrame(() => {
      if (openSection !== null) moveSectionIntoView(openSection, false);
      returnFocusRef.current?.focus({ preventScroll: true });
    });
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor();
    } else if (event.key === "Tab") {
      const atDone = document.activeElement === doneRef.current;
      const atText = document.activeElement === editorRef.current;
      if ((event.shiftKey && atDone) || (!event.shiftKey && atText)) {
        event.preventDefault();
        (atDone ? editorRef : doneRef).current?.focus();
      }
    }
  }

  function save() {
    const savingRevision = editRevisionRef.current;
    if (saveTimerRef.current !== null)
      window.clearTimeout(saveTimerRef.current);
    setSaveState("saving");
    saveTimerRef.current = window.setTimeout(() => {
      setSaveState(
        editRevisionRef.current === savingRevision ? "saved" : "unsaved",
      );
      saveTimerRef.current = null;
    }, 450);
  }

  const status =
    saveState === "unsaved"
      ? t(language, { en: "Changes not saved", fa: "تغییرات ذخیره نشده" })
      : saveState === "error"
        ? t(language, {
            en: "Couldn’t save. Try again.",
            fa: "ذخیره نشد. دوباره تلاش کنید.",
          })
        : saveState === "saving"
          ? t(language, { en: "Saving…", fa: "در حال ذخیره…" })
          : t(language, { en: "Saved", fa: "ذخیره شد" });

  return (
    <div
      className="calm-phone"
      lang={language}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <div
        className="calm-scroll"
        ref={scrollRef}
        aria-hidden={Boolean(editor)}
      >
        <header className="calm-topbar">
          <div>
            <span>Smart Paper</span>
            <strong>{t(language, { en: "Sunday", fa: "یکشنبه" })}</strong>
            <small>
              {t(language, {
                en: "This week · Sep 26–Oct 2",
                fa: "این هفته · ۴ تا ۱۰ مهر",
              })}
            </small>
          </div>
          <span className="calm-language">
            {language === "fa" ? "FA" : "EN"}
          </span>
        </header>

        <div className="calm-content">
          <div className="calm-intro">
            <p>
              {t(language, { en: "ONE DAY AT A TIME", fa: "هر روز، یک گام" })}
            </p>
            <h2>
              {t(language, {
                en: "Make room for what matters",
                fa: "برای آنچه مهم است جا باز کنید",
              })}
            </h2>
          </div>

          <section className="calm-week-card">
            <div className="calm-card-head">
              <h3>{t(language, { en: "Week intention", fa: "هدف هفته" })}</h3>
              <span>
                {t(language, { en: "Your direction", fa: "مسیر شما" })}
              </span>
            </div>
            <GrowingField
              label={t(language, { en: "Weekly goal", fa: "هدف هفته" })}
              value={weekGoal}
              placeholder={t(language, {
                en: "What matters this week?",
                fa: "این هفته چه چیزی مهم است؟",
              })}
              onChange={(value) => {
                setWeekGoal(value);
                markChanged();
              }}
              language={language}
            />
          </section>

          <section className="calm-day-card">
            <h3>{t(language, { en: "Day note", fa: "یادداشت روز" })}</h3>
            <GrowingField
              label={t(language, {
                en: "Something to remember today",
                fa: "چیزی برای یادآوری امروز",
              })}
              value={dayNote}
              placeholder={t(language, {
                en: "A small note for today",
                fa: "یادداشتی کوتاه برای امروز",
              })}
              onChange={(value) => {
                setDayNote(value);
                markChanged();
              }}
              language={language}
            />
          </section>

          <div className="calm-section-intro">
            <h3>{t(language, { en: "Your sections", fa: "بخش‌های شما" })}</h3>
            <p>
              {t(language, {
                en: "Open one section, work at your own pace.",
                fa: "یک بخش را باز کنید و با آرامش پیش بروید.",
              })}
            </p>
          </div>

          <div className="calm-section-list">
            {sectionNames.map((sectionName, index) => {
              const expanded = openSection === index;
              return (
                <section
                  className={`calm-section ${expanded ? "is-open" : ""}`}
                  key={index}
                  ref={(element) => {
                    sectionRefs.current[index] = element;
                  }}
                >
                  <button
                    type="button"
                    className="calm-section-toggle"
                    aria-expanded={expanded}
                    aria-controls={`calm-section-${language}-${index}`}
                    onClick={() => open(index)}
                  >
                    <span className="calm-section-identity">
                      <span className="calm-section-number">
                        {formatMinutes(language, index + 1)}
                      </span>
                      <span>
                        <strong
                          ref={(element) => {
                            headingRefs.current[index] = element;
                          }}
                          tabIndex={-1}
                        >
                          {t(language, sectionName)}
                        </strong>
                        <small>
                          {goals[index] ||
                            t(language, {
                              en: "Add a goal when ready",
                              fa: "هر وقت آماده بودید هدفی بنویسید",
                            })}
                        </small>
                      </span>
                    </span>
                    <span className="calm-section-meta">
                      <b>
                        {formatMinutes(language, minutes[index])}{" "}
                        {t(language, { en: "min", fa: "دقیقه" })}
                      </b>
                      <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </span>
                  </button>
                  {expanded && (
                    <div
                      className="calm-section-body"
                      id={`calm-section-${language}-${index}`}
                    >
                      <div className="calm-minute-head">
                        <h4>
                          {t(language, {
                            en: "Time for this section",
                            fa: "زمان این بخش",
                          })}
                        </h4>
                        <p>
                          {t(language, {
                            en: "Minutes are separate from timed schedule entries.",
                            fa: "دقیقه‌ها از برنامه‌های زمان‌دار جدا هستند.",
                          })}
                        </p>
                      </div>
                      <label className="calm-minutes">
                        <span>
                          {t(language, { en: "Minutes", fa: "دقیقه" })}
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={minutes[index] || ""}
                          placeholder="0"
                          onChange={(event) =>
                            changeMinutes(
                              index,
                              Number.parseInt(event.target.value, 10) || 0,
                            )
                          }
                        />
                      </label>
                      <div
                        className="calm-chips"
                        role="group"
                        aria-label={t(language, {
                          en: `Adjust ${t(language, sectionName)} minutes`,
                          fa: `تغییر دقیقه‌های ${t(language, sectionName)}`,
                        })}
                      >
                        {[15, 30, 60].map((amount) => (
                          <button
                            type="button"
                            key={amount}
                            onClick={() =>
                              changeMinutes(index, minutes[index] + amount)
                            }
                          >
                            +{formatMinutes(language, amount)}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => changeMinutes(index, 0)}
                        >
                          {t(language, { en: "Reset", fa: "صفر" })}
                        </button>
                      </div>
                      <GrowingField
                        label={t(language, { en: "Goal", fa: "هدف" })}
                        value={goals[index]}
                        placeholder={t(language, {
                          en: "What would feel meaningful here?",
                          fa: "چه کاری در این بخش ارزشمند است؟",
                        })}
                        onChange={(value) => changeText("goal", index, value)}
                        onExpand={(trigger) =>
                          openEditor(index, "goal", trigger)
                        }
                        language={language}
                      />
                      <GrowingField
                        label={t(language, { en: "Note", fa: "یادداشت" })}
                        value={notes[index]}
                        placeholder={t(language, {
                          en: "Write freely here",
                          fa: "اینجا آزادانه بنویسید",
                        })}
                        onChange={(value) => changeText("note", index, value)}
                        onExpand={(trigger) =>
                          openEditor(index, "note", trigger)
                        }
                        language={language}
                      />
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          <section className="calm-schedule">
            <div>
              <h3>
                {t(language, { en: "Timed schedule", fa: "برنامه زمان‌دار" })}
              </h3>
              <p>
                {t(language, {
                  en: "Appointments and exact times live here.",
                  fa: "قرارها و زمان‌های دقیق اینجا هستند.",
                })}
              </p>
            </div>
            <span>
              {sparse
                ? t(language, {
                    en: "No entries yet",
                    fa: "هنوز برنامه‌ای نیست",
                  })
                : "09:00–09:45 · " +
                  t(language, { en: "Plan the day", fa: "برنامه‌ریزی روز" })}
            </span>
          </section>
        </div>
      </div>

      <div className="calm-savebar" aria-hidden={Boolean(editor)}>
        <span className={`calm-save-status ${saveState}`} role="status">
          {status}
        </span>
        <button type="button" onClick={save} disabled={saveState === "saving"}>
          {saveState === "error"
            ? t(language, { en: "Try again", fa: "تلاش دوباره" })
            : t(language, { en: "Save week", fa: "ذخیره هفته" })}
        </button>
      </div>

      {editor && (
        <div
          className="calm-editor"
          role="dialog"
          aria-modal="true"
          aria-label={`${t(language, sectionNames[editor.section])} · ${editor.field === "goal" ? t(language, { en: "Goal", fa: "هدف" }) : t(language, { en: "Note", fa: "یادداشت" })}`}
          onKeyDown={handleEditorKeyDown}
        >
          <div className="calm-editor-top">
            <div>
              <small>{t(language, sectionNames[editor.section])}</small>
              <h3>
                {editor.field === "goal"
                  ? t(language, {
                      en: "Write your goal",
                      fa: "هدف خود را بنویسید",
                    })
                  : t(language, {
                      en: "Write your note",
                      fa: "یادداشت خود را بنویسید",
                    })}
              </h3>
            </div>
            <button type="button" ref={doneRef} onClick={closeEditor}>
              {t(language, { en: "Done", fa: "تمام" })}
            </button>
          </div>
          <p>
            {t(language, {
              en: "Take the space you need. Your text stays with this section.",
              fa: "هرقدر نیاز دارید بنویسید. متن در همین بخش می‌ماند.",
            })}
          </p>
          <textarea
            ref={editorRef}
            value={
              editor.field === "goal"
                ? goals[editor.section]
                : notes[editor.section]
            }
            onChange={(event) =>
              changeText(editor.field, editor.section, event.target.value)
            }
          />
          <div className="calm-editor-bottom">
            {t(language, {
              en: "Changes not saved until you save the week",
              fa: "تغییرات تا ذخیره هفته ثبت نمی‌شوند",
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function PlannerCalm({ language, start }: PlannerCalmProps) {
  const languages: Language[] = language === "both" ? ["en", "fa"] : [language];
  return (
    <main className="calm-board">
      <div className="calm-board-head">
        <p>SMART PAPER · UX PROPOSAL</p>
        <h1>Calm Planner editing</h1>
        <span>
          Open a section without losing your place. Give every thought room to
          grow. Save with confidence.
        </span>
      </div>
      <div className="calm-pair">
        {languages.map((item) => (
          <div key={`${item}-${start}`}>
            <div className="studio-frame-label">
              {item === "fa" ? "فارسی · راست‌به‌چپ" : "English · left-to-right"}{" "}
              · 390px phone
            </div>
            <PlannerPhone language={item} start={start} />
          </div>
        ))}
      </div>
      <p className="calm-disclaimer">
        Shipped interaction reference (2026.10.2), retained with illustrative
        content. The Save button demonstrates feedback without persisting data.
        Current day disclosure and dark roles are covered by the day minimization
        stories; this original reference is not a complete current app screen.
        <br />
        مرجع تعامل منتشرشده با محتوای نمایشی؛ ذخیره فقط بازخورد را نشان می‌دهد
        و داده‌ای ثبت نمی‌کند. جمع کردن روزها و رنگ‌های تیره در نمونه‌های
        مربوط به جمع کردن روزها قرار دارند.
      </p>
    </main>
  );
}
