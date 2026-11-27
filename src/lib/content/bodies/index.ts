/**
 * Compatibility adapter: manuscript Markdown → legacy ChapterBody shape
 * for PDF export and transitional imports. Reader path uses manuscript loader.
 */
import {
  getManuscriptBySlug,
  listChapters,
} from "@/lib/content/manuscript/load";
import {
  chapterBodySchema,
  type ChapterBody,
  type ContentBlock,
} from "../schemas";
import type { ManuscriptBlock } from "../manuscript/types";

function toContentBlocks(blocks: ManuscriptBlock[]): ContentBlock[] {
  const out: ContentBlock[] = [];
  for (const block of blocks) {
    if (block.type === "paragraph") {
      out.push({ type: "paragraph", textHe: block.textHe });
    } else if (block.type === "list" || block.type === "ordered-list") {
      out.push({ type: "list", itemsHe: block.itemsHe });
    } else if (block.type === "callout") {
      out.push({
        type: "callout",
        tone: block.tone,
        titleHe: block.titleHe,
        textHe: block.textHe,
      });
    } else if (block.type === "table") {
      out.push({
        type: "table",
        id: block.id,
        captionHe: block.captionHe ?? "טבלה",
        headersHe: block.headersHe,
        rows: block.rows,
        awaitingConfirmation: false,
      });
    } else if (block.type === "formula") {
      out.push({
        type: "formula",
        id: block.id,
        latex: block.latex,
        captionHe: block.captionHe ?? "נוסחה",
        awaitingConfirmation: false,
      });
    } else if (block.type === "blockquote") {
      out.push({ type: "paragraph", textHe: block.textHe });
    }
  }
  return out.length > 0
    ? out
    : [{ type: "paragraph", textHe: "—" }];
}

function manuscriptToBody(slug: string): ChapterBody {
  const doc = getManuscriptBySlug(slug);
  if (!doc) {
    throw new Error(`Missing manuscript for slug: ${slug}`);
  }
  const firstParagraphBlock = doc.sections
    .flatMap((section) => section.blocks)
    .find(
      (block): block is Extract<ManuscriptBlock, { type: "paragraph" }> =>
        block.type === "paragraph" && block.textHe.length > 40,
    );
  const firstParagraph = firstParagraphBlock?.textHe ?? doc.summaryHe;

  const summaryItems = doc.sections
    .filter((section) => /סיכום|לקח|לזכור/.test(section.titleHe))
    .flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === "list" || block.type === "ordered-list") {
          return block.itemsHe;
        }
        if (block.type === "paragraph") return [block.textHe];
        return [];
      }),
    );

  const body = {
    slug,
    openingStoryHe: firstParagraph,
    principleHe: doc.summaryHe,
    memorableInsightHe:
      summaryItems[0] ??
      "LOOKBACK מלמד משמעת ניהול — לא הבטחת רווח.",
    learningObjectivesHe:
      summaryItems.length >= 2
        ? summaryItems.slice(0, 4)
        : [doc.summaryHe, "סימולציה וחינוך בלבד — ללא הבטחת תשואה."],
    sections: doc.sections.map((section) => ({
      id: section.id,
      titleHe: section.titleHe,
      role: "general" as const,
      blocks: toContentBlocks(section.blocks),
    })),
    workedExamples: [],
    scenarios: { success: [], failure: [] },
    reflections: [],
    chapterSummaryHe:
      summaryItems.length >= 2
        ? summaryItems.slice(0, 6)
        : [doc.summaryHe, "המתודולוגיה המאושרת נשארת גבול — לא סיפור שיווקי."],
    awaitingNotesHe: [],
  };

  return chapterBodySchema.parse(body);
}

export const chapterBodies: ChapterBody[] = listChapters().map((chapter) =>
  manuscriptToBody(chapter.slug),
);

export function getChapterBodyBySlug(slug: string): ChapterBody | undefined {
  try {
    return manuscriptToBody(slug);
  } catch {
    return undefined;
  }
}
