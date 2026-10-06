export type Language = "en" | "fa";
export type RouteKey =
  | "/"
  | "/ideas"
  | "/timer"
  | "/summaries"
  | "/finance"
  | "/export"
  | "/settings";
export type ScreenData = {
  name: string;
  path: RouteKey;
  desc: string;
  states: string;
  en: { title: string; lede: string; content: string };
  fa: { title: string; lede: string; content: string };
};

// Structural sample content migrated from coverage-atlas.html. It is not app copy.
export const pages: ScreenData[] = [
  {
    name: "Weekly planner",
    path: "/",
    desc: "Week selection, daily sections, schedule and reusable full-week templates.",
    states:
      "week loading/error · sparse and populated day · unsaved navigation · schedule add/edit/delete sheet · template save/apply/delete sheet · day minimization (dedicated reference) · dark mode",
    en: {
      title: "This week",
      lede: "Plan one day at a time",
      content: "",
    },
    fa: {
      title: "این هفته",
      lede: "هر روز را جداگانه برنامه‌ریزی کنید",
      content: "",
    },
  },
  {
    name: "Idea Space",
    path: "/ideas",
    desc: "Capture, revisit, search, edit, branch and delete local notes.",
    states:
      "composer with optional sparks · daily return · empty/no matches · draft recovery · edit/branch · delete confirmation · unavailable/error",
    en: {
      title: "Idea Space",
      lede: "Capture a thought before it disappears",
      content: `<div class="box soft"><h4>What is on your mind?</h4><div class="field tall">A small idea worth returning to…</div><p>Optional writing sparks ▾</p><span class="btn">Save idea</span></div><div class="box warn"><h4>Return to a thought</h4><p>An earlier note can come back today.</p></div><div class="field">Search your ideas</div><div class="box"><h4>A note from today</h4><p>Follow this thread later.</p><div class="row"><span class="pill">Branch</span><span class="pill">Edit</span><span class="pill">Delete</span></div></div>`,
    },
    fa: {
      title: "فضای ایده‌ها",
      lede: "فکر خود را پیش از فراموشی ثبت کنید",
      content: `<div class="box soft"><h4>چه چیزی در ذهن دارید؟</h4><div class="field tall">ایده‌ای کوچک برای بازگشت دوباره…</div><p>جرقه‌های اختیاری نوشتن ▾</p><span class="btn">ذخیره ایده</span></div><div class="box warn"><h4>بازگشت به یک فکر</h4><p>یک یادداشت قدیمی امروز دوباره نمایش داده می‌شود.</p></div><div class="field">جست‌وجوی ایده‌ها</div><div class="box"><h4>یادداشت امروز</h4><p>بعداً این فکر را ادامه دهید.</p><div class="row"><span class="pill">شاخه</span><span class="pill">ویرایش</span><span class="pill">حذف</span></div></div>`,
    },
  },
  {
    name: "Focus timer",
    path: "/timer",
    desc: "Configurable focus/rest cycle with explicit transition after completion.",
    states:
      "ready focus/rest · running · paused · completed awaiting next phase · invalid duration · storage/settings error · restored countdown",
    en: {
      title: "Focus timer",
      lede: "A clear session and a clear next step",
      content: `<div class="row"><span class="pill on">Focus</span><span class="pill">Rest</span></div><div class="circle"><span class="num">25:00</span></div><div class="grid2"><div class="box"><h4>Focus</h4><div class="field"><span class="num">25</span> min</div></div><div class="box"><h4>Rest</h4><div class="field"><span class="num">5</span> min</div></div></div><div class="grid2"><span class="btn">Start</span><span class="btn alt">Reset</span></div><div class="states"><b>Next:</b> rest begins when you choose it.</div>`,
    },
    fa: {
      title: "زمان‌سنج تمرکز",
      lede: "یک جلسه روشن و گام بعدی مشخص",
      content: `<div class="row"><span class="pill on">تمرکز</span><span class="pill">استراحت</span></div><div class="circle"><span class="num">25:00</span></div><div class="grid2"><div class="box"><h4>تمرکز</h4><div class="field"><span class="num">25</span> دقیقه</div></div><div class="box"><h4>استراحت</h4><div class="field"><span class="num">5</span> دقیقه</div></div></div><div class="grid2"><span class="btn">شروع</span><span class="btn alt">بازنشانی</span></div><div class="states"><b>گام بعد:</b> استراحت وقتی آغاز می‌شود که شما انتخاب کنید.</div>`,
    },
  },
  {
    name: "Week summaries",
    path: "/summaries",
    desc: "Range and empty-week filters, weekly goals, notes and section totals.",
    states:
      "loading/error · populated and empty range · show/hide empty weeks · current week highlight · variable section count",
    en: {
      title: "Week summaries",
      lede: "Review the pattern across weeks",
      content: `<div class="box"><h4>Months to show</h4><label class="studio-input"><span>Recent months</span><select aria-label="Months to show"><option>1 month</option><option selected>3 months</option><option>6 months</option><option>12 months</option></select></label><p>☑ Show empty weeks</p></div><div class="box soft"><div class="row"><h4>This week</h4><span class="pill on">Current</span></div><p>Goal · Make time for learning</p><div class="divider"></div><div class="row"><span>Main</span><b>4 h 30 min</b></div><div class="row"><span>Learning</span><b>2 h 10 min</b></div><p>View daily details</p></div><div class="box"><h4>Previous week</h4><p>Weekly note and section totals</p></div>`,
    },
    fa: {
      title: "خلاصه هفته‌ها",
      lede: "الگوی هفته‌ها را مرور کنید",
      content: `<div class="box"><h4>تعداد ماه‌های نمایش</h4><label class="studio-input"><span>ماه‌های اخیر</span><select aria-label="تعداد ماه‌های نمایش"><option>۱ ماه</option><option selected>۳ ماه</option><option>۶ ماه</option><option>۱۲ ماه</option></select></label><p>☑ نمایش هفته‌های خالی</p></div><div class="box soft"><div class="row"><h4>این هفته</h4><span class="pill on">جاری</span></div><p>هدف · زمانی برای یادگیری</p><div class="divider"></div><div class="row"><span>اصلی</span><b>۴ ساعت و ۳۰ دقیقه</b></div><div class="row"><span>یادگیری</span><b>۲ ساعت و ۱۰ دقیقه</b></div><p>دیدن جزئیات روزانه</p></div><div class="box"><h4>هفته پیش</h4><p>یادداشت هفته و مجموع بخش‌ها</p></div>`,
    },
  },
  {
    name: "Finance",
    path: "/finance",
    desc: "Local PIN screen lock, annual goal, income history and editing.",
    states:
      "locked/wrong PIN · unlocked empty/populated · goal edit · income add/edit/delete · validation · local screen lock · loading/error",
    en: {
      title: "Finance",
      lede: "Track the year’s income goal",
      content: `<div class="box soft"><div class="row"><h4>Year total</h4><b>$8,400</b></div><div class="meter"></div><p>68% of annual goal · Goal settings</p></div><div class="box"><div class="row"><h4>Income history</h4><span class="btn alt">Add income</span></div><p><span class="num">2026-09-20</span> · $1,200 · Project work</p><div class="row"><span class="pill">Edit</span><span class="pill">Delete</span></div></div>`,
    },
    fa: {
      title: "مالی",
      lede: "هدف درآمد سالانه را دنبال کنید",
      content: `<div class="box soft"><div class="row"><h4>جمع سال</h4><b>۸٬۴۰۰</b></div><div class="meter"></div><p>۶۸٪ هدف سالانه · تنظیمات هدف</p></div><div class="box"><div class="row"><h4>تاریخچه درآمد</h4><span class="btn alt">افزودن درآمد</span></div><p><span class="num">2026-09-20</span> · ۱٬۲۰۰ · پروژه</p><div class="row"><span class="pill">ویرایش</span><span class="pill">حذف</span></div></div>`,
    },
  },
  {
    name: "Export, report and import",
    path: "/export",
    desc: "Restorable backup, selective AI report, and merge/replace restore.",
    states:
      "locked/unlocked overview · JSON/CSV/XLSX action · report selection/date/preview/share · invalid/no data · merge · destructive replace confirmation · progress/error",
    en: {
      title: "Data and reports",
      lede: "Choose what to keep or share",
      content: `<div class="box warn"><h4>Keep a copy outside the app</h4><p>JSON backups are not encrypted. The AI report is separate from a restorable backup.</p></div><div class="box"><h4>Selective AI report</h4><p>☑ Weekly goals &nbsp; ☑ Daily activity</p><p>☐ Finance fields require unlock</p><div class="grid2"><div class="field">Start date</div><div class="field">End date</div></div><p>Preview scope and text before sharing.</p><span class="btn">Share report file</span></div><div class="box"><h4>Backup and restore</h4><div class="grid2"><span class="btn alt">JSON backup</span><span class="btn alt">CSV / XLSX</span></div><p>Import JSON · Merge / upsert</p></div>`,
    },
    fa: {
      title: "داده‌ها و گزارش‌ها",
      lede: "انتخاب کنید چه چیزی بماند یا به اشتراک گذاشته شود",
      content: `<div class="box warn"><h4>نسخه‌ای بیرون از برنامه نگه دارید</h4><p>نسخه‌های JSON رمزگذاری نشده‌اند. گزارش هوش مصنوعی با نسخه پشتیبان قابل بازیابی فرق دارد.</p></div><div class="box"><h4>گزارش انتخابی برای هوش مصنوعی</h4><p>☑ اهداف هفته &nbsp; ☑ فعالیت روزانه</p><p>☐ داده‌های مالی به باز کردن قفل نیاز دارند</p><div class="grid2"><div class="field">تاریخ آغاز</div><div class="field">تاریخ پایان</div></div><p>پیش از اشتراک‌گذاری دامنه و متن را ببینید.</p><span class="btn">اشتراک فایل گزارش</span></div><div class="box"><h4>پشتیبان و بازیابی</h4><div class="grid2"><span class="btn alt">پشتیبان JSON</span><span class="btn alt">CSV / XLSX</span></div><p>ورود JSON · ادغام</p></div>`,
    },
  },
  {
    name: "Settings",
    path: "/settings",
    desc: "Ten stable planner slots and optional local morning reminder.",
    states:
      "loading/error · default/edited slot list · one-active rule · blank-label validation · notification time/permission · saving/success · unsaved navigation",
    en: {
      title: "Settings",
      lede: "Choose the sections that shape your plan",
      content: `<div class="box"><div class="row"><h4>Planner sections</h4><span class="pill on">4 active</span></div><div class="stack"><div class="row"><span>☑ Main</span><span class="pill">Slot 1</span></div><div class="row"><span>☑ Second</span><span class="pill">Slot 2</span></div><div class="row"><span>☑ Learning</span><span class="pill">Slot 3</span></div><div class="row"><span>☑ Exercise</span><span class="pill">Slot 4</span></div><div class="row"><span>☐ Additional sections</span><span class="pill">5–10</span></div></div></div><div class="box soft"><h4>Morning plan notification</h4><p>☑ Enabled · Local reminder for today’s timed entries</p><div class="field"><span class="num">08:00</span></div></div><span class="btn">Save settings</span><div class="states"><b>Unsaved changes:</b> save your section names and reminder time before leaving.</div>`,
    },
    fa: {
      title: "تنظیمات",
      lede: "بخش‌های برنامه خود را انتخاب کنید",
      content: `<div class="box"><div class="row"><h4>بخش‌های برنامه</h4><span class="pill on">۴ فعال</span></div><div class="stack"><div class="row"><span>☑ اصلی</span><span class="pill">بخش ۱</span></div><div class="row"><span>☑ دوم</span><span class="pill">بخش ۲</span></div><div class="row"><span>☑ یادگیری</span><span class="pill">بخش ۳</span></div><div class="row"><span>☑ ورزش</span><span class="pill">بخش ۴</span></div><div class="row"><span>☐ بخش‌های بیشتر</span><span class="pill">۵–۱۰</span></div></div></div><div class="box soft"><h4>اعلان صبح برنامه</h4><p>☑ فعال · یادآوری محلی رویدادهای زمان‌دار امروز</p><div class="field"><span class="num">08:00</span></div></div><span class="btn">ذخیره تنظیمات</span><div class="states"><b>تغییرات ذخیره‌نشده:</b> پیش از خروج، نام بخش‌ها و زمان اعلان را ذخیره کنید.</div>`,
    },
  },
];
