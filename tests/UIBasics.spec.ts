import { expect, test } from "@playwright/test";
import assert from "assert";

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