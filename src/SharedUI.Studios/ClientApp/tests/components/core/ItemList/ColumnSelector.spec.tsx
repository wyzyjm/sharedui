import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const panelClass = ".ms-Panel-main";
const panelHeaderClass = ".ms-Panel-header";
const panelContentClass = ".ms-Panel-content";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/itemlist--item-list";
    await page.goto(pageUrl);
});


test.describe('Column Selector tests', () => {
    test('should render Column Selector as per design', async ({ page }) => {
        await (await storybookPOM.getByRole('button', { name: 'Column selector' })).click();

        const panelElement = await storybookPOM.getElementFromPreview(panelClass);
        const panelHeaderElement = await storybookPOM.getElementFromPreview(panelHeaderClass);
        const panelContentElement = await storybookPOM.getElementFromPreview(panelContentClass);

        //Panel
        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(panelElement, "background-color");
        await expect(backgroundColor).toBe("rgb(255, 255, 255)");

        // Check width
        const width = await storybookPOM.getComputedStyle(panelElement, "width");
        await expect(width).toBe("380px");

        // Check font size
        const panelFontSize = await storybookPOM.getComputedStyle(panelElement, "font-size");
        await expect(panelFontSize).toBe("14px");

        // Check font weight
        const panelFontWeight = await storybookPOM.getComputedStyle(panelElement, "font-weight");
        await expect(panelFontWeight).toBe("400");

        //Panel header
        // Check text color
        const color = await storybookPOM.getComputedStyle(panelHeaderElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

        // Check font size
        const fontSize = await storybookPOM.getComputedStyle(panelHeaderElement, "font-size");
        await expect(fontSize).toBe("14px");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(panelHeaderElement, "font-weight");
        await expect(fontWeight).toBe("400");

        //Panel content
        // Check text color
        const panelContentColor = await storybookPOM.getComputedStyle(panelContentElement, "color");
        await expect(panelContentColor).toBe("rgb(50, 49, 48)");

        // Check font size
        const panelContentFontSize = await storybookPOM.getComputedStyle(panelContentElement, "font-size");
        await expect(panelContentFontSize).toBe("14px");

        // Check font weight
        const panelContentFontWeight = await storybookPOM.getComputedStyle(panelContentElement, "font-weight");
        await expect(panelContentFontWeight).toBe("400");
    });

    test('the ItemList should update on Column Selector updates', async ({ page }) => {
        await (await storybookPOM.getByRole('button', { name: 'Column selector' })).click();

        //Check ItemList for updates
        await (await storybookPOM.getByRole('dialog', { name: 'Edit columns' })).getByText('First name').click();
        await (await storybookPOM.getByRole('button', { name: 'Save' })).click();
        await expect(await storybookPOM.getByRole('button', { name: 'Last name' })).toContainText('Last name');
    });

    // Accessibility voilations check
    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});