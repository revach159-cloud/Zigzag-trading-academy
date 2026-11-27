import { readFileSync } from "node:fs";
import path from "node:path";
import rawIndex from "../../../../content/index.json";
import {
  manuscriptIndexSchema,
  type AppendixMeta,
  type Chapter,
  type ChapterCatalog,
  type ManuscriptDocument,
  type ManuscriptIndex,
  type ManuscriptUnitMeta,
} from "./types";
import { parseManuscriptMarkdown } from "./parse-md";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export const manuscriptIndex: ManuscriptIndex =
  manuscriptIndexSchema.parse(rawIndex);

function toChapter(unit: ManuscriptUnitMeta): Chapter {
  return {
    ...unit,
    number: unit.order,
    stationHe: unit.numberLabelHe,
    status: "published",
    awaitingConfirmation: false,
  };
}

export const chapterCatalog: ChapterCatalog = {
  version: 3,
  simulationOnly: true,
  narrativeId: "lookback-manuscript",
  bookTitleHe: manuscriptIndex.bookTitleHe,
  bookTitleEn: manuscriptIndex.bookTitleEn,
  chapters: manuscriptIndex.units.map(toChapter),
};

const documentCache = new Map<string, ManuscriptDocument>();

function readUnitFile(file: string): string {
  return readFileSync(path.join(CONTENT_ROOT, file), "utf8");
}

export function listChapters(): Chapter[] {
  return chapterCatalog.chapters;
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapterCatalog.chapters.find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev?: Chapter;
  next?: Chapter;
} {
  const chapters = listChapters();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export function getReadingProgress(completedSlugs: string[]): {
  completed: number;
  total: number;
  percent: number;
} {
  const total = chapterCatalog.chapters.length;
  const completed = chapterCatalog.chapters.filter((c) =>
    completedSlugs.includes(c.slug),
  ).length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getManuscriptBySlug(slug: string): ManuscriptDocument | undefined {
  const unit = manuscriptIndex.units.find((item) => item.slug === slug);
  if (!unit) return undefined;
  const cached = documentCache.get(slug);
  if (cached) return cached;
  const doc = parseManuscriptMarkdown(readUnitFile(unit.file));
  // Prefer catalog titles/summaries for reader consistency.
  const merged: ManuscriptDocument = {
    ...doc,
    slug: unit.slug,
    titleHe: unit.titleHe,
    titleEn: unit.titleEn,
    summaryHe: unit.summaryHe,
    endVisualKind: unit.endVisual.kind,
    endVisualLabelHe: unit.endVisual.labelHe,
    endVisualStatus: unit.endVisual.status,
  };
  documentCache.set(slug, merged);
  return merged;
}

export function listAppendices(): AppendixMeta[] {
  return manuscriptIndex.appendices;
}

export function getAppendixBySlug(slug: string): {
  meta: AppendixMeta;
  document: ManuscriptDocument;
} | undefined {
  const meta = manuscriptIndex.appendices.find((item) => item.slug === slug);
  if (!meta) return undefined;
  const document = parseManuscriptMarkdown(readUnitFile(meta.file));
  return {
    meta,
    document: {
      ...document,
      slug: meta.slug,
      titleHe: meta.titleHe,
      titleEn: meta.titleEn,
    },
  };
}

export function assertNoForbiddenTerms(text: string): void {
  if (text.includes("מסלול")) {
    throw new Error("Forbidden terminology מסלול found in manuscript text");
  }
}
