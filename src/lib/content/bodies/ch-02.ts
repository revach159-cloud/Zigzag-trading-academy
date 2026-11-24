import type { ChapterBodyInput } from "../schemas";

export const chapter02Body = {
  slug: "market-structure-and-price-movement",
  learningObjectivesHe: [
    "להגדיר מבנה שוק לימודי באמצעות `swing high` ו־`swing low`.",
    "לתאר תנועת מחיר כרצף זיגזג ולא כקו חלק.",
    "להבחין בין תיאור מבנה לבין אות כניסה או המלצת מסחר.",
  ],
  sections: [
    {
      id: "structure-language",
      titleHe: "שפת מבנה השוק",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "מבנה שוק בלימוד ZigZag מתאר איך המחיר נע בין נקודות מפנה. `swing high` הוא שיא מקומי; `swing low` הוא שפל מקומי. החיבור ביניהם יוצר את הזיגזג שממנו נגזר שם השיטה כשפת תיאור.",
        },
        {
          type: "list",
          itemsHe: [
            "`upswing` — תנועה עולה בין שפל לשיא.",
            "`downswing` — תנועה יורדת בין שיא לשפל.",
            "`range` — אזור שבו השיאים והשפלים אינם יוצרים כיוון ברור.",
          ],
        },
        {
          type: "visual",
          kind: "zigzag-swings",
          captionHe: "סדרת swing highs/lows כמפה לתיאור — לא כפקודה.",
        },
      ],
    },
    {
      id: "price-movement",
      titleHe: "תנועת מחיר מול רעש",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "לא כל תנודה קטנה היא `swing`. בלימוד מסמנים מפנה רק כשהתנועה עוברת סף מושגי שנבחר לתרגיל (למשל אחוז מינימלי מהמחיר הקודם). הסף כאן הוא כלי פדגוגי — לא פרמטר חי של בורסה.",
        },
        {
          type: "formula",
          id: "swing-threshold",
          latex: "\\Delta_{\\%} = \\frac{|P_t - P_{\\text{pivot}}|}{P_{\\text{pivot}}} \\times 100",
          captionHe: "שינוי אחוזי לימודי בין מחיר נוכחי לנקודת מפנה קודמת",
        },
        {
          type: "table",
          id: "structure-labels",
          captionHe: "תוויות מבנה נפוצות בלימוד",
          headersHe: ["תווית", "משמעות לימודית", "מה זה לא"],
          rows: [
            ["HH / HL", "שיאים ושפלים עולים", "הבטחת המשך מגמה"],
            ["LH / LL", "שיאים ושפלים יורדים", "אות מכירה אוטומטי"],
            ["BOS (מושגי)", "שבירת מבנה בתרגיל", "פקודת שוק"],
          ],
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "תיאור ≠ המלצה",
          textHe:
            "סימון מבנה עוזר לדבר בשפה משותפת במעבדה. הוא אינו אישור לפתוח `position` אמיתית.",
        },
      ],
    },
    {
      id: "zigzag-lens",
      titleHe: "עדשת ZigZag",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "בפרקים הבאים נשתמש במבנה רק כרקע להבנת מתי תרגיל מדבר על מהלך שלילי (`adverse move`) או על התקדמות לטובת הפוזיציה. המכניקה של חיזוקים ומינוף תבוא אחרי יסודות המסחר ובניית הפוזיציה.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-swings",
      titleHe: "סימון שלושה מפנים",
      setupHe:
        "סדרת מחירים לימודית: 100 → 108 → 102 → 115 (יחידות מדומות).",
      stepsHe: [
        "מזהים 108 כ־`swing high` ראשון אחרי העלייה מ־100.",
        "מזהים 102 כ־`swing low` אחרי הירידה מ־108.",
        "מזהים 115 כ־`swing high` חדש (HH לימודי).",
        "מחשבים Δ% בין 102 ל־115: (115−102)/102 ≈ 12.7%.",
      ],
      resultHe:
        "המבנה מתואר כ־HL ואז HH — תיאור בלבד, בלי פקודה.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-label",
        titleHe: "תיעוד מבנה לפני דיון בפוזיציה",
        narrativeHe:
          "במעבדה הלומד מסמן קודם swings ורק אחר כך דן בהקצאה לימודית.",
        outcomeHe: "הדיון נשאר ממוקד ועקבי.",
        lessonHe: "שפה משותפת מקטינה בלבול לפני מכניקת החיזוקים.",
      },
    ],
    failure: [
      {
        id: "fail-signal",
        titleHe: "הפיכת swing לאות כניסה",
        narrativeHe:
          "לומד נכנס לסימולציה בכל `swing high` בלי מסגרת הקצאה או סיכון.",
        outcomeHe: "רצף כניסות אקראי בלי משמעת.",
        lessonHe: "מבנה הוא תיאור; בניית פוזיציה דורשת כללים נפרדים.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "ציירו (על נייר) סדרה עם לפחות שני `swing highs` ושני `swing lows` וסמנו HH/HL או LH/LL.",
    },
    {
      id: "ex2",
      promptHe:
        "חשבו Δ% בין pivot של 80 ליחידה לבין מחיר 92, והסבירו אם הייתם מסמנים זאת כ־swing בתרגיל עם סף 10%.",
      hintHe: "השתמשו בנוסחה שבפרק.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מהו `swing low`?",
      choicesHe: [
        "שיא מקומי במחיר",
        "שפל מקומי במחיר",
        "עמלת מימון",
        "מינוף 10x",
      ],
      correctIndex: 1,
      explanationHe: "swing low הוא שפל מקומי במבנה המחיר הלימודי.",
    },
    {
      id: "q2",
      promptHe: "סימון מבנה ZigZag באקדמיה פירושו:",
      choicesHe: [
        "פקודת קנייה אוטומטית",
        "תיאור לימודי של תנועה",
        "אישור ביצועי עבר",
        "חיבור לברוקר",
      ],
      correctIndex: 1,
      explanationHe: "המבנה הוא שפת תיאור פדגוגית, לא אות מסחר.",
    },
    {
      id: "q3",
      promptHe: "HH / HL מתארים לרוב:",
      choicesHe: [
        "מבנה עולה לימודי",
        "חוב מימון",
        "סגירת 75% מהפוזיציה",
        "הפקדת כסף",
      ],
      correctIndex: 0,
      explanationHe: "Higher highs / higher lows מתארים מבנה עולה בלימוד.",
    },
  ],
  chapterSummaryHe: [
    "מבנה שוק מתואר ב-swings וזיגזג — לא אות מסחר.",
    "סולם adverse במתודולוגיה נשען על מחיר ייחוס P₀ בפרקים הבאים.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
