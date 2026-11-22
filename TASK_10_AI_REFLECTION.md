# Task 10 — AI Reflection

## AI Reflection (200–300 words)

I used ChatGPT (GPT-6) on 22 November 2026 as an AI assistant while completing Assignment 05 on the Expense Calculator repository. I provided the assignment instructions, repository ZIP, source code, tests, package manifest, lockfile, and relevant command outputs. I asked for help reviewing the repository, selecting mitigations for confirmed risks, designing background-agent safeguards, and preparing an evidence-based release decision.

One useful suggestion was to connect the existing expense-category and date-validation helpers to the main `validateExpenseInput()` function instead of introducing another validation layer. I reviewed the code, accepted the focused change, and added tests for unsupported categories, malformed dates, impossible calendar dates, and infinite amounts. The final test run on my Windows machine passed all 36 tests across four test files. ESLint and the production build also completed successfully.

One weak AI suggestion concerned the validation error-message wording. The proposed wording did not match an existing test expectation, so two tests failed. I inspected the detailed Vitest output, corrected the wording while preserving the intended validation behavior, and reran the full suite. This showed why AI-generated changes must be checked against existing tests rather than accepted automatically.

I also checked the dependency audit instead of assuming that a production-only audit cleared every risk. The production audit reported zero vulnerabilities, while the full audit reported six findings, including high- and critical-severity development-tool findings. I added a production audit script, but its own execution output still needs to be captured; the development-tool findings remain unresolved.

The repository’s `AGENTS.md` helped define safe commands, file boundaries, and human approval requirements. Next time, I would capture baseline and final evidence more systematically and review dependency advisories and compatibility before proposing upgrades.

## AI Evidence Record

| Item | Record |
|---|---|
| AI assistant/model | ChatGPT — GPT-6 |
| Date | 22 November 2026 |
| Context provided | Assignment 05 instructions; Expense Calculator repository ZIP; source files, tests, `package.json`, lockfile and `AGENTS.md`; test, lint, build and npm audit outputs shared during the work. |
| Prompt summary | Review the repository and assignment tasks; help mitigate R-02 and R-05; verify changes; design hypothetical background-agent safeguards; prepare a release decision and reflection. |
| Useful output used | Guidance to reuse existing category/date validation helpers; targeted validation test cases; structured Task 8 safeguards; evidence-based NO-GO release rationale. |
| Weak or inaccurate output | An initially suggested validation error message did not match the existing test expectation. The detailed test output exposed the mismatch, and the message was corrected before the successful final test run. |
| Changes made | Updated `src/utils/expenseValidation.ts`; updated `src/utils/__tests__/expenseValidation.test.ts`; added the `audit:prod` script to `package.json`; prepared Task 8 safeguards and Task 9 release-decision documents. |
| Human verification | Inspected source code and test failures; ran `npm test -- --run` (36 passed); ran `npm run lint` (passed); ran `npm run build` (passed); ran `npm audit --omit=dev` (0 vulnerabilities); inspected the full audit report (6 findings). |
| Remaining limitations | Full audit findings in development tooling remain unresolved. The execution output for `npm run audit:prod` has not yet been supplied. |
| Verification sources | `src/utils/expenseValidation.ts`; `src/utils/__tests__/expenseValidation.test.ts`; `package.json`; `npm-audit-before.json`; terminal screenshots and outputs supplied during the assignment. |
