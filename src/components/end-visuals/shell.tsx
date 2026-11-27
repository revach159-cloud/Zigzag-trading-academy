import type { EndVisual } from "@/lib/content/manuscript/types";
import type { ReactNode } from "react";

export function EndVisualShell({
  endVisual,
  children,
  hypothetical = false,
}: {
  endVisual: EndVisual;
  children: ReactNode;
  hypothetical?: boolean;
}) {
  return (
    <section
      id="end-visual"
      className="end-visual-shell mt-16 px-4 py-10 sm:px-6"
      aria-label={endVisual.labelHe}
      data-end-visual-kind={endVisual.kind}
      data-end-visual-status={endVisual.status}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-medium tracking-[0.28em] text-[var(--zz-cyan)]">
            {endVisual.labelHe}
          </p>
          {hypothetical ? (
            <span className="hypothetical-badge" dir="ltr">
              HYPOTHETICAL
            </span>
          ) : null}
        </div>
        <h2 className="mt-3 text-2xl font-bold text-[var(--zz-ink)] sm:text-3xl">
          {endVisual.concept}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--zz-muted)]">
          אינטראקטיבי ללימוד בלבד · אינו המלצת מסחר · אינו מבטיח תוצאה
        </p>
        <div className="end-visual-widget">{children}</div>
      </div>
    </section>
  );
}
