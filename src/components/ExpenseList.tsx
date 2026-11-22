import { formatCurrency } from "../utils/expenseCalculations";
import type { Expense } from "../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

function formatDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="card empty-state">
        <p>No expenses to show. Add one using the form, or pick another filter.</p>
      </div>
    );
  }

  return (
    <div className="card expense-table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col" className="align-right">Amount</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>
                <span className={`category-badge category-${expense.category.toLowerCase()}`}>
                  {expense.category}
                </span>
              </td>
              <td>{formatDate(expense.date)}</td>
              <td className="align-right">{formatCurrency(expense.amount)}</td>
              <td className="align-right">
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
