import { expect, test } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const cardContainerTitleClass = ".cardContainerTitle";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/cardscontainer--card-container";
    await page.goto(pageUrl);
});


test.describe('Card container tests', () => {
    test('should render the basic Card container as per design', async ({ page }) => {
        const cardContainerTitleElement = await storybookPOM.getElementFromPreview(cardContainerTitleClass);

        // Check font size
        const fontSize = await storybookPOM.getComputedStyle(cardContainerTitleElement, "font-size");
        await expect(fontSize).toBe("18px");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(cardContainerTitleElement, "font-weight");
        await expect(fontWeight).toBe("600");

        // Check header text color
        const color = await storybookPOM.getComputedStyle(cardContainerTitleElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

    });

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});