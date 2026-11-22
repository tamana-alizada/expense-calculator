import { EXPENSE_CATEGORIES, FILTER_ALL, type CategoryFilter } from "../types/expense";

interface CategoryFilterBarProps {
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

export function CategoryFilterBar({ selected, onSelect }: CategoryFilterBarProps) {
  const options: CategoryFilter[] = [FILTER_ALL, ...EXPENSE_CATEGORIES];

  return (
    <div className="filter-bar" role="group" aria-label="Filter expenses">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === selected ? "filter-chip active" : "filter-chip"}
          aria-pressed={option === selected}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
