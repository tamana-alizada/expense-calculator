import { FILTER_ALL, type CategoryFilter, type Expense } from "../types/expense";

export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function findHighestExpense(expenses: Expense[]): Expense | null {
  if (expenses.length === 0) {
    return null;
  }
  return expenses.reduce(
    (highest, expense) => (expense.amount > highest.amount ? expense : highest),
    expenses[0],
  );
}

export function filterByCategory(
  expenses: Expense[],
  category: CategoryFilter,
): Expense[] {
  if (category === FILTER_ALL) {
    return expenses;
  }
  return expenses.filter((expense) => expense.category === category);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
