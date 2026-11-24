import type { ChapterBodyInput } from "../schemas";

export const chapter11Body = {
  slug: "practical-simulation-laboratory",
  learningObjectivesHe: [
    "להריץ פרוטוקול מעבדה מדורג עם זרע דטרמיניסטי רשום.",
    "לחבר בין סימולטור, מעבדת מינוף ומעבדת סיכון כתרגיל אחד.",
    "לתעד תוצאות בלי להפוך אותן לביצועי עבר.",
  ],
  sections: [
    {
      id: "lab-protocol",
      titleHe: "פרוטוקול מעבדה",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "מעבדת הסימולציה המעשית מאחדת את מה שלמדתם: הון לימודי, פוזיציה long, חיזוקים בסולם 100→90→80, מעבר ×10 תקציבי, מימוש 75% בכמות, וגריד סיכון. תרגילים מדורגים עם זרע (`seed`) גלוי לשחזור.",
        },
        {
          type: "table",
          id: "protocol-steps",
          captionHe: "שלבים מומלצים לתרגיל מעבדה",
          headersHe: ["שלב", "פעולה", "פלט ליומן"],
          rows: [
            ["1", "קבעו seed ו־C_total", "seed=…; C_total=…"],
            ["2", "פתחו P1 עם רזרבה", "q0, E0, C0"],
            ["3", "סמנו rungs 100/90/80", "P_k רשומים"],
            ["4", "חיזוק במגע / דילוג מתועד", "שכבות + C_cum עד $250"],
            ["5", "גריד לחץ + מסקנה", "DD_alloc; לקחים"],
          ],
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "זרע דטרמיניסטי",
          textHe:
            "בתרגילים מדורגים הזרע חובה וגלוי. בארגז חול חופשי אפשר זרע אקראי — אבל עדיין לרשום אותו אם רוצים שחזור.",
        },
      ],
    },
    {
      id: "surfaces",
      titleHe: "משטחי התרגול במוצר",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "`/simulator` — מעבר אסטרטגיה (Phase 5+; כעת placeholder עם הנחיות).",
            "`/labs/leverage` — תרגול שלב ×1/×10 ומעבר תקציבי.",
            "`/labs/risk` — תרגילי לחץ והקצאה.",
            "דפי `/method` — חזרה לכללים לפני הרצה.",
          ],
        },
        {
          type: "paragraph",
          textHe:
            "גם כשהמנועים האינטראקטיביים עדיין מתפתחים, הפרוטוקול בפרק זה תקף על נייר או בגיליון — העיקר המשמעת והתיעוד.",
        },
      ],
    },
    {
      id: "lab-report",
      titleHe: "דוח מעבדה מינימלי",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "כותרת, תאריך, seed.",
            "כללים מאושרים (סולם לינארי, תקרה $250, מימוש כמות).",
            "טבלת שכבות / פוזיציות.",
            "גריד לחץ קצר.",
            "מסקנות + פריט unresolved (מינוף max) אם רלוונטי.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "אין שורות 'win rate'",
          textHe:
            "דוח מעבדה אינו מציג אחוזי הצלחה מבוימים או הבטחות תשואה.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-lab-run",
      titleHe: "הרצת נייר עם seed",
      setupHe: "seed=42, C_total=10,000, פתיחה C0=3,000 ב־E0=100.",
      stepsHe: [
        "רושמים seed=42 בראש הדוח.",
        "סולם מאושר: 90 ו־80.",
        "מוסיפים חיזוק מתועד ב־90 עם margin $80 (תחת $250).",
        "מריצים גריד לחץ ל־M=85 ו־M=70 ועוצרים לניתוח.",
      ],
      resultHe: "דוח קצר שחזורי — בלי טענת ביצועים.",
      awaitingConfirmation: false,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-seed",
        titleHe: "שחזור מוצלח",
        narrativeHe:
          "עמית משתמש באותו seed ואותם כללים מאושרים ומגיע לאותה טבלת שכבות.",
        outcomeHe: "הדיון מתמקד בהבנה, לא במזל.",
        lessonHe: "דטרמיניזם הוא כלי הוראה.",
      },
    ],
    failure: [
      {
        id: "fail-winrate",
        titleHe: "הוספת win-rate מדומה",
        narrativeHe:
          "לומד מוסיף לדוח 'הצלחה ב־80% מהמעבדות' בלי בסיס.",
        outcomeHe: "הפרת ציות לימודי.",
        lessonHe: "דוח מעבדה ≠ שיווק ביצועים.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "כתבו תבנית דוח מעבדה ריקה עם כל השדות מהפרק.",
    },
    {
      id: "ex2",
      promptHe:
        "תכננו תרגיל אחד שמשלב `/labs/leverage` ואז `/labs/risk` עם seed קבוע.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "למה רושמים seed בתרגיל מדורג?",
      choicesHe: [
        "כדי לחבר ברוקר",
        "כדי לאפשר שחזור דטרמיניסטי",
        "כדי להבטיח רווח",
        "כדי להסתיר עמלות",
      ],
      correctIndex: 1,
      explanationHe: "זרע גלוי מאפשר חזרה על אותו רצף לימודי.",
    },
    {
      id: "q2",
      promptHe: "מה אסור לכלול בדוח מעבדה?",
      choicesHe: [
        "טבלת שכבות",
        "כללים מאושרים",
        "win-rate מבוים",
        "גריד לחץ",
      ],
      correctIndex: 2,
      explanationHe: "אין ביצועים מבוימים באקדמיה.",
    },
    {
      id: "q3",
      promptHe: "הפרוטוקול בפרק זה תקף גם בלי מנוע אינטראקטיבי מלא?",
      choicesHe: ["לא", "כן — על נייר/גיליון עם אותה משמעת", "רק ב־10x", "רק אחרי בחינה"],
      correctIndex: 1,
      explanationHe: "המשמעת קודמת ל־UI.",
    },
  ],
  chapterSummaryHe: [
    "פרוטוקול מעבדה עם seed, סולם 100/90/80 ותקרת margin.",
    "דוח לימודי בלי win-rate; מינוף max — unresolved בלי Bybit.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
