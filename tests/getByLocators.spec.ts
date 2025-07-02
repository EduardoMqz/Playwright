import { test, expect } from "@playwright/test";

test("Understand GetBy", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    //npx playwright test --ui
    await page.getByPlaceholder("Password").fill("password");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
})

test("Handling calendars", async ({ page }) => {
    const month = "5";
    const day = "15";
    const year = "2028";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + day + "']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input").all();
    const values = await Promise.all(inputs.map(input => input.getAttribute("value")));
    expect(values).toContain(month);
    expect(values).toContain(day);
    expect(values).toContain(year);
})