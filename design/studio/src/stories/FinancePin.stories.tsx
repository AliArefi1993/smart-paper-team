import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
const states = [
  "summary",
  "form",
  "wrong-current",
  "missing-current",
  "invalid-new",
  "mismatch",
  "unchanged",
  "saving",
  "write-error",
  "success",
  "unavailable",
  "corrupt",
  "forgotten",
  "changed-elsewhere",
  "interrupted",
  "expired",
  "unsupported",
  "finance-locked",
  "export-locked",
] as const;
type State = (typeof states)[number];
type Props = {
  language: "en" | "fa";
  width: "phone" | "wide";
  theme: "light" | "dark";
  state: State;
  financeVisible: boolean;
  unlocked: boolean;
  largeText: boolean;
  legacy: boolean;
};
function normalize(value: string) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) =>
    String(digit.charCodeAt(0) - (digit >= "۰" ? 0x06f0 : 0x0660)),
  );
}
function FinancePin({
  language,
  width,
  theme,
  state: initial,
  financeVisible,
  unlocked,
  largeText,
  legacy,
}: Props) {
  const [state, setState] = useState(initial);
  const [current, setCurrent] = useState(
    [
      "wrong-current",
      "invalid-new",
      "mismatch",
      "unchanged",
      "write-error",
    ].includes(initial)
      ? initial === "wrong-current"
        ? "1111"
        : "1234"
      : "",
  );
  const [next, setNext] = useState(
    ["invalid-new", "mismatch", "unchanged", "write-error"].includes(initial)
      ? initial === "invalid-new"
        ? "12"
        : initial === "unchanged"
          ? "1234"
          : "5678"
      : "",
  );
  const [confirm, setConfirm] = useState(
    ["mismatch", "unchanged", "write-error"].includes(initial)
      ? initial === "mismatch"
        ? "6789"
        : initial === "unchanged"
          ? "1234"
          : "5678"
      : "",
  );
  const [notice, setNotice] = useState("");
  const currentRef = useRef<HTMLInputElement>(null);
  const fa = language === "fa";
  const c = (en: string, faText: string) => (fa ? faText : en);
  const lockedRoute = state === "finance-locked" || state === "export-locked";
  const blocked =
    state === "saving" || state === "unavailable" || state === "corrupt";
  const showForm = ![
    "summary",
    "success",
    "unavailable",
    "corrupt",
    "finance-locked",
    "export-locked",
  ].includes(state);
  const problems: Partial<Record<State, string>> = {
    "missing-current": c("Enter your current PIN.", "رمز فعلی را وارد کنید."),
    "wrong-current": c("The current PIN is incorrect.", "رمز فعلی درست نیست."),
    "invalid-new": c(
      "Enter a new PIN with 4–12 digits. English, Persian and Arabic digits are accepted.",
      "رمز جدید باید ۴ تا ۱۲ رقم داشته باشد. رقم‌های انگلیسی، فارسی و عربی پذیرفته می‌شوند.",
    ),
    mismatch: c(
      "The confirmation does not match the new PIN.",
      "تکرار رمز با رمز جدید یکسان نیست.",
    ),
    unchanged: c(
      "Choose a PIN different from your current PIN.",
      "رمزی متفاوت از رمز فعلی انتخاب کنید.",
    ),
    "write-error": c(
      "Could not save the new PIN. Your previous PIN still works. Try again.",
      "رمز جدید ذخیره نشد. رمز قبلی همچنان کار می‌کند. دوباره تلاش کنید.",
    ),
    unavailable: c(
      "Could not read the saved PIN. Finance and protected exports remain locked. Try reading it again.",
      "رمز ذخیره‌شده خوانده نشد. بخش مالی و خروجی‌های محافظت‌شده قفل می‌مانند. خواندن رمز را دوباره امتحان کنید.",
    ),
    corrupt: c(
      "The saved PIN cannot be used. Finance and protected exports remain locked. Your records have not been deleted. There is no PIN reset in this app.",
      "رمز ذخیره‌شده قابل استفاده نیست. بخش مالی و خروجی‌های محافظت‌شده قفل می‌مانند. اطلاعات شما حذف نشده‌اند. این برنامه امکان بازنشانی رمز ندارد.",
    ),
    "changed-elsewhere": c(
      "The PIN changed in another window. Finance is locked. Re-enter the current PIN to continue.",
      "رمز در پنجره‌ای دیگر تغییر کرد. بخش مالی قفل است. برای ادامه، رمز فعلی را دوباره وارد کنید.",
    ),
    expired: c(
      "Finance locked because its session expired. Your current PIN is still required to change it.",
      "به‌دلیل پایان نشست، بخش مالی قفل شد. برای تغییر رمز همچنان باید رمز فعلی را وارد کنید.",
    ),
    unsupported: c(
      "PIN changes are unavailable on this device. Your current PIN and records are unchanged.",
      "تغییر رمز در این دستگاه در دسترس نیست. رمز فعلی و اطلاعات شما تغییر نکرده‌اند.",
    ),
    interrupted: c(
      "PIN entry was cleared when you left. Enter the current PIN again; no draft PIN is saved.",
      "با خروج شما، رمزهای واردشده پاک شدند. رمز فعلی را دوباره وارد کنید؛ پیش‌نویس رمز ذخیره نمی‌شود.",
    ),
  };
  const boundary = (
    <>
      <p>
        {c(
          "This PIN is a screen lock for Finance and protected exports; it does not encrypt your data.",
          "این رمز قفل صفحهٔ بخش مالی و خروجی‌های محافظت‌شده است؛ داده‌های شما را رمزگذاری نمی‌کند.",
        )}
      </p>
      <p>
        {c(
          "There is no in-app recovery if you forget it. Full JSON backup and import also require your PIN, including Planner and Ideas records.",
          "اگر رمز را فراموش کنید، بازیابی آن در برنامه وجود ندارد. تهیه و ورود پشتیبان کامل JSON هم به رمز نیاز دارد؛ این شامل اطلاعات برنامه و ایده‌ها نیز می‌شود.",
        )}
      </p>
      <p>
        {c(
          "Backups contain records, not the PIN. Import keeps this device’s PIN and cannot reset a forgotten PIN.",
          "فایل پشتیبان شامل اطلاعات است، نه رمز. ورود پشتیبان، رمز این دستگاه را حفظ می‌کند و رمز فراموش‌شده را بازنشانی نمی‌کند.",
        )}
      </p>
    </>
  );
  function clear() {
    setCurrent("");
    setNext("");
    setConfirm("");
  }
  function save() {
    setNotice("");
    if (!current) {
      setState("missing-current");
      currentRef.current?.focus();
      return;
    }
    if (current !== "1234") {
      setState("wrong-current");
      currentRef.current?.focus();
      return;
    }
    if (!/^\d{4,12}$/.test(normalize(next))) {
      setState("invalid-new");
      return;
    }
    if (normalize(next) !== normalize(confirm)) {
      setState("mismatch");
      return;
    }
    if (normalize(next) === "1234") {
      setState("unchanged");
      return;
    }
    clear();
    setState("success");
  }
  return (
    <article
      className={`finance-pin-proposal phone ${width === "wide" ? "wide" : ""} ${theme === "dark" ? "theme-dark" : ""}`}
      lang={language}
      dir={fa ? "rtl" : "ltr"}
      style={{
        width: "100%",
        maxWidth: width === "wide" ? 1000 : 390,
        minHeight: 0,
        padding: 16,
        fontSize: largeText ? 22 : 15,
      }}
    >
      <style>{`.finance-pin-proposal .btn { min-height:48px; font-size:inherit; } .finance-pin-proposal .field { width:100%; min-height:48px; font-size:inherit; } .finance-pin-proposal :focus-visible { outline:3px solid #a66a24; outline-offset:3px; } .finance-pin-proposal.theme-dark :focus-visible { outline-color:#f5c66f; } .finance-pin-proposal button:disabled { opacity:.6; } .finance-pin-proposal label { display:grid; gap:8px; } .finance-pin-proposal .pin-fields { display:grid; gap:16px; max-width:560px; }`}</style>
      <p className="eyebrow">
        {c(
          "Proposal · no real PIN or records are changed",
          "پیشنهاد · رمز واقعی یا اطلاعات تغییر نمی‌کنند",
        )}
      </p>
      <section className="box">
        <h1>
          {lockedRoute
            ? state === "finance-locked"
              ? c("Finance", "مالی")
              : c("Export Data", "خروجی داده‌ها")
            : c("Settings", "تنظیمات")}
        </h1>
        <nav
          aria-label={c("Page navigation", "مسیرهای برنامه")}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          <button className="btn alt">{c("Planner", "برنامه")}</button>
          <button className="btn alt">{c("Summaries", "خلاصه‌ها")}</button>
        </nav>
      </section>
      {lockedRoute ? (
        <section className="box">
          <h2>{c("Finance is locked", "بخش مالی قفل است")}</h2>
          <label>
            {c("Finance PIN", "رمز بخش مالی")}
            <input className="field" type="password" autoComplete="off" />
          </label>
          {legacy && (
            <p>
              {c(
                "Initial PIN: 1234. Change it in Settings.",
                "رمز اولیه: ۱۲۳۴. آن را در تنظیمات تغییر دهید.",
              )}
            </p>
          )}
          {!legacy && (
            <p>
              {c(
                "Enter the PIN saved on this device.",
                "رمز ذخیره‌شده روی این دستگاه را وارد کنید.",
              )}
            </p>
          )}
          <button className="btn" style={{ marginTop: 12 }}>
            {c("Unlock Finance", "باز کردن بخش مالی")}
          </button>
          <p>
            {c(
              "PIN changes are available in Settings, even when Finance is hidden.",
              "تغییر رمز در تنظیمات در دسترس است، حتی وقتی بخش مالی پنهان است.",
            )}
          </p>
          <button className="btn alt" onClick={() => setState("summary")}>
            {c(
              "Change Finance PIN in Settings",
              "تغییر رمز بخش مالی در تنظیمات",
            )}
          </button>
          {boundary}
        </section>
      ) : (
        <>
          <section className="box">
            <h2>{c("Finance visibility", "نمایش بخش مالی")}</h2>
            <p>
              {c(
                "Existing visibility setting · independent of PIN changes",
                "تنظیم فعلی نمایش · مستقل از تغییر رمز",
              )}
            </p>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                minHeight: 48,
              }}
            >
              <input
                type="checkbox"
                checked={financeVisible}
                readOnly
                style={{ width: 20, height: 20 }}
              />
              {c("Show Finance", "نمایش بخش مالی")}
            </label>
            <p>
              {financeVisible
                ? c("Finance is visible.", "بخش مالی نمایش داده می‌شود.")
                : c(
                    "Finance is hidden. You can still change its PIN here.",
                    "بخش مالی پنهان است. همچنان می‌توانید رمز آن را اینجا تغییر دهید.",
                  )}
            </p>
          </section>
          <section className="box" id="finance-pin">
            <h2>{c("Finance PIN", "رمز بخش مالی")}</h2>
            <p>
              {c(
                "Change the PIN on this device. Finance visibility and saved records stay the same.",
                "رمز این دستگاه را تغییر دهید. نمایش بخش مالی و اطلاعات ذخیره‌شده تغییر نمی‌کنند.",
              )}
            </p>
            {state === "summary" ? (
              <>
                <button
                  className="btn alt"
                  onClick={() => {
                    setState("form");
                    setNotice("");
                  }}
                >
                  {c("Change Finance PIN", "تغییر رمز بخش مالی")}
                </button>
                <details style={{ marginTop: 12 }}>
                  <summary>
                    {c("Forgot your PIN?", "رمز را فراموش کرده‌اید؟")}
                  </summary>
                  {boundary}
                </details>
              </>
            ) : state === "success" ? (
              <>
                <p role="status">
                  {c(
                    "PIN changed. Finance is locked again. Use your new PIN for Finance and protected exports.",
                    "رمز تغییر کرد. بخش مالی دوباره قفل شد. برای بخش مالی و خروجی‌های محافظت‌شده از رمز جدید استفاده کنید.",
                  )}
                </p>
                <p>
                  {c(
                    "Saved records and Finance visibility are unchanged.",
                    "اطلاعات ذخیره‌شده و نمایش بخش مالی تغییر نکرده‌اند.",
                  )}
                </p>
                <button className="btn alt" onClick={() => setState("summary")}>
                  {c("Done", "تمام")}
                </button>
              </>
            ) : blocked && state !== "saving" ? (
              <>
                <p role="alert">{problems[state]}</p>
                {boundary}
                <button
                  className="btn alt"
                  onClick={() =>
                    setNotice(
                      c(
                        "Prototype: read checked again; no credential reset.",
                        "نمونه: خواندن دوباره بررسی شد؛ رمز بازنشانی نشد.",
                      ),
                    )
                  }
                >
                  {c("Check again", "بررسی دوباره")}
                </button>
              </>
            ) : (
              <>
                <div className="box soft">
                  {boundary}
                  <p>
                    <strong>
                      {c(
                        "Saving a new PIN locks Finance again and clears unsaved Finance edits and protected report previews.",
                        "ذخیرهٔ رمز جدید، بخش مالی را دوباره قفل می‌کند و ویرایش‌های ذخیره‌نشدهٔ مالی و پیش‌نمایش گزارش‌های محافظت‌شده را پاک می‌کند.",
                      )}
                    </strong>
                  </p>
                </div>
                <p>
                  {unlocked
                    ? c(
                        "Finance is currently unlocked. Your current PIN is still required.",
                        "بخش مالی اکنون باز است. همچنان باید رمز فعلی را وارد کنید.",
                      )
                    : c(
                        "Finance stays locked until you deliberately unlock it.",
                        "بخش مالی تا زمانی که خودتان قفل را باز کنید، قفل می‌ماند.",
                      )}
                </p>
                <p id="pin-rule">
                  {c(
                    "New PIN: 4–12 digits; leading zeroes are allowed. English, Persian and Arabic digits are accepted. Choose a different PIN.",
                    "رمز جدید: ۴ تا ۱۲ رقم؛ صفر در ابتدای رمز مجاز است. رقم‌های انگلیسی، فارسی و عربی پذیرفته می‌شوند. رمزی متفاوت انتخاب کنید.",
                  )}
                </p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    save();
                  }}
                >
                  <fieldset
                    disabled={state === "saving"}
                    style={{ border: 0, padding: 0 }}
                  >
                    <div className="pin-fields">
                      {[
                        {
                          label: c("Current PIN", "رمز فعلی"),
                          value: current,
                          set: setCurrent,
                          invalid:
                            state === "wrong-current" ||
                            state === "missing-current",
                          kind: "current",
                        },
                        {
                          label: c("New PIN", "رمز جدید"),
                          value: next,
                          set: setNext,
                          invalid:
                            state === "invalid-new" || state === "unchanged",
                          kind: "new",
                        },
                        {
                          label: c("Confirm new PIN", "تکرار رمز جدید"),
                          value: confirm,
                          set: setConfirm,
                          invalid: state === "mismatch",
                          kind: "confirm",
                        },
                      ].map((item) => (
                        <label key={item.kind}>
                          {item.label}
                          <input
                            ref={
                              item.kind === "current" ? currentRef : undefined
                            }
                            className="field"
                            type="password"
                            inputMode={
                              item.kind === "current" ? "text" : "numeric"
                            }
                            dir="ltr"
                            autoComplete="off"
                            spellCheck={false}
                            value={item.value}
                            onChange={(event) => item.set(event.target.value)}
                            aria-invalid={item.invalid}
                            aria-describedby={
                              item.invalid ? "pin-error pin-rule" : "pin-rule"
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {problems[state] && (
                    <p id="pin-error" role="alert">
                      {problems[state]}
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 16,
                    }}
                  >
                    <button
                      className="btn"
                      type="submit"
                      disabled={state === "saving"}
                    >
                      {state === "saving"
                        ? c("Saving PIN…", "در حال ذخیرهٔ رمز…")
                        : c("Save new PIN", "ذخیرهٔ رمز جدید")}
                    </button>
                    <button
                      className="btn alt"
                      type="button"
                      disabled={state === "saving"}
                      onClick={() => {
                        clear();
                        setState("summary");
                        setNotice(
                          c(
                            "Cancelled. Your PIN is unchanged.",
                            "لغو شد. رمز شما تغییر نکرد.",
                          ),
                        );
                      }}
                    >
                      {c("Cancel", "لغو")}
                    </button>
                  </div>
                  {state === "saving" && (
                    <p role="status">
                      {c(
                        "Saving PIN… Wait for confirmation. Cancel is unavailable while saving.",
                        "در حال ذخیرهٔ رمز… منتظر تأیید بمانید. هنگام ذخیره، لغو در دسترس نیست.",
                      )}
                    </p>
                  )}
                </form>
              </>
            )}
            {notice && <p role="status">{notice}</p>}
          </section>
          <section className="box">
            <h2>{c("Planner sections", "بخش‌های برنامه")}</h2>
            <label>
              {c("Section label 1", "نام بخش ۱")}
              <input
                className="field"
                defaultValue={c(
                  "Learning, reading and preparing a long project",
                  "یادگیری، مطالعه و آماده‌سازی پروژه‌ای طولانی",
                )}
              />
            </label>
            <p>
              {c(
                "Existing unsaved Settings edits stay separate from PIN changes.",
                "ویرایش‌های ذخیره‌نشدهٔ فعلی تنظیمات، از تغییر رمز جدا می‌مانند.",
              )}
            </p>
            <button className="btn alt">
              {c("Save Settings", "ذخیرهٔ تنظیمات")}
            </button>
          </section>
        </>
      )}
    </article>
  );
}
const meta = {
  title: "Proposals/Finance PIN",
  component: FinancePin,
  args: {
    language: "en",
    width: "phone",
    theme: "light",
    state: "summary",
    financeVisible: false,
    unlocked: false,
    largeText: false,
    legacy: false,
  },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    state: { control: "select", options: states },
  },
} satisfies Meta<typeof FinancePin>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhoneDark: Story = {
  args: { language: "fa", theme: "dark" },
};
export const EnglishPhoneDark: Story = {
  args: { theme: "dark", state: "form", financeVisible: true, unlocked: true },
};
export const PersianPhone: Story = { args: { language: "fa", state: "form" } };
export const EnglishWide: Story = {
  args: { width: "wide", state: "form", unlocked: true },
};
export const EnglishWideDark: Story = {
  args: {
    width: "wide",
    theme: "dark",
    state: "success",
    financeVisible: true,
  },
};
export const PersianWide: Story = {
  args: { language: "fa", width: "wide", state: "success" },
};
export const PersianWideDark: Story = {
  args: {
    language: "fa",
    width: "wide",
    theme: "dark",
    state: "form",
    unlocked: true,
    financeVisible: true,
  },
};
export const WrongCurrent: Story = { args: { state: "wrong-current" } };
export const InvalidNew: Story = {
  args: { state: "invalid-new", language: "fa" },
};
export const Mismatch: Story = {
  args: { state: "mismatch", language: "fa", theme: "dark" },
};
export const Unchanged: Story = { args: { state: "unchanged" } };
export const Saving: Story = {
  args: { state: "saving", language: "fa", theme: "dark" },
};
export const WriteError: Story = { args: { state: "write-error" } };
export const Corrupt: Story = {
  args: { state: "corrupt", language: "fa", theme: "dark" },
};
export const Unavailable: Story = { args: { state: "unavailable" } };
export const Forgotten: Story = {
  args: { state: "forgotten", language: "fa" },
};
export const ChangedElsewhere: Story = { args: { state: "changed-elsewhere" } };
export const Interrupted: Story = {
  args: { state: "interrupted", language: "fa", theme: "dark" },
};
export const FinanceLocked: Story = {
  args: { state: "finance-locked", legacy: true },
};
export const ExportLocked: Story = {
  args: { state: "export-locked", language: "fa", theme: "dark" },
};
export const PersianLarge: Story = {
  args: { state: "form", language: "fa", theme: "dark", largeText: true },
};

export const Expired: Story = {
  args: { state: "expired", financeVisible: true },
};
export const Unsupported: Story = {
  args: { state: "unsupported", language: "fa", theme: "dark" },
};

export const MissingCurrent: Story = { args: { state: "missing-current" } };
