import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { users } from '../test-data/users';

export { expect } from '@playwright/test';



type MyFixtures = {
  dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
    dashboardPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login(users.validUser.username, users.validUser.password);
        await use(dashboardPage);
    }
});