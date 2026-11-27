"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { cn } from "@/lib/utils/cn";

const SIDES = [
  {
    id: "traditional",
    title: "סוחר מסורתי",
    points: [
      "חוזה את הצעד הבא",
      "נכנס כשהתחושה חזקה",
      "מגיב לכאב מיידי",
      "מודד הצלחה בצדקת התחזית",
    ],
  },
  {
    id: "zigzag",
    title: "סוחר ZIGZAG",
    points: [
      "מתכנן ניהול על פני כמה מהלכים",
      "תקציב עסקה מוגדר מראש",
      "חיזוקים לפי סולם Touch",
      "מודד הצלחה במשמעת תהליך",
    ],
  },
] as const;

export function PhilosophyCompare({ endVisual }: { endVisual: EndVisual }) {
  const [focus, setFocus] = useState<"traditional" | "zigzag" | "both">("both");
  const reduce = useReducedMotion();

  return (
    <EndVisualShell endVisual={endVisual}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="השוואת פילוסופיות">
        {(
          [
            ["both", "שני הצדדים"],
            ["traditional", "מסורתי"],
            ["zigzag", "ZIGZAG"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={focus === id}
            onClick={() => setFocus(id)}
            className={cn(
              "border px-3 py-1.5 text-xs font-medium transition-colors",
              focus === id
                ? "border-[var(--zz-cyan)] bg-[rgba(46,230,255,0.12)] text-[var(--zz-cyan)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)] hover:text-[var(--zz-ink)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {SIDES.map((side) => {
          const visible = focus === "both" || focus === side.id;
          return (
            <motion.div
              key={side.id}
              initial={false}
              animate={{
                opacity: visible ? 1 : 0.25,
                scale: reduce ? 1 : visible ? 1 : 0.98,
              }}
              className={cn(
                "border p-4",
                side.id === "zigzag"
                  ? "border-[var(--zz-gold)]/35 bg-[rgba(201,168,76,0.06)]"
                  : "border-[var(--zz-line)] bg-[rgba(16,26,46,0.4)]",
              )}
            >
              <h3 className="text-lg font-semibold text-[var(--zz-ink)]">
                {side.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--zz-muted)]">
                {side.points.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </EndVisualShell>
  );
}
