import { useState } from "react";
import {
  EXPENSE_CATEGORIES,
  type Expense,
  type ExpenseCategory,
} from "../types/expense";
import { validateExpenseInput } from "../utils/expenseValidation";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

interface FormState {
  title: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  amount: "",
  category: "Other",
  date: "",
};

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateExpenseInput(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });

    setForm(EMPTY_FORM);
    setErrors([]);
  }

  return (
    <form className="card expense-form" onSubmit={handleSubmit} noValidate>
      <h2>Add Expense</h2>

      {errors.length > 0 && (
        <ul className="form-errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <label>
        Title
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g. Weekly groceries"
        />
      </label>

      <div className="form-row">
        <label>
          Amount
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </label>
      </div>

      <label>
        Category
        <select
          value={form.category}
          onChange={(e) => updateField("category", e.target.value as ExpenseCategory)}
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="primary-button">
        Add Expense
      </button>
    </form>
  );
}
