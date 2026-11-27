"use client";

import { useState } from "react";
import type { EndVisual } from "@/lib/content/manuscript/types";
import { EndVisualShell } from "./shell";
import { cn } from "@/lib/utils/cn";

export function ChaseVsPlan({ endVisual }: { endVisual: EndVisual }) {
  const [mode, setMode] = useState<"chase" | "plan">("chase");

  return (
    <EndVisualShell endVisual={endVisual}>
      <div className="flex gap-2" role="group" aria-label="מצב התנהגות">
        {(
          [
            ["chase", "רדיפת מחיר"],
            ["plan", "תוכנית מוכנה"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={cn(
              "flex-1 border px-3 py-2 text-sm font-medium",
              mode === id
                ? id === "chase"
                  ? "border-[var(--zz-danger)] bg-[rgba(240,113,120,0.12)] text-[var(--zz-danger)]"
                  : "border-[var(--zz-emerald)] bg-[rgba(61,220,151,0.12)] text-[var(--zz-emerald)]"
                : "border-[var(--zz-line)] text-[var(--zz-muted)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 360 160" className="mt-5 h-40 w-full" role="img" aria-label={mode === "chase" ? "רדיפת מחיר" : "תוכנית ניהול"}>
        <polyline
          points="20,40 80,55 140,30 200,70 260,45 340,20"
          fill="none"
          stroke="rgba(168,184,208,0.35)"
          strokeWidth="2"
        />
        {mode === "chase" ? (
          <>
            <circle cx="200" cy="70" r="8" fill="#F07178" />
            <line x1="200" y1="70" x2="260" y2="45" stroke="#F07178" strokeWidth="2.5" strokeDasharray="4 3" />
            <circle cx="260" cy="45" r="6" fill="#F07178" opacity="0.7" />
            <text x="180" y="100" fill="#F07178" fontSize="12" fontFamily="Rubik, sans-serif">
              קפיצה אחרי המחיר
            </text>
          </>
        ) : (
          <>
            {[40, 70, 100, 130].map((y, i) => (
              <g key={y}>
                <line x1="40" y1={y} x2="320" y2={y} stroke="rgba(61,220,151,0.35)" strokeWidth="1" strokeDasharray="3 4" />
                <circle cx={60 + i * 70} cy={y} r="5" fill="#3DDC97" />
              </g>
            ))}
            <text x="40" y="150" fill="#3DDC97" fontSize="12" fontFamily="Rubik, sans-serif">
              רמות סולם מוכנות מראש
            </text>
          </>
        )}
      </svg>

      <p className="mt-3 text-sm leading-7 text-[var(--zz-muted)]">
        {mode === "chase"
          ? "רדיפה מגיבה לרגע — בלי תקציב עסקה, בלי Reject, בלי סולם."
          : "תוכנית מגדירה מראש תקציב עסקה, רמות Touch, וסירוב לחרוג מהתקרה."}
      </p>
    </EndVisualShell>
  );
}
