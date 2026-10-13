const { expect } = require('@playwright/test');

class homepage {
    constructor(page) {
        this.page = page;

        // Search locators
        this.searchLocator = 'input[placeholder*="Search for Agarbatti Machines, Chemical Compounds, DEP Oil…"]';

        this.searchButtonLocator = "//button[@class='absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary-600 p-2 text-white']//\*[name()='svg']";

        // Login locators
        this.loginButtonLocator = "span[class='hidden text-sm font-medium lg\\:block']";
        this.loginLinkLocator = "//a[normalize-space()='Login / Register']";

        // Cart locators
        this.cartIcon = this.page.locator('a[href="/cart"]');
        this.removeButton = this.page.locator('button', { hasText: 'Remove' });
        this.emptyCartMessage = this.page.locator('text=Your cart is empty');
    }

    async gotohomepage() {
        await this.page.goto('https://www.agarbattikart.com/');
    }

    async goToLoginPage() {
        await this.page.locator(this.loginButtonLocator).click();
        await this.page.locator(this.loginLinkLocator).click();
    }

    async searchProduct(productName) {
        await this.page.locator(this.searchLocator).fill(productName);
        await this.page.locator(this.searchButtonLocator).click();
    }

    async searchResult(productName) {
        await this.page.locator(
            `//a[normalize-space()='${productName}']`
        ).click();
    }

    async removeProductFromCart() {
        await this.removeButton.first().click();
        await this.page.waitForTimeout(2000);
    }

    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible();
    }
}

module.exports = homepage;