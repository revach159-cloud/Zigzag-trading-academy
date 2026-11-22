import type { ChapterBodyInput } from "../schemas";

export const chapter06Body = {
  slug: "leverage-system",
  learningObjectivesHe: [
    "להסביר מינוף לימודי 1x מול 10x במסגרת ZigZag.",
    "להבחין בין שני מסלולי מעבר שאינם שקולים.",
    "לדעת את טיוטת סף המעבר: הפסד = 100% מהחיזוק האחרון.",
  ],
  sections: [
    {
      id: "leverage-edu",
      titleHe: "מינוף ככלי לימודי",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "באקדמיה `leverage` מתאר כמה חשיפה רעיונית מיוחסת להון מוקצה בתרגיל. 1x אומר חשיפה≈הקצאה (בפישוט). 10x מגדיל רגישות ל־`PnL` — ולכן גם לסיכון. המקסימום הלימודי המוצע הוא 10x.",
        },
        {
          type: "formula",
          id: "notional-lev",
          latex: "N \\approx L \\times C_{\\text{allocated}}",
          captionHe: "קירוב לימודי: notional כמינוף כפול הון מוקצה (טיוטה)",
          awaitingConfirmation: true,
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "לא מסחר ממונף אמיתי",
          textHe:
            "אין כאן קריאות מרג'ין של ברוקר. תרגילי 10x הם להבנת רגישות — לא להפעלת חשבון.",
        },
      ],
    },
    {
      id: "threshold-draft",
      titleHe: "סף מעבר מוצע ל־10x",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "טיוטה: אפשרות דיון ב־10x נפתחת כשההפסד הלימודי שווה ל־100% מה־`reinforcement` האחרון. בסיס מדידת ה־PnL המדויק לסף הזה עדיין דורש אישור.",
        },
        {
          type: "formula",
          id: "tenx-threshold",
          latex: "|\\mathrm{PnL}_{\\text{trigger}}| \\stackrel{?}{=} C_{\\text{latest reinforcement}}",
          captionHe: "תנאי סף מוצע (סימן שאלה = ממתין לאישור)",
          awaitingConfirmation: true,
        },
      ],
    },
    {
      id: "two-paths",
      titleHe: "שני מסלולים — לא שקולים",
      blocks: [
        {
          type: "visual",
          kind: "leverage-paths",
          captionHe: "Path A: פוזיציית 10x נפרדת · Path B: שינוי מינוף על קיימת",
        },
        {
          type: "table",
          id: "paths",
          captionHe: "השוואת מסלולים (טיוטה)",
          headersHe: ["מסלול", "מה קורה", "למה לא שקול"],
          rows: [
            [
              "A — separate 10x",
              "נפתחת פוזיציה ממונפת נוספת",
              "שתי ישויות סיכון/תיעוד נפרדות",
            ],
            [
              "B — re-lever in place",
              "משנים L על אותה פוזיציה",
              "אותה ישות עם רגישות PnL שונה",
            ],
          ],
          awaitingConfirmation: true,
        },
        {
          type: "callout",
          tone: "awaiting",
          titleHe: "איזה מסלול קנוני?",
          textHe:
            "הבעלים טרם אישר אם השיטה משתמשת ב־A, ב־B, או בשניהם תחת תנאים. עד אז מלמדים את ההבחנה בלבד.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-lev-sense",
      titleHe: "רגישות PnL ב־1x מול 10x",
      setupHe:
        "C_allocated=1,000. שינוי מחיר לימודי של +1% על ה־notional.",
      stepsHe: [
        "ב־1x: N≈1000 → שינוי ≈10 יח'.",
        "ב־10x: N≈10000 → שינוי ≈100 יח'.",
        "מדגישים: אותו מהלך מחיר, רגישות שונה — בלי להבטיח תוצאה בשוק.",
      ],
      resultHe: "הלומד רואה למה 10x דורש משמעת סיכון גבוהה יותר.",
      awaitingConfirmation: true,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-path-label",
        titleHe: "תיעוד מסלול מעבר",
        narrativeHe:
          "בתרגיל הלומד כותב במפורש 'Path A' או 'Path B' לפני כל שינוי מינוף.",
        outcomeHe: "אין בלבול בין פוזיציות או רמות סיכון.",
        lessonHe: "הבחנת מסלולים חשובה יותר מהמספר 10 עצמו.",
      },
    ],
    failure: [
      {
        id: "fail-equiv",
        titleHe: "הנחת שקילות מסלולים",
        narrativeHe:
          "לומד מניח ש־re-lever זהה לפוזיציה נפרדת ומערבב יומנים.",
        outcomeHe: "חישוב ממוצע וסיכון משתבשים.",
        lessonHe: "המסלולים אינם שקולים — גם כששניהם בטיוטה.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "הסבירו בשני משפטים למה Path A ו־Path B אינם שקולים.",
    },
    {
      id: "ex2",
      promptHe:
        "בהינתן חיזוק אחרון C=1,500, נסחו את תנאי הסף המוצע למעבר לדיון 10x.",
      hintHe: "היעזרו בנוסחת הסף שבפרק.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מהו המינוף הלימודי המרבי המוצע?",
      choicesHe: ["2x", "5x", "10x", "100x"],
      correctIndex: 2,
      explanationHe: "הטיוטה מגדירה מקסימום לימודי 10x.",
    },
    {
      id: "q2",
      promptHe: "סף המעבר המוצע ל־10x הוא:",
      choicesHe: [
        "רווח של 75%",
        "הפסד השווה ל־100% מהחיזוק האחרון",
        "כל swing low",
        "פתיחת חשבון ברוקר",
      ],
      correctIndex: 1,
      explanationHe: "זו טיוטת הסף מהתכנית — ממתינה לאישור.",
    },
    {
      id: "q3",
      promptHe: "Path A במעבר ל־10x פירושו:",
      choicesHe: [
        "שינוי מינוף על אותה פוזיציה",
        "פתיחת פוזיציית 10x נפרדת",
        "סגירת כל החשיפה",
        "הפקדת כסף",
      ],
      correctIndex: 1,
      explanationHe: "Path A = separate 10x position.",
    },
  ],
  awaitingNotesHe: [
    "אישור סף 10x ובסיס מדידת ה־PnL לסף.",
    "אישור מסלול מעבר קנוני: separate מול re-lever.",
    "אישור נוסחת notional תחת מינוף לימודי.",
  ],
} satisfies ChapterBodyInput;
