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

test('default Playwright test', async({page}) =>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    //get title - assertion
    await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
    console.log(await page.title());

    //selector css,xpath
    await page.locator('#username').fill('rahulshettyacademy ');
    await page.locator("[name='password']").fill('learning');
    await page.locator(".btn-info").click();
});