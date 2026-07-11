import type { Page, Locator } from '@playwright/test';

type TransferData = {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  description?: string;
};


export class TransfersPage {
    readonly page: Page;
    readonly sectionHeading : Locator;
    readonly transferTypeSelect: Locator;
    readonly sourceAccount: Locator;
    readonly destinationAccount: Locator;
    readonly transferAmount: Locator;
    readonly transferDescription: Locator;
    readonly submitButton: Locator;
    readonly transferErrorMessage: Locator;
  


   
constructor (page: Page) {
    this.page = page;
    this.sectionHeading  = page.getByRole('heading', { name: 'Transferencias', level: 2 });
    this.transferTypeSelect = page.getByLabel('Tipo de transferencia');
    this.sourceAccount = page.locator('#source-account');
    this.destinationAccount = page.locator('#destination-own-account');
    this.transferAmount = page.locator('#transfer-amount');
    this.transferDescription = page.getByLabel('Descripción (opcional)');
    this.submitButton = page.getByRole('button', { name: 'Transferir' }); 
    this.transferErrorMessage = page.locator('#transfer-error');      
  }  

async transfer(data: TransferData) {
    await this.transferTypeSelect.selectOption('own'); // Assuming 'own' is the value for transferring between own accounts beacuse the test case for this page is only for transferring between own accounts
    await this.sourceAccount.selectOption(data.sourceAccount);
    await this.destinationAccount.selectOption(data.destinationAccount);
    await this.transferAmount.fill(data.amount);
    if (data.description) {
        await this.transferDescription.fill(data.description);
    }
    await this.submitButton.click();
  }  

}

  
    