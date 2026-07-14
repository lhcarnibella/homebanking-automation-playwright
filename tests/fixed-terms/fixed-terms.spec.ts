import { test, expect } from '../../fixtures/base.fixture';
import { FixedTermsPage } from '../../pages/FixedTermsPage';
import { DepositConfirmationModal } from '../../pages/DepositConfirmationModal';
import { DepositCancellationModal } from '../../pages/DepositCancellationModal';
import { ToastNotification } from '../../pages/ToastNotification';
import { messages } from '../../test-data/messages';
import { accounts } from '../../test-data/accounts';
import { fixedTerms } from '../../test-data/fixedTerms';
import { parseArgentineCurrency } from '../../utils/currencyHelpers';



test('Should deposit created successfully', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('fixed-deposit').click();
    const fixedTermsPage = new FixedTermsPage(page);
    const amount = '15000';
    await fixedTermsPage.createDeposit({sourceAccount: accounts.checkingAccount.accountCode, amount, term: fixedTerms.thirtyDays.days });
    const tna = fixedTerms.thirtyDays.tna;
    const days = Number(fixedTerms.thirtyDays.days);
    const expectedInterest = Number(amount) * (tna / 100) * (days / 365);
    const realInterestText = await fixedTermsPage.estimatedInterest.textContent();
    const realInterest = parseArgentineCurrency(realInterestText!);
    expect(realInterest).toBeCloseTo(expectedInterest, 2);
    const depositConfirmationModal = new DepositConfirmationModal(page);
    await depositConfirmationModal.confirmButton.click();
    const toastNotification = new ToastNotification(page);
    await expect(toastNotification.getMessage(messages.successDeposit)).toBeVisible();
});

test('Should deposit cancelled successfully', async ({ dashboardPage, page }) => {
    await dashboardPage.menuItem('fixed-deposit').click();
    const fixedTermsPage = new FixedTermsPage(page);
    await fixedTermsPage.createDeposit({sourceAccount: accounts.checkingAccount.accountCode, amount : '9876', term: fixedTerms.thirtyDays.days });
    const depositConfirmationModal = new DepositConfirmationModal(page);
    await depositConfirmationModal.confirmButton.click();
    const toastNotification = new ToastNotification(page);
    await expect(toastNotification.getMessage(messages.successDeposit)).toBeVisible(); 
    const depositItem = page.locator('.deposit-item', { hasText: '$ 9.876,00' });
    const cancelButton = depositItem.getByRole('button', { name: 'Cancelar' });
    await cancelButton.click();
    const depositCancellationModal = new DepositCancellationModal(page);
    await depositCancellationModal.confirmButton.click();
    await expect(toastNotification.getMessage(messages.cancelledDeposit)).toBeVisible();
});


