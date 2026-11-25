import type { ChapterBodyInput } from "../schemas";

export const chapter08Body = {
  slug: "portfolio-of-routes",
  openingStoryHe:
    "בתחנת התיק נפתחת מפה עם כמה שבילים זוהרים במקביל. מי שמנסה לרוץ בכולם באותה נשימה מאבד את המפה. מי שלומד Lookback מבין: כל מסלול מקבל תקרת מרג'ין משלו — והתיק כולו הוא סיפור סיכון נפרד מכל עסקה בודדת.",
  principleHe:
    "כל פוזיציה = מסלול עם תקרת $250; התיק נמדד בסכום החשיפות והמשמעת — לא בדרמה של עסקה אחת.",
  memorableInsightHe:
    "תיק בריא הוא אוסף מסלולים עם גבולות — לא אוסף הימורים שחולקים אותו פחד.",
  learningObjectivesHe: [
    "להפריד הקצאת מרג'ין בין פוזיציות סימולטיביות.",
    "להסביר תקרת $250 לכל פוזיציה מול סיכון תיק.",
    "להימנע מהעברת רגש מעסקה אחת לכל התיק.",
  ],
  sections: [
    {
      id: "opening",
      titleHe: "סיפור התחנה",
      role: "opening" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "ריבוי פוזיציות מותר בלימוד כאוסף מסלולים. כל אחת long-only במודל Cross One-Way, עם תקרת מרג'ין $250 Reject. ההצלחה אינה 'כולן ירוקות' — אלא שכל אחת מנוהלת כסיפור נפרד תחת אותה פילוסופיה.",
        },
        {
          type: "visual",
          kind: "multi-position",
          captionHe: "מספר מסלולים במקביל — לכל אחד תקרה והקצאה משלו.",
        },
      ],
    },
    {
      id: "principle",
      titleHe: "העיקרון",
      role: "principle" as const,
      blocks: [
        {
          type: "list",
          itemsHe: [
            "לא לערבב מרג'ין של פוזיציה א עם ב ביומן הלימודי.",
            "לבדוק notional מצטבר מול collateral סימולטיבי.",
            "לזכור: Cross יכול לקשר סיכונים גם כשהיומן מפריד.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "Cross וריבוי מסלולים",
          textHe:
            "גם אם אתם מנהלים כל עסקה כמסלול נפרד, במודל Cross הביטחונות משותפים ברמת החשבון הסימולטיבי. פירוק יכול להגיע מאינטראקציה — לא רק מעסקה בודדת.",
        },
      ],
    },
    {
      id: "analogy",
      titleHe: "דימוי מהחיים",
      role: "analogy" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "כמה פרויקטים בעבודה: לכל אחד תקציב. אם פרויקט אחד בולע את כולם — זו לא 'גמישות'. זו קריסת מסגרת.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "דוגמת תיק לימודית",
      role: "trading" as const,
      blocks: [
        {
          type: "table",
          id: "portfolio-caps",
          captionHe: "שלושה מסלולים תחת תקרות נפרדות",
          headersHe: ["מסלול", "מרג'ין מוקצה", "תקרה", "סטטוס"],
          rows: [
            ["A", "$120", "$250", "ירוק · פעיל"],
            ["B", "$250", "$250", "צהוב · ללא חיזוק נוסף"],
            ["C", "$80", "$250", "ירוק · מקום לחיזוק"],
          ],
        },
        {
          type: "visual",
          kind: "risk-bands",
          captionHe: "סיכון תיק כשכבות — לא כדרמה של שורה אחת.",
        },
      ],
    },
    {
      id: "psychology",
      titleHe: "הערה פסיכולוגית",
      role: "psychology" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "כשמסלול אחד כואב, אל תענישו את האחרים. ואל תפצו על כאב במסלול חדש חסר גבול. זה רדיפה בתחפושת תיק.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-separate-caps",
      titleHe: "הפרדת תקרות",
      setupHe: "שתי פוזיציות: $200 ו־$100. הלומד רוצה 'להעביר' $50.",
      stepsHe: [
        "בודקים: כל פוזיציה עם תקרה עצמאית $250.",
        "לא ממציאים העברת מרג'ין שעוקפת Reject.",
        "מתעדים החלטה לכל מסלול בנפרד.",
      ],
      resultHe: "התיק נשאר אוסף מסלולים עם גבולות.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-portfolio",
        titleHe: "ניהול מקביל שקט",
        narrativeHe: "הלומד עובר מסלול־מסלול עם רמזור ויומן נפרדים.",
        outcomeHe: "אין הדבקת פאניקה.",
        lessonHe: "תיק = משמעת מרובה, לא רעש מרובה.",
      },
    ],
    failure: [
      {
        id: "fail-contagion",
        titleHe: "הדבקה רגשית",
        narrativeHe: "הפסד במסלול א גורם לסגירה היסטרית ב־ב ו־ג.",
        outcomeHe: "התיק מתנהג כהימור אחד.",
        lessonHe: "בלי הפרדה אין Lookback תיקי.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "איך תסמנו ביומן הפרדה בין שלושה מסלולים בלי לערבב מרג'ין?",
    },
    {
      id: "r2",
      promptHe: "מה Cross מלמד אתכם על גבול ההפרדה ה'נפשית' מול המודל?",
    },
  ],
  chapterSummaryHe: [
    "כל פוזיציה תחת $250; התיק הוא אוסף מסלולים.",
    "Cross יכול לקשר סיכונים גם כשהיומן מפריד.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
