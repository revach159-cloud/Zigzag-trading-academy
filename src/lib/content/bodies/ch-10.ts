import type { ChapterBodyInput } from "../schemas";

export const chapter10Body = {
  slug: "beyond-trading",
  openingStoryHe:
    "מעבר לגשר האחרון של הגרף נפתח נוף שאינו בורסה: אותה משמעת של מבט לאחור — בעבודה, בלמידה, בשיחה. Lookback אינו רק כלי מסחר. הוא אופן עמידה מול תנועה, עם אותן תקרות ואותו אומץ לעצור.",
  principleHe:
    "לעבוד עם תנועה במקום לרדוף אחריה — עיקרון שחוצה את גבול הגרף.",
  memorableInsightHe:
    "אם השיטה חיה רק מול מסך — היא עדיין לא Lookback. אם היא משנה איך אתם עוצרים בחיים — היא התחילה.",
  learningObjectivesHe: [
    "לנסח את פילוסופיית Lookback מחוץ להקשר מסחר.",
    "לחבר השבחה, רמזור, מימוש ואיזון לדימויי חיים.",
    "לחזור לגבול: גם פילוסופיה יפה אינה ייעוץ השקעות.",
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
            "המסע לא נועד להפוך את חייכם לגרף. הוא נועד להראות שמשמעת מסלולים — הכנה, גבול, מימוש, שיבה — היא שפה אנושית לפני שהיא שפת בורסה.",
        },
        {
          type: "visual",
          kind: "lookback-path",
          captionHe: "אותו מסלול: מבט לאחור כדרך עמידה מול תנועה.",
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
            "השבחה בחיים: לשפר מערכת במקום להחליף אותה בכל בהלה.",
            "רמזור: לדעת מתי להאט בלי להתבייש.",
            "75%: לשחרר רוב העומס ולהשאיר ליבה.",
            "איזון: לחזור לקצב אנושי אחרי סערה.",
          ],
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
            "שיחה קשה: במקום לרדוף אחרי 'המילה האחרונה', מביטים לאחור על מה כבר נאמר — ומכינים מסלול תשובה. זה Lookback בלי טיקר.",
        },
      ],
    },
    {
      id: "trading",
      titleHe: "חזרה לגבול הלימודי",
      role: "trading" as const,
      blocks: [
        {
          type: "callout",
          tone: "sim",
          titleHe: "פילוסופיה ≠ איתות",
          textHe:
            "גם כשהסיפור מתרחב מעבר למסחר, האקדמיה נשארת סימולציה וחינוך. אין כאן המלצה לפתוח פוזיציה בחיים האמיתיים.",
        },
        {
          type: "paragraph",
          textHe:
            "חזרו לדפי השיטה ולמדריך המעשי כשאתם רוצים את המכניקה. חזרו לכאן כשאתם צריכים את המצפן.",
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
            "הסכנה בפילוסופיה יפה היא שתשמש תירוץ להימנעות ממשמעת מספרית. Lookback האמיתי מחזיק גם סיפור וגם תקרה.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-life-route",
      titleHe: "מסלול יומי לא־מסחרי",
      setupHe: "יום עמוס עם שלושה משברים קטנים.",
      stepsHe: [
        "מבט לאחור: מה כבר קרה לפני התגובה הבאה.",
        "רמזור אישי: ירוק/צהוב/אדום לפי עומס.",
        "מימוש 75%: משחררים רוב המשימות הלא־קריטיות.",
      ],
      resultHe: "תרגול שפת המסע מחוץ לגרף — בלי לטעון לרווח פיננסי.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-beyond",
        titleHe: "מצפן חי",
        narrativeHe: "הלומד משתמש בשפת המסלול גם מחוץ לסימולטור.",
        outcomeHe: "המשמעת מתרחבת.",
        lessonHe: "Lookback הוא אופן עמידה.",
      },
    ],
    failure: [
      {
        id: "fail-poetry-only",
        titleHe: "רק מטאפורה",
        narrativeHe: "הלומד מצטט פילוסופיה ומתעלם מתקרת $250 בתרגול.",
        outcomeHe: "הסיפור מתנתק מהשיטה.",
        lessonHe: "בלי גבול מספרי — אין השבחת עסקה.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "היכן בחייכם אתם עדיין רודפים אופק במקום להכין מסלול?",
    },
    {
      id: "r2",
      promptHe: "איך תשמרו על הגבול בין השראה פילוסופית לבין סימולציה בלבד?",
    },
  ],
  chapterSummaryHe: [
    "Lookback הוא משמעת תנועה גם מחוץ לגרף.",
    "הפילוסופיה אינה מחליפה תקרות, רמזור ומימוש — ואינה ייעוץ השקעות.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
