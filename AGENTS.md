# AGENTS.md — Expense Calculator

## 1. Project Purpose

This repository contains a small Expense Calculator web application built with React, TypeScript, and Vite.

The application allows users to:
- Add expenses with a title, amount, category, and date.
- View and delete expenses.
- Calculate total expenses, expense count, and highest expense.
- Filter expenses by category.
- Persist expense data using browser localStorage.

The primary goal is to maintain a simple, reliable, testable, and maintainable application.

## 2. Project Architecture

Follow the existing project structure.

- `src/App.tsx`: Main application component.
- `src/main.tsx`: Application entry point.
- `src/components/`: User interface components.
  - `CategoryFilterBar.tsx`
  - `ExpenseForm.tsx`
  - `ExpenseList.tsx`
  - `ExpenseSummary.tsx`
- `src/types/expense.ts`: Shared expense types.
- `src/utils/expenseCalculations.ts`: Expense calculation logic.
- `src/utils/expenseStorage.ts`: Browser localStorage operations.
- `src/utils/expenseValidation.ts`: Expense input validation.
- `src/__tests__/`: Application-level tests.
- `src/utils/__tests__/`: Utility unit tests.

Keep UI responsibilities separate from business logic. Follow existing architectural conventions rather than introducing unnecessary abstractions.

## 3. Environment and Setup

Requirements:
- Node.js version compatible with the installed dependencies.
- npm.
- Git.

Install dependencies using:

`npm ci`

Start the development server:

`npm run dev`

Run automated tests:

`npm test -- --run`

Run lint checks:

`npm run lint`

Run the production build:

`npm run build`

Preview the production build:

`npm run preview`

The production build also performs TypeScript project compilation through `tsc -b`.

Important: Check package engine requirements before changing the Node.js environment. Do not assume that a warning-free installation has been achieved.

## 4. Coding Conventions

- Use TypeScript for application code.
- Use functional React components and React Hooks.
- Define clear interfaces and types.
- Use descriptive variable and function names.
- Keep functions focused on one responsibility.
- Avoid duplicated business logic.
- Keep calculation, validation, and storage logic in their existing utility modules.
- Handle invalid user input and empty states appropriately.
- Maintain consistent formatting and existing naming conventions.
- Avoid unnecessary dependencies and overengineering.
- Do not introduce design patterns unless a concrete maintainability problem justifies them.

## 5. Testing Expectations

Before completing a code change:

1. Inspect the relevant existing implementation and tests.
2. Add or update targeted automated tests when appropriate.
3. Run the relevant tests.
4. Run the complete test suite using `npm test -- --run`.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Report actual command results, including failures.

Preserve these acceptance criteria:

- AC-01: Users can add an expense with valid required fields and a positive amount.
- AC-02: Empty fields and invalid or non-positive amounts are rejected.
- AC-03: Total expenses, expense count, and highest expense are calculated correctly.
- AC-04: Category filtering and individual expense deletion work correctly.
- AC-05: Expenses persist after a browser refresh through localStorage.

Never claim that a test passed unless it was actually executed.

## 6. Safe Operating Boundaries

The following actions are prohibited unless explicitly authorized by the repository owner:

- Accessing, displaying, copying, or uploading secrets, credentials, tokens, or private data.
- Deploying to production or publishing the application.
- Executing destructive commands that could delete or overwrite project data.
- Deleting project files or changing the repository's Git history.
- Force-pushing to remote branches.
- Merging changes without human approval.
- Installing, removing, or upgrading dependencies without explaining the reason and receiving approval.
- Running `npm audit fix --force`.
- Modifying GitHub repository settings or permissions.
- Making unrelated changes outside the requested task.

Never commit `.env` files, credentials, API keys, or other sensitive information.

## 7. Change Management

Before modifying files:

1. Explain the identified problem.
2. Identify the affected files.
3. Describe the proposed solution.
4. Explain possible side effects.

After modifying files:

1. Summarize all changes.
2. Present the relevant diff.
3. Report tests and verification results.
4. Identify remaining risks or limitations.
5. Wait for human review and approval before committing, merging, or deploying.

Prefer small, focused changes over large rewrites.

## 8. Agent Operating Principles

- Inspect before modifying.
- Ask questions when requirements are unclear.
- Do not invent missing requirements or test results.
- Distinguish confirmed problems from assumptions.
- Prefer minimal and reversible changes.
- Preserve existing functionality.
- Require human approval for sensitive or high-impact operations.

The human repository owner has final authority over all changes and release decisions.