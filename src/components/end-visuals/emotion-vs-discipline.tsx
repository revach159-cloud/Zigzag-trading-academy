"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { cn } from "@/lib/utils/cn";

const FRAMES = {
  emotion: {
    title: "תגובה רגשית",
    color: "var(--zz-danger)",
    lines: [
      "המחיר יורד — פאניקה",
      "הגדלה בלי סולם",
      "התאהבות בעסקה",
      "דחיית מימוש כי «עוד רגע יחזור»",
    ],
  },
  discipline: {
    title: "משמעת ZIGZAG",
    color: "var(--zz-emerald)",
    lines: [
      "בדיקת תוכנית לפני פעולה",
      "חיזוק רק ב־Touch מתוכנן",
      "מימוש 75% כשהכלל אומר",
      "חזרה לאיזון — בלי דרמה",
    ],
  },
} as const;

export function EmotionVsDiscipline({ endVisual }: { endVisual: EndVisual }) {
  const [side, setSide] = useState<"emotion" | "discipline">("emotion");
  const reduce = useReducedMotion();
  const frame = FRAMES[side];

  return (
    <EndVisualShell endVisual={endVisual}>
      <div className="flex gap-2">
        {(
          [
            ["emotion", "רגש"],
            ["discipline", "משמעת"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSide(id)}
            className={cn(
              "flex-1 border px-3 py-2 text-sm font-medium",
              side === id
                ? id === "emotion"
                  ? "border-[var(--zz-danger)] text-[var(--zz-danger)]"
                  : "border-[var(--zz-emerald)] text-[var(--zz-emerald)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div
        key={side}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-5 border p-5"
        style={{ borderColor: `color-mix(in srgb, ${frame.color} 45%, transparent)` }}
      >
        <div
          className="mb-4 h-24 w-full"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${frame.color} 25%, transparent), transparent)`,
          }}
          aria-hidden
        />
        <h3 className="text-xl font-bold" style={{ color: frame.color }}>
          {frame.title}
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--zz-muted)]">
          {frame.lines.map((line) => (
            <li key={line}>· {line}</li>
          ))}
        </ul>
      </motion.div>
    </EndVisualShell>
  );
}
