import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const profileCardBodyClass = ".ms-Panel-content";
const linkClass = ".ms-Link"

// Path test
test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/profilecard--profile";
    await page.goto(pageUrl);
});


test.describe('Profile card tests', () => {
    test('should render the basic Profile as per design', async ({ page }) => {
        const profileCardBodyElement = await storybookPOM.getElementFromPreview(profileCardBodyClass);
        const linkElement = await storybookPOM.getElementFromPreview(linkClass);

        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(profileCardBodyElement, "background-color");
        await expect(backgroundColor).toBe("rgb(255, 255, 255)");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(profileCardBodyElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check link text color
        const color = await storybookPOM.getComputedStyle(linkElement, "color");
        await expect(color).toBe("rgb(0, 120, 212)");
    });

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});