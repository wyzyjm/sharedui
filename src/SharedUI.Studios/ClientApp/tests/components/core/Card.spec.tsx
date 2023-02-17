import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("card compoment", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/card--card";
        await page.goto(pageUrl);
    });
    test('should render margin', async() => {
        const headerElement = await storybookPOM.getElementFromPreview('.header');
        const headerMargin = await storybookPOM.getComputedStyle(headerElement, "margin-left");
        await expect(headerMargin).toBe("12px")
    })

    test("has link text", async ({ page }) => {
        const textElement = await storybookPOM.getByRole('button', { name: 'Try it out' });
        
        await expect(textElement).toBeVisible();
    });
    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
  });
