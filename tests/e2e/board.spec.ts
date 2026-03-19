import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('creates a task with a ticket id', async ({ page }) => {
  await page.getByLabel('Task title').fill('Demo PR review round')
  await page.getByLabel('Ticket ID').fill('cust-210')
  await page.getByRole('button', { name: 'Add task' }).click()

  await expect(page.getByText('Demo PR review round')).toBeVisible()
  await expect(page.getByRole('link', { name: 'CUST-210' })).toBeVisible()
})

test('moves a task between columns and filters by status', async ({ page }) => {
  const select = page.locator('#task-seed-3-status')
  await select.selectOption('in_progress')

  await page.getByRole('button', { name: 'In Progress' }).click()

  await expect(page.getByText('Write Playwright happy-path test')).toBeVisible()
  await expect(page.getByText('Set up repository and first commit')).toHaveCount(0)
})

test('keeps created tasks after reload', async ({ page }) => {
  await page.getByLabel('Task title').fill('Prepare CI walkthrough')
  await page.getByLabel('Ticket ID').fill('CUST-300')
  await page.getByRole('button', { name: 'Add task' }).click()

  await page.reload()

  await expect(page.getByText('Prepare CI walkthrough')).toBeVisible()
})
