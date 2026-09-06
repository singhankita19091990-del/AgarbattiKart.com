const { expect } = require('@playwright/test');

class AdminLoginAndRegisterPage
{
    constructor(page)
    {
        this.page = page;
    }
    async adminlogin(username, password)
    {
    await this.page.fill('input[type="email"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.waitForTimeout(8000); // Wait for 2 seconds before clicking the login button
    await this.page.click("//button[normalize-space()='Log In']");
    await this.page.waitForTimeout(8000); // Wait for 2 seconds before clicking the login button

  }

   async checkLoginSuccess() {
    await expect(this.page.url()).toContain('/admin');
  }

async addtoCart() {
    await this.page.click("//a[normalize-space()='View Store']");
    await this.page.click("//button[@class='btn-primary mt-2 w-full'][normalize-space()='Add to Cart'][1]");
    await this.page.click("//span[@class='relative']//*[name()='svg']");
 }


}

module.exports = AdminLoginAndRegisterPage;