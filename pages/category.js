const { expect } = require('@playwright/test');

class Category {
    constructor(page) {
        this.page = page;

        // Spare Parts locators
        this.productsMenu = page.locator("//a[contains(text(),'Spare Parts')]");
        this.sparePartsCategory = page.locator('input[type="range"]');
        this.productPrices = page.locator('.price');

        // Product locator
        this.products = page.locator("//a[contains(@href,'/product/')]");
        this.nextPage = page.locator('button[aria-label="Next page"]');
    }

    // Open Spare Parts category
    async openSpareParts() {
        await this.productsMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    // Filter products below Rs. 100
    async filterPriceBelow100() {
        await this.sparePartsCategory.evaluate((slider) => {
            slider.value = 100;
            slider.dispatchEvent(new Event('input', { bubbles: true }));
            slider.dispatchEvent(new Event('change', { bubbles: true }));
        });

        await this.page.waitForLoadState('networkidle');
    }

    // Verify product prices
    async verifyProductPricesBelow100() {
        const count = await this.productPrices.count();

        for (let i = 0; i < count; i++) {
            const text = await this.productPrices.nth(i).textContent();
            const price = Number(text.replace(/[^\d.]/g, ''));

            expect(price).toBeLessThanOrEqual(100);
        }
    }

    // Check Agarbatti Machine products
    async checkAgarbattiMachineProducts() {
        await this.page.locator(
            "a[href='/shop?category=agarbatti-machines']"
        ).click();

        const products = this.page.locator(
            "//a[contains(@href,'/product/')]"
        );

        const count = await products.count();
        const productNames = [];

        for (let i = 0; i < count; i++) {
            const productName = await products.nth(i).textContent();
            productNames.push(productName);
        }

        return productNames;
    }

    // Count all Spare Parts products across pages
    async countSparePartsProducts() {
        await this.page.goto(
            'https://www.agarbattikart.com/shop?category=spare-parts'
        );

        await this.page.waitForLoadState('networkidle');

        let totalProducts = 0;

        while (true) {
            const count = await this.products.count();

            console.log('Products on this page:', count);

            totalProducts = totalProducts + count;

            if (await this.nextPage.isDisabled()) {
                break;
            }

            const firstProduct = await this.products.first().getAttribute('href');

            await this.nextPage.click();

            await expect(this.products.first()).not.toHaveAttribute(
                'href',
                firstProduct
            );
        }

        console.log('Total Spare Parts Products =', totalProducts);

        expect(totalProducts).toBe(124);
    }
}

module.exports = Category;