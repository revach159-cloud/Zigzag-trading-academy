import { chapterCatalogSchema, type Chapter, type ChapterCatalog } from "./schemas";

/**
 * Real 12-chapter architecture outline for ZigZag Trading Academy.
 * Status is "outline" — stubs only; not a complete textbook.
 * Methodology specifics marked awaitingConfirmation where owner sign-off is required.
 */
const rawCatalog = {
  version: 1 as const,
  simulationOnly: true as const,
  chapters: [
    {
      id: "ch-01",
      slug: "introduction-to-zigzag",
      number: 1,
      titleHe: "מבוא למתודולוגיית ZigZag",
      titleEn: "Introduction to the ZigZag Method",
      summaryHe:
        "מסגרת האקדמיה, כללי סימולציה, והפרדה ברורה בין לימוד למסחר אמיתי.",
      status: "outline" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-02",
      slug: "market-structure-and-swings",
      number: 2,
      titleHe: "מבנה שוק ותנועות ZigZag",
      titleEn: "Market Structure & ZigZag Swings",
      summaryHe:
        "זיהוי מבנה, נקודות מפנה, ושפת מונחים בעברית עם מונחי מסחר באנגלית.",
      status: "outline" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-03",
      slug: "capital-allocation",
      number: 3,
      titleHe: "הקצאת הון לימודית",
      titleEn: "Educational Capital Allocation",
      summaryHe:
        "איך מגדירים הון מוקצה בתרגילים — ללא הפקדות, ברוקרים או מפתחות API.",
      status: "outline" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-04",
      slug: "reinforcement-mechanics-1x",
      number: 4,
      titleHe: "מכניקת Reinforcement ב־1x",
      titleEn: "1x Reinforcement Mechanics",
      summaryHe:
        "עקרונות חיזוק פוזיציה ברמת מינוף לימודי 1x — נוסחאות ממתינות לאישור.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-05",
      slug: "adverse-moves-ladder",
      number: 5,
      titleHe: "מהלכים שליליים וסולם 10%",
      titleEn: "Adverse Moves & the 10% Ladder",
      summaryHe:
        "סימון מהלך שלילי לימודי (הצעה: מרווח מחיר של 10%) — דורש אישור בעלים.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-06",
      slug: "ten-x-threshold",
      number: 6,
      titleHe: "סף Reinforcement ב־10x",
      titleEn: "10x Reinforcement Threshold",
      summaryHe:
        "מתי נפתחת אפשרות חיזוק ברמת 10x לפי הגדרה לימודית — לא קריאת מרווח חיה.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-07",
      slug: "one-x-to-ten-x-paths",
      number: 7,
      titleHe: "מעברים מ־1x ל־10x",
      titleEn: "1x → 10x Transition Paths",
      summaryHe:
        "שני מסלולים נפרדים: פוזיציית 10x נפרדת מול שינוי מינוף על קיימת — לא שקולים.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-08",
      slug: "profit-realization-75",
      number: 8,
      titleHe: "מימוש רווח 75%",
      titleEn: "75% Profit Realization",
      summaryHe:
        "הבחנה בין משיכת רווח פתוח לבין סגירת 75% מהפוזיציה — ממתינים לאישור קנוני.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-09",
      slug: "fees-funding-slippage",
      number: 9,
      titleHe: "עמלות, מימון והחלקה בלימוד",
      titleEn: "Fees, Funding & Slippage (Educational)",
      summaryHe:
        "ברירות מחדל לימודיות (טיוטה): עמלת round-trip, funding, slippage — לאישור.",
      status: "outline" as const,
      awaitingConfirmation: true,
    },
    {
      id: "ch-10",
      slug: "risk-and-capital-stress",
      number: 10,
      titleHe: "מעבדת סיכון ולחץ על הון",
      titleEn: "Risk Lab & Capital Stress",
      summaryHe:
        "תרגילי לחץ על הקצאה, חריגות סף, ותרחישי מהלך שלילי — סימולציה בלבד.",
      status: "outline" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-11",
      slug: "simulation-discipline",
      number: 11,
      titleHe: "משמעת סימולציה וציות",
      titleEn: "Simulation Discipline & Compliance",
      summaryHe:
        "איסורים: מסחר אמיתי, הפקדות, הבטחות תשואה, או סטטיסטיקות מבוימות.",
      status: "outline" as const,
      awaitingConfirmation: false,
    },
    {
      id: "ch-12",
      slug: "method-synthesis",
      number: 12,
      titleHe: "סינתזת השיטה וצעדים הבאים",
      titleEn: "Method Synthesis & Next Steps",
      summaryHe:
        "חיבור הפרקים לסימולטור, מעבדות, ומבחני ידע — ללא תעודת מיומנות מסחר.",
      status: "outline" as const,
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
