# Workflow Board Lite

A lightweight demo project to showcase an AI-driven workflow with Codex, GitHub, Figma MCP, and Playwright.

## What this demo shows

- Git + GitHub flow: branch, commit, push, PR, review feedback, follow-up commit
- Tracking flow: ticket-first development using `tickets/CUST-101.md` (or Plane/Jira/Linear)
- Figma flow: design context to code handoff
- QA flow: Playwright end-to-end tests and optional CI on pull requests

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Playwright

```bash
npx playwright install chromium
npm run test:e2e
```

Extra commands:

```bash
npm run test:e2e:headed
npm run test:e2e:ui
```

## Demo script for the talk

1. Open `tickets/CUST-101.md` or `tickets/CUST-102.md` and frame the goal from the acceptance criteria.
2. Create a task branch like `feature/CUST-102-figma-to-ui`.
3. Implement/update code with Codex assistance.
4. Run `npm run lint`, `npm run build`, and `npm run test:e2e`.
5. Commit with ticket reference.
6. Push and open a PR titled with ticket prefix (example: `CUST-102: Add Figma-to-UI workflow ticket and PR reference`).
7. Track PR URL in the ticket (example: `https://github.com/mauriciomartinez19/ai-dev-workflow-demo/pull/xxx`).
8. Add one PR comment, then address it in a second commit.
9. Show GitHub Actions CI result from `.github/workflows/ci.yml`.

## GitFlow convention for this repo

- Stable branch: `main`
- Task branches: `feature/CUST-xxx-short-description`
- Open pull request from `feature/CUST-xxx-*` into `main`
- Merge only via pull request after checks pass and comments are resolved

Example:

```bash
git checkout main
git pull
git checkout -b feature/CUST-105-playwright-regression-fix
# ...work...
git add .
git commit -m "CUST-105: Fix regression in board status filter"
git push -u origin feature/CUST-105-playwright-regression-fix
# open PR to main, resolve comments, then merge PR
```

## Optional tracking integrations

- Plane free tier: keep real issue links in each board card.
- Jira/Linear free plan: use the same ticket ID format and branch conventions.
- No external account: keep local markdown tickets under `tickets/`.

## Project structure

- `src/App.tsx`: workflow board UI and localStorage state
- `tests/e2e/board.spec.ts`: Playwright happy path coverage
- `playwright.config.ts`: local test runner + dev server wiring
- `.github/workflows/ci.yml`: lint, build, Playwright on PR
- `tickets/CUST-101.md`: tracking stub for ticket-driven workflow
