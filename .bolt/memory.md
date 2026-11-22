# Project memory

## Product intent & audience

- Expense Calculator web app built as a Software Engineering course assignment.
- Current assignment task: Task #03 (Focused Pattern Decision) — read-only code inspection evaluating Strategy vs Adapter patterns.
- Audience: instructor/grader; code quality and rationale matter as much as functionality.

## Brand personality & voice

- Not yet inferred beyond a dry, evidence-driven academic tone expected for assignment write-ups.

## Visual design & UX direction

- React + Vite + TypeScript.
- Four presentational components: `ExpenseForm`, `ExpenseList`, `ExpenseSummary`, `CategoryFilterBar`; `App.tsx` owns state and persistence.
- Six fixed expense categories (const-asserted tuple in `types/expense.ts`).
- Currency rendered via shared `formatCurrency` utility — convention is UI imports formatting/calculations from `utils/`, not inline.
- Summary card shows total and highest expense amount.

## Decisions, constraints & rationale

- Repo has an `AGENTS.md` with binding rules: §4 forbids introducing design patterns without concrete justification; §5 mandates verification via `npm test -- --run`, `npm run lint`, `npm run build` (`tsc -b`).
- Assignment forbids a backend; persistence is localStorage only (`expenseStorage.ts` exposes `loadExpenses`/`saveExpenses`).
- Architecture invariant: all business logic in `src/utils/*`; components only render and emit events.
- Test suite: 4 files, 31 tests, all passing — treated as the behavioral contract for refactors.
- Identified maintainability problem: `ExpenseSummary.tsx` duplicates `calculateTotal` and `findHighestExpense` inline; the utilities currently have zero production call sites.
- Decision for Task #03: **No pattern**. Neither Strategy nor Adapter justified. Recommended fix is plain function reuse in one file (`ExpenseSummary.tsx`), no new files/dependencies.

## Open questions & assumptions

- Assumption: existing tests fully cover acceptance criteria (add valid, reject invalid, calculations correct, filter/delete, localStorage persistence).
- Assumption: refactor to import utilities is behavior-preserving — no test changes expected; any test change would signal a behavior regression.
- Not yet implemented: the one-file `ExpenseSummary.tsx` remediation is a recommendation, not applied (read-only task).
- Unresolved for future tasks: whether later assignments introduce requirements (alternate storage, swap strategies) that would retroactively justify Adapter/Strategy.