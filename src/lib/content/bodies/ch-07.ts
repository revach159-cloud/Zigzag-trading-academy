import type { ChapterBodyInput } from "../schemas";

export const chapter07Body = {
  slug: "average-entry-price",
  learningObjectivesHe: [
    "לחשב `average entry` משוקלל כמות אחרי מספר מילויים.",
    "לקשר בין ממוצע כניסה לבין `PnL` פתוח בסימולציה.",
    "להסביר למה ממוצע כניסה אינו מדד ביצועי עבר.",
  ],
  sections: [
    {
      id: "vwap-edu",
      titleHe: "ממוצע משוקלל לימודי",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "כשיש כמה שכבות כניסה/חיזוק במחירים שונים, מחיר הכניסה הממוצע (`average entry`) הוא ממוצע משוקלל לפי כמות — לא ממוצע חשבוני פשוט של המחירים.",
        },
        {
          type: "formula",
          id: "avg-entry",
          latex: "E_{\\text{avg}} = \\frac{\\sum_i (q_i \\times E_i)}{\\sum_i q_i}",
          captionHe: "מחיר כניסה ממוצע משוקלל כמות",
        },
        {
          type: "visual",
          kind: "avg-entry",
          captionHe: "מילויים נפרדים מתכנסים לממוצע משוקלל אחד לתרגיל.",
        },
      ],
    },
    {
      id: "pnl-from-avg",
      titleHe: "PnL מממוצע הכניסה",
      blocks: [
        {
          type: "formula",
          id: "pnl-avg",
          latex: "\\mathrm{PnL} = Q \\times (M - E_{\\text{avg}})",
          captionHe: "PnL לימודי ל־long לפי כמות כוללת וממוצע כניסה",
        },
        {
          type: "paragraph",
          textHe:
            "אפשר גם לסכום PnL של כל שכבה בנפרד — התוצאה שקולה אם אין עמלות. עמלות מאושרות: 2 bps round-trip בסגירה, slippage 1 bp לצד; funding 0.",
        },
        {
          type: "table",
          id: "avg-work",
          captionHe: "דוגמת שכבות לחישוב ממוצע",
          headersHe: ["שכבה", "כמות q", "מחיר E", "q×E"],
          rows: [
            ["0", "40", "100", "4,000"],
            ["1", "50", "90", "4,500"],
            ["2", "60", "80", "4,800"],
            ["סה״כ", "150", "—", "13,300"],
          ],
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "חישוב סטנדרטי",
          textHe:
            "נוסחת הממוצע המשוקלל היא מתמטיקה כללית. שכבות נוצרות לפי סולם 100→90→80 והקצאת margin המאושרת.",
        },
      ],
    },
    {
      id: "pitfalls",
      titleHe: "מלכודות נפוצות",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "ממוצע חשבוני של מחירים בלי משקל כמות — שגוי.",
            "שכחת עדכון E_avg אחרי חיזוק — PnL פתוח ייחשב לא נכון.",
            "הצגת שיפור ב־E_avg כ'הוכחת אסטרטגיה' — אסור; זו סימולציה.",
          ],
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-avg",
      titleHe: "חישוב E_avg מהטבלה",
      setupHe: "השתמשו בטבלת שלוש השכבות שבפרק (סה״כ q=150, ΣqE=13300).",
      stepsHe: [
        "E_avg = 13300 / 150 ≈ 88.667.",
        "אם M=95: PnL = 150 × (95 − 88.667) ≈ 950.",
        "אם M=85: PnL = 150 × (85 − 88.667) ≈ −550.",
      ],
      resultHe: "ממוצע ≈ 88.67; PnL תלוי במחיר הסימולציה הנוכחי בלבד.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-recalc",
        titleHe: "עדכון ממוצע אחרי כל שכבה",
        narrativeHe:
          "הלומד מחשב מחדש E_avg בכל reinforcement ושומר ביומן.",
        outcomeHe: "PnL פתוח תמיד עקבי עם השכבות.",
        lessonHe: "ממוצע כניסה הוא נגזרת של היומן — לא ניחוש.",
      },
    ],
    failure: [
      {
        id: "fail-simple-avg",
        titleHe: "ממוצע פשוט של מחירים",
        narrativeHe:
          "לומד מחשב (100+90+80)/3≈90 במקום ממוצע משוקלל.",
        outcomeHe: "סטייה ב־PnL ובקבלת החלטות בתרגיל.",
        lessonHe: "בלי משקולות כמות הממוצע מטעה.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "חשבו E_avg למילויים: 20@110, 30@100, 10@95.",
    },
    {
      id: "ex2",
      promptHe:
        "בהינתן E_avg=92 ו־Q=200, מצאו M כך ש־PnL הלימודי יהיה 0.",
      hintHe: "ב־long, PnL=0 כאשר M=E_avg.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "E_avg מחושב כ:",
      choicesHe: [
        "ממוצע פשוט של מחירי השכבות",
        "סכום (q×E) חלקי סכום הכמויות",
        "המחיר האחרון בלבד",
        "מינוף כפול העמלה",
      ],
      correctIndex: 1,
      explanationHe: "זהו ממוצע משוקלל כמות.",
    },
    {
      id: "q2",
      promptHe: "שיפור ב־E_avg בסימולציה מוכיח ביצועי עבר?",
      choicesHe: ["כן", "לא", "רק ב־10x", "רק אחרי פרק 12"],
      correctIndex: 1,
      explanationHe: "אסור להציג דוגמאות לימודיות כביצועים.",
    },
    {
      id: "q3",
      promptHe: "ל־long, מתי PnL=0 לפי E_avg?",
      choicesHe: [
        "כש־M > E_avg",
        "כש־M = E_avg",
        "כש־M < E_avg",
        "תמיד אחרי חיזוק",
      ],
      correctIndex: 1,
      explanationHe: "בנקודת האיזון M שווה לממוצע הכניסה (בלי עמלות).",
    },
  ],
  chapterSummaryHe: [
    "E_avg הוא ממוצע משוקלל כמות אחרי חיזוקים בסולם 100/90/80.",
    "עמלות 2 bps בסגירה מחוברות בתרגילים מתקדמים.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;
