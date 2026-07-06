import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransfersPage } from '../../pages/TransfersPage';
import { FixedTermsPage } from '../../pages/FixedTermsPage';

test.describe('Navigation', () => {
  const menuItems = [
  { view: 'transfer', label: 'Transferencias', PageObject: TransfersPage },
  { view: 'fixed-deposit', label: 'Plazos Fijos', PageObject: FixedTermsPage },
];

for (const item of menuItems) {
  test(`Should navigate to ${item.label} section`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'demo123');    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.menuItem(item.view).click();
    const targetPage = new item.PageObject(page);
    await expect(targetPage.sectionHeading).toBeVisible();
  });
}
});