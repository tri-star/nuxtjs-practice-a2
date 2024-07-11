import { test, expect } from '@playwright/test'

test('ログインに失敗した場合、エラーメッセージが表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.locator('input[type="text"]').click()
  await page.locator('input[type="text"]').fill('admin')
  await page.locator('input[type="text"]').press('Tab')
  await page.locator('input[type="password"]').fill('testtest')
  await page.getByRole('button', { name: 'LOGIN' }).click()
  await expect(page.getByText('Login ID、またはパスワードが不正です。')).toBeVisible()
})

test('ログインに成功した場合、ダッシュボードに遷移すること', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.locator('input[type="text"]').click()
  await page.locator('input[type="text"]').fill('test')
  await page.locator('input[type="text"]').press('Tab')
  await page.locator('input[type="password"]').fill('abcdabcd123')
  await page.getByRole('button', { name: 'LOGIN' }).click()
  await expect(page.getByRole('heading', { name: 'ダッシュボード' })).toBeVisible()
})
