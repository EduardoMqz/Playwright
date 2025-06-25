import { expect, test } from "@playwright/test";

test("Login and obtain first item", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    const cardTitle = await page.locator(".card-body h5");
    console.log(await cardTitle.first().textContent());
    //extras
    console.log(await cardTitle.nth(1).textContent());
    await page.waitForLoadState("networkidle");
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
    const hasTitle = await allTitles.some(title => title.includes("ZARA"));
    await expect(hasTitle).toBeTruthy();
});

test("create user", ({page}) => {

});
