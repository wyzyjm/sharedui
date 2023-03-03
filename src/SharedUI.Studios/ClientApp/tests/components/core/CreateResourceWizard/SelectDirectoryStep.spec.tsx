import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("page create-resource-wizard--select-directory-step-component", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/create-resource-wizard--select-directory-step-component";
        await page.goto(pageUrl);
    });

    test("has learn more link", async ({ page }) => {
        const linkElement = await storybookPOM.getByRole('link', { name: 'Learn more' });
        linkElement.click();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
        ]);
        await expect(newPage).toHaveURL(/.*microsoft.com/);
    });

    test(`Selected Tenant changes when props changes`, async ({ page }) => {
        const randomText = Math.floor(Math.random() * 3);

        await page.locator('#control-selectedTenantId').fill(`${randomText}`);

        const display = await (await storybookPOM.getElementFromPreview('.crw-tenant-list span')).nth(randomText);
        await expect(display).toContainText('*');
    })

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
  });

