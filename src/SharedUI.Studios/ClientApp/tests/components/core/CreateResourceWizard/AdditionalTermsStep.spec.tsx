import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("page additional-terms-step", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();

        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/create-resource-wizard--additional-terms-step-component";
        await page.goto(pageUrl);
    });
    
    test("should render checkbox", async ({ page }) => {
        const checkbox = (await storybookPOM.getElementFromPreview('.crw-checkbox')).getByRole('checkbox');
        await expect(checkbox).toBeVisible();
    });

    test(`Addition message changes when props changes`, async ({ page }) => {
        const randomText = `${Math.random()}`;

        await page.locator('#control-confirmationMessage').fill(randomText);

        const display = await storybookPOM.getElementFromPreview('.ms-Checkbox-label .ms-Checkbox-text');
        await expect(display).toContainText(randomText);
    })

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});

