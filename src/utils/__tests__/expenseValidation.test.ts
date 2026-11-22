import { describe, expect, it } from "vitest";
import { validateExpenseInput } from "../expenseValidation";

const validInput = {
  title: "Groceries",
  amount: "42.50",
  category: "Food",
  date: "2026-11-20",
};

describe("validateExpenseInput", () => {
  it("accepts a fully valid expense", () => {
    const result = validateExpenseInput(validInput);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects a missing title", () => {
    const result = validateExpenseInput({ ...validInput, title: "   " });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Title is required.");
  });

  it("rejects an empty amount", () => {
    const result = validateExpenseInput({ ...validInput, amount: "" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Amount must be a number.");
  });

  it("rejects a non-numeric amount", () => {
    const result = validateExpenseInput({ ...validInput, amount: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Amount must be a number.");
  });

  it("rejects a zero amount", () => {
    const result = validateExpenseInput({ ...validInput, amount: "0" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Amount must be a positive number.");
  });

  it("rejects a negative amount", () => {
    const result = validateExpenseInput({ ...validInput, amount: "-10" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Amount must be a positive number.");
  });

  it("rejects a missing category", () => {
    const result = validateExpenseInput({ ...validInput, category: "" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Category is required.");
  });

  it("rejects a missing date", () => {
    const result = validateExpenseInput({ ...validInput, date: "" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Date is required.");
  });


  it("rejects a category that is not supported", () => {
    const result = validateExpenseInput({ ...validInput, category: "Unknown" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please select a valid category.");
  });

  it("rejects a malformed date", () => {
    const result = validateExpenseInput({ ...validInput, date: "not-a-date" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid date.");
  });

  it("rejects an impossible calendar date", () => {
    const result = validateExpenseInput({ ...validInput, date: "2026-02-30" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid date.");
  });

  it("rejects an infinite amount", () => {
    const result = validateExpenseInput({ ...validInput, amount: "Infinity" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Amount must be a valid number.");
  });

  it("reports all problems at once", () => {
    const result = validateExpenseInput({
      title: "",
      amount: "-5",
      category: "",
      date: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);
  });
});
