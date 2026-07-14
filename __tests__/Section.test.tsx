import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LegalShell, LegalSection } from "@/components/ui/LegalShell";

describe("Section", () => {
  it("renders children within an identified section", () => {
    const { container } = render(
      <Section id="demo">
        <p>content</p>
      </Section>,
    );
    expect(container.querySelector("section#demo")).not.toBeNull();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders a heading with eyebrow and description", () => {
    render(
      <SectionHeading
        eyebrow="Eyebrow"
        title="Title"
        description="Description"
      />,
    );
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

describe("LegalShell", () => {
  it("renders title, updated date and sections", () => {
    render(
      <LegalShell title="Terms" updated="July 14, 2026">
        <LegalSection heading="Scope">
          <p>body</p>
        </LegalSection>
      </LegalShell>,
    );
    expect(screen.getByRole("heading", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getByText(/July 14, 2026/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Scope" })).toBeInTheDocument();
    expect(screen.getByText("body")).toBeInTheDocument();
  });
});
