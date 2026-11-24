import type { ChapterBodyInput } from "../schemas";

export const chapter03Body = {
  slug: "trading-fundamentals",
  learningObjectivesHe: [
    "להגדיר מונחי יסוד: `position`, `entry`, `exit`, `PnL`, הון מוקצה.",
    "להסביר למה באקדמיה אין ברוקר, הפקדה או מפתח API.",
    "לחשב `PnL` לימודי פשוט על פוזיציה מדומה.",
  ],
  sections: [
    {
      id: "core-terms",
      titleHe: "מילון יסוד לתרגול",
      blocks: [
        {
          type: "table",
          id: "terms",
          captionHe: "מונחים באנגלית בתוך הקשר עברי",
          headersHe: ["מונח", "משמעות לימודית"],
          rows: [
            ["`position`", "חשיפה מדומה לכיוון ולכמות בתרגיל"],
            ["`entry`", "מחיר/נקודת פתיחה מדומה"],
            ["`exit`", "סגירה מלאה או חלקית מדומה"],
            ["`notional`", "שווי רעיוני של החשיפה בתרגיל"],
            ["`margin`", "הקצאה לפוזיציה (בסיס sizing בשיטה המאושרת)"],
            ["`collateral`", "בטוחה לחשבון Cross (לא זהה ל-margin בפוזיציה)"],
            ["`liquidation`", "אירוע פירוק בשוק — נלמד בנפרד מסיום תרגיל"],
            ["`allocated capital`", "מונח לימודי להון שהוקצה במפורש לפוזיציה"],
            ["`unrealized PnL`", "רווח/הפסד פתוח לפי מחיר סימולציה"],
            ["`realized PnL`", "רווח/הפסד שנסגר בתרגיל"],
          ],
        },
        {
          type: "callout",
          tone: "sim",
          titleHe: "אין תשתיות מסחר",
          textHe:
            "האקדמיה לא מתחברת לבורסה. כל `order` שיופיע בהמשך הוא צעד בסימולטור או במעבדה.",
        },
      ],
    },
    {
      id: "pnl-basics",
      titleHe: "PnL לימודי בסיסי",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "עבור `long` לימודי בכמות q ובמחיר כניסה E, עם מחיר סימולציה M:",
        },
        {
          type: "formula",
          id: "pnl-long",
          latex: "\\mathrm{PnL} = q \\times (M - E)",
          captionHe: "רווח/הפסד לימודי לפוזיציית long מדומה",
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "long בלבד",
          textHe:
            "במתודולוגיה המאושרת short מבוטל (`long_only` / `shortEnabled=false`). כל תרגילי הפרוטוקול הם long בלבד.",
        },
        {
          type: "formula",
          id: "return-on-allocated",
          latex: "r_{\\text{alloc}} = \\frac{\\mathrm{PnL}}{C_{\\text{allocated}}}",
          captionHe: "תשואה לימודית ביחס להון מוקצה (לא ביצועי עבר)",
        },
      ],
    },
    {
      id: "capital-education",
      titleHe: "הון מוקצה מול 'כסף אמיתי'",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "margin מוקצה בתרגיל הוא מספר סימולטיבי — לא יתרת בנק. חיזוקים מצטברים לפי cumulative allocated margin עד תקרה $250. notional גדל עם מינוף; collateral שייך לרמת החשבון.",
        },
        {
          type: "list",
          itemsHe: [
            "קבעו הון לימודי לתירגול (למשל 10,000 יח').",
            "הקצו חלק לפוזיציה בודדת; השאירו רזרבה לתרגילי לחץ.",
            "אל תייצאו מספרים אלה כביצועי מסחר.",
          ],
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-pnl",
      titleHe: "חישוב PnL long",
      setupHe:
        "כמות q=10, כניסה E=100, מחיר סימולציה M=103, הון מוקצה C=1,000.",
      stepsHe: [
        "PnL = 10 × (103 − 100) = 30.",
        "r_alloc = 30 / 1000 = 3%.",
        "רושמים: זה תרגיל — לא תשואת תיק אמיתי.",
      ],
      resultHe: "PnL לימודי 30 יח'; תשואה להון מוקצה 3%.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-ledger",
        titleHe: "יומן הקצאה מסודר",
        narrativeHe:
          "הלומד מתעד לכל תרגיל: הון כולל, הון מוקצה, כניסה, כמות, ומחיר סימולציה.",
        outcomeHe: "אפשר לחזור על החישוב ולבדוק טעויות.",
        lessonHe: "משמעת תיעוד היא חלק מיסודות המסחר הלימודי.",
      },
    ],
    failure: [
      {
        id: "fail-broker",
        titleHe: "ניסיון לחבר API",
        narrativeHe:
          "לומד מנסה להזין מפתח ברוקר 'כדי לראות מחירים אמיתיים' בתוך האקדמיה.",
        outcomeHe: "חורג ממסגרת המוצר ומערבב סימולציה עם מסחר.",
        lessonHe: "האקדמיה נשארת סגורה למסחר אמיתי במכוון.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "חשבו PnL ל־long מדומה: q=5, E=200, M=190. הסבירו את הסימן (הפסד לימודי).",
    },
    {
      id: "ex2",
      promptHe:
        "הגדירו הון לימודי 8,000 והקצו 25% לפוזיציה. מהו C_allocated ומה נשאר לרזרבה?",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מהו `allocated capital` באקדמיה?",
      choicesHe: [
        "יתרת ברוקר אמיתית",
        "הון לימודי שהוקצה במפורש לתרגיל",
        "עמלת מימון",
        "מפתח API",
      ],
      correctIndex: 1,
      explanationHe: "זה מספר סימולטיבי להקצאה — לא כסף אמיתי.",
    },
    {
      id: "q2",
      promptHe: "PnL ל־long לימודי מחושב כ:",
      choicesHe: [
        "q × (E − M)",
        "q × (M − E)",
        "E / q",
        "מינוף × עמלות בלבד",
      ],
      correctIndex: 1,
      explanationHe: "עבור long: כמות כפול (מחיר נוכחי פחות כניסה).",
    },
    {
      id: "q3",
      promptHe: "האם מותר לחבר מפתח ברוקר לאקדמיה?",
      choicesHe: ["כן", "לא — סימולציה בלבד", "רק בסופי שבוע", "רק ל־short"],
      correctIndex: 1,
      explanationHe: "אין חיבור ברוקר; המוצר לימודי בלבד.",
    },
  ],
  chapterSummaryHe: [
    "PnL long ומונחי margin/notional/collateral/liquidation מובחנים בבירור.",
    "השיטה המאושרת היא long בלבד על סימולציה ללא ברוקר.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
