import type { ChapterBodyInput } from "../schemas";

export const chapter10Body = {
  slug: "risk-management",
  learningObjectivesHe: [
    "להגדיר סיכון לימודי כלחץ על הון מוקצה וחריגת סף — לא כהבטחת תשואה.",
    "לבנות תרחיש `stress` פשוט על פוזיציה מדומה.",
    "לחבר בין מינוף, חיזוקים ומגבלות הקצאה למשמעת סיכון.",
  ],
  sections: [
    {
      id: "risk-definition",
      titleHe: "מהו סיכון באקדמיה?",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "ניהול סיכונים כאן פירושו להבין איך מהלכי מחיר לימודיים פוגעים ב־`allocated capital`, מתי מתקרבים לסף טיוטתי, ומה קורה אם נגמרת הרזרבה. אין הבטחה שהסיכון 'נשלט' בשוק אמיתי.",
        },
        {
          type: "visual",
          kind: "risk-bands",
          captionHe: "רצועות הקצאה / לחץ / חריגה — כלי חשיבה למעבדה.",
        },
      ],
    },
    {
      id: "stress-math",
      titleHe: "תרגיל לחץ בסיסי",
      blocks: [
        {
          type: "formula",
          id: "stress-pnl",
          latex: "\\mathrm{PnL}_{\\text{stress}} = Q \\times (M_{\\text{stress}} - E_{\\text{avg}})",
          captionHe: "PnL תחת מחיר לחץ לימודי ל־long",
        },
        {
          type: "formula",
          id: "drawdown-alloc",
          latex: "DD_{\\text{alloc}} = \\frac{-\\min(\\mathrm{PnL}_{\\text{stress}}, 0)}{C_{\\text{cum}}}",
          captionHe: "שיעור לחץ ביחס להון מוקצה מצטבר (מדד לימודי)",
        },
        {
          type: "table",
          id: "stress-grid",
          captionHe: "גריד לחץ לדוגמה (לא בקטסט)",
          headersHe: ["M_stress מול E_avg", "PnL (Q=100, E=90)", "DD מול C_cum=6,000"],
          rows: [
            ["−5% (85.5)", "100×(85.5−90)=−450", "7.5%"],
            ["−10% (81)", "−900", "15%"],
            ["−20% (72)", "−1,800", "30%"],
          ],
        },
        {
          type: "callout",
          tone: "sim",
          titleHe: "לא ביצועי עבר",
          textHe:
            "הטבלה היא גריד תרגיל. אסור להציג אותה כתוצאות היסטוריות של השיטה.",
        },
      ],
    },
    {
      id: "controls",
      titleHe: "בקרות משמעת",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "תקרת הקצאה כוללת לתירגול.",
            "רזרבה מינימלית לפני חיזוק נוסף.",
            "איסור העלאת מינוף בלי תיוג מסלול (A/B) ובלי סף טיוטתי.",
            "עצירת תרגיל כשנגמרת הרזרבה — וניתוח מה קרה.",
          ],
        },
        {
          type: "paragraph",
          textHe:
            "עמלות לימודיות מוצעות (2 bps round-trip, slippage 1 bp לצד) יכולות להחמיר לחץ קל בתרגילים מתקדמים — גם הן טיוטה עד אישור.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-stress",
      titleHe: "בניית גריד לחץ אישי",
      setupHe: "Q=80, E_avg=125, C_cum=5,000. בדקו M=118 ו־M=100.",
      stepsHe: [
        "PnL(118)=80×(118−125)=−560 → DD=560/5000=11.2%.",
        "PnL(100)=80×(100−125)=−2,000 → DD=40%.",
        "רושמים האם הרזרבה הנותרת מאפשרת חיזוק נוסף בתרגיל.",
      ],
      resultHe: "שני מצבי לחץ מתועדים בלי טענת ביצועים.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-stop-lab",
        titleHe: "עצירת תרגיל בחריגה",
        narrativeHe:
          "כשהרזרבה נגמרת הלומד עוצר, מתעד, ולא 'ממציא הון'.",
        outcomeHe: "הלמידה מתמקדת בגבולות.",
        lessonHe: "סיכון לימודי נמדד גם ביכולת לעצור.",
      },
    ],
    failure: [
      {
        id: "fail-guarantee",
        titleHe: "הבטחת שליטה בסיכון",
        narrativeHe:
          "לומד כותב שעם הכללים 'אי אפשר להפסיד יותר מ־X בשוק'.",
        outcomeHe: "הבטחה אסורה ומטעה.",
        lessonHe: "סימולציה אינה תעודת ביטוח לשוק החי.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "בנו גריד לחץ לשלושה מחירי M לבחירתכם עבור Q=50, E_avg=200, C_cum=4,000.",
    },
    {
      id: "ex2",
      promptHe:
        "נסחו ארבע בקרות משמעת אישיות לשימוש במעבדת הסיכון.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "DD_alloc בפרק זה מודד:",
      choicesHe: [
        "תשואת תיק אמיתי",
        "לחץ לימודי ביחס להון מוקצה",
        "עמלת מימון חיה",
        "דירוג אשראי",
      ],
      correctIndex: 1,
      explanationHe: "זה מדד תרגיל מול C_cum.",
    },
    {
      id: "q2",
      promptHe: "מה עושים כשנגמרת הרזרבה בתרגיל?",
      choicesHe: [
        "ממציאים הון חדש בשקט",
        "עוצרים ומתעדים",
        "עוברים מיד ל־100x",
        "מוחקים את היומן",
      ],
      correctIndex: 1,
      explanationHe: "עצירה ותיעוד הם חלק ממשמעת הסיכון.",
    },
    {
      id: "q3",
      promptHe: "האם גריד הלחץ הוא בקטסט מאומת?",
      choicesHe: ["כן", "לא — תרגיל לימודי בלבד", "רק אם PnL חיובי", "רק ב־Path B"],
      correctIndex: 1,
      explanationHe: "אין בקטסטים מבוימים באקדמיה.",
    },
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
