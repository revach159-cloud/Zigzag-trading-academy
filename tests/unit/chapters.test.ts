import { describe, expect, it } from "vitest";
import {
  chapterCatalog,
  getAdjacentChapters,
  getChapterBySlug,
  getReadingProgress,
  listChapters,
} from "@/lib/content/chapters";
import { chapterBodies, getChapterBodyBySlug } from "@/lib/content/bodies";
import {
  chapterBodySchema,
  chapterCatalogSchema,
} from "@/lib/content/schemas";
import { glossary, listGlossaryEntries } from "@/lib/content/glossary";
import { zigzagAssumptions } from "@/lib/math/assumptions";

describe("chapter catalog", () => {
  it("validates Lookback narrative catalog with 13 stations", () => {
    const parsed = chapterCatalogSchema.parse(chapterCatalog);
    expect(parsed.chapters).toHaveLength(13);
    expect(parsed.simulationOnly).toBe(true);
    expect(parsed.version).toBe(2);
    expect(parsed.narrativeId).toBe("prepared-routes");
  });

  it("uses unique slugs and sequential published numbers", () => {
    const chapters = listChapters();
    const slugs = chapters.map((chapter) => chapter.slug);
    expect(new Set(slugs).size).toBe(13);
    expect(chapters.map((chapter) => chapter.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    ]);
    expect(chapters.every((chapter) => chapter.status === "published")).toBe(
      true,
    );
  });

  it("matches the Lookback journey titles", () => {
    const titles = listChapters().map((chapter) => chapter.titleEn);
    expect(titles).toEqual([
      "Opening the Journey",
      "Lookback Discovery",
      "Trade Improvement",
      "Traffic Light",
      "Realize 75%",
      "Return to ×1 Balance",
      "Journey Psychology",
      "Portfolio of Routes",
      "Knowing When to Stop",
      "Beyond Trading",
      "Simple Glossary",
      "Practical Reference",
      "Clear Disclaimer",
    ]);
  });

  it("resolves chapters by slug and adjacency", () => {
    const chapter = getChapterBySlug("traffic-light");
    expect(chapter?.number).toBe(4);
    const { prev, next } = getAdjacentChapters("traffic-light");
    expect(prev?.number).toBe(3);
    expect(next?.number).toBe(5);
  });

  it("returns undefined for unknown slug", () => {
    expect(getChapterBySlug("does-not-exist")).toBeUndefined();
  });

  it("computes reading progress", () => {
    expect(getReadingProgress([]).percent).toBe(0);
    expect(getReadingProgress(["opening-the-journey"]).completed).toBe(1);
  });
});

describe("chapter bodies", () => {
  it("provides a validated narrative body for every catalog chapter", () => {
    expect(chapterBodies).toHaveLength(13);
    for (const chapter of listChapters()) {
      const body = getChapterBodyBySlug(chapter.slug);
      expect(body).toBeDefined();
      const parsed = chapterBodySchema.parse(body);
      expect(parsed.openingStoryHe.length).toBeGreaterThan(40);
      expect(parsed.principleHe.length).toBeGreaterThan(10);
      expect(parsed.memorableInsightHe.length).toBeGreaterThan(10);
      expect(parsed.learningObjectivesHe.length).toBeGreaterThanOrEqual(2);
      expect(parsed.sections.length).toBeGreaterThanOrEqual(2);
      expect(parsed.chapterSummaryHe.length).toBeGreaterThanOrEqual(2);
      // No school MCQs in narrative book
      expect(
        Object.prototype.hasOwnProperty.call(parsed, "knowledgeQuestions"),
      ).toBe(false);
    }
  });

  it("keeps $250 cap vs $320 illustration transparent in trade-improvement", () => {
    const body = getChapterBodyBySlug("trade-improvement");
    const blob = JSON.stringify(body);
    expect(blob).toContain("250");
    expect(blob).toContain("320");
    expect(blob).toMatch(/Reject|דחי/);
    expect(zigzagAssumptions.illustrativePatternTotalUsd).toBe(320);
    expect(zigzagAssumptions.perPositionMarginCapUsd).toBe(250);
  });

  it("teaches 75% close-quantity realization", () => {
    const body = getChapterBodyBySlug("realize-seventy-five");
    const blob = JSON.stringify(body);
    expect(blob).toMatch(/75%/);
    expect(blob.toLowerCase()).not.toContain("withdraw profit");
  });

  it("uses original-reference ladder 100→90→80 in lookback discovery", () => {
    const body = getChapterBodyBySlug("lookback-discovery");
    const blob = JSON.stringify(body);
    expect(blob).toContain("80");
    expect(blob).not.toMatch(/100→90→81|100 -> 90 -> 81/);
  });
});

describe("glossary", () => {
  it("includes core risk vocabulary and Lookback terms", () => {
    expect(glossary.simulationOnly).toBe(true);
    const ids = listGlossaryEntries().map((entry) => entry.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "lookback",
        "margin",
        "notional",
        "quantity",
        "collateral",
        "liquidation",
        "profit-75",
      ]),
    );
  });
});
