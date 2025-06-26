import { expect, test } from "@playwright/test";


test('First Playwright Test', async ({ browser }) => {
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

test('Sucessfull login', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //get title - assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    console.log(await page.title());
    //selector css,xpath
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[name='password']").fill('learning');
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("teach");
    const adminRadioButton = await page.locator(".radiotextsty").first();
    await adminRadioButton.click();
    await adminRadioButton.isChecked();
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

test('Incorrect  username/password.', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //get title - assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    console.log(await page.title());
    //selector css,xpath
    await page.locator('#username').fill('Awalker');
    await page.locator("[name='password']").fill('badpassword');
    //static dropdown selection
    const dropdown = await page.locator("select.form-control");
    dropdown.selectOption("consult");
    //select radio button
    const userRadioButton = page.locator(".radiotextsty").last();
    await userRadioButton.click();
    await page.locator(".btn-success").click();
    expect(userRadioButton).toBeChecked();
    // click terms checkbox
    const termsCheckBox = await page.locator("#terms");
    await termsCheckBox.click();
    await expect(termsCheckBox).toBeChecked();
    await termsCheckBox.uncheck();
    expect(await termsCheckBox.isChecked()).toBeFalsy();
    //blink element
    const blinkingElement = page.locator("[href*='documents-request']");
    await expect (blinkingElement).toHaveAttribute("class","blinkingText");
    //click button
    await page.locator(".btn-info").click();
    //wait until locator shown up page
    const failedLoginMsg = await page.locator("[style*='block']");
    await expect(failedLoginMsg).toContainText("Incorrect username/password.");
});

test("Child window handling", async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent("page"), //listen for any new page
        documentLink.click()
    ]);
     // new page is open
    const text = await newPage.locator(".red").textContent();
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    await page.locator("#username").fill(domain);
})
