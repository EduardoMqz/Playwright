import test, { expect } from "@playwright/test";

test("End to end framework", async ({ page }) => {
    const produtToBuy = "ADIDAS ORIGINAL";
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const products = await page.locator(".card-body").all();
    for (const product of products) {
        const title = await product.locator("b").textContent();
        if (title.includes(produtToBuy)) {
            await product.locator("text= Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const produtInCart = await page.locator("h3:text('" + produtToBuy + "')").isVisible();
    await expect(produtInCart).toBeTruthy();
    await page.locator(".btn-primary").nth(2).click();
    await page.locator("[placeholder*='Country']").pressSequentially("ja");
    const options = page.locator(".ta-results");
    await expect(options).toBeVisible();
    await options.locator("button:has-text('Japan')").click();
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const pageOrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const OrderID = pageOrderID.split(" ")[2];
    await page.locator("[routerlink*='myorder']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr").all();
    for (const row of rows) {
        const rowOrderID = await row.locator("th").textContent();
        if (rowOrderID.includes(OrderID)) {
            await row.locator("button.btn-primary").click();
            break;
        }
        const orderIDDetails = await page.locator(".col-text").textContent();
        expect(orderIDDetails.includes(OrderID)).toBeTruthy();
    }
})

test("Client app login", async ({ page }) => {
    const produtToBuy = "ADIDAS ORIGINAL";
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: produtToBuy }).getByRole("button", { name: "Add To Cart" }).click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(produtToBuy)).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ja");
    const options = page.locator(".ta-results");
    await expect(options).toBeVisible();
    await options.locator("button:has-text('Japan')").click();
    expect(await page.getByText("email")).toBeVisible();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
})