import type { ChapterBodyInput } from "../schemas";

export const chapter04Body = {
  slug: "position-construction",
  learningObjectivesHe: [
    "לתאר בניית `position` long בשלב ×1 על מודל Bybit Linear USDT Perp (Cross, One-Way).",
    "לחשב כמות עם Floor מ-margin ביחס למחיר ביצוע.",
    "להכיר תקרת $250 margin לפוזיציה ומדיניות Reject.",
  ],
  sections: [
    {
      id: "layers",
      titleHe: "פוזיציה כמבנה שכבות",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "ב־ZigZag, `position construction` מתחיל מהקצאת margin לימודית בשלב ×1, כמות long בלבד, ותיעוד לשכבות `reinforcement` עתידיות. Short מבוטל בשיטה המאושרת.",
        },
        {
          type: "visual",
          kind: "position-stack",
          captionHe: "שכבות הקצאת margin — הכניסה הראשונה אינה בהכרח סוף ההיסטוריה.",
        },
        {
          type: "callout",
          tone: "definition",
          titleHe: "margin מול notional",
          textHe:
            "margin הוא הבסיס להקצאה (allocationBasis=margin). notional גדל עם מינוף; collateral שייך לחשבון Cross; liquidation אינו זהה ל'סיום תרגיל'.",
        },
      ],
    },
    {
      id: "opening",
      titleHe: "פתיחת שכבה ראשונה",
      blocks: [
        {
          type: "formula",
          id: "qty-from-margin",
          latex: "q_0 = \\lfloor C_0 / E_0 \\rfloor",
          captionHe: "כמות פתיחה מ-margin וממחיר ביצוע (Floor, שלב ×1)",
          awaitingConfirmation: false,
        },
        {
          type: "paragraph",
          textHe:
            "בשלב ×1, sizing מצטבר לפי cumulative allocated capital על בסיס margin. תקרה $250 לפוזיציה — ניסיון חריגה נדחה.",
        },
        {
          type: "table",
          id: "construction-checklist",
          captionHe: "רשימת בניית פוזיציה לתרגיל",
          headersHe: ["שלב", "שאלה לבדיקה"],
          rows: [
            ["כוונה", "long בלבד — למה בתרגיל?"],
            ["הקצאה", "כמה margin ב־C₀ ומה נשאר מתחת ל-$250?"],
            ["כניסה", "מהו E₀ ואיך מעגלים tick לכיוון adverse?"],
            ["תיעוד", "margin, כמות, מחיר — ביומן?"],
            ["גבול", "מה קורה במגע בסולם P_k = P₀×(1−0.10×k)?"],
          ],
        },
      ],
    },
    {
      id: "reserve",
      titleHe: "תקרה ורזרבה פדגוגית",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "התקרה הקנונית היא $250 margin מצטבר לפוזיציה בשלב ×1. רזרבה בתוך התקרה משמשת לתרגול חיזוקים — לא 'הון אינסופי'.",
        },
        {
          type: "list",
          itemsHe: [
            "דוגמה: פתיחה margin $120, נשאר מקום עד $250 לחיזוקים.",
            "חריגה → Reject — לא דחיפת עודף לפוזיציה.",
            "Decimal מדויק לסולם; כמות ב-Floor.",
          ],
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-open",
      titleHe: "פתיחה תחת $250",
      setupHe: "P₀=100; margin C₀=$120 לפתיחה בשלב ×1.",
      stepsHe: [
        "q₀ = floor(120/100) = 1.",
        "C_cum=$120; נותר מקום עד $130 לחיזוקים לפני תקרה.",
        "ביומן: long, q=1, E=100, margin=$120.",
      ],
      resultHe: "פוזיציית פתיחה מוגדרת בתוך תקרת margin.",
      awaitingConfirmation: false,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-reserve",
        titleHe: "פתיחה מתועדת",
        narrativeHe:
          "הלומד פותח שכבה עם margin מפורש ומשאיר מקום לחיזוקים עד $250.",
        outcomeHe: "תיעוד מוכן לפרק 5.",
        lessonHe: "בנייה טובה מתחילה ב-margin, לא במינוף.",
      },
    ],
    failure: [
      {
        id: "fail-cap",
        titleHe: "חריגה מ-$250 מיד",
        narrativeHe:
          "margin פתיחה $300 בשלב ×1.",
        outcomeHe: "דחייה (Reject) לפי השיטה.",
        lessonHe: "התקרה היא כלל מאושר — לא עיצוב UI.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "margin $150, מחיר 75. חשבו q₀ ב-Floor. מה נשאר עד תקרה $250?",
      hintHe: "q=⌊150/75⌋; נותר 250−150.",
    },
    {
      id: "ex2",
      promptHe:
        "כתבו צ'ק־ליסט בניית פוזיציה long בסימולטור (5 סעיפים).",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "תקרת margin לפוזיציה בשלב ×1:",
      choicesHe: [
        "$250 עם Reject",
        "ללא תקרה",
        "רק ל-short",
        "$2,500 תמיד",
      ],
      correctIndex: 0,
      explanationHe: "perPositionMarginCapUsd=250; capPolicy=reject.",
    },
    {
      id: "q2",
      promptHe: "כמות בשלב ×1 מחושבת כ:",
      choicesHe: ["C₀ × E₀", "⌊C₀ / E₀⌋", "E₀ − C₀", "PnL / E₀"],
      correctIndex: 1,
      explanationHe: "quantityRounding=floor.",
    },
    {
      id: "q3",
      promptHe: "כיוון מסחר מאושר:",
      choicesHe: ["long ו-short", "long בלבד", "short בלבד", "אין פוזיציה"],
      correctIndex: 1,
      explanationHe: "direction=long_only; shortEnabled=false.",
    },
  ],
  chapterSummaryHe: [
    "פוזיציה נבנית משכבות margin long עם כמות Floor ותקרה $250.",
    "מבחינים margin, notional ו-collateral — liquidation נושא נפרד.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;