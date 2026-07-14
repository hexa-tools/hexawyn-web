import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon, type IconName } from "@/components/ui/Icon";

const names: IconName[] = [
  "star",
  "server",
  "lock",
  "alert",
  "coins",
  "chart",
  "shield",
  "rocket",
  "robot",
  "globe",
  "briefcase",
  "check",
  "arrow",
  "spark",
];

describe("Icon", () => {
  it("renders an svg for every icon name", () => {
    for (const name of names) {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg")).not.toBeNull();
    }
  });

  it("forwards the className", () => {
    const { container } = render(<Icon name="check" className="h-4 w-4" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "h-4",
    );
  });
});
