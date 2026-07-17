import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import TermsPage from "@/app/terms/page";
import PrivacyPage from "@/app/privacy/page";
import { hero } from "@/lib/content";

describe("pages", () => {
  it("home page composes the hero without the pricing section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: hero.title })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Start free/i }),
    ).not.toBeInTheDocument();
  });

  it("hero primary CTA links to the pricing page", () => {
    render(<HomePage />);
    const cta = screen.getAllByRole("link", { name: hero.primaryCta.label })[0];
    expect(cta).toHaveAttribute("href", "/pricing");
  });

  it("terms page renders its legal sections", () => {
    render(<TermsPage />);
    expect(
      screen.getByRole("heading", { name: "Terms of Service" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No warranty/)).toBeInTheDocument();
  });

  it("privacy page explains the local-first stance", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole("heading", { name: "Privacy Policy" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Local-first by design/)).toBeInTheDocument();
  });
});
