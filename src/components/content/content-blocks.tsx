import type { ContentBlock } from "@/lib/content/schemas";
import { RichText } from "@/lib/content/rich-text";
import { KatexFormula } from "./katex-formula";
import { ContentVisual } from "./content-visuals";

type ContentBlocksProps = {
  blocks: ContentBlock[];
  formulaStart?: number;
  onFormulaCount?: (count: number) => void;
};

export function ContentBlocks({
  blocks,
  formulaStart = 1,
}: ContentBlocksProps) {
  let formulaCursor = formulaStart;

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const formulaNumber =
          block.type === "formula" ? formulaCursor++ : undefined;
        return (
          <ContentBlockView
            key={`${block.type}-${index}`}
            block={block}
            formulaNumber={formulaNumber}
          />
        );
      })}
    </div>
  );
}

export function countFormulas(blocks: ContentBlock[]): number {
  return blocks.filter((block) => block.type === "formula").length;
}

function ContentBlockView({
  block,
  formulaNumber,
}: {
  block: ContentBlock;
  formulaNumber?: number;
}) {
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
          formulaNumber={formulaNumber}
          awaitingConfirmation={block.awaitingConfirmation}
        />
      );
    case "table":
      return (
        <figure className="book-table my-6 overflow-x-auto border-y border-[var(--zz-line)]">
          <table className="min-w-full border-collapse text-sm">
            <caption className="border-b border-[var(--zz-line)] px-1 py-3 text-start text-[var(--zz-muted)]">
              {block.captionHe}
              {block.awaitingConfirmation ? (
                <span className="ms-2 text-[var(--zz-gold)]">· ממתין לאישור</span>
              ) : null}
            </caption>
            <thead>
              <tr>
                {block.headersHe.map((header) => (
                  <th
                    key={header}
                    className="border-b border-[var(--zz-line)] px-2 py-2.5 text-start font-medium text-[var(--zz-cyan)]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="border-b border-[var(--zz-line)]/50 px-2 py-2.5 align-top text-[var(--zz-ink)]"
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
            block.tone === "awaiting" || block.tone === "unresolved"
              ? "my-5 border-r-2 border-[var(--zz-gold)]/55 pr-4"
              : block.tone === "warning"
                ? "my-5 border-r-2 border-[var(--zz-danger)]/55 pr-4"
                : block.tone === "sim"
                  ? "my-5 border-r-2 border-[var(--zz-line)] pr-4"
                  : block.tone === "definition"
                    ? "my-5 border-r-2 border-[var(--zz-cyan)]/55 pr-4"
                    : block.tone === "insight"
                      ? "my-5 border-r-2 border-[var(--zz-gold)]/55 pr-4"
                      : "my-5 border-r-2 border-[var(--zz-cyan)]/40 pr-4"
          }
        >
          <p
            className={
              block.tone === "awaiting" ||
              block.tone === "unresolved" ||
              block.tone === "insight"
                ? "text-sm font-medium text-[var(--zz-gold)]"
                : block.tone === "warning"
                  ? "text-sm font-medium text-[var(--zz-danger)]"
                  : "text-sm font-medium text-[var(--zz-cyan)]"
            }
          >
            {block.tone === "definition" ? `הגדרה · ${block.titleHe}` : null}
            {block.tone === "warning" ? `אזהרה · ${block.titleHe}` : null}
            {block.tone === "unresolved" ? `Unresolved · ${block.titleHe}` : null}
            {block.tone === "insight" ? `תובנה · ${block.titleHe}` : null}
            {block.tone !== "definition" &&
            block.tone !== "warning" &&
            block.tone !== "unresolved" &&
            block.tone !== "insight"
              ? block.titleHe
              : null}
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
