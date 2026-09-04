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
    await this.page.click("//button[normalize-space()='Log In']");
  }

   async checkLoginSuccess() {
    await this.page.locator("//span[normalize-space()='Dashboard']").waitFor();
  }

}

module.exports = AdminLoginAndRegisterPage;