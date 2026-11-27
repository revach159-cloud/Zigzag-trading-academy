/**
 * LOOKBACK manuscript catalog — Opening + Chapters 1–11.
 * Source of truth: /content/index.json + Markdown units.
 */
export {
  chapterCatalog,
  getAdjacentChapters,
  getChapterBySlug,
  getReadingProgress,
  listChapters,
} from "./manuscript/load";

export type { Chapter, ChapterCatalog } from "./manuscript/types";
