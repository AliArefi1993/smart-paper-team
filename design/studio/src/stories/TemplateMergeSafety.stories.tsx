import type { Meta, StoryObj } from "@storybook/react-vite";

type Props = { language: "en" | "fa"; width: "phone" | "wide"; empty: boolean };

// Review-only data outcome board. These labels are not proposed application copy.
function TemplateMergeSafety({ language, width, empty }: Props) {
  const fa = language === "fa";
  const names = fa
    ? ["هفته مطالعه همراه با یادداشت‌های طولانی برای مرور درس‌ها", "برنامه قدیمی", "برنامه به‌روز", "هفته ورزش"]
    : ["Study week with longer notes for reviewing the course material", "Old routine", "Updated routine", "Exercise week"];
  const row = (id: number, name: string) => <li key={id}><bdi>#{id}</bdi> · {name}</li>;
  const incoming = empty ? [] : [row(2, names[2]), row(3, names[3])];
  const merged = empty
    ? [row(1, names[0]), row(2, names[1])]
    : [row(1, names[0]), row(2, names[2]), row(3, names[3])];
  const groups = [
    { title: fa ? "الگوهای ذخیره‌شده پیش از ورود" : "Saved templates before import", records: [row(1, names[0]), row(2, names[1])] },
    { title: fa ? "الگوهای فایل پشتیبان" : "Incoming backup templates", records: incoming },
    { title: fa ? "پیش از اصلاح: ادغام" : "Before fix: Merge", records: incoming },
    { title: fa ? "پس از اصلاح: ادغام" : "After fix: Merge", records: merged },
    { title: fa ? "جایگزینی پس از تأیید" : "Replace after confirmation", records: incoming },
  ];
  return <article className={`phone ${width === "wide" ? "wide" : ""}`} dir={fa ? "rtl" : "ltr"} lang={language}>
    <div className="body">
      <h3>{fa ? "ایمنی ادغام الگوها" : "Template merge safety"}</h3>
      <p>{fa ? "نمونه طراحی برای بررسی نتیجه داده‌ها؛ صفحه جدید برنامه نیست." : "Design review of data outcomes; this is not a new application screen."}</p>
      {groups.map(({ title, records }) => <section className="box" key={title}>
        <h4>{title}</h4>
        {records.length ? <ul style={{ paddingInlineStart: 24, overflowWrap: "anywhere" }}>{records}</ul> : <p>{fa ? "هیچ الگویی" : "No templates"}</p>}
      </section>)}
      <p>{fa ? "در ادغام، شناسه‌های دیگر حفظ می‌شوند و نسخه ورودی با شناسه یکسان اولویت دارد. فایل خالی چیزی را حذف نمی‌کند." : "Merge keeps other IDs and uses the incoming record for a matching ID. An empty incoming list deletes nothing."}</p>
    </div>
  </article>;
}

const meta = {
  title: "Proposals/Template merge safety",
  component: TemplateMergeSafety,
  args: { language: "en", width: "phone", empty: false },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
  },
} satisfies Meta<typeof TemplateMergeSafety>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhone: Story = { args: { language: "fa" } };
export const EnglishWide: Story = { args: { width: "wide" } };
export const PersianWide: Story = { args: { language: "fa", width: "wide" } };
export const EmptyMerge: Story = { args: { empty: true } };
export const PersianEmptyMerge: Story = { args: { empty: true, language: "fa" } };
