import { useState } from "react";
import "./planner-autosave.css";
export function PlannerAutosave({
  language = "en",
  width = "phone",
  theme = "light",
  start = "saved",
}: {
  language?: "en" | "fa";
  width?: "phone" | "wide";
  theme?: "light" | "dark";
  start?:
    | "dirty"
    | "saving"
    | "saved"
    | "error"
    | "loading"
    | "empty"
    | "writing"
    | "schedule";
}) {
  const [state, setState] = useState(start);
  const fa = language === "fa";
  const c = (en: string, faText: string) => (fa ? faText : en);
  const statuses = {
    dirty: c("Changes pending…", "تغییرات در انتظار ذخیره…"),
    saving: c("Saving on this device…", "در حال ذخیره روی این دستگاه…"),
    error: c(
      "Couldn’t save. Your changes are still here.",
      "ذخیره نشد. تغییرات شما هنوز اینجاست.",
    ),
    loading: c("Loading week…", "در حال بارگذاری هفته…"),
  };
  return (
    <main
      className={`as-proposal ${theme}`}
      lang={language}
      dir={fa ? "rtl" : "ltr"}
      style={{ maxWidth: width === "phone" ? 390 : 1040 }}
    >
      <small>
        {c("PROPOSAL · ANDROID LOCAL PLANNER", "پیشنهاد · برنامه محلی اندروید")}
      </small>
      <header>
        <h1>{c("This week", "این هفته")}</h1>
        <p>{c("October 3–9 · Current week", "۱۱ تا ۱۷ مهر · هفته جاری")}</p>
        <div className="as-row">
          <button>{c("Previous week", "هفته قبل")}</button>
          <button>{c("Week templates", "الگوهای هفته")}</button>
        </div>
      </header>
      <div
        className={`as-status ${state === "error" ? "as-error" : ""}`}
        role={state === "error" ? "alert" : "status"}
      >
        <span aria-hidden="true">
          {state === "error" ? "!" : state === "saved" ? "✓" : "·"}
        </span>
        <span>
          {state in statuses
            ? statuses[state as keyof typeof statuses]
            : state === "empty"
              ? c(
                  "Changes save automatically on this device.",
                  "تغییرات به‌طور خودکار روی همین دستگاه ذخیره می‌شوند.",
                )
              : c("Saved on this device", "روی همین دستگاه ذخیره شد")}
        </span>
        {state === "error" && (
          <button onClick={() => setState("saved")}>
            {c("Retry", "تلاش دوباره")}
          </button>
        )}
      </div>
      {state === "loading" ? (
        <section>
          {c("Waiting for this week’s plan.", "منتظر برنامه این هفته هستیم.")}
        </section>
      ) : (
        <>
          <section>
            <h2>
              {start === "writing"
                ? c("Day note", "یادداشت روز")
                : c("Week goal", "هدف هفته")}
            </h2>
            <label>
              {c("Your writing", "نوشته شما")}
              <textarea
                rows={start === "writing" ? 12 : 5}
                defaultValue={
                  start === "empty"
                    ? ""
                    : c(
                        "Make room for writing today. Review the first page slowly, mark the ideas that need more explanation, and write down the next small step.",
                        "امروز برای نوشتن وقت بگذارم. صفحه اول را آرام مرور کنم، ایده‌هایی را که به توضیح بیشتری نیاز دارند مشخص کنم و گام کوچک بعدی را بنویسم.",
                      )
                }
                onChange={() => setState("dirty")}
              />
            </label>
            <p className="as-hint">
              {c(
                "Changes save automatically on this device.",
                "تغییرات به‌طور خودکار روی همین دستگاه ذخیره می‌شوند.",
              )}
            </p>
          </section>
          {start !== "writing" && (
            <section>
              <h2>{c("Tuesday", "سه‌شنبه")}</h2>
              <p>{c("No timed events yet.", "هنوز رویداد زمان‌داری نیست.")}</p>
              <button onClick={() => setState("schedule")}>
                {c("Add event", "افزودن رویداد")}
              </button>
            </section>
          )}
          {state === "schedule" && (
            <section>
              <h2>{c("Add event", "افزودن رویداد")}</h2>
              <label>
                {c("Title", "عنوان")}
                <input defaultValue={c("Writing session", "جلسه نوشتن")} />
              </label>
              <p dir="ltr">09:00 → 09:30</p>
              <div className="as-row">
                <button onClick={() => setState("saved")}>
                  {c("Cancel", "انصراف")}
                </button>
                <button
                  className="as-primary"
                  onClick={() => setState("dirty")}
                >
                  {c("Add event", "افزودن رویداد")}
                </button>
              </div>
              <p>
                {c(
                  "Adds the event to the week, then saves automatically.",
                  "رویداد به هفته اضافه و سپس خودکار ذخیره می‌شود.",
                )}
              </p>
            </section>
          )}
          <footer>
            <span>{c("Move when ready", "هر وقت آماده‌اید ادامه دهید")}</span>
            <button>{c("Next day", "روز بعد")}</button>
          </footer>
        </>
      )}
      <details>
        <summary>{c("Prototype state controls", "کنترل وضعیت نمونه")}</summary>
        {(["dirty", "saving", "saved", "error", "loading"] as const).map(
          (s) => (
            <button key={s} onClick={() => setState(s)}>
              {s}
            </button>
          ),
        )}
      </details>
    </main>
  );
}
