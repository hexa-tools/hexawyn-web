import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/Logo";

describe("Logo", () => {
  it("renders the wordmark by default", () => {
    render(<Logo />);
    expect(screen.getByText("hexa")).toBeInTheDocument();
    expect(screen.getByText("wyn")).toBeInTheDocument();
  });

  it("renders an accessible logo mark", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /hexawyn logo/i })).toBeInTheDocument();
  });

  it("can hide the wordmark", () => {
    render(<Logo showWordmark={false} />);
    expect(screen.queryByText("hexa")).not.toBeInTheDocument();
  });
});
