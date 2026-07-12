import { test, expect } from '../../fixtures/base.fixture';
import { TransfersPage } from '../../pages/TransfersPage';
import { TransferConfirmationModal } from '../../pages/TransferConfirmationModal';
import { ToastNotification } from '../../pages/ToastNotification';

test('Should transfer money successfully between own accounts', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({'sourceAccount': 'ACC001', 'destinationAccount': 'ACC002', 'amount': '100'});
    const transferConfirmationModal = new TransferConfirmationModal(page);
    await transferConfirmationModal.confirmButton.click();
    const toastNotification = new ToastNotification(page);
    await expect(toastNotification.getMessage('Transferencia realizada exitosamente')).toBeVisible();
});

test('Should display an error message when trying to transfer between the same accounts', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({'sourceAccount': 'ACC001', 'destinationAccount': 'ACC001', 'amount': '100'});
    await expect(transfersPage.transferErrorMessage).toHaveText(/La cuenta origen y destino no pueden ser la misma/);
});

test('Should display an error message when trying to transfer more than the limit', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({'sourceAccount': 'ACC001', 'destinationAccount': 'ACC002', 'amount': '55000'});
    const transferConfirmationModal = new TransferConfirmationModal(page);
    await transferConfirmationModal.confirmButton.click();
    await expect(transfersPage.transferErrorMessage).toHaveText(/El monto máximo por transferencia es \$50\.000/);
});

test('Should display an error message when trying to transfer an empty amount', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({'sourceAccount': 'ACC001', 'destinationAccount': 'ACC002', 'amount': ''});
    const result = await transfersPage.transferAmount.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(result).toBe(false);
});

