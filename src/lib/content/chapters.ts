/**
 * LOOKBACK manuscript catalog — Opening + Chapters 1–11.
 * Client-safe re-exports from catalog (no node:fs).
 */
export {
  chapterCatalog,
  getAdjacentChapters,
  getChapterBySlug,
  getReadingProgress,
  listChapters,
  listAppendices,
  manuscriptIndex,
} from "./manuscript/catalog";

export type { Chapter, ChapterCatalog } from "./manuscript/types";
