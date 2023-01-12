import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const panelClass = ".ms-Panel-main";
const headerTextClass = ".ms-Panel-headerText";
const notificationClass = ".message-text";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/notification--notification";
    await page.goto(pageUrl);
});


test.describe('Notification tests', () => {
    test('should render the basic Notification panel as per design', async ({ page }) => {
        const panelElement = await storybookPOM.getElementFromPreview(panelClass);
        const headerTextElement = await storybookPOM.getElementFromPreview(headerTextClass);
        const notificationElement = await storybookPOM.getElementFromPreview(notificationClass);

        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(panelElement, "background-color");
        await expect(backgroundColor).toBe("rgb(255, 255, 255)");

        // Check header text color
        const color = await storybookPOM.getComputedStyle(headerTextElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(panelElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check panel width
        const panelWidth = await storybookPOM.getComputedStyle(panelElement, "width");
        await expect(panelWidth).toBe("380px");

        // Check notification font-size
        const notificationFontSize = await storybookPOM.getComputedStyle(notificationElement, "font-size");
        await expect(notificationFontSize).toBe("14px");

        // Check notification font weight
        const notificationFontWeight = await storybookPOM.getComputedStyle(notificationElement, "font-weight");
        await expect(notificationFontWeight).toBe("400");
    });

    test('the notification panel should update on properties updates', async ({ page }) => {
        // Check the headerText prop
        await page.locator('textarea[name="headerText"]').fill("Hello");
        const headerTextElement = await storybookPOM.getByRole('heading', { name: 'Hello' });
        expect(headerTextElement).toHaveText("Hello");

        // Check close panel
        const clearButton = (await storybookPOM.getByRole('button', { name: 'Close' })).first();
        await clearButton.click();
        await expect(await page.locator(panelClass).count()).toEqual(0);
    });

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});