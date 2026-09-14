const { expect } = require('@playwright/test');

class homepage {
    constructor(page) {
        this.page = page;
        // search locators
        this.searchLocator = 'input[placeholder*="Search for Agarbatti Machines, Chemical Compounds, DEP Oil…"]'
        this.searchButtonLocator = "//button[@class='absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary-600 p-2 text-white']//*[name()='svg']"

        // login locators
        this.loginButtonLocator = "span[class='hidden text-sm font-medium lg:block']"
        this.loginLinkLocator = "//a[normalize-space()='Login / Register']"
        this.productsMenu=page.locator('text=Spare Parts');
        this.sparePartsCategory=page.locator('input[type="range"]');
        this.productPrices=page.locator('.price');
    }

    async gotohomepage() {
        await this.page.goto('https://www.agarbattikart.com/');
    }

    async goToLoginPage() {
        await this.page.locator("span[class='hidden text-sm font-medium lg:block']").click();
        await this.page.locator("//a[normalize-space()='Login / Register']").click();
    }

    async searchProduct(productName) {
        await this.page.locator(this.searchLocator);
        await this.page.locator(this.searchButtonLocator).click();
    }

    async searchResult(productName) {
        await this.page.locator(`//a[normalize-space()='${productName}']`).click();
    }

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
   
    async openSpareParts(){
            await this.productsMenu.click();
            await this.sparePartsCategory.click();
            await this.page.waitForLoadState('networkidle');
            }
        async filterPriceBelow100()
        {
                await this.priceSlider.evaluate((slider) => {
                    slider.value = 100;
                    slider.dispatchEvent(new Event('input'));
                    slider.dispatchEvent(new Event('change'));
                });
                await this.page.waitForLoadState('networkidle');
            }

            async verifyProductPricesBelow100() {
                const count = await this.productPrices.count();
                for (let i = 0; i < count; i++) {
                    const text= await this.productPrices.nth(i).textContent();
                    const price = Number(
                        text.replace(/[^\d.]/g, '')
                    );
                    expect(price).toBeLessThanOrEqual(100);                    )

        }
        
        }
    }





module.exports = homepage;