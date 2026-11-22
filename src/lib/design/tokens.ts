/**
 * ZigZag Trading Academy design tokens.
 * Deep black/navy · electric cyan · subtle gold.
 * Avoid purple-SaaS / cream-serif / broadsheet clichés.
 */
export const brand = {
  name: "ZIGZAG",
  fullName: "ZIGZAG TRADING ACADEMY",
  taglineEn: "Master the System. Understand the Risk.",
  taglineHe: "שלוט במערכת. הבן את הסיכון.",
  supportHe:
    "אקדמיה מוסדית ללימוד מתודולוגיית ZigZag — סימולציה וחינוך בלבד, ללא מסחר אמיתי.",
} as const;

export const colors = {
  void: "#03050C",
  abyss: "#070B16",
  navy: "#0B1528",
  panel: "#101A2E",
  line: "rgba(125, 211, 252, 0.16)",
  cyan: "#2EE6FF",
  cyanDim: "#1AA8C4",
  electric: "#3B82F6",
  gold: "#C9A84C",
  goldSoft: "rgba(201, 168, 76, 0.18)",
  ink: "#E8EEF8",
  muted: "#8FA0B8",
  danger: "#F07178",
} as const;

export const motion = {
  heroFadeMs: 700,
  ctaStaggerMs: 120,
  symbolSpinSec: 28,
} as const;
