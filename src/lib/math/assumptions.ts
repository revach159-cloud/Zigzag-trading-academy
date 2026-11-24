/**
 * Approved ZigZag Method educational defaults (owner-confirmed 2026-11-24).
 * Simulation / education only. Exchange model: Bybit Linear USDT Perpetual,
 * Cross margin, One-Way. Decimal arithmetic: Decimal.js (engine Phase 4+).
 * Do not invent Bybit instrument parameters — mark unresolved when unknown.
 */
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
  perPositionMarginCapUsd: 250,
  capPolicy: "reject" as const,
  stage1ToStage10Transition: "budget_cap_based" as const,
  stage1ToStage10PreservesQuantity: true,
  stage10ReinforcementTrigger: "net_loss_ge_relevant_allocated_margin" as const,
  stage10AggregateMarginCapUsd: 250,
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
} as const;

export type ZigzagAssumptions = typeof zigzagAssumptions;
