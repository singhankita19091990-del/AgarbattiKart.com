const{test,expect}=require('@playwright/test')
const Homepage=require('../pages/homepage')
const AdminLoginAndRegister=require('../pages/adminloginandregisterpage')

const ADMIN_USERNAME = 'admin@agarbattikart.com'
const ADMIN_PASSWORD = 'Admin@123'

test("landing on the homepage",async({page}) =>{
    const homepage = new Homepage(page)
    await homepage.gotohomepage()
    await expect(page).toHaveTitle('AgarbattiKart')
    await homepage.locator(span[class='hidden text-sm font-medium lg:block']).click()
    await homepage.locator("//a[normalize-space()='Login / Register']").click()
    
})

test("adminlogin",async({page})=>{

  const loginPage = new AdmPageinLoginAn(page);
  const adminPage = new AdminPage(page);
  
  await loginPage.gotohomepage();
  await loginPage.adminlogin(ADMIN_USERNAME, ADMIN_PASSWORD);
  await loginPage.checkLoginSuccess();
  
}


})