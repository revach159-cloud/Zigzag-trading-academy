import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  chapterCatalog,
  getAdjacentChapters,
  getChapterBySlug,
  getReadingProgress,
  listChapters,
} from "@/lib/content/chapters";
import { manuscriptIndex, listAppendices } from "@/lib/content/manuscript/catalog";
import { getManuscriptBySlug } from "@/lib/content/manuscript/load";
import { manuscriptIndexSchema } from "@/lib/content/manuscript/types";
import { glossary, listGlossaryEntries } from "@/lib/content/glossary";
import { zigzagAssumptions } from "@/lib/math/assumptions";

const CONTENT_DIR = path.join(process.cwd(), "content");

describe("manuscript catalog", () => {
  it("validates Opening + 11 chapters index", () => {
    const parsed = manuscriptIndexSchema.parse(manuscriptIndex);
    expect(parsed.units).toHaveLength(12);
    expect(parsed.simulationOnly).toBe(true);
    expect(parsed.version).toBe(3);
    expect(parsed.narrativeId).toBe("lookback-manuscript");
    expect(chapterCatalog.chapters).toHaveLength(12);
  });

  it("uses unique slugs and approved Hebrew titles", () => {
    const chapters = listChapters();
    const slugs = chapters.map((chapter) => chapter.slug);
    expect(new Set(slugs).size).toBe(12);
    expect(chapters.map((chapter) => chapter.order)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ]);
    expect(chapters.map((chapter) => chapter.titleHe)).toEqual([
      "לפני שמתחילים: צריך ללמוד לחשוב אחרת",
      "הרגע שבו מפסיקים לרדוף",
      "השוק תמיד משאיר עקבות",
      "לכל דולר יש תפקיד",
      "כשהשוק הולך נגדך",
      "אמנות מחיר הכניסה הממוצע",
      "כוחו של ה־75%",
      "המינוף: כוח שדורש משמעת",
      "העסקה הגדולה ביותר היא העסקה שלא פתחת",
      "האויב שיושב מול המסך",
      "הזיכרון של הסוחר",
      "המספרים אינם משקרים, אבל צריך לדעת לקרוא אותם",
    ]);
  });

  it("resolves chapters by slug and adjacency", () => {
    const chapter = getChapterBySlug("ch-03");
    expect(chapter?.order).toBe(3);
    const { prev, next } = getAdjacentChapters("ch-03");
    expect(prev?.slug).toBe("ch-02");
    expect(next?.slug).toBe("ch-04");
  });

  it("returns undefined for unknown slug", () => {
    expect(getChapterBySlug("does-not-exist")).toBeUndefined();
  });

  it("computes reading progress", () => {
    expect(getReadingProgress([]).percent).toBe(0);
    expect(getReadingProgress(["opening"]).completed).toBe(1);
  });

  it("keeps glossary and disclaimer as appendices outside chapter numbers", () => {
    const appendices = listAppendices();
    expect(appendices.map((item) => item.slug)).toEqual(
      expect.arrayContaining(["appendix-glossary", "appendix-disclaimer"]),
    );
    expect(listChapters().some((chapter) => chapter.slug.includes("appendix"))).toBe(
      false,
    );
  });
});

describe("manuscript bodies", () => {
  it("loads a Markdown document for every catalog unit", () => {
    for (const chapter of listChapters()) {
      const doc = getManuscriptBySlug(chapter.slug);
      expect(doc).toBeDefined();
      expect(doc!.sections.length).toBeGreaterThanOrEqual(2);
      const blob = JSON.stringify(doc);
      expect(blob.length).toBeGreaterThan(800);
      expect(blob).not.toContain("מסלול");
    }
  });

  it("defines unique complete end visuals in index", () => {
    const kinds = manuscriptIndex.units.map((unit) => unit.endVisual.kind);
    expect(new Set(kinds).size).toBe(12);
    expect(
      manuscriptIndex.units.every(
        (unit) => unit.endVisual.status === "complete",
      ),
    ).toBe(true);
  });

  it("teaches portfolio-scaled budget model in ch-03", () => {
    const doc = getManuscriptBySlug("ch-03");
    const blob = JSON.stringify(doc);
    expect(blob).toContain("100,000");
    expect(blob).toContain("0.05%");
    expect(blob).toContain("0.5%");
    expect(blob).toContain("51.2");
    expect(blob).toContain("250");
    expect(blob).toMatch(/Reject|דחי/);
    expect(blob).toMatch(/20–30|20-30/);
    expect(zigzagAssumptions.perPositionMarginCapUsd).toBe(250);
  });

  it("emphasizes remaining-qty cascade in ch-06", () => {
    const blob = JSON.stringify(getManuscriptBySlug("ch-06"));
    expect(blob).toContain("100");
    expect(blob).toContain("6.25");
    expect(blob).toContain("1.5625");
    expect(blob).toMatch(/75%/);
  });

  it("marks Bybit max leverage unverified in ch-07", () => {
    const blob = JSON.stringify(getManuscriptBySlug("ch-07"));
    expect(blob.toLowerCase()).toMatch(/unverified|לא מאומת|null/);
    expect(zigzagAssumptions.maxInstrumentLeverage).toBeNull();
  });

  it("covers demo/stress/OOS learning caveats in ch-10", () => {
    const blob = JSON.stringify(getManuscriptBySlug("ch-10"));
    expect(blob).toMatch(/דמו|demo|נייר/i);
    expect(blob).toMatch(/OOS|מחוץ לדגימה|out-of-sample/i);
    expect(blob).toMatch(/לחץ|stress|גריד/i);
  });

  it("labels ch-11 metrics as hypothetical", () => {
    const blob = JSON.stringify(getManuscriptBySlug("ch-11"));
    expect(blob).toMatch(/HYPOTHETICAL|היפותט/);
  });

  it("contains zero forbidden מסלול across content/", () => {
    const files = readdirSync(CONTENT_DIR).filter((name) => name.endsWith(".md"));
    expect(files.length).toBeGreaterThanOrEqual(12);
    for (const file of files) {
      const text = readFileSync(path.join(CONTENT_DIR, file), "utf8");
      expect(text.includes("מסלול")).toBe(false);
    }
  });
});

describe("glossary", () => {
  it("includes core risk vocabulary and preferred terminology", () => {
    expect(glossary.simulationOnly).toBe(true);
    const ids = listGlossaryEntries().map((entry) => entry.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "lookback",
        "trade-budget",
        "trade-size",
        "margin",
        "notional",
        "quantity",
        "collateral",
        "liquidation",
        "profit-75",
      ]),
    );
    const blob = JSON.stringify(glossary);
    expect(blob).not.toContain("מסלול");
  });
});
