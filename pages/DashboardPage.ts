import { expect, type Page, type Locator } from '@playwright/test';
import { parseArgentineCurrency } from '../utils/currencyHelpers';

export class DashboardPage {
  readonly page: Page;
  readonly panelHeading: Locator;
  readonly checkingBalance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.panelHeading = page.getByRole('heading', {
      name: 'Panel Principal',
      level: 2,
    });
    this.checkingBalance = page.locator(
      '[data-balance="checking"] .balance-value',
    );
  }

  menuItem(view: string): Locator {
    return this.page.locator(`[data-view="${view}"]`);
  }

  async getCheckingBalance(): Promise<number> {
    await expect(this.checkingBalance).not.toHaveText('0.00');
    //textContent is used to extract the content as a string so numeric values can be compared before/after.
    const balanceText = await this.checkingBalance.textContent();
    return parseArgentineCurrency(balanceText!);
  }
}
