import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyCommand } from "@/components/ui/CopyCommand";

describe("CopyCommand", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("renders the command", () => {
    render(<CopyCommand command="pip install hexawyn" />);
    expect(screen.getByText("pip install hexawyn")).toBeInTheDocument();
  });

  it("copies the command to the clipboard on click", async () => {
    render(<CopyCommand command="pip install hexawyn" />);
    const button = screen.getByRole("button", {
      name: /copy install command/i,
    });
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "pip install hexawyn",
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /command copied/i }),
      ).toBeInTheDocument(),
    );
  });
});
