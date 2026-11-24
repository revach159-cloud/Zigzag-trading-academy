import type { ChapterBodyInput } from "../schemas";

export const chapter12Body = {
  slug: "final-examination",
  learningObjectivesHe: [
    "לחבר את רכיבי השיטה המאושרת לרצף קבלת החלטות אחד.",
    "לעמוד במבחן ידע מסכם — ללא רישיון מסחר.",
    "לזהות פריט unresolved (מינוף מקסימלי instrument) בלי להמציא.",
  ],
  sections: [
    {
      id: "synthesis",
      titleHe: "סינתזת ZigZag",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "בסיום המסלול אתם מתארים: סימולציה Bybit Linear long בלבד → בניית פוזיציה margin ותקרה $250 → סולם 100→90→80 במגע → מעבר ×10 תקציבי → חיזוק ×10 לפי הפסד מצטבר → E_avg → מימוש 75% בכמות → ריבוי פוזיציות → סיכון ומעבדה.",
        },
        {
          type: "table",
          id: "synth-map",
          captionHe: "מפת סינתזה",
          headersHe: ["נושא", "פרק", "סטטוס"],
          rows: [
            ["מבנה ומונחים", "1–3", "מאושר / לימודי"],
            ["בנייה, חיזוק, מינוף", "4–6", "מאושר"],
            ["ממוצע ומימוש", "7–8", "מאושר"],
            ["ריבוי וסיכון", "9–11", "מאושר"],
            ["Unresolved", "מינוף max פר symbol", "רק Bybit"],
          ],
        },
      ],
    },
    {
      id: "exam-rules",
      titleHe: "כללי הבחינה",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "שאלות הידע למטה; אפשר לחזור לפרקים.",
            "ציון גבוה אינו הרשאת מסחר.",
            "על unresolved — לציין שאין המצאת מספר.",
          ],
        },
        {
          type: "callout",
          tone: "sim",
          titleHe: "תעודת הבנה לימודית",
          textHe:
            "הבחינה בודקת הבנה באקדמיה — לא ייעוץ או ביצועים.",
        },
      ],
    },
    {
      id: "open-items",
      titleHe: "פריט unresolved",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "maxInstrumentLeverage דורש אימות מ-Bybit לכל instrument. עד אז מסמנים unresolved ולא קובעים מספר גלובלי בספר.",
        },
        {
          type: "callout",
          tone: "unresolved",
          titleHe: "ללא המצאת מינוף",
          textHe:
            "אם חסר נתון exchange — עוצרים ומסמנים; לא ממציאים כדי 'להשלים' תרגיל.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-oral",
      titleHe: "תשובת סינתזה (90 שניות)",
      setupHe: "מהי שיטת ZigZag באקדמיה?",
      stepsHe: [
        "סימולציה long; margin וסולם לינארי.",
        "תקרה $250; מעבר ×10; מימוש 75% כמות.",
        "עמלות מאושרות; מינוף max — unresolved בלי Bybit.",
      ],
      resultHe: "מסר מדויק בלי הבטחות תשואה.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-honest",
        titleHe: "זיהוי unresolved",
        narrativeHe:
          "נבחן אומר שאין מספר מינוף max גלובלי בלי נתוני symbol.",
        outcomeHe: "תשובה נכונה.",
        lessonHe: "יושר מתודולוגי.",
      },
    ],
    failure: [
      {
        id: "fail-license",
        titleHe: "בחינה כרישיון",
        narrativeHe:
          "פרסום 'מוסמך לסחור' אחרי פרק 12.",
        outcomeHe: "הפרת מסר המוצר.",
        lessonHe: "הבנה ≠ הרשאה.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe: "צ'ק־ליסט 8 פריטים לפני מעבדה מסכמת.",
    },
    {
      id: "ex2",
      promptHe: "הסבירו מעבר ×1→×10 בלי Path A/B.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "אופי האקדמיה:",
      choicesHe: [
        "מסחר חי",
        "לימוד וסימולציה",
        "Edge Lab",
        "הבטחת תשואה",
      ],
      correctIndex: 1,
      explanationHe: "simulationOnly=true.",
    },
    {
      id: "q2",
      promptHe: "P₂ מ־P₀=100:",
      choicesHe: ["81", "80", "72", "90"],
      correctIndex: 1,
      explanationHe: "100×(1−0.2)=80.",
    },
    {
      id: "q3",
      promptHe: "כשחסר מינוף max ל-symbol:",
      choicesHe: [
        "ממציאים 100x",
        "מסמנים unresolved",
        "מוחקים פרק 6",
        "עוברים ל-short",
      ],
      correctIndex: 1,
      explanationHe: "maxLeverageSource=verified_bybit_instrument_only.",
    },
    {
      id: "q4",
      promptHe: "E_avg הוא:",
      choicesHe: [
        "ממוצע פשוט",
        "ממוצע משוקלל כמות",
        "מחיר ראשון בלבד",
        "funding",
      ],
      correctIndex: 1,
      explanationHe: "Σ(qE)/Σq.",
    },
    {
      id: "q5",
      promptHe: "מימוש מאושר:",
      choicesHe: [
        "משיכת רווח 75%",
        "סגירת 75% מהכמות",
        "מינוף 75x",
        "סגירת short",
      ],
      correctIndex: 1,
      explanationHe: "close_quantity_pct.",
    },
  ],
  chapterSummaryHe: [
    "השיטה המאושרת: long, סולם לינארי, תקרות margin, מימוש כמותי.",
    "בחינה בודקת הבנה; מינוף max instrument נשאר unresolved בלי Bybit.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;