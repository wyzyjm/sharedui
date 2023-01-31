import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const listClass = ".ms-DetailsList";
const headerClass = ".ms-DetailsList-headerWrapper";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/itemlist--item-list";
    await page.goto(pageUrl);
});


test.describe('ItemList tests', () => {
    test('should render ItemList as per design', async ({ page }) => {
        const listElement = await storybookPOM.getElementFromPreview(listClass);
        const headerElement = await storybookPOM.getElementFromPreview(headerClass);

        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(listElement, "background-color");
        await expect(backgroundColor).toBe("rgba(0, 0, 0, 0)");

        // Check text color
        const color = await storybookPOM.getComputedStyle(listElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

        // Check font size
        const fontSize = await storybookPOM.getComputedStyle(listElement, "font-size");
        await expect(fontSize).toBe("12px");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(listElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check width
        const width = await storybookPOM.getComputedStyle(listElement, "width");
        await expect(width).toBe("1008px");

        // Check height
        const height = await storybookPOM.getComputedStyle(listElement, "height");
        await expect(height).toBe("172px");

        // Check header background color
        const headerBackgroundColor = await storybookPOM.getComputedStyle(headerElement, "background-color");
        await expect(headerBackgroundColor).toBe("rgba(0, 0, 0, 0)");

        // Check header text color
        const headerColor = await storybookPOM.getComputedStyle(headerElement, "color");
        await expect(headerColor).toBe("rgb(50, 49, 48)");

        // Check header font weight
        const headerFontWeight = await storybookPOM.getComputedStyle(headerElement, "font-weight");
        await expect(headerFontWeight).toBe("400");

        // Check header width
        const headerwidth = await storybookPOM.getComputedStyle(headerElement, "width");
        await expect(headerwidth).toBe("1008px");

        // Check header height
        const headerheight = await storybookPOM.getComputedStyle(headerElement, "height");
        await expect(headerheight).toBe("43px");
    });

    test('the ItemList should update on properties updates', async ({ page }) => {
        // Check First name sorting
        await (await storybookPOM.getByRole('button', { name: 'First name' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await (await storybookPOM.getByRole('button', { name: 'First name' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await expect(await storybookPOM.getByRole('gridcell', { name: 'Mukesh' })).toHaveText('Mukesh');

        // Check Last name sorting
        await (await storybookPOM.getByRole('button', { name: 'Last name' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await expect(await storybookPOM.getByRole('gridcell', { name: 'Agarwal' })).toHaveText('Agarwal');

        // Check Designation sorting
        await (await storybookPOM.getByRole('button', { name: 'Designation' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await expect(await storybookPOM.getByRole('gridcell', { name: 'Developer' })).toHaveText('Developer');

        // Check Success count sorting
        await (await storybookPOM.getByRole('button', { name: 'Success count' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await expect(await storybookPOM.getByRole('gridcell', { name: '35' })).toHaveText('35');

        // Check Failure count sorting
        await (await storybookPOM.getByRole('button', { name: 'Failure count' })).click();
        await (await storybookPOM.getByRole('menuitem', { name: 'Sort' })).click();
        await expect(await storybookPOM.getByRole('gridcell', { name: '10' })).toHaveText('10');

        // Check the enableShimmer prop
        await page.locator('input[name="enableShimmer"]').click();
        const shimmerClass = ".ms-DetailsList-contentWrapper";
        const shimmerElement = await storybookPOM.getElementFromPreview(shimmerClass);
        await expect(shimmerElement).toBeVisible();
        await page.locator('input[name="enableShimmer"]').click();
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