import { describe, expect, it } from "vitest";
import {
  calculateTotal,
  filterByCategory,
  findHighestExpense,
  formatCurrency,
} from "../expenseCalculations";
import type { Expense } from "../../types/expense";

function makeExpense(overrides: Partial<Expense> = {}): Expense {
  return {
    id: crypto.randomUUID(),
    title: "Test expense",
    amount: 10,
    category: "Other",
    date: "2026-11-01",
    ...overrides,
  };
}

describe("calculateTotal", () => {
  it("returns 0 for an empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("returns the amount for a single expense", () => {
    expect(calculateTotal([makeExpense({ amount: 19.99 })])).toBeCloseTo(19.99);
  });

  it("sums several expenses", () => {
    const expenses = [
      makeExpense({ amount: 10 }),
      makeExpense({ amount: 25.5 }),
      makeExpense({ amount: 4.5 }),
    ];
    expect(calculateTotal(expenses)).toBe(40);
  });
});

describe("findHighestExpense", () => {
  it("returns null for an empty list", () => {
    expect(findHighestExpense([])).toBeNull();
  });

  it("returns the only expense in a single-item list", () => {
    const expense = makeExpense({ amount: 7 });
    expect(findHighestExpense([expense])).toBe(expense);
  });

  it("returns the expense with the largest amount", () => {
    const cheapest = makeExpense({ amount: 5 });
    const priciest = makeExpense({ amount: 99 });
    const middle = makeExpense({ amount: 40 });
    expect(findHighestExpense([cheapest, priciest, middle])).toBe(priciest);
  });

  it("keeps the first match when amounts are tied", () => {
    const first = makeExpense({ amount: 12 });
    const second = makeExpense({ amount: 12 });
    expect(findHighestExpense([first, second])).toBe(first);
  });
});

describe("filterByCategory", () => {
  const food = makeExpense({ category: "Food" });
  const transport = makeExpense({ category: "Transport" });
  const otherFood = makeExpense({ category: "Food" });
  const expenses = [food, transport, otherFood];

  it("returns everything when the filter is All", () => {
    expect(filterByCategory(expenses, "All")).toEqual(expenses);
  });

  it("returns only matching expenses for a category", () => {
    expect(filterByCategory(expenses, "Food")).toEqual([food, otherFood]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterByCategory(expenses, "Education")).toEqual([]);
  });
});

describe("formatCurrency", () => {
  it("formats amounts as US dollars", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });
});
