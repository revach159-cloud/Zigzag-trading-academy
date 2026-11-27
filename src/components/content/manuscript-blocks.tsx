import { RichText } from "@/lib/content/rich-text";
import type { ManuscriptBlock } from "@/lib/content/manuscript/types";
import { KatexFormula } from "./katex-formula";

const calloutToneClass: Record<string, string> = {
  sim: "border-[var(--zz-cyan)]/40 text-[var(--zz-cyan)]",
  warning: "border-[var(--zz-danger)]/45 text-[var(--zz-danger)]",
  definition: "border-[var(--zz-gold)]/45 text-[var(--zz-gold)]",
  insight: "border-[var(--zz-cyan)]/35 text-[var(--zz-ink)]",
  note: "border-[var(--zz-line)] text-[var(--zz-muted)]",
  awaiting: "border-[var(--zz-gold)]/50 text-[var(--zz-gold)]",
  unresolved: "border-[var(--zz-danger)]/40 text-[var(--zz-danger)]",
};

export function ManuscriptBlocks({
  blocks,
  formulaStart = 1,
}: {
  blocks: ManuscriptBlock[];
  formulaStart?: number;
}) {
  let formulaNumber = formulaStart;

  return (
    <div className="space-y-5 text-[1.02rem] leading-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={`p-${index}`} className="text-[var(--zz-ink)]/95">
                <RichText text={block.textHe} />
              </p>
            );
          case "list":
            return (
              <ul
                key={`ul-${index}`}
                className="space-y-2 pe-1 text-[var(--zz-ink)]/95"
              >
                {block.itemsHe.map((item) => (
                  <li
                    key={item}
                    className="border-r border-[var(--zz-cyan)]/25 pr-4"
                  >
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol
                key={`ol-${index}`}
                className="list-decimal space-y-2 pe-5 text-[var(--zz-ink)]/95"
              >
                {block.itemsHe.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside
                key={`callout-${index}`}
                className={`border-r-2 pr-4 ${calloutToneClass[block.tone] ?? calloutToneClass.note}`}
              >
                <p className="text-sm font-medium">{block.titleHe}</p>
                <p className="mt-2 text-[0.98rem] leading-8 text-[var(--zz-ink)]/90">
                  <RichText text={block.textHe} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={`table-${index}`} className="overflow-x-auto">
                {block.captionHe ? (
                  <p className="mb-2 text-sm text-[var(--zz-muted)]">
                    {block.captionHe}
                  </p>
                ) : null}
                <table className="w-full min-w-[28rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--zz-line)] text-[var(--zz-cyan)]">
                      {block.headersHe.map((header) => (
                        <th
                          key={header}
                          className="px-2 py-2 text-start font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={`row-${rowIndex}`}
                        className="border-b border-[var(--zz-line)]/60"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`cell-${rowIndex}-${cellIndex}`}
                            className="px-2 py-2 align-top text-[var(--zz-ink)]/90"
                          >
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "formula": {
            const number = formulaNumber;
            formulaNumber += 1;
            return (
              <div key={`formula-${index}`}>
                <KatexFormula latex={block.latex} />
                {block.captionHe ? (
                  <p className="mt-2 text-sm text-[var(--zz-muted)]">
                    נוסחה {number}. {block.captionHe}
                  </p>
                ) : (
                  <p
                    dir="ltr"
                    className="ltr-isolate mt-2 text-xs text-[var(--zz-muted)]"
                  >
                    ({number})
                  </p>
                )}
              </div>
            );
          }
          case "blockquote":
            return (
              <blockquote
                key={`bq-${index}`}
                className="border-r-2 border-[var(--zz-gold)]/40 pr-4 text-[var(--zz-muted)]"
              >
                <RichText text={block.textHe} />
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function countManuscriptFormulas(blocks: ManuscriptBlock[]): number {
  return blocks.filter((block) => block.type === "formula").length;
}
