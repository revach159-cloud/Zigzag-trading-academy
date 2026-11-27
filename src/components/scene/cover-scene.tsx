"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CoverMarket3D = dynamic(() => import("./cover-market-3d"), {
  ssr: false,
  loading: () => <CoverStill />,
});

/** Reduced-motion / no-WebGL still — candles + zigzag only, no dollar notes. */
function CoverStill() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      aria-hidden
      data-scene-mode="still"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 55% 40%, rgba(201,168,76,0.16), transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(46,230,255,0.1), transparent 45%), linear-gradient(160deg, #02040A 0%, #0A1224 55%, #05080F 100%)",
        }}
      />
      <svg
        viewBox="0 0 800 420"
        className="absolute inset-0 h-full w-full opacity-75"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="cover-soft-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <linearGradient id="zz-gold-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#E0C36A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Soft chart plate */}
        <rect
          x="36"
          y="110"
          width="728"
          height="230"
          rx="4"
          fill="rgba(6,11,22,0.55)"
          stroke="rgba(46,230,255,0.12)"
          strokeWidth="1"
          filter="url(#cover-soft-blur)"
        />

        {Array.from({ length: 22 }).map((_, i) => {
          const x = 55 + i * 32;
          const up = i % 3 !== 0;
          const h = 28 + ((i * 17) % 52);
          const y = 220 - h / 2 + (i % 2 === 0 ? -18 : 22);
          return (
            <g key={i}>
              <line
                x1={x + 7}
                x2={x + 7}
                y1={y - 10}
                y2={y + h + 10}
                stroke={up ? "#3DDC97" : "#F07178"}
                strokeWidth="1.4"
                opacity="0.5"
              />
              <rect
                x={x}
                y={y}
                width="14"
                height={h}
                fill={up ? "rgba(61,220,151,0.48)" : "rgba(240,113,120,0.42)"}
                stroke={up ? "#3DDC97" : "#F07178"}
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Gold zigzag with clear pivots */}
        <polyline
          points="70,275 150,125 235,235 330,95 430,255 530,135 630,215 720,120"
          fill="none"
          stroke="url(#zz-gold-line)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.95"
        />
        {[
          [70, 275],
          [150, 125],
          [235, 235],
          [330, 95],
          [430, 255],
          [530, 135],
          [630, 215],
          [720, 120],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="#E0C36A"
            stroke="#C9A84C"
            strokeWidth="1.5"
            opacity="0.95"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Full-bleed cinematic cover with WebGL market scene + reduced-motion still.
 */
export function CoverScene({ className }: { className?: string }) {
  const [mode, setMode] = useState<"still" | "3d">("still");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("still");
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setMode(gl ? "3d" : "still");
    } catch {
      setMode("still");
    }
  }, []);

  return (
    <div
      className={className}
      data-scene-mode={mode}
      data-scene-kind="cover-market"
    >
      {mode === "3d" ? <CoverMarket3D /> : <CoverStill />}
      {/* Soft depth blur plate — keeps chart decorative behind copy */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backdropFilter: "blur(0.6px)",
          WebkitBackdropFilter: "blur(0.6px)",
          background:
            "radial-gradient(ellipse at 70% 55%, transparent 20%, rgba(2,4,10,0.25) 70%)",
        }}
        aria-hidden
      />
    </div>
  );
}
