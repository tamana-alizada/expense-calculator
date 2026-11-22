import { describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

async function fillAndSubmit(
  overrides: Partial<{
    title: string;
    amount: string;
    category: string;
    date: string;
  }> = {},
) {
  const user = userEvent.setup();
  const fields = {
    title: "Coffee",
    amount: "3.50",
    category: "Food",
    date: "2026-11-20",
    ...overrides,
  };

  await user.type(screen.getByLabelText(/title/i), fields.title);
  await user.type(screen.getByLabelText(/amount/i), fields.amount);
  await user.selectOptions(screen.getByLabelText(/category/i), fields.category);
  await user.type(screen.getByLabelText(/date/i), fields.date);
  await user.click(screen.getByRole("button", { name: /add expense/i }));
}

describe("App integration", () => {
  it("adds an expense and updates the summary", async () => {
    render(<App />);
    await fillAndSubmit({ title: "Lunch", amount: "12.25" });

    expect(screen.getByText("Lunch")).toBeInTheDocument();
    // Total, highest, and the row all show $12.25 for a single expense
    expect(screen.getAllByText("$12.25")).toHaveLength(3);
    expect(
      screen.getByText(/number of expenses/i).parentElement,
    ).toHaveTextContent("1");
  });


  it("calculates the total and highest expense across multiple expenses", async () => {
    render(<App />);
    await fillAndSubmit({ title: "Groceries", amount: "25.50", category: "Food" });
    await fillAndSubmit({ title: "Bus ticket", amount: "2.75", category: "Transport" });

    expect(screen.getAllByText("$28.25")).toHaveLength(1);
    expect(screen.getAllByText("$25.50")).toHaveLength(2);
    expect(screen.getByText(/number of expenses/i).parentElement).toHaveTextContent("2");
  });

  it("shows validation errors and does not save invalid input", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /add expense/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/title is required/i);
    expect(
      screen.getByText(/number of expenses/i).parentElement,
    ).toHaveTextContent("0");
  });

  it("rejects a non-positive amount", async () => {
    render(<App />);
    await fillAndSubmit({ amount: "-4" });

    expect(screen.getByRole("alert")).toHaveTextContent(/positive number/i);
  });

  it("deletes an expense", async () => {
    render(<App />);
    await fillAndSubmit({ title: "Movie ticket" });
    await userEvent.click(
      screen.getByRole("button", { name: /delete movie ticket/i }),
    );

    expect(screen.queryByText("Movie ticket")).not.toBeInTheDocument();
    expect(screen.getByText(/no expenses to show/i)).toBeInTheDocument();
  });

  it("filters expenses by category", async () => {
    render(<App />);
    await fillAndSubmit({ title: "Bus pass", amount: "40", category: "Transport" });
    await fillAndSubmit({ title: "Pizza", amount: "18", category: "Food" });

    await userEvent.click(screen.getByRole("button", { name: "Food" }));

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.queryByText("Bus pass")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Bus pass")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();
  });

  it("restores saved expenses from localStorage on reload", async () => {
    render(<App />);
    await fillAndSubmit({ title: "Textbook", amount: "55", category: "Education" });

    expect(
      JSON.parse(localStorage.getItem("expense-calculator:expenses") ?? "[]"),
    ).toHaveLength(1);

    cleanup();
    render(<App />);

    expect(screen.getByText("Textbook")).toBeInTheDocument();
    expect(screen.getAllByText("$55.00")).toHaveLength(3);
  });
});
