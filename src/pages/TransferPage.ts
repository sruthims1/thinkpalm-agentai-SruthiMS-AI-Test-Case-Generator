import { Page, Locator } from '@playwright/test';

export class TransferPage {
  private amountInput: Locator;
  private fromAccount: Locator;
  private toAccount: Locator;
  private transferButton: Locator;
  private resultContainer: Locator;
  private errorMessage: Locator;

  constructor(private page: Page) {
    this.amountInput = page.locator('#amount');
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.resultContainer = page.locator('#showResult');
    this.errorMessage = page.locator('.error');
  }

  async navigate() {
    await this.page.goto('transfer.htm');
  }

  async waitForAccountsToLoad() {
    await this.page.waitForFunction(() => {
      const select = document.querySelector('#fromAccountId') as HTMLSelectElement;
      return select && select.options.length > 0;
    }, { timeout: 15000 });
  }

  async getFromAccountOptions(): Promise<string[]> {
    return await this.page.locator('#fromAccountId option').allInnerTexts();
  }

  async transferFunds(amount: string) {
    await this.waitForAccountsToLoad();
    const options = await this.getFromAccountOptions();
    await this.fromAccount.selectOption({ index: 0 });
    if (options.length > 1) {
      await this.toAccount.selectOption({ index: 1 });
    }
    await this.amountInput.fill(amount);
    await this.transferButton.click();
  }

  async isTransferSuccessful(): Promise<boolean> {
    return await this.resultContainer.isVisible();
  }

  async getResultText(): Promise<string> {
    return await this.resultContainer.innerText();
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async isTransferPageLoaded(): Promise<boolean> {
    return await this.amountInput.isVisible();
  }
}
