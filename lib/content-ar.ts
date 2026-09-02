/**
 * Arabic copy for the /ar routes (Google Ads "Arabic – Service & Repair"
 * landing page + its thank-you page).
 *
 * Every business fact here (address, hours, prices, warranty, labour rate,
 * stats) mirrors `lib/site.ts`, `lib/content.ts` and `lib/services.ts` — keep
 * them in sync when the English source changes. Brand names stay in Latin
 * script (SilberArrows, XENTRY, Google) as they appear on the ad itself.
 */

import { site } from "@/lib/site";

/** "Mercedes-Benz" in Arabic with a non-breaking hyphen so it never wraps. */
export const BRAND_AR = "مرسيدس\u2011بنز";

export const siteAr = {
  name: site.name,
  tagline: `متخصصون مستقلون في ${BRAND_AR}`,
  address: {
    line1: "شارع المنارة",
    line2: "القوز، دبي",
    country: "الإمارات العربية المتحدة",
    short: "شارع المنارة، القوز، دبي",
  },
  hours: "الاثنين – السبت: 8:00 صباحاً – 6:00 مساءً",
  phone: site.phone,
  phoneTel: site.phoneTel,
  whatsapp:
    "https://wa.me/97143805515?text=" +
    encodeURIComponent("مرحباً فريق SilberArrows، أرغب في حجز موعد صيانة."),
  whatsappDirect:
    "https://wa.me/97143805515?text=" +
    encodeURIComponent("مرحباً فريق SilberArrows!"),
  established: site.established,
  reviews: site.reviews,
  geo: site.geo,
  stats: [
    { value: "15+", label: "سنة من الخبرة" },
    { value: "10,000+", label: "سيارة تمت خدمتها" },
    { value: "100%", label: "قطع غيار أصلية" },
  ],
  badges: ["ضمان 12 شهراً على القطع والعمالة", "استلام وتوصيل مجاني في دبي"],
};

export const chromeAr = {
  contactUs: "تواصل معنا",
  english: "English",
  englishHref: "/lp/mercedes-service",
  homeHref: "/ar/lp/mercedes-service",
  call: "اتصال",
  whatsapp: "واتساب",
  whatsappUs: "راسلنا على واتساب",
  footerBlurb: `مركز خدمة ${BRAND_AR} المستقل في دبي. نخدم علامة واحدة فقط، بفنيين مدرَّبين على معايير المصنع وقطع غيار أصلية منذ عام ${site.established}.`,
  visitContact: "زورونا / تواصلوا معنا",
  rights: "جميع الحقوق محفوظة.",
  independent: `متخصصون مستقلون في ${BRAND_AR}`,
  establishedLabel: `تأسس عام ${site.established}`,
};

export const heroAr = {
  eyebrow: `مركز صيانة ${BRAND_AR} مستقل في دبي`,
  titleParts: [
    { line: "صيانة وإصلاح" },
    { line: BRAND_AR, highlight: true },
    { line: "في دبي" },
  ],
  offerStrong: "خصم 20%",
  offerRest: "على أول صيانة صغرى أو كبرى",
  offerUrgency: "أماكن محدودة هذا الشهر",
  offerTerms: "للعملاء الجدد فقط. تُطبَّق الشروط والأحكام.",
  // Each sentence renders as its own line, like the English hero.
  subtitle: [
    `صيانة بمستوى الوكالة وبتكلفة أقل: باقات الصيانة A وB، تشخيص XENTRY، وقطع غيار أصلية 100%.`,
    "وفّر 30 إلى 40% مقارنة بالوكالة، مع أجرة عمل 375 درهماً في الساعة.",
  ],
  cta: "احصل على عرض سعر مجاني",
  reviewsLabel: "تقييم على Google",
  est: `منذ ${site.established}`,
  plateEyebrow: "مركز الخدمة في دبي",
  plateAddress: "شارع المنارة، القوز",
  carousel: [
    {
      src: "/assets/images/hero-bg-silver-optimized.avif",
      alt: `سيارة ${BRAND_AR} في مركز خدمة SilberArrows.`,
    },
    {
      src: "/assets/images/hero/01-exterior.jpg",
      alt: `واجهة مركز خدمة SilberArrows لسيارات ${BRAND_AR} في القوز، دبي، وسيارات G-Class متوقفة أمامه.`,
    },
    {
      src: "/assets/images/hero/02-lounge.jpg",
      alt: "صالة انتظار العملاء ومكاتب مستشاري الخدمة في SilberArrows.",
    },
    {
      src: "/assets/images/hero/03-workshop.jpg",
      alt: `داخل ورشة SilberArrows لسيارات ${BRAND_AR} مع عدة سيارات على الرافعات.`,
    },
    {
      src: "/assets/images/hero/05-mechanic-underbody.jpg",
      alt: `فني SilberArrows يفحص الجزء السفلي من سيارة ${BRAND_AR}.`,
    },
    {
      src: "/assets/images/hero/06-mechanic-engine.jpg",
      alt: `فني SilberArrows يعمل على محرك سيارة ${BRAND_AR}.`,
    },
  ],
};

