/**
 * ZigZag · LOOKBACK premium design tokens.
 * Deep black / silver / green-gold · glass depth · controlled cyan.
 * Avoid purple-SaaS / cream-serif / broadsheet clichés.
 */
export const brand = {
  name: "ZIGZAG",
  fullName: "ZIGZAG TRADING ACADEMY",
  bookTitleHe: "ZIGZAG · LOOKBACK",
  bookTitleEn: "LOOKBACK",
  methodHe: "השבחת העסקה",
  methodEn: "Trade Improvement",
  narrativeConceptHe: "המבט לאחור",
  narrativeConceptEn: "LOOKBACK",
  taglineEn: "Think differently. Manage differently. Trade differently.",
  taglineHe: "לחשוב אחרת. לנהל אחרת. לסחור אחרת.",
  /** Author credit — exact name only; no invented titles */
  authorHe: "אביאל רווח",
  authorBylineHe: "מאת אביאל רווח",
  authorCreditHe: "יוצר שיטת ZIGZAG · LOOKBACK",
  supportHe:
    "ספר דיגיטלי אינטראקטיבי למתודולוגיית ZigZag — השבחת העסקה, תקציב העסקה, מימוש 75% ומשמעת מינוף. סימולציה וחינוך בלבד.",
  ctaStartReadingHe: "התחלת הקריאה",
} as const;

export const colors = {
  void: "#02040A",
  abyss: "#05080F",
  midnight: "#0A1224",
  navy: "#0B1528",
  panel: "#101A2E",
  glass: "rgba(16, 26, 46, 0.55)",
  line: "rgba(168, 184, 208, 0.14)",
  silver: "#C5D0E0",
  silverDim: "#8FA0B8",
  cyan: "#2EE6FF",
  cyanBright: "#7AF0FF",
  cyanDim: "#1AA8C4",
  electric: "#3B82F6",
  gold: "#C9A84C",
  goldBright: "#E0C36A",
  goldSoft: "rgba(201, 168, 76, 0.18)",
  emerald: "#3DDC97",
  ink: "#E8EEF8",
  muted: "#8FA0B8",
  danger: "#F07178",
  trafficGreen: "#3DDC97",
  trafficYellow: "#F5C542",
  trafficRed: "#F07178",
} as const;

export const motion = {
  heroFadeMs: 900,
  ctaStaggerMs: 140,
  symbolSpinSec: 36,
  chapterTransitionMs: 420,
  coverEntranceMs: 1400,
  endVisualRevealMs: 520,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutSoft: [0.22, 1, 0.36, 1] as const,
} as const;

export const reading = {
  storageKey: "zz-lookback-reader-v3",
  measureRem: 38,
  progressLabelHe: "פרקים שנקראו",
} as const;
