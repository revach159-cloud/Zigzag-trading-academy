import {
  manuscriptDocumentSchema,
  type ManuscriptBlock,
  type ManuscriptDocument,
  type ManuscriptSection,
} from "./types";

function slugifyHe(title: string, index: number): string {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0590-\u05FFa-zA-Z0-9\-]+/g, "")
    .slice(0, 48);
  return base.length > 0 ? `${base}-${index}` : `section-${index}`;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n")) {
    return { meta: {}, body: trimmed };
  }
  const end = trimmed.indexOf("\n---\n", 4);
  if (end < 0) {
    return { meta: {}, body: trimmed };
  }
  const yaml = trimmed.slice(4, end);
  const body = trimmed.slice(end + 5);
  const meta: Record<string, string> = {};
  for (const line of yaml.split("\n")) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (!match) continue;
    const key = match[1]!;
    let value = match[2]!.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body };
}

function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "`$1`")
    .trim();
}

/** Standalone LaTeX line without $$ / \[ fences (common in ch-05). */
function isBareLatexLine(trimmed: string): boolean {
  if (!trimmed || /[\u0590-\u05FF]/.test(trimmed)) return false;
  if (trimmed.startsWith("\\(") || trimmed.startsWith("\\[")) return false;
  return /\\[a-zA-Z]+|[_^]\{|\\frac|\\sum|\\approx|\\cdot|\\mathrm|\\text/.test(
    trimmed,
  );
}

function parseTable(lines: string[], start: number): {
  block: ManuscriptBlock;
  next: number;
} | null {
  if (!lines[start]?.includes("|")) return null;
  const rows: string[][] = [];
  let i = start;
  while (i < lines.length && lines[i]!.includes("|")) {
    const line = lines[i]!.trim();
    if (/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(line)) {
      i += 1;
      continue;
    }
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => stripInlineMd(cell.trim()));
    if (cells.some((cell) => cell.length > 0)) {
      rows.push(cells);
    }
    i += 1;
  }
  if (rows.length < 2) return null;
  const headersHe = rows[0]!;
  const dataRows = rows.slice(1).map((row) => {
    while (row.length < headersHe.length) row.push("");
    return row.slice(0, headersHe.length);
  });
  return {
    block: {
      type: "table",
      id: `table-${start}`,
      headersHe,
      rows: dataRows,
    },
    next: i,
  };
}

function parseCallout(
  lines: string[],
  start: number,
): { block: ManuscriptBlock; next: number } | null {
  const open = lines[start]?.match(
    /^:::(sim|warning|definition|insight|note|awaiting|unresolved)\s*$/,
  );
  if (!open) return null;
  const tone = open[1] as
    | "sim"
    | "warning"
    | "definition"
    | "insight"
    | "note"
    | "awaiting"
    | "unresolved";
  const bodyLines: string[] = [];
  let i = start + 1;
  while (i < lines.length && lines[i]!.trim() !== ":::") {
    bodyLines.push(lines[i]!);
    i += 1;
  }
  const text = bodyLines.join("\n").trim();
  const titleMap: Record<typeof tone, string> = {
    sim: "סימולציה בלבד",
    warning: "אזהרה",
    definition: "הגדרה",
    insight: "תובנה",
    note: "הערה",
    awaiting: "ממתין לאימות",
    unresolved: "לא מאומת",
  };
  return {
    block: {
      type: "callout",
      tone,
      titleHe: titleMap[tone],
      textHe: stripInlineMd(text) || titleMap[tone],
    },
    next: i < lines.length ? i + 1 : i,
  };
}

