import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TransactionListing from "./TransactionListing";

const mockTransactions = [
  {
    amount: 500,
    metadata: {
      name: "John Doe",
      type: "digital_product",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Nigeria",
      product_name: "Rich Dad Poor Dad"
    },
    payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
    status: "successful",
    type: "deposit",
    date: "2022-03-03"
  },
  {
    amount: 600,
    metadata: {
      name: "John Doe",
      type: "digital_product",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Nigeria",
      product_name: "Rich Dad Poor Dad"
    },
    payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
    status: "successful",
    type: "deposit",
    date: "2022-03-03"
  }
];

describe("TransactionListing Component", () => {
  it("renders the empty state when no transactions are provided", () => {
    render(<TransactionListing transactions={[]} />);

    expect(
      screen.getByText("No matching transaction found for the selected filter")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Change your filters to see more results, or add a new product."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear filter/i })
    ).toBeInTheDocument();
  });

  it("renders a list of transactions when transactions are provided", () => {
    render(<TransactionListing transactions={mockTransactions} />);

    expect(screen.getAllByText("John Doe").length).toBe(2);
    expect(screen.getAllByText("Rich Dad Poor Dad").length).toBe(2);
  });
});
