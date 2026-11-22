import { methodCatalogSchema, type MethodCatalog, type MethodCatalogInput, type MethodPage } from "../schemas";

const rawCatalog = {
  version: 1 as const,
  simulationOnly: true as const,
  pages: [
    {
      slug: "overview",
      titleHe: "סקירת מתודולוגיית ZigZag",
      titleEn: "ZigZag Method Overview",
      summaryHe:
        "מפת השיטה הלימודית: חיזוקים, מעברי 1x↔10x, ומימוש רווח — עם טיוטות ממתינות לאישור.",
      awaitingConfirmation: true,
      sections: [
        {
          id: "pillars",
          titleHe: "שלושת עמודי השיטה באקדמיה",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "מתודולוגיית ZigZag באקדמיה נלמדת כמערכת שכבות: בניית `position`, `reinforcement` בתגובה למהלך שלילי לימודי, ניהול מינוף 1x↔10x, ומימוש רווח לפי טיוטת 75%.",
            },
            {
              type: "table",
              id: "pillars-table",
              captionHe: "עמודים וקישורים",
              headersHe: ["עמוד", "מיקוד", "סטטוס"],
              rows: [
                ["Reinforcement", "שכבות הקצאה וסולם adverse", "טיוטה"],
                ["Leverage 1x↔10x", "סף ומסלולים לא־שקולים", "טיוטה"],
                ["Profit realization", "75% — שתי פרשנויות", "טיוטה"],
              ],
            },
            {
              type: "callout",
              tone: "sim",
              titleHe: "סימולציה בלבד",
              textHe:
                "דפי השיטה אינם אותות מסחר ואינם כוללים ביצועי עבר. כל מספר הוא לימודי.",
            },
          ],
        },
        {
          id: "defaults",
          titleHe: "ברירות מחדל מוצעות",
          blocks: [
            {
              type: "list",
              itemsHe: [
                "גודל חיזוק: cumulative allocated capital (ברירת מחדל מוצעת).",
                "סולם adverse: מרווחי 10% לימודיים.",
                "סף 10x: הפסד = 100% מהחיזוק האחרון.",
                "מימוש: 75% — פרשנות קנונית ממתינה.",
                "עמלות מוצעות: 2 bps round-trip; slippage 1 bp לצד; funding 0 בתרגול בסיסי.",
              ],
            },
            {
              type: "callout",
              tone: "awaiting",
              titleHe: "הכל עד אישור בעלים",
              textHe:
                "Phase 4 של המנוע חסום עד לאישורים. כאן מלמדים את המפה בלבד.",
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-map",
          titleHe: "ניווט לימודי בדפי השיטה",
          setupHe: "לומד חדש רוצה להבין את השיטה לפני הסימולטור.",
          stepsHe: [
            "קורא סקירה זו ורושם את חמש ברירות המחדל המוצעות.",
            "עובר לדף Reinforcement ופותר את שאלות הידע.",
            "עובר לדף Leverage ומתרגל הבחנת Path A/B.",
            "עובר לדף Profit ומסמן פרשנות לתרגיל עתידי.",
          ],
          resultHe: "מפה מנטלית של השיטה בלי להמציא כללים.",
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok-map",
            titleHe: "לימוד לפי מפה",
            narrativeHe: "הלומד מסיים את ארבעת דפי השיטה לפני מעבדה.",
            outcomeHe: "פחות בלבול בין שכבות למסלולי מינוף.",
            lessonHe: "שיטה נלמדת כמערכת, לא כטיפ בודד.",
          },
        ],
        failure: [
          {
            id: "fail-skip",
            titleHe: "דילוג ישר ל־10x",
            narrativeHe: "לומד קופץ למינוף בלי לקרוא חיזוק ומימוש.",
            outcomeHe: "שימוש חסר הקשר במספר 10.",
            lessonHe: "המינוף הוא רכיב — לא כל השיטה.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "כמה עמודי שיטה מרכזיים מפורטים אחרי הסקירה?",
          choicesHe: ["1", "2", "3", "12"],
          correctIndex: 2,
          explanationHe: "Reinforcement, Leverage, Profit realization.",
        },
        {
          id: "q2",
          promptHe: "האם ברירות המחדל בדף זה סופיות?",
          choicesHe: ["כן", "לא — ממתינות לאישור", "רק העמלות", "רק הסולם"],
          correctIndex: 1,
          explanationHe: "כולן טיוטה עד אישור בעלים.",
        },
      ],
      awaitingNotesHe: [
        "כל ברירות המחדל של Phase 4 עדיין ממתינות לאישור.",
      ],
    },
    {
      slug: "reinforcement",
      titleHe: "Reinforcement",
      titleEn: "Reinforcement Mechanics",
      summaryHe:
        "שכבות חיזוק, הון מוקצה מצטבר, וסולם מהלך שלילי לימודי — טיוטה לאישור.",
      awaitingConfirmation: true,
      sections: [
        {
          id: "def",
          titleHe: "הגדרה לימודית",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "`Reinforcement` מוסיף הקצאה לפוזיציה קיימת אחרי מהלך שלילי לימודי. ברירת המחדל המוצעת לגודל מבוססת על cumulative allocated capital — לא על יתרת ברוקר.",
            },
            {
              type: "visual",
              kind: "adverse-ladder",
              captionHe: "סולם 10% מוצע כסמן פדגוגי ל־adverse move.",
            },
            {
              type: "formula",
              id: "ladder",
              latex: "P_k = P_0 (1 - 0.10)^k",
              captionHe: "רמת מחיר k בטיוטת הסולם",
              awaitingConfirmation: true,
            },
          ],
        },
        {
          id: "sizing",
          titleHe: "מצבי גודל מוצעים",
          blocks: [
            {
              type: "table",
              id: "modes",
              captionHe: "מצבי גודל — לאישור",
              headersHe: ["מצב", "בסיס", "הערה"],
              rows: [
                [
                  "Cumulative allocated capital",
                  "סכום הקצאות מפורשות",
                  "ברירת מחדל מוצעת",
                ],
                [
                  "Position equity",
                  "שווי כולל PnL פתוח",
                  "חלופה שנדונה",
                ],
              ],
              awaitingConfirmation: true,
            },
            {
              type: "callout",
              tone: "awaiting",
              titleHe: "אין נוסחת C_{n+1} קנונית עדיין",
              textHe:
                "בתרגילים בוחרים C_i מפורש ומתעדים. אין להמציא כלל גודל חדש.",
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-r",
          titleHe: "יומן שלוש שכבות",
          setupHe: "P0=100; חיזוקים ב־90 ו־81 עם C=2000 כל אחד אחרי פתיחה 2000.",
          stepsHe: [
            "C_cum: 2k → 4k → 6k.",
            "כמויות בפישוט 1x: 20 @100; ≈22.22 @90; ≈24.69 @81 → Q≈66.91.",
            "מעדכנים E_avg בפרק 7.",
          ],
          resultHe: "יומן חיזוקים שקוף (C_cum=6,000; Q≈66.91) ומסומן כטיוטה.",
          awaitingConfirmation: true,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "חיזוק מתועד",
            narrativeHe: "כל שכבה עם מחיר, C_i ו־C_cum.",
            outcomeHe: "ניתן לביקורת.",
            lessonHe: "שקיפות לפני אישור קנוני.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "חיזוק בלי רמת סולם",
            narrativeHe: "מוסיפים הקצאה בלי לציין למה לפי השיטה.",
            outcomeHe: "איבוד עקביות פדגוגית.",
            lessonHe: "גם בטיוטה צריך עוגן לימודי.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "ברירת המחדל המוצעת לגודל היא:",
          choicesHe: [
            "Equity כולל PnL",
            "Cumulative allocated capital",
            "יתרת בנק",
            "מינוף קבוע",
          ],
          correctIndex: 1,
          explanationHe: "זו ברירת המחדל בטיוטת התכנית.",
        },
        {
          id: "q2",
          promptHe: "סולם ה־10% הוא:",
          choicesHe: [
            "Order book חי",
            "הצעה לימודית",
            "עמלת מימון",
            "מימוש רווח",
          ],
          correctIndex: 1,
          explanationHe: "סמן פדגוגי עד אישור.",
        },
      ],
      awaitingNotesHe: [
        "אישור מצב הגודל וסולם ה־adverse move.",
      ],
    },
    {
      slug: "leverage",
      titleHe: "מינוף 1x↔10x",
      titleEn: "Leverage 1x ↔ 10x",
      summaryHe:
        "סף מעבר מוצע, מקסימום 10x לימודי, ושני מסלולים שאינם שקולים.",
      awaitingConfirmation: true,
      sections: [
        {
          id: "threshold",
          titleHe: "סף ומינוף מרבי",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "טיוטה: דיון ב־10x כשההפסד הלימודי מגיע ל־100% מהחיזוק האחרון. המקסימום הלימודי המוצע הוא 10x.",
            },
            {
              type: "formula",
              id: "thr",
              latex:
                "|\\mathrm{PnL}| \\stackrel{?}{=} C_{\\text{latest reinforcement}}",
              captionHe: "תנאי סף מוצע",
              awaitingConfirmation: true,
            },
          ],
        },
        {
          id: "paths",
          titleHe: "Path A מול Path B",
          blocks: [
            {
              type: "visual",
              kind: "leverage-paths",
              captionHe: "Separate 10x ≠ re-lever in place",
            },
            {
              type: "list",
              itemsHe: [
                "Path A: פוזיציית 10x נפרדת.",
                "Path B: שינוי מינוף על הפוזיציה הקיימת.",
                "חובה לתייג מסלול בכל תרגיל.",
              ],
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-l",
          titleHe: "רגישות 1x מול 10x",
          setupHe: "C=1000; מהלך +1% על notional משוער.",
          stepsHe: [
            "1x ≈ +10 יח'.",
            "10x ≈ +100 יח'.",
            "מסיקים על סיכון — לא על תשואה מובטחת.",
          ],
          resultHe: "הבנת רגישות לפני בחירת מסלול.",
          awaitingConfirmation: true,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "תיוג Path A",
            narrativeHe: "נפתחת P2-10x עם יומן נפרד.",
            outcomeHe: "אין ערבוב עם שכבות P1.",
            lessonHe: "מסלול ברור = סיכון ברור.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "שקילות מדומה",
            narrativeHe: "מניחים ש־A ו־B זהים בחישוב.",
            outcomeHe: "שגיאת E_avg / סיכון.",
            lessonHe: "לא שקולים.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "מקסימום מינוף לימודי מוצע:",
          choicesHe: ["3x", "10x", "25x", "100x"],
          correctIndex: 1,
          explanationHe: "10x לפי הטיוטה.",
        },
        {
          id: "q2",
          promptHe: "Path B הוא:",
          choicesHe: [
            "פוזיציה נפרדת",
            "שינוי מינוף על קיימת",
            "סגירת הכל",
            "הפקדה",
          ],
          correctIndex: 1,
          explanationHe: "Re-lever in place.",
        },
      ],
      awaitingNotesHe: [
        "אישור סף, בסיס PnL, ומסלול קנוני.",
      ],
    },
    {
      slug: "profit-realization",
      titleHe: "מימוש רווח",
      titleEn: "Profit Realization",
      summaryHe:
        "טיוטת 75%: משיכת רווח פתוח מול סגירת 75% מהכמות — לאישור קנוני.",
      awaitingConfirmation: true,
      sections: [
        {
          id: "two-interp",
          titleHe: "שתי פרשנויות",
          blocks: [
            {
              type: "visual",
              kind: "profit-split",
              captionHe: "75% / 25% — המשמעות התפעולית עדיין פתוחה.",
            },
            {
              type: "table",
              id: "interp",
              captionHe: "השוואת פרשנויות",
              headersHe: ["פרשנות", "פעולה"],
              rows: [
                ["Withdraw profit", "75% מהרווח הפתוח החיובי"],
                ["Close 75% of position", "הקטנת כמות ב־75%"],
              ],
              awaitingConfirmation: true,
            },
            {
              type: "formula",
              id: "w",
              latex: "R = 0.75 \\times \\max(\\mathrm{PnL}_{open},0)",
              captionHe: "פרשנות משיכת רווח (טיוטה)",
              awaitingConfirmation: true,
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-p",
          titleHe: "אותו PnL, המשכים שונים",
          setupHe: "Q=100, E_avg=90, M=110, PnL=2000.",
          stepsHe: [
            "A: מושכים 1500 כרווח; כמות נשארת לפי פישוט.",
            "B: סוגרים 75 יח' → realized 1500; נותרות 25.",
            "מתעדים את הפער במצב הפוזיציה.",
          ],
          resultHe: "חובה לבחור פרשנות אחת לתרגיל עד אישור.",
          awaitingConfirmation: true,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "פרשנות מסומנת",
            narrativeHe: "היומן מתחיל ב־Interpretation B.",
            outcomeHe: "שחזור אפשרי.",
            lessonHe: "שקיפות מעל ודאות מדומה.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "ערבוב פרשנויות",
            narrativeHe: "מושכים רווח וסוגרים 75% יחד בלי הגדרה.",
            outcomeHe: "כפל פעולה.",
            lessonHe: "פרשנות אחת לתרגיל.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "אחוז המימוש המוצע:",
          choicesHe: ["50%", "75%", "90%", "100%"],
          correctIndex: 1,
          explanationHe: "75% בטיוטה.",
        },
        {
          id: "q2",
          promptHe: "האם הפרשנות הקנונית אושרה?",
          choicesHe: ["כן", "לא", "רק A", "רק B"],
          correctIndex: 1,
          explanationHe: "ממתינה לאישור בעלים.",
        },
      ],
      awaitingNotesHe: [
        "אישור פרשנות מימוש 75% והשפעתה על הון מוקצה.",
      ],
    },
  ],
} satisfies MethodCatalogInput;

export const methodCatalog: MethodCatalog =
  methodCatalogSchema.parse(rawCatalog);

export function listMethodPages(): MethodPage[] {
  return methodCatalog.pages;
}

export function getMethodPageBySlug(slug: string): MethodPage | undefined {
  return methodCatalog.pages.find((page) => page.slug === slug);
}
