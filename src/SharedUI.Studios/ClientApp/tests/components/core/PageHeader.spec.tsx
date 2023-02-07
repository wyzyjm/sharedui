import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("page header", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/pageheader--page-header-component";
        await page.goto(pageUrl);
    });
    test('should render margin', async() => {
        const headerElement = await storybookPOM.getElementFromPreview('.header');
        const headerMargin = await storybookPOM.getComputedStyle(headerElement, "margin-right");
        await expect(headerMargin).toBe("20px")
    })

    test("has models text", async ({ page }) => {
        const textElement = await storybookPOM.getByRole('heading', { name: 'Models' });
        
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

