import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
const states = [
  "planner",
  "empty",
  "loading",
  "save-error",
  "editor",
  "report",
  "invalid",
  "copy-error",
  "cancelled",
  "changed",
  "locked",
] as const;
type State = (typeof states)[number];
type Props = {
  language: "en" | "fa";
  width: "phone" | "wide";
  theme: "light" | "dark";
  state: State;
  largeText: boolean;
  week: "past" | "current" | "future";
};
function PlannerAiShortcut({
  language,
  width,
  theme,
  state: initial,
  largeText,
  week,
}: Props) {
  const [state, setState] = useState(initial);
  const [recovered, setRecovered] = useState(false);
  const [selectionApproved, setSelectionApproved] = useState(false);
  const [message, setMessage] = useState("");
  const fa = language === "fa";
  const c = (en: string, faText: string) => (fa ? faText : en);
  const planner = [
    "planner",
    "empty",
    "loading",
    "save-error",
    "editor",
  ].includes(state);
  const blocked = ["loading", "save-error", "editor"].includes(state);
  const invalid = state === "invalid" && !recovered;
  const dates =
    week === "past"
      ? ["2026-10-03", "2026-10-09"]
      : week === "future"
        ? ["2026-10-17", "2026-10-23"]
        : ["2026-10-10", "2026-10-16"];
  const help =
    state === "save-error"
      ? c(
          "Save failed. Retry saving before preparing a report.",
          "ذخیره انجام نشد. پیش از آماده‌سازی گزارش، دوباره ذخیره کنید.",
        )
      : state === "editor"
        ? c(
            "Finish editing before preparing a report.",
            "پیش از آماده‌سازی گزارش، ویرایش را تمام کنید.",
          )
        : c("Loading the viewed week…", "در حال خواندن هفتهٔ نمایش‌داده‌شده…");
  const awaitingChoice = recovered && !selectionApproved;
  const reportBlocked =
    invalid || awaitingChoice || ["locked", "empty", "loading"].includes(state);
  return (
    <article
      className={`planner-ai-shortcut phone ${width === "wide" ? "wide" : ""} ${theme === "dark" ? "theme-dark" : ""}`}
      lang={language}
      dir={fa ? "rtl" : "ltr"}
      style={{
        width: "100%",
        maxWidth: width === "wide" ? 960 : 390,
        minHeight: 0,
        padding: 16,
        fontSize: largeText ? 22 : 15,
      }}
    >
      <style>{`.planner-ai-shortcut .btn { min-height: 48px; font-size: inherit; } .planner-ai-shortcut .field { font-size: inherit; } .planner-ai-shortcut button:disabled { opacity: .6; cursor: default; } .planner-ai-shortcut bdi { display: block; } .planner-ai-shortcut :focus-visible { outline: 3px solid #a66a24; outline-offset: 3px; } .planner-ai-shortcut.theme-dark :focus-visible { outline-color: #f5c66f; }`}</style>
      <p className="eyebrow">
        {c(
          "Proposal · illustrative saved data",
          "پیشنهاد · دادهٔ ذخیره‌شدهٔ نمونه",
        )}
      </p>
      <h1 style={{ fontSize: "1.8em" }}>
        {planner
          ? c("Planner", "برنامه")
          : c("Share with AI", "اشتراک‌گذاری با هوش مصنوعی")}
      </h1>
      {planner ? (
        <>
          <section className="box">
            <h2>{c("Viewed week", "هفتهٔ نمایش‌داده‌شده")}</h2>
            <p>
              {week === "past"
                ? c("Past week", "هفتهٔ گذشته")
                : week === "future"
                  ? c("Future week", "هفتهٔ آینده")
                  : c("Current week", "هفتهٔ جاری")}{" "}
              · <bdi dir="ltr">{dates.join(" — ")}</bdi>
            </p>
            <p role={state === "save-error" ? "alert" : "status"}>
              {blocked
                ? help
                : c("Saved on this device", "روی این دستگاه ذخیره شد")}
            </p>
            {state === "save-error" && (
              <button className="btn alt" onClick={() => setState("planner")}>
                {c("Retry", "تلاش دوباره")}
              </button>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              <button className="btn alt">{c("Templates", "الگوها")}</button>
              <button
                className="btn alt"
                disabled={blocked}
                aria-describedby="shortcut-help"
                onClick={() => setState("report")}
              >
                {c("Review this week with AI", "مرور این هفته با هوش مصنوعی")}
              </button>
            </div>
            <p id="shortcut-help" style={{ marginTop: 12 }}>
              {c(
                "Optional: choose report fields, then review and share yourself.",
                "اختیاری: داده‌های گزارش را انتخاب کنید، سپس خودتان بررسی و اشتراک‌گذاری کنید.",
              )}
            </p>
          </section>
          <section className="box">
            <h2>{c("Weekly goal", "هدف هفته")}</h2>
            <p>
              {state === "empty"
                ? c(
                    "No saved records for this week yet.",
                    "هنوز داده‌ای برای این هفته ذخیره نشده است.",
                  )
                : c(
                    "Finish the first draft and review a longer set of notes for the next project without losing the important details.",
                    "پیش‌نویس اول را تمام کنم و مجموعهٔ یادداشت‌های طولانی پروژهٔ بعدی را با حفظ جزئیات مهم مرور کنم.",
                  )}
            </p>
          </section>
          {state === "editor" && (
            <section
              className="box"
              aria-label={c("Open editor", "ویرایش باز")}
            >
              <h2>
                {c(
                  "Event editor · unsaved draft",
                  "ویرایش رویداد · پیش‌نویس ذخیره‌نشده",
                )}
              </h2>
              <p>
                {c(
                  "Draft retained here. Existing Save and Cancel resolve editing.",
                  "پیش‌نویس اینجا حفظ می‌شود. ذخیره و لغو فعلی، ویرایش را پایان می‌دهند.",
                )}
              </p>
              <button className="btn" onClick={() => setState("planner")}>
                {c("Save event", "ذخیره رویداد")}
              </button>
              <button className="btn alt" onClick={() => setState("planner")}>
                {c("Cancel", "لغو")}
              </button>
            </section>
          )}
        </>
      ) : (
        <>
          <section className="box">
            <h2 tabIndex={-1}>
              {c("Choose and review your report", "انتخاب و بررسی گزارش")}
            </h2>
            {invalid ? (
              <div role="alert">
                <p>
                  {c(
                    "The week link is invalid. No report was prepared. Choose dates to continue.",
                    "پیوند هفته معتبر نیست. گزارشی آماده نشد. برای ادامه، تاریخ‌ها را انتخاب کنید.",
                  )}
                </p>
                <button
                  className="btn alt"
                  onClick={() => {
                    setRecovered(true);
                    setMessage(
                      c(
                        "Choose dates or All dates below.",
                        "در پایین تاریخ‌ها یا همهٔ تاریخ‌ها را انتخاب کنید.",
                      ),
                    );
                  }}
                >
                  {c("Choose report dates", "انتخاب تاریخ‌های گزارش")}
                </button>
              </div>
            ) : (
              <p>
                {recovered ? (
                  c(
                    "Choose dates or All dates. This is no longer a viewed-week report.",
                    "تاریخ‌ها یا همهٔ تاریخ‌ها را انتخاب کنید. این دیگر گزارش هفتهٔ نمایش‌داده‌شده نیست.",
                  )
                ) : (
                  <>
                    {c(
                      "From Planner · viewed week",
                      "از برنامه · هفتهٔ نمایش‌داده‌شده",
                    )}{" "}
                    · <bdi dir="ltr">{dates.join(" — ")}</bdi>
                  </>
                )}
              </p>
            )}
            <fieldset
              disabled={invalid}
              style={{
                border: 0,
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <legend>
                {c(
                  "Inclusive date range",
                  "بازهٔ تاریخ با احتساب دو روز ابتدا و انتها",
                )}
              </legend>
              {dates.map((date, index) => (
                <label key={index} style={{ flex: "1 1 160px" }}>
                  {index ? c("To", "تا") : c("From", "از")}
                  <input
                    type="date"
                    dir="ltr"
                    className="field"
                    defaultValue={recovered || invalid ? "" : date}
                    onChange={() => setSelectionApproved(true)}
                    key={`${index}-${recovered}`}
                    style={{ width: "100%", minHeight: 48 }}
                  />
                </label>
              ))}
              <button
                className="btn alt"
                onClick={() => {
                  setRecovered(true);
                  setSelectionApproved(true);
                  setMessage(
                    c(
                      "All dates selected. Review the scope before sharing.",
                      "همهٔ تاریخ‌ها انتخاب شد. پیش از اشتراک‌گذاری، دامنهٔ گزارش را بررسی کنید.",
                    ),
                  );
                }}
              >
                {c("All dates", "همهٔ تاریخ‌ها")}
              </button>
            </fieldset>
            <fieldset
              disabled={invalid}
              style={{ border: 0, padding: 0, marginTop: 16 }}
            >
              <legend>
                {c(
                  "Choose fields · existing defaults retained",
                  "انتخاب داده‌ها · انتخاب‌های اولیهٔ فعلی حفظ می‌شوند",
                )}
              </legend>
              {[
                c("Weekly goals", "هدف‌های هفته"),
                c("Section activity", "فعالیت بخش‌ها"),
                c("Finance goals", "هدف‌های مالی"),
              ].map((label, index) => (
                <label
                  key={label}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    minHeight: 48,
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={index < 2 || state === "locked"}
                  />
                  {label}
                </label>
              ))}
              <p>
                {c(
                  "Other existing field controls remain here. Finance starts off and needs unlock.",
                  "دیگر انتخاب‌های دادهٔ فعلی اینجا می‌مانند. اطلاعات مالی ابتدا انتخاب نشده‌اند و نیاز به باز کردن قفل دارند.",
                )}
              </p>
            </fieldset>
          </section>
          <section className="box">
            <h2>{c("Preview", "پیش‌نمایش")}</h2>
            {invalid || awaitingChoice ? (
              <p>
                {invalid
                  ? c(
                      "Resolve the invalid week link first.",
                      "ابتدا پیوند نامعتبر هفته را برطرف کنید.",
                    )
                  : c(
                      "Choose a date range or All dates to prepare the preview.",
                      "برای آماده‌سازی پیش‌نمایش، بازهٔ تاریخ یا همهٔ تاریخ‌ها را انتخاب کنید.",
                    )}
              </p>
            ) : state === "locked" ? (
              <p role="alert">
                {c(
                  "Unlock Finance below before including Finance details.",
                  "پیش از افزودن اطلاعات مالی، قفل بخش مالی را در پایین باز کنید.",
                )}
              </p>
            ) : (
              <details open={state === "copy-error" || state === "changed"}>
                <summary>
                  {c("Review the report text", "بررسی متن گزارش")}
                </summary>
                <label>
                  {c("Report text", "متن گزارش")}
                  <textarea
                    readOnly
                    dir="auto"
                    rows={5}
                    className="field"
                    style={{ width: "100%" }}
                    value={c(
                      "# Smart Paper report\nWeekly goals: Finish a thoughtful first draft.\nSection activity: 120 minutes.\nFinance not included.",
                      "# گزارش کاغذ هوشمند\nهدف هفته: پیش‌نویس اول را با دقت تمام کنم.\nفعالیت بخش‌ها: ۱۲۰ دقیقه.\nاطلاعات مالی اضافه نشده‌اند.",
                    )}
                  />
                </label>
              </details>
            )}
            <p>
              {c(
                "Prepare this report offline. Copy or share it yourself, then review and send in your preferred AI app. Cloud AI responses need internet. Planning needs neither AI nor internet.",
                "این گزارش را آفلاین آماده کنید. خودتان آن را کپی یا اشتراک‌گذاری کنید، سپس در برنامهٔ هوش مصنوعی دلخواه بررسی و ارسال کنید. پاسخ هوش مصنوعی ابری به اینترنت نیاز دارد. برنامه‌ریزی به هوش مصنوعی یا اینترنت نیاز ندارد.",
              )}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                c("Copy report text", "کپی متن گزارش"),
                c("Share report file", "اشتراک‌گذاری فایل گزارش"),
                c("Select text manually", "انتخاب دستی متن"),
              ].map((label) => (
                <button
                  className="btn alt"
                  disabled={reportBlocked}
                  key={label}
                  onClick={() =>
                    setMessage(
                      c(
                        "Prototype only: no report transferred.",
                        "فقط نمونه: گزارشی منتقل نشد.",
                      ),
                    )
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            {state === "copy-error" && (
              <p role="alert">
                {c(
                  "Could not copy automatically. Select the report text, then use your device’s Copy command.",
                  "کپی خودکار انجام نشد. متن گزارش را انتخاب کنید، سپس از فرمان کپی دستگاه استفاده کنید.",
                )}
              </p>
            )}
            {state === "cancelled" && (
              <p role="status">
                {c(
                  "Sharing was cancelled. Try again or copy the report text.",
                  "اشتراک‌گذاری لغو شد. دوباره تلاش کنید یا متن گزارش را کپی کنید.",
                )}
              </p>
            )}
            {state === "changed" && (
              <p role="status">
                {c(
                  "The report changed. Review the updated preview, then choose Copy or Share again.",
                  "گزارش تغییر کرده است. پیش‌نمایش به‌روز را بررسی کنید، سپس دوباره کپی یا اشتراک‌گذاری را انتخاب کنید.",
                )}
              </p>
            )}
            {message && <p role="status">{message}</p>}
          </section>
          <button className="btn alt" onClick={() => setState("planner")}>
            {c("Planner", "برنامه")}
          </button>
        </>
      )}
    </article>
  );
}
const meta = {
  title: "Proposals/Planner AI shortcut",
  component: PlannerAiShortcut,
  args: {
    language: "en",
    width: "phone",
    theme: "light",
    state: "planner",
    largeText: false,
    week: "past",
  },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    state: { control: "select", options: states },
    week: { control: "radio", options: ["past", "current", "future"] },
  },
} satisfies Meta<typeof PlannerAiShortcut>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhoneDark: Story = {
  args: { language: "fa", theme: "dark", week: "future" },
};
export const EnglishWideDark: Story = {
  args: { width: "wide", theme: "dark", state: "report" },
};
export const PersianWide: Story = {
  args: { language: "fa", width: "wide", state: "report" },
};
export const SaveError: Story = { args: { state: "save-error" } };
export const Editor: Story = {
  args: { state: "editor", language: "fa", theme: "dark" },
};
export const Loading: Story = { args: { state: "loading" } };
export const EmptyWeek: Story = { args: { state: "empty" } };
export const InvalidContext: Story = { args: { state: "invalid" } };
export const InvalidPersian: Story = {
  args: { state: "invalid", language: "fa", theme: "dark" },
};
export const CopyError: Story = { args: { state: "copy-error" } };
export const Cancelled: Story = {
  args: { state: "cancelled", language: "fa" },
};
export const Changed: Story = { args: { state: "changed", theme: "dark" } };
export const FinanceLocked: Story = {
  args: { state: "locked", language: "fa" },
};
export const PersianLarge: Story = {
  args: { state: "report", language: "fa", theme: "dark", largeText: true },
};
export const EnglishPhoneDark: Story = {
  args: { theme: "dark", state: "report" },
};
export const PersianPhone: Story = {
  args: { language: "fa", state: "report" },
};
export const EnglishWide: Story = { args: { width: "wide" } };
export const PersianWideDark: Story = {
  args: { language: "fa", width: "wide", theme: "dark" },
};
