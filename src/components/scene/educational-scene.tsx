"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneFallback2D } from "./scene-fallback-2d";
import type { SceneKind } from "./scene-kinds";

export type { SceneKind } from "./scene-kinds";

const EducationalScene3D = dynamic(() => import("./educational-scene-3d"), {
  ssr: false,
  loading: () => <SceneFallback2D kind="zigzag" />,
});

type Props = {
  kind: SceneKind;
  className?: string;
  compact?: boolean;
};

/**
 * Lazy educational R3F scene with reduced-motion + WebGL 2D fallback.
 */
export function EducationalScene({ kind, className, compact }: Props) {
  const [mode, setMode] = useState<"fallback" | "3d">("fallback");

  useEffect(() => {
    if (kind === "none") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("fallback");
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setMode(gl ? "3d" : "fallback");
    } catch {
      setMode("fallback");
    }
  }, [kind]);

  if (kind === "none") return null;

  return (
    <div
      className={
        className ??
        (compact
          ? "relative h-40 w-full overflow-hidden rounded-xl border border-[var(--zz-line)]"
          : "relative h-56 w-full overflow-hidden rounded-2xl border border-[var(--zz-line)] sm:h-72")
      }
      aria-hidden="true"
    >
      {mode === "3d" ? (
        <EducationalScene3D kind={kind} />
      ) : (
        <SceneFallback2D kind={kind} />
      )}
    </div>
  );
}
