/**
 * ZigZag Trading Academy · Lookback digital book design tokens.
 * Obsidian/midnight · cyan/electric blue · restrained gold · glass/depth.
 * Avoid purple-SaaS / cream-serif / broadsheet clichés.
 */
export const brand = {
  name: "ZIGZAG",
  fullName: "ZIGZAG TRADING ACADEMY",
  bookTitleHe: "LOOKBACK – המבט לאחור",
  bookTitleEn: "LOOKBACK",
  methodHe: "השבחת העסקה",
  methodEn: "Trade Improvement",
  narrativeConceptHe: "המבט לאחור",
  narrativeConceptEn: "LOOKBACK",
  taglineEn: "Stop chasing the market. Learn how to work with its movement.",
  taglineHe: "אל תרדוף אחרי השוק. למד לעבוד עם התנועה שלו.",
  /** Author credit — exact name only; no invented titles */
  authorHe: "אביאל רווח",
  authorBylineHe: "מאת אביאל רווח",
  authorCreditHe: "יוצר שיטת ZIGZAG · LOOKBACK",
  supportHe:
    "ספר דיגיטלי נרטיבי למתודולוגיית ZigZag — השבחת העסקה, תקציב העסקה, מימוש 75% ומשמעת מינוף. סימולציה וחינוך בלבד.",
} as const;

export const colors = {
  void: "#03050C",
  abyss: "#070B16",
  midnight: "#0A1224",
  navy: "#0B1528",
  panel: "#101A2E",
  glass: "rgba(16, 26, 46, 0.55)",
  line: "rgba(125, 211, 252, 0.16)",
  cyan: "#2EE6FF",
  cyanBright: "#7AF0FF",
  cyanDim: "#1AA8C4",
  electric: "#3B82F6",
  gold: "#C9A84C",
  goldSoft: "rgba(201, 168, 76, 0.18)",
  ink: "#E8EEF8",
  muted: "#8FA0B8",
  danger: "#F07178",
  trafficGreen: "#3DDC97",
  trafficYellow: "#F5C542",
  trafficRed: "#F07178",
} as const;

export const motion = {
  heroFadeMs: 700,
  ctaStaggerMs: 120,
  symbolSpinSec: 28,
  chapterTransitionMs: 480,
} as const;
