import { test, expect, request } from "@playwright/test";

const loginPayload = {userEmail:"user",userPassword:"password"}
let token;

test.beforeAll( async () => { 
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https:rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
    expect(loginResponse).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

})

test.beforeEach(() => {

})

test("API integration  calls", async ({page}) => {
    /*
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    */
   const produtToBuy = "ADIDAS ORIGINAL";
   page.addInitScript(value => {
    window.localStorage.setItem("token",value);
   },token);
   await page.goto("https://rahulshettyacademy.com/client");
    const products = await page.locator(".card-body").all();
    for (const product of products) {
        const title = await product.locator("b").textContent();
        if (title.includes(produtToBuy)) {
            await product.locator("text= Add To Cart").click();
        }
    }
})