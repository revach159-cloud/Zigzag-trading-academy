"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ZigZagFallback } from "@/components/scene/zigzag-fallback";

const ZigZagSymbolScene = dynamic(
  () => import("@/components/scene/zigzag-symbol-scene"),
  {
    ssr: false,
    loading: () => <ZigZagFallback />,
  },
);

/**
 * Progressive enhancement: 2D fallback first, optional R3F scene when
 * WebGL is available and the user does not prefer reduced motion.
 */
export function HeroVisual() {
  const [mode, setMode] = useState<"fallback" | "3d">("fallback");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("fallback");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setMode("fallback");
        return;
      }
      setMode("3d");
    } catch {
      setMode("fallback");
    }
  }, []);

  return (
    <div className="relative h-full min-h-[42vh] w-full overflow-hidden sm:min-h-[52vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(59,130,246,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(201,168,76,0.08)_0%,transparent_45%)]" />
      {mode === "3d" ? <ZigZagSymbolScene /> : <ZigZagFallback />}
    </div>
  );
}
