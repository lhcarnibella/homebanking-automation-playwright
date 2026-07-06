import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test('Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'demo123');
    await expect(dashboardPage.panelHeading).toBeVisible();

});

test('Should display a message indicating invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong', 'wrong');
    await expect(loginPage.errorMessage).toHaveText(/Usuario o contraseña incorrectos. Intentos restantes:/);

});

test('should display an account locked message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked', 'locked');
    await expect(loginPage.errorMessage).toHaveText(/Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte./);

});