import { useLayoutEffect, useRef, useState } from "react";
import type { Language } from "./atlas-data";
import "./planner-day-collapse.css";

export type PlannerDayCollapseProps = {
  language: "both" | Language;
  width: "phone" | "wide";
  theme: "light" | "dark";
  start:
    | "selected"
    | "all-collapsed"
    | "unsaved"
    | "empty"
    | "loading"
    | "load-error"
    | "save-error";
};
type Copy = { en: string; fa: string };
const dayNames: Copy[] = [
  { en: "Saturday", fa: "شنبه" },
  { en: "Sunday", fa: "یکشنبه" },
  { en: "Monday", fa: "دوشنبه" },
  { en: "Tuesday", fa: "سه‌شنبه" },
  { en: "Wednesday", fa: "چهارشنبه" },
  { en: "Thursday", fa: "پنجشنبه" },
  { en: "Friday", fa: "جمعه" },
];
const sectionNames: Copy[] = [
  { en: "Main · writing and project review", fa: "اصلی · نوشتن و مرور پروژه" },
  { en: "Second", fa: "دوم" },
  { en: "Learning", fa: "یادگیری" },
  { en: "Exercise", fa: "ورزش" },
];
const longNote: Copy = {
  en: "Leave enough room to read the whole draft slowly. Review the first page, mark the ideas that need more explanation, and write down the next small step. If the afternoon changes, keep the review for tomorrow rather than rushing through it.",
  fa: "برای خواندن آرامِ تمام پیش‌نویس وقت کافی بگذارم. صفحه اول را مرور کنم، ایده‌هایی را که به توضیح بیشتری نیاز دارند مشخص کنم و گام کوچک بعدی را بنویسم. اگر برنامه بعدازظهر تغییر کرد، مرور را برای فردا نگه دارم و با عجله از آن نگذرم.",
};

