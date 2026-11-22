import type { ChapterBodyInput } from "../schemas";

export const chapter08Body = {
  slug: "profit-realization",
  learningObjectivesHe: [
    "להכיר את טיוטת מימוש הרווח של 75% בשיטת ZigZag.",
    "להבחין בין משיכת רווח פתוח לבין סגירת 75% מהכמות.",
    "לתרגל דוגמה מספרית תוך סימון אי־הוודאות הקנונית.",
  ],
  sections: [
    {
      id: "seventy-five",
      titleHe: "טיוטת 75%",
      blocks: [
        {
          type: "paragraph",
          textHe:
            "התכנית מציעה `profit realization` של 75%. עד לאישור בעלים יש שתי פרשנויות עיקריות שאינן זהות תפעולית.",
        },
        {
          type: "visual",
          kind: "profit-split",
          captionHe: "75% ממומשים בתרגיל · 25% נשארים — הפרשנות הקנונית ממתינה.",
        },
        {
          type: "table",
          id: "interpretations",
          captionHe: "שתי פרשנויות למימוש 75% (טיוטה)",
          headersHe: ["פרשנות", "פעולה לימודית", "מה משתנה"],
          rows: [
            [
              "Withdraw profit",
              "מושכים 75% מה־`open profit`",
              "הכמות עשויה להישאר; הרווח הממומש עולה",
            ],
            [
              "Close 75% of position",
              "סוגרים 75% מהכמות",
              "Q יורד; E_avg של הנותרת נשמר בפישוט",
            ],
          ],
          awaitingConfirmation: true,
        },
        {
          type: "callout",
          tone: "awaiting",
          titleHe: "אין פרשנות קנונית עדיין",
          textHe:
            "מלמדים את שתי האפשרויות ומסמנים כל תרגיל באיזו פרשנות השתמשתם. אין לבחור בשקט פרשנות ולהציג אותה כשיטה הסופית.",
        },
      ],
    },
    {
      id: "formulas-draft",
      titleHe: "נוסחאות לימודיות לשתי הפרשנויות",
      blocks: [
        {
          type: "formula",
          id: "withdraw-profit",
          latex: "R_{\\text{withdraw}} = 0.75 \\times \\max(\\mathrm{PnL}_{\\text{open}}, 0)",
          captionHe: "פרשנות A: משיכת 75% מהרווח הפתוח החיובי (טיוטה)",
          awaitingConfirmation: true,
        },
        {
          type: "formula",
          id: "close-qty",
          latex: "q_{\\text{close}} = 0.75 \\times Q,\\quad q_{\\text{remain}} = 0.25 \\times Q",
          captionHe: "פרשנות B: סגירת 75% מהכמות (טיוטה)",
          awaitingConfirmation: true,
        },
        {
          type: "paragraph",
          textHe:
            "בפרשנות B, ה־`realized PnL` על החלק שנסגר מחושב מול E_avg (בפישוט). בפרשנות A יש להגדיר כיצד המשיכה משפיעה על בסיס ההון המוקצה — וזה חלק מהאישור החסר.",
        },
      ],
    },
    {
      id: "discipline",
      titleHe: "משמעת אחרי מימוש",
      blocks: [
        {
          type: "list",
          itemsHe: [
            "מתעדים איזו פרשנות הורצה.",
            "לא ממירים מימוש לימודי ל'הוכחת תשואה'.",
            "בודקים את מצב ה־25% הנותרים: סיכון, מינוף, ויעד תרגיל.",
          ],
        },
      ],
    },
  ],
  workedExamples: [
    {
      id: "ex-realize",
      titleHe: "השוואת שתי פרשנויות על אותו מצב",
      setupHe:
        "Q=100, E_avg=90, M=110 → PnL פתוח = 2000 לפני מימוש.",
      stepsHe: [
        "פרשנות A: R=0.75×2000=1500 ממומשים כ'משיכת רווח'; הכמות נשארת 100 לפי פישוט התרגיל.",
        "פרשנות B: סוגרים 75 יח' → realized ≈ 75×(110−90)=1500; נותרות 25 יח'.",
        "מציינים במפורש שהמספרים דומים כאן אך מצב הפוזיציה אחרי המעשה שונה.",
      ],
      resultHe:
        "אותו אחוז נומינלי, שני מצבי המשך שונים — לכן נדרש אישור קנוני.",
      awaitingConfirmation: true,
    },
  ],
  scenarios: {
    success: [
      {
        id: "ok-label-interp",
        titleHe: "סימון פרשנות לפני ביצוע",
        narrativeHe:
          "הלומד כותב 'Interpretation B' ואז סוגר 75% כמות בסימולציה.",
        outcomeHe: "היומן ניתן לביקורת עקבית.",
        lessonHe: "שקיפות פרשנות חשובה כל עוד אין אישור סופי.",
      },
    ],
    failure: [
      {
        id: "fail-blend",
        titleHe: "ערבוב פרשנויות",
        narrativeHe:
          "לומד 'מושך רווח' וגם מקטין כמות ב־75% באותו צעד בלי הגדרה.",
        outcomeHe: "כפל פעולות וחוסר בהירות ב־PnL.",
        lessonHe: "עד לאישור — בחרו פרשנות אחת לתרגיל.",
      },
    ],
  },
  exercises: [
    {
      id: "ex1",
      promptHe:
        "ל־PnL פתוח 800, חשבו R לפי פרשנות A.",
    },
    {
      id: "ex2",
      promptHe:
        "ל־Q=80 לפי פרשנות B, מהן q_close ו־q_remain? חשבו realized אם E_avg=50 ו־M=60.",
    },
  ],
  knowledgeQuestions: [
    {
      id: "q1",
      promptHe: "מה אחוז מימוש הרווח המוצע בטיוטה?",
      choicesHe: ["25%", "50%", "75%", "100%"],
      correctIndex: 2,
      explanationHe: "הטיוטה מדברת על 75%.",
    },
    {
      id: "q2",
      promptHe: "Close 75% of position פירושו:",
      choicesHe: [
        "משיכת 75% מהרווח בלבד בלי שינוי כמות",
        "הקטנת הכמות ב־75%",
        "מינוף 75x",
        "סגירת האקדמיה",
      ],
      correctIndex: 1,
      explanationHe: "זו פרשנות B — סגירת חלק מהכמות.",
    },
    {
      id: "q3",
      promptHe: "האם פרשנות המימוש אושרה סופית?",
      choicesHe: ["כן", "לא — ממתינה לאישור בעלים", "רק ל־short", "רק ב־1x"],
      correctIndex: 1,
      explanationHe: "שתי הפרשנויות עדיין בטיוטה.",
    },
  ],
  awaitingNotesHe: [
    "אישור פרשנות קנונית: withdraw profit מול close 75% quantity.",
    "אישור השפעת משיכת רווח על בסיס ההון המוקצה והשכבות.",
  ],
} satisfies ChapterBodyInput;
