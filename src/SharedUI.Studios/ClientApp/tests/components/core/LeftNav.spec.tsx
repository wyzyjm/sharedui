import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("left navigation", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/leftnav--left-nav-component";
        await page.goto(pageUrl);
    });
  
    test("the lefe nav has text", async ({ page }) => {

        const textElement = await storybookPOM.getByRole('link', { name: 'Azure OpenAI' });
        await expect(textElement).toBeVisible();

        const headText = await (await storybookPOM.getElementFromPreview('.navigation-header')).first();
        await expect(headText).toHaveText('Playground');

    });
    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
  });
