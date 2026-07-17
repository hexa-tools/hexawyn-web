import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WelcomePage from "@/app/welcome/page";

describe("WelcomePage", () => {
  it("renders the confirmation heading", () => {
    render(<WelcomePage />);
    expect(
      screen.getByRole("heading", { name: /Payment confirmed/i }),
    ).toBeInTheDocument();
  });

  it("shows that an email with the token has been sent", () => {
    render(<WelcomePage />);
    expect(
      screen.getByText(/An email with your token has been sent/i),
    ).toBeInTheDocument();
  });

  it("reminds the user to store the token safely", () => {
    render(<WelcomePage />);
    expect(
      screen.getByText(/Store it safely/i),
    ).toBeInTheDocument();
  });

  it("has a link back to home", () => {
    render(<WelcomePage />);
    expect(
      screen.getByRole("link", { name: /Back to home/i }),
    ).toHaveAttribute("href", "/");
  });

  it("has a link to the documentation", () => {
    render(<WelcomePage />);
    const docsLink = screen.getByRole("link", { name: /Read the docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink.getAttribute("href")).toBeTruthy();
  });
});
