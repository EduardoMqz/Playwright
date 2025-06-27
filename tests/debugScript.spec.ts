import {expect,test} from "@playwright/test";

//To run on debug

test("Playwright inspector", async ({ page }) => {
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
})

test("Record-PlayBack", async ({page}) =>{
//npx playwright codegen [URL TO RECORD]
})

test("Generate report", async ({page}) => {
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
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
    const allTitles = await cardTitle.allTextContents();
    const hasTitle = allTitles.some(title => title.includes("iphone"));
    await expect(hasTitle).toBeTruthy();
})

