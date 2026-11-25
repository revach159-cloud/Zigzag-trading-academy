import type { ChapterBodyInput } from "../schemas";

export const chapter02Body = {
  slug: "lookback-discovery",
  openingStoryHe:
    "בתחנה השנייה עוצרים על גשר מעל עמק של זיגזגים. מלמטה נראה כאוס. מלמעלה — מסלולים. מי שלומד Lookback מגלה שהתנועה כבר סיפרה סיפור: עליות, ירידות, מגע בנקודות. המבט לאחור אינו נוסטלגיה. הוא כלי עבודה.",
  principleHe:
    "לעבוד עם תנועת המחיר בזיגזג — לא לרדוף אחרי הנר הבא.",
  memorableInsightHe:
    "מי שמביט רק קדימה רואה רעש. מי שמביט לאחור רואה מסלול.",
  learningObjectivesHe: [
    "להסביר מהו Lookback כמשמעת קריאה של תנועה.",
    "להבחין בין מבנה swing לימודי לבין אות כניסה אוטומטי.",
    "לחבר את המבט לאחור להשבחת העסקה בשלבים הבאים.",
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
            "רוב האנשים מסתכלים על השוק כמו על אופק שבורח. Lookback הופך את הכיוון: קודם רואים איך המחיר כבר זז, ורק אחר כך מחליטים איך לעבוד עם מה שקרה — לא איך לרדוף אחרי מה שעוד לא קרה.",
        },
        {
          type: "visual",
          kind: "zigzag-swings",
          captionHe:
            "תנועת זיגזג כשפת לימוד: swing high / swing low — לא אות כניסה אוטומטי.",
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
            "במתודולוגיית ZigZag לומדים סולם adverse של 10% ממחיר ייחוס מקורי (P₀). ההפעלה היא ב־Touch. החישוב של ספי הסולם מדויק (Decimal) — בלי עיגול שמסתיר את האמת הלימודית.",
        },
        {
          type: "callout",
          tone: "definition",
          titleHe: "מבט לאחור ≠ חיזוי",
          textHe:
            "Lookback אינו מנבא את הנר הבא. הוא מלמד לקרוא מסלול שכבר נסלל, כדי לנהל פוזיציה במשמעת.",
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
            "מטייל ביער לא רץ אחרי כל צליל. הוא מסתכל על השביל שכבר עבר, על הסימונים, על השיפוע. כך גם כאן: המבט לאחור מארגן את הרעש למסלול שאפשר לנהל.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "דוגמה מסחרית־לימודית",
      role: "trading" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "נניח מחיר ייחוס מקורי P₀ = 100. סולם 10% adverse ארוך־בלבד בונה מגע ב־90, 80, 70… כל מגע הוא הזדמנות לחשוב על חיזוק אופציונלי — לא חובה, ולא הבטחה.",
        },
        {
          type: "table",
          id: "ladder-preview",
          captionHe: "תצוגת סולם לימודית מ־P₀=100 (Touch)",
          headersHe: ["רמה", "מחיר מגע", "משמעות Lookback"],
          rows: [
            ["L1", "90", "מבט לאחור על ירידה של 10% מ־P₀"],
            ["L2", "80", "מסלול ממשיך; חיזוק עדיין אופציונלי"],
            ["L3", "70", "הרעש גדל — המשמעת נבחנת"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "אין סיכון אפס",
          textHe:
            "גם כשהסולם 'ברור' על הנייר, עמלות, סליפג', מימון ופערי מחיר קיימים. Cross margin אינו ביטוח מפני liquidation.",
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
            "הפיתוי הגדול הוא להחליף מבט לאחור בציפייה קדימה: 'מה יקרה עכשיו?'. Lookback מחזיר את השאלה ל: 'מה כבר קרה, ומה המסלול שלי בתוכו?'",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-read-path",
      titleHe: "קריאת מסלול לפני תגובה",
      setupHe: "מחיר ירד מ־100 ל־90 בסימולציה. הלומד רוצה מיד 'לתקן'.",
      stepsHe: [
        "מסמן: זה Touch על L1 ביחס ל־P₀.",
        "רושם: חיזוק אופציונלי — לא חובה.",
        "בודק תקרת מרג'ין לפני כל פעולה.",
      ],
      resultHe:
        "התגובה הופכת להחלטת מסלול, לא לרפלקס רדיפה.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-lookback",
        titleHe: "קריאה לפני פעולה",
        narrativeHe:
          "הלומד ממפה swings וסולם לפני שהוא נוגע בחיזוק.",
        outcomeHe: "ההחלטה מגיעה מתוך מסלול, לא מתוך פחד.",
        lessonHe: "Lookback הוא משמעת קריאה.",
      },
    ],
    failure: [
      {
        id: "fail-chase-candle",
        titleHe: "רדיפה אחרי הנר",
        narrativeHe:
          "במקום להביט לאחור, הלומד מגדיל חשיפה כי 'בטח חוזר'.",
        outcomeHe: "הפוזיציה הופכת לסיפור רגשי.",
        lessonHe: "בלי מבט לאחור אין מסלול — יש רק רדיפה.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "תארו swing אחד שראיתם (גם בדוגמה) במילים של מסלול — לא של ניחוש.",
    },
    {
      id: "r2",
      promptHe: "מתי אצלכם 'להביט לאחור' מרגיש כמו חולשה — ואיך הספר הופך אותו למשמעת?",
    },
  ],
  chapterSummaryHe: [
    "Lookback קורא תנועה שכבר קרתה כדי לבנות מסלול ניהול.",
    "סולם 10% מ־P₀ הוא שפת מגע — לא הבטחת תוצאה.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
