import type { Page, Locator } from '@playwright/test';

export class FixedTermsPage {
    readonly page: Page;
    readonly sectionHeading : Locator;
   
constructor (page: Page) {
     this.page = page;
     this.sectionHeading  = page.getByRole('heading', { name: 'Plazos Fijos', level: 2 });

  }  

}
