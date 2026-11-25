import type { ChapterBodyInput } from "../schemas";

export const chapter13Body = {
  slug: "clear-disclaimer",
  openingStoryHe:
    "בסוף המסע עומדים מול שער יציאה מואר. על המשקוף חרוטה הצהרה שאי אפשר לפספס: כל מה שעברתם היה לימוד. לא הבטחה. לא חשבון. לא קיצור דרך לכסף קל.",
  principleHe:
    "סימולציה וחינוך בלבד — בלי סיכון אפס, בלי תשואה מובטחת, בלי מסחר אמיתי.",
  memorableInsightHe:
    "הגבול הברור הוא חלק מהיופי של המסע: הוא שומר עליכם מפני אשליה.",
  learningObjectivesHe: [
    "לנסח את גבולות האקדמיה בבהירות.",
    "לדחות טענות סיכון־אפס או ביצועי עבר.",
    "לסיים את המסע עם מצפן — לא עם הבטחה.",
  ],
  sections: [
    {
      id: "opening",
      titleHe: "הצהרה ברורה",
      role: "opening" as const,
      blocks: [
        {
          type: "callout",
          tone: "warning",
          titleHe: "לא ייעוץ השקעות · לא מסחר אמיתי",
          textHe:
            "ZIGZAG TRADING ACADEMY וספר LOOKBACK הם מוצר לימודי לסימולציה בלבד. אין הפקדות, אין תיווך, אין ניהול תיקים, ואין הבטחת רווח או מניעת הפסד.",
        },
        {
          type: "paragraph",
          textHe:
            "הדוגמאות המספריות — כולל דפוסי חיזוק, מקרה XRP כתרגיל, וסדרות 75% — הן כלים חינוכיים. הן אינן ביצועי עבר ואינן תחזית.",
        },
      ],
    },
    {
      id: "risk",
      titleHe: "שלמות סיכון",
      role: "principle" as const,
      blocks: [
        {
          type: "list",
          itemsHe: [
            "אין טענת סיכון אפס — בשום צבע רמזור.",
            "שינוי מינוף אינו מבטיח משיכת הון או חסימת liquidation.",
            "יש להבחין תמיד בין margin, notional, quantity, avg, PnL, collateral ו־liquidation.",
            "Cross margin, עמלות, סליפג', מימון ופערים הם חלק מהמודל הלימודי.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "מודל ייחוס",
          textHe:
            "הפדגוגיה מתייחסת ל־Bybit Linear USDT Perpetual, Cross, One-Way. פרמטרי instrument לא מאומתים מסומנים unresolved — ולא מומצאים.",
        },
      ],
    },
    {
      id: "what-remains",
      titleHe: "מה כן נשאר בידיים",
      role: "general" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "נשארת שפת מסלול: מבט לאחור, השבחה תחת תקרה, רמזור ניהול, מימוש 75%, חזרה לאיזון, ואומץ לעצור. זה המצפן. לא המפה לכסף קל.",
        },
        {
          type: "visual",
          kind: "lookback-path",
          captionHe: "סיום המסע: אותן תחנות — עם גבול מואר ביציאה.",
        },
      ],
    },
    {
      id: "psychology",
      titleHe: "הערה פסיכולוגית אחרונה",
      role: "psychology" as const,
      blocks: [
        {
          type: "paragraph",
          textHe:
            "אם אחרי הספר אתם מרגישים דחף 'לנסות על אמיתי מיד' — זה בדיוק הרגע לחזור להצהרה הזו. Lookback מתחיל בעצירה מול אשליה.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-boundary",
      titleHe: "בדיקת גבול אישית",
      setupHe: "חבר שואל: 'אז השיטה בטוחה?'",
      stepsHe: [
        "עונים: זו סימולציה לימודית — לא ביטוח.",
        "מזכירים תקרת $250 ו־Reject כמשמעת, לא כהבטחה.",
        "מפנים להצהרה ולמילון ההפרדות.",
      ],
      resultHe: "הגבול נשמר גם בשיחה חברתית.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-boundary",
        titleHe: "סיום עם מצפן",
        narrativeHe: "הלומד מסיים את המסע ומוריד את ה־PDF בלי להבטיח לעצמו תשואה.",
        outcomeHe: "הלמידה נשארת נקייה.",
        lessonHe: "גבול ברור הוא הצלחה.",
      },
    ],
    failure: [
      {
        id: "fail-guarantee",
        titleHe: "הבטחה בשם הספר",
        narrativeHe: "מישהו מצטט את Lookback כ'שיטה בלי סיכון'.",
        outcomeHe: "זו עיוות של המסע.",
        lessonHe: "כל הבטחה כזו מנוגדת להצהרה.",
      },
    ],
  },
  reflections: [
    {
      id: "r1",
      promptHe: "נסחו ב־3 משפטים את גבול האקדמיה שתשמרו לעצמכם.",
    },
    {
      id: "r2",
      promptHe: "מה המצפן שאתם לוקחים מהמסע — בלי מספר תשואה?",
    },
  ],
  chapterSummaryHe: [
    "הצהרה ברורה: לימוד וסימולציה בלבד — בלי הבטחות.",
    "מה שנשאר הוא מצפן משמעת, לא קיצור דרך לכסף.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
