import type { Meta, StoryObj } from "@storybook/react-vite";

const copy = {
  en: { title: "Finance", lede: "Path To Goal", locked: "Finance Is Locked", pin: "Enter PIN", label: "Finance PIN", warning: "On Android, the PIN only hides this screen. Finance data is not encrypted.", hint: "Default PIN: 1234.", unlock: "Unlock", busy: "Unlocking...", wrong: "Wrong PIN.", nav: ["Planner", "Summaries", "Export"] },
  fa: { title: "مالی", lede: "مسیر رسیدن به هدف", locked: "بخش مالی قفل است", pin: "رمز را وارد کنید", label: "رمز بخش مالی", warning: "در اندروید، رمز فقط این صفحه را پنهان می‌کند. داده‌های مالی رمزگذاری نشده‌اند.", hint: "رمز پیش‌فرض: ۱۲۳۴.", unlock: "باز کردن", busy: "در حال باز کردن...", wrong: "رمز اشتباه است.", nav: ["برنامه", "خلاصه‌ها", "خروجی"] },
};

function FinanceExpiry({ language = "both", theme = "light", width = "phone", state = "expired" }: { language?: "both" | "en" | "fa"; theme?: "light" | "dark"; width?: "phone" | "wide"; state?: "locked" | "expired" | "unlocking" | "wrong-pin" }) {
  const languages = language === "both" ? ["en", "fa"] as const : [language];
  const dark = theme === "dark";
  return <main className={`studio-board ${dark ? "studio-board-dark" : ""}`}>
    <div className="studio-heading"><h1>Finance session expiry · {state}</h1><p>Proposed expiry behavior; existing locked layout and copy. Drafts and income data are absent after expiry. No automatic save.</p></div>
    <div className={`studio-pair ${width === "wide" ? "wide" : ""}`}>
      {languages.map(lang => {
        const t = copy[lang];
        return <div key={lang}>
          <p>{lang.toUpperCase()} · {theme} · {width === "phone" ? "390px" : "wide"}</p>
          <div className={`phone ${width === "wide" ? "wide" : ""} ${dark ? "theme-dark" : ""}`} lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} style={{ padding: 16 }}>
            <section style={{ background: dark ? "#243e39" : "#e7f4ef", border: `1px solid ${dark ? "#3b5550" : "#badbd0"}`, borderRadius: 24, padding: 20, margin: "8px 0 0" }}>
              <h1 style={{ fontSize: 30, margin: 0 }}>{t.title}</h1><p style={{ marginTop: 8 }}>{t.lede}</p>
              <div className="row" style={{ flexWrap: "wrap", gap: 8 }}><button className="btn alt">EN · FA</button><button className="btn alt">{lang === "fa" ? "روشن · تیره" : "Light · Dark"}</button>{t.nav.map(label => <button key={label} className="btn alt">{label}</button>)}</div>
            </section>
            {state === "expired" || state === "wrong-pin" ? <p role="alert" style={{ color: dark ? "#ffb6bc" : "#be123c", margin: "12px 0 0" }}>{state === "expired" ? `${t.locked}. ${t.pin}.` : t.wrong}</p> : null}
            <section style={{ maxWidth: 448, margin: "24px auto", borderRadius: 16, padding: 20, background: dark ? "#453922" : "#fffbeb", border: `1px solid ${dark ? "#8b784c" : "#fcd34d"}`, color: dark ? "#f5d494" : "#78350f" }}>
              <h2 style={{ fontSize: 18 }}>{t.locked}</h2><p style={{ color: "inherit", margin: "8px 0" }}>{t.pin}</p><p style={{ color: "inherit", margin: "8px 0", fontSize: 14 }}>{t.warning}</p><p style={{ color: "inherit", margin: "8px 0", fontSize: 14 }}>{t.hint}</p>
              <label style={{ display: "block" }}><span style={{ display: "block", fontSize: 14 }}>{t.label}</span><input type="password" aria-label={t.label} placeholder={t.pin} disabled={state === "unlocking"} style={{ width: "100%", minHeight: 44, marginTop: 6, borderRadius: 8, padding: "8px 12px", border: `1px solid ${dark ? "#8b784c" : "#d97706"}`, background: dark ? "#1b2b29" : "#fff", color: dark ? "#eef5f1" : "#172b29" }} /></label>
              <button className="btn" disabled={state === "unlocking"} style={{ marginTop: 12, minHeight: 44 }}>{state === "unlocking" ? t.busy : t.unlock}</button>
            </section>
          </div>
        </div>;
      })}
    </div>
    <p className="studio-note">PIN label is an accessibility requirement. Default hint is conditional on production configuration. Static state canvas; production requests and lifecycle checks require implementation verification.</p>
  </main>;
}

const meta = { title: "Fixes/Finance session expiry", component: FinanceExpiry, args: { language: "both", theme: "light", width: "phone", state: "expired" }, argTypes: { language: { control: "radio", options: ["both", "en", "fa"] }, theme: { control: "radio", options: ["light", "dark"] }, width: { control: "radio", options: ["phone", "wide"] }, state: { control: "radio", options: ["locked", "expired", "unlocking", "wrong-pin"] } } } satisfies Meta<typeof FinanceExpiry>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ExpiredLight: Story = {};
export const ExpiredDark: Story = { args: { theme: "dark" } };
export const LockedLight: Story = { args: { state: "locked" } };
export const LockedDark: Story = { args: { state: "locked", theme: "dark" } };
export const WideExpired: Story = { args: { width: "wide" } };
export const Unlocking: Story = { args: { state: "unlocking" } };
export const WrongPin: Story = { args: { state: "wrong-pin" } };
