import { z } from "zod";

export const glossaryEntrySchema = z.object({
  id: z.string().min(1),
  termHe: z.string().min(1),
  termEn: z.string().min(1),
  definitionHe: z.string().min(1),
});

export const glossarySchema = z.object({
  version: z.literal(1),
  simulationOnly: z.literal(true),
  entries: z.array(glossaryEntrySchema).min(12),
});

export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;
export type Glossary = z.infer<typeof glossarySchema>;

const rawGlossary = {
  version: 1 as const,
  simulationOnly: true as const,
  entries: [
    {
      id: "lookback",
      termHe: "מבט לאחור",
      termEn: "Lookback",
      definitionHe:
        "פילוסופיית LOOKBACK: לקרוא תנועה שכבר קרתה ולהכין תוכנית ניהול — לא לרדוף אחרי האופק. אינה אות כניסה ואינה הבטחת תשואה.",
    },
    {
      id: "trade-improvement",
      termHe: "השבחת העסקה",
      termEn: "Trade improvement",
      definitionHe:
        "שיפור מדוד של פוזיציה באמצעות חיזוקים אופציונליים תחת תקרת מרג'ין — לא הגדלה רגשית חסרת גבול.",
    },
    {
      id: "trade-budget",
      termHe: "תקציב העסקה",
      termEn: "Trade budget",
      definitionHe:
        "מסגרת המרג'ין לפוזיציה לימודית (מצטברת עם חיזוקים) תחת תקרת $250 Reject. אינה זהה לנומינל ואינה הבטחת רווח.",
    },
    {
      id: "margin",
      termHe: "מרג'ין מוקצה",
      termEn: "Allocated margin",
      definitionHe:
        "הון שולי שהוגדר במפורש לפוזיציה בתרגיל במסגרת תקציב העסקה. אינו זהה ל־notional, לביטחונות פנויים בחשבון, או למחיר פירוק בבורסה.",
    },
    {
      id: "trade-size",
      termHe: "גודל העסקה",
      termEn: "Trade size",
      definitionHe:
        "הכמות / הנומינל שנוצרו מתוך תקציב העסקה והמינוף. עדיף על שימוש רופף ב«חשיפה» כשמדברים על גודל הפוזיציה.",
    },
    {
      id: "quantity",
      termHe: "כמות",
      termEn: "Quantity",
      definitionHe:
        "גודל הפוזיציה ביחידות. מימוש 75% משנה כמות; אינו זהה ל־PnL או לצבע רמזור.",
    },
    {
      id: "notional",
      termHe: "נומינל (Notional)",
      termEn: "Notional",
      definitionHe:
        "שווי רעיוני של גודל העסקה (למשל L × מרג'ין בקירוב לימודי). גדול מהמרג'ין כשיש מינוף — ואינו 'כסף בחשבון'.",
    },
    {
      id: "collateral",
      termHe: "ביטחונות פנויים",
      termEn: "Available collateral",
      definitionHe:
        "הון שולי זמין במודל הבורסה לכיסוי פוזיציות. באקדמיה מדובר בסימולציה בלבד — לא ביתרת בנק אמיתית.",
    },
    {
      id: "liquidation",
      termHe: "פירוק (Liquidation)",
      termEn: "Exchange liquidation",
      definitionHe:
        "מנגנון בורסה שסוגר פוזיציה כשהביטחונות אינם מספיקים. שינוי מינוף לימודי אינו מבטיח מניעת פירוק או משיכת הון.",
    },
    {
      id: "reinforcement",
      termHe: "חיזוק",
      termEn: "Reinforcement",
      definitionHe:
        "הוספת מרג'ין (וכמות) לפוזיציה קיימת אחרי מגע ברמת סולם adverse. אופציונלי לכל רמה; רמות שדולגו נשארות מתועדות.",
    },
    {
      id: "ladder",
      termHe: "סולם Adverse",
      termEn: "Adverse ladder",
      definitionHe:
        "רמות מחיר שליליות של 10% מ־מחיר הייחוס המקורי (P₀). הפעלה ב־Touch. חישוב ספי הסולם בדיוק Decimal — לא מעוגל.",
    },
    {
      id: "stage-x1",
      termHe: "שלב ×1",
      termEn: "×1 stage",
      definitionHe:
        "שלב מינוף לימודי 1x: גודל לפי מרג'ין מצטבר, תקרת מרג'ין $250 לפוזיציה עם מדיניות Reject, ומעבר ל־×10 לפי תקרת תקציב (לא לפי הפסד).",
    },
    {
      id: "stage-x10",
      termHe: "שלב ×10",
      termEn: "×10 stage",
      definitionHe:
        "שלב מינוף 10x על אותה כמות קיימת. חיזוק כאשר הפסד נטו ≥ המרג'ין הרלוונטי שהוקצה; תקרת מרג'ין מצטברת $250.",
    },
    {
      id: "max-leverage",
      termHe: "מינוף מכשיר מרבי",
      termEn: "Max instrument leverage",
      definitionHe:
        "המינוף המרבי של המכשיר ב־Bybit Linear USDT Perp. נלקח רק מנתוני מכשיר מאומתים — אם חסר, מסומן unresolved ולא מומצא.",
    },
    {
      id: "profit-75",
      termHe: "מימוש 75%",
      termEn: "75% profit realization",
      definitionHe:
        "סגירת 75% מהכמות הפתוחה (נותרות 25%). הפעלה ידנית; ניתן לחזור על 75% מהנותר בכל פעם. לא משיכת רווח בלי שינוי כמות.",
    },
    {
      id: "avg-entry",
      termHe: "מחיר כניסה ממוצע",
      termEn: "Average entry",
      definitionHe:
        "ממוצע משוקלל כמות של מחירי המילוי: E_avg = Σ(qᵢ Eᵢ) / Σ qᵢ.",
    },
    {
      id: "fees",
      termHe: "עלויות לימודיות",
      termEn: "Educational costs",
      definitionHe:
        "עמלת round-trip 2 bps (מודלת בסגירה), slippage 1 bp לצד, funding = 0 בסימולציות בסיסיות. סף epsilon = 0.",
    },
    {
      id: "long-only",
      termHe: "לונג בלבד",
      termEn: "Long-only",
      definitionHe:
        "השיטה המאושרת מאפשרת כיוון long בלבד. Short מנוטרל באקדמיה.",
    },
    {
      id: "reject-cap",
      termHe: "מדיניות Reject",
      termEn: "Reject cap policy",
      definitionHe:
        "אם חיזוק היה חורג מתקרת המרג'ין ($250), הבקשה נדחית. ב־×1 דחייה כזו מניעה מעבר תקציבי ל־×10; ב־×10 דחייה מניעה מעבר למינוף מכשיר מרבי (אם ידוע).",
    },
  ],
} satisfies Glossary;

export const glossary: Glossary = glossarySchema.parse(rawGlossary);

export function listGlossaryEntries(): GlossaryEntry[] {
  return glossary.entries;
}