export const whyChooseUsAr = {
  eyebrow: "لماذا تختارنا",
  title: `مركز مخصص لعلامة واحدة. متخصصون في ${BRAND_AR}.`,
  intro: `بخبرة تتجاوز عشر سنوات، نقدّم لملّاك ${BRAND_AR} في دبي خبرة لا تُضاهى وخدمة متميزة مخصصة لهذه العلامة وحدها.`,
  items: [
    {
      title: "قطع غيار أصلية ومعايير المصنع",
      body: `نستخدم قطع غيار ${BRAND_AR} الأصلية فقط، ونركّبها بالأدوات والإجراءات المعتمدة من الشركة المصنّعة.`,
    },
    {
      title: `متخصصون في ${BRAND_AR} فقط`,
      body: `نعمل على علامة واحدة فقط هي ${BRAND_AR}، وهنا تكمن خبرتنا.`,
    },
    {
      title: "فنيون مدرَّبون على معايير المصنع",
      body: `فنيون معتمدون مدرَّبون على معايير ${BRAND_AR}، بخبرة عملية مجتمعة تتجاوز سبعين عاماً.`,
    },
    {
      title: "عقود صيانة",
      body: `باقات صيانة شاملة صُمِّمت للحفاظ على سيارتك ${BRAND_AR} في أفضل حالاتها بعناية متميزة.`,
    },
    {
      title: "ضمان 12 شهراً",
      body: "جميع الأعمال مشمولة بضمان كامل لمدة 12 شهراً لراحة بالك.",
    },
    {
      title: "استلام وتوصيل مجاني",
      body: "خدمة استلام وتوصيل السيارة مجاناً في جميع أنحاء دبي.",
    },
  ],
};

/** Subset of `lib/services.ts`, same images, Arabic titles. */
export const servicesAr = {
  eyebrow: "خدماتنا",
  title: `حلول متخصصة لسيارات ${BRAND_AR}`,
  intro: "بدقة عالية، وقطع غيار أصلية، وخبرة مخصصة لعلامة واحدة.",
  items: [
    {
      title: "الصيانة الدورية – Service A وB",
      blurb: "صيانة وفق جدول الشركة المصنّعة مع تحديث سجل الخدمة الرقمي.",
      image: "/assets/images/maintenance-640.webp",
    },
    {
      title: "إصلاح المحرك",
      blurb: `تشخيص وإصلاح وإعادة بناء محركات ${BRAND_AR}.`,
      image: "/assets/images/ENGINE-640.webp",
    },
    {
      title: "تشخيص كهربائي وحاسوبي",
      blurb: "تشخيص XENTRY الأصلي لقراءة الأعطال بدقة ومعالجة جذورها.",
      image: "/assets/images/diagnostics-640.webp",
    },
    {
      title: "صيانة وإصلاح التكييف",
      blurb: "فحص وتعبئة وإصلاح نظام التكييف لصيف دبي.",
      image: "/assets/images/Air-conditioning-640.webp",
    },
    {
      title: "الفرامل",
      blurb: "فحص وتبديل أقراص وفحمات الفرامل بقطع أصلية.",
      image: "/assets/images/brake-service-640.webp",
    },
    {
      title: "نظام التعليق والتوجيه",
      blurb: "إصلاح التعليق الهوائي والمساعدات ونظام التوجيه.",
      image: "/assets/images/suspension-640.webp",
    },
    {
      title: "البطارية",
      blurb: "فحص وتبديل البطارية مع البرمجة المطلوبة.",
      image: "/assets/images/battery-640.webp",
    },
    {
      title: "الإطارات",
      blurb: "تبديل وترصيص الإطارات وضبط زوايا العجلات.",
      image: "/assets/images/tyres-640.webp",
    },
  ],
};

export const contractsAr = {
  eyebrow: "عقود الصيانة",
  heading: `عقود صيانة لسيارتك ${BRAND_AR}`,
  sub: "راحة بال مضمونة",
  startingFrom: "يبدأ من",
  mostPopular: "الأكثر طلباً",
  planLabel: "باقة",
  choose: (name: string) => `اختر الباقة ${name}`,
  plans: [
    {
      key: "standard" as const,
      name: "الأساسية",
      description: "الصيانة الأساسية",
      price: "2,700 درهم",
      period: "سنتان / 30,000 كم",
    },
    {
      key: "premium" as const,
      name: "المتميزة",
      description: "باقة تغطية شاملة",
      price: "5,800 درهم",
      period: "4 سنوات / 60,000 كم",
      featured: true,
    },
  ],
  rows: [
    { feature: "الصيانة A (صغرى)", standard: "1x", premium: "2x" },
    { feature: "الصيانة B (كبرى)", standard: "1x", premium: "2x" },
    { feature: "تبديل زيت الفرامل", standard: "1x", premium: "2x" },
    { feature: "تبديل شمعات الإشعال", standard: "\u2014", premium: "\u2713" },
    { feature: "تبديل سائل التبريد", standard: "\u2014", premium: "\u2713" },
    {
      feature: "تبديل زيت ناقل الحركة مع الفلتر",
      standard: "\u2014",
      premium: "\u2713",
    },
    { feature: "فحص شامل للسيارة", standard: "\u2713", premium: "\u2713" },
  ],
};

