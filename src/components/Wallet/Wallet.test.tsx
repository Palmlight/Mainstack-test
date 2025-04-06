import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wallet from "./Wallet";

vi.spyOn(globalThis, "fetch").mockImplementation(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        ledger_balance: 1000,
        total_payout: 500,
        total_revenue: 1500,
        pending_payout: 200
      })
  } as Response)
);

const queryClient = new QueryClient();

describe("Wallet Component", () => {
  it("renders loading state correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Wallet />
      </QueryClientProvider>
    );

    expect(screen.getAllByRole("alert", { name: /loading/i })).toBeTruthy();
  });

  it("renders wallet details correctly after data is loaded", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Wallet />
      </QueryClientProvider>
    );

    expect(await screen.findByText("USD 1,000.00")).toBeInTheDocument();
    expect(await screen.findByText("USD 500.00")).toBeInTheDocument();
    expect(await screen.findByText("USD 1,500.00")).toBeInTheDocument();
    expect(await screen.findByText("USD 200.00")).toBeInTheDocument();
  });
});
