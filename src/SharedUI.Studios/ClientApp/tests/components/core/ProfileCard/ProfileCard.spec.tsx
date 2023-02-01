import { expect, test } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const profileCardBodyClass = ".ms-Panel-content";
const PersonaPrimaryTextClass = ".ms-Persona-primaryText";

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
        const personaPrimaryTextElement = await storybookPOM.getElementFromPreview(PersonaPrimaryTextClass);

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(profileCardBodyElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check Font size
        const fontSize = await storybookPOM.getComputedStyle(personaPrimaryTextElement, "font-size");
        await expect(fontSize).toBe("20px");
    });

    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});