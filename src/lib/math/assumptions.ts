/**
 * Approved ZigZag Method educational defaults
 * (owner-confirmed 2026-11-24; trade-budget & leverage revised 2026-11-27).
 * Simulation / education only. Exchange model: Bybit Linear USDT Perpetual,
 * Cross margin, One-Way. Decimal arithmetic: Decimal.js (engine Phase 4+).
 * Do not invent Bybit instrument parameters — mark unresolved when unknown.
 */

/** Portfolio-scaled trade budget — replaces any fixed $250 global Reject cap. */
export const tradeBudgetModel = {
  portfolioThresholdUsd: 10_000,
  /** Initial entry % of portfolio when portfolio < $10k */
  entryPctBelow10k: 0.5,
  /** Initial entry % of portfolio when portfolio ≥ $10k */
  entryPctAtOrAbove10k: 0.05,
  /** Trade budget before leverage-up = this × initial entry */
  budgetMultiplier: 51.2,
  examples: {
    portfolio100kUsd: 100_000,
    entry100kUsd: 50,
    budget100kUsd: 2_560,
    portfolio10kUsd: 10_000,
    entry10kUsd: 5,
    budget10kUsd: 256,
  },
} as const;

/** Initial entry dollars for a given illustrative portfolio size. */
export function initialEntryUsd(portfolioUsd: number): number {
  const pct =
    portfolioUsd < tradeBudgetModel.portfolioThresholdUsd
      ? tradeBudgetModel.entryPctBelow10k
      : tradeBudgetModel.entryPctAtOrAbove10k;
  return (portfolioUsd * pct) / 100;
}

/** Trade budget (Reject ceiling) before leverage-up for a portfolio size. */
export function tradeBudgetUsd(portfolioUsd: number): number {
  return initialEntryUsd(portfolioUsd) * tradeBudgetModel.budgetMultiplier;
}

export const zigzagAssumptions = {
  status: "owner_confirmed" as const,
  exchangeModel: "bybit_linear_usdt_perp" as const,
  marginMode: "cross" as const,
  positionMode: "one_way" as const,
  direction: "long_only" as const,
  shortEnabled: false,
  adverseMoveIntervalPct: 10,
  ladderReference: "original_reference_price" as const,
  ladderActivation: "touch" as const,
  reinforcementOptionalPerLevel: true,
  skippedLevelsRemainRecorded: true,
  reinforcementSizingMode: "cumulative_allocated_capital" as const,
  allocationBasis: "margin" as const,
  quantityRounding: "floor" as const,
  executionPriceRounding: "bybit_tick_conservative_adverse" as const,
  ladderThresholdExactDecimal: true,
  /**
   * No fixed global $250 Reject. Default pedagogical Reject ceiling uses the
   * $10k example trade budget ($256 = 51.2 × $5). Callers teaching other
   * portfolios must pass tradeBudgetUsd(portfolio) explicitly.
   */
  defaultExamplePortfolioUsd: tradeBudgetModel.examples.portfolio10kUsd,
  defaultExampleTradeBudgetUsd: tradeBudgetModel.examples.budget10kUsd,
  capPolicy: "reject" as const,
  /** ×1 → ×10 when ×1-stage trade-budget ceiling is reached (not PnL trigger). */
  stage1ToStage10Transition: "budget_cap_based" as const,
  stage1ToStage10PreservesQuantity: true,
  /**
   * ×10 → ×1 is a separate process after profit realization + size reduction,
   * subject to margin/collateral — not the reverse of the same ×1→×10 condition.
   */
  stage10ToStage1Transition:
    "after_profit_realization_and_size_reduction_subject_to_margin_collateral" as const,
  leverageTransitionsAreSeparateProcesses: true,
  stage10ReinforcementTrigger: "net_loss_ge_relevant_allocated_margin" as const,
  maxLeverageSource: "verified_bybit_instrument_only" as const,
  maxInstrumentLeverage: null as number | null, // unresolved until verified per instrument
  profitRealization: {
    mode: "close_quantity_pct" as const,
    pct: 75,
    remainingPct: 25,
    activation: "manual" as const,
    repeatableOnRemaining: true,
  },
  fees: {
    roundTripBps: 2,
    funding: 0,
    slippageBpsPerSide: 1,
  },
  thresholdEpsilon: 0,
  gradedRandomness: "seeded_deterministic" as const,
  /**
   * Illustrative doubling pattern $5→$5→$10→$20→$40→$80→$160 (= $320)
   * is pedagogy-only for shape. Apply Reject against portfolio-scaled budget
   * (e.g. $256 on $10k; $2,560 on $100k) — never a fixed $250 global cap.
   */
  illustrativeReinforcementPatternUsd: [5, 5, 10, 20, 40, 80, 160] as const,
  illustrativePatternTotalUsd: 320 as const,
  illustrationVsCapNote:
    "Pattern total $320 illustrates doubling only; Reject uses portfolio-scaled trade budget (51.2 × initial entry), e.g. $256 on $10k or $2,560 on $100k — not a fixed $250 global cap.",
  tradeBudgetModel,
} as const;

export type ZigzagAssumptions = typeof zigzagAssumptions;
