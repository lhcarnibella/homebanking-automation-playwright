import type { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly panelHeading: Locator;
   
constructor (page: Page) {
     this.page = page;
     this.panelHeading = page.getByRole('heading', { name: 'Panel Principal', level: 2 });

  }  

menuItem(view: string): Locator {
  return this.page.locator(`[data-view="${view}"]`);
}

}