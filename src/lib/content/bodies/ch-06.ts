import type { ChapterBodyInput } from "../schemas";

export const chapter06Body = {
  slug: "leverage-system",
  learningObjectivesHe: [
    "להבחין שלב ×1 מול שלב ×10 על אותה פוזיציה long.",
    "להסביר מעבר תקציבי כשחיזוק ×1 נדחה בתקרת $250.",
    "לתאר חיזוק ×10 לפי הפסד מצטבר ותקרה מצטברת $250.",
  ],
  sections: [
    {
      id: "leverage-edu",
      titleHe: "שלבי מינוף לימודיים",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "באקדמיה `leverage` מתאר רגישות פוזיציה long ב־Cross. שלב ×1 מצטבר margin עד $250. שלב ×10 ממשיך על אותה כמות (preserves quantity) — לא פוזיציה נפרדת.",
        },
        {
          type: "formula",
          id: "notional-lev",
          latex: "N \\approx L \\times C_{\\text{margin}}",
          captionHe: "קירוב לימודי: notional מול margin מוקצה",
          awaitingConfirmation: false,
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "לא מסחר חי",
          textHe:
            "אין כאן margin call אמיתי מ-Bybit. התרגיל מלמד רגישות — שינוי מינוף לא מבטיח משיכה או מניעת liquidation.",
        },
      ],
    },
    {
      id: "transition",
      titleHe: "מעבר ×1 → ×10",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "כשחיזוק ×1 נוסף נדחה כי cumulative margin היה חורג מ-$250, השיטה עוברת לשלב ×10 על אותה פוזיציה ושומרת כמות. זה מעבר budget_cap_based — לא מסלול 'Path A/B' ולא תנאי יחיד של הפסד 100% מהחיזוק האחרון.",
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "שמירת כמות",
          textHe: "stage1ToStage10PreservesQuantity=true.",
        },
      ],
    },
    {
      id: "stage10",
      titleHe: "חיזוקים בשלב ×10",
      blocks: [
        {
          type: "formula",
          id: "tenx-threshold",
          latex:
            "\\mathrm{net\\,loss} \\geq C_{\\text{relevant margin}}",
          captionHe: "טריגר חיזוק ×10 מצטבר",
          awaitingConfirmation: false,
        },
        {
          type: "paragraph",
          textHe:
            "תקרת margin מצטברת בשלב ×10: $250. אם חיזוק ×10 הבא נדחה, מעבר אוטומטי למינוף מקסימלי של ה-instrument — רק מנתוני Bybit מאומתים; אחרת unresolved.",
        },
        {
          type: "callout",
          tone: "unresolved",
          titleHe: "מינוף מקסימלי ל-instrument",
          textHe:
            "maxInstrumentLeverage לא מוגדר גלובלית בספר עד אימות פר־symbol.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-lev-sense",
      titleHe: "מעבר אחרי Reject",
      setupHe: "C_cum=$240 ב־×1; בקשה לחיזוק $20 → Reject; Q=3 נשמרת.",
      stepsHe: [
        "רושמים דחיית חיזוק ×1.",
        "מסמנים מעבר לשלב ×10 על אותה פוזיציה.",
        "מחשבים רגישות PnL: אותו Δמחיר, רגישות גבוהה יותר ב-×10.",
      ],
      resultHe: "מעבר שלב אחד וברור.",
      awaitingConfirmation: false,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-stage-label",
        titleHe: "תיוג שלב ביומן",
        narrativeHe:
          "הלומד כותב ×1 או ×10 ואת C_cum תחת כל שלב.",
        outcomeHe: "אין בלבול בין ישויות.",
        lessonHe: "שלב ≠ פוזיציה חדשה.",
      },
    ],
    failure: [
      {
        id: "fail-path-ab",
        titleHe: "פתיחת 'פוזיציית 10x נפרדת'",
        narrativeHe:
          "מלמדים Path A כקנון — נפתחת P2 נפרדת.",
        outcomeHe: "סתירה למתודולוגיה המאושרת.",
        lessonHe: "המעבר שומר כמות על אותה פוזיציה.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "הסבירו במשפט אחד ההבדל בין מעבר תקציבי לבין 'הפסד = 100% מהחיזוק האחרון'.",
    },
    {
      id: "ex2",
      promptHe:
        "C_cum=$248; חיזוק $5. מה קורה בשלב ×1? מה הצעד הבא בשיטה?",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מעבר ×1→×10 מאושר כאשר:",
      choicesHe: [
        "יש רווח 75%",
        "חיזוק ×1 נדחה בתקרת margin",
        "מגיע swing high",
        "תמיד אחרי 3 חיזוקים",
      ],
      correctIndex: 1,
      explanationHe: "stage1ToStage10Transition=budget_cap_based.",
    },
    {
      id: "q2",
      promptHe: "טריגר חיזוק בשלב ×10:",
      choicesHe: [
        "הפסד נקי ≥ margin הרלוונטי",
        "כל מגע ב-90",
        "סגירת 25%",
        "רק funding",
      ],
      correctIndex: 0,
      explanationHe: "stage10ReinforcementTrigger=net_loss_ge_relevant_allocated_margin.",
    },
    {
      id: "q3",
      promptHe: "במעבר שלב:",
      choicesHe: [
        "הכמות מתאפסת",
        "הכמות נשמרת",
        "חובה short",
        "חובה פוזיציה שנייה",
      ],
      correctIndex: 1,
      explanationHe: "stage1ToStage10PreservesQuantity=true.",
    },
  ],
  chapterSummaryHe: [
    "×1→×10 מבוסס תקרת margin; אותה פוזיציה long ושמירת כמות.",
    "×10 מחזק לפי הפסד מצטבר; מקסימום מינוף instrument — unresolved בלי נתוני Bybit.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;