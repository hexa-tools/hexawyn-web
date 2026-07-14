import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { navLinks } from "@/lib/content";

describe("Navbar", () => {
  it("renders the primary navigation links", () => {
    render(<Navbar />);
    for (const link of navLinks) {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    }
  });

  it("toggles the mobile menu", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Footer", () => {
  it("renders legal links and the current year", () => {
    render(<Footer />);
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
