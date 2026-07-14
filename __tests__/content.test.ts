import { describe, it, expect } from "vitest";
import {
  site,
  navLinks,
  heroBadges,
  reliability,
  useCases,
  pricingTiers,
  footerColumns,
  terminalDemo,
  trust,
} from "@/lib/content";

describe("site content", () => {
  it("exposes the required Polar essentials", () => {
    expect(site.contactEmail).toContain("@");
    expect(site.githubUrl).toMatch(/^https:\/\//);
    expect(site.installCommand).toBe("pip install hexawyn");
  });

  it("keeps navigation and hero badges non-empty", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    expect(heroBadges).toHaveLength(3);
  });

  it("splits reliability into an 80/20 deterministic engine", () => {
    const total = reliability.layers.reduce((sum, l) => sum + l.share, 0);
    expect(total).toBe(100);
    const deterministic = reliability.layers
      .filter((l) => l.deterministic)
      .reduce((sum, l) => sum + l.share, 0);
    expect(deterministic).toBe(80);
  });

  it("uses the up-to-date, verifiable numbers", () => {
    const values = trust.stats.map((s) => s.value);
    expect(values).toContain("6,500+");
    expect(values).toContain("97%");
  });

  it("ships the five pricing tiers with one featured", () => {
    expect(pricingTiers).toHaveLength(5);
    expect(pricingTiers.map((t) => t.price)).toEqual([
      "$0",
      "$19",
      "$99",
      "$199",
      "Custom",
    ]);
    expect(pricingTiers.filter((t) => t.featured)).toHaveLength(1);
  });

  it("links Terms, Privacy and Contact in the footer", () => {
    const legal = footerColumns.find((c) => c.title === "Legal");
    const hrefs = legal?.links.map((l) => l.href) ?? [];
    expect(hrefs).toContain("/terms");
    expect(hrefs).toContain("/privacy");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("avoids forbidden, unverifiable claims", () => {
    const blob = JSON.stringify({
      site,
      useCases,
      terminalDemo,
      reliability,
    }).toLowerCase();
    expect(blob).not.toContain("the only");
    expect(blob).not.toContain("$300k");
  });
});
