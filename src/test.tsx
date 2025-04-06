import "@testing-library/jest-dom";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserver;

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />
}));

export const withMemoryRouter = (
  ui: React.ReactNode,
  initialEntries = ["/"]
) => <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>;
