import { test, expect, request } from "@playwright/test";
const {apiUtils} = require("./utils/apiUtils");

const loginPayload = { userEmail: "user", userPassword: "password" }
const orderPayload = { orders: [{ country: "Japan", productOrderedId: "62023a7616fcf72fe9dfc619" }] }
let token;
let apiContext;

test.beforeAll(async () => {

    apiContext = await request.newContext();
    const apiUtil = new apiUtils(loginPayload, loginPayload);
    apiUtil.createOrder(orderPayload);



    


})

test("API integration  calls", async ({ page }) => {

   //login
    const produtToBuy = "ADIDAS ORIGINAL";
    const apiUtil = new apiUtils(apiContext, loginPayload);
    const orderId = createOrder(orderPayload);
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
 
    //validate order (order is created in beforeAll)
    await page.locator("[routerlink*='myorder']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr").all();
    for (const row of rows) {
        const rowOrderID = await row.locator("th").textContent();
        if (rowOrderID.includes(orderId)) {
            await row.locator("button.btn-primary").click();
            break;
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderIdDetails.includes(orderId)).toBeTruthy();
    }


})

test("Verify if roder craetedin history page", async ({ page }) => {

})