import { test, expect } from '@playwright/test';
import { TransfersPage } from '../../pages/TransfersPage';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransferConfirmationModal } from '../../pages/TransferConfirmationModal';
import { ToastNotification } from '../../pages/ToastNotification';

test('Should transfer money successfully between own accounts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'demo123');
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({'sourceAccount': 'ACC001', 'destinationAccount': 'ACC002', 'amount': '100'});
    const transferConfirmationModal = new TransferConfirmationModal(page);
    await transferConfirmationModal.confirmButton.click();
    const toastNotification = new ToastNotification(page);
    await expect(toastNotification.getMessage('Transferencia realizada exitosamente')).toBeVisible();
});


