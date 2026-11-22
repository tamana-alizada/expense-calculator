import type { Expense } from "../types/expense";

const STORAGE_KEY = "expense-calculator:expenses";

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is Expense =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Expense).id === "string" &&
        typeof (item as Expense).title === "string" &&
        typeof (item as Expense).amount === "number" &&
        typeof (item as Expense).category === "string" &&
        typeof (item as Expense).date === "string",
    );
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
