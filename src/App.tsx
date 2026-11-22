import { useEffect, useMemo, useState } from "react";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { ExpenseList } from "./components/ExpenseList";
import { CategoryFilterBar } from "./components/CategoryFilterBar";
import { FILTER_ALL, type CategoryFilter, type Expense } from "./types/expense";
import { filterByCategory } from "./utils/expenseCalculations";
import { loadExpenses, saveExpenses } from "./utils/expenseStorage";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);
  const [filter, setFilter] = useState<CategoryFilter>(FILTER_ALL);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  function handleAdd(expense: Expense) {
    setExpenses((prev) => [expense, ...prev]);
  }

  function handleDelete(id: string) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  const visibleExpenses = useMemo(
    () => filterByCategory(expenses, filter),
    [expenses, filter],
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Expense Calculator</h1>
        <p className="app-subtitle">
          Track what you spend, see your totals, and filter by category.
        </p>
      </header>

      <main>
        <ExpenseSummary expenses={expenses} />

        <div className="content-grid">
          <ExpenseForm onAdd={handleAdd} />

          <section aria-label="Expense list" className="expense-section">
            <div className="expense-section-header">
              <h2>Expenses</h2>
              <CategoryFilterBar selected={filter} onSelect={setFilter} />
            </div>
            <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Data is saved in your browser's local storage.</p>
      </footer>
    </div>
  );
}
