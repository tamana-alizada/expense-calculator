import { formatCurrency } from "../utils/expenseCalculations";
import type { Expense } from "../types/expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const highest = expenses.reduce(
    (max, expense) => (expense.amount > max ? expense.amount : max),
    0,
  );

  return (
    <section className="summary-grid" aria-label="Expense summary">
      <div className="card summary-card">
        <span className="summary-label">Total</span>
        <span className="summary-value">{formatCurrency(total)}</span>
      </div>
      <div className="card summary-card">
        <span className="summary-label">Number of Expenses</span>
        <span className="summary-value">{expenses.length}</span>
      </div>
      <div className="card summary-card">
        <span className="summary-label">Highest Expense</span>
        <span className="summary-value">{formatCurrency(highest)}</span>
      </div>
    </section>
  );
}
