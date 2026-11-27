"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CoverMarket3D = dynamic(() => import("./cover-market-3d"), {
  ssr: false,
  loading: () => <CoverStill />,
});

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
        className="absolute inset-0 h-full w-full opacity-70"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Candlestick silhouette */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 40 + i * 34;
          const up = i % 3 !== 0;
          const h = 30 + ((i * 17) % 55);
          const y = 210 - h / 2 + (i % 2 === 0 ? -20 : 25);
          return (
            <g key={i}>
              <line
                x1={x + 8}
                x2={x + 8}
                y1={y - 12}
                y2={y + h + 12}
                stroke={up ? "#3DDC97" : "#F07178"}
                strokeWidth="1.5"
                opacity="0.55"
              />
              <rect
                x={x}
                y={y}
                width="16"
                height={h}
                fill={up ? "rgba(61,220,151,0.45)" : "rgba(240,113,120,0.4)"}
                stroke={up ? "#3DDC97" : "#F07178"}
                strokeWidth="1"
              />
            </g>
          );
        })}
        <polyline
          points="60,280 140,120 220,230 320,90 420,250 520,130 620,210 720,100"
          fill="none"
          stroke="#E0C36A"
          strokeWidth="3"
          opacity="0.9"
        />
        {/* Dollar-like rectangles */}
        <rect
          x="520"
          y="60"
          width="70"
          height="36"
          rx="2"
          fill="rgba(26,107,69,0.55)"
          stroke="#C9A84C"
          strokeWidth="1"
          transform="rotate(12 555 78)"
        />
        <rect
          x="90"
          y="70"
          width="58"
          height="30"
          rx="2"
          fill="rgba(26,107,69,0.4)"
          stroke="#C9A84C"
          strokeWidth="1"
          transform="rotate(-8 119 85)"
        />
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
    <div className={className} data-scene-mode={mode} data-scene-kind="cover-market">
      {mode === "3d" ? <CoverMarket3D /> : <CoverStill />}
    </div>
  );
}
