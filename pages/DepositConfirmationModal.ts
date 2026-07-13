import type { Page, Locator } from '@playwright/test';

export class DepositConfirmationModal {
    readonly page: Page;
    readonly confirmButton: Locator;
    readonly cancelButton: Locator;

constructor (page: Page) {
    this.page = page;
    this.confirmButton = page.getByRole('button', { name: 'Confirmar' });
    this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
    }

}