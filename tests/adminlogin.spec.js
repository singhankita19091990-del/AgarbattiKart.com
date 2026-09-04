const{test,expect}=require('@playwright/test')
const Homepage=require('../pages/homepage')
const AdminLoginAndRegister=require('../pages/adminLoginAndRegisterPage')

const ADMIN_USERNAME = 'admin@agarbattikart.com'
const ADMIN_PASSWORD = 'Admin@123'

test("verify the login functionality with valid credentials",async({page}) =>{
    const homepage = new Homepage(page)
    const adminLoginAndRegister = new AdminLoginAndRegister(page)
    await homepage.gotohomepage()
    await expect(page).toHaveTitle('AgarbattiKart — Incense & Pooja Essentials')
    await homepage.goToLoginPage()
    await adminLoginAndRegister.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD)
    await adminPage.checkLoginSuccess();

})