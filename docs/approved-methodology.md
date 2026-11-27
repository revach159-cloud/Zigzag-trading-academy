# Approved ZigZag Methodology (owner-confirmed 2026-11-24; budget & leverage revised 2026-11-27)

Simulation / education only. Exchange model: **Bybit Linear USDT Perpetual**, Cross margin, One-Way. Decimal arithmetic: **Decimal.js**.

## Direction & ladder
- Long-only; Short disabled.
- 10% adverse ladder from **original reference price**.
- Ladder activation on **Touch**.
- Reinforcement optional per level; skipped levels remain recorded.
- Reinforcement **ratio ladder / doubling shape** unchanged (illustrative pattern still pedagogy-only).

## Portfolio-scaled trade budget (replaces fixed $250 global Reject cap)
There is **no** fixed dollar Reject ceiling that applies as a universal cap for every portfolio.

**Initial entry** (first layer of trade budget thinking):
- Portfolio **below $10k**: initial entry = **0.5%** of portfolio.
- Portfolio **$10k and above**: initial entry = **0.05%** of portfolio.

**Trade budget before leverage-up** = **51.2 × initial entry**.  
Reject applies when the next reinforcement would exceed **that** portfolio-scaled trade budget — not a hard-coded $250.

**Anchored examples (owner):**
| Portfolio | Initial entry | Trade budget (51.2×) |
|-----------|---------------|----------------------|
| $100,000  | $50           | **$2,560**           |
| $10,000   | $5            | **$256**             |

Do **not** invent a new fixed dollar global cap. Do **not** treat legacy “$250 Reject” wording as the general ceiling. If $250 appears near a $10k illustration, reconcile it explicitly to the scaled **$256** budget (near-cap illustration only).

## ×1 stage
- Sizing: cumulative allocated capital (margin basis).
- Per-position Reject vs **portfolio-scaled trade budget** (above).
- ×1 → ×10 transition: **budget-cap based** (when reaching the trade-budget ceiling defined for the ×1 stage); **not** a PnL-loss trigger.
- Transition **preserves existing position quantity**.
- Allocation basis: **Margin**.
- Quantity: execution price; rounding **Floor**.
- Execution price rounding: Bybit tick size, **conservative/adverse**.
- Ladder threshold calculations: exact Decimal (not rounded).

## ×10 stage
- Reinforcement when **net loss ≥ relevant allocated margin**.
- Sizing: cumulative; aggregate margin still subject to the **same portfolio-scaled trade budget** Reject.
- When next ×10 reinforcement rejected by that budget → automatic transition to **maximum instrument leverage** (from verified Bybit instrument data only; do not invent).
- Max-leverage stage: same portfolio-scaled budget discipline; sizing cumulative.

## Two separate leverage processes (not ×1↔×10)
1. **×1 → ×10** — when reaching the trade-budget ceiling defined for the ×1 stage (quantity preserved).
2. **×10 → ×1** — **after** profit realization and size reduction, **subject to margin/collateral conditions**.

These are **not** an automatic bidirectional same-condition toggle. Keep field separation: **leverage ≠ position size ≠ margin ≠ collateral**. Never promise that a leverage change auto-releases collateral or prevents liquidation.

## Profit realization
- Close **75% of open quantity** (remaining 25%).
- Manual activation; repeated: 75% of remaining each time.

## Costs
- Fees: **2 bps round-trip**, modeled once at close.
- Slippage: **1 bp per side**.
- Funding: **0** in basic sims; when enabled, apply before threshold checks.
- Threshold epsilon: **0**.

## Pedagogy constraints
- Do not claim leverage change guarantees capital withdrawal or prevents liquidation.
- Distinguish allocated margin, notional exposure, available collateral, exchange liquidation.
- Prefer terms: **תקציב העסקה**, **גודל העסקה**, **השבחת העסקה**. Forbidden: **מסלול**.
- No fabricated performance, win rates, backtests, or guaranteed returns.

## Illustrative reinforcement pattern (shape only)
- Illustrative doubling pattern: `$5 → $5 → $10 → $20 → $40 → $80 → $160` (sum **$320**).
- Under a **$10k** example, trade budget is **$256** — the $320 shape exceeds that budget; Reject when the next layer would breach **$256**.
- Under a **$100k** example, trade budget is **$2,560** — the $320 shape fits under budget as a shape drill only.
- Do **not** silently replace the scaled budget with $320 or with a fixed $250. Teach the pattern as shape-only; apply Reject against the portfolio-scaled trade budget.
- XRP case studies are educational illustrations — recalculate vs contract size / quantity and the scaled budget; do not treat illustrative totals as executable fills.
