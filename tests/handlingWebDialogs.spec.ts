import { test, expect } from "@playwright/test";

test("Validate if element is hidden", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Browser alerts
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#alertbtn").click();
    //page.on("dialog", dialog => dialog.dismiss());
    //await page.locator("#confirmbtn").click();

    //Hover
    await page.locator("#mousehover").hover();

    //frames
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})