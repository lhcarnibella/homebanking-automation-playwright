import { test, expect } from '../../fixtures/base.fixture';
import { TransfersPage } from '../../pages/TransfersPage';
import { FixedTermsPage } from '../../pages/FixedTermsPage';

test.describe('Navigation', () => {
  const menuItems = [
    { view: 'transfer', label: 'Transferencias', PageObject: TransfersPage },
    {
      view: 'fixed-deposit',
      label: 'Plazos Fijos',
      PageObject: FixedTermsPage,
    },
  ];

  for (const item of menuItems) {
    test(`Should navigate to ${item.label} section`, async ({
      dashboardPage,
      page,
    }) => {
      await dashboardPage.menuItem(item.view).click();
      const targetPage = new item.PageObject(page);
      await expect(targetPage.sectionHeading).toBeVisible();
    });
  }
});
