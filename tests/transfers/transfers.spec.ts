import { test, expect } from '../../fixtures/base.fixture';
import { TransfersPage } from '../../pages/TransfersPage';
import { TransferConfirmationModal } from '../../pages/TransferConfirmationModal';
import { ToastNotification } from '../../pages/ToastNotification';
import { messages } from '../../test-data/messages';
import { accounts } from '../../test-data/accounts';
import { MAX_TRANSFER_AMOUNT } from '../../test-data/businessRules';
import { escapeRegExp } from '../../utils/regexHelpers'


test('Should transfer money successfully between own accounts', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({sourceAccount: accounts.checkingAccount.accountCode, destinationAccount: accounts.savingsAccount.accountCode, amount: '100' });
    const transferConfirmationModal = new TransferConfirmationModal(page);
    await transferConfirmationModal.confirmButton.click();
    const toastNotification = new ToastNotification(page);
    await expect(toastNotification.getMessage(messages.successTransfer)).toBeVisible();
});

test('Should display an error message when trying to transfer between the same accounts', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({sourceAccount: accounts.checkingAccount.accountCode, destinationAccount: accounts.checkingAccount.accountCode, 'amount': '100'});
    await expect(transfersPage.transferErrorMessage).toHaveText(new RegExp(messages.sameAccounts));
    
});

test('Should display an error message when trying to transfer more than the limit', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    const amountOutsideLimit = MAX_TRANSFER_AMOUNT + 1;
    await transfersPage.transfer({sourceAccount: accounts.checkingAccount.accountCode, destinationAccount: accounts.savingsAccount.accountCode, amount: String(amountOutsideLimit)});
    const transferConfirmationModal = new TransferConfirmationModal(page);
    await transferConfirmationModal.confirmButton.click();
    await expect(transfersPage.transferErrorMessage).toHaveText(new RegExp(escapeRegExp(messages.amountMax)));
});

// TODO: add boundary test for exact MAX_TRANSFER_AMOUNT value


test('Should display an error message when trying to transfer an empty amount', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('transfer').click();
    const transfersPage = new TransfersPage(page);
    await transfersPage.transfer({sourceAccount: accounts.checkingAccount.accountCode, destinationAccount: accounts.savingsAccount.accountCode, 'amount': ''});
    const result = await transfersPage.transferAmount.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(result).toBe(false);
});

