import { EXPENSE_CATEGORIES, type ExpenseCategory } from "../types/expense";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateExpenseInput(input: {
  title: string;
  amount: string;
  category: string;
  date: string;
}): ValidationResult {
  const errors: string[] = [];

  if (!input.title.trim()) {
    errors.push("Title is required.");
  }

  const amount = Number(input.amount);
  if (input.amount.trim() === "" || Number.isNaN(amount)) {
    errors.push("Amount must be a number.");
  } else if (amount <= 0) {
    errors.push("Amount must be a positive number.");
  }

  if (!input.category) {
    errors.push("Category is required.");
  }

  if (!input.date) {
    errors.push("Date is required.");
  }

  return { valid: errors.length === 0, errors };
}

export function isExpenseCategory(value: string): value is ExpenseCategory {
  return (EXPENSE_CATEGORIES as readonly string[]).includes(value);
}

export function isValidExpenseDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}
