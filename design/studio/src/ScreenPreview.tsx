import { pages, type Language, type RouteKey } from "./atlas-data";
import { variants, type VariantKey, type VariantSpec } from "./variants";
import { PlannerPreview } from "./PlannerPreview";

export type PreviewProps = {
  route: RouteKey;
  language: "both" | Language;
  variant: VariantKey;
  width: "phone" | "wide";
  theme?: "light" | "dark";
};

const nav: Record<Language, string[]> = {
  en: [
    "Planner",
    "Ideas",
    "Timer",
    "Summaries",
    "Finance",
    "Export",
    "Settings",
  ],
  fa: ["برنامه", "ایده‌ها", "زمان‌سنج", "خلاصه‌ها", "مالی", "خروجی", "تنظیمات"],
};

const links: Record<RouteKey, number[]> = {
  "/": [1, 2, 3, 4, 5, 6],
  "/ideas": [0],
  "/timer": [0],
  "/summaries": [4, 5, 0],
  "/finance": [0, 3, 5],
  "/export": [4, 0],
  "/settings": [0, 3],
};

const dialogVariants: VariantKey[] = [
  "schedule",
  "template",
  "unsaved",
  "delete",
  "replace",
];

function VariantScene({
  spec,
  language,
  dialog = false,
}: {
  spec: VariantSpec;
  language: Language;
  dialog?: boolean;
}) {
  return (
    <section
      className={`state-panel ${spec.tone ?? "plain"} ${dialog ? "state-dialog" : ""}`}
      role={dialog ? "dialog" : undefined}
      aria-modal={dialog ? true : undefined}
      aria-label={dialog ? spec.title[language] : undefined}
    >
      {dialog && <div className="dialog-grip" aria-hidden="true" />}
      {spec.route === "/timer" && (
        <div className="timer-phase">
          <span className="selected">
            {language === "fa" ? "تمرکز" : "Focus"}
          </span>
          <span>{language === "fa" ? "استراحت" : "Rest"}</span>
        </div>
      )}
      <h4>{spec.title[language]}</h4>
      <p>{spec.message[language]}</p>
      {spec.timer && (
        <div className="hourglass">
          <svg viewBox="0 0 160 190" aria-hidden="true">
            <path
              className="hourglass-glass"
              d="M24 20 H136 Q130 63 85 94 H75 Q30 63 24 20 Z M75 96 H85 Q130 127 136 170 H24 Q30 127 75 96 Z"
              fill="#e7f4ef"
              stroke="#0f766e"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M43 34 H117 Q108 59 80 85 Q52 59 43 34 Z"
              fill="#d69a54"
              opacity={
                spec.key === "completed"
                  ? 0
                  : spec.key === "running"
                    ? 0.7
                    : 0.42
              }
            />
            <path
              d="M80 110 Q58 138 48 159 H112 Q102 138 80 110 Z"
              fill="#d69a54"
              opacity={
                spec.key === "completed"
                  ? 0.9
                  : spec.key === "running"
                    ? 0.32
                    : 0.55
              }
            />
            <path
              className="hourglass-frame"
              d="M15 18 H145 M15 172 H145"
              stroke="#125b53"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          <span className="num" dir="ltr">
            {spec.timer}
          </span>
        </div>
      )}
      {spec.timer && (
        <div
          className="timer-progress"
          role="progressbar"
          aria-label={language === "fa" ? "پیشرفت زمان‌سنج" : "Timer progress"}
          aria-valuenow={
            spec.key === "completed" ? 100 : spec.key === "paused" ? 51 : 26
          }
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            style={{
              width:
                spec.key === "completed"
                  ? "100%"
                  : spec.key === "paused"
                    ? "51%"
                    : "26%",
            }}
          />
        </div>
      )}
      {spec.fields && (
        <div className="stack">
          {spec.fields.map((field) => (
            <label className="studio-input" key={field.en}>
              <span>{field[language]}</span>
              {field.en === "Months to show" ? (
                <select aria-label={field[language]} defaultValue="3">
                  {[1, 3, 6, 12].map(months => (
                    <option key={months} value={months}>
                      {language === "fa" ? `${new Intl.NumberFormat("fa-IR").format(months)} ماه` : `${months} ${months === 1 ? "month" : "months"}`}
                    </option>
                  ))}
                </select>
              ) : <input
                type={
                  field.en === "PIN"
                    ? "password"
                    : field.en.toLowerCase().includes("time")
                      ? "time"
                      : field.en.toLowerCase().includes("date")
                        ? "date"
                        : "text"
                }
                aria-label={field[language]}
              />}
            </label>
          ))}
        </div>
      )}
      {spec.actions && (
        <div className="row" style={{ marginTop: 12, flexWrap: "wrap" }}>
          {spec.actions.map((action, index) => (
            <button
              type="button"
              className={`btn ${spec.route === "/timer" ? (index > 0 ? "alt" : "") : index === 0 && spec.actions!.length > 1 ? "alt" : spec.tone === "urgent" ? "danger" : ""}`}
              key={action.en}
            >
              {action[language]}
            </button>
          ))}
        </div>
      )}
      {spec.route === "/timer" && spec.timer && (
        <div className="timer-settings">
          <h5>{language === "fa" ? "مدت جلسه‌ها" : "Session lengths"}</h5>
          <div className="grid2">
            <div className="field">
              {language === "fa" ? "تمرکز · ۲۵ دقیقه" : "Focus · 25 min"}
            </div>
            <div className="field">
              {language === "fa" ? "استراحت · ۵ دقیقه" : "Rest · 5 min"}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Phone({
  route,
  language,
  variant,
  width,
  theme = "light",
}: Omit<PreviewProps, "language"> & { language: Language }) {
  const page = pages.find((candidate) => candidate.path === route);
  if (!page) return null;
  const copy = page[language];
  const scene = variants.find(
    (candidate) => candidate.route === route && candidate.key === variant,
  );
  const isDialog = !!scene && dialogVariants.includes(variant);
  const showBaseline =
    !scene || !(["empty", "locked"].includes(variant) || route === "/timer");
  const content = (
    route === "/timer"
      ? copy.content.replace(
          /<div class="circle">.*?<\/div>/,
          `<div class="hourglass"><svg viewBox="0 0 160 190" aria-hidden="true"><path class="hourglass-glass" d="M24 20 H136 Q130 63 85 94 H75 Q30 63 24 20 Z M75 96 H85 Q130 127 136 170 H24 Q30 127 75 96 Z" fill="#e7f4ef" stroke="#0f766e" stroke-width="5" stroke-linejoin="round"/><path class="hourglass-frame" d="M15 18 H145 M15 172 H145" stroke="#125b53" stroke-width="8" stroke-linecap="round"/></svg><span class="num">25:00</span></div>`,
        )
      : copy.content
  ).replace(
    /<span class="btn([^"]*)">([^<]*)<\/span>/g,
    '<button type="button" class="btn$1">$2</button>',
  );

  return (
    <div>
      <div className="studio-frame-label">
        {language === "fa" ? "فارسی · راست‌به‌چپ" : "English · left-to-right"} ·{" "}
        {width === "phone" ? "390px phone" : "wide"} · {theme} · {language === "fa" ? "مرجع ساختاری" : "structural reference"}
      </div>
      <div
        className={`phone ${width === "wide" ? "wide" : ""} ${isDialog ? "has-dialog" : ""} ${theme === "dark" ? "theme-dark" : ""}`}
        lang={language}
        dir={language === "fa" ? "rtl" : "ltr"}
      >
        <header className={`route-head ${route === "/" ? "planner-head" : ""}`}>
          <div className="route-brand">
            <span>Smart Paper</span>
            <strong>{copy.title}</strong>
          </div>
          <nav
            aria-label={language === "fa" ? "صفحه‌های مرتبط" : "Related pages"}
            className="route-links"
          >
            <span className="route-language">
              {language === "fa" ? "FA · EN" : "EN · FA"}
            </span>
            {links[route].map((index) => (
              <span className="route-link" key={index}>
                {nav[language][index]}
              </span>
            ))}
            <span className="route-appearance" role="group" aria-label={language === "fa" ? "ظاهر" : "Appearance"}>
              <span className={theme === "light" ? "selected" : ""}>{language === "fa" ? "روشن" : "Light"}</span>
              <span className={theme === "dark" ? "selected" : ""}>{language === "fa" ? "تیره" : "Dark"}</span>
            </span>
          </nav>
        </header>
        <div className="body">
          <p className="lede">{copy.lede}</p>
          {scene && !isDialog && route !== "/" && (
            <VariantScene spec={scene} language={language} />
          )}
          {route === "/" ? (
            <PlannerPreview
              key={`${language}-${variant}`}
              language={language}
              variant={variant}
            />
          ) : (
            showBaseline && (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )
          )}
        </div>
        {scene && isDialog && (
          <div className="state-scrim">
            <VariantScene spec={scene} language={language} dialog />
          </div>
        )}
      </div>
    </div>
  );
}

export function ScreenPreview({
  route,
  language,
  variant,
  width,
  theme = "light",
}: PreviewProps) {
  const page = pages.find((candidate) => candidate.path === route);
  if (!page) return null;
  const languages: Language[] = language === "both" ? ["en", "fa"] : [language];
  return (
    <main className={`studio-board ${theme === "dark" ? "studio-board-dark" : ""}`}>
      <div className="studio-heading">
        <h1>
          {page.name} ·{" "}
          {variant === "baseline" ? "populated baseline" : variant}
        </h1>
        <p>
          {page.desc} Android local-data structural references with illustrative sample data.
          Planner interaction references live in the Calm and day minimization
          stories. These sketches are not exact app screens.
        </p>
      </div>
      <div className={`studio-pair ${width === "wide" ? "wide" : ""}`}>
        {languages.map((item) => (
          <Phone
            key={item}
            route={route}
            language={item}
            variant={variant}
            width={width}
            theme={theme}
          />
        ))}
      </div>
      <p className="studio-note">
        Mapped states: {page.states}. Source of truth for behavior and
        production copy: frontend components and <code>src/lib/i18n.ts</code>.
        Review against the running app before marking a design ready.
      </p>
    </main>
  );
}