function Week({
  language,
  width,
  theme,
  start,
}: Omit<PlannerDayCollapseProps, "language"> & { language: Language }) {
  const c = (en: string, fa: string) => (language === "fa" ? fa : en);
  const n = (value: number) =>
    new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en").format(value);
  const empty = start === "empty";
  const [loaded, setLoaded] = useState(
    start !== "loading" && start !== "load-error",
  );
  const [active, setActive] = useState(1);
  const [openDays, setOpenDays] = useState<number[]>(
    start === "all-collapsed"
      ? []
      : width === "wide"
        ? [0, 1, 2, 3, 4, 5, 6]
        : [1],
  );
  const [notes, setNotes] = useState(
    dayNames.map((_, i) => (empty || i === 6 ? "" : longNote[language])),
  );
  const [goals, setGoals] = useState(
    dayNames.map((_, i) =>
      empty || i === 6
        ? ""
        : c(
            "Review the complete draft and plan the next small step",
            "تمام پیش‌نویس را مرور کنم و گام کوچک بعدی را برنامه‌ریزی کنم",
          ),
    ),
  );
  const [minutes, setMinutes] = useState(
    dayNames.map((_, i) => (empty || i === 6 ? 0 : 45 + i * 15)),
  );
  const [openSections, setOpenSections] = useState<
    Record<number, number | undefined>
  >({ 1: start === "unsaved" || start === "save-error" ? 0 : undefined });
  const [dirtyDays, setDirtyDays] = useState<number[]>(
    start === "unsaved" || start === "save-error" ? [1] : [],
  );
  const [status, setStatus] = useState<"saved" | "dirty" | "saving" | "error">(
    start === "save-error" ? "error" : start === "unsaved" ? "dirty" : "saved",
  );
  const [announcement, setAnnouncement] = useState("");
  const [failSave, setFailSave] = useState(false);
  const revision = useRef(0);
  const headers = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionHeaders = useRef<Record<string, HTMLButtonElement | null>>({});
  const textFields = useRef<Record<string, HTMLTextAreaElement | null>>({});
  useLayoutEffect(() => {
    Object.values(textFields.current).forEach((field) => {
      if (!field || !field.getClientRects().length) return;
      field.style.height = "auto";
      field.style.height = `${Math.max(100, field.scrollHeight + 2)}px`;
    });
  }, [notes, goals, openDays, openSections]);
  const reveal = (index: number, fromRail = false) => {
    const opening = fromRail || !openDays.includes(index);
    setActive(index);
    setOpenDays((previous) =>
      opening
        ? width === "phone"
          ? [index]
          : [...new Set([...previous, index])]
        : previous.filter((day) => day !== index),
    );
    setAnnouncement(
      opening
        ? c(`${dayNames[index].en} shown`, `${dayNames[index].fa} باز شد`)
        : c(`${dayNames[index].en} minimized`, `${dayNames[index].fa} جمع شد`),
    );
    if (opening)
      requestAnimationFrame(() => {
        headers.current[index]?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
        if (fromRail) headers.current[index]?.focus({ preventScroll: true });
      });
  };
  const change = (index: number) => {
    revision.current += 1;
    setDirtyDays((previous) => [...new Set([...previous, index])]);
    if (status !== "saving") setStatus("dirty");
  };
  const save = () => {
    const snapshot = revision.current;
    setStatus("saving");
    window.setTimeout(() => {
      if (failSave) {
        setStatus("error");
        setFailSave(false);
        return;
      }
      if (revision.current === snapshot) {
        setStatus("saved");
        setDirtyDays([]);
      } else setStatus("dirty");
    }, 700);
  };
  const statusText = {
    saved: c("Saved", "ذخیره شد"),
    dirty: c("Changes not saved", "تغییرات ذخیره نشده"),
    saving: c("Saving…", "در حال ذخیره…"),
    error: c(
      "Could not save. Your edits are still here.",
      "ذخیره نشد. تغییرات شما هنوز اینجاست.",
    ),
  }[status];
  return (
    <div
      className={`dc-device dc-${width} dc-${theme}`}
      lang={language}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <div className="dc-scroll">
        <div className="dc-context">
          <div>
            <span>SMART PAPER</span>
            <h2>{c("Weekly planner", "برنامه‌ریز هفتگی")}</h2>
            <small>{c("This week · Oct 3–9", "این هفته · ۱۱ تا ۱۷ مهر")}</small>
          </div>
          <span className="dc-lang">{language.toUpperCase()}</span>
        </div>
        <div className="dc-content">
          <div className="dc-week-note">
            <strong>{c("Weekly goal", "هدف هفته")}</strong>
            <p>
              {c(
                "Finish a readable first draft with enough time left for review.",
                "پیش‌نویس اول را خوانا تمام کنم و برای مرور آن هم وقت کافی بگذارم.",
              )}
            </p>
          </div>
          {!loaded ? (
            <div className="dc-load" role="status">
              <p>
                {start === "load-error"
                  ? c("Could not load this week.", "این هفته بارگذاری نشد.")
                  : c("Loading this week…", "در حال بارگذاری این هفته…")}
              </p>
              <button onClick={() => setLoaded(true)}>
                {start === "load-error"
                  ? c("Try again", "تلاش دوباره")
                  : c("Preview loaded week", "نمایش هفته بارگذاری‌شده")}
              </button>
            </div>
          ) : (
            <>
              {width === "phone" && (
                <nav
                  className="dc-rail"
                  aria-label={c("Choose day", "انتخاب روز")}
                >
                  {dayNames.map((day, i) => (
                    <button
                      key={i}
                      aria-pressed={active === i}
                      onClick={() => reveal(i, true)}
                    >
                      {day[language]}
                      <small>
                        {n(minutes[i])} {c("min", "دقیقه")}
                      </small>
                    </button>
                  ))}
                </nav>
              )}
              <div className="dc-tools">
                <div>
                  <h3>{c("Days of this week", "روزهای این هفته")}</h3>
                  <small>
                    {c(
                      `${openDays.length} of 7 shown`,
                      `${n(openDays.length)} از ۷ روز باز است`,
                    )}
                  </small>
                </div>
                <button
                  aria-disabled={!openDays.length}
                  onClick={() => {
                    if (!openDays.length) return;
                    setOpenDays([]);
                    setAnnouncement(
                      c(
                        "All days minimized. Edits kept.",
                        "همه روزها جمع شدند. تغییرات حفظ شدند.",
                      ),
                    );
                  }}
                >
                  {c("Minimize all days", "جمع کردن همه روزها")}
                </button>
              </div>
              {!openDays.length && (
                <p className="dc-overview">
                  {c(
                    "Week overview. Choose a day to show its details.",
                    "نمای کلی هفته. برای دیدن جزئیات، یک روز را باز کنید.",
                  )}
                </p>
              )}
              <div className="dc-grid">
                {dayNames.map((day, i) => {
                  const isOpen = openDays.includes(i);
                  const dirty = dirtyDays.includes(i);
                  const bodyId = `dc-body-${language}-${i}`;
                  return (
                    <article
                      key={i}
                      className={`dc-day ${active === i ? "dc-selected" : ""}`}
                    >
                      <button
                        ref={(el) => {
                          headers.current[i] = el;
                        }}
                        className="dc-day-toggle"
                        onClick={() => reveal(i)}
                        aria-expanded={isOpen}
                        aria-controls={bodyId}
                        aria-describedby={`dc-summary-${language}-${i}`}
                        aria-label={`${day[language]} · ${isOpen ? c("Minimize day", "جمع کردن روز") : c("Show day", "باز کردن روز")}`}
                      >
                        <span id={`dc-summary-${language}-${i}`}>
                          <strong>{day[language]}</strong>
                          <small>
                            {c(`Oct ${i + 3}`, `${n(i + 11)} مهر`)}
                            {active === i
                              ? c(" · Selected", " · انتخاب‌شده")
                              : ""}
                          </small>
                          <small>
                            {n(minutes[i])} {c("min", "دقیقه")} ·{" "}
                            {empty || i === 6
                              ? c("No details yet", "هنوز جزئیاتی ندارد")
                              : c(
                                  "Has notes · 1 time entry",
                                  "یادداشت دارد · ۱ برنامه زمان‌دار",
                                )}
                          </small>
                          {dirty && (
                            <small className="dc-dirty">
                              {c("Changes not saved", "تغییرات ذخیره نشده")}
                            </small>
                          )}
                        </span>
                        <span className="dc-toggle-cue">
                          <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                          {isOpen
                            ? c("Minimize", "جمع کردن")
                            : c("Show", "باز کردن")}
                        </span>
                      </button>
                      <div id={bodyId} hidden={!isOpen} className="dc-body">
                        <label>
                          {c("Day note", "یادداشت روز")}
                          <textarea
                            ref={(el) => {
                              textFields.current[`note-${i}`] = el;
                            }}
                            rows={4}
                            value={notes[i]}
                            onChange={(e) => {
                              setNotes((prev) =>
                                prev.map((v, index) =>
                                  index === i ? e.target.value : v,
                                ),
                              );
                              change(i);
                            }}
                            placeholder={c(
                              "Something to remember today",
                              "چیزی برای یادآوری امروز",
                            )}
                          />
                        </label>
                        <div className="dc-schedule">
                          <strong>
                            {c("Timed schedule", "برنامه زمان‌دار")}
                          </strong>
                          <p>
                            {empty || i === 6
                              ? c(
                                  "No time entries yet",
                                  "هنوز برنامه زمان‌دار ندارد",
                                )
                              : c(
                                  "09:00–09:45 · Draft review",
                                  "09:00–09:45 · مرور پیش‌نویس",
                                )}
                          </p>
                        </div>
                        <h4>{c("Sections", "بخش‌ها")}</h4>
                        {sectionNames.map((name, s) => (
                          <div className="dc-section" key={s}>
                            <button
                              className="dc-section-toggle"
                              ref={(el) => {
                                sectionHeaders.current[`${i}-${s}`] = el;
                              }}
                              aria-expanded={openSections[i] === s}
                              aria-controls={`dc-section-${language}-${i}-${s}`}
                              onClick={() => {
                                const opening = openSections[i] !== s;
                                setOpenSections((prev) => ({
                                  ...prev,
                                  [i]: opening ? s : undefined,
                                }));
                                if (opening)
                                  requestAnimationFrame(() =>
                                    sectionHeaders.current[
                                      `${i}-${s}`
                                    ]?.scrollIntoView({
                                      block: "start",
                                      behavior: "auto",
                                    }),
                                  );
                              }}
                            >
                              <span>
                                <strong>{name[language]}</strong>
                                <small>
                                  {s === 0
                                    ? goals[i] ||
                                      c("Add a goal", "یک هدف بنویسید")
                                    : c("Add a goal", "یک هدف بنویسید")}
                                </small>
                              </span>
                              <span>
                                {s === 0 ? n(minutes[i]) : n(0)}{" "}
                                {c("min", "دقیقه")}
                              </span>
                            </button>
                            <div
                              id={`dc-section-${language}-${i}-${s}`}
                              hidden={openSections[i] !== s}
                              className="dc-section-form"
                            >
                              {s === 0 ? (
                                <>
                                  <label>
                                    {c("Minutes", "دقیقه")}
                                    <input
                                      type="number"
                                      min="0"
                                      value={minutes[i]}
                                      onChange={(e) => {
                                        setMinutes((prev) =>
                                          prev.map((v, index) =>
                                            index === i
                                              ? Math.max(
                                                  0,
                                                  Number(e.target.value),
                                                )
                                              : v,
                                          ),
                                        );
                                        change(i);
                                      }}
                                    />
                                  </label>
                                  <label>
                                    {c("Goal", "هدف")}
                                    <textarea
                                      ref={(el) => {
                                        textFields.current[`goal-${i}`] = el;
                                      }}
                                      rows={3}
                                      value={goals[i]}
                                      onChange={(e) => {
                                        setGoals((prev) =>
                                          prev.map((v, index) =>
                                            index === i ? e.target.value : v,
                                          ),
                                        );
                                        change(i);
                                      }}
                                    />
                                  </label>
                                </>
                              ) : (
                                <p>
                                  {c(
                                    "Existing section editor continues here.",
                                    "ویرایشگر فعلی بخش در اینجا ادامه دارد.",
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="dc-total">
                <strong>{c("Week total", "مجموع هفته")}</strong>
                <span>
                  {n(minutes.reduce((a, b) => a + b, 0))} {c("min", "دقیقه")}
                </span>
              </div>
            </>
          )}
          <p className="dc-live" role="status" aria-live="polite">
            {announcement}
          </p>
        </div>
      </div>
      <div className="dc-save">
        <span role="status" className={status === "error" ? "dc-error" : ""}>
          {statusText}
        </span>
        <button
          disabled={!loaded || status === "saving"}
          className="dc-primary"
          onClick={save}
        >
          {status === "error"
            ? c("Retry save", "تلاش دوباره")
            : c("Save week", "ذخیره هفته")}
        </button>
      </div>
      <div className="dc-test-controls">
        <label>
          <input
            type="checkbox"
            checked={failSave}
            onChange={(e) => setFailSave(e.target.checked)}
          />
          {c("Prototype: fail next save", "نمونه: خطا در ذخیره بعدی")}
        </label>
      </div>
    </div>
  );
}

export function PlannerDayCollapse(props: PlannerDayCollapseProps) {
  const languages: Language[] =
    props.language === "both" ? ["en", "fa"] : [props.language];
  return (
    <main className="dc-board">
      <div className="dc-board-intro">
        <h1>Planner · day minimization proposal</h1>
        <p>
          Editable design proposal. Each day keeps its summary; minimized days
          retain every draft. Illustrative local state; Save demonstrates
          feedback only.
        </p>
      </div>
      <div className={`dc-pair dc-pair-${props.width}`}>
        {languages.map((language) => (
          <Week
            {...props}
            key={`${language}-${props.width}-${props.start}-${props.theme}`}
            language={language}
          />
        ))}
      </div>
    </main>
  );
}
