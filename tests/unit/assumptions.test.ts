import { describe, expect, it } from "vitest";
import { zigzagAssumptions } from "@/lib/math/assumptions";

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
    expect(zigzagAssumptions.perPositionMarginCapUsd).toBe(250);
    expect(zigzagAssumptions.capPolicy).toBe("reject");
    expect(zigzagAssumptions.stage1ToStage10Transition).toBe("budget_cap_based");
    expect(zigzagAssumptions.stage1ToStage10PreservesQuantity).toBe(true);
    expect(zigzagAssumptions.profitRealization.mode).toBe("close_quantity_pct");
    expect(zigzagAssumptions.profitRealization.pct).toBe(75);
    expect(zigzagAssumptions.fees.roundTripBps).toBe(2);
    expect(zigzagAssumptions.fees.slippageBpsPerSide).toBe(1);
    expect(zigzagAssumptions.fees.funding).toBe(0);
    expect(zigzagAssumptions.maxInstrumentLeverage).toBeNull();
    expect(zigzagAssumptions.gradedRandomness).toBe("seeded_deterministic");
    expect(zigzagAssumptions.illustrativePatternTotalUsd).toBe(320);
    expect(zigzagAssumptions.illustrativePatternTotalUsd).toBeGreaterThan(
      zigzagAssumptions.perPositionMarginCapUsd,
    );
  });
});
