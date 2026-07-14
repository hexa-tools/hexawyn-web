import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { Terminal } from "@/components/sections/Terminal";
import { Problem } from "@/components/sections/Problem";
import { Reliability } from "@/components/sections/Reliability";
import { Assurance } from "@/components/sections/Assurance";
import { UseCases } from "@/components/sections/UseCases";
import { Technologies } from "@/components/sections/Technologies";
import { Trust } from "@/components/sections/Trust";
import { Community } from "@/components/sections/Community";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { hero, problem, useCases, pricingTiers, community } from "@/lib/content";

describe("marketing sections", () => {
  it("Hero shows the diagnostic-first headline and install command", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: hero.title })).toBeInTheDocument();
    expect(screen.getAllByText("pip install hexawyn").length).toBeGreaterThan(0);
  });

  it("Terminal renders the OOMKilled diagnosis demo", () => {
    render(<Terminal />);
    expect(screen.getByText(/OOMKilled/)).toBeInTheDocument();
    expect(screen.getByText(/resolved in 12 seconds/)).toBeInTheDocument();
  });

  it("Problem renders the incident narrative", () => {
    render(<Problem />);
    expect(screen.getByText(problem.heading)).toBeInTheDocument();
  });

  it("Reliability renders every layer and its share", () => {
    render(<Reliability />);
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getAllByText("LLM").length).toBeGreaterThan(0);
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("Assurance renders verification and privacy pillars", () => {
    render(<Assurance />);
    expect(screen.getByText(/The LLM talks/)).toBeInTheDocument();
    expect(screen.getByText(/Local-first by design/)).toBeInTheDocument();
  });

  it("UseCases renders all cases", () => {
    render(<UseCases />);
    for (const useCase of useCases) {
      expect(screen.getByText(useCase.title)).toBeInTheDocument();
    }
  });

  it("Technologies renders the stack", () => {
    render(<Technologies />);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("OpenTelemetry")).toBeInTheDocument();
  });

  it("Trust renders the verified stats", () => {
    render(<Trust />);
    expect(screen.getByText("6,500+")).toBeInTheDocument();
    expect(screen.getByText("97%")).toBeInTheDocument();
  });

  it("Pricing renders every tier name and its credits", () => {
    render(<Pricing />);
    for (const tier of pricingTiers) {
      expect(screen.getByText(tier.name)).toBeInTheDocument();
    }
    expect(screen.getByText("50 credits / month")).toBeInTheDocument();
    expect(screen.getByText("500 credits / month")).toBeInTheDocument();
    expect(screen.getAllByText("1 credit = 1 investigation").length).toBe(
      pricingTiers.length,
    );
  });

  it("Community renders membership and every channel", () => {
    render(<Community />);
    expect(
      screen.getByRole("heading", { name: community.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(community.membership.label)).toBeInTheDocument();
    for (const channel of community.channels) {
      expect(screen.getByText(channel.title)).toBeInTheDocument();
    }
  });

  it("CTA renders the contact actions", () => {
    render(<CTA />);
    expect(screen.getByText(/Talk to us/)).toBeInTheDocument();
    expect(screen.getByText(/Star on GitHub/)).toBeInTheDocument();
  });
});
