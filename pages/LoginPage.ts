import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

constructor (page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Usuario');
    this.passwordInput = page.getByLabel('Contraseña');
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });
  }  

  
async goto() {
  await this.page.goto('/');
  }

  
async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


} 

