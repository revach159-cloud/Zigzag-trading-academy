import type { ChapterBodyInput } from "../schemas";

export const chapter12Body = {
  slug: "practical-reference",
  openingStoryHe:
    "בתחנת המדריך פורסים דף עבודה אחד על השולחן. לא כדי להחליף את הסיפור שכבר נקרא — כדי שתוכלו לחזור אליו כשהסימולטור פתוח והראש מלא. כשהסערה מתחילה, חוזרים לדף.",
  principleHe:
    "דף ייחוס אחד: סולם, רמזור, תקרות, מימוש, עלויות ופערים — לתרגול סימולטיבי בלבד.",
  memorableInsightHe:
    "כשהסערה מתחילה — חוזרים לדף, לא לאינטואיציה הרגעית.",
  learningObjectivesHe: [
    "לשלוף במהירות את כללי השיטה המאושרים.",
    "לזכור עלויות בסיס וחריגים.",
    "להשתמש בדף כעוגן משמעת בסימולציה.",
  ],
  sections: [
    {
      id: "opening",
      titleHe: "דף העבודה",
      role: "opening" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "המדריך המעשי אינו בחינה. הוא מפת כיס למסע. השתמשו בו אחרי שקראתם את הסיפור — לא במקומו.",
        },
      ],
    },
    {
      id: "rules",
      titleHe: "כללים מאושרים בקצרה",
      role: "reference" as const,
      blocks: [
        {
          type: "table",
          id: "quick-rules",
          captionHe: "ייחוס מהיר — מתודולוגיה מאושרת 2026-11-24",
          headersHe: ["נושא", "כלל"],
          rows: [
            ["כיוון", "Long בלבד"],
            ["מצב חשבון", "Bybit Linear USDT Perp · Cross · One-Way"],
            ["סולם", "10% adverse מ־P₀ · Touch · Decimal מדויק"],
            ["חיזוק", "אופציונלי לרמה · דילוגים מתועדים"],
            ["הקצאה", "Margin מצטבר · Floor לכמות"],
            ["תקרה", "$250 לפוזיציה · Reject"],
            ["×1→×10", "תקציבי אחרי מיצוי ×1 · שומר כמות · לא משיכת מרג'ין"],
            ["×10 חיזוק", "הפסד נטו ≥ מרג'ין רלוונטי"],
            ["מינוף max", "רק מ־Bybit מאומת · אחרת unresolved"],
            ["מימוש", "סגירת 75% מהכמות הנותרת · ידני · חוזר"],
            ["עמלות", "2 bps סיבוב · סליפג' 1 bp/צד · מימון 0 בבסיס"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "$250 מול דפוס $320",
          textHe:
            "דפוס ההכפלה האיורי עד $320 אינו דוחה את תקרת $250. בביצוע לימודי — Reject כשחורגים.",
        },
        {
          type: "visual",
          kind: "adverse-ladder",
          captionHe: "תזכורת חזותית לסולם ולמגע.",
        },
      ],
    },
    {
      id: "costs",
      titleHe: "עלויות, פערים ו־Cross",
      role: "reference" as const,
      blocks: [
        {
          type: "list",
          itemsHe: [
            "עמלות וסליפג' מכרסמים בתוצאה גם כשהסיפור 'נכון'.",
            "מימון יכול להיות מופעל בתרגילים מתקדמים — לפני ספים.",
            "פערי מחיר (gaps) יכולים לדלג מעל מגע מדומיין.",
            "Cross margin: ביטחונות משותפים; לא ביטוח.",
          ],
        },
        {
          type: "callout",
          tone: "sim",
          titleHe: "שימוש בדף",
          textHe:
            "הדפיסו או שמרו PDF. כל תרגול סימולטיבי מתחיל בקריאה חוזרת של השורות האלה.",
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
            "דף הייחוס קיים כי הזיכרון בלחץ משקר. אל תסמכו על 'אני זוכר את השיטה' כשהרמזור צהוב.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-checklist",
      titleHe: "צ'ק־ליסט לפני תרגיל",
      setupHe: "פתיחת סימולטור לתרגול ערב.",
      stepsHe: [
        "קוראים תקרה + Reject.",
        "מסמנים צבע רמזור התחלתי.",
        "מאשרים שמימוש = 75% כמות — לא משיכת רווח מילולית.",
      ],
      resultHe: "התרגיל נפתח עם מסלול, לא עם אימפרוביזציה.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-ref",
        titleHe: "חזרה לדף",
        narrativeHe: "בלחץ הלומד פותח את המדריך לפני פעולה.",
        outcomeHe: "ההחלטה מיושרת לכלל.",
        lessonHe: "ייחוס לפני תגובה.",
      },
    ],
    failure: [
      {
        id: "fail-memory",
        titleHe: "זיכון בלחץ",
        narrativeHe: "הלומד 'זוכר' שמימוש הוא משיכת רווח בלי כמות.",
        outcomeHe: "שבירת השיטה.",
        lessonHe: "בלי דף — יש עיוות.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "אילו שלוש שורות מהטבלה תשימו מול העיניים בזמן תרגול?",
    },
    {
      id: "r2",
      promptHe: "איך תתעדו פערי מחיר אם Touch 'דילג' בסימולציה?",
    },
  ],
  chapterSummaryHe: [
    "מדריך מעשי = מפת כיס לכללי השיטה והעלויות.",
    "חוזרים לדף בלחץ; לא ממציאים בזיכרון.",
  ],
  awaitingNotesHe: [
    "max leverage לכל instrument — unresolved עד אימות Bybit.",
  ],
} satisfies ChapterBodyInput;
