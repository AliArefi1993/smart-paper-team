import { useState } from "react";
import "./planner-autosave.css";
export function AuditFollowups({
  language = "en",
  width = "phone",
  theme = "light",
  screen = "ideas",
  start = "branch",
}: {
  language?: "en" | "fa";
  width?: "phone" | "wide";
  theme?: "light" | "dark";
  screen?: "ideas" | "settings" | "finance";
  start?:
    | "new"
    | "edit"
    | "branch"
    | "missing"
    | "conflict"
    | "error"
    | "confirm"
    | "saved"
    | "invalid"
    | "loading"
    | "cleanup"
    | "read-error"
    | "note-error";
}) {
  const [state, setState] = useState(start);
  const [decision, setDecision] = useState(start === "confirm");
  const fa = language === "fa";
  const c = (en: string, f: string) => (fa ? f : en);
  const statuses = {
    new: c(
      "New draft restored. It is not a saved thought yet.",
      "پیش‌نویس تازه بازیابی شد. هنوز فکر ذخیره‌شده نیست.",
    ),
    edit: c(
      "Edit draft restored. Changes are not saved to the note yet.",
      "پیش‌نویس ویرایش بازیابی شد. تغییرات هنوز در یادداشت ذخیره نشده‌اند.",
    ),
    branch: c(
      "Branch draft restored. It is not a saved thought yet.",
      "پیش‌نویس شاخه بازیابی شد. هنوز فکر ذخیره‌شده نیست.",
    ),
    missing: c(
      "The original thought is missing. Your writing is retained. Choose Keep as new thought to save independently.",
      "فکر اصلی موجود نیست. نوشته حفظ شده است. برای ذخیره مستقل، «نگه‌داشتن به‌عنوان فکر تازه» را انتخاب کنید.",
    ),
    conflict: c(
      "The saved thought changed. Review both versions before choosing how to keep your writing.",
      "فکر ذخیره‌شده تغییر کرده است. پیش از انتخاب روش نگه‌داشتن نوشته، هر دو نسخه را بررسی کنید.",
    ),
    error: c(
      "Draft recovery could not be saved. Your writing is here, but may be lost after closing. Retry before leaving.",
      "پیش‌نویس برای بازیابی ذخیره نشد. نوشته اینجاست، اما ممکن است پس از بستن از دست برود. پیش از خروج دوباره تلاش کنید.",
    ),
    cleanup: c("Thought saved. Old draft cleanup failed; retry cleanup before leaving. Do not save again.", "فکر ذخیره شد. پاک‌کردن پیش‌نویس قبلی انجام نشد؛ پیش از خروج دوباره تلاش کنید. دوباره ذخیره نکنید."),
    "read-error": c("Could not read the stored draft. Existing draft was left untouched. Retry loading before writing.", "خواندن پیش‌نویس ذخیره‌شده ممکن نشد. پیش‌نویس قبلی دست‌نخورده است. پیش از نوشتن دوباره بارگذاری کنید."),
    "note-error": c("Thought could not be saved. Your writing is retained here. Retry saving.", "فکر ذخیره نشد. نوشته شما اینجا حفظ شده است. دوباره برای ذخیره تلاش کنید."),
    saved: c("Saved on this device", "روی همین دستگاه ذخیره شد"),
    invalid: c(
      "Name every section and keep at least one active.",
      "برای همه بخش‌ها نام بنویسید و دست‌کم یکی را فعال نگه دارید.",
    ),
    confirm: c("Unsaved writing", "نوشته ذخیره‌نشده"),
    loading: c("Loading…", "در حال بارگذاری…"),
  };
  return (
    <main
      className={`as-proposal ${theme}`}
      lang={language}
      dir={fa ? "rtl" : "ltr"}
      style={{ maxWidth: width === "phone" ? 390 : 1040 }}
    >
      <small>
        {c("PROPOSAL · AUDIT FOLLOWUPS", "پیشنهاد · پیگیری بازبینی")}
      </small>
      <header>
        <h1>
          {screen === "ideas"
            ? c("Idea Space", "فضای ایده‌ها")
            : screen === "settings"
              ? c("Settings", "تنظیمات")
              : c("Finance", "مالی")}
        </h1>
      </header>
      <p
        className={`as-status ${state === "error" || state === "invalid" ? "as-error" : ""}`}
        role={state === "error" || state === "invalid" ? "alert" : "status"}
      >
        {screen !== "ideas" && ["new", "edit", "branch", "confirm"].includes(state) ? c("Unsaved changes", "تغییرات ذخیره‌نشده") : statuses[state]}
      </p>
      {state !== "loading" && (
        <>
          {screen === "ideas" ? (
            <section>
              <h2>
                {state === "edit"
                  ? c("Edit thought", "ویرایش فکر")
                  : c("Write a thought", "یک فکر بنویسید")}
              </h2>
              {state === "branch" && (
                <p>
                  {c(
                    "Branch from: Make room for slow reading and reflection.",
                    "شاخه‌ای از: برای آرام خواندن و تأمل جا باز کنم.",
                  )}
                </p>
              )}
              {state === "conflict" && <aside><h3>{c("Latest saved thought", "آخرین فکر ذخیره‌شده")}</h3><p>{c("A newer reflection: read slowly and leave space for a different answer.", "تأمل تازه‌تر: آرام بخوانم و برای پاسخی متفاوت جا باز کنم.")}</p></aside>}
              <label>
                {c("Your thought", "فکر شما")}
                <textarea
                  rows={6}
                  defaultValue={c(
                    "Return to this thought tomorrow: take a long walk, read one page slowly, and write what remains unclear before moving on.",
                    "فردا به این فکر برگردم: یک پیاده‌روی طولانی، خواندن آرام یک صفحه و نوشتن چیزهایی که هنوز روشن نیست پیش از ادامه دادن.",
                  )}
                />
              </label>
              <div className="as-row">
                <button
                  className="as-primary"
                  onClick={() => setState("saved")}
                >
                  {state === "missing" || state === "conflict"
                    ? c("Keep as new thought", "نگه‌داشتن به‌عنوان فکر تازه")
                    : state === "cleanup" ? c("Retry cleanup", "تلاش دوباره برای پاک‌کردن")
                    : state === "read-error" ? c("Retry loading", "بارگذاری دوباره")
                    : state === "edit"
                    ? c("Save changes", "ذخیره تغییرات")
                    : c("Keep thought", "نگه‌داشتن فکر")}
                </button>
                <button onClick={() => setDecision(true)}>
                  {c("Cancel", "انصراف")}
                </button>
                <button onClick={() => setDecision(true)}>
                  {c("Edit another thought", "ویرایش فکر دیگر")}
                </button>
                <button onClick={() => setDecision(true)}>
                  {c("Branch", "شاخه تازه")}
                </button>
                {state === "error" && (
                  <button onClick={() => setState("branch")}>
                    {c(
                      "Retry draft recovery",
                      "تلاش دوباره برای بازیابی پیش‌نویس",
                    )}
                  </button>
                )}
              </div>
            </section>
          ) : screen === "settings" ? (
            <>
              {Array.from({ length: 10 }, (_, i) => (
                <section key={i}>
                  <label>
                    {c(`Section ${i + 1}`, `بخش ${i + 1}`)}
                    <input
                      defaultValue={c(
                        "Reading, reflection and a small next step",
                        "مطالعه، تأمل و یک گام کوچک بعدی",
                      )}
                    />
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked
                      style={{ width: 24, marginInlineEnd: 12 }}
                    />
                    {c("Active", "فعال")}
                  </label>
                </section>
              ))}
              <section>
                <h2>{c("Morning reminder", "یادآوری صبح")}</h2>
                <p>
                  {c(
                    "Existing permission and time controls remain here.",
                    "کنترل‌های فعلی مجوز اعلان و زمان اینجا باقی می‌مانند.",
                  )}
                </p>
              </section>
              <footer style={{ flexWrap: "wrap" }}>
                <span>
                  {state === "saved"
                    ? c("Saved", "ذخیره شد")
                    : c("Unsaved settings", "تنظیمات ذخیره‌نشده")}
                </span>
                <button
                  className="as-primary"
                  disabled={false}
                  onClick={() => setState("saved")}
                >
                  {c("Save settings", "ذخیره تنظیمات")}
                </button>
              </footer>
            </>
          ) : (
            <section>
              <h2>{c("Yearly goal", "هدف سالانه")}</h2>
              <label>
                {c("Amount", "مبلغ")}
                <input defaultValue="120000" inputMode="decimal" />
              </label>
              <button className="as-primary" onClick={() => setState("saved")}>
                {c("Save goal", "ذخیره هدف")}
              </button>
              <h2>{c("Income entries", "درآمدها")}</h2>
              <p>
                {c(
                  "Project work · September 20 · 2500",
                  "کار پروژه‌ای · ۲۰ سپتامبر · ۲۵۰۰",
                )}
              </p>
              <button onClick={() => setDecision(true)}>
                {c("Delete", "حذف")}
              </button>
            </section>
          )}
          {decision && (
            <section role="dialog" aria-labelledby="audit-decision">
              <h2 id="audit-decision">
                {screen === "finance"
                  ? c("Delete this income entry?", "این درآمد حذف شود؟")
                  : c(
                      "Discard unsaved writing?",
                      "نوشته ذخیره‌نشده کنار گذاشته شود؟",
                    )}
              </h2>
              <p>
                {screen === "finance"
                  ? c(
                      "This entry will be removed. This cannot be undone.",
                      "این درآمد حذف می‌شود. این کار قابل بازگشت نیست.",
                    )
                  : c(
                      "Continuing discards current writing. Keep editing to save it first.",
                      "ادامه دادن نوشته فعلی را کنار می‌گذارد. برای ذخیره، ابتدا ویرایش را ادامه دهید.",
                    )}
              </p>
              <div className="as-row">
                <button onClick={() => setDecision(false)}>
                  {screen === "finance"
                    ? c("Cancel", "انصراف")
                    : c("Keep editing", "ادامه ویرایش")}
                </button>
                <button
                  onClick={() => {
                    setDecision(false);
                    setState("new");
                  }}
                >
                  {screen === "finance"
                    ? c("Delete entry", "حذف درآمد")
                    : c("Discard and continue", "کنار گذاشتن و ادامه")}
                </button>
              </div>
              <small>
                {c(
                  "Layout example; production uses existing native confirmation.",
                  "نمونه چیدمان؛ محصول از تأیید بومی فعلی استفاده می‌کند.",
                )}
              </small>
            </section>
          )}
        </>
      )}
    </main>
  );
}
