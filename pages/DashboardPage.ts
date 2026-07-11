import { expect, type Page, type Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly panelHeading: Locator;
    readonly checkingBalance: Locator;
   
constructor (page: Page) {
     this.page = page;
     this.panelHeading = page.getByRole('heading', { name: 'Panel Principal', level: 2 });
     this.checkingBalance = page.locator('[data-balance="checking"] .balance-value');
  }  

menuItem(view: string): Locator {
  return this.page.locator(`[data-view="${view}"]`);
}

async getCheckingBalance(): Promise<number> {
  await expect(this.checkingBalance).not.toHaveText('0.00');
  //textContent is used to extract the content as a string so numeric values can be compared before/after.
  const balanceText = await this.checkingBalance.textContent(); 
  //replace(/./g, '') — replaces all dots (thousands separators) with nothing, using the regex with the g (global) flag that we already mentioned. "499.999,00" → "499999,00"
  //.replace(',', '.') — replaces the first comma (decimal separator) with a dot. Here you don't need the global flag (there is only one decimal comma), so a simple string replace is enough. "499999,00" → "499999.00"
  const cleanedText = balanceText!.replace(/\./g, '').replace(',', '.'); 
  return Number(cleanedText);
}

}

