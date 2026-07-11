import type { Page, Locator } from '@playwright/test';

export class ToastNotification {
    readonly page: Page;
    getMessage(text: string): Locator {
        return this.page.locator('.toast-message', { hasText: text });
    }

constructor (page: Page) {
    this.page = page;
    }




}
