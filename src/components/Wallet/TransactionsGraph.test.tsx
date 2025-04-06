import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionsGraph from "./TransactionsGraph";

vi.spyOn(globalThis, "fetch").mockImplementation(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        { date: "2025-04-01", amount: 100 },
        { date: "2025-04-02", amount: 200 },
        { date: "2025-04-03", amount: 300 }
      ])
  } as Response)
);

const queryClient = new QueryClient();

describe("TransactionsGraph Component", () => {
  it("renders loading state correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionsGraph isLoading data={[]} />
      </QueryClientProvider>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders the graph correctly after data is loaded", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionsGraph
          data={[
            { date: "2025-04-01", amount: 100 },
            { date: "2025-04-02", amount: 200 },
            { date: "2025-04-03", amount: 300 }
          ]}
        />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(screen.getByTestId("line")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
  });
});
