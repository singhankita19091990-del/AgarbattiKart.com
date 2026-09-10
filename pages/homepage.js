class homepage
{
    constructor(page)
    {
        this.page = page;
    }

    async gotohomepage()
    {
        await this.page.goto('https://www.agarbattikart.com/');
    }

    async goToLoginPage() {
        await this.page.locator("span[class='hidden text-sm font-medium lg:block']").click();
        await this.page.locator("//a[normalize-space()='Login / Register']").click();
    }

    }


module.exports = homepage;