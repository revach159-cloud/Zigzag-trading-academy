import type { ChapterBodyInput } from "../schemas";

export const chapter07Body = {
  slug: "journey-psychology",
  openingStoryHe:
    "בתחנת הנפש אין גרף על הקיר — רק מראה. מי שמביט רואה לא את המחיר, אלא את ההתקשרות: 'העסקה שלי', 'אני צודק', 'אסור לי לצאת עכשיו'. Lookback שובר את ההתקשרות בלי להשפיל: משפרים, מנהלים, מממשים, חוזרים לאיזון.",
  principleHe:
    "אל תתאהבו בעסקה. הפוזיציה היא מסלול לניהול — לא זהות.",
  memorableInsightHe:
    "כשהעסקה הופכת לסיפור עליכם — איבדתם את Lookback.",
  learningObjectivesHe: [
    "לזהות התקשרות רגשית לפוזיציה.",
    "לחבר רמזור ומימוש לכלים אנטי־התקשרות.",
    "להפריד בין ערך עצמי לבין תוצאת תרגיל סימולטיבי.",
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
            "הפסיכולוגיה במסע אינה מודול נפרד של 'FOMO כללי'. היא המשך ישיר של השיטה: אם אין משמעת רגשית, הרמזור הופך לקישוט וה־75% הופך למשאלה.",
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
            "שפרו — בלי להעניש את עצמכם על מגע בסולם.",
            "נהלו — לפי צבע רמזור, לא לפי כבוד.",
            "ממשו — כדי לשחרר התקשרות לכמות.",
            "חזרו לאיזון — כדי לשחרר התקשרות לדרמה.",
          ],
        },
        {
          type: "callout",
          tone: "insight",
          titleHe: "משמעת במקום ניבוי רגשי",
          textHe:
            "השאלה אינה 'האם אני צודק?'. השאלה היא 'מה המסלול דורש עכשיו?'",
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
            "שחקן שמתאהב במהלך אחד מפסיק לקרוא את המשחק. מאמן טוב מחזיר אותו למערכת. Lookback הוא המאמן הפנימי.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "תרחיש לימודי",
      role: "trading" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "פוזיציה בצהוב מציגה `PnL` לא ממומש שלילי. הדחף: 'אם אממש — הפסדתי את הצדק'. התשובה המתודית: מימוש 75% אינו הודאה בכישלון אישי; הוא צמצום חשיפה תחת מסלול.",
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "בלי הבטחות נפשיות",
          textHe:
            "השיטה אינה מבטיחה שקט נפשי מלא ואינה מבטיחה רווח. היא נותנת שפה למשמעת.",
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
            "כתבו ביומן לא רק מחיר — גם משפט התקשרות ששמעתם בראש. עצם הרישום מחזיר מרחק. המרחק הוא Lookback.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-detach",
      titleHe: "פירוק התקשרות ביומן",
      setupHe: "הלומד אומר: 'אני חייב להיות צודק בעסקה הזו'.",
      stepsHe: [
        "מחליפים ל: 'המסלול דורש בדיקת רמזור'.",
        "בודקים צבע וכלל מימוש.",
        "מבצעים פעולה אחת קטנה לפי הכלל — או מתעדים דילוג מודע.",
      ],
      resultHe: "הזהות מתנתקת מהפוזיציה צעד אחד.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-detach",
        titleHe: "ניהול בלי אגו",
        narrativeHe: "הלומד מממש לפי תוכנית גם כשהסיפור הפנימי מתנגד.",
        outcomeHe: "המשמעת מנצחת את ההתקשרות.",
        lessonHe: "ערך עצמי ≠ תוצאת תרגיל.",
      },
    ],
    failure: [
      {
        id: "fail-identity",
        titleHe: "העסקה כזהות",
        narrativeHe: "הלומד מסרב לפעול כי 'זה כבר חלק ממני'.",
        outcomeHe: "המסלול נעצר.",
        lessonHe: "התקשרות חוסמת Lookback.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "איזה משפט התקשרות חוזר אצלכם מול פוזיציה?",
    },
    {
      id: "r2",
      promptHe: "איך רמזור או מימוש 75% יכולים לקטוע את המשפט הזה?",
    },
  ],
  chapterSummaryHe: [
    "הפסיכולוגיה כאן היא אנטי־התקשרות למסלול השיטה.",
    "משפרים, מנהלים, מממשים, חוזרים לאיזון — בלי להפוך עסקה לזהות.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
