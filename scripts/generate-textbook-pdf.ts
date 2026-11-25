/**
 * Generate A4 Hebrew RTL LOOKBACK narrative PDF from the same chapter
 * source modules used by the digital reader — no divergent content copy.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";
import { chromium } from "playwright";
import { chapterCatalog, listChapters } from "../src/lib/content/chapters";
import { getChapterBodyBySlug } from "../src/lib/content/bodies";
import { listGlossaryEntries } from "../src/lib/content/glossary";
import { brand } from "../src/lib/design/tokens";
import type { ContentBlock } from "../src/lib/content/schemas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "downloads");
const outFile = path.join(outDir, "zigzag-academy-textbook.pdf");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rich(text: string): string {
  return escapeHtml(text).replace(
    /`([^`]+)`/g,
    '<code dir="ltr" class="ltr">$1</code>',
  );
}

function renderFormula(latex: string, number: number, captionHe: string): string {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: true,
    strict: "ignore",
  });
  return `<figure class="formula">
    <div class="formula-row">
      <div class="katex-host" dir="ltr">${html}</div>
      <span class="formula-num" dir="ltr">(${number})</span>
    </div>
    <figcaption>נוסחה ${number}. ${rich(captionHe)}</figcaption>
  </figure>`;
}

function renderBlocks(
  blocks: ContentBlock[],
  formulaStart: number,
): { html: string; next: number } {
  let n = formulaStart;
  const parts: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        parts.push(`<p>${rich(block.textHe)}</p>`);
        break;
      case "list":
        parts.push(
          `<ul>${block.itemsHe.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`,
        );
        break;
      case "formula": {
        const num = n++;
        parts.push(renderFormula(block.latex, num, block.captionHe));
        break;
      }
      case "table":
        parts.push(`<figure class="table-wrap">
          <table>
            <caption>${rich(block.captionHe)}</caption>
            <thead><tr>${block.headersHe.map((h) => `<th>${rich(h)}</th>`).join("")}</tr></thead>
            <tbody>${block.rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${rich(cell)}</td>`).join("")}</tr>`,
              )
              .join("")}</tbody>
          </table>
        </figure>`);
        break;
      case "callout":
        parts.push(`<aside class="callout ${block.tone}">
          <strong>${rich(block.titleHe)}</strong>
          <p>${rich(block.textHe)}</p>
        </aside>`);
        break;
      case "visual":
        parts.push(
          `<p class="visual-cap"><em>איור: ${rich(block.captionHe)}</em></p>`,
        );
        break;
    }
  }
  return { html: parts.join("\n"), next: n };
}

function buildHtml(): string {
  const chapters = listChapters();
  const glossary = listGlossaryEntries();

  const tocItems = chapters
    .map(
      (ch) =>
        `<li><a href="#ch-${ch.number}">${escapeHtml(ch.stationHe)} — ${escapeHtml(ch.titleHe)}</a></li>`,
    )
    .concat([`<li><a href="#glossary">נספח · מילון מונחים מורחב</a></li>`])
    .join("\n");

  let formulaGlobal = 1;
  const chapterHtml = chapters
    .map((chapter) => {
      const body = getChapterBodyBySlug(chapter.slug);
      if (!body) throw new Error(`Missing body for ${chapter.slug}`);

      const sectionParts: string[] = [];
      for (const section of body.sections) {
        const rendered = renderBlocks(section.blocks, formulaGlobal);
        formulaGlobal = rendered.next;
        sectionParts.push(`<section>
          <h3>${escapeHtml(section.titleHe)}</h3>
          ${rendered.html}
        </section>`);
      }

      const examples =
        body.workedExamples.length === 0
          ? ""
          : `<h3>דוגמאות מספריות</h3>${body.workedExamples
              .map(
                (ex) => `<div class="example">
          <h4>${escapeHtml(ex.titleHe)}</h4>
          <p>${rich(ex.setupHe)}</p>
          <ol>${ex.stepsHe.map((s) => `<li>${rich(s)}</li>`).join("")}</ol>
          <p><strong>תוצאה:</strong> ${rich(ex.resultHe)}</p>
        </div>`,
              )
              .join("\n")}`;

      const reflections =
        body.reflections.length === 0
          ? ""
          : `<h3>שאלות להרהור</h3><ol>${body.reflections
              .map(
                (ex, i) =>
                  `<li><strong>${i + 1}.</strong> ${rich(ex.promptHe)}${
                    ex.hintHe ? ` <em>(רמז: ${rich(ex.hintHe)})</em>` : ""
                  }</li>`,
              )
              .join("")}</ol>`;

      const summary = body.chapterSummaryHe
        .map((s) => `<li>${rich(s)}</li>`)
        .join("");

      return `<article class="chapter" id="ch-${chapter.number}">
        <header class="chapter-open">
          <p class="eyebrow">${escapeHtml(chapter.stationHe)}</p>
          <h2>${escapeHtml(chapter.titleHe)}</h2>
          <p class="en" dir="ltr">${escapeHtml(chapter.titleEn)}</p>
          <p>${rich(chapter.summaryHe)}</p>
        </header>
        <blockquote class="story">${rich(body.openingStoryHe)}</blockquote>
        <p class="principle"><strong>עיקרון:</strong> ${rich(body.principleHe)}</p>
        <h3>מה לוקחים מהתחנה</h3>
        <ul>${body.learningObjectivesHe.map((o) => `<li>${rich(o)}</li>`).join("")}</ul>
        ${sectionParts.join("\n")}
        ${examples}
        ${reflections}
        <aside class="insight"><strong>תובנה לזכור.</strong> ${rich(body.memorableInsightHe)}</aside>
        <h3>סיכום התחנה</h3>
        <ul>${summary}</ul>
      </article>`;
    })
    .join("\n");

  const glossaryHtml = glossary
    .map(
      (e) => `<div class="gloss">
      <h4>${escapeHtml(e.termHe)} <span dir="ltr" class="en">${escapeHtml(e.termEn)}</span></h4>
      <p>${rich(e.definitionHe)}</p>
    </div>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(brand.bookTitleHe)} — ${escapeHtml(brand.fullName)}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@600;700&family=Rubik:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --void: #03050c;
      --ink: #e8eef8;
      --muted: #8fa0b8;
      --line: rgba(125, 211, 252, 0.22);
      --cyan: #2ee6ff;
      --gold: #c9a84c;
      --panel: #101a2e;
      --navy: #0b1528;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      font-family: "Rubik", sans-serif;
      font-size: 11pt;
      line-height: 1.75;
      background: var(--void);
    }
    .ltr { unicode-bidi: isolate; direction: ltr; }
    h1, h2, h3, h4 {
      font-family: "Frank Ruhl Libre", "Outfit", "Rubik", serif;
      page-break-after: avoid;
      font-weight: 500;
    }
    a { color: var(--cyan); text-decoration: none; }
    .cover {
      min-height: 92vh;
      padding: 48px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      page-break-after: always;
      background:
        radial-gradient(ellipse at 18% 15%, rgba(46,230,255,0.16), transparent 42%),
        radial-gradient(ellipse at 85% 25%, rgba(201,168,76,0.1), transparent 40%),
        linear-gradient(160deg, #03050c 0%, #0a1224 48%, #070b16 100%);
      border: 1px solid var(--line);
    }
    .cover .brand {
      font-family: "Outfit", sans-serif;
      font-size: 40pt;
      letter-spacing: 0.14em;
      margin: 0;
      color: var(--ink);
    }
    .cover .book {
      font-family: "Frank Ruhl Libre", serif;
      color: var(--cyan);
      font-size: 20pt;
      margin-top: 12px;
    }
    .cover .method { color: var(--gold); margin-top: 10px; letter-spacing: 0.04em; }
    .cover .tag { margin-top: 24px; max-width: 34em; color: var(--muted); font-size: 12.5pt; line-height: 1.8; }
    .disclaimer {
      margin-top: 36px;
      padding: 16px;
      border-right: 2px solid var(--gold);
      background: rgba(16,26,46,0.55);
      font-size: 9.5pt;
      color: var(--muted);
    }
    .toc {
      page-break-after: always;
      padding: 28px 8px;
      background: var(--void);
    }
    .toc h2 { color: var(--ink); }
    .toc ol { line-height: 2.05; color: var(--muted); }
    .chapter { page-break-before: always; }
    .chapter-open {
      padding: 20px 0 18px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 20px;
      background:
        radial-gradient(ellipse at 90% 0%, rgba(46,230,255,0.08), transparent 45%);
    }
    .eyebrow { color: var(--cyan); letter-spacing: 0.16em; text-transform: uppercase; font-size: 9pt; }
    .en { color: var(--muted); font-size: 10pt; }
    blockquote.story {
      margin: 0 0 16px;
      padding: 0 0 0 0;
      border: none;
      border-right: 2px solid var(--cyan);
      padding-right: 14px;
      background: transparent;
      font-family: "Frank Ruhl Libre", "Rubik", serif;
      font-size: 12pt;
      line-height: 1.85;
      color: var(--ink);
    }
    .principle {
      margin: 12px 0 20px;
      padding-block: 10px;
      border-block: 1px solid rgba(46,230,255,0.28);
      color: var(--cyan);
      font-family: "Frank Ruhl Libre", serif;
    }
    .insight {
      margin: 18px 0;
      padding: 14px 16px;
      border-right: 2px solid var(--gold);
      background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(16,26,46,0.35));
      page-break-inside: avoid;
      font-family: "Frank Ruhl Libre", serif;
      font-size: 12pt;
    }
    .formula {
      margin: 14px 0;
      padding: 10px 12px;
      border-block: 1px solid var(--line);
      background: rgba(16,26,46,0.45);
      page-break-inside: avoid;
    }
    .formula-row { display: flex; align-items: flex-start; gap: 12px; }
    .katex-host { flex: 1; text-align: center; overflow-x: auto; color: #e8eef8; }
    .katex { color: #e8eef8 !important; }
    .formula-num { font-family: "IBM Plex Mono", monospace; color: var(--gold); }
    figcaption { text-align: center; color: var(--muted); font-size: 9.5pt; margin-top: 6px; }
    .table-wrap { margin: 14px 0; page-break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; font-size: 9.5pt; table-layout: fixed; word-wrap: break-word; }
    th, td { border-bottom: 1px solid var(--line); padding: 7px 8px; vertical-align: top; text-align: right; }
    th { color: var(--cyan); }
    caption { caption-side: top; text-align: right; color: var(--muted); margin-bottom: 6px; }
    .callout {
      margin: 12px 0;
      padding: 8px 0 8px 0;
      padding-right: 12px;
      border: none;
      border-right: 2px solid var(--line);
      background: transparent;
      page-break-inside: avoid;
    }
    .callout.warning { border-right-color: #f07178; }
    .callout.definition, .callout.insight { border-right-color: var(--cyan); }
    .callout.unresolved, .callout.awaiting { border-right-color: var(--gold); }
    .example, .gloss {
      margin: 12px 0;
      padding: 10px 0 10px 0;
      padding-right: 12px;
      border: none;
      border-right: 1px solid var(--line);
      page-break-inside: avoid;
    }
    code {
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.92em;
      background: rgba(46,230,255,0.08);
      color: var(--cyan);
      padding: 0 3px;
    }
    .visual-cap { color: var(--muted); font-size: 9.5pt; }
    @page { size: A4; margin: 18mm 14mm 18mm 14mm; }
  </style>
</head>
<body>
  <section class="cover">
    <p class="eyebrow">Digital narrative book · Simulation only</p>
    <h1 class="brand">${escapeHtml(brand.name)}</h1>
    <p class="book">${escapeHtml(brand.bookTitleHe)}</p>
    <p class="method">${escapeHtml(brand.methodHe)} · ${escapeHtml(brand.narrativeConceptHe)}</p>
    <p class="tag">${escapeHtml(brand.taglineHe)}</p>
    <p dir="ltr" class="en">${escapeHtml(brand.taglineEn)}</p>
    <p>${chapterCatalog.chapters.length} תחנות מסע נרטיבי — אותו מקור כמו בקורא הדיגיטלי.</p>
    <div class="disclaimer">
      <strong>הצהרה חינוכית.</strong>
      תוכן זה ללימוד וסימולציה בלבד (Bybit Linear USDT Perp, Cross, One-Way).
      אין ייעוץ השקעות, מסחר אמיתי או הבטחות תשואה.
      יש להבחין בין margin, notional, quantity, avg, PnL, collateral ו־liquidation.
      דפוס $320 איורי בלבד; תקרת מרג'ין מאושרת $250 · Reject.
    </div>
  </section>

  <nav class="toc" id="toc">
    <h2>תוכן עניינים</h2>
    <ol>${tocItems}</ol>
  </nav>

  ${chapterHtml}

  <section class="chapter" id="glossary">
    <header class="chapter-open">
      <p class="eyebrow">Appendix</p>
      <h2>מילון מונחים מורחב</h2>
    </header>
    ${glossaryHtml}
  </section>
</body>
</html>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const html = buildHtml();
  const htmlPath = path.join(outDir, "zigzag-academy-textbook.print.html");
  await writeFile(htmlPath, html, "utf8");

  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROME || "/usr/local/bin/google-chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.pdf({
      path: outFile,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width:100%;font-size:8px;color:#8fa0b8;padding:0 14mm;display:flex;justify-content:space-between;font-family:Rubik,sans-serif;direction:rtl;background:transparent;">
          <span>ZIGZAG · LOOKBACK</span>
          <span>סימולציה בלבד</span>
        </div>`,
      footerTemplate: `
        <div style="width:100%;font-size:8px;color:#8fa0b8;padding:0 14mm;display:flex;justify-content:space-between;font-family:Rubik,sans-serif;direction:rtl;background:transparent;">
          <span>השבחת העסקה · לא מסחר אמיתי</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
      margin: { top: "18mm", bottom: "18mm", left: "14mm", right: "14mm" },
    });
  } finally {
    await browser.close();
  }

  console.log(`Wrote ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
