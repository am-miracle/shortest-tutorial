import { shortest } from '@antiwork/shortest';

const API_BASE_URI = 'http://localhost:3000/api';

// UI Test Chain
shortest([
  'Add a new task to the to-do list with text Buy groceries',
  'Delete the task with text Buy groceries from the to-do list',
]);

// API Test
shortest(`
  Test the API GET endpoint ${API_BASE_URI}/tasks
  Expect the response to contain a list of tasks including Sample Task 1
`);

shortest('Add a task and verify task count', {
  task: 'Learn TypeScript',
}).after(async ({ page }) => {
  const taskCount = await page.locator('li').count();
  if (taskCount < 1) {
    throw new Error('No tasks found in the list');
  }
});

shortest.beforeAll(async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Clear any existing tasks by deleting all visible tasks
  while (await page.locator('button:text("Delete")').count() > 0) {
    await page.locator('button:text("Delete")').first().click();
  }
});

shortest.beforeEach(async ({ page }) => {
  await page.reload(); // Reload to reset in-memory task state
});

shortest.afterEach(async ({ page }) => {
  // Clear the input field to prevent carryover
  await page.locator('input[placeholder="Enter a new task"]').fill('');
});

shortest.afterAll(async ({ page }) => {
  await page.close(); // Close browser to free resources
});