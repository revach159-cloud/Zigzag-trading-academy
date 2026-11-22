import katex from "katex";
import "katex/dist/katex.min.css";

type KatexFormulaProps = {
  latex: string;
  captionHe?: string;
  awaitingConfirmation?: boolean;
};

export function KatexFormula({
  latex,
  captionHe,
  awaitingConfirmation = false,
}: KatexFormulaProps) {
  let html = "";
  try {
    html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
      strict: "ignore",
    });
  } catch {
    html = `<span class="katex-error">${latex}</span>`;
  }

  return (
    <figure className="my-5 overflow-x-auto rounded-sm border border-[var(--zz-line)] bg-[var(--zz-panel)]/50 px-4 py-4">
      <div
        className="katex-display-host text-center text-[var(--zz-ink)]"
        dir="ltr"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {captionHe ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--zz-muted)]">
          {captionHe}
          {awaitingConfirmation ? (
            <span className="ms-2 text-[var(--zz-gold)]">· ממתין לאישור</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
