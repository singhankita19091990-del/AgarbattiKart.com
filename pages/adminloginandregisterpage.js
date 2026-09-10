const { expect } = require('@playwright/test');

class AdminLoginAndRegisterPage {
    constructor(page) {
        this.page = page;
    }

    async adminlogin(username, password) {
        await this.page.fill('input[type="email"]', username);
        await this.page.fill('input[type="password"]', password);
        await this.page.waitForTimeout(3000); // Wait for 2 seconds before clicking the login button
        await this.page.click("//button[normalize-space()='Log In']");
        await this.page.waitForTimeout(3000); // Wait for 2 seconds before clicking the login button

    }

    async checkLoginSuccess() {
        await expect(this.page).toHaveURL(/admin/);
    }

    async addtoCart() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click("//a[normalize-space()='View Store']")
        ]);

        await newPage.waitForLoadState();
        const productLocator = newPage.locator(
            "//a[normalize-space()='JB Fragrances and Flavours - GOLD BD']"
        );

        await productLocator.waitFor({ state: 'visible' });
        const productName = await productLocator.textContent();
        const productPrice = await productLocator
            .locator("xpath=..")
            .locator("span[class='text-lg font-bold text-ink']")
            .textContent();

        await newPage.click(
            "//button[@class='btn-primary mt-2 w-full'][normalize-space()='Add to Cart'][1]"
        );

        await newPage.click("//span[@class='relative']//*[name()='svg']");

        await newPage.waitForTimeout(2000);
        return { productName, productPrice, newPage };
    }

}

module.exports = AdminLoginAndRegisterPage;