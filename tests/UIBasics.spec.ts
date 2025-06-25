import { expect, test } from "@playwright/test";


test('First Playwright Test', async ({browser}) => {
    //create context --- plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

/** 
test.only('default Playwright test', async({page}) =>{  only run the test that contains .only in the tesrDir folder
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});
**/

test('Sucessfull login', async({page}) =>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    //get title - assertion
    await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
    console.log(await page.title());

    //selector css,xpath
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[name='password']").fill('learning');
    await page.locator(".btn-info").click();
    const cardTitle = await page.locator(".card-body .card-title a");
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    //get all products title
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
    //validate that title contain partial matching
    const hasTitle = allTitles.some(title => title.includes("iphone"));
    await expect(hasTitle).toBeTruthy();
});

test('Incorrect  username/password.', async({page}) =>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    //get title - assertion
    await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
    console.log(await page.title());

    //selector css,xpath
    await page.locator('#username').fill('Awalker');
    await page.locator("[name='password']").fill('badpassword');
    await page.locator(".btn-info").click();
    //wait until locator shown up page
    const failedLoginMsg = await page.locator("[style*='block']");
    await expect(failedLoginMsg).toContainText("Incorrect username/password.");
});