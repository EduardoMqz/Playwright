const { test } = require('@playwright/test');

test('First Playwright Test', async ({browser}) => {
    //create context --- plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('default Playwright test', async({page}) =>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});