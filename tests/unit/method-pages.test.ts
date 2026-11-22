import { describe, expect, it } from "vitest";
import {
  getMethodPageBySlug,
  listMethodPages,
  methodCatalog,
} from "@/lib/content/method-pages/catalog";
import { methodCatalogSchema } from "@/lib/content/schemas";

describe("method pages", () => {
  it("validates method catalog with required pages", () => {
    const parsed = methodCatalogSchema.parse(methodCatalog);
    expect(parsed.simulationOnly).toBe(true);
    expect(parsed.pages.length).toBeGreaterThanOrEqual(4);
  });

  it("exposes overview, reinforcement, leverage, and profit pages", () => {
    const slugs = listMethodPages().map((page) => page.slug);
    expect(slugs).toEqual([
      "overview",
      "reinforcement",
      "leverage",
      "profit-realization",
    ]);
  });

  it("marks methodology pages as awaiting confirmation", () => {
    for (const page of listMethodPages()) {
      expect(page.awaitingConfirmation).toBe(true);
      expect(page.sections.length).toBeGreaterThanOrEqual(1);
      expect(page.knowledgeQuestions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("resolves pages by slug", () => {
    expect(getMethodPageBySlug("leverage")?.titleEn).toContain("1x");
    expect(getMethodPageBySlug("missing")).toBeUndefined();
  });

  it("keeps knowledge-question indexes in range", () => {
    for (const page of listMethodPages()) {
      for (const question of page.knowledgeQuestions) {
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.choicesHe.length);
      }
    }
  });
});
