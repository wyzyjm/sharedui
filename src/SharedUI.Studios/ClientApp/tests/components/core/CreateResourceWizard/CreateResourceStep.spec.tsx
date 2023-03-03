import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("page create-resource-step", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();

        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/create-resource-wizard--create-resource-step-component";
        await page.goto(pageUrl);
    });

    test("should render ComboBox", async ({ page }) => {
        const comboBox = (await storybookPOM.getElementFromPreview('.crw-form-item-location input'));
        await expect(comboBox).toBeVisible();
    });

    test("should render Tips", async ({ page }) => {
        const tips = (await storybookPOM.getElementFromPreview('.crw-form-item-tips-container')).getByText('Tip: The resource name is best for recall when it’s in the following format.');
        await expect(tips).toBeVisible();
    });
    
    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});

