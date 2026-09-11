const { test, expect } = require('@playwright/test')
const Homepage = require('../pages/homepage')
const AdminLoginAndRegister = require('../pages/adminloginandregisterpage')

const ADMIN_USERNAME = 'admin@agarbattikart.com'
const ADMIN_PASSWORD = 'Admin@123'

test.skip("verify the login functionality with valid credentials", async ({ page }) => {
    const homepage = new Homepage(page)
    const adminLoginAndRegister = new AdminLoginAndRegister(page)
    await homepage.gotohomepage()
    await expect(page).toHaveTitle('AgarbattiKart — Incense & Pooja Essentials')
    await homepage.goToLoginPage()
    await adminLoginAndRegister.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD)
    await adminLoginAndRegister.checkLoginSuccess();

})



test.skip("verify the same product is added to cart with the same price", async ({ page }) => {
    const homepage = new Homepage(page)
    const adminLoginAndRegister = new AdminLoginAndRegister(page)
    await homepage.gotohomepage()
    await homepage.goToLoginPage()
    await adminLoginAndRegister.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD)
    const { productName, productPrice, newPage } = await adminLoginAndRegister.addtoCart();

    console.log("Selected product:", productName);
    console.log("Selected price:", productPrice);

    const cartProduct = newPage.locator(
        "//a[normalize-space()='JB Fragrances and Flavours - GOLD BD']"
    );

    const cartProductName = await cartProduct.textContent();

    const cartProductPrice = await cartProduct
        .locator("xpath=..")
        .locator("p")
        .textContent();

    console.log("Cart product:", cartProductName);
    console.log("Cart price:", cartProductPrice);

    expect(cartProductName).toBe(productName);
    expect(cartProductPrice).toContain(productPrice);
})

test('verify searched product is present', async ({ page }) => {

    const homepage = new Homepage(page);

    const productName = 'JB Fragrances and Flavours - GOLD BD';

    await homepage.gotohomepage();

    await homepage.searchProduct(productName);

    const product = page.locator(
        `//a[normalize-space()='${productName}']`
    );

    await expect(product).toBeVisible();
});