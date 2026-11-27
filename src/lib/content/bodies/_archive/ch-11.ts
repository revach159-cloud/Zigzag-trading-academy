import type { ChapterBodyInput } from "../schemas";

export const chapter11Body = {
  slug: "simple-glossary",
  openingStoryHe:
    "לפני שסוגרים את המסע — עוצרים במילון. על הקיר שלטים קצרים. מי שמערבב ביניהם נכשל עוד לפני המספרים. מי שלומד להפריד — מדבר Lookback בבהירות, גם כשהרמזור צהוב.",
  principleHe:
    "כל מונח = משמעות אחת. Margin אינו notional; PnL אינו collateral; liquidation אינו 'צבע רמזור'.",
  memorableInsightHe:
    "שפה מדויקת היא חלק מניהול הסיכון.",
  learningObjectivesHe: [
    "להגדיר את מונחי הליבה בעברית פשוטה.",
    "להצביע על בלבולים נפוצים בין המונחים.",
    "לחבר כל מונח למסלול Lookback במקום אחד.",
  ],
  sections: [
    {
      id: "opening",
      titleHe: "למה מילון עכשיו?",
      role: "opening" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "אחרי המסע הנרטיבי מגיעה תחנת שפה קצרה. לא כדי לחזור למבחן — כדי לנעול משמעויות לפני המדריך המעשי וההצהרה.",
        },
      ],
    },
    {
      id: "terms",
      titleHe: "מונחי ליבה",
      role: "reference" as const,
      blocks: [
        {
          type: "table",
          id: "glossary-core",
          captionHe: "מילון פשוט — הפרדות חובה",
          headersHe: ["מונח", "במילים פשוטות", "אל תבלבלו עם"],
          rows: [
            [
              "`margin` מוקצה",
              "הון שולי שהוקצה לפוזיציה בתרגיל",
              "notional / יתרת בנק",
            ],
            [
              "`notional`",
              "חשיפה רעיונית (גדולה יותר עם מינוף)",
              "מרג'ין או 'כסף בכיס'",
            ],
            [
              "`quantity`",
              "גודל הפוזיציה ביחידות",
              "PnL או צבע רמזור",
            ],
            [
              "`average entry`",
              "מחיר כניסה ממוצע משוקלל כמות",
              "מחיר שוק נוכחי",
            ],
            [
              "`PnL`",
              "רווח/הפסד ממומש או לא ממומש",
              "collateral פנוי",
            ],
            [
              "`collateral`",
              "ביטחונות פנויים במודל הסימולציה",
              "רווח מובטח",
            ],
            [
              "`liquidation`",
              "סגירה כפויה במודל בורסה כשביטחונות לא מספיקים",
              "רמזור צהוב/אדום",
            ],
            [
              "Cross",
              "ביטחונות משותפים ברמת חשבון סימולטיבי",
              "ביטוח מפני פירוק",
            ],
          ],
        },
        {
          type: "callout",
          tone: "definition",
          titleHe: "75% / Lookback / השבחה",
          textHe:
            "75% = סגירת שלושה רבעים מהכמות הנותרת. Lookback = מבט לאחור על תנועה. השבחת העסקה = שיפור מדוד של פוזיציה תחת תקרה — לא הבטחת תשואה.",
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
            "במטבח לא קוראים למלח סוכר. בשיטה לא קוראים ל־notional בשם מרג'ין. אותו עיקרון.",
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
            "בלבול מונחים נוח לרגש: הוא מאפשר להגיד 'יש לי מקום' כשבעצם יש חשיפה רעיונית גדולה. דיוק לשוני הוא אנטי־הכחשה.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-term-split",
      titleHe: "הפרדת שלושה מספרים",
      setupHe:
        "בתרגיל: מרג'ין $100, מינוף לימודי ×10, מחיר ירד.",
      stepsHe: [
        "רושמים margin = 100.",
        "רושמים notional בקירוב לימודי כחשיפה רעיונית נפרדת.",
        "רושמים PnL לא ממומש כשורה שלישית — לא כ'יתרה למשיכה'.",
      ],
      resultHe: "שלושה מספרים, שלושה שמות — בלי ערבוב.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-terms",
        titleHe: "שפה נקייה",
        narrativeHe: "הלומד מתקן חבר שקרא ל־notional 'הכסף שלי'.",
        outcomeHe: "הדיון נשאר לימודי.",
        lessonHe: "דיוק הוא הגנה.",
      },
    ],
    failure: [
      {
        id: "fail-mix",
        titleHe: "ערבוב מסוכן",
        narrativeHe: "הלומד מתייחס ל־PnL לא ממומש כאל collateral פנוי.",
        outcomeHe: "נוצרת אשליית ביטחון.",
        lessonHe: "ערבוב מונחים = סיכון מוסתר.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "בחרו שני מונחים שבלבלתם בעבר — והפרידו אותם במשפט אחד כל אחד.",
    },
    {
      id: "r2",
      promptHe: "למה liquidation אינו זהה לרמזור אדום?",
    },
  ],
  chapterSummaryHe: [
    "מילון פשוט נועל משמעויות לפני המדריך המעשי.",
    "הפרדת margin / notional / quantity / avg / PnL / collateral / liquidation היא חובה.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
