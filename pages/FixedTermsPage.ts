import type { Page, Locator } from '@playwright/test';

type DepositData = {
  sourceAccount: string;
  amount: string;
  term: string;
};

export class FixedTermsPage {
  readonly page: Page;
  readonly sectionHeading: Locator;
  readonly sourceAccount: Locator;
  readonly investmentAmount: Locator;
  readonly term: Locator;
  readonly estimatedInterest: Locator;
  readonly totalMaturity: Locator;
  readonly maturityDate: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionHeading = page.getByRole('heading', {
      name: 'Plazos Fijos',
      level: 2,
    });
    this.sourceAccount = page.locator('#deposit-source-account');
    this.investmentAmount = page.getByLabel('Monto a invertir');
    this.term = page.getByLabel('Plazo');
    this.estimatedInterest = page.locator('#estimated-interest');
    this.totalMaturity = page.locator('#total-maturity');
    this.maturityDate = page.locator('#maturity-date');
    this.createButton = page.getByRole('button', { name: 'Crear Plazo Fijo' });
  }

  async createDeposit(data: DepositData) {
    await this.sourceAccount.selectOption(data.sourceAccount);
    await this.investmentAmount.fill(data.amount);
    await this.term.selectOption(data.term);
    await this.createButton.click();
  }
}
