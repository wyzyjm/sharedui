import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const messageBoxClass = ".notification-box-list-7ryh4xl7v9";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/notification--notification-box";
    await page.goto(pageUrl);
});


test.describe('Notification Message Boxes tests', () => {
    test('should render the basic Notification panel as per design', async ({ page }) => {
        const messages = (await storybookPOM.getElementFromPreview(messageBoxClass)).locator('header-notification-message-box').all();

        for (const message of await messages) {
            // Check background color
            const backgroundColor = await storybookPOM.getComputedStyle(message, 'background-color');
            await expect(backgroundColor).toBe("rgb(255, 255, 255)");

            // Check header text color
            const color = await storybookPOM.getComputedStyle(message, "color");
            await expect(color).toBe("rgb(50, 49, 48)");

            // Check font weight
            const fontWeight = await storybookPOM.getComputedStyle(message, "font-weight");
            await expect(fontWeight).toBe("400");

            // Check panel width
            const panelWidth = await storybookPOM.getComputedStyle(message, "width");
            await expect(panelWidth).toBe("380px");
        }

        setTimeout(async () => {
            for (const message of await messages) {
                await expect(message.isVisible()).toBe(false);
            }
        }, 5000);

    });

    // When Accessibility running the msg box already closed
    // Accessibility voilations check  
    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});