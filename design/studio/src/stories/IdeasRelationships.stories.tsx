import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
const states = [
  "collection",
  "reader",
  "independent",
  "missing-origin",
  "missing-target",
  "same-prose",
  "self-reference",
  "cycle",
  "empty",
  "no-matches",
  "recovered",
  "write-error",
  "cleanup-pending",
] as const;
type State = (typeof states)[number];
type Props = {
  language: "en" | "fa";
  theme: "light" | "dark";
  width: "phone" | "wide";
  state: State;
  largeText: boolean;
  search: boolean;
  entry: "collection" | "daily";
  draftMode: "new" | "edit" | "branch";
};
type Note = {
  id: string;
  body: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
};
const rawDraft = "  فکر ناتمام\nMixed writing  ";
function IdeasRelationships({
  language,
  theme,
  width,
  state,
  largeText,
  search,
  entry,
  draftMode,
}: Props) {
  const fa = language === "fa";
  const c = (en: string, faText: string) => (fa ? faText : en);
  const firstBody = c(
    "A quieter morning\n\nMake enough room to notice what helps. A thought can stay unfinished until there is something more to say.",
    "صبحی آرام‌تر\n\nفرصت کافی بگذارم تا ببینم چه چیزی کمک می‌کند. فکر می‌تواند ناتمام بماند تا چیز دیگری برای گفتن پیدا شود.",
  );
  const records: Note[] = [
    {
      id: "a",
      body: firstBody,
      parent_id: null,
      created_at: "2026-10-01T10:00:00Z",
      updated_at: "2026-10-01T10:00:00Z",
    },
    {
      id: "b",
      body: c(
        "Try preparing breakfast the night before\n\nLeave a little space before the first appointment. Write down what felt different, even if the answer is still unclear.\n\nA longer thought can include several paragraphs: a small practical experiment, a question I want to revisit, and something I noticed while reading. Keep the exact saved wording here, including a mixed-language phrase: صبحی آرام‌تر / a quieter morning.",
        "آماده‌کردن صبحانه از شب قبل\n\nپیش از اولین قرار کمی فرصت بگذارم. بنویسم چه چیزی متفاوت بود، حتی اگر پاسخ هنوز روشن نیست.\n\nفکر طولانی می‌تواند چند بند داشته باشد: یک تجربهٔ کوچک عملی، پرسشی که می‌خواهم دوباره به آن برگردم و چیزی که هنگام مطالعه متوجه شدم. عبارت ذخیره‌شده همین‌جا خوانده می‌شود، با جمله‌ای دو‌زبانه: صبحی آرام‌تر / a quieter morning.",
      ),
      parent_id: "a",
      created_at: "2026-10-02T10:00:00Z",
      updated_at: "2026-10-02T10:00:00Z",
    },
    {
      id: "c",
      body: c(
        "Leave space before the first appointment",
        "پیش از اولین قرار فرصت بگذار",
      ),
      parent_id: "a",
      created_at: "2026-10-03T10:00:00Z",
      updated_at: "2026-10-03T10:00:00Z",
    },
    {
      id: "d",
      body: c("Write down what felt different", "بنویس چه چیزی متفاوت بود"),
      parent_id: "b",
      created_at: "2026-10-04T10:00:00Z",
      updated_at: "2026-10-04T10:00:00Z",
    },
    {
      id: "e",
      body: firstBody,
      parent_id: null,
      created_at: "2026-10-05T10:00:00Z",
      updated_at: "2026-10-05T10:00:00Z",
    },
    {
      id: "o",
      body: c(
        "A thought whose original is unavailable",
        "فکری که فکر اصلی آن در دسترس نیست",
      ),
      parent_id: "missing",
      created_at: "2026-10-06T10:00:00Z",
      updated_at: "2026-10-06T10:00:00Z",
    },
    {
      id: "s",
      body: c(
        "This imported thought points to itself",
        "این فکر واردشده به خودش اشاره دارد",
      ),
      parent_id: "s",
      created_at: "2026-10-07T10:00:00Z",
      updated_at: "2026-10-07T10:00:00Z",
    },
    {
      id: "x",
      body: c(
        "First thought in a saved reference loop",
        "فکر اول در یک حلقهٔ ارجاع ذخیره‌شده",
      ),
      parent_id: "y",
      created_at: "2026-10-08T10:00:00Z",
      updated_at: "2026-10-08T10:00:00Z",
    },
    {
      id: "y",
      body: c(
        "Second thought in a saved reference loop",
        "فکر دوم در یک حلقهٔ ارجاع ذخیره‌شده",
      ),
      parent_id: "x",
      created_at: "2026-10-09T10:00:00Z",
      updated_at: "2026-10-09T10:00:00Z",
    },
  ];
  const notes = state === "empty" ? [] : records;
  const initialId =
    state === "independent" || state === "same-prose"
      ? "a"
      : state === "missing-origin"
        ? "o"
        : state === "self-reference"
          ? "s"
          : state === "cycle"
            ? "x"
            : state === "missing-target"
              ? "gone"
              : "b";
  const [path, setPath] = useState<string[]>(
    ["collection", "empty", "no-matches"].includes(state) ? [] : [initialId],
  );
  const [query, setQuery] = useState(
    state === "no-matches" ? "zzzz" : search ? c("breakfast", "صبحانه") : "",
  );
  const [draft, setDraft] = useState(rawDraft);
  const [mode, setMode] = useState(draftMode);
  const [pending, setPending] = useState<"edit" | "branch" | null>(null);
  const [feedback, setFeedback] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const reader = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const collectionHeading = useRef<HTMLHeadingElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const entryScroll = useRef(0);
  const open = path.length > 0;
  const active = notes.find((note) => note.id === path[path.length - 1]);
  const origin =
    active?.parent_id && active.parent_id !== active.id
      ? notes.find((note) => note.id === active.parent_id)
      : null;
  const children = active
    ? notes
        .filter((note) => note.id !== active.id && note.parent_id === active.id)
        .sort(
          (a, b) =>
            a.created_at.localeCompare(b.created_at) ||
            a.id.localeCompare(b.id),
        )
    : [];
  const visible = ["b", "e", "a", "c", "d", "o", "s", "x", "y"]
    .map((id) => notes.find((note) => note.id === id))
    .filter((note): note is Note => !!note)
    .filter(
      (note) =>
        !query.trim() ||
        note.body
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
    );
  const date = (note: Note) =>
    new Intl.DateTimeFormat(fa ? "fa-IR" : "en-US", {
      dateStyle: "medium",
    }).format(new Date(note.created_at));
  const preview = (note: Note) => note.body.replace(/\s+/g, " ").slice(0, 95);
  useEffect(() => {
    if (open) {
      reader.current?.scrollTo({ top: 0 });
      heading.current?.focus();
    }
  }, [path, open]);
  function enter(note: Note, button: HTMLButtonElement) {
    trigger.current = button;
    entryScroll.current = page.current?.scrollTop ?? 0;
    setPath([note.id]);
    setFeedback("");
  }
  function close() {
    setPath([]);
    setPending(null);
    requestAnimationFrame(() => {
      if (page.current) page.current.scrollTop = entryScroll.current;
      (trigger.current?.isConnected
        ? trigger.current
        : collectionHeading.current
      )?.focus({ preventScroll: true });
    });
  }
  function back() {
    if (path.length > 1) setPath((previous) => previous.slice(0, -1));
    else close();
  }
  function replaceDraft(action: "edit" | "branch") {
    if (!active) return;
    if (state === "cleanup-pending") {
      setFeedback(
        c(
          "Thought saved. Retry draft cleanup before replacing writing.",
          "فکر ذخیره شد. پیش از جایگزینی نوشته، پاک‌کردن پیش‌نویس را دوباره امتحان کنید.",
        ),
      );
      return;
    }
    setPending(action);
  }
  function continueWriting() {
    if (!active || !pending) return;
    setDraft(pending === "edit" ? active.body : "");
    setMode(pending);
    setPending(null);
    setPath([]);
    requestAnimationFrame(() => {
      page.current?.scrollTo({ top: 0 });
      composer.current?.focus();
    });
  }
  const returnLabel =
    entry === "daily"
      ? c("Return to daily thought", "بازگشت به فکر روز")
      : c("Return to collection", "بازگشت به مجموعه");
  return (
    <article
      className={`ideas-relationships phone ${theme === "dark" ? "theme-dark" : ""}`}
      lang={language}
      dir={fa ? "rtl" : "ltr"}
      style={{
        width: "100%",
        maxWidth: width === "wide" ? 1000 : 390,
        height: "100dvh",
        minHeight: 0,
        margin: "auto",
        fontSize: largeText ? 22 : 16,
      }}
    >
      <style>{`.ideas-relationships .btn {min-height:48px;font-size:inherit;white-space:normal;} .ideas-relationships .field {width:100%;font-size:inherit;min-height:48px;} .ideas-relationships :focus-visible {outline:3px solid #a66a24;outline-offset:3px;} .ideas-relationships.theme-dark :focus-visible {outline-color:#f5c66f;} .ideas-relationships .reader-body {overflow:auto;min-height:0;flex:1;padding:20px;} .ideas-relationships .reader-body p {white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.65;} .ideas-relationships .relation-button {display:block;width:100%;text-align:start;justify-content:flex-start;padding:12px;margin-block:8px;border:1px solid var(--line);background:var(--soft);color:var(--ink);border-radius:12px;} .ideas-relationships .reader-shell {position:absolute;inset:0;display:flex;flex-direction:column;background:var(--paper);color:var(--ink);} .ideas-relationships .reader-header {padding:16px;border-bottom:1px solid var(--line);flex:none;background:var(--paper);} .ideas-relationships .notice {padding:12px;border-radius:10px;background:var(--soft);color:var(--ink);} .ideas-relationships .warning {padding:12px;background:var(--amber);color:var(--ink);border-radius:10px;}`}</style>
      <div
        ref={page}
        inert={open}
        aria-hidden={open || undefined}
        style={{ height: "100%", overflow: "auto", padding: 16 }}
      >
        <p className="eyebrow">
          {c(
            "Proposal · illustrative saved records",
            "پیشنهاد · اطلاعات ذخیره‌شدهٔ نمونه",
          )}
        </p>
        <h1>{c("Idea Space", "فضای ایده‌ها")}</h1>
        <section className="box">
          <h2>
            {mode === "edit"
              ? c("Shape this thought", "این فکر را شکل بده")
              : c("A fresh page", "صفحه‌ای تازه")}
          </h2>
          <label>
            {c("Unfinished writing", "نوشتهٔ ناتمام")}
            <textarea
              ref={composer}
              className="field"
              dir="auto"
              rows={4}
              readOnly={state === "cleanup-pending"}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <p>
            {c("Existing composer ·", "نوشتن فعلی ·")} {mode}
          </p>
          {state === "recovered" && (
            <p role="status">
              {c(
                "Draft restored. It is not a saved thought yet.",
                "پیش‌نویس بازیابی شد. هنوز فکر ذخیره‌شده نیست.",
              )}
            </p>
          )}
          {state === "write-error" && (
            <p role="alert" className="warning">
              {c(
                "Draft recovery could not be saved. Your writing is here, but may be lost after closing. Retry before leaving.",
                "پیش‌نویس برای بازیابی ذخیره نشد. نوشته اینجاست، اما ممکن است پس از بستن از دست برود. پیش از خروج دوباره تلاش کنید.",
              )}
            </p>
          )}
          {state === "cleanup-pending" && (
            <p role="alert" className="warning">
              {c(
                "Thought saved. Old draft cleanup failed; retry cleanup. Do not save again.",
                "فکر ذخیره شد. پاک‌کردن پیش‌نویس قبلی انجام نشد؛ پاک‌کردن را دوباره امتحان کنید. دوباره ذخیره نکنید.",
              )}
            </p>
          )}
          <button className="btn alt">
            {c("Keep thought", "نگه‌داشتن فکر")}
          </button>
        </section>
        {entry === "daily" && notes.length > 0 && (
          <section className="box">
            <h2>{c("A thought returning today", "فکری که امروز برمی‌گردد")}</h2>
            <p dir="auto">{records[1].body.slice(0, 120)}…</p>
            <button
              className="btn alt"
              onClick={(event) => enter(records[1], event.currentTarget)}
            >
              {c("Open thought", "باز کردن فکر")}
            </button>
          </section>
        )}
        <h2 ref={collectionHeading} tabIndex={-1}>
          {c("Thoughts to wander through", "فکرهایی برای گشتن")}
        </h2>
        <label>
          {c("Search saved thoughts", "جست‌وجوی فکرهای ذخیره‌شده")}
          <input
            className="field"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {notes.length === 0 ? (
          <p>
            {c(
              "Your saved thoughts will appear here.",
              "فکرهای ذخیره‌شدهٔ شما اینجا دیده می‌شوند.",
            )}
          </p>
        ) : visible.length === 0 ? (
          <p>
            {c(
              "No thoughts match this search.",
              "فکری با این جست‌وجو پیدا نشد.",
            )}
          </p>
        ) : (
          visible.map((note, index) => (
            <section key={note.id} className="box" style={{ marginTop: 16 }}>
              <p dir="auto" style={{ whiteSpace: "pre-wrap" }}>
                {preview(note)}…
              </p>
              <p>{date(note)}</p>
              <button
                className="btn alt"
                aria-label={c(
                  `Open saved thought ${index + 1}: ${preview(note)} · ${date(note)}`,
                  `باز کردن فکر ذخیره‌شدهٔ ${index + 1}: ${preview(note)} · ${date(note)}`,
                )}
                onClick={(event) => enter(note, event.currentTarget)}
              >
                {c("Open thought", "باز کردن فکر")}
              </button>
              {note.parent_id === null ? (
                <p>{c("Independent thought", "فکر مستقل")}</p>
              ) : (
                (() => {
                  const cardOrigin =
                    note.parent_id !== note.id
                      ? notes.find((item) => item.id === note.parent_id)
                      : null;
                  return cardOrigin ? (
                    <button
                      className="btn alt relation-button"
                      onClick={(event) =>
                        enter(cardOrigin, event.currentTarget)
                      }
                      aria-label={c(
                        `Open original thought for saved thought ${index + 1}: ${preview(cardOrigin)}`,
                        `باز کردن فکر اصلیِ فکر ذخیره‌شدهٔ ${index + 1}: ${preview(cardOrigin)}`,
                      )}
                    >
                      {c("Original thought", "فکر اصلی")}: {preview(cardOrigin)}
                      …
                    </button>
                  ) : (
                    <p>
                      {c(
                        "Original thought unavailable",
                        "فکر اصلی در دسترس نیست",
                      )}
                    </p>
                  );
                })()
              )}
            </section>
          ))
        )}
      </div>
      {open && (
        <div
          className="reader-shell"
          role="dialog"
          aria-modal="true"
          aria-labelledby="saved-thought-heading"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              if (pending) setPending(null);
              else back();
            }
            if (event.key === "Tab") {
              const elements = Array.from(
                event.currentTarget.querySelectorAll<HTMLElement>(
                  'button:not(:disabled),[tabindex="0"]',
                ),
              );
              const first = elements[0];
              const last = elements[elements.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }
          }}
        >
          <div className="reader-header">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {path.length > 1 && (
                <button className="btn alt" onClick={back}>
                  {c("Back to previous thought", "بازگشت به فکر قبلی")}
                </button>
              )}
              <button className="btn alt" onClick={close}>
                {returnLabel}
              </button>
            </div>
            <h2
              ref={heading}
              id="saved-thought-heading"
              tabIndex={-1}
              style={{ fontSize: "1.35em", marginBlock: "12px 0" }}
            >
              {active
                ? c("Saved thought", "فکر ذخیره‌شده")
                : c("Saved thought unavailable", "فکر ذخیره‌شده در دسترس نیست")}
            </h2>
            {active && (
              <p style={{ marginBlock: "6px 0", color: "var(--muted)" }}>
                {date(active)}
              </p>
            )}
          </div>
          <div className="reader-body" ref={reader} tabIndex={0}>
            {!active ? (
              <>
                <p role="alert">
                  {c(
                    "This saved thought is no longer available. Your writing is unchanged.",
                    "این فکر ذخیره‌شده دیگر در دسترس نیست. نوشتهٔ شما تغییر نکرده است.",
                  )}
                </p>
                <button className="btn alt" onClick={close}>
                  {returnLabel}
                </button>
              </>
            ) : (
              <>
                <p dir="auto" style={{ fontSize: "1.1em", marginTop: 0 }}>
                  {active.body}
                </p>
                <div className="notice">
                  <p style={{ margin: 0 }}>
                    {c(
                      "Your unfinished writing is unchanged.",
                      "نوشتهٔ ناتمام شما تغییر نکرده است.",
                    )}
                  </p>
                </div>
                <section
                  style={{ marginTop: 24, marginBottom: 24 }}
                  aria-labelledby="origin-heading"
                >
                  <h3 id="origin-heading">
                    {c("Original thought", "فکر اصلی")}
                  </h3>
                  {active.parent_id === null ? (
                    <p>
                      {c(
                        "Independent thought · no original thought",
                        "فکر مستقل · فکر اصلی ندارد",
                      )}
                    </p>
                  ) : origin ? (
                    <button
                      className="btn alt relation-button"
                      aria-label={c(
                        `Open original thought: ${preview(origin)} · ${date(origin)}`,
                        `باز کردن فکر اصلی: ${preview(origin)} · ${date(origin)}`,
                      )}
                      onClick={() =>
                        setPath((previous) => [...previous, origin.id])
                      }
                    >
                      <span>
                        <strong>
                          {preview(origin)}
                          {origin.body.length > 95 ? "…" : ""}
                        </strong>
                        <span
                          style={{
                            display: "block",
                            color: "var(--muted)",
                            fontSize: ".9em",
                          }}
                        >
                          {date(origin)}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <p>
                      {c(
                        "Original thought unavailable",
                        "فکر اصلی در دسترس نیست",
                      )}
                    </p>
                  )}
                </section>
                <section aria-labelledby="branches-heading">
                  <h3 id="branches-heading">
                    {c(
                      "Thoughts grown from this",
                      "فکرهایی که از این فکر رشد کرده‌اند",
                    )}
                  </h3>
                  {children.length === 0 ? (
                    <p>
                      {c(
                        "No thoughts have grown from this yet.",
                        "هنوز فکری از این فکر رشد نکرده است.",
                      )}
                    </p>
                  ) : (
                    children.map((child, index) => (
                      <button
                        className="btn alt relation-button"
                        key={child.id}
                        aria-label={c(
                          `Open grown thought ${index + 1} of ${children.length}: ${preview(child)} · ${date(child)}`,
                          `باز کردن فکر رشدکردهٔ ${index + 1} از ${children.length}: ${preview(child)} · ${date(child)}`,
                        )}
                        onClick={() =>
                          setPath((previous) => [...previous, child.id])
                        }
                      >
                        <span>
                          <strong>
                            {preview(child)}
                            {child.body.length > 95 ? "…" : ""}
                          </strong>
                          <span
                            style={{
                              display: "block",
                              color: "var(--muted)",
                              fontSize: ".9em",
                            }}
                          >
                            {date(child)}
                          </span>
                        </span>
                      </button>
                    ))
                  )}
                </section>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <button
                    className="btn alt"
                    onClick={() => replaceDraft("branch")}
                  >
                    {c("Grow this idea", "پرورش این ایده")}
                  </button>
                  <button
                    className="btn alt"
                    onClick={() => replaceDraft("edit")}
                  >
                    {c("Edit saved thought", "ویرایش فکر ذخیره‌شده")}
                  </button>
                </div>
                {feedback && (
                  <p role="alert" className="warning">
                    {feedback}
                  </p>
                )}
                {pending && (
                  <div
                    role="alertdialog"
                    aria-modal="true"
                    aria-label={c(
                      "Existing writing replacement confirmation",
                      "تأیید فعلی جایگزینی نوشته",
                    )}
                    className="warning"
                    style={{ marginTop: 16 }}
                  >
                    <p>
                      {c(
                        "Discard unsaved writing? Continuing discards current writing. Keep editing to save it first.",
                        "نوشته ذخیره‌نشده کنار گذاشته شود؟ ادامه دادن نوشته فعلی را کنار می‌گذارد. برای ذخیره، ابتدا ویرایش را ادامه دهید.",
                      )}
                    </p>
                    <button
                      className="btn alt"
                      onClick={() => {
                        setPending(null);
                        setFeedback("");
                      }}
                    >
                      {c("Keep writing", "ادامهٔ نوشتن")}
                    </button>
                    <button className="btn alt" onClick={continueWriting}>
                      {c("Discard and continue", "کنار گذاشتن و ادامه")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
const meta = {
  title: "Proposals/Ideas relationships",
  component: IdeasRelationships,
  args: {
    language: "en",
    theme: "light",
    width: "phone",
    state: "reader",
    largeText: false,
    search: false,
    entry: "collection",
    draftMode: "new",
  },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    theme: { control: "radio", options: ["light", "dark"] },
    width: { control: "radio", options: ["phone", "wide"] },
    state: { control: "select", options: states },
    entry: { control: "radio", options: ["collection", "daily"] },
    draftMode: { control: "radio", options: ["new", "edit", "branch"] },
  },
} satisfies Meta<typeof IdeasRelationships>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhoneDark: Story = {
  args: { language: "fa", theme: "dark" },
};
export const EnglishPhoneDark: Story = {
  args: { theme: "dark", state: "independent" },
};
export const PersianPhone: Story = {
  args: { language: "fa", state: "independent" },
};
export const EnglishWide: Story = {
  args: { width: "wide", state: "independent" },
};
export const EnglishWideDark: Story = {
  args: { width: "wide", theme: "dark" },
};
export const PersianWide: Story = { args: { width: "wide", language: "fa" } };
export const PersianWideDark: Story = {
  args: { width: "wide", language: "fa", theme: "dark", state: "independent" },
};
export const Collection: Story = { args: { state: "collection" } };
export const SearchReader: Story = { args: { search: true } };
export const DailyReader: Story = {
  args: { entry: "daily", language: "fa", theme: "dark" },
};
export const MissingOrigin: Story = { args: { state: "missing-origin" } };
export const MissingTarget: Story = {
  args: { state: "missing-target", language: "fa", theme: "dark" },
};
export const SameProse: Story = { args: { state: "same-prose" } };
export const SelfReference: Story = {
  args: { state: "self-reference", language: "fa" },
};
export const Cycle: Story = { args: { state: "cycle", theme: "dark" } };
export const Empty: Story = { args: { state: "empty" } };
export const NoMatches: Story = {
  args: { state: "no-matches", language: "fa" },
};
export const RecoveredDraft: Story = {
  args: {
    state: "recovered",
    draftMode: "edit",
    language: "fa",
    theme: "dark",
  },
};
export const WriteFailure: Story = {
  args: { state: "write-error", draftMode: "branch" },
};
export const CleanupPending: Story = {
  args: {
    state: "cleanup-pending",
    draftMode: "edit",
    language: "fa",
    theme: "dark",
  },
};
export const PersianLarge: Story = {
  args: { language: "fa", theme: "dark", largeText: true },
};
