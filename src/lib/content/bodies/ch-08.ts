import type { ChapterBodyInput } from "../schemas";

export const chapter08Body = {
  slug: "profit-realization",
  learningObjectivesHe: [
    "ליישם מימוש מאושר: סגירת 75% מהכמות הפתוחה.",
    "לחשב כמות שנותרת ומימוש חוזר על 25%.",
    "לכלול עמלות 2 bps בסגירה ו-slippage 1 bp לצד.",
  ],
  sections: [
    {
      id: "seventy-five",
      titleHe: "מימוש 75% בכמות",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "`Profit realization` המאושר הוא close_quantity_pct: סגירה ידנית של 75% מהכמות הפתוחה; 25% נשארים; ניתן לחזור על 75% מהנותר.",
        },
        {
          type: "visual",
          kind: "profit-split",
          captionHe: "75% נסגרים · 25% נשארים — אין 'משיכת רווח' נפרדת.",
        },
        {
          type: "formula",
          id: "close-qty",
          latex: "q_{\\text{close}} = 0.75 \\times Q,\\quad q_{\\text{remain}} = 0.25 \\times Q",
          captionHe: "סגירת 75% מהכמות",
          awaitingConfirmation: false,
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "הפעלה ידנית",
          textHe: "profitRealization.activation=manual; repeatableOnRemaining=true.",
        },
      ],
    },
    {
      id: "fees",
      titleHe: "עמלות בסגירה",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "roundTripBps: 2 בסגירה (במודל הלימודי).",
            "slippageBpsPerSide: 1.",
            "funding: 0; thresholdEpsilon: 0.",
          ],
        },
        {
          type: "paragraph",
          textHe:
            "Realized PnL על החלק שנסגר = q_close×(M−E_avg) פחות עמלות לפי התרגיל.",
        },
      ],
    },
    {
      id: "discipline",
      titleHe: "משמעת אחרי מימוש",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "מתעדים Q לפני ואחרי כל מימוש.",
            "לא מציגים מימוש לימודי כביצועי עבר.",
            "בודקים שלב ×1/×10 והסיכון על הנותר.",
          ],
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-realize",
      titleHe: "מימוש ראשון וחוזר",
      setupHe: "Q=20, E_avg=88, M=108.",
      stepsHe: [
        "PnL פתוח ≈ 20×20=400 לפני עמלות.",
        "מימוש 1: q_close=15, q_remain=5.",
        "Realized ≈ 15×20=300; ניכוי עמלה 2 bps על נושא הסגירה.",
        "מימוש 2 (אופציונלי): 75%×5→3.75→3 ב-Floor.",
      ],
      resultHe: "רצף כמותי מתועד.",
      awaitingConfirmation: false,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-label",
        titleHe: "יומן מימוש",
        narrativeHe:
          "הלומד רושם כל סגירת 75% עם עמלות.",
        outcomeHe: "ביקורת עקבית.",
        lessonHe: "מימוש = הפחתת כמות.",
      },
    ],
    failure: [
      {
        id: "fail-withdraw",
        titleHe: "משיכת 75% מ-PnL בלי סגירה",
        narrativeHe:
          "מקטינים 'רווח במחברת' אך Q נשארת 20.",
        outcomeHe: "סתירה למתודולוגיה.",
        lessonHe: "mode=close_quantity_pct בלבד.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe: "Q=16. חשבו q_close ו־q_remain במימוש ראשון.",
    },
    {
      id: "ex2",
      promptHe:
        "q_remain=8, E_avg=50, M=62. חשבו realized על 75% מהנותר.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מימוש מאושר פירושו:",
      choicesHe: [
        "משיכת 75% מהרווח בלי שינוי כמות",
        "סגירת 75% מהכמות",
        "מינוף 75x",
        "סגירת short",
      ],
      correctIndex: 1,
      explanationHe: "profitRealization.mode=close_quantity_pct.",
    },
    {
      id: "q2",
      promptHe: "אחרי מימוש ראשון נשאר:",
      choicesHe: ["0%", "25% מהכמות המקורית", "75%", "short"],
      correctIndex: 1,
      explanationHe: "remainingPct=25.",
    },
    {
      id: "q3",
      promptHe: "עמלת round-trip במודל המאושר:",
      choicesHe: ["20 bps", "2 bps", "0", "1%"],
      correctIndex: 1,
      explanationHe: "fees.roundTripBps=2 בסגירה.",
    },
  ],
  chapterSummaryHe: [
    "מימוש = סגירה ידנית של 75% מהכמות, עם חזרה על הנותר.",
    "עמלות ו-slippage מאושרים בתרגיל — לא טיוטה.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;