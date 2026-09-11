class homepage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('input[placeholder*="Search for Agarbatti Machines, Chemical Compounds, DEP Oil…"]');
    }

    async gotohomepage() {
        await this.page.goto('https://www.agarbattikart.com/');
    }

    async goToLoginPage() {
        await this.page.locator("span[class='hidden text-sm font-medium lg:block']").click();
        await this.page.locator("//a[normalize-space()='Login / Register']").click();
    }

    async searchProduct(productName) {
        await this.searchBox.fill(productName);
        await this.page.locator("//button[@class='absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary-600 p-2 text-white']//*[name()='svg']").click();
    }

}


module.exports = homepage;