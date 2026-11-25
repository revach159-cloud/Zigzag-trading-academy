import type { ChapterBodyInput } from "../schemas";

export const chapter09Body = {
  slug: "knowing-when-to-stop",
  openingStoryHe:
    "לפני היער האחרון יש שער קטן עם שלט: 'כאן עוצרים גם כשאפשר להמשיך'. מי שלא יודע לקרוא אותו יהפוך כל Reject לכישלון אישי. מי שכן — מבין שהעצירה היא חלק ממפת המסלול.",
  principleHe:
    "עצירה כשרה: Reject בתקרה, דילוג מודע על רמה, סגירה ידנית, או יציאה כשהמסלול איבד משמעת.",
  memorableInsightHe:
    "לדעת מתי לעצור זה לא לפרוש מהמסע — זה לשמור עליו.",
  learningObjectivesHe: [
    "למנות מצבי עצירה לגיטימיים בשיטה.",
    "להפריד בין עצירת משמעת לבין כניעה רגשית.",
    "לתעד דילוג ו־Reject בלי בושה.",
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
            "בספר הזה עצירה אינה מילה גסה. חיזוק שנדחה, רמה שדולגה, מימוש שמסיים סיפור — כולם תחנות. בלי עצירות המסלול הופך לרדיפה אינסופית.",
        },
      ],
    },
    {
      id: "principle",
      titleHe: "העיקרון",
      role: "principle" as const,
      blocks: [
        {
          type: "table",
          id: "stop-modes",
          captionHe: "מצבי עצירה לימודיים",
          headersHe: ["מצב", "מה קורה", "איך מתעדים"],
          rows: [
            ["Reject תקרה", "הוספת מרג'ין נדחית מעל $250", "סיבת דחייה + יתרת מרג'ין"],
            ["דילוג על רמה", "Touch בלי חיזוק", "רמה דולגה נשארת ביומן"],
            ["מימוש / סגירה", "צמצום או סיום כמות", "סבב 75% או יציאה מלאה"],
            ["עצירת משמעת", "הרגש משתלט על הכלל", "יציאה מהתרגיל עד חזרה לצלולות"],
          ],
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "דילוג מתועד",
          textHe:
            "בשיטה המאושרת רמות שדולגו נשארות מתועדות. דילוג אינו 'מחיקה' של המסלול.",
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
            "מטייל שמחליט לא לרדת לתהום היום אינו כישלון. הוא קורא מזג אוויר. כך גם Reject.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "דוגמה",
      role: "trading" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "Touch ב־L3. המרג'ין כבר $240. חיזוק מתוכנן $20 נדחה. העצירה הנכונה: לא 'למצוא פרצה', אלא לעבור לניהול הרמזור על מה שקיים — או לממש לפי תוכנית.",
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
            "יש עצירה בריאה ויש בריחה. ההבדל: האם פעלתם לפי כלל כתוב מראש, או לפי דחף רגעי שמחפש מנוחה מיידית בלי מסלול.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-stop-journal",
      titleHe: "יומן עצירה",
      setupHe: "Reject על חיזוק + דחף 'לפתוח פוזיציה חדשה מיד'.",
      stepsHe: [
        "מתעדים Reject.",
        "עוצרים דקה וקוראים את כלל הרמזור.",
        "מחליטים: ניהול הקיים / מימוש / יציאה מהתרגיל — לא פתיחה נקמנית.",
      ],
      resultHe: "העצירה שומרת על המסע.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-stop",
        titleHe: "Reject כגבול חי",
        narrativeHe: "הלומד מקבל דחייה ועובר לניהול.",
        outcomeHe: "התקרה נשמרת.",
        lessonHe: "עצירה = שמירה על מסלול.",
      },
    ],
    failure: [
      {
        id: "fail-revenge",
        titleHe: "פתיחה נקמנית",
        narrativeHe: "אחרי Reject נפתחת פוזיציה חדשה מתוך כעס.",
        outcomeHe: "הגבול נשבר במקום אחר.",
        lessonHe: "נקמה אינה Lookback.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "מתי עצירה אצלכם הייתה משמעת — ומתי בריחה?",
    },
    {
      id: "r2",
      promptHe: "נסחו כלל עצירה אישי שתואם תקרת $250 בלי להבטיח רווח.",
    },
  ],
  chapterSummaryHe: [
    "Reject, דילוג, מימוש ועצירת משמעת הם חלק מהמפה.",
    "עצירה שומרת על המסע; נקמה שוברת אותו.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
