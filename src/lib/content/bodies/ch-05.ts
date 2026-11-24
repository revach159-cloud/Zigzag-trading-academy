import type { ChapterBodyInput } from "../schemas";

export const chapter05Body = {
  slug: "reinforcement-mechanism",
  learningObjectivesHe: [
    "להסביר `reinforcement` כהוספת margin לאחר מגע בסולם adverse.",
    "ליישם P_k = P₀×(1−0.10×k) ולדוגמה 100→90→80.",
    "לתעד cumulative allocated capital ותקרת $250.",
  ],
  sections: [
    {
      id: "what-is-reinforcement",
      titleHe: "מהו Reinforcement?",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "`Reinforcement` מוסיף margin וכמות long לפוזיציה קיימת. ההפעלה במגע (Touch) ברמת סולם. חיזוק אופציונלי לרמה; רמות שדולגו נשארות ברישום.",
        },
        {
          type: "callout",
          tone: "note",
          titleHe: "גודל מאושר",
          textHe:
            "בשלב ×1: cumulative allocated capital על בסיס margin — סכום ההקצאות המפורשות עד כה.",
        },
      ],
    },
    {
      id: "adverse-context",
      titleHe: "סולם adverse",
      blocks: [
        {
          type: "visual",
          kind: "adverse-ladder",
          captionHe: "סולם 10% ממחיר ייחוס מקורי P₀.",
        },
        {
          type: "formula",
          id: "ladder-price",
          latex: "P_k = P_0 \\times (1 - 0.10 \\times k)",
          captionHe: "מחיר רמה k — מרווח מהייחוס המקורי",
          awaitingConfirmation: false,
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "לא מרכיב",
          textHe: "מ־100: k=1→90, k=2→80. לא 81 (זה היה (1−0.10)²).",
        },
      ],
    },
    {
      id: "sizing",
      titleHe: "חישוב margin וכמות",
      blocks: [
        {
          type: "formula",
          id: "cum-alloc",
          latex: "C_{\\text{cum}} = \\sum_{i=0}^{n} C_i",
          captionHe: "margin מצטבר אחרי n שכבות",
          awaitingConfirmation: false,
        },
        {
          type: "formula",
          id: "qty-i",
          latex: "q_i = \\lfloor C_i / P_{\\text{exec}} \\rfloor",
          captionHe: "כמות שכבה i",
          awaitingConfirmation: false,
        },
        {
          type: "table",
          id: "reinforcement-log",
          captionHe: "יומן חיזוקים לדוגמה",
          headersHe: ["שכבה", "מחיר סולם", "margin C_i", "C_cum", "q (Floor)"],
          rows: [
            ["0 פתיחה", "100", "$100", "$100", "1"],
            ["1 חיזוק @90", "90", "$70", "$170", "0"],
            ["2 חיזוק @80", "80", "$80", "$250", "1"],
          ],
          awaitingConfirmation: false,
        },
        {
          type: "paragraph",
          textHe:
            "בשכבה 1, floor(70/90)=0 — בתרגיל פדגוגי מעלים margin או מסבירים דחייה. בשכבה 2, margin $80 נותן q=1; C_cum מגיע בדיוק ל-$250.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-reinf",
      titleHe: "שני מגעים עד התקרה",
      setupHe:
        "P₀=100; margin פתיחה $100 (q=1); חיזוק $100 ב־90 (q=1); חיזוק $50 ב־80 דחוי — C_cum היה $250 כבר.",
      stepsHe: [
        "סולם: 100, 90, 80.",
        "אחרי פתיחה וחיזוק ב־90: C_cum=$200, Q=2.",
        "חיזוק נוסף $50 מביא ל-$250 — אחר כך Reject; מתכוננים למעבר ×10 בפרק 6.",
        "מעדכנים E_avg בפרק 7.",
      ],
      resultHe: "יומן reinforcement עד תקרת $250.",
      awaitingConfirmation: false,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-journal",
        titleHe: "חיזוק עם תיעוד מלא",
        narrativeHe:
          "כל שכבה: מגע סולם, C_i, C_cum, q ב-Floor.",
        outcomeHe: "ביקורת וחישוב ממוצע.",
        lessonHe: "Reinforcement בלי יומן הוא ניחוש.",
      },
    ],
    failure: [
      {
        id: "fail-compound",
        titleHe: "סולם מרכיב שגוי",
        narrativeHe:
          "משתמשים ב־80→72 כרמה 2 במקום 80.",
        outcomeHe: "סטייה מהמתודולוגיה המאושרת.",
        lessonHe: "הנוסחה לינארית ב-k מהייחוס המקורי.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "P₀=50: חשבו P₁ ו־P₂. תעדו margin $40 לכל שכבה אם מגע.",
    },
    {
      id: "ex2",
      promptHe:
        "הסבירו מה קורה כש-C_cum+$20 היה עובר $250.",
      hintHe: "capPolicy=reject.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "P₂ כש־P₀=100:",
      choicesHe: ["81", "80", "90", "100"],
      correctIndex: 1,
      explanationHe: "100×(1−0.20)=80.",
    },
    {
      id: "q2",
      promptHe: "הפעלת חיזוק על הסולם:",
      choicesHe: ["במגע (Touch)", "רק בסגירת נר", "אוטומטי בכל דקה", "רק ב-short"],
      correctIndex: 0,
      explanationHe: "ladderActivation=touch.",
    },
    {
      id: "q3",
      promptHe: "בסיס גודל בשלב ×1:",
      choicesHe: [
        "cumulative allocated margin",
        "יתרת בנק",
        "funding בלבד",
        "short equity",
      ],
      correctIndex: 0,
      explanationHe: "reinforcementSizingMode=cumulative_allocated_capital.",
    },
  ],
  chapterSummaryHe: [
    "סולם 100→90→80 ממחיר מקורי; חיזוק במגע עם margin מצטבר.",
    "תקרת $250 וכמות Floor הם חלק מהפרוטוקול המאושר.",
  ],
  awaitingNotesHe: [],
} satisfies ChapterBodyInput;