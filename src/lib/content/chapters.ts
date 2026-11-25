import {
  chapterCatalogSchema,
  type Chapter,
  type ChapterCatalog,
} from "./schemas";

/**
 * LOOKBACK · מסע המסלולים — 13-station narrative digital book.
 * Methodology aligned to approved-methodology.md (2026-11-24)
 * and lookback-philosophy.md (2026-11-25).
 */
const rawCatalog = {
  version: 2 as const,
  simulationOnly: true as const,
  narrativeId: "prepared-routes" as const,
  bookTitleHe: "LOOKBACK · המבט לאחור",
  bookTitleEn: "LOOKBACK",
  chapters: [
    {
      id: "ch-01",
      slug: "opening-the-journey",
      number: 1,
      titleHe: "פתיחת המסע",
      titleEn: "Opening the Journey",
      stationHe: "תחנה 01 · השער",
      scene: "cover" as const,
      summaryHe:
        "איך נכנסים למסע המסלולים: מהו Lookback, מהי השבחת העסקה, ולמה זה ספר סיפור — לא מחברת נוסחאות.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-02",
      slug: "lookback-discovery",
      number: 2,
      titleHe: "גילוי המבט לאחור",
      titleEn: "Lookback Discovery",
      stationHe: "תחנה 02 · המבט",
      scene: "zigzag" as const,
      summaryHe:
        "ללמוד לראות תנועה בזיגזג במקום לרדוף אחרי אופק. המבט לאחור הוא משמעת, לא אות כניסה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-03",
      slug: "trade-improvement",
      number: 3,
      titleHe: "השבחת העסקה",
      titleEn: "Trade Improvement",
      stationHe: "תחנה 03 · השבחה",
      scene: "improvement" as const,
      summaryHe:
        "איך משפרים פוזיציה דרך חיזוקים מדודים בסולם 10%, תקרת $250, והבחנה בין דוגמת XRP ל־$320 לבין הכלל המאושר.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-04",
      slug: "traffic-light",
      number: 4,
      titleHe: "רמזור הניהול",
      titleEn: "Traffic Light",
      stationHe: "תחנה 04 · הרמזור",
      scene: "traffic-light" as const,
      summaryHe:
        "ירוק ×1, צהוב ×10, אדום מינוף מכשיר מרבי — סיווג פסיכולוגי לניהול, לא שינוי במכניקת פירוק.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-05",
      slug: "realize-seventy-five",
      number: 5,
      titleHe: "מימוש השבעים וחמישה",
      titleEn: "Realize 75%",
      stationHe: "תחנה 05 · המימוש",
      scene: "realize-75" as const,
      summaryHe:
        "סגירת 75% מהכמות הנותרת — שוב ושוב — כדי להפוך רווח לא ממומש למשמעת, לא לאשליה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-06",
      slug: "return-to-balance",
      number: 6,
      titleHe: "חזרה לאיזון ×1",
      titleEn: "Return to ×1 Balance",
      stationHe: "תחנה 06 · האיזון",
      scene: "return-balance" as const,
      summaryHe:
        "לחזור לכיוון ×1 אחרי סערה: לא ניצחון מוחלט, אלא חזרה למסלול מוכן ושקט יותר.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-07",
      slug: "journey-psychology",
      number: 7,
      titleHe: "פסיכולוגיית המסע",
      titleEn: "Journey Psychology",
      stationHe: "תחנה 07 · הנפש",
      scene: "none" as const,
      summaryHe:
        "לא להתאהב בעסקה. לשפר, לנהל, לממש, לחזור לאיזון — בלי להפוך את הפוזיציה לזהות.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-08",
      slug: "portfolio-of-routes",
      number: 8,
      titleHe: "תיק המסלולים",
      titleEn: "Portfolio of Routes",
      stationHe: "תחנה 08 · התיק",
      scene: "none" as const,
      summaryHe:
        "כמה מסלולים במקביל: הקצאת מרג'ין נפרדת לכל פוזיציה, תקרת $250, וסיכון תיק ולא רק סיכון עסקה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-09",
      slug: "knowing-when-to-stop",
      number: 9,
      titleHe: "לדעת מתי לעצור",
      titleEn: "Knowing When to Stop",
      stationHe: "תחנה 09 · העצירה",
      scene: "none" as const,
      summaryHe:
        "Reject לפי תקרה, דילוג על רמה, וסגירה ידנית — מתי המסלול נגמר בלי להפוך את העצירה לכישלון.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-10",
      slug: "beyond-trading",
      number: 10,
      titleHe: "מעבר למסחר",
      titleEn: "Beyond Trading",
      stationHe: "תחנה 10 · האופק",
      scene: "zigzag" as const,
      summaryHe:
        "פילוסופיית Lookback כמשמעת חיים: לעבוד עם תנועה, לא לרדוף אחריה — גם מחוץ לגרף.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-11",
      slug: "simple-glossary",
      number: 11,
      titleHe: "מילון פשוט",
      titleEn: "Simple Glossary",
      stationHe: "תחנה 11 · השפה",
      scene: "none" as const,
      summaryHe:
        "מילון נרטיבי קצר: margin, notional, quantity, avg, PnL, collateral, liquidation — בלי לערבב ביניהם.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-12",
      slug: "practical-reference",
      number: 12,
      titleHe: "מדריך מעשי",
      titleEn: "Practical Reference",
      stationHe: "תחנה 12 · המדריך",
      scene: "none" as const,
      summaryHe:
        "דף עבודה אחד: סולם, רמזור, תקרות, עמלות, סליפג', מימון ופערים — לתרגול סימולטיבי בלבד.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-13",
      slug: "clear-disclaimer",
      number: 13,
      titleHe: "הצהרה ברורה",
      titleEn: "Clear Disclaimer",
      stationHe: "תחנה 13 · הגבול",
      scene: "none" as const,
      summaryHe:
        "סימולציה וחינוך בלבד. אין הבטחות, אין סיכון אפס, אין מסחר אמיתי — ומה כן נשאר בידיים אחרי הספר.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
  ],
} satisfies ChapterCatalog;

export const chapterCatalog: ChapterCatalog =
  chapterCatalogSchema.parse(rawCatalog);

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapterCatalog.chapters.find((chapter) => chapter.slug === slug);
}

export function listChapters(): Chapter[] {
  return chapterCatalog.chapters;
}

export function getAdjacentChapters(slug: string): {
  prev?: Chapter;
  next?: Chapter;
} {
  const chapters = listChapters();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export function getReadingProgress(completedSlugs: string[]): {
  completed: number;
  total: number;
  percent: number;
} {
  const total = chapterCatalog.chapters.length;
  const completed = chapterCatalog.chapters.filter((c) =>
    completedSlugs.includes(c.slug),
  ).length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
