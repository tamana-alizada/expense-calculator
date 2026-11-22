# Task 9 — Release Decision

## Project
**Expense Calculator**  
**Decision date:** 22 November 2026  
**Decision owner:** Alizada Tamana / student  
**Reviewed branch:** `main`

## 1. Release Decision

# NO-GO

The current reviewed version of the Expense Calculator is **not approved for release**.

The application passes its current automated tests, lint check, and production build on the user's Windows development machine. However, the full dependency audit still reports unresolved vulnerabilities in development tooling, including high- and critical-severity findings. The production-only audit reports zero vulnerabilities, but this does not resolve the vulnerable development toolchain. The dedicated `audit:prod` script has been added, but its execution result has not yet been supplied as evidence.

A NO-GO decision is therefore appropriate until the dependency findings are reviewed and safely addressed, and the final security checks are recorded.

## 2. Evidence Reviewed

| Check / evidence | Actual result | Interpretation |
|---|---|---|
| `npm test -- --run` | **36 passed, 0 failed** across 4 test files | Automated tests passed on the Windows machine |
| `npm run lint` | **Passed**; command completed and returned to the PowerShell prompt without errors | ESLint check passed |
| `npm run build` | **Passed**; Vite 5.4.21, 39 modules transformed, build completed | Production build passed |
| `npm audit --omit=dev` | **Found 0 vulnerabilities** | No vulnerabilities reported in the production dependency tree at the time of the check |
| Full `npm audit --json` report | **6 vulnerabilities:** 3 moderate, 1 high, 2 critical | Development dependency/tooling exposure remains |
| `npm ls vite vitest @vitest/mocker esbuild tinypool` | Vite 5.4.21; Vitest 2.1.9; `@vitest/mocker` 2.1.9; esbuild 0.21.5; tinypool 1.1.1; vite-node 2.1.9 | Identifies the installed versions associated with the audit findings |
| `npm run audit:prod` | **Not yet evidenced** | The script was added, but its own execution output must still be captured |

### Dependency audit detail

The uploaded full audit report identified these affected packages:

- `vite` — high severity
- `vitest` — critical severity
- `tinypool` — critical severity
- `@vitest/mocker` — moderate severity
- `esbuild` — moderate severity
- `vite-node` — moderate severity

The audit reported 6 total vulnerability findings: 3 moderate, 1 high, and 2 critical. The production-only audit reported zero vulnerabilities. These are different scopes: the production audit does not establish that development dependencies are free of vulnerabilities.

## 3. Relationship to Task 7 Mitigations

### R-02 — Input validation

**Status:** Mitigated and verified by the available test evidence.

The category, date, and amount validation logic was strengthened. The final automated test run passed all 36 tests across four test files. The targeted validation tests include unsupported categories, malformed dates, impossible calendar dates, and infinite amounts.

### R-05 — Dependency vulnerabilities

**Status:** Partially mitigated; remains open.

A production dependency audit command was added to `package.json`:

`audit:prod`: `npm audit --omit=dev --audit-level=high`

The production-only audit returned zero vulnerabilities. However, the full audit still reports six findings in the development toolchain. No package versions have yet been upgraded, and no claim is made that these advisories have been fixed. The audit gate is a useful repeatable control, not a substitute for patching vulnerable tooling.

## 4. Why NO-GO Is Appropriate

The assignment defines NO-GO as appropriate when serious risks or critical verification gaps remain.

The current version has good functional verification: all 36 tests pass, lint passes, and the production build succeeds. Nevertheless, the full dependency audit identifies unresolved high- and critical-severity vulnerabilities in tools used during development and testing. A production-only audit returning zero does not remove that risk from the development environment.

The dedicated `audit:prod` command also still needs its own captured execution result. These unresolved security findings and verification gaps prevent an unconditional release approval.

## 5. Conditions Required to Reconsider the Decision

The repository owner should complete the following actions before making a new release decision:

1. Run `npm run audit:prod` and save its complete output.
2. Review the six full-audit findings and their official advisories.
3. Select compatible patched versions of the affected tooling. Review the required version changes before accepting them; do not blindly apply major upgrades.
4. Do not use `npm audit fix --force` without a separate compatibility review and explicit approval.
5. Update the dependency manifest and lockfile only after the proposed changes have been reviewed.
6. Run `npm ci` from the reviewed lockfile in the target development environment.
7. Rerun and capture:
   - `npm test -- --run`
   - `npm run lint`
   - `npm run build`
   - `npm audit`
   - `npm run audit:prod`
8. Review the updated risk register and confirm that acceptance criteria AC-01 through AC-05 remain satisfied.
9. Make a new human release decision based on the resulting evidence.

## 6. Ownership and Release Authority

**Owner:** Repository owner / student.

The repository owner is responsible for reviewing dependency changes, verifying the results, updating the risk register, and making the final release decision. Neither the AI assistant nor a hypothetical background agent is authorized to approve, merge, or deploy the application.

## 7. Final Statement

As of 22 November 2026, the Expense Calculator is **NO-GO for release**. Its current functional checks pass on the Windows development machine, but unresolved high- and critical-severity development dependency findings remain. Release approval can be reconsidered only after the dependency advisories are reviewed, appropriate fixes are applied and verified, and the final audit and regression evidence is recorded.
