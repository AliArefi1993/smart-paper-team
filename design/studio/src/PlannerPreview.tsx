import { useState } from "react";
import type { Language } from "./atlas-data";
import type { VariantKey } from "./variants";

type Copy = { en: string; fa: string };
type Section = { name: Copy; goal: Copy; note: Copy; minutes: number };

const copy = (language: Language, text: Copy) => text[language];
const sections: Section[] = [
  {
    name: { en: "Main", fa: "اصلی" },
    goal: { en: "Draft the first page", fa: "پیش‌نویس صفحه اول" },
    note: { en: "Start with the outline", fa: "از طرح کلی شروع کن" },
    minutes: 45,
  },
  {
    name: { en: "Second", fa: "دوم" },
    goal: { en: "Reply to important messages", fa: "پاسخ به پیام‌های مهم" },
    note: { en: "Keep replies brief", fa: "پاسخ‌ها کوتاه باشند" },
    minutes: 30,
  },
  {
    name: { en: "Learning", fa: "یادگیری" },
    goal: { en: "Read one chapter", fa: "خواندن یک فصل" },
    note: { en: "Write three takeaways", fa: "سه نکته یادداشت کن" },
    minutes: 20,
  },
  {
    name: { en: "Exercise", fa: "ورزش" },
    goal: { en: "Take a short walk", fa: "یک پیاده‌روی کوتاه" },
    note: { en: "", fa: "" },
    minutes: 0,
  },
];

function PlannerSection({
  section,
  index,
  language,
  sparse,
}: {
  section: Section;
  index: number;
  language: Language;
  sparse: boolean;
}) {
  const [minutes, setMinutes] = useState(sparse ? 0 : section.minutes);
  const name = copy(language, section.name);
  const value =
    language === "fa"
      ? new Intl.NumberFormat("fa-IR").format(minutes)
      : String(minutes);

  return (
    <section
      className={`planner-section planner-section-${index + 1}`}
      aria-label={name}
    >
      <div className="planner-section-top">
        <h5>{name}</h5>
        <span className="planner-total">
          {value} {copy(language, { en: "min", fa: "دقیقه" })}
        </span>
      </div>
      <label className="planner-label">
        <span>{copy(language, { en: "Minutes", fa: "دقیقه" })}</span>
        <input
          type="number"
          min="0"
          inputMode="numeric"
          value={minutes || ""}
          placeholder="0"
          onChange={(event) =>
            setMinutes(
              Math.max(0, Number.parseInt(event.target.value, 10) || 0),
            )
          }
        />
      </label>
      <div
        className="planner-quick-add"
        role="group"
        aria-label={copy(language, {
          en: `Adjust ${name} minutes`,
          fa: `تغییر دقیقه‌های ${name}`,
        })}
      >
        {[15, 30, 60].map((amount) => (
          <button
            type="button"
            key={amount}
            onClick={() => setMinutes((current) => current + amount)}
          >
            +
            {language === "fa"
              ? new Intl.NumberFormat("fa-IR").format(amount)
              : amount}
          </button>
        ))}
        <button type="button" onClick={() => setMinutes(0)}>
          0
        </button>
      </div>
      <label className="planner-label">
        <span>{copy(language, { en: "Goal", fa: "هدف" })}</span>
        <input
          defaultValue={sparse ? "" : copy(language, section.goal)}
          placeholder={copy(language, {
            en: "Goal for this section",
            fa: "هدف این بخش",
          })}
        />
      </label>
      <label className="planner-label">
        <span>{copy(language, { en: "Note", fa: "یادداشت" })}</span>
        <textarea
          rows={2}
          defaultValue={sparse ? "" : copy(language, section.note)}
          placeholder={copy(language, {
            en: "Add a short note",
            fa: "یادداشت کوتاه بنویسید",
          })}
        />
      </label>
    </section>
  );
}

