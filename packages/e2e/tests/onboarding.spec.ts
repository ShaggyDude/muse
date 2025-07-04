import { test, expect } from "@playwright/test";

test.describe("New User Onboarding", () => {
  test("allows a new user to sign up and set up their profile", async ({
    page,
  }) => {
    // Background: Given I am a new visitor to the application
    // When I navigate to the "/signup" page
    await page.goto("/signup");

    // And I enter "test.user@example.com" into the "email" field
    await page.getByLabel("Email").fill("test.user@example.com");

    // And I enter a secure password into the "password" field
    await page.getByLabel("Password").fill("a-secure-password");

    // And I click the "Sign Up" button
    await page.getByRole("button", { name: "Sign Up" }).click();

    // Then I should be redirected to the "/onboarding/welcome" page
    await expect(page).toHaveURL("/onboarding/welcome");

    // And I should see a welcome message "Welcome to the Tree of Life!"
    await expect(
      page.getByRole("heading", { name: "Welcome to the Tree of Life!" })
    ).toBeVisible();

    // When I enter "Test User" into the "full name" field
    await page.getByLabel("Full Name").fill("Test User");

    // And I click the "Complete Profile" button
    await page.getByRole("button", { name: "Complete Profile" }).click();

    // Then I should be redirected to my "/dashboard"
    await expect(page).toHaveURL("/dashboard");

    // And I should see a confirmation message "Your profile is all set up!"
    await expect(page.getByText("Your profile is all set up!")).toBeVisible();

    // And my user name "Test User" should be visible on the page
    await expect(page.getByText("Welcome, Test User!")).toBeVisible();
  });
});