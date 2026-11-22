import type { ChapterBodyInput } from "../schemas";

export const chapter09Body = {
  slug: "multiple-concurrent-positions",
  learningObjectivesHe: [
    "להסביר מתי תרגיל ZigZag מנהל כמה `positions` במקביל.",
    "להפריד הקצאת הון ויומנים בין פוזיציות.",
    "לזהות סיכוני בלבול בין Path A (פוזיציה נפרדת) לבין שכבות באותה פוזיציה.",
  ],
  sections: [
    {
      id: "why-multi",
      titleHe: "למה בכלל כמה פוזיציות?",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "ריבוי פוזיציות עשוי להופיע כשבוחרים Path A במעבר ל־10x (פוזיציה ממונפת נפרדת), או כשמתרגלים כמה רעיונות סימולטיביים במקביל. בכל מקרה — כל פוזיציה היא ישות תיעוד נפרדת.",
        },
        {
          type: "visual",
          kind: "multi-position",
          captionHe: "כמה מעטפות סיכון לימודיות זו לצד זו — לא 'תיק קסם'.",
        },
        {
          type: "callout",
          tone: "awaiting",
          titleHe: "מגבלת מספר פוזיציות",
          textHe:
            "השיטה טרם מגדירה לימיט קנוני לכמה פוזיציות מקבילות מותרות. במעבדה נגביל בעצמנו (למשל עד 3) כמשמעת פדגוגית בלבד.",
        },
      ],
    },
    {
      id: "isolation",
      titleHe: "בידוד הקצאה וסיכון",
      blocks: [
        {
          type: "list",
          itemsHe: [
            " לכל פוזיציה: מזהה, כיוון, שכבות, E_avg, מינוף, C_cum.",
            "סכום ההקצאות ≤ ההון הלימודי הכולל שנבחר לתרגיל.",
            "אין להעביר PnL בין פוזיציות בלי צעד מתועד ומפורש.",
          ],
        },
        {
          type: "formula",
          id: "cap-sum",
          latex: "\\sum_{j=1}^{m} C^{(j)}_{\\text{cum}} \\le C_{\\text{total educational}}",
          captionHe: "מגבלת הקצאה מצטברת על פני m פוזיציות בתרגיל",
        },
        {
          type: "table",
          id: "multi-ledger",
          captionHe: "יומן מקביל לדוגמה",
          headersHe: ["Position ID", "Leverage", "C_cum", "E_avg", "סטטוס"],
          rows: [
            ["P1", "1x", "4,000", "89.1", "פתוחה"],
            ["P2-10x", "10x (Path A)", "1,000", "81.0", "פתוחה · טיוטה"],
            ["P3", "1x", "2,000", "105.0", "נסגרה בתרגיל"],
          ],
          awaitingConfirmation: true,
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
            "שכבת `reinforcement` על P1 אינה פוזיציה חדשה. פוזיציית 10x נפרדת (Path A) כן. ערבוב בין השניים הוא מקור טעויות נפוץ במעבדה.",
        },
        {
          type: "callout",
          tone: "warning",
          titleHe: "אין פיזור קסם",
          textHe:
            "ריבוי פוזיציות בסימולציה אינו 'גיוון' שמבטיח תוצאה. זה רק ריבוי ישויות סיכון ללימוד.",
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-multi-cap",
      titleHe: "בדיקת מגבלת הקצאה",
      setupHe: "C_total=10,000. P1 C_cum=5,000; P2 C_cum=3,500; מבקשים לפתוח P3 עם 2,000.",
      stepsHe: [
        "סכום נוכחי 8,500.",
        "P3 ב־2,000 יביא ל־10,500 > 10,000.",
        "התרגיל נדחה או מוקטן ל־1,500 כדי לעמוד במגבלה.",
      ],
      resultHe: "נשמרת מסגרת ההון הלימודי הכולל.",
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-ids",
        titleHe: "מזהים ייחודיים",
        narrativeHe:
          "הלומד מתייג Path A כ־P2-10x ונמנע מלערבב אותה עם שכבות P1.",
        outcomeHe: "חישובי ממוצע ומינוף נשארים נקיים.",
        lessonHe: "שמות טובים מונעים כשל מתודולוגי בתרגיל.",
      },
    ],
    failure: [
      {
        id: "fail-merge",
        titleHe: "מיזוג שגוי של יומנים",
        narrativeHe:
          "לומד מחשב E_avg אחד לשתי פוזיציות נפרדות.",
        outcomeHe: "PnL וסף 10x מאבדים משמעות.",
        lessonHe: "ממוצע כניסה הוא per-position.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "C_total=20,000 עם שלוש פוזיציות C_cum של 7k, 6k, 5k. האם מותר reinforcement של 3k על הראשונה?",
    },
    {
      id: "ex2",
      promptHe:
        "כתבו כללי תיוג לשמות פוזיציות שיבדילו שכבות מ־Path A.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "Reinforcement על פוזיציה קיימת הוא:",
      choicesHe: [
        "תמיד פוזיציה חדשה",
        "שכבה באותה פוזיציה — לא ישות חדשה",
        "סגירת כל החשיפות",
        "הפקדה לברוקר",
      ],
      correctIndex: 1,
      explanationHe: "חיזוק משנה שכבות בתוך אותה ישות תיעוד.",
    },
    {
      id: "q2",
      promptHe: "מגבלת מספר פוזיציות קנונית בשיטה:",
      choicesHe: [
        "תמיד 2",
        "טרם נקבעה — משתמשים בגבול פדגוגי זמני",
        "תמיד 100",
        "רק ב־short",
      ],
      correctIndex: 1,
      explanationHe: "אין לימיט קנוני מאושר עדיין.",
    },
    {
      id: "q3",
      promptHe: "סכום C_cum על פני פוזיציות צריך:",
      choicesHe: [
        "לעלות על ההון הלימודי תמיד",
        "לא לעבור את ההון הלימודי הכולל בתרגיל",
        "להיות אפס",
        "להתעלם מהון",
      ],
      correctIndex: 1,
      explanationHe: "שומרים על מסגרת ההון הלימודי.",
    },
  ],
  awaitingNotesHe: [
    "אישור לימיט קנוני למספר פוזיציות מקבילות.",
    "אישור כללי אינטראקציה בין Path A לבין פוזיציית הבסיס.",
  ],
} satisfies ChapterBodyInput;
