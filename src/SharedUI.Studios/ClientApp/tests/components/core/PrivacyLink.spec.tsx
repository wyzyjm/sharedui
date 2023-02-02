import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("privacy link", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/privacylink--privacy-and-link";
        await page.goto(pageUrl);
    });
  
    test("should render color and margin", async ({ page }) => {
        const linkElement = await (await storybookPOM.getElementFromPreview('.link')).first();
        // Check color
        const color = await storybookPOM.getComputedStyle(linkElement, "color");
        await expect(color).toBe("rgb(0, 120, 212)");

        const privacyMargin = await storybookPOM.getComputedStyle(linkElement, "margin-right");
        await expect(privacyMargin).toBe("5px")
    });
    
    test("has text", async ({ page }) => {

        const textElement = await storybookPOM.getByRole('link', { name: 'Privacy & cookies' });
        
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

