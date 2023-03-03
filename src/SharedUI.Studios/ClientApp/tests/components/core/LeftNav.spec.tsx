import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const panelClass = ".body-97";
const navLinkClass = ".ms-Nav-groupContent";
const titleClass = ".ms-Link";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/leftnav--left-nav";
    await page.goto(pageUrl);
});


test.describe('Left Navigation Panel tests', () => {
    test('should render the basic Left Navigation Panel as per design', async ({ page }) => {
        const panelElement = await storybookPOM.getElementFromPreview(panelClass);
        const navLinkElement = await storybookPOM.getElementFromPreview(navLinkClass);

        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(panelElement, "background-color");
        await expect(backgroundColor).toBe("rgb(255, 255, 255)");

        // Check text color
        const color = await storybookPOM.getComputedStyle(panelElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(panelElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check nav link text font-size
        const navLinkFontSize = await storybookPOM.getComputedStyle(navLinkElement, "font-size");
        await expect(navLinkFontSize).toBe("14px");

        // Check nav link text font weight
        const navLinkWeight = await storybookPOM.getComputedStyle(navLinkElement, "font-weight");
        await expect(navLinkWeight).toBe("400");
    });

    test('the left navigation panel should update on properties updates', async ({ page }) => {
        // Check the title prop
        await page.locator('textarea[name="title"]').fill("Custom Speech");
        const titleElement = await storybookPOM.getElementFromPreview(titleClass);
        expect(titleElement).toHaveText("Custom Speech");

        // Check defaultMenuSelectKey prop
        await page.locator('textarea[name="defaultMenuSelectKey"]').fill("testing");
        const navLinkButtonElement = await storybookPOM.getByRole('link', { name: 'Test models' });
        const backgroundColor = await storybookPOM.getComputedStyle(navLinkButtonElement, "background-color");
        await expect(backgroundColor).toBe("rgb(237, 235, 233)");
    });

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.waitForLoadState('load').then(async () => {
            await page.getByRole('tab', { name: 'Accessibility' }).click();
            await page.locator('button', { hasText: 'Violations' }).click();
            await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
        })
    });
});