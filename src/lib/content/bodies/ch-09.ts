import type { ChapterBodyInput } from "../schemas";

export const chapter09Body = {
  slug: "multiple-concurrent-positions",
  learningObjectivesHe: [
    "לנהל כמה פוזיציות long מקבילות כישויות נפרדות.",
    "להחיל תקרת $250 margin לכל פוזיציה.",
    "להבחין בין שכבות באותה פוזיציה לבין פוזיציה שנייה.",
  ],
  sections: [
    {
      id: "why-multi",
      titleHe: "כמה פוזיציות מקבילות",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "תרגילים מתקדמים עשויים לכלול כמה פוזיציות long במקביל — למשל על symbols שונים בסימולציה. כל פוזיציה עם יומן, C_cum ותקרת $250 משלה. מעבר ×10 אינו פתיחת פוזיציה נפרדת; הוא שלב על אותה ישות.",
        },
        {
          type: "visual",
          kind: "multi-position",
          captionHe: "מעטפות סיכון נפרדות — לא מיזוג יומנים.",
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "תקרה פר פוזיציה",
          textHe: "perPositionMarginCapUsd=250 לכל פוזיציה בנפרד בשלב ×1.",
        },
      ],
    },
    {
      id: "isolation",
      titleHe: "בידוד הקצאה",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "מזהה, שלב ×1/×10, margin מצטבר, E_avg, Q.",
            "אין שיתוף margin בין פוזיציות בלי צעד מפורש.",
            "collateral ב-Cross משותף בשוק אמיתי — כאן מדגישים הפרדה פדגוגית.",
          ],
        },
        {
          type: "formula",
          id: "cap-each",
          latex: "C^{(j)}_{\\text{cum}} \\leq 250",
          captionHe: "תקרת margin לפוזיציה j",
          awaitingConfirmation: false,
        },
        {
          type: "table",
          id: "multi-ledger",
          captionHe: "יומן מקביל לדוגמה",
          headersHe: ["ID", "שלב", "C_cum", "E_avg", "סטטוס"],
          rows: [
            ["P1", "×1", "$200", "92", "פתוחה"],
            ["P2", "×10", "$180", "85", "פתוחה"],
            ["P3", "×1", "$250", "110", "מוצה תקרה"],
          ],
          awaitingConfirmation: false,
        },
      ],
    },
    {
      id: "confusion-traps",
      titleHe: "מלכודות בלבול",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "חיזוק על P1 הוא שכבה ב-P1 — לא פוזיציה P1-10x נפרדת. היסטורית למדו Path A/B; בגרסה המאושרת שלב ×10 על אותה פוזיציה.",
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "אין פיזור קסם",
          textHe:
            "ריבוי פוזיציות בסימולציה לא מבטיח תוצאה — רק ריבוי תרגול.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-multi-cap",
      titleHe: "שתי פוזיציות",
      setupHe: "P1 C_cum=$200; P2 C_cum=$150; שתיהן long.",
      stepsHe: [
        "חיזוק $60 על P1 → $260 → Reject.",
        "חיזוק $80 על P2 → $230 — תקין.",
        "כל פוזיציה עם E_avg נפרד.",
      ],
      resultHe: "שתי תקרות נפרדות.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-ids",
        titleHe: "מזהים ברורים",
        narrativeHe:
          "P1-שלב×10 עדיין P1 ביומן.",
        outcomeHe: "חישובים נקיים.",
        lessonHe: "שלב אינו מזהה פוזיציה חדשה.",
      },
    ],
    failure: [
      {
        id: "fail-merge",
        titleHe: "E_avg משולב",
        narrativeHe:
          "מחברים שכבות משתי פוזיציות.",
        outcomeHe: "PnL שגוי.",
        lessonHe: "ממוצע per-position.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "P1=$240 margin, P2=$100. חיזוק $20 על P1 — מה קורה? על P2?",
    },
    {
      id: "ex2",
      promptHe: "כתבו כללי שמות ל-P1, P2 בלי Path A/B.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מעבר ×10 פירושו:",
      choicesHe: [
        "פוזיציה חדשה תמיד",
        "אותה פוזיציה, שלב שונה",
        "short",
        "ביטול תקרה",
      ],
      correctIndex: 1,
      explanationHe: "preserves quantity על אותה ישות.",
    },
    {
      id: "q2",
      promptHe: "תקרת $250:",
      choicesHe: [
        "לכל הפוזיציות ביחד בלבד",
        "לכל פוזיציה בנפרד",
        "רק בפרק 1",
        "רק ל-short",
      ],
      correctIndex: 1,
      explanationHe: "cap לכל פוזיציה בסימולציה מקבילה.",
    },
    {
      id: "q3",
      promptHe: "Reinforcement הוא:",
      choicesHe: [
        "שכבה באותה פוזיציה",
        "תמיד פוזיציה שנייה",
        "מימוש 75%",
        "funding",
      ],
      correctIndex: 0,
      explanationHe: "שכבות על אותה ישות תיעוד.",
    },
  ],
  chapterSummaryHe: [
    "פוזיציות מקבילות = יומנים נפרדים ותקרת $250 כל אחת.",
    "שלב ×10 נשאר על אותה פוזיציה — לא Path A נפרד.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;