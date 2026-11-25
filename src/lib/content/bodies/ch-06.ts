import type { ChapterBodyInput } from "../schemas";

export const chapter06Body = {
  slug: "return-to-balance",
  openingStoryHe:
    "אחרי הסערה חוזרים לשביל צר ליד מים שקטים. לא כי הסערה 'לא הייתה'. אלא כי המסלול יודע לחזור ל־×1: לקנה מידה שבו אפשר שוב לנשום, לראות, ולהחליט בלי רעש של יתר.",
  principleHe:
    "מטרת רצף המימוש והניהול היא שיבה לכיוון איזון ×1 — לא ניצחון מוחלט על השוק.",
  memorableInsightHe:
    "איזון הוא יעד ניהולי. מי שמחפש ניצחון מוחלט נשאר בסערה.",
  learningObjectivesHe: [
    "לתאר חזרה ל־×1 כתהליך כמות וניהול — לא כקסם.",
    "לחבר מימוש 75%, רמזור והשבחה למסלול שיבה.",
    "להימנע משפת 'סיכון אפס אחרי איזון'.",
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
            "חזרה לאיזון אינה מחיקת העבר. היא צמצום חשיפה והחזרת הפוזיציה לקנה מידה ירוק יותר — שם Lookback שוב אפשרי בלי רעש יתר.",
        },
        {
          type: "visual",
          kind: "return-balance",
          captionHe: "מסילת שיבה: מסערה לכיוון ×1 דרך מימושים מדודים.",
        },
      ],
    },
    {
      id: "principle",
      titleHe: "העיקרון",
      role: "principle" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "אחרי סבבי 75%, הכמות קטנה. הרמזור יכול לחזור להרגיש ירוק יותר מבחינת ניהול עצמי — אך המודל נשאר Cross, והסיכון לא מתאפס. avg entry, PnL ממומש/לא ממומש ו־collateral הם מושגים נפרדים שיש לקרוא בנפרד.",
        },
        {
          type: "callout",
          tone: "insight",
          titleHe: "איזון ≠ סיום הסיכון",
          textHe:
            "גם ב־×1 אפשר להפסיד, לשלם עמלות, ולפגוש פער מחיר. האיזון מחזיר יכולת ניהול — לא תעודת ביטוח.",
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
            "אחרי ריצה במעלה הר, חוזרים להליכה. לא כי ההר נעלם — אלא כי הקצב שוב אנושי. כך גם חזרה ל־×1.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "מסלול שיבה לימודי",
      role: "trading" as const,
      blocks: [
        {
          type: "list",
          itemsHe: [
            "מזהים צבע רמזור נוכחי ביומן.",
            "מפעילים מימוש 75% לפי תוכנית — לא לפי פחד או תאווה.",
            "בודקים כמות, מרג'ין ו־notional אחרי כל סבב.",
            "חוזרים לקרוא את השוק ב־Lookback כשהרעש יורד.",
          ],
        },
        {
          type: "visual",
          kind: "avg-entry",
          captionHe: "גם אחרי שיבה: avg entry ו־PnL נשארים סיפורים נפרדים מהכמות.",
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
            "יש מי שמתבייש לחזור לאיזון כי זה 'לא נראה כמו ניצחון'. Lookback הופך את הבושה למשמעת: לחזור לשביל זה מקצועיות.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-back-to-x1",
      titleHe: "יומן שיבה",
      setupHe: "פוזיציה בצהוב עם כמות 16 אחרי סערה.",
      stepsHe: [
        "מימוש: נסגר 12; נותר 4.",
        "מימוש נוסף: נסגר 3; נותר 1.",
        "מסמנים: כיוון איזון ×1 לניהול — סיכון עדיין קיים.",
      ],
      resultHe: "המסלול שב לקנה מידה שניתן לנהל בלי אשליית ניצחון.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-balance",
        titleHe: "שיבה בלי דרמה",
        narrativeHe: "הלומד מסיים סבבי מימוש וחוזר לקרוא סולם בשקט.",
        outcomeHe: "הניהול מתחדש.",
        lessonHe: "איזון הוא תחנה, לא גביע.",
      },
    ],
    failure: [
      {
        id: "fail-all-in-again",
        titleHe: "קפיצה חזרה לסערה",
        narrativeHe: "ברגע שהרגיש 'בטוח', הלומד מגדיל שוב באגרסיביות.",
        outcomeHe: "השיבה מתבטלת.",
        lessonHe: "איזון דורש שמירה — לא רק הגעה.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "מה אצלכם נחשב 'ניצחון' — ומה הספר מציע במקום זה?",
    },
    {
      id: "r2",
      promptHe: "כתבו משפט אחד ליומן אחרי שיבה ל־×1 שאין בו הבטחת תשואה.",
    },
  ],
  chapterSummaryHe: [
    "חזרה ל־×1 היא יעד ניהולי אחרי מימוש ושקט.",
    "איזון אינו סיכון אפס ואינו ניצחון על השוק.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
