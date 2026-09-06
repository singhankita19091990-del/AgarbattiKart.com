const{test,expect}=require('@playwright/test')
const Homepage=require('../pages/homepage')
const AdminLoginAndRegister=require('../pages/adminloginandregisterpage')

const ADMIN_USERNAME = 'admin@agarbattikart.com'
const ADMIN_PASSWORD = 'Admin@123'

test("verify the login functionality with valid credentials",async({page}) =>{
    const homepage = new Homepage(page)
    const adminLoginAndRegister = new AdminLoginAndRegister(page)
    await homepage.gotohomepage()
    await expect(page).toHaveTitle('AgarbattiKart — Incense & Pooja Essentials')
    await homepage.goToLoginPage()
    await adminLoginAndRegister.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD)
    await adminLoginAndRegister.checkLoginSuccess();

})

test("verify the add to cart functionality",async({page}) =>{
    const homepage = new Homepage(page)
    const adminLoginAndRegister = new AdminLoginAndRegister(page)
    await homepage.gotohomepage()
    await homepage.goToLoginPage()
    await adminLoginAndRegister.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD)
    await adminLoginAndRegister.addtoCart()
    await expect(page.locator("//a[normalize-space()='JB Fragrances and Flavours - GOLD BD']")).toBeVisible();

})