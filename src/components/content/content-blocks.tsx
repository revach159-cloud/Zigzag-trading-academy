import type { ContentBlock } from "@/lib/content/schemas";
import { RichText } from "@/lib/content/rich-text";
import { KatexFormula } from "./katex-formula";
import { ContentVisual } from "./content-visuals";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <ContentBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-8 text-[var(--zz-ink)]/95">
          <RichText text={block.textHe} />
        </p>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 pe-5 text-[var(--zz-ink)]/95 marker:text-[var(--zz-cyan)]">
          {block.itemsHe.map((item) => (
            <li key={item} className="leading-7">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <KatexFormula
          latex={block.latex}
          captionHe={block.captionHe}
          awaitingConfirmation={block.awaitingConfirmation}
        />
      );
    case "table":
      return (
        <figure className="my-5 overflow-x-auto rounded-sm border border-[var(--zz-line)]">
          <table className="min-w-full border-collapse text-sm">
            <caption className="border-b border-[var(--zz-line)] bg-[var(--zz-panel)]/60 px-3 py-2 text-start text-[var(--zz-muted)]">
              {block.captionHe}
              {block.awaitingConfirmation ? (
                <span className="ms-2 text-[var(--zz-gold)]">· ממתין לאישור</span>
              ) : null}
            </caption>
            <thead>
              <tr className="bg-[var(--zz-navy)]/70">
                {block.headersHe.map((header) => (
                  <th
                    key={header}
                    className="border-b border-[var(--zz-line)] px-3 py-2 text-start font-medium text-[var(--zz-cyan)]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-[var(--zz-panel)]/30">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="border-b border-[var(--zz-line)]/60 px-3 py-2 text-[var(--zz-ink)]"
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "callout":
      return (
        <aside
          className={
            block.tone === "awaiting"
              ? "rounded-sm border border-[var(--zz-gold)]/40 bg-[var(--zz-gold-soft)] px-4 py-3"
              : block.tone === "warning"
                ? "rounded-sm border border-[var(--zz-danger)]/40 bg-[rgba(240,113,120,0.08)] px-4 py-3"
                : block.tone === "sim"
                  ? "rounded-sm border border-[var(--zz-line)] bg-[var(--zz-navy)]/50 px-4 py-3"
                  : "rounded-sm border border-[var(--zz-cyan)]/30 bg-[rgba(46,230,255,0.06)] px-4 py-3"
          }
        >
          <p
            className={
              block.tone === "awaiting"
                ? "text-sm font-medium text-[var(--zz-gold)]"
                : block.tone === "warning"
                  ? "text-sm font-medium text-[var(--zz-danger)]"
                  : "text-sm font-medium text-[var(--zz-cyan)]"
            }
          >
            {block.titleHe}
          </p>
          <p className="mt-1 text-sm leading-7 text-[var(--zz-ink)]/90">
            <RichText text={block.textHe} />
          </p>
        </aside>
      );
    case "visual":
      return <ContentVisual kind={block.kind} captionHe={block.captionHe} />;
  }
}
