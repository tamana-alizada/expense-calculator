export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Education",
  "Shopping",
  "Entertainment",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string: YYYY-MM-DD
}

export const FILTER_ALL = "All";

export type CategoryFilter = ExpenseCategory | typeof FILTER_ALL;
