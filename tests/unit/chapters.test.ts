import { describe, expect, it } from "vitest";
import {
  chapterCatalog,
  getChapterBySlug,
  listChapters,
} from "@/lib/content/chapters";
import { chapterCatalogSchema } from "@/lib/content/schemas";

describe("chapter catalog", () => {
  it("validates exactly 12 outline chapters", () => {
    const parsed = chapterCatalogSchema.parse(chapterCatalog);
    expect(parsed.chapters).toHaveLength(12);
    expect(parsed.simulationOnly).toBe(true);
    expect(parsed.version).toBe(1);
  });

  it("uses unique slugs and sequential numbers", () => {
    const chapters = listChapters();
    const slugs = chapters.map((chapter) => chapter.slug);
    expect(new Set(slugs).size).toBe(12);
    expect(chapters.map((chapter) => chapter.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
    expect(chapters.every((chapter) => chapter.status === "outline")).toBe(
      true,
    );
  });

  it("resolves chapters by slug", () => {
    const chapter = getChapterBySlug("reinforcement-mechanics-1x");
    expect(chapter?.number).toBe(4);
    expect(chapter?.awaitingConfirmation).toBe(true);
  });

  it("returns undefined for unknown slug", () => {
    expect(getChapterBySlug("does-not-exist")).toBeUndefined();
  });
});
