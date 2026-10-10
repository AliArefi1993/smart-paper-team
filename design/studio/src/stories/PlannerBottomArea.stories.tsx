import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type SaveState = "saved" | "error" | "pending" | "saving" | "empty" | "loading";
function PlannerBottomArea({
  language = "en",
  theme = "light",
  layout = "portrait",
  start = "saved",
  lastDay = false,
  minimized = false,
}: {
  language?: "en" | "fa";
  theme?: "light" | "dark";
  layout?: "portrait" | "landscape" | "keyboard" | "wide";
  start?: SaveState;
  lastDay?: boolean;
  minimized?: boolean;
}) {
  const fa = language === "fa",
    dark = theme === "dark";
  const c = (en: string, faCopy: string) => (fa ? faCopy : en);
  const [state, setState] = useState(start);
  const [day, setDay] = useState(lastDay ? 6 : 0);
  const [note, setNote] = useState(
    c(
      "Review the first draft and leave a clear note for tomorrow. Keep the next step small enough to finish before the afternoon appointment.",
      "پیش‌نویس اول را مرور کنم و برای فردا یادداشت روشنی بگذارم. قدم بعدی را آن‌قدر کوچک انتخاب کنم که پیش از قرار بعدازظهر تمام شود.",
    ),
  );
  const days = fa
    ? ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]
    : [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];
  const colors = {
    paper: dark ? "#101b1b" : "#f7f8f5",
    surface: dark ? "#1b2b29" : "#fff",
    soft: dark ? "#243532" : "#f1f5f2",
    ink: dark ? "#eef5f1" : "#172b29",
    muted: dark ? "#b6c8c2" : "#536660",
    line: dark ? "#3b5550" : "#d9e4de",
    primary: dark ? "#72dbcb" : "#0f766e",
    error: dark ? "#ffb6bc" : "#be123c",
  };
  const status =
    state === "error"
      ? c(
          "Couldn’t save. Your changes are still here.",
          "ذخیره نشد. تغییرات شما هنوز اینجاست.",
        )
      : state === "pending"
        ? c("Changes pending…", "تغییرات در انتظار ذخیره…")
        : state === "saving"
          ? c("Saving on this device…", "در حال ذخیره روی این دستگاه…")
          : state === "loading"
            ? c("Loading week…", "در حال بارگذاری هفته…")
            : state === "empty"
              ? c(
                  "Changes save automatically on this device.",
                  "تغییرات به‌طور خودکار روی همین دستگاه ذخیره می‌شوند.",
                )
              : c("Saved on this device", "روی همین دستگاه ذخیره شد");
  const buttonStyle = {
    minHeight: 48,
    padding: "8px 14px",
    borderRadius: 12,
    border: `1px solid ${colors.line}`,
    background: colors.surface,
    color: colors.ink,
    font: "inherit",
    cursor: "pointer",
  };
  const panelStyle = {
    padding: 16,
    borderRadius: 16,
    border: `1px solid ${colors.line}`,
    background: colors.surface,
    marginBottom: 16,
  };
  const next = () => setDay((index) => Math.min(index + 1, 6));
  const saveStatus = (live = false) => (
    <div
      role={live ? (state === "error" ? "alert" : "status") : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        color: state === "error" ? colors.error : colors.primary,
        fontSize: 13,
      }}
    >
      <span>{status}</span>
      {state === "error" && (
        <button style={buttonStyle} onClick={() => setState("saved")}>
          {c("Retry", "تلاش دوباره")}
        </button>
      )}
    </div>
  );
  const nextButton = () => (
    <button
      style={{ ...buttonStyle, opacity: day === 6 ? 0.5 : 1 }}
      disabled={state === "loading" || state === "saving" || day === 6}
      onClick={next}
    >
      {c("Next day", "روز بعد")}
    </button>
  );
  return (
    <main style={{ maxWidth: 1200, padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>Planner bottom area · inline proposal</h1>
      <p>
        Local Android mode. Scroll the canvas: status/navigation remain in
        document flow. Keyboard area is illustrative; native behavior needs
        device QA.
      </p>
      <style>{`.pb-proposal button:focus-visible,.pb-proposal textarea:focus-visible {outline:3px solid ${dark ? "#f5c66f" : "#0f766e"};outline-offset:3px}`}</style>
      <div
        className="pb-proposal"
        lang={language}
        dir={fa ? "rtl" : "ltr"}
        style={{
          width:
            layout === "portrait" || layout === "keyboard"
              ? 390
              : layout === "landscape"
                ? 844
                : 1040,
          maxWidth: "100%",
          background: colors.paper,
          color: colors.ink,
          border: `1px solid ${colors.line}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height:
              layout === "landscape"
                ? 390
                : layout === "keyboard"
                  ? 380
                  : layout === "wide"
                    ? 650
                    : 744,
            overflowY: "auto",
            padding: 16,
          }}
        >
          <section style={panelStyle}>
            <h2 style={{ margin: 0, fontSize: 22 }}>
              {c("Weekly Smart Paper", "دفتر هوشمند هفتگی")}
            </h2>
            <p style={{ color: colors.muted, fontSize: 14 }}>
              {c("October 3–9 · Current week", "۱۱ تا ۱۷ مهر · هفته جاری")}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={buttonStyle}>
                {c("Week templates", "الگوهای هفته")}
              </button>
              <button style={buttonStyle}>{c("Settings", "تنظیمات")}</button>
            </div>
          </section>
          <section style={panelStyle}>
            <h2 style={{ fontSize: 18 }}>{c("Week details", "جزئیات هفته")}</h2>
            {saveStatus(true)}
            <label style={{ display: "block", marginTop: 12 }}>
              {c("Weekly goal", "هدف هفتگی")}
              <textarea
                aria-label={c("Weekly goal", "هدف هفتگی")}
                defaultValue={c(
                  "Finish the draft, then keep Friday light.",
                  "پیش‌نویس را تمام کنم و جمعه را سبک بگذرانم.",
                )}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 6,
                  padding: 12,
                  background: colors.soft,
                  color: colors.ink,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                }}
              />
            </label>
          </section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <button style={buttonStyle}>
              {c("Minimize all days", "کوچک کردن همه روزها")}
            </button>
            {nextButton()}
          </div>
          <nav
            aria-label={c("Days", "روزها")}
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 12,
            }}
          >
            {days.map((name, index) => (
              <button
                key={name}
                aria-pressed={day === index}
                onClick={() => setDay(index)}
                style={{
                  ...buttonStyle,
                  minWidth: 100,
                  background: day === index ? colors.primary : colors.surface,
                  color:
                    day === index ? (dark ? "#092522" : "white") : colors.ink,
                }}
              >
                {name}
              </button>
            ))}
          </nav>
          {state === "loading" ? (
            <section style={panelStyle}>{status}</section>
          ) : (
            <article style={panelStyle}>
              <h2 style={{ fontSize: 18 }}>
                {days[day]} · {c("45 min", "۴۵ دقیقه")}
              </h2>
              {minimized ? (
                <p>
                  {c(
                    "Choose a day to see its details.",
                    "برای دیدن جزئیات، یک روز را انتخاب کنید.",
                  )}
                </p>
              ) : (
                <>
                  <label style={{ display: "block" }}>
                    {c("Day note", "یادداشت روز")}
                    <textarea
                      aria-label={c("Day note", "یادداشت روز")}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      rows={5}
                      style={{
                        display: "block",
                        width: "100%",
                        marginTop: 6,
                        padding: 12,
                        borderRadius: 12,
                        border: `1px solid ${colors.line}`,
                        background: colors.soft,
                        color: colors.ink,
                        font: "inherit",
                      }}
                    />
                  </label>
                  {[
                    c("Work", "کار"),
                    c("Personal learning", "یادگیری شخصی"),
                  ].map((label) => (
                    <section
                      key={label}
                      style={{
                        ...panelStyle,
                        marginTop: 16,
                        background: colors.soft,
                      }}
                    >
                      <h3 style={{ fontSize: 16 }}>{label}</h3>
                      <p style={{ color: colors.muted }}>
                        {c(
                          "Goal and notes remain editable here. This sample stands in for the existing section cards.",
                          "هدف و یادداشت‌ها در اینجا قابل ویرایش‌اند. این نمونه جای کارت‌های فعلی بخش‌ها را نشان می‌دهد.",
                        )}
                      </p>
                      <button style={buttonStyle}>
                        {c("Open writing view", "باز کردن نمای نوشتن")}
                      </button>
                    </section>
                  ))}
                  <div
                    style={{
                      borderTop: `1px solid ${colors.line}`,
                      paddingTop: 12,
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {saveStatus()}
                    {nextButton()}
                  </div>
                </>
              )}
            </article>
          )}
          <section style={panelStyle}>
            <h2 style={{ fontSize: 18 }}>{c("Week totals", "مجموع هفته")}</h2>
            <p style={{ color: colors.muted }}>
              {c(
                "Content can scroll fully into view. No fixed footer or reserved footer gap.",
                "محتوا با پیمایش کاملاً دیده می‌شود. نوار ثابت پایین و فضای خالی مخصوص آن حذف شده‌اند.",
              )}
            </p>
          </section>
        </div>
        {layout === "keyboard" && (
          <div
            aria-hidden="true"
            style={{
              height: 220,
              background: dark ? "#30443f" : "#d9e4de",
              padding: 18,
              textAlign: "center",
              color: colors.muted,
            }}
          >
            ▤ {c("Illustrative on-screen keyboard", "نمونه صفحه‌کلید روی صفحه")}
          </div>
        )}
      </div>
      <p style={{ fontSize: 13 }}>
        Friday disables Next day; no week rollover. The day rail remains
        available. Error Retry simulates recovery; same-week Next remains
        available during save failure. No prototype storage writes.
      </p>
    </main>
  );
}
const meta = {
  title: "Proposals/Planner bottom area",
  component: PlannerBottomArea,
  args: {
    language: "en",
    theme: "light",
    layout: "portrait",
    start: "saved",
    lastDay: false,
    minimized: false,
  },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    theme: { control: "radio", options: ["light", "dark"] },
    layout: {
      control: "radio",
      options: ["portrait", "landscape", "keyboard", "wide"],
    },
    start: {
      control: "select",
      options: ["saved", "error", "pending", "saving", "empty", "loading"],
    },
  },
} satisfies Meta<typeof PlannerBottomArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const PortraitEnglishLight: Story = {};
export const PortraitPersianDark: Story = {
  args: { language: "fa", theme: "dark" },
};
export const PortraitPersianLight: Story = { args: { language: "fa" } };
export const PortraitEnglishDark: Story = { args: { theme: "dark" } };
export const LandscapeEnglish: Story = { args: { layout: "landscape" } };
export const LandscapePersianDark: Story = {
  args: { layout: "landscape", language: "fa", theme: "dark" },
};
export const KeyboardEnglish: Story = { args: { layout: "keyboard" } };
export const KeyboardPersianError: Story = {
  args: { layout: "keyboard", language: "fa", theme: "dark", start: "error" },
};
export const SaveFailure: Story = { args: { start: "error" } };
export const Friday: Story = { args: { lastDay: true } };
export const Minimized: Story = { args: { minimized: true } };
export const Loading: Story = { args: { start: "loading" } };
export const Empty: Story = { args: { start: "empty" } };
export const Pending: Story = { args: { start: "pending" } };
export const Saving: Story = { args: { start: "saving" } };
export const Wide: Story = { args: { layout: "wide" } };
