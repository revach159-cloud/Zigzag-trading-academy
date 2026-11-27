import { describe, expect, it } from "vitest";
import {
  initialEntryUsd,
  tradeBudgetUsd,
  tradeBudgetModel,
  zigzagAssumptions,
} from "@/lib/math/assumptions";

describe("zigzag methodology assumptions", () => {
  it("marks methodology as owner-confirmed", () => {
    expect(zigzagAssumptions.status).toBe("owner_confirmed");
  });

  it("keeps approved educational defaults", () => {
    expect(zigzagAssumptions.adverseMoveIntervalPct).toBe(10);
    expect(zigzagAssumptions.ladderReference).toBe("original_reference_price");
    expect(zigzagAssumptions.ladderActivation).toBe("touch");
    expect(zigzagAssumptions.direction).toBe("long_only");
    expect(zigzagAssumptions.shortEnabled).toBe(false);
    expect(zigzagAssumptions.defaultExampleTradeBudgetUsd).toBe(256);
    expect(zigzagAssumptions.capPolicy).toBe("reject");
    expect(zigzagAssumptions.stage1ToStage10Transition).toBe("budget_cap_based");
    expect(zigzagAssumptions.stage1ToStage10PreservesQuantity).toBe(true);
    expect(zigzagAssumptions.stage10ToStage1Transition).toBe(
      "after_profit_realization_and_size_reduction_subject_to_margin_collateral",
    );
    expect(zigzagAssumptions.leverageTransitionsAreSeparateProcesses).toBe(true);
    expect(zigzagAssumptions.profitRealization.mode).toBe("close_quantity_pct");
    expect(zigzagAssumptions.profitRealization.pct).toBe(75);
    expect(zigzagAssumptions.fees.roundTripBps).toBe(2);
    expect(zigzagAssumptions.fees.slippageBpsPerSide).toBe(1);
    expect(zigzagAssumptions.fees.funding).toBe(0);
    expect(zigzagAssumptions.maxInstrumentLeverage).toBeNull();
    expect(zigzagAssumptions.gradedRandomness).toBe("seeded_deterministic");
    expect(zigzagAssumptions.illustrativePatternTotalUsd).toBe(320);
  });

  it("uses portfolio-scaled trade budget (not a fixed $250 global cap)", () => {
    expect(tradeBudgetModel.budgetMultiplier).toBe(51.2);
    expect(initialEntryUsd(100_000)).toBe(50);
    expect(tradeBudgetUsd(100_000)).toBe(2_560);
    expect(initialEntryUsd(10_000)).toBe(5);
    expect(tradeBudgetUsd(10_000)).toBe(256);
    expect(initialEntryUsd(5_000)).toBe(25); // 0.5% below $10k
    expect(tradeBudgetUsd(5_000)).toBe(1_280);
    expect(zigzagAssumptions.illustrativePatternTotalUsd).toBeGreaterThan(
      zigzagAssumptions.defaultExampleTradeBudgetUsd,
    );
    expect(zigzagAssumptions.illustrationVsCapNote).not.toMatch(
      /cap remains \$250/i,
    );
  });
});
