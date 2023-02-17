import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("no deployments view", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/splashscreenview--splash-screen-view-container";
        await page.goto(pageUrl);
    });
  
    test("should render minHeight and padding", async ({ page }) => {
        const viewElement = await (await storybookPOM.getElementFromPreview('.splashScreenViewParentContainer'));

        const viewPadding = await storybookPOM.getComputedStyle(viewElement, "padding");
        await expect(viewPadding).toBe("10px");

        const viewMinHeight = await storybookPOM.getComputedStyle(viewElement, 'min-height');
        await expect(viewMinHeight).toBe("500px");
    });
    test("should render title and description", async ({ page }) => {
        const headTitle = await storybookPOM.getByRole('heading', { name: 'No deployments found' });
        
        await expect(headTitle).toBeVisible();

        const description = await (await storybookPOM.getElementFromPreview('.splashScreenViewChildren')).last()
        await expect(description).toBeVisible()
    });
    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
  });
