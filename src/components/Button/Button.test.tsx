import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with the correct title", () => {
    render(<Button title="Click Me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies the primary variant styles by default", () => {
    render(<Button title="Primary Button" />);
    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toHaveClass(
      "rounded-full bg-[#131316] text-white font-semibold"
    );
  });

  it("applies additional class names", () => {
    render(<Button title="Custom Button" className="custom-class" />);
    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("sets the correct button type", () => {
    render(<Button title="Submit Button" type="submit" />);
    const button = screen.getByRole("button", { name: /submit button/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("handles the secondary variant", () => {
    render(<Button title="Secondary Button" variant="secondary" />);
    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).not.toHaveClass(
      "rounded-full bg-[#131316] text-white font-semibold"
    );
  });
});
