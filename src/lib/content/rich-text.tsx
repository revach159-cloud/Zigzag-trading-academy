import type { ReactNode } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderInlineLatex(latex: string): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
      strict: "ignore",
    });
  } catch {
    return latex;
  }
}

function renderPlainWithBackticks(text: string, keyPrefix: string): ReactNode[] {
  // Isolate numeric cascades like 100→25→6.25 so RTL does not reverse them.
  const cascadeSplit = text.split(/(\d+(?:\.\d+)?(?:\s*→\s*\d+(?:\.\d+)?)+)/g);
  const nodes: ReactNode[] = [];
  cascadeSplit.forEach((segment, segIndex) => {
    if (/^\d+(?:\.\d+)?(?:\s*→\s*\d+(?:\.\d+)?)+$/.test(segment)) {
      nodes.push(
        <span
          key={`${keyPrefix}-casc-${segIndex}`}
          dir="ltr"
          className="ltr-isolate font-mono text-[0.95em]"
        >
          {segment}
        </span>,
      );
      return;
    }
    const parts = segment.split(/(`[^`]+`)/g);
    parts.forEach((part, index) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        const term = part.slice(1, -1);
        nodes.push(
          <span
            key={`${keyPrefix}-bt-${segIndex}-${index}`}
            dir="ltr"
            className="ltr-isolate font-mono text-[0.92em]"
          >
            {term}
          </span>,
        );
        return;
      }
      if (part.length > 0) {
        nodes.push(
          <span key={`${keyPrefix}-t-${segIndex}-${index}`}>{part}</span>,
        );
      }
    });
  });
  return nodes;
}

/**
 * Renders Hebrew educational copy with:
 * - `\(...\)` inline KaTeX
 * - backtick-wrapped English trading terms isolated LTR
 */
export function RichText({ text }: { text: string }): ReactNode {
  const chunks: ReactNode[] = [];
  const pattern = /\\\(([\s\S]+?)\\\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      chunks.push(
        ...renderPlainWithBackticks(text.slice(last, match.index), `p${i}`),
      );
    }
    const latex = match[1]!.trim();
    chunks.push(
      <span
        key={`math-${i}`}
        dir="ltr"
        className="ltr-isolate katex-inline-host mx-0.5 inline-block align-baseline text-[0.95em]"
        dangerouslySetInnerHTML={{ __html: renderInlineLatex(latex) }}
      />,
    );
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) {
    chunks.push(...renderPlainWithBackticks(text.slice(last), `p${i}`));
  }

  return <>{chunks}</>;
}
