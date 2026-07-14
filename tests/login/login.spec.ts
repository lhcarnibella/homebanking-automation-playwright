import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { users } from '../../test-data/users';
import { messages } from '../../test-data/messages';

test('Should login successfully with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(dashboardPage.panelHeading).toBeVisible();
});

test('Should display a message indicating invalid credentials', { tag: '@regression' }, async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);
  await expect(loginPage.errorMessage).toHaveText(
    new RegExp(messages.loginInvalid),
  );
});

test('should display an account locked message', { tag: '@regression' }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.lockedUser.username, users.lockedUser.password);
  await expect(loginPage.errorMessage).toHaveText(
    new RegExp(messages.accountBlocked),
  );
});
