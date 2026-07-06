import type { Page, Locator } from '@playwright/test';

export class TransfersPage {
    readonly page: Page;
    readonly sectionHeading : Locator;
   
constructor (page: Page) {
     this.page = page;
     this.sectionHeading  = page.getByRole('heading', { name: 'Transferencias', level: 2 });

  }  

}
