import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/itemlist--item-list";
    await page.goto(pageUrl);
});


test.describe('Panel Selector tests', () => {
    test('should render Panel Selector as per design', async ({ page }) => {

        // const buttonElement = await storybookPOM.getByRole('button', { name: 'Panel selector' });

        // // Check text color
        // const color = await storybookPOM.getComputedStyle(buttonElement, "color");
        // await expect(color).toBe("rgb(50, 49, 48)");

        // // Check font size
        // const fontSize = await storybookPOM.getComputedStyle(buttonElement, "font-size");
        // await expect(fontSize).toBe("14px");

        // // Check font weight
        // const fontWeight = await storybookPOM.getComputedStyle(buttonElement, "font-weight");
        // await expect(fontWeight).toBe("400");

        // // Check background color
        // const headerBackgroundColor = await storybookPOM.getComputedStyle(buttonElement, "background-color");
        // await expect(headerBackgroundColor).toBe("rgb(255, 255, 255)");

    });

    test('the ItemList should update on Panel Selector updates', async ({ page }) => {
        // await (await storybookPOM.getByRole('button', { name: 'Panel selector' })).click();

        // //Check ItemList for updates
        // await (await storybookPOM.getLocatorIframe('label:has-text("First name") span')).click();
        // await expect(await storybookPOM.getByRole('button', { name: 'Last name' })).toContainText('Last name');
    });

    // Accessibility voilations check
    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});