/**
 * Draft ZigZag Method educational defaults.
 * AWAITING OWNER CONFIRMATION — do not invent additional methodology rules.
 * Used later by the pure math engine (Phase 4); UI must not treat these as live trading params.
 */
export const zigzagAssumptions = {
  status: "awaiting_owner_confirmation" as const,
  reinforcementSizingMode: "cumulative_allocated_capital" as const,
  adverseMoveIntervalPct: 10,
  tenXThreshold: "loss_equals_100pct_of_latest_reinforcement" as const,
  maxEducationalLeverage: 10,
  profitRealizationPct: 75,
  fees: {
    roundTripBps: 2,
    funding: 0,
    slippageBpsPerSide: 1,
  },
  gradedRandomness: "seeded_deterministic" as const,
} as const;

export type ZigzagAssumptions = typeof zigzagAssumptions;
