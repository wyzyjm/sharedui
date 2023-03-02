import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();
    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/selectresourcetab--select-resource-tab";
    await page.goto(pageUrl);
});


test.describe('Select resource tab tests', () => {

    test('the Select resource tab should update on properties updates', async ({ page }) => {
        // Check Learn more about creating resources in Azure
        await (await storybookPOM.getByRole('link', { name: 'Learn more about creating resources in Azure' })).click();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
        ]);
        await expect(newPage).toHaveURL('https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal');
    });

    // Accessibility voilations check
    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});