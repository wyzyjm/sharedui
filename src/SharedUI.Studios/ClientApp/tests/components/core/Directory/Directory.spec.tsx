import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("Directory compoment", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();

        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/selectdirectorytab--select-directory-tab";
        await page.goto(pageUrl);
    });

    test('should render the directory as per design', async ({ page }) => {
        const currentDirectoryElement = await storybookPOM.getByText('Current directory: ');

        // Check font size
        const fontSize = await storybookPOM.getComputedStyle(currentDirectoryElement, "font-size");
        await expect(fontSize).toBe("16px");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(currentDirectoryElement, "font-weight");
        await expect(fontWeight).toBe("500");

    });

    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     test.setTimeout(120000);
    //     await page.waitForLoadState('networkidle');
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});