function parseBlocks(sectionBody: string): ManuscriptBlock[] {
  const lines = sectionBody.replace(/\r\n/g, "\n").split("\n");
  const blocks: ManuscriptBlock[] = [];
  let i = 0;
  let paragraph: string[] = [];
  let formulaCounter = 0;

  const flushParagraph = () => {
    const text = paragraph.join("\n").trim();
    paragraph = [];
    if (!text) return;
    blocks.push({ type: "paragraph", textHe: stripInlineMd(text) });
  };

  while (i < lines.length) {
    const line = lines[i]!;
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      flushParagraph();
      i += 1;
      continue;
    }

    const callout = parseCallout(lines, i);
    if (callout) {
      flushParagraph();
      blocks.push(callout.block);
      i = callout.next;
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushParagraph();
      const table = parseTable(lines, i);
      if (table) {
        blocks.push(table.block);
        i = table.next;
        continue;
      }
    }

    if (trimmed === "$$") {
      flushParagraph();
      const latexLines: string[] = [];
      i += 1;
      while (i < lines.length && lines[i]!.trim() !== "$$") {
        latexLines.push(lines[i]!);
        i += 1;
      }
      formulaCounter += 1;
      blocks.push({
        type: "formula",
        id: `formula-${formulaCounter}`,
        latex: latexLines.join("\n").trim() || "\\;",
      });
      i += 1;
      continue;
    }

    if (/^\$\$.+\$\$$/.test(trimmed)) {
      flushParagraph();
      formulaCounter += 1;
      blocks.push({
        type: "formula",
        id: `formula-${formulaCounter}`,
        latex: trimmed.slice(2, -2).trim(),
      });
      i += 1;
      continue;
    }

    // Display math: \[ ... \] (possibly multi-line)
    if (trimmed === "\\[" || trimmed.startsWith("\\[")) {
      flushParagraph();
      const latexLines: string[] = [];
      if (trimmed === "\\[") {
        i += 1;
      } else {
        const rest = trimmed.slice(2);
        if (rest.endsWith("\\]")) {
          formulaCounter += 1;
          blocks.push({
            type: "formula",
            id: `formula-${formulaCounter}`,
            latex: rest.slice(0, -2).trim() || "\\;",
          });
          i += 1;
          continue;
        }
        latexLines.push(rest);
        i += 1;
      }
      while (i < lines.length && lines[i]!.trim() !== "\\]") {
        const row = lines[i]!;
        if (row.trim().endsWith("\\]")) {
          latexLines.push(row.replace(/\\]\s*$/, ""));
          i += 1;
          break;
        }
        latexLines.push(row);
        i += 1;
      }
      if (i < lines.length && lines[i]!.trim() === "\\]") {
        i += 1;
      }
      formulaCounter += 1;
      blocks.push({
        type: "formula",
        id: `formula-${formulaCounter}`,
        latex: latexLines.join("\n").trim() || "\\;",
      });
      continue;
    }

    if (isBareLatexLine(trimmed)) {
      flushParagraph();
      formulaCounter += 1;
      blocks.push({
        type: "formula",
        id: `formula-${formulaCounter}`,
        latex: trimmed,
      });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith(">")) {
        quoteLines.push(lines[i]!.replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({
        type: "blockquote",
        textHe: stripInlineMd(quoteLines.join(" ").trim()),
      });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) {
        items.push(stripInlineMd(lines[i]!.trim().replace(/^[-*]\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "list", itemsHe: items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) {
        items.push(stripInlineMd(lines[i]!.trim().replace(/^\d+\.\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "ordered-list", itemsHe: items });
      continue;
    }

    if (trimmed.startsWith("#")) {
      // Sub-headings inside a section become bold lead paragraphs.
      flushParagraph();
      paragraph.push(trimmed.replace(/^#+\s*/, ""));
      i += 1;
      continue;
    }

    paragraph.push(line);
    i += 1;
  }

  flushParagraph();
  return blocks.length > 0
    ? blocks
    : [{ type: "paragraph", textHe: "—" }];
}

function splitSections(body: string): ManuscriptSection[] {
  const normalized = body.replace(/\r\n/g, "\n").trim();
  const parts = normalized.split(/\n(?=##\s+)/);
  const sections: ManuscriptSection[] = [];
  let index = 0;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const headingMatch = trimmed.match(/^##\s+(.+)\n([\s\S]*)$/);
    if (headingMatch) {
      const titleHe = stripInlineMd(headingMatch[1]!);
      const sectionBody = headingMatch[2] ?? "";
      const blocks = parseBlocks(sectionBody);
      sections.push({
        id: slugifyHe(titleHe, index),
        titleHe,
        blocks,
      });
      index += 1;
      continue;
    }

    // Leading prose before first ## — treat as opening section.
    if (trimmed.startsWith("# ")) {
      const withoutH1 = trimmed.replace(/^#\s+.+\n+/, "");
      const blocks = parseBlocks(withoutH1);
      sections.push({
        id: slugifyHe("פתיחה", index),
        titleHe: "פתיחה",
        blocks,
      });
      index += 1;
      continue;
    }

    const blocks = parseBlocks(trimmed);
    sections.push({
      id: slugifyHe("פתיחה", index),
      titleHe: "פתיחה",
      blocks,
    });
    index += 1;
  }

  return sections.length > 0
    ? sections
    : [
        {
          id: "empty",
          titleHe: "תוכן",
          blocks: [{ type: "paragraph", textHe: "—" }],
        },
      ];
}

export function parseManuscriptMarkdown(raw: string): ManuscriptDocument {
  const { meta, body } = parseFrontmatter(raw);
  const sections = splitSections(body);
  return manuscriptDocumentSchema.parse({
    slug: meta.slug ?? "unknown",
    titleHe: meta.titleHe ?? "ללא כותרת",
    titleEn: meta.titleEn ?? "Untitled",
    summaryHe: meta.summaryHe ?? meta.titleHe ?? "—",
    endVisualKind: meta.endVisualKind ?? "none",
    endVisualLabelHe: meta.endVisualLabelHe ?? "רואים את זה אחרת",
    endVisualStatus: (meta.endVisualStatus as ManuscriptDocument["endVisualStatus"]) ??
      "stub_incomplete",
    sections,
  });
}
