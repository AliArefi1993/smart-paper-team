import type { Language, RouteKey } from "./atlas-data";

export type VariantKey =
  | "baseline"
  | "sparse"
  | "schedule"
  | "template"
  | "unsaved"
  | "empty"
  | "search"
  | "edit"
  | "delete"
  | "running"
  | "paused"
  | "completed"
  | "invalid"
  | "filtered"
  | "locked"
  | "report"
  | "replace"
  | "validation";

type Copy = Record<Language, string>;
export type VariantSpec = {
  route: RouteKey;
  key: VariantKey;
  title: Copy;
  message: Copy;
  fields?: Copy[];
  actions?: Copy[];
  tone?: "plain" | "attention" | "urgent";
  timer?: string;
};

// Source-backed flow markers with illustrative sample content. Final copy comes from i18n.ts.
export const variants: VariantSpec[] = [
  {
    route: "/",
    key: "sparse",
    title: { en: "A clear day", fa: "روزی بدون برنامه" },
    message: {
      en: "No timed entries yet. Keep the weekly goal and active sections available.",
      fa: "هنوز برنامه زمان‌دار ثبت نشده است. هدف هفته و بخش‌های فعال همچنان در دسترس هستند.",
    },
    actions: [
      { en: "Add schedule entry", fa: "افزودن برنامه زمانی" },
      { en: "Save week", fa: "ذخیره هفته" },
    ],
  },
  {
    route: "/",
    key: "schedule",
    title: { en: "Add a timed entry", fa: "افزودن برنامه زمان‌دار" },
    message: {
      en: "A sheet keeps the selected day in context.",
      fa: "پنل، روز انتخاب‌شده را در زمینه نگه می‌دارد.",
    },
    fields: [
      { en: "Title", fa: "عنوان" },
      { en: "Start time", fa: "زمان آغاز" },
      { en: "End time", fa: "زمان پایان" },
    ],
    actions: [
      { en: "Cancel", fa: "انصراف" },
      { en: "Save entry", fa: "ذخیره برنامه" },
    ],
  },
  {
    route: "/",
    key: "template",
    title: { en: "Week templates", fa: "الگوهای هفته" },
    message: {
      en: "Save the full week, apply a saved template, or delete it with confirmation.",
      fa: "هفته کامل را ذخیره کنید، الگو را اعمال کنید یا پس از تأیید حذف کنید.",
    },
    actions: [
      { en: "Save template", fa: "ذخیره الگو" },
      { en: "Apply template", fa: "اعمال الگو" },
      { en: "Delete template", fa: "حذف الگو" },
    ],
    tone: "attention",
  },
  {
    route: "/",
    key: "unsaved",
    title: { en: "Unsaved week changes", fa: "تغییرات ذخیره‌نشده هفته" },
    message: {
      en: "Changing the week or leaving this screen can discard edits.",
      fa: "تغییر هفته یا ترک صفحه ممکن است ویرایش‌ها را از بین ببرد.",
    },
    actions: [
      { en: "Keep editing", fa: "ادامه ویرایش" },
      { en: "Leave without saving", fa: "خروج بدون ذخیره" },
    ],
    tone: "attention",
  },
  {
    route: "/ideas",
    key: "empty",
    title: { en: "Start with one thought", fa: "با یک فکر شروع کنید" },
    message: {
      en: "No notes yet. The editor stays primary; optional sparks remain available.",
      fa: "هنوز یادداشتی نیست. ویرایشگر اصلی است و جرقه‌های اختیاری در دسترس‌اند.",
    },
    fields: [{ en: "Your idea", fa: "ایده شما" }],
    actions: [{ en: "Save idea", fa: "ذخیره ایده" }],
  },
  {
    route: "/ideas",
    key: "search",
    title: { en: "No matching ideas", fa: "ایده‌ای پیدا نشد" },
    message: {
      en: "Keep the search term visible and make clearing it easy.",
      fa: "عبارت جست‌وجو نمایان بماند و پاک‌کردن آن آسان باشد.",
    },
    fields: [{ en: "Search ideas", fa: "جست‌وجوی ایده‌ها" }],
    actions: [{ en: "Clear search", fa: "پاک‌کردن جست‌وجو" }],
  },
  {
    route: "/ideas",
    key: "edit",
    title: {
      en: "Edit or branch a thought",
      fa: "ویرایش یا شاخه‌دادن به یک فکر",
    },
    message: {
      en: "Preserve the original note context while changing or branching it.",
      fa: "زمینه یادداشت اصلی هنگام ویرایش یا شاخه‌دادن حفظ شود.",
    },
    fields: [{ en: "Thought text", fa: "متن فکر" }],
    actions: [
      { en: "Cancel", fa: "انصراف" },
      { en: "Save", fa: "ذخیره" },
    ],
  },
  {
    route: "/ideas",
    key: "delete",
    title: { en: "Delete this idea?", fa: "این ایده حذف شود؟" },
    message: {
      en: "This removes the selected note. Make the destructive choice explicit.",
      fa: "یادداشت انتخاب‌شده حذف می‌شود. اقدام حذف باید روشن باشد.",
    },
    actions: [
      { en: "Cancel", fa: "انصراف" },
      { en: "Delete idea", fa: "حذف ایده" },
    ],
    tone: "urgent",
  },
  {
    route: "/timer",
    key: "running",
    title: { en: "Focus is running", fa: "تمرکز در حال اجراست" },
    message: {
      en: "The countdown can recover after navigation or suspension.",
      fa: "شمارش معکوس پس از جابه‌جایی یا توقف برنامه بازیابی می‌شود.",
    },
    timer: "18:42",
    actions: [
      { en: "Pause", fa: "مکث" },
      { en: "Reset", fa: "بازنشانی" },
    ],
  },
  {
    route: "/timer",
    key: "paused",
    title: { en: "Focus is paused", fa: "تمرکز متوقف شده است" },
    message: {
      en: "Elapsed and remaining time must stay unambiguous.",
      fa: "زمان گذشته و باقی‌مانده باید روشن باشند.",
    },
    timer: "12:15",
    actions: [
      { en: "Resume", fa: "ادامه" },
      { en: "Reset", fa: "بازنشانی" },
    ],
  },
  {
    route: "/timer",
    key: "completed",
    title: { en: "Focus complete", fa: "تمرکز تمام شد" },
    message: {
      en: "The next rest phase starts only after an explicit action.",
      fa: "مرحله استراحت تنها با اقدام صریح آغاز می‌شود.",
    },
    timer: "00:00",
    actions: [
      { en: "Start rest", fa: "شروع استراحت" },
      { en: "Reset", fa: "بازنشانی" },
    ],
  },
  {
    route: "/timer",
    key: "invalid",
    title: { en: "Check the duration", fa: "مدت را بررسی کنید" },
    message: {
      en: "Enter a valid whole-minute focus and rest length before starting.",
      fa: "پیش از شروع، مدت صحیح بر حسب دقیقه کامل وارد کنید.",
    },
    fields: [
      { en: "Focus minutes", fa: "دقیقه تمرکز" },
      { en: "Rest minutes", fa: "دقیقه استراحت" },
    ],
    tone: "urgent",
  },
  {
    route: "/summaries",
    key: "empty",
    title: { en: "No weeks in this range", fa: "هفته‌ای در این بازه نیست" },
    message: {
      en: "The selected month range stays visible so it can be changed.",
      fa: "بازه ماه‌های انتخاب‌شده نمایان می‌ماند تا بتوان آن را تغییر داد.",
    },
    fields: [
      { en: "From month", fa: "از ماه" },
      { en: "To month", fa: "تا ماه" },
    ],
  },
  {
    route: "/summaries",
    key: "filtered",
    title: { en: "Empty weeks hidden", fa: "هفته‌های خالی پنهان‌اند" },
    message: {
      en: "The filter explains why fewer week cards are shown.",
      fa: "فیلتر دلیل نمایش کارت‌های کمتر را روشن می‌کند.",
    },
    actions: [{ en: "Show empty weeks", fa: "نمایش هفته‌های خالی" }],
  },
  {
    route: "/finance",
    key: "locked",
    title: { en: "Finance is locked", fa: "بخش مالی قفل است" },
    message: {
      en: "The local PIN hides this screen but does not encrypt stored finance data.",
      fa: "رمز محلی این صفحه را پنهان می‌کند ولی داده‌های مالی ذخیره‌شده را رمزگذاری نمی‌کند.",
    },
    fields: [{ en: "PIN", fa: "رمز" }],
    actions: [{ en: "Unlock", fa: "باز کردن" }],
    tone: "attention",
  },
  {
    route: "/finance",
    key: "empty",
    title: { en: "No income added yet", fa: "هنوز درآمدی ثبت نشده است" },
    message: {
      en: "The annual goal may also be unset. Keep both first actions visible.",
      fa: "ممکن است هدف سالانه نیز تعیین نشده باشد. هر دو اقدام آغازین نمایان باشند.",
    },
    actions: [
      { en: "Set goal", fa: "تنظیم هدف" },
      { en: "Add income", fa: "افزودن درآمد" },
    ],
  },
  {
    route: "/finance",
    key: "edit",
    title: { en: "Edit income", fa: "ویرایش درآمد" },
    message: {
      en: "Amount must be positive and the date is required.",
      fa: "مبلغ باید مثبت باشد و تاریخ لازم است.",
    },
    fields: [
      { en: "Amount", fa: "مبلغ" },
      { en: "Note", fa: "یادداشت" },
      { en: "Date", fa: "تاریخ" },
    ],
    actions: [
      { en: "Cancel", fa: "انصراف" },
      { en: "Save", fa: "ذخیره" },
    ],
  },
  {
    route: "/finance",
    key: "invalid",
    title: { en: "Check the income entry", fa: "درآمد را بررسی کنید" },
    message: {
      en: "A wrong PIN, invalid amount, missing date, or save error needs clear feedback.",
      fa: "رمز اشتباه، مبلغ نامعتبر، تاریخ خالی یا خطای ذخیره به بازخورد روشن نیاز دارد.",
    },
    tone: "urgent",
  },
  {
    route: "/export",
    key: "locked",
    title: { en: "Unlock export overview", fa: "باز کردن بخش خروجی" },
    message: {
      en: "General export and import counts require the finance PIN; planner-only AI report fields remain available.",
      fa: "آمار خروجی و ورود کلی به رمز مالی نیاز دارد؛ بخش‌های غیرمالی گزارش هوش مصنوعی در دسترس‌اند.",
    },
    fields: [{ en: "PIN", fa: "رمز" }],
    actions: [{ en: "Unlock", fa: "باز کردن" }],
    tone: "attention",
  },
  {
    route: "/export",
    key: "report",
    title: { en: "Review report scope", fa: "دامنه گزارش را بررسی کنید" },
    message: {
      en: "Both dates are inclusive, or both blank means all dates. Finance fields are opt-in.",
      fa: "هر دو تاریخ شامل‌اند، و خالی‌بودن هر دو یعنی همه تاریخ‌ها. داده مالی انتخابی است.",
    },
    fields: [
      { en: "Start date", fa: "تاریخ آغاز" },
      { en: "End date", fa: "تاریخ پایان" },
    ],
    actions: [
      { en: "Preview", fa: "پیش‌نمایش" },
      { en: "Share report file", fa: "اشتراک فایل گزارش" },
    ],
  },
  {
    route: "/export",
    key: "replace",
    title: { en: "Replace old data?", fa: "داده‌های قبلی جایگزین شوند؟" },
    message: {
      en: "Show selected-file counts. Planner, idea, and finance data will be replaced and cannot be restored by undo.",
      fa: "تعداد داده‌های فایل انتخاب‌شده نمایش داده شود. داده‌های برنامه، ایده و مالی جایگزین می‌شوند و بازگشت‌پذیر نیستند.",
    },
    actions: [
      { en: "Cancel", fa: "انصراف" },
      { en: "Replace data", fa: "جایگزینی داده‌ها" },
    ],
    tone: "urgent",
  },
  {
    route: "/export",
    key: "invalid",
    title: { en: "Cannot use this file", fa: "این فایل قابل استفاده نیست" },
    message: {
      en: "Invalid JSON, missing report fields, or an invalid date range blocks the related action.",
      fa: "JSON نامعتبر، انتخاب‌نشدن بخش گزارش یا بازه تاریخ نامعتبر اقدام مربوط را متوقف می‌کند.",
    },
    tone: "urgent",
  },
  {
    route: "/settings",
    key: "edit",
    title: { en: "Edit planner sections", fa: "ویرایش بخش‌های برنامه" },
    message: {
      en: "Ten stable slots retain their identities; at least one stays active.",
      fa: "هویت ده بخش ثابت می‌ماند و دست‌کم یکی باید فعال باشد.",
    },
    fields: [
      { en: "Section label", fa: "نام بخش" },
      { en: "Morning reminder time", fa: "زمان اعلان صبح" },
    ],
    actions: [{ en: "Save settings", fa: "ذخیره تنظیمات" }],
  },
  {
    route: "/settings",
    key: "validation",
    title: { en: "Keep one section active", fa: "یک بخش را فعال نگه دارید" },
    message: {
      en: "Blank labels disable Save. Turning off the final active section reports an error.",
      fa: "نام خالی ذخیره را غیرفعال می‌کند. خاموش‌کردن آخرین بخش فعال خطا می‌دهد.",
    },
    tone: "urgent",
  },
  {
    route: "/settings",
    key: "unsaved",
    title: { en: "Unsaved settings", fa: "تنظیمات ذخیره‌نشده" },
    message: {
      en: "Confirm before navigating to Planner or Summaries.",
      fa: "پیش از رفتن به برنامه یا خلاصه‌ها تأیید بگیرید.",
    },
    actions: [
      { en: "Stay", fa: "ماندن" },
      { en: "Leave", fa: "خروج" },
    ],
    tone: "attention",
  },
];

export const variantsFor = (route: RouteKey) =>
  variants.filter((variant) => variant.route === route);
