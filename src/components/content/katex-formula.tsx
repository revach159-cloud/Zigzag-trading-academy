import katex from "katex";
import "katex/dist/katex.min.css";

type KatexFormulaProps = {
  latex: string;
  captionHe?: string;
  formulaNumber?: number;
  awaitingConfirmation?: boolean;
  unresolved?: boolean;
};

export function KatexFormula({
  latex,
  captionHe,
  formulaNumber,
  awaitingConfirmation = false,
  unresolved = false,
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
    <figure className="book-formula my-5 overflow-x-auto rounded-lg border border-[var(--zz-line)] bg-[rgba(16,26,46,0.72)] px-4 py-4 shadow-[inset_0_1px_0_rgba(46,230,255,0.06)] backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div
          className="katex-display-host min-w-0 flex-1 text-center text-[var(--zz-ink)]"
          dir="ltr"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {typeof formulaNumber === "number" ? (
          <span
            dir="ltr"
            className="ltr-isolate shrink-0 pt-1 font-mono text-xs text-[var(--zz-gold)]"
            aria-label={`Formula ${formulaNumber}`}
          >
            ({formulaNumber})
          </span>
        ) : null}
      </div>
      {captionHe ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--zz-muted)]">
          {typeof formulaNumber === "number" ? (
            <span className="me-2 font-mono text-[var(--zz-gold)]">
              נוסחה {formulaNumber}.
            </span>
          ) : null}
          {captionHe}
          {awaitingConfirmation ? (
            <span className="ms-2 text-[var(--zz-gold)]">· ממתין לאישור</span>
          ) : null}
          {unresolved ? (
            <span className="ms-2 text-[var(--zz-gold)]">· unresolved</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
