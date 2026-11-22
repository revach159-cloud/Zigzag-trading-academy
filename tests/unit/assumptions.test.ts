import { describe, expect, it } from "vitest";
import { zigzagAssumptions } from "@/lib/math/assumptions";

describe("zigzag methodology assumptions", () => {
  it("marks draft assumptions as awaiting owner confirmation", () => {
    expect(zigzagAssumptions.status).toBe("awaiting_owner_confirmation");
  });

  it("keeps educational defaults within proposed bounds", () => {
    expect(zigzagAssumptions.adverseMoveIntervalPct).toBe(10);
    expect(zigzagAssumptions.maxEducationalLeverage).toBe(10);
    expect(zigzagAssumptions.profitRealizationPct).toBe(75);
    expect(zigzagAssumptions.fees.roundTripBps).toBe(2);
    expect(zigzagAssumptions.gradedRandomness).toBe("seeded_deterministic");
  });
});
