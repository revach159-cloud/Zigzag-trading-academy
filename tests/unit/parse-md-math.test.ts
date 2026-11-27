import { describe, expect, it } from "vitest";
import { parseManuscriptMarkdown } from "@/lib/content/manuscript/parse-md";
import { getManuscriptBySlug } from "@/lib/content/manuscript/load";

describe("manuscript math parsing", () => {
  it("parses $$ , \\[ \\] , and bare latex display lines", () => {
    const doc = parseManuscriptMarkdown(`---
slug: test
titleHe: בדיקה
titleEn: Test
summaryHe: סיכום
---

# כותרת

## סעיף

לפני:

$$
a = b
$$

ואז:

\\[
c = d
\\]

ואז שורה חשופה:

E_{\\\\mathrm{avg}} = 1

סוף עם \\(E_{avg}\\) בתוך משפט.
`);

    const types = doc.sections.flatMap((s) => s.blocks.map((b) => b.type));
    expect(types.filter((t) => t === "formula").length).toBeGreaterThanOrEqual(3);
  });

  it("loads ch-05 formulas and keeps inline math markers for RichText", () => {
    const doc = getManuscriptBySlug("ch-05");
    expect(doc).toBeDefined();
    const formulas = doc!.sections.flatMap((s) =>
      s.blocks.filter((b) => b.type === "formula"),
    );
    expect(formulas.length).toBeGreaterThanOrEqual(2);
    const latex = formulas
      .map((f) => (f.type === "formula" ? f.latex : ""))
      .join("\n");
    expect(latex).toContain("E_{\\mathrm{avg}}");
    const blob = JSON.stringify(doc);
    expect(blob).toContain("\\\\(");
  });

  it("loads ch-11 display math from \\[ \\] fences", () => {
    const doc = getManuscriptBySlug("ch-11");
    expect(doc).toBeDefined();
    const formulas = doc!.sections.flatMap((s) =>
      s.blocks.filter((b) => b.type === "formula"),
    );
    expect(formulas.length).toBeGreaterThanOrEqual(4);
    const latex = formulas.map((f) => (f.type === "formula" ? f.latex : "")).join("\n");
    expect(latex).toMatch(/Win Rate|Profit Factor|Expectancy|Recovery/);
  });
});
