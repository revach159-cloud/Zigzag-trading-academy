# ZIGZAG TRADING ACADEMY

Independent Hebrew-first (RTL) interactive trading **education** platform for the ZigZag Method.

**Simulation only** — no real trading, deposits, brokerage APIs, or fabricated performance.

## Stack

- Next.js App Router · React · TypeScript strict · Tailwind CSS
- Framer Motion · R3F/Drei (lazy 3D with 2D / reduced-motion fallback)
- Zod content schemas · Vitest

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run build
```

## Product constraints

- Dedicated repository — **not** nested under Polymarket Edge Lab
- Independent Vercel project — no Edge Lab cron schedules in this repo
- Methodology math defaults are drafts awaiting owner confirmation

## Routes (Phase 1–2)

| Path | Purpose |
|------|---------|
| `/` | Premium brand-first landing |
| `/method` | ZigZag Method stub + draft assumptions |
| `/textbook` | 12-chapter outline index |
| `/textbook/[slug]` | Chapter outline stubs |
| `/simulator` | Strategy simulator placeholder |
| `/labs/leverage` · `/labs/risk` | Lab stubs |
| `/tests` | Knowledge tests placeholder |
