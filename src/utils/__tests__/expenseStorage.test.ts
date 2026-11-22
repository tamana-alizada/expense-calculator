import { beforeEach, describe, expect, it } from "vitest";
import { loadExpenses, saveExpenses } from "../expenseStorage";
import type { Expense } from "../../types/expense";

const sampleExpense: Expense = {
  id: "e1",
  title: "Bus ticket",
  amount: 2.75,
  category: "Transport",
  date: "2026-11-15",
};

describe("expenseStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty list when nothing is stored", () => {
    expect(loadExpenses()).toEqual([]);
  });

  it("saves and restores expenses", () => {
    saveExpenses([sampleExpense]);
    expect(loadExpenses()).toEqual([sampleExpense]);
  });

  it("ignores stored data that is not an array", () => {
    localStorage.setItem("expense-calculator:expenses", '"oops"');
    expect(loadExpenses()).toEqual([]);
  });

  it("drops entries with missing fields", () => {
    localStorage.setItem(
      "expense-calculator:expenses",
      JSON.stringify([{ id: "x", title: "Broken" }]),
    );
    expect(loadExpenses()).toEqual([]);
  });

  it("returns an empty list for corrupted JSON", () => {
    localStorage.setItem("expense-calculator:expenses", "{not valid json");
    expect(loadExpenses()).toEqual([]);
  });
});
