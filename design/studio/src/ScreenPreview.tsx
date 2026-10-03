import { pages, type Language, type RouteKey } from "./atlas-data";
import { variants, type VariantKey, type VariantSpec } from "./variants";

export type PreviewProps = {
  route: RouteKey;
  language: "both" | Language;
  variant: VariantKey;
  width: "phone" | "wide";
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

function VariantScene({
  spec,
  language,
}: {
  spec: VariantSpec;
  language: Language;
}) {
  return (
    <div className={`state-panel ${spec.tone ?? "plain"}`}>
      <h4>{spec.title[language]}</h4>
      <p>{spec.message[language]}</p>
      {spec.timer && (
        <div className="circle">
          <span className="num">{spec.timer}</span>
        </div>
      )}
      {spec.fields && (
        <div className="stack">
          {spec.fields.map((field) => (
            <div className="field" key={field.en}>
              {field[language]}
            </div>
          ))}
        </div>
      )}
      {spec.actions && (
        <div className="row" style={{ marginTop: 12, flexWrap: "wrap" }}>
          {spec.actions.map((action, index) => (
            <span
              className={`btn ${index === 0 ? "alt" : spec.tone === "urgent" ? "danger" : ""}`}
              key={action.en}
            >
              {action[language]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Phone({
  route,
  language,
  variant,
  width,
}: Omit<PreviewProps, "language"> & { language: Language }) {
  const page = pages.find((candidate) => candidate.path === route);
  if (!page) return null;
  const copy = page[language];
  const scene = variants.find(
    (candidate) => candidate.route === route && candidate.key === variant,
  );
  const currentIndex = pages.indexOf(page);

  return (
    <div>
      <div className="studio-frame-label">
        {language === "fa" ? "فارسی · راست‌به‌چپ" : "English · left-to-right"} ·{" "}
        {width === "phone" ? "390px phone" : "wide"} · structural draft
      </div>
      <div
        className={`phone ${width === "wide" ? "wide" : ""}`}
        lang={language}
        dir={language === "fa" ? "rtl" : "ltr"}
      >
        <div className="bar">
          <span>Smart Paper</span>
          <span>{language === "fa" ? "فارسی" : "English"} · ☰</span>
        </div>
        <div className="body">
          <span className="eyebrow">{page.path}</span>
          <h3>{copy.title}</h3>
          <p className="lede">{copy.lede}</p>
          {scene ? (
            <VariantScene spec={scene} language={language} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: copy.content }} />
          )}
        </div>
        <div className="nav">
          {nav[language].map((item, index) => (
            <span key={item}>
              {index === currentIndex ? <b>{item}</b> : item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScreenPreview({
  route,
  language,
  variant,
  width,
}: PreviewProps) {
  const page = pages.find((candidate) => candidate.path === route);
  if (!page) return null;
  const languages: Language[] = language === "both" ? ["en", "fa"] : [language];
  return (
    <main className="studio-board">
      <div className="studio-heading">
        <h1>
          {page.name} ·{" "}
          {variant === "baseline" ? "populated baseline" : variant}
        </h1>
        <p>
          {page.desc} These are editable design prototypes with illustrative
          sample data, not running app screens or approved redesigns.
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
