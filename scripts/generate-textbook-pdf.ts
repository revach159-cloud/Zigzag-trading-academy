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

/** Concept diagrams for PDF — communicate methodology visually (not decoration). */
function sceneDiagram(scene: string): string {
  switch (scene) {
    case "zigzag":
      return `<figure class="diagram" aria-label="תנועת שוק בזיגזג">
        <svg viewBox="0 0 420 110" width="360" height="94" dir="ltr">
          <line x1="24" y1="55" x2="396" y2="55" stroke="rgba(143,160,184,0.35)" stroke-width="1.5" stroke-dasharray="4 5"/>
          <polyline fill="none" stroke="#2EE6FF" stroke-width="3.2" points="24,88 90,22 150,72 210,18 270,68 330,28 396,62"/>
          <circle cx="90" cy="22" r="5" fill="#C9A84C"/><circle cx="210" cy="18" r="5" fill="#C9A84C"/>
          <circle cx="150" cy="72" r="4.5" fill="#2EE6FF"/><circle cx="270" cy="68" r="4.5" fill="#2EE6FF"/>
        </svg>
        <figcaption class="diagram-cap">תנועה בזיגזג — לא קו ישר של רדיפה</figcaption>
      </figure>`;
    case "traffic-light":
      return `<figure class="diagram" aria-label="רמזור ניהול">
        <svg viewBox="0 0 200 140" width="140" height="98" dir="ltr">
          <rect x="70" y="8" width="60" height="124" rx="8" fill="#0B1528" stroke="rgba(46,230,255,0.25)"/>
          <circle cx="100" cy="36" r="14" fill="#3DDC97"/><circle cx="100" cy="70" r="14" fill="#F5C542"/><circle cx="100" cy="104" r="14" fill="#F07178"/>
        </svg>
        <figcaption class="diagram-cap">רמזור ניהול — ירוק ×1 · צהוב ×10 · אדום מרבי</figcaption>
      </figure>`;
    case "improvement":
      return `<figure class="diagram" aria-label="השבחת פוזיציה">
        <svg viewBox="0 0 320 120" width="280" height="105" dir="ltr">
          <rect x="40" y="78" width="240" height="22" rx="3" fill="rgba(14,111,134,0.85)"/>
          <rect x="70" y="48" width="180" height="22" rx="3" fill="rgba(46,230,255,0.55)"/>
          <rect x="105" y="18" width="110" height="22" rx="3" fill="rgba(201,168,76,0.7)"/>
          <line x1="160" y1="100" x2="160" y2="18" stroke="rgba(46,230,255,0.35)" stroke-width="1.5"/>
        </svg>
        <figcaption class="diagram-cap">פיתוח פוזיציה בשכבות — חיזוק מדורג, לא קפיצה עיוורת</figcaption>
      </figure>`;
    case "realize-75":
      return `<figure class="diagram" aria-label="מימוש 75%">
        <svg viewBox="0 0 360 100" width="320" height="88" dir="ltr">
          <rect x="20" y="28" width="240" height="44" rx="4" fill="rgba(46,230,255,0.45)"/>
          <text x="140" y="56" text-anchor="middle" fill="#E8EEF8" font-family="Rubik,sans-serif" font-size="16" font-weight="600">75%</text>
          <rect x="270" y="40" width="70" height="32" rx="4" fill="rgba(201,168,76,0.55)"/>
          <text x="305" y="61" text-anchor="middle" fill="#E8EEF8" font-family="Rubik,sans-serif" font-size="13" font-weight="500">25%</text>
        </svg>
        <figcaption class="diagram-cap">מימוש = סגירת 75% מהכמות הנותרת · נשארים 25%</figcaption>
      </figure>`;
    case "return-balance":
      return `<figure class="diagram" aria-label="חזרה לאיזון">
        <svg viewBox="0 0 320 110" width="280" height="96" dir="ltr">
          <path d="M40 78 A100 70 0 0 1 280 78" fill="none" stroke="#2EE6FF" stroke-width="3"/>
          <circle cx="280" cy="78" r="7" fill="#C9A84C"/>
          <rect x="148" y="68" width="24" height="24" rx="3" fill="rgba(46,230,255,0.35)" stroke="#2EE6FF"/>
          <text x="160" y="85" text-anchor="middle" fill="#E8EEF8" font-family="IBM Plex Mono,monospace" font-size="11">×1</text>
        </svg>
        <figcaption class="diagram-cap">חזרה לאיזון ×1 — קנה מידה שקט אחרי המסע</figcaption>
      </figure>`;
    case "cover":
      return `<figure class="diagram" aria-label="שער המסע">
        <svg viewBox="0 0 200 110" width="160" height="88" dir="ltr">
          <polygon points="100,12 168,52 142,98 58,98 32,52" fill="none" stroke="#2EE6FF" stroke-width="2"/>
          <circle cx="100" cy="58" r="22" fill="rgba(201,168,76,0.45)" stroke="#C9A84C"/>
        </svg>
        <figcaption class="diagram-cap">שער המסע — כניסה לשפת הזיגזג</figcaption>
      </figure>`;
    default:
      return "";
  }
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

      const diagram = sceneDiagram(chapter.scene);

      return `<article class="chapter" id="ch-${chapter.number}">
        <header class="chapter-open">
          <p class="eyebrow">${escapeHtml(chapter.stationHe)}</p>
          <h2>${escapeHtml(chapter.titleHe)}</h2>
          <p class="en" dir="ltr">${escapeHtml(chapter.titleEn)}</p>
          <p class="lede">${rich(chapter.summaryHe)}</p>
        </header>
        ${diagram}
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
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
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
      font-weight: 400;
      font-size: 12.5pt;
      line-height: 1.95;
      background: var(--void);
    }
    p { margin: 0 0 0.95em; }
    ul, ol { margin: 0 0 1.1em; padding-inline-start: 1.2em; line-height: 1.95; }
    li { margin-bottom: 0.45em; }
    .ltr { unicode-bidi: isolate; direction: ltr; }
    h1, h2, h3, h4 {
      font-family: "Rubik", sans-serif;
      page-break-after: avoid;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    h2 { font-size: 22pt; line-height: 1.3; margin: 0 0 0.35em; }
    h3 { font-size: 14.5pt; font-weight: 600; margin: 1.4em 0 0.55em; line-height: 1.4; }
    h4 { font-size: 12.5pt; font-weight: 600; margin: 0.9em 0 0.4em; }
    a { color: var(--cyan); text-decoration: none; }
    .cover {
      min-height: 92vh;
      padding: 56px 36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      page-break-after: always;
      background:
        radial-gradient(ellipse at 18% 15%, rgba(46,230,255,0.16), transparent 42%),
        radial-gradient(ellipse at 85% 25%, rgba(201,168,76,0.1), transparent 40%),
        linear-gradient(160deg, #03050c 0%, #0a1224 48%, #070b16 100%);
    }
    .cover .brand {
      font-family: "Rubik", sans-serif;
      font-weight: 800;
      font-size: 42pt;
      letter-spacing: 0.12em;
      margin: 0;
      color: var(--ink);
    }
    .cover .book {
      font-family: "Rubik", sans-serif;
      font-weight: 700;
      color: var(--cyan);
      font-size: 20pt;
      margin-top: 14px;
      line-height: 1.35;
    }
    .cover .method {
      font-weight: 500;
      color: var(--gold);
      margin-top: 12px;
      letter-spacing: 0.04em;
      font-size: 12pt;
    }
    .cover .author-name {
      margin-top: 28px;
      font-family: "Rubik", sans-serif;
      font-weight: 500;
      font-size: 14pt;
      color: var(--gold);
      letter-spacing: 0.04em;
    }
    .cover .author-credit {
      margin-top: 4px;
      font-family: "Rubik", sans-serif;
      font-weight: 400;
      font-size: 11pt;
      color: rgba(46, 230, 255, 0.88);
    }
    .cover .tag {
      margin-top: 28px;
      max-width: 32em;
      color: var(--muted);
      font-size: 13pt;
      font-weight: 400;
      line-height: 1.9;
    }
    .disclaimer {
      margin-top: 40px;
      padding: 18px 16px;
      border-right: 2px solid var(--gold);
      background: rgba(16,26,46,0.55);
      font-size: 10.5pt;
      font-weight: 400;
      line-height: 1.75;
      color: var(--muted);
    }
    .toc {
      page-break-after: always;
      padding: 36px 4px;
      background: var(--void);
    }
    .toc h2 { color: var(--ink); font-weight: 700; }
    .toc ol { line-height: 2.2; color: var(--muted); font-weight: 400; font-size: 12pt; }
    .chapter { page-break-before: always; }
    .chapter-open {
      padding: 28px 0 24px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 28px;
      background:
        radial-gradient(ellipse at 90% 0%, rgba(46,230,255,0.1), transparent 48%);
    }
    .chapter-open .lede {
      margin-top: 14px;
      max-width: 34em;
      font-size: 12.5pt;
      line-height: 1.9;
      color: var(--muted);
    }
    .eyebrow {
      color: var(--cyan);
      letter-spacing: 0.14em;
      font-size: 10.5pt;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .en { color: var(--muted); font-size: 11pt; font-weight: 500; margin-top: 6px; }
    blockquote.story {
      margin: 0 0 22px;
      padding: 4px 0 4px 0;
      border: none;
      border-right: 2px solid var(--cyan);
      padding-right: 16px;
      background: transparent;
      font-family: "Rubik", sans-serif;
      font-weight: 400;
      font-size: 13pt;
      line-height: 2.05;
      color: var(--ink);
    }
    .principle {
      margin: 18px 0 28px;
      padding-block: 14px;
      border-block: 1px solid rgba(46,230,255,0.28);
      color: var(--cyan);
      font-family: "Rubik", sans-serif;
      font-weight: 500;
      font-size: 12.5pt;
      line-height: 1.85;
    }
    .insight {
      margin: 28px 0;
      padding: 18px 18px;
      border-right: 2px solid var(--gold);
      background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(16,26,46,0.35));
      page-break-inside: avoid;
      font-family: "Rubik", sans-serif;
      font-weight: 700;
      font-size: 13pt;
      line-height: 1.75;
    }
    .formula {
      margin: 20px 0;
      padding: 14px 14px;
      border-block: 1px solid var(--line);
      background: rgba(16,26,46,0.45);
      page-break-inside: avoid;
    }
    .formula-row { display: flex; align-items: flex-start; gap: 12px; }
    .katex-host { flex: 1; text-align: center; overflow-x: auto; color: #e8eef8; }
    .katex { color: #e8eef8 !important; }
    .formula-num { font-family: "IBM Plex Mono", monospace; color: var(--gold); }
    figcaption { text-align: center; color: var(--muted); font-size: 11pt; margin-top: 8px; line-height: 1.55; }
    .table-wrap { margin: 20px 0; page-break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; font-size: 11pt; table-layout: fixed; word-wrap: break-word; line-height: 1.55; }
    th, td { border-bottom: 1px solid var(--line); padding: 10px 10px; vertical-align: top; text-align: right; }
    th { color: var(--cyan); font-weight: 600; }
    caption { caption-side: top; text-align: right; color: var(--muted); margin-bottom: 8px; font-size: 11pt; }
    .callout {
      margin: 18px 0;
      padding: 12px 0;
      padding-right: 14px;
      border: none;
      border-right: 2px solid var(--line);
      background: transparent;
      page-break-inside: avoid;
      font-size: 12pt;
      line-height: 1.85;
    }
    .callout.warning { border-right-color: #f07178; }
    .callout.definition, .callout.insight { border-right-color: var(--cyan); }
    .callout.unresolved, .callout.awaiting { border-right-color: var(--gold); }
    .example, .gloss {
      margin: 18px 0;
      padding: 14px 0;
      padding-right: 14px;
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
    .visual-cap { color: var(--muted); font-size: 11pt; line-height: 1.6; }
    .diagram {
      margin: 18px 0 22px;
      padding: 16px 14px;
      border-block: 1px solid var(--line);
      background: rgba(16,26,46,0.4);
      page-break-inside: avoid;
    }
    .diagram svg { display: block; margin: 0 auto; max-width: 100%; }
    .diagram-cap {
      margin: 10px 0 0;
      text-align: center;
      color: var(--muted);
      font-size: 11pt;
    }
    @page { size: A4; margin: 22mm 18mm 22mm 18mm; }
  </style>
</head>
<body>
  <section class="cover">
    <p class="eyebrow">Digital narrative book · Simulation only</p>
    <h1 class="brand">${escapeHtml(brand.name)}</h1>
    <p class="book">${escapeHtml(brand.bookTitleHe)}</p>
    <p class="method">${escapeHtml(brand.methodHe)} · ${escapeHtml(brand.narrativeConceptHe)}</p>
    <p class="author-name">${escapeHtml(brand.authorHe)}</p>
    <p class="author-credit">${escapeHtml(brand.authorCreditHe)}</p>
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
        <div style="width:100%;font-size:9px;color:#8fa0b8;padding:0 18mm;display:flex;justify-content:space-between;font-family:Rubik,sans-serif;direction:rtl;background:transparent;">
          <span>ZIGZAG · LOOKBACK</span>
          <span>סימולציה בלבד</span>
        </div>`,
      footerTemplate: `
        <div style="width:100%;font-size:9px;color:#8fa0b8;padding:0 18mm;display:flex;justify-content:space-between;font-family:Rubik,sans-serif;direction:rtl;background:transparent;">
          <span>השבחת העסקה · לא מסחר אמיתי</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
      margin: { top: "22mm", bottom: "22mm", left: "18mm", right: "18mm" },
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
