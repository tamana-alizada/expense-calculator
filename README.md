# Expense Calculator

A small web application for tracking personal expenses. Users can add expenses,
view them in a list, see summary totals, and filter by category. All data is
saved in the browser, so expenses are still there when the app is reopened.

This project was built as an academic Software Engineering exercise, with a
deliberate focus on clean separation between UI and business logic, and on
automated testing.

## Main Features

- **Add an expense** with a title, amount, category (Food, Transport,
  Education, Shopping, Entertainment, Other), and date. All fields are
  validated; the amount must be a positive number.
- **Expense list** showing title, amount, category, and date, with a delete
  button for each entry.
- **Expense summary** cards for the total, the number of expenses, and the
  highest single expense.
- **Category filter** to show one category or all expenses.
- **Data persistence** in the browser's localStorage — no backend required.

## Technologies Used

- [React 18](https://react.dev/) with TypeScript — functional components and hooks
- [Vite](https://vite.dev/) — development server and production build
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — unit and integration tests
- Plain CSS (no UI framework)

## Installation

Requires Node.js 18 or later.

```bash
npm install
```

## Commands

| Task               | Command           |
| ------------------ | ----------------- |
| Start dev server   | `npm run dev`     |
| Run tests          | `npm test`        |
| Run tests once     | `npm test -- --run` |
| Production build   | `npm run build`   |
| Preview the build  | `npm run preview` |

## Project Structure

```
src/
  components/        UI components (form, list, summary, filter)
  types/             Shared types (Expense, categories, filter)
  utils/             Business logic (validation, calculations, storage)
    __tests__/       Unit tests for the utility modules
  __tests__/         Integration tests for the app
  App.tsx            Application shell and state management
  main.tsx           Entry point
```

Business logic lives in plain TypeScript functions in `src/utils/`, separate
from the React components, so it can be tested without rendering the UI.

## Testing

Unit tests cover input validation, totals, highest-expense detection, category
filtering, and localStorage persistence (including corrupt or malformed saved
data). Integration tests exercise the form, list, filters, and summary through
the rendered app. Run them with:

```bash
npm test
```

## Known Limitations

- Data is stored per browser and per device; there is no sync or backup.
- Amounts use a single currency (USD) with no currency selection.
- Deleting an expense asks for no confirmation.
- Amounts are not rounded to cents before display; floating-point totals are
  formatted to two decimals but not reconciled to a cent-exact ledger.
