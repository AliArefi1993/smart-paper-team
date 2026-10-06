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
      en: "No timed entries for Sunday yet. You can still set a daily goal and save the week.",
      fa: "هنوز برنامه زمان‌داری برای یکشنبه نیست. همچنان می‌توانید هدف روز را بنویسید و هفته را ذخیره کنید.",
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
      en: "Sunday · This week. Choose a title and exact start and end times.",
      fa: "یکشنبه · این هفته. عنوان و زمان دقیق آغاز و پایان را انتخاب کنید.",
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
      en: "Writing week · Save the current week or apply a saved full-week plan.",
      fa: "هفته نوشتن · هفته کنونی را ذخیره کنید یا یک برنامه کامل ذخیره‌شده را اعمال کنید.",
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
      en: "Save your edits before switching weeks or leaving this page.",
      fa: "پیش از تغییر هفته یا ترک این صفحه، ویرایش‌ها را ذخیره کنید.",
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
      en: "Your saved thoughts will appear here. Start with anything on your mind.",
      fa: "فکرهای ذخیره‌شده شما اینجا نمایش داده می‌شوند. با هرچه در ذهن دارید شروع کنید.",
    },
    fields: [{ en: "Your idea", fa: "ایده شما" }],
    actions: [{ en: "Save idea", fa: "ذخیره ایده" }],
  },
  {
    route: "/ideas",
    key: "search",
    title: { en: "No matching ideas", fa: "ایده‌ای پیدا نشد" },
    message: {
      en: "No notes match this search. Try another term or clear it.",
      fa: "یادداشتی با این جست‌وجو پیدا نشد. عبارت دیگری بنویسید یا آن را پاک کنید.",
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
      en: "Editing a note from today. Choose Save to keep changes on this device. Unsaved edits are not recovered after reload.",
      fa: "در حال ویرایش یادداشت امروز. برای نگه‌داشتن تغییرات روی این دستگاه، ذخیره را بزنید. ویرایش ذخیره‌نشده پس از بارگذاری دوباره بازیابی نمی‌شود.",
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
      en: "This note will be removed from this device.",
      fa: "این یادداشت از این دستگاه حذف می‌شود.",
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
      en: "Stay with this focus session or pause it when you need a break.",
      fa: "این جلسه تمرکز را ادامه دهید یا هنگام نیاز به استراحت مکث کنید.",
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
      en: "12 minutes and 15 seconds remain. Resume when you're ready.",
      fa: "۱۲ دقیقه و ۱۵ ثانیه باقی مانده است. هر وقت آماده بودید ادامه دهید.",
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
      en: "Your focus session is complete. Prepare the rest phase when you're ready.",
      fa: "جلسه تمرکز تمام شد. هر وقت آماده بودید مرحله استراحت را آماده کنید.",
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
      en: "No weeks are available in this range. Choose a wider range.",
      fa: "هفته‌ای در این بازه وجود ندارد. بازه بزرگ‌تری انتخاب کنید.",
    },
    fields: [{ en: "Months to show", fa: "تعداد ماه‌های نمایش" }],
  },
  {
    route: "/summaries",
    key: "filtered",
    title: { en: "Empty weeks hidden", fa: "هفته‌های خالی پنهان‌اند" },
    message: {
      en: "Weeks without saved activity are hidden from this list.",
      fa: "هفته‌های بدون فعالیت ذخیره‌شده از این فهرست پنهان شده‌اند.",
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
      en: "No income has been added. Set a yearly goal or record your first entry.",
      fa: "هنوز درآمدی ثبت نشده است. هدف سالانه تعیین کنید یا اولین درآمد را ثبت کنید.",
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
      en: "Project work · September 20, 2026. Update the amount, note, or date.",
      fa: "کار پروژه‌ای · ۲۰ سپتامبر ۲۰۲۶. مبلغ، یادداشت یا تاریخ را ویرایش کنید.",
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
      en: "Selected backup: 12 weeks, 8 ideas, 3 income entries. Replacing removes current local data and cannot be undone.",
      fa: "پشتیبان انتخاب‌شده: ۱۲ هفته، ۸ ایده و ۳ درآمد. جایگزینی داده‌های محلی کنونی را حذف می‌کند و بازگشت ندارد.",
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
