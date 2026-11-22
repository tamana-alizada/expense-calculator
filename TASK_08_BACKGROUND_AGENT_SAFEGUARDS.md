# Assignment 05 — Task 8: Background Agent Safeguards

**Project:** Expense Calculator  
**Task type:** Hypothetical asynchronous coding-agent workflow  
**Status:** Design only; no background agent was launched and no agent changes were made.

## 1. Hypothetical asynchronous agent task

**Task:** Review the Expense Calculator's expense category and date validation tests. Identify missing edge cases and, if justified, make minimal improvements to the validation logic and its tests. Preserve existing application behavior outside the validation boundary.

**Objective:** Improve confidence in the validation behavior addressed in Task 7 without introducing unrelated refactoring or dependency changes.

**Acceptance criteria:**

- AC-01: A supported expense category is accepted and an unsupported category is rejected.
- AC-02: A correctly formatted, real calendar date is accepted.
- AC-03: A malformed or impossible calendar date is rejected.
- AC-04: Existing amount and title validation behavior remains unchanged.
- AC-05: The automated test suite, lint check, and production build pass after the proposed changes.

## 2. Isolation and starting state

The agent must work in a separate Git worktree and a dedicated branch named `agent/task-08-validation-review`, created from the reviewed `main` baseline. It must not work in the repository owner's active working directory.

Before starting, the human owner must confirm the baseline commit and a clean working tree. The agent must record the starting commit and the output of `git status`.

Example setup commands (illustrative; not executed for this hypothetical task):

```bash
git status
git worktree add -b agent/task-08-validation-review ../expense-calculator-agent main
git -C ../expense-calculator-agent status
```

If the working tree is not clean, the baseline cannot be identified, or the worktree cannot be created safely, the agent must stop and report the issue.

## 3. Allowed files

The agent may inspect the repository as needed, but may modify only these files:

- `src/utils/expenseValidation.ts`
- `src/utils/__tests__/expenseValidation.test.ts`
- `package.json` — only when the human owner has explicitly approved a specific test or audit-script change.

The agent must not modify `package-lock.json`, application UI components, storage modules, styles, build configuration, or other files. If a required change falls outside the allowed list, the agent must stop and request approval rather than expanding scope.

## 4. Allowed commands

Within the isolated worktree, the agent may use:

**Inspection:**

```bash
git status
git diff
git log -1 --oneline
```

It may also read files and list directories without changing them.

**Verification:**

```bash
npm ci
npm test -- --run
npm run lint
npm run build
npm run audit:prod
```

`npm ci` is permitted only in the isolated worktree. It installs from the existing lockfile; any unexpected lockfile modification must be reported and must not be accepted automatically. The agent must not use commands that alter dependencies unless separately approved.

## 5. Time and scope limits

- Maximum runtime: 20 minutes.
- Maximum modified-file scope: the three files listed in Section 3.
- No unrelated refactoring, new abstractions, UI changes, or feature work.
- No dependency upgrades or new package installations without explicit human approval.
- The agent must stop if tests cannot run, required evidence is unavailable, the initial state is uncertain, or a change outside the approved scope appears necessary.
- The agent must report partial work honestly; it must not claim a check passed if it was not executed successfully.

## 6. Prohibited operations

The agent is not authorized to:

- Read, copy, expose, or modify credentials, secrets, passwords, tokens, or private user data.
- Access production data or production systems.
- Deploy, publish, release, or change any external service.
- Push to a remote repository, merge into `main`, or commit directly to `main`.
- Force-push, rewrite Git history, or run destructive cleanup/reset commands.
- Delete or modify files outside the approved scope.
- Install, remove, or upgrade dependencies without approval.
- Run `npm audit fix --force`.
- Disable tests, lint rules, security checks, or verification steps to make the task appear successful.

## 7. Required agent deliverables

Before stopping, the agent must provide:

1. A concise summary of the work and whether the task was completed.
2. The starting commit and final `git status`.
3. A list of every modified file.
4. The complete patch (`git diff`) for human review.
5. Automated test output, including the exact command and pass/fail totals.
6. Lint output and production-build output, including exact commands and results.
7. Production dependency-audit output, or the exact reason it could not be run.
8. A list of unresolved risks, assumptions, limitations, and any checks not executed.

No result may be fabricated or inferred from a previous run. Each reported result must correspond to the agent's actual execution in the isolated worktree.

## 8. Human review and approval gate

The repository owner remains responsible for all decisions. Before accepting the work, the owner must:

- Inspect every changed line and the complete diff.
- Confirm that only approved files were modified.
- Independently rerun the relevant tests, lint, and build checks.
- Confirm that AC-01 through AC-05 remain satisfied.
- Review all audit output and unresolved risks.

The agent cannot approve its own work. No merge, push, or deployment may occur until the owner explicitly approves the diff and verification evidence. Approval for one change does not authorize additional changes outside the reviewed diff.

## 9. Failure handling and rollback

If the agent times out, crashes, loses access, or produces incomplete evidence:

- Stop further agent activity and preserve its logs, branch, worktree, and diff for inspection.
- Do not merge incomplete work.
- The owner reviews the partial changes and decides whether to retain, correct, or discard them.

If a defect is found before merge:

- Keep the correction isolated to the agent branch/worktree.
- Revert or correct only the reviewed agent changes.
- Rerun the relevant tests, lint, and build checks.
- Request a new human review before any merge is considered.

If a defect is found after a separately approved merge, the repository owner follows the repository's normal human-controlled revert procedure. The agent has no authority to perform an autonomous rollback.

## 10. Conclusion

This hypothetical workflow limits an asynchronous coding agent through worktree isolation, an explicit file allowlist, approved commands, time and scope limits, prohibited operations, required evidence, and a mandatory human approval gate. These safeguards reduce the risk of unintended repository changes and unverified AI-generated code. The workflow is a design exercise only; no background agent was launched and no branch or worktree was created for Task 8.