export const reviewsAr = {
  eyebrow: "آراء العملاء",
  title: `موثوقون من ملّاك ${BRAND_AR} في دبي`,
  intro: `آراء حقيقية من عملاء يثقون بنا في سياراتهم ${BRAND_AR}. التقييمات معروضة بلغتها الأصلية.`,
  countLabel: "تقييم على Google",
  readAll: "اقرأ جميع التقييمات على Google",
  googleReview: "تقييم على Google",
};

/** Arabic counterpart of `relativeWhen` in lib/reviews.ts (dual + plural forms). */
export function relativeWhenAr(daysAgo: number): string {
  if (daysAgo <= 1) return "أمس";
  if (daysAgo < 7) return daysAgo === 2 ? "منذ يومين" : `منذ ${daysAgo} أيام`;
  if (daysAgo < 14) return "منذ أسبوع";
  if (daysAgo < 30) {
    const w = Math.round(daysAgo / 7);
    return w === 2 ? "منذ أسبوعين" : `منذ ${w} أسابيع`;
  }
  if (daysAgo < 60) return "منذ شهر";
  const m = Math.round(daysAgo / 30);
  if (m === 2) return "منذ شهرين";
  return m <= 10 ? `منذ ${m} أشهر` : `منذ ${m} شهراً`;
}

export const contactAr = {
  eyebrow: "تواصل معنا",
  title: "تواصل معنا",
  intro: `تحدّث مباشرة مع متخصصي ${BRAND_AR} الموثوقين في دبي.`,
  cardEyebrow: "نحن هنا لمساعدتك",
  cardTitle: "تحدّث مع متخصص",
  cardBody: `تحدّث مباشرة مع متخصصينا في ${BRAND_AR} للحصول على استشارة وحجز موعد الصيانة.`,
  callOrWhatsapp: "اتصل بنا أو راسلنا على واتساب",
  viewMap: "عرض الخريطة",
  mapTitle: "موقع SilberArrows",
  mapAria: "خريطة توضح موقع SilberArrows",
  loadMapAria: "تحميل الخريطة التفاعلية لورشة SilberArrows",
  mapImageAlt: `ورشة SilberArrows لسيارات ${BRAND_AR} في القوز، دبي`,
  visit: "زورونا في المركز",
  directions: "الاتجاهات",
};

export const modalAr = {
  live: "متاحون الآن",
  title: "تواصل معنا",
  sub: "أدخل بياناتك وسنتواصل معك في أقرب وقت.",
  nameLabel: "الاسم",
  namePlaceholder: "اسمك",
  phoneLabel: "رقم الواتساب",
  phonePlaceholder: "50 123 4567",
  errName: "يرجى إدخال اسمك",
  errPhone: "يرجى إدخال رقم الواتساب",
  errPhoneInvalid: "يرجى إدخال رقم واتساب صحيح للدولة المختارة",
  errGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
  submit: "إرسال الطلب",
  sending: "جارٍ الإرسال...",
  note: "نردّ عادةً خلال دقائق عبر واتساب أو الهاتف.",
  or: "أو تواصل معنا مباشرة",
  call: "اتصل بنا",
  whatsapp: "واتساب",
  close: "إغلاق",
  thankYouPath: "/ar/thank-you/service",
};

export const thankYouAr = {
  metaTitle: `شكراً لك | SilberArrows لصيانة ${BRAND_AR} في دبي`,
  metaDescription:
    "شكراً لتواصلك مع SilberArrows. سنعاود الاتصال بك في أقرب وقت.",
  title: "استلمنا بياناتك",
  bodyBefore: `سيتواصل معك أحد متخصصي ${BRAND_AR} قريباً عبر`,
  bodyChannel: "واتساب",
  response: "متوسط وقت الرد: أقل من 5 دقائق",
  call: "اتصل",
  whatsappNow: "راسلنا على واتساب الآن",
  back: "العودة إلى الصفحة الرئيسية",
};

export const landingAr = {
  path: "/ar/lp/mercedes-service",
  metaTitle: `صيانة مرسيدس دبي | صيانة وإصلاح ${BRAND_AR} في القوز – SilberArrows`,
  metaDescription: `مركز متخصص في صيانة وإصلاح ${BRAND_AR} في القوز، دبي. باقات الصيانة A وB، تشخيص XENTRY، قطع غيار أصلية، وضمان 12 شهراً. وفّر 30 إلى 40% مقارنة بالوكالة.`,
  metaKeywords:
    "صيانة مرسيدس, صيانة مرسيدس دبي, تصليح مرسيدس, اصلاح مرسيدس, ورشة مرسيدس, ورشة مرسيدس دبي, مركز صيانة مرسيدس, كراج مرسيدس, صيانة مرسيدس القوز",
};