export function PlannerPreview({
  language,
  variant,
}: {
  language: Language;
  variant: VariantKey;
}) {
  const sparse = variant === "sparse";
  const days =
    language === "fa"
      ? ["ش", "ی", "د", "س", "چ", "پ", "ج"]
      : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="planner-preview">
      <section className="box planner-week">
        <div className="row">
          <h4>{copy(language, { en: "Weeks", fa: "هفته‌ها" })}</h4>
          <span className="pill on">
            {copy(language, { en: "Current week", fa: "هفته جاری" })}
          </span>
        </div>
        <div className="planner-week-rail">
          <span>{copy(language, { en: "Previous", fa: "قبلی" })}</span>
          <strong>
            {copy(language, { en: "Sep 26–Oct 2", fa: "۴ تا ۱۰ مهر" })}
          </strong>
          <span>{copy(language, { en: "Next", fa: "بعدی" })}</span>
        </div>
      </section>

      <section className="box soft planner-week-goal">
        <h4>{copy(language, { en: "Week details", fa: "جزئیات هفته" })}</h4>
        <label className="planner-label">
          <span>{copy(language, { en: "Weekly goal", fa: "هدف هفته" })}</span>
          <textarea
            rows={2}
            defaultValue={
              sparse
                ? ""
                : copy(language, {
                    en: "Finish a focused writing session",
                    fa: "یک جلسه نوشتن متمرکز را به پایان برسان",
                  })
            }
          />
        </label>
        <label className="planner-label">
          <span>
            {copy(language, { en: "Weekly note", fa: "یادداشت هفته" })}
          </span>
          <textarea
            rows={2}
            defaultValue={
              sparse
                ? ""
                : copy(language, {
                    en: "Protect the morning for deep work.",
                    fa: "صبح را برای کار عمیق نگه دار.",
                  })
            }
          />
        </label>
      </section>

      <section className="box planner-day">
        <div className="row">
          <h4>{copy(language, { en: "Sunday", fa: "یکشنبه" })}</h4>
          <span className="pill on">
            {copy(language, { en: "Selected day", fa: "روز انتخاب‌شده" })}
          </span>
        </div>
        <div
          className="week"
          aria-label={copy(language, {
            en: "Days of the week",
            fa: "روزهای هفته",
          })}
        >
          {days.map((day, index) => (
            <span className={`pill ${index === 1 ? "on" : ""}`} key={index}>
              {day}
            </span>
          ))}
        </div>
        <label className="planner-label">
          <span>{copy(language, { en: "Day note", fa: "یادداشت روز" })}</span>
          <textarea
            rows={2}
            defaultValue={
              sparse
                ? ""
                : copy(language, {
                    en: "Keep the afternoon open for review.",
                    fa: "بعدازظهر را برای مرور خالی نگه دار.",
                  })
            }
          />
        </label>
      </section>

      <section className="box planner-schedule">
        <div className="row">
          <h4>
            {copy(language, { en: "Timed schedule", fa: "برنامه زمان‌دار" })}
          </h4>
          <button type="button" className="btn alt">
            {copy(language, { en: "Add entry", fa: "افزودن" })}
          </button>
        </div>
        {sparse ? (
          <p>
            {copy(language, {
              en: "No timed entries for Sunday yet.",
              fa: "هنوز برنامه زمان‌داری برای یکشنبه نیست.",
            })}
          </p>
        ) : (
          <div className="planner-entry">
            <strong dir="ltr">09:00–09:45</strong>
            <span>
              {copy(language, {
                en: "Plan the day · Main",
                fa: "برنامه‌ریزی روز · اصلی",
              })}
            </span>
          </div>
        )}
      </section>

      <section className="planner-sections">
        <div className="planner-sections-intro">
          <h4>
            {copy(language, { en: "Sunday’s sections", fa: "بخش‌های یکشنبه" })}
          </h4>
          <p>
            {copy(language, {
              en: "Each active section has its own minutes, goal, and note.",
              fa: "هر بخش فعال دقیقه، هدف و یادداشت جداگانه دارد.",
            })}
          </p>
        </div>
        {sections.map((section, index) => (
          <PlannerSection
            key={index}
            section={section}
            index={index}
            language={language}
            sparse={sparse}
          />
        ))}
      </section>

      <div className="planner-save">
        <button type="button" className="btn alt">
          {copy(language, { en: "Week templates", fa: "الگوهای هفته" })}
        </button>
        <button type="button" className="btn">
          {copy(language, { en: "Save week", fa: "ذخیره هفته" })}
        </button>
      </div>
    </div>
  );
}
