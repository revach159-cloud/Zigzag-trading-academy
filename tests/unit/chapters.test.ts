import { describe, expect, it } from "vitest";
import {
  chapterCatalog,
  getAdjacentChapters,
  getChapterBySlug,
  listChapters,
} from "@/lib/content/chapters";
import { chapterBodies, getChapterBodyBySlug } from "@/lib/content/bodies";
import {
  chapterBodySchema,
  chapterCatalogSchema,
} from "@/lib/content/schemas";

describe("chapter catalog", () => {
  it("validates exactly 12 curriculum chapters", () => {
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
    expect(chapters.every((chapter) => chapter.status === "draft")).toBe(true);
  });

  it("matches the Phase 3 curriculum titles", () => {
    const titles = listChapters().map((chapter) => chapter.titleEn);
    expect(titles).toEqual([
      "Introduction to ZigZag",
      "Market Structure and Price Movement",
      "Trading Fundamentals",
      "Position Construction",
      "Reinforcement Mechanism",
      "Leverage System",
      "Average Entry Price",
      "Profit Realization",
      "Multiple Concurrent Positions",
      "Risk Management",
      "Practical Simulation Laboratory",
      "Final Examination",
    ]);
  });

  it("resolves chapters by slug and adjacency", () => {
    const chapter = getChapterBySlug("reinforcement-mechanism");
    expect(chapter?.number).toBe(5);
    expect(chapter?.awaitingConfirmation).toBe(true);

    const { prev, next } = getAdjacentChapters("reinforcement-mechanism");
    expect(prev?.number).toBe(4);
    expect(next?.number).toBe(6);
  });

  it("returns undefined for unknown slug", () => {
    expect(getChapterBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("chapter bodies", () => {
  it("provides a validated body for every catalog chapter", () => {
    expect(chapterBodies).toHaveLength(12);
    for (const chapter of listChapters()) {
      const body = getChapterBodyBySlug(chapter.slug);
      expect(body).toBeDefined();
      const parsed = chapterBodySchema.parse(body);
      expect(parsed.learningObjectivesHe.length).toBeGreaterThanOrEqual(2);
      expect(parsed.sections.length).toBeGreaterThanOrEqual(2);
      expect(parsed.workedExamples.length).toBeGreaterThanOrEqual(1);
      expect(parsed.scenarios.success.length).toBeGreaterThanOrEqual(1);
      expect(parsed.scenarios.failure.length).toBeGreaterThanOrEqual(1);
      expect(parsed.exercises.length).toBeGreaterThanOrEqual(2);
      expect(parsed.knowledgeQuestions.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps knowledge-question indexes in range", () => {
    for (const body of chapterBodies) {
      for (const question of body.knowledgeQuestions) {
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.choicesHe.length);
      }
    }
  });
});
