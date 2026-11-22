import type { ChapterBodyInput } from "../schemas";

export const chapter05Body = {
  slug: "reinforcement-mechanism",
  learningObjectivesHe: [
    "להסביר מהו `reinforcement` בשיטת ZigZag כשכבת הקצאה נוספת.",
    "להכיר את טיוטת ברירת המחדל: גודל לפי הון מוקצה מצטבר.",
    "לתרגל דוגמה מספרית תוך סימון מפורש של 'ממתין לאישור'.",
  ],
  sections: [
    {
      id: "what-is-reinforcement",
      titleHe: "מהו Reinforcement?",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "`Reinforcement` הוא הוספת הון מוקצה (וכמות) לפוזיציה קיימת בתרגיל, בדרך כלל אחרי מהלך שלילי לימודי. זה אינו 'averaging down' חופשי בלי כללים — בשיטה יש מסגרת (שבחלקה עדיין בטיוטה).",
        },
        {
          type: "callout",
          tone: "awaiting",
          titleHe: "מצב גודל — טיוטת ברירת מחדל",
          textHe:
            "ברירת המחדל המוצעת: Cumulative allocated capital — סכום ההון שהוקצה/חוזק במפורש עד כה. חלופה שנדונה: Position equity כולל PnL לא ממומש. טרם אושר.",
        },
      ],
    },
    {
      id: "adverse-context",
      titleHe: "הקשר למהלך שלילי",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "טיוטה לימודית מציעה סולם מרווחי מחיר של 10% כסמן ל־`adverse move` (לא mid של order book חי). החיזוק נדון ביחס לסולם הזה במעבדה — עד לאישור.",
        },
        {
          type: "visual",
          kind: "adverse-ladder",
          captionHe: "סולם 10% לימודי מוצע — אינו פרמטר מסחר חי.",
        },
        {
          type: "formula",
          id: "ladder-price",
          latex: "P_k = P_0 \\times (1 - 0.10)^k",
          captionHe: "מחיר רמה k בסולם ירידה לימודי של 10% (טיוטה)",
          awaitingConfirmation: true,
        },
      ],
    },
    {
      id: "sizing-draft",
      titleHe: "טיוטת חישוב גודל",
      blocks: [
        {
          type: "formula",
          id: "cum-alloc",
          latex: "C_{\\text{cum}} = \\sum_{i=0}^{n} C_i",
          captionHe: "הון מוקצה מצטבר אחרי n חיזוקים (הגדרה לימודית)",
          awaitingConfirmation: true,
        },
        {
          type: "paragraph",
          textHe:
            "כיצד בדיוק נגזר C_{n+1} מ־C_cum (או מ־equity) — אינו סגור. לכן בדוגמאות נבחר מספר הקצאה מפורש לכל שכבה ונתייג זאת כתרגיל, לא ככלל קנוני.",
        },
        {
          type: "table",
          id: "reinforcement-log",
          captionHe: "יומן חיזוקים לדוגמה (טיוטה)",
          headersHe: ["שכבה", "מחיר סימולציה", "הקצאה C_i", "C_cum"],
          rows: [
            ["0 פתיחה", "100", "2,000", "2,000"],
            ["1 חיזוק", "90", "2,000", "4,000"],
            ["2 חיזוק", "81", "2,000", "6,000"],
          ],
          awaitingConfirmation: true,
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-reinf",
      titleHe: "שני חיזוקים מתועדים",
      setupHe:
        "פתיחה ב־100 עם C_0=2000. אחרי ירידה ל־90 ול־81 מוסיפים C_1=C_2=2000 (מספרים לבחירת התרגיל).",
      stepsHe: [
        "מחשבים מחירי סולם: 100, 90, 81 לפי טיוטת 10%.",
        "מעדכנים C_cum אחרי כל שכבה: 2k → 4k → 6k.",
        "כמויות בפישוט 1x: q₀=2000/100=20; q₁=2000/90≈22.22; q₂=2000/81≈24.69 → Q≈66.91.",
        "מסמנים ביומן: כל השלבים לפי טיוטה ממתינה לאישור.",
      ],
      resultHe:
        "נוצר יומן reinforcement שקוף (C_cum=6,000; Q≈66.91 בפישוט 1x) — בלי להציג זאת ככלל סופי.",
      awaitingConfirmation: true,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-journal",
        titleHe: "חיזוק עם תיעוד מלא",
        narrativeHe:
          "הלומד מוסיף שכבה רק אחרי שסימן את רמת הסולם ואת C_i החדש.",
        outcomeHe: "אפשר לבדוק את הממוצע ואת הסיכון אחר כך.",
        lessonHe: "Reinforcement בלי יומן הוא ניחוש.",
      },
    ],
    failure: [
      {
        id: "fail-invent",
        titleHe: "המצאת כלל גודל",
        narrativeHe:
          "לומד ממציא נוסחת 'פיבונאצ'י לחיזוק' ומציג אותה כחלק משיטת ZigZag.",
        outcomeHe: "זיהום המתודולוגיה בכלל שלא אושר.",
        lessonHe: "אם זה לא בטיוטה המסומנת — זה לא חלק מהשיטה כאן.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "חשבו את P_1 ו־P_2 לפי טיוטת הסולם מ־P_0=120, ותעדו שני C_i לבחירתכם.",
    },
    {
      id: "ex2",
      promptHe:
        "הסבירו במילים שלכם את ההבדל בין cumulative allocated capital לבין position equity.",
      hintHe: "היעזרו בדף השיטה Reinforcement.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מהי ברירת המחדל המוצעת לגודל reinforcement?",
      choicesHe: [
        "Position equity כולל PnL",
        "Cumulative allocated capital",
        "יתרת ברוקר חיה",
        "מינוף קבוע 10x תמיד",
      ],
      correctIndex: 1,
      explanationHe:
        "הטיוטה ברירת המחדל היא הון מוקצה מצטבר — עד לאישור.",
    },
    {
      id: "q2",
      promptHe: "סולם ה־10% בפרק זה הוא:",
      choicesHe: [
        "מחיר mid חי מבורסה",
        "הצעה לימודית ממתינה לאישור",
        "עמלת round-trip",
        "מימוש רווח",
      ],
      correctIndex: 1,
      explanationHe: "זה סמן פדגוגי מוצע, לא order book חי.",
    },
    {
      id: "q3",
      promptHe: "מתי מותר להמציא נוסחת חיזוק חדשה באקדמיה?",
      choicesHe: [
        "תמיד",
        "אף פעם — רק טיוטות מסומנות עד אישור",
        "רק אם PnL חיובי בדוגמה",
        "רק בפרק 1",
      ],
      correctIndex: 1,
      explanationHe: "אין להמציא כללי מתודולוגיה חסרים.",
    },
  ],
  awaitingNotesHe: [
    "אישור מצב גודל: cumulative allocated capital מול equity.",
    "אישור סף/סולם ה־adverse move (הצעה: 10%).",
    "אישור כלל גזירת C_{n+1} המדויק מתוך הבסיס שנבחר.",
  ],
} satisfies ChapterBodyInput;
