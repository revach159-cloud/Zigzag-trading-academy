/**
 * Client-safe manuscript catalog (JSON only — no node:fs).
 */
import rawIndex from "../../../../content/index.json";
import {
  manuscriptIndexSchema,
  type AppendixMeta,
  type Chapter,
  type ChapterCatalog,
  type ManuscriptIndex,
  type ManuscriptUnitMeta,
} from "./types";

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

export function listAppendices(): AppendixMeta[] {
  return manuscriptIndex.appendices;
}
