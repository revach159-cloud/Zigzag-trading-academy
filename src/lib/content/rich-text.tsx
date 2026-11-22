import type { ReactNode } from "react";

/**
 * Renders Hebrew educational copy with backtick-wrapped English trading terms
 * isolated LTR, e.g. "מינוף `leverage` לימודי".
 */
export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          const term = part.slice(1, -1);
          return (
            <span key={index} dir="ltr" className="ltr-isolate font-mono text-[0.92em]">
              {term}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
