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

test('moves a task between columns with drag and drop', async ({ page }) => {
  const draggedTask = page.getByTestId('task-card-task-seed-3')
  const doneColumn = page.getByTestId('column-done')

  await draggedTask.dragTo(doneColumn)

  await page.getByRole('button', { name: 'Done' }).click()
  await expect(page.getByText('Write Playwright happy-path test')).toBeVisible()

  await page.getByRole('button', { name: 'Todo' }).click()
  await expect(page.getByText('Write Playwright happy-path test')).toHaveCount(0)
})

test('keeps created tasks after reload', async ({ page }) => {
  await page.getByLabel('Task title').fill('Prepare CI walkthrough')
  await page.getByLabel('Ticket ID').fill('CUST-300')
  await page.getByRole('button', { name: 'Add task' }).click()

  const storedTasks = await page.evaluate(() =>
    localStorage.getItem('workflow-board-lite.tasks'),
  )
  expect(storedTasks).toContain('Prepare CI walkthrough')

  await page.reload()

  await expect(page.getByText('Prepare CI walkthrough')).toBeVisible()
})
