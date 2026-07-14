import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingTable } from "@/components/sections/PricingTable";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import PricingPage from "@/app/pricing/page";
import { pricingColumns, pricingMatrix, pricingFaq } from "@/lib/content";

describe("PricingTable", () => {
  it("renders a header for every plan column", () => {
    render(<PricingTable />);
    for (const column of pricingColumns) {
      expect(screen.getByText(column.name)).toBeInTheDocument();
    }
  });

  it("renders each group title and representative rows", () => {
    render(<PricingTable />);
    for (const group of pricingMatrix) {
      expect(screen.getByText(group.title)).toBeInTheDocument();
    }
    expect(
      screen.getByText("Investigations (credits) / month"),
    ).toBeInTheDocument();
    expect(screen.getByText("AWS EKS")).toBeInTheDocument();
  });
});

describe("PricingTeaser", () => {
  it("shows plan prices and links to the full pricing page", () => {
    render(<PricingTeaser />);
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$99")).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: /see full pricing & compare plans/i,
    });
    expect(link).toHaveAttribute("href", "/pricing");
  });
});

describe("PricingPage", () => {
  it("renders the comparison and FAQ", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: /Every feature, side by side/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: pricingFaq[0].question }),
    ).toBeInTheDocument();
  });
});

