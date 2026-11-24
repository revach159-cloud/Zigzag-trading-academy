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
        "מפת השיטה המאושרת: חיזוקים בסולם adverse, מעבר ×1↔×10 לפי תקרת הקצאה, ומימוש 75% בכמות — סימולציה בלבד.",
      awaitingConfirmation: false,
      sections: [
        {
          id: "pillars",
          titleHe: "שלושת עמודי השיטה באקדמיה",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "מתודולוגיית ZigZag באקדמיה נלמדת כמערכת שכבות על מודל Bybit Linear USDT Perp (Cross, One-Way, long בלבד): בניית `position`, `reinforcement` בתגובה למגע בסולם adverse, ניהול שלב ×1 ושלב ×10, ומימוש רווח בסגירת 75% מהכמות. החישובים בפדגוגיה מתייחסים ל־Decimal.js במנוע.",
            },
            {
              type: "table",
              id: "pillars-table",
              captionHe: "עמודים וקישורים",
              headersHe: ["עמוד", "מיקוד", "סטטוס"],
              rows: [
                ["Reinforcement", "הקצאת margin מצטברת, סולם 10% מ־P₀", "מאושר"],
                ["Leverage 1x↔10x", "מעבר תקציבי; ×10 לפי הפסד מצטבר", "מאושר"],
                ["Profit realization", "סגירה ידנית של 75% מהכמות", "מאושר"],
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
          titleHe: "כללים מאושרים (2026-11-24)",
          blocks: [
            {
              type: "list",
              itemsHe: [
                "גודל בשלב ×1: cumulative allocated capital על בסיס margin; תקרה $250 לפוזיציה — דחייה (Reject).",
                "סולם adverse: P_k = P₀×(1−0.10×k) ממחיר ייחוס מקורי; הפעלה במגע (Touch).",
                "מעבר ×1→×10: כשתקרת ההקצאה חוסמת חיזוק ×1 נוסף — שומרים כמות, עוברים שלב.",
                "שלב ×10: חיזוק כשההפסד הנקי ≥ ה-margin שהוקצה לרמת הרלוונטית; תקרה מצטברת $250.",
                "מימוש: סגירה ידנית של 75% מהכמות הפתוחה; 25% נשארים; חזרתי על הנותר.",
                "עמלות: 2 bps round-trip בסגירה; slippage 1 bp לצד; funding 0; epsilon 0.",
              ],
            },
            {
              type: "callout",
              tone: "note",
              titleHe: "מתודולוגיה מאושרת על ידי הבעלים",
              textHe:
                "כללי Phase 4 נלמדים כאן כשיטה קנונית. מקסימום מינוף לכל instrument נלמד רק מנתוני Bybit מאומתים — אחרת מסומן unresolved.",
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
            "קורא סקירה זו ורושם את חמשת הכללים המאושרים.",
            "עובר לדף Reinforcement ולומד סולם 100→90→80.",
            "עובר לדף Leverage ומבין מעבר תקציבי ×1→×10.",
            "עובר לדף Profit ומתרגל סגירת 75% מהכמות.",
          ],
          resultHe: "מפה מנטלית של השיטה המאושרת בלי להמציא כללים.",
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok-map",
            titleHe: "לימוד לפי מפה",
            narrativeHe: "הלומד מסיים את ארבעת דפי השיטה לפני מעבדה.",
            outcomeHe: "פחות בלבול בין שכבות לשלבי מינוף.",
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
          promptHe: "תקרת margin לפוזיציה בשלב ×1:",
          choicesHe: ["$100", "$250 עם מדיניות Reject", "ללא תקרה", "$10,000"],
          correctIndex: 1,
          explanationHe: "perPositionMarginCapUsd=250; capPolicy=reject.",
        },
      ],
      awaitingNotesHe: [],
    },
    {
      slug: "reinforcement",
      titleHe: "Reinforcement",
      titleEn: "Reinforcement Mechanics",
      summaryHe:
        "שכבות חיזוק על בסיס margin מצטבר, סולם 10% ממחיר ייחוס מקורי, והפעלה במגע.",
      awaitingConfirmation: false,
      sections: [
        {
          id: "def",
          titleHe: "הגדרה לימודית",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "`Reinforcement` מוסיף הקצאת margin (וכמות) לפוזיציה long קיימת לאחר מגע ברמת סולם adverse. החיזוק אופציונלי לכל רמה; רמות שדולגו נשארות מתועדות. גודל השכבה בשלב ×1 מבוסס על cumulative allocated capital — סכום ה-margin שהוקצה במפורש.",
            },
            {
              type: "visual",
              kind: "adverse-ladder",
              captionHe: "סולם 10% ממחיר ייחוס מקורי P₀ — לא מרכיב.",
            },
            {
              type: "formula",
              id: "ladder",
              latex: "P_k = P_0 \\times (1 - 0.10 \\times k)",
              captionHe: "רמת מחיר k בסולם (מרווח 10% מהייחוס המקורי)",
              awaitingConfirmation: false,
            },
            {
              type: "callout",
              tone: "definition",
              titleHe: "דוגמה מספרית",
              textHe: "P₀=100 → k=1 נותן 90; k=2 נותן 80 — לא 81 (אין הרכבה של 10%×10%).",
            },
          ],
        },
        {
          id: "sizing",
          titleHe: "גודל וכמות בשלב ×1",
          blocks: [
            {
              type: "formula",
              id: "qty-floor",
              latex: "q_i = \\lfloor C_i / P_{\\text{exec}} \\rfloor",
              captionHe: "כמות לאחר Floor על בסיס margin ביחס למחיר ביצוע (פישוט לימודי)",
              awaitingConfirmation: false,
            },
            {
              type: "table",
              id: "modes",
              captionHe: "מדיניות הקצאה ×1",
              headersHe: ["פרמטר", "ערך", "הערה"],
              rows: [
                ["בסיס", "margin (לא notional בלבד)", "allocationBasis=margin"],
                ["תקרה", "$250 לפוזיציה", "חריגה → Reject"],
                ["עיגול", "Floor", "tick לימודי: שמרני לכיוון adverse"],
              ],
              awaitingConfirmation: false,
            },
            {
              type: "callout",
              tone: "warning",
              titleHe: "הפרדה פדגוגית",
              textHe:
                "margin הוא ההקצאה לפוזיציה; notional הוא גודל החשיפה; collateral הוא בטוחה לחשבון Cross; liquidation אירוע נפרד — שינוי מינוף לא מבטיח משיכה או מניעת פירוק.",
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-r",
          titleHe: "יומן שלוש שכבות תחת תקרה",
          setupHe: "P₀=100; margin פתיחה $100; חיזוקים $80 ב־90 ו־$60 ב־80.",
          stepsHe: [
            "סולם: 100, 90, 80.",
            "C_cum: $100 → $180 → $240 (מתחת ל-$250).",
            "כמויות Floor: 1@100; 0@90 אם $80/90→0 או 1@90; 0@80 אם $60/80→0 — בתרגיל מגדילים margin לרמה אם צריך כמות>0.",
            "מעדכנים E_avg בפרק 7.",
          ],
          resultHe: "יומן חיזוקים שקוף תחת תקרת $250.",
          awaitingConfirmation: false,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "חיזוק מתועד",
            narrativeHe: "כל שכבה עם מחיר סולם, C_i ו־C_cum.",
            outcomeHe: "ניתן לביקורת.",
            lessonHe: "שקיפות לפני הרצת מנוע.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "חריגה מ-$250",
            narrativeHe: "מוסיפים margin שמביא C_cum ל-$260.",
            outcomeHe: "המערכת דוחה (Reject) את החיזוק.",
            lessonHe: "התקרה חלק מהשיטה המאושרת.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "נוסחת הסולם המאושרת:",
          choicesHe: [
            "P_k = P₀×(1−0.10)^k",
            "P_k = P₀×(1−0.10×k)",
            "P_k = P₀−10",
            "P_k = 0.9×P_{k−1}",
          ],
          correctIndex: 1,
          explanationHe: "מרווח 10% מהייחוס המקורי — לא מרכיב.",
        },
        {
          id: "q2",
          promptHe: "תקרת margin לפוזיציה בשלב ×1:",
          choicesHe: ["$250 Reject", "ללא תקרה", "$25", "רק ב־short"],
          correctIndex: 0,
          explanationHe: "perPositionMarginCapUsd=250.",
        },
      ],
      awaitingNotesHe: [],
    },
    {
      slug: "leverage",
      titleHe: "מינוף 1x↔10x",
      titleEn: "Leverage 1x ↔ 10x",
      summaryHe:
        "מעבר ×1→×10 לפי תקרת תקציב; שלב ×10 עם חיזוק לפי הפסד מצטבר ותקרת $250 מצטברת.",
      awaitingConfirmation: false,
      sections: [
        {
          id: "transition",
          titleHe: "מעבר שלב ×1 → שלב ×10",
          blocks: [
            {
              type: "paragraph",
              textHe:
                "כשחיזוק ×1 נוסף נדחה כי cumulative margin היה עובר את תקרת $250, השיטה עוברת לשלב ×10 על אותה פוזיציה תוך שמירת הכמות — לא פתיחת פוזיציה נפרדת. זה מעבר תקציבי, לא מבוסס על 'הפסד = 100% מהחיזוק האחרון' כתנאי יחיד.",
            },
            {
              type: "callout",
              tone: "note",
              titleHe: "שמירת כמות",
              textHe: "stage1ToStage10PreservesQuantity: אותה ישות פוזיציה, רגישות מינוף שונה.",
            },
          ],
        },
        {
          id: "stage10",
          titleHe: "חיזוקים בשלב ×10",
          blocks: [
            {
              type: "formula",
              id: "thr",
              latex:
                "\\mathrm{net\\,loss} \\ge C_{\\text{relevant margin}}",
              captionHe: "תנאי חיזוק ×10 מצטבר",
              awaitingConfirmation: false,
            },
            {
              type: "paragraph",
              textHe:
                "תקרת margin מצטברת בשלב ×10 היא $250. כשחיזוק ×10 הבא נדחה בגלל התקרה, המערכת עוברת אוטומטית למינוף מקסימלי של ה-instrument — רק אם המספר אומת מנתוני Bybit; אחרת מסומן unresolved ולא ממציאים ערך.",
            },
            {
              type: "callout",
              tone: "unresolved",
              titleHe: "מינוף מקסימלי לכל instrument",
              textHe:
                "maxInstrumentLeverage אינו גלובלי קבוע בספר לימוד עד אימות פר־symbol מ-Bybit.",
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-l",
          titleHe: "מעבר תקציבי",
          setupHe: "C_cum=$240 ב־×1; חיזוק $20 נדחה → מעבר ×10, Q נשמרת.",
          stepsHe: [
            "מתעדים דחיית חיזוק ×1.",
            "מסמנים מעבר שלב ללא פתיחת פוזיציה חדשה.",
            "ב־×10 ממתינים להפסד מצטבר ≥ margin הרלוונטי לחיזוק הבא.",
          ],
          resultHe: "מסלול מעבר אחד וברור — בלי Path A/B.",
          awaitingConfirmation: false,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "תיעוד מעבר שלב",
            narrativeHe: "ביומן: '×1 cap reject → ×10, Q=X'.",
            outcomeHe: "המשכיות ישות אחת.",
            lessonHe: "שלב אינו פוזיציה נפרדת.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "הנחת משיכת הון בטוחה",
            narrativeHe: "לומד חושב שמעבר ל-10x מבטיח שלא יגיע ל-liquidation.",
            outcomeHe: "הבנה שגויה של Cross ו-collateral.",
            lessonHe: "שינוי מינוף אינו ביטוח.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "מתי מתקיים מעבר ×1→×10 במתודולוגיה המאושרת?",
          choicesHe: [
            "בכל swing low",
            "כשחיזוק ×1 נדחה בתקרת תקציב margin",
            "כשיש רווח 75%",
            "תמיד בשעה הראשונה",
          ],
          correctIndex: 1,
          explanationHe: "stage1ToStage10Transition=budget_cap_based.",
        },
        {
          id: "q2",
          promptHe: "טריגר חיזוק בשלב ×10:",
          choicesHe: [
            "רווח ≥ 10%",
            "הפסד נקי מצטבר ≥ margin הרלוונטי",
            "סגירת 75%",
            "כל מגע בסולם",
          ],
          correctIndex: 1,
          explanationHe: "stage10ReinforcementTrigger=net_loss_ge_relevant_allocated_margin.",
        },
      ],
      awaitingNotesHe: [],
    },
    {
      slug: "profit-realization",
      titleHe: "מימוש רווח",
      titleEn: "Profit Realization",
      summaryHe:
        "סגירה ידנית של 75% מהכמות הפתוחה; 25% נשארים; חזרתי על הנותר.",
      awaitingConfirmation: false,
      sections: [
        {
          id: "close-qty",
          titleHe: "מימוש לפי כמות",
          blocks: [
            {
              type: "visual",
              kind: "profit-split",
              captionHe: "75% נסגרים · 25% נשארים בפוזיציה.",
            },
            {
              type: "formula",
              id: "close-qty",
              latex: "q_{\\text{close}} = 0.75 \\times Q,\\quad q_{\\text{remain}} = 0.25 \\times Q",
              captionHe: "סגירת 75% מהכמות הפתוחה (מימוש מאושר)",
              awaitingConfirmation: false,
            },
            {
              type: "list",
              itemsHe: [
                "הפעלה: ידנית (manual) בתרגיל או במנוע.",
                "ניתן לחזור על מימוש 75% מהכמות הנותרת.",
                "עמלות: 2 bps על סגירה (round-trip במודל הלימודי); slippage 1 bp לצד.",
              ],
            },
            {
              type: "callout",
              tone: "note",
              titleHe: "ללא 'משיכת רווח' נפרדת",
              textHe:
                "הפרשנות הקנונית היא close_quantity_pct בלבד — לא משיכת 75% מ־open PnL בלי שינוי כמות.",
            },
          ],
        },
      ],
      workedExamples: [
        {
          id: "ex-p",
          titleHe: "מימוש ראשון וחוזר",
          setupHe: "Q=40, E_avg=90, M=110.",
          stepsHe: [
            "PnL פתוח = 40×(110−90)=800 (לפני עמלות).",
            "סוגרים 75% → q_close=30, q_remain=10.",
            "Realized על 30 יח' ≈ 30×20=600; ניכוי עמלה לפי 2 bps בסגירה.",
            "במימוש שני על הנותר: q_close₂=0.75×10≈7 (Floor לפי מנוע).",
          ],
          resultHe: "רצף מימוש כמותי מתועד.",
          awaitingConfirmation: false,
        },
      ],
      scenarios: {
        success: [
          {
            id: "ok",
            titleHe: "יומן מימוש מסודר",
            narrativeHe: "כל מימוש מציין Q לפני/אחרי ועמלות.",
            outcomeHe: "שחזור אפשרי.",
            lessonHe: "מימוש הוא פעולת כמות.",
          },
        ],
        failure: [
          {
            id: "fail",
            titleHe: "משיכת רווח בלי סגירה",
            narrativeHe: "מציגים 'מימוש 75%' אך לא מקטינים כמות.",
            outcomeHe: "סתירה למתודולוגיה המאושרת.",
            lessonHe: "profitRealization.mode=close_quantity_pct.",
          },
        ],
      },
      knowledgeQuestions: [
        {
          id: "q1",
          promptHe: "אחוז המימוש המאושר:",
          choicesHe: ["50%", "75%", "90%", "100%"],
          correctIndex: 1,
          explanationHe: "profitRealization.pct=75.",
        },
        {
          id: "q2",
          promptHe: "מה קורה ל־25% הנותרים?",
          choicesHe: [
            "נסגרים אוטומטית",
            "נשארים בפוזיציה; מימוש חוזר אפשרי",
            "הופכים ל-short",
            "הופכים ל-funding",
          ],
          correctIndex: 1,
          explanationHe: "remainingPct=25; repeatableOnRemaining=true.",
        },
      ],
      awaitingNotesHe: [],
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