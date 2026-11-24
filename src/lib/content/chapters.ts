import {
  chapterCatalogSchema,
  type Chapter,
  type ChapterCatalog,
} from "./schemas";

/**
 * 12-chapter Hebrew ZigZag textbook catalog.
 * Methodology aligned to owner-confirmed approved-methodology.md (2026-11-24).
 */
const rawCatalog = {
  version: 1 as const,
  simulationOnly: true as const,
  chapters: [
    {
      id: "ch-01",
      slug: "introduction-to-zigzag",
      number: 1,
      titleHe: "מבוא ל־ZigZag",
      titleEn: "Introduction to ZigZag",
      summaryHe:
        "מהי אקדמיית ZigZag, מהי סימולציה בלבד, ואיך בנוי מסלול 12 הפרקים סביב השיטה המאושרת.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-02",
      slug: "market-structure-and-price-movement",
      number: 2,
      titleHe: "מבנה שוק ותנועת מחיר",
      titleEn: "Market Structure and Price Movement",
      summaryHe:
        "זיהוי מבנה, `swing high` / `swing low`, ושפת תנועה לניתוח לימודי של ZigZag.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-03",
      slug: "trading-fundamentals",
      number: 3,
      titleHe: "יסודות מסחר לימודיים",
      titleEn: "Trading Fundamentals",
      summaryHe:
        "מונחי בסיס: `margin`, `notional`, `collateral`, `liquidation`, `position` — ללא ברוקר או הפקדה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-04",
      slug: "position-construction",
      number: 4,
      titleHe: "בניית פוזיציה",
      titleEn: "Position Construction",
      summaryHe:
        "בניית `position` long-only בשכבות מרג'ין, תקרת $250, עיגול Floor, ומודל Bybit Linear.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-05",
      slug: "reinforcement-mechanism",
      number: 5,
      titleHe: "מנגנון Reinforcement",
      titleEn: "Reinforcement Mechanism",
      summaryHe:
        "חיזוק אופציונלי בסולם 10% מ־P₀ ב־Touch, לפי מרג'ין מצטבר, עם תיעוד רמות שדולגו.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-06",
      slug: "leverage-system",
      number: 6,
      titleHe: "מערכת מינוף",
      titleEn: "Leverage System",
      summaryHe:
        "מעבר ×1→×10 לפי תקרת תקציב (שומר כמות), חיזוק ×10 לפי הפסד נטו, ומינוף מכשיר מרבי מ־Bybit בלבד.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-07",
      slug: "average-entry-price",
      number: 7,
      titleHe: "מחיר כניסה ממוצע",
      titleEn: "Average Entry Price",
      summaryHe:
        "חישוב `average entry` משוקלל כמות אחרי מספר מילויים בתרגיל סימולציה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-08",
      slug: "profit-realization",
      number: 8,
      titleHe: "מימוש רווח",
      titleEn: "Profit Realization",
      summaryHe:
        "סגירת 75% מהכמות הפתוחה (נותרות 25%), ידני וחוזר על הנותר — לא משיכת רווח בלי שינוי כמות.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-09",
      slug: "multiple-concurrent-positions",
      number: 9,
      titleHe: "מספר פוזיציות במקביל",
      titleEn: "Multiple Concurrent Positions",
      summaryHe:
        "ניהול כמה `positions` סימולטיביות במקביל, הקצאת מרג'ין נפרדת, ותקרת $250 לכל פוזיציה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-10",
      slug: "risk-management",
      number: 10,
      titleHe: "ניהול סיכונים",
      titleEn: "Risk Management",
      summaryHe:
        "הבחנה בין מרג'ין, notional, collateral ו־liquidation — ללא הבטחות תשואה.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-11",
      slug: "practical-simulation-laboratory",
      number: 11,
      titleHe: "מעבדת סימולציה מעשית",
      titleEn: "Practical Simulation Laboratory",
      summaryHe:
        "פרוטוקול תרגול עם השיטה המאושרת וזרע דטרמיניסטי לתרגילים מדורגים.",
      status: "published" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-12",
      slug: "final-examination",
      number: 12,
      titleHe: "בחינה מסכמת",
      titleEn: "Final Examination",
      summaryHe:
        "סינתזת השיטה המאושרת ושאלות ידע מסכמות — תעודת הבנה לימודית, לא רישיון מסחר.",
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
