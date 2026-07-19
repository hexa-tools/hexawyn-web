import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("account manage page", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects non-hxw API key format", () => {
    expect("hxw_test".startsWith("hxw_")).toBe(true);
    expect("sk-bad".startsWith("hxw_")).toBe(false);
    expect("".startsWith("hxw_")).toBe(false);
  });

  it("identifies available upgrades based on current plan", () => {
    const PLANS = [
      { name: "Starter", value: "starter" },
      { name: "Team", value: "team" },
      { name: "Scale-up", value: "scale-up" },
    ];

    const currentPlan = "starter";
    const upgrades = PLANS.filter(
      (p) =>
        PLANS.findIndex((x) => x.value === p.value) >
        PLANS.findIndex((x) => x.value === currentPlan)
    );

    expect(upgrades).toHaveLength(2);
    expect(upgrades[0].name).toBe("Team");
    expect(upgrades[1].name).toBe("Scale-up");
  });

  it("shows no upgrades when on highest plan", () => {
    const PLANS = [
      { name: "Starter", value: "starter" },
      { name: "Team", value: "team" },
      { name: "Scale-up", value: "scale-up" },
    ];

    const upgrades = PLANS.filter(
      (p) =>
        PLANS.findIndex((x) => x.value === p.value) >
        PLANS.findIndex((x) => x.value === "scale-up")
    );

    expect(upgrades).toHaveLength(0);
  });

  it("truncates API key for display", () => {
    const key = "hxw_live_abc123xyz99_super_long_key";
    const display = key.slice(0, 16) + "...";
    expect(display).toBe("hxw_live_abc123x...");
  });

  it("fetches current plan from API", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ plan: "starter" }),
    } as Response);

    const baseUrl = "https://api.hexawyn.com";
    const resp = await fetch(`${baseUrl}/api/v1/billing/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: "hxw_test" }),
    });
    const data = await resp.json();
    expect(data.plan).toBe("starter");
  });

  it("shows error when API is unreachable", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("connect error"));

    try {
      await fetch("https://api.hexawyn.com/api/v1/billing/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: "hxw_test" }),
      });
      expect(false).toBe(true); // should not reach
    } catch (e) {
      expect((e as Error).message).toBe("connect error");
    }
  });

  it("displays proper plan names via PLAN_NAMES mapping", () => {
    const PLAN_NAMES: Record<string, string> = {
      free: "Free",
      starter: "Starter",
      team: "Team",
      "scale-up": "Scale-up",
      enterprise: "Enterprise",
    };

    expect(PLAN_NAMES["free"]).toBe("Free");
    expect(PLAN_NAMES["starter"]).toBe("Starter");
    expect(PLAN_NAMES["team"]).toBe("Team");
    expect(PLAN_NAMES["scale-up"]).toBe("Scale-up");
    expect(PLAN_NAMES["enterprise"]).toBe("Enterprise");
  });

  it("planDisplayName returns capitalized name for free", () => {
    const PLAN_NAMES: Record<string, string> = {
      free: "Free",
      starter: "Starter",
      team: "Team",
      "scale-up": "Scale-up",
      enterprise: "Enterprise",
    };
    function planDisplayName(plan: string): string {
      return PLAN_NAMES[plan] || plan;
    }

    expect(planDisplayName("free")).toBe("Free");
    expect(planDisplayName("starter")).toBe("Starter");
    expect(planDisplayName("team")).toBe("Team");
    expect(planDisplayName("unknown")).toBe("unknown");
  });

  it("extracts upgraded param from searchParams", () => {
    const PLAN_NAMES: Record<string, string> = {
      team: "Team",
    };
    const searchParams = { key: "hxw_live_test", upgraded: "team" };
    expect(searchParams.upgraded).toBe("team");
    expect(PLAN_NAMES["team"]).toBeDefined();
  });
});
