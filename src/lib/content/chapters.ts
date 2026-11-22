import {
  chapterCatalogSchema,
  type Chapter,
  type ChapterCatalog,
} from "./schemas";

/**
 * Phase 3 curriculum: 12-chapter Hebrew ZigZag textbook catalog.
 * Full bodies live under ./bodies — methodology math still marked awaitingConfirmation where needed.
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
        "מהי אקדמיית ZigZag, מהי סימולציה בלבד, ואיך בנוי מסלול 12 הפרקים סביב השיטה.",
      status: "draft" as const,
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
      status: "draft" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-03",
      slug: "trading-fundamentals",
      number: 3,
      titleHe: "יסודות מסחר לימודיים",
      titleEn: "Trading Fundamentals",
      summaryHe:
        "מונחי בסיס: `position`, `entry`, `exit`, הון מוקצה לימודי — ללא ברוקר או הפקדה.",
      status: "draft" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-04",
      slug: "position-construction",
      number: 4,
      titleHe: "בניית פוזיציה",
      titleEn: "Position Construction",
      summaryHe:
        "איך בונים `position` לימודית בשכבות הקצאה, לפני חיזוקים ומינוף.",
      status: "draft" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-05",
      slug: "reinforcement-mechanism",
      number: 5,
      titleHe: "מנגנון Reinforcement",
      titleEn: "Reinforcement Mechanism",
      summaryHe:
        "חיזוק פוזיציה לפי הון מוקצה מצטבר — טיוטת ברירת מחדל ממתינה לאישור בעלים.",
      status: "draft" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-06",
      slug: "leverage-system",
      number: 6,
      titleHe: "מערכת מינוף",
      titleEn: "Leverage System",
      summaryHe:
        "מסלולי 1x↔10x לימודיים, סף מעבר מוצע, והבחנה בין שני נתיבים שאינם שקולים.",
      status: "draft" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-07",
      slug: "average-entry-price",
      number: 7,
      titleHe: "מחיר כניסה ממוצע",
      titleEn: "Average Entry Price",
      summaryHe:
        "חישוב `average entry` / ממוצע משוקלל אחרי מספר מילויים בתרגיל סימולציה.",
      status: "draft" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-08",
      slug: "profit-realization",
      number: 8,
      titleHe: "מימוש רווח",
      titleEn: "Profit Realization",
      summaryHe:
        "טיוטת מימוש 75%: משיכת רווח פתוח מול סגירת חלק מהפוזיציה — לאישור קנוני.",
      status: "draft" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-09",
      slug: "multiple-concurrent-positions",
      number: 9,
      titleHe: "מספר פוזיציות במקביל",
      titleEn: "Multiple Concurrent Positions",
      summaryHe:
        "ניהול כמה `positions` סימולטיביות במקביל, הקצאה נפרדת, ומגבלות לימודיות.",
      status: "draft" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-10",
      slug: "risk-management",
      number: 10,
      titleHe: "ניהול סיכונים",
      titleEn: "Risk Management",
      summaryHe:
        "לחץ על הון מוקצה, חריגות סף, ומשמעת סימולציה — ללא הבטחות תשואה.",
      status: "draft" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-11",
      slug: "practical-simulation-laboratory",
      number: 11,
      titleHe: "מעבדת סימולציה מעשית",
      titleEn: "Practical Simulation Laboratory",
      summaryHe:
        "פרוטוקול תרגול במעבדות `leverage` ו־`risk`, עם זרע דטרמיניסטי לתרגילים מדורגים.",
      status: "draft" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-12",
      slug: "final-examination",
      number: 12,
      titleHe: "בחינה מסכמת",
      titleEn: "Final Examination",
      summaryHe:
        "סינתזת השיטה ושאלות ידע מסכמות — תעודת הבנה לימודית, לא רישיון מסחר.",
      status: "draft" as const,
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
