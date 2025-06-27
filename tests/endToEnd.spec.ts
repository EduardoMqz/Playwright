import test, { expect } from "@playwright/test";

test("End to end framework", async ({page}) => {
    const produtToBuy = "ADIDAS ORIGINAL";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const products = await page.locator(".card-body").all();
    for (const product of products){
        const title = await product.locator("b").textContent();
        if(title.includes(produtToBuy)){
            await product.locator("text= Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const produtInCart = await page.locator("h3:text('"+produtToBuy+"')").isVisible();
    await expect(produtInCart).toBeTruthy();
    await page.locator(".btn-primary").nth(2).click();
    //await page.pause();
    

    //selewct adidas original


})